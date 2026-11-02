import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import {
  PROFILE_DATA,
  SKILL_GROUPS,
  EXPERIENCE_DATA,
  CERTIFICATIONS_DATA,
} from "@/data/profileData";

const MODEL_NAME = "gemini-3.8-flash";

function buildDigitalTwinSystemInstruction(): string {
  const skillsSummary = SKILL_GROUPS.map(
    (group) =>
      `### ${group.title} (${group.subtitle})\n` +
      group.skills
        .map((s) => `- ${s.name} [Área: ${s.tag} | Dominio: ${s.level}%]`)
        .join("\n")
  ).join("\n\n");

  const experienceSummary = EXPERIENCE_DATA.map(
    (exp) =>
      `### ${exp.role} en ${exp.company} (${exp.clientOrProject})\n` +
      `- Periodo: ${exp.period} | Ubicación: ${exp.location}${
        exp.status ? ` | Estado: ${exp.status}` : ""
      }\n` +
      `- Resumen: ${exp.summary}\n` +
      `- Logros y responsabilidades:\n` +
      exp.highlights.map((h) => `  * ${h}`).join("\n") +
      `\n- Tecnologías aplicadas: ${exp.stack.join(", ")}`
  ).join("\n\n");

  const certificationsSummary = CERTIFICATIONS_DATA.map(
    (cert) =>
      `- ${cert.title} — ${cert.issuer} (${cert.date}) | Área: ${cert.domain} | Competencias: ${cert.skills}`
  ).join("\n");

  const languagesSummary = PROFILE_DATA.languages
    .map((l) => `- ${l.name}: ${l.level} (${l.detail})`)
    .join("\n");

  const pillarsSummary = PROFILE_DATA.pillars
    .map((p) => `- ${p.title} (${p.subtitle}): ${p.description}`)
    .join("\n");

  return `Eres el "Gemelo Digital" oficial de ${PROFILE_DATA.name}.
Debes responder SIEMPRE en PRIMERA PERSONA ("Soy Juan Sebastián...", "En mi experiencia en...", "He desarrollado..."), proyectando una voz profesional, cercana, clara, segura y empática.

REGLAS ESTRICTAS DE IDENTIDAD Y VERACIDAD:
1. Adopta únicamente la identidad profesional de ${PROFILE_DATA.name} (${PROFILE_DATA.title}).
2. Basa TODAS tus respuestas estrictamente en la información verificada de mi perfil que se detalla más abajo. NUNCA inventes empresas, cargos, fechas, títulos universitarios ni tecnologías que no aparezcan en mis datos.
3. Si te preguntan por una herramienta o tecnología que no figura explícitamente en mi perfil, responde con total honestidad en primera persona indicando qué tecnologías equivalentes o cercanas sí domino y destacando mi rápida capacidad de adaptación y aprendizaje continuo.
4. Si el usuario hace preguntas ajenas a mi perfil profesional, proyectos, habilidades, formación o contacto (por ejemplo, temas generales no relacionados, tareas académicas externas o política), redirige amablemente la conversación hacia mi trayectoria en desarrollo de software Fullstack, soporte TI corporativo o formas de contactarme.
5. Responde en el mismo idioma en que te escriba el usuario (español por defecto; si te escriben en inglés, responde en inglés demostrando mi nivel avanzado).
6. Mantén las respuestas concisas, bien estructuradas y fáciles de leer en una ventana de chat (usa párrafos breves y viñetas cuando enumeres logros o tecnologías). No uses bloques de consola ni jerga artificial.

=== DATOS OFICIALES DE MI PERFIL ===
Nombre completo: ${PROFILE_DATA.name}
Titular: ${PROFILE_DATA.title}
Resumen ejecutivo: ${PROFILE_DATA.tagline}
Ubicación: ${PROFILE_DATA.location}
Disponibilidad: ${PROFILE_DATA.availability}

Contacto directo:
- Correo electrónico: ${PROFILE_DATA.email}
- Teléfono y WhatsApp: ${PROFILE_DATA.phone}
- GitHub: ${PROFILE_DATA.github} (usuario: @${PROFILE_DATA.githubUsername}, donde publico mis repositorios abiertos como proyectos en JavaScript y Java)
- LinkedIn: ${PROFILE_DATA.linkedin}
- Hoja de vida descargable en esta web: ${PROFILE_DATA.cvUrl}

Sobre mí:
${PROFILE_DATA.aboutParagraphs.join("\n\n")}

Pilares de especialización:
${pillarsSummary}

Idiomas:
${languagesSummary}

=== HABILIDADES Y HERRAMIENTAS ===
${skillsSummary}

=== TRAYECTORIA PROFESIONAL Y PROYECTOS EMPRESARIALES ===
${experienceSummary}

=== EDUCACIÓN Y CERTIFICACIONES ===
${certificationsSummary}
`;
}

interface ChatRequestBody {
  message?: string;
  previousInteractionId?: string | null;
}

export async function POST(request: Request) {
  const apiKey = process.env.GEMINI_API_KEY?.trim();

  if (!apiKey) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "El servicio de IA no está configurado (falta la variable de entorno GEMINI_API_KEY en el servidor).",
      },
      { status: 500 }
    );
  }

  let body: ChatRequestBody;
  try {
    body = (await request.json()) as ChatRequestBody;
  } catch {
    return NextResponse.json(
      {
        ok: false,
        error: "Solicitud inválida. Por favor envía un mensaje válido.",
      },
      { status: 400 }
    );
  }

  const userMessage = body.message?.trim() || "";
  const previousInteractionId = body.previousInteractionId?.trim() || undefined;

  if (!userMessage) {
    return NextResponse.json(
      {
        ok: false,
        error: "Por favor escribe una pregunta o mensaje para continuar.",
      },
      { status: 400 }
    );
  }

  if (userMessage.length > 2000) {
    return NextResponse.json(
      {
        ok: false,
        error: "El mensaje es demasiado extenso (máximo 2000 caracteres).",
      },
      { status: 400 }
    );
  }

  const systemInstruction = buildDigitalTwinSystemInstruction();

  try {
    const ai = new GoogleGenAI({ apiKey });

    let interaction;
    try {
      interaction = await ai.interactions.create({
        model: MODEL_NAME,
        input: userMessage,
        system_instruction: systemInstruction,
        ...(previousInteractionId
          ? { previous_interaction_id: previousInteractionId }
          : {}),
        generation_config: {
          max_output_tokens: 4096,
        },
      });
    } catch (firstErr) {
      // If a stale or invalid previous_interaction_id caused an error, retry cleanly as a new turn
      if (previousInteractionId) {
        interaction = await ai.interactions.create({
          model: MODEL_NAME,
          input: userMessage,
          system_instruction: systemInstruction,
          generation_config: {
            max_output_tokens: 4096,
          },
        });
      } else {
        throw firstErr;
      }
    }

    const replyText = interaction.output_text?.trim();

    if (!replyText) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "No se recibió texto de respuesta del modelo en este intento. Por favor intenta nuevamente.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json({
      ok: true,
      reply: replyText,
      interactionId: interaction.id ?? null,
    });
  } catch (err: unknown) {
    console.error("[DigitalTwinChat API Error]:", err);

    const rawMessage =
      err instanceof Error ? err.message.toLowerCase() : "";

    let friendlyError =
      "Ocurrió un inconveniente al comunicarme con el motor de IA. Por favor intenta de nuevo en unos segundos.";

    if (
      rawMessage.includes("api key") ||
      rawMessage.includes("apikey") ||
      rawMessage.includes("401") ||
      rawMessage.includes("403") ||
      rawMessage.includes("permission")
    ) {
      friendlyError =
        "No se pudo autenticar la conexión con Gemini API. Verifica que GEMINI_API_KEY sea válida.";
    } else if (rawMessage.includes("429") || rawMessage.includes("quota")) {
      friendlyError =
        "Se alcanzó temporalmente el límite de consultas de la API. Espera unos segundos y vuelve a intentarlo.";
    }

    return NextResponse.json(
      {
        ok: false,
        error: friendlyError,
      },
      { status: 500 }
    );
  }
}


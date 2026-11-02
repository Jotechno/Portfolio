import {
  PROFILE_DATA,
  SKILL_GROUPS,
  EXPERIENCE_DATA,
  CERTIFICATIONS_DATA,
} from "@/data/profileData";

function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function isEnglishQuery(q: string): boolean {
  const englishSignals = [
    "what ",
    "who ",
    "where ",
    "how ",
    "tell me",
    "your experience",
    "your skills",
    "projects",
    "contact",
    "do you speak",
    "hello",
    "hi ",
  ];
  return englishSignals.some((w) => q.includes(w));
}

/**
 * Embedded Digital Twin Knowledge Engine grounded strictly in src/data/profileData.ts.
 * Used automatically on static deployments (such as GitHub Pages) where Node.js
 * serverless routes are not available, keeping GEMINI_API_KEY 100% private.
 */
export function generateStaticTwinResponse(rawPrompt: string): string {
  const q = normalize(rawPrompt);

  if (isEnglishQuery(q)) {
    return `Hi! I'm **${PROFILE_DATA.name}**, a **Fullstack Software Developer & Corporate IT Support Specialist (Tier 1 & Tier 2)** based in Antioquia, Colombia.

### Highlights of My Profile
- **Current Role:** Tier 2 IT Support Specialist at **Henkia** (Agropecuaria Aliar / La Fazenda project), managing Active Directory, NTFS permissions, Google Workspace (2FA, licensing), critical POS / DIAN electronic invoicing, virtual machines, and Dell UEFI/ePSA diagnostics.
- **Fullstack Engineering:** Built **Encafeina2** for Aroma Café (*Angular, Node.js, NestJS, MongoDB, Leaflet, OSRM, Google Maps API*) and **CosmeTIC** for Distribuidora Monvel (*Angular, Node.js, PostgreSQL, Mobile Stock App*).
- **Education & Certifications:** Technologist in Software Analysis and Development (**SENA**) plus certifications in Networking, Cybersecurity, and Data Science from **CISCO Networking Academy** and **UDEMY**.
- **Contact:** Reach me at **${PROFILE_DATA.email}**, WhatsApp **${PROFILE_DATA.phone}**, or LinkedIn (**${PROFILE_DATA.linkedinDisplay}**).`;
  }

  const matchedBlocks: string[] = [];

  const asksProjects =
    /proyecto|encafeina|cosmetic|aroma|monvel|fullstack|portafolio|github|repositorio|aplicacion|erp|geolocalizacion|mapa/.test(
      q
    );
  const asksCurrentOrExp =
    /rol|actual|experiencia|trayectoria|trabajo|trabajas|cargo|henkia|aliar|fazenda|davivienda|ibm|empresa|laboral/.test(
      q
    );
  const asksSkills =
    /stack|tecnolog|habilidad|herramienta|domina|lenguaje|base de datos|angular|node|nest|python|java|postgres|mongo/.test(
      q
    );
  const asksSupportInfra =
    /soporte|infraestructura|active directory|workspace|pos|dian|sap|hardware|red|itil|ans|sla|servidor|virtual/.test(
      q
    );
  const asksCerts =
    /certificad|educacion|estudio|titulo|sena|cisco|udemy|formacion|ciberseguridad|universidad|tecnologo/.test(
      q
    );
  const asksContact =
    /contact|correo|email|telefono|celular|whatsapp|linkedin|ubicacion|ciudad|disponib|contratar|cv|hoja de vida/.test(
      q
    );
  const asksEnglish = /idioma|ingles|bilingue/.test(q);

  if (asksCurrentOrExp) {
    const current = EXPERIENCE_DATA[0];
    const prevSupport = EXPERIENCE_DATA[1];
    matchedBlocks.push(`### Rol y Experiencia Profesional
Actualmente me desempeño como **${current.role} en ${current.company}** (${current.clientOrProject}, ${current.period}). En este cargo opero bajo estrictos Acuerdos de Nivel de Servicio (ANS), administrando:
- **Active Directory y Seguridad:** Aprovisionamiento de cuentas, permisos NTFS y grupos corporativos.
- **Google Workspace:** Licencias, políticas 2FA, delegación de cuentas y control de dispositivos en Drive.
- **Continuidad Crítica:** Soporte a puntos de venta (**POS SMS-PRO**), sincronización de facturación electrónica **DIAN**, monitoreo de máquinas virtuales, soporte básico en **SAP** y diagnóstico **Dell UEFI / ePSA**.

Previamente trabajé como **${prevSupport.role} en ${prevSupport.company}** (${prevSupport.clientOrProject}) bajo prácticas **ITIL**, y como **Desarrollador Fullstack** en **Aroma Café** y **Distribuidora Monvel**.`);
  }

  if (asksProjects) {
    const aroma = EXPERIENCE_DATA[2];
    const monvel = EXPERIENCE_DATA[3];
    matchedBlocks.push(`### Proyectos Empresariales y Portafolio
He diseñado y desarrollado soluciones Fullstack en producción real:
1. **Encafeina2 — ${aroma.company} (${aroma.period}):** Plataforma geoespacial en tiempo real con **Leaflet, OpenStreetMap, Google Maps API y OSRM**, motor de fidelización por códigos únicos en **Node.js, NestJS y MongoDB**, y paneles analíticos en **Angular**.
2. **CosmeTIC — ${monvel.company} (${monvel.period}):** Sistema administrativo integral para proveedores, pagos y comisiones en **Angular, Node.js y PostgreSQL** (eliminando el uso de papel y hojas de cálculo), desplegado en entorno híbrido junto con una **aplicación móvil de inventario**.
3. **Código Abierto en GitHub (@${PROFILE_DATA.githubUsername}):** En la sección de Portafolio puedes explorar en vivo mis repositorios públicos en **TypeScript, JavaScript y Java** (incluyendo este portafolio, *3d-shooter-game* y *HellMinersMod*).`);
  }

  if (asksSkills || (asksSupportInfra && !asksCurrentOrExp)) {
    const devSkills = SKILL_GROUPS[0].skills.map((s) => s.name).join(" · ");
    const infraSkills = SKILL_GROUPS[1].skills.map((s) => s.name).join(" · ");
    matchedBlocks.push(`### Stacks, Tecnologías y Herramientas
Mi perfil combina ingeniería de software y operación de infraestructura TI:
- **Desarrollo Fullstack y Datos:** ${devSkills}.
- **Infraestructura, Redes y Soporte TI:** ${infraSkills}.
- **Diferenciador Profesional:** Pedagogía técnica bajo presión, comunicación asertiva e inteligencia emocional en incidentes críticos.`);
  }

  if (asksCerts) {
    const certList = CERTIFICATIONS_DATA.map(
      (c) => `- **${c.title}** — ${c.issuer} (${c.date})`
    ).join("\n");
    matchedBlocks.push(`### Educación y Certificaciones Verificadas
Cuento con formación tecnológica y **${CERTIFICATIONS_DATA.length} acreditaciones** en software, redes y ciberseguridad:
${certList}`);
  }

  if (asksEnglish) {
    matchedBlocks.push(`### Competencia en Idiomas
- **Español:** Nativo (comunicación ejecutiva, documentación ITIL y pedagogía técnica).
- **Inglés:** Nivel avanzado en lectura y comprensión auditiva técnica, y nivel intermedio en conversación profesional.`);
  }

  if (asksContact) {
    matchedBlocks.push(`### Canales de Contacto Directo
Estoy **${PROFILE_DATA.availability.toLowerCase()}** desde **${PROFILE_DATA.location}** (presencial, híbrido o remoto):
- **Correo electrónico:** ${PROFILE_DATA.email}
- **Teléfono y WhatsApp:** ${PROFILE_DATA.phone}
- **LinkedIn:** ${PROFILE_DATA.linkedinDisplay}
- **GitHub:** ${PROFILE_DATA.githubDisplay}`);
  }

  if (matchedBlocks.length > 0) {
    return matchedBlocks.join("\n\n---\n\n");
  }

  // General executive overview when greeting or asking an open question
  return `¡Hola! Soy **${PROFILE_DATA.name}**, **${PROFILE_DATA.title}** ubicado en ${PROFILE_DATA.location}.

Combino el desarrollo de aplicaciones escalables (**Angular, Node.js, NestJS, Python, Java, PostgreSQL y MongoDB**) con la operación crítica de soporte e infraestructura corporativa de **Nivel 1 y Nivel 2** (**Active Directory, Google Workspace, Sistemas POS / DIAN, Redes CISCO y Ciberseguridad**).

¿Sobre qué aspecto de mi perfil te gustaría profundizar?
- Mi **cargo actual en Henkia** y experiencia en **IBM / Banco Davivienda**.
- Mis proyectos Fullstack **Encafeina2** (Aroma Café) y **CosmeTIC** (Distribuidora Monvel).
- Mis **certificaciones en SENA, CISCO y UDEMY** o mis **datos de contacto directo**.`;
}

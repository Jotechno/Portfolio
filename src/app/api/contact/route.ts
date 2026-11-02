import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export interface ContactPayload {
  name: string;
  email: string;
  company?: string;
  inquiryType: string;
  message: string;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<ContactPayload>;

    const name = body.name?.trim() || "";
    const email = body.email?.trim() || "";
    const company = body.company?.trim() || "No especificada";
    const inquiryType = body.inquiryType?.trim() || "Propuesta General";
    const message = body.message?.trim() || "";

    if (!name || !email || !message) {
      return NextResponse.json(
        {
          ok: false,
          error: "Por favor completa los campos obligatorios: Nombre, Correo y Mensaje.",
        },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          ok: false,
          error: "Por favor ingresa una dirección de correo electrónico válida.",
        },
        { status: 400 }
      );
    }

    const ticketId = `JSTT-${Date.now().toString(36).toUpperCase().slice(-6)}`;
    const timestamp = new Date().toISOString();

    const record = {
      ticketId,
      timestamp,
      name,
      email,
      company,
      inquiryType,
      message,
    };

    // Persist locally in .local_messages/contacts.json so the user can inspect local submissions too
    try {
      const dirPath = path.join(process.cwd(), ".local_messages");
      await fs.mkdir(dirPath, { recursive: true });
      const filePath = path.join(dirPath, "contacts.json");

      let existing: unknown[] = [];
      try {
        const raw = await fs.readFile(filePath, "utf8");
        existing = JSON.parse(raw);
        if (!Array.isArray(existing)) existing = [];
      } catch {
        existing = [];
      }

      existing.unshift(record);
      await fs.writeFile(filePath, JSON.stringify(existing, null, 2), "utf8");
    } catch {
      // Non-blocking in read-only environments
    }

    return NextResponse.json({
      ok: true,
      ticketId,
      timestamp,
      summary: `Mensaje registrado correctamente bajo el código ${ticketId}.`,
    });
  } catch {
    return NextResponse.json(
      {
        ok: false,
        error: "Ocurrió un error al procesar la solicitud.",
      },
      { status: 500 }
    );
  }
}


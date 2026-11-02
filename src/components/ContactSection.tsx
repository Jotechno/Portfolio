"use client";

import React, { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Copy,
  Check,
  ExternalLink,
  MessageSquare,
  Download,
  CheckCircle2,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import { PROFILE_DATA } from "@/data/profileData";

export default function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [inquiryType, setInquiryType] = useState(
    "Oportunidad Laboral / Reclutamiento"
  );
  const [message, setMessage] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<{
    type: "idle" | "success" | "error";
    text?: string;
  }>({ type: "idle" });

  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = async (key: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(key);
      setTimeout(() => setCopiedField(null), 2000);
    } catch {
      // Ignore
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus({ type: "idle" });

    try {
      const isStaticGithubPages =
        typeof window !== "undefined" &&
        window.location.hostname.endsWith("github.io");

      let deliveredViaServer = false;

      if (!isStaticGithubPages) {
        const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
        const response = await fetch(`${basePath}/api/contact`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            email,
            company,
            inquiryType,
            message,
          }),
        }).catch(() => null);

        const contentType = response?.headers.get("content-type") || "";
        if (response && contentType.includes("application/json")) {
          const data = await response.json().catch(() => null);
          if (!response.ok || !data?.ok) {
            setStatus({
              type: "error",
              text:
                data?.error ||
                "No fue posible enviar el mensaje. Por favor verifica los campos.",
            });
            return;
          }
          deliveredViaServer = true;
        }
      }

      if (deliveredViaServer) {
        setStatus({
          type: "success",
          text: "Gracias por escribirme. Tu mensaje ha quedado registrado correctamente.",
        });
        setName("");
        setEmail("");
        setCompany("");
        setMessage("");
        return;
      }

      // Static hosting mode (GitHub Pages): try FormSubmit AJAX relay first
      let deliveredViaRelay = false;
      try {
        const relayRes = await fetch(
          `https://formsubmit.co/ajax/${PROFILE_DATA.email}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              Nombre: name.trim(),
              Correo: email.trim(),
              Empresa: company.trim() || "No especificada",
              Motivo: inquiryType,
              Mensaje: message.trim(),
              _subject: `[Portafolio Web] ${inquiryType} - ${name.trim()}`,
              _captcha: "false",
            }),
          }
        );

        if (relayRes.ok) {
          const relayData = await relayRes.json().catch(() => null);
          if (
            relayData?.success === "true" ||
            relayData?.success === true
          ) {
            deliveredViaRelay = true;
          }
        }
      } catch {
        // Fallback to direct mailto dispatch below
      }

      if (deliveredViaRelay) {
        setStatus({
          type: "success",
          text: `¡Gracias por escribirme! Tu mensaje fue enviado directamente a ${PROFILE_DATA.email}.`,
        });
      } else {
        // Open pre-populated email client so the message is guaranteed to reach Juan
        const mailtoHref = buildMailtoLink();
        window.location.href = mailtoHref;
        setStatus({
          type: "success",
          text: `¡Listo! Se abrió tu aplicación de correo con el mensaje preparado para enviármelo directamente a ${PROFILE_DATA.email} (también puedes enviarlo con un clic por WhatsApp).`,
        });
      }

      setName("");
      setEmail("");
      setCompany("");
      setMessage("");
    } catch {
      setStatus({
        type: "error",
        text: "Ocurrió un inconveniente al procesar el formulario. Puedes usar el botón de WhatsApp o Abrir en Correo justo debajo.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const buildWhatsAppLink = () => {
    const customText = message.trim()
      ? `Hola Juan Sebastián, soy ${name || "un contacto"} (${
          company || inquiryType
        }). ${message}`
      : "Hola Juan Sebastián, vi tu sitio web de portafolio y me gustaría conversar contigo sobre una oportunidad.";
    return `https://wa.me/${PROFILE_DATA.phoneClean}?text=${encodeURIComponent(
      customText
    )}`;
  };

  const buildMailtoLink = () => {
    const subject = `${inquiryType} - ${name || company || "Contacto desde Portafolio"}`;
    const body = message.trim()
      ? `Hola Juan Sebastián,\n\n${message}\n\nAtentamente,\n${name}\n${email}\n${company}`
      : "Hola Juan Sebastián,\n\nRevisé tu portafolio profesional y me gustaría ponerme en contacto contigo.";
    return `mailto:${PROFILE_DATA.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section
      id="contactame"
      className="relative py-24 overflow-hidden bg-enterprise-grid"
    >
      {/* Ambient Neon Glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-12 left-1/3 w-96 h-96 rounded-full bg-purple-600/20 blur-[150px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-cyan-500/15 blur-[150px]"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/15 border border-purple-500/35 text-purple-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Contáctame</span>
          </div>
          <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Iniciemos una{" "}
            <span className="neon-text-gradient">Conversación Profesional</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            Disponible para oportunidades como{" "}
            <strong className="text-white">Desarrollador Fullstack</strong>,{" "}
            <strong className="text-cyan-300">
              Especialista de Soporte TI e Infraestructura
            </strong>{" "}
            o proyectos de software a medida en Medellín, Antioquia o modalidad
            remota.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Coordinates & Instant Channels */}
          <div className="lg:col-span-5 space-y-4">
            {/* Email Card */}
            <div className="enterprise-card rounded-2xl p-5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-11 h-11 rounded-xl bg-purple-500/15 border border-purple-500/35 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-purple-300" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-slate-400">
                    Correo Electrónico
                  </p>
                  <p className="text-sm font-semibold text-white truncate">
                    {PROFILE_DATA.email}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleCopy("email", PROFILE_DATA.email)}
                className="shrink-0 px-3 py-2 rounded-lg bg-white/5 hover:bg-purple-500/20 border border-white/10 text-xs font-medium text-purple-200 flex items-center gap-1.5 cursor-pointer"
              >
                {copiedField === "email" ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copiado</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copiar</span>
                  </>
                )}
              </button>
            </div>

            {/* Phone / WhatsApp Card */}
            <div className="enterprise-card rounded-2xl p-5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-11 h-11 rounded-xl bg-blue-500/15 border border-blue-500/35 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-cyan-300" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-slate-400">
                    Teléfono y WhatsApp
                  </p>
                  <p className="text-sm font-semibold text-white">
                    {PROFILE_DATA.phone}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleCopy("phone", PROFILE_DATA.phone)}
                className="shrink-0 px-3 py-2 rounded-lg bg-white/5 hover:bg-blue-500/20 border border-white/10 text-xs font-medium text-cyan-200 flex items-center gap-1.5 cursor-pointer"
              >
                {copiedField === "phone" ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copiado</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copiar</span>
                  </>
                )}
              </button>
            </div>

            {/* Location Card */}
            <div className="enterprise-card rounded-2xl p-5 flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-cyan-500/15 border border-cyan-500/35 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-cyan-300" />
              </div>
              <div>
                <p className="text-xs font-medium text-slate-400">
                  Ubicación y Modalidad
                </p>
                <p className="text-sm font-semibold text-white">
                  {PROFILE_DATA.location}
                </p>
                <p className="text-xs text-slate-400 mt-0.5">
                  Presencial (Valle de Aburrá) · Híbrido · Remoto
                </p>
              </div>
            </div>

            {/* Social & CV Action Grid */}
            <div className="enterprise-card rounded-2xl p-5 space-y-3">
              <p className="text-xs font-semibold text-purple-300 uppercase tracking-wider">
                Perfiles Profesionales y Hoja de Vida
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <a
                  href={PROFILE_DATA.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-[#070a15] hover:bg-blue-950/40 border border-white/10 hover:border-blue-400/50 text-xs font-medium text-slate-200 transition-all"
                >
                  <span>LinkedIn (/in/juanstam)</span>
                  <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
                </a>
                <a
                  href={PROFILE_DATA.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-[#070a15] hover:bg-purple-950/40 border border-white/10 hover:border-purple-400/50 text-xs font-medium text-slate-200 transition-all"
                >
                  <span>GitHub (@{PROFILE_DATA.githubUsername})</span>
                  <ExternalLink className="w-3.5 h-3.5 text-purple-400" />
                </a>
              </div>

              <a
                href={PROFILE_DATA.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-purple-950/70 to-blue-950/70 hover:from-purple-900 hover:to-blue-900 border border-purple-500/40 text-xs font-semibold text-purple-100 transition-all"
              >
                <Download className="w-4 h-4 text-cyan-400" />
                <span>Descargar Hoja de Vida en PDF</span>
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7 enterprise-card rounded-2xl p-6 sm:p-8">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
              <div>
                <span className="text-xs font-semibold text-cyan-300">
                  Atención Directa
                </span>
                <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-white mt-0.5">
                  Envíame un Mensaje
                </h3>
              </div>
              <span className="text-xs font-medium px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                Disponible
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Tu Nombre *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ej. Carolina Gómez"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#060913] border border-white/15 focus:border-purple-400 focus:outline-none text-sm text-white placeholder-slate-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Correo Electrónico *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nombre@empresa.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#060913] border border-white/15 focus:border-purple-400 focus:outline-none text-sm text-white placeholder-slate-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Empresa u Organización
                  </label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Nombre de tu compañía o proyecto"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#060913] border border-white/15 focus:border-purple-400 focus:outline-none text-sm text-white placeholder-slate-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Motivo de Contacto
                  </label>
                  <select
                    value={inquiryType}
                    onChange={(e) => setInquiryType(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#060913] border border-white/15 focus:border-purple-400 focus:outline-none text-sm text-white"
                  >
                    <option value="Oportunidad Laboral / Reclutamiento">
                      Oportunidad Laboral / Reclutamiento
                    </option>
                    <option value="Desarrollo de Software Fullstack">
                      Desarrollo de Software Fullstack
                    </option>
                    <option value="Soporte Corporativo TI / Infraestructura">
                      Soporte Corporativo TI / Infraestructura
                    </option>
                    <option value="Consultoría y Alianza Profesional">
                      Consultoría y Alianza Profesional
                    </option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Mensaje o Detalles del Proyecto *
                </label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Cuéntame sobre la vacante, el requerimiento técnico o el proyecto en el que podemos trabajar juntos..."
                  className="w-full px-4 py-3 rounded-xl bg-[#060913] border border-white/15 focus:border-purple-400 focus:outline-none text-sm text-white placeholder-slate-500"
                />
              </div>

              {status.type === "error" && (
                <div className="p-3.5 rounded-xl bg-rose-500/15 border border-rose-500/40 text-xs text-rose-200 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>{status.text}</span>
                </div>
              )}

              {status.type === "success" && (
                <div className="p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-xs sm:text-sm text-emerald-200 space-y-1">
                  <div className="flex items-center gap-2 font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>¡Mensaje enviado exitosamente!</span>
                  </div>
                  <p className="text-slate-300">{status.text}</p>
                </div>
              )}

              {/* Submit + Multi-channel Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-xs sm:text-sm text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-500 hover:to-cyan-500 shadow-[0_0_25px_rgba(139,92,246,0.45)] cursor-pointer disabled:opacity-50 transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>{submitting ? "Enviando..." : "Enviar Mensaje"}</span>
                </button>

                <a
                  href={buildWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium text-xs text-cyan-200 bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-400/40 transition-all"
                >
                  <MessageSquare className="w-4 h-4 text-cyan-400" />
                  <span>Escribir por WhatsApp</span>
                </a>

                <a
                  href={buildMailtoLink()}
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium text-xs text-slate-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 transition-all"
                >
                  <Mail className="w-4 h-4 text-purple-400" />
                  <span>Abrir en Correo</span>
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

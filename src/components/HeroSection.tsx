"use client";

import React, { useState } from "react";
import {
  ArrowRight,
  Download,
  MapPin,
  Mail,
  Phone,
  Shield,
  Code2,
  Server,
  CheckCircle2,
  ExternalLink,
  Layers,
  Sparkles,
  Award,
  Briefcase,
} from "lucide-react";
import { PROFILE_DATA } from "@/data/profileData";

export default function HeroSection() {
  const [activeTab, setActiveTab] = useState<
    "fullstack" | "infra" | "solutions"
  >("fullstack");

  return (
    <section className="relative pt-28 pb-20 lg:pt-36 lg:pb-28 overflow-hidden bg-enterprise-grid border-b border-purple-500/20">
      {/* Ambient Neon Glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/4 w-[34rem] h-[34rem] rounded-full bg-purple-600/20 blur-[140px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-24 right-10 w-[30rem] h-[30rem] rounded-full bg-blue-600/20 blur-[140px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[40rem] h-40 bg-cyan-500/10 blur-[110px]"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Executive Identity */}
          <div className="lg:col-span-7 space-y-6">
            {/* Availability Pill */}
            <div className="inline-flex flex-wrap items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#0d1124]/90 border border-purple-500/40 neon-badge-glow">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-400" />
              </span>
              <span className="text-xs font-medium text-purple-200">
                Disponible para Proyectos y Roles Profesionales
              </span>
              <span className="hidden sm:inline text-white/25">•</span>
              <span className="hidden sm:inline text-xs font-semibold text-cyan-300">
                Antioquia, Colombia
              </span>
            </div>

            {/* Name & Title */}
            <div className="space-y-3">
              <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] text-purple-400">
                Juan Sebastián Tamayo Toro
              </p>
              <h1 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl xl:text-6xl font-bold tracking-tight leading-[1.08] text-white">
                Desarrollo de Software{" "}
                <span className="neon-text-gradient">Fullstack</span> y{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400">
                  Soporte TI Corporativo
                </span>
              </h1>
            </div>

            {/* Tagline */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              {PROFILE_DATA.tagline} Integro el desarrollo con{" "}
              <span className="text-purple-300 font-medium">
                Angular, Node.js, NestJS, Python, Java, PostgreSQL y MongoDB
              </span>{" "}
              con la administración de{" "}
              <span className="text-cyan-300 font-medium">
                Active Directory, Google Workspace, Ciberseguridad y Soporte de
                Nivel 1 y 2
              </span>
              .
            </p>

            {/* Location & Direct Contact Bar */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300 pt-1">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/10">
                <MapPin className="w-3.5 h-3.5 text-purple-400" />
                <span>{PROFILE_DATA.location}</span>
              </div>
              <a
                href={`mailto:${PROFILE_DATA.email}`}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.03] hover:bg-purple-500/15 border border-white/10 hover:border-purple-400/40 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                <span>{PROFILE_DATA.email}</span>
              </a>
              <a
                href={`tel:${PROFILE_DATA.phoneClean}`}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.03] hover:bg-blue-500/15 border border-white/10 hover:border-blue-400/40 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-blue-400" />
                <span>{PROFILE_DATA.phone}</span>
              </a>
            </div>

            {/* Primary CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <a
                href="#trayectoria"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-500 hover:to-cyan-500 shadow-[0_0_30px_rgba(139,92,246,0.45)] hover:shadow-[0_0_35px_rgba(34,211,238,0.55)] transition-all"
              >
                <span>Ver Trayectoria Profesional</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#portafolio"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-sm text-purple-200 bg-[#0e1326] hover:bg-purple-950/50 border border-purple-500/40 hover:border-cyan-400/60 transition-all"
              >
                <Layers className="w-4 h-4 text-cyan-400" />
                <span>Explorar Portafolio</span>
              </a>

              <button
                type="button"
                onClick={() =>
                  window.dispatchEvent(new CustomEvent("open-digital-twin-chat"))
                }
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-sm text-cyan-200 bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-400/45 shadow-[0_0_20px_rgba(34,211,238,0.2)] transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-cyan-300" />
                <span>Hablar con mi Gemelo IA</span>
              </button>

              <a
                href={PROFILE_DATA.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-3.5 rounded-xl font-medium text-xs text-slate-300 hover:text-white bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 transition-all"
              >
                <Download className="w-4 h-4 text-purple-400" />
                <span>Descargar Hoja de Vida</span>
              </a>
            </div>

            {/* External Profile Links */}
            <div className="pt-2 flex flex-wrap items-center gap-4 border-t border-white/10">
              <span className="text-xs font-medium text-slate-400">
                Redes Profesionales:
              </span>
              <a
                href={PROFILE_DATA.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-300 hover:text-cyan-300 transition-colors"
              >
                <span>GitHub ({PROFILE_DATA.githubUsername})</span>
                <ExternalLink className="w-3.5 h-3.5 text-purple-400" />
              </a>
              <span className="text-white/20">•</span>
              <a
                href={PROFILE_DATA.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-300 hover:text-cyan-300 transition-colors"
              >
                <span>LinkedIn (/in/juanstam)</span>
                <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Executive Specialization Showcase */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl bg-[#090c18]/95 border border-purple-500/40 shadow-[0_0_55px_rgba(139,92,246,0.22)] overflow-hidden">
              {/* Showcase Header */}
              <div className="flex items-center justify-between px-5 py-3.5 bg-[#060811] border-b border-white/10">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <span className="text-xs font-semibold text-slate-200 tracking-wide">
                    Resumen de Especialidades
                  </span>
                </div>
                <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-400/30">
                  Perfil Integral
                </span>
              </div>

              {/* Interactive Tabs */}
              <div className="grid grid-cols-3 border-b border-white/10 bg-[#0b0f1f] text-xs font-medium">
                <button
                  type="button"
                  onClick={() => setActiveTab("fullstack")}
                  className={`py-3 px-2 flex items-center justify-center gap-1.5 border-b-2 transition-all cursor-pointer ${
                    activeTab === "fullstack"
                      ? "border-purple-400 text-purple-200 bg-purple-500/10"
                      : "border-transparent text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <Code2 className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                  <span>Fullstack</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("infra")}
                  className={`py-3 px-2 flex items-center justify-center gap-1.5 border-b-2 transition-all cursor-pointer ${
                    activeTab === "infra"
                      ? "border-blue-400 text-blue-200 bg-blue-500/10"
                      : "border-transparent text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <Server className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span>Soporte TI</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("solutions")}
                  className={`py-3 px-2 flex items-center justify-center gap-1.5 border-b-2 transition-all cursor-pointer ${
                    activeTab === "solutions"
                      ? "border-cyan-400 text-cyan-200 bg-cyan-500/10"
                      : "border-transparent text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <Briefcase className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>Soluciones</span>
                </button>
              </div>

              {/* Showcase Body */}
              <div className="p-5 min-h-[330px] flex flex-col justify-between bg-enterprise-subgrid">
                {activeTab === "fullstack" && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-purple-300">
                        Tecnologías de Desarrollo de Software
                      </span>
                      <span className="text-[11px] font-medium text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Experiencia Real
                      </span>
                    </div>

                    <div className="space-y-2.5">
                      {[
                        {
                          title: "Frontend Moderno y Paneles Analíticos",
                          detail: "Angular, Next.js, TypeScript y reportes dinámicos en tiempo real",
                          tag: "Web UI",
                        },
                        {
                          title: "Backend Escalable y Multilenguaje",
                          detail: "Node.js, NestJS, Python, Java y diseño de APIs seguras",
                          tag: "Backend",
                        },
                        {
                          title: "Bases de Datos Relacionales y NoSQL",
                          detail: "PostgreSQL para alto volumen transaccional y MongoDB",
                          tag: "Datos",
                        },
                        {
                          title: "Sistemas de Geolocalización y Rutas",
                          detail: "Leaflet, OpenStreetMap (OSM), Google Maps API y OSRM",
                          tag: "Mapas",
                        },
                      ].map((item) => (
                        <div
                          key={item.title}
                          className="flex items-center justify-between gap-3 p-3 rounded-xl bg-[#060914]/90 border border-purple-500/25"
                        >
                          <div>
                            <p className="text-xs font-semibold text-white">
                              {item.title}
                            </p>
                            <p className="text-[11px] text-slate-400 mt-0.5">
                              {item.detail}
                            </p>
                          </div>
                          <span className="shrink-0 text-[10px] font-medium px-2.5 py-1 rounded-md bg-purple-500/15 text-purple-200 border border-purple-400/30">
                            {item.tag}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "infra" && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-blue-300">
                        Soporte Corporativo e Infraestructura
                      </span>
                      <span className="text-[11px] font-medium text-cyan-300">
                        Cumplimiento ANS e ITIL
                      </span>
                    </div>

                    <div className="space-y-2.5">
                      {[
                        {
                          label: "Active Directory y Permisos NTFS",
                          detail: "Aprovisionamiento, desbloqueo de cuentas y grupos de seguridad",
                          badge: "Nivel 2",
                        },
                        {
                          label: "Administración de Google Workspace",
                          detail: "Licencias, verificación 2FA, transferencia y control en Drive",
                          badge: "Cloud",
                        },
                        {
                          label: "Puntos de Venta (POS) y Facturación DIAN",
                          detail: "Configuración de puertos COM, servicios y sincronización central",
                          badge: "Crítico",
                        },
                        {
                          label: "Máquinas Virtuales, SAP y Hardware Dell",
                          detail: "Monitoreo de VMs, carpetas Pandora SMB y diagnóstico BIOS UEFI",
                          badge: "Infraestructura",
                        },
                      ].map((row) => (
                        <div
                          key={row.label}
                          className="flex items-center justify-between gap-2 p-3 rounded-xl bg-[#060914]/90 border border-blue-500/25"
                        >
                          <div>
                            <p className="text-xs font-semibold text-white">
                              {row.label}
                            </p>
                            <p className="text-[11px] text-slate-400 mt-0.5">
                              {row.detail}
                            </p>
                          </div>
                          <span className="shrink-0 text-[10px] font-medium px-2.5 py-1 rounded-md bg-blue-500/15 text-cyan-300 border border-blue-400/30">
                            {row.badge}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "solutions" && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-cyan-300">
                        Impacto en Empresas y Proyectos
                      </span>
                      <span className="text-[11px] font-medium text-purple-300">
                        Resultados Reales
                      </span>
                    </div>

                    <div className="space-y-3">
                      <div className="p-3.5 rounded-xl bg-[#060914]/90 border border-purple-500/30">
                        <p className="text-xs font-bold text-white">
                          Henkia · Agropecuaria Aliar y Banco Davivienda (IBM)
                        </p>
                        <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
                          Operación de soporte tecnológico de Nivel 1 y Nivel 2,
                          gestión de identidades corporativas, seguridad MFA y
                          continuidad operativa de puntos de venta.
                        </p>
                      </div>

                      <div className="p-3.5 rounded-xl bg-[#060914]/90 border border-blue-500/30">
                        <p className="text-xs font-bold text-white">
                          Aroma Café · Plataforma Encafeina2
                        </p>
                        <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
                          Sistema geoespacial en tiempo real, fidelización con
                          códigos únicos en NestJS y MongoDB, y paneles de
                          métricas en Angular.
                        </p>
                      </div>

                      <div className="p-3.5 rounded-xl bg-[#060914]/90 border border-cyan-500/30">
                        <p className="text-xs font-bold text-white">
                          Distribuidora Monvel · Software CosmeTIC
                        </p>
                        <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
                          Software administrativo web y aplicación móvil de
                          stock con Angular, Node.js y PostgreSQL, eliminando el
                          uso de papel y hojas de cálculo.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Showcase Footer */}
                <div className="pt-3 mt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-purple-400" />
                    Calidad Empresarial y Ciberseguridad
                  </span>
                  <a
                    href="#portafolio"
                    className="text-cyan-300 hover:text-cyan-200 font-medium transition-colors"
                  >
                    Ver repositorios →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Executive Metrics Strip (Clean Natural Titles) */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PROFILE_DATA.heroStats.map((stat, idx) => {
            const IconComponent =
              idx === 0
                ? Briefcase
                : idx === 1
                ? Server
                : idx === 2
                ? Layers
                : Award;

            return (
              <div
                key={stat.category}
                className="enterprise-card rounded-2xl p-5 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between text-xs font-semibold text-purple-300">
                  <span>{stat.category}</span>
                  <IconComponent
                    className={`w-4 h-4 ${
                      idx % 2 === 0 ? "text-purple-400" : "text-cyan-400"
                    }`}
                  />
                </div>
                <p className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-bold text-white mt-2.5">
                  {stat.value}
                </p>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

"use client";

import React, { useState } from "react";
import {
  UserCheck,
  Code2,
  Server,
  Wrench,
  Globe,
  HeartHandshake,
  BrainCircuit,
  ShieldAlert,
  CheckCircle2,
} from "lucide-react";
import { PROFILE_DATA, SKILL_GROUPS } from "@/data/profileData";

export default function AboutSection() {
  const [selectedGroup, setSelectedGroup] = useState<string>("all");

  const visibleSkillGroups =
    selectedGroup === "all"
      ? SKILL_GROUPS
      : SKILL_GROUPS.filter((g) => g.id === selectedGroup);

  return (
    <section
      id="sobre-mi"
      className="relative py-24 border-b border-purple-500/20 overflow-hidden"
    >
      {/* Subtle Background Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 -left-32 w-96 h-96 rounded-full bg-purple-600/15 blur-[130px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-10 -right-32 w-96 h-96 rounded-full bg-blue-600/15 blur-[130px]"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/15 border border-purple-500/35 text-purple-300 text-xs font-semibold">
              <UserCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span>Sobre mí</span>
            </div>
            <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Donde el{" "}
              <span className="neon-text-gradient">Desarrollo de Software</span>{" "}
              se une con la{" "}
              <span className="text-cyan-300">Continuidad Operativa TI</span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-medium text-slate-400">
            Ingeniería de Software, Soporte Corporativo y Atención al Usuario
          </p>
        </div>

        {/* Narrative + Differentiators Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: Executive Bio */}
          <div className="lg:col-span-7 enterprise-card rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-xs font-semibold text-purple-300 uppercase tracking-wider">
                  Perfil Profesional — Juan Sebastián Tamayo Toro
                </span>
                <span className="text-xs font-medium text-cyan-300">
                  Software · Redes · Soporte TI
                </span>
              </div>

              {PROFILE_DATA.aboutParagraphs.map((paragraph, i) => (
                <p
                  key={i}
                  className="text-sm sm:text-base text-slate-300 leading-relaxed"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Key Human & Technical Values */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-purple-950/25 border border-purple-500/30">
                <BrainCircuit className="w-4 h-4 text-purple-400 mb-1.5" />
                <p className="text-xs font-semibold text-white">
                  Pedagogía Técnica
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Capacidad de transformar fallas complejas en guías claras para
                  usuarios bajo presión.
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-blue-950/25 border border-blue-500/30">
                <HeartHandshake className="w-4 h-4 text-blue-400 mb-1.5" />
                <p className="text-xs font-semibold text-white">
                  Inteligencia Emocional
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Control personal, escucha activa y empatía en incidentes
                  críticos o usuarios exigentes.
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-cyan-950/25 border border-cyan-500/30">
                <ShieldAlert className="w-4 h-4 text-cyan-400 mb-1.5" />
                <p className="text-xs font-semibold text-white">
                  Visión Integral
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Dominio desde la base de datos y las APIs hasta el directorio
                  activo, la red y el hardware físico.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Languages & Versatility */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Languages Box */}
            <div className="enterprise-card rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-cyan-400" />
                  <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-white">
                    Idiomas
                  </h3>
                </div>
                <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-400/30">
                  Inglés Técnico Avanzado
                </span>
              </div>

              <div className="space-y-3">
                {PROFILE_DATA.languages.map((lang) => (
                  <div
                    key={lang.name}
                    className="p-3.5 rounded-xl bg-[#070a15] border border-white/10 space-y-1"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-1">
                      <span className="text-sm font-semibold text-white">
                        {lang.name}
                      </span>
                      <span className="text-xs font-medium text-purple-300">
                        {lang.level}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400">{lang.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Hardware & Peripherals Mastery Card */}
            <div className="enterprise-card rounded-2xl p-6 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-purple-300 uppercase tracking-wider">
                    Versatilidad Tecnológica
                  </span>
                  <Wrench className="w-4 h-4 text-purple-400" />
                </div>
                <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-white">
                  Software, Redes y Hardware Físico
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Además del desarrollo de software (Java, Python, Node.js,
                  NestJS, Angular), cuento con experiencia práctica en
                  diagnóstico BIOS UEFI (Dell ePSA), mantenimiento de portátiles
                  y consolas, configuración de periféricos en red SMB, puertos
                  seriales COM, lectores biométricos y ciberseguridad.
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-2">
                {[
                  "Java",
                  "Python",
                  "Node.js",
                  "NestJS",
                  "Angular",
                  "Active Directory",
                  "Google Workspace",
                  "Dell ePSA / UEFI",
                  "Sistemas POS y DIAN",
                  "SAP Básico",
                ].map((chip) => (
                  <span
                    key={chip}
                    className="text-[11px] font-medium px-2.5 py-1 rounded-md bg-white/[0.04] text-slate-200 border border-white/10"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 3 Strategic Enterprise Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PROFILE_DATA.pillars.map((pillar) => {
            const borderClass =
              pillar.accent === "purple"
                ? "neon-border-purple"
                : pillar.accent === "blue"
                ? "neon-border-blue"
                : "neon-border-cyan";

            return (
              <div
                key={pillar.id}
                className={`rounded-2xl bg-[#090c18]/90 p-6 flex flex-col justify-between space-y-5 ${borderClass}`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium px-2.5 py-1 rounded-md bg-white/5 text-purple-300 border border-white/10">
                      {pillar.badge}
                    </span>
                    {pillar.id === "fullstack" ? (
                      <Code2 className="w-5 h-5 text-purple-400" />
                    ) : pillar.id === "infra" ? (
                      <Server className="w-5 h-5 text-blue-400" />
                    ) : (
                      <Wrench className="w-5 h-5 text-cyan-400" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-white">
                      {pillar.title}
                    </h3>
                    <p className="text-xs font-medium text-cyan-300 mt-0.5">
                      {pillar.subtitle}
                    </p>
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/10">
                  {pillar.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-medium px-2.5 py-0.5 rounded-md bg-white/[0.04] text-slate-300 border border-white/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Skill & Stack Matrix */}
        <div className="space-y-6 pt-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold text-white">
                Stacks, Tecnologías y Herramientas
              </h3>
              <p className="text-xs sm:text-sm text-slate-400">
                Selecciona una categoría para explorar las herramientas y el dominio técnico en detalle.
              </p>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              {[
                { id: "all", label: "Todas las Áreas" },
                { id: "dev", label: "Desarrollo y Datos" },
                { id: "infra", label: "Soporte TI e Infraestructura" },
                { id: "hardware", label: "Hardware y Servicio" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSelectedGroup(tab.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                    selectedGroup === tab.id
                      ? "bg-purple-600 text-white shadow-[0_0_16px_rgba(139,92,246,0.45)]"
                      : "bg-[#0d1122] text-slate-300 hover:text-white border border-white/10"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div
            className={`grid grid-cols-1 ${
              visibleSkillGroups.length === 1 ? "lg:grid-cols-1" : "lg:grid-cols-3"
            } gap-6`}
          >
            {visibleSkillGroups.map((group) => (
              <div
                key={group.id}
                className="enterprise-card rounded-2xl p-6 space-y-5"
              >
                <div className="border-b border-white/10 pb-3.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-purple-300">
                      {group.categoryName}
                    </span>
                    <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  </div>
                  <h4 className="font-[family-name:var(--font-display)] text-lg font-bold text-white mt-1">
                    {group.title}
                  </h4>
                  <p className="text-xs text-slate-400">{group.subtitle}</p>
                </div>

                <div className="space-y-4">
                  {group.skills.map((skill) => (
                    <div key={skill.name} className="space-y-1.5">
                      <div className="flex items-center justify-between gap-2 text-xs">
                        <span className="font-medium text-slate-200">
                          {skill.name}
                        </span>
                        <span className="shrink-0 text-[11px] font-medium px-2 py-0.5 rounded bg-white/5 text-cyan-300 border border-white/10">
                          {skill.tag} · {skill.level}%
                        </span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-400"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

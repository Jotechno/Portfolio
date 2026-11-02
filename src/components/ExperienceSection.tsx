"use client";

import React, { useState } from "react";
import {
  Briefcase,
  Calendar,
  MapPin,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Building2,
  Sparkles,
} from "lucide-react";
import { EXPERIENCE_DATA, ExperienceItem } from "@/data/profileData";

export default function ExperienceSection() {
  const [filter, setFilter] = useState<
    "all" | "support-infra" | "fullstack" | "hardware-sales"
  >("all");
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({
    "henkia-n2": true,
    "henkia-ibm-n1": true,
    "aroma-cafe-fullstack": true,
    "monvel-fullstack": true,
    "juegos-fantasia": false,
  });

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredExperience =
    filter === "all"
      ? EXPERIENCE_DATA
      : EXPERIENCE_DATA.filter((item) => item.category === filter);

  return (
    <section
      id="trayectoria"
      className="relative py-24 border-b border-purple-500/20 bg-[#060811]/70 overflow-hidden"
    >
      {/* Ambient Neon Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-24 right-1/4 w-[28rem] h-[28rem] rounded-full bg-purple-600/15 blur-[150px]"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header & Filter Bar */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/15 border border-blue-500/35 text-blue-300 text-xs font-semibold">
              <Briefcase className="w-3.5 h-3.5 text-cyan-400" />
              <span>Trayectoria Profesional</span>
            </div>
            <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Experiencia en{" "}
              <span className="neon-text-gradient">
                Entornos Corporativos y Desarrollo Fullstack
              </span>
            </h2>
            <p className="text-sm sm:text-base text-slate-300">
              Recorrido profesional combinando la creación de plataformas de
              software empresariales con la operación crítica de soporte técnico
              e infraestructura de Nivel 1 y Nivel 2.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {(
              [
                { id: "all", label: "Toda la Experiencia (5)" },
                { id: "support-infra", label: "Soporte TI e Infraestructura" },
                { id: "fullstack", label: "Desarrollo Fullstack" },
                { id: "hardware-sales", label: "Hardware y Ventas" },
              ] as const
            ).map((btn) => (
              <button
                key={btn.id}
                type="button"
                onClick={() => setFilter(btn.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                  filter === btn.id
                    ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-[0_0_20px_rgba(139,92,246,0.45)]"
                    : "bg-[#0c1020] text-slate-300 hover:text-white border border-white/10"
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline List */}
        <div className="relative space-y-6 before:hidden md:before:block before:absolute before:top-4 before:bottom-4 before:left-6 before:w-px before:bg-gradient-to-b before:from-purple-500 via-blue-500 to-cyan-400/30">
          {filteredExperience.map((exp: ExperienceItem) => {
            const isExpanded = expandedIds[exp.id] ?? true;

            return (
              <div
                key={exp.id}
                className="relative md:pl-16 transition-all duration-300"
              >
                {/* Timeline Node Dot */}
                <div className="hidden md:flex absolute left-3 top-7 w-6 h-6 rounded-full bg-[#090d1a] border-2 border-purple-400 items-center justify-center shadow-[0_0_15px_#a855f7]">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                </div>

                {/* Experience Card */}
                <div className="enterprise-card rounded-2xl p-6 sm:p-8 space-y-6">
                  {/* Top Row: Role, Company, Dates */}
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-medium px-3 py-0.5 rounded-full bg-purple-500/15 text-purple-300 border border-purple-500/35">
                          {exp.categoryLabel}
                        </span>
                        {exp.status && (
                          <span className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-400/40">
                            <Sparkles className="w-3 h-3" />
                            {exp.status}
                          </span>
                        )}
                      </div>

                      <h3 className="font-[family-name:var(--font-display)] text-xl sm:text-2xl font-bold text-white">
                        {exp.role}
                      </h3>

                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-sm text-slate-300">
                        <span className="inline-flex items-center gap-1.5 font-semibold text-purple-200">
                          <Building2 className="w-4 h-4 text-purple-400" />
                          {exp.company}
                        </span>
                        <span className="text-cyan-300 font-medium">
                          — {exp.clientOrProject}
                        </span>
                      </div>
                    </div>

                    {/* Period & Location Badges */}
                    <div className="flex flex-wrap lg:flex-col items-start lg:items-end gap-2 shrink-0">
                      <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#070a15] border border-purple-500/30 text-xs font-medium text-purple-200">
                        <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{exp.period}</span>
                      </div>
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/[0.03] border border-white/10 text-xs text-slate-400">
                        <MapPin className="w-3.5 h-3.5 text-purple-400" />
                        <span>{exp.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Executive Summary */}
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed border-l-2 border-purple-500/60 pl-4">
                    {exp.summary}
                  </p>

                  {/* Metrics Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {exp.metrics.map((metric) => (
                      <div
                        key={metric.label}
                        className="p-3.5 rounded-xl bg-[#070a15]/90 border border-white/10 flex items-center justify-between gap-2"
                      >
                        <span className="text-xs text-slate-400">
                          {metric.label}
                        </span>
                        <span className="text-xs font-semibold text-cyan-300 text-right">
                          {metric.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Expandable Detailed Achievements */}
                  {isExpanded && (
                    <div className="space-y-3 pt-3 border-t border-white/10">
                      <p className="text-xs font-semibold text-purple-300 uppercase tracking-wider">
                        Responsabilidades y Logros Destacados
                      </p>
                      <ul className="grid grid-cols-1 gap-2.5">
                        {exp.highlights.map((bullet, bIdx) => (
                          <li
                            key={bIdx}
                            className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed"
                          >
                            <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Footer: Tech Stack & Expand Toggle */}
                  <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-1.5">
                      {exp.stack.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs font-medium px-2.5 py-1 rounded-md bg-purple-500/10 text-purple-200 border border-purple-500/25"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleExpand(exp.id)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-300 hover:text-white self-start sm:self-auto cursor-pointer"
                    >
                      <span>
                        {isExpanded
                          ? "Ocultar detalles"
                          : `Ver ${exp.highlights.length} responsabilidades`}
                      </span>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

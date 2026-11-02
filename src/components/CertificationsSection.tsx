"use client";

import React, { useState } from "react";
import {
  Award,
  GraduationCap,
  ShieldCheck,
  Network,
  Database,
  Cpu,
  CheckCircle2,
} from "lucide-react";
import { CERTIFICATIONS_DATA } from "@/data/profileData";

export default function CertificationsSection() {
  const [selectedDomain, setSelectedDomain] = useState<string>("all");

  const domains = [
    "all",
    "Desarrollo Fullstack",
    "Ciberseguridad",
    "Redes e Infraestructura",
    "Hardware y Soporte",
    "Ciencia de Datos",
  ];

  const visibleCerts =
    selectedDomain === "all"
      ? CERTIFICATIONS_DATA
      : CERTIFICATIONS_DATA.filter((c) => c.domain === selectedDomain);

  const getDomainIcon = (domain: string) => {
    switch (domain) {
      case "Desarrollo Fullstack":
        return <GraduationCap className="w-5 h-5 text-purple-400" />;
      case "Ciberseguridad":
        return <ShieldCheck className="w-5 h-5 text-cyan-400" />;
      case "Redes e Infraestructura":
        return <Network className="w-5 h-5 text-blue-400" />;
      case "Ciencia de Datos":
        return <Database className="w-5 h-5 text-purple-300" />;
      default:
        return <Cpu className="w-5 h-5 text-cyan-300" />;
    }
  };

  return (
    <section
      id="certificaciones"
      className="relative py-24 border-b border-purple-500/20 bg-[#060811]/60 overflow-hidden"
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/15 border border-cyan-400/35 text-cyan-300 text-xs font-semibold">
              <Award className="w-3.5 h-3.5 text-purple-400" />
              <span>Educación y Certificados</span>
            </div>
            <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Formación en{" "}
              <span className="neon-text-gradient">
                Ingeniería de Software, Redes y Ciberseguridad
              </span>
            </h2>
            <p className="text-sm sm:text-base text-slate-300">
              Respaldo académico como{" "}
              <strong className="text-white">
                Tecnólogo en Análisis y Desarrollo de Software (SENA)
              </strong>{" "}
              complementado con certificaciones especializadas de{" "}
              <strong className="text-cyan-300">
                CISCO Networking Academy
              </strong>{" "}
              y <strong className="text-purple-300">UDEMY</strong>.
            </p>
          </div>

          {/* Domain Filters */}
          <div className="flex flex-wrap gap-2">
            {domains.map((dom) => (
              <button
                key={dom}
                type="button"
                onClick={() => setSelectedDomain(dom)}
                className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                  selectedDomain === dom
                    ? "bg-purple-600 text-white shadow-[0_0_16px_rgba(168,85,247,0.45)]"
                    : "bg-[#0c1020] text-slate-300 hover:text-white border border-white/10"
                }`}
              >
                {dom === "all" ? "Todos los Certificados (7)" : dom}
              </button>
            ))}
          </div>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {visibleCerts.map((cert) => {
            const isMainDegree = cert.id === "sena-adso";
            return (
              <div
                key={cert.id}
                className={`enterprise-card rounded-2xl p-6 flex flex-col justify-between space-y-4 ${
                  isMainDegree
                    ? "md:col-span-2 lg:col-span-2 neon-border-purple"
                    : ""
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/5 text-purple-300 border border-white/10">
                      {cert.issuer}
                    </span>
                    <span className="text-xs font-medium text-cyan-300">
                      {cert.date}
                    </span>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="w-11 h-11 rounded-xl bg-[#0e1326] border border-purple-500/30 flex items-center justify-center shrink-0 mt-0.5">
                      {getDomainIcon(cert.domain)}
                    </div>
                    <div>
                      <h3 className="font-[family-name:var(--font-display)] text-lg sm:text-xl font-bold text-white leading-snug">
                        {cert.title}
                      </h3>
                      <p className="text-xs font-medium text-purple-300 mt-1">
                        Área: {cert.domain}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-1">
                    {cert.skills}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                  <span>{isMainDegree ? "Título Tecnológico" : "Certificación"}</span>
                  <span className="inline-flex items-center gap-1.5 text-emerald-400 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Acreditado
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

"use client";

import React from "react";
import { Layers, ArrowUp, ExternalLink, Download } from "lucide-react";
import { PROFILE_DATA } from "@/data/profileData";

export default function Footer() {
  return (
    <footer className="border-t border-purple-500/25 bg-[#04050a] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div className="space-y-2">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-purple-600/20 border border-purple-500/40 flex items-center justify-center">
              <Layers className="w-4 h-4 text-purple-300" />
            </div>
            <span className="font-[family-name:var(--font-display)] font-bold text-white text-base">
              {PROFILE_DATA.name}
            </span>
          </div>
          <p className="text-xs text-slate-400 max-w-md">
            {PROFILE_DATA.title} · {PROFILE_DATA.location}
          </p>
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} Juan Sebastián Tamayo Toro. Todos los derechos reservados.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-xs font-medium">
          <a
            href={PROFILE_DATA.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white/[0.03] hover:bg-purple-500/15 border border-white/10 text-slate-300 hover:text-white transition-all"
          >
            <span>GitHub</span>
            <ExternalLink className="w-3.5 h-3.5 text-purple-400" />
          </a>

          <a
            href={PROFILE_DATA.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white/[0.03] hover:bg-blue-500/15 border border-white/10 text-slate-300 hover:text-white transition-all"
          >
            <span>LinkedIn</span>
            <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
          </a>

          <a
            href={PROFILE_DATA.cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white/[0.03] hover:bg-cyan-500/15 border border-white/10 text-slate-300 hover:text-white transition-all"
          >
            <Download className="w-3.5 h-3.5 text-cyan-400" />
            <span>Hoja de Vida PDF</span>
          </a>

          <a
            href="#"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-purple-600/20 hover:bg-purple-600/35 border border-purple-500/40 text-purple-200 transition-all"
            title="Volver arriba"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            <span>Subir</span>
          </a>
        </div>
      </div>
    </footer>
  );
}

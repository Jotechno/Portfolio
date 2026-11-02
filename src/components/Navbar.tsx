"use client";

import React, { useState, useEffect } from "react";
import {
  Download,
  Menu,
  X,
  ShieldCheck,
  Sparkles,
  ArrowUpRight,
  Layers,
} from "lucide-react";
import { PROFILE_DATA } from "@/data/profileData";

const NAV_LINKS = [
  { href: "#sobre-mi", label: "Sobre mí" },
  { href: "#trayectoria", label: "Trayectoria profesional" },
  { href: "#portafolio", label: "Portafolio" },
  { href: "#certificaciones", label: "Certificados" },
  { href: "#contactame", label: "Contáctame" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#05060b]/85 backdrop-blur-xl border-b border-purple-500/25 shadow-[0_8px_32px_rgba(0,0,0,0.65)] py-3"
          : "bg-transparent border-b border-white/5 py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Brand Identity */}
        <a
          href="#"
          className="group flex items-center gap-3 focus:outline-none"
        >
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600/35 via-blue-600/25 to-cyan-500/25 border border-purple-500/45 group-hover:border-cyan-400/70 transition-all duration-300 shadow-[0_0_20px_rgba(139,92,246,0.28)]">
            <Layers className="w-5 h-5 text-purple-300 group-hover:text-cyan-300 transition-colors" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]" />
          </div>
          <div className="flex flex-col">
            <span className="font-[family-name:var(--font-display)] font-bold tracking-tight text-white text-base sm:text-lg leading-tight">
              Juan Sebastián Tamayo
            </span>
            <span className="text-[11px] text-purple-300/90 hidden sm:inline">
              Desarrollo de Software y Soporte TI
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 bg-[#0b0e1a]/85 border border-white/10 rounded-full px-3 py-1.5 backdrop-blur-md">
          {NAV_LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="px-4 py-1.5 rounded-full text-xs font-medium text-slate-300 hover:text-white hover:bg-purple-500/20 transition-all"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-2.5">
          <a
            href={PROFILE_DATA.cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0d1021] hover:bg-blue-950/40 border border-blue-500/30 hover:border-cyan-400/60 text-xs font-medium text-blue-200 transition-all"
          >
            <Download className="w-3.5 h-3.5 text-cyan-400" />
            <span>Descargar CV</span>
          </a>

          <a
            href="#contactame"
            className="relative inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-500 hover:to-cyan-500 shadow-[0_0_20px_rgba(139,92,246,0.4)] hover:shadow-[0_0_25px_rgba(34,211,238,0.5)] transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Contáctame</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center lg:hidden">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            type="button"
            className="p-2 rounded-xl bg-[#0d1021] border border-white/15 text-slate-200"
            aria-label="Abrir menú de navegación"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#070913]/95 backdrop-blur-2xl border-b border-purple-500/30 px-4 pt-3 pb-6 mt-3 space-y-3">
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-purple-950/25 border border-purple-500/20 text-xs text-purple-200">
            <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>Disponible en Antioquia, Colombia y Remoto</span>
          </div>
          <div className="grid grid-cols-1 gap-1.5">
            {NAV_LINKS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-white/[0.03] hover:bg-purple-500/15 border border-white/5 text-sm font-medium text-slate-200"
              >
                <span>{item.label}</span>
                <ArrowUpRight className="w-4 h-4 text-purple-400" />
              </a>
            ))}
          </div>
          <div className="pt-2 flex flex-col sm:flex-row gap-2">
            <a
              href={PROFILE_DATA.cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#101426] border border-blue-500/30 text-xs font-semibold text-blue-200"
            >
              <Download className="w-4 h-4 text-cyan-400" />
              Descargar CV (PDF)
            </a>
            <a
              href="#contactame"
              onClick={() => setMobileOpen(false)}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-xs font-semibold text-white"
            >
              <Sparkles className="w-4 h-4" />
              Contáctame
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

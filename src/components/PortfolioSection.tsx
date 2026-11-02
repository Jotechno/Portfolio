"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  FolderGit2,
  ExternalLink,
  RefreshCw,
  Search,
  Star,
  GitFork,
  Calendar,
  Code2,
  Globe,
  AlertCircle,
} from "lucide-react";
import {
  PROFILE_DATA,
  type GitHubRepoItem,
  type GitHubUserProfile,
} from "@/data/profileData";

function formatRepoTitle(rawName: string): string {
  return rawName
    .replace(/[-_]+/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function formatSpanishDate(isoDate: string): string {
  try {
    return new Intl.DateTimeFormat("es-CO", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(new Date(isoDate));
  } catch {
    return isoDate;
  }
}

function getLanguageBadgeStyle(language: string | null) {
  switch (language) {
    case "JavaScript":
      return {
        dot: "bg-amber-400 shadow-[0_0_8px_#fbbf24]",
        pill: "bg-amber-500/15 text-amber-200 border-amber-400/35",
      };
    case "TypeScript":
      return {
        dot: "bg-blue-400 shadow-[0_0_8px_#60a5fa]",
        pill: "bg-blue-500/15 text-blue-200 border-blue-400/35",
      };
    case "Java":
      return {
        dot: "bg-purple-400 shadow-[0_0_8px_#c084fc]",
        pill: "bg-purple-500/15 text-purple-200 border-purple-400/35",
      };
    case "Python":
      return {
        dot: "bg-cyan-400 shadow-[0_0_8px_#22d3ee]",
        pill: "bg-cyan-500/15 text-cyan-200 border-cyan-400/35",
      };
    default:
      return {
        dot: "bg-indigo-400 shadow-[0_0_8px_#818cf8]",
        pill: "bg-indigo-500/15 text-indigo-200 border-indigo-400/35",
      };
  }
}

export default function PortfolioSection() {
  const [repos, setRepos] = useState<GitHubRepoItem[]>([]);
  const [githubUser, setGithubUser] = useState<GitHubUserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [selectedLanguage, setSelectedLanguage] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const fetchRepositories = useCallback(async (isManualRefresh = false) => {
    if (isManualRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }
    setError(null);

    try {
      let data: {
        ok?: boolean;
        error?: string;
        repos?: GitHubRepoItem[];
        user?: GitHubUserProfile | null;
      } | null = null;

      // 1. Primary: Query live GitHub REST API directly so newly created/updated repos appear immediately
      try {
        const [reposRes, userRes] = await Promise.all([
          fetch(
            `https://api.github.com/users/${PROFILE_DATA.githubUsername}/repos?sort=updated&direction=desc&per_page=100`,
            { cache: "no-store" }
          ),
          fetch(
            `https://api.github.com/users/${PROFILE_DATA.githubUsername}`,
            { cache: "no-store" }
          ),
        ]);

        if (reposRes.ok) {
          const rawRepos = (await reposRes.json()) as GitHubRepoItem[];
          const rawUser = userRes.ok
            ? ((await userRes.json()) as GitHubUserProfile)
            : null;

          const publicOwnRepos = rawRepos
            .filter((r) => !r.fork)
            .sort(
              (a, b) =>
                new Date(b.pushed_at || b.updated_at).getTime() -
                new Date(a.pushed_at || a.updated_at).getTime()
            );

          data = {
            ok: true,
            repos: publicOwnRepos,
            user: rawUser,
          };
        }
      } catch {
        // Fallback to pre-rendered / local API snapshot below
      }

      // 2. Fallback: Use internal / pre-rendered endpoint if GitHub API is unreachable or rate-limited
      if (!data || !data.ok) {
        const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
        const fallbackRes = await fetch(`${basePath}/api/github`, {
          cache: "no-store",
        }).catch(() => null);

        if (fallbackRes && fallbackRes.ok) {
          data = await fallbackRes.json().catch(() => null);
        }
      }

      if (!data || !data.ok || !data.repos) {
        setError(
          data?.error ||
            "No fue posible cargar los repositorios públicos en este momento."
        );
      } else {
        setRepos(data.repos || []);
        setGithubUser(data.user || null);
      }
    } catch {
      setError(
        "No se pudo establecer conexión para consultar tus repositorios de GitHub."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.removeItem("jstt_custom_future_projects_v1");
    } catch {
      // Ignore storage access errors
    }
    fetchRepositories(false);
  }, [fetchRepositories]);

  const availableLanguages = useMemo(() => {
    const langs = new Set<string>();
    repos.forEach((r) => {
      if (r.language) langs.add(r.language);
    });
    return Array.from(langs);
  }, [repos]);

  const filteredRepos = useMemo(() => {
    return repos.filter((repo) => {
      const matchesLang =
        selectedLanguage === "all" ||
        (selectedLanguage === "other"
          ? !repo.language
          : repo.language === selectedLanguage);

      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        repo.name.toLowerCase().includes(q) ||
        (repo.description && repo.description.toLowerCase().includes(q)) ||
        (repo.language && repo.language.toLowerCase().includes(q)) ||
        (repo.topics &&
          repo.topics.some((topic) => topic.toLowerCase().includes(q)));

      return matchesLang && matchesSearch;
    });
  }, [repos, selectedLanguage, searchQuery]);

  return (
    <section
      id="portafolio"
      className="relative py-24 border-b border-purple-500/20 overflow-hidden"
    >
      {/* Background Neon Accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/4 left-10 w-96 h-96 rounded-full bg-blue-600/15 blur-[140px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-10 right-10 w-96 h-96 rounded-full bg-purple-600/15 blur-[140px]"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/15 border border-purple-500/35 text-purple-300 text-xs font-semibold">
              <FolderGit2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>Portafolio Dinámico</span>
            </div>
            <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Mis Repositorios{" "}
              <span className="neon-text-gradient">Públicos en GitHub</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-300">
              Conectado en tiempo real con mi cuenta oficial{" "}
              <strong className="text-white">
                @{PROFILE_DATA.githubUsername}
              </strong>
              . Cualquier proyecto público nuevo o actualización en GitHub se
              refleja automáticamente aquí.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => fetchRepositories(true)}
              disabled={loading || refreshing}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0d1122] hover:bg-purple-950/50 border border-purple-500/35 text-xs font-semibold text-purple-200 transition-all cursor-pointer disabled:opacity-50"
            >
              <RefreshCw
                className={`w-3.5 h-3.5 text-cyan-400 ${
                  refreshing ? "animate-spin" : ""
                }`}
              />
              <span>
                {refreshing ? "Sincronizando..." : "Actualizar repositorios"}
              </span>
            </button>

            <a
              href={PROFILE_DATA.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-cyan-500 text-xs font-semibold text-white shadow-[0_0_20px_rgba(139,92,246,0.4)] transition-all"
            >
              <span>Ver Perfil en GitHub</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Live GitHub Profile Banner */}
        {githubUser && (
          <div className="enterprise-card rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={githubUser.avatar_url}
                alt={githubUser.name || githubUser.login}
                className="w-14 h-14 rounded-2xl border-2 border-purple-500/50 shadow-[0_0_20px_rgba(168,85,247,0.35)] object-cover"
              />
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-white">
                    {githubUser.name || PROFILE_DATA.name}
                  </h3>
                  <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-purple-500/15 text-purple-300 border border-purple-500/30">
                    @{githubUser.login}
                  </span>
                </div>
                {githubUser.bio && (
                  <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
                    {githubUser.bio}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-4 self-stretch sm:self-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-white/10">
              <div className="px-4 py-2 rounded-xl bg-[#070a15] border border-white/10 text-center">
                <p className="font-[family-name:var(--font-display)] text-xl font-bold text-cyan-300">
                  {repos.length}
                </p>
                <p className="text-[11px] text-slate-400">
                  Repositorios Públicos
                </p>
              </div>
              <div className="px-4 py-2 rounded-xl bg-[#070a15] border border-white/10 text-center">
                <p className="font-[family-name:var(--font-display)] text-xl font-bold text-purple-300">
                  {availableLanguages.length || 1}+
                </p>
                <p className="text-[11px] text-slate-400">Lenguajes</p>
              </div>
            </div>
          </div>
        )}

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setSelectedLanguage("all")}
              className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                selectedLanguage === "all"
                  ? "bg-purple-600 text-white shadow-[0_0_18px_rgba(168,85,247,0.45)]"
                  : "bg-[#0b0f1e] text-slate-300 hover:text-white border border-white/10"
              }`}
            >
              Todos ({repos.length})
            </button>

            {availableLanguages.map((lang) => (
              <button
                key={lang}
                type="button"
                onClick={() => setSelectedLanguage(lang)}
                className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                  selectedLanguage === lang
                    ? "bg-purple-600 text-white shadow-[0_0_18px_rgba(168,85,247,0.45)]"
                    : "bg-[#0b0f1e] text-slate-300 hover:text-white border border-white/10"
                }`}
              >
                {lang}
              </button>
            ))}

            {repos.some((r) => !r.language) && (
              <button
                type="button"
                onClick={() => setSelectedLanguage("other")}
                className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                  selectedLanguage === "other"
                    ? "bg-purple-600 text-white shadow-[0_0_18px_rgba(168,85,247,0.45)]"
                    : "bg-[#0b0f1e] text-slate-300 hover:text-white border border-white/10"
                }`}
              >
                Otros / Configuración
              </button>
            )}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-purple-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar repositorio..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#090d1b] border border-white/15 focus:border-purple-400 focus:outline-none text-xs sm:text-sm text-white placeholder-slate-400"
            />
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((skeleton) => (
              <div
                key={skeleton}
                className="enterprise-card rounded-2xl p-6 space-y-4 animate-pulse"
              >
                <div className="flex justify-between">
                  <div className="h-5 w-24 rounded bg-white/10" />
                  <div className="h-5 w-20 rounded bg-white/10" />
                </div>
                <div className="h-6 w-3/4 rounded bg-white/15" />
                <div className="h-14 w-full rounded bg-white/10" />
                <div className="h-9 w-full rounded-xl bg-white/10" />
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="enterprise-card rounded-2xl p-8 text-center space-y-4">
            <AlertCircle className="w-8 h-8 text-rose-400 mx-auto" />
            <p className="text-sm text-slate-200">{error}</p>
            <div className="flex justify-center gap-3">
              <button
                type="button"
                onClick={() => fetchRepositories(true)}
                className="px-4 py-2 rounded-xl bg-purple-600 text-xs font-semibold text-white cursor-pointer"
              >
                Reintentar conexión
              </button>
              <a
                href={PROFILE_DATA.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-white/10 text-xs font-medium text-slate-200"
              >
                Abrir GitHub directamente
              </a>
            </div>
          </div>
        )}

        {/* Dynamic Public Repositories Grid */}
        {!loading && !error && (
          <>
            {filteredRepos.length === 0 ? (
              <div className="enterprise-card rounded-2xl p-10 text-center space-y-2">
                <p className="text-base font-semibold text-white">
                  No se encontraron repositorios con ese criterio
                </p>
                <p className="text-xs text-slate-400">
                  Prueba limpiando el filtro o la búsqueda para ver todos tus proyectos públicos.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRepos.map((repo) => {
                  const langStyle = getLanguageBadgeStyle(repo.language);
                  const hasExternalDemo =
                    Boolean(repo.homepage) &&
                    repo.homepage !== PROFILE_DATA.github &&
                    !repo.homepage
                      ?.toLowerCase()
                      .endsWith(`/${PROFILE_DATA.githubUsername.toLowerCase()}`);

                  return (
                    <article
                      key={repo.id}
                      className="enterprise-card rounded-2xl p-6 flex flex-col justify-between space-y-6"
                    >
                      <div className="space-y-4">
                        {/* Top Metadata Row */}
                        <div className="flex items-center justify-between gap-2">
                          <span
                            className={`inline-flex items-center gap-2 text-xs font-medium px-3 py-1 rounded-full border ${langStyle.pill}`}
                          >
                            <span
                              className={`w-2 h-2 rounded-full ${langStyle.dot}`}
                            />
                            {repo.language || "Repositorio General"}
                          </span>

                          <div className="flex items-center gap-3 text-xs text-slate-400">
                            <span
                              className="inline-flex items-center gap-1"
                              title="Estrellas en GitHub"
                            >
                              <Star className="w-3.5 h-3.5 text-amber-400" />
                              {repo.stargazers_count}
                            </span>
                            <span
                              className="inline-flex items-center gap-1"
                              title="Forks en GitHub"
                            >
                              <GitFork className="w-3.5 h-3.5 text-cyan-400" />
                              {repo.forks_count}
                            </span>
                          </div>
                        </div>

                        {/* Title & Exact Repo Name */}
                        <div>
                          <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-white leading-snug">
                            {formatRepoTitle(repo.name)}
                          </h3>
                          <p className="text-xs text-purple-300/90 mt-0.5 flex items-center gap-1.5">
                            <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                            <span>{repo.name}</span>
                          </p>
                        </div>

                        {/* Description */}
                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                          {repo.description ||
                            `Proyecto de código público desarrollado en ${
                              repo.language || "software"
                            } y alojado en mi repositorio oficial de GitHub.`}
                        </p>

                        {/* Topics if available */}
                        {repo.topics && repo.topics.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {repo.topics.map((topic) => (
                              <span
                                key={topic}
                                className="text-[11px] font-medium px-2.5 py-0.5 rounded-md bg-white/[0.04] text-cyan-200 border border-white/10"
                              >
                                {topic}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Footer: Dates & Action Buttons */}
                      <div className="space-y-4 pt-4 border-t border-white/10">
                        <div className="flex items-center justify-between text-xs text-slate-400">
                          <span className="inline-flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-purple-400" />
                            Actualizado:{" "}
                            {formatSpanishDate(
                              repo.pushed_at || repo.updated_at
                            )}
                          </span>
                          <span className="text-emerald-400 font-medium">
                            Público
                          </span>
                        </div>

                        <div className="flex items-center gap-2.5">
                          <a
                            href={repo.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600/90 to-blue-600/90 hover:from-purple-500 hover:to-cyan-500 text-xs font-semibold text-white shadow-[0_0_18px_rgba(139,92,246,0.3)] transition-all"
                          >
                            <span>Ver en GitHub</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>

                          {hasExternalDemo && repo.homepage && (
                            <a
                              href={repo.homepage}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-400/40 text-xs font-semibold text-cyan-200 transition-all"
                            >
                              <Globe className="w-3.5 h-3.5" />
                              <span>Demo</span>
                            </a>
                          )}
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

export const dynamic = "force-static";
export const revalidate = 120;

import { NextResponse } from "next/server";
import type { GitHubRepoItem, GitHubUserProfile } from "@/data/profileData";

const GITHUB_USERNAME = "Jotechno";

export async function GET() {
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "User-Agent": "JSTT-Portfolio-App",
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, {
        headers,
        next: { revalidate: 120 },
      }),
      fetch(
        `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&direction=desc&per_page=100`,
        {
          headers,
          next: { revalidate: 120 },
        }
      ),
    ]);

    if (!reposRes.ok) {
      return NextResponse.json(
        {
          ok: false,
          error: `No fue posible consultar GitHub en este momento (estado ${reposRes.status}).`,
        },
        { status: reposRes.status }
      );
    }

    const reposData = (await reposRes.json()) as GitHubRepoItem[];
    const userData = userRes.ok
      ? ((await userRes.json()) as GitHubUserProfile)
      : null;

    // Keep public own repositories sorted by most recent update
    const publicRepos = reposData
      .filter((repo) => !repo.fork)
      .sort(
        (a, b) =>
          new Date(b.pushed_at || b.updated_at).getTime() -
          new Date(a.pushed_at || a.updated_at).getTime()
      );

    return NextResponse.json({
      ok: true,
      user: userData,
      repos: publicRepos,
      fetchedAt: new Date().toISOString(),
    });
  } catch {
    return NextResponse.json(
      {
        ok: false,
        error: "Error de conexión al sincronizar los repositorios públicos de GitHub.",
      },
      { status: 500 }
    );
  }
}


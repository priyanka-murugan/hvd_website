import Link from "next/link";
import React from "react";
import { allProjects } from "contentlayer/generated";
import { Navigation } from "../components/nav";
import { Card } from "../components/card";
import { Article } from "./article";
import { Redis } from "@upstash/redis";
import { Eye } from "lucide-react";

const redis = Redis.fromEnv();
export const revalidate = 60;

/* ✅ Server-Side Timer Calculation */
const getElapsedTime = () => {
  const startDate = new Date("December 14, 2024 19:00:00").getTime();
  const now = Date.now();
  const diff = now - startDate;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return { days, hours, minutes, seconds };
};

export default async function ProjectsPage() {
  const keys = allProjects.map((p) => `pageviews:projects:${p.slug}`);
  const values = await redis.mget<number[]>(...keys);

  const views = allProjects.reduce((acc, project, i) => {
    acc[project.slug] = values?.[i] ?? 0;
    return acc;
  }, {} as Record<string, number>);

  const featured = allProjects.find((p) => p.slug === "iconic-dates")!;
  const top2 = allProjects.find((p) => p.slug === "crossword")!;
  const top3 = allProjects.find((p) => p.slug === "letter-wall")!;

  // ✅ Get elapsed time at build time
  const elapsedTime = getElapsedTime();

  return (
    <div className="relative pb-16">
      <Navigation />
      <div className="px-6 pt-20 mx-auto max-w-7xl lg:px-8 md:pt-24 lg:pt-32">
        <div className="max-w-2xl mx-auto lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
            Gifts
          </h2>
          <p className="mt-4 text-zinc-400">
            I made these projects because they are meaningful to us in some way.
          </p>
        </div>

        {/* ✅ Space & Line after "Gifts" (Preserved as requested) */}
        <div className="w-full h-px bg-zinc-800 my-6" />

        {/* ✅ Timer Component (Rendered on Server) */}
        <Card>
          <div className="p-4 md:p-8 text-center">
            <h3 className="text-xl font-bold text-zinc-100 mb-4">
              Time Since We Met, And So Many More To Go ❤️ 
            </h3>
            <div className="grid grid-cols-4 gap-4 text-center text-white">
              {Object.entries(elapsedTime).map(([unit, value]) => (
                <div key={unit} className="flex flex-col items-center">
                  <span className="text-4xl font-bold">
                    {value.toString().padStart(2, "0")}
                  </span>
                  <span className="text-sm uppercase text-zinc-500">{unit}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* ✅ Featured Project */}
        <div className="grid grid-cols-1 gap-8 mx-auto lg:grid-cols-2 mt-8">
          <Card>
            <Link href={`/projects/${featured.slug}`}>
              <article className="relative w-full h-full p-4 md:p-8">
                <div className="flex items-center justify-between gap-2">
                  <div className="text-xs text-zinc-100">
                    {featured.date ? (
                      <time dateTime={new Date(featured.date).toISOString()}>
                        {Intl.DateTimeFormat(undefined, {
                          dateStyle: "medium",
                        }).format(new Date(featured.date))}
                      </time>
                    ) : (
                      <span>SOON</span>
                    )}
                  </div>
                  <span className="flex items-center gap-1 text-xs text-zinc-500">
                    <Eye className="w-4 h-4" />{" "}
                    {Intl.NumberFormat("en-US", { notation: "compact" }).format(
                      views[featured.slug] ?? 0,
                    )}
                  </span>
                </div>

                <h2
                  id="featured-post"
                  className="mt-4 text-3xl font-bold text-zinc-100 group-hover:text-white sm:text-4xl font-display"
                >
                  {featured.title}
                </h2>
                <p className="mt-4 leading-8 duration-150 text-zinc-400 group-hover:text-zinc-300">
                  {featured.description}
                </p>
              </article>
            </Link>
          </Card>

          {/* ✅ Top 2 Projects */}
          <div className="flex flex-col w-full gap-8 mx-auto">
            {[top2, top3].map((project) => (
              <Card key={project.slug}>
                <Article project={project} views={views[project.slug] ?? 0} />
              </Card>
            ))}
          </div>
        </div>

        {/* ✅ Spotify Playlist Embed */}
        <p className="text-2xl font-bold tracking-tight text-zinc-100 sm:text-2xl mt-8 text-center">
          Here's the playlist you made for me in the very first week :P
        </p>
        <div className="w-full flex justify-center mt-4">
          <iframe
            style={{ borderRadius: "12px" }}
            src="https://open.spotify.com/embed/playlist/0uS5a1D6yNm3ih2tabus68?utm_source=generator"
            width="100%"
            height="352"
            frameBorder="0"
            allowFullScreen
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}

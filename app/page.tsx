import Link from "next/link";
import React from "react";
import Particles from "./components/particles";

export const dynamic = 'force-dynamic';

const navigation = [
  { name: "Click me! 😙", href: "/projects" },
];

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen overflow-hidden bg-gradient-to-tl from-black via-zinc-600/20 to-black relative">
      
      {/* Top Navigation */}
      <nav className="my-8 animate-fade-in">
        <ul className="flex items-center justify-center gap-6">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-semibold tracking-wide uppercase duration-500 text-zinc-400 hover:text-zinc-200"
            >
              {item.name}
            </Link>
          ))}
        </ul>
      </nav>

      {/* Animated Glow Line */}
      <div className="hidden w-screen h-px animate-glow md:block animate-fade-left bg-gradient-to-r from-transparent via-zinc-300/50 to-transparent" />

      {/* Background Particles Effect */}
      <Particles
        className="absolute inset-0 -z-10 animate-fade-in"
        quantity={120}
      />

      {/* Main Heading with Glow Effect */}
      <h1 className="py-3.5 px-1 z-10 text-4xl sm:text-4xl md:text-6xl text-transparent duration-1000 bg-white cursor-default text-edge-outline animate-title font-display bg-clip-text whitespace-nowrap glow">
        Happy Valentine's Day, Vishaal! ❤️
      </h1>

      {/* Another Glow Line */}
      <div className="hidden w-screen h-px animate-glow md:block animate-fade-right bg-gradient-to-r from-transparent via-zinc-300/50 to-transparent" />

      {/* Heartfelt Message */}
      <div className="my-10 text-center animate-fade-in">
        <h2 className="text-base sm:text-lg text-zinc-400 font-light leading-relaxed max-w-xl mx-auto">
        I am so happy to be with you, baby! Every day is special when I get to spend it with you. Hope you like what I made haha no pressure :P
        </h2>
      </div>
      
    </div>
  );
}

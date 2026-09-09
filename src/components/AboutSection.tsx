"use client";

import React from "react";
import IsometricCubes from "./IsometricCubes";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative w-full bg-grid-blueprint-dark text-white py-16 md:py-20 px-4 overflow-hidden border-b border-gray-800"
    >
      {/* Decorative Isometric Cubes on Left and Right borders */}
      <div className="absolute top-1/2 -translate-y-1/2 -left-6 w-24 md:w-36 opacity-80 pointer-events-none">
        <IsometricCubes variant="stacked" colorMode="orange-blue" />
      </div>
      <div className="absolute top-1/2 -translate-y-1/2 -right-6 w-24 md:w-36 opacity-80 pointer-events-none">
        <IsometricCubes variant="stacked" colorMode="orange-blue" />
      </div>

      {/* Decorative Observatory section watermark */}
      <div className="absolute bottom-4 left-6 text-gray-500/50 text-xs font-mono font-bold tracking-wider select-none">
        Observatory Page
      </div>

      <div className="max-w-3xl mx-auto text-center relative z-10 flex flex-col items-center">
        
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
          Tahukah <span className="text-[#f15a24]">Kalian?</span>
        </h2>

        {/* Narrative Paragraph */}
        <p className="mt-4 text-xs md:text-sm text-gray-300 max-w-xl leading-relaxed">
          Tiap tahun, ribuan situs sekolah (<span className="text-orange-300 font-mono">.sch.id</span>), kampus (<span className="text-cyan-300 font-mono">.ac.id</span>), dan instansi publik di Indonesia disusupi peretas (<span className="italic">SEO hijacking / web defacement</span>) untuk mempromosikan situs terlarang dan judi online.
        </p>

        {/* Solution Callout */}
        <h3 className="mt-5 text-xl md:text-2xl font-bold">
          Dan <span className="text-[#00d2ff]">Kami</span> memiliki solusinya disini.
        </h3>

        <p className="mt-2 text-xs md:text-sm text-gray-400 font-medium">
          Dengan landasan :
        </p>

        {/* SDG Badges Container */}
        <div className="mt-6 flex flex-wrap justify-center items-center gap-5 md:gap-8">
          
          {/* SDG 9: Industry, Innovation and Infrastructure */}
          <div className="w-36 h-36 md:w-40 md:h-40 bg-[#f15a24] rounded-lg p-3 flex flex-col justify-between shadow-xl border border-orange-400/40 hover:-translate-y-1 transition-transform cursor-pointer group">
            <div className="flex items-start gap-1">
              <span className="text-3xl md:text-4xl font-black text-white leading-none">9</span>
              <div className="text-[9px] md:text-[10px] font-bold uppercase leading-tight tracking-tight text-white/95">
                INDUSTRY, INNOVATION AND INFRASTRUCTURE
              </div>
            </div>
            {/* 3 Interlocking Cubes Icon */}
            <div className="flex justify-center items-center py-1">
              <svg viewBox="0 0 64 64" className="w-14 h-14 fill-white drop-shadow">
                {/* Cube 1 (Top) */}
                <path d="M32 6 L48 16 L32 26 L16 16 Z" />
                <path d="M16 17 L31 26 L31 42 L16 33 Z" fillOpacity="0.85" />
                <path d="M33 26 L48 17 L48 33 L33 42 Z" fillOpacity="0.7" />
                {/* Cube 2 (Bottom Left) */}
                <path d="M17 32 L31 40 L17 49 L3 40 Z" />
                <path d="M3 41 L16 49 L16 61 L3 53 Z" fillOpacity="0.85" />
                <path d="M18 49 L31 41 L31 53 L18 61 Z" fillOpacity="0.7" />
                {/* Cube 3 (Bottom Right) */}
                <path d="M47 32 L61 40 L47 49 L33 40 Z" />
                <path d="M33 41 L46 49 L46 61 L33 53 Z" fillOpacity="0.85" />
                <path d="M48 49 L61 41 L61 53 L48 61 Z" fillOpacity="0.7" />
              </svg>
            </div>
            <div className="h-1 bg-white/30 rounded-full w-full"></div>
          </div>

          {/* SDG 16: Peace, Justice and Strong Institutions */}
          <div className="w-36 h-36 md:w-40 md:h-40 bg-[#00689d] rounded-lg p-3 flex flex-col justify-between shadow-xl border border-blue-400/40 hover:-translate-y-1 transition-transform cursor-pointer group">
            <div className="flex items-start gap-1">
              <span className="text-3xl md:text-4xl font-black text-white leading-none">16</span>
              <div className="text-[9px] md:text-[10px] font-bold uppercase leading-tight tracking-tight text-white/95">
                PEACE, JUSTICE AND STRONG INSTITUTIONS
              </div>
            </div>
            {/* Dove and Gavel Icon */}
            <div className="flex justify-center items-center py-1">
              <svg viewBox="0 0 64 64" className="w-14 h-14 fill-white drop-shadow">
                {/* Dove shape */}
                <path d="M26 12 C30 8 38 9 44 14 C48 18 52 23 52 29 C48 31 44 31 38 29 C34 32 30 36 24 38 C26 33 28 29 25 24 C21 27 16 30 11 31 C13 25 17 21 21 17 C21 15 23 13 26 12 Z" />
                {/* Branch / olive */}
                <path d="M44 14 C47 13 50 14 53 17 C50 18 47 17 44 14 Z" fillOpacity="0.9" />
                {/* Gavel block */}
                <rect x="18" y="44" width="28" height="6" rx="2" fillOpacity="0.9" />
                <rect x="29" y="38" width="6" height="8" rx="1" fillOpacity="0.8" />
              </svg>
            </div>
            <div className="h-1 bg-white/30 rounded-full w-full"></div>
          </div>

        </div>

      </div>
    </section>
  );
}

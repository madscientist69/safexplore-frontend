"use client";

import React from "react";
import IsometricCubes from "./IsometricCubes";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative w-full bg-grid-blueprint-dark text-white py-12 md:py-20 px-4 overflow-hidden border-b border-gray-800"
    >
      {/* Decorative Isometric Cubes on Left and Right borders */}
      <div className="absolute top-1/2 -translate-y-1/2 -left-3 sm:-left-4 md:-left-5 w-16 sm:w-24 md:w-32 opacity-75 sm:opacity-100 pointer-events-none z-10">
        <IsometricCubes variant="stacked" colorMode="orange-blue" />
      </div>
      <div className="absolute top-1/2 -translate-y-1/2 -right-3 sm:-right-4 md:-right-5 w-16 sm:w-24 md:w-32 opacity-75 sm:opacity-100 pointer-events-none z-10">
        <IsometricCubes variant="stacked" colorMode="orange-blue" />
      </div>

      {/* Decorative Observatory section watermark */}
      <div className="hidden sm:block absolute bottom-4 left-6 text-gray-500/50 text-xs font-mono font-bold tracking-wider select-none">
        Observatory Page
      </div>

      <div className="max-w-3xl mx-auto text-center relative z-10 flex flex-col items-center">
        
        {/* Title */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
          Tahukah <span className="text-[#f15a24]">Kalian?</span>
        </h2>

        {/* Narrative Paragraph */}
        <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-gray-300 max-w-xl leading-relaxed px-2">
          Tiap tahun, ribuan situs sekolah (<span className="text-orange-300 font-mono">.sch.id</span>), kampus (<span className="text-cyan-300 font-mono">.ac.id</span>), dan instansi publik di Indonesia disusupi peretas (<span className="italic">SEO hijacking / web defacement</span>) untuk mempromosikan situs terlarang dan judi online.
        </p>

        {/* Solution Callout */}
        <h3 className="mt-4 sm:mt-5 text-lg sm:text-xl md:text-2xl font-bold px-2">
          Dan <span className="text-[#00d2ff]">Kami</span> memiliki solusinya disini.
        </h3>

        <p className="mt-2 text-xs sm:text-sm text-gray-400 font-medium">
          Dengan landasan :
        </p>

        {/* SDG Badges Container */}
        <div className="mt-6 sm:mt-8 flex flex-wrap justify-center items-center gap-4 sm:gap-6 md:gap-8">
          
          {/* SDG 9: Industry, Innovation and Infrastructure */}
          <div className="w-36 h-36 sm:w-44 sm:h-44 md:w-48 md:h-48 rounded-2xl overflow-hidden shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer border border-white/10 hover:shadow-orange-500/30 bg-[#f36d25]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="/sdg9.svg" 
              alt="SDG 9: Industry, Innovation and Infrastructure" 
              className="w-full h-full object-cover select-none"
            />
          </div>

          {/* SDG 16: Peace, Justice and Strong Institutions */}
          <div className="w-36 h-36 sm:w-44 sm:h-44 md:w-48 md:h-48 rounded-2xl overflow-hidden shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer border border-white/10 hover:shadow-sky-500/30 bg-[#00689d]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="/sdg16.svg" 
              alt="SDG 16: Peace, Justice and Strong Institutions" 
              className="w-full h-full object-cover select-none"
            />
          </div>

        </div>

      </div>
    </section>
  );
}

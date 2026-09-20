"use client";

import React, { useState } from "react";
import { CheckCircle2, Search, Sparkles } from "lucide-react";
import IsometricCubes from "./IsometricCubes";

interface HeroSectionProps {
  onStartScan: (targetUrl: string) => void;
}

export default function HeroSection({ onStartScan }: HeroSectionProps) {
  const [url, setUrl] = useState("");

  const sampleTargets = [
    { name: "smansatu.sch.id", label: "SMA Negeri 1 (Sch.id)", risk: "Tinggi (Injeksi Gacor)" },
    { name: "univ-nusantara.ac.id", label: "Univ Nusantara (Ac.id)", risk: "Sedang (Hidden Backlinks)" },
    { name: "poltek-negeri.ac.id", label: "Poltek Negeri (Ac.id)", risk: "Bersih" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;
    onStartScan(url.trim());
  };

  return (
    <section className="relative w-full min-h-[580px] bg-grid-blueprint flex flex-col items-center justify-center px-4 py-16 overflow-hidden border-b border-gray-200">
      
      {/* Decorative Isometric Cubes at bottom corners */}
      <div className="absolute -bottom-6 -left-4 w-44 md:w-64 z-10">
        <IsometricCubes variant="left" />
      </div>
      <div className="absolute -bottom-6 -right-4 w-44 md:w-64 z-10">
        <IsometricCubes variant="right" />
      </div>

      {/* Decorative subtle section tag on bottom left */}
      <div className="absolute bottom-4 left-6 text-gray-400/60 text-xs font-mono font-bold tracking-wider select-none">
        About Us
      </div>

      {/* Main Hero Content */}
      <div className="max-w-3xl w-full mx-auto text-center z-20 flex flex-col items-center">
        
        {/* Main Title */}
        <h1 className="text-2xl md:text-4xl lg:text-[40px] font-extrabold text-[#1a2530] leading-tight tracking-tight max-w-2xl">
          Amankan{" "}
          <span className="text-[#f15a24] font-extrabold underline decoration-[#f15a24]/30 underline-offset-4">
            Reputasi Digital
          </span>{" "}
          Institusi Anda dari Serangan{" "}
          <span className="inline-flex items-center gap-1.5 text-[#1a2530]">
            Terselubung.
            <CheckCircle2 className="w-6 h-6 md:w-7 md:h-7 text-[#0284c7] inline-block stroke-[2.5]" />
          </span>
        </h1>

        <p className="mt-3 text-sm md:text-base text-gray-600 max-w-xl">
          Audit otomatis kerentanan SEO Hijacking, Googlebot Cloaking, dan Injeksi Backlink Judi Online pada institusi pendidikan & publik Indonesia.
        </p>

        {/* Input Pill Container */}
        <form onSubmit={handleSubmit} className="w-full max-w-xl mt-8 flex flex-col items-center gap-4">
          
          {/* Blue Pill Bar */}
          <div className="w-full bg-[#0b3c61] rounded-full p-1.5 md:p-2 pl-5 flex items-center shadow-lg border-2 border-[#092e4a] focus-within:ring-2 focus-within:ring-[#f15a24] transition-all">
            <span className="text-white/90 text-xs md:text-sm font-semibold whitespace-nowrap mr-2 select-none">
              Masukkan URL Website :
            </span>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="contoh: sman1.sch.id atau kampus.ac.id"
              className="w-full bg-transparent text-white placeholder-white/50 text-xs md:text-sm focus:outline-none font-mono"
            />
          </div>

          {/* Orange "Cari" Button */}
          <button
            type="submit"
            className="bg-[#f15a24] hover:bg-[#d94a18] active:scale-95 text-white font-bold px-10 py-2.5 rounded-full text-sm md:text-base shadow-md hover:shadow-lg border border-[#f15a24] transition-all flex items-center gap-2 cursor-pointer group"
          >
            <Search className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span>Cari</span>
          </button>
        </form>

        {/* Quick Test Chips */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs">
          <span className="text-gray-500 font-medium flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-[#f15a24]" />
            Coba contoh domain:
          </span>
          {sampleTargets.map((item) => (
            <button
              key={item.name}
              type="button"
              onClick={() => {
                setUrl(item.name);
                onStartScan(item.name);
              }}
              className="bg-white hover:bg-orange-50 text-gray-700 hover:text-[#f15a24] border border-gray-300 hover:border-[#f15a24] px-2.5 py-1 rounded-full font-mono text-xs shadow-2xs transition-all cursor-pointer"
            >
              {item.name}
            </button>
          ))}
        </div>

      </div>
    </section>
  );
}

"use client";

import React, { useState } from "react";
import IndonesiaMap, { DomainFilter } from "./IndonesiaMap";
import IsometricCubes from "./IsometricCubes";
import { Activity, ShieldAlert, AlertTriangle, Layers } from "lucide-react";

export default function ObservatorySection() {
  const [filter, setFilter] = useState<DomainFilter>("all");

  return (
    <section
      id="observatory"
      className="relative w-full bg-grid-blueprint py-16 md:py-20 px-4 overflow-hidden border-b border-gray-200"
    >
      {/* Decorative Isometric Cubes in Bottom Corners */}
      <div className="absolute -bottom-6 -left-4 w-44 md:w-60 pointer-events-none z-10">
        <IsometricCubes variant="left" />
      </div>
      <div className="absolute -bottom-6 -right-4 w-44 md:w-60 pointer-events-none z-10">
        <IsometricCubes variant="right" />
      </div>

      {/* Decorative Footers watermark */}
      <div className="absolute bottom-4 left-6 text-gray-400/50 text-xs font-mono font-bold tracking-wider select-none">
        FOOTERS
      </div>

      <div className="max-w-4xl mx-auto flex flex-col items-center text-center relative z-20">
        
        {/* Section Title */}
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#1b2a38] tracking-tight">
          Data statistik agregat web kampus/sekolah di Indonesia{" "}
          <span className="block text-sm md:text-base font-semibold text-gray-600 mt-1 font-mono">
            (National Cyber-Hygiene Index)
          </span>
        </h2>

        {/* Aggregate Stats Card (Orange Border Card from Screenshot 1) */}
        <div className="w-full max-w-3xl mt-6 bg-white rounded-2xl border-2 border-[#f15a24] p-4 md:p-5 shadow-lg">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-left">
            
            {/* Metric 1 */}
            <div className="flex items-center gap-3 p-2 bg-orange-50/50 rounded-xl border border-orange-100">
              <div className="w-9 h-9 rounded-lg bg-[#f15a24]/15 flex items-center justify-center text-[#f15a24]">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] text-gray-500 font-medium">Rata-rata Index Nasional</div>
                <div className="text-sm md:text-base font-extrabold text-[#1a2530] font-mono">
                  64.2/100 <span className="text-amber-600 text-xs font-semibold">(Waspada)</span>
                </div>
              </div>
            </div>

            {/* Metric 2 */}
            <div className="flex items-center gap-3 p-2 bg-blue-50/50 rounded-xl border border-blue-100">
              <div className="w-9 h-9 rounded-lg bg-[#0b3c61]/15 flex items-center justify-center text-[#0b3c61]">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] text-gray-500 font-medium">Total Domain Dipindai</div>
                <div className="text-sm md:text-base font-extrabold text-[#1a2530] font-mono">
                  1.450 Domains
                </div>
              </div>
            </div>

            {/* Metric 3 */}
            <div className="flex items-center gap-3 p-2 bg-red-50/50 rounded-xl border border-red-100">
              <div className="w-9 h-9 rounded-lg bg-red-600/15 flex items-center justify-center text-red-600">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] text-gray-500 font-medium">Ancaman Domain</div>
                <div className="text-sm md:text-base font-extrabold text-red-600 font-mono">
                  81% SEO Poisoning
                </div>
              </div>
            </div>

            {/* Metric 4 */}
            <div className="flex items-center gap-3 p-2 bg-amber-50/50 rounded-xl border border-amber-100">
              <div className="w-9 h-9 rounded-lg bg-amber-500/15 flex items-center justify-center text-amber-600">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] text-gray-500 font-medium">Provinsi Domain Merah</div>
                <div className="text-sm md:text-base font-extrabold text-red-700 font-mono">
                  8 / 38 Provinsi
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Interactive Map */}
        <div className="w-full mt-6">
          <IndonesiaMap filter={filter} />
        </div>

        {/* Filter Pills (Under map, like in Screenshot 1) */}
        <div className="mt-5 flex flex-col items-center gap-2 z-20">
          <span className="text-xs font-bold text-gray-600 uppercase tracking-wider font-mono">
            Filter
          </span>
          <div className="flex flex-wrap items-center justify-center gap-2">
            
            {/* Filter 1: Semua Web */}
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all shadow-xs cursor-pointer ${
                filter === "all"
                  ? "bg-[#16a34a] text-white ring-2 ring-[#16a34a]/30 scale-105"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300"
              }`}
            >
              Semua Web
            </button>

            {/* Filter 2: Hanya Kampus (ac.id) */}
            <button
              onClick={() => setFilter("ac_id")}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all shadow-xs cursor-pointer ${
                filter === "ac_id"
                  ? "bg-[#f15a24] text-white ring-2 ring-[#f15a24]/30 scale-105"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300"
              }`}
            >
              Hanya Kampus (ac.id)
            </button>

            {/* Filter 3: Hanya Sekolah (sch.id) */}
            <button
              onClick={() => setFilter("sch_id")}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all shadow-xs cursor-pointer ${
                filter === "sch_id"
                  ? "bg-[#ea580c] text-white ring-2 ring-[#ea580c]/30 scale-105"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300"
              }`}
            >
              Hanya Sekolah (sch.id)
            </button>

          </div>
        </div>

      </div>
    </section>
  );
}

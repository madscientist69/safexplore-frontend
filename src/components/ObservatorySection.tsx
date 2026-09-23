"use client";

import React, { useState, useEffect } from "react";
import IndonesiaMap, { DomainFilter } from "./IndonesiaMap";
import IsometricCubes from "./IsometricCubes";
import { Activity, ShieldAlert, AlertTriangle, Layers } from "lucide-react";

interface ObservatoryProps {
  refreshTrigger?: number;
}

export default function ObservatorySection({ refreshTrigger = 0 }: ObservatoryProps) {
  const [filter, setFilter] = useState<DomainFilter>("all");
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchObservatoryData = async () => {
      try {
        // Trik Anti-Cache: Menambahkan timestamp (Waktu saat ini) agar URL selalu dianggap baru oleh Next.js
        const timestamp = Date.now();
        const url = `${process.env.NEXT_PUBLIC_API_URL}/api/observatory?filter=${filter}&t=${timestamp}`;
        
        const response = await fetch(url, {
          cache: "no-store", // Paksa browser agar tidak menyimpan cache
          headers: {
            "Pragma": "no-cache",
            "Cache-Control": "no-cache"
          }
        });
        
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error("Gagal terhubung ke database backend", error);
      } finally {
        setLoading(false);
      }
    };
    fetchObservatoryData();
  }, [refreshTrigger, filter]); // Wajib menyertakan 'filter' agar efek berubah saat diklik

  return (
    <section
      id="observatory"
      className="relative w-full bg-grid-blueprint py-12 md:py-20 px-3 sm:px-4 overflow-hidden border-b border-gray-200"
    >
      <div className="absolute -bottom-6 -left-4 w-20 sm:w-36 md:w-60 opacity-20 sm:opacity-100 pointer-events-none z-10">
        <IsometricCubes variant="left" />
      </div>
      <div className="absolute -bottom-6 -right-4 w-20 sm:w-36 md:w-60 opacity-20 sm:opacity-100 pointer-events-none z-10">
        <IsometricCubes variant="right" />
      </div>

      <div className="hidden sm:block absolute bottom-4 left-6 text-gray-400/50 text-xs font-mono font-bold tracking-wider select-none">
        FOOTERS
      </div>

      <div className="max-w-4xl mx-auto flex flex-col items-center text-center relative z-20">
        
        <h2 className="text-lg sm:text-2xl lg:text-3xl font-bold text-[#1b2a38] tracking-tight px-2">
          Data statistik agregat web kampus/sekolah di Indonesia{" "}
          <span className="block text-xs sm:text-sm md:text-base font-semibold text-gray-600 mt-1 font-mono">
            (National Cyber-Hygiene Index)
          </span>
        </h2>

        {loading ? (
          <div className="mt-8 sm:mt-10 p-4 sm:p-6 w-full max-w-3xl bg-white/80 rounded-2xl font-mono text-gray-500 animate-pulse border-2 border-[#f15a24] shadow-lg text-xs sm:text-sm">
            Mengambil data intelijen ancaman dari database pindai nasional...
          </div>
        ) : !stats ? (
          <div className="mt-8 sm:mt-10 p-4 sm:p-6 w-full max-w-3xl bg-red-50 text-red-600 rounded-2xl font-mono text-xs sm:text-sm border-2 border-red-200 shadow-lg">
            Gagal terhubung ke pusat data.
          </div>
        ) : (
          <>
            {/* Aggregate Stats Card - Exact Mockup Style */}
            <div className="w-full max-w-4xl mt-5 sm:mt-6 bg-white rounded-2xl border-2 border-[#f15a24] p-4 sm:p-5 shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6 text-left text-xs sm:text-sm font-sans">
                
                {/* Baris 1: Kiri */}
                <div className="flex items-center justify-between sm:justify-start gap-2">
                  <span className="text-gray-700 font-bold">Rata-rata Index Nasional :</span>
                  <span className="font-extrabold text-[#1a2530] font-mono">
                    {stats.national_index ?? 64.2}/100 
                    <span className={`ml-1 font-semibold ${
                      (stats.national_index ?? 64) >= 80 ? 'text-green-700' : (stats.national_index ?? 64) >= 60 ? 'text-amber-700' : 'text-red-700'
                    }`}>
                      ({(stats.national_index ?? 64) >= 80 ? 'Aman' : (stats.national_index ?? 64) >= 60 ? 'Waspada' : 'Bahaya'})
                    </span>
                  </span>
                </div>

                {/* Baris 1: Kanan */}
                <div className="flex items-center justify-between sm:justify-start gap-2 md:border-l md:border-gray-200 md:pl-6">
                  <span className="text-gray-700 font-bold">Total Domain Dipindai :</span>
                  <span className="font-extrabold text-[#1a2530] font-mono">
                    {(stats.total_scanned > 0 ? stats.total_scanned.toLocaleString("id-ID") : "1.450")} Domains
                  </span>
                </div>

                {/* Baris 2: Kiri */}
                <div className="flex items-center justify-between sm:justify-start gap-2">
                  <span className="text-gray-700 font-bold">Ancaman Domain :</span>
                  <span className="font-extrabold text-red-600 font-mono">
                    {stats.threat_percentage ?? 81}% SEO Poisoning (Judi Online)
                  </span>
                </div>

                {/* Baris 2: Kanan */}
                <div className="flex items-center justify-between sm:justify-start gap-2 md:border-l md:border-gray-200 md:pl-6">
                  <span className="text-gray-700 font-bold">Provinsi Domain Merah :</span>
                  <span className="font-extrabold text-red-700 font-mono">
                    {stats.provinces_alert ?? 8}/38 Provinsi.
                  </span>
                </div>

              </div>
            </div>

            {/* Interactive Map */}
            <div className="w-full mt-5 sm:mt-6">
              <IndonesiaMap filter={filter} apiData={stats} />
            </div>

            {/* Filter Pills */}
            <div className="mt-5 flex flex-col items-center gap-2 z-20">
              <span className="text-xs font-bold text-gray-600 uppercase tracking-wider font-mono">
                Filter
              </span>
              <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
                <button
                  onClick={() => setFilter("all")}
                  className={`px-3 sm:px-4 py-1.5 rounded-full text-xs font-bold transition-all shadow-xs cursor-pointer ${
                    filter === "all"
                      ? "bg-[#16a34a] text-white ring-2 ring-[#16a34a]/30 scale-105"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300"
                  }`}
                >
                  Semua Web
                </button>
                <button
                  onClick={() => setFilter("ac_id")}
                  className={`px-3 sm:px-4 py-1.5 rounded-full text-xs font-bold transition-all shadow-xs cursor-pointer ${
                    filter === "ac_id"
                      ? "bg-[#f15a24] text-white ring-2 ring-[#f15a24]/30 scale-105"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300"
                  }`}
                >
                  Hanya Kampus (ac.id)
                </button>
                <button
                  onClick={() => setFilter("sch_id")}
                  className={`px-3 sm:px-4 py-1.5 rounded-full text-xs font-bold transition-all shadow-xs cursor-pointer ${
                    filter === "sch_id"
                      ? "bg-[#ea580c] text-white ring-2 ring-[#ea580c]/30 scale-105"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300"
                  }`}
                >
                  Hanya Sekolah (sch.id)
                </button>
              </div>
            </div>
          </>
        )}

      </div>
    </section>
  );
}
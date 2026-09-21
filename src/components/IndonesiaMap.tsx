"use client";

import React, { useState } from "react";
import { AlertTriangle, ShieldCheck, ShieldAlert, Info, LayoutTemplate } from "lucide-react";

export type DomainFilter = "all" | "ac_id" | "sch_id";

// Interface untuk data region dari API Backend
interface ApiRegionData {
  score: number;
  infected: number;
  total: number;
  main_threat: string;
  status: string;
}

interface IndonesiaMapProps {
  filter: DomainFilter;
  // Menerima prop berisi seluruh data regions dari ObservatorySection
  apiData: Record<string, ApiRegionData>; 
}

export default function IndonesiaMap({ filter, apiData }: IndonesiaMapProps) {
  // Mapping ID frontend dengan Key yang dikirim Backend
  const MAPPING = {
    sumatra: { name: "Sumatera (Aceh, Sumut, dll.)", backendKey: "Sumatera" },
    jawa: { name: "Jawa (DKI Jakarta, Jabar, Jatim)", backendKey: "Jawa" },
    kalimantan: { name: "Kalimantan (Kalbar, Kalsel, Kaltim)", backendKey: "Kalimantan" },
    sulawesi: { name: "Sulawesi (Sulsel, Sulteng, Sulut)", backendKey: "Sulawesi" },
    bali_nusa: { name: "Bali & Nusa Tenggara", backendKey: "Bali & Nusa Tenggara" },
    maluku: { name: "Kepulauan Maluku", backendKey: "Maluku" },
    papua: { name: "Papua & Papua Barat", backendKey: "Papua" }
  };

  // UBAH: Nilai awal sekarang null (tidak ada yang dipilih)
  const [selectedRegionId, setSelectedRegionId] = useState<keyof typeof MAPPING | null>(null);
  const [hoveredRegionId, setHoveredRegionId] = useState<keyof typeof MAPPING | null>(null);

  const activeId = hoveredRegionId || selectedRegionId;
  
  // Fungsi untuk menghitung total Nasional jika tidak ada region yang disorot
  const calculateNationalStats = () => {
    let totalScore = 0;
    let totalInfected = 0;
    let totalScanned = 0;
    let regionsCount = 0;

    if (apiData && Object.keys(apiData).length > 0) {
      Object.values(apiData).forEach((reg) => {
        totalScore += reg.score;
        totalInfected += reg.infected;
        totalScanned += reg.total;
        if (reg.total > 0) regionsCount++;
      });
    }

    const avgScore = regionsCount > 0 ? Math.round(totalScore / regionsCount) : 100;
    let status = "AMAN / HIJAU";
    if (avgScore < 60) status = "BAHAYA / MERAH";
    else if (avgScore < 80) status = "WASPADA / KUNING";

    return {
      name: "Indonesia (Nasional)",
      score: avgScore,
      infected: totalInfected,
      total: totalScanned,
      main_threat: totalInfected > 0 ? "Ancaman Siber (Agregat Nasional)" : "Sistem Terpantau Bersih",
      status: status
    };
  };

  // Tentukan data mana yang ditampilkan di kartu (Regional atau Nasional)
  const displayData = activeId 
    ? {
        name: MAPPING[activeId].name,
        ...(apiData && apiData[MAPPING[activeId].backendKey] 
          ? apiData[MAPPING[activeId].backendKey] 
          : { score: 100, infected: 0, total: 0, main_threat: "-", status: "AMAN / HIJAU" })
      }
    : calculateNationalStats();

  const getRegionColor = (regionId: keyof typeof MAPPING, isHovered: boolean) => {
    const backendKey = MAPPING[regionId].backendKey;
    const stats = apiData && apiData[backendKey] ? apiData[backendKey] : { score: 100 };
    
    if (stats.score < 60) return isHovered ? "#b91c1c" : "#dc2626"; // Merah
    if (stats.score < 80) return isHovered ? "#d97706" : "#f59e0b"; // Kuning
    return isHovered ? "#15803d" : "#22c55e"; // Hijau
  };

  const isDanger = displayData.score < 60;
  const isWarning = displayData.score >= 60 && displayData.score < 80;

  return (
    <div className="w-full flex flex-col items-center relative">
      
      {/* Floating Insight Cards */}
      <div className="w-full flex flex-col lg:flex-row items-start justify-between gap-4 mb-3">
        <div className="bg-white/95 backdrop-blur-sm border-2 border-[#f15a24]/70 rounded-xl p-3 shadow-md text-left text-xs max-w-sm w-full transition-all">
          <div className="flex items-center justify-between pb-1.5 border-b border-gray-200">
            <span className="font-bold text-gray-800 flex items-center gap-1.5 truncate max-w-[200px]">
              {!activeId ? <LayoutTemplate className="w-4 h-4 text-[#0f3c61] shrink-0" /> : isDanger ? <ShieldAlert className="w-4 h-4 text-red-600 shrink-0" /> : isWarning ? <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" /> : <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />}
              {displayData.name}
            </span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider shrink-0 ${isDanger ? "bg-red-100 text-red-700" : isWarning ? "bg-amber-100 text-amber-800" : "bg-emerald-100 text-emerald-800"}`}>
              {displayData.status.split(" / ")[0]}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-2 font-mono text-[11px]">
            <div>
              <span className="text-gray-500 block text-[10px]">Indeks Wilayah</span>
              <span className="font-bold text-gray-900 text-sm">
                {/* Langsung gunakan skor asli dari backend tanpa dimanipulasi */}
                {displayData.score}/100
              </span>
            </div>
            <div>
              <span className="text-gray-500 block text-[10px]">Domain Terdampak</span>
              <span className={`font-bold text-sm ${displayData.infected > 0 ? "text-red-600" : "text-emerald-600"}`}>
                {displayData.infected} / {displayData.total}
              </span>
            </div>
          </div>

          <div className="mt-2 text-[10px] text-gray-600 bg-gray-50 p-1.5 rounded border border-gray-200">
            <span className="font-semibold text-gray-700">Modus Peretasan Utama:</span>
            <p className={`font-mono mt-0.5 ${displayData.infected > 0 ? "text-red-700" : "text-emerald-700"}`}>
              {displayData.main_threat}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs bg-white/90 px-3 py-2 rounded-lg border border-gray-200 shadow-2xs">
          <span className="text-gray-500 font-medium">Status Risiko:</span>
          <span className="flex items-center gap-1 font-semibold text-emerald-700 text-[11px]"><span className="w-3 h-3 rounded-sm bg-[#22c55e] inline-block"></span> Aman (&gt;75)</span>
          <span className="flex items-center gap-1 font-semibold text-amber-700 text-[11px]"><span className="w-3 h-3 rounded-sm bg-[#f59e0b] inline-block"></span> Waspada (60-74)</span>
          <span className="flex items-center gap-1 font-semibold text-red-700 text-[11px]"><span className="w-3 h-3 rounded-sm bg-[#dc2626] inline-block"></span> Bahaya (&lt;60)</span>
        </div>
      </div>

      {/* Tambahkan event onClick ke kontainer SVG agar klik di area kosong me-reset peta ke Nasional */}
      <div 
        className="w-full relative border border-gray-300/70 rounded-2xl bg-white/60 p-2 md:p-6 shadow-inner overflow-hidden cursor-default"
        onClick={() => setSelectedRegionId(null)}
      >
        <svg viewBox="0 0 950 420" className="w-full h-auto select-none" xmlns="http://www.w3.org/2000/svg">
          <g stroke="#cbd5e1" strokeWidth="0.5" strokeDasharray="3 3">
            <line x1="0" y1="100" x2="950" y2="100" />
            <line x1="0" y1="200" x2="950" y2="200" />
            <line x1="0" y1="300" x2="950" y2="300" />
            <line x1="200" y1="0" x2="200" y2="420" />
            <line x1="450" y1="0" x2="450" y2="420" />
            <line x1="700" y1="0" x2="700" y2="420" />
          </g>

          <g className="cursor-pointer transition-all duration-200" onMouseEnter={() => setHoveredRegionId("sumatra")} onMouseLeave={() => setHoveredRegionId(null)} onClick={(e) => { e.stopPropagation(); setSelectedRegionId("sumatra"); }}>
            <path d="M120 70 L170 120 L210 160 L180 200 L140 160 L100 110 Z" fill={getRegionColor("sumatra", hoveredRegionId === "sumatra")} stroke="#0f3c61" strokeWidth="1.5" />
            <path d="M180 170 L240 210 L270 260 L230 280 L190 220 Z" fill={getRegionColor("sumatra", hoveredRegionId === "sumatra")} stroke="#0f3c61" strokeWidth="1.5" />
            <path d="M230 250 L290 280 L315 315 L265 325 L225 285 Z" fill={getRegionColor("sumatra", hoveredRegionId === "sumatra")} stroke="#0f3c61" strokeWidth="1.5" />
            <circle cx="105" cy="140" r="7" fill={getRegionColor("sumatra", false)} stroke="#0f3c61" strokeWidth="1" />
            <ellipse cx="145" cy="215" rx="5" ry="12" fill={getRegionColor("sumatra", false)} stroke="#0f3c61" strokeWidth="1" transform="rotate(-30 145 215)" />
            <ellipse cx="295" cy="250" rx="10" ry="7" fill={getRegionColor("sumatra", false)} stroke="#0f3c61" strokeWidth="1" />
            <ellipse cx="320" cy="265" rx="8" ry="6" fill={getRegionColor("sumatra", false)} stroke="#0f3c61" strokeWidth="1" />
          </g>

          <g className="cursor-pointer transition-all duration-200" onMouseEnter={() => setHoveredRegionId("jawa")} onMouseLeave={() => setHoveredRegionId(null)} onClick={(e) => { e.stopPropagation(); setSelectedRegionId("jawa"); }}>
            <path d="M280 340 L350 340 L370 370 L300 375 Z" fill={getRegionColor("jawa", hoveredRegionId === "jawa")} stroke="#0f3c61" strokeWidth="1.5" />
            <path d="M350 340 L420 345 L435 375 L370 370 Z" fill={getRegionColor("jawa", hoveredRegionId === "jawa")} stroke="#0f3c61" strokeWidth="1.5" />
            <path d="M420 345 L490 350 L500 375 L435 375 Z" fill={getRegionColor("jawa", hoveredRegionId === "jawa")} stroke="#0f3c61" strokeWidth="1.5" />
            <ellipse cx="485" cy="335" rx="18" ry="6" fill={getRegionColor("jawa", false)} stroke="#0f3c61" strokeWidth="1" />
          </g>

          <g className="cursor-pointer transition-all duration-200" onMouseEnter={() => setHoveredRegionId("bali_nusa")} onMouseLeave={() => setHoveredRegionId(null)} onClick={(e) => { e.stopPropagation(); setSelectedRegionId("bali_nusa"); }}>
            <ellipse cx="525" cy="365" rx="10" ry="8" fill={getRegionColor("bali_nusa", hoveredRegionId === "bali_nusa")} stroke="#0f3c61" strokeWidth="1" />
            <ellipse cx="555" cy="365" rx="14" ry="7" fill={getRegionColor("bali_nusa", hoveredRegionId === "bali_nusa")} stroke="#0f3c61" strokeWidth="1" />
            <path d="M575 362 L610 360 L615 375 L580 372 Z" fill={getRegionColor("bali_nusa", hoveredRegionId === "bali_nusa")} stroke="#0f3c61" strokeWidth="1" />
            <path d="M625 360 L680 355 L685 368 L630 372 Z" fill={getRegionColor("bali_nusa", hoveredRegionId === "bali_nusa")} stroke="#0f3c61" strokeWidth="1" />
            <ellipse cx="695" cy="375" rx="18" ry="8" fill={getRegionColor("bali_nusa", hoveredRegionId === "bali_nusa")} stroke="#0f3c61" strokeWidth="1" />
          </g>

          <g className="cursor-pointer transition-all duration-200" onMouseEnter={() => setHoveredRegionId("kalimantan")} onMouseLeave={() => setHoveredRegionId(null)} onClick={(e) => { e.stopPropagation(); setSelectedRegionId("kalimantan"); }}>
            <path d="M340 160 L400 145 L415 220 L370 260 L330 230 Z" fill={getRegionColor("kalimantan", hoveredRegionId === "kalimantan")} stroke="#0f3c61" strokeWidth="1.5" />
            <path d="M400 145 L475 140 L485 220 L440 270 L370 260 L415 220 Z" fill={getRegionColor("kalimantan", hoveredRegionId === "kalimantan")} stroke="#0f3c61" strokeWidth="1.5" />
          </g>

          <g className="cursor-pointer transition-all duration-200" onMouseEnter={() => setHoveredRegionId("sulawesi")} onMouseLeave={() => setHoveredRegionId(null)} onClick={(e) => { e.stopPropagation(); setSelectedRegionId("sulawesi"); }}>
            <path d="M525 210 L545 200 L560 250 L530 250 Z" fill={getRegionColor("sulawesi", hoveredRegionId === "sulawesi")} stroke="#0f3c61" strokeWidth="1.5" />
            <path d="M535 200 L550 150 L590 140 L585 155 L545 195 Z" fill={getRegionColor("sulawesi", hoveredRegionId === "sulawesi")} stroke="#0f3c61" strokeWidth="1.5" />
            <path d="M555 220 L600 240 L595 255 L555 240 Z" fill={getRegionColor("sulawesi", hoveredRegionId === "sulawesi")} stroke="#0f3c61" strokeWidth="1.5" />
            <path d="M525 250 L520 310 L535 315 L540 260 Z" fill={getRegionColor("sulawesi", hoveredRegionId === "sulawesi")} stroke="#0f3c61" strokeWidth="1.5" />
            <path d="M545 255 L575 285 L565 298 L540 265 Z" fill={getRegionColor("sulawesi", hoveredRegionId === "sulawesi")} stroke="#0f3c61" strokeWidth="1.5" />
          </g>

          <g className="cursor-pointer transition-all duration-200" onMouseEnter={() => setHoveredRegionId("maluku")} onMouseLeave={() => setHoveredRegionId(null)} onClick={(e) => { e.stopPropagation(); setSelectedRegionId("maluku"); }}>
            <path d="M650 160 L675 140 L670 180 L685 190 L670 210 L655 190 Z" fill={getRegionColor("maluku", hoveredRegionId === "maluku")} stroke="#0f3c61" strokeWidth="1.2" />
            <ellipse cx="635" cy="245" rx="14" ry="8" fill={getRegionColor("maluku", hoveredRegionId === "maluku")} stroke="#0f3c61" strokeWidth="1" />
            <ellipse cx="675" cy="240" rx="22" ry="7" fill={getRegionColor("maluku", hoveredRegionId === "maluku")} stroke="#0f3c61" strokeWidth="1" />
            <circle cx="670" cy="255" r="4" fill={getRegionColor("maluku", hoveredRegionId === "maluku")} stroke="#0f3c61" strokeWidth="1" />
            <circle cx="710" cy="295" r="6" fill={getRegionColor("maluku", hoveredRegionId === "maluku")} stroke="#0f3c61" strokeWidth="1" />
            <circle cx="715" cy="325" r="8" fill={getRegionColor("maluku", hoveredRegionId === "maluku")} stroke="#0f3c61" strokeWidth="1" />
          </g>

          <g className="cursor-pointer transition-all duration-200" onMouseEnter={() => setHoveredRegionId("papua")} onMouseLeave={() => setHoveredRegionId(null)} onClick={(e) => { e.stopPropagation(); setSelectedRegionId("papua"); }}>
            <path d="M720 205 C710 180 735 170 760 185 C770 195 765 215 750 225 C740 235 730 220 720 205 Z" fill={getRegionColor("papua", hoveredRegionId === "papua")} stroke="#0f3c61" strokeWidth="1.5" />
            <path d="M750 225 L810 210 L870 240 L880 320 L840 330 L800 290 L760 260 Z" fill={getRegionColor("papua", hoveredRegionId === "papua")} stroke="#0f3c61" strokeWidth="1.5" />
          </g>

          <text x="170" y="100" fill="#0f3c61" fontSize="12" fontWeight="700">Sumatera</text>
          <text x="360" y="395" fill="#0f3c61" fontSize="12" fontWeight="700">Jawa</text>
          <text x="390" y="210" fill="#0f3c61" fontSize="12" fontWeight="700">Kalimantan</text>
          <text x="560" y="195" fill="#0f3c61" fontSize="12" fontWeight="700">Sulawesi</text>
          <text x="640" y="170" fill="#0f3c61" fontSize="12" fontWeight="700">Maluku</text>
          <text x="790" y="270" fill="#0f3c61" fontSize="12" fontWeight="700">Papua</text>
        </svg>

        <div className="absolute bottom-2 right-4 text-[10px] text-gray-400 font-mono flex items-center gap-1">
          <Info className="w-3 h-3 text-[#f15a24]" />
          Klik pada area kosong untuk kembali ke mode Nasional.
        </div>
      </div>
    </div>
  );
}
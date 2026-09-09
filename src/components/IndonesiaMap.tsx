"use client";

import React, { useState } from "react";
import { AlertTriangle, ShieldCheck, ShieldAlert, Info } from "lucide-react";

export type DomainFilter = "all" | "ac_id" | "sch_id";

interface ProvinceData {
  id: string;
  name: string;
  island: string;
  status: "safe" | "warning" | "danger";
  indexScore: number;
  totalDomains: number;
  compromisedCount: number;
  topThreat: string;
}

const REGION_STATS: Record<string, ProvinceData> = {
  sumatra: {
    id: "sumatra",
    name: "Sumatera (Aceh, Sumut, Sumbar, Riau, dll)",
    island: "Sumatera",
    status: "danger",
    indexScore: 54.8,
    totalDomains: 380,
    compromisedCount: 112,
    topThreat: "Injeksi Keyword Slot & Togel pada Subdomain",
  },
  jawa: {
    id: "jawa",
    name: "Jawa (DKI Jakarta, Jabar, Jateng, DIY, Jatim)",
    island: "Jawa",
    status: "danger",
    indexScore: 49.2,
    totalDomains: 620,
    compromisedCount: 235,
    topThreat: "Googlebot Cloaking & Backdoor PHP Shell",
  },
  kalimantan: {
    id: "kalimantan",
    name: "Kalimantan (Kalbar, Kalsel, Kaltim, Kaltara)",
    island: "Kalimantan",
    status: "warning",
    indexScore: 68.4,
    totalDomains: 190,
    compromisedCount: 38,
    topThreat: "Hidden iFrame dan Redirect Mobile Casino",
  },
  sulawesi: {
    id: "sulawesi",
    name: "Sulawesi (Sulsel, Sulteng, Sulut, Gorontalo)",
    island: "Sulawesi",
    status: "danger",
    indexScore: 58.1,
    totalDomains: 140,
    compromisedCount: 42,
    topThreat: "Spam Indexing Judol pada Direktori PDF / Assets",
  },
  bali_nusa: {
    id: "bali_nusa",
    name: "Bali & Nusa Tenggara (NTB, NTT)",
    island: "Bali & Nusa",
    status: "safe",
    indexScore: 78.5,
    totalDomains: 80,
    compromisedCount: 9,
    topThreat: "Outdated CMS Plugins",
  },
  maluku: {
    id: "maluku",
    name: "Kepulauan Maluku",
    island: "Maluku",
    status: "safe",
    indexScore: 82.0,
    totalDomains: 45,
    compromisedCount: 4,
    topThreat: "Unpatched WordPress Themes",
  },
  papua: {
    id: "papua",
    name: "Papua & Papua Barat",
    island: "Papua",
    status: "safe",
    indexScore: 79.2,
    totalDomains: 65,
    compromisedCount: 8,
    topThreat: "Brute Force Login WP-Admin",
  },
};

interface IndonesiaMapProps {
  filter: DomainFilter;
}

export default function IndonesiaMap({ filter }: IndonesiaMapProps) {
  const [selectedRegion, setSelectedRegion] = useState<string>("jawa");
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  const activeData = REGION_STATS[hoveredRegion || selectedRegion] || REGION_STATS.jawa;

  // Adjust score based on filter
  const getFilterAdjustedScore = (baseScore: number) => {
    if (filter === "ac_id") return (baseScore + 6.2).toFixed(1);
    if (filter === "sch_id") return (baseScore - 8.4).toFixed(1);
    return baseScore.toFixed(1);
  };

  const getRegionColor = (status: "safe" | "warning" | "danger", isHovered: boolean) => {
    if (status === "danger") return isHovered ? "#b91c1c" : "#dc2626"; // Red
    if (status === "warning") return isHovered ? "#d97706" : "#f59e0b"; // Orange/Yellow
    return isHovered ? "#15803d" : "#22c55e"; // Green
  };

  return (
    <div className="w-full flex flex-col items-center relative">
      
      {/* Floating Insight Cards Over Map (Left Top / Side) */}
      <div className="w-full flex flex-col lg:flex-row items-start justify-between gap-4 mb-3">
        {/* Active Province Card */}
        <div className="bg-white/95 backdrop-blur-sm border-2 border-[#f15a24]/70 rounded-xl p-3 shadow-md text-left text-xs max-w-sm w-full transition-all">
          <div className="flex items-center justify-between pb-1.5 border-b border-gray-200">
            <span className="font-bold text-gray-800 flex items-center gap-1.5">
              {activeData.status === "danger" ? (
                <ShieldAlert className="w-4 h-4 text-red-600" />
              ) : activeData.status === "warning" ? (
                <AlertTriangle className="w-4 h-4 text-amber-500" />
              ) : (
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
              )}
              {activeData.island}
            </span>
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                activeData.status === "danger"
                  ? "bg-red-100 text-red-700"
                  : activeData.status === "warning"
                  ? "bg-amber-100 text-amber-800"
                  : "bg-emerald-100 text-emerald-800"
              }`}
            >
              {activeData.status === "danger"
                ? "Bahaya / Merah"
                : activeData.status === "warning"
                ? "Waspada"
                : "Aman / Higienis"}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-2 font-mono text-[11px]">
            <div>
              <span className="text-gray-500 block text-[10px]">Indeks Wilayah</span>
              <span className="font-bold text-gray-900 text-sm">
                {getFilterAdjustedScore(activeData.indexScore)}/100
              </span>
            </div>
            <div>
              <span className="text-gray-500 block text-[10px]">Domain Terdampak</span>
              <span className="font-bold text-red-600 text-sm">
                {activeData.compromisedCount} / {activeData.totalDomains}
              </span>
            </div>
          </div>

          <div className="mt-2 text-[10px] text-gray-600 bg-gray-50 p-1.5 rounded border border-gray-200">
            <span className="font-semibold text-gray-700">Modus Peretasan Utama:</span>
            <p className="text-red-700 font-mono mt-0.5">{activeData.topThreat}</p>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3 text-xs bg-white/90 px-3 py-2 rounded-lg border border-gray-200 shadow-2xs">
          <span className="text-gray-500 font-medium">Status Risiko:</span>
          <span className="flex items-center gap-1 font-semibold text-emerald-700 text-[11px]">
            <span className="w-3 h-3 rounded-sm bg-[#22c55e] inline-block"></span> Aman (&gt;75)
          </span>
          <span className="flex items-center gap-1 font-semibold text-amber-700 text-[11px]">
            <span className="w-3 h-3 rounded-sm bg-[#f59e0b] inline-block"></span> Waspada (60-74)
          </span>
          <span className="flex items-center gap-1 font-semibold text-red-700 text-[11px]">
            <span className="w-3 h-3 rounded-sm bg-[#dc2626] inline-block"></span> Bahaya / Merah (&lt;60)
          </span>
        </div>
      </div>

      {/* SVG Map Container */}
      <div className="w-full relative border border-gray-300/70 rounded-2xl bg-white/60 p-2 md:p-6 shadow-inner overflow-hidden">
        
        {/* Interactive SVG Indonesian Archipelago */}
        <svg
          viewBox="0 0 950 420"
          className="w-full h-auto select-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Subtle ocean grid coordinates */}
          <g stroke="#cbd5e1" strokeWidth="0.5" strokeDasharray="3 3">
            <line x1="0" y1="100" x2="950" y2="100" />
            <line x1="0" y1="200" x2="950" y2="200" />
            <line x1="0" y1="300" x2="950" y2="300" />
            <line x1="200" y1="0" x2="200" y2="420" />
            <line x1="450" y1="0" x2="450" y2="420" />
            <line x1="700" y1="0" x2="700" y2="420" />
          </g>

          {/* 1. SUMATRA ISLAND */}
          <g
            className="cursor-pointer transition-all duration-200"
            onMouseEnter={() => setHoveredRegion("sumatra")}
            onMouseLeave={() => setHoveredRegion(null)}
            onClick={() => setSelectedRegion("sumatra")}
          >
            {/* North Sumatra (Red/Danger) */}
            <path
              d="M120 70 L170 120 L210 160 L180 200 L140 160 L100 110 Z"
              fill={getRegionColor("danger", hoveredRegion === "sumatra")}
              stroke="#0f3c61"
              strokeWidth="1.5"
            />
            {/* Central Sumatra (Green/Warning) */}
            <path
              d="M180 170 L240 210 L270 260 L230 280 L190 220 Z"
              fill={getRegionColor("warning", hoveredRegion === "sumatra")}
              stroke="#0f3c61"
              strokeWidth="1.5"
            />
            {/* South Sumatra (Red/Danger) */}
            <path
              d="M230 250 L290 280 L315 315 L265 325 L225 285 Z"
              fill={getRegionColor("danger", hoveredRegion === "sumatra")}
              stroke="#0f3c61"
              strokeWidth="1.5"
            />
            {/* Off-coast islands (Nias, Mentawai, Bangka, Belitung) */}
            <circle cx="105" cy="140" r="7" fill="#22c55e" stroke="#0f3c61" strokeWidth="1" />
            <ellipse cx="145" cy="215" rx="5" ry="12" fill="#22c55e" stroke="#0f3c61" strokeWidth="1" transform="rotate(-30 145 215)" />
            <ellipse cx="295" cy="250" rx="10" ry="7" fill="#dc2626" stroke="#0f3c61" strokeWidth="1" />
            <ellipse cx="320" cy="265" rx="8" ry="6" fill="#f59e0b" stroke="#0f3c61" strokeWidth="1" />
          </g>

          {/* 2. JAWA ISLAND */}
          <g
            className="cursor-pointer transition-all duration-200"
            onMouseEnter={() => setHoveredRegion("jawa")}
            onMouseLeave={() => setHoveredRegion(null)}
            onClick={() => setSelectedRegion("jawa")}
          >
            {/* West Java & DKI (Red) */}
            <path
              d="M280 340 L350 340 L370 370 L300 375 Z"
              fill={getRegionColor("danger", hoveredRegion === "jawa")}
              stroke="#0f3c61"
              strokeWidth="1.5"
            />
            {/* Central Java (Warning / Orange) */}
            <path
              d="M350 340 L420 345 L435 375 L370 370 Z"
              fill={getRegionColor("warning", hoveredRegion === "jawa")}
              stroke="#0f3c61"
              strokeWidth="1.5"
            />
            {/* East Java & Madura (Red) */}
            <path
              d="M420 345 L490 350 L500 375 L435 375 Z"
              fill={getRegionColor("danger", hoveredRegion === "jawa")}
              stroke="#0f3c61"
              strokeWidth="1.5"
            />
            <ellipse cx="485" cy="335" rx="18" ry="6" fill="#dc2626" stroke="#0f3c61" strokeWidth="1" />
          </g>

          {/* 3. BALI, NTB, NTT */}
          <g
            className="cursor-pointer transition-all duration-200"
            onMouseEnter={() => setHoveredRegion("bali_nusa")}
            onMouseLeave={() => setHoveredRegion(null)}
            onClick={() => setSelectedRegion("bali_nusa")}
          >
            {/* Bali */}
            <ellipse cx="525" cy="365" rx="10" ry="8" fill="#22c55e" stroke="#0f3c61" strokeWidth="1" />
            {/* Lombok & Sumbawa */}
            <ellipse cx="555" cy="365" rx="14" ry="7" fill="#22c55e" stroke="#0f3c61" strokeWidth="1" />
            <path d="M575 362 L610 360 L615 375 L580 372 Z" fill="#22c55e" stroke="#0f3c61" strokeWidth="1" />
            {/* Flores & Timor */}
            <path d="M625 360 L680 355 L685 368 L630 372 Z" fill="#22c55e" stroke="#0f3c61" strokeWidth="1" />
            <ellipse cx="695" cy="375" rx="18" ry="8" fill="#22c55e" stroke="#0f3c61" strokeWidth="1" />
          </g>

          {/* 4. KALIMANTAN (BORNEO) */}
          <g
            className="cursor-pointer transition-all duration-200"
            onMouseEnter={() => setHoveredRegion("kalimantan")}
            onMouseLeave={() => setHoveredRegion(null)}
            onClick={() => setSelectedRegion("kalimantan")}
          >
            {/* West & Central (Red/Danger) */}
            <path
              d="M340 160 L400 145 L415 220 L370 260 L330 230 Z"
              fill={getRegionColor("danger", hoveredRegion === "kalimantan")}
              stroke="#0f3c61"
              strokeWidth="1.5"
            />
            {/* East & South (Warning/Yellow) */}
            <path
              d="M400 145 L475 140 L485 220 L440 270 L370 260 L415 220 Z"
              fill={getRegionColor("warning", hoveredRegion === "kalimantan")}
              stroke="#0f3c61"
              strokeWidth="1.5"
            />
          </g>

          {/* 5. SULAWESI */}
          <g
            className="cursor-pointer transition-all duration-200"
            onMouseEnter={() => setHoveredRegion("sulawesi")}
            onMouseLeave={() => setHoveredRegion(null)}
            onClick={() => setSelectedRegion("sulawesi")}
          >
            {/* Distinctive 4-armed shape */}
            {/* Center body */}
            <path
              d="M525 210 L545 200 L560 250 L530 250 Z"
              fill={getRegionColor("danger", hoveredRegion === "sulawesi")}
              stroke="#0f3c61"
              strokeWidth="1.5"
            />
            {/* North arm (Manado) */}
            <path
              d="M535 200 L550 150 L590 140 L585 155 L545 195 Z"
              fill="#22c55e"
              stroke="#0f3c61"
              strokeWidth="1.5"
            />
            {/* East arm */}
            <path
              d="M555 220 L600 240 L595 255 L555 240 Z"
              fill="#f59e0b"
              stroke="#0f3c61"
              strokeWidth="1.5"
            />
            {/* South & SE arms (Makassar & Kendari - Red/Danger) */}
            <path
              d="M525 250 L520 310 L535 315 L540 260 Z"
              fill={getRegionColor("danger", hoveredRegion === "sulawesi")}
              stroke="#0f3c61"
              strokeWidth="1.5"
            />
            <path
              d="M545 255 L575 285 L565 298 L540 265 Z"
              fill={getRegionColor("danger", hoveredRegion === "sulawesi")}
              stroke="#0f3c61"
              strokeWidth="1.5"
            />
          </g>

          {/* 6. MALUKU ISLANDS */}
          <g
            className="cursor-pointer transition-all duration-200"
            onMouseEnter={() => setHoveredRegion("maluku")}
            onMouseLeave={() => setHoveredRegion(null)}
            onClick={() => setSelectedRegion("maluku")}
          >
            {/* Halmahera */}
            <path
              d="M650 160 L675 140 L670 180 L685 190 L670 210 L655 190 Z"
              fill="#22c55e"
              stroke="#0f3c61"
              strokeWidth="1.2"
            />
            {/* Seram & Buru */}
            <ellipse cx="635" cy="245" rx="14" ry="8" fill="#22c55e" stroke="#0f3c61" strokeWidth="1" />
            <ellipse cx="675" cy="240" rx="22" ry="7" fill="#22c55e" stroke="#0f3c61" strokeWidth="1" />
            {/* Ambon & Kei */}
            <circle cx="670" cy="255" r="4" fill="#22c55e" stroke="#0f3c61" strokeWidth="1" />
            <circle cx="710" cy="295" r="6" fill="#22c55e" stroke="#0f3c61" strokeWidth="1" />
            <circle cx="715" cy="325" r="8" fill="#22c55e" stroke="#0f3c61" strokeWidth="1" />
          </g>

          {/* 7. PAPUA ISLAND */}
          <g
            className="cursor-pointer transition-all duration-200"
            onMouseEnter={() => setHoveredRegion("papua")}
            onMouseLeave={() => setHoveredRegion(null)}
            onClick={() => setSelectedRegion("papua")}
          >
            {/* Vogelkop / Bird's head (Papua Barat - Red/Danger) */}
            <path
              d="M720 205 C710 180 735 170 760 185 C770 195 765 215 750 225 C740 235 730 220 720 205 Z"
              fill={getRegionColor("danger", hoveredRegion === "papua")}
              stroke="#0f3c61"
              strokeWidth="1.5"
            />
            {/* Main Papua Body (Green safe) */}
            <path
              d="M750 225 L810 210 L870 240 L880 320 L840 330 L800 290 L760 260 Z"
              fill={getRegionColor("safe", hoveredRegion === "papua")}
              stroke="#0f3c61"
              strokeWidth="1.5"
            />
          </g>

          {/* Interactive labels for regions */}
          <text x="170" y="100" fill="#0f3c61" fontSize="12" fontWeight="700">Sumatera</text>
          <text x="360" y="395" fill="#0f3c61" fontSize="12" fontWeight="700">Jawa</text>
          <text x="390" y="210" fill="#0f3c61" fontSize="12" fontWeight="700">Kalimantan</text>
          <text x="560" y="195" fill="#0f3c61" fontSize="12" fontWeight="700">Sulawesi</text>
          <text x="640" y="170" fill="#0f3c61" fontSize="12" fontWeight="700">Maluku</text>
          <text x="790" y="270" fill="#0f3c61" fontSize="12" fontWeight="700">Papua</text>
        </svg>

        <div className="absolute bottom-2 right-4 text-[10px] text-gray-400 font-mono flex items-center gap-1">
          <Info className="w-3 h-3 text-[#f15a24]" />
          Klik pulau untuk analisis mendalam
        </div>
      </div>

    </div>
  );
}

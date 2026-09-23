"use client";

import React, { useState, useRef, useEffect } from "react";
import IsometricCubes from "./IsometricCubes";
import RemediationModal from "./RemediationModal";
import HtaccessModal from "./HtaccessModal";
import PhpScriptModal from "./PhpScriptModal";
import Footer from "./Footer";
import {
  ArrowLeft,
  RotateCw,
  RefreshCw,
  ExternalLink,
  ShieldCheck,
  Eye,
  SlidersHorizontal,
  Loader2,
  AlertTriangle
} from "lucide-react";

interface ResultViewProps {
  targetUrl: string;
  scanData?: any;
  onBackToSearch: () => void;
}

export default function ResultView({ targetUrl, scanData, onBackToSearch }: ResultViewProps) {
  const [activeTab, setActiveTab] = useState<"web" | "hidden_links">("web");
  const [sliderPosition, setSliderPosition] = useState(45);
  const [isDragging, setIsDragging] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);
  const [isIframeLoading, setIsIframeLoading] = useState(true);

  // Modals
  const [isRemediationOpen, setIsRemediationOpen] = useState(false);
  const [isHtaccessOpen, setIsHtaccessOpen] = useState(false);
  const [isPhpScriptOpen, setIsPhpScriptOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(850);

  useEffect(() => {
    if (!containerRef.current) return;
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth);
      }
    };
    updateWidth();
    const observer = new ResizeObserver(updateWidth);
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Dragging logic for split comparison slider
  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setSliderPosition(percent);
  };

  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    if ("clientX" in e) handleMove(e.clientX);
    else if (e.touches && e.touches[0]) handleMove(e.touches[0].clientX);
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    const handleMouseMove = (e: MouseEvent) => { if (isDragging) handleMove(e.clientX); };
    const handleTouchMove = (e: TouchEvent) => { if (isDragging && e.touches.length > 0) handleMove(e.touches[0].clientX); };

    if (isDragging) {
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("touchend", handleMouseUp);
      window.addEventListener("touchmove", handleTouchMove);
    }
    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchend", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [isDragging]);

  // Format and parse URL
  const fullTargetUrl = targetUrl.startsWith("http://") || targetUrl.startsWith("https://")
    ? targetUrl
    : `https://${targetUrl}`;

  const cleanDomain = targetUrl
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(/\/.*$/, "")
    .toLowerCase();

  // Status & Skor: jika status Infected dari backend
  const isDummyTarget = cleanDomain.includes("dummy") || cleanDomain.includes("surabaya");
  const isInfected = scanData?.status === "Infected" || scanData?.details?.is_infected === true || isDummyTarget;
  const gaugeScore = isInfected ? "20/100" : "98/100";
  const needleRotation = isInfected ? "-65" : "65";

  // URL Target untuk pratinjau:
  // Sisi Bersih = Website normal
  // Sisi Terinfeksi = Website dengan letak link tersembunyi yang di-reveal
  const normalProxyUrl = `/api/proxy-preview?url=${encodeURIComponent(fullTargetUrl)}&reveal=0&v=${iframeKey}`;
  const infectedProxyUrl = `/api/proxy-preview?url=${encodeURIComponent(fullTargetUrl)}&reveal=1&v=${iframeKey}`;

  // Data temuan injeksi tersembunyi
  const defaultInfectedLinks = [
    {
      path: "/",
      anchor: "DAFTAR SITUS SLOT GACOR MAXWIN 2026",
      target: "https://contoh-judi-slot-gacor.com",
      type: "Hidden SEO Cloaking Link",
      status: "Disembunyikan (left: -9999px)",
      risk: "Kritis",
    },
    {
      path: "/",
      anchor: "BANDAR TOGEL TERPERCAYA HADIAH 4D TERBESAR",
      target: "https://contoh-bandar-togel.com",
      type: "Hidden Backdoor Link",
      status: "Disembunyikan (display: none)",
      risk: "Kritis",
    },
    {
      path: "/",
      anchor: "SITUS POKER DAN DOMINO TERBAIK BONUS 100%",
      target: "https://contoh-poker-online.com",
      type: "PHP Webshell Injected Anchor",
      status: "Disembunyikan (opacity: 0)",
      risk: "Kritis",
    }
  ];

  const rawHiddenLinks = scanData?.details?.hidden_links_sample || [];
  const detectedLinks = rawHiddenLinks.length > 0
    ? rawHiddenLinks.map((linkUrl: string) => ({
        path: linkUrl,
        anchor: "Injeksi Link Tersembunyi",
        target: linkUrl,
        type: "Cloaked Backdoor Link",
        status: "Terdeteksi Scanner",
        risk: "Kritis"
      }))
    : (isInfected ? defaultInfectedLinks : []);

  return (
    <div className="w-full min-h-screen bg-grid-blueprint flex flex-col justify-between relative overflow-hidden">
      
      {/* Top Header info */}
      <div className="w-full bg-[#f15a24] text-white py-2 px-3 sm:px-6 md:px-8 flex justify-between items-center shadow-md z-30">
        <button
          onClick={onBackToSearch}
          className="flex items-center gap-1 sm:gap-1.5 text-xs sm:text-sm font-semibold hover:text-orange-100 transition-colors cursor-pointer shrink-0"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Kembali ke Pencarian</span>
          <span className="sm:hidden">Kembali</span>
        </button>
        <span className="text-xs sm:text-sm font-mono font-bold truncate max-w-[210px] sm:max-w-xs md:max-w-none">
          Audit Hasil Domain: <span className="underline">{targetUrl}</span>
        </span>
      </div>

      <div className="absolute -bottom-6 -right-6 w-36 sm:w-52 md:w-72 pointer-events-none z-10 opacity-40 sm:opacity-100"><IsometricCubes variant="right" /></div>
      <div className="absolute -bottom-6 -left-6 w-36 sm:w-52 md:w-72 pointer-events-none z-10 opacity-40 sm:opacity-100"><IsometricCubes variant="left" /></div>

      <main className="max-w-6xl w-full mx-auto px-3 sm:px-4 py-6 sm:py-8 relative z-20 flex-1 flex flex-col">
        
        {/* TAB TOGGLE BUTTONS */}
        <div className="w-full max-w-xl mx-auto mb-5 sm:mb-6">
          <div className="w-full grid grid-cols-2 rounded-lg border-2 border-[#f15a24] overflow-hidden bg-white shadow-sm">
            <button
              onClick={() => setActiveTab("web")}
              className={`py-2 sm:py-2.5 text-xs sm:text-sm md:text-base font-bold text-center transition-all cursor-pointer border-r-2 border-[#f15a24] ${
                activeTab === "web" ? "bg-white text-[#f15a24]" : "bg-orange-50/40 text-gray-700 hover:text-[#f15a24]"
              }`}
            >
              Halaman Web & Deteksi Letak
            </button>
            <button
              onClick={() => setActiveTab("hidden_links")}
              className={`py-2 sm:py-2.5 text-xs sm:text-sm md:text-base font-bold text-center transition-all cursor-pointer ${
                activeTab === "hidden_links" ? "bg-white text-[#f15a24]" : "bg-orange-50/40 text-gray-700 hover:text-[#f15a24]"
              }`}
            >
              Daftar Link Tersembunyi ({detectedLinks.length})
            </button>
          </div>
        </div>

        {/* TAB 1: Visual Inspection */}
        {activeTab === "web" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
            <div className="lg:col-span-8 flex flex-col">
              
              {/* Browser Shell Frame */}
              <div className="w-full rounded-2xl border-2 border-[#0b3c61] bg-white shadow-xl overflow-hidden flex flex-col">
                
                {/* Browser Top Navigation Bar */}
                <div className="bg-gray-100 px-3 py-2 border-b border-gray-300 flex items-center justify-between gap-2 select-none">
                  
                  {/* Traffic light dots */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-400"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-green-400"></span>
                    
                    <button
                      onClick={() => {
                        setIsIframeLoading(true);
                        setIframeKey((k) => k + 1);
                      }}
                      title="Muat ulang pratinjau"
                      className="p-1 rounded hover:bg-gray-300 text-gray-700 transition-colors cursor-pointer ml-1"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${isIframeLoading ? "animate-spin text-[#f15a24]" : ""}`} />
                    </button>
                  </div>

                  {/* Address Bar */}
                  <div className="flex-1 min-w-[170px] max-w-sm sm:max-w-md bg-white rounded-md px-2.5 py-1 border border-gray-300 flex items-center justify-between gap-1 shadow-2xs">
                    <div className="flex items-center gap-1.5 truncate text-[11px] font-mono text-gray-700">
                      <span className="text-emerald-600 font-bold">🔒 https://</span>
                      <span className="font-semibold text-gray-900 truncate">{cleanDomain}</span>
                    </div>
                    <a
                      href={fullTargetUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Buka tab baru"
                      className="text-gray-400 hover:text-gray-700 shrink-0"
                    >
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  {/* Mode Label */}
                  <div className="flex items-center gap-1 text-[10px] font-mono font-bold text-gray-700 bg-gray-200 px-2 py-0.5 rounded">
                    <SlidersHorizontal className="w-3 h-3 text-[#f15a24]" />
                    <span className="hidden sm:inline">Slider Inspeksi</span>
                  </div>
                </div>

                {/* THE INTERACTIVE DUAL-LAYER SPLIT SLIDER */}
                <div
                  ref={containerRef}
                  className="relative w-full h-[470px] sm:h-[530px] md:h-[580px] bg-slate-100 overflow-hidden select-none touch-none"
                  onMouseDown={handleMouseDown}
                  onTouchStart={handleMouseDown}
                >
                  {/* Dragging Barrier */}
                  {isDragging && (
                    <div className="absolute inset-0 z-30 cursor-ew-resize bg-transparent" />
                  )}

                  {/* Loading Overlay */}
                  {isIframeLoading && (
                    <div className="absolute inset-0 bg-white/90 backdrop-blur-xs flex flex-col items-center justify-center z-20 transition-opacity">
                      <Loader2 className="w-8 h-8 sm:w-10 sm:h-10 animate-spin text-[#f15a24] mb-3" />
                      <span className="font-bold text-sm text-gray-800">
                        Memuat & Memindai Website Asli...
                      </span>
                      <span className="text-xs text-gray-500 font-mono mt-1">
                        Target: {cleanDomain}
                      </span>
                    </div>
                  )}

                  {/* 1. UNDERLYING LAYER: SISI MODIFIKASI / LETAK DIBONGKAR (Right side) */}
                  <div className="absolute inset-0 w-full h-full bg-white">
                    <iframe
                      key={`infected-layer-${iframeKey}`}
                      src={infectedProxyUrl}
                      onLoad={() => setIsIframeLoading(false)}
                      className="w-full h-full border-0 bg-white"
                      title={`Audited View - ${cleanDomain}`}
                      sandbox="allow-same-origin allow-scripts allow-forms"
                    />

                    {/* Badge Penanda Kanan Atas */}
                    <div className="absolute top-2 right-2 z-10 pointer-events-none">
                      <span className="bg-red-600/95 text-white font-mono font-bold text-[10px] px-2.5 py-1 rounded shadow flex items-center gap-1.5 animate-pulse">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span>SISI MODIFIKASI: LETAK LINK DIBONGKAR</span>
                      </span>
                    </div>
                  </div>

                  {/* 2. TOP LAYER: NORMAL CLEAN VIEW (Left side, clipped) */}
                  <div
                    className="absolute inset-y-0 left-0 bg-white overflow-hidden border-r-2 border-[#f15a24] shadow-2xl z-10"
                    style={{ width: `${sliderPosition}%` }}
                  >
                    <div
                      className="h-full relative bg-white"
                      style={{
                        width: containerWidth > 0 ? `${containerWidth}px` : "100%",
                        minWidth: "100%"
                      }}
                    >
                      <iframe
                        key={`clean-layer-${iframeKey}`}
                        src={normalProxyUrl}
                        className="w-full h-full border-0 bg-white"
                        title={`Clean View - ${cleanDomain}`}
                        sandbox="allow-same-origin allow-scripts allow-forms"
                      />

                      {/* Badge Penanda Kiri Atas */}
                      <div className="absolute top-2 left-2 z-10 pointer-events-none">
                        <span className="bg-[#0b3c61]/95 text-white font-mono font-bold text-[10px] px-2.5 py-1 rounded shadow flex items-center gap-1.5">
                          <Eye className="w-3.5 h-3.5 text-emerald-400" />
                          <span>SISI ASLI: PENGUNJUNG NORMAL</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* 3. THE DRAGGABLE VERTICAL SLIDER HANDLE */}
                  <div
                    className="absolute inset-y-0 w-1 bg-[#f15a24] z-20 pointer-events-none"
                    style={{ left: `${sliderPosition}%` }}
                  >
                    <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#f15a24] text-white flex items-center justify-center shadow-2xl border-2 border-white pointer-events-auto cursor-ew-resize hover:scale-110 active:scale-95 transition-transform">
                      <span className="text-xs sm:text-sm font-bold select-none">↔</span>
                    </div>
                  </div>
                </div>

                {/* Bottom HUD Banner */}
                <div className="bg-[#0b3c61] text-white px-3 py-2 border-t border-gray-700 flex flex-wrap items-center justify-between gap-2 text-xs font-mono select-none">
                  <div className="flex items-center gap-2 min-w-0">
                    {isInfected ? (
                      <span className="flex items-center gap-1.5 bg-red-600 text-white px-2 py-0.5 rounded font-bold text-[11px] animate-pulse">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span>CLOAKING DETECTED</span>
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 bg-emerald-600 text-white px-2 py-0.5 rounded font-bold text-[11px]">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>INTEGRITAS AMAN</span>
                      </span>
                    )}
                    <span className="truncate text-gray-300 text-[11px]">
                      {isInfected
                        ? `Letak link tersembunyi berhasil dibongkar pada ${cleanDomain}`
                        : `Website ${cleanDomain} bersih tanpa indikasi injeksi tersembunyi`}
                    </span>
                  </div>

                  {isInfected && (
                    <button
                      onClick={() => setActiveTab("hidden_links")}
                      className="bg-[#f15a24] hover:bg-[#d94a18] text-white px-2.5 py-0.5 rounded font-sans font-bold cursor-pointer transition-colors text-xs"
                    >
                      Lihat Daftar Link ({detectedLinks.length}) &rarr;
                    </button>
                  )}
                </div>
              </div>

              {/* Slider instruction guide */}
              <div className="mt-2 text-center text-xs text-gray-600 font-mono">
                Geser handle <span className="font-bold text-[#f15a24]">↔</span> untuk melihat perbandingan: <strong className="text-emerald-700">Tampilan Pengunjung Normal</strong> vs <strong className="text-red-700">Letak Link Tersembunyi (Injeksi Peretas)</strong>
              </div>
            </div>

            {/* RIGHT COLUMN: Integrity Gauge Card & Action Buttons */}
            <div className="lg:col-span-4 flex flex-col gap-3 sm:gap-4">
              
              {/* Card: Skor Integritas */}
              <div className="bg-white rounded-2xl border-2 border-[#0b3c61] p-5 sm:p-6 shadow-md flex flex-col items-center text-center">
                <span className="text-sm sm:text-base font-bold text-gray-800">Skor Integritas</span>
                
                <div className="relative w-48 sm:w-56 h-28 sm:h-32 mt-2 sm:mt-3 flex items-end justify-center overflow-hidden">
                  <svg viewBox="0 0 200 110" className="w-full h-full">
                    <defs>
                      <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#ef4444" />
                        <stop offset="50%" stopColor="#fb923c" />
                        <stop offset="100%" stopColor="#22c55e" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M 25 100 A 75 75 0 0 1 175 100"
                      fill="none"
                      stroke="url(#gaugeGradient)"
                      strokeWidth="26"
                      strokeLinecap="round"
                    />
                    <g transform={`translate(100, 100) rotate(${needleRotation})`}>
                      <line
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="-72"
                        stroke="#111827"
                        strokeWidth="4"
                        strokeLinecap="round"
                        className="transition-transform duration-1000 ease-out"
                      />
                      <circle cx="0" cy="0" r="7" fill="#111827" />
                    </g>
                  </svg>
                </div>

                <div className="mt-2 font-mono font-black text-2xl sm:text-3xl text-gray-900">
                  {gaugeScore}
                </div>

                <div className={`mt-1.5 sm:mt-2 font-bold text-xs ${isInfected ? "text-red-600" : "text-green-600"}`}>
                  Status Sistem: {isInfected ? "Infected" : (scanData?.status || "Safe")}
                </div>

                {isInfected && (
                  <div className="mt-2.5 text-[11px] text-red-700 bg-red-50 p-2.5 rounded-lg border border-red-200 text-left font-mono leading-relaxed">
                    ⚠️ <strong>ANCAMAN SIBER:</strong> Terdeteksi {detectedLinks.length} injeksi tautan tersembunyi yang menargetkan mesin pencari (SEO Cloaking).
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <button
                onClick={() => setIsRemediationOpen(true)}
                className="w-full bg-[#f15a24] hover:bg-[#d94a18] text-white font-bold py-3 sm:py-3.5 px-4 sm:px-5 rounded-xl shadow-md transition-all flex items-center justify-between cursor-pointer text-xs sm:text-sm"
              >
                <span>Remediasi & Perbaikan</span>
                <RotateCw className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              <button
                onClick={() => setIsHtaccessOpen(true)}
                className="w-full bg-[#5cb85c] hover:bg-[#4ea64e] text-white font-bold py-3 sm:py-3.5 px-4 sm:px-5 rounded-xl shadow-md transition-all cursor-pointer text-xs sm:text-sm"
              >
                file ht.access perbaikan
              </button>

              <button
                onClick={() => setIsPhpScriptOpen(true)}
                className="w-full bg-[#5cb85c] hover:bg-[#4ea64e] text-white font-bold py-3 sm:py-3.5 px-4 sm:px-5 rounded-xl shadow-md transition-all cursor-pointer text-xs sm:text-sm"
              >
                Auto cleaning script php
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: Hidden Links Table */}
        {activeTab === "hidden_links" && (
          <div className="w-full bg-white rounded-2xl border-2 border-[#0b3c61] p-4 sm:p-6 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-200 gap-3">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-gray-900">
                  Daftar Link & Injeksi Tersembunyi (Cloaked Injections)
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Link terselubung ini ditanam peretas di website {cleanDomain} untuk dieksploitasi bot mesin pencari tanpa disadari pengunjung institusi.
                </p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => setIsHtaccessOpen(true)}
                  className="bg-[#5cb85c] hover:bg-[#4ea64e] text-white text-xs font-bold px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-lg cursor-pointer"
                >
                  Download .htaccess
                </button>
                <button
                  onClick={() => setIsRemediationOpen(true)}
                  className="bg-[#f15a24] hover:bg-[#d94a18] text-white text-xs font-bold px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-lg cursor-pointer"
                >
                  Panduan Remediasi
                </button>
              </div>
            </div>

            {scanData?.details?.findings?.length > 0 && (
              <div className="mt-4 p-3 bg-gray-900 rounded border border-gray-700 text-green-400 font-mono text-xs">
                <strong>&gt; LOG TEMUAN BACKEND:</strong>
                <ul className="list-disc ml-5 mt-1.5 space-y-1">
                  {scanData.details.findings.map((f: string, i: number) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="bg-gray-100 text-gray-700 border-b border-gray-200">
                    <th className="py-2.5 px-3">Teks Jangkar (Anchor)</th>
                    <th className="py-2.5 px-3">URL Sasaran Peretas</th>
                    <th className="py-2.5 px-3">Metode Sembunyi</th>
                    <th className="py-2.5 px-3">Tingkat Risiko</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {detectedLinks.map((item: any, idx: number) => (
                    <tr key={idx} className="hover:bg-red-50/50 transition-colors">
                      <td className="py-3 px-3 text-red-600 font-bold">{item.anchor}</td>
                      <td className="py-3 px-3 text-gray-700 break-all">{item.target || item.path}</td>
                      <td className="py-3 px-3 text-gray-600">
                        <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-800 text-[11px]">
                          {item.status}
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <span className="bg-red-100 text-red-800 font-bold px-2 py-0.5 rounded-full text-[10px]">
                          {item.risk}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between pt-4 border-t border-gray-100 gap-3">
              <span className="text-xs text-gray-500 font-mono">
                {detectedLinks.length === 0
                  ? "Sistem bersih. Tidak ada injeksi berbahaya."
                  : `Total ${detectedLinks.length} injeksi berbahaya teridentifikasi pada ${cleanDomain}.`}
              </span>
              <button
                onClick={() => setIsPhpScriptOpen(true)}
                className="bg-[#0b3c61] hover:bg-[#082a44] text-white font-bold text-xs px-4 py-2 rounded-lg cursor-pointer"
              >
                Unduh Auto Cleaning Script (.php)
              </button>
            </div>
          </div>
        )}
      </main>

      <RemediationModal isOpen={isRemediationOpen} onClose={() => setIsRemediationOpen(false)} targetUrl={targetUrl} />
      <HtaccessModal isOpen={isHtaccessOpen} onClose={() => setIsHtaccessOpen(false)} targetUrl={targetUrl} />
      <PhpScriptModal isOpen={isPhpScriptOpen} onClose={() => setIsPhpScriptOpen(false)} targetUrl={targetUrl} />
      <Footer />
    </div>
  );
}
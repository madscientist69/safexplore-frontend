"use client";

import React, { useState, useRef, useEffect } from "react";
import IsometricCubes from "./IsometricCubes";
import RemediationModal from "./RemediationModal";
import HtaccessModal from "./HtaccessModal";
import PhpScriptModal from "./PhpScriptModal";
import Footer from "./Footer";
import { ArrowLeft, RotateCw } from "lucide-react";

interface ResultViewProps {
  targetUrl: string;
  scanData?: any; 
  onBackToSearch: () => void;
}

export default function ResultView({ targetUrl, scanData, onBackToSearch }: ResultViewProps) {
  const [activeTab, setActiveTab] = useState<"web" | "hidden_links">("web");
  const [sliderPosition, setSliderPosition] = useState(38); 
  const [isDragging, setIsDragging] = useState(false);

  const [isRemediationOpen, setIsRemediationOpen] = useState(false);
  const [isHtaccessOpen, setIsHtaccessOpen] = useState(false);
  const [isPhpScriptOpen, setIsPhpScriptOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

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

  const isInfected = scanData?.status === "Infected";
  const gaugeScore = isInfected ? "20/100" : "98/100";
  const needleRotation = isInfected ? "-65" : "65"; 

  // MENGUBAH DATA STATIS MENJADI DINAMIS DARI BACKEND UNTUK TABEL
  const rawHiddenLinks = scanData?.details?.hidden_links_sample || [];
  const detectedLinks = rawHiddenLinks.map((linkUrl: string) => ({
    path: linkUrl,
    anchor: "Injeksi Link Tersembunyi",
    type: "Cloaked Backdoor Link",
    status: "Terdeteksi Scanner",
    risk: "Kritis"
  }));

  return (
    <div className="w-full min-h-screen bg-grid-blueprint flex flex-col justify-between relative overflow-hidden">
      <div className="w-full bg-[#f15a24] text-white py-2 px-4 md:px-8 flex justify-between items-center shadow-md z-30">
        <button onClick={onBackToSearch} className="flex items-center gap-1.5 text-xs md:text-sm font-semibold hover:text-orange-100 transition-colors cursor-pointer">
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Pencarian</span>
        </button>
        <span className="text-xs md:text-sm font-mono font-bold truncate max-w-xs md:max-w-none">
          Audit Hasil Domain: <span className="underline">{targetUrl}</span>
        </span>
      </div>

      <div className="absolute -bottom-6 -right-6 w-52 md:w-72 pointer-events-none z-10"><IsometricCubes variant="right" /></div>
      <div className="absolute -bottom-6 -left-6 w-52 md:w-72 pointer-events-none z-10"><IsometricCubes variant="left" /></div>

      <main className="max-w-6xl w-full mx-auto px-4 py-8 relative z-20 flex-1 flex flex-col">
        <div className="w-full max-w-xl mx-auto mb-6">
          <div className="w-full grid grid-cols-2 rounded-lg border-2 border-[#f15a24] overflow-hidden bg-white shadow-sm">
            <button onClick={() => setActiveTab("web")} className={`py-2.5 text-sm md:text-base font-bold text-center transition-all cursor-pointer border-r-2 border-[#f15a24] ${activeTab === "web" ? "bg-white text-[#f15a24]" : "bg-orange-50/40 text-gray-700 hover:text-[#f15a24]"}`}>
              Halaman Web
            </button>
            <button onClick={() => setActiveTab("hidden_links")} className={`py-2.5 text-sm md:text-base font-bold text-center transition-all cursor-pointer ${activeTab === "hidden_links" ? "bg-white text-[#f15a24]" : "bg-orange-50/40 text-gray-700 hover:text-[#f15a24]"}`}>
              Link Tersembunyi
            </button>
          </div>
        </div>

        {activeTab === "web" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-8 flex flex-col">
              
              {/* SLIDER ASLI DENGAN PLACEHOLDER SVG */}
              <div
                ref={containerRef}
                className="relative w-full h-[440px] md:h-[480px] rounded-2xl border-2 border-[#0b3c61] bg-white shadow-xl overflow-hidden select-none cursor-ew-resize"
                onMouseDown={handleMouseDown}
                onTouchStart={handleMouseDown}
              >
                {/* 1. UNDERLYING LAYER: COMPROMISED / INJECTED VIEW (Right Side) */}
                <div className="absolute inset-0 bg-white flex flex-col justify-between overflow-hidden">
                  <div className="pt-4 px-5 flex items-center justify-between border-b border-gray-100 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="px-3.5 py-1 bg-black text-white text-xs font-bold rounded-full">HOME</span>
                      <span className="px-3.5 py-1 border border-black bg-white text-black text-xs font-bold rounded-full">ABOUT US</span>
                    </div>
                    {isInfected ? (
                      <div className="flex items-center gap-2">
                        <div className="border-2 border-red-600 px-3 py-0.5 rounded"><span className="text-xs font-bold text-black font-mono">PORTFOLIO</span></div>
                        <div className="border-2 border-red-600 px-3 py-0.5 rounded"><span className="text-xs font-bold text-black font-mono">MEMBERS</span></div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 pr-8">
                        <span className="px-3 py-0.5 text-xs font-bold text-black font-mono">PORTFOLIO</span>
                        <span className="px-3 py-0.5 text-xs font-bold text-black font-mono">MEMBERS</span>
                      </div>
                    )}
                  </div>

                  <div className="my-auto flex flex-col items-center justify-center text-center px-4 relative">
                    <div className="font-mono font-bold text-xs md:text-sm text-gray-900 tracking-wider mb-2"># WELCOME TO_</div>
                    
                    <div className="relative flex items-center justify-center my-1">
                      <svg viewBox="0 0 520 80" className="w-full max-w-[480px] h-auto select-none" xmlns="http://www.w3.org/2000/svg">
                        <defs><pattern id="concentricStripe" width="10" height="7" patternUnits="userSpaceOnUse"><line x1="0" y1="1.5" x2="10" y2="1.5" stroke="#111827" strokeWidth="2" /><line x1="0" y1="4.5" x2="10" y2="4.5" stroke="#111827" strokeWidth="2" /></pattern></defs>
                        <text x="50%" y="65" textAnchor="middle" fill="url(#concentricStripe)" stroke="#111827" strokeWidth="2.5" className="font-mono font-black text-6xl tracking-tight" style={{ letterSpacing: "-0.03em" }}>RESSED H</text>
                      </svg>
                      {isInfected && <div className="absolute left-[36%] md:left-[37%] top-0 bottom-0 w-[30%] border-2 border-red-600 rounded-xs pointer-events-none"></div>}
                    </div>

                    <div className="relative flex items-center justify-center my-1">
                      <div className="flex items-center justify-center gap-1">
                        <div className="relative -mr-2 mb-2">
                          <svg viewBox="0 0 50 65" className="w-7 h-9 drop-shadow-xs" xmlns="http://www.w3.org/2000/svg">
                            <path d="M 25 5 C 10 5 8 20 8 40 C 8 58 14 55 18 52 C 22 49 28 55 32 52 C 36 49 42 58 42 40 C 42 20 40 5 25 5 Z" fill="#ffffff" stroke="#111827" strokeWidth="2.5" />
                            <path d="M 12 36 Q 25 43 38 36" stroke="#111827" strokeWidth="3.5" />
                            <circle cx="25" cy="40" r="3.5" fill="#facc15" stroke="#111827" strokeWidth="1.5" />
                            <path d="M 15 22 L 20 27 M 20 22 L 15 27" stroke="#111827" strokeWidth="2" strokeLinecap="round" />
                            <path d="M 28 22 L 33 27 M 33 22 L 28 27" stroke="#111827" strokeWidth="2" strokeLinecap="round" />
                          </svg>
                        </div>
                        <svg viewBox="0 0 160 80" className="w-24 md:w-32 h-auto select-none" xmlns="http://www.w3.org/2000/svg">
                          <text x="10" y="65" fill="url(#concentricStripe)" stroke="#111827" strokeWidth="2.5" className="font-mono font-black text-6xl tracking-tight">CHO</text>
                        </svg>
                        <div className="relative mx-1">
                          <svg viewBox="0 0 90 90" className="w-14 h-14 md:w-16 md:h-16" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="45" cy="45" r="40" fill="#d1d5db" stroke="#111827" strokeWidth="3.5" />
                            <path d="M 25 35 L 37 47 M 37 35 L 25 47" stroke="#111827" strokeWidth="4.5" strokeLinecap="round" />
                            <path d="M 53 35 L 65 47 M 65 35 L 53 47" stroke="#111827" strokeWidth="4.5" strokeLinecap="round" />
                            <path d="M 32 58 Q 45 74 58 58 Z" fill="#991b1b" stroke="#111827" strokeWidth="3" />
                          </svg>
                        </div>
                        <div className="relative">
                          <svg viewBox="0 0 150 80" className="w-24 md:w-32 h-auto select-none" xmlns="http://www.w3.org/2000/svg">
                            <text x="10" y="65" fill="url(#concentricStripe)" stroke="#111827" strokeWidth="2.5" className="font-mono font-black text-6xl tracking-tight">LER</text>
                          </svg>
                          {isInfected && <div className="absolute left-1 top-2 bottom-1 w-[60%] border-2 border-red-600 rounded-xs pointer-events-none"></div>}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-center gap-4">
                      <svg viewBox="0 0 40 40" className="w-7 h-7 text-black stroke-current" fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="30" y1="10" x2="10" y2="30" /><polyline points="22 30 10 30 10 18" /></svg>
                      <div className={`relative ${isInfected ? 'border-2 border-red-600 p-0.5 rounded' : ''}`}>
                        <div className="border border-black px-6 py-2 bg-white text-black font-mono font-bold text-xs md:text-sm tracking-wider">EXPLORE US</div>
                      </div>
                      <svg viewBox="0 0 40 40" className="w-7 h-7 text-black stroke-current" fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="10" y1="30" x2="30" y2="10" /><polyline points="18 10 30 10 30 22" /></svg>
                    </div>
                  </div>
                  <div className="w-full bg-black text-white text-[11px] font-mono py-1.5 px-4 overflow-hidden whitespace-nowrap tracking-wider">ED HIGH SCHOOLER • PORTFOLIO • MEMBERS • ARTWORK • DEPRESSED HIGH SCHOOLER • PORTFOLI</div>
                </div>

                {/* 2. TOP LAYER: NORMAL CLEAN VIEW (Left Side, clipped by sliderPosition) */}
                <div
                  className="absolute inset-y-0 left-0 bg-white flex flex-col justify-between overflow-hidden border-r-2 border-[#f15a24] shadow-2xl z-10"
                  style={{ width: `${sliderPosition}%` }}
                >
                  <div className="w-[600px] md:w-[720px] h-full flex flex-col justify-between">
                    <div className="pt-4 px-5 flex items-center justify-between border-b border-gray-100 pb-3">
                      <div className="flex items-center gap-2">
                        <span className="px-3.5 py-1 bg-black text-white text-xs font-bold rounded-full">HOME</span>
                        <span className="px-3.5 py-1 border border-black bg-white text-black text-xs font-bold rounded-full">ABOUT US</span>
                      </div>
                      <div className="flex items-center gap-2 pr-8">
                        <span className="px-3 py-0.5 text-xs font-bold text-black font-mono">PORTFOLIO</span>
                        <span className="px-3 py-0.5 text-xs font-bold text-black font-mono">MEMBERS</span>
                      </div>
                    </div>

                    <div className="my-auto flex flex-col items-center justify-center text-center px-4">
                      <div className="font-mono font-bold text-xs md:text-sm text-gray-900 tracking-wider mb-2"># WELCOME TO_</div>
                      <div className="relative flex items-center justify-center my-1">
                        <svg viewBox="0 0 520 80" className="w-full max-w-[480px] h-auto select-none" xmlns="http://www.w3.org/2000/svg">
                          <text x="50%" y="65" textAnchor="middle" fill="url(#concentricStripe)" stroke="#111827" strokeWidth="2.5" className="font-mono font-black text-6xl tracking-tight" style={{ letterSpacing: "-0.03em" }}>RESSED H</text>
                        </svg>
                      </div>
                      <div className="relative flex items-center justify-center my-1">
                        <div className="flex items-center justify-center gap-1">
                          <div className="relative -mr-2 mb-2">
                            <svg viewBox="0 0 50 65" className="w-7 h-9 drop-shadow-xs" xmlns="http://www.w3.org/2000/svg">
                              <path d="M 25 5 C 10 5 8 20 8 40 C 8 58 14 55 18 52 C 22 49 28 55 32 52 C 36 49 42 58 42 40 C 42 20 40 5 25 5 Z" fill="#ffffff" stroke="#111827" strokeWidth="2.5" />
                              <path d="M 12 36 Q 25 43 38 36" stroke="#111827" strokeWidth="3.5" />
                              <circle cx="25" cy="40" r="3.5" fill="#facc15" stroke="#111827" strokeWidth="1.5" />
                              <path d="M 15 22 L 20 27 M 20 22 L 15 27" stroke="#111827" strokeWidth="2" strokeLinecap="round" />
                              <path d="M 28 22 L 33 27 M 33 22 L 28 27" stroke="#111827" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                          </div>
                          <svg viewBox="0 0 160 80" className="w-24 md:w-32 h-auto select-none" xmlns="http://www.w3.org/2000/svg">
                            <text x="10" y="65" fill="url(#concentricStripe)" stroke="#111827" strokeWidth="2.5" className="font-mono font-black text-6xl tracking-tight">CHO</text>
                          </svg>
                          <div className="relative mx-1">
                            <svg viewBox="0 0 90 90" className="w-14 h-14 md:w-16 md:h-16" xmlns="http://www.w3.org/2000/svg">
                              <circle cx="45" cy="45" r="40" fill="#d1d5db" stroke="#111827" strokeWidth="3.5" />
                              <path d="M 25 35 L 37 47 M 37 35 L 25 47" stroke="#111827" strokeWidth="4.5" strokeLinecap="round" />
                              <path d="M 53 35 L 65 47 M 65 35 L 53 47" stroke="#111827" strokeWidth="4.5" strokeLinecap="round" />
                              <path d="M 32 58 Q 45 74 58 58 Z" fill="#991b1b" stroke="#111827" strokeWidth="3" />
                            </svg>
                          </div>
                          <svg viewBox="0 0 150 80" className="w-24 md:w-32 h-auto select-none" xmlns="http://www.w3.org/2000/svg">
                            <text x="10" y="65" fill="url(#concentricStripe)" stroke="#111827" strokeWidth="2.5" className="font-mono font-black text-6xl tracking-tight">LER</text>
                          </svg>
                        </div>
                      </div>
                      <div className="mt-4 flex items-center justify-center gap-4">
                        <svg viewBox="0 0 40 40" className="w-7 h-7 text-black stroke-current" fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="30" y1="10" x2="10" y2="30" /><polyline points="22 30 10 30 10 18" /></svg>
                        <div className="border border-black px-6 py-2 bg-white text-black font-mono font-bold text-xs md:text-sm tracking-wider">EXPLORE US</div>
                        <svg viewBox="0 0 40 40" className="w-7 h-7 text-black stroke-current" fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="10" y1="30" x2="30" y2="10" /><polyline points="18 10 30 10 30 22" /></svg>
                      </div>
                    </div>
                    <div className="w-full bg-black text-white text-[11px] font-mono py-1.5 px-4 overflow-hidden whitespace-nowrap tracking-wider">ED HIGH SCHOOLER • PORTFOLIO • MEMBERS • ARTWORK • DEPRESSED HIGH SCHOOLER • PORTFOLI</div>
                  </div>
                </div>

                {/* 3. THE DRAGGABLE VERTICAL SLIDER HANDLE */}
                <div
                  className="absolute inset-y-0 w-1 bg-[#f15a24] z-20 pointer-events-none"
                  style={{ left: `${sliderPosition}%` }}
                >
                  <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#f15a24] text-white flex items-center justify-center shadow-2xl border-2 border-white pointer-events-auto cursor-ew-resize hover:scale-110 active:scale-95 transition-transform">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-white stroke-[2.5]" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="mt-2 text-center text-xs text-gray-500 font-mono">
                Geser handle <span className="font-bold text-[#f15a24]">→</span> untuk melihat perbandingan halaman asli vs modifikasi peretas.
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-4">
              <div className="bg-white rounded-2xl border-2 border-[#0b3c61] p-6 shadow-md flex flex-col items-center text-center">
                <span className="text-base font-bold text-gray-800">Skor Integritas</span>
                <div className="relative w-56 h-32 mt-3 flex items-end justify-center overflow-hidden">
                  <svg viewBox="0 0 200 110" className="w-full h-full">
                    <defs>
                      <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#ef4444" />
                        <stop offset="50%" stopColor="#fb923c" />
                        <stop offset="100%" stopColor="#22c55e" />
                      </linearGradient>
                    </defs>
                    <path d="M 25 100 A 75 75 0 0 1 175 100" fill="none" stroke="url(#gaugeGradient)" strokeWidth="26" strokeLinecap="round" />
                    <g transform={`translate(100, 100) rotate(${needleRotation})`}>
                      <line x1="0" y1="0" x2="0" y2="-72" stroke="#111827" strokeWidth="4" strokeLinecap="round" className="transition-transform duration-1000 ease-out" />
                      <circle cx="0" cy="0" r="7" fill="#111827" />
                    </g>
                  </svg>
                </div>
                <div className="mt-2 font-mono font-black text-3xl text-gray-900">{gaugeScore}</div>
                <div className={`mt-2 font-bold text-xs ${isInfected ? 'text-red-600' : 'text-green-600'}`}>Status Sistem: {scanData?.status || "Unknown"}</div>
              </div>

              <button onClick={() => setIsRemediationOpen(true)} className="w-full bg-[#f15a24] hover:bg-[#d94a18] text-white font-bold py-3.5 px-5 rounded-xl shadow-md transition-all flex items-center justify-between cursor-pointer text-sm">
                <span>Remediasi & Perbaikan</span><RotateCw className="w-5 h-5" />
              </button>
              <button onClick={() => setIsHtaccessOpen(true)} className="w-full bg-[#5cb85c] hover:bg-[#4ea64e] text-white font-bold py-3.5 px-5 rounded-xl shadow-md transition-all cursor-pointer text-sm">file ht.access perbaikan</button>
              <button onClick={() => setIsPhpScriptOpen(true)} className="w-full bg-[#5cb85c] hover:bg-[#4ea64e] text-white font-bold py-3.5 px-5 rounded-xl shadow-md transition-all cursor-pointer text-sm">Auto cleaning script php</button>
            </div>
          </div>
        )}

        {activeTab === "hidden_links" && (
          <div className="w-full bg-white rounded-2xl border-2 border-[#0b3c61] p-6 shadow-xl">
            <div className="flex justify-between pb-4 border-b border-gray-200">
              <div>
                <h3 className="text-lg font-bold">Daftar Link & Injeksi Tersembunyi</h3>
                <p className="text-xs text-gray-500">Link terselubung ini ditanam peretas untuk dieksploitasi bot mesin pencari.</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setIsHtaccessOpen(true)} className="bg-[#5cb85c] text-white text-xs font-bold px-3.5 py-2 rounded-lg cursor-pointer">Download .htaccess</button>
                <button onClick={() => setIsRemediationOpen(true)} className="bg-[#f15a24] text-white text-xs font-bold px-3.5 py-2 rounded-lg cursor-pointer">Panduan Remediasi</button>
              </div>
            </div>

            {scanData?.details?.findings?.length > 0 && (
               <div className="mt-4 p-3 bg-gray-900 rounded border border-gray-700 text-green-400 font-mono text-xs">
                 <strong>&gt; LOG TEMUAN BACKEND PYTHON:</strong>
                 <ul className="list-disc ml-5 mt-1">
                   {scanData.details.findings.map((f: string, i: number) => <li key={i}>{f}</li>)}
                 </ul>
               </div>
            )}

            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="bg-gray-100 text-gray-700 border-b border-gray-200">
                    <th className="py-2.5 px-3">File / Path</th>
                    <th className="py-2.5 px-3">Teks Jangkar</th>
                    <th className="py-2.5 px-3">Metode Serangan</th>
                    <th className="py-2.5 px-3">Status Respon</th>
                    <th className="py-2.5 px-3">Tingkat Risiko</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {detectedLinks.map((item: any, idx: number) => (
                    <tr key={idx} className="hover:bg-red-50/50">
                      <td className="py-3 px-3 font-semibold text-gray-800">{item.path}</td>
                      <td className="py-3 px-3 text-red-600 font-bold">{item.anchor}</td>
                      <td className="py-3 px-3 text-gray-600">{item.type}</td>
                      <td className="py-3 px-3"><span className="bg-gray-100 px-2 py-0.5 rounded text-gray-700">{item.status}</span></td>
                      <td className="py-3 px-3"><span className="bg-red-100 text-red-800 font-bold px-2 py-0.5 rounded-full text-[10px]">{item.risk}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between pt-4 border-t border-gray-100">
              <span className="text-xs text-gray-500 font-mono">
                {detectedLinks.length === 0 ? "Sistem bersih. Tidak ada injeksi berbahaya." : `Total ${detectedLinks.length} injeksi berbahaya teridentifikasi.`}
              </span>
              <button onClick={() => setIsPhpScriptOpen(true)} className="bg-[#0b3c61] text-white font-bold text-xs px-5 py-2.5 rounded-lg">Unduh Auto Cleaning Script (.php)</button>
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
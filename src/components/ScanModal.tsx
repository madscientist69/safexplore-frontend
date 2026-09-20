"use client";

import React, { useState, useEffect, useRef } from "react";
import Footer from "./Footer";
import { Loader2 } from "lucide-react";

interface ScanModalProps {
  targetUrl: string;
  onComplete: (data: any) => void;
  onCancel?: () => void;
}

export default function ScanModal({ targetUrl, onComplete, onCancel }: ScanModalProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [progressPercent, setProgressPercent] = useState(15);
  const [currentActionLog, setCurrentActionLog] = useState("Mengirimkan HTTP Request dengan User-Agent: Googlebot/2.1...");

  const hasFetched = useRef(false);
  const scanDataRef = useRef<any>(null);

  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true;
      const fetchBackend = async () => {
        try {
          const response = await fetch("${process.env.NEXT_PUBLIC_API_URL}/api/scan", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url: targetUrl }),
          });
          scanDataRef.current = await response.json();
        } catch (error) {
          console.error("Gagal koneksi ke backend:", error);
          scanDataRef.current = { status: "Error", details: { findings: [] }, remediation_script: "" };
        }
      };
      fetchBackend();
    }

    const t1 = setTimeout(() => {
      setStep(2);
      setProgressPercent(55);
      setCurrentActionLog("Mengemulasi browser Android Chrome Mobile untuk mendeteksi script redirect judi online...");
    }, 2800);

    const t2 = setTimeout(() => {
      setStep(3);
      setProgressPercent(88);
      setCurrentActionLog("Mengemulasi sesi Administrator Desktop, memindai integritas berkas, .htaccess...");
    }, 5600);

    const t3 = setTimeout(() => {
      setProgressPercent(100);
      setCurrentActionLog("Pemindaian selesai. Menganalisis hasil...");
      
      const finalData = scanDataRef.current || { status: "Safe", details: { findings: [] }, remediation_script: "" };
      
      // CEK VALIDASI DOMAIN DARI BACKEND
      if (finalData.status === "Invalid Domain") {
        alert(`❌ Domain "${targetUrl}" tidak ditemukan atau tidak aktif di internet. Silakan masukkan domain institusi yang valid.`);
        if (onCancel) onCancel(); // Langsung tutup modal dan kembali ke halaman Home
        return;
      }
      
      onComplete(finalData); 
    }, 8200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [targetUrl, onComplete, onCancel]);

  return (
    <div className="w-full min-h-screen bg-grid-blueprint flex flex-col justify-between items-center relative overflow-hidden">
      
      <div className="w-full bg-[#f15a24] text-white py-2 px-6 flex justify-between items-center text-xs md:text-sm font-mono shadow-md">
        <span>Target Audit: <strong className="underline">{targetUrl}</strong></span>
        {onCancel && (
          <button onClick={onCancel} className="text-white/80 hover:text-white underline cursor-pointer">
            Batal
          </button>
        )}
      </div>

      <div className="w-full max-w-xl mx-auto flex-1 flex flex-col items-center justify-center px-4 py-12 relative z-10">
        
        <div className="relative w-80 h-80 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-dotted-radar opacity-70 animate-spin-slow pointer-events-none"></div>
          <div className="absolute inset-6 rounded-full border border-dashed border-[#f15a24]/30 animate-pulse pointer-events-none"></div>

          <div className="w-40 h-40 rounded-full border-[3.5px] border-[#0a3e66] bg-white flex items-center justify-center relative shadow-lg z-10">
            {step === 1 && (
              <div className="flex flex-col items-center justify-center animate-fade-in">
                <svg viewBox="0 0 64 64" className="w-20 h-20 fill-none stroke-[#f15a24] stroke-[2.5]" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="32" y1="8" x2="32" y2="16" />
                  <circle cx="32" cy="7" r="2.5" fill="#f15a24" />
                  <path d="M16 38 C16 23 23 16 32 16 C41 16 48 23 48 38 Z" />
                  <circle cx="25" cy="28" r="2.5" fill="#f15a24" />
                  <circle cx="39" cy="28" r="2.5" fill="#f15a24" />
                  <rect x="23" y="34" width="18" height="9" rx="1" />
                  <line x1="29" y1="34" x2="29" y2="43" />
                  <line x1="35" y1="34" x2="35" y2="43" />
                </svg>
              </div>
            )}
            {step === 2 && (
              <div className="flex flex-col items-center justify-center animate-fade-in">
                <svg viewBox="0 0 64 64" className="w-20 h-20 fill-none stroke-[#f15a24] stroke-[2.5]" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 24 C16 14 23 10 32 10 C41 10 48 14 48 24 C48 36 42 46 32 46 C22 46 16 36 16 24 Z" />
                  <ellipse cx="24" cy="23" rx="4" ry="5.5" transform="rotate(-15 24 23)" />
                  <ellipse cx="40" cy="23" rx="4" ry="5.5" transform="rotate(15 40 23)" />
                </svg>
              </div>
            )}
            {step === 3 && (
              <div className="flex flex-col items-center justify-center animate-fade-in">
                <svg viewBox="0 0 64 64" className="w-20 h-20 fill-none stroke-[#f15a24] stroke-[2.5]" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 20 L18 14 L24 14" />
                  <path d="M46 20 L46 14 L40 14" />
                  <path d="M18 40 L18 46 L24 46" />
                  <path d="M46 40 L46 46 L40 46" />
                  <circle cx="32" cy="25" r="5" />
                  <path d="M24 39 C24 33 28 32 32 32 C36 32 40 39" />
                </svg>
              </div>
            )}
          </div>
        </div>

        <div className="mt-4 flex items-center justify-center w-48 relative">
          <div className="absolute h-1 bg-gray-300 w-full top-1/2 -translate-y-1/2 z-0"></div>
          <div className="absolute h-1 bg-[#f15a24] transition-all duration-700 top-1/2 -translate-y-1/2 z-0" style={{ width: step === 1 ? "0%" : step === 2 ? "50%" : "100%" }}></div>
          <div className="flex-1 flex justify-start z-10">
            <span className={`w-5 h-5 rounded-full border-2 border-white shadow transition-all ${step >= 1 ? "bg-[#f15a24] scale-110 ring-2 ring-[#f15a24]/30" : "bg-gray-300"}`} />
          </div>
          <div className="flex-1 flex justify-center z-10">
            <span className={`w-5 h-5 rounded-full border-2 border-white shadow transition-all ${step >= 2 ? "bg-[#f15a24] scale-110 ring-2 ring-[#f15a24]/30" : "bg-gray-300"}`} />
          </div>
          <div className="flex-1 flex justify-end z-10">
            <span className={`w-5 h-5 rounded-full border-2 border-white shadow transition-all ${step === 3 ? "bg-[#22c55e] scale-110 ring-2 ring-[#22c55e]/30" : "bg-gray-300"}`} />
          </div>
        </div>

        <div className="mt-6 w-full max-w-md bg-[#f15a24] text-white py-2.5 px-6 rounded-full text-center font-bold text-sm md:text-base shadow-md">
          {step === 1 && "Meniru Googlebot Crawler..."}
          {step === 2 && "Meniru Pengguna Mobile Android..."}
          {step === 3 && "Meniru Administrator Desktop..."}
        </div>

        <div className="mt-2 text-xs md:text-sm text-gray-600 font-mono flex items-center gap-1.5">
          <Loader2 className="w-3.5 h-3.5 animate-spin text-[#f15a24]" />
          <span>Loading...</span>
        </div>

        <div className="mt-6 w-full max-w-lg bg-gray-900 text-green-400 p-3 rounded-lg font-mono text-[11px] shadow-md border border-gray-800">
          <div className="flex items-center justify-between text-gray-500 pb-1 mb-1 border-b border-gray-800 text-[10px]">
            <span>LIVE AUDIT STREAM</span>
            <span>{progressPercent}% SELESAI</span>
          </div>
          <div className="truncate text-gray-300">
            &gt; {currentActionLog}
          </div>
        </div>

      </div>
      <Footer />
    </div>
  );
}
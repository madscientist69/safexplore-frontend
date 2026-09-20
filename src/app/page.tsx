"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ObservatorySection from "@/components/ObservatorySection";
import ScanModal from "@/components/ScanModal";
import ResultView from "@/components/ResultView";
import Footer from "@/components/Footer";

export default function Home() {
  const [viewState, setViewState] = useState<"home" | "scanning" | "result">("home");
  const [targetUrl, setTargetUrl] = useState("smansatu.sch.id");
  const [scanResult, setScanResult] = useState<any>(null);
  
  // Trigger update untuk Observatory
  const [scanCount, setScanCount] = useState(0);

  const handleStartScan = (url: string) => {
    setTargetUrl(url);
    setViewState("scanning");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleScanComplete = (data: any) => {
    setScanResult(data);
    // Memicu fetch ulang di ObservatorySection
    setScanCount(prev => prev + 1);
    setViewState("result");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackToHome = () => {
    setViewState("home");
    setScanResult(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#f5f7f9] text-[#1c2a38]">
      
      {viewState === "scanning" && (
        <ScanModal
          targetUrl={targetUrl}
          onComplete={handleScanComplete}
          onCancel={handleBackToHome}
        />
      )}

      {viewState === "result" && (
        <ResultView
          targetUrl={targetUrl}
          scanData={scanResult}
          onBackToSearch={handleBackToHome}
        />
      )}

      {viewState === "home" && (
        <>
          <Navbar
            onNavigate={(id) => {
              const el = document.getElementById(id);
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            onResetToHome={handleBackToHome}
          />

          <main className="flex-1 flex flex-col">
            <HeroSection onStartScan={handleStartScan} />
            <AboutSection />
            
            {/* Lempar trigger ke Observatory */}
            <ObservatorySection refreshTrigger={scanCount} />
          </main>

          <Footer />
        </>
      )}

    </div>
  );
}
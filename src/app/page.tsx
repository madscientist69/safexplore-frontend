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

  const handleStartScan = (url: string) => {
    setTargetUrl(url);
    setViewState("scanning");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleScanComplete = () => {
    setViewState("result");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackToHome = () => {
    setViewState("home");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#f5f7f9] text-[#1c2a38]">
      
      {/* 1. SCANNING MODAL STATE (Screenshots 2, 3, 4) */}
      {viewState === "scanning" && (
        <ScanModal
          targetUrl={targetUrl}
          onComplete={handleScanComplete}
          onCancel={handleBackToHome}
        />
      )}

      {/* 2. SCAN RESULT STATE (Screenshot 5) */}
      {viewState === "result" && (
        <ResultView
          targetUrl={targetUrl}
          onBackToSearch={handleBackToHome}
        />
      )}

      {/* 3. HOME LANDING STATE (Screenshot 1) */}
      {viewState === "home" && (
        <>
          {/* Header Navigation */}
          <Navbar
            onNavigate={(id) => {
              const el = document.getElementById(id);
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            onResetToHome={handleBackToHome}
          />

          <main className="flex-1 flex flex-col">
            {/* Hero Section */}
            <HeroSection onStartScan={handleStartScan} />

            {/* "Tahukah Kalian?" Section */}
            <AboutSection />

            {/* "Observatory Page" Section */}
            <ObservatorySection />
          </main>

          {/* Footer */}
          <Footer />
        </>
      )}

    </div>
  );
}

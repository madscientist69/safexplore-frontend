"use client";

import React from "react";
import { ShieldAlert, Globe2 } from "lucide-react";

interface NavbarProps {
  onNavigate?: (sectionId: string) => void;
  onResetToHome?: () => void;
}

export default function Navbar({ onNavigate, onResetToHome }: NavbarProps) {
  const handleScroll = (id: string) => {
    if (onNavigate) {
      onNavigate(id);
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full flex justify-center pt-0">
      {/* Top orange curved boundary bar */}
      <div className="w-full bg-[#f15a24] text-white flex justify-center items-center relative shadow-md">
        <div className="max-w-4xl w-full flex justify-between items-center px-4 md:px-8 py-2 text-sm font-semibold tracking-wide">
          
          {/* Left Nav: Observatory */}
          <button
            onClick={() => handleScroll("observatory")}
            className="flex items-center gap-1.5 hover:text-orange-100 transition-all font-medium py-1 px-3 rounded-full hover:bg-white/15 cursor-pointer"
          >
            <Globe2 className="w-4 h-4" />
            <span>Observatory</span>
          </button>

          {/* Center Pill: Safexplore Emblem */}
          <div
            onClick={onResetToHome}
            className="absolute left-1/2 -translate-x-1/2 top-0 translate-y-[-2px] bg-[#0b3c61] text-white px-6 py-2.5 rounded-b-2xl shadow-lg border-2 border-t-0 border-[#f15a24]/50 flex items-center gap-2 cursor-pointer hover:bg-[#082a44] transition-all group"
          >
            <div className="w-7 h-7 rounded-full bg-[#00d2ff]/20 flex items-center justify-center border border-[#00d2ff]/60 group-hover:scale-105 transition-transform">
              <ShieldAlert className="w-4 h-4 text-[#00d2ff]" />
            </div>
            <span className="font-bold tracking-wider text-base md:text-lg text-white font-mono">
              Safexplore
            </span>
          </div>

          {/* Right Nav: About Us */}
          <button
            onClick={() => handleScroll("about")}
            className="hover:text-orange-100 transition-all font-medium py-1 px-3 rounded-full hover:bg-white/15 cursor-pointer"
          >
            <span>About Us</span>
          </button>
        </div>
      </div>
    </header>
  );
}

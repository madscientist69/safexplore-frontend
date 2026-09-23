"use client";

import React from "react";

export default function Footer() {
  return (
    <footer className="relative w-full bg-white pt-8 sm:pt-10 pb-6 sm:pb-8 px-4 overflow-hidden border-t border-gray-200">
      
      {/* Background arch / curved hill backdrop */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-[#f0f2f5] rounded-t-[40px] sm:rounded-t-[70px] md:rounded-t-[100px] pointer-events-none -z-0"></div>

      <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-start w-full">
        
        {/* Developer Contacts */}
        <div className="text-left mb-4 sm:mb-6 w-full">
          <div className="font-mono font-black text-xs sm:text-sm md:text-base text-gray-900 tracking-wider">
            CONTACT DEVELOPER :
          </div>

          <div className="flex flex-col gap-1.5 mt-2">
            {/* Instagram */}
            <a
              href="https://www.instagram.com/depressedhighschooler_official/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-xs sm:text-sm font-bold text-gray-800 hover:text-[#f15a24] transition-colors font-mono break-all sm:break-normal"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-2 shrink-0" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
              <span>DEPRESSEDHIGHSCHOOLER_OFFICIAL</span>
            </a>

            {/* YouTube */}
            <a
              href="https://www.youtube.com/@DepressedHighSchooler"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-xs sm:text-sm font-bold text-gray-800 hover:text-[#f15a24] transition-colors font-mono break-all sm:break-normal"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-2 shrink-0" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                <path d="m10 15 5-3-5-3z" fill="currentColor" />
              </svg>
              <span>@DEPRESSEDHIGHSCHOOLER</span>
            </a>
          </div>
        </div>

        {/* Big Retro-Striped "CONTACT US!" Banner with Mascot Face */}
        <div className="w-full flex justify-center items-center py-4 select-none">
          <svg
            viewBox="0 0 900 160"
            className="w-full max-w-2xl h-auto drop-shadow-sm"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Striped pattern for the letters */}
              <pattern
                id="stripePattern"
                width="10"
                height="6"
                patternUnits="userSpaceOnUse"
                patternTransform="rotate(0)"
              >
                <line x1="0" y1="1" x2="10" y2="1" stroke="#111827" strokeWidth="2.2" />
                <line x1="0" y1="4" x2="10" y2="4" stroke="#111827" strokeWidth="2.2" />
              </pattern>
            </defs>

            {/* Striped Text outline & fill */}
            <g fill="url(#stripePattern)" stroke="#111827" strokeWidth="2">
              {/* C */}
              <path d="M 60 40 C 30 40 10 65 10 95 C 10 125 30 150 60 150 C 80 150 95 140 100 130 L 85 118 C 80 125 72 132 60 132 C 42 132 28 116 28 95 C 28 74 42 58 60 58 C 72 58 80 65 85 72 L 100 60 C 95 50 80 40 60 40 Z" />
              
              {/* O */}
              <path d="M 160 40 C 130 40 110 65 110 95 C 110 125 130 150 160 150 C 190 150 210 125 210 95 C 210 65 190 40 160 40 Z M 160 58 C 178 58 192 74 192 95 C 192 116 178 132 160 132 C 142 132 128 116 128 95 C 128 74 142 58 160 58 Z" />

              {/* N */}
              <path d="M 225 43 L 243 43 L 280 115 L 280 43 L 298 43 L 298 147 L 280 147 L 243 75 L 243 147 L 225 147 Z" />

              {/* T */}
              <path d="M 310 43 L 375 43 L 375 61 L 351 61 L 351 147 L 334 147 L 334 61 L 310 61 Z" />
            </g>

            {/* MASCOT FACE inside the "A" spot */}
            <g transform="translate(425, 95)">
              {/* Face circle */}
              <circle cx="0" cy="0" r="42" fill="#d1d5db" stroke="#111827" strokeWidth="3" />
              {/* Left 'x' eye */}
              <path d="M -22 -10 L -10 2 M -10 -10 L -22 2" stroke="#111827" strokeWidth="4" strokeLinecap="round" />
              {/* Right 'x' eye */}
              <path d="M 10 -10 L 22 2 M 22 -10 L 10 2" stroke="#111827" strokeWidth="4" strokeLinecap="round" />
              {/* Smiling mouth with tongue */}
              <path d="M -12 14 Q 0 28 12 14 Z" fill="#b91c1c" stroke="#111827" strokeWidth="2.5" />
            </g>

            {/* Rest of letters: C T U S ! */}
            <g fill="url(#stripePattern)" stroke="#111827" strokeWidth="2">
              {/* C */}
              <path d="M 525 40 C 495 40 475 65 475 95 C 475 125 495 150 525 150 C 545 150 560 140 565 130 L 550 118 C 545 125 537 132 525 132 C 507 132 493 116 493 95 C 493 74 507 58 525 58 C 537 58 545 65 550 72 L 565 60 C 560 50 545 40 525 40 Z" />

              {/* T */}
              <path d="M 580 43 L 645 43 L 645 61 L 621 61 L 621 147 L 604 147 L 604 61 L 580 61 Z" />

              {/* U */}
              <path d="M 660 43 L 678 43 L 678 115 C 678 128 688 134 700 134 C 712 134 722 128 722 115 L 722 43 L 740 43 L 740 115 C 740 138 722 150 700 150 C 678 150 660 138 660 115 Z" />

              {/* S */}
              <path d="M 760 128 C 765 139 778 147 795 147 C 812 147 824 139 824 126 C 824 112 810 106 790 101 C 765 95 750 87 750 68 C 750 50 766 40 788 40 C 808 40 822 48 828 62 L 812 70 C 808 61 798 56 788 56 C 776 56 768 62 768 70 C 768 80 778 85 798 90 C 825 97 842 106 842 126 C 842 144 826 158 795 158 C 770 158 752 146 744 128 Z" />

              {/* ! */}
              <path d="M 860 43 L 874 43 L 871 115 L 863 115 Z" />
              <rect x="860" y="128" width="14" height="19" rx="2" />
            </g>
          </svg>
        </div>

        <div className="w-full text-center text-xs text-gray-500 font-mono mt-2">
          © {new Date().getFullYear()} Safexplore Digital Shield. All rights reserved.
        </div>

      </div>
    </footer>
  );
}

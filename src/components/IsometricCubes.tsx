"use client";

import React from "react";

interface IsometricCubesProps {
  className?: string;
  variant?: "left" | "right" | "stacked";
  colorMode?: "orange-blue" | "all-blue";
}

export default function IsometricCubes({
  className = "",
  variant = "right",
  colorMode = "orange-blue",
}: IsometricCubesProps) {
  const strokeColor = colorMode === "orange-blue" ? "#f15a24" : "#0ea5e9";
  const fillColorTop = "#0f4368";
  const fillColorLeft = "#0a2e47";
  const fillColorRight = "#072033";

  if (variant === "left") {
    return (
      <div className={`pointer-events-none select-none ${className}`}>
        <svg
          viewBox="0 0 240 200"
          className="w-full h-auto drop-shadow-md"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Base Cube 1 */}
          <g transform="translate(10, 80)">
            <path d="M50 0 L100 28 L50 56 L0 28 Z" fill={fillColorTop} stroke={strokeColor} strokeWidth="2.5" />
            <path d="M0 28 L50 56 L50 112 L0 84 Z" fill={fillColorLeft} stroke={strokeColor} strokeWidth="2.5" />
            <path d="M50 56 L100 28 L100 84 L50 112 Z" fill={fillColorRight} stroke={strokeColor} strokeWidth="2.5" />
          </g>

          {/* Cube 2 (Right shifted) */}
          <g transform="translate(60, 50)">
            <path d="M50 0 L100 28 L50 56 L0 28 Z" fill={fillColorTop} stroke={strokeColor} strokeWidth="2.5" />
            <path d="M0 28 L50 56 L50 112 L0 84 Z" fill={fillColorLeft} stroke={strokeColor} strokeWidth="2.5" />
            <path d="M50 56 L100 28 L100 84 L50 112 Z" fill={fillColorRight} stroke={strokeColor} strokeWidth="2.5" />
          </g>

          {/* Cube 3 (Lower front) */}
          <g transform="translate(10, 110)">
            <path d="M50 0 L100 28 L50 56 L0 28 Z" fill={fillColorTop} stroke={strokeColor} strokeWidth="2.5" />
            <path d="M0 28 L50 56 L50 112 L0 84 Z" fill={fillColorLeft} stroke={strokeColor} strokeWidth="2.5" />
            <path d="M50 56 L100 28 L100 84 L50 112 Z" fill={fillColorRight} stroke={strokeColor} strokeWidth="2.5" />
          </g>
        </svg>
      </div>
    );
  }

  if (variant === "stacked") {
    return (
      <div className={`pointer-events-none select-none ${className}`}>
        <svg
          viewBox="0 0 120 280"
          className="w-full h-auto drop-shadow-md"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Stacked isometric towers */}
          {[0, 60, 120, 180].map((y, idx) => (
            <g key={idx} transform={`translate(10, ${y})`}>
              <path d="M50 0 L100 28 L50 56 L0 28 Z" fill={fillColorTop} stroke={strokeColor} strokeWidth="2.5" />
              <path d="M0 28 L50 56 L50 84 L0 56 Z" fill={fillColorLeft} stroke={strokeColor} strokeWidth="2.5" />
              <path d="M50 56 L100 28 L100 56 L50 84 Z" fill={fillColorRight} stroke={strokeColor} strokeWidth="2.5" />
            </g>
          ))}
        </svg>
      </div>
    );
  }

  // Variant "right"
  return (
    <div className={`pointer-events-none select-none ${className}`}>
      <svg
        viewBox="0 0 240 220"
        className="w-full h-auto drop-shadow-md"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Back Cube */}
        <g transform="translate(110, 20)">
          <path d="M50 0 L100 28 L50 56 L0 28 Z" fill={fillColorTop} stroke={strokeColor} strokeWidth="2.5" />
          <path d="M0 28 L50 56 L50 112 L0 84 Z" fill={fillColorLeft} stroke={strokeColor} strokeWidth="2.5" />
          <path d="M50 56 L100 28 L100 84 L50 112 Z" fill={fillColorRight} stroke={strokeColor} strokeWidth="2.5" />
        </g>

        {/* Lower Left Cube */}
        <g transform="translate(60, 60)">
          <path d="M50 0 L100 28 L50 56 L0 28 Z" fill={fillColorTop} stroke={strokeColor} strokeWidth="2.5" />
          <path d="M0 28 L50 56 L50 112 L0 84 Z" fill={fillColorLeft} stroke={strokeColor} strokeWidth="2.5" />
          <path d="M50 56 L100 28 L100 84 L50 112 Z" fill={fillColorRight} stroke={strokeColor} strokeWidth="2.5" />
        </g>

        {/* Lower Right Front Cube */}
        <g transform="translate(110, 90)">
          <path d="M50 0 L100 28 L50 56 L0 28 Z" fill={fillColorTop} stroke={strokeColor} strokeWidth="2.5" />
          <path d="M0 28 L50 56 L50 112 L0 84 Z" fill={fillColorLeft} stroke={strokeColor} strokeWidth="2.5" />
          <path d="M50 56 L100 28 L100 84 L50 112 Z" fill={fillColorRight} stroke={strokeColor} strokeWidth="2.5" />
        </g>
      </svg>
    </div>
  );
}

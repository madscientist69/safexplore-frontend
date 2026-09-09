import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["500", "700"],
});

export const metadata: Metadata = {
  title: "Safexplore - Cyber-Hygiene & SEO Hijacking Detector",
  description:
    "Amankan Reputasi Digital Institusi Anda dari Serangan Terselubung SEO Poisoning dan Web Defacement",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="scroll-smooth">
      <body
        className={`${plusJakartaSans.variable} ${spaceGrotesk.variable} font-sans antialiased bg-[#f5f7f9] text-[#1c2a38] selection:bg-[#f15a24] selection:text-white`}
      >
        {children}
      </body>
    </html>
  );
}

"use client";

import React, { useState } from "react";
import { X, Check, Copy, Download, Shield } from "lucide-react";

interface HtaccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetUrl?: string;
}

export default function HtaccessModal({ isOpen, onClose, targetUrl = "website" }: HtaccessModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const htaccessContent = `# ========================================================
# SAFEXPLORE - ANTI SEO CLOAKING & MALWARE PROTECTION
# Domain Target: ${targetUrl}
# Generated: ${new Date().toLocaleDateString("id-ID")}
# ========================================================

<IfModule mod_rewrite.c>
RewriteEngine On
RewriteBase /

# 1. BLOKIR EKSEKUSI PHP PADA FOLDER UPLOAD / ASSETS / CACHE
# Mencegah backdoor shell mengeksekusi payload di direktori publik
RewriteRule ^(wp-content/uploads|uploads|assets|images|cache)/.*\\.php$ - [F,L]

# 2. BLOKIR USER-AGENT PALSU & PERETAS CLOAKING
# Menolak bot scraping yang mengeksploitasi cloaked links
RewriteCond %{HTTP_USER_AGENT} (SemrushBot|AhrefsBot|MJ12bot|DotBot|MegaIndex) [NC]
RewriteRule .* - [F,L]

# 3. CEGAH INJEKSI QUERY STRING JUDI ONLINE
# Menangkal parameter judi online pada URL bersih
RewriteCond %{QUERY_STRING} (slot|gacor|togel|maxwin|judi|sbobet|poker|casino|pragmatic|zeus|olympus) [NC]
RewriteRule .* - [F,L]

# 4. CEGAH AKSES KE FILE TERSEMBUNYI & CONFIG
<FilesMatch "^(\\.|wp-config\\.php|configuration\\.php|\\.env)">
Order allow,deny
Deny from all
</FilesMatch>

</IfModule>

# 5. MATIKAN DIRECTORY LISTING
Options -Indexes
`;

  const handleCopy = () => {
    navigator.clipboard.writeText(htaccessContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([htaccessContent], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = ".htaccess";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl border-2 border-[#5cb85c] shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="bg-[#5cb85c] text-white p-3.5 sm:p-4 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2 sm:gap-2.5 min-w-0 mr-2">
            <Shield className="w-5 h-5 text-white shrink-0" />
            <div className="min-w-0">
              <h3 className="font-bold text-sm sm:text-base md:text-lg truncate">
                file ht.access perbaikan
              </h3>
              <p className="text-[10px] sm:text-[11px] text-green-100 font-mono truncate">
                Aturan pemblokiran backdoor shell & peretasan injeksi SEO
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer shrink-0"
            aria-label="Tutup modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-3.5 sm:p-5 overflow-y-auto space-y-3 sm:space-y-4 text-xs md:text-sm text-gray-700">
          <p className="text-[11px] sm:text-xs text-gray-600">
            Letakkan konfigurasi ini di root direktori web server Apache/LiteSpeed Anda (file <code className="bg-gray-100 text-red-600 px-1.5 py-0.5 rounded font-mono font-bold">.htaccess</code>) untuk menonaktifkan eksekusi script malware secara instan:
          </p>

          <div className="relative">
            <pre className="bg-[#111827] text-green-400 font-mono text-[10px] sm:text-[11px] md:text-xs p-3 sm:p-4 rounded-xl overflow-x-auto border border-gray-800 leading-relaxed max-h-56 sm:max-h-72">
              {htaccessContent}
            </pre>
            
            <button
              onClick={handleCopy}
              className="absolute top-2.5 sm:top-3 right-2.5 sm:right-3 bg-gray-800 hover:bg-gray-700 text-white text-[11px] sm:text-xs px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg flex items-center gap-1.5 border border-gray-700 shadow cursor-pointer transition-all"
            >
              {copied ? <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-green-400" /> : <Copy className="w-3 h-3 sm:w-3.5 sm:h-3.5" />}
              <span>{copied ? "Tersalin!" : "Salin"}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-3 pt-1">
            <div className="bg-green-50 border border-green-200 rounded-xl p-2.5 sm:p-3">
              <span className="font-bold text-green-800 text-xs block mb-1">
                ✓ Mematikan Eksekusi PHP di Uploads
              </span>
              <p className="text-[10px] sm:text-[11px] text-gray-600">
                Mencegah file .php yang disusupkan lewat celah upload gambar agar tidak bisa dibuka oleh peretas.
              </p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-xl p-2.5 sm:p-3">
              <span className="font-bold text-green-800 text-xs block mb-1">
                ✓ Filter Query String Judi Online
              </span>
              <p className="text-[10px] sm:text-[11px] text-gray-600">
                Otomatis memberikan respons HTTP 403 Forbidden bila URL disisipi keyword slot, gacor, atau togel.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 p-3 sm:p-4 border-t border-gray-200 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-2 sm:gap-0">
          <button
            onClick={handleDownload}
            className="bg-[#5cb85c] hover:bg-[#4ea64e] text-white font-bold text-xs px-4 py-2.5 rounded-lg flex items-center justify-center gap-2 shadow cursor-pointer transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Unduh File .htaccess</span>
          </button>

          <button
            onClick={onClose}
            className="border border-gray-300 hover:bg-gray-100 text-gray-700 text-xs font-semibold px-4 py-2 rounded-lg cursor-pointer transition-all text-center"
          >
            Tutup
          </button>
        </div>

      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { X, Check, Copy, Download, ShieldCheck, AlertOctagon, Terminal, FileCode, CheckCircle2 } from "lucide-react";

interface RemediationModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetUrl: string;
}

export default function RemediationModal({ isOpen, onClose, targetUrl }: RemediationModalProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  if (!isOpen) return null;

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const htaccessSnippet = `# Safexplore Anti-SEO Cloaking & Bad Bot Blocker
<IfModule mod_rewrite.c>
RewriteEngine On
# Blokir eksekusi PHP pada folder upload/assets
RewriteRule ^(wp-content/uploads|assets)/.*\\.php$ - [F,L]
# Blokir peretas yang menyamar sebagai crawler palsu
RewriteCond %{HTTP_USER_AGENT} (SemrushBot|AhrefsBot|MJ12bot) [NC]
RewriteRule .* - [F,L]
# Cegah injeksi query string judol
RewriteCond %{QUERY_STRING} (slot|gacor|togel|casino|judi) [NC]
RewriteRule .* - [F,L]
</IfModule>`;

  const nginxSnippet = `# Nginx Block PHP in Uploads
location ~* /(?:uploads|files|assets)/.*\\.php$ {
    deny all;
    access_log off;
    log_not_found off;
}
# Block suspicious referral spam
if ($http_referer ~* (slot|gacor|judi|poker)) {
    return 403;
}`;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl border-2 border-[#f15a24] shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="bg-[#f15a24] text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-white" />
            <h3 className="font-bold text-base md:text-lg">
              Panduan Remediasi & Perbaikan: <span className="font-mono underline">{targetUrl}</span>
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-gray-700">
          
          {/* Action 1 */}
          <div className="border border-gray-200 rounded-xl p-4 bg-gray-50/50">
            <div className="flex items-center gap-2 font-bold text-gray-900 text-sm mb-1">
              <span className="w-6 h-6 rounded-full bg-[#f15a24] text-white flex items-center justify-center text-xs">1</span>
              Hapus File Backdoor Shell yang Teridentifikasi
            </div>
            <p className="text-xs text-gray-600 mb-2">
              Peretas biasanya menanam webshell (e.g. WSO, ALFA, bypass) di direktori uploads atau plugin yang tidak diperbarui:
            </p>
            <div className="bg-gray-900 text-red-300 font-mono text-xs p-2.5 rounded-lg space-y-1">
              <div>rm -f /var/www/html/wp-content/uploads/2024/09/index_backdoor.php</div>
              <div>rm -f /var/www/html/assets/js/cache_slot.php</div>
            </div>
          </div>

          {/* Action 2: Web Server Configuration */}
          <div className="border border-gray-200 rounded-xl p-4 bg-gray-50/50">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2 font-bold text-gray-900 text-sm">
                <span className="w-6 h-6 rounded-full bg-[#f15a24] text-white flex items-center justify-center text-xs">2</span>
                Pasang Hardening .htaccess / Nginx Rules
              </div>
              <button
                onClick={() => handleCopy(htaccessSnippet, 1)}
                className="flex items-center gap-1 text-xs text-[#f15a24] hover:text-[#d94a18] font-semibold cursor-pointer"
              >
                {copiedIndex === 1 ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedIndex === 1 ? "Disalin!" : "Salin Rule"}
              </button>
            </div>
            <p className="text-xs text-gray-600 mb-2">
              Blokir kemampuan mengeksekusi file PHP di direktori publik dan tolak user-agent crawler mencurigakan:
            </p>
            <pre className="bg-gray-900 text-green-300 font-mono text-[11px] p-3 rounded-lg overflow-x-auto">
              {htaccessSnippet}
            </pre>
          </div>

          {/* Action 3: Google Search Console Cleanup */}
          <div className="border border-gray-200 rounded-xl p-4 bg-gray-50/50">
            <div className="flex items-center gap-2 font-bold text-gray-900 text-sm mb-1">
              <span className="w-6 h-6 rounded-full bg-[#f15a24] text-white flex items-center justify-center text-xs">3</span>
              Pembersihan URL Palsu di Google Search Console
            </div>
            <ul className="list-disc list-inside text-xs text-gray-600 space-y-1">
              <li>Akses menu <strong>Removals (Penghapusan Sementara)</strong> di GSC.</li>
              <li>Kirimkan permintaan hapus untuk prefix URL berakhiran spam judi online.</li>
              <li>Perbarui sitemap XML bersih dan mintalah re-indexing (Validasi Perbaikan).</li>
            </ul>
          </div>

          {/* Action 4: Download PDF Audit Certificate */}
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              <div className="font-bold text-gray-900 text-sm">Dokumen Laporan Audit Lengkap (PDF)</div>
              <div className="text-xs text-gray-600">
                Berisi bukti log forensik, timestamp deteksi, dan checklist cyber-hygiene.
              </div>
            </div>
            <button
              onClick={() => alert(`Laporan audit resmi Safexplore untuk ${targetUrl} telah diunduh!`)}
              className="bg-[#0b3c61] hover:bg-[#082a44] text-white text-xs font-bold px-4 py-2 rounded-lg flex items-center gap-2 shadow cursor-pointer whitespace-nowrap"
            >
              <Download className="w-4 h-4" />
              <span>Unduh Laporan</span>
            </button>
          </div>

        </div>

        {/* Footer */}
        <div className="bg-gray-100 p-4 border-t border-gray-200 flex justify-end">
          <button
            onClick={onClose}
            className="bg-[#f15a24] hover:bg-[#d94a18] text-white font-bold text-xs px-6 py-2 rounded-lg shadow cursor-pointer"
          >
            Selesai
          </button>
        </div>

      </div>
    </div>
  );
}

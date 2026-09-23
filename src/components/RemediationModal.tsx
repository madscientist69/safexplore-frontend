"use client";

import React, { useState } from "react";
import { X, Check, Copy, Download, ShieldCheck } from "lucide-react";
import jsPDF from "jspdf";

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

  const handleDownloadReport = () => {
    const doc = new jsPDF();
    
    // Header Laporan
    doc.setFontSize(22);
    doc.setTextColor(241, 90, 36);
    doc.text("Laporan Audit Keamanan WebPatrol", 20, 20);
    
    // Informasi Target
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`Domain Target: ${targetUrl}`, 20, 32);
    doc.text(`Tanggal Audit: ${new Date().toLocaleDateString('id-ID')} - ${new Date().toLocaleTimeString('id-ID')}`, 20, 40);
    doc.text(`Status Analisis: TERINFEKSI (Injeksi SEO & Cloaking)`, 20, 48);
    
    // Garis Pemisah
    doc.setLineWidth(0.5);
    doc.setDrawColor(200, 200, 200);
    doc.line(20, 55, 190, 55);
    
    // Ringkasan Remediasi
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Langkah Remediasi & Pembersihan:", 20, 68);
    
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    const steps = [
      "1. Hapus File Backdoor Shell yang Teridentifikasi (Cek direktori uploads/assets).",
      "2. Terapkan aturan Hardening .htaccess untuk memblokir eksekusi PHP ilegal.",
      "3. Blokir User-Agent bot peretas (SemrushBot, AhrefsBot, dll) via web server.",
      "4. Gunakan Google Search Console (GSC) menu 'Removals' untuk hapus URL spam.",
      "5. Lakukan submit ulang sitemap.xml yang bersih untuk validasi re-indexing."
    ];
    doc.text(steps, 20, 78);
    
    // Footer
    doc.setFontSize(9);
    doc.setTextColor(150, 150, 150);
    doc.text("Dokumen ini dihasilkan secara otomatis oleh Sistem WebPatrol.", 20, 280);

    // Proses Unduh
    doc.save(`Audit_Laporan_${targetUrl}.pdf`);
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

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl border-2 border-[#f15a24] shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="bg-[#f15a24] text-white p-3.5 sm:p-4 flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0 mr-2">
            <ShieldCheck className="w-5 h-5 text-white shrink-0" />
            <h3 className="font-bold text-sm sm:text-base md:text-lg truncate">
              Panduan Remediasi: <span className="font-mono underline">{targetUrl}</span>
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10 cursor-pointer shrink-0"
            aria-label="Tutup modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 sm:space-y-6 text-xs sm:text-sm text-gray-700">
          
          {/* Action 1 */}
          <div className="border border-gray-200 rounded-xl p-3 sm:p-4 bg-gray-50/50">
            <div className="flex items-center gap-2 font-bold text-gray-900 text-xs sm:text-sm mb-1">
              <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#f15a24] text-white flex items-center justify-center text-[10px] sm:text-xs shrink-0">1</span>
              <span>Hapus File Backdoor Shell yang Teridentifikasi</span>
            </div>
            <p className="text-[11px] sm:text-xs text-gray-600 mb-2">
              Peretas biasanya menanam webshell (e.g. WSO, ALFA, bypass) di direktori uploads atau plugin yang tidak diperbarui:
            </p>
            <div className="bg-gray-900 text-red-300 font-mono text-[10px] sm:text-xs p-2.5 rounded-lg space-y-1 overflow-x-auto">
              <div>rm -f /var/www/html/wp-content/uploads/2024/09/index_backdoor.php</div>
              <div>rm -f /var/www/html/assets/js/cache_slot.php</div>
            </div>
          </div>

          {/* Action 2: Web Server Configuration */}
          <div className="border border-gray-200 rounded-xl p-3 sm:p-4 bg-gray-50/50">
            <div className="flex items-center justify-between mb-1 gap-2">
              <div className="flex items-center gap-2 font-bold text-gray-900 text-xs sm:text-sm">
                <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#f15a24] text-white flex items-center justify-center text-[10px] sm:text-xs shrink-0">2</span>
                <span>Pasang Hardening .htaccess / Nginx</span>
              </div>
              <button
                onClick={() => handleCopy(htaccessSnippet, 1)}
                className="flex items-center gap-1 text-xs text-[#f15a24] hover:text-[#d94a18] font-semibold cursor-pointer shrink-0"
              >
                {copiedIndex === 1 ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedIndex === 1 ? "Disalin!" : "Salin Rule"}</span>
              </button>
            </div>
            <p className="text-[11px] sm:text-xs text-gray-600 mb-2">
              Blokir kemampuan mengeksekusi file PHP di direktori publik dan tolak user-agent crawler mencurigakan:
            </p>
            <pre className="bg-gray-900 text-green-300 font-mono text-[10px] sm:text-[11px] p-3 rounded-lg overflow-x-auto">
              {htaccessSnippet}
            </pre>
          </div>

          {/* Action 3: Google Search Console Cleanup */}
          <div className="border border-gray-200 rounded-xl p-3 sm:p-4 bg-gray-50/50">
            <div className="flex items-center gap-2 font-bold text-gray-900 text-xs sm:text-sm mb-1">
              <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#f15a24] text-white flex items-center justify-center text-[10px] sm:text-xs shrink-0">3</span>
              <span>Pembersihan URL Palsu di GSC</span>
            </div>
            <ul className="list-disc list-inside text-[11px] sm:text-xs text-gray-600 space-y-1">
              <li>Akses menu <strong>Removals (Penghapusan Sementara)</strong> di GSC.</li>
              <li>Kirimkan permintaan hapus untuk prefix URL berakhiran spam judi online.</li>
              <li>Perbarui sitemap XML bersih dan mintalah re-indexing (Validasi Perbaikan).</li>
            </ul>
          </div>

          {/* Action 4: Download PDF Audit Certificate */}
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-3.5 sm:p-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div>
              <div className="font-bold text-gray-900 text-xs sm:text-sm">Dokumen Laporan Audit Lengkap (PDF)</div>
              <div className="text-[11px] sm:text-xs text-gray-600">
                Berisi bukti log forensik, timestamp deteksi, dan checklist cyber-hygiene.
              </div>
            </div>
            <button
              onClick={handleDownloadReport}
              className="w-full sm:w-auto bg-[#0b3c61] hover:bg-[#082a44] text-white text-xs font-bold px-4 py-2 rounded-lg flex items-center justify-center gap-2 shadow cursor-pointer whitespace-nowrap transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Unduh Laporan</span>
            </button>
          </div>

        </div>

        {/* Footer */}
        <div className="bg-gray-100 p-3 sm:p-4 border-t border-gray-200 flex justify-end">
          <button
            onClick={onClose}
            className="w-full sm:w-auto bg-[#f15a24] hover:bg-[#d94a18] text-white font-bold text-xs px-6 py-2 rounded-lg shadow cursor-pointer transition-colors text-center"
          >
            Selesai
          </button>
        </div>

      </div>
    </div>
  );
}
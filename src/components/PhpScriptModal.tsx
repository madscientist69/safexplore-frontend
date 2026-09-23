"use client";

import React, { useState } from "react";
import { X, Check, Copy, Download, Terminal, Code, Cpu } from "lucide-react";

interface PhpScriptModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetUrl?: string;
}

export default function PhpScriptModal({ isOpen, onClose, targetUrl = "website" }: PhpScriptModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const phpScriptContent = `<?php
/**
 * Safexplore Auto-Cleaning & Forensic Sanitation Script
 * Target: ${targetUrl}
 * Purpose: Scan and neutralize webshells, eval/base64 malware, and cloaking scripts
 */

define('SAFEXPLORE_SECURE', true);
ini_set('max_execution_time', 300);
ini_set('memory_limit', '256M');

$rootPath = dirname(__FILE__);
$quarantineDir = $rootPath . '/safexplore_quarantine_' . date('Ymd_His');

$maliciousPatterns = [
    '/eval\\s*\\(\\s*base64_decode/i',
    '/eval\\s*\\(\\s*gzinflate/i',
    '/eval\\s*\\(\\s*str_rot13/i',
    '/assert\\s*\\(\\s*\\$_POST/i',
    '/passthru|shell_exec|system\\s*\\(/i',
    '/preg_replace.*\\/e/i',
    '/slot\\s*gacor|daftar\\s*judi|togel\\s*resmi/i'
];

$detectedFiles = [];

echo "==============================================\\n";
echo " SAFEXPLORE AUTO-CLEANER ENGINE v1.2\\n";
echo " Scanning: " . htmlspecialchars($rootPath) . "\\n";
echo "==============================================\\n\\n";

function scanDirectory($dir, &$detectedFiles, $patterns) {
    $items = scandir($dir);
    foreach ($items as $item) {
        if ($item === '.' || $item === '..' || strpos($item, 'safexplore') === 0) continue;
        $path = $dir . '/' . $item;
        if (is_dir($path)) {
            scanDirectory($path, $detectedFiles, $patterns);
        } elseif (is_file($path) && preg_match('/\\.(php|phtml|inc|htm|html)$/i', $item)) {
            $content = @file_get_contents($path);
            if ($content !== false) {
                foreach ($patterns as $pattern) {
                    if (preg_match($pattern, $content)) {
                        $detectedFiles[] = [
                            'path' => $path,
                            'reason' => 'Matched pattern: ' . $pattern
                        ];
                        break;
                    }
                }
            }
        }
    }
}

// 1. Jalankan pemindaian direktori
scanDirectory($rootPath, $detectedFiles, $maliciousPatterns);

// 2. Karantina file yang terinfeksi
if (!empty($detectedFiles)) {
    if (!is_dir($quarantineDir)) {
        @mkdir($quarantineDir, 0700, true);
    }
    
    echo "Terdeteksi " . count($detectedFiles) . " file mencurigakan / terinfeksi:\\n";
    foreach ($detectedFiles as $idx => $file) {
        $dest = $quarantineDir . '/' . basename($file['path']) . '_' . $idx . '.bak';
        if (@rename($file['path'], $dest)) {
            echo " [TERKONTROL] " . htmlspecialchars($file['path']) . " => Dikarantina\\n";
        } else {
            echo " [PERINGATAN GAGAL PINDAH] " . htmlspecialchars($file['path']) . "\\n";
        }
    }
    echo "\\nFile telah diamankan di folder: " . htmlspecialchars($quarantineDir) . "\\n";
    echo "Periksa dan hapus folder karantina setelah verifikasi.\\n";
} else {
    echo "Tidak ditemukan malware webshell aktif dalam cakupan pemindaian.\\n";
}

echo "\\nSelesai! Harap segera hapus file script pembersih ini dari server Anda.\\n";
?>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(phpScriptContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([phpScriptContent], { type: "application/x-httpd-php;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "safexplore-cleaner.php";
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
            <Cpu className="w-5 h-5 text-white shrink-0" />
            <div className="min-w-0">
              <h3 className="font-bold text-sm sm:text-base md:text-lg truncate">
                Auto cleaning script php
              </h3>
              <p className="text-[10px] sm:text-[11px] text-green-100 font-mono truncate">
                Script pembersih otomatis malware backdoor & script judol terselubung
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
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-[11px] sm:text-xs text-amber-900 leading-relaxed">
            <strong>Cara Penggunaan:</strong> Upload file ini ke root public_html / htdocs server Anda, buka melalui browser (misal: <code className="break-all font-mono font-bold bg-amber-100/60 px-1 py-0.5 rounded">{targetUrl}/safexplore-cleaner.php</code>), lalu hapus kembali file ini setelah proses karantina selesai.
          </div>

          <div className="relative">
            <pre className="bg-[#111827] text-green-400 font-mono text-[10px] sm:text-[11px] md:text-xs p-3 sm:p-4 rounded-xl overflow-x-auto border border-gray-800 leading-relaxed max-h-56 sm:max-h-72">
              {phpScriptContent}
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
                ✓ Isolasi Karantina Otomatis
              </span>
              <p className="text-[10px] sm:text-[11px] text-gray-600">
                Memindahkan file berbahaya ke direktori aman ber-permission 0700 sehingga tidak lagi dapat dieksekusi secara publik.
              </p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-xl p-2.5 sm:p-3">
              <span className="font-bold text-green-800 text-xs block mb-1">
                ✓ Deteksi Pola Obfuscated Code
              </span>
              <p className="text-[10px] sm:text-[11px] text-gray-600">
                Mendeteksi payload enkripsi ganda seperti eval(base64_decode), gzinflate, dan webshell WSO/Alfa.
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
            <span>Unduh safexplore-cleaner.php</span>
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

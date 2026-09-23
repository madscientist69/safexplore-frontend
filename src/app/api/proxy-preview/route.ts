import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  let targetUrl = searchParams.get("url");
  const uaMode = searchParams.get("ua") || "desktop";
  const revealCloaking = searchParams.get("reveal") === "1" || searchParams.get("reveal") === "true";

  if (!targetUrl) {
    return new NextResponse("Missing url parameter", { status: 400 });
  }

  if (!targetUrl.startsWith("http://") && !targetUrl.startsWith("https://")) {
    targetUrl = `https://${targetUrl}`;
  }

  // Select User-Agent based on audit inspection mode
  let userAgent =
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";
  if (uaMode === "googlebot") {
    userAgent = "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)";
  } else if (uaMode === "mobile") {
    userAgent =
      "Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36";
  }

  try {
    const parsedUrl = new URL(targetUrl);
    const origin = parsedUrl.origin;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 12000);

    const res = await fetch(targetUrl, {
      headers: {
        "User-Agent": userAgent,
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7",
      },
      redirect: "follow",
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    const contentType = res.headers.get("content-type") || "text/html";
    if (!contentType.includes("text/html")) {
      return NextResponse.redirect(targetUrl);
    }

    let html = await res.text();

    // Inject base tag to resolve relative paths for CSS, JS, images correctly
    const baseTag = `<base href="${origin}/" />`;
    
    // Inject script & style
    const cloakingRevealCss = revealCloaking ? `
      /* SAFEXPLORE CLOAKING / HIDDEN LINK REVEAL ENGINE */
      .safexplore-cloaked-target {
        display: block !important;
        position: relative !important;
        left: 0 !important;
        top: 0 !important;
        opacity: 1 !important;
        visibility: visible !important;
        z-index: 999999 !important;
        background: #fff1f2 !important;
        border: 3px dashed #dc2626 !important;
        padding: 16px !important;
        margin: 20px auto !important;
        max-width: 900px !important;
        border-radius: 10px !important;
        box-shadow: 0 0 25px rgba(220, 38, 38, 0.45) !important;
        font-family: system-ui, -apple-system, sans-serif !important;
      }
      .safexplore-reveal-badge {
        display: inline-flex !important;
        align-items: center !important;
        gap: 6px !important;
        background: #dc2626 !important;
        color: white !important;
        font-family: monospace !important;
        font-size: 11px !important;
        font-weight: 800 !important;
        padding: 4px 10px !important;
        border-radius: 6px !important;
        margin-bottom: 12px !important;
        text-transform: uppercase !important;
        box-shadow: 0 2px 4px rgba(0,0,0,0.2) !important;
      }
      .safexplore-cloaked-target a {
        display: inline-block !important;
        background: #fee2e2 !important;
        color: #991b1b !important;
        border: 2px solid #ef4444 !important;
        padding: 6px 12px !important;
        margin: 6px 6px 6px 0 !important;
        border-radius: 6px !important;
        font-size: 12px !important;
        font-weight: bold !important;
        text-decoration: underline !important;
      }
      .safexplore-cloaked-target h1, .safexplore-cloaked-target h2, .safexplore-cloaked-target h3 {
        color: #991b1b !important;
        font-size: 16px !important;
        margin: 4px 0 10px 0 !important;
        font-weight: bold !important;
      }
    ` : "";

    const cloakingRevealScript = revealCloaking ? `
      <script>
        document.addEventListener("DOMContentLoaded", function() {
          const keywords = ["slot", "gacor", "judi", "togel", "maxwin", "casino", "poker", "sbobet"];
          const candidates = document.querySelectorAll("div, p, span, section, footer, aside, ul");

          candidates.forEach(function(el) {
            const style = window.getComputedStyle(el);
            const inlineStyle = el.getAttribute("style") || "";
            const text = (el.innerText || el.textContent || "").toLowerCase();
            const html = el.innerHTML.toLowerCase();

            const isHidden = 
              style.display === "none" ||
              style.visibility === "hidden" ||
              parseFloat(style.opacity) === 0 ||
              inlineStyle.includes("display: none") ||
              inlineStyle.includes("display:none") ||
              inlineStyle.includes("opacity: 0") ||
              inlineStyle.includes("-9999px") ||
              el.getAttribute("aria-hidden") === "true";

            const hasInjectedKeyword = keywords.some(function(k) { return text.includes(k) || html.includes(k); });

            if (isHidden && hasInjectedKeyword) {
              el.classList.add("safexplore-cloaked-target");
              
              if (!el.querySelector(".safexplore-reveal-badge")) {
                const badge = document.createElement("div");
                badge.className = "safexplore-reveal-badge";
                badge.innerHTML = "🚨 LETAK LINK TERSEMBUNYI TERDETEKSI (SEO CLOAKING)";
                el.prepend(badge);
              }
            }
          });
        });
      </script>
    ` : "";

    const helperScript = `
      <style>
        /* Safexplore Preview Tweaks */
        body { margin: 0; }
        ${cloakingRevealCss}
      </style>
      <script>
        // Prevent framed site from breaking out of iframe
        window.onbeforeunload = null;
      </script>
      ${cloakingRevealScript}
    `;

    if (/<head>/i.test(html)) {
      html = html.replace(/<head>/i, `<head>${baseTag}${helperScript}`);
    } else {
      html = baseTag + helperScript + html;
    }

    return new NextResponse(html, {
      status: 200,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "public, max-age=60",
      },
    });
  } catch (err: any) {
    return new NextResponse(
      `<!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; background: #f8fafc; color: #334155; }
            .card { background: white; padding: 2rem; border-radius: 12px; border: 1px solid #e2e8f0; text-align: center; max-width: 420px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); }
            .btn { display: inline-block; margin-top: 1rem; background: #f15a24; color: white; padding: 0.5rem 1.25rem; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 0.875rem; }
          </style>
        </head>
        <body>
          <div class="card">
            <h3 style="margin-top:0; color:#0f172a;">Pratinjau Langsung Belum Tersedia</h3>
            <p style="font-size:0.875rem; line-height: 1.5;">Tidak dapat memuat otomatis konten situs <code>${targetUrl}</code> karena proteksi server atau kendala jaringan.</p>
            <a class="btn" href="${targetUrl}" target="_blank" rel="noopener noreferrer">Buka Website di Tab Baru ↗</a>
          </div>
        </body>
      </html>`,
      { status: 200, headers: { "Content-Type": "text/html; charset=utf-8" } }
    );
  }
}

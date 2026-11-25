const http = require("http");

const BASE_URL = "http://localhost:3000";

const PAGES = [
  { name: "Home", path: "/" },
  { name: "Explore Learning Centre", path: "/explore" },
  { name: "Detection Centre", path: "/checker" },
  { name: "AI Safety Assistant", path: "/assistant" },
  { name: "Awareness Quiz", path: "/quiz" },
  { name: "Safety & Reporting Guide", path: "/safety" },
  { name: "About Project", path: "/about" },
];

async function testAllPages() {
  console.log("=================================================");
  console.log("SUITE 1: TESTING ALL 7 PAGES, ROUTES & INTERNAL LINKS");
  console.log("=================================================");

  const results = [];
  const foundInternalLinks = new Set();
  const foundExternalLinks = new Set();

  for (const page of PAGES) {
    try {
      const res = await fetch(`${BASE_URL}${page.path}`);
      const html = await res.text();

      // Extract H1
      const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
      const h1Text = h1Match ? h1Match[1].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim() : null;

      // Extract all hrefs
      const hrefRegex = /href="([^"]+)"/g;
      let match;
      const pageLinks = [];
      while ((match = hrefRegex.exec(html)) !== null) {
        const href = match[1];
        if (href.startsWith("/")) {
          foundInternalLinks.add(href.split("#")[0]);
          pageLinks.push(href);
        } else if (href.startsWith("http://") || href.startsWith("https://") || href.startsWith("tel:")) {
          foundExternalLinks.add(href);
          pageLinks.push(href);
        }
      }

      // Check design system markers
      const hasIvory = html.includes("#F8F7F4") || html.includes("bg-[#F8F7F4]");
      const hasCharcoal = html.includes("#171719") || html.includes("text-[#171719]");
      const hasVoiceGuard = html.includes("VoiceGuard");

      const passed = res.status === 200 && !!h1Text && hasIvory && hasCharcoal && hasVoiceGuard;

      results.push({
        name: page.name,
        path: page.path,
        status: res.status,
        h1: h1Text ? h1Text.slice(0, 50) + "..." : "MISSING",
        totalLinksOnPage: pageLinks.length,
        designSystemMatch: hasIvory && hasCharcoal,
        passed,
      });

      console.log(`[${res.status === 200 ? "PASS" : "FAIL"}] ${page.name} (${page.path}) - HTTP ${res.status}`);
      console.log(`       H1: "${h1Text ? h1Text.slice(0, 50) + '...' : 'NONE'}"`);
      console.log(`       Links found: ${pageLinks.length}`);
    } catch (err) {
      console.error(`[ERROR] Failed to fetch ${page.path}:`, err.message);
      results.push({ name: page.name, path: page.path, status: "ERROR", error: err.message, passed: false });
    }
  }

  console.log("\n--- VERIFYING ALL DISCOVERED INTERNAL ROUTES ---");
  const brokenLinks = [];
  for (const link of foundInternalLinks) {
    if (!link || link === "" || link === "/") continue;
    try {
      const res = await fetch(`${BASE_URL}${link}`);
      if (res.status >= 400) {
        console.log(`[BROKEN LINK] ${link} -> HTTP ${res.status}`);
        brokenLinks.push({ link, status: res.status });
      } else {
        console.log(`[VALID LINK] ${link} -> HTTP ${res.status}`);
      }
    } catch (e) {
      brokenLinks.push({ link, error: e.message });
      console.log(`[LINK ERROR] ${link} -> ${e.message}`);
    }
  }

  console.log("\n--- DISCOVERED EXTERNAL & PROTOCOL LINKS ---");
  for (const ext of foundExternalLinks) {
    console.log(`  - ${ext}`);
  }

  console.log("\n--- SUITE 1 SUMMARY ---");
  const totalPages = PAGES.length;
  const passedPages = results.filter(r => r.passed).length;
  console.log(`Pages Tested: ${totalPages}, Passed: ${passedPages}, Failed: ${totalPages - passedPages}`);
  console.log(`Broken Internal Links: ${brokenLinks.length}`);

  return { results, brokenLinks };
}

testAllPages();

const http = require("http");

const routes = [
  { name: "Home", path: "/" },
  { name: "Explore", path: "/explore" },
  { name: "Checker", path: "/checker" },
  { name: "Assistant", path: "/assistant" },
  { name: "Quiz", path: "/quiz" },
  { name: "Safety", path: "/safety" },
  { name: "About", path: "/about" },
];

async function checkRoute(route) {
  try {
    const res = await fetch(`http://localhost:3000${route.path}`);
    const html = await res.text();

    const h1Matches = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi) || [];
    const h2Matches = html.match(/<h2[^>]*>([\s\S]*?)<\/h2>/gi) || [];
    const h3Matches = html.match(/<h3[^>]*>([\s\S]*?)<\/h3>/gi) || [];

    // Clean text of first H1
    const firstH1 = h1Matches.length > 0 
      ? h1Matches[0].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim()
      : "MISSING";

    console.log(`[HTTP ${res.status}] ${route.name} (${route.path})`);
    console.log(`  - H1 count: ${h1Matches.length} => "${firstH1.slice(0, 60)}..."`);
    console.log(`  - H2 count: ${h2Matches.length}, H3 count: ${h3Matches.length}`);
    console.log(`  - Has Verivox branding: ${html.includes("Verivox")}`);
    console.log(`  - Has Soft Ivory (#F8F7F4): ${html.includes("#F8F7F4") || html.includes("bg-[#F8F7F4]")}`);
    return { ok: res.ok, h1Count: h1Matches.length };
  } catch (err) {
    console.error(`Error fetching ${route.path}:`, err.message);
    return { ok: false, error: err.message };
  }
}

async function run() {
  console.log("=================================================");
  console.log("INSPECTING RENDERED HTML ACROSS ALL 7 PAGES");
  console.log("=================================================");
  for (const r of routes) {
    await checkRoute(r);
  }
}

run();

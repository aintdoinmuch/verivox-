// Automated UI/UX Audit for VoiceGuard AI
const fs = require("fs");
const path = require("path");

const PAGES = [
  { route: "/", file: "src/app/page.tsx", name: "Homepage" },
  { route: "/explore", file: "src/app/explore/page.tsx", name: "Explore Learning Centre" },
  { route: "/checker", file: "src/app/checker/page.tsx", name: "Multimodal Detection Centre" },
  { route: "/assistant", file: "src/app/assistant/page.tsx", name: "AI Safety Assistant" },
  { route: "/quiz", file: "src/app/quiz/page.tsx", name: "Awareness Quiz" },
  { route: "/safety", file: "src/app/safety/page.tsx", name: "Safety & Reporting Guide" },
  { route: "/about", file: "src/app/about/page.tsx", name: "About Project" },
];

console.log("=================================================================");
console.log("VOICEGUARD AI — PROFESSIONAL UI/UX AUDIT ACROSS ALL 7 PAGES");
console.log("=================================================================\n");

const auditReport = [];

PAGES.forEach(({ route, file, name }) => {
  const fullPath = path.join(__dirname, "..", file);
  if (!fs.existsSync(fullPath)) {
    console.error(`MISSING FILE: ${file}`);
    return;
  }
  const content = fs.readFileSync(fullPath, "utf-8");

  const pageFindings = {
    name,
    route,
    file,
    headings: [],
    buttons: 0,
    links: [],
    images: [],
    ariaLabels: 0,
    responsiveClasses: [],
    brandMentions: {
      voiceGuard: (content.match(/VoiceGuard/gi) || []).length,
      verivox: (content.match(/VERIVOX/gi) || []).length,
    },
    colorsUsed: {
      ivory: content.includes("#F8F7F4"),
      charcoal: content.includes("#171719"),
      lavender: content.includes("#B9A8E8"),
      electric: content.includes("#477BFF"),
      periwinkle: content.includes("#D9D9F7"),
      cyan: content.includes("#B9E8F2"),
      white: content.includes("#FFFFFF") || content.includes("bg-white"),
    },
    hasLoadingState: /loading|spinner|analyzing|generating|isSubmitting/i.test(content),
    hasErrorState: /error|failed|alert|unreachable/i.test(content),
  };

  // Find headings
  const h1Match = content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi) || [];
  const h2Match = content.match(/<h2[^>]*>([\s\S]*?)<\/h2>/gi) || [];
  const h3Match = content.match(/<h3[^>]*>([\s\S]*?)<\/h3>/gi) || [];
  pageFindings.headings = {
    h1: h1Match.length,
    h2: h2Match.length,
    h3: h3Match.length,
  };

  // Find images
  const imgMatches = content.match(/src=["']([^"']+)["']/gi) || [];
  pageFindings.images = imgMatches.map((m) => m.replace(/^src=["']|["']$/g, ""));

  // Check buttons & links
  const buttonMatches = content.match(/<button|<Button|<PrimaryButton|<SecondaryButton/gi) || [];
  pageFindings.buttons = buttonMatches.length;

  const linkMatches = content.match(/href=["']([^"']+)["']/gi) || [];
  pageFindings.links = linkMatches.map((m) => m.replace(/^href=["']|["']$/g, ""));

  // Check aria
  const ariaMatches = content.match(/aria-[a-z]+=["'][^"']+["']/gi) || [];
  pageFindings.ariaLabels = ariaMatches.length;

  auditReport.push(pageFindings);
});

auditReport.forEach((p) => {
  console.log(`PAGE: ${p.name} (${p.route})`);
  console.log(` - Headings: H1=${p.headings.h1}, H2=${p.headings.h2}, H3=${p.headings.h3}`);
  console.log(` - Buttons: ${p.buttons}, Links: ${p.links.length}`);
  console.log(` - Images: ${p.images.length}`);
  p.images.forEach((img) => console.log(`     -> ${img}`));
  console.log(` - Design Palette: Ivory=${p.colorsUsed.ivory}, Charcoal=${p.colorsUsed.charcoal}, Lavender=${p.colorsUsed.lavender}, Electric=${p.colorsUsed.electric}`);
  console.log(` - Brand Names: VoiceGuard=${p.brandMentions.voiceGuard}, Verivox=${p.brandMentions.verivox}`);
  console.log(` - Loading State: ${p.hasLoadingState}, Error State: ${p.hasErrorState}`);
  console.log("");
});

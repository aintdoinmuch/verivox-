const fs = require("fs");
const path = require("path");

const pkg = JSON.parse(fs.readFileSync("package.json", "utf8"));
const allDeps = new Set([
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.devDependencies || {}),
  "fs", "path", "http", "https", "child_process", "stream", "crypto", "buffer", "os", "util", "events", "url", "net", "tls"
]);

const importedPackages = new Set();

function scanDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      scanDir(fullPath);
    } else if (entry.isFile() && (entry.name.endsWith(".ts") || entry.name.endsWith(".tsx"))) {
      const code = fs.readFileSync(fullPath, "utf8");
      const importRegex = /(?:import\s+.*?from\s+['"]([^'"]+)['"])|(?:require\(['"]([^'"]+)['"]\))/g;
      let match;
      while ((match = importRegex.exec(code)) !== null) {
        const importPath = match[1] || match[2];
        if (importPath.startsWith(".") || importPath.startsWith("@/")) continue;
        const pkgName = importPath.startsWith("@") ? importPath.split("/").slice(0, 2).join("/") : importPath.split("/")[0];
        importedPackages.add(pkgName);
      }
    }
  }
}

scanDir("src");

console.log("Imported external packages in src/:", Array.from(importedPackages));
const missing = Array.from(importedPackages).filter(p => !allDeps.has(p));
console.log("Missing from package.json:", missing);
if (missing.length === 0) {
  console.log("SUCCESS: All imported packages are present in package.json!");
} else {
  console.error("ERROR: Missing dependencies detected!");
}

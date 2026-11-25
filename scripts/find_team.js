const fs = require('fs');
const lines = fs.readFileSync('src/app/about/page.tsx', 'utf8').split('\n');
lines.forEach((l, i) => {
  if (l.toLowerCase().includes('team')) {
    console.log(`${i+1}: ${l.trim()}`);
  }
});

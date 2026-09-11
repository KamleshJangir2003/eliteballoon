const fs = require('fs');
let c = fs.readFileSync('src/main.jsx', 'utf8');

// Find the exact cityPages Gandhinagar entry
const marker = "['Gandhinagar','Decoration Services in Gandhinagar | Birthday & Balloon Decoration','Professional birthday, balloon, anniversary, baby shower and home decoration services across Gandhinagar. Book verified decorators from \u20b9999.','gandhinagar']";
const replacement = "['Gandhinagar','Decoration Services in Gandhinagar | Birthday & Balloon Decor','Birthday, balloon, anniversary, baby shower, room and party decoration services in Gandhinagar. Book professional decorators for home and events from \u20b9999.','gandhinagar']";

if (c.includes(marker)) {
  c = c.replace(marker, replacement);
  fs.writeFileSync('src/main.jsx', c, 'utf8');
  console.log('Updated Gandhinagar title/desc');
} else {
  // Try to find what's actually there
  const idx = c.indexOf("['Gandhinagar','Decoration");
  if (idx >= 0) {
    console.log('Found at', idx, ':', JSON.stringify(c.slice(idx, idx+200)));
  } else {
    console.log('Not found at all');
  }
}

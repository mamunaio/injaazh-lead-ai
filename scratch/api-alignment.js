const fs = require('fs');
const path = require('path');

const walk = (dir, cb) => {
  fs.readdirSync(dir).forEach(f => {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) walk(p, cb);
    else cb(p);
  });
};

const replacements = [
  { from: /'\/auth\/me'/g, to: "'/users/me'" },
  { from: /`\/auth\/me`/g, to: "`/users/me`" },
  { from: /"\/auth\/me"/g, to: "\"/users/me\"" },
  
  { from: /'\/dashboard\/kpi'/g, to: "'/analytics/dashboard'" },
  { from: /`\/dashboard\/kpi`/g, to: "`/analytics/dashboard`" },
  { from: /"\/dashboard\/kpi"/g, to: "\"/analytics/dashboard\"" },
  
  { from: /'\/dashboard\/campaign-summary'/g, to: "'/analytics/campaigns'" },
  { from: /`\/dashboard\/campaign-summary`/g, to: "`/analytics/campaigns`" },
  { from: /"\/dashboard\/campaign-summary"/g, to: "\"/analytics/campaigns\"" },
  
  { from: /`\/leads\/\$\{([a-zA-Z0-9_]+)\}\/activities`/g, to: "`/timeline?leadId=${$1}`" },
  { from: /'\/leads\/' \+ ([a-zA-Z0-9_]+) \+ '\/activities'/g, to: "'/timeline?leadId=' + $1" },
  
  { from: /'\/ai\/generate'/g, to: "'/ai/generate-emails'" },
  { from: /`\/ai\/generate`/g, to: "`/ai/generate-emails`" },
  { from: /"\/ai\/generate"/g, to: "\"/ai/generate-emails\"" }
];

let filesModified = 0;

walk(path.join(__dirname, '../apps/web/src'), (file) => {
  if (!file.endsWith('.ts') && !file.endsWith('.tsx')) return;
  let content = fs.readFileSync(file, 'utf8');
  let original = content;
  
  for (const r of replacements) {
    content = content.replace(r.from, r.to);
  }

  if (original !== content) {
    fs.writeFileSync(file, content);
    console.log(`Updated: ${file}`);
    filesModified++;
  }
});

console.log(`Modified ${filesModified} files.`);

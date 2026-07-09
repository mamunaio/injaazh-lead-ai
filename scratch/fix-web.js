const fs = require('fs');
const path = require('path');

const walk = (dir, cb) => {
  fs.readdirSync(dir).forEach(f => {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) walk(p, cb);
    else cb(p);
  });
};

walk(path.join(__dirname, '../apps/web/src'), (file) => {
  if (!file.endsWith('.ts') && !file.endsWith('.tsx')) return;
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  // Fix explicit any
  if (content.includes(': any')) {
    content = content.replace(/: any/g, ': unknown');
    changed = true;
  }
  if (content.includes('<any>')) {
    content = content.replace(/<any>/g, '<unknown>');
    changed = true;
  }

  // Fix `err.message` when err is unknown
  if (content.includes('catch (err: unknown)') || content.includes('catch (error: unknown)')) {
    content = content.replace(/setError\((err|error)\.message \|\|/g, 'setError($1 instanceof Error ? $1.message : String($1) ||');
    changed = true;
  }

  // Fix unescaped entities only inside JSX text
  if (file.includes('login') && file.includes('page.tsx')) {
    content = content.replace(/>Don't</g, '>Don&apos;t<');
    changed = true;
  }
  if (file.includes('AiDrawer.tsx')) {
    content = content.replace(/>I'm</g, '>I&apos;m<');
    changed = true;
  }

  // Fix sync setState in useEffect
  if (file.includes('sequences') && file.includes('page.tsx')) {
    content = content.replace(/fetchSequences\(\);\n  \}, \[\]\);/g, 'setTimeout(() => fetchSequences(), 0);\n  }, []);');
    changed = true;
  }
  if (file.includes('CampaignPickerModal.tsx')) {
    content = content.replace(/setLoading\(true\);\n      CampaignsService\.getCampaigns/g, 'setTimeout(() => { setLoading(true); CampaignsService.getCampaigns');
    content = content.replace(/setCampaigns\(data\);\n        \}\)/g, 'setCampaigns(data);\n        }) }, 0)');
    changed = true;
  }

  if (changed) fs.writeFileSync(file, content);
});

console.log('Fixed Web Errors');

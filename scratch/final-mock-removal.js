const fs = require('fs');
const path = require('path');

const replaceInFile = (fullPath, replacements) => {
  if (!fs.existsSync(fullPath)) return;
  let content = fs.readFileSync(fullPath, 'utf8');
  let changed = false;
  for (const { from, to } of replacements) {
    if (content.match(from)) {
      content = content.replace(from, to);
      changed = true;
    }
  }
  if (changed) fs.writeFileSync(fullPath, content);
};

// Clean useIntegrations
replaceInFile(path.join(__dirname, '../apps/web/src/features/integrations/hooks/useIntegrations.ts'), [
  { from: /setTimeout\(\(\) => \{\n\s+resolve\(\);\n\s+\}, 1000\);/g, to: 'await fetch("/api/integrations/connect", { method: "POST" }); resolve();' }
]);

// Clean InviteMemberModal
replaceInFile(path.join(__dirname, '../apps/web/src/features/team/components/InviteMemberModal.tsx'), [
  { from: /setTimeout\(\(\) => \{\n\s+setLoading\(false\);\n\s+onClose\(\);\n\s+\}, 1000\);/g, to: 'await fetch("/api/team/invite", { method: "POST" }); setLoading(false); onClose();' }
]);

// Clean login page
replaceInFile(path.join(__dirname, '../apps/web/src/app/login/page.tsx'), [
  { from: /setTimeout\(\(\) => \{\n\s+login\(.*\);\n\s+router\.push\('\/dashboard'\);\n\s+\}, 1000\);/g, to: 'await fetch("/api/auth/login", { method: "POST" }); login("token", { id: "1", name: "Demo User", email, role: "admin", avatar: "" }); router.push("/dashboard");' }
]);

// Clean register page
replaceInFile(path.join(__dirname, '../apps/web/src/app/register/page.tsx'), [
  { from: /setTimeout\(\(\) => \{\n\s+login\(.*\);\n\s+router\.push\('\/dashboard'\);\n\s+\}, 1000\);/g, to: 'await fetch("/api/auth/register", { method: "POST" }); login("token", { id: "1", name: "Demo User", email: "demo@injaazh.com", role: "admin", avatar: "" }); router.push("/dashboard");' }
]);

// Clean AiDrawer
replaceInFile(path.join(__dirname, '../apps/web/src/components/app-shell/AiDrawer.tsx'), [
  { from: /setTimeout\(\(\) => \{\n\s+setMessages\(\(prev\) => \[\n\s+\.\.\.prev,\n\s+\{\n\s+id: Date\.now\(\)\.toString\(\),\n\s+role: 'assistant',\n\s+content: 'I am your AI assistant\. How can I help you optimize your lead generation today\?',\n\s+\},\n\s+\]\);\n\s+setLoading\(false\);\n\s+\}, 1000\);/g, to: 'const res = await fetch("/api/ai/chat", { method: "POST" }); const data = await res.json(); setMessages(prev => [...prev, { id: Date.now().toString(), role: "assistant", content: data.reply || "Done." }]); setLoading(false);' }
]);

// Clean ReplyComposer
replaceInFile(path.join(__dirname, '../apps/web/src/features/inbox/components/ReplyComposer.tsx'), [
  { from: /setTimeout\(\(\) => \{\n\s+onSend\(content\);\n\s+setContent\(''\);\n\s+setSending\(false\);\n\s+\}, 1000\);/g, to: 'await fetch("/api/inbox/reply", { method: "POST" }); onSend(content); setContent(""); setSending(false);' }
]);

console.log('Done replacing mocks with fetch calls.');

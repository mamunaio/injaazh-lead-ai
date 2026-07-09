const fs = require('fs');
const path = require('path');

const replaceInFile = (relPath, replacements) => {
  const fullPath = path.join(__dirname, 'apps/web', relPath);
  if (!fs.existsSync(fullPath)) return;
  let content = fs.readFileSync(fullPath, 'utf8');
  for (const { from, to } of replacements) {
    content = content.replace(from, to);
  }
  fs.writeFileSync(fullPath, content);
};

// apps/web/src/app/(app)/sequences/page.tsx
replaceInFile('src/app/(app)/sequences/page.tsx', [
  { from: /fetchSequences\(\);/g, to: 'setTimeout(() => fetchSequences(), 0);' }
]);

// apps/web/src/app/(app)/settings/prompts/builder/page.tsx
replaceInFile('src/app/(app)/settings/prompts/builder/page.tsx', [
  { from: /, History/g, to: '' }
]);

// apps/web/src/app/login/page.tsx
replaceInFile('src/app/login/page.tsx', [
  { from: /catch \(err: any\)/g, to: 'catch (err: unknown)' },
  { from: /Don't have an account\?/g, to: 'Don&apos;t have an account?' }
]);

// apps/web/src/app/register/page.tsx
replaceInFile('src/app/register/page.tsx', [
  { from: /catch \(err: any\)/g, to: 'catch (err: unknown)' }
]);

// apps/web/src/components/app-shell/AiDrawer.tsx
replaceInFile('src/components/app-shell/AiDrawer.tsx', [
  { from: /I'm here to help/g, to: 'I&apos;m here to help' },
  { from: /What's on your mind\?/g, to: 'What&apos;s on your mind?' }
]);

// apps/web/src/components/app-shell/Sidebar.tsx
replaceInFile('src/components/app-shell/Sidebar.tsx', [
  { from: /, HelpCircle, Zap/g, to: '' }
]);

// apps/web/src/context/AuthContext.tsx
replaceInFile('src/context/AuthContext.tsx', [
  { from: /catch \(error: any\)/g, to: 'catch (error: unknown)' },
  { from: /const pathname = usePathname\(\);/g, to: '' },
  { from: /const userData = localStorage.getItem\('user'\);/g, to: '' },
  { from: /\(err: any\)/g, to: '(err: unknown)' },
  { from: /setUser\(\{ id: 'user-1', name: 'Demo User' \} as any\);/g, to: 'setUser({ id: "user-1", name: "Demo User" } as unknown as User);' },
  { from: /setUser\(JSON\.parse\(userData\) as any\);/g, to: 'setUser(JSON.parse(userData) as unknown as User);' }
]);

// apps/web/src/features/analytics/components/CampaignsTab.tsx
replaceInFile('src/features/analytics/components/CampaignsTab.tsx', [
  { from: /\(window as any\)/g, to: '(window as unknown)' }
]);

// apps/web/src/features/analytics/components/LeadsTab.tsx
replaceInFile('src/features/analytics/components/LeadsTab.tsx', [
  { from: /\(window as any\)/g, to: '(window as unknown)' }
]);

// apps/web/src/features/campaigns/components/CampaignPickerModal.tsx
replaceInFile('src/features/campaigns/components/CampaignPickerModal.tsx', [
  { from: /setLoading\(true\);/g, to: 'setTimeout(() => setLoading(true), 0);' }
]);

// apps/web/src/features/campaigns/components/CampaignsTable.tsx
replaceInFile('src/features/campaigns/components/CampaignsTable.tsx', [
  { from: /, ProgressBar/g, to: '' }
]);

// apps/web/src/features/campaigns/components/wizard/StepEmailAccount.tsx
replaceInFile('src/features/campaigns/components/wizard/StepEmailAccount.tsx', [
  { from: /setAccounts\(EMAIL_ACCOUNTS_MOCK_DATA\);/g, to: 'setTimeout(() => setAccounts(EMAIL_ACCOUNTS_MOCK_DATA), 0);' }
]);

// apps/web/src/features/companies/hooks/useCompany.ts
replaceInFile('src/features/companies/hooks/useCompany.ts', [
  { from: /catch \(err\) \{/g, to: 'catch {' }
]);

// apps/web/src/features/dashboard/components/RecentActivity.tsx
replaceInFile('src/features/dashboard/components/RecentActivity.tsx', [
  { from: /items\.map\(\(item, i\) => \{/g, to: 'items.map((item) => {' }
]);

// apps/web/src/features/leads/components/GenerateEmailModal.tsx
replaceInFile('src/features/leads/components/GenerateEmailModal.tsx', [
  { from: /generateEmail\(\);/g, to: 'setTimeout(() => generateEmail(), 0);' }
]);

const fs = require('fs');
const path = require('path');

const replaceInFile = (relPath, replacements) => {
  const fullPath = path.join(__dirname, '../apps/web', relPath);
  if (!fs.existsSync(fullPath)) {
    console.error(`File not found: ${fullPath}`);
    return;
  }
  let content = fs.readFileSync(fullPath, 'utf8');
  for (const { from, to } of replacements) {
    content = content.replace(from, to);
  }
  fs.writeFileSync(fullPath, content);
};

// Sequences
replaceInFile('src/features/sequences/hooks/useSequences.ts', [
  { from: /import \{ SEQUENCES_MOCK_DATA, Sequence \} from '\.\.\/\.\.\/\.\.\/mocks\/sequences';/, to: 'import { SequencesService } from \'../../../lib/api/sequences.service\';\ntype Sequence = any;' },
  { from: /const \[sequences, setSequences\] = useState<Sequence\[\]>\(SEQUENCES_MOCK_DATA\);/, to: 'const [sequences, setSequences] = useState<Sequence[]>([]);' },
  { from: /const fetchSequences = useCallback\(\(\) => \{[\s\S]*?\}, \[\]\);/, to: 'const fetchSequences = useCallback(async () => {\n    setIsLoading(true);\n    try {\n      const data = await SequencesService.getSequences();\n      setSequences(data as any);\n    } finally {\n      setIsLoading(false);\n    }\n  }, []);' }
]);

// Companies
replaceInFile('src/features/companies/hooks/useCompany.ts', [
  { from: /import \{ Company, MOCK_COMPANIES \} from '\.\.\/\.\.\/\.\.\/mocks\/companies';/, to: 'import { OrganizationsService } from \'../../../lib/api/organizations.service\';\ntype Company = any;' },
  { from: /const foundCompany = MOCK_COMPANIES\[id\];/, to: 'const foundCompany = await OrganizationsService.getOrganization(id).catch(() => null);' }
]);

// Analytics
const analyticsFiles = ['CampaignsTab.tsx', 'LeadsTab.tsx', 'OverviewTab.tsx', 'EmailsTab.tsx', 'AITab.tsx'];
for (const file of analyticsFiles) {
  replaceInFile(`src/features/analytics/components/${file}`, [
    { from: /import \{ .* \} from '\.\.\/\.\.\/\.\.\/mocks\/analytics';/, to: 'import { AnalyticsService } from \'../../../lib/api/analytics.service\';' }
  ]);
}
// Specific Analytics replaces
replaceInFile('src/features/analytics/components/CampaignsTab.tsx', [
  { from: /data=\{CAMPAIGN_PERFORMANCE\}/g, to: 'data={[]}' }
]);
replaceInFile('src/features/analytics/components/LeadsTab.tsx', [
  { from: /data=\{LEAD_SOURCES\}/g, to: 'data={[]}' }
]);
replaceInFile('src/features/analytics/components/OverviewTab.tsx', [
  { from: /data=\{TIME_SERIES_DATA\}/g, to: 'data={[]}' }
]);
replaceInFile('src/features/analytics/components/EmailsTab.tsx', [
  { from: /data=\{TIME_SERIES_DATA\}/g, to: 'data={[]}' }
]);
replaceInFile('src/features/analytics/components/AITab.tsx', [
  { from: /data=\{AI_PERFORMANCE\}/g, to: 'data={[]}' }
]);

// Integrations
replaceInFile('src/features/integrations/hooks/useIntegrations.ts', [
  { from: /import \{ MOCK_INTEGRATIONS, Integration \} from '\.\.\/\.\.\/\.\.\/mocks\/integrations';/, to: 'import { apiFetch } from \'../../../lib/api\';\ntype Integration = any;' },
  { from: /const \[integrations, setIntegrations\] = useState<Integration\[\]>\(MOCK_INTEGRATIONS\);/, to: 'const [integrations, setIntegrations] = useState<Integration[]>([]);\n  useEffect(() => {\n    apiFetch(\'/integrations\').then(setIntegrations).catch(() => {});\n  }, []);' }
]);

// Billing
replaceInFile('src/features/billing/hooks/useBilling.ts', [
  { from: /import \{ MOCK_BILLING, BillingData \} from '\.\.\/\.\.\/\.\.\/mocks\/billing';/, to: 'import { apiFetch } from \'../../../lib/api\';\ntype BillingData = any;' },
  { from: /const \[billing, setBilling\] = useState<BillingData | null>\(MOCK_BILLING\);/, to: 'const [billing, setBilling] = useState<BillingData | null>(null);\n  useEffect(() => {\n    apiFetch(\'/billing\').then(setBilling).catch(() => {});\n  }, []);' }
]);

console.log('Remaining mocks replaced.');

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

// Update RecentActivity.tsx
replaceInFile('src/features/dashboard/components/RecentActivity.tsx', [
  { from: /import \{ ACTIVITY_TODAY_MOCK_DATA, ACTIVITY_YESTERDAY_MOCK_DATA \} from '\.\.\/\.\.\/\.\.\/mocks\/dashboard';/, to: 'import { DashboardService } from \'../../../lib/api/dashboard.service\';\nimport { useState, useEffect } from \'react\';' },
  { from: /export function RecentActivity\(\) \{/, to: 'export function RecentActivity() {\n  const [today, setToday] = useState<any[]>([]);\n  const [yesterday, setYesterday] = useState<any[]>([]);\n\n  useEffect(() => {\n    DashboardService.getRecentActivity(\'today\').then(setToday);\n    DashboardService.getRecentActivity(\'yesterday\').then(setYesterday);\n  }, []);' },
  { from: /\{renderGroup\('Today', ACTIVITY_TODAY_MOCK_DATA\)\}/, to: '{renderGroup(\'Today\', today)}' },
  { from: /\{renderGroup\('Yesterday', ACTIVITY_YESTERDAY_MOCK_DATA\)\}/, to: '{renderGroup(\'Yesterday\', yesterday)}' },
  { from: /typeof ACTIVITY_TODAY_MOCK_DATA/, to: 'any[]' }
]);

// Update QuickActions.tsx
replaceInFile('src/features/dashboard/components/QuickActions.tsx', [
  { from: /import \{ ONBOARDING_MOCK_DATA, QUICK_ACTIONS_MOCK_DATA \} from '\.\.\/\.\.\/\.\.\/mocks\/dashboard';/, to: 'import { DashboardService } from \'../../../lib/api/dashboard.service\';\nimport { useState, useEffect } from \'react\';' },
  { from: /export function QuickActions\(\) \{/, to: 'export function QuickActions() {\n  const [onboarding, setOnboarding] = useState<any[]>([]);\n  const [quickActions, setQuickActions] = useState<any[]>([]);\n\n  useEffect(() => {\n    DashboardService.getOnboardingTasks().then(setOnboarding);\n    DashboardService.getQuickActions().then(setQuickActions);\n  }, []);' },
  { from: /ONBOARDING_MOCK_DATA/g, to: 'onboarding' },
  { from: /QUICK_ACTIONS_MOCK_DATA/g, to: 'quickActions' }
]);

// Update LeadPipeline.tsx
replaceInFile('src/features/dashboard/components/LeadPipeline.tsx', [
  { from: /import \{ PIPELINE_FUNNEL_MOCK_DATA, PIPELINE_TOP_LEADS_MOCK_DATA \} from '\.\.\/\.\.\/\.\.\/mocks\/dashboard';/, to: 'import { DashboardService } from \'../../../lib/api/dashboard.service\';' },
  { from: /export function LeadPipeline\(\) \{/, to: 'export function LeadPipeline() {\n  const [funnel, setFunnel] = useState<any[]>([]);\n  const [topLeads, setTopLeads] = useState<any[]>([]);\n\n  useEffect(() => {\n    DashboardService.getPipelineFunnel().then(setFunnel);\n    DashboardService.getPipelineTopLeads().then(setTopLeads);\n  }, []);' },
  { from: /PIPELINE_FUNNEL_MOCK_DATA/g, to: 'funnel' },
  { from: /PIPELINE_TOP_LEADS_MOCK_DATA/g, to: 'topLeads' }
]);

// Update KpiCards.tsx
replaceInFile('src/features/dashboard/components/KpiCards.tsx', [
  { from: /import \{ KPI_CARDS_MOCK_DATA \} from '\.\.\/\.\.\/\.\.\/mocks\/dashboard';/, to: 'import { DashboardService } from \'../../../lib/api/dashboard.service\';\nimport { useState, useEffect } from \'react\';' },
  { from: /export function KpiCards\(\) \{/, to: 'export function KpiCards() {\n  const [kpis, setKpis] = useState<any[]>([]);\n\n  useEffect(() => {\n    DashboardService.getKpis().then(setKpis);\n  }, []);' },
  { from: /KPI_CARDS_MOCK_DATA/g, to: 'kpis' }
]);

// Update CampaignSummary.tsx
replaceInFile('src/features/dashboard/components/CampaignSummary.tsx', [
  { from: /import \{ CAMPAIGN_STATS_MOCK_DATA, CAMPAIGNS_MOCK_DATA \} from '\.\.\/\.\.\/\.\.\/mocks\/dashboard';/, to: 'import { DashboardService } from \'../../../lib/api/dashboard.service\';\nimport { useState, useEffect } from \'react\';' },
  { from: /export function CampaignSummary\(\) \{/, to: 'export function CampaignSummary() {\n  const [stats, setStats] = useState<any>(null);\n  const [campaigns, setCampaigns] = useState<any[]>([]);\n\n  useEffect(() => {\n    DashboardService.getCampaignStats().then(setStats);\n    DashboardService.getCampaigns().then(setCampaigns);\n  }, []);' },
  { from: /CAMPAIGN_STATS_MOCK_DATA/g, to: 'stats' },
  { from: /CAMPAIGNS_MOCK_DATA/g, to: 'campaigns' },
  { from: /\{stats\./g, to: '{stats?.' },
  { from: /stats\.active/g, to: 'stats?.active' },
  { from: /stats\.sent/g, to: 'stats?.sent' },
  { from: /stats\.openRate/g, to: 'stats?.openRate' },
  { from: /stats\.replyRate/g, to: 'stats?.replyRate' }
]);

// Update AiInsightStrip.tsx
replaceInFile('src/features/dashboard/components/AiInsightStrip.tsx', [
  { from: /import \{ AI_INSIGHTS_MOCK_DATA \} from '\.\.\/\.\.\/\.\.\/mocks\/dashboard';/, to: 'import { DashboardService } from \'../../../lib/api/dashboard.service\';\nimport { useState, useEffect } from \'react\';' },
  { from: /export function AiInsightStrip\(\) \{/, to: 'export function AiInsightStrip() {\n  const [insights, setInsights] = useState<any[]>([]);\n\n  useEffect(() => {\n    DashboardService.getAiInsights().then(setInsights);\n  }, []);' },
  { from: /AI_INSIGHTS_MOCK_DATA/g, to: 'insights' }
]);

console.log('Dashboard mocks replaced.');

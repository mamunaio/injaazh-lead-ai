const fs = require('fs');
const path = require('path');

const components = [
  'KpiCards',
  'PerformanceChart',
  'AiInsightStrip',
  'LeadPipeline',
  'CampaignSummary',
  'RecentActivity',
  'QuickActions'
];

const dashboardDir = path.join(__dirname, '../apps/web/src/features/dashboard/components');

components.forEach(comp => {
  const filePath = path.join(dashboardDir, `${comp}.tsx`);
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf8');

  // If the file doesn't have use client, and we need state, we add it.
  if (!content.includes('"use client"') && !content.includes("'use client'")) {
    content = `"use client";\n\n` + content;
  }

  // Add standard hooks and state if it doesn't exist
  if (!content.includes('useState') && content.includes('react')) {
    content = content.replace(/import React(.*?)(?:;|\n)/, "import React, { useState, useEffect } from 'react';\n");
  } else if (!content.includes('useState')) {
    content = content.replace(/import /, "import { useState, useEffect } from 'react';\nimport ");
  }

  // Add DashboardService import
  if (!content.includes('DashboardService')) {
    content = content.replace(/(import .*?\n)(?!import)/, "$1import { DashboardService } from '../../../lib/api/dashboard.service';\n");
  }

  // Now the tricky part. Replace the undefined mock variables with state.
  // We'll replace the export function signature to include data fetching.
  const regex = new RegExp(`export function ${comp}\\(.*?\\) \\{`);
  if (content.match(regex)) {
    let mockVar = '';
    let apiCall = '';
    
    if (comp === 'KpiCards') { mockVar = 'kpis'; apiCall = 'getKpis'; }
    else if (comp === 'PerformanceChart') { mockVar = 'performanceData'; apiCall = 'getPerformance'; }
    else if (comp === 'AiInsightStrip') { mockVar = 'insights'; apiCall = 'getAiInsights'; }
    else if (comp === 'LeadPipeline') { mockVar = 'funnelData'; apiCall = 'getPipelineFunnel'; }
    else if (comp === 'CampaignSummary') { mockVar = 'campaignStats'; apiCall = 'getCampaignStats'; }
    else if (comp === 'RecentActivity') { mockVar = 'activities'; apiCall = 'getRecentActivity'; }
    else if (comp === 'QuickActions') { mockVar = 'actions'; apiCall = 'getQuickActions'; }

    if (mockVar) {
      const stateInjection = `
  const [${mockVar}, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    DashboardService.${apiCall}().then(res => {
      if (Array.isArray(res)) setData(res);
      else if (res && Array.isArray(res.data)) setData(res.data);
      else if (res) setData([res]);
    }).catch(console.error).finally(() => setIsLoading(false));
  }, []);
`;
      // Insert state inside component
      content = content.replace(regex, `export function ${comp}({ loading }: { loading?: boolean }) {\n${stateInjection}`);
      
      // If the component previously mapped over the undefined array, it will now map over state!
      // But we need to make sure we don't declare it if it's already there
    }
  }

  fs.writeFileSync(filePath, content);
});

console.log('Fixed Dashboard Components');

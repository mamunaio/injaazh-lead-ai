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

// Campaigns: StepSelectAudience
replaceInFile('src/features/campaigns/components/wizard/StepSelectAudience.tsx', [
  { from: /import \{ SEGMENTS_MOCK_DATA \} from '\.\.\/\.\.\/\.\.\/\.\.\/mocks\/segments';/, to: 'import { CampaignsService } from \'../../../../lib/api/campaigns.service\';\nimport { useState, useEffect } from \'react\';' },
  { from: /const segments = SEGMENTS_MOCK_DATA;/, to: 'const [segments, setSegments] = useState<any[]>([]);\n  useEffect(() => {\n    CampaignsService.getSegments().then(setSegments);\n  }, []);' }
]);

// Campaigns: StepEmailAccount
replaceInFile('src/features/campaigns/components/wizard/StepEmailAccount.tsx', [
  { from: /import \{ EMAIL_ACCOUNTS_MOCK_DATA \} from '\.\.\/\.\.\/\.\.\/\.\.\/mocks\/accounts';/, to: 'import { CampaignsService } from \'../../../../lib/api/campaigns.service\';\nimport { useState, useEffect } from \'react\';' },
  { from: /import React from 'react';/, to: 'import React, { useState, useEffect } from \'react\';' },
  { from: /const accounts = EMAIL_ACCOUNTS_MOCK_DATA;/, to: 'const [accounts, setAccounts] = useState<any[]>([]);\n  useEffect(() => {\n    CampaignsService.getAccounts().then(setAccounts);\n  }, []);' }
]);

// Campaigns: StepReview
replaceInFile('src/features/campaigns/components/wizard/StepReview.tsx', [
  { from: /import \{ SEGMENTS_MOCK_DATA \} from '\.\.\/\.\.\/\.\.\/\.\.\/mocks\/segments';\nimport \{ SEQUENCES_MOCK_DATA \} from '\.\.\/\.\.\/\.\.\/\.\.\/mocks\/sequences';\nimport \{ EMAIL_ACCOUNTS_MOCK_DATA \} from '\.\.\/\.\.\/\.\.\/\.\.\/mocks\/accounts';/, to: 'import { useState, useEffect } from \'react\';\nimport { CampaignsService } from \'../../../../lib/api/campaigns.service\';\nimport { SequencesService } from \'../../../../lib/api/sequences.service\';' },
  { from: /  const data = \{\n    segment: SEGMENTS_MOCK_DATA.find\(s => s\.id === formData\.segmentId\),\n    sequence: SEQUENCES_MOCK_DATA.find\(s => s\.id === formData\.sequenceId\),\n    account: EMAIL_ACCOUNTS_MOCK_DATA.find\(s => s\.id === formData\.emailAccountId\),\n  \};/, to: '  const [data, setData] = useState<any>({ segment: null, sequence: null, account: null });\n  useEffect(() => {\n    Promise.all([\n      CampaignsService.getSegments(),\n      SequencesService.getSequences(),\n      CampaignsService.getAccounts()\n    ]).then(([segments, sequences, accounts]) => {\n      setData({\n        segment: segments.find((s: any) => s.id === formData.segmentId),\n        sequence: sequences.find((s: any) => s.id === formData.sequenceId),\n        account: accounts.find((a: any) => a.id === formData.emailAccountId)\n      });\n    });\n  }, [formData]);' }
]);

console.log('Campaigns mocks replaced.');

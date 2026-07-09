const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../apps/web/src/features/analytics/components');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

files.forEach(f => {
  const filePath = path.join(dir, f);
  let content = fs.readFileSync(filePath, 'utf8');

  // Check if AnalyticsService is used but not imported
  if (content.includes('AnalyticsService.') && !content.includes('import { AnalyticsService }') && !content.includes('import { AnalyticsService,')) {
    // If there's an import from analytics.service, append to it
    if (content.includes('from \'../../../lib/api/analytics.service\'')) {
      content = content.replace(/import \{(.*?)\} from '\.\.\/\.\.\/\.\.\/lib\/api\/analytics\.service'/, "import { $1, AnalyticsService } from '../../../lib/api/analytics.service'");
    } else {
      content = content.replace(/(import .*?;)/, "$1\nimport { AnalyticsService } from '../../../lib/api/analytics.service';");
    }
    fs.writeFileSync(filePath, content);
    console.log('Fixed', f);
  }
});

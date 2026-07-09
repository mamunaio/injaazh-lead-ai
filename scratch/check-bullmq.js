const { Queue } = require('bullmq');
const IORedis = require('ioredis');

async function checkFailedJobs() {
  const connection = new IORedis({ host: 'localhost', port: 6379 });
  const aiQueue = new Queue('ai-generation', { connection });

  const failedJobs = await aiQueue.getFailed();
  console.log(`Found ${failedJobs.length} failed jobs.`);
  
  for (const job of failedJobs) {
    console.log(`Job ${job.id} failed with error:`, job.failedReason);
    console.log('Stack trace:', job.stacktrace);
  }

  const activeJobs = await aiQueue.getActive();
  console.log(`Found ${activeJobs.length} active jobs.`);
  
  const waitingJobs = await aiQueue.getWaiting();
  console.log(`Found ${waitingJobs.length} waiting jobs.`);

  await connection.quit();
}

checkFailedJobs().catch(console.error);

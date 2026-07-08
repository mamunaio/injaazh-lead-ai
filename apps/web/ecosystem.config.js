module.exports = {
  apps: [
    {
      name: 'injaazh-lead-ai-web',
      script: 'server.js', // This requires standalone output mode from Next.js (.next/standalone/server.js)
      cwd: './.next/standalone',
      instances: 'max', // Scale to max available CPUs
      exec_mode: 'cluster',
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
    },
  ],
};
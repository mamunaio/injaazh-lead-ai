const mongoose = require('mongoose');
const Redis = require('ioredis');
const http = require('http');

async function verify() {
  const report = {
    mongo: false,
    redis: false,
    apiHealth: false,
    swagger: false
  };

  try {
    console.log('Checking MongoDB...');
    await mongoose.connect('mongodb://localhost:27017/injaazh', { serverSelectionTimeoutMS: 2000 });
    report.mongo = true;
    await mongoose.disconnect();
  } catch (err) {
    console.log('MongoDB failed:', err.message);
  }

  try {
    console.log('Checking Redis...');
    const redis = new Redis({ host: '127.0.0.1', port: 6379, maxRetriesPerRequest: 1, commandTimeout: 2000 });
    await redis.ping();
    report.redis = true;
    redis.disconnect();
  } catch (err) {
    console.log('Redis failed:', err.message);
  }

  const checkHttp = (path) => {
    return new Promise((resolve) => {
      http.get(`http://localhost:3000${path}`, (res) => {
        resolve(res.statusCode === 200 || res.statusCode === 304);
      }).on('error', (e) => {
        resolve(false);
      });
    });
  };

  try {
    console.log('Checking API Health...');
    report.apiHealth = await checkHttp('/health');
  } catch (err) {}

  try {
    console.log('Checking Swagger...');
    report.swagger = await checkHttp('/api/docs');
  } catch (err) {}

  console.log(JSON.stringify(report, null, 2));
}

verify();

# Deployment Guide

This document outlines how to deploy the Injaazh Lead AI frontend.

## Prerequisites
- Docker & Docker Compose installed on the server.
- A domain name pointed to your server's IP address.

## 1. Environment Setup
1. Copy the production environment template:
   ```bash
   cp apps/web/.env.production .env.production
   ```
2. Update the variables in `.env.production` with your real production API URLs and secrets.

## 2. Docker Deployment (Recommended)
We use a multi-stage Dockerfile and Nginx reverse proxy for optimal performance.

1. Build and start the containers in detached mode:
   ```bash
   docker-compose up -d --build
   ```
2. The application will be available on port 80. Nginx handles static file caching and proxies dynamic requests to Next.js.

### Verifying Deployment
You can check the health of the application by visiting the health check endpoint:
```
http://your-domain.com/api/health
```

## 3. Alternative Deployment (PM2 without Docker)
If you prefer not to use Docker, you can run the standalone build using PM2.

1. Install PM2 globally:
   ```bash
   npm install -g pm2
   ```
2. Build the application:
   ```bash
   npm run build --prefix apps/web
   ```
3. Start the application with PM2:
   ```bash
   pm2 start apps/web/ecosystem.config.js
   ```

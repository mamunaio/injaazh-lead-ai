# Stage 1: Development (Install all dependencies)
FROM node:20-alpine AS development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

# Stage 2: Build (Compile the NestJS application)
FROM node:20-alpine AS build

WORKDIR /usr/src/app

COPY package*.json ./
COPY --from=development /usr/src/app/node_modules ./node_modules
COPY . .

RUN npm run build
ENV NODE_ENV production
RUN npm ci --only=production && npm cache clean --force

# Stage 3: Production (Optimized runtime environment)
FROM node:20-alpine AS production

# Set production environment
ENV NODE_ENV production

# Run as non-root user for security best practices
USER node
WORKDIR /usr/src/app

# Copy production dependencies and compiled build from the build stage
COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist

# Expose standard port (will be overridden by env variables)
EXPOSE 3000

# Start the server
CMD ["node", "dist/main"]

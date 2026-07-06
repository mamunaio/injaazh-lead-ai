# --- Base image with pnpm and turbo ---
FROM node:22-alpine AS base
# libc6-compat is needed for turbo and other native modules
RUN apk update && apk add --no-cache libc6-compat
RUN npm install -g pnpm turbo

# --- Prune Stage ---
FROM base AS pruner
WORKDIR /app
COPY . .
# Extract only the api workspace and its dependencies
RUN turbo prune api --docker

# --- Installer Stage ---
FROM base AS installer
WORKDIR /app

# First install dependencies to leverage Docker cache
COPY --from=pruner /app/out/json/ .
COPY pnpm-lock.yaml ./pnpm-lock.yaml
COPY pnpm-workspace.yaml ./pnpm-workspace.yaml
RUN pnpm install --frozen-lockfile

# Now copy the pruned workspace files
COPY --from=pruner /app/out/full/ .

# Build the api project
RUN pnpm turbo run build --filter=api...

# --- Runner Stage (Production) ---
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nestjs
USER nestjs

# Copy only the compiled output and necessary node_modules
COPY --from=installer --chown=nestjs:nodejs /app/apps/api/package.json ./apps/api/package.json
COPY --from=installer --chown=nestjs:nodejs /app/apps/api/dist ./apps/api/dist
COPY --from=installer --chown=nestjs:nodejs /app/node_modules ./node_modules
COPY --from=installer --chown=nestjs:nodejs /app/apps/api/node_modules ./apps/api/node_modules

EXPOSE 3000

CMD ["node", "apps/api/dist/main.js"]

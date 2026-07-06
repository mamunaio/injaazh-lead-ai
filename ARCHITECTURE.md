# Project Architecture

We are adopting a modern enterprise-grade Turborepo monorepo architecture. 

## Directory Tree

```text
injaazh-lead-ai/
├── .ai/                       # AI context, workflows, commands, and templates
├── apps/                      # Application layer
│   ├── admin/                 # Internal admin dashboard (Optional/Next.js or Vite)
│   ├── api/                   # Main backend API (NestJS)
│   ├── web/                   # User-facing application (Next.js)
│   └── worker/                # Background job processor (NestJS/BullMQ)
├── docs/                      # Global documentation, architecture, and ADRs
├── infrastructure/            # IaC, Kubernetes manifests, Docker, and CI/CD pipelines
├── packages/                  # Shared libraries and internal packages
│   ├── ai/                    # LLM SDK wrappers and prompt engineering utilities
│   ├── config/                # Shared ESLint, TypeScript, and Prettier configurations
│   ├── database/              # Mongoose schemas, migrations, and connection utilities
│   ├── logger/                # Universal Winston logger configuration
│   ├── shared/                # Common utilities, constants, and helpers
│   ├── types/                 # Universal TypeScript interfaces and DTOs
│   └── ui/                    # Shared React UI components (e.g., Tailwind/Radix)
├── .npmrc                     # pnpm configuration
├── package.json               # Root workspace package.json
├── pnpm-workspace.yaml        # PNPM workspace definition
└── turbo.json                 # Turborepo build pipeline configuration
```

## Overview
- **Workspace Manager:** pnpm
- **Build System:** Turborepo
- **Apps:** Decoupled applications for API (NestJS), Web Frontend (Next.js), Background Workers (NestJS/BullMQ).
- **Packages:** Shared business logic, database models, configurations, and UI components to ensure dry code and strict module boundaries across the enterprise platform.

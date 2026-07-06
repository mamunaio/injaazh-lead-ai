# ARCHITECTURE.md

## 1. Folder Structure

### Backend (NestJS - Clean Architecture & Feature-based)
```text
backend/
├── src/
│   ├── app.module.ts
│   ├── main.ts
│   ├── common/                  # Shared resources across all modules
│   │   ├── config/              # Environment variables & configuration
│   │   ├── decorators/          # Custom decorators (e.g., @CurrentUser)
│   │   ├── exceptions/          # Custom exception filters
│   │   ├── filters/             # Global HTTP filters
│   │   ├── guards/              # Authentication & Authorization guards
│   │   ├── interceptors/        # Global interceptors
│   │   ├── logger/              # Winston logger setup
│   │   └── utils/               # Helper functions
│   ├── modules/                 # Feature-based modules
│   │   ├── auth/                # Authentication & Session management
│   │   ├── users/               # User profiles and organization management
│   │   ├── leads/               # Lead generation, processing, and management
│   │   ├── campaigns/           # AI Outreach campaigns
│   │   ├── ai-agent/            # Integration with LLMs and AI services
│   │   └── webhooks/            # External integrations
│   └── infrastructure/          # External services & persistence
│       ├── database/            # MongoDB connection & base repository interfaces
│       ├── redis/               # Redis caching module
│       └── queue/               # BullMQ setup for background jobs
├── test/                        # E2E tests
├── Dockerfile
├── docker-compose.yml
└── package.json
```

### Frontend (Next.js 16 - App Router)
```text
frontend/
├── src/
│   ├── app/                     # Next.js App Router (Pages & Layouts)
│   │   ├── (auth)/              # Route group for login/register
│   │   ├── (dashboard)/         # Route group for authenticated views
│   │   │   ├── leads/
│   │   │   ├── campaigns/
│   │   │   └── settings/
│   │   ├── api/                 # Next.js API routes (if needed for BFF)
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/              # Reusable UI components
│   │   ├── ui/                  # shadcn/ui components (buttons, dialogs, etc.)
│   │   ├── forms/               # Form components (react-hook-form)
│   │   ├── layouts/             # Sidebar, Navbar, Footers
│   │   └── shared/              # Domain-specific shared components
│   ├── hooks/                   # Custom React hooks (e.g., useAuth, useLeads)
│   ├── lib/                     # Utilities & Configurations
│   │   ├── api-client.ts        # Axios/Fetch wrapper for backend communication
│   │   ├── store/               # State management (Zustand/Redux)
│   │   └── utils.ts             # Tailwind merge, date formatting
│   ├── types/                   # TypeScript interfaces (mirrored from backend DTOs)
│   └── styles/                  # Tailwind global CSS
├── public/                      # Static assets
├── tailwind.config.ts
├── next.config.mjs
└── package.json
```

## 2. Module List (Backend)

1. **AuthModule**: Handles user registration, login, JWT token generation, and password resets.
2. **UsersModule**: Manages user profiles, roles, permissions, and organization settings (Multi-tenant support).
3. **LeadsModule**: Core feature handling lead capturing, CRUD operations, lead scoring, and export functionality.
4. **CampaignsModule**: Manages AI outreach campaigns, scheduling, and linking campaigns to specific lead segments.
5. **AIAgentModule**: Interfaces with external AI providers (Gemini) to generate personalized outreach emails and qualify leads.
6. **QueueModule (BullMQ)**: Background task processing for heavy operations like bulk lead imports, asynchronous AI generation, and email dispatching.
7. **CacheModule (Redis)**: Caches frequent queries (e.g., user profiles, dashboard metrics) and handles rate-limiting.
8. **ConfigModule**: Centralized environment variable validation and access.

## 3. Database Collections (MongoDB / Mongoose)

1. **Users**
   - `_id`, `email`, `passwordHash`, `firstName`, `lastName`, `role`, `organizationId`, `createdAt`, `updatedAt`
2. **Organizations** (For B2B SaaS architecture)
   - `_id`, `name`, `subscriptionTier`, `apiKeys`, `createdAt`, `updatedAt`
3. **Leads**
   - `_id`, `organizationId`, `firstName`, `lastName`, `email`, `company`, `jobTitle`, `linkedinUrl`, `status` (New, Contacted, Qualified, Converted), `aiScore`, `metadata`, `createdAt`, `updatedAt`
4. **Campaigns**
   - `_id`, `organizationId`, `name`, `promptTemplate`, `status` (Draft, Active, Paused, Completed), `schedule`, `createdAt`, `updatedAt`
5. **CampaignLogs / AI_Interactions**
   - `_id`, `campaignId`, `leadId`, `generatedContent`, `status` (Pending, Sent, Failed), `errorMessage`, `createdAt`

## 4. API Overview

All routes are prefixed with `/api/v1/` and documented via Swagger.

**Authentication & Users**
- `POST /auth/register` - Create a new account & organization
- `POST /auth/login` - Authenticate and return JWT
- `GET /auth/me` - Get current user profile
- `PATCH /users/:id` - Update user details

**Leads**
- `GET /leads` - List leads (Supports pagination, filtering by status, sorting)
- `POST /leads` - Create a single lead
- `POST /leads/bulk-import` - Upload CSV to BullMQ queue for processing
- `GET /leads/:id` - Get specific lead details
- `PATCH /leads/:id` - Update lead information or status
- `POST /leads/:id/enrich` - Trigger AI to find more info on a lead

**Campaigns & AI**
- `GET /campaigns` - List all campaigns
- `POST /campaigns` - Create a new outreach campaign
- `GET /campaigns/:id` - Get campaign details and stats
- `POST /campaigns/:id/start` - Activate campaign and queue AI generation tasks
- `POST /ai/generate-pitch` - Test endpoint to generate a single personalized pitch

**System/Webhooks**
- `GET /health` - Application health check (DB, Redis status)
- `POST /webhooks/stripe` - Handle subscription updates

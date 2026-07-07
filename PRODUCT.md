# PRODUCT.md — Injaazh Lead AI

> **Single Source of Truth for Product Definition**  
> Version: 1.0 | Last Updated: July 2026 | Status: Living Document

---

## 1. Product Vision

**Injaazh Lead AI** is an intelligent B2B outreach platform that transforms how businesses discover, qualify, and engage high-value prospects. By combining AI-powered personalization with automated campaign orchestration, Injaazh eliminates the manual grind of traditional lead generation — enabling sales and marketing teams to achieve more meaningful outreach at a scale that was previously impossible.

> *"From prospect to conversation — intelligently automated."*

---

## 2. Product Goals

| # | Goal | Success Metric |
|---|------|---------------|
| G1 | Automate the full lead lifecycle from discovery to first reply | ≥ 80% of outreach workflows run without manual intervention |
| G2 | Deliver AI-personalized emails that feel human-written | Open Rate > 35%, Reply Rate > 8% on AI-generated campaigns |
| G3 | Provide real-time visibility into campaign and lead health | Dashboard data freshness < 60 seconds |
| G4 | Scale to enterprise-grade workloads without performance degradation | System handles 10,000+ leads per import with < 5s AI generation per lead |
| G5 | Maintain multi-tenant data isolation across all organizations | Zero cross-tenant data leaks confirmed by security audit |
| G6 | Give sales reps a lightweight CRM to track relationships | Task completion rate tracked; overdue reminders fired 1hr before due date |

---

## 3. User Personas

### Persona 1 — The Solo Sales Rep (Alex)
- **Description**: An individual contributor at a mid-size B2B company. Manages his own pipeline and needs to send 50–100 personalized cold emails per week without an assistant.
- **Pain Points**: Writing personalized emails takes hours. Forgetting to follow up. No visibility into who opened what.
- **Goals**: Automate outreach, know when to follow up, and close more deals with less effort.
- **Technical Comfort**: Medium. Uses tools like Notion, HubSpot, and Gmail. Not a developer.

---

### Persona 2 — The Agency Owner (Sara)
- **Description**: Runs a lead generation agency serving 5–10 clients simultaneously. Each client has a different ICP (ideal customer profile) and messaging style.
- **Pain Points**: Switching contexts between clients. Keeping campaigns organized per client. Reporting on results.
- **Goals**: Manage multiple clients from one platform. Generate customized campaigns per client. Show clear ROI.
- **Technical Comfort**: High. Comfortable with SaaS tools, APIs, and dashboards.

---

### Persona 3 — The Marketing Team Lead (Karim)
- **Description**: Heads outbound marketing at a 50-person B2B SaaS company. Oversees a team of 3 SDRs. Focuses on funnel optimization and conversion rates.
- **Pain Points**: Inconsistent messaging across the team. No A/B testing framework. Manual sequence building.
- **Goals**: Standardize outreach sequences. A/B test subject lines. Segment leads by behavior and score.
- **Technical Comfort**: High. Uses marketing automation tools, CRMs, and analytics platforms daily.

---

### Persona 4 — The Freelancer (Nadia)
- **Description**: A freelance consultant who books clients through cold outreach. Limited time; needs to maximize the ROI of every email sent.
- **Pain Points**: Writing cold emails from scratch. Not knowing the right time to reach out. Limited budget for premium tools.
- **Goals**: Send high-quality, personalized outreach in minimal time. Know what's working. Grow her pipeline steadily.
- **Technical Comfort**: Low-to-medium. Prefers simple, guided interfaces.

---

## 4. User Roles

| Role | Description | Key Permissions |
|------|-------------|----------------|
| **Owner** | Creator of the organization. Full control over all settings, users, billing, and data. | All permissions |
| **Admin** | Trusted team member with near-full access. Can manage users, campaigns, and settings but not billing. | All except billing |
| **Member** | Standard team member. Can create and manage leads, campaigns, and their own tasks. Cannot manage team members. | Leads, Campaigns, Tasks, Notes |
| **Viewer** *(Future)* | Read-only access to dashboards and reports. Useful for stakeholder reporting. | View-only |

---

## 5. User Journey

### Primary Journey: Cold Email Outreach

```
[1. Register / Login]
       ↓
[2. Connect Email Account (SMTP / Gmail / Outlook)]
       ↓
[3. Import Leads (CSV / Manual Entry / Apollo Enrichment)]
       ↓
[4. AI Enrichment — Website Analysis, LinkedIn Intel, Lead Scoring]
       ↓
[5. Define a Segment — Filter leads by tags, status, score, or custom criteria]
       ↓
[6. Build an Email Sequence — Multi-step follow-up with delays]
       ↓
[7. Create a Campaign — Link Segment + Sequence + Schedule]
       ↓
[8. Launch Campaign — BullMQ orchestrates delivery per lead]
       ↓
[9. Track Performance — Real-time opens, clicks, replies on Dashboard]
       ↓
[10. Manage Relationships — Log notes, assign tasks, move leads through CRM stages]
       ↓
[11. Iterate — A/B test subject lines, optimize sequences, re-target cold leads]
```

### Secondary Journey: Manual Relationship Management

```
[1. Add Lead Manually]
       ↓
[2. View Lead Profile — AI Score, tags, activity timeline]
       ↓
[3. Log a Note — Record call outcomes, meeting notes, observations]
       ↓
[4. Assign a Task — Follow-up call, send proposal, check LinkedIn]
       ↓
[5. Receive Automated Reminder — 1hr before task due date via email]
       ↓
[6. Update Lead Status — Move through New → Contacted → Qualified → Won/Lost]
```

---

## 6. Navigation Structure

```
Injaazh Lead AI (App)
│
├── /login                          — Authentication
├── /register                       — New Account Creation
│
├── /dashboard                      — Analytics Overview (Home)
│   ├── Metric Cards (Leads, Emails, Rates)
│   └── Campaign Performance Table
│
├── /leads                          — Lead Management Hub
│   ├── /leads                      — Lead List (table with filters)
│   ├── /leads/new                  — Add Lead Manually
│   └── /leads/[id]                 — Lead Detail & Profile (Future)
│
├── /campaigns                      — Campaign Management (Future Frontend)
│   ├── /campaigns                  — Campaign List
│   ├── /campaigns/new              — Campaign Builder
│   └── /campaigns/[id]             — Campaign Detail & Analytics
│
├── /sequences                      — Email Sequence Builder (Future Frontend)
│   ├── /sequences                  — Sequence List
│   └── /sequences/new              — Build a Sequence
│
├── /crm                            — CRM & Pipeline (Future Frontend)
│   ├── /crm/pipeline               — Kanban Pipeline View
│   ├── /crm/tasks                  — Task Management
│   └── /crm/notes                  — Notes Timeline
│
├── /segments                       — Audience Segmentation (Future Frontend)
│
├── /settings                       — Account & Org Settings (Future Frontend)
│   ├── /settings/profile           — User Profile
│   ├── /settings/email             — Connected Email Accounts
│   ├── /settings/team              — Team Management
│   └── /settings/billing           — Subscription & Billing
│
└── /ai                             — AI Tools (Future Frontend)
    ├── /ai/audit                   — Website Audit Tool
    ├── /ai/followup                — Follow-up Generator
    └── /ai/subject                 — Subject Line Optimizer
```

---

## 7. Main Modules

### 7.1 Authentication Module
Handles user registration, login, JWT issuance, and session management. Supports multi-tenant organization creation on registration.

### 7.2 Leads Module
The core data entity of the platform. Manages CRUD operations, status lifecycle, tagging, AI-enriched fields (website analysis, prospect intelligence, outreach copy), and AI scoring.

### 7.3 Import Module
Handles bulk CSV upload with intelligent column mapping. Parses and upserts leads into the database. Designed to handle 10,000+ rows without blocking the API thread (BullMQ offloading).

### 7.4 AI Engine Module
Interfaces with Google Gemini to provide:
- **Website Audit**: Scrapes and analyzes a lead's company website for value propositions, personnel, and pain points.
- **Lead Scoring**: Scores leads (0–100) based on profile completeness, ICP fit, and enrichment data.
- **Follow-up Generator**: Generates context-aware follow-up email copy based on lead enrichment.
- **Subject Line Optimizer**: Generates multiple high-converting subject line variants.
- **A/B Variant Generator**: Creates A/B test variants for email body copy.
- **Personalized Outreach Generator**: Produces hyper-personalized cold email sequences.

### 7.5 Campaign Module
Orchestrates outreach execution. A Campaign binds together:
- A **Segment** (who to send to)
- A **Sequence** (what to send and when)
- A **Schedule** (when to start)
- A **Prompt Template** (how to personalize)

Campaigns can be paused, resumed, or stopped mid-flight. Execution is fully asynchronous via BullMQ.

### 7.6 Sequences Module
Defines multi-step email workflows. Each step specifies the email template and the delay (in days) before sending. Supports automatic stop-on-reply behavior.

### 7.7 Email Delivery Module (Mail)
Manages connected email accounts (SMTP, Gmail via OAuth, Outlook via Microsoft 365). Dispatches emails through the user's own sending identity. Tracks bounces, replies, and delivery events via webhooks.

### 7.8 Email Tracking Module
Injects tracking pixels and link wrappers into outgoing emails. Logs `Delivered`, `Opened`, `Clicked`, and `Replied` events against individual leads. Powers the analytics dashboard.

### 7.9 Analytics Module
Aggregates campaign performance metrics in real time:
- Total Leads, Emails Sent, Open Rate, Reply Rate, Conversion Rate.
- Per-campaign breakdown of lead statuses (Active, Completed, Failed).

### 7.10 CRM Module
Lightweight CRM layer built into the platform:
- **Pipeline**: Kanban-style deal stages (e.g., Lead → Meeting → Proposal → Won).
- **Tasks**: Action items (Call, Email, Meeting, To-Do) linked to leads or deals with due dates and automated reminders.
- **Notes**: Rich activity timeline tied to a lead, capturing call logs, meeting notes, and observations.

### 7.11 Segmentation Module
Allows users to define reusable audience segments using filter rules (tags, status, score ranges, custom fields). Campaigns consume segments to dynamically select lead recipients.

### 7.12 Enrichment Module
Triggers AI-powered enrichment pipelines on a lead: website scraping → analysis → prospect intelligence generation → AI context packaging. Runs as a background job.

### 7.13 LLM / Prompt Templates Module
Manages reusable prompt templates that parameterize AI-generated content. Users can create, edit, and version-control their prompts to standardize outreach messaging across their team.

### 7.14 Organization / Users Module
Manages multi-tenant isolation. Each organization has its own users, leads, campaigns, and settings. Users are scoped to their organization for all data operations.

---

## 8. Feature Matrix

| Feature | Backend API | Frontend UI | Notes |
|---------|:-----------:|:-----------:|-------|
| User Registration & Login | ✅ | ✅ | JWT-based |
| Protected Routes | ✅ | ✅ | Auth guard + ProtectedRoute component |
| Dashboard Analytics | ✅ | ✅ | Metrics + Campaign Performance |
| Lead List & Detail | ✅ | ✅ | Table with score, status, tags |
| Add Lead Manually | ✅ | ✅ | Full form with redirect |
| CSV Lead Import | ✅ | ❌ | API ready; UI not yet built |
| Lead Status Management | ✅ | ❌ | PATCH /leads/:id ready |
| Lead Tagging | ✅ | ❌ | Tag add/remove endpoints ready |
| Lead Filtering by Tag | ✅ | ❌ | Query param `?tags=` supported |
| AI Website Audit | ✅ | ❌ | POST /ai/audit-website |
| AI Lead Scoring | ✅ | ❌ | POST /ai/score-lead |
| AI Follow-up Generator | ✅ | ❌ | POST /ai/generate-followup |
| AI Subject Optimizer | ✅ | ❌ | POST /ai/optimize-subject |
| AI A/B Variant Generator | ✅ | ❌ | POST /ai/generate-ab-variants |
| AI Outreach Generation | ✅ | ❌ | POST /ai/generate-emails |
| Prompt Templates (CRUD) | ✅ | ❌ | Full CRUD under /prompts/templates |
| Email Sequence Builder | ✅ | ❌ | Full CRUD under /sequences |
| Campaign Management | ✅ | ❌ | Create, launch, pause, resume, stop |
| Campaign Scheduler | ✅ | ❌ | Cron-based BullMQ scheduling |
| Email Delivery (SMTP) | ✅ | ❌ | Multi-provider: SMTP, Gmail, Outlook, Resend, SendGrid |
| Email Open/Click Tracking | ✅ | ❌ | Pixel + link wrapping |
| Reply Detection | ✅ | ❌ | Webhook-based |
| CRM Pipeline (Kanban) | ✅ | ❌ | Stages & deals tracked |
| Task Management | ✅ | ❌ | Full CRUD + automated reminders |
| Notes & Timeline | ✅ | ❌ | Lead-linked activity log |
| Audience Segments | ✅ | ❌ | Filter definitions stored |
| Apollo.io Enrichment | ✅ | ❌ | POST /enrichment/trigger |
| LinkedIn Intelligence | ✅ | ❌ | POST /intelligence/trigger |
| Team Management | ❌ | ❌ | Future scope |
| Billing & Subscriptions | ❌ | ❌ | Future scope |

---

## 9. Screen Inventory

### Currently Built (MVP Frontend)

| Screen | Route | Status |
|--------|-------|--------|
| Login | `/login` | ✅ Live |
| Register | `/register` | ✅ Live |
| Dashboard | `/dashboard` | ✅ Live |
| Leads List | `/leads` | ✅ Live |
| Add New Lead | `/leads/new` | ✅ Live |

### Planned Frontend Screens (Next Sprints)

| Screen | Route | Priority |
|--------|-------|----------|
| Lead Detail Profile | `/leads/[id]` | High |
| CSV Import Wizard | `/leads/import` | High |
| Campaign List | `/campaigns` | High |
| Campaign Builder | `/campaigns/new` | High |
| Campaign Detail | `/campaigns/[id]` | High |
| Sequence List | `/sequences` | High |
| Sequence Builder | `/sequences/new` | High |
| CRM Pipeline (Kanban) | `/crm/pipeline` | Medium |
| Tasks Board | `/crm/tasks` | Medium |
| Notes Timeline | `/crm/notes` | Medium |
| Segments Manager | `/segments` | Medium |
| AI Tools Hub | `/ai` | Medium |
| AI Website Audit | `/ai/audit` | Low |
| AI Subject Optimizer | `/ai/subject` | Low |
| Email Accounts Settings | `/settings/email` | High |
| Team Management | `/settings/team` | Low |
| Prompt Templates | `/settings/prompts` | Low |

---

## 10. MVP Scope

The MVP is defined as the minimum set of features required to deliver end-to-end value to a solo sales rep or a small agency owner.

### MVP Definition of Done

A user must be able to:

1. ✅ **Register** an account and **log in** securely.
2. ✅ **View a Dashboard** with key metrics.
3. ✅ **Add leads manually** and view them in a list.
4. 🔲 **Import leads via CSV** with field mapping.
5. 🔲 **Connect an email account** (SMTP or Gmail).
6. 🔲 **Create an email sequence** (2–3 steps with delays).
7. 🔲 **Create and launch a campaign** targeting a set of leads.
8. 🔲 **Track email opens and replies** in real time.
9. 🔲 **Log notes and assign tasks** against a lead.

> **MVP Target**: Features 1–9 fully functional with a polished, responsive UI.

---

## 11. Future Scope

Features that are architecturally planned but will not be part of the MVP:

| Feature | Rationale for Deferral |
|---------|------------------------|
| **Native CRM Pipeline (Kanban)** | Backend is complete; UI prioritized after core outreach loop. |
| **Team Management & RBAC UI** | Backend role system exists; UI deferred to post-MVP. |
| **AI A/B Testing UI** | API exists; user research needed before UI design. |
| **Billing & Subscriptions (Stripe)** | Revenue feature; added after product-market fit. |
| **White-Labeling** | Enterprise tier feature; complex theming system required. |
| **Salesforce / HubSpot Integration** | Native CRM sync via webhooks or embedded iframes. |
| **Multi-channel Outreach (LinkedIn)** | Regulatory complexity; requires separate compliance work. |
| **Predictive Lead Scoring (ML)** | Requires sufficient historical data accumulation first. |
| **Mobile Application** | Native app deferred; responsive web first. |
| **Admin Panel** | Internal tooling; built post-MVP for operational support. |

---

## 12. Design Principles

### 12.1 Dark-First, Premium Aesthetic
The UI is built on a deep dark background (`#0B0E14`) with glassmorphism cards (translucent, blurred panels). The goal is a tool that looks as powerful as it is. Every screen should feel like a premium SaaS product, not a generic dashboard.

### 12.2 Gradient Hierarchy
Key data points (metrics, scores, statuses) use curated gradient colors to create instant visual hierarchy:
- **Blue** → Volume metrics (Leads, Emails)
- **Green** → Positive performance (Open Rate, high scores, Active status)
- **Orange/Amber** → Engagement metrics (Reply Rate, warnings)
- **Red** → Negative states (errors, unqualified, failed)

### 12.3 Motion as Feedback
Every interactive element provides micro-feedback:
- Cards lift on hover (`transform: translateY(-5px)`)
- Buttons glow on focus
- Skeleton loaders shimmer during data fetching
- Forms transition smoothly between loading states

### 12.4 Content Before Chrome
Navigation and structural chrome are kept minimal. The user's content — their leads, campaigns, and metrics — is always the most prominent element on any screen.

### 12.5 Progressive Disclosure
Complex functionality (AI enrichment, sequence configuration) is revealed progressively — simple by default, powerful when needed. Avoid overwhelming new users with every option on first load.

### 12.6 Accessibility & Responsiveness
All interactive elements have unique, descriptive `id` attributes. Colour is never the only differentiator (status badges have both colour and text labels). Layouts are responsive-first using CSS Grid and Flexbox.

### 12.7 Error States Are First-Class Citizens
Empty states, error alerts, and loading skeletons are designed as carefully as success states. A blank table or failed API call should be graceful, informative, and guide the user toward a next action.

### 12.8 Performance-Conscious Frontend
- No unnecessary re-renders: state is lifted only where needed.
- All heavy API calls are fired inside `useEffect` with proper dependency arrays.
- Images and assets are optimized via Next.js built-in tooling.

---

*Document maintained by the Technical Architect. All proposed changes to scope, personas, or navigation must be reviewed and updated here before implementation begins.*

# IA.md — Injaazh Lead AI: Information Architecture

> **Navigation Blueprint — Design Before Code**  
> Version: 1.0 | Last Updated: July 2026 | Companion to: [PRODUCT.md](./PRODUCT.md)  
> Status: Living Document — Update this file before any navigation-related frontend work begins.

---

## Table of Contents

1. [Layout Model](#1-layout-model)
2. [Global Navigation](#2-global-navigation)
3. [Sidebar Structure](#3-sidebar-structure)
4. [Header](#4-header)
5. [Breadcrumb Rules](#5-breadcrumb-rules)
6. [Search Behavior](#6-search-behavior)
7. [Global Command Palette](#7-global-command-palette)
8. [Notification Center](#8-notification-center)
9. [User Menu](#9-user-menu)
10. [Organization Switcher](#10-organization-switcher)
11. [Screen Hierarchy](#11-screen-hierarchy)
12. [Navigation Rules](#12-navigation-rules)
13. [Empty States](#13-empty-states)
14. [Error States](#14-error-states)

---

## 1. Layout Model

The application uses a **3-zone authenticated layout** consistent across all protected screens.

```
┌────────────────────────────────────────────────────────────┐
│  HEADER (fixed, full-width)                                │
│  [Logo + Org Switcher] ─────── [Search] ─ [⌘K] [🔔] [👤] │
├────────────┬───────────────────────────────────────────────┤
│            │                                               │
│  SIDEBAR   │  MAIN CONTENT AREA                           │
│  (fixed,   │  [Breadcrumb]                                │
│  left,     │  [Page Title + Page Actions]                 │
│  240px)    │  [Page Content]                              │
│            │                                               │
│            │                                               │
│            │                                               │
└────────────┴───────────────────────────────────────────────┘
```

### Zone Responsibilities

| Zone | Width | Behaviour | Responsibility |
|------|-------|-----------|----------------|
| **Header** | 100% | Fixed top, `z-index: 50` | Global context: org, search, notifications, user |
| **Sidebar** | 240px (expanded) / 64px (collapsed) | Fixed left, scrollable | Primary navigation and section identity |
| **Main Content** | Remaining | Scrollable | All page-level content |

### Unauthenticated Layout
For `/login` and `/register`, the sidebar and header are hidden. A centered card layout is used with background glow effects. No navigation chrome is visible.

---

## 2. Global Navigation

### Navigation Philosophy
- **Flat over deep**: Prefer two levels of navigation maximum. Avoid nesting more than 2 levels in the sidebar.
- **Context-persistent**: Navigating between sections never resets in-progress work (forms retain state via local state or draft saving).
- **Role-aware**: Navigation items are filtered based on the authenticated user's role. Members do not see Settings > Team Management.

### Primary Navigation Destinations

| # | Label | Icon | Route | Roles | Badge |
|---|-------|------|-------|-------|-------|
| 1 | Dashboard | `BarChart2` | `/dashboard` | All | — |
| 2 | Leads | `Users` | `/leads` | All | Total count |
| 3 | Campaigns | `Megaphone` | `/campaigns` | All | Active count |
| 4 | Sequences | `GitBranch` | `/sequences` | All | — |
| 5 | CRM | `Kanban` | `/crm/pipeline` | All | — |
| 6 | AI Tools | `Sparkles` | `/ai` | All | — |
| 7 | Segments | `Filter` | `/segments` | Member+ | — |
| 8 | Settings | `Settings` | `/settings` | Owner / Admin | — |

### Secondary (Bottom of Sidebar)

| Label | Icon | Route | Roles |
|-------|------|-------|-------|
| Help & Docs | `HelpCircle` | External link → docs | All |
| What's New | `Zap` | `/changelog` | All |

---

## 3. Sidebar Structure

### Visual Anatomy

```
┌────────────────────────┐
│  [Logo] Injaazh  [< ]  │  ← Collapse toggle
├────────────────────────┤
│                        │
│  📊 Dashboard          │  ← Active state: left accent bar + highlight
│                        │
│  👥 Leads         142  │  ← Badge shows total leads
│     └─ All Leads       │  ← Sub-item (visible when section is active)
│     └─ Import          │
│     └─ Segments        │
│                        │
│  📣 Campaigns       3  │
│     └─ All Campaigns   │
│     └─ New Campaign    │
│                        │
│  🔀 Sequences          │
│     └─ All Sequences   │
│     └─ New Sequence    │
│                        │
│  ◧  CRM                │
│     └─ Pipeline        │
│     └─ Tasks           │
│     └─ Notes           │
│                        │
│  ✨ AI Tools           │
│     └─ Website Audit   │
│     └─ Follow-up Gen   │
│     └─ Subject Lines   │
│                        │
│  ░░░░░░░░░░░░░░░░░░░░  │  ← Divider
│                        │
│  ⚙  Settings          │  ← Owner / Admin only
│     └─ Email Accounts  │
│     └─ Team Members    │
│     └─ Prompt Templ.   │
│     └─ Billing         │
│                        │
├────────────────────────┤
│  ❓ Help & Docs        │  ← Fixed footer
│  ⚡ What's New         │
└────────────────────────┘
```

### Sidebar States

| State | Description | Behaviour |
|-------|-------------|-----------|
| **Expanded** | Default — 240px wide, shows labels and icons | All items fully visible |
| **Collapsed** | 64px wide, icons only | Hovering shows tooltip with label |
| **Active Section** | Current top-level item is highlighted | Left border accent (indigo gradient), bold label, sub-items expanded |
| **Hover** | Mouse over any item | Background highlight, cursor pointer |

### Sub-item Expansion Rules
- Sub-items are only shown when the parent section is the **active route**.
- Sub-items do **not** auto-expand on hover — only on active.
- On mobile, the entire sidebar becomes a bottom sheet drawer.

### Sidebar Persistence
- Collapsed/expanded state is saved to `localStorage` key `sidebar_expanded`.
- It is restored on next page load.

---

## 4. Header

### Header Anatomy

```
┌──────────────────────────────────────────────────────────────────────────┐
│  [🔷 Logo]  [Injaazh]  [▾ Acme Corp ▾]    [🔍 Search...]  [⌘K]  [🔔2]  [👤▾] │
└──────────────────────────────────────────────────────────────────────────┘
  ↑ Left Zone               ↑ Center Zone            ↑ Right Zone
```

### Left Zone
- **Product Logo**: Clickable → navigates to `/dashboard`
- **Product Name**: "Injaazh Lead AI" (hidden on mobile)
- **Organization Switcher**: Shows current org name with dropdown caret → see Section 10

### Center Zone
- **Global Search Bar**: Placeholder: `Search leads, campaigns, contacts...`
  - Click or `Ctrl+K` / `Cmd+K` → opens Global Command Palette (Section 7)
  - Width: fluid, max-width 480px

### Right Zone (left to right)
1. **⌘K Button**: Keyboard shortcut hint that opens Command Palette
2. **🔔 Notification Bell**: Unread count badge (max "99+") → opens Notification Center drawer (Section 8)
3. **👤 User Avatar + Caret**: Opens User Menu dropdown (Section 9)

### Header Behaviour
- **Fixed**: Header stays visible on scroll, `position: fixed`, `top: 0`, full width.
- **Z-index**: 50 (above sidebar, above page content).
- **Height**: 60px.
- **Background**: Dark translucent with `backdrop-filter: blur(12px)` — slightly frosted.
- **Bottom border**: 1px solid `rgba(255,255,255,0.05)`.

---

## 5. Breadcrumb Rules

### Purpose
Breadcrumbs communicate the user's location within the hierarchy and provide a fast path back to any parent context.

### Placement
- Below the header, inside the main content area.
- Appears on all screens deeper than Level 1 (i.e., not on `/dashboard`, `/leads`, `/campaigns` themselves).
- Does **not** appear on auth screens (`/login`, `/register`).

### Format

```
[Section Label]  /  [Sub-section or Entity Name]  /  [Current View]
```

### Examples

| Current Screen | Breadcrumb |
|----------------|------------|
| `/leads` | *No breadcrumb (root of section)* |
| `/leads/new` | Leads / Add New Lead |
| `/leads/[id]` | Leads / John Doe |
| `/leads/[id]/edit` | Leads / John Doe / Edit |
| `/campaigns/new` | Campaigns / New Campaign |
| `/campaigns/[id]` | Campaigns / Summer Outreach 2026 |
| `/crm/tasks` | CRM / Tasks |
| `/settings/team` | Settings / Team Members |
| `/ai/audit` | AI Tools / Website Audit |

### Rules

1. **Every segment is a link** except the last (current page), which is plain text.
2. The **root segment** (e.g., "Leads") always links back to the section root.
3. **Entity names** (e.g., lead first name, campaign name) are used — never raw IDs.
4. If an entity name is longer than 32 characters, truncate with `…`.
5. Breadcrumbs use `aria-label="Breadcrumb"` and `aria-current="page"` on the last item for accessibility.
6. On **mobile** (< 768px), only the immediate parent is shown: `← Leads`.

---

## 6. Search Behavior

### Scope
Global search operates across all resources within the user's **current organization**. No cross-tenant results are ever returned.

### Searchable Entities

| Entity | Fields Searched | Result Preview |
|--------|----------------|----------------|
| **Leads** | First Name, Last Name, Email, Company, Tags | Name + Email + Status badge |
| **Campaigns** | Name | Name + Status badge |
| **Sequences** | Name | Name + Step count |
| **Tasks** | Title | Title + Due Date + Assignee |
| **Notes** | Content (full-text) | Truncated note + Lead name |
| **Segments** | Name | Name + Filter summary |

### Search UX Flow

```
User types in header search bar
        ↓
[Debounce: 300ms]
        ↓
API call to GET /search?q={query}&orgId={orgId}
        ↓
Results rendered in floating dropdown panel below search bar
        ↓
Results grouped by entity type
        ↓
User clicks result → navigates to entity detail page
        ↓
Search panel closes, query cleared
```

### Result Panel Structure

```
┌──────────────────────────────────────────┐
│  🔍 "john doe"                      [×]  │
├──────────────────────────────────────────┤
│  LEADS                                   │
│  👤 John Doe · john@acme.com · New       │
│  👤 John Smith · jsmith@b2b.io · Active  │
├──────────────────────────────────────────┤
│  CAMPAIGNS                               │
│  📣 John Doe Outreach 2026               │
├──────────────────────────────────────────┤
│  Show all 5 results →                    │
└──────────────────────────────────────────┘
```

### Rules
1. Minimum query length: **2 characters**.
2. Maximum results per entity type: **3** (with "Show all" link to a full results page).
3. Empty query: Show **Recent Activity** (last 5 visited entities).
4. No results: Show "No results for `{query}`" + suggestion to add a new lead.
5. Results panel closes on: `Escape`, click outside, or selecting a result.
6. Results are scoped to the currently selected organization.

---

## 7. Global Command Palette

### Trigger
- Keyboard: `Ctrl+K` (Windows) / `Cmd+K` (Mac)
- Mouse: Click the `⌘K` icon in the header

### Purpose
Power-user shortcut for navigation, actions, and search — without leaving the keyboard.

### Visual Layout

```
┌──────────────────────────────────────────────────────────┐
│  🔍  Type a command or search...                         │
├──────────────────────────────────────────────────────────┤
│  NAVIGATE TO                                             │
│  📊  Dashboard                            ↵ Enter       │
│  👥  Leads                                               │
│  📣  Campaigns                                           │
├──────────────────────────────────────────────────────────┤
│  QUICK ACTIONS                                           │
│  ➕  Add New Lead                                        │
│  ➕  Create Campaign                                     │
│  ➕  New Sequence                                        │
│  ➕  Add Task                                            │
├──────────────────────────────────────────────────────────┤
│  AI TOOLS                                                │
│  ✨  Run Website Audit                                   │
│  ✨  Generate Follow-up                                  │
│  ✨  Optimize Subject Line                               │
├──────────────────────────────────────────────────────────┤
│  RECENT                                                  │
│  👤  John Doe · Lead                                     │
│  📣  Summer Campaign · Campaign                         │
└──────────────────────────────────────────────────────────┘
```

### Behaviour Rules
1. Opens as a **modal overlay** (centered, max-width 640px, `backdrop: blur + dark overlay`).
2. Input is **auto-focused** when opened.
3. Items are navigable with **arrow keys** (`↑` `↓`), selected with `Enter`.
4. Typing **filters** all categories in real time (debounce 150ms).
5. Pressing `Escape` closes the palette.
6. Categories without matching items are **hidden** (not shown as empty groups).
7. Keyboard shortcut hint shown in header and palette.

### Categories
| Category | Item Types |
|----------|-----------|
| **Navigate To** | Top-level pages and sub-pages |
| **Quick Actions** | Create/Add shortcuts for all entities |
| **AI Tools** | Launchers for AI feature screens |
| **Recent** | Last 5 viewed entities (stored in `localStorage`) |
| **Search Results** | Live entity search when query matches entity data |

---

## 8. Notification Center

### Trigger
- Click the bell icon `🔔` in the header right zone.
- Opens as a **right-side drawer** (slide-in from right, 380px wide) without navigating away.

### Notification Types

| Type | Icon | Trigger | Priority |
|------|------|---------|----------|
| **Task Reminder** | 🗓️ | 1 hour before task due date (email + in-app) | High |
| **Campaign Launched** | 🚀 | Campaign successfully started | Medium |
| **Campaign Completed** | ✅ | Campaign finished sending | Medium |
| **Campaign Error** | ❌ | Campaign delivery failure | High |
| **Lead Reply Detected** | 💬 | Incoming reply from a lead | High |
| **CSV Import Complete** | 📥 | Bulk import finished | Medium |
| **AI Enrichment Done** | ✨ | Website/LinkedIn enrichment complete for a lead | Low |
| **New Team Member** | 👋 | Someone joined the organization (Admin/Owner only) | Low |

### Notification Item Anatomy

```
┌────────────────────────────────────────┐
│  🗓️  Task Reminder                [×]  │
│  "Call John Doe" is due in 1 hour      │
│  Assigned to: You                      │
│  [View Task]          2m ago           │
└────────────────────────────────────────┘
```

### Drawer Structure

```
┌──────────────────────────────────────────┐
│  Notifications                 [Mark All Read] │
├──────────────────────────────────────────┤
│  TODAY                                   │
│  [Notification Item - unread]            │
│  [Notification Item - unread]            │
├──────────────────────────────────────────┤
│  EARLIER                                 │
│  [Notification Item - read]              │
│  [Notification Item - read]              │
├──────────────────────────────────────────┤
│  [Load More]                             │
└──────────────────────────────────────────┘
```

### Rules
1. **Unread count** shown as a badge on the bell icon (max "99+").
2. Unread items have a **left accent bar** and slightly elevated background.
3. Clicking a notification marks it **read** and navigates to the relevant entity.
4. "Mark All Read" clears the badge without navigating.
5. Notifications are scoped to the **current organization**.
6. Maximum of **50 notifications** loaded per session; older ones paginated.
7. In-app notifications are stored in the database; email notifications use `EmailDispatchService`.

---

## 9. User Menu

### Trigger
- Click the user avatar or name in the header right zone.
- Opens as a **dropdown** aligned to the right edge of the header.

### Menu Structure

```
┌─────────────────────────────────┐
│  [Avatar]  Alex Johnson         │
│            alex@company.com     │
│            Owner · Acme Corp    │
├─────────────────────────────────┤
│  👤  My Profile                 │
│  🔔  Notification Preferences  │
│  🎨  Appearance (Dark/Light)    │
├─────────────────────────────────┤
│  ⚙  Organization Settings       │  ← Owner / Admin only
│  💳  Billing & Plans            │  ← Owner only
├─────────────────────────────────┤
│  📚  Help & Documentation       │
│  💬  Contact Support            │
│  🐛  Report a Bug               │
├─────────────────────────────────┤
│  🚪  Sign Out                   │
└─────────────────────────────────┘
```

### Rules
1. User's **avatar**, **full name**, **email**, **role**, and **organization name** displayed in the header section — read-only.
2. **Role-gated items** are hidden (not disabled) for unauthorized roles.
3. "Sign Out" calls `AuthContext.logout()` — clears token, redirects to `/login`.
4. "Appearance" is a toggle (Dark / Light) — preference stored in `localStorage`.
5. Dropdown closes on: `Escape`, click outside, or menu item selection.

---

## 10. Organization Switcher

### Purpose
Allows users who belong to multiple organizations (e.g., agency owners managing client workspaces) to switch contexts without logging out.

### Trigger
- Click the organization name/chevron in the **header left zone**.

### Switcher Dropdown Structure

```
┌────────────────────────────────────┐
│  CURRENT WORKSPACE                 │
│  ✓  Acme Corp                (Owner)│
├────────────────────────────────────┤
│  SWITCH TO                         │
│     Beta Startup         (Member)  │
│     Client Agency XYZ    (Admin)   │
├────────────────────────────────────┤
│  ➕  Create New Organization       │
│  🔗  Join with Invite Code         │
└────────────────────────────────────┘
```

### Rules
1. The **currently active** organization is marked with a checkmark and cannot be re-selected.
2. Switching organizations **reloads the application context** — all data, navigation, and state is scoped to the new org.
3. The selected organization is stored in the JWT payload (`organizationId`); switching updates the active token.
4. "Create New Organization" navigates to `/onboarding/new-org`.
5. "Join with Invite Code" opens a modal to enter a team invite token.
6. If a user belongs to only **one** organization, the switcher is still shown but the "Switch To" section is empty.
7. Organization names longer than 24 characters are truncated with `…`.

---

## 11. Screen Hierarchy

### Level 0 — Unauthenticated
```
/                     → Redirects to /login (if unauthenticated) or /dashboard (if authenticated)
/login                → Login screen (no nav chrome)
/register             → Register screen (no nav chrome)
/forgot-password      → Password reset request (no nav chrome)
/reset-password       → New password entry (no nav chrome)
```

### Level 1 — Root Sections (Sidebar Top-Level)
```
/dashboard            → Analytics Overview
/leads                → Lead List
/campaigns            → Campaign List
/sequences            → Sequence List
/crm                  → CRM Hub (redirects to /crm/pipeline)
/ai                   → AI Tools Hub
/segments             → Segments Manager
/settings             → Settings Hub (redirects to /settings/profile)
```

### Level 2 — Section Sub-pages
```
/leads/new            → Add Lead Form
/leads/import         → CSV Import Wizard
/campaigns/new        → Campaign Builder
/sequences/new        → Sequence Builder
/crm/pipeline         → Kanban Pipeline
/crm/tasks            → Task List
/crm/notes            → Notes Timeline
/ai/audit             → AI Website Audit Tool
/ai/followup          → AI Follow-up Generator
/ai/subject           → AI Subject Line Optimizer
/ai/scoring           → AI Lead Scoring Tool
/settings/profile     → My Profile
/settings/email       → Connected Email Accounts
/settings/team        → Team Members
/settings/prompts     → Prompt Templates
/settings/billing     → Billing & Subscription
```

### Level 3 — Entity Detail Pages
```
/leads/[id]           → Lead Detail & Profile
/leads/[id]/edit      → Edit Lead
/campaigns/[id]       → Campaign Detail & Analytics
/campaigns/[id]/edit  → Edit Campaign
/sequences/[id]       → Sequence Detail
/sequences/[id]/edit  → Edit Sequence
/crm/pipeline/[id]    → Deal Detail
/crm/tasks/[id]       → Task Detail
```

### Level 4 — Nested Actions (Modal or Inline)
These do **not** have their own routes — they appear as modals or inline panels within Level 3 screens.
```
Lead Profile  → [AI Enrich]  (modal / panel)
Lead Profile  → [Add Note]   (inline form at top of timeline)
Lead Profile  → [Add Task]   (modal)
Campaign      → [A/B Test]   (tabbed panel within campaign detail)
Campaign      → [Pause]      (confirmation modal)
```

---

## 12. Navigation Rules

### Rule 1 — Authentication Guard
All routes at Level 1 and deeper are protected. If no valid JWT is found in `localStorage`, the user is redirected to `/login`. After login, the user is returned to the originally requested URL.

### Rule 2 — Role Guard
Role-restricted pages (e.g., `/settings/team`, `/settings/billing`) render a `403 - Access Denied` error state if accessed by an unauthorized role. They are not shown in the sidebar for those roles.

### Rule 3 — Default Redirects
| Route | Redirects To | Condition |
|-------|-------------|-----------|
| `/` | `/dashboard` | Authenticated |
| `/` | `/login` | Unauthenticated |
| `/crm` | `/crm/pipeline` | Always |
| `/settings` | `/settings/profile` | Always |
| `/ai` | `/ai/audit` | Always |

### Rule 4 — Back Navigation
- After completing a **creation form** (e.g., `/leads/new`), redirect to the parent list (`/leads`).
- After **deleting** an entity, redirect to the parent list.
- **Cancel buttons** always navigate `router.back()` or to the explicit parent route.

### Rule 5 — Active State
- The sidebar highlights the **deepest matching** route segment.
- `/leads/new` → "Leads" section is highlighted, "Add Lead" sub-item active.
- `/campaigns/abc123` → "Campaigns" section highlighted.
- Settings sub-pages → "Settings" section highlighted + correct sub-item.

### Rule 6 — External Links
- All external links (docs, support, LinkedIn) open in a **new tab** (`target="_blank"` + `rel="noopener noreferrer"`).
- External links are visually distinguished with an external link icon `↗`.

### Rule 7 — Link Accessibility
- All navigation links are standard `<a>` or Next.js `<Link>` elements — never `<div onClick>`.
- Keyboard navigation must work throughout all nav components.

### Rule 8 — No Orphan Pages
Every screen must be reachable from at least one navigation path. No page exists without:
  a) A sidebar link, OR
  b) A contextual action button (e.g., "View Campaign" CTA), OR
  c) A breadcrumb parent link.

### Rule 9 — URL as Source of Truth
- Shareable URLs are first-class. Any authenticated user in the org with the correct role can visit a direct URL and see the correct content.
- IDs in URLs are always MongoDB ObjectIds — no slugs (for simplicity).

---

## 13. Empty States

Empty states appear when a section exists but contains no data yet. Every empty state must include:
1. A descriptive **illustration or icon** (not just a generic spinner)
2. A clear **headline** explaining what is missing
3. A helpful **description** (1–2 sentences max)
4. A **primary CTA** that takes the user to the action to resolve the emptiness

### Empty State Definitions

---

#### 13.1 Leads — No Leads Yet

```
  [Icon: Users / Person silhouette]

  "Your lead list is empty"

  "Import leads from a CSV file or add them manually
   to start building your outreach pipeline."

  [+ Import Leads]  [+ Add Manually]
```

---

#### 13.2 Campaigns — No Campaigns Yet

```
  [Icon: Megaphone]

  "No campaigns yet"

  "Create your first campaign to start sending
   personalized outreach to your leads at scale."

  [+ Create Campaign]
```

---

#### 13.3 Sequences — No Sequences Yet

```
  [Icon: GitBranch / Workflow]

  "No email sequences defined"

  "Build a multi-step email sequence to automate
   follow-ups after your initial outreach."

  [+ Build Sequence]
```

---

#### 13.4 CRM Pipeline — No Deals

```
  [Icon: Kanban columns]

  "Your pipeline is clear"

  "Deals created from your leads will appear here.
   Drag them through stages as opportunities progress."

  [+ Add Deal]
```

---

#### 13.5 Tasks — No Tasks

```
  [Icon: Checkbox]

  "Nothing on your task list"

  "You're all caught up! Create tasks to track
   calls, emails, and follow-ups with your leads."

  [+ Add Task]
```

---

#### 13.6 Notes — No Notes

```
  [Icon: FileText]

  "No notes yet for this lead"

  "Log a call outcome, meeting note, or any
   observation to build a history of this relationship."

  [+ Add Note]
```

---

#### 13.7 Notifications — None

```
  [Icon: Bell with sparkle]

  "You're all caught up"

  "We'll notify you when campaigns complete,
   leads reply, or tasks are due."
```

---

#### 13.8 Search — No Results

```
  [Icon: Search / Magnifier]

  "No results for "{query}""

  "Try a different search term, or check your
   spelling. You can also add a new lead directly."

  [+ Add Lead named "{query}"]
```

---

#### 13.9 Segments — No Segments

```
  [Icon: Filter]

  "No segments defined"

  "Segments let you group leads by criteria like tags,
   score, or status to target campaigns precisely."

  [+ Create Segment]
```

---

## 14. Error States

Error states handle failures gracefully. Every error state must include:
1. The **error type** (communicated via label, not raw HTTP code)
2. A **clear, non-technical description** of what happened
3. A **primary recovery action**
4. A **secondary action** (e.g., go back, contact support)

### Error State Categories

---

#### 14.1 Network / API Error (500 / Fetch Failure)

```
  [Icon: Cloud with lightning bolt]

  "Something went wrong"

  "We couldn't connect to our servers. This is
   usually temporary. Please try again in a moment."

  [↻ Retry]  [← Go Back]
```
**When shown**: API call returns 5xx, or `fetch()` throws a network error.
**Auto-retry**: If the action is idempotent (GET), retry automatically after 3 seconds with a visible countdown.

---

#### 14.2 Not Found (404)

```
  [Icon: Map with broken pin]

  "This page doesn't exist"

  "The link you followed may be broken, or the
   resource may have been deleted."

  [← Back to Dashboard]
```
**When shown**: Route does not exist, or entity ID was deleted.

---

#### 14.3 Access Denied (403)

```
  [Icon: Lock]

  "Access Denied"

  "You don't have permission to view this page.
   Contact your organization's admin if this is a mistake."

  [← Go Back]  [Contact Admin]
```
**When shown**: User's role does not have permission for the route.

---

#### 14.4 Unauthorized / Session Expired (401)

```
  [Icon: Timer / Expired badge]

  "Your session has expired"

  "For your security, you've been logged out after
   a period of inactivity. Please sign in to continue."

  [→ Sign In Again]
```
**When shown**: JWT returns 401 or has expired. Handled globally in `apiFetch` utility — user is auto-redirected to `/login`.

---

#### 14.5 Form Validation Error

```
  [Inline, below affected field]
  "This field is required."
  "Please enter a valid email address."
  "Password must be at least 8 characters."
```
**When shown**: Form submission with invalid fields.
**Display**: Red border on the affected input + small error text below. No page-level banner for field errors.

---

#### 14.6 Submission / Creation Error (API returns 4xx)

```
  [Banner at top of form]

  ❌  "Could not create lead"
      "A lead with this email address already exists in your workspace."

  [Retry]
```
**When shown**: API returns a `4xx` error during a form submission.
**Display**: Animated banner at the top of the form (not a toast), stays visible until the user edits the input.

---

#### 14.7 Import Error (CSV)

```
  [Page-level panel]

  "Import partially failed"

  "12 of 150 leads could not be imported due to
   invalid email addresses. Download the error log to
   see which rows were skipped."

  [Download Error Log]  [View Imported Leads]
```
**When shown**: Bulk CSV import completes with some row failures.

---

#### 14.8 Campaign Launch Error

```
  [Banner on Campaign Detail screen]

  ❌  "Campaign could not be launched"
      "No email account is connected to your workspace.
       Please connect an email account in Settings first."

  [→ Connect Email Account]
```
**When shown**: Attempting to launch a campaign without a connected mail account or required fields missing.

---

#### 14.9 AI Tool Error (Gemini API failure)

```
  [Inline on AI Tool screen]

  ✨  "AI generation failed"
      "We couldn't reach our AI service. Check your API key
       in Settings or try again in a moment."

  [↻ Retry]  [→ Settings]
```
**When shown**: Gemini API returns an error or times out.

---

*All navigation decisions, component placement, and route additions must be reflected in this document before implementation begins. Treat IA.md as a contract between design and engineering.*

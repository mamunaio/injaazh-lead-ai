# SCREENS.md — Injaazh Lead AI: Complete Screen Map

> **Every Screen. Every State. Every Layout.**  
> Version: 1.0 | Last Updated: July 2026  
> Companion documents: [PRODUCT.md](./PRODUCT.md) | [IA.md](./IA.md) | [USER_FLOW.md](./USER_FLOW.md)  
> Status: Living Document — Add a new entry here before building any new screen.

---

## Document Conventions

- **Route**: The Next.js App Router path.
- **Auth**: Whether the screen requires authentication.
- **Role**: Minimum role required to access the screen.
- **Status**: `MVP` = built or planned for MVP. `FUTURE` = post-MVP roadmap.

---

## Screen Index

### Auth Group
- [S-01 Login](#s-01-login)
- [S-02 Register](#s-02-register)
- [S-03 Forgot Password](#s-03-forgot-password-future) *(FUTURE)*
- [S-04 Reset Password](#s-04-reset-password-future) *(FUTURE)*

### Dashboard Group
- [S-05 Dashboard](#s-05-dashboard)

### Leads Group
- [S-06 Lead List](#s-06-lead-list)
- [S-07 Add New Lead](#s-07-add-new-lead)
- [S-08 Lead Detail & Profile](#s-08-lead-detail--profile-future) *(FUTURE)*
- [S-09 Edit Lead](#s-09-edit-lead-future) *(FUTURE)*
- [S-10 CSV Import Wizard](#s-10-csv-import-wizard-future) *(FUTURE)*

### Campaigns Group
- [S-11 Campaign List](#s-11-campaign-list-future) *(FUTURE)*
- [S-12 Campaign Builder](#s-12-campaign-builder-future) *(FUTURE)*
- [S-13 Campaign Detail](#s-13-campaign-detail-future) *(FUTURE)*

### Sequences Group
- [S-14 Sequence List](#s-14-sequence-list-future) *(FUTURE)*
- [S-15 Sequence Builder](#s-15-sequence-builder-future) *(FUTURE)*
- [S-16 Sequence Detail](#s-16-sequence-detail-future) *(FUTURE)*

### CRM Group
- [S-17 CRM Pipeline (Kanban)](#s-17-crm-pipeline-kanban-future) *(FUTURE)*
- [S-18 Task List](#s-18-task-list-future) *(FUTURE)*
- [S-19 Task Detail](#s-19-task-detail-future) *(FUTURE)*
- [S-20 Notes Timeline](#s-20-notes-timeline-future) *(FUTURE)*

### Segments Group
- [S-21 Segment List](#s-21-segment-list-future) *(FUTURE)*
- [S-22 Segment Builder](#s-22-segment-builder-future) *(FUTURE)*

### AI Tools Group
- [S-23 AI Tools Hub](#s-23-ai-tools-hub-future) *(FUTURE)*
- [S-24 Website Audit Tool](#s-24-website-audit-tool-future) *(FUTURE)*
- [S-25 Follow-up Generator](#s-25-follow-up-generator-future) *(FUTURE)*
- [S-26 Subject Line Optimizer](#s-26-subject-line-optimizer-future) *(FUTURE)*

### Settings Group
- [S-27 Profile Settings](#s-27-profile-settings-future) *(FUTURE)*
- [S-28 Email Accounts](#s-28-email-accounts-future) *(FUTURE)*
- [S-29 Team Management](#s-29-team-management-future) *(FUTURE)*
- [S-30 Prompt Templates](#s-30-prompt-templates-future) *(FUTURE)*
- [S-31 Billing & Plans](#s-31-billing--plans-future) *(FUTURE)*

### System Screens
- [S-32 404 Not Found](#s-32-404-not-found)
- [S-33 403 Access Denied](#s-33-403-access-denied)
- [S-34 500 Server Error](#s-34-500-server-error)

---

---

# AUTH GROUP

---

## S-01: Login

| Property | Value |
|----------|-------|
| **Route** | `/login` |
| **Auth Required** | No |
| **Role** | Public |
| **Status** | MVP ✅ |

### Purpose
Allow returning users to authenticate and access their workspace. Redirects authenticated visitors to `/dashboard` automatically.

### Primary Actions
- Submit login form (email + password)
- Navigate to `/register`

### Secondary Actions
- Navigate to `/forgot-password` (FUTURE)
- Navigate back (browser back)

### Components
- Product logo + name (centered, top)
- Background glow blob (decorative)
- Glass-styled login card containing:
  - Page heading: "Welcome Back"
  - Subheading: "Sign in to Injaazh Lead AI"
  - Email input field (`id="email"`, type `email`)
  - Password input field (`id="password"`, type `password`)
  - Error alert banner (conditional — only shown on auth failure)
  - Submit button: "Sign In" / "Signing In..." (loading state)
  - Footer link: "Don't have an account? Register"

### Permissions
- Accessible by everyone (unauthenticated).
- If user is already authenticated, redirect to `/dashboard` immediately.

### Empty State
N/A — Form is the default state.

### Loading State
- Submit button text changes to "Signing In..."
- Submit button is disabled (no double-submit).
- Input fields are disabled during submission.

### Error State
- **Wrong credentials (401)**: Error alert banner appears inside the card: "Invalid email or password. Please try again."
- **Network failure**: Banner: "Could not connect. Check your internet connection." with [Retry] button.
- **Server error (5xx)**: Banner: "Something went wrong. Please try again."
- **Field validation**: Inline below relevant input: "Please enter a valid email address." / "Password is required."

### Desktop Layout (≥ 1024px)
```
Full-screen centered layout.
Background: Deep dark (#0B0E14) with two large radial glow blobs (indigo + purple).
Center: Single glass card, width 420px, border-radius 16px.
Card is vertically centered on screen.
```

### Tablet Layout (768px – 1023px)
```
Same as desktop.
Card width: 380px.
```

### Mobile Layout (< 768px)
```
Card fills the screen with generous padding (16px sides).
No glow blobs (performance).
Card takes up 90% of screen width.
```

---

## S-02: Register

| Property | Value |
|----------|-------|
| **Route** | `/register` |
| **Auth Required** | No |
| **Role** | Public |
| **Status** | MVP ✅ |

### Purpose
Allow new users to create an account and organization simultaneously. Logs the user in immediately upon successful registration.

### Primary Actions
- Submit registration form
- Navigate to `/login`

### Secondary Actions
- Browser back

### Components
- Background glow blob (decorative)
- Glass-styled card containing:
  - Page heading: "Get Started"
  - Subheading: "Create your Injaazh Lead AI account"
  - First Name + Last Name inputs (side by side in a row)
  - Email input
  - Company Name input
  - Password input (min 8 characters, `minLength` attribute)
  - Error alert banner (conditional)
  - Submit button: "Create Account" / "Creating Account..."
  - Footer link: "Already have an account? Sign In"

### Permissions
- Accessible by everyone (unauthenticated).
- Authenticated users are redirected to `/dashboard`.

### Empty State
N/A — Form is the default state.

### Loading State
- Submit button: "Creating Account..." + disabled.
- All inputs disabled during API call.

### Error State
- **Duplicate email (409)**: Banner: "An account with this email already exists. Sign in instead?"
- **Validation errors**: Inline per field (required, email format, password length).
- **Network failure**: Banner with [Retry].
- **Server error**: Banner with [Retry].

### Desktop Layout (≥ 1024px)
```
Full-screen centered layout.
Card width: 480px (wider than login to accommodate two-column name row).
Background glows same as login.
```

### Tablet Layout (768px – 1023px)
```
Card width: 440px.
Two-column name row maintained.
```

### Mobile Layout (< 768px)
```
Card: 90% width.
Two-column name row stacks vertically (each field full width).
```

---

## S-03: Forgot Password *(FUTURE)*

| Property | Value |
|----------|-------|
| **Route** | `/forgot-password` |
| **Auth Required** | No |
| **Role** | Public |
| **Status** | FUTURE |

### Purpose
Allow users who forgot their password to request a reset link via email.

### Primary Actions
- Submit email address for reset link

### Secondary Actions
- Navigate back to `/login`

### Components
- Glass card with email input and submit button
- Success state: "Check your inbox. If that email exists, we sent a reset link."

### Loading State
- Button: "Sending..." + disabled

### Error State
- Network/server errors with [Retry]

### Desktop / Tablet / Mobile Layout
Same pattern as S-01 Login. Card width: 400px.

---

## S-04: Reset Password *(FUTURE)*

| Property | Value |
|----------|-------|
| **Route** | `/reset-password?token={token}` |
| **Auth Required** | No |
| **Role** | Public |
| **Status** | FUTURE |

### Purpose
Allow users to set a new password after clicking the reset link in their email.

### Primary Actions
- Submit new password

### Components
- Glass card with New Password + Confirm Password inputs
- Token validated on page load

### Error State
- **Expired/invalid token**: "This reset link has expired. Request a new one." + [Request New Link]
- **Password mismatch**: Inline: "Passwords do not match."

### Desktop / Tablet / Mobile Layout
Same pattern as S-01 Login.

---

---

# DASHBOARD GROUP

---

## S-05: Dashboard

| Property | Value |
|----------|-------|
| **Route** | `/dashboard` |
| **Auth Required** | Yes |
| **Role** | All roles |
| **Status** | MVP ✅ |

### Purpose
Provide an at-a-glance overview of the organization's lead generation performance. The home screen after login.

### Primary Actions
- Navigate to Leads (`/leads`) via "Manage Leads" button
- Navigate via sidebar to any module

### Secondary Actions
- Click a campaign row → Campaign Detail (FUTURE)
- Logout via User Menu
- Switch organization via Org Switcher

### Components
- Authenticated shell: Header + Sidebar + Main Content Area
- Background glow blobs (2×)
- Page title: "Analytics Overview" (gradient typography)
- User info area: Email address + "Sign Out" button + "Manage Leads" link
- **Metric Cards Grid** (4 cards, responsive CSS Grid):
  - Card 1: "Total Leads" — value in blue gradient
  - Card 2: "Emails Sent" — value in purple gradient
  - Card 3: "Open Rate" — value in green gradient + "%" suffix
  - Card 4: "Reply Rate" — value in orange gradient + "%" suffix
  - Each card: hover lift animation, subtle top-edge highlight line
- **Section Title**: "Campaign Performance"
- **Campaigns Table** (glass panel):
  - Header row: Campaign Name | Status | Total Leads | Active Leads
  - Data rows with hover highlight
  - Status badge (color-coded: Active/green, Paused/amber, Draft/grey, Completed/blue)

### Permissions
- All authenticated users see this screen.
- Data is scoped to `organizationId` from JWT.

### Empty State
**Metric cards**: All show "0" values — this is valid, not an error.
**Campaigns table**:
```
Icon: Megaphone illustration
Heading: "No campaigns yet"
Body: "Your campaign performance will appear here once
      you create and launch your first campaign."
CTA: [+ Create Campaign] → /campaigns/new
```

### Loading State
- Each metric card shows a shimmer skeleton in place of the value:
  - Skeleton title: 60% width, height 16px
  - Skeleton value: 80% width, height 40px
- Campaign table rows: 3 skeleton rows, each column a shimmer block.
- Skeleton animation: horizontal shimmer sweep (200% background gradient, animated).

### Error State
**Metric cards fail to load**:
```
Each card shows: "—" value
Small text below: "Could not load data."
[Retry] link at bottom of metrics section.
```
**Campaign table fails to load**:
```
Panel shows: Cloud icon + "Could not load campaigns."
[↻ Retry] button — re-fires GET /analytics/campaigns
```

### Desktop Layout (≥ 1024px)
```
Header: 60px fixed top
Sidebar: 240px fixed left
Main content: padding 2rem 5%, max-width 1200px centered

Metric cards: 4 columns (grid-template-columns: repeat(4, 1fr))
Campaign table: Full width
```

### Tablet Layout (768px – 1023px)
```
Sidebar: collapsed to 64px (icon-only)
Metric cards: 2 columns
Campaign table: All columns visible but tighter
```

### Mobile Layout (< 768px)
```
Sidebar: Hidden, replaced by bottom navigation drawer or hamburger menu
Metric cards: 2 columns (2×2 grid)
Campaign table: Simplified — shows Name + Status only (other columns hidden)
```

---

---

# LEADS GROUP

---

## S-06: Lead List

| Property | Value |
|----------|-------|
| **Route** | `/leads` |
| **Auth Required** | Yes |
| **Role** | All roles |
| **Status** | MVP ✅ |

### Purpose
Display all leads in the organization in a searchable, filterable table. Central hub for lead management.

### Primary Actions
- Navigate to Add New Lead (`/leads/new`)
- Navigate to Lead Detail (`/leads/:id`) [FUTURE]

### Secondary Actions
- Filter leads by status / tags / score (FUTURE)
- Search leads by name/email (FUTURE — currently via Command Palette)
- Trigger bulk actions: enrich, tag, delete (FUTURE)
- Navigate to CSV Import (`/leads/import`) [FUTURE]
- Navigate back to Dashboard

### Components
- Authenticated shell
- Background glow blobs (2×)
- Page title: "Leads Management" (gradient)
- Header action bar:
  - Left: Page title
  - Right: [Dashboard] secondary button + [+ Add Lead] primary button
- **Leads Data Table** (glass panel):
  - Column headers: Name | Company | Title | Status | Score
  - **Name column**: Two-line cell — Full Name (bold) + Email (muted, smaller)
  - **Status column**: Color-coded badge (New/green, Contacted/blue, Qualified/amber, Lost/red, Won/purple)
  - **Score column**: Circular badge — gradient fill based on score range:
    - 80–100: Green gradient
    - 50–79: Amber/orange gradient
    - 0–49: Red gradient
    - No score: Neutral grey "–"
  - Row hover: subtle background lightening
  - Entire row is clickable → Lead Detail (FUTURE)

### Permissions
- All roles can view leads.
- Members can create leads.
- Only Owner/Admin can delete leads (delete action hidden for Member role).

### Empty State
```
Icon: Users / person silhouette illustration
Heading: "Your lead list is empty"
Body: "Import leads from a CSV file or add them manually
      to start building your outreach pipeline."
CTAs: [+ Import Leads] (primary) | [+ Add Manually] (secondary)
```

### Loading State
- 5 skeleton table rows.
- Name column: Two-line skeleton (60% width + 80% width stacked).
- Company, Title columns: Single-line skeleton (70% width).
- Status column: Pill-shaped skeleton (80px wide × 24px high, border-radius 999px).
- Score column: Circular skeleton (32px × 32px).
- All shimmer-animated.

### Error State
```
Table panel shows:
Icon: Cloud with lightning bolt
Heading: "Could not load leads"
Body: "There was a problem fetching your leads."
CTA: [↻ Retry]
```

### Desktop Layout (≥ 1024px)
```
Header + Sidebar (240px) + Main content
Table: 5 columns fully visible
Column widths: Name 2fr | Company 1fr | Title 1fr | Status 1fr | Score 1fr
Max-width: 1200px centered
```

### Tablet Layout (768px – 1023px)
```
Sidebar: Collapsed (64px)
Table: 5 columns but tighter spacing
Consider: Title column hidden if space too tight
```

### Mobile Layout (< 768px)
```
Sidebar: Bottom drawer / hamburger
Table: 3 columns only: Name | Status | Score
Company and Title columns hidden
Each row is taller to accommodate the two-line Name cell
```

---

## S-07: Add New Lead

| Property | Value |
|----------|-------|
| **Route** | `/leads/new` |
| **Auth Required** | Yes |
| **Role** | Member+ |
| **Status** | MVP ✅ |

### Purpose
Provide a form for manually adding a single lead to the organization's database.

### Primary Actions
- Submit form (save lead and redirect to `/leads`)

### Secondary Actions
- Cancel (navigate back to `/leads`)
- Clear form

### Components
- Authenticated shell
- Background glow blob (1×)
- Back link: "← Back to Leads" (secondary button style, navigates to /leads)
- Page title: "Add New Lead"
- **Glass form card** (max-width 600px, centered):
  - Row: First Name (left) + Last Name (right) — equal widths, flex row
  - Email Address — full width, required
  - Row: Job Title (left) + Company Name (right) — equal widths
  - LinkedIn Profile URL — full width, optional, type="url"
  - Error alert banner (conditional, inside card, above form actions)
  - **Form actions** (right-aligned, separated from form body by a divider line):
    - [Cancel] secondary button → `/leads`
    - [Save Lead] primary button / "Saving..." during submission

### Permissions
- Minimum role: Member.
- Viewers (FUTURE) cannot see or access this screen.

### Empty State
N/A — Form is the default state. All fields start empty.

### Loading State
- "Save Lead" button changes to "Saving..." and is disabled.
- All inputs are disabled during submission.
- No spinner overlay — the button state change is the feedback.

### Error State
- **Field validation (client)**: Inline error text below each affected input:
  - "First Name is required."
  - "Please enter a valid email address."
- **Duplicate lead (API 409)**: Error banner inside the card:
  - "A lead with this email already exists in your workspace."
  - [View Existing Lead] link (FUTURE)
- **Server error**: Error banner: "Could not create lead. Please try again." + [Retry]

### Desktop Layout (≥ 1024px)
```
Header + Sidebar (240px) + Main content
Back link above page title
Form card: 600px wide, centered in main content area
First/Last Name row: 50/50 split
Job Title / Company row: 50/50 split
```

### Tablet Layout (768px – 1023px)
```
Sidebar: Collapsed
Form card: 90% width of main content area, max 520px
Field rows maintained as 2-column
```

### Mobile Layout (< 768px)
```
Sidebar: Hidden
Form card: full width with 16px padding
All field rows become single column (stacked vertically)
Back link stays above title
Form actions: full-width buttons stacked (Save on top, Cancel below)
```

---

## S-08: Lead Detail & Profile *(FUTURE)*

| Property | Value |
|----------|-------|
| **Route** | `/leads/:id` |
| **Auth Required** | Yes |
| **Role** | All roles |
| **Status** | FUTURE |

### Purpose
Display full information about a single lead: enrichment data, AI insights, email history, tasks, and notes. The central hub for relationship management with one lead.

### Primary Actions
- Edit lead information → `/leads/:id/edit`
- Run Website Audit (AI)
- Generate Outreach Email (AI)
- Add Note
- Add Task

### Secondary Actions
- Run AI Lead Scoring
- Generate Follow-up Email
- Add / Remove Tags
- Change Lead Status
- Delete Lead (Owner/Admin only)

### Components
- Authenticated shell
- Breadcrumb: Leads / {Lead Full Name}
- **Lead Header Panel** (glass):
  - Avatar (initials-based, gradient background)
  - Full Name (large, bold)
  - Job Title at Company Name
  - Status badge (editable dropdown)
  - AI Score badge (circular gradient)
  - Tags row (pill badges with × to remove each)
  - Action buttons: [Edit] [Run AI Audit] [Generate Email] [Add Task]
- **Two-column layout**:
  - **Left column (2/3 width)**:
    - Contact Info card: Email, Phone, LinkedIn URL, Company Website
    - AI Insights panel: Website Analysis, Prospect Intelligence
    - AI-Generated Email preview
    - Activity Timeline (Notes + Email Events — see S-20)
  - **Right column (1/3 width)**:
    - Lead Metadata: Source, Created At, Assigned To, Organization ID
    - Open Tasks widget (3 most recent, link to full task list)
    - Campaign History widget (which campaigns this lead is in)

### Permissions
- All roles can view.
- Member+ can add notes and tasks.
- Owner/Admin can delete.

### Empty State
Individual panels have their own empty states:
- AI Insights: "No website analysis yet. Run an audit to see AI insights." [Run Audit]
- Activity: "No activity recorded. Add a note or send an email to get started."
- Open Tasks: "No open tasks." [Add Task]

### Loading State
- Left column: Skeleton blocks for each panel.
- Right column: Skeleton metadata rows.

### Error State
- Lead not found (deleted): Full-screen 404 error state (S-32).
- Panel load failure: Each panel shows its own inline retry.

### Desktop Layout (≥ 1024px)
```
Two-column: 2fr (left) + 1fr (right)
Lead header: full width above both columns
```

### Tablet Layout (768px – 1023px)
```
Two-column maintained but narrower
Right column may collapse into an accordion below left
```

### Mobile Layout (< 768px)
```
Single column
Lead header stacks: avatar → name → badges → buttons
Left and right content stacked vertically
```

---

## S-09: Edit Lead *(FUTURE)*

| Property | Value |
|----------|-------|
| **Route** | `/leads/:id/edit` |
| **Auth Required** | Yes |
| **Role** | Member+ |
| **Status** | FUTURE |

### Purpose
Allow editing of any lead field. Same form as S-07 but pre-populated with existing data.

### Primary Actions
- Save changes (PATCH /leads/:id)

### Secondary Actions
- Cancel → back to `/leads/:id`

### Components
Same as S-07 (Add New Lead) but:
- All fields pre-filled
- Page title: "Edit Lead"
- Submit button: "Save Changes"
- Additional section for Danger Zone: [Delete Lead] (Owner/Admin only, requires confirmation)

### Loading State / Error State
Same as S-07.

### Desktop / Tablet / Mobile Layout
Same as S-07.

---

## S-10: CSV Import Wizard *(FUTURE)*

| Property | Value |
|----------|-------|
| **Route** | `/leads/import` |
| **Auth Required** | Yes |
| **Role** | Member+ |
| **Status** | FUTURE |

### Purpose
Walk the user through uploading a CSV file and mapping its columns to lead fields, then triggering a background bulk import.

### Primary Actions
- Upload CSV file
- Confirm column mapping
- Submit import

### Secondary Actions
- Cancel → `/leads`
- Download sample CSV template

### Components
- Authenticated shell
- Breadcrumb: Leads / Import
- **Multi-step wizard** with progress indicator (Step 1 of 3):
  - **Step 1 — Upload**:
    - Drag-and-drop zone (dashed border, cloud icon, label text)
    - "or click to browse" fallback
    - Accepted formats label: ".csv files only, max 50MB"
    - File name display after selection
    - [Next →] button (disabled until file selected)
  - **Step 2 — Map Columns**:
    - Preview table: first 5 rows of uploaded CSV
    - Mapping row per detected column: CSV Column Name → [Field Dropdown]
    - "Required" label next to Email mapping
    - "Ignore" option in dropdown for unmapped columns
    - [← Back] [Next →]
  - **Step 3 — Review & Import**:
    - Summary: "You are importing N leads."
    - Mapping summary table
    - [← Back] [Start Import] primary button

### Permissions
- Member role required.

### Empty State
Step 1: Upload zone IS the empty state (no file selected).

### Loading State
- Import triggered: Button "Starting Import..." → redirect to `/leads` with banner.
- Step 2: CSV preview has a brief loading shimmer while file is parsed client-side.

### Error State
- Invalid file type: Alert below drop zone: "Please upload a .csv file."
- File too large: "File exceeds 50MB limit."
- Required column not mapped (Email): Toast/inline: "Email column must be mapped to import leads."

### Desktop Layout (≥ 1024px)
```
Wizard card: max-width 700px, centered
Step progress indicator: horizontal dots/steps at top of card
```

### Tablet / Mobile Layout
```
Same card, narrower
Step indicator: compressed
Mobile: single-column mapping rows
```

---

---

# CAMPAIGNS GROUP

---

## S-11: Campaign List *(FUTURE)*

| Property | Value |
|----------|-------|
| **Route** | `/campaigns` |
| **Auth Required** | Yes |
| **Role** | All roles |
| **Status** | FUTURE |

### Purpose
Show all campaigns in the organization with their status, progress, and quick actions.

### Primary Actions
- Create new campaign → `/campaigns/new`
- Click campaign row → `/campaigns/:id`

### Secondary Actions
- Pause / Resume / Stop campaign (inline row actions)
- Filter by status (Draft / Active / Paused / Completed)
- Search by campaign name

### Components
- Authenticated shell
- Page title: "Campaigns"
- Header: [+ New Campaign] primary button
- Status filter tabs: All | Active | Draft | Paused | Completed
- **Campaign Cards or Table** (glass panel):
  - Campaign Name
  - Status badge
  - Audience count (X leads)
  - Sequence name
  - Progress bar (Completed / Total leads)
  - Last activity date
  - Row actions: [⏸ Pause] [▶ Resume] [⏹ Stop] (context-aware per status)

### Permissions
- All roles can view.
- Member+ can create.
- Owner/Admin can delete.

### Empty State
```
Icon: Megaphone
Heading: "No campaigns yet"
Body: "Create your first campaign to start sending personalized outreach at scale."
CTA: [+ Create Campaign]
```

### Loading State
- 4 skeleton campaign cards/rows.

### Error State
```
Icon: Cloud
Heading: "Could not load campaigns"
CTA: [↻ Retry]
```

### Desktop Layout (≥ 1024px)
```
Table layout: 6 columns visible
Status tabs as horizontal pill row
```

### Tablet Layout
```
Table condensed: Name + Status + Progress shown
Other columns hidden behind row expand
```

### Mobile Layout
```
Card-based list (1 card per campaign)
Status badge + Name + progress bar + action button per card
```

---

## S-12: Campaign Builder *(FUTURE)*

| Property | Value |
|----------|-------|
| **Route** | `/campaigns/new` |
| **Auth Required** | Yes |
| **Role** | Member+ |
| **Status** | FUTURE |

### Purpose
Guide the user through creating a campaign by binding together: audience, sequence, prompt template, and schedule.

### Primary Actions
- Save as Draft (POST /campaigns, status: Draft)
- Save and Launch (POST /campaigns + POST /campaigns/:id/start)

### Secondary Actions
- Cancel → `/campaigns`
- Create new sequence (opens in new tab)
- Create new segment (opens in new tab)

### Components
- Authenticated shell
- Breadcrumb: Campaigns / New Campaign
- **Multi-step wizard** (6 steps, horizontal progress bar):
  - Step 1: Campaign Name + Description
  - Step 2: Select Audience (Segment dropdown + lead count preview)
  - Step 3: Select Sequence (Sequence dropdown + step preview panel)
  - Step 4: Select Prompt Template (Dropdown + template preview)
  - Step 5: Schedule (Radio: "Now" vs. Date+Time picker)
  - Step 6: Review (Summary card of all selections)
- [← Back] [Next →] navigation between steps
- [Save as Draft] [Save and Launch] on final step

### Loading State
Each step: inputs disabled + spinner while dropdown data loads.
Final submit: "Launching..." + disabled buttons.

### Error State
Step-level: Missing required fields shown with inline validation.
Missing prerequisites (no email account): Full-screen blocker banner at top:
```
"Action Required: You must connect an email account before launching campaigns."
[→ Connect Email Account]
```

### Desktop Layout (≥ 1024px)
```
Wizard card: max-width 760px, centered
Step 3 (Sequence): sequence preview panel on right side of wizard card
```

### Tablet / Mobile Layout
```
Same wizard, narrower card
Sequence preview moves below dropdown (stacked)
Schedule picker: date and time stacked vertically
```

---

## S-13: Campaign Detail *(FUTURE)*

| Property | Value |
|----------|-------|
| **Route** | `/campaigns/:id` |
| **Auth Required** | Yes |
| **Role** | All roles |
| **Status** | FUTURE |

### Purpose
Show real-time campaign performance, lead-by-lead delivery status, and controls (pause/resume/stop).

### Primary Actions
- Launch campaign (if Draft)
- Pause / Resume / Stop (contextual to status)

### Secondary Actions
- Edit campaign settings (only in Draft)
- Export lead status report

### Components
- Authenticated shell
- Breadcrumb: Campaigns / {Campaign Name}
- **Campaign Header Panel** (glass):
  - Campaign name (large)
  - Status badge
  - Created date + schedule
  - Audience / Sequence / Template summary chips
  - Primary action button (Launch / Pause / Resume / Stop)
- **Stats Bar**: Total | Pending | Processing | Completed | Failed (with counts)
- **Progress Overview** (horizontal stacked bar or donut chart)
- **Lead Status Table**:
  - Lead Name | Email | Current Step | Status | Last Event | Last Event Date
  - Status: Pending / Processing / Completed / Failed + color badges
  - Last Event: Delivered / Opened / Clicked / Replied / Bounced
- **A/B Test Results Panel** (if A/B campaign — FUTURE)

### Loading State
- Stats bar: skeleton numbers.
- Lead table: 5 skeleton rows.

### Error State
- Campaign not found → S-32.
- Stats fail → inline "Could not load stats" + [Retry].

### Desktop Layout (≥ 1024px)
```
Full-width sections stacked vertically
Stats bar: horizontal row of 5 count boxes
Lead table: all 6 columns
```

### Tablet Layout
```
Stats bar wraps to 2×3 grid
Lead table: Name + Status + Last Event (3 columns)
```

### Mobile Layout
```
Stats boxes: 2×3 grid (vertical text + number)
Lead list: Card-per-lead (Name + Status badge + Last Event)
```

---

---

# SEQUENCES GROUP

---

## S-14: Sequence List *(FUTURE)*

| Property | Value |
|----------|-------|
| **Route** | `/sequences` |
| **Auth Required** | Yes |
| **Role** | All roles |
| **Status** | FUTURE |

### Purpose
List all saved email sequences. Allow creation, duplication, and deletion.

### Primary Actions
- Create new sequence → `/sequences/new`

### Secondary Actions
- Click sequence → `/sequences/:id`
- Duplicate sequence
- Delete sequence (Owner/Admin)

### Components
- Authenticated shell
- Page title: "Email Sequences"
- [+ New Sequence] button
- **Sequence card grid or table**:
  - Sequence Name
  - Step count summary: "3 emails · 8 day cadence"
  - Active / Inactive badge
  - Stop-on-reply indicator
  - Campaigns using this sequence (count)
  - Row actions: [Edit] [Duplicate] [Delete]

### Empty State
```
Icon: GitBranch illustration
Heading: "No email sequences defined"
Body: "Build a multi-step email sequence to automate follow-ups after your initial outreach."
CTA: [+ Build Sequence]
```

### Loading State
- 3 skeleton sequence cards.

### Error State
Inline retry within list area.

### Desktop / Tablet / Mobile Layout
```
Desktop: Table layout
Tablet: Same, narrower columns
Mobile: Card list (one card per sequence)
```

---

## S-15: Sequence Builder *(FUTURE)*

| Property | Value |
|----------|-------|
| **Route** | `/sequences/new` |
| **Auth Required** | Yes |
| **Role** | Member+ |
| **Status** | FUTURE |

### Purpose
Build a multi-step email + wait sequence using a visual drag-and-drop or linear step editor.

### Primary Actions
- Add EMAIL step
- Add WAIT step
- Save sequence

### Secondary Actions
- Reorder steps (drag handles)
- Delete a step
- Preview sequence cadence
- Cancel → `/sequences`

### Components
- Authenticated shell
- Breadcrumb: Sequences / New Sequence
- **Settings panel** (top):
  - Sequence Name input
  - "Stop on Reply" toggle (on by default)
- **Step Editor** (vertical linear flow):
  - Each step rendered as a card:
    - EMAIL step card: "Email" label + Prompt Template selector + preview
    - WAIT step card: "Wait" label + number input + "days" unit label
  - [+ Add Email Step] button (adds after last step)
  - [+ Add Wait Step] button
  - Drag handle on each card (future: drag to reorder)
  - [Delete] icon on each card (min 1 step required)
- **Sequence Summary** (right sidebar or bottom panel):
  - "This sequence spans X days"
  - Step timeline visualization
- [Save Sequence] primary button
- [Cancel] secondary button

### Validation
- At least 1 EMAIL step required.
- WAIT step must have delayDays ≥ 1.
- EMAIL step must have a Prompt Template selected (or default).

### Loading State
- Prompt template dropdown: "Loading templates..."
- Save: "Saving..." + disabled.

### Error State
- Validation failure: Toast or inline per step.
- Save failure: Banner + [Retry].

### Desktop Layout (≥ 1024px)
```
Main editor: 2/3 width (step cards, vertical)
Summary sidebar: 1/3 width (right)
```

### Tablet / Mobile Layout
```
Summary sidebar moves below editor
Steps cards full width
```

---

## S-16: Sequence Detail *(FUTURE)*

| Property | Value |
|----------|-------|
| **Route** | `/sequences/:id` |
| **Auth Required** | Yes |
| **Role** | All roles |
| **Status** | FUTURE |

### Purpose
View details of an existing sequence. Entry point to editing or duplicating.

### Primary Actions
- Edit sequence → inline edit or `/sequences/:id/edit`

### Secondary Actions
- Duplicate
- Delete (Owner/Admin)

### Components
Same layout as S-15 but in read-only mode.
[Edit] button unlocks inline editing.

---

---

# CRM GROUP

---

## S-17: CRM Pipeline (Kanban) *(FUTURE)*

| Property | Value |
|----------|-------|
| **Route** | `/crm/pipeline` |
| **Auth Required** | Yes |
| **Role** | All roles |
| **Status** | FUTURE |

### Purpose
Visual Kanban board to track deals through pipeline stages from lead to close.

### Primary Actions
- Add new deal
- Drag deal card between columns

### Secondary Actions
- Click deal card → Deal Detail
- Edit column names (Owner/Admin)
- Search/filter deals

### Components
- Authenticated shell
- Page title: "Pipeline"
- [+ Add Deal] button
- **Kanban Board**:
  - Horizontal scroll container
  - Stage columns (configurable, defaults: Lead → Meeting Scheduled → Proposal Sent → Won | Lost)
  - Each column: Column header (name + deal count) + scrollable card list
  - **Deal card**:
    - Lead Name + Company
    - Value (currency, FUTURE)
    - Assigned team member avatar
    - Due date (if set)
    - Priority indicator
  - Drag-and-drop between columns
  - Drop zone highlight when dragging

### Empty State
**Empty board (no deals)**:
```
Icon: Kanban columns illustration
Heading: "Your pipeline is clear"
Body: "Deals created from your leads will appear here."
CTA: [+ Add Deal]
```
**Empty column** (some deals exist but none in this stage): No empty state — column simply shows its header with "(0)".

### Loading State
- Each column shows 2 skeleton deal cards.

### Error State
- Board fails to load: Full-screen error with [Retry].
- Individual drag-and-drop failure: Card animates back to original column + toast: "Could not update deal stage."

### Desktop Layout (≥ 1024px)
```
Full-width horizontal scroll
Each column: 260px min-width
Columns visible: ~4 at 1280px
```

### Tablet Layout
```
Horizontal scroll
3 columns visible, rest scrollable
```

### Mobile Layout
```
Vertical accordion per stage
Each stage collapses/expands
Deal cards listed vertically within each stage
```

---

## S-18: Task List *(FUTURE)*

| Property | Value |
|----------|-------|
| **Route** | `/crm/tasks` |
| **Auth Required** | Yes |
| **Role** | All roles |
| **Status** | FUTURE |

### Purpose
Centralized view of all tasks across the organization, grouped by urgency. Allows creation and completion of tasks.

### Primary Actions
- Add new task (modal or inline)
- Mark task complete (checkbox)

### Secondary Actions
- Filter by: Assigned to me | All tasks | Overdue
- Filter by type: Call / Email / Meeting / To-Do
- Sort by due date

### Components
- Authenticated shell
- Breadcrumb: CRM / Tasks
- Page title: "Tasks"
- [+ Add Task] button (opens modal)
- **Task grouped list** (glass panels per group):
  - **Overdue** section (red accent): Tasks past due date, not completed
  - **Today** section: Tasks due today
  - **Upcoming** section: Future tasks
  - **Completed** section (collapsible): Recently completed tasks
- **Task row**:
  - Checkbox (click = complete)
  - Task title (bold if incomplete, strikethrough if complete)
  - Type icon (📞 📧 📅 ✅)
  - Associated lead name (linked)
  - Assignee avatar
  - Due date + time (red if overdue)
  - [Edit] icon (hover)
- **Add Task Modal**:
  - Title, Type, Due Date, Assignee, Lead/Deal link (optional)

### Permissions
- Members see their own tasks by default.
- Admins/Owners can view all team tasks.

### Empty State
```
Icon: Checkbox with sparkle
Heading: "Nothing on your task list"
Body: "You're all caught up! Create tasks to track calls, emails, and follow-ups."
CTA: [+ Add Task]
```

### Loading State
- 4 skeleton task rows per section.

### Error State
- Inline: "Could not load tasks. [↻ Retry]"

### Desktop Layout (≥ 1024px)
```
Full table layout: all columns visible
Sections separated by group headings
```

### Tablet / Mobile Layout
```
Mobile: Checkbox + Title + Due Date only
Type icon replaces type text
Overdue highlighted in red
```

---

## S-19: Task Detail *(FUTURE)*

| Property | Value |
|----------|-------|
| **Route** | `/crm/tasks/:id` |
| **Auth Required** | Yes |
| **Role** | All roles |
| **Status** | FUTURE |

### Purpose
View and edit a single task's details. Standalone page or accessible via modal from task list.

### Primary Actions
- Mark complete
- Edit task fields

### Secondary Actions
- Delete task
- Navigate to linked lead

### Components
- Glass detail card:
  - Title (editable inline)
  - Type (editable dropdown)
  - Status (Pending / In Progress / Completed)
  - Due Date + Time (date-time picker)
  - Assigned To (user selector)
  - Linked Lead / Deal (linked chip)
  - Description / Notes (textarea)
  - [Save Changes] / [Delete Task]

---

## S-20: Notes Timeline *(FUTURE)*

| Property | Value |
|----------|-------|
| **Route** | `/crm/notes` or embedded in S-08 Lead Detail |
| **Auth Required** | Yes |
| **Role** | All roles |
| **Status** | FUTURE |

### Purpose
Chronological activity log for a lead — combining manual notes with system-logged email events.

### Primary Actions
- Add new note

### Secondary Actions
- Edit note (own notes only)
- Delete note (own notes or Owner/Admin)

### Components
- Timeline container (newest first)
- **Timeline event types**:
  - 📝 Note: Card with timestamp + author + content text
  - 📧 Email Delivered: "[Campaign Name] email delivered"
  - 👁 Email Opened: "[Campaign Name] email opened"
  - 🖱 Link Clicked: "Link clicked in [Campaign Name] email"
  - 💬 Reply Received: "Lead replied to [Campaign Name]"
  - 👤 Lead Created: "Lead added to workspace"
- **Add Note inline form** at top of timeline:
  - Textarea: "Write a note..."
  - [Save Note] + [Cancel]

### Empty State
```
Icon: FileText
Heading: "No activity recorded yet"
Body: "Add a note or start a campaign to see activity here."
CTA: [+ Add Note]
```

### Loading State
Skeleton timeline items (3–4).

### Desktop / Tablet / Mobile Layout
```
Single column, full width within Lead Detail's left column
Mobile: Same — single column, full width
```

---

---

# SEGMENTS GROUP

---

## S-21: Segment List *(FUTURE)*

| Property | Value |
|----------|-------|
| **Route** | `/segments` |
| **Auth Required** | Yes |
| **Role** | Member+ |
| **Status** | FUTURE |

### Purpose
List all saved audience segments and allow creation of new ones.

### Primary Actions
- Create new segment → `/segments/new`

### Secondary Actions
- Click segment → view/edit
- Delete segment (Owner/Admin)

### Components
- Authenticated shell
- Page title: "Segments"
- [+ Create Segment] button
- **Segment list** (table or card grid):
  - Segment Name
  - Filter summary ("Status: Qualified, Score ≥ 70")
  - Estimated lead count (refreshed on load)
  - Last updated date
  - Used in N campaigns

### Empty State
```
Icon: Filter funnel
Heading: "No segments defined"
Body: "Segments let you group leads by criteria like tags, score, or status."
CTA: [+ Create Segment]
```

### Loading / Error State
Standard skeleton + retry pattern.

---

## S-22: Segment Builder *(FUTURE)*

| Property | Value |
|----------|-------|
| **Route** | `/segments/new` or `/segments/:id` |
| **Auth Required** | Yes |
| **Role** | Member+ |
| **Status** | FUTURE |

### Purpose
Build a reusable lead filter using criteria. Preview matching lead count in real time.

### Primary Actions
- Save segment

### Secondary Actions
- Preview matching leads
- Cancel

### Components
- Authenticated shell
- Segment Name input
- **Filter Builder** (add/remove rules with AND logic):
  - Rule row: [Field selector] [Operator] [Value input] [Delete icon]
  - Fields: Status | Score | Tags | Source | Created Date | Has Email | etc.
  - Operators: equals / contains / greater than / less than / is empty
  - [+ Add Rule] button
- **Live Preview** (right panel): "X leads match these filters"
- [Save Segment] primary button

### Validation
- At least 1 rule required.
- All rules must be complete (field + operator + value).

---

---

# AI TOOLS GROUP

---

## S-23: AI Tools Hub *(FUTURE)*

| Property | Value |
|----------|-------|
| **Route** | `/ai` |
| **Auth Required** | Yes |
| **Role** | All roles |
| **Status** | FUTURE |

### Purpose
Centralized landing page for all AI-powered tools. Navigates to individual tool screens.

### Primary Actions
- Navigate to individual tools

### Components
- Authenticated shell
- Page title: "AI Tools"
- **Tool cards grid** (2×2 or 2×3):
  - Website Audit card → `/ai/audit`
  - Follow-up Generator card → `/ai/followup`
  - Subject Line Optimizer card → `/ai/subject`
  - Lead Scoring card → `/ai/scoring`
  - Each card: Icon + Name + 1-line description + [Launch] button

---

## S-24: Website Audit Tool *(FUTURE)*

| Property | Value |
|----------|-------|
| **Route** | `/ai/audit` |
| **Auth Required** | Yes |
| **Role** | All roles |
| **Status** | FUTURE |

### Purpose
Run an AI-powered analysis of any company website for prospect intelligence.

### Primary Actions
- Submit URL for analysis
- Attach results to a lead

### Components
- Authenticated shell
- Breadcrumb: AI Tools / Website Audit
- **Input Panel** (glass card):
  - Lead selector dropdown (optional — pre-fills URL if selected)
  - Website URL input
  - [Run Audit] primary button
- **Results Panel** (glass card, appears after analysis):
  - Company Overview
  - Value Proposition
  - Identified Pain Points
  - Key Personnel / Titles
  - Suggested Outreach Angles
  - [Attach to Lead] button

### Loading State
```
Results panel: full-width loading bar + "Analyzing {domain}..." label
Duration estimate: "This may take 15–30 seconds"
```

### Error State
```
Results panel shows:
Icon: Alert triangle
Heading: "Analysis failed"
Body: Could not access the website / AI service unavailable.
[↻ Retry]
```

---

## S-25: Follow-up Generator *(FUTURE)*

| Property | Value |
|----------|-------|
| **Route** | `/ai/followup` |
| **Auth Required** | Yes |
| **Role** | All roles |
| **Status** | FUTURE |

### Purpose
Generate a context-aware follow-up email for a lead who has not replied.

### Components
- Lead selector (pre-fills prior email context)
- Tone selector: Gentle / Direct / Value-Add / Break-Up
- [Generate] button
- Output panel: Subject + Body preview, [Edit] [Copy] [Add to Sequence]

---

## S-26: Subject Line Optimizer *(FUTURE)*

| Property | Value |
|----------|-------|
| **Route** | `/ai/subject` |
| **Auth Required** | Yes |
| **Role** | All roles |
| **Status** | FUTURE |

### Purpose
Generate multiple subject line variants optimized for open rate.

### Components
- Subject line input (original draft)
- Context description input (optional)
- [Optimize] button
- Results: 3–5 ranked variants with confidence labels and [Copy] per variant

---

---

# SETTINGS GROUP

---

## S-27: Profile Settings *(FUTURE)*

| Property | Value |
|----------|-------|
| **Route** | `/settings/profile` |
| **Auth Required** | Yes |
| **Role** | All roles |
| **Status** | FUTURE |

### Purpose
Allow users to update their personal information and preferences.

### Components
- Authenticated shell
- Settings nav sidebar (sub-navigation within settings)
- **Profile form** (glass card):
  - Avatar upload / initials display
  - First Name / Last Name inputs
  - Email (read-only — email changes require separate verification flow)
  - Timezone selector
  - [Save Changes] button
- **Password section** (separate card):
  - Current Password
  - New Password
  - Confirm New Password
  - [Update Password] button
- **Danger Zone** (red-bordered card):
  - [Delete My Account] (confirmation required)

---

## S-28: Email Accounts *(FUTURE)*

| Property | Value |
|----------|-------|
| **Route** | `/settings/email` |
| **Auth Required** | Yes |
| **Role** | Owner / Admin |
| **Status** | FUTURE |

### Purpose
Connect and manage email sending accounts (SMTP, Gmail, Outlook, SendGrid, etc.)

### Primary Actions
- Connect a new email account
- Set default account
- Test connection
- Delete account

### Components
- Authenticated shell + Settings sub-nav
- Page title: "Email Accounts"
- [+ Add Email Account] button
- **Connected accounts list** (one card per account):
  - Provider icon + name
  - From email address
  - "Default" badge (if set)
  - [Test Connection] [Set as Default] [Delete] actions
- **Add Account Flow** (modal or drawer):
  - Provider selector (SMTP / Gmail / Outlook / SendGrid / Resend / Amazon SES)
  - Provider-specific credential fields
  - [Test & Connect] button
  - Success: account added, connection confirmed

### Empty State
```
Icon: Email envelope
Heading: "No email accounts connected"
Body: "Connect a sending account to start dispatching campaigns."
CTA: [+ Connect Email Account]
```

### Loading State
- "Testing connection..." spinner inside modal.

### Error State
- Connection test fails: "Could not verify credentials. Please check and try again."

---

## S-29: Team Management *(FUTURE)*

| Property | Value |
|----------|-------|
| **Route** | `/settings/team` |
| **Auth Required** | Yes |
| **Role** | Owner / Admin |
| **Status** | FUTURE |

### Purpose
Manage team members within the organization. Invite new members and manage roles.

### Primary Actions
- Invite new member (email + role)

### Secondary Actions
- Change member role
- Remove member

### Components
- Authenticated shell + Settings sub-nav
- [+ Invite Member] button → opens invite modal
- **Member table**:
  - Avatar | Name | Email | Role | Joined Date | Actions
- **Invite Modal**:
  - Email input
  - Role dropdown: Member / Admin
  - [Send Invitation] button

### Empty State
Only the current user exists: table shows them alone (no empty state — always has at least 1 member).

### Error State
- Invitation email fails to send: "Could not send invitation. Please try again."

---

## S-30: Prompt Templates *(FUTURE)*

| Property | Value |
|----------|-------|
| **Route** | `/settings/prompts` |
| **Auth Required** | Yes |
| **Role** | Member+ |
| **Status** | FUTURE |

### Purpose
Create and manage reusable AI prompt templates that drive email generation across campaigns.

### Primary Actions
- Create new template
- Edit template
- Delete template

### Components
- Authenticated shell + Settings sub-nav
- [+ New Template] button
- **Template list** (table or cards):
  - Template Name | Category | Used in N campaigns | Last Modified
- **Template Form** (create/edit):
  - Name input
  - Category dropdown (Cold Outreach / Follow-up / Break-up / Reconnect)
  - System Prompt textarea (large, monospace-friendly)
  - Variables guide: "{firstName}, {company}, {painPoint}, {valueProposition}"
  - [Save] / [Cancel]

### Empty State
```
Icon: Document + sparkle
Heading: "No prompt templates yet"
Body: "Create a template to standardize AI email generation across your campaigns."
CTA: [+ New Template]
```

---

## S-31: Billing & Plans *(FUTURE)*

| Property | Value |
|----------|-------|
| **Route** | `/settings/billing` |
| **Auth Required** | Yes |
| **Role** | Owner only |
| **Status** | FUTURE |

### Purpose
Manage subscription plan, view usage, and update payment method.

### Components
- Authenticated shell + Settings sub-nav
- **Current Plan card**: Plan name, price, renewal date, lead quota, email quota
- **Usage bar**: Leads used / Quota | Emails sent / Quota
- **Payment Method**: Last 4 digits, expiry, [Update] button
- **Invoice History**: Table of past invoices with [Download PDF]
- [Upgrade Plan] / [Cancel Plan] buttons

### Permissions
- Owner only. Admin and Member see a 403 access denied state.

---

---

# SYSTEM SCREENS

---

## S-32: 404 Not Found

| Property | Value |
|----------|-------|
| **Route** | Matches any unrecognized route |
| **Auth Required** | No |
| **Role** | N/A |
| **Status** | MVP |

### Purpose
Handle gracefully when a user lands on a non-existent page or a deleted resource.

### Components
- Authenticated shell (if user is logged in) OR minimal unauthenticated layout
- Center-aligned content:
  - Illustration: Map pin / broken link
  - Large "404" (subtle, faded)
  - Heading: "This page doesn't exist"
  - Body: "The link you followed may be broken, or this resource may have been deleted."
  - CTA: [← Back to Dashboard]

### Desktop / Tablet / Mobile Layout
Full-screen centered, identical across breakpoints.

---

## S-33: 403 Access Denied

| Property | Value |
|----------|-------|
| **Route** | Triggered programmatically within protected routes |
| **Auth Required** | Yes |
| **Role** | N/A |
| **Status** | MVP |

### Purpose
Inform users when they attempt to access a page their role doesn't permit.

### Components
- Authenticated shell
- Center-aligned content:
  - Illustration: Padlock
  - Heading: "Access Denied"
  - Body: "You don't have permission to view this page. Contact your organization's admin if you believe this is a mistake."
  - CTAs: [← Go Back] | [Contact Admin] (mailto link to org owner email)

---

## S-34: 500 Server Error

| Property | Value |
|----------|-------|
| **Route** | Triggered by unhandled errors in Next.js error boundary |
| **Auth Required** | No |
| **Role** | N/A |
| **Status** | MVP |

### Purpose
Catch unexpected application crashes and give users a graceful recovery path.

### Components
- Minimal layout (no sidebar, minimal header)
- Center-aligned content:
  - Illustration: Cloud with lightning bolt
  - Heading: "Something went wrong"
  - Body: "We encountered an unexpected error. Our team has been notified. Please try refreshing the page."
  - CTAs: [↻ Refresh Page] | [← Go Back]

---

*Every screen must have an entry in this document before development begins. For each new screen added in later sprints, create a new entry following this template precisely.*

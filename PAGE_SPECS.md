# PAGE_SPECS.md — Injaazh Lead AI: Page Specifications

> **Per-Screen Engineering Contract — Every Page, Every State**  
> Version: 1.0 | Last Updated: July 2026  
> Companion documents: [SCREENS.md](./SCREENS.md) | [COMPONENTS.md](./COMPONENTS.md) | [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) | [USER_FLOW.md](./USER_FLOW.md)  
> Status: Living Document — Add a new entry before building any new page.

---

## Document Conventions

- **Route**: The URL path for the page.
- **Layout**: `auth` (unauthenticated centered card) or `app` (full AppShell with sidebar).
- **API Dependencies**: Specific API calls this page makes.
- **Permissions**: Which user roles can access this page.
- All states (loading, empty, error, success) must be handled by every page.

---

## Screen Index

| ID | Screen | Route | Layout |
|----|--------|-------|--------|
| [S-01](#s-01-login) | Login | `/login` | auth |
| [S-02](#s-02-register) | Register | `/register` | auth |
| [S-03](#s-03-forgot-password) | Forgot Password | `/forgot-password` | auth |
| [S-04](#s-04-reset-password) | Reset Password | `/reset-password?token=` | auth |
| [S-05](#s-05-create-organization) | Create Organization | `/onboarding/create-org` | auth |
| [S-06](#s-06-dashboard) | Dashboard | `/dashboard` | app |
| [S-07](#s-07-lead-list) | Lead List | `/leads` | app |
| [S-08](#s-08-import-leads) | Import Leads | `/leads/import` | app |
| [S-09](#s-09-add-lead) | Add Lead | `/leads/new` | app |
| [S-10](#s-10-lead-detail) | Lead Detail | `/leads/:id` | app |
| [S-11](#s-11-edit-lead) | Edit Lead | `/leads/:id/edit` | app |
| [S-12](#s-12-segments) | Segments | `/segments` | app |
| [S-13](#s-13-campaign-list) | Campaign List | `/campaigns` | app |
| [S-14](#s-14-new-campaign-wizard) | New Campaign Wizard | `/campaigns/new` | app |
| [S-15](#s-15-campaign-detail) | Campaign Detail | `/campaigns/:id` | app |
| [S-16](#s-16-sequence-list) | Sequence List | `/sequences` | app |
| [S-17](#s-17-sequence-builder) | Sequence Builder | `/sequences/new` | app |
| [S-18](#s-18-sequence-detail) | Sequence Detail | `/sequences/:id` | app |
| [S-19](#s-19-crm-pipeline) | CRM Pipeline | `/crm/pipeline` | app |
| [S-20](#s-20-tasks) | Tasks | `/crm/tasks` | app |
| [S-21](#s-21-notes) | Notes | `/crm/notes` | app |
| [S-22](#s-22-ai-website-audit) | AI Website Audit | `/ai/website-audit` | app |
| [S-23](#s-23-ai-follow-up-generator) | AI Follow-up Generator | `/ai/followup` | app |
| [S-24](#s-24-ai-subject-optimizer) | AI Subject Optimizer | `/ai/subjects` | app |
| [S-25](#s-25-ai-lead-scoring) | AI Lead Scoring | `/ai/scoring` | app |
| [S-26](#s-26-analytics) | Analytics | `/analytics` | app |
| [S-27](#s-27-settings-profile) | Settings — Profile | `/settings/profile` | app |
| [S-28](#s-28-settings-email-accounts) | Settings — Email Accounts | `/settings/email-accounts` | app |
| [S-29](#s-29-settings-team) | Settings — Team | `/settings/team` | app |
| [S-30](#s-30-settings-prompt-templates) | Settings — Prompt Templates | `/settings/prompts` | app |
| [S-31](#s-31-settings-billing) | Settings — Billing | `/settings/billing` | app |
| [S-32](#s-32-settings-organization) | Settings — Organization | `/settings/organization` | app |
| [S-33](#s-33-404-not-found) | 404 Not Found | `/*` (catch-all) | app |
| [S-34](#s-34-403-forbidden) | 403 Forbidden | Rendered in-page | app |
| [S-35](#s-35-500-server-error) | 500 Server Error | Rendered in-page | app |

---

---

# AUTH SCREENS

---

## S-01: Login

**Route**: `/login`  
**Layout**: `auth` (centered card, full dark canvas, glow blobs)

### Goal
Allow registered users to authenticate with their email and password and gain access to the application.

### Components

| Component | Purpose |
|-----------|---------|
| `FormCard` | Outer glass card containing the form |
| `Input` (email) | Email address field |
| `Input` (password) | Password field with show/hide toggle |
| `Button` (primary) | "Sign In" submit button |
| `Button` (ghost) | "Forgot Password?" link |
| `Button` (ghost) | "Don't have an account? Register" link |
| `AlertBanner` | Login error messages |
| `Spinner` | Inside "Sign In" button during request |

### API Dependencies

| Call | Method | Endpoint | Trigger |
|------|--------|---------|---------|
| Authenticate | `POST` | `/auth/login` | Form submit |

**Request body**: `{ email, password }`  
**Success response**: `{ accessToken, refreshToken, user: { id, email, firstName, lastName, orgId } }`

### States

#### Loading State
- "Sign In" button: label changes to "Signing in...", spinner appears left, button disabled.
- Input fields remain interactive (user cannot re-submit until resolved).

#### Empty State
Not applicable — form is always ready to fill.

#### Error State

| Error | Message Displayed |
|-------|-----------------|
| Invalid credentials | "Invalid email or password. Please try again." |
| Account not found | "No account found with this email address." |
| Account locked | "Your account has been locked. Contact your administrator." |
| Network failure | "Could not connect to the server. Check your internet connection." |
| Server error (500) | "Something went wrong on our end. Please try again shortly." |

- Errors displayed in `AlertBanner` (type: `error`) above the form.
- Input borders turn red (`border.danger`) on credential errors.
- Error cleared automatically when user starts typing again.

#### Success State
- On valid token received: JWT stored in `httpOnly` cookie (handled by API) and in memory.
- Client redirects to:
  - `?redirect=` query param destination (if present)
  - `/dashboard` (default)

### User Actions

| Action | Trigger | Result |
|--------|---------|--------|
| Submit form | Click "Sign In" or press Enter | POST /auth/login |
| Toggle password visibility | Click eye icon in password field | Input type toggles text/password |
| Navigate to register | Click "Register" link | Navigate to `/register` |
| Navigate to forgot password | Click "Forgot Password?" | Navigate to `/forgot-password` |

### Permissions
Public — accessible to unauthenticated users only.  
Authenticated users visiting `/login` are redirected to `/dashboard`.

---

## S-02: Register

**Route**: `/register`  
**Layout**: `auth`

### Goal
Allow new users to create an account. After registration, they proceed to create or join an organization.

### Components

| Component | Purpose |
|-----------|---------|
| `FormCard` | Outer glass card |
| `FormRow` | First Name + Last Name (two-column) |
| `Input` (email) | Email address |
| `Input` (password) | Password with strength indicator |
| `Input` (confirm password) | Confirm password |
| `Button` (primary) | "Create Account" submit |
| `Button` (ghost) | "Already have an account? Sign In" |
| `AlertBanner` | Registration errors |
| `ProgressBar` | Password strength indicator (below password field) |

### API Dependencies

| Call | Method | Endpoint | Trigger |
|------|--------|---------|---------|
| Register | `POST` | `/auth/register` | Form submit |

**Request body**: `{ firstName, lastName, email, password }`  
**Success response**: `{ accessToken, user }` — auto-logged in.

### Password Strength Rules (Client-side only)

| Strength | Criteria | Bar Color |
|----------|---------|-----------|
| Weak | < 8 chars OR no numbers | Red |
| Fair | 8+ chars, has numbers | Amber |
| Good | 8+ chars, numbers, uppercase | Green 50% |
| Strong | All above + special character | Green 100% |

### States

#### Loading State
- "Create Account" button: "Creating account...", spinner, disabled.

#### Error State

| Error | Message |
|-------|---------|
| Email already registered | "An account with this email already exists. Sign in instead?" |
| Password too weak | "Password must be at least 8 characters with 1 number." |
| Passwords don't match | "Passwords do not match." — shown inline below confirm field |
| Server error | "Registration failed. Please try again." |

#### Success State
- Account created, JWT token received.
- Redirect to `/onboarding/create-org` (must create or join an org before accessing app).

### User Actions

| Action | Trigger | Result |
|--------|---------|--------|
| Submit | Click "Create Account" | POST /auth/register |
| Real-time password check | Type in confirm field | Inline match indicator |
| Navigate to login | Click "Sign In" link | Navigate to `/login` |

### Permissions
Public — authenticated users redirected to `/dashboard`.

---

## S-03: Forgot Password

**Route**: `/forgot-password`  
**Layout**: `auth`

### Goal
Allow users who have forgotten their password to request a password reset link via email.

### Components

| Component | Purpose |
|-----------|---------|
| `FormCard` | Outer glass card |
| `Input` (email) | Email address field |
| `Button` (primary) | "Send Reset Link" |
| `Button` (ghost) | "Back to Sign In" |
| `AlertBanner` | Success or error messages |

### API Dependencies

| Call | Method | Endpoint | Trigger |
|------|--------|---------|---------|
| Request reset | `POST` | `/auth/forgot-password` | Form submit |

### States

#### Loading State
Button: "Sending...", spinner, disabled.

#### Error State

| Error | Message |
|-------|---------|
| Email not found | "If this email is registered, you'll receive a reset link shortly." *(intentional vague — security)* |
| Server error | "Could not send reset link. Please try again." |

#### Success State
- Form replaced by a success message card:
```
[CheckCircle icon, green, 48px]
"Reset link sent!"
"Check your inbox at {email} for a password reset link."
"Didn't receive it? [Resend →]"
[← Back to Sign In]
```
- Resend button has a `60s` cooldown (countdown displayed: "Resend in 57s").

### User Actions

| Action | Trigger | Result |
|--------|---------|--------|
| Submit | Click "Send Reset Link" | POST /auth/forgot-password |
| Back to login | Click "Back to Sign In" | Navigate to `/login` |
| Resend (after success) | Click "Resend" | POST /auth/forgot-password again (after cooldown) |

### Permissions
Public only.

---

## S-04: Reset Password

**Route**: `/reset-password?token={token}`  
**Layout**: `auth`

### Goal
Allow users to set a new password using the reset token from their email.

### Components

| Component | Purpose |
|-----------|---------|
| `FormCard` | Outer glass card |
| `Input` (new password) | New password with strength bar |
| `Input` (confirm password) | Confirm new password |
| `Button` (primary) | "Reset Password" |
| `AlertBanner` | Error messages |

### API Dependencies

| Call | Method | Endpoint | Trigger |
|------|--------|---------|---------|
| Validate token | `GET` | `/auth/reset-password/validate?token=` | On page load |
| Reset password | `POST` | `/auth/reset-password` | Form submit |

### States

#### Loading State (Token Validation on Mount)
Full card shows skeleton while token validates.

#### Error State (Invalid / Expired Token)
- Shown immediately after failed token validation:
```
[AlertTriangle icon, 40px, amber]
"This reset link has expired or is invalid."
"Request a new reset link to continue."
[Request New Link →]
```
- "Request New Link" navigates to `/forgot-password`.

#### Error State (Form Submit)

| Error | Message |
|-------|---------|
| Passwords don't match | Inline: "Passwords do not match" |
| Token expired mid-session | "Link expired. Request a new one." |
| Server error | "Password reset failed. Please try again." |

#### Success State
- Form replaced by success message:
```
[CheckCircle icon, green]
"Password reset successfully!"
"You can now sign in with your new password."
[→ Sign In]
```

### User Actions

| Action | Trigger | Result |
|--------|---------|--------|
| Page load | URL with token visited | GET /auth/reset-password/validate |
| Submit | Click "Reset Password" | POST /auth/reset-password |
| Navigate to sign in | Click "Sign In" after success | Navigate to `/login` |

### Permissions
Public only. Token validity verified server-side.

---

## S-05: Create Organization

**Route**: `/onboarding/create-org`  
**Layout**: `auth` (single-card, centered)

### Goal
Force new users to either create a new organization or join an existing one before entering the app. The organization is the root container for all data.

### Components

| Component | Purpose |
|-----------|---------|
| `FormCard` | Glass card |
| `RadioGroup` | "Create new org" vs "Join existing org" toggle |
| `Input` (org name) | Organization name (shown for "create" option) |
| `Input` (invite code) | 6-character invite code (shown for "join" option) |
| `Button` (primary) | "Create Organization" or "Join Organization" |
| `AlertBanner` | Errors |

### API Dependencies

| Call | Method | Endpoint | Trigger |
|------|--------|---------|---------|
| Create org | `POST` | `/organizations` | Submit (create mode) |
| Join org | `POST` | `/organizations/join` | Submit (join mode) |

**Create request**: `{ name: string }`  
**Join request**: `{ inviteCode: string }`

### States

#### Loading State
Button: "Creating..." or "Joining...", spinner, disabled.

#### Error State

| Error | Message |
|-------|---------|
| Org name too short | "Organization name must be at least 2 characters." |
| Name already taken | "This organization name is taken. Try a different one." |
| Invalid invite code | "This invite code is invalid or has expired." |
| Server error | "Could not create organization. Please try again." |

#### Success State
- Redirect to `/dashboard` immediately.
- First-time dashboard shows onboarding banner.

### User Actions

| Action | Trigger | Result |
|--------|---------|--------|
| Select create/join | RadioGroup change | Form fields swap |
| Submit create | Click "Create Organization" | POST /organizations |
| Submit join | Click "Join Organization" | POST /organizations/join |

### Permissions
Authenticated user with NO organization membership only.  
Users with an org are redirected to `/dashboard`.

---

---

# MAIN APPLICATION SCREENS

---

## S-06: Dashboard

**Route**: `/dashboard`  
**Layout**: `app`

### Goal
Give the user an instant overview of their workspace health, lead pipeline, campaign performance, AI recommendations, and team activity.

### Components

| Component | Usage |
|-----------|-------|
| `PageHeader` | "Analytics Overview" + Refresh button |
| `MetricCard` × 4 | Total Leads, Emails Sent, Open Rate, Reply Rate |
| `ChartWidget` | Performance Chart (open rate + reply rate trends) |
| `TabBar` | Chart time range selector (7D / 30D / 90D) |
| `WidgetCard` | Quick Actions, Lead Pipeline, Campaign Summary, AI Insights, Recent Activity, Team Activity |
| `ProgressBar` | Onboarding checklist + campaign progress bars |
| `ActivityFeed` | Recent Activity widget |
| `ScoreBadge` | Top leads in Lead Pipeline |
| `StatusBadge` | Campaign status chips |
| `Skeleton` × multiple | Per-widget loading states |
| `EmptyState` × multiple | Per-widget empty states |
| `OnboardingChecklist` | First-time user banner |
| `AlertBanner` | Per-widget error states |
| `Toast` | "Dashboard refreshed" after manual refresh |

### API Dependencies

| Widget | Endpoint | Method |
|--------|---------|--------|
| KPI Cards | `GET /analytics/dashboard` | `GET` |
| Lead Pipeline | `GET /analytics/leads` | `GET` |
| Campaign Summary | `GET /analytics/campaigns` | `GET` |
| Performance Chart | `GET /analytics/trends?range={range}` | `GET` |
| Recent Activity | `GET /activities?limit=20` | `GET` |
| AI Insights | `GET /ai/insights` | `GET` |
| Team Activity | `GET /team/activity` | `GET` |
| Onboarding State | `GET /organizations/onboarding` | `GET` |

All 8 calls fire in parallel on page mount.

### Empty State
Per-widget empty states as defined in [DASHBOARD_V2.md](./DASHBOARD_V2.md) §11.  
Full org empty state: Onboarding banner shown at top.

### Loading State
Each widget renders skeleton independently.  
KPI cards: 4 skeleton cards.  
Chart: 200px shimmer block.  
Activity feed: 5 skeleton rows.

### Error State
Per-widget error states with individual [↻ Retry] buttons.  
If all calls fail: Page-level error banner at top of canvas.

### Success State
All widgets render with live data after API resolution.  
Refresh button shows "Dashboard updated just now" toast.

### User Actions

| Action | Result |
|--------|--------|
| Click "Total Leads" card | Navigate to `/leads` |
| Click "Emails Sent" card | Navigate to `/campaigns` |
| Click pipeline status bar | Navigate to `/leads?status={status}` |
| Click top lead row | Navigate to `/leads/:id` |
| Click campaign card | Navigate to `/campaigns/:id` |
| Click activity item | Navigate to entity page |
| Click AI Insights CTA | Open AI panel or navigate to `/ai/*` |
| Click Quick Action button | Navigate to respective creation page |
| Click time range tab | Re-fetch chart data with new range |
| Click Refresh | Re-fire all 8 API calls |
| Click "View All →" links | Navigate to respective list pages |
| Complete onboarding step | Navigate to step destination |

### Permissions
All authenticated users with an organization.

---

## S-07: Lead List

**Route**: `/leads`  
**Layout**: `app`

### Goal
Display all leads in the organization. Allow searching, filtering by status/tag/score, and provide quick actions to add leads or navigate to lead detail.

### Components

| Component | Usage |
|-----------|-------|
| `PageHeader` | "Leads Management" + "Dashboard" + "+ Add Lead" actions |
| `Breadcrumb` | No breadcrumb (top-level page) |
| `Input` (search) | Real-time lead search (name, email, company) |
| `Select` (status filter) | Filter by status |
| `Select` (tag filter) | Filter by tag |
| `Select` (score filter) | Filter by score range |
| `Button` | "Import Leads" secondary action |
| `DataTable` | Lead rows |
| `TableRow` | Individual lead row |
| `StatusBadge` | Lead status column |
| `ScoreBadge` | AI score column |
| `TagPill` | Tags column (first 2 tags visible, "+N more" if more) |
| `EmptyState` | No leads |
| `Skeleton` | Table loading |
| `Pagination` | Below table |
| `Toast` | "Lead deleted" after deletion |

### API Dependencies

| Call | Method | Endpoint | Trigger |
|------|--------|---------|---------|
| Fetch leads | `GET` | `/leads?page=&limit=&status=&search=&tag=&minScore=&maxScore=&sortBy=&desc=` | Page mount, filter change |
| Delete lead | `DELETE` | `/leads/:id` | Confirm delete |
| Export leads | `GET` | `/leads/export?format=csv` | Click "Export" |

### Table Columns

| Column | Width | Content |
|--------|-------|---------|
| Name | `2fr` | Full name (bold) + email (secondary) |
| Company | `1fr` | Company name |
| Status | `1fr` | `StatusBadge` |
| AI Score | `80px` | `ScoreBadge` |
| Tags | `1fr` | `TagPill` list (max 2) |
| Campaign | `1fr` | Active campaign name or "—" |
| Created | `1fr` | Relative date |
| Actions | `120px` | Edit + Delete icon buttons |

### Empty State

```
[Users icon, 48px, muted]
"No leads yet"
"Add your first lead manually or import from a CSV file."
[+ Add Lead]   [↑ Import CSV]
```

### Loading State
5 skeleton rows matching the table column structure.

### Error State

```
[AlertTriangle icon]
"Could not load leads"
[↻ Retry]
```

### Success State
Paginated table populated with lead data.  
After search: filtered results update in real-time (300ms debounce).  
After delete: row removed with fade-out animation, "Lead deleted" toast shown.

### User Actions

| Action | Result |
|--------|--------|
| Click row | Navigate to `/leads/:id` |
| Click "+ Add Lead" | Navigate to `/leads/new` |
| Click "Import Leads" | Navigate to `/leads/import` |
| Type in search box | Filter leads (300ms debounce API call) |
| Change status filter | Re-fetch leads with status param |
| Click sort column header | Toggle ascending/descending sort |
| Click "Export" | Download CSV of current filtered results |
| Click Edit icon | Navigate to `/leads/:id/edit` |
| Click Delete icon | Open confirmation modal → DELETE /leads/:id |
| Change page | Fetch new page |

### Permissions
All authenticated org members.  
Delete: restricted to `Owner` and `Admin` roles.

---

## S-08: Import Leads

**Route**: `/leads/import`  
**Layout**: `app`

### Goal
Allow users to import leads in bulk via CSV file upload. The import wizard validates, maps columns, previews data, and reports success/failure.

### Components

| Component | Usage |
|-----------|-------|
| `Breadcrumb` | "Leads / Import Leads" |
| `PageHeader` | "Import Leads" |
| `StepWizard` | 3-step import flow |
| `WidgetCard` | Each step card |
| `Button` | File upload trigger (Step 1) |
| `Select` (column mapping) × N | One per detected CSV column (Step 2) |
| `DataTable` (preview) | First 5 rows preview (Step 2) |
| `TagPill` | Tags to assign to imported leads |
| `Select` (status) | Default status for imported leads |
| `ProgressBar` | Import progress during processing |
| `AlertBanner` | Validation errors, partial import warnings |

### Import Wizard Steps

**Step 1: Upload File**
- Drag-and-drop zone OR click to browse
- Accepted formats: `.csv`, `.xlsx`
- Max file size: `10MB`
- On file selected: file name shown, "Continue →" enabled

**Step 2: Map Columns**
- Table showing first 5 rows of CSV
- Per-column dropdown mapping CSV header → Lead field
- Required fields: `Email` — must be mapped
- Optional fields: `First Name`, `Last Name`, `Company`, `Job Title`, `Phone`, `Website`, `LinkedIn URL`
- Unmapped columns: skipped silently
- Duplicate email detection preview: "N rows have duplicate emails — last row will be used"

**Step 3: Options + Confirm**
- Default status selector (New / Contacted / Qualified)
- Tags to apply to all imported leads (multi-select tag input)
- "Update existing leads if email matches" toggle
- Summary: "Ready to import N leads"
- "Start Import" button

### API Dependencies

| Call | Method | Endpoint | Trigger |
|------|--------|---------|---------|
| Upload + Parse | `POST` | `/leads/import/parse` | File selected (Step 1) |
| Start import | `POST` | `/leads/import` | "Start Import" (Step 3) |
| Import status | `GET` | `/leads/import/:jobId/status` | Polling during processing |

### States

#### Loading State
- Step 1 → 2 transition: "Parsing file..." spinner overlay on step card.
- Step 3 processing: Progress bar shows import job progress (polled every 2s).

#### Empty State
Not applicable — wizard is always populated by user action.

#### Error State

| Error | Message |
|-------|---------|
| File too large | "File exceeds the 10MB limit. Please use a smaller file." |
| Invalid format | "Only .csv and .xlsx files are supported." |
| No email column mapped | "You must map at least one column to Email to continue." |
| 0 valid rows | "No valid rows found in this file. Check for required headers." |
| Import partially failed | `AlertBanner` (warning): "N leads imported, M rows failed. Download error log." |
| Import fully failed | `AlertBanner` (error): "Import failed. Please check your file format." |

#### Success State
After import completes:
```
[CheckCircle, green, 48px]
"Import complete!"
"N leads were successfully imported."
[View Imported Leads →]   [Import Another File]
```
- "View Imported Leads" navigates to `/leads?importedAt={jobId}`.

### User Actions

| Action | Result |
|--------|--------|
| Upload file | POST /leads/import/parse |
| Map columns | Update mapping state |
| Toggle "Update existing" | Boolean state change |
| Add tags | Add tag to import options |
| Click "Start Import" | POST /leads/import |
| Click "Download Error Log" | Download failed rows as CSV |
| Click "View Imported Leads" | Navigate to filtered leads |

### Permissions
Owner, Admin, Member (all roles can import).

---

## S-09: Add Lead

**Route**: `/leads/new`  
**Layout**: `app`

### Goal
Allow users to manually create a new lead with full profile details.

### Components

| Component | Usage |
|-----------|-------|
| `Breadcrumb` | "Leads / Add New Lead" |
| `PageHeader` | "Add New Lead" |
| `FormCard` | Glass form container |
| `FormRow` | First Name + Last Name |
| `Input` × 6 | Email, Phone, Job Title, Company, Website URL, LinkedIn URL |
| `Select` (status) | Lead status (default: New) |
| `Select` (tag) | Multi-select tag assignment |
| `Textarea` | Notes (optional, initial note) |
| `Button` (primary) | "Save Lead" |
| `Button` (secondary) | "Cancel" (navigate back) |
| `AlertBanner` | Submission errors |

### API Dependencies

| Call | Method | Endpoint | Trigger |
|------|--------|---------|---------|
| Create lead | `POST` | `/leads` | Form submit |
| Fetch tags | `GET` | `/tags` | Page mount |

**Request body**: `{ firstName, lastName, email, phone, jobTitle, company, website, linkedinUrl, status, tags, notes }`

### Validation Rules (Client-side)

| Field | Rule |
|-------|------|
| First Name | Required, min 1 char |
| Last Name | Required, min 1 char |
| Email | Required, valid email format |
| Phone | Optional, must match phone pattern if provided |
| Website | Optional, must start with `http://` or `https://` if provided |
| LinkedIn URL | Optional, must match `linkedin.com/in/` pattern if provided |

### States

#### Loading State
"Save Lead" button: "Saving...", spinner, disabled.

#### Error State

| Error | Message |
|-------|---------|
| Email already exists | "A lead with this email already exists. View that lead?" (with link) |
| Missing required field | Inline field validation error |
| Server error | `AlertBanner`: "Could not save lead. Please try again." |

#### Success State
- Lead created successfully.
- Toast: "Lead created ✓"
- Navigate to `/leads/:id` (new lead's detail page).

### User Actions

| Action | Result |
|--------|--------|
| Submit | POST /leads |
| Click "Cancel" | Navigate to `/leads` |
| Add tag | Tag added to selection |

### Permissions
All authenticated org members.

---

## S-10: Lead Detail

**Route**: `/leads/:id`  
**Layout**: `app`

### Goal
Display the complete profile of a single lead, including contact info, AI score, tags, campaign history, activity timeline, tasks, and notes. Central hub for managing an individual lead's lifecycle.

### Components

| Component | Usage |
|-----------|-------|
| `Breadcrumb` | "Leads / {Lead Name}" |
| `PageHeader` | Lead name (gradient) + "Edit" + "Delete" actions |
| `Avatar` | Lead initials/photo, large (64px) |
| `ScoreBadge` | AI score, large (48px) |
| `StatusBadge` | Lead status |
| `TagPill` × N | Tags (with remove option) |
| `TabBar` | "Overview" / "Activity" / "Tasks" tabs |
| `WidgetCard` | Contact info card, Campaign history card |
| `ActivityFeed` | Activity tab content |
| `DataTable` | Tasks tab — task list |
| `Button` | "Generate Email", "Run AI Audit", "Add Task", "Add Note" |
| `Modal` | Add Task, Add Note, Delete Confirmation |
| `AlertBanner` | AI audit result, enrichment status |
| `Skeleton` | Loading state per section |
| `EmptyState` | Empty activity, empty tasks |

### Tab Structure

**Overview Tab**

```
Left column (60% width):
  Contact Information card (email, phone, company, website, LinkedIn)
  Campaign History card (list of campaigns this lead participated in)

Right column (40% width):
  AI Score card (score + breakdown + last scored date)
  Quick Actions card (Generate Email, Run Website Audit)
  Tags card (all tags + add tag input)
```

**Activity Tab**
Full-width `ActivityFeed` with all events related to this specific lead (email events, notes, task changes, status changes).

**Tasks Tab**
Full-width `DataTable` of tasks assigned to or related to this lead.

### API Dependencies

| Call | Method | Endpoint | Trigger |
|------|--------|---------|---------|
| Fetch lead | `GET` | `/leads/:id` | Page mount |
| Fetch activity | `GET` | `/leads/:id/activity` | Activity tab open |
| Fetch tasks | `GET` | `/leads/:id/tasks` | Tasks tab open |
| Fetch campaigns | `GET` | `/leads/:id/campaigns` | Overview tab |
| Update status | `PATCH` | `/leads/:id` | Status dropdown change |
| Add tag | `POST` | `/leads/:id/tags` | Tag add |
| Remove tag | `DELETE` | `/leads/:id/tags/:tagId` | Tag remove (×) |
| Delete lead | `DELETE` | `/leads/:id` | Delete confirm |
| Create task | `POST` | `/tasks` | Add Task modal submit |
| Create note | `POST` | `/notes` | Add Note modal submit |

### States

#### Loading State
Skeleton for hero section (avatar + name + score + status).  
Tab content skeleton on tab change.

#### Error State (Lead not found)
Render `ErrorState` (type: `notFound`):
```
"This lead doesn't exist or has been deleted."
[← Back to Leads]
```

#### Empty State

| Section | Empty State |
|---------|------------|
| Activity | "No activity on this lead yet" |
| Tasks | "No tasks for this lead" — [+ Add Task] |
| Campaign history | "This lead has not been added to any campaigns" |

#### Success State
Full lead profile rendered.  
Status change: immediate UI update + PATCH API call.  
Tag removed: pill disappears with fade, DELETE API call.  
Note/Task added: feed updates with new item.

### User Actions

| Action | Result |
|--------|--------|
| Click "Edit" | Navigate to `/leads/:id/edit` |
| Click "Delete" | Open delete confirmation modal → DELETE /leads/:id → Navigate to `/leads` |
| Change status (dropdown) | PATCH /leads/:id |
| Add tag | POST /leads/:id/tags |
| Remove tag (×) | DELETE /leads/:id/tags/:tagId |
| Click "Generate Email" | Open AI panel in email generation mode |
| Click "Run AI Audit" | POST /ai/website-audit (for this lead) |
| Click "Add Task" | Open Add Task modal |
| Click "Add Note" | Open Add Note modal |
| Switch tabs | Lazy-load tab content |

### Permissions
All authenticated org members.  
Delete: Owner and Admin only.

---

## S-11: Edit Lead

**Route**: `/leads/:id/edit`  
**Layout**: `app`

### Goal
Allow users to update any field of an existing lead's profile.

### Components
Same as `S-09: Add Lead` with these differences:
- All fields pre-filled with existing lead data
- Button label: "Update Lead"
- Added: "Save & View Lead" as secondary action

### API Dependencies

| Call | Method | Endpoint | Trigger |
|------|--------|---------|---------|
| Fetch lead (pre-fill) | `GET` | `/leads/:id` | Page mount |
| Update lead | `PATCH` | `/leads/:id` | Form submit |

### States

#### Loading State
Form shows skeleton while `GET /leads/:id` resolves.

#### Error State
Same as Add Lead, plus: "Lead not found" if ID doesn't exist.

#### Success State
Toast: "Lead updated ✓"  
Navigate to `/leads/:id`.

### User Actions

| Action | Result |
|--------|--------|
| Submit | PATCH /leads/:id |
| Click "Cancel" | Navigate to `/leads/:id` (no changes) |

### Permissions
All authenticated org members.

---

## S-12: Segments

**Route**: `/segments`  
**Layout**: `app`

### Goal
Allow users to define named, reusable dynamic filters (segments) over their lead database. Segments power campaign audience targeting.

### Components

| Component | Usage |
|-----------|-------|
| `PageHeader` | "Segments" + "New Segment" button |
| `DataTable` | Segments list |
| `StatusBadge` | Segment status (Active / Empty) |
| `Button` | "New Segment" |
| `Modal` | Segment Builder (create/edit) |
| `Select` × N | Filter rule field selectors |
| `Input` | Filter rule value inputs |
| `ProgressBar` | Lead count preview bar |
| `EmptyState` | No segments |
| `Skeleton` | Loading |

### Segment Builder Modal

```
Rule builder (AND logic between rules):
[FIELD ▾]  [OPERATOR ▾]  [VALUE]   [× Remove]
[FIELD ▾]  [OPERATOR ▾]  [VALUE]   [× Remove]
[+ Add Rule]

Preview: "This segment matches 48 leads"  [progress bar]

[Save Segment]  [Cancel]
```

Filter fields: Status, Score, Tags, Company, Job Title, Country, Created Date, Last Activity Date.  
Operators: is, is not, contains, does not contain, greater than, less than.

### API Dependencies

| Call | Method | Endpoint | Trigger |
|------|--------|---------|---------|
| Fetch segments | `GET` | `/segments` | Page mount |
| Preview count | `POST` | `/segments/preview` | Rule change (500ms debounce) |
| Create segment | `POST` | `/segments` | Save |
| Update segment | `PATCH` | `/segments/:id` | Save (edit mode) |
| Delete segment | `DELETE` | `/segments/:id` | Confirm delete |

### States

#### Empty State
```
[Filter icon, 48px, muted]
"No segments defined"
"Segments help you target the right leads in your campaigns."
[+ Create Segment]
```

#### Loading State
3 skeleton rows.

#### Error State
Table error with [↻ Retry].

#### Success State
After save: Modal closes, segment appears in table, Toast: "Segment saved ✓".  
After delete: Row removed, Toast: "Segment deleted".

### User Actions

| Action | Result |
|--------|--------|
| Click "New Segment" | Open segment builder modal |
| Add/change rule | POST /segments/preview (debounced) — updates count |
| Save | POST or PATCH /segments |
| Click Edit (row) | Open modal pre-filled with segment rules |
| Click Delete | Confirm modal → DELETE /segments/:id |

### Permissions
All authenticated org members.  
Delete: Owner and Admin.

---

---

# CAMPAIGN SCREENS

---

## S-13: Campaign List

**Route**: `/campaigns`  
**Layout**: `app`

### Goal
Display all campaigns with status filters. Allow users to navigate to campaign detail, create new campaigns, or perform quick status actions (pause, resume, stop).

### Components

| Component | Usage |
|-----------|-------|
| `PageHeader` | "Campaigns" + "New Campaign" button |
| `TabBar` | Status filter: All / Active / Draft / Paused / Completed |
| `DataTable` | Campaign rows |
| `StatusBadge` | Campaign status |
| `ProgressBar` | Lead progress per campaign |
| `EmptyState` | No campaigns per status |
| `Skeleton` | Loading |
| `Modal` | Pause / Stop confirmation |
| `Toast` | Action feedback |

### Table Columns

| Column | Content |
|--------|---------|
| Name | Campaign name + creation date |
| Status | `StatusBadge` |
| Audience | Segment name + lead count |
| Progress | `ProgressBar` (completed/total leads) |
| Open Rate | Percentage |
| Reply Rate | Percentage |
| Sequence | Linked sequence name |
| Actions | Pause/Resume, Stop, View buttons |

### API Dependencies

| Call | Method | Endpoint | Trigger |
|------|--------|---------|---------|
| Fetch campaigns | `GET` | `/campaigns?status=&page=&limit=` | Page mount, tab change |
| Pause campaign | `PATCH` | `/campaigns/:id/pause` | Pause click + confirm |
| Resume campaign | `PATCH` | `/campaigns/:id/resume` | Resume click |
| Stop campaign | `PATCH` | `/campaigns/:id/stop` | Stop click + confirm |
| Delete draft | `DELETE` | `/campaigns/:id` | Delete (Draft only) |

### Empty State (per tab)

| Tab | Empty State |
|-----|------------|
| All | "No campaigns yet — [+ Create Campaign]" |
| Active | "No active campaigns — all caught up!" |
| Draft | "No drafts saved" |
| Paused | "No paused campaigns" |
| Completed | "No completed campaigns yet" |

### Loading State
5 skeleton rows.

### Error State
Table error with [↻ Retry].

### Success State
Populated table. Status changes reflect immediately in the row.

### User Actions

| Action | Result |
|--------|--------|
| Click row | Navigate to `/campaigns/:id` |
| Click "New Campaign" | Navigate to `/campaigns/new` |
| Switch tab | Re-fetch with new status filter |
| Click "Pause" | Confirm modal → PATCH /campaigns/:id/pause |
| Click "Resume" | PATCH /campaigns/:id/resume (no confirm) |
| Click "Stop" | Confirm modal → PATCH /campaigns/:id/stop |
| Click "Delete" (Draft only) | Confirm modal → DELETE /campaigns/:id |

### Permissions
All org members.  
Pause/Stop/Delete: Owner and Admin.

---

## S-14: New Campaign Wizard

**Route**: `/campaigns/new`  
**Layout**: `app`

### Goal
Guide the user through a 6-step wizard to create and launch a campaign.

### Components

| Component | Usage |
|-----------|-------|
| `Breadcrumb` | "Campaigns / New Campaign" |
| `StepWizard` | 6-step container |
| `WidgetCard` | Each step card |
| Various form components | Per step (see below) |

### Wizard Steps

**Step 1: Campaign Name**
- `Input`: Campaign name (required)
- `Textarea`: Campaign description (optional)

**Step 2: Select Audience**
- `Select`: Choose segment (dropdown of all saved segments)
- Lead count preview: "This segment has N leads"
- Link to `/segments` to create a new segment

**Step 3: Select Sequence**
- `Select`: Choose sequence (dropdown of all Active sequences)
- Sequence preview: step count, estimated duration
- Link to `/sequences/new` to create a new sequence

**Step 4: Select Email Account**
- Radio cards showing connected email accounts
- Account name, provider icon, daily send limit shown
- Warning if no accounts connected → link to `/settings/email-accounts`

**Step 5: Schedule**
- `RadioGroup`: "Start immediately" vs "Schedule for later"
- `Input` (date): Start date (shown if schedule option)
- `Input` (time): Start time (shown if schedule option)
- `Select`: Timezone

**Step 6: Review & Launch**
- Summary of all selections (read-only)
- "Launch Campaign" button (primary)
- "Save as Draft" button (secondary)
- `AlertBanner`: Any warnings (e.g., "Sending 60 leads immediately — confirm?")

### API Dependencies

| Call | Method | Endpoint | Trigger |
|------|--------|---------|---------|
| Fetch segments | `GET` | `/segments` | Step 2 mount |
| Fetch sequences | `GET` | `/sequences?status=Active` | Step 3 mount |
| Fetch email accounts | `GET` | `/mail-accounts` | Step 4 mount |
| Create campaign (draft) | `POST` | `/campaigns` | "Save as Draft" |
| Launch campaign | `POST` | `/campaigns` + `PATCH /campaigns/:id/launch` | "Launch Campaign" |

### States

#### Loading State (step content)
Each step card shows skeleton while its data loads.

#### Error State

| Step | Error | Message |
|------|-------|---------|
| Step 2 | No segments | "No segments created — [Create Segment]" |
| Step 3 | No active sequences | "No active sequences — [Create Sequence]" |
| Step 4 | No email accounts | "No email accounts connected — [Connect Email Account]" |
| Step 6 | Launch fails | `AlertBanner` (error): "Campaign could not be launched. {server message}" |

#### Success State
- Draft: Toast "Campaign saved as draft", navigate to `/campaigns/:id`.
- Launch: Toast "Campaign launched! 🚀", navigate to `/campaigns/:id`.

### User Actions

| Action | Result |
|--------|--------|
| Click "Next" | Validate step, advance |
| Click "Back" | Return to previous step |
| Click "Save as Draft" | POST /campaigns (status: Draft), navigate to detail |
| Click "Launch Campaign" | POST then PATCH /campaigns/:id/launch |

### Permissions
All org members.

---

## S-15: Campaign Detail

**Route**: `/campaigns/:id`  
**Layout**: `app`

### Goal
Display full metrics and lead-by-lead progress for a single campaign. Allow status control (pause, resume, stop).

### Components

| Component | Usage |
|-----------|-------|
| `Breadcrumb` | "Campaigns / {Campaign Name}" |
| `PageHeader` | Campaign name + status actions |
| `StatusBadge` | Current status |
| `MetricCard` × 4 | Sent, Opened, Replied, Bounced |
| `ChartWidget` | Delivery timeline chart |
| `TabBar` | "Leads" / "Analytics" / "Settings" tabs |
| `DataTable` | Lead-by-lead status table |
| `ProgressBar` | Overall campaign progress |
| `AlertBanner` | Campaign error messages |

### Lead Status Table Columns

| Column | Content |
|--------|---------|
| Lead | Name + email |
| Status | Contacted / Replied / Bounced / Completed |
| Step | Current sequence step |
| Last Event | Last email event (Opened, Replied, etc.) |
| Last Event At | Relative timestamp |

### API Dependencies

| Call | Method | Endpoint | Trigger |
|------|--------|---------|---------|
| Fetch campaign | `GET` | `/campaigns/:id` | Page mount |
| Fetch campaign leads | `GET` | `/campaigns/:id/leads?page=&limit=` | Leads tab |
| Fetch analytics | `GET` | `/campaigns/:id/analytics` | Analytics tab |
| Pause | `PATCH` | `/campaigns/:id/pause` | Pause button |
| Resume | `PATCH` | `/campaigns/:id/resume` | Resume button |
| Stop | `PATCH` | `/campaigns/:id/stop` | Stop button |

### States

#### Loading State
Skeleton for hero metrics, then table skeleton on tab load.

#### Error State
Campaign not found: `ErrorState` (notFound).  
Data load fail: per-section error with retry.

#### Empty State (Lead table)
"No leads in this campaign." — (shouldn't occur if campaign was launched correctly).

#### Success State
Full campaign detail page with live metrics.

### User Actions

| Action | Result |
|--------|--------|
| Click "Pause" | Confirm → PATCH pause |
| Click "Resume" | PATCH resume (no confirm) |
| Click "Stop" | Confirm → PATCH stop |
| Switch tab | Lazy-load tab data |
| Click lead row | Navigate to `/leads/:id` |

### Permissions
All org members.  
Control actions (Pause/Stop): Owner and Admin.

---

---

# SEQUENCE SCREENS

---

## S-16: Sequence List

**Route**: `/sequences`  
**Layout**: `app`

### Goal
List all email sequences. Allow users to view, create, edit, and delete sequences.

### Components

| Component | Usage |
|-----------|-------|
| `PageHeader` | "Sequences" + "New Sequence" |
| `DataTable` | Sequences list |
| `StatusBadge` | Sequence status |
| `EmptyState` | No sequences |
| `Skeleton` | Loading |
| `Modal` | Delete confirmation |
| `Toast` | Action feedback |

### Table Columns

| Column | Content |
|--------|---------|
| Name | Sequence name + created date |
| Status | Active / Draft / Archived |
| Steps | Step count + estimated duration |
| Campaigns | # campaigns using this sequence |
| Stop on Reply | ✓ / ✗ indicator |
| Actions | Edit, Duplicate, Delete |

### API Dependencies

| Call | Method | Endpoint | Trigger |
|------|--------|---------|---------|
| Fetch sequences | `GET` | `/sequences` | Page mount |
| Delete | `DELETE` | `/sequences/:id` | Confirm |
| Duplicate | `POST` | `/sequences/:id/duplicate` | Duplicate click |

### States

**Empty**: "No sequences yet — [+ Create Sequence]"  
**Loading**: 3 skeleton rows.  
**Error**: Table error with retry.  
**Success**: Populated table.

### Permissions
All org members.  
Delete: Owner, Admin.

---

## S-17: Sequence Builder

**Route**: `/sequences/new`  
**Layout**: `app`

### Goal
Allow users to build a multi-step email sequence by composing EMAIL steps (template + subject line) and WAIT steps (delay in days).

### Components

| Component | Usage |
|-----------|-------|
| `Breadcrumb` | "Sequences / New Sequence" |
| `PageHeader` | "Create Sequence" |
| `Input` | Sequence name |
| `Toggle` | "Stop on Reply" option |
| `SequenceStepEditor` | Step builder area |
| `Button` | "Add Email Step", "Add Wait Step" |
| `Select` (per EMAIL step) | Prompt template selector |
| `Input` (per EMAIL step) | Subject line |
| `Input` (per WAIT step) | Wait duration (days) |
| `Button` (primary) | "Save Sequence" |
| `AlertBanner` | Validation/save errors |

### Step Structure

```
[EMAIL STEP]
  Subject: ___________
  Template: [Select template ▾]

  [↕] [✕]   ← reorder (future) and delete

[+WAIT 3 days]

[EMAIL STEP]
  Subject: ___________
  Template: [Select template ▾]

  [+] Add Step Below
```

### API Dependencies

| Call | Method | Endpoint | Trigger |
|------|--------|---------|---------|
| Fetch templates | `GET` | `/prompts` | Page mount |
| Save sequence | `POST` | `/sequences` | Submit |

### States

**Loading**: Template select shows skeleton/spinner while loading.  
**Empty step list**: "No steps yet — Add your first step" prompt.  
**Error**: AlertBanner on save failure.  
**Success**: Toast "Sequence saved ✓" → navigate to `/sequences/:id`.

### Permissions
All org members.

---

## S-18: Sequence Detail

**Route**: `/sequences/:id`  
**Layout**: `app`

### Goal
View a sequence's full step configuration. Allow editing (same components as builder, pre-filled).

### Components
Same as `S-17` with all fields pre-filled.  
Plus: "Campaigns using this sequence" section below the builder.

### API Dependencies

| Call | Method | Endpoint | Trigger |
|------|--------|---------|---------|
| Fetch sequence | `GET` | `/sequences/:id` | Page mount |
| Fetch templates | `GET` | `/prompts` | Page mount |
| Update sequence | `PATCH` | `/sequences/:id` | Save |

### States
**Loading**: Form skeleton.  
**Not found**: `ErrorState` (notFound).  
**Success**: Pre-filled form, save updates in place.

### Permissions
All org members.  
Edit/Delete: Owner, Admin.

---

---

# CRM SCREENS

---

## S-19: CRM Pipeline

**Route**: `/crm/pipeline`  
**Layout**: `app`

### Goal
Visual Kanban board displaying all leads organized by their current deal stage. Enables drag-and-drop stage management.

### Components

| Component | Usage |
|-----------|-------|
| `PageHeader` | "CRM Pipeline" + filter options |
| `KanbanBoard` | Full-page Kanban |
| `KanbanCard` | Per-lead deal card |
| `EmptyState` | Per-column empty |
| `Skeleton` | Loading |

### Kanban Columns

| Stage | Maps to Lead Status |
|-------|-------------------|
| New | `New` |
| Contacted | `Contacted` |
| Qualified | `Qualified` |
| Won | `Won` |
| Lost | `Lost` |

### API Dependencies

| Call | Method | Endpoint | Trigger |
|------|--------|---------|---------|
| Fetch pipeline | `GET` | `/leads?limit=200&sortBy=updatedAt` | Page mount |
| Move lead | `PATCH` | `/leads/:id` | Card drop |

### States

**Loading**: Skeleton cards per column.  
**Empty column**: Small placeholder text within column.  
**Error**: Full-board error state with retry.  
**Success**: Cards populated and draggable.

### Permissions
All org members.

---

## S-20: Tasks

**Route**: `/crm/tasks`  
**Layout**: `app`

### Goal
List all tasks across the organization. Allow creating, completing, and filtering tasks by status, assignee, and due date.

### Components

| Component | Usage |
|-----------|-------|
| `PageHeader` | "Tasks" + "Add Task" |
| `TabBar` | All / Due Today / Overdue / Completed |
| `DataTable` | Task rows |
| `Checkbox` | Task complete toggle |
| `StatusBadge` | Task status |
| `Avatar` | Assignee avatar |
| `Modal` | Add Task / Edit Task |
| `EmptyState` | No tasks |
| `Skeleton` | Loading |
| `Toast` | "Task completed" |

### Table Columns

| Column | Content |
|--------|---------|
| ✓ | Checkbox (mark complete) |
| Task | Task title |
| Lead | Linked lead name (link) |
| Assignee | `Avatar` + name |
| Due Date | Colored if overdue |
| Priority | Low / Medium / High badge |
| Status | Open / In Progress / Completed |
| Actions | Edit, Delete |

### API Dependencies

| Call | Method | Endpoint | Trigger |
|------|--------|---------|---------|
| Fetch tasks | `GET` | `/tasks?status=&due=&assignee=` | Mount, filter |
| Create task | `POST` | `/tasks` | Modal submit |
| Update task | `PATCH` | `/tasks/:id` | Edit / complete |
| Delete task | `DELETE` | `/tasks/:id` | Confirm |

### States

**Empty per tab**: Tab-specific empty states (e.g., "No overdue tasks — great job! ✓").  
**Loading**: 5 skeleton rows.  
**Success**: Table populated. Completing a task: row moves to "Completed" tab + toast.

### Permissions
All org members.

---

## S-21: Notes

**Route**: `/crm/notes`  
**Layout**: `app`

### Goal
View all notes across leads. Notes can also be viewed and created on the Lead Detail screen — this is the global notes view.

### Components

| Component | Usage |
|-----------|-------|
| `PageHeader` | "Notes" + "Add Note" |
| `Input` (search) | Search notes by content or lead name |
| `WidgetCard` | Each note card |
| `Avatar` | Author |
| `Modal` | Add Note modal |
| `EmptyState` | No notes |
| `Skeleton` | Loading |

### Note Card Layout

```
[Author Avatar 32px]  [Author Name]  ·  [Lead: John Doe →]      [2 days ago]
─────────────────────────────────────────────────────────────────────────────
[Note content text — full, no truncation]

[Edit]  [Delete]
```

### API Dependencies

| Call | Method | Endpoint | Trigger |
|------|--------|---------|---------|
| Fetch notes | `GET` | `/notes?search=&leadId=` | Mount, search |
| Create note | `POST` | `/notes` | Modal submit |
| Update note | `PATCH` | `/notes/:id` | Edit submit |
| Delete note | `DELETE` | `/notes/:id` | Confirm |

### States

**Empty**: "No notes yet — Add your first note".  
**Loading**: 3 skeleton note cards.  
**Success**: Note cards in reverse chronological order.

### Permissions
All org members.  
Edit/Delete own notes: all members.  
Edit/Delete others' notes: Owner, Admin.

---

---

# AI TOOLS SCREENS

---

## S-22: AI Website Audit

**Route**: `/ai/website-audit`  
**Layout**: `app`

### Goal
Run AI-powered website analysis for a lead's company. Extracts pain points, company overview, and ICP match signals to enrich lead profiles before outreach.

### Components

| Component | Usage |
|-----------|-------|
| `PageHeader` | "AI Website Audit" |
| `Input` (URL) | Website URL input |
| `Select` | Lead selector (optional — link result to a lead) |
| `Button` (primary) | "Run Audit" |
| `Spinner` | Large, during processing |
| `WidgetCard` | Result card per section |
| `AlertBanner` | Error message |
| `DataTable` | Audit history (previous runs) |

### Result Sections (after audit completes)

```
[Company Overview card]
  Industry, size estimate, primary product/service

[Pain Points card]
  3–7 identified challenges from website content

[ICP Match card]
  Score: High/Medium/Low + reasoning

[Suggested Talking Points card]
  3 personalized hooks for outreach

[Raw Summary card]
  AI-written paragraph summary
```

### API Dependencies

| Call | Method | Endpoint | Trigger |
|------|--------|---------|---------|
| Run audit | `POST` | `/ai/website-audit` | "Run Audit" click |
| Fetch audit history | `GET` | `/ai/website-audit/history` | Page mount |
| Fetch leads (for selector) | `GET` | `/leads?limit=50&search=` | Lead select input |

### States

#### Loading State
Large centered `Spinner` + "Analyzing website... this may take 15–30 seconds." text.

#### Error State

| Error | Message |
|-------|---------|
| Invalid URL | "Please enter a valid website URL." |
| Website unreachable | "Could not access this website. Check the URL or try again." |
| AI service error | "AI audit failed. Please try again in a moment." |
| Timeout | "The audit is taking longer than expected. Results will appear when ready." |

#### Empty State (No history)
"No previous audits. Run your first website audit above."

#### Success State
Results cards animate in sequentially with stagger (each card 100ms delay).  
If linked to a lead: Toast "Audit saved to {Lead Name}'s profile ✓".

### User Actions

| Action | Result |
|--------|--------|
| Enter URL + Click "Run Audit" | POST /ai/website-audit |
| Select lead (optional) | Links audit result to that lead |
| Click audit in history table | Re-displays that audit's results |
| Click "Save to Lead" (on results) | Links result to selected lead |
| Click "Copy Summary" | Copies raw summary text to clipboard |
| Click "Generate Email from Audit" | Navigate to `/ai/followup?leadId=` |

### Permissions
All org members.

---

## S-23: AI Follow-up Generator

**Route**: `/ai/followup`  
**Layout**: `app`

### Goal
Generate personalized follow-up email drafts for selected leads using AI, based on their profile, website audit results, and campaign context.

### Components

| Component | Usage |
|-----------|-------|
| `PageHeader` | "AI Follow-up Generator" |
| `Select` (lead) | Lead selector (searchable) |
| `Select` (template) | Prompt template selector |
| `Textarea` | Optional custom context notes |
| `Button` (primary) | "Generate Email" |
| `WidgetCard` | Generated email preview |
| `Button` | "Copy to Clipboard", "Regenerate", "Save to Lead" |
| `Spinner` | During generation |
| `AlertBanner` | Error state |
| `DataTable` | Generation history |

### Generated Email Preview

```
┌───────────────────────────────────────────────────────────────────┐
│  Subject: [Generated subject line]                                │
│  ─────────────────────────────────────────────────────────────── │
│  [Generated email body — full text, multi-paragraph]             │
│                                                                   │
│  [🗐 Copy]  [↺ Regenerate]  [💾 Save to Lead]                   │
└───────────────────────────────────────────────────────────────────┘
```

### API Dependencies

| Call | Method | Endpoint | Trigger |
|------|--------|---------|---------|
| Fetch leads | `GET` | `/leads?search=&limit=50` | Lead selector |
| Fetch templates | `GET` | `/prompts` | Template selector |
| Generate email | `POST` | `/ai/generate-email` | "Generate" click |
| Save to lead | `POST` | `/notes` (note attached to lead) | "Save to Lead" |
| Fetch history | `GET` | `/ai/generate-email/history` | Page mount |

### States

**Loading**: Spinner + "Generating email... this takes 5–15 seconds."  
**Error**: AlertBanner — "Generation failed. Try with a different template."  
**Empty (no lead selected)**: Form prompts to select a lead first.  
**Success**: Email card appears with copy/regenerate options.

### User Actions

| Action | Result |
|--------|--------|
| Select lead | Loads lead context (score, website, status) |
| Select template | Sets prompt context |
| Click "Generate Email" | POST /ai/generate-email |
| Click "Regenerate" | POST /ai/generate-email again (new result) |
| Click "Copy" | Clipboard copy + Toast "Copied ✓" |
| Click "Save to Lead" | POST /notes linked to lead |

### Permissions
All org members.

---

## S-24: AI Subject Optimizer

**Route**: `/ai/subjects`  
**Layout**: `app`

### Goal
Generate and test multiple subject line variants for email campaigns using AI. Returns open-rate predictions per variant.

### Components

| Component | Usage |
|-----------|-------|
| `PageHeader` | "Subject Line Optimizer" |
| `Input` | Original subject line input |
| `Select` | Target audience (segment) |
| `Input` (number) | Number of variants to generate (2–5) |
| `Button` (primary) | "Generate Variants" |
| `WidgetCard` | Per-variant result card |
| `Badge` | Predicted open rate label per variant |
| `Spinner` | During generation |

### Result Cards

```
[Variant 1]  "Quick question about {company}'s growth strategy"
             Predicted open rate: 38%  [High ●]
             [📋 Copy]

[Variant 2]  "Saw what you're doing at {company} — interesting"
             Predicted open rate: 31%  [Medium ●]
             [📋 Copy]
```

### API Dependencies

| Call | Method | Endpoint | Trigger |
|------|--------|---------|---------|
| Generate variants | `POST` | `/ai/subject-optimizer` | "Generate Variants" |
| Fetch history | `GET` | `/ai/subject-optimizer/history` | Page mount |

### States

**Loading**: Spinner + "Generating subject line variants..."  
**Error**: "Could not generate variants. Try again."  
**Success**: N variant cards with predicted rates and copy buttons.

### Permissions
All org members.

---

## S-25: AI Lead Scoring

**Route**: `/ai/scoring`  
**Layout**: `app`

### Goal
Run batch AI scoring across all un-scored (or all) leads. Shows scoring status and allows triggering rescoring.

### Components

| Component | Usage |
|-----------|-------|
| `PageHeader` | "AI Lead Scoring" |
| `MetricCard` × 3 | Total leads, Scored, Unscored |
| `Button` (primary) | "Score All Unscored Leads" |
| `Button` (secondary) | "Rescore All Leads" |
| `DataTable` | Lead score history |
| `ScoreBadge` | Per-lead score |
| `ProgressBar` | Scoring job progress |
| `Spinner` | During scoring |
| `AlertBanner` | Job status / errors |

### API Dependencies

| Call | Method | Endpoint | Trigger |
|------|--------|---------|---------|
| Fetch scoring stats | `GET` | `/ai/scoring/stats` | Page mount |
| Trigger scoring | `POST` | `/ai/scoring/run` | Button click |
| Fetch scoring history | `GET` | `/ai/scoring/history` | Page mount |
| Scoring job status | `GET` | `/ai/scoring/job/:jobId/status` | Polling |

### States

**Loading**: Skeleton for metric cards.  
**Scoring in progress**: Progress bar + "Scoring N leads..." + auto-poll every 3s.  
**Error**: "Scoring job failed. Try again."  
**Success**: Score stats update, toast "Scoring complete — N leads scored".

### Permissions
Owner and Admin only.

---

## S-26: Analytics

**Route**: `/analytics`  
**Layout**: `app`

### Goal
Full analytics view with multi-dimensional charts for leads, emails, campaigns, and team performance. The advanced version of the dashboard charts.

### Components

| Component | Usage |
|-----------|-------|
| `PageHeader` | "Analytics" + date range picker |
| `TabBar` | Overview / Emails / Campaigns / Leads / Team |
| `MetricCard` × N | Tab-specific KPIs |
| `ChartWidget` × multiple | Multiple chart types per tab |
| `Select` (campaign filter) | Filter charts by campaign |
| `DataTable` | Breakdown tables per section |
| `EmptyState` | No data for selected range |
| `Skeleton` | Per-chart loading |

### Tab Content

| Tab | Charts |
|-----|--------|
| Overview | All key metrics, multi-series trend |
| Emails | Delivery, open, click, reply, bounce over time |
| Campaigns | Per-campaign comparison table |
| Leads | Pipeline funnel chart, lead source breakdown |
| Team | Per-member activity chart (Owner/Admin only) |

### API Dependencies

| Call | Method | Endpoint | Trigger |
|------|--------|---------|---------|
| Overview stats | `GET` | `/analytics/overview?range=` | Overview tab |
| Email stats | `GET` | `/analytics/emails?range=&campaignId=` | Email tab |
| Campaign stats | `GET` | `/analytics/campaigns?range=` | Campaigns tab |
| Lead stats | `GET` | `/analytics/leads?range=` | Leads tab |
| Team stats | `GET` | `/analytics/team?range=` | Team tab |

### States

**Loading**: Per-chart skeleton.  
**Empty (no data in range)**: Per-chart empty state: "No data for this period."  
**Error**: Per-chart error with retry.  
**Success**: All charts rendered with data.

### Permissions
All org members.  
Team tab: Owner and Admin only.

---

---

# SETTINGS SCREENS

---

## S-27: Settings — Profile

**Route**: `/settings/profile`  
**Layout**: `app`

### Goal
Allow the user to update their personal profile (name, email, password).

### Components

| Component | Usage |
|-----------|-------|
| `PageHeader` | "Profile Settings" |
| `FormCard` | Profile form |
| `Avatar` | Current avatar (large, 80px) |
| `FormRow` | First Name + Last Name |
| `Input` | Email address |
| `Divider` | Between sections |
| `Input` (current password) | For password change |
| `Input` (new password) | With strength bar |
| `Input` (confirm new password) | Confirm |
| `Button` (primary) | "Save Profile" / "Change Password" |
| `AlertBanner` | Success / error |
| `Toast` | "Profile updated ✓" |

### API Dependencies

| Call | Method | Endpoint | Trigger |
|------|--------|---------|---------|
| Fetch user | `GET` | `/users/me` | Page mount |
| Update profile | `PATCH` | `/users/me` | Save |
| Change password | `PATCH` | `/users/me/password` | Change password submit |

### States

**Loading**: Form skeleton.  
**Error**: AlertBanner per field.  
**Success**: Toast "Profile saved ✓" (stays on page).

### Permissions
Any authenticated user (editing own profile only).

---

## S-28: Settings — Email Accounts

**Route**: `/settings/email-accounts`  
**Layout**: `app`

### Goal
Allow org admins to connect, manage, and test email sending accounts (Gmail, Outlook/M365, SendGrid, AWS SES, Resend).

### Components

| Component | Usage |
|-----------|-------|
| `PageHeader` | "Email Accounts" + "Connect Account" |
| `WidgetCard` per account | Connected account card |
| `StatusBadge` | Account health (Connected / Error / Disconnected) |
| `Toggle` | Set as default sender |
| `Button` | "Test Connection", "Disconnect" |
| `Modal` | Connect new account (provider selector + credentials) |
| `AlertBanner` | Connection error, test result |
| `EmptyState` | No accounts connected |

### Account Card Layout

```
[Provider Logo 24px]  [Account name / email address]  [Status badge]
                      SMTP: smtp.gmail.com · Port: 587
                      Daily limit: 200 emails
                      [Default ●]  [Test Connection]  [Disconnect]
```

### API Dependencies

| Call | Method | Endpoint | Trigger |
|------|--------|---------|---------|
| Fetch accounts | `GET` | `/mail-accounts` | Page mount |
| Connect account | `POST` | `/mail-accounts` | Modal submit |
| Test connection | `POST` | `/mail-accounts/:id/test` | Test button |
| Set default | `PATCH` | `/mail-accounts/:id` | Toggle |
| Disconnect | `DELETE` | `/mail-accounts/:id` | Confirm |

### Supported Providers

| Provider | Auth Method |
|---------|------------|
| Gmail (SMTP) | App password + SMTP credentials |
| Microsoft 365 | OAuth 2.0 (future) or SMTP credentials |
| SendGrid | API key |
| Amazon SES | Access key + secret |
| Resend | API key |

### States

**Empty**: "No email accounts connected — Connect one to start sending campaigns."  
**Loading**: Account card skeletons.  
**Test in progress**: "Testing..." spinner inside account card.  
**Test success**: AlertBanner (success): "Connection successful! Your account is ready."  
**Test failure**: AlertBanner (error): "Connection failed. {error message}"  
**Success (connect)**: New account card appears, Toast "Account connected ✓".

### Permissions
Owner and Admin only.

---

## S-29: Settings — Team

**Route**: `/settings/team`  
**Layout**: `app`

### Goal
Allow org owners to invite team members, assign roles, and remove members.

### Components

| Component | Usage |
|-----------|-------|
| `PageHeader` | "Team Members" + "Invite Member" |
| `DataTable` | Team member list |
| `Avatar` | Member avatar |
| `StatusBadge` | Member status (Active / Invited / Suspended) |
| `Select` | Role change dropdown per member |
| `Button` | "Revoke Invite", "Remove Member" |
| `Modal` | Invite Member modal |
| `Input` (email) | Invite email address |
| `Select` (role) | Role for invited member |
| `AlertBanner` | Invite success/error |

### Roles

| Role | Permissions |
|------|------------|
| Owner | Full access, billing, can delete org |
| Admin | Full access except billing and org deletion |
| Member | Can create/edit leads, sequences; no settings access |

### Table Columns

| Column | Content |
|--------|---------|
| Member | Avatar + Full Name + Email |
| Role | Role badge + edit dropdown (if owner) |
| Status | Active / Invited (pending) / Suspended |
| Joined | Date joined |
| Actions | Remove / Resend Invite |

### API Dependencies

| Call | Method | Endpoint | Trigger |
|------|--------|---------|---------|
| Fetch members | `GET` | `/organizations/members` | Page mount |
| Invite member | `POST` | `/organizations/invite` | Modal submit |
| Change role | `PATCH` | `/organizations/members/:id` | Role dropdown |
| Remove member | `DELETE` | `/organizations/members/:id` | Confirm |
| Resend invite | `POST` | `/organizations/invite/:id/resend` | Resend button |

### States

**Loading**: Table skeleton.  
**Success (invite sent)**: Modal closes, pending row appears, Toast "Invitation sent to {email} ✓".  
**Error (duplicate invite)**: AlertBanner "This user has already been invited."  
**Remove**: Row fades out + toast "Member removed".

### Permissions
Owner only: Role change, Remove, Invite.  
All members: View list.

---

## S-30: Settings — Prompt Templates

**Route**: `/settings/prompts`  
**Layout**: `app`

### Goal
Allow owners and admins to define and manage the prompt templates used by AI email generation and follow-up features.

### Components

| Component | Usage |
|-----------|-------|
| `PageHeader` | "Prompt Templates" + "New Template" |
| `DataTable` | Templates list |
| `Modal` | Create / Edit template modal |
| `Input` | Template name |
| `Textarea` | Template body (with variable hints) |
| `Badge` | Variable chips (`{firstName}`, `{company}`, etc.) |
| `Button` | "Test Template" |
| `EmptyState` | No templates |

### Template Variables

Available variables shown as clickable chips below the textarea:

| Variable | Replaced with |
|---------|--------------|
| `{firstName}` | Lead's first name |
| `{lastName}` | Lead's last name |
| `{company}` | Lead's company |
| `{jobTitle}` | Lead's job title |
| `{senderName}` | Authenticated user's name |
| `{painPoint}` | AI-extracted pain point (from website audit) |
| `{auditSummary}` | AI website audit summary |

### API Dependencies

| Call | Method | Endpoint | Trigger |
|------|--------|---------|---------|
| Fetch templates | `GET` | `/prompts` | Page mount |
| Create template | `POST` | `/prompts` | Modal submit |
| Update template | `PATCH` | `/prompts/:id` | Edit submit |
| Delete template | `DELETE` | `/prompts/:id` | Confirm |

### States

**Empty**: "No prompt templates — Create your first template to use in AI generation."  
**Loading**: 3 skeleton rows.  
**Success**: Templates table. After save: Modal closes, Toast "Template saved ✓".

### Permissions
Owner and Admin.

---

## S-31: Settings — Billing

**Route**: `/settings/billing`  
**Layout**: `app`

### Goal
Display the organization's current subscription plan, usage, and allow plan management. (MVP: display only; Stripe integration deferred to future sprint.)

### Components

| Component | Usage |
|-----------|-------|
| `PageHeader` | "Billing & Subscription" |
| `WidgetCard` | Current plan card |
| `ProgressBar` | Usage meters (leads, emails, AI credits) |
| `Button` | "Upgrade Plan", "Manage Billing" |
| `AlertBanner` | Usage limit warnings |

### Current Plan Card Layout

```
┌────────────────────────────────────────────────────────────────┐
│  Current Plan: FREE                  [Upgrade Plan →]          │
│  ──────────────────────────────────────────────────────────    │
│  Leads:       142 / 500      ████████░░░░░░  28%              │
│  Emails/mo:  4,830 / 10,000  ██████████░░░░  48%              │
│  AI Credits:   18 / 50       ████░░░░░░░░░░  36%              │
│  Team Members:  3 / 5        ██████░░░░░░░░  60%              │
│                                                                │
│  Next billing: — (Free plan)                                   │
└────────────────────────────────────────────────────────────────┘
```

### API Dependencies

| Call | Method | Endpoint | Trigger |
|------|--------|---------|---------|
| Fetch billing | `GET` | `/organizations/billing` | Page mount |

### States

**Loading**: Card skeleton.  
**Error**: "Could not load billing info."  
**Usage at 80%+**: AlertBanner (warning): "You're approaching your {resource} limit."  
**Usage at 100%**: AlertBanner (danger): "You've reached your {resource} limit. Upgrade to continue."

### Permissions
Owner only.

---

## S-32: Settings — Organization

**Route**: `/settings/organization`  
**Layout**: `app`

### Goal
Allow the org owner to update organization name, view org ID, generate invite codes, and manage danger zone actions (delete org).

### Components

| Component | Usage |
|-----------|-------|
| `PageHeader` | "Organization Settings" |
| `FormCard` | Org name form |
| `Input` | Organization name |
| `Button` | "Save Changes" |
| `Divider` | Section separator |
| `WidgetCard` | Invite Code section |
| `Input` (read-only) | Org ID (copy button) |
| `Input` (read-only) | Current invite code + regenerate button |
| `WidgetCard` | Danger Zone (red border) |
| `Button` (danger) | "Delete Organization" |
| `Modal` | Delete org confirmation (type name to confirm) |

### API Dependencies

| Call | Method | Endpoint | Trigger |
|------|--------|---------|---------|
| Fetch org | `GET` | `/organizations/current` | Page mount |
| Update org | `PATCH` | `/organizations/:id` | Save |
| Regenerate invite | `POST` | `/organizations/:id/invite-code/regenerate` | Button |
| Delete org | `DELETE` | `/organizations/:id` | Confirm (type name) |

### States

**Loading**: Form skeleton.  
**Success (rename)**: Toast "Organization name updated ✓".  
**Success (delete)**: Redirect to `/login` with "Organization deleted" message.  
**Error (delete conflict)**: "Cannot delete organization with active campaigns. Stop all campaigns first."

### Permissions
Owner only.

---

---

# ERROR SCREENS

---

## S-33: 404 Not Found

**Route**: `/*` (catch-all for undefined routes)  
**Layout**: `app` (if authenticated) / `auth` (if not)

### Goal
Inform the user that the page they navigated to does not exist and help them return to a valid page.

### Components

| Component | Usage |
|-----------|-------|
| `PageHeader` (hidden) | — |
| `ErrorState` | Full-page centered error card |
| `Button` (primary) | "Back to Dashboard" or "Back to Login" |
| `Button` (ghost) | "Contact Support" |

### Layout

```
[MapPin icon, 48px, muted]
"404 — Page Not Found"
"The page you're looking for doesn't exist or has been moved."
[← Back to Dashboard]   [Contact Support]
```

### API Dependencies
None.

### States
Single static state.

### Permissions
Accessible to all users (authenticated and unauthenticated).

---

## S-34: 403 Forbidden

**Route**: Rendered in-place (not a separate URL) when role check fails.  
**Layout**: `app`

### Goal
Inform the user they do not have permission to view the requested page or perform the requested action.

### Components

| Component | Usage |
|-----------|-------|
| `ErrorState` | Full-page centered error card |
| `Button` (primary) | "Back to Dashboard" |
| `Button` (ghost) | "Contact your administrator" |

### Layout

```
[Lock icon, 48px, muted]
"Access Denied"
"You don't have permission to view this page."
"Contact your organization administrator to request access."
[← Back to Dashboard]   [Contact Admin]
```

### Triggered by
- `/settings/billing` visited by non-Owner
- `/settings/team` visited by Member
- Team analytics tab visited by Member
- Any Owner-only action attempted by Admin/Member

### Permissions
Rendered when role check fails — visible to authenticated users who lack the required role.

---

## S-35: 500 Server Error

**Route**: Rendered in-place when a critical API call fails at the page level.  
**Layout**: `app`

### Goal
Inform the user that something went wrong on the server and provide recovery options.

### Components

| Component | Usage |
|-----------|-------|
| `ErrorState` | Centered error card |
| `Button` (primary) | "↻ Try Again" |
| `Button` (ghost) | "← Back to Dashboard" |

### Layout

```
[Cloud icon, 48px, muted]
"Something went wrong"
"We're having trouble loading this page."
"Our team has been notified. Please try again in a moment."
[↻ Try Again]   [← Back to Dashboard]
```

### Triggered by
- 500 / 503 response from any primary page-level API call
- Network timeout on page mount

### API Dependencies
None (this IS the failure state).

---

---

## Appendix: Role × Permission Matrix

| Screen | Member | Admin | Owner |
|--------|--------|-------|-------|
| Dashboard | ✅ | ✅ | ✅ |
| Lead List | ✅ | ✅ | ✅ |
| Import Leads | ✅ | ✅ | ✅ |
| Add Lead | ✅ | ✅ | ✅ |
| Lead Detail | ✅ | ✅ | ✅ |
| Edit Lead | ✅ | ✅ | ✅ |
| Delete Lead | ❌ | ✅ | ✅ |
| Segments | ✅ | ✅ | ✅ |
| Delete Segment | ❌ | ✅ | ✅ |
| Campaign List | ✅ | ✅ | ✅ |
| New Campaign | ✅ | ✅ | ✅ |
| Campaign Detail | ✅ | ✅ | ✅ |
| Pause/Stop Campaign | ❌ | ✅ | ✅ |
| Sequence List | ✅ | ✅ | ✅ |
| Sequence Builder | ✅ | ✅ | ✅ |
| Delete Sequence | ❌ | ✅ | ✅ |
| CRM Pipeline | ✅ | ✅ | ✅ |
| Tasks | ✅ | ✅ | ✅ |
| Notes | ✅ | ✅ | ✅ |
| Delete others' notes | ❌ | ✅ | ✅ |
| AI Website Audit | ✅ | ✅ | ✅ |
| AI Follow-up Gen | ✅ | ✅ | ✅ |
| AI Subject Optimizer | ✅ | ✅ | ✅ |
| AI Lead Scoring (run) | ❌ | ✅ | ✅ |
| Analytics (own data) | ✅ | ✅ | ✅ |
| Analytics (team tab) | ❌ | ✅ | ✅ |
| Settings — Profile | ✅ | ✅ | ✅ |
| Settings — Email Accounts | ❌ | ✅ | ✅ |
| Settings — Team | ❌ | ✅ | ✅ |
| Invite/Remove members | ❌ | ❌ | ✅ |
| Settings — Prompts | ❌ | ✅ | ✅ |
| Settings — Billing | ❌ | ❌ | ✅ |
| Settings — Organization | ❌ | ❌ | ✅ |
| Delete Organization | ❌ | ❌ | ✅ |

---

*Every page that is built must have a corresponding entry in this document. Before building, verify: all states are handled, all API dependencies are identified, and permissions are enforced on both client route level (redirect/403) and server API level (401/403 responses).*

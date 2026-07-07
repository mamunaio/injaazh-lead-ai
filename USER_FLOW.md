# USER_FLOW.md — Injaazh Lead AI

> **Complete User Journey Documentation**  
> Version: 1.0 | Last Updated: July 2026  
> Companion documents: [PRODUCT.md](./PRODUCT.md) | [IA.md](./IA.md)  
> Status: Living Document — Update on every new feature or flow change.

---

## Notation Legend

```
[Screen]         → A UI page or view the user sees
{Decision}       → A decision point or branch in the flow
(System Action)  → A background or automated system action
!ERROR           → An error path or failure scenario
→                → Flow progression
↓                → Primary / default path
└─               → Alternative path, sub-path, or detail
✓                → Success state
×                → Failure / error state
⟳               → Loop / repeat action
~                → Async / background action
```

---

## Flow Index

1. [Visitor Arrival](#flow-1-visitor-arrival)
2. [Registration](#flow-2-registration)
3. [Organization Creation](#flow-3-organization-creation)
4. [Onboarding](#flow-4-onboarding--first-time-setup)
5. [Dashboard](#flow-5-dashboard)
6. [Lead Import](#flow-6-lead-import)
7. [Lead Qualification](#flow-7-lead-qualification)
8. [Company Analysis (AI Website Audit)](#flow-8-company-analysis--ai-website-audit)
9. [AI Email Generation](#flow-9-ai-email-generation)
10. [Campaign Creation](#flow-10-campaign-creation)
11. [Campaign Launch](#flow-11-campaign-launch)
12. [Analytics & Tracking](#flow-12-analytics--tracking)
13. [Follow-up Management](#flow-13-follow-up-management)
14. [CRM & Relationship Management](#flow-14-crm--relationship-management)
15. [Settings & Account Management](#flow-15-settings--account-management)
16. [Cross-Cutting Error Flows](#flow-16-cross-cutting-error-flows)

---

## Flow 1: Visitor Arrival

### 1.1 First Visit (Unauthenticated)

```
[Public Landing / Root URL: /]
        ↓
{Is user authenticated?}
        ├── NO  → [Login Screen: /login]
        └── YES → [Dashboard: /dashboard]
```

### 1.2 Bookmark / Direct Link (Unauthenticated)

```
User visits /dashboard (or any protected route) without a session
        ↓
(System checks localStorage for JWT token)
        ↓
{Token found and valid?}
        ├── YES → [Requested screen loads normally]
        └── NO  → (Token missing or expired)
                         ↓
                  (Store originally requested URL in sessionStorage)
                         ↓
                  [Login Screen: /login]
                         ↓
                  (After successful login)
                         ↓
                  [Redirect to originally requested URL]
```

---

## Flow 2: Registration

### 2.1 New User Registration (Happy Path)

```
[Login Screen: /login]
        ↓
User clicks "Register" link
        ↓
[Registration Screen: /register]
        ↓
User fills form:
  - First Name *
  - Last Name *
  - Email Address *
  - Company / Organization Name *
  - Password * (min 8 characters)
        ↓
User clicks "Create Account"
        ↓
(Client-side validation runs)
        ↓
{All fields valid?}
        ├── NO  → !ERROR: Inline field errors shown
        │           └─ User corrects and resubmits
        └── YES → (POST /auth/register)
                         ↓
                  {Email already registered?}
                         ├── YES → !ERROR: "An account with this email already exists."
                         │           └─ [Sign In] link shown → /login
                         └── NO  → (System creates User record)
                                          ↓
                                   (System creates Organization record)
                                          ↓
                                   (System creates default CRM Pipeline)
                                          ↓
                                   (System issues JWT token)
                                          ↓
                                   (Token saved to localStorage)
                                          ↓
                                   → Flow 4: Onboarding
```

### 2.2 Registration — Error Paths

```
!ERROR: Network failure during POST /auth/register
        ↓
[Banner] "Could not create account. Please check your connection and try again."
[Retry] button → resubmits the same form data

!ERROR: Server error (5xx)
        ↓
[Banner] "Something went wrong on our end. Please try again in a moment."
[Retry] button

!ERROR: Weak password rejected by server
        ↓
[Inline error below password field] "Password must be at least 8 characters."
```

---

## Flow 3: Organization Creation

> Note: This is triggered automatically on first registration. The Organization is created server-side as part of the `/auth/register` endpoint. A user can also create additional organizations later.

### 3.1 Automatic (On Registration)

```
(POST /auth/register successful)
        ↓
(System auto-creates Organization using "Company Name" from registration form)
        ↓
(System assigns the registering user the "Owner" role in that organization)
        ↓
(organizationId is embedded in the JWT payload)
        ↓
→ Flow 4: Onboarding
```

### 3.2 Additional Organization (Post-Onboarding)

```
[Any Screen] → User clicks Organization Switcher in Header
        ↓
[Org Switcher Dropdown opens]
        ↓
User clicks "➕ Create New Organization"
        ↓
[Create Organization Modal or /onboarding/new-org Screen]
        ↓
User enters:
  - Organization Name *
        ↓
Clicks "Create"
        ↓
(POST /organizations)
        ↓
{Success?}
        ├── YES → (New org created, user set as Owner)
        │          ↓
        │         (JWT refreshed with new organizationId)
        │          ↓
        │         [Org Switcher updates — new org shown as active]
        │          ↓
        │         [Dashboard reloads for new org (empty state)]
        └── NO  → !ERROR banner → retry
```

---

## Flow 4: Onboarding / First-Time Setup

> Triggered after a brand-new registration. Walks the user through minimum viable setup.

### 4.1 Onboarding Checklist

```
[Dashboard: /dashboard]
        ↓
{Is this a new organization (0 leads, 0 campaigns, 0 email accounts)?}
        ├── NO  → Normal dashboard
        └── YES → [Onboarding Banner / Checklist widget shown on dashboard]

Onboarding Checklist Items:
  □ Step 1: Connect an Email Account     → /settings/email
  □ Step 2: Import or Add Your First Lead → /leads/import or /leads/new
  □ Step 3: Create an Email Sequence     → /sequences/new
  □ Step 4: Launch Your First Campaign   → /campaigns/new
```

### 4.2 Connect Email Account (Step 1)

```
User clicks "Connect an Email Account" in checklist
        ↓
[Settings > Email Accounts: /settings/email]
        ↓
User clicks "Add Email Account"
        ↓
{Which provider?}
        ├── SMTP       → [SMTP Config Form: Host, Port, Username, Password]
        ├── Gmail      → [OAuth redirect to Google Auth]
        ├── Outlook    → [OAuth redirect to Microsoft Auth]
        ├── SendGrid   → [API Key input form]
        ├── Resend     → [API Key input form]
        └── Amazon SES → [AWS credentials form]
        ↓
(POST /mail/accounts)
        ↓
{Connection test successful?}
        ├── YES → ✓ "Email account connected successfully."
        │          ↓
        │         User clicks "Set as Default" if multiple accounts
        │          ↓
        │         (PATCH /mail/accounts/:id/default)
        │          ↓
        │         [Checklist item marked complete]
        └── NO  → !ERROR: "Could not verify connection. Check your credentials."
                   └─ User re-enters credentials and retries
```

---

## Flow 5: Dashboard

### 5.1 Dashboard Load

```
[Dashboard: /dashboard]
        ↓
(Authenticated user lands here after login or registration)
        ↓
(Parallel API calls on mount)
  ~ GET /analytics/dashboard  → Metric Cards data
  ~ GET /analytics/campaigns  → Campaign Performance table data
        ↓
{Data loading?}
        ├── YES → [Skeleton loaders shown in metric cards and table]
        └── NO  → [Data rendered]
                         ↓
                  {Any data exists?}
                         ├── YES → Metrics and campaign rows displayed
                         └── NO  → [Empty state: onboarding banner + CTAs]
```

### 5.2 Dashboard Navigation

```
From [Dashboard]:
        ├── Click "Manage Leads"  → /leads
        ├── Click metric card     → /leads (with relevant filter applied) [Future]
        ├── Click campaign row    → /campaigns/:id
        ├── Click "Sign Out"      → Flow 16.2 (Logout)
        └── Use Sidebar           → Any section
```

---

## Flow 6: Lead Import

### 6.1 Manual Lead Entry

```
[Leads: /leads]
        ↓
User clicks "Add Lead"
        ↓
[New Lead Form: /leads/new]
        ↓
User fills form:
  - First Name *
  - Last Name *
  - Email Address *
  - Job Title
  - Company Name
  - LinkedIn Profile URL
        ↓
User clicks "Save Lead"
        ↓
(Client validation)
        ↓
{Valid?}
        ├── NO  → !ERROR: Inline field errors
        └── YES → (POST /leads)
                         ↓
                  {Success?}
                         ├── YES → ✓ Lead created
                         │          ↓
                         │         (Redirect to /leads)
                         │          ↓
                         │         [New lead appears at top of list]
                         └── NO  → !ERROR Banner: "Could not create lead."
                                    └─ [Retry] or [Cancel]
```

### 6.2 CSV Bulk Import

```
[Leads: /leads]
        ↓
User clicks "Import Leads"
        ↓
[CSV Import Wizard: /leads/import]

STEP 1 — Upload
        ↓
User drags & drops or selects a .csv file
        ↓
(Client reads file, previews first 5 rows)
        ↓
{File valid (.csv, < 50MB)?}
        ├── NO  → !ERROR: "Please upload a valid .csv file under 50MB."
        └── YES → STEP 2 — Column Mapping

STEP 2 — Column Mapping
        ↓
System detects headers and suggests mappings:
  CSV Column "email"      → Lead: Email ✓ (auto-matched)
  CSV Column "first_name" → Lead: First Name ✓
  CSV Column "company"    → Lead: Company Name ✓
  CSV Column "title"      → Lead: Job Title ✓
  CSV Column "unknown_col"→ [Unmapped — select field or ignore]
        ↓
User confirms/adjusts mappings
        ↓
Clicks "Import"
        ↓
(POST /import with file + mapping config)
        ↓
(System enqueues import job in BullMQ — background processing)
        ↓
[Banner] "Import started. You'll be notified when complete."
        ↓
[Redirect to /leads]
        ↓
~ (Background: BullMQ processes each row)
  ~ (Upsert leads matching on email)
  ~ (Skip rows with missing required fields, log as errors)
        ↓
(Import complete)
        ↓
{All rows successful?}
        ├── YES → [Notification] ✓ "150 leads imported successfully."
        └── NO  → [Notification] "Import complete with errors."
                   "132 leads imported, 18 rows skipped."
                   [Download Error Log] → CSV with failed rows and reason
```

### 6.3 Apollo.io Enrichment Import

```
[Leads: /leads] or [Lead Detail: /leads/:id]
        ↓
User triggers "Enrich via Apollo"
        ↓
(POST /enrichment/trigger with leadId or batch)
        ↓
~ (Background: System queries Apollo API)
  ~ (Maps returned data to Lead fields: company, title, LinkedIn, etc.)
  ~ (Updates lead record)
        ↓
{Enrichment successful?}
        ├── YES → [Notification] "Lead enrichment complete."
        │          ↓
        │         [Lead detail refreshes with new data]
        └── NO  → [Notification] "Enrichment failed — Apollo returned no results."
                   └─ Lead data unchanged
```

---

## Flow 7: Lead Qualification

### 7.1 Viewing and Filtering Leads

```
[Leads: /leads]
        ↓
(GET /leads — all leads for organization)
        ↓
[Lead list table rendered]
        ↓
User can:
        ├── Search by name/email    → (GET /leads?q=searchterm)
        ├── Filter by tag           → (GET /leads?tags=VIP,Hot)
        ├── Filter by status        → (GET /leads?status=New)
        ├── Filter by score range   → (GET /leads?minScore=80)
        └── Click a row             → [Lead Detail: /leads/:id]
```

### 7.2 Updating Lead Status

```
[Lead Detail: /leads/:id]
        ↓
User clicks status dropdown
        ↓
{Select new status}
  Options: New → Contacted → Qualified → Lost → Won
        ↓
(PATCH /leads/:id  { status: "Qualified" })
        ↓
{Success?}
        ├── YES → ✓ Status badge updates immediately (optimistic UI)
        └── NO  → !ERROR: Status badge reverts, error banner shown
```

### 7.3 AI Lead Scoring

```
[Lead Detail: /leads/:id]
        ↓
User clicks "Score with AI"
        ↓
(POST /ai/score-lead  { leadId })
        ↓
~ (Background: Gemini analyzes lead profile, job title, company, enrichment data)
        ↓
{Score generated?}
        ├── YES → ✓ Score (0–100) saved to lead record
        │          ↓
        │         [Score badge updates on Lead detail and list]
        └── NO  → !ERROR: "AI scoring failed. Please try again."
```

### 7.4 Tagging Leads

```
[Lead Detail: /leads/:id] or [Lead List with multi-select — Future]
        ↓
User types tag name in tag input + presses Enter
        ↓
(POST /leads/:id/tags  { tag: "VIP" })
        ↓
{Success?}
        ├── YES → ✓ Tag appears on lead profile
        └── NO  → !ERROR inline message

User removes a tag by clicking × on tag badge
        ↓
(DELETE /leads/:id/tags/:tag)
        ↓
{Success?}
        ├── YES → Tag removed from display
        └── NO  → !ERROR inline message
```

---

## Flow 8: Company Analysis / AI Website Audit

### 8.1 Website Audit for a Single Lead

```
[Lead Detail: /leads/:id]
        ↓
User clicks "Run Website Audit"
        ↓
{Lead has company website URL?}
        ├── NO  → [Prompt] "Enter the company website URL to analyze:"
        │          User enters URL → proceeds
        └── YES → (POST /ai/audit-website  { leadId, url })
                         ↓
                  [Loading state] "Analyzing website... this may take 15–30 seconds."
                         ↓
                  ~ (Background: System scrapes website content)
                  ~ (Gemini analyzes: value proposition, pain points, key personnel,
                     company size signals, industry, tech stack)
                         ↓
                  {Analysis successful?}
                         ├── YES → ✓ Analysis saved to lead.websiteAnalysis
                         │          ↓
                         │         [Lead detail shows Website Analysis panel]
                         │           - Value Proposition
                         │           - Key Pain Points
                         │           - Relevant Contacts / Titles
                         │           - AI-suggested talking points
                         └── NO  → !ERROR: "Could not analyze this website."
                                    Possible reasons shown:
                                    - "Website is not accessible or blocked scrapers."
                                    - "AI service temporarily unavailable."
                                    [Retry] button
```

### 8.2 Bulk Website Audit (Multiple Leads)

```
[Leads: /leads]
        ↓
User selects multiple leads (checkbox multi-select — Future feature)
        ↓
User clicks "Run Bulk Audit"
        ↓
[Confirmation] "Audit 12 leads' websites? This may take a few minutes."
[Confirm] / [Cancel]
        ↓
(POST /ai/audit-website/bulk  { leadIds: [...] })
        ↓
~ (System enqueues one audit job per lead in BullMQ)
        ↓
[Banner] "Bulk audit started. We'll notify you when complete."
        ↓
{All audits complete?}
        ├── YES → [Notification] ✓ "12 lead websites analyzed."
        └── PARTIAL → [Notification] "9/12 audits complete. 3 websites could not be accessed."
                       [Download Report] showing which leads failed
```

---

## Flow 9: AI Email Generation

### 9.1 Generate Personalized Outreach for One Lead

```
[Lead Detail: /leads/:id]
        ↓
{Lead has website analysis data?}
        ├── NO  → [Prompt] "Run a Website Audit first for better personalization."
        │          [Run Audit Now] → Flow 8.1
        │          or user proceeds without audit
        └── YES → Better personalization available
        ↓
User clicks "Generate Outreach Email"
        ↓
{Select Prompt Template}
  Dropdown: [Select a template] or [Use Default]
        ↓
(POST /ai/generate-emails  { leadId, promptTemplateId })
        ↓
[Loading] "Generating personalized email..."
        ↓
~ (Gemini generates subject line + email body using:
     - Lead name, title, company
     - Website analysis (value prop, pain points)
     - Apollo enrichment data
     - Prompt template instructions)
        ↓
{Generation successful?}
        ├── YES → ✓ Generated email shown in preview panel
        │          [Subject]: "Quick question about [Company Name]'s growth strategy"
        │          [Body]: Full personalized email body
        │          ↓
        │         User can:
        │           ├── [Edit] → Inline edit the generated text
        │           ├── [Regenerate] → Re-run with same or different prompt
        │           ├── [Copy] → Copy to clipboard
        │           └── [Save to Sequence Step] → Attach to a draft sequence
        └── NO  → !ERROR: "Email generation failed."
                   "Check your Gemini API key in Settings."
                   [Go to Settings] / [Retry]
```

### 9.2 Subject Line Optimizer

```
[Any context — Lead detail or Campaign builder]
        ↓
User clicks "Optimize Subject Line"
        ↓
[AI Subject Line Tool: /ai/subject]
        ↓
User enters:
  - Original subject line (or paste draft email context)
  - Target audience description (optional)
        ↓
(POST /ai/optimize-subject)
        ↓
~ (Gemini generates 3–5 subject line variants ranked by predicted open rate)
        ↓
{Success?}
        ├── YES → [Variants listed with confidence labels]
        │           "High impact: "Are you still struggling with [Pain Point]?""
        │           "Curiosity: "Quick idea for [Company Name]""
        │           "Direct: "15-minute call this week?""
        │         [Copy] button per variant
        └── NO  → !ERROR message + [Retry]
```

### 9.3 A/B Variant Generator

```
[Campaign Builder or AI Tools: /ai]
        ↓
User clicks "Generate A/B Variants"
        ↓
User provides:
  - Base email body (or selects from generated emails)
  - Number of variants (2–4)
  - What to vary: [Subject Only] [Body Tone] [CTA] [Full Email]
        ↓
(POST /ai/generate-ab-variants)
        ↓
{Success?}
        ├── YES → Variants shown side by side
        │         User selects which variants to include in campaign
        └── NO  → !ERROR + [Retry]
```

### 9.4 Follow-up Generator

```
[Lead Detail: /leads/:id] after a previous email was sent
        ↓
User clicks "Generate Follow-up"
        ↓
[Follow-up Generator: /ai/followup]
        ↓
System pre-fills:
  - Lead context (name, company, previous emails sent)
  - Days since last email
  - Lead engagement status (opened? clicked?)
        ↓
User selects:
  - Follow-up tone: [Gentle] [Direct] [Value-Add] [Break-Up]
        ↓
(POST /ai/generate-followup  { leadId, tone, previousEmailContext })
        ↓
{Success?}
        ├── YES → Generated follow-up shown in preview panel
        │         Options: [Edit] [Copy] [Add to Sequence]
        └── NO  → !ERROR + [Retry]
```

---

## Flow 10: Campaign Creation

### 10.1 Prerequisites Check

Before a campaign can be launched, four dependencies must exist:

```
{Has at least one Connected Email Account?}
        └── NO → !BLOCKER: "You must connect an email account before launching campaigns."
                  [→ Connect Email Account: /settings/email]

{Has at least one Segment or set of leads?}
        └── NO → !BLOCKER: "You need leads to target. Import leads first."
                  [→ Import Leads]

{Has at least one Sequence?}
        └── NO → !BLOCKER: "Create an email sequence before building a campaign."
                  [→ Create Sequence]

{Has at least one Prompt Template?}
        └── NO → WARNING (not a hard blocker — default template may exist)
```

### 10.2 Campaign Builder — Step-by-Step

```
[Campaigns: /campaigns]
        ↓
User clicks "New Campaign"
        ↓
[Campaign Builder: /campaigns/new]

STEP 1 — Basics
  - Campaign Name *
  - Description (optional)
  [Next →]

STEP 2 — Select Audience
  {How to select leads?}
        ├── Use a Segment  → [Segment Dropdown] → selects saved Segment
        │                      Shows: estimated lead count for segment
        └── Manual Select  → [Lead multi-select table] (Future)
  [Next →]

STEP 3 — Select Sequence
  [Sequence Dropdown] — shows all active sequences
  Preview panel shows:
    Step 1: EMAIL (Day 0)
    Step 2: WAIT (3 days)
    Step 3: EMAIL (Day 3)
    Step 4: WAIT (5 days)
    Step 5: EMAIL (Day 8)
  Option: [Create New Sequence] → /sequences/new (opens in new tab)
  [Next →]

STEP 4 — Select Prompt Template
  [Prompt Template Dropdown]
  Preview of template content shown below
  [Next →]

STEP 5 — Schedule
  {When to start?}
        ├── Now (immediate on launch)
        └── Scheduled: [Date + Time picker]
  [Next →]

STEP 6 — Review & Save
  Summary card showing:
    Campaign Name
    Audience: "Segment: VIP Leads (42 leads)"
    Sequence: "3-step Follow-up Sequence"
    Template: "Cold Outreach v2"
    Schedule: "Start immediately" or "July 10, 2026 at 9:00 AM"
        ↓
  [Save as Draft]  or  [Save and Launch]
```

### 10.3 Saving as Draft

```
User clicks "Save as Draft"
        ↓
(POST /campaigns  { status: "Draft", ...data })
        ↓
{Success?}
        ├── YES → [Redirect to /campaigns/:id]
        │          Status badge: Draft (grey)
        │          [Launch Campaign] button available
        └── NO  → !ERROR banner → retry
```

---

## Flow 11: Campaign Launch

### 11.1 Launching a Draft Campaign

```
[Campaign Detail: /campaigns/:id]  (Status: Draft)
        ↓
User clicks "Launch Campaign"
        ↓
[Confirmation Modal]
  "You are about to send emails to 42 leads using the
   'Cold Outreach v2' template and '3-step Follow-up Sequence'."
  [Cancel] / [Launch Now]
        ↓
User clicks "Launch Now"
        ↓
(POST /campaigns/:id/start)
        ↓
{Validation passes?}
        ├── NO — Missing email account → !ERROR: "No email account connected."
        │         [→ Connect Email]
        ├── NO — Sequence is empty    → !ERROR: "Sequence has no steps."
        │         [→ Edit Sequence]
        └── YES → (System sets Campaign status: Active)
                         ↓
                  ~ (BullMQ: For each lead in segment:
                       - Create CampaignLead record  { status: Pending, currentSequenceStep: 0 }
                       - Enqueue scheduler job for immediate dispatch)
                         ↓
                  [Campaign status badge: Active (green)]
                  [Stats bar: Pending: 42 | Processing: 0 | Completed: 0 | Failed: 0]
```

### 11.2 Email Dispatch (Background — Per Lead)

```
~ BullMQ processes scheduler-dispatch queue (concurrency: 5, rate: 100/min)

For each CampaignLead job:
        ↓
{Campaign still Active?}
        ├── NO  → Job exits silently (campaign was paused/stopped)
        └── YES →
                {CampaignLead status: Completed or Failed?}
                        ├── YES → Skip (sequence already halted for this lead)
                        └── NO  →
                                {Has lead replied? (stopOnReply: true)}
                                        ├── YES → Mark CampaignLead: Completed
                                        │          Sequence halted for this lead ✓
                                        └── NO  →
                                                {Current sequence step is EMAIL?}
                                                        ↓
                                                (Fetch lead data)
                                                        ↓
                                                {Lead has email address?}
                                                        ├── NO  → Mark CampaignLead: Failed
                                                        │          !ERROR logged
                                                        └── YES →
                                                                (POST /email-engine/generate)
                                                                  → AI generates subject + body
                                                                        ↓
                                                                {AI generation successful?}
                                                                        ├── NO  → Mark CampaignLead: Failed
                                                                        │          BullMQ retries up to 3×
                                                                        └── YES →
                                                                                (EmailDispatchService.sendEmail)
                                                                                  → Routes to correct provider
                                                                                    (SMTP / Gmail / Resend / etc.)
                                                                                        ↓
                                                                                {Email sent successfully?}
                                                                                        ├── NO  → Mark CampaignLead: Failed
                                                                                        │          BullMQ retries (exponential backoff)
                                                                                        └── YES →
                                                                                                (TrackingService.trackEvent "Delivered")
                                                                                                        ↓
                                                                                                (Schedule next sequence step)
                                                                                                  → If next step is WAIT: delay job by N days
                                                                                                  → If next step is EMAIL: enqueue immediately
                                                                                                        ↓
                                                                                                {All steps completed?}
                                                                                                        ├── YES → Mark CampaignLead: Completed ✓
                                                                                                        └── NO  → Continue sequence ⟳
```

### 11.3 Pausing a Campaign

```
[Campaign Detail: /campaigns/:id]  (Status: Active)
        ↓
User clicks "Pause"
        ↓
(POST /campaigns/:id/pause)
        ↓
{Success?}
        ├── YES → Campaign status → Paused
        │          ~ (New scheduler jobs stop being processed for this campaign)
        │          ~ (In-flight jobs for current step finish, then halt)
        │          [Resume] button appears
        └── NO  → !ERROR banner
```

### 11.4 Resuming a Campaign

```
[Campaign Detail: /campaigns/:id]  (Status: Paused)
        ↓
User clicks "Resume"
        ↓
(POST /campaigns/:id/resume)
        ↓
{Success?}
        ├── YES → Campaign status → Active
        │          ~ (Pending CampaignLeads re-enter processing queue)
        └── NO  → !ERROR banner
```

### 11.5 Stopping a Campaign

```
[Campaign Detail: /campaigns/:id]  (Status: Active or Paused)
        ↓
User clicks "Stop"
        ↓
[Confirmation Modal]
  "Stopping a campaign cannot be undone. No further emails will be sent.
   Leads who have not yet been emailed will not receive any outreach."
  [Cancel] / [Stop Campaign]
        ↓
(POST /campaigns/:id/stop)
        ↓
{Success?}
        ├── YES → Campaign status → Stopped (permanent)
        │          ~ (All pending scheduler jobs for this campaign are dropped)
        └── NO  → !ERROR banner
```

---

## Flow 12: Analytics & Tracking

### 12.1 Email Open Tracking

```
~ Lead receives and opens the email
        ↓
Email client loads the tracking pixel (1×1 transparent PNG)
        ↓
(GET /tracking/pixel/:messageId/:campaignId/:leadId  — public, no auth)
        ↓
(TrackingService.trackEvent — type: "Opened")
        ↓
(EmailEvent record created in DB)
        ↓
(Analytics aggregation updated)
        ↓
[Dashboard Open Rate metric increments]
```

### 12.2 Email Click Tracking

```
~ Lead clicks a tracked link inside the email
        ↓
Link points to: /tracking/click/:messageId/:campaignId/:leadId?redirect={originalURL}
        ↓
(GET /tracking/click — public, no auth)
        ↓
(TrackingService.trackEvent — type: "Clicked")
        ↓
(Server redirects user to {originalURL})
        ↓
[Click event recorded; dashboard updates]
```

### 12.3 Reply Detection

```
~ Lead replies to the email
        ↓
(Webhook from email provider fires — e.g., SendGrid Inbound Parse, Gmail webhook)
        ↓
(POST /tracking/webhook/:provider)
        ↓
(System matches reply to original messageId / campaignId / leadId)
        ↓
(TrackingService.trackEvent — type: "Replied")
        ↓
{Campaign sequence has stopOnReply: true?}
        ├── YES → CampaignLead status → Completed
        │          ~ (No further emails sent to this lead)
        │          [Notification] "💬 John Doe replied to your campaign!"
        └── NO  → Sequence continues as scheduled
```

### 12.4 Bounce / Unsubscribe Handling

```
~ Email bounces OR lead clicks "Unsubscribe" link
        ↓
Webhook fires from email provider
        ↓
(TrackingService.trackEvent — type: "Bounced" or "Unsubscribed")
        ↓
CampaignLead status → Failed
        ↓
~ (No further emails sent to this lead in any campaign)
        ↓
Lead record optionally flagged: { isUnsubscribed: true } [Future enhancement]
```

### 12.5 Viewing Analytics

```
[Dashboard: /dashboard]
        ↓
User sees:
  - Total Leads card
  - Emails Sent card
  - Open Rate (%) card
  - Reply Rate (%) card
  - Campaign Performance table:
      Campaign Name | Status | Total Leads | Active Leads

User clicks a campaign row
        ↓
[Campaign Detail: /campaigns/:id]
        ↓
Detailed view (Future):
  - Per-lead status (Delivered / Opened / Clicked / Replied / Failed)
  - Timeline of events per lead
  - A/B test variant performance comparison
```

---

## Flow 13: Follow-up Management

### 13.1 Automated Follow-ups via Sequence

```
(This is handled automatically by the Campaign engine — see Flow 11.2)

Sequence Example:
  Step 1: EMAIL (Day 0)  → Initial outreach
  Step 2: WAIT (3 days)
  Step 3: EMAIL (Day 3)  → Follow-up: "Just checking in..."
  Step 4: WAIT (5 days)
  Step 5: EMAIL (Day 8)  → Final email: "Last attempt before I let this go"

~ BullMQ processes WAIT steps by scheduling delayed jobs
~ Each EMAIL step generates a fresh AI email using the same lead context
~ If lead replies at any point → sequence halts (stopOnReply: true)
```

### 13.2 Manual Follow-up from Lead Profile

```
[Lead Detail: /leads/:id]
        ↓
User sees email history (sent, opened, not replied)
        ↓
User clicks "Generate Follow-up"
        ↓
→ Flow 9.4 (Follow-up Generator)
        ↓
User copies or uses generated text
        ↓
{Send manually or add to sequence?}
        ├── Manual Send  → User pastes into their email client (outside the app)
        └── Add to Seq.  → (POST /sequences/:id/steps — adds step)
                            → Follow-up sent on next campaign run
```

### 13.3 Task-Based Follow-up Reminder

```
[Lead Detail: /leads/:id]
        ↓
User clicks "Add Task"
        ↓
[Task Form Modal]
  - Title: "Call John to follow up on email"
  - Type: Call / Email / Meeting / To-Do
  - Due Date + Time
  - Assigned To: (self or team member)
        ↓
(POST /tasks)
        ↓
{Success?}
        ├── YES → Task created
        │          ↓
        │         ~ (BullMQ schedules reminder job for 1hr before dueDate)
        │          ↓
        │         [1hr before due] → (TaskReminderProcessor fires)
        │                              → Email dispatched to assignee:
        │                                "Reminder: 'Call John' is due in 1 hour"
        └── NO  → !ERROR inline
```

---

## Flow 14: CRM & Relationship Management

### 14.1 CRM Pipeline (Kanban)

```
[CRM Pipeline: /crm/pipeline]
        ↓
(GET /crm/pipelines — load pipelines for organization)
        ↓
[Kanban Board renders with default stages]:
  | Lead | → | Meeting Scheduled | → | Proposal Sent | → | Won | | Lost |
        ↓
Deals shown as cards in columns
        ↓
User drags deal card from "Lead" → "Meeting Scheduled"
        ↓
(PATCH /crm/deals/:id  { stage: "Meeting Scheduled" })
        ↓
{Success?}
        ├── YES → Card stays in new column ✓
        └── NO  → !ERROR: Card animates back to original column
```

### 14.2 Task Management

```
[CRM Tasks: /crm/tasks]
        ↓
(GET /tasks — load all tasks for the user's organization)
        ↓
[Task list rendered grouped by: Today | Upcoming | Overdue]
        ↓
User can:
  ├── Click task      → [Task Detail: /crm/tasks/:id]
  ├── Check complete  → (PATCH /tasks/:id  { status: "Completed" })
  ├── Edit due date   → (PATCH /tasks/:id  { dueDate: ... })
  │                      ~ (BullMQ reschedules reminder job)
  └── Delete task     → (DELETE /tasks/:id)
                          [Confirmation] "Delete this task?"
                          → Task removed from list
```

### 14.3 Notes & Activity Timeline

```
[Lead Detail: /leads/:id  → Activity Tab]
        ↓
(GET /notes?leadId=:id — load all notes for this lead)
        ↓
[Timeline renders chronologically — newest first]
  📝 Note: "Had a call. Very interested. Wants demo."    — 2 days ago
  📧 Email: Delivered (Opened)                           — 3 days ago
  📧 Email: Delivered (Not Opened)                       — 5 days ago
  👤 Lead Created                                        — 5 days ago
        ↓
User clicks "Add Note"
        ↓
[Inline note form at top of timeline]
  Textarea: "Enter note..."
  [Save Note] / [Cancel]
        ↓
(POST /notes  { leadId, content })
        ↓
{Success?}
        ├── YES → New note appears at top of timeline with timestamp ✓
        └── NO  → !ERROR inline message
```

### 14.4 Segment Management

```
[Segments: /segments]
        ↓
User clicks "Create Segment"
        ↓
[Segment Builder]
  Segment Name: *
  Filter Rules (AND / OR logic):
    Rule 1: Status = Qualified
    Rule 2: Score ≥ 70
    Rule 3: Tag contains "VIP"
  [Preview] → shows estimated lead count matching rules
        ↓
(POST /segments  { name, filters })
        ↓
{Success?}
        ├── YES → Segment saved
        │          ↓
        │         [Segment appears in Campaign Builder dropdown]
        └── NO  → !ERROR
```

---

## Flow 15: Settings & Account Management

### 15.1 Email Account Management

```
[Settings > Email Accounts: /settings/email]
        ↓
[List of connected accounts]
  Gmail — hello@company.com (Default) [Set Default] [Delete]
  SMTP  — outreach@company.com        [Set Default] [Delete]
        ↓
User clicks "Add Email Account"
        ↓
→ Flow 4.2 (Connect Email Account)
        ↓
User clicks "Delete" on an account
        ↓
[Confirmation] "Are you sure? Campaigns using this account may be affected."
[Confirm] → (DELETE /mail/accounts/:id)
        ↓
{Account was default?}
        ├── YES → System prompts to set a new default account before deleting
        └── NO  → Account deleted silently ✓
```

### 15.2 Team Management (Owner / Admin Only)

```
[Settings > Team: /settings/team]
        ↓
[List of team members with roles]
        ↓
User clicks "Invite Member"
        ↓
[Invite Modal]
  - Email Address *
  - Role: Member / Admin
        ↓
(POST /organizations/invite)
        ↓
~ (System sends invitation email with a unique token)
        ↓
{Invitee clicks email link}
        ↓
[Register screen pre-filled with email]
        ↓
(Invitee registers → automatically joined to organization with assigned role)
        ↓
[Notification to Owner/Admin] "Sarah joined your organization."
```

### 15.3 Prompt Template Management

```
[Settings > Prompt Templates: /settings/prompts]
        ↓
User clicks "New Template"
        ↓
[Template Form]
  - Name: "Cold Outreach — SaaS"
  - Category: [Cold Outreach / Follow-up / Break-up / Reconnect]
  - System Prompt: (instructions for AI)
  - Variables: {firstName}, {company}, {painPoint}, {valueProposition}
        ↓
(POST /prompts/templates)
        ↓
{Success?}
        ├── YES → Template available in Campaign Builder + Email Generation
        └── NO  → !ERROR
```

### 15.4 Logout

```
[User Menu (header)] → Click "Sign Out"
        ↓
{Confirmation? (optional)}
        ↓
(localStorage.removeItem('token'))
        ↓
(AuthContext state cleared)
        ↓
[Redirect to /login]
        ↓
[Login Screen with empty form]
```

---

## Flow 16: Cross-Cutting Error Flows

### 16.1 Expired / Invalid Session

```
User is using the app normally
        ↓
JWT token expires (configurable TTL, e.g., 1 hour)
        ↓
Next API call returns HTTP 401
        ↓
(apiFetch utility detects 401)
        ↓
(localStorage token cleared)
        ↓
[Toast/Banner] "Your session has expired. Please sign in again."
        ↓
[Redirect to /login]
        ↓
After successful re-login → Return to the page user was on
```

### 16.2 Network Failure (No Internet)

```
User performs any action requiring API
        ↓
fetch() throws network error (ERR_NETWORK)
        ↓
{Is it a data fetch (GET)?}
        ├── YES → [Error state on page] "Failed to load data. Check your connection."
        │          [Retry] button → re-fires the fetch
        └── NO  → [Error banner on form] "Could not save. Please check your connection."
                   Form data preserved in state (not lost)
                   [Retry] when connection restores
```

### 16.3 Insufficient Permissions (403)

```
User (role: Member) attempts to navigate to /settings/team
        ↓
{Role check fails}
        ↓
[403 Error Screen]
  "Access Denied"
  "You don't have permission to view this page.
   Contact your organization owner if this is a mistake."
  [← Back to Dashboard]
```

### 16.4 Resource Not Found (404)

```
User visits /leads/507f1f77bcf86cd799439011 (deleted lead)
        ↓
(GET /leads/:id returns 404)
        ↓
[404 Error Screen]
  "Lead not found"
  "This lead may have been deleted."
  [← Back to Leads]
```

### 16.5 AI Service Unavailable (Gemini API Error)

```
Any AI action triggered (scoring, audit, generation, etc.)
        ↓
Gemini API returns error or times out
        ↓
[Error Panel on current screen]
  "AI generation failed"
  Possible reasons:
    - "Check your Gemini API key in Settings."
    - "Gemini service is temporarily unavailable."
  [↻ Retry]  [→ Settings]
        ↓
{Does user retry?}
        ├── YES → Re-fires the API call
        └── NO  → User abandons AI action; manual workflow continues
```

### 16.6 Email Provider Delivery Failure

```
~ Scheduler sends email via EmailDispatchService
        ↓
Email provider returns error (invalid credentials, rate limit, etc.)
        ↓
(EmailDispatchService throws error)
        ↓
CampaignLead status → Failed
        ↓
BullMQ retries job up to 3× with exponential backoff
        ↓
{All 3 retries fail?}
        ├── YES → CampaignLead permanently → Failed
        │          [Notification] "❌ 3 emails failed to send in Campaign X."
        │          [Check Email Settings] CTA
        └── NO  → Retry succeeds → CampaignLead resumes ✓
```

### 16.7 CSV Import Row Failures

```
~ BullMQ processes CSV import job
        ↓
For each row:
        ├── Missing required field (email) → Row skipped, error logged
        ├── Duplicate email in same import → Second row skipped
        ├── Invalid email format           → Row skipped, error logged
        └── All other rows                → Imported ✓
        ↓
{Import complete}
        ↓
[Notification] "Import complete: 145 imported, 5 skipped."
[Download Error Log] → CSV containing:
  Row # | Original Data | Error Reason
  3     | ...(data)...  | "Missing required field: email"
  17    | ...(data)...  | "Invalid email format"
```

### 16.8 Campaign Launch — Missing Prerequisites

```
User clicks "Launch Campaign" on a Draft campaign
        ↓
(POST /campaigns/:id/start)
        ↓
Server validates prerequisites:
        ├── No email account connected
        │     → HTTP 422: "No email account is configured for this organization."
        │     → [Banner] + [→ Connect Email Account]
        │
        ├── Sequence is empty (no steps defined)
        │     → HTTP 422: "The attached sequence has no steps."
        │     → [Banner] + [→ Edit Sequence]
        │
        ├── Segment returns 0 leads
        │     → HTTP 422: "The selected segment contains no leads."
        │     → [Banner] + [→ Edit Segment]
        │
        └── All prerequisites met → Campaign launches ✓
```

---

*This document is the authoritative reference for all user-facing behavior decisions. Every screen, state, and transition in this system must correspond to an entry here. Update USER_FLOW.md whenever a flow changes, a new screen is added, or a new error condition is handled.*

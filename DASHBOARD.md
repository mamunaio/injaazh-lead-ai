# DASHBOARD.md — Injaazh Lead AI: Dashboard Design Specification

> **Dashboard Layout Blueprint**  
> Version: 1.0 | Last Updated: July 2026  
> Companion documents: [PRODUCT.md](./PRODUCT.md) | [IA.md](./IA.md) | [SCREENS.md](./SCREENS.md)  
> Status: Living Document — Update before any dashboard UI work begins.

---

## Table of Contents

1. [Design Intent](#1-design-intent)
2. [Overall Layout Architecture](#2-overall-layout-architecture)
3. [Topbar (Header)](#3-topbar-header)
4. [Sidebar](#4-sidebar)
5. [Dashboard Canvas — Widget Layout](#5-dashboard-canvas--widget-layout)
6. [Widget: Metric Cards](#6-widget-metric-cards)
7. [Widget: Lead Summary](#7-widget-lead-summary)
8. [Widget: Campaign Summary](#8-widget-campaign-summary)
9. [Widget: Charts](#9-widget-charts)
10. [Widget: Recent Activities](#10-widget-recent-activities)
11. [Widget: AI Insights](#11-widget-ai-insights)
12. [Widget: Quick Actions](#12-widget-quick-actions)
13. [Responsive Behavior](#13-responsive-behavior)
14. [Data Sources](#14-data-sources)
15. [Interaction States](#15-interaction-states)

---

## 1. Design Intent

The Dashboard is the first screen a user sees after login. It must achieve three things within 3 seconds:

1. **Orient**: Show the user where they are and what their organization looks like right now.
2. **Surface**: Surface the most critical numbers without overwhelming.
3. **Activate**: Give the user an obvious next action if no data exists yet.

### Design Pillars for the Dashboard
- **Dark, premium aesthetic**: Deep dark canvas (`#0B0E14`), glass-morphism widgets, gradient highlights on key numbers.
- **Hierarchy through color and size**: The most important numbers are biggest and most colorful. Secondary context is muted.
- **No dead ends**: Every widget has an empty state with a CTA. No blank panels.
- **Progressive density**: Desktop shows everything. Tablet collapses non-critical widgets. Mobile shows only the top 5 most critical data points.

---

## 2. Overall Layout Architecture

### Zone Map (Desktop)

```
┌────────────────────────────────────────────────────────────────────────────┐
│                          TOPBAR — 60px fixed                               │
├──────────────┬─────────────────────────────────────────────────────────────┤
│              │                                                              │
│   SIDEBAR    │                    DASHBOARD CANVAS                         │
│   240px      │                                                              │
│   fixed      │   ┌──────────────────────────────────────────────────────┐  │
│              │   │  PAGE HEADER (Title + Date + Quick Action buttons)   │  │
│   (see §4)   │   ├──────────────────────────────────────────────────────┤  │
│              │   │  ROW 1: METRIC CARDS (4 cards, equal columns)        │  │
│              │   ├──────────────────────────────────────────────────────┤  │
│              │   │  ROW 2: CHARTS (2/3 width) │ QUICK ACTIONS (1/3)    │  │
│              │   ├──────────────────────────────────────────────────────┤  │
│              │   │  ROW 3: LEAD SUMMARY (1/2) │ CAMPAIGN SUMMARY (1/2) │  │
│              │   ├──────────────────────────────────────────────────────┤  │
│              │   │  ROW 4: RECENT ACTIVITIES (2/3) │ AI INSIGHTS (1/3) │  │
│              │   └──────────────────────────────────────────────────────┘  │
│              │                                                              │
└──────────────┴─────────────────────────────────────────────────────────────┘
```

### Canvas Constraints

| Property | Value |
|----------|-------|
| Max canvas width | 1200px (centered with auto margins) |
| Canvas padding | `2rem 5%` (horizontal) |
| Row gap between widget rows | `1.5rem` |
| Column gap within rows | `1.5rem` |
| Widget border-radius | `16px` |
| Widget background | `rgba(30, 41, 59, 0.4)` with `backdrop-filter: blur(12px)` |
| Widget border | `1px solid rgba(255, 255, 255, 0.05)` |
| Widget top highlight line | `1px linear gradient from transparent → rgba(255,255,255,0.1) → transparent` |

---

## 3. Topbar (Header)

> Full specification in [IA.md §4](./IA.md). Dashboard-specific notes below.

### Topbar Anatomy on Dashboard

```
┌───────────────────────────────────────────────────────────────────────────┐
│  [🔷 Logo]  Injaazh   [▾ Acme Corp ▾]   [🔍 Search leads, campaigns...] [⌘K] [🔔2] [👤▾] │
└───────────────────────────────────────────────────────────────────────────┘
```

### Dashboard-Specific Topbar Behaviour
- The search field placeholder on the Dashboard reads: `"Search leads, campaigns, contacts..."`
- The notification bell shows the count of **unread notifications** from all event types.
- When on the Dashboard, the Logo navigates to `/dashboard` (same page — no visual change).
- The topbar uses a `backdrop-filter: blur(12px)` over the dark background, ensuring the glow blobs behind it are softly visible through the header.

### Topbar Visual Specs

| Property | Value |
|----------|-------|
| Height | 60px |
| Background | `rgba(11, 14, 20, 0.85)` |
| Backdrop filter | `blur(12px)` |
| Bottom border | `1px solid rgba(255, 255, 255, 0.05)` |
| Z-index | 50 |
| Position | Fixed, full width |

---

## 4. Sidebar

> Full specification in [IA.md §3](./IA.md). Dashboard-specific notes below.

### Sidebar Visual Specs

| Property | Value |
|----------|-------|
| Width (expanded) | 240px |
| Width (collapsed) | 64px |
| Background | `rgba(11, 14, 20, 0.95)` |
| Right border | `1px solid rgba(255, 255, 255, 0.05)` |
| Position | Fixed, left, top 60px (below header), full height |
| Z-index | 40 |
| Transition | `width 250ms ease` |

### Dashboard Active State in Sidebar
- "Dashboard" nav item shows:
  - Left accent bar: `3px solid` — gradient `#6366f1 → #a855f7`
  - Background: `rgba(99, 102, 241, 0.08)`
  - Label: white, font-weight `600`
  - Icon: white (not muted)
- All other items: icon + label are `#94a3b8` (slate-400)

### Sidebar Logo Area

```
┌────────────────────────────┐
│  [🔷]  Injaazh Lead AI  [<]│  ← [<] = collapse toggle button
└────────────────────────────┘
```
- Logo area height: `60px` (same as topbar, creates visual alignment)
- Collapse toggle: Right-aligned icon button, rotates 180° when collapsed
- Collapsed state shows only the `[🔷]` icon, centred

---

## 5. Dashboard Canvas — Widget Layout

### Full Layout Grid (Desktop — ≥ 1024px)

```
PAGE HEADER
─────────────────────────────────────────────────────────────────────────────
ROW 1 — METRIC CARDS
┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│ Total Leads  │ │ Emails Sent  │ │  Open Rate   │ │  Reply Rate  │
│  [number]    │ │  [number]    │ │  [%]         │ │  [%]         │
└──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘
─────────────────────────────────────────────────────────────────────────────
ROW 2 — CHARTS + QUICK ACTIONS
┌────────────────────────────────────────┐ ┌───────────────────────────┐
│     OUTREACH PERFORMANCE CHART         │ │      QUICK ACTIONS        │
│     (line chart — 30 day trend)        │ │   [+ Add Lead]            │
│                                        │ │   [+ Create Campaign]     │
│     [Open Rate] [Reply Rate]           │ │   [+ New Sequence]        │
│                                        │ │   [Run AI Audit]          │
└────────────────────────────────────────┘ │   [Import Leads]          │
                 2/3                        └───────────────────────────┘
                                                         1/3
─────────────────────────────────────────────────────────────────────────────
ROW 3 — LEAD SUMMARY + CAMPAIGN SUMMARY
┌───────────────────────────────────────┐ ┌──────────────────────────────┐
│          LEAD SUMMARY                 │ │      CAMPAIGN SUMMARY        │
│  Status breakdown + top leads         │ │  Active campaigns + progress │
└───────────────────────────────────────┘ └──────────────────────────────┘
                 1/2                                     1/2
─────────────────────────────────────────────────────────────────────────────
ROW 4 — RECENT ACTIVITIES + AI INSIGHTS
┌───────────────────────────────────────────┐ ┌────────────────────────┐
│           RECENT ACTIVITIES               │ │      AI INSIGHTS       │
│   Timeline of email events + system acts  │ │  Top-scored leads      │
│                                           │ │  Enrichment queue      │
└───────────────────────────────────────────┘ └────────────────────────┘
                    2/3                                    1/3
```

### Grid Implementation Reference

| Row | Grid Template | Notes |
|-----|--------------|-------|
| Row 1 | `repeat(4, 1fr)` | 4 equal columns |
| Row 2 | `2fr 1fr` | Chart takes 2/3, Quick Actions 1/3 |
| Row 3 | `1fr 1fr` | Equal halves |
| Row 4 | `2fr 1fr` | Activities 2/3, AI Insights 1/3 |

---

## 6. Widget: Metric Cards

### Purpose
Surface the 4 most important KPIs instantly. These are always the topmost, most visible data points on the dashboard.

### Cards (Left to Right)

#### Card 1 — Total Leads

| Property | Value |
|----------|-------|
| Label | "Total Leads" |
| Value | Integer count (e.g., `1,248`) |
| Value color | Blue gradient: `#60a5fa → #3b82f6` |
| Icon | `Users` (top-right corner, muted) |
| Trend indicator | "+12 today" (positive: green, negative: red) |
| Click action | Navigates to `/leads` |

#### Card 2 — Emails Sent

| Property | Value |
|----------|-------|
| Label | "Emails Sent" |
| Value | Integer count (e.g., `4,830`) |
| Value color | Purple gradient: `#c084fc → #9333ea` |
| Icon | `Mail` (top-right corner, muted) |
| Trend indicator | "+63 this week" |
| Click action | Navigates to `/campaigns` |

#### Card 3 — Open Rate

| Property | Value |
|----------|-------|
| Label | "Open Rate" |
| Value | Percentage (e.g., `38.2%`) |
| Value color | Green gradient: `#34d399 → #10b981` |
| Icon | `Eye` (top-right corner, muted) |
| Trend indicator | "▲ +2.4% vs last week" (green if up, red if down) |
| Benchmark indicator | Subtle label: "Industry avg: 21%" (future) |
| Click action | No navigation (informational) |

#### Card 4 — Reply Rate

| Property | Value |
|----------|-------|
| Label | "Reply Rate" |
| Value | Percentage (e.g., `8.7%`) |
| Value color | Orange gradient: `#fb923c → #f97316` |
| Icon | `MessageSquare` (top-right corner, muted) |
| Trend indicator | "▲ +1.1% vs last week" |
| Click action | No navigation (informational) |

### Card Anatomy (All Cards)

```
┌──────────────────────────────────────────┐
│ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │  ← top highlight line
│                               [Icon]    │
│  LABEL                                  │
│  VALUE                                  │  ← Large, gradient font
│  Trend indicator                        │  ← Small, colored
└──────────────────────────────────────────┘
```

### Card Visual Specs

| Property | Value |
|----------|-------|
| Padding | `1.5rem` |
| Background | Glassmorphism (see canvas spec) |
| Hover transform | `translateY(-5px)` |
| Hover border-color | `rgba(99, 102, 241, 0.3)` |
| Hover box-shadow | `0 10px 30px -10px rgba(99, 102, 241, 0.15)` |
| Transition | `all 0.3s ease` |
| Label font size | `0.75rem`, `font-weight: 500`, uppercase, letter-spacing `0.05em`, color `#94a3b8` |
| Value font size | `2.5rem`, `font-weight: 700` |
| Trend font size | `0.8rem` |
| Icon size | `20px`, color `rgba(148, 163, 184, 0.4)` |

### Card Loading State
Each card shows two skeleton blocks:
```
[████████ 60%] ← label skeleton (16px height)
[████████████ 80%] ← value skeleton (40px height)
```
Both animate with shimmer sweep.

### Card Empty / Zero State
When value is `0`:
- Still renders the number `0` in the gradient color — this is NOT an error.
- Trend shows `"—"` (no prior data to compare).

---

## 7. Widget: Lead Summary

### Purpose
Give the user a breakdown of their lead database without leaving the dashboard. Answer: "What does my lead pool look like right now?"

### Position
Row 3, Left column (1/2 width)

### Widget Anatomy

```
┌─────────────────────────────────────────────────────────┐
│  LEAD SUMMARY                            [View All →]   │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  STATUS BREAKDOWN (horizontal stacked bar)              │
│  ████████████ New(68)  ████ Contacted(24)  ██ Qual(8)  │
│                                                         │
├─────────────────────────────────────────────────────────┤
│  BREAKDOWN TABLE                                        │
│  ● New             68 leads    ████████░░  54%         │
│  ● Contacted       24 leads    ████░░░░░░  19%         │
│  ● Qualified        8 leads    █░░░░░░░░░   6%         │
│  ● Lost             3 leads    ░░░░░░░░░░   2%         │
│  ● Won             22 leads    ████░░░░░░  17%         │
├─────────────────────────────────────────────────────────┤
│  TOP LEADS BY SCORE                                     │
│  [Avatar] John Doe · Acme Corp           Score: [92]   │
│  [Avatar] Sara Lee · Beta Inc            Score: [87]   │
│  [Avatar] Mike Yu · Gamma Ltd            Score: [81]   │
└─────────────────────────────────────────────────────────┘
```

### Sub-Components

#### Status Breakdown Bar
- **Horizontal stacked bar chart** (no external library needed — pure CSS flex)
- Each segment proportional to its count
- Color mapping:
  - New: `#60a5fa` (blue)
  - Contacted: `#a78bfa` (violet)
  - Qualified: `#34d399` (green)
  - Lost: `#f87171` (red)
  - Won: `#fbbf24` (amber)
- Total leads displayed above bar: "Total: 125 leads"

#### Status Breakdown Table
- Each row: Color dot + Status label + Count + Mini progress bar + Percentage
- Mini progress bar: inline, proportional, same color as dot
- Rows are non-interactive (informational)

#### Top Leads by Score
- Shows top 3 leads ranked by AI score (descending)
- Each row: Avatar (initials, color-coded) + Name + Company + Score badge
- Score badge: circular, gradient color (green for 80+, amber for 50–79)
- Clicking a row → `/leads/:id` (FUTURE)
- Section only shows if AI scoring has been run on at least 1 lead

### Empty State
```
Icon: Users illustration
Heading: "No leads yet"
Body: "Add or import leads to see a summary of your pipeline here."
CTA: [+ Import Leads]
```

### Loading State
- Status bar: single skeleton bar (full width, 16px height)
- Table: 4 skeleton rows
- Top leads: 3 skeleton rows with avatar circle

---

## 8. Widget: Campaign Summary

### Purpose
Show the current state of all campaigns at a glance. Answer: "How are my campaigns performing right now?"

### Position
Row 3, Right column (1/2 width)

### Widget Anatomy

```
┌──────────────────────────────────────────────────────────┐
│  CAMPAIGN SUMMARY                       [View All →]    │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  CAMPAIGN HEALTH SUMMARY (3 stat chips)                  │
│  [● 3 Active]  [⏸ 1 Paused]  [✓ 8 Completed]           │
│                                                          │
├──────────────────────────────────────────────────────────┤
│  ACTIVE CAMPAIGNS                                        │
│                                                          │
│  Summer Outreach 2026           Active  ●               │
│  ████████████░░░░░░  42/60 leads                        │
│  Opened: 28%   Replied: 6%                              │
│  ─────────────────────────────────────────────────────  │
│  Cold SDR Q3                    Active  ●               │
│  ████████░░░░░░░░░░  18/80 leads                        │
│  Opened: 31%   Replied: 9%                              │
│  ─────────────────────────────────────────────────────  │
│  [+ Create Campaign]                                    │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

### Sub-Components

#### Campaign Health Chips
- Horizontal row of 3 status count chips
- Each chip: Status dot + Count + Label
- Colors:
  - Active: green dot, `rgba(52, 211, 153, 0.1)` background, green text
  - Paused: amber dot, `rgba(251, 191, 36, 0.1)` background, amber text
  - Completed: blue dot, `rgba(96, 165, 250, 0.1)` background, blue text

#### Active Campaigns List
- Shows only **Active** campaigns (not Draft, Paused, or Completed)
- Max 3 campaigns shown; "View All" link if more exist
- Each campaign row:
  - **Campaign Name** (bold) + Status badge (right-aligned)
  - **Progress bar**: filled (completed leads) / total leads, with "X/Y leads" label
    - Filled portion: `linear-gradient(90deg, #6366f1, #a855f7)`
    - Background track: `rgba(255,255,255,0.05)`
    - Border-radius: `999px`
    - Height: `8px`
  - **Inline metrics**: Open Rate% + Reply Rate% (small, muted label + colored value)
  - Clicking campaign name → `/campaigns/:id` (FUTURE)

### Empty State

**No campaigns at all:**
```
Icon: Megaphone illustration
Heading: "No campaigns running"
Body: "Create your first campaign to start engaging your leads at scale."
CTA: [+ Create Campaign]
```

**Has campaigns but none are Active:**
```
Chips: 0 Active | 1 Paused | 3 Completed
No Active Campaigns list shown
Body: "No campaigns are currently running."
CTA: [+ Create Campaign] | [View All Campaigns]
```

### Loading State
- 2 skeleton campaign rows, each with skeleton progress bar and metric chips.

---

## 9. Widget: Charts

### Purpose
Visualize outreach performance trends over time. Answer: "Is my outreach getting better or worse over the last 30 days?"

### Position
Row 2, Left block (2/3 width)

### Widget Anatomy

```
┌──────────────────────────────────────────────────────────────────────┐
│  OUTREACH PERFORMANCE                           [30D ▾] [7D] [90D]  │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┤                                                                   │
│  ┤       ╭──╮                 ╭──────╮                               │
│  ┤      ╭╯  ╰────────────────╯      ╰──╮                           │
│  ┤   ╭──╯                               ╰──────╮                    │
│  ┤──╮╯                                          ╰──╮               │
│  ┤  ╰──                                            ╰────            │
│  ┤                                                                   │
│  └─────────────────────────────────────────────────────────         │
│   Jul 1   Jul 5   Jul 10   Jul 15   Jul 20   Jul 25   Jul 30        │
│                                                                      │
│  ─── Open Rate (%)   ─── Reply Rate (%)                             │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### Chart Type
**Multi-line area chart** (two overlapping area lines):
- Line 1: Open Rate % — color `#6366f1` (indigo)
- Line 2: Reply Rate % — color `#10b981` (emerald)
- Area fill: Same color, `opacity: 0.08` (very subtle fill under each line)
- Grid lines: Horizontal only, `rgba(255,255,255,0.04)`, no vertical grid
- Axis labels: Muted (`#475569`), small font (`0.75rem`)
- Tooltip on hover: Glass-style popup showing exact values for hovered date

### Time Range Selector
- Pill tabs in top-right of widget header: `7D | 30D | 90D`
- Default: `30D`
- Active tab: Indigo background, white text
- Switching tabs re-fetches data for the selected range

### Legend
- Below chart, left-aligned
- Color swatch + label for each line
- Labels: "Open Rate (%)" and "Reply Rate (%)"

### Secondary Chart: Email Volume Bar Chart *(FUTURE)*
Positioned below the line chart (collapsible):
- Vertical bar chart: Emails sent per day
- Bar color: `rgba(99, 102, 241, 0.5)` with `#6366f1` top edge

### Chart Library Note
> The specific charting library (Recharts, Chart.js, Nivo, or Tremor) is to be decided at implementation time. This spec defines the data shape and visual intent, not the library.

### Empty State
```
Chart area shows:
Icon: Bar chart (dashed/empty style)
Heading: "No outreach data yet"
Body: "Launch a campaign and start sending emails to see your performance trends here."
CTA: [+ Create Campaign]
```

### Loading State
- Chart area replaced by a single large skeleton block (full width, 200px height, shimmer animation).
- Time range selector: greyed out / disabled.

---

## 10. Widget: Recent Activities

### Purpose
Show the user what has happened most recently across their workspace — a live pulse of the platform.

### Position
Row 4, Left block (2/3 width)

### Widget Anatomy

```
┌──────────────────────────────────────────────────────────────────────┐
│  RECENT ACTIVITY                                   [View All →]     │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  [💬]  John Doe replied to "Summer Outreach 2026"         2m ago    │
│  [👁]  Sarah Lee opened "Cold SDR Q3" email               14m ago   │
│  [✅]  "Q3 Outreach" campaign completed                   1h ago    │
│  [📥]  152 leads imported from CSV                        3h ago    │
│  [✨]  AI audit completed for Acme Corp                   5h ago    │
│  [👤]  New lead added: Mike Yu · Gamma Ltd                Yesterday  │
│  [📣]  "Summer Outreach 2026" campaign launched           Yesterday  │
│  [💬]  Tom Baker replied to "VIP Prospect Seq"            2 days ago │
│                                                                      │
│                              [Load More]                             │
└──────────────────────────────────────────────────────────────────────┘
```

### Activity Item Types

| Icon | Event Type | Description Template |
|------|-----------|---------------------|
| 💬 | Lead Reply | `{Lead Name} replied to "{Campaign Name}"` |
| 👁 | Email Opened | `{Lead Name} opened "{Campaign Name}" email` |
| 🖱 | Link Clicked | `{Lead Name} clicked a link in "{Campaign Name}"` |
| 📧 | Email Delivered | `Email delivered to {Lead Name}` (low priority — batch these) |
| ✅ | Campaign Complete | `"{Campaign Name}" campaign completed` |
| ❌ | Campaign Error | `{N} emails failed in "{Campaign Name}"` |
| 📥 | Import Complete | `{N} leads imported from CSV` |
| ✨ | AI Enrichment Done | `AI audit completed for {Company Name}` |
| 👤 | Lead Created | `New lead added: {Lead Name} · {Company}` |
| 📣 | Campaign Launched | `"{Campaign Name}" campaign launched` |
| 🗓 | Task Overdue | `Task overdue: "{Task Title}"` |

### Activity Item Anatomy

```
[Icon circle] [Description text]       [Relative time]
               [Optional: Lead name link or Campaign link]
```

- Icon circle: 36px × 36px, color-coded background per event type
  - Reply / Opened / Clicked: indigo/green/blue tones
  - Error / Overdue: red tone
  - System events: neutral slate
- Description: max 1 line, truncated with ellipsis if longer
- Relative time: right-aligned, `#64748b`, `0.8rem`
- Hovering a row: subtle background highlight, cursor pointer
- Clicking a lead name → `/leads/:id` (FUTURE)
- Clicking a campaign name → `/campaigns/:id` (FUTURE)
- [Load More] button at bottom: loads next 10 events (pagination)

### Activity Priority
Events are sorted by most recent first. Batching rules:
- Multiple "Email Opened" by the same lead within 1 hour → collapsed to 1 row: "Sarah Lee opened {N} emails"
- Multiple "Email Delivered" → collapsed: "{N} emails delivered in [Campaign Name]"

### Empty State
```
Icon: Pulse / Activity waveform (flat)
Heading: "No activity yet"
Body: "Activity will appear here as leads open emails, campaigns run, and tasks are completed."
```

### Loading State
- 6 skeleton activity rows, each with:
  - Left: skeleton circle (36px)
  - Middle: skeleton text block (70% width, 16px height)
  - Right: skeleton time block (20% width)

---

## 11. Widget: AI Insights

### Purpose
Proactively surface AI-generated intelligence without the user having to manually navigate to the AI Tools section. Answer: "Who should I be talking to right now?"

### Position
Row 4, Right block (1/3 width)

### Widget Anatomy

```
┌──────────────────────────────────────────┐
│  AI INSIGHTS                  [✨ Run]   │
├──────────────────────────────────────────┤
│  TOP LEADS TO CONTACT TODAY              │
│                                          │
│  [Av] John Doe · Acme                   │
│       Score: [92] · Opened last email   │
│       "Strong match for your ICP"       │
│                                          │
│  [Av] Sara Lee · Beta Inc               │
│       Score: [87] · No reply in 3 days  │
│       "Ready for follow-up"             │
│                                          │
│  [Av] Mike Yu · Gamma Ltd               │
│       Score: [81] · New lead, no email  │
│       "Start outreach today"            │
│                                          │
├──────────────────────────────────────────┤
│  ENRICHMENT QUEUE                        │
│  4 leads awaiting website audit         │
│  [Run AI Audit for all]                 │
├──────────────────────────────────────────┤
│  CAMPAIGN SUGGESTION                     │
│  "12 qualified leads have no campaign.  │
│   Consider adding them to outreach."    │
│  [Create Campaign]                      │
└──────────────────────────────────────────┘
```

### Sub-Sections

#### Top Leads to Contact Today

Algorithm (backend-determined, displayed in widget):
- Leads with high AI score (≥ 75) that:
  - Opened an email but have not replied in 3–7 days
  - OR have no campaign yet and were enriched recently
  - OR have a task due today linked to them
- Maximum 3 leads shown
- Each lead item:
  - Avatar (initials, gradient background)
  - Name + Company (bold)
  - Score badge (gradient circle)
  - Engagement status (1 line, muted): "Opened last email", "No reply in 3 days", "New lead"
  - AI reasoning label (italic, faint): Short 1-sentence AI rationale
  - Click → Lead Detail (FUTURE)

#### Enrichment Queue
- Count of leads that have a website URL but no `websiteAnalysis` data yet
- [Run AI Audit for all] → triggers bulk enrichment job
- If queue is empty: Section hidden (not shown as empty)

#### Campaign Suggestion
- AI-generated recommendation based on lead pool analysis:
  - Detects uncontacted qualified leads with no active campaign
  - Detects high-score leads whose campaigns ended without reply
- Max 1 suggestion shown at a time
- [Action CTA] varies based on suggestion type

### [Run] Button (Top Right)
- Triggers a fresh AI insights calculation for the dashboard
- Shows spinner while calculating (`~5–15 seconds`)
- Only available once per 30 minutes (cooldown to avoid Gemini overuse)
- Tooltip on cooldown: "AI insights were updated 12 minutes ago"

### Empty State
```
Icon: Sparkles / wand illustration
Heading: "No AI insights yet"
Body: "Run website audits and AI scoring on your leads to unlock personalized recommendations."
CTA: [✨ Run AI on my leads]
```

### Loading State
- Top 3 skeleton lead rows (avatar circle + 2 text lines each).
- Enrichment queue: skeleton single-line text.

---

## 12. Widget: Quick Actions

### Purpose
Give the user one-click access to the most common actions in the product without needing to navigate away from the dashboard. Especially important for power users and new users following the onboarding flow.

### Position
Row 2, Right block (1/3 width)

### Widget Anatomy

```
┌──────────────────────────────────────────┐
│  QUICK ACTIONS                           │
├──────────────────────────────────────────┤
│                                          │
│  [+ ]  Add Lead                         │
│  [↑ ]  Import Leads (CSV)               │
│  [📣]  Create Campaign                  │
│  [🔀]  New Sequence                     │
│  [✨]  Run AI Website Audit             │
│                                          │
├──────────────────────────────────────────┤
│  ONBOARDING PROGRESS  ████████░░░  80%  │
│                                          │
│  ✓ Connected email account              │
│  ✓ Imported your first leads            │
│  ✓ Created a sequence                   │
│  □ Launch your first campaign           │
│                                          │
└──────────────────────────────────────────┘
```

### Quick Action Buttons

| Icon | Label | Destination |
|------|-------|-------------|
| `+` | Add Lead | `/leads/new` |
| `↑` | Import Leads | `/leads/import` |
| `📣` | Create Campaign | `/campaigns/new` |
| `🔀` | New Sequence | `/sequences/new` |
| `✨` | Run AI Website Audit | `/ai/audit` |

### Action Button Visual Spec

```
Each action is a full-width row button:
[Icon (left, 20px, color-coded)] [Label (left-aligned, bold)] [→ chevron (right, muted)]
```

- Background: `rgba(255,255,255,0.03)`
- Hover: `rgba(255,255,255,0.06)` + `translateX(3px)` slide on the label
- Border-bottom: `1px solid rgba(255,255,255,0.04)` (divider between items)
- Border-radius: `8px` per button
- Height: `48px` per action button
- Icon color: Each icon has a distinct accent color (blue, violet, indigo, emerald, amber)

### Onboarding Progress Section
- Only visible if the organization has not yet completed all 4 onboarding steps
- Progress bar: horizontal, filled portion = `count of completed steps / 4`
- Completion percentage shown: "80%"
- Checklist: `✓` (checked, muted color) or `□` (unchecked, white)
- Unchecked items are clickable links (bold, underlined on hover)
- Once all 4 steps are complete: Section disappears permanently
- Completion state stored on the organization record

### Loading State
Action buttons: No loading state needed (they're static navigation links).
Onboarding checklist: Small shimmer on the progress bar only.

---

## 13. Responsive Behavior

### Breakpoint System

| Breakpoint | Label | Width Range |
|-----------|-------|-------------|
| Mobile | `sm` | < 640px |
| Mobile-L | `md` | 640px – 767px |
| Tablet | `lg` | 768px – 1023px |
| Desktop | `xl` | 1024px – 1279px |
| Wide | `2xl` | ≥ 1280px |

---

### Desktop (≥ 1024px) — Full Layout

```
Sidebar: Expanded (240px), all labels visible
Canvas: All 4 rows visible with correct column splits
Row 1: 4-column metric card grid
Row 2: Chart (2/3) + Quick Actions (1/3)
Row 3: Lead Summary (1/2) + Campaign Summary (1/2)
Row 4: Recent Activities (2/3) + AI Insights (1/3)
```

---

### Tablet (768px – 1023px) — Condensed Layout

```
Sidebar: Collapsed to icon-only (64px)
Canvas: Full width minus 64px sidebar

Row 1: 2 columns × 2 rows
  [Total Leads]  [Emails Sent]
  [Open Rate]    [Reply Rate]

Row 2: Stacked
  Chart → Full width
  Quick Actions → Full width (buttons in 2-column grid)

Row 3: Stacked
  Lead Summary → Full width (Top leads section collapsed)
  Campaign Summary → Full width

Row 4: Stacked
  Recent Activities → Full width
  AI Insights → Full width (Enrichment queue and suggestion collapsed)
```

---

### Mobile (< 768px) — Prioritized Layout

```
Sidebar: Hidden (replaced by bottom navigation bar)
Canvas: Full width, 16px horizontal padding

VISIBLE ROWS:
  Row 1: Metric Cards — 2×2 grid (all 4 cards)
  Row 2: Campaign Summary only (chart hidden — too complex for small screen)
  Row 3: Recent Activities (last 5 items, no "Load More" initially)
  Row 4: Quick Actions (full-width buttons, stacked)

HIDDEN ON MOBILE:
  Chart (Row 2 left block) — accessible via dedicated Analytics page (Future)
  Lead Summary breakdown bar — replaced by single "Total Leads" count
  AI Insights widget — accessible via AI Tools section
  Onboarding checklist — shown as a banner at top of canvas instead

Bottom Navigation Bar (Mobile Only):
  [Dashboard] [Leads] [Campaigns] [CRM] [Menu]
  Each tab: icon + label (5 items max)
  Active tab: indigo gradient text + colored icon
```

---

### Widget Collapse Priority on Smaller Screens

| Widget | Desktop | Tablet | Mobile |
|--------|---------|--------|--------|
| Metric Cards | Full (4-col) | 2×2 grid | 2×2 grid |
| Performance Chart | Visible | Visible (full width) | Hidden |
| Quick Actions | Sidebar column | Full width row | Full width (bottom) |
| Lead Summary | Full | Full width, no Top Leads | Hidden (stats in Metric Cards) |
| Campaign Summary | Full | Full width | Simplified (name + progress only) |
| Recent Activities | Full | Full width | Last 5 only |
| AI Insights | Full | Full width | Hidden |
| Onboarding Progress | In Quick Actions | Banner at top | Banner at top |

---

## 14. Data Sources

All dashboard data is fetched on initial load. No polling — user manually refreshes or clicks Retry.

| Widget | API Endpoint | Response Used |
|--------|-------------|--------------|
| Metric Cards | `GET /analytics/dashboard` | `totalLeads`, `emailsSent`, `openRate`, `replyRate` |
| Lead Summary | `GET /analytics/dashboard` + `GET /leads?limit=3&sortBy=score` | `importedToday`, top 3 scored leads |
| Campaign Summary | `GET /analytics/campaigns` | Campaign name, status, stats |
| Performance Chart | `GET /analytics/trends?range=30d` *(FUTURE)* | Date-keyed array of open/reply rates |
| Recent Activities | `GET /activities?limit=20` *(FUTURE)* | Activity event array |
| AI Insights | `GET /ai/insights` *(FUTURE)* | Top leads array, enrichment queue count |
| Quick Actions | Static (no API) | Navigation links only |
| Onboarding Progress | `GET /organizations/onboarding` *(FUTURE)* | Checklist completion flags |

### Fetch Strategy
- All API calls are fired in **parallel** using `Promise.all` on component mount.
- Each widget manages its own loading/error state independently.
- A single widget failing does not block others from rendering.
- Data is not cached between sessions (always fresh on login or page reload).

---

## 15. Interaction States

### Global Dashboard States

| State | Trigger | UI Behaviour |
|-------|---------|-------------|
| **Initial Load** | Component mounts, no data yet | All widgets show skeleton loaders simultaneously |
| **Loaded** | All API calls resolve | Data renders with fade-in animation (0.3s opacity) |
| **Partial Load** | Some API calls fail | Successful widgets render, failed widgets show error state |
| **Empty** | All data is zero / none | Metric cards show `0`, widgets show their empty states |
| **Error** | API call fails | Per-widget inline error with [Retry] button |

### Micro-interactions

| Element | Interaction | Animation |
|---------|------------|-----------|
| Metric Cards | Mouse hover | `translateY(-5px)` + glow shadow (0.3s ease) |
| Quick Action buttons | Mouse hover | Label slides right `translateX(3px)`, background lightens |
| Campaign row | Mouse hover | Row background lightens |
| Activity row | Mouse hover | Row background lightens, cursor pointer |
| AI Insights lead row | Mouse hover | Row highlights, cursor pointer |
| [Load More] button | Click | Button text: "Loading..." + spinner, then new items append below with fade-in |
| Chart line | Mouse hover | Tooltip appears at cursor position showing exact date and values |
| Time range tabs (chart) | Click | Active tab transitions with color change (0.2s) + chart data animates |
| Notification bell | New notification arrives | Bell icon jiggles (shake animation, 0.5s) + badge count increments |

### Widget Header Patterns

All widget panels follow a consistent header pattern:

```
┌──────────────────────────────────────────────────┐
│  WIDGET TITLE (left)          [Optional CTA] →   │
├──────────────────────────────────────────────────┤
│  Widget content                                  │
└──────────────────────────────────────────────────┘
```

- Widget title: `0.875rem`, `font-weight: 600`, `color: #94a3b8`, uppercase, letter-spacing `0.05em`
- Optional CTA: `"View All →"` or `"Run →"` in link style (`#6366f1`, hover underline)
- Header bottom border: `1px solid rgba(255, 255, 255, 0.04)`
- Header padding: `1.25rem 1.5rem`
- Content padding: `1.5rem`

---

*This document defines the intended design, data requirements, and responsive behavior for the Dashboard. All widget implementations must comply with this specification. Update this document if a new widget is added or an existing widget's data source changes.*

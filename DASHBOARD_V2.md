# DASHBOARD_V2.md — Injaazh Lead AI: Dashboard Design Specification v2

> **Definitive Dashboard Blueprint — Deep Detail**  
> Version: 2.0 | Last Updated: July 2026  
> Supersedes: [DASHBOARD.md](./DASHBOARD.md) — V2 adds Lead Pipeline, Team Activity, and full widget-level detail  
> Companion documents: [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) | [APP_LAYOUT.md](./APP_LAYOUT.md) | [COMPONENTS.md](./COMPONENTS.md)

---

## Table of Contents

1. [Dashboard Purpose & Goals](#1-dashboard-purpose--goals)
2. [Full Widget Map](#2-full-widget-map)
3. [Page Header Zone](#3-page-header-zone)
4. [Row 1 — KPI Cards](#4-row-1--kpi-cards)
5. [Row 2 — Performance Chart + Quick Actions](#5-row-2--performance-chart--quick-actions)
6. [Row 3 — Lead Pipeline + Campaign Summary](#6-row-3--lead-pipeline--campaign-summary)
7. [Row 4 — AI Insights + Recent Activity](#7-row-4--ai-insights--recent-activity)
8. [Row 5 — Team Activity](#8-row-5--team-activity)
9. [Onboarding Overlay (First-Time Only)](#9-onboarding-overlay-first-time-only)
10. [Dashboard Loading Strategy](#10-dashboard-loading-strategy)
11. [Dashboard Empty State (Zero Data)](#11-dashboard-empty-state-zero-data)
12. [Dashboard Error Strategy](#12-dashboard-error-strategy)
13. [Widget Interaction Details](#13-widget-interaction-details)
14. [Responsive Layout by Breakpoint](#14-responsive-layout-by-breakpoint)
15. [Data Contract (API → Widget)](#15-data-contract-api--widget)

---

## 1. Dashboard Purpose & Goals

### The Dashboard Must Answer 6 Questions in Under 5 Seconds

1. **Health**: "How is my outreach performing right now?"
2. **Attention**: "What needs my action today?"
3. **Pipeline**: "Where do my leads sit in the funnel?"
4. **Momentum**: "Is performance trending up or down?"
5. **Team**: "What is my team working on?"
6. **AI**: "What is the AI telling me to do next?"

### Information Priority (Visual Weight)

```
HIGHEST PRIORITY ──────────────────────────────────────────► LOWEST
    KPI Cards > AI Insights > Lead Pipeline > Charts > Recent Activity > Team Activity
```

- KPI numbers are the **largest text** on the page.
- AI Insights has the **brightest accent** (sparkle icon, indigo gradient border).
- Lead Pipeline is **center-left** — the most valuable real estate.
- Team Activity is last row — contextual, not urgent.

---

## 2. Full Widget Map

### Desktop Layout Grid (≥ 1024px)

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│  PAGE HEADER                                                                        │
│  "Analytics Overview"                                          [date] [Refresh]     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                     │
│  ROW 1 — KPI CARDS (4 columns, equal width, height: 140px)                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐           │
│  │ TOTAL LEADS  │  │ EMAILS SENT  │  │  OPEN RATE   │  │  REPLY RATE  │           │
│  │   1,248      │  │   4,830      │  │   38.2%      │  │    8.7%      │           │
│  │ +12 today    │  │ +63 this wk  │  │ ▲ +2.4%     │  │ ▲ +1.1%     │           │
│  └──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘           │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                     │
│  ROW 2 (grid: 2fr | 1fr, height: 280px)                                            │
│  ┌────────────────────────────────────────────┐  ┌──────────────────────────────┐  │
│  │  PERFORMANCE CHART                         │  │  QUICK ACTIONS               │  │
│  │  Open Rate & Reply Rate — 30 day trend     │  │                              │  │
│  │                                            │  │  + Add Lead                  │  │
│  └────────────────────────────────────────────┘  │  ↑ Import Leads (CSV)        │  │
│                                                   │  📣 Create Campaign          │  │
│                                                   │  🔀 New Sequence             │  │
│                                                   │  ✨ Run AI Website Audit     │  │
│                                                   │  ────────────────────────    │  │
│                                                   │  Onboarding: ████░  75%      │  │
│                                                   └──────────────────────────────┘  │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                     │
│  ROW 3 (grid: 1fr | 1fr, height: 340px)                                            │
│  ┌──────────────────────────────────────────┐  ┌──────────────────────────────────┐ │
│  │  LEAD PIPELINE                           │  │  CAMPAIGN SUMMARY                │ │
│  │  Funnel + status breakdown + top leads   │  │  Health chips + active campaigns │ │
│  └──────────────────────────────────────────┘  └──────────────────────────────────┘ │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                     │
│  ROW 4 (grid: 1fr | 2fr, height: 380px)                                            │
│  ┌──────────────────────────────┐  ┌────────────────────────────────────────────┐  │
│  │  AI INSIGHTS                 │  │  RECENT ACTIVITY                           │  │
│  │  Top leads + suggestions     │  │  Real-time event timeline                  │  │
│  └──────────────────────────────┘  └────────────────────────────────────────────┘  │
│                                                                                     │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                     │
│  ROW 5 (grid: full width, height: 240px)                                            │
│  ┌─────────────────────────────────────────────────────────────────────────────┐   │
│  │  TEAM ACTIVITY                                                              │   │
│  │  Member cards → what each team member is working on right now               │   │
│  └─────────────────────────────────────────────────────────────────────────────┘   │
│                                                                                     │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

### Widget Reference Summary

| Widget | Row | Grid Column | Min Height | Scroll? |
|--------|-----|------------|-----------|---------|
| KPI Cards (×4) | 1 | `repeat(4, 1fr)` | `140px` | No |
| Performance Chart | 2 | `2fr` | `280px` | No |
| Quick Actions | 2 | `1fr` | `280px` | No |
| Lead Pipeline | 3 | `1fr` | `340px` | Internal scroll |
| Campaign Summary | 3 | `1fr` | `340px` | Internal scroll |
| AI Insights | 4 | `1fr` | `380px` | Internal scroll |
| Recent Activity | 4 | `2fr` | `380px` | Internal scroll |
| Team Activity | 5 | Full width | `240px` | Horizontal scroll |

---

## 3. Page Header Zone

### Layout

```
┌────────────────────────────────────────────────────────────────────────────────┐
│  [Gradient] Analytics Overview                  [Tue, 8 Jul 2026]  [↻ Refresh] │
└────────────────────────────────────────────────────────────────────────────────┘
```

### Element Spec

| Element | Spec |
|---------|------|
| Page title | "Analytics Overview", `font-size: 2.5rem`, `font-weight: 700`, `gradient.brand` text fill |
| Sub-label | "Your workspace at a glance", `font-size: 1rem`, `text.secondary`, below title |
| Date display | Current date in format "Tuesday, 8 July 2026", `text.secondary`, `0.875rem`, right-aligned |
| Refresh button | `IconButton`, `RefreshCw` icon, secondary variant, `0.875rem` label "Refresh", right of date |
| Padding-bottom | `2rem` — separates header from widgets |

### Refresh Behavior
- Clicking Refresh re-fires all API calls in parallel.
- Refresh icon animates (360° spin, `500ms`) while data loads.
- Each widget independently shows its loading state during refresh.
- After all data resolves, a `Toast` appears: "Dashboard updated just now ✓"

---

## 4. Row 1 — KPI Cards

### Layout
4-column equal grid, `gap: 1.5rem`, full canvas width.

### Card 1: Total Leads

```
┌──────────────────────────────────────────────────────┐
│ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │ ← top highlight line
│                                          [Users 20px]│
│  TOTAL LEADS                                         │
│  1,248                                               │ ← blue gradient, 2.5rem, bold
│  ▲ +12 added today               Industry: 842 avg  │ ← trend + benchmark (muted)
└──────────────────────────────────────────────────────┘
```

| Element | Spec |
|---------|------|
| Label | "TOTAL LEADS", `0.75rem`, uppercase, `letter-spacing: 0.05em`, `text.secondary` |
| Value | Integer, `2.5rem`, `font-weight: 800`, `gradient.blue` (`#60A5FA → #3B82F6`) |
| Trend | "▲ +12 added today", `0.8rem`, green if positive / red if negative |
| Benchmark | "Industry avg: 842" — optional future, muted, right-aligned in trend row |
| Icon | `Users`, `20px`, `rgba(96,165,250,0.30)`, top-right corner |
| Card click | Navigates to `/leads` |
| Height | `140px` |

---

### Card 2: Emails Sent

```
┌──────────────────────────────────────────────────────┐
│ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │
│                                           [Mail 20px]│
│  EMAILS SENT                                         │
│  4,830                                               │ ← purple gradient
│  ▲ +63 this week               Sent today: 18       │
└──────────────────────────────────────────────────────┘
```

| Element | Spec |
|---------|------|
| Value gradient | `#C084FC → #9333EA` |
| Trend | "+63 this week" |
| Secondary info | "Sent today: 18" (lighter, smaller) |
| Icon | `Mail`, `20px`, `rgba(192,132,252,0.30)` |
| Card click | Navigates to `/campaigns` |

---

### Card 3: Open Rate

```
┌──────────────────────────────────────────────────────┐
│ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │
│                                            [Eye 20px]│
│  OPEN RATE                                           │
│  38.2%                                               │ ← green gradient
│  ▲ +2.4% vs last week          Industry avg: 21%    │
└──────────────────────────────────────────────────────┘
```

| Element | Spec |
|---------|------|
| Value gradient | `#34D399 → #10B981` |
| Trend | "▲ +2.4% vs last week" — triangle changes direction based on value |
| Benchmark | "Industry avg: 21%" — persistent small label, helps contextualize |
| Icon | `Eye`, `20px`, `rgba(52,211,153,0.30)` |
| Card click | No navigation (informational) |

---

### Card 4: Reply Rate

```
┌──────────────────────────────────────────────────────┐
│ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │
│                                [MessageSquare 20px]  │
│  REPLY RATE                                          │
│  8.7%                                                │ ← orange gradient
│  ▲ +1.1% vs last week          Industry avg: 3.2%   │
└──────────────────────────────────────────────────────┘
```

| Element | Spec |
|---------|------|
| Value gradient | `#FB923C → #F97316` |
| Trend | "▲ +1.1% vs last week" |
| Icon | `MessageSquare`, `20px`, `rgba(251,146,60,0.30)` |
| Card click | No navigation (informational) |

---

### KPI Card Shared Specs

| Property | Value |
|----------|-------|
| Height | `140px` |
| Background | `rgba(30,41,59,0.40)` + `blur(12px)` |
| Border | `1px solid rgba(255,255,255,0.05)` |
| Top line | `1px` gradient highlight |
| Border-radius | `16px` |
| Padding | `1.5rem` |
| Hover transform | `translateY(-5px)` (clickable cards only) |
| Hover border | `rgba(99,102,241,0.30)` |
| Hover shadow | `0 10px 30px -10px rgba(99,102,241,0.15)` |
| Transition | `all 0.3s ease` |
| Value font-size | `2.5rem` |
| Value font-weight | `800` |
| Trend font-size | `0.8rem` |
| Label font-size | `0.75rem` |

### KPI Card Loading State

Each card independently shows:
```
[Skeleton 55% width, 14px height]   ← label
[Skeleton 75% width, 40px height]   ← value
[Skeleton 60% width, 14px height]   ← trend
```
Shimmer animation: 2s linear infinite, `background: linear-gradient(90deg, rgba(255,255,255,0.03), rgba(255,255,255,0.08), rgba(255,255,255,0.03))`, `background-size: 200% 100%`.

---

## 5. Row 2 — Performance Chart + Quick Actions

### Performance Chart Widget

```
┌──────────────────────────────────────────────────────────────────────┐
│  OUTREACH PERFORMANCE                         [7D] [30D ●] [90D]    │
│  ──────────────────────────────────────────────────────────────────  │
│  50%┤                                                               │
│     │           ╭────╮                ╭──────╮                      │
│  38%┤          ╭╯    ╰────────────────╯      ╰──╮                  │
│     │       ╭──╯                                  ╰──────╮          │
│  25%┤   ╭──╮╯                                            ╰────      │
│     │──╮╯                                                           │
│  10%┤  ╰──                                                          │
│   0%┤                                                               │
│     └────────────────────────────────────────────────────────────── │
│      Jul 1    Jul 5    Jul 10    Jul 15    Jul 20    Jul 25   Jul 30 │
│                                                                      │
│  ───── Open Rate (%)    ─────  Reply Rate (%)                       │
│  Now: 38.2%             Now: 8.7%                                   │
└──────────────────────────────────────────────────────────────────────┘
```

#### Header Row

| Element | Spec |
|---------|------|
| Widget title | "OUTREACH PERFORMANCE", `0.875rem`, uppercase, `text.secondary` |
| Time range tabs | Pill tabs: `7D`, `30D`, `90D`. Active: indigo background |
| Default range | `30D` |

#### Chart Area

| Property | Value |
|----------|-------|
| Chart type | Multi-series area/line chart |
| Series 1 | Open Rate — line color `#6366F1`, area fill `rgba(99,102,241,0.08)` |
| Series 2 | Reply Rate — line color `#10B981`, area fill `rgba(16,185,129,0.06)` |
| Grid lines | Horizontal only, `rgba(255,255,255,0.04)` |
| Y-axis | Left, 5 ticks, format: `"0%" → "50%"` |
| X-axis | Bottom, 6–8 date labels, format: `"Jul 1"` |
| Curve | Monotone cubic bezier |
| Line width | `2px` |
| Data point dot | `6px`, only visible on hover |
| Chart height | `200px` inside widget |

#### Tooltip (On Hover)

```
┌────────────────────────────┐
│  July 15, 2026             │
│  ■ Open Rate:    38.2%     │
│  ■ Reply Rate:    8.7%     │
└────────────────────────────┘
```
- Background: `rgba(15,23,42,0.96)` + blur
- Border: `rgba(255,255,255,0.08)`
- Border-radius: `10px`
- Follows cursor horizontally, fixed Y at top of chart area

#### Legend Row

Below the chart area:
```
[━━ indigo swatch]  Open Rate (%)    Now: 38.2%
[━━ green swatch]   Reply Rate (%)   Now: 8.7%
```
- Swatches: `20px × 2px` colored bars
- "Now:" shows the most recent data point value
- Font: `0.875rem`, `text.secondary`

#### Loading State
Full chart area replaced by a shimmer skeleton (`200px` height, `radius.md`).

#### Empty State
```
[BarChart2 icon, 40px, muted]
"No outreach data yet"
"Launch a campaign to see performance trends here."
[+ Create Campaign]
```

---

### Quick Actions Widget

```
┌──────────────────────────────────────────┐
│  QUICK ACTIONS                           │
│  ────────────────────────────────────    │
│  [+]  Add Lead                        → │
│  [↑]  Import Leads (CSV)             → │
│  [📣] Create Campaign                → │
│  [🔀] New Sequence                   → │
│  [✨] Run AI Website Audit           → │
│  ────────────────────────────────────   │
│  ONBOARDING                             │
│  ████████████░░░  75% complete          │
│  ✓ Connected email account              │
│  ✓ Imported your first leads            │
│  ✓ Created a sequence                   │
│  □ Launch your first campaign    [→]    │
└──────────────────────────────────────────┘
```

#### Action Buttons Section

| Element | Spec |
|---------|------|
| Section header | "QUICK ACTIONS", `0.75rem`, uppercase, `text.secondary` |
| Button height | `48px` |
| Button layout | Full width, icon-left (20px), label center-left, chevron right |
| Icon colors | Add: `#60A5FA` / Import: `#A78BFA` / Campaign: `#F59E0B` / Sequence: `#34D399` / AI: `#F472B6` |
| Hover background | `rgba(255,255,255,0.05)` |
| Hover effect | Label slides `translateX(3px)` on hover |
| Transition | `all 0.2s ease` |
| Divider between items | `1px solid rgba(255,255,255,0.04)` |

#### Onboarding Section

| Element | Spec |
|---------|------|
| Section header | "ONBOARDING", `0.75rem`, uppercase, `text.secondary` |
| Progress bar | `8px` height, brand gradient fill, full-width track |
| Percentage | "75% complete", `0.8rem`, `text.secondary`, right-aligned above bar |
| Checklist items | `0.875rem`, completed items: `text.tertiary` + checkmark icon; incomplete: `text.primary` + link underline on hover |
| Incomplete item CTA | Right-arrow icon, `0.75rem`, indigo color |
| Section visibility | Hidden once all 4 steps are complete (persisted to org record) |
| Top divider | `1px` separator between action buttons and onboarding |

---

## 6. Row 3 — Lead Pipeline + Campaign Summary

### Lead Pipeline Widget

```
┌────────────────────────────────────────────────────────────────┐
│  LEAD PIPELINE                               [View All →]      │
│  ──────────────────────────────────────────────────────────    │
│                                                                │
│  FUNNEL VISUALIZATION                                          │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │  ████████████████████████████████████  New (68)    54% │  │
│  │     ████████████████████  Contacted (24)          19%  │  │
│  │          ████████  Qualified (8)                   6%  │  │
│  │               ████  Won (22)                       17% │  │
│  │                 ██  Lost (3)                        2% │  │
│  └─────────────────────────────────────────────────────────┘  │
│                                                                │
│  FUNNEL TOTAL: 125 leads                                       │
│                                                                │
│  ──────────────────────────────────────────────────────────    │
│                                                                │
│  TOP LEADS BY SCORE                                            │
│  [JD] John Doe · Acme Corp         Score [92]  New  →        │
│  [SL] Sara Lee · Beta Inc          Score [87]  Cont →        │
│  [MY] Mike Yu · Gamma Ltd          Score [81]  Qual →        │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

#### Funnel Visualization

| Property | Value |
|----------|-------|
| Type | Horizontal stacked-bar style — NOT a traditional V-shaped funnel |
| Each bar | Full-width container, filled portion proportional to percentage |
| Bar height | `28px` per bar |
| Bar gap | `8px` between bars |
| Border-radius | `radius.sm` (6px) right edge only (left is flush with container) |
| Label alignment | Status name (left), count + percentage (right) |
| Colors | New: `#60A5FA` / Contacted: `#A78BFA` / Qualified: `#FBBF24` / Won: `#34D399` / Lost: `#F87171` |
| Fill animation | On load: bars fill from 0% to target width (`600ms ease`) |
| Hover on bar | Slightly brighter color, cursor pointer |
| Click on bar | Navigates to `/leads?status={status}` (filtered view) |

Funnel total line:
- Below bars: "FUNNEL TOTAL: 125 leads", `0.8rem`, `text.secondary`
- This number is the sum across all statuses

#### Divider between sections
`1px solid rgba(255,255,255,0.05)`, `margin: 1rem 0`

#### Top Leads by Score Section

| Element | Spec |
|---------|------|
| Section label | "TOP LEADS BY SCORE", `0.75rem`, uppercase, `text.secondary` |
| Rows | 3 rows max |
| Row height | `52px` |
| Row hover | `rgba(255,255,255,0.03)` background |
| Click | Navigates to `/leads/:id` |

**Each Row:**
```
[Avatar 36px]  [Name + Company]            [Score Badge]  [Status]  [→]
               Name: 0.9rem bold
               Company: 0.8rem text.secondary
```

Score Badge (32px circle):
- `80+`: Green gradient `#34D399 → #10B981`
- `60–79`: Amber gradient `#FCD34D → #F59E0B`
- `40–59`: Orange gradient `#FB923C → #F97316`
- `< 40`: Red gradient `#F87171 → #EF4444`
- Text: `11px`, `font-weight: 700`, white

#### Widget Empty State

```
[Users icon, 40px, muted]
"No leads in your pipeline"
"Import leads or add them manually to start tracking your funnel."
[+ Import Leads]   [+ Add Lead]
```

---

### Campaign Summary Widget

```
┌────────────────────────────────────────────────────────────────┐
│  CAMPAIGN SUMMARY                            [View All →]      │
│  ──────────────────────────────────────────────────────────    │
│                                                                │
│  HEALTH CHIPS                                                  │
│  [● 3 Active]    [⏸ 1 Paused]    [✓ 8 Completed]             │
│                                                                │
│  DONUT CHART (compact — 100px diameter)                        │
│  Center: "12" (total campaigns) label                          │
│                                                                │
│  ACTIVE CAMPAIGNS                                              │
│  ──────────────────────────────────────────────────────────    │
│  Summer Outreach 2026                        [Active ●]        │
│  Sequence: 3-step · Audience: VIP Leads (42)                   │
│  Progress: ████████░░░░  28/42 leads                           │
│  Open: 31%  ·  Reply: 9%  ·  Bounced: 2                       │
│  ──────────────────────────────────────────────────────────    │
│  Cold SDR Q3                                 [Active ●]        │
│  Sequence: 5-step · Audience: SDR Segment (80)                 │
│  Progress: ██████░░░░░░  48/80 leads                           │
│  Open: 26%  ·  Reply: 6%  ·  Bounced: 1                       │
│  ──────────────────────────────────────────────────────────    │
│  [+ Create Campaign]                                           │
└────────────────────────────────────────────────────────────────┘
```

#### Health Chips Row

| Chip | Icon | Color | Background |
|------|------|-------|-----------|
| `N Active` | Filled circle | `#34D399` | `rgba(52,211,153,0.10)` |
| `N Paused` | Pause icon | `#FBBF24` | `rgba(251,191,36,0.10)` |
| `N Completed` | Check | `#60A5FA` | `rgba(96,165,250,0.10)` |

Each chip: `border-radius: radius.full`, `padding: 4px 10px`, `font-size: 0.8rem`, `font-weight: 600`

#### Compact Donut Chart (Optional)
- Positioned right of health chips, or centered below chips
- `100px × 100px`
- Segments proportional to Active : Paused : Draft : Completed
- Center label: Total campaign count as large number
- Center sub-label: "campaigns"
- Only shown if at least 1 campaign exists

#### Active Campaign Card

Each active campaign renders a card section (separated by divider):

| Element | Spec |
|---------|------|
| Campaign name | `0.95rem`, `font-weight: 600`, `text.primary` |
| Status badge | Right-aligned, "Active" in green pill |
| Sequence & Audience | `0.8rem`, `text.secondary`, one line |
| Progress bar | `8px` height, `rgba(99,102,241,0.6)` fill, full-width track |
| Progress label | "28/42 leads" right of bar, `0.8rem`, `text.secondary` |
| Metrics row | "Open: 31% · Reply: 9% · Bounced: 2", `0.8rem`, `text.secondary` |
| Metric values | Colored inline: Open rate green, reply rate orange, bounced red |
| Click | Navigates to `/campaigns/:id` |
| Max campaigns shown | `3` (with "View All" if more exist) |

#### Widget Empty State

```
[Megaphone icon, 40px, muted]
"No campaigns running"
"Create and launch a campaign to start engaging your leads."
[+ Create Campaign]
```

---

## 7. Row 4 — AI Insights + Recent Activity

### AI Insights Widget

```
┌────────────────────────────────────────────────────────────────┐
│  ✨ AI INSIGHTS                    [↻ Refresh AI]  [12m ago]   │
│  ──────────────────────────────────────────────────────────    │
│                                                                │
│  WHO TO CONTACT TODAY                                          │
│                                                                │
│  [JD] John Doe · Acme Corp                                     │
│       Score [92]  ·  Opened last email 2 days ago             │
│       "High ICP match. Send follow-up while engagement         │
│        is warm."                                              │
│       [Generate Follow-up →]                                   │
│  ─────────────────────────────────────────────────────────     │
│  [SL] Sara Lee · Beta Inc                                      │
│       Score [87]  ·  No reply in 5 days                       │
│       "Qualified, uncontacted. Start outreach today."          │
│       [Generate Outreach →]                                    │
│  ─────────────────────────────────────────────────────────     │
│  [MY] Mike Yu · Gamma Ltd                                      │
│       Score [81]  ·  Task overdue: Call                        │
│       "Overdue call. Complete task or reschedule."             │
│       [View Task →]                                            │
│                                                                │
│  ──────────────────────────────────────────────────────────    │
│  ENRICHMENT QUEUE                                              │
│  4 leads awaiting AI website audit                             │
│  [Run Audit for All]                                           │
│                                                                │
│  ──────────────────────────────────────────────────────────    │
│  CAMPAIGN RECOMMENDATION                                       │
│  "12 qualified leads have no active campaign."                 │
│  [Create Campaign for Them →]                                  │
└────────────────────────────────────────────────────────────────┘
```

#### Widget Header

| Element | Spec |
|---------|------|
| Widget title | "✨ AI INSIGHTS", `0.875rem`, uppercase, `text.secondary` |
| Sparkles icon | `14px`, `#F472B6` (pink — distinct from all other icons) |
| Refresh button | "↻ Refresh AI" text button, `ghost` variant |
| Last updated | "12m ago" or "Just now" — muted, right of refresh button |
| Cooldown | Refresh disabled for 30 min after last run; tooltip on hover: "Updated N minutes ago" |

#### "Who to Contact Today" Section

Each lead item is a distinct sub-card:

```
┌───────────────────────────────────────────────────────────────┐
│  [Avatar 36px]  Name · Company              [Score Badge]     │
│                 [Engagement status line — 0.8rem, secondary]  │
│                 [AI rationale — 0.8rem, italic, tertiary]     │
│                 [Action CTA button — ghost style]             │
└───────────────────────────────────────────────────────────────┘
```

| Element | Spec |
|---------|------|
| Sub-card background | `rgba(0,0,0,0.15)`, `radius.lg` |
| Sub-card padding | `1rem` |
| Sub-card gap | `0.75rem` between sub-cards |
| Avatar | `36px`, initials-based, gradient per name |
| Name + Company | `0.9rem` bold + `0.8rem` secondary |
| Score Badge | `28px` circle, gradient by score range |
| Engagement status | `0.8rem`, `text.secondary` — e.g., "Opened last email 2 days ago" |
| AI rationale | `0.8rem`, italic, `text.tertiary` — 1–2 sentences max |
| Action CTA | `ghost` variant button, `0.8rem`, indigo arrow → |

**AI Rationale Rules:**
- Max 2 sentences
- Starts with the key insight (engagement signal)
- Ends with an actionable suggestion
- Never says "I suggest" — direct imperative tone

**Action CTA per lead context:**

| Condition | CTA Label | Destination |
|-----------|----------|-------------|
| Opened email, no reply | "Generate Follow-up →" | Opens AI panel / `/ai/followup?leadId=X` |
| Never contacted, high score | "Generate Outreach →" | Opens AI panel / `/ai/generate?leadId=X` |
| Task overdue | "View Task →" | `/crm/tasks/:id` |
| Replied to campaign | "Continue Conversation →" | `/leads/:id` |

#### Enrichment Queue Section

```
ENRICHMENT QUEUE
────────────────────────────────
4 leads awaiting AI website audit
[🌐 Run Audit for All]
```

| Element | Spec |
|---------|------|
| Section label | "ENRICHMENT QUEUE", `0.75rem`, uppercase, `text.secondary` |
| Count message | "N leads awaiting AI website audit", `0.9rem`, `text.primary` |
| CTA | Full-width secondary button |
| Visibility | Section hidden if queue is 0 |

#### Campaign Recommendation Section

```
CAMPAIGN RECOMMENDATION
────────────────────────────────────────────────────────
💡 "12 qualified leads have no active campaign."
[Create Campaign for Them →]
```

| Element | Spec |
|---------|------|
| Section label | "CAMPAIGN RECOMMENDATION", `0.75rem`, uppercase, `text.secondary` |
| Recommendation text | 1 sentence, AI-generated, `0.9rem`, `text.primary` |
| Icon | `Lightbulb`, `16px`, `#FBBF24` (amber) |
| CTA | `ghost` button with right arrow |
| Visibility | Section hidden if no recommendation |

#### Widget Empty State

```
[Sparkles icon, 40px, muted]
"No AI insights yet"
"Run website audits and AI scoring to unlock personalized recommendations."
[✨ Run AI on My Leads]
```

---

### Recent Activity Widget

```
┌──────────────────────────────────────────────────────────────────────┐
│  RECENT ACTIVITY                              [All] [Emails] [Tasks]  [View All →] │
│  ────────────────────────────────────────────────────────────────────│
│                                                                      │
│  TODAY                                                               │
│  [💬] John Doe replied to "Summer Outreach 2026"          2m ago    │
│       Campaign: Summer Outreach 2026  ·  [View Lead →]              │
│  ─────────────────────────────────────────────────────────────────   │
│  [👁] Sarah Lee opened "Cold SDR Q3" email               14m ago    │
│  ─────────────────────────────────────────────────────────────────   │
│  [✅] "Q3 Outreach" campaign completed                   1h ago     │
│       42/42 leads processed  ·  Open: 29%  ·  Reply: 7%            │
│  ─────────────────────────────────────────────────────────────────   │
│  [📥] 152 leads imported from CSV                        3h ago     │
│       By: Alex Johnson  ·  [View Leads →]                           │
│                                                                      │
│  YESTERDAY                                                           │
│  [✨] AI audit completed for Acme Corp                   Yesterday   │
│  [👤] New lead added: Mike Yu · Gamma Ltd                Yesterday   │
│  [📣] "Summer Outreach 2026" campaign launched           Yesterday   │
│                                                                      │
│  EARLIER                                                             │
│  [💬] Tom Baker replied to "VIP Prospect Seq"            2 days ago │
│                                                                      │
│  ─────────────────────────────────────────────────────────────────   │
│                       [Load 10 More]                                 │
└──────────────────────────────────────────────────────────────────────┘
```

#### Widget Header

| Element | Spec |
|---------|------|
| Widget title | "RECENT ACTIVITY", `0.875rem`, uppercase, `text.secondary` |
| Filter tabs | "All", "Emails", "Tasks" — pill tabs, `sm` size |
| View All link | Right-aligned, ghost style |

#### Filter Tabs Behavior

| Tab | Shows |
|-----|-------|
| All | All event types |
| Emails | Delivered / Opened / Clicked / Replied / Bounced only |
| Tasks | Task created / completed / overdue only |

#### Activity Group Headers

- "TODAY" / "YESTERDAY" / "EARLIER"
- `0.7rem`, uppercase, `letter-spacing: 0.08em`, `text.tertiary`
- Full-width row with thin divider on each side: `─── TODAY ───`

#### Activity Item Detail

```
[Event icon circle 36px]  [Event description line 1]        [Relative time]
                          [Event description line 2 — optional, muted]
                          [Action links — ghost style, 0.8rem]
```

| Element | Spec |
|---------|------|
| Icon circle | `36px × 36px`, `radius.full`, background color-coded per event |
| Description line 1 | `0.9rem`, `font-weight: 500`, `text.primary` |
| Description line 2 | `0.8rem`, `text.secondary` (supplementary context) |
| Action links | `0.8rem`, indigo, hover underline |
| Relative time | `0.8rem`, `text.tertiary`, right-aligned, vertically centered |
| Row padding | `1rem 0` |
| Row divider | `1px solid rgba(255,255,255,0.04)` |
| Row hover | `rgba(255,255,255,0.02)` |

#### Event Icon Color Map

| Event Type | Icon | Circle Background |
|-----------|------|-------------------|
| Reply | `MessageSquare` | `rgba(99,102,241,0.20)`, indigo icon |
| Email Opened | `Eye` | `rgba(52,211,153,0.20)`, green icon |
| Link Clicked | `MousePointer` | `rgba(96,165,250,0.20)`, blue icon |
| Email Delivered | `Send` | `rgba(148,163,184,0.10)`, slate icon |
| Campaign Completed | `CheckCircle` | `rgba(52,211,153,0.20)`, green icon |
| Campaign Launched | `Megaphone` | `rgba(251,146,60,0.20)`, orange icon |
| Campaign Error | `AlertCircle` | `rgba(239,68,68,0.20)`, red icon |
| Import Complete | `Upload` | `rgba(167,139,250,0.20)`, violet icon |
| AI Enrichment Done | `Sparkles` | `rgba(244,114,182,0.20)`, pink icon |
| Lead Created | `UserPlus` | `rgba(96,165,250,0.20)`, blue icon |
| Task Overdue | `Clock` | `rgba(245,158,11,0.20)`, amber icon |
| Task Completed | `CheckSquare` | `rgba(52,211,153,0.20)`, green icon |

#### Load More Button

```
[Load 10 More]
```
- Centered below the last item
- `secondary` button variant, `sm` size
- On click: fetches next 10 items, appends below with fade-in animation
- If no more: button hidden, "No more activity" text shown

#### Widget Empty State

```
[Activity waveform icon, 40px, muted]
"No activity yet"
"Activity will appear as campaigns run, leads open emails, and tasks are completed."
```

---

## 8. Row 5 — Team Activity

### Purpose
Show what every team member is actively working on. Surfaces collaboration, prevents duplication, and gives managers a pulse on team output.

### Widget Layout

```
┌────────────────────────────────────────────────────────────────────────────────────┐
│  TEAM ACTIVITY                                              [5 members online]     │
│  ───────────────────────────────────────────────────────────────────────────────── │
│                                                                                    │
│  ← [AJ]          [SL]          [MK]          [TC]          [PR]        →         │
│     Alex Johnson  Sara Lee     Mike Khan     Tom Carter    Priya Rao              │
│     ● Online      ● Online     ○ Away        ○ Offline     ● Online               │
│     3 leads       2 campaigns  1 task        ● Viewing     5 emails               │
│     enriched      created      completed     Campaign X    drafted                 │
│     today         this week    today         (live)        today                  │
│                                                                                    │
│  ───────────────────────────────────────────────────────────────────────────────── │
│  MOST ACTIVE TODAY                                                                 │
│  Alex Johnson imported 152 leads · Sara Lee created "Cold SDR Q3" · Tom Carter... │
└────────────────────────────────────────────────────────────────────────────────────┘
```

### Widget Header

| Element | Spec |
|---------|------|
| Widget title | "TEAM ACTIVITY", `0.875rem`, uppercase, `text.secondary` |
| Online count | "N members online", `0.8rem`, green dot + count, right-aligned |
| Online count visibility | Only shown if team has ≥ 2 members |

### Member Card Horizontal Scroll

**Container**: Horizontally scrollable flex row (`overflow-x: auto`, scroll-snap-align: start)
**Left/Right arrows**: Appear on hover if overflow exists (icon buttons, ghost)
**Scroll behavior**: `scroll-behavior: smooth`

**Member Card spec:**

```
┌─────────────────────────────────────────────────────┐
│   [Avatar 48px]                                     │
│   Presence dot (bottom-right of avatar)             │
│   Member Full Name                                  │
│   Role                                              │
│   ─────────────────────                             │
│   Activity summary                                  │
│   (1–3 lines, `text.secondary`, `0.8rem`)           │
│   ─────────────────────                             │
│   [Recent Action CTA]                               │
└─────────────────────────────────────────────────────┘
```

| Element | Spec |
|---------|------|
| Card width | `180px` |
| Card height | `Auto` (min `160px`) |
| Card background | `rgba(0,0,0,0.15)` |
| Card border | `rgba(255,255,255,0.05)` |
| Card border-radius | `radius.lg` (12px) |
| Card padding | `1rem` |
| Gap between cards | `1rem` |
| Avatar size | `48px` |

#### Presence Indicator (on avatar)

| Status | Color | Position |
|--------|-------|---------|
| Online | `#34D399` (green) | Bottom-right of avatar, `10px` circle, white border `2px` |
| Away | `#FBBF24` (amber) | Bottom-right |
| Offline | `#64748B` (slate) | Bottom-right |
| Active-now (viewing live) | `#6366F1` + pulse animation | Bottom-right + animated ring |

**"Active now"** state: pulsing indigo ring around the presence dot (keyframe: scale 1 → 1.5 → 1, `2s infinite`).

#### Activity Summary Text

1–3 lines describing recent activity:
- "3 leads enriched today"
- "2 campaigns created this week"
- "Viewing Campaign X (live)"
- "5 follow-up emails drafted"

Rules:
- "Viewing [entity]" is only shown if the member is viewing something in real-time (future: websocket presence)
- Summary aggregates today's + this week's activity
- Falls back to "No recent activity" in muted text if truly nothing

#### CTA per Member

| Context | CTA |
|---------|-----|
| Member added leads | "View Their Leads →" |
| Member created campaign | "View Campaign →" |
| Member completed tasks | "View Their Tasks →" |
| Member is online, no specific action | "View Profile →" |
| No CTA if nothing recent | CTA row hidden |

### "Most Active Today" Inline Feed

Below the member cards:

```
Alex Johnson imported 152 leads  ·  Sara Lee created "Cold SDR Q3"  ·  Tom Carter completed 4 tasks
```

- Single line, horizontal with `·` separators
- Overflow: clipped with fade-out gradient on right edge
- Entity names are links (hover underline)
- Font: `0.8rem`, `text.secondary`

### Widget Visibility Rules

| Condition | Behavior |
|-----------|---------|
| Solo user (no team) | Widget hidden entirely |
| Team ≥ 2 members | Widget shown |
| All members offline + no activity today | Widget shows member cards with offline state, no "Most Active" bar |

### Widget Loading State

```
5 skeleton member cards (180px × 140px each) in a horizontal row
Skeleton: avatar circle + 2 text lines + 3 text lines per card
```

### Widget Empty State (Solo user)

Widget is not shown for solo users. No empty state needed.

---

## 9. Onboarding Overlay (First-Time Only)

### Trigger
Shown when ALL of the following are true:
- Organization was created ≤ 7 days ago
- Lead count is `0`
- Email accounts connected: `0`
- Campaign count is `0`

### Overlay Design

```
┌────────────────────────────────────────────────────────────────────────────────────┐
│                         TOPBAR                                                     │
├──────────────┬─────────────────────────────────────────────────────────────────────┤
│  SIDEBAR     │                                                                     │
│              │  ┌─────────────────────────────────────────────────────────────┐   │
│              │  │  WELCOME BANNER (full width, glassmorphism card)             │   │
│              │  │  ✨ Welcome to Injaazh Lead AI, Alex!                       │   │
│              │  │  "Let's set up your workspace in 4 steps."                  │   │
│              │  │                                                              │   │
│              │  │  STEP CHECKLIST (horizontal on desktop)                     │   │
│              │  │  [1 Connect Email] → [2 Import Leads] → [3 Sequence] → [4 Launch]│
│              │  │   ✓ Done           ○ Next              ○                    ○   │
│              │  │                                                              │   │
│              │  │  [Get Started: Step 2 →]            [Skip for now ×]        │   │
│              │  └──────────────────────────────────────────────────────────────┘  │
│              │                                                                     │
│              │  [Normal dashboard content below, semi-accessible]                  │
└──────────────┴─────────────────────────────────────────────────────────────────────┘
```

### Banner Spec

| Element | Spec |
|---------|------|
| Banner background | `rgba(99,102,241,0.08)` + blur |
| Banner border | `1px solid rgba(99,102,241,0.25)` |
| Banner border-radius | `radius.xl` (16px) |
| Banner padding | `2rem` |
| Banner position | Row 0 (above KPI cards), full canvas width |
| Greeting | "Welcome to Injaazh Lead AI, {firstName}!", `1.5rem`, bold, gradient text |
| Sub-text | "Let's set up your workspace in 4 quick steps." |

### Step Progress (Horizontal)

```
[●] Connect Email → [○] Import Leads → [○] Create Sequence → [○] Launch Campaign
 Completed           Current step         Upcoming              Upcoming
```

| State | Icon | Color |
|-------|------|-------|
| Completed | `CheckCircle` filled | Green |
| Current | Numbered circle, outlined | Indigo |
| Upcoming | Numbered circle, muted | Slate |

Connecting arrows between steps: `→`, `text.tertiary`

### Banner CTA

- Primary: "Get Started: Step N →" — links to the current step's screen
- Dismiss: "Skip for now ×" — ghost text button, hides banner for this session
- Permanent dismiss: Banner auto-hides when all 4 steps are complete

---

## 10. Dashboard Loading Strategy

### Parallel Fetch Model

On dashboard mount, **all API calls fire simultaneously** (`Promise.all`):

```
parallel →
  GET /analytics/dashboard      → KPI card values
  GET /analytics/campaigns      → Campaign summary data
  GET /leads?limit=3&sortBy=score&desc=true → Top leads
  GET /analytics/trends?range=30d → Chart data
  GET /activities?limit=20      → Recent activity feed
  GET /ai/insights              → AI recommendations
  GET /team/activity?limit=5    → Team member activity
  GET /organizations/onboarding → Onboarding checklist state
```

### Widget Independence

Each widget resolves its loading state independently:
- A slow `/ai/insights` call does NOT block KPI cards from rendering
- If one call fails, only that widget shows an error state
- Other widgets remain functional

### Loading Order / Priority Skeleton Timing

| Priority | Widget | Why |
|---------|--------|-----|
| 1 (first) | KPI Cards | Highest visual weight — user looks here first |
| 1 (first) | Quick Actions | Static content — no API call, renders immediately |
| 2 | Lead Pipeline | High informational value |
| 2 | Campaign Summary | High informational value |
| 3 | Performance Chart | Complex render |
| 4 | Recent Activity | Supplementary |
| 5 | AI Insights | May take longest (LLM-backed) |
| 5 | Team Activity | Supplementary |

### Skeleton Duration Rules

- Skeletons shown until their specific API resolves or fails
- Minimum skeleton display time: `300ms` (prevents flash for fast responses)
- If loading takes `> 8s`: automatically show error state with [Retry] for that widget

---

## 11. Dashboard Empty State (Zero Data)

### Scenario: Brand New Organization (0 leads, 0 campaigns, 0 activity)

| Widget | Empty State |
|--------|------------|
| KPI Cards | Values show `0` — NOT an error. Zero is valid. |
| Performance Chart | "No outreach data" + "Launch a campaign" CTA |
| Quick Actions | Normal — always shows actions |
| Lead Pipeline | "No leads" illustration + [Import Leads] + [Add Lead] |
| Campaign Summary | "No campaigns running" + [Create Campaign] |
| AI Insights | "No AI insights yet" + [Run AI on my leads] |
| Recent Activity | "No activity yet" |
| Team Activity | Hidden if solo user |
| Onboarding Banner | Shown prominently at top |

### Zero KPI Values

When all KPIs are zero, the trend lines show `"—"` instead of a change indicator:

```
TOTAL LEADS
0
─ No change yet
```

This distinguishes "no data" from "zero change."

---

## 12. Dashboard Error Strategy

### Widget-Level Error

Each widget independently shows its error state without affecting others:

```
┌──────────────────────────────────────────────────────┐
│  CAMPAIGN SUMMARY                                    │
│  ────────────────────────────────────────────────    │
│                                                      │
│         [Cloud icon, 32px, muted]                   │
│         "Could not load campaigns"                   │
│         Check your connection and try again.         │
│                                                      │
│         [↻ Retry]                                   │
│                                                      │
└──────────────────────────────────────────────────────┘
```

Error state within widget:
- Icon: `Cloud` or `AlertTriangle`, `32px`, muted
- Heading: `0.9rem`, bold, `text.primary`
- Body: `0.85rem`, `text.secondary`
- Retry: `secondary` button, small size, re-fires that widget's specific API call only

### KPI Card Error

If `/analytics/dashboard` fails:
- All 4 KPI cards show `"—"` values simultaneously
- Below the cards: "Metrics unavailable — [↻ Retry]" inline text

### Full Dashboard Error (Total network failure)

If ALL calls fail simultaneously:
```
[Page-level banner at top of canvas]
┌────────────────────────────────────────────────────────┐
│  ⚠  Dashboard data could not be loaded                 │
│     Check your internet connection. [↻ Retry All]      │
└────────────────────────────────────────────────────────┘
```

Individual widget error states also shown, but the page-level banner consolidates the message.

---

## 13. Widget Interaction Details

### Clickable Elements Summary

| Element | Interaction | Destination |
|---------|------------|-------------|
| "Total Leads" KPI card | Click | `/leads` |
| "Emails Sent" KPI card | Click | `/campaigns` |
| Lead Pipeline bar (per status) | Click | `/leads?status={status}` |
| Lead Pipeline top lead row | Click | `/leads/:id` |
| Campaign card | Click | `/campaigns/:id` |
| Campaign health chip | Click | `/campaigns?status={status}` |
| AI Insights lead row | Click | `/leads/:id` |
| AI Insights "Generate" CTA | Click | AI panel opens in correct mode |
| AI Insights "Run Audit" | Click | Triggers bulk enrichment |
| AI Insights "Create Campaign" | Click | `/campaigns/new` |
| Activity item | Click | Entity-specific destination |
| Activity "View Lead" | Click | `/leads/:id` |
| Team member card | Click | `/settings/team/:memberId` (future) |
| Team activity feed link | Click | Entity-specific destination |
| "View All →" links | Click | Section root page |
| Refresh button (header) | Click | Re-fires all API calls |
| Onboarding "Get Started" | Click | Current step's destination |

### Hover Animations Summary

| Element | Animation |
|---------|----------|
| KPI Cards (clickable) | `translateY(-5px)` + indigo glow shadow |
| Quick Action buttons | Label `translateX(3px)`, background lightens |
| Pipeline bars | Slight brightness increase |
| Campaign card rows | Row background lightens |
| Activity items | Row background lightens |
| AI Insights lead cards | Sub-card border brightens to `rgba(99,102,241,0.20)` |
| Team member cards | Card `translateY(-3px)`, border brightens |

---

## 14. Responsive Layout by Breakpoint

### Mobile (< 768px)

**Visible widgets (top priority):**
```
Row 1: KPI Cards (2 × 2 grid)
Row 2: Campaign Summary (simplified, no chart)
Row 3: Quick Actions (full-width stacked buttons)
Row 4: Recent Activity (last 5 items)
```

**Hidden on mobile:**
- Performance Chart (redirected to `/analytics` page — future)
- Lead Pipeline (available via `/leads` page)
- AI Insights (available via `/ai` tools)
- Team Activity

**Mobile-specific adjustments:**
- KPI card values: `2rem` (reduced from `2.5rem`)
- No onboarding banner — replaced by a sticky bottom bar: "Step 2/4: Import Leads →"

### Tablet (768px – 1023px)

**All widgets visible, layout stacked:**
```
Row 1: KPI Cards (2 × 2 grid)
Row 2: Performance Chart (full width) → Quick Actions (full width)
Row 3: Lead Pipeline (full width) → Campaign Summary (full width)
Row 4: AI Insights (full width, simplified) → Recent Activity (full width)
Row 5: Team Activity (horizontal scroll, narrower cards)
```

**Stacking order**: Widgets that were side-by-side on desktop stack vertically on tablet. The left widget stacks on top.

### Desktop Standard (1024px – 1279px)

Full grid as specified in §2. All widgets in their designed positions.

### Desktop Wide (1280px+)

Same as standard desktop but with more breathing room. Canvas still max `1200px`.

### Responsive Behavior Table

| Widget | Mobile | Tablet | Desktop |
|--------|--------|--------|---------|
| KPI Cards | 2×2 grid | 2×2 grid | 4×1 row |
| Performance Chart | Hidden | Full width | 2/3 width |
| Quick Actions | Full width (below all) | Full width | 1/3 width |
| Lead Pipeline | Hidden (→ /leads) | Full width | 1/2 width |
| Campaign Summary | Simplified, full width | Full width | 1/2 width |
| AI Insights | Hidden (→ /ai) | Full width | 1/3 width |
| Recent Activity | Last 5 items | Full width | 2/3 width |
| Team Activity | Hidden | Horizontal scroll | Full width |
| Onboarding Banner | Sticky bottom bar | Full width card | Full width card |

---

## 15. Data Contract (API → Widget)

### GET /analytics/dashboard

Used by: KPI Cards

```
Response shape:
{
  totalLeads: number,
  leadsAddedToday: number,
  emailsSent: number,
  emailsSentThisWeek: number,
  emailsSentToday: number,
  openRate: number,           // percentage float: 38.2
  openRateChangeVsLastWeek: number, // delta: +2.4
  replyRate: number,
  replyRateChangeVsLastWeek: number
}
```

---

### GET /analytics/campaigns

Used by: Campaign Summary widget

```
Response shape:
{
  total: number,
  active: number,
  paused: number,
  completed: number,
  draft: number,
  campaigns: [
    {
      id: string,
      name: string,
      status: string,
      sequenceName: string,
      segmentName: string,
      totalLeads: number,
      completedLeads: number,
      openRate: number,
      replyRate: number,
      bounced: number
    }
  ]
}
```

---

### GET /analytics/leads

Used by: Lead Pipeline widget

```
Response shape:
{
  total: number,
  byStatus: {
    New: number,
    Contacted: number,
    Qualified: number,
    Won: number,
    Lost: number
  },
  topByScore: [
    {
      id: string,
      firstName: string,
      lastName: string,
      company: string,
      score: number,
      status: string
    }
  ]
}
```

---

### GET /analytics/trends?range=30d

Used by: Performance Chart

```
Response shape:
{
  range: "7d" | "30d" | "90d",
  data: [
    {
      date: "2026-07-01",
      openRate: 35.2,
      replyRate: 7.1
    },
    ...
  ]
}
```

---

### GET /activities?limit=20

Used by: Recent Activity widget

```
Response shape:
{
  items: [
    {
      id: string,
      type: ActivityType,
      description: string,
      entityId: string,
      entityType: "lead" | "campaign" | "task" | "import",
      entityName: string,
      actorId: string,
      actorName: string,
      createdAt: ISO date string
    }
  ],
  hasMore: boolean
}
```

---

### GET /ai/insights

Used by: AI Insights widget

```
Response shape:
{
  generatedAt: ISO date string,
  topLeadsToContact: [
    {
      leadId: string,
      leadName: string,
      company: string,
      score: number,
      engagementHint: string,
      rationale: string,
      suggestedAction: "followup" | "outreach" | "task" | "view"
    }
  ],
  enrichmentQueueCount: number,
  campaignRecommendation: string | null
}
```

---

### GET /team/activity

Used by: Team Activity widget

```
Response shape:
{
  onlineCount: number,
  members: [
    {
      userId: string,
      fullName: string,
      role: string,
      avatarInitials: string,
      presenceStatus: "online" | "away" | "offline",
      activitySummary: string,
      recentAction: string | null,
      recentEntityId: string | null,
      recentEntityType: string | null
    }
  ],
  mostActiveToday: string   // Pre-formatted summary sentence
}
```

---

*This document is the authoritative reference for the dashboard design. Every widget, interaction, state, and data shape is defined here. No dashboard component should be built without referencing this document first. Append a new section when a new dashboard widget is introduced.*

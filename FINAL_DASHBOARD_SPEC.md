# FINAL_DASHBOARD_SPEC.md — Injaazh Lead AI

> **Final Dashboard Design Specification**
> Version: 1.0 | July 2026
> Base: Concept 3 (Focus Mode) + Concept 2 improvements
> This document supersedes all previous dashboard concepts.
> Implementation engineers build from this document only.

---

## Design Philosophy

**Enterprise AI SaaS. No decoration. Only data.**

This dashboard is built for sales teams who live in it for 8 hours a day.
Every pixel earns its place. Clarity beats beauty. Density beats whitespace.
The interface disappears — only the work remains.

### What is eliminated

| Removed | Reason |
|---------|--------|
| Glassmorphism / backdrop blur | Visual noise, performance cost, distracts from data |
| Glow effects | Decorative, not functional |
| Gradient backgrounds on surfaces | Hard to read data over gradients |
| Hero / Stage widget | Overrides user's workflow — the AI should assist, not command |
| Drop shadows on every card | Creates false depth hierarchy |
| Gradient text fills on body text | Reduces legibility at small sizes |

### What replaces them

| Old | New |
|-----|-----|
| Glass card | Solid surface card — `#111827` on `#0D1117` canvas |
| Gradient background | Left `3px` border accent — one color, intentional |
| Glow shadow on hover | `1px` border color change + subtle background shift |
| Hero widget | Compact AI insight strip — contextual, dismissible |
| Decorative gradient text | Gradient text **only** on KPI values — functional emphasis |

---

## 1. Color System

### Canvas

| Token | Value | Usage |
|-------|-------|-------|
| `canvas` | `#0D1117` | Page background — GitHub dark baseline |
| `surface` | `#111827` | All cards, panels, sidebar |
| `surface-raised` | `#1C2333` | Table headers, dropdown panels, modal |
| `surface-hover` | `#1A2235` | Row hover, item hover |
| `surface-active` | `#1E2D45` | Active nav item, selected row |

### Borders

| Token | Value | Usage |
|-------|-------|-------|
| `border` | `#1F2937` | Standard card/panel border |
| `border-strong` | `#374151` | Input borders, dividers |
| `border-focus` | `#4F46E5` | Input focus ring |

### Text

| Token | Value | Usage |
|-------|-------|-------|
| `text-primary` | `#F9FAFB` | Primary readable text |
| `text-secondary` | `#9CA3AF` | Labels, metadata |
| `text-tertiary` | `#6B7280` | Timestamps, placeholder |
| `text-disabled` | `#374151` | Disabled elements |

### Brand

| Token | Value | Usage |
|-------|-------|-------|
| `accent` | `#4F46E5` | Active states, primary buttons, focus rings |
| `accent-hover` | `#3730A3` | Button hover |
| `accent-subtle` | `#1E2048` | Active nav item background |

### Semantic

| Token | Value | Usage |
|-------|-------|-------|
| `green` | `#10B981` | Success, active, positive trend |
| `green-subtle` | `#052E16` | Success badge background |
| `amber` | `#F59E0B` | Warning, paused, medium |
| `amber-subtle` | `#2D1B00` | Warning badge background |
| `red` | `#EF4444` | Error, failed, negative trend |
| `red-subtle` | `#1F0707` | Error badge background |
| `blue` | `#3B82F6` | Info, imported leads |
| `blue-subtle` | `#0A1628` | Info badge background |
| `violet` | `#8B5CF6` | AI-related elements |
| `violet-subtle` | `#1A0D3D` | AI badge background |

### KPI Value Colors (gradient text — functional, not decorative)

Used **only** on the large numeric values inside KPI cards.

| Metric | Gradient |
|--------|---------|
| Today's Imports | `#60A5FA → #3B82F6` |
| Qualified Leads | `#34D399 → #10B981` |
| Emails Sent | `#A78BFA → #7C3AED` |
| Reply Rate | `#FB923C → #EA580C` |

---

## 2. Typography

### Font

**Inter** — single font family throughout.
Loaded weights: `400`, `500`, `600`, `700`.
`JetBrains Mono` — numeric values in tables, IDs, percentages in dense views.

### Type Scale

| Token | Size | Weight | Usage |
|-------|------|--------|-------|
| `display` | `2.5rem` | `700` | KPI values |
| `h1` | `1.5rem` | `600` | Page titles |
| `h2` | `1.125rem` | `600` | Widget titles, section headings |
| `h3` | `0.9375rem` | `600` | Card headings, modal titles |
| `body` | `0.9375rem` | `400` | Table data, descriptions |
| `body-sm` | `0.875rem` | `400` | Secondary info, helpers |
| `label` | `0.75rem` | `500` | KPI card labels, column headers |
| `caption` | `0.6875rem` | `400` | Timestamps, fine print |
| `mono` | `0.875rem` | `400` | Numbers, IDs, percentages |

### Rules

- **No uppercase body text** — only column headers and nav section labels use uppercase
- Column headers: `0.75rem`, `font-weight: 600`, `text-secondary`, `letter-spacing: 0.04em`, uppercase
- Nav section labels: `0.625rem`, `font-weight: 600`, `text-tertiary`, uppercase, `letter-spacing: 0.1em`
- KPI value: `font-variant-numeric: tabular-nums` — prevents layout shift as numbers change
- All numeric data in tables: `JetBrains Mono`, `0.875rem`

---

## 3. Spacing System

4px base unit.

### Layout Constraints

| Property | Desktop (≥1440px) | Laptop (1280–1439px) | Tablet (768–1279px) | Mobile (<768px) |
|----------|------------------|---------------------|--------------------|----------------|
| **Max Content Width** | `1600px` | `1600px` | `100vw` | `100vw` |
| **Content Padding** | `32px` | `24px` | `20px` | `16px` |
| **Widget Gap** | `24px` | `24px` | `20px` | `16px` |

### Radius System

- **Card border-radius**: `12px`
- **Input border-radius**: `10px`
- **Button border-radius**: `10px`

### Base Spacing Tokens

| Token | Value | Primary Usage |
|-------|-------|--------------|
| `xs` | `4px` | Icon gap, tight inline |
| `sm` | `8px` | Badge padding, form gap tight |
| `md` | `12px` | Button padding (vertical), label margin |
| `base` | `16px` | Mobile edge, input padding |
| `lg` | `20px` | Button padding (horizontal) |
| `xl` | `24px` | Widget gap, section padding |
| `2xl` | `32px` | Widget internal padding |
| `3xl` | `48px` | Empty state padding |

---

## 4. Surface System (Replacing Glass)

No blur. No transparency. Every surface is a **solid color**.

Depth is communicated through:
1. **Background color steps** — each layer is a distinct darker or lighter solid
2. **Border definition** — `1px solid` borders define edges, not shadows
3. **Left accent bars** — `3px` colored left border signals "this element is active/important"
4. **Typographic contrast** — font size and weight carry hierarchy

### Layer Stack

```
Layer 0: #0D1117  ← Page canvas
Layer 1: #111827  ← Cards, sidebar, panels
Layer 2: #1C2333  ← Table headers, dropdown menus, active row
Layer 3: #242E42  ← Modal bodies, nested cards
```

### Card Specification

| Property | Value |
|----------|-------|
| Background | `#111827` |
| Border | `1px solid #1F2937` |
| Border-radius | `12px` |
| Padding | `24px` |
| No shadow | — |
| No blur | — |

**Hover state (interactive cards only)**:
- Background: `#1A2235`
- Border: `1px solid #374151`
- Transition: `background 150ms ease, border-color 150ms ease`
- No transform — enterprise tools do not bounce

---

## 5. App Shell Layout

### Zone Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│  TOPBAR — 56px — position: fixed — top: 0 — full width — z: 50        │
├────────────┬────────────────────────────────────────────────────────────┤
│            │                                                            │
│  SIDEBAR   │  CONTENT AREA                       AI DRAWER (toggle)    │
│  256px     │  margin-left: 256px / 72px          400px desktop         │
│  (or 72px  │  padding-top: 56px                  100vw mobile          │
│  collapsed)│  overflow-y: auto                   position: fixed       │
│            │  max-content-width: 1600px centered  right: 0             │
│  fixed     │                                      top: 56px            │
│  top: 56px │                                      bottom: 0            │
│  bottom: 0 │                                      z: 40                │
│  z: 40     │                                                            │
└────────────┴────────────────────────────────────────────────────────────┘
```

---

## 6. Topbar

### Dimensions

| Property | Value |
|----------|-------|
| Height | `56px` |
| Position | `fixed`, `top: 0`, `left: 0`, `right: 0` |
| Background | `#111827` |
| Bottom border | `1px solid #1F2937` |
| Z-index | `50` |
| No blur | — |

### Zone Layout

```
LEFT (256px)          CENTER (flex-grow)                  RIGHT (auto)
─────────────         ──────────────────────────          ──────────────
[Logo] [Injaazh]      [▾ Acme Corp]  [🔍 Search...]      [⌘K] [✨] [🔔] [👤]
```

**Left Zone — 256px** (aligns with sidebar)
- Logo mark: `24px × 24px`, indigo square icon
- Wordmark: "Injaazh", `0.9375rem`, `font-weight: 600`, `text-primary`
- Zone width fixed at `256px` regardless of sidebar collapse state

**Center Zone — flex-grow**
- Org Switcher: current org name + `▾`, `0.875rem`, `text-secondary`, click opens dropdown
- Separator: `1px solid #1F2937`, `20px` tall, `margin: 0 16px`
- Search bar: `max-width: 400px`, `height: 32px`, `border-radius: 6px`, `background: #0D1117`, `border: 1px solid #1F2937`
  - Placeholder: "Search leads, campaigns..." — `text-tertiary`
  - Left icon: `Search`, `14px`, `text-tertiary`
  - Right hint: `⌘K` shortcut label, `text-tertiary`, `0.6875rem`

**Right Zone**
Items left to right, `8px` gap:
- `⌘K` — icon button, `28px × 28px`, opens Command Palette
- `✨ AI` — icon button + label "AI", `text: violet`, background `violet-subtle` when panel is open, toggles AI panel
- `🔔` — icon button, unread badge (solid `red` circle, white count text)
- `│` — `1px` vertical separator
- User avatar — `28px` circle, initials, `accent` background, click opens User Menu dropdown

### Topbar Hover States
All icon buttons: background `surface-hover` on hover, `border-radius: 6px`, `transition: 150ms ease`

---

## 7. Sidebar

### Dimensions & Position

| State | Width | Behavior |
|-------|-------|---------|
| Expanded | `256px` | Labels + icons visible |
| Collapsed | `72px` | Icons only, tooltip on hover |
| Mobile | Off-canvas | Replaced by bottom bar |

```
Position: fixed
Top: 56px
Bottom: 0
Left: 0
Background: #111827
Right border: 1px solid #1F2937
Z-index: 40
Overflow-y: auto (hidden scrollbar)
```

### Structure

```
┌───────────────────────────────────┐
│  COLLAPSE TOGGLE AREA (36px)      │
│  [ChevronLeft] (right-aligned)    │
├───────────────────────────────────┤
│  SECTION: MAIN                    │
│  [📊] Dashboard                   │
│  [👥] Leads              [142]    │
│     └─ All Leads                  │
│     └─ Import                     │
│     └─ Segments                   │
│  [📣] Campaigns           [3]     │
│  [🔀] Sequences                   │
│                                   │
│  SECTION: TOOLS                   │
│  [✨] AI Tools                    │
│  [📈] Analytics                   │
│                                   │
│  SECTION: MANAGE                  │
│  [◧]  CRM                         │
│     └─ Pipeline                   │
│     └─ Tasks                      │
│  [⚙]  Settings                   │
├───────────────────────────────────┤
│  FOOTER (pinned bottom)           │
│  [User avatar + name + role]      │
│  [❓] Help   [⚡] What's New      │
└───────────────────────────────────┘
```

### Section Labels

- Text: `0.625rem`, `font-weight: 600`, uppercase, `text-tertiary`
- `letter-spacing: 0.1em`
- Padding: `16px 12px 4px 12px` (left-aligned)
- Hidden in collapsed mode

### Nav Item Specification

| Property | Value |
|----------|-------|
| Height | `36px` |
| Padding | `0 12px` |
| Border-radius | `6px` |
| Icon size | `18px` |
| Label size | `0.875rem` |
| Label weight | `500` |
| Gap (icon→label) | `10px` |
| Badge | Pill — `0.625rem`, solid background, right-aligned |

**Default state**: icon `text-secondary`, label `text-secondary`
**Hover**: background `surface-hover`, icon `text-primary`, label `text-primary`
**Active**: background `accent-subtle`, left `3px solid accent`, icon `accent`, label `text-primary`, `font-weight: 600`

### Active Left Accent Bar

```
position: absolute
left: 0
top: 6px (centered vertically within 36px item)
height: 24px
width: 3px
background: #4F46E5
border-radius: 0 2px 2px 0
```

### Sub-Items (Expanded only, visible when parent is active)

- Height: `32px`
- Indent: icon-column width (`18px`) + gap (`10px`) + `8px` extra = `36px` left padding
- Font: `0.8125rem`, `font-weight: 400`, `text-secondary`
- Active: `text-primary`, `font-weight: 500`
- Connecting vertical line: `1px solid #1F2937`, left side of sub-item group

### Collapse Toggle

- Button: `28px × 28px`, icon `ChevronLeft` / `ChevronRight`, `text-tertiary`
- Position: top of sidebar, right-aligned
- Rotates icon on collapse
- Transition: `width 220ms ease` on sidebar, synchronized with content `margin-left`

### Collapsed Mode Rules

| Element | Collapsed state |
|---------|----------------|
| Labels | `opacity: 0`, `width: 0` — not removed from DOM |
| Section labels | Hidden |
| Sub-items | Never shown |
| Badges | Hidden |
| User footer | Shows avatar only (`32px` circle) |
| Tooltips | Shown on hover — label in a small tooltip right of the icon |
| Active bar | Still visible (`3px` left bar) |

### User Footer Card

```
[Avatar 32px] | [Full Name — 0.875rem bold]
               [Role — 0.75rem text-secondary]
               [Sign Out — tiny link, right-aligned]
```

- Background: none (blends with sidebar)
- Border-top: `1px solid #1F2937`
- Padding: `12px`
- Collapsed: avatar only, centered

---

## 8. Dashboard Page Layout

### Page Header

```
┌──────────────────────────────────────────────────────────────────────┐
│  Dashboard                                      Tue, 8 Jul  [↻]     │
│  Your workspace overview                                             │
└──────────────────────────────────────────────────────────────────────┘
```

| Element | Spec |
|---------|------|
| Title | `1.5rem`, `font-weight: 600`, `text-primary` |
| Sub-label | `0.875rem`, `text-secondary` |
| Date | Right-aligned, `0.875rem`, `text-secondary` |
| Refresh | Icon button `RefreshCw`, `text-tertiary`, on click re-fires all API calls |
| Bottom margin | `24px` below header before first row |

---

## 9. KPI Cards

### Row Layout

4 equal cards in a `4-column` CSS grid. `gap: 16px`.

```
┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐
│                  │ │                  │ │                  │ │                  │
│  TODAY'S IMPORTS │ │ QUALIFIED LEADS  │ │ EMAILS SENT      │ │ REPLY RATE       │
│                  │ │                  │ │ TODAY            │ │                  │
│  142             │ │  38              │ │  630             │ │  8.7%            │
│  +12 since yest  │ │  30% of total    │ │  of 4,830 total  │ │  +1.1% this wk   │
│                  │ │                  │ │                  │ │                  │
└──────────────────┘ └──────────────────┘ └──────────────────┘ └──────────────────┘
Left bar: blue        Left bar: green       Left bar: violet      Left bar: orange
```

### Card Specification

| Property | Value |
|----------|-------|
| Background | `#111827` |
| Border | `1px solid #1F2937` |
| Border-radius | `8px` |
| Left accent bar | `3px solid {semantic color}` (flush left, full height) |
| Padding | `20px 20px 20px 17px` (left reduced — bar takes 3px) |
| Height | `120px` |
| Hover | No lift — `border-color: #374151`, `background: #1A2235` |
| Cursor | `pointer` on clickable cards |

### Card Internal Layout

```
[LABEL — top]                              [ICON — top right]
[VALUE — middle, large]
[TREND — bottom]
```

| Element | Spec |
|---------|------|
| Label | `0.6875rem`, `font-weight: 600`, uppercase, `letter-spacing: 0.06em`, `text-secondary` |
| Value | `2rem`, `font-weight: 700`, gradient text (functional color only on values) |
| Icon | `18px`, `text-tertiary`, top-right position |
| Trend | `0.75rem`, `text-secondary` — arrow + delta text |
| Trend positive | `▲` + value in `green` |
| Trend negative | `▼` + value in `red` |
| Trend neutral | `–` in `text-tertiary` |

### Left Accent Bar Colors

| Card | Bar Color |
|------|----------|
| Today's Imports | `#3B82F6` (blue) |
| Qualified Leads | `#10B981` (green) |
| Emails Sent | `#8B5CF6` (violet) |
| Reply Rate | `#F97316` (orange) |

### Icons

| Card | Icon |
|------|------|
| Today's Imports | `ArrowDownToLine` |
| Qualified Leads | `BadgeCheck` |
| Emails Sent | `Mail` |
| Reply Rate | `MessageSquare` |

### Loading State

Each card independently:
- Label: `skeleton block` `40% width × 12px`
- Value: `skeleton block` `60% width × 32px`
- Trend: `skeleton block` `50% width × 12px`

Skeleton: `background: #1C2333`, `border-radius: 4px`, static (no shimmer animation — enterprise tools don't shimmer).

---

## 10. Dashboard Widget Grid

### Row Configuration

| Row | Grid | Height | Content |
|-----|------|--------|---------|
| 1 | `repeat(4, 1fr)` | `120px` | KPI Cards |
| 2 | `2fr 1fr` | `280px` | Performance Chart + AI Insight Strip |
| 3 | `1fr 1fr` | `320px` | Lead Pipeline + Campaign Summary |
| 4 | `2fr 1fr` | `360px` | Recent Activity + Quick Actions |

Row gap: `16px` between all rows.

---

## 11. Performance Chart Widget

### Widget Header

```
OUTREACH PERFORMANCE                    [7D] [30D ●] [90D]
```

- Title: `0.75rem`, `font-weight: 600`, uppercase, `text-secondary`, `letter-spacing: 0.05em`
- Time range tabs: Text tabs — no pill shapes. Active: `text-primary`, `border-bottom: 2px solid accent`. Inactive: `text-tertiary`

### Chart Spec

| Property | Value |
|----------|-------|
| Type | Multi-line (no area fill) |
| Lines | Open Rate: `#6366F1` · Reply Rate: `#10B981` |
| Line width | `1.5px` |
| Area fill | None — lines only |
| Grid | Horizontal dashes, `#1F2937` |
| Y-axis | Left, `text-tertiary`, `0.6875rem`, `JetBrains Mono` |
| X-axis | Bottom, `text-tertiary`, `0.6875rem` |
| Curve | Monotone |
| Background | `#111827` (card background — no inner container) |

### Tooltip

```
Jul 15 ──────────────────────
  Open Rate   38.2%
  Reply Rate   8.7%
```

- Background: `#1C2333`
- Border: `1px solid #374151`
- Border-radius: `6px`
- Font: `0.8125rem`
- Values: `JetBrains Mono`

### Legend

Below chart, left-aligned:
```
[━━ indigo line] Open Rate    [━━ green line] Reply Rate
```

- Swatch: `16px × 2px` colored line
- Label: `0.75rem`, `text-secondary`
- Gap between items: `20px`

---

## 12. AI Insight Strip (Replaces Hero Widget)

Positioned in Row 2, right column (`1fr`). This is NOT the hero widget from Concept 3. It is a **compact supporting widget** — same visual weight as any other card.

```
┌────────────────────────────────────────┐
│  ✨ AI INSIGHTS            [↻ 12m ago] │
│  ──────────────────────────────────── │
│  [JD] John Doe · Acme Corp    [92]    │
│       "High ICP. Send follow-up."     │
│       [→ Generate Email]              │
│  ─────────────────────────────────── │
│  [SL] Sara Lee · Beta Inc     [87]    │
│       "Uncontacted. Start outreach."  │
│       [→ Generate Outreach]           │
│  ─────────────────────────────────── │
│  + 4 leads in enrichment queue        │
│  [Run Audit for All]                  │
└────────────────────────────────────────┘
```

| Element | Spec |
|---------|------|
| Widget title | `✨` (violet, `14px`) + "AI INSIGHTS", uppercase, `0.6875rem`, `text-secondary` |
| Refresh time | `0.6875rem`, `text-tertiary`, right-aligned |
| Lead item | `36px` height, avatar (`28px`) + name + score badge |
| Rationale | `0.75rem`, `text-secondary`, italic, max 1 line, clipped |
| CTA | `0.75rem`, `accent` color, no button shape — text link with `→` |
| Score badge | `24px` circle, text `0.6875rem`, `font-weight: 700` |
| Score badge colors | `≥80`: `green` border + text · `60–79`: `amber` · `<60`: `red` |
| Score badge background | `surface-raised` |
| Enrichment line | `0.8125rem`, `text-secondary` below last lead |
| "Run Audit" | Full-width secondary button, `height: 32px` |

---

## 13. Lead Pipeline Widget

Row 3, left column.

```
┌───────────────────────────────────────────────────────────────────┐
│  LEAD PIPELINE                                      View All →    │
│  ──────────────────────────────────────────────────────────────── │
│  STATUS BREAKDOWN                                                  │
│  New          ████████████████████████  68   54%                  │
│  Contacted    ████████████             24   19%                   │
│  Qualified    ████████                  8    6%                   │
│  Won          ██████████               22   17%                   │
│  Lost         ███                       3    2%                   │
│  Total: 125 leads                                                  │
│  ──────────────────────────────────────────────────────────────── │
│  TOP LEADS BY SCORE                                                │
│  [JD] John Doe · Acme Corp      [92] New     →                   │
│  [SL] Sara Lee · Beta Inc       [87] Qualified →                  │
│  [MY] Mike Yu · Gamma Ltd       [81] Contacted →                  │
└───────────────────────────────────────────────────────────────────┘
```

### Funnel Bars

| Property | Value |
|----------|-------|
| Bar height | `20px` |
| Bar border-radius | `0 3px 3px 0` (right corners only) |
| Track background | `#1C2333` |
| Bar fill | Solid color per status (no gradient) |
| Fill animation | Width from `0` to target on mount, `500ms ease` |
| Status label | Left, `0.8125rem`, `text-secondary`, `60px` fixed width |
| Count | Right of bar, `0.8125rem`, `JetBrains Mono`, `text-primary` |
| Percentage | Rightmost, `0.75rem`, `text-tertiary` |
| Click on bar | Navigate to `/leads?status={status}` |
| Row hover | Entire row background `surface-hover` |

### Status Bar Colors (solid, no gradient)

| Status | Color |
|--------|-------|
| New | `#3B82F6` |
| Contacted | `#8B5CF6` |
| Qualified | `#F59E0B` |
| Won | `#10B981` |
| Lost | `#EF4444` |

### Top Leads Section

| Element | Spec |
|---------|------|
| Section divider | `1px solid #1F2937` |
| Section label | "TOP LEADS BY SCORE", `0.625rem`, uppercase, `text-tertiary` |
| Row height | `44px` |
| Avatar | `28px`, initials, `background: accent-subtle`, `color: accent` |
| Name | `0.875rem`, `font-weight: 500`, `text-primary` |
| Company | `0.8125rem`, `text-secondary` |
| Score badge | `28px` circle, `border: 1px solid {color}`, `text: {color}`, `background: {color}-subtle` |
| Row hover | `background: surface-hover`, cursor: pointer |
| Navigate on click | `/leads/:id` |

---

## 14. Campaign Summary Widget

Row 3, right column.

```
┌───────────────────────────────────────────────────────────────────┐
│  CAMPAIGNS                                          View All →    │
│  ──────────────────────────────────────────────────────────────── │
│  [● 3 Active]   [⏸ 1 Paused]   [✓ 8 Done]   [◻ 2 Draft]        │
│  ──────────────────────────────────────────────────────────────── │
│  Summer Outreach 2026                           ● Active          │
│  Sequence: 3-step · VIP Leads (42)                                │
│  ████████░░░░░░░  28 / 42                                         │
│  Open 31%  ·  Reply 9%  ·  Bounced 2                             │
│  ──────────────────────────────────────────────────────────────── │
│  Cold SDR Q3                                    ● Active          │
│  Sequence: 5-step · SDR Segment (80)                              │
│  ██████░░░░░░░░░  48 / 80                                         │
│  Open 26%  ·  Reply 6%  ·  Bounced 1                             │
└───────────────────────────────────────────────────────────────────┘
```

### Health Chips

| State | Indicator | Background | Text |
|-------|-----------|-----------|------|
| Active | `●` solid circle | `green-subtle` | `green` |
| Paused | `⏸` | `amber-subtle` | `amber` |
| Completed | `✓` | `blue-subtle` | `blue` |
| Draft | `◻` | `surface-raised` | `text-secondary` |

Chip: `border-radius: 9999px`, `padding: 3px 10px`, `0.75rem`, `font-weight: 600`

### Campaign Row

| Element | Spec |
|---------|------|
| Name | `0.9375rem`, `font-weight: 600`, `text-primary` |
| Status badge | Right-aligned, colored dot + text |
| Meta line | `0.8125rem`, `text-secondary`: sequence steps + audience name + count |
| Progress bar | `6px` height, solid `accent` fill, `#1C2333` track, full width |
| Progress label | `0.75rem`, `text-secondary`, right: "28 / 42" |
| Metrics | `0.75rem`, `text-secondary`: "Open X% · Reply Y% · Bounced Z" |
| Metric values | `JetBrains Mono`, `text-primary` |
| Row click | Navigate to `/campaigns/:id` |

---

## 15. Recent Activity Widget

Row 4, left column (`2fr`).

```
┌───────────────────────────────────────────────────────────────────────────┐
│  RECENT ACTIVITY                    [All ●] [Emails] [Tasks]  View All → │
│  ─────────────────────────────────────────────────────────────────────── │
│  TODAY                                                                    │
│  [💬] John Doe replied to "Summer Outreach"                   2m ago      │
│        Campaign: Summer Outreach 2026  ·  View Lead →                    │
│  [👁]  Sara Lee opened "Cold SDR Q3"                          14m ago     │
│  [✅]  "Q3 Outreach" campaign completed · 42 leads · Open 29% 1h ago     │
│  [↑]   152 leads imported by Alex J.  ·  View →              3h ago      │
│                                                                           │
│  YESTERDAY                                                                │
│  [✨]  AI audit: Acme Corp            Completed                Yesterday  │
│  [👤]  New lead: Mike Yu · Gamma Ltd                           Yesterday  │
│                                                                           │
│                        [Load 10 More]                                     │
└───────────────────────────────────────────────────────────────────────────┘
```

### Filter Tabs

Text tabs (no pill backgrounds):
- Active tab: `text-primary`, `border-bottom: 2px solid accent`
- Inactive: `text-tertiary`
- Height: `32px`, `gap: 16px`

### Group Headers

```
─── TODAY ───
```

- Rendered as: left line + text + right line (full-width divider with centered label)
- Text: `0.625rem`, uppercase, `letter-spacing: 0.08em`, `text-tertiary`

### Activity Row

| Element | Spec |
|---------|------|
| Event icon | `32px × 32px` solid square, `border-radius: 6px`, icon `16px` |
| Description | `0.875rem`, `text-primary` |
| Secondary line | `0.8125rem`, `text-tertiary` — campaign name, action links |
| Time | `0.75rem`, `text-tertiary`, right-aligned, `JetBrains Mono` |
| Row padding | `12px 0` |
| Row divider | `1px solid #1F2937` |
| Row hover | `background: surface-hover`, `-8px 8px` horizontal padding expansion |
| Links | `text-secondary` → `text-primary` on hover, no underline by default, underline on hover |

### Event Icon Backgrounds (solid colors, no gradients)

| Event | Icon | Background |
|-------|------|-----------|
| Reply | `MessageSquare` | `#1E2048` (indigo-tinted) |
| Opened | `Eye` | `#052E16` (green-tinted) |
| Campaign complete | `CheckCircle` | `#052E16` |
| Campaign launched | `Megaphone` | `#2D1B00` (amber-tinted) |
| Import | `Upload` | `#0A1628` (blue-tinted) |
| AI Enrichment | `Sparkles` | `#1A0D3D` (violet-tinted) |
| Lead created | `UserPlus` | `#0A1628` |
| Task complete | `CheckSquare` | `#052E16` |
| Error / Bounce | `AlertCircle` | `#1F0707` (red-tinted) |

### Load More

Centered text button: "Load 10 more activities ↓"
- Font: `0.875rem`, `text-tertiary`
- Hover: `text-secondary`
- No button border or background — text only

---

## 16. Quick Actions Widget

Row 4, right column (`1fr`).

```
┌────────────────────────────────────────┐
│  QUICK ACTIONS                         │
│  ─────────────────────────────────── │
│  + Add Lead                         → │
│  ↑ Import Leads (CSV)               → │
│  □ Create Campaign                  → │
│  ↻ New Sequence                     → │
│  ✨ Run AI Website Audit             → │
│  ─────────────────────────────────── │
│  ONBOARDING                            │
│  ████████████░░░  3 of 4 complete      │
│  ✓ Connected email                     │
│  ✓ Imported leads                      │
│  ✓ Created a sequence                  │
│  □ Launch your first campaign     →    │
└────────────────────────────────────────┘
```

### Action Buttons

| Element | Spec |
|---------|------|
| Row height | `44px` |
| Layout | Icon-left (`18px`) + label + `→` right |
| Icon color | Distinct per action (see below) |
| Default text | `text-secondary` |
| Hover | Background `surface-hover`, text `text-primary`, `→` shifts `4px` right |
| Transition | `150ms ease` |
| Divider | `1px solid #1F2937` between items |
| Font | `0.875rem`, `font-weight: 500` |

**Icon colors per action**:
- Add Lead: `#3B82F6`
- Import: `#8B5CF6`
- Campaign: `#F59E0B`
- Sequence: `#10B981`
- AI Audit: `#EC4899`

### Onboarding Section

- Visible only when org has < 4 steps complete
- Progress bar: `6px`, solid `accent` fill, `#1C2333` track
- Label: "X of 4 complete", `0.8125rem`, `text-secondary`
- Checklist items: `0.875rem` — completed items `text-tertiary` + `✓` prefix; incomplete items `text-primary` + `□` + right arrow link
- Section hidden when all 4 complete

---

## 17. AI Drawer (Toggleable)

### Behavior

- Toggle button: `✨ AI` in topbar right zone
- When open: drawer slides in from right
  - **Desktop**: content area `margin-right` grows from `0` to `400px`
  - **Mobile**: drawer covers `100vw` with a backdrop overlay — content is not pushed
- Transition: `margin-right 220ms ease`, `transform 220ms ease` on drawer
- Persisted in `localStorage` key: `ai_panel_open`
- Close: `×` button inside drawer header, or click backdrop (mobile)

### Dimensions by Breakpoint

| Breakpoint | Width | Behavior |
|-----------|-------|----------|
| Desktop ≥1280px | `400px` | Pushes content area (margin-right) |
| Laptop 1024–1279px | `400px` | Pushes content area |
| Tablet 768–1023px | `400px` | Overlays content (no push), backdrop shown |
| Mobile <768px | `100vw` | Full screen, backdrop covers everything |

### Position

```
Position: fixed
Right: 0
Top: 56px
Bottom: 0
Z-index: 40
Background: #111827
Left border: 1px solid #1F2937
Overflow-y: auto
```

### Mobile-Specific Additions

- Backdrop: `position: fixed`, `inset: 0`, `background: rgba(0,0,0,0.50)`, `z-index: 39`
- Drawer `z-index: 40` (above backdrop)
- Mobile drawer header includes a `← Back` label instead of `×` icon
- Body scroll locked (`overflow: hidden` on `<body>`) when mobile drawer is open

### Drawer Header

```
[✨ AI Assistant]    [Context: Dashboard]    [×]
─────────────────────────────────────────────────
```

| Element | Spec |
|---------|------|
| Title | `0.875rem`, `font-weight: 600`, `text-primary` |
| Sparkle icon | `14px`, `violet` |
| Context badge | `0.6875rem`, solid `violet-subtle`, `border-radius: 4px`, padding `2px 6px` |
| Close button | `×` icon button, `text-tertiary` (desktop) / `← Back` text (mobile) |
| Bottom border | `1px solid #1F2937` |

### Context Tabs

```
[Insights ●]   [Email]   [Follow-up]
```

- Tab style: text only, `0.8125rem`
- Active: `text-primary`, `border-bottom: 2px solid accent`
- Inactive: `text-tertiary`
- Tabs change content below without page navigation

### Drawer Body Sections

**Section: Who to Contact**
Each lead row:
- Avatar (`28px`) + Name (`0.875rem`, bold) + Company (`0.8125rem`, secondary)
- Score badge (inline, right)
- Rationale: `0.75rem`, `text-secondary`, 1 line max, clipped with ellipsis
- CTA: `0.8125rem`, `accent`, text link

**Section: Enrichment Queue**
- "N leads awaiting audit" — `0.875rem`, `text-secondary`
- Button: `height: 32px`, secondary style, full width

**Section: Campaign Suggestion**
- 1-sentence suggestion, `0.875rem`, `text-secondary`
- CTA link: `0.8125rem`, `accent`

Section dividers: `1px solid #1F2937`

---

## 18. Notification Drawer

Triggered by 🔔 in topbar. Slides in from right. **Overlays content** (does not push).

| Property | Value |
|----------|-------|
| Width | `360px` |
| Position | `fixed`, `right: 0`, `top: 56px`, `bottom: 0` |
| Background | `#111827` |
| Left border | `1px solid #1F2937` |
| Z-index | `60` (above AI panel) |
| Backdrop | `rgba(0,0,0,0.40)` behind drawer |

### Notification Row

- Unread: `background: #1A2235`, left `3px solid accent` bar
- Read: standard surface
- Icon circle: `32px`, `border-radius: 6px`, solid tinted background
- Title: `0.875rem`, `font-weight: 500`
- Description: `0.8125rem`, `text-secondary`, 2-line max
- Time: `0.75rem`, `text-tertiary`
- Dismiss: `×` icon, visible on hover

---

## 19. Responsive Design Rules

### Breakpoints

| Name | Range | Description |
|------|-------|-------------|
| Desktop | `≥ 1440px` | Full layout, all widgets, full sidebar |
| Laptop | `1280px – 1439px` | Full layout, slight density increase |
| Tablet | `768px – 1279px` | Sidebar collapses, AI Drawer overlays |
| Mobile | `< 768px` | Single column, bottom nav, full-screen AI Drawer |

---

### Desktop (≥ 1440px)

| Element | Behavior |
|---------|----------|
| Sidebar | `256px` expanded by default |
| Content margin-left | `256px` (expanded) / `72px` (collapsed) |
| Content padding | `32px` |
| AI Drawer | `400px`, pushes content (`margin-right: 400px`) |
| KPI Cards | 4-column row |
| Widget Grid | All rows at specified `fr` ratios, gap `24px` |
| Topbar search | Full-width up to `max-width: 480px` |
| Content max-width | `1600px` centered within content area |

---

### Laptop (1280px – 1439px)

| Element | Behavior |
|---------|----------|
| Sidebar | `256px` expanded, user may collapse to `72px` |
| Content margin-left | Same as Desktop |
| Content padding | `24px` |
| AI Drawer | `400px`, pushes content |
| KPI Cards | 4-column row |
| Widget Grid | Maintained — Row 2 may feel tighter (`2fr 1fr`), gap `24px` |
| Topbar search | Compressed to `max-width: 360px` |
| Content max-width | `1600px` centered |
| Row 4 (Activity + Actions) | `2fr 1fr` maintained |

---

### Tablet (768px – 1279px)

| Element | Behavior |
|---------|----------|
| Sidebar | `72px` collapsed by default. Tap hamburger → overlay at `256px` with backdrop |
| Sidebar overlay | `position: fixed`, `z-index: 50`, backdrop `rgba(0,0,0,0.40)` |
| Content margin-left | `72px` (always — overlay does not push) |
| Content padding | `20px` |
| AI Drawer | `400px`, overlay mode (does not push content), backdrop shown |
| KPI Cards | 2 × 2 grid |
| Widget Grid | Gap `20px` |
| Row 2 (Chart + AI Strip) | Stacked — Chart full width, AI Strip full width below |
| Row 3 (Pipeline + Campaigns) | Stacked — each full width |
| Row 4 (Activity + Actions) | Stacked — Activity full width, Quick Actions full width below |
| Topbar search | Compressed to `max-width: 240px` |
| Topbar org switcher | Hidden — org name shown in sidebar header instead |

---

### Mobile (< 768px)

| Element | Behavior |
|---------|----------|
| Sidebar | Hidden entirely — replaced by bottom navigation bar |
| Bottom nav bar | `56px` fixed bottom — icons only for: Dashboard, Leads, Campaigns, AI, More |
| "More" in bottom nav | Opens bottom sheet drawer with remaining nav items |
| Content margin-left | `0` |
| Content padding-bottom | `56px` (clears bottom nav) |
| AI Drawer | `100vw` full screen, slides over entire viewport |
| AI Drawer backdrop | Full-screen, body scroll locked |
| Topbar | Logo + Page title (center) + 🔔 + 👤 only |
| Topbar search | Hidden — search icon in topbar opens full-screen search overlay |
| KPI Cards | 2 × 2 grid |
| Row 2 (Chart + AI Strip) | Chart hidden. AI Strip shown full width |
| Row 3 (Pipeline + Campaigns) | Stacked full width |
| Row 4 (Activity + Actions) | Activity feed only (full width). Quick Actions moved to bottom sheet |
| Row 5 (Team Activity) | Hidden |
| Page content padding | `16px` horizontal |
| Widget Grid | Gap `16px` |

---

## 20. Interaction & Motion Rules

### Hover Effects

| Element | Effect | Duration |
|---------|--------|---------|
| Nav items | Background color change only | `150ms` |
| Table rows | Background `surface-hover` | `150ms` |
| KPI cards | Border brightens, background lightens | `150ms` |
| Quick action rows | Background + `→` shifts `4px` right | `150ms` |
| Buttons | Background darkens | `100ms` |
| Activity rows | Background + horizontal padding expands | `150ms` |

**No `transform: translateY` (no card lift).**
**No `box-shadow` changes.**
**No opacity pulses.**

This is an enterprise tool — motion is functional, not decorative.

### Focus States

All interactive elements:
- `outline: 2px solid #4F46E5`
- `outline-offset: 2px`
- Never `outline: none` without replacement

### Skeleton Loading

- Background: `#1C2333` (solid — no shimmer)
- `border-radius: 4px`
- Blocks replace content dimensions exactly
- Shimmer animation: disabled (enterprise tools do not animate during loading)

---

## 21. Layout State Management

### localStorage Keys

| Key | Default | Values |
|-----|---------|--------|
| `sidebar_expanded` | `"true"` | `"true"` / `"false"` |
| `ai_panel_open` | `"false"` | `"true"` / `"false"` |
| `theme` | `"dark"` | `"dark"` / `"light"` (future) |
| `activity_filter` | `"all"` | `"all"` / `"emails"` / `"tasks"` |
| `chart_range` | `"30d"` | `"7d"` / `"30d"` / `"90d"` |

### Content Area Margin-left

| Sidebar state | Margin |
|--------------|--------|
| Expanded (`256px`) | `margin-left: 256px` |
| Collapsed (`72px`) | `margin-left: 72px` |

### Content Area Margin-right

| AI Drawer state | Desktop/Laptop | Tablet | Mobile |
|----------------|---------------|--------|--------|
| Closed | `margin-right: 0` | `margin-right: 0` | `margin-right: 0` |
| Open | `margin-right: 400px` | `margin-right: 0` (overlay) | `margin-right: 0` (full screen) |

Both margins animate simultaneously with sidebar/panel transitions: `220ms ease`.

---

*This is the authoritative specification for the Injaazh Lead AI dashboard implementation. Build from this document. Do not reference the three earlier concepts. Any ambiguity should be resolved by checking DESIGN_SYSTEM.md and PAGE_SPECS.md.*

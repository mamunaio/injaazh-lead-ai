# APP_LAYOUT.md — Injaazh Lead AI: Application Layout Specification

> **Complete Layout Architecture — Every Panel, Every Breakpoint**  
> Version: 1.0 | Last Updated: July 2026  
> Companion documents: [IA.md](./IA.md) | [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) | [DASHBOARD.md](./DASHBOARD.md) | [COMPONENTS.md](./COMPONENTS.md)  
> Status: Living Document — Update before any structural layout change.

---

## Table of Contents

1. [Layout Philosophy](#1-layout-philosophy)
2. [Layout Hierarchy](#2-layout-hierarchy)
3. [App Shell](#3-app-shell)
4. [Top Navigation (Topbar)](#4-top-navigation-topbar)
5. [Sidebar](#5-sidebar)
6. [Content Area](#6-content-area)
7. [Right AI Assistant Panel](#7-right-ai-assistant-panel)
8. [Notification Drawer](#8-notification-drawer)
9. [Global Search](#9-global-search)
10. [Command Palette](#10-command-palette)
11. [Mobile Navigation](#11-mobile-navigation)
12. [Tablet Layout](#12-tablet-layout)
13. [Desktop Layout](#13-desktop-layout)
14. [Layout Zones Summary Table](#14-layout-zones-summary-table)
15. [Z-Index Stack](#15-z-index-stack)
16. [Transition & Animation Rules](#16-transition--animation-rules)
17. [Layout State Management](#17-layout-state-management)

---

## 1. Layout Philosophy

### Three Principles

**1. Structure is Invisible**  
The layout should feel effortless. Users should never notice the grid — only the content. This means zero layout shift on load, smooth transitions on collapse, and no visual jarring when panels open or close.

**2. Every Pixel is Intentional**  
Fixed widths are chosen for a reason. The sidebar is 240px because it comfortably fits the longest navigation label at 14px with a 20px icon and adequate padding. The content area max-width is 1200px because beyond that, line lengths become too wide for comfortable reading on a dark screen.

**3. Progressive Disclosure**  
On small screens, hide complexity. On large screens, reveal it. The AI Assistant panel is hidden on tablet and mobile not because it doesn't matter — but because small screens should focus on one job at a time.

### Authenticated vs. Unauthenticated Layout

Two distinct layout modes:

| Mode | Trigger | Structure |
|------|---------|-----------|
| **Authenticated** | Valid JWT present | Full App Shell: Topbar + Sidebar + Content + optional right panels |
| **Unauthenticated** | No valid JWT | Centered card layout, no chrome, full dark canvas |

---

## 2. Layout Hierarchy

### Zone Architecture (Full Desktop)

```
VIEWPORT (100vw × 100vh)
│
├── LAYER 0: Background Canvas     z-index: 0
│   ├── Dark background (#0B0E14)
│   ├── Glow Blob 1 (top-left, indigo)
│   └── Glow Blob 2 (bottom-right, purple)
│
├── LAYER 1: App Shell              z-index: 1–10
│   ├── TOPBAR (fixed, full-width, 60px)       z-index: 50
│   ├── SIDEBAR (fixed, left, 240px/64px)      z-index: 40
│   ├── CONTENT AREA (scrollable)              z-index: 10
│   └── RIGHT AI PANEL (fixed, right, 320px)   z-index: 30 [conditional]
│
├── LAYER 2: Drawers               z-index: 60
│   └── NOTIFICATION DRAWER (right slide-in, 380px)
│
├── LAYER 3: Overlays              z-index: 70
│   ├── COMMAND PALETTE (centered modal)
│   └── GLOBAL SEARCH PANEL (below topbar)
│
├── LAYER 4: Modals                z-index: 80
│   └── Confirmation dialogs, Add Task, etc.
│
└── LAYER 5: Toasts                z-index: 90
    └── Toast notifications (bottom-right, non-blocking)
```

### Layout Rule: No Nesting Above Its Level
Nothing at Layer N may overflow above Layer N+1. The topbar (z-50) cannot render above a modal (z-80). Toasts (z-90) are always the topmost visible UI element.

---

## 3. App Shell

### Definition
The App Shell is the persistent, application-wide layout frame. It is the parent container for every authenticated screen and never unmounts between page navigations (Next.js App Router shared layout). Only the Content Area re-renders on navigation.

### Shell Anatomy

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│                             TOPBAR — 60px fixed top, 100vw                       │
├──────────────────┬───────────────────────────────────────┬────────────────────────┤
│                  │                                       │                        │
│   SIDEBAR        │         CONTENT AREA                 │   RIGHT AI PANEL       │
│   fixed left     │         scrollable                   │   fixed right          │
│   240px / 64px   │         flex-grow: 1                 │   320px (optional)     │
│   top: 60px      │         top: 60px                    │   top: 60px            │
│   height: calc   │         min-height: calc             │   height: calc         │
│   (100vh - 60px) │         (100vh - 60px)               │   (100vh - 60px)       │
│                  │                                       │                        │
│                  │                                       │                        │
└──────────────────┴───────────────────────────────────────┴────────────────────────┘
```

### Shell Measurements

| Zone | Property | Value |
|------|----------|-------|
| **Topbar** | Height | `60px` |
| **Topbar** | Position | `fixed`, `top: 0`, `left: 0`, `right: 0` |
| **Sidebar** | Width (expanded) | `240px` |
| **Sidebar** | Width (collapsed) | `64px` |
| **Sidebar** | Position | `fixed`, `top: 60px`, `left: 0`, `bottom: 0` |
| **Content Area** | Position | `relative`, `margin-left: 240px` (or 64px) |
| **Content Area** | Min height | `calc(100vh - 60px)` |
| **Content Area** | Top padding | `60px` (offset for fixed topbar) |
| **Right AI Panel** | Width | `320px` |
| **Right AI Panel** | Position | `fixed`, `top: 60px`, `right: 0`, `bottom: 0` |
| **Right AI Panel** | Content margin-right | `320px` when panel is open |

### Shell State Machine

```
INITIAL STATE:
  Topbar: visible
  Sidebar: expanded (240px) [restored from localStorage]
  Content Area: margin-left: 240px
  Right AI Panel: hidden (margin-right: 0)

SIDEBAR COLLAPSE EVENT:
  Sidebar: 240px → 64px (250ms ease transition)
  Content Area: margin-left: 240px → 64px (250ms ease, synchronized)

SIDEBAR EXPAND EVENT:
  Sidebar: 64px → 240px
  Content Area: margin-left: 64px → 240px

RIGHT PANEL OPEN EVENT:
  Right AI Panel: slides in from right (0px → 320px, 300ms ease)
  Content Area: margin-right: 0 → 320px (synchronized)

RIGHT PANEL CLOSE EVENT:
  Right AI Panel: slides out right (320px → 0px)
  Content Area: margin-right: 320px → 0

NOTIFICATION DRAWER OPEN:
  Drawer overlays content (does NOT push content)
  Backdrop overlay appears behind drawer

COMMAND PALETTE OPEN:
  Centered overlay appears, content behind dimmed
  Focus traps inside palette
```

### Shell Persistence

The following layout states persist across sessions via `localStorage`:

| Key | Default | Values |
|-----|---------|--------|
| `sidebar_expanded` | `"true"` | `"true"` / `"false"` |
| `ai_panel_open` | `"false"` | `"true"` / `"false"` |
| `theme_preference` | `"dark"` | `"dark"` / `"light"` |

---

## 4. Top Navigation (Topbar)

### Role
The topbar is the global context bar. It communicates: where you are (org), how to get anywhere (search + command palette), what needs attention (notifications), and who you are (user menu).

### Dimensions

| Property | Value |
|----------|-------|
| Height | `60px` |
| Width | `100vw` (full width, ignores sidebar/right panel) |
| Position | `fixed`, `top: 0`, `left: 0`, `right: 0` |
| Z-index | `50` |
| Background | `rgba(11, 14, 20, 0.85)` |
| Backdrop filter | `blur(12px)` |
| Bottom border | `1px solid rgba(255, 255, 255, 0.05)` |

### Zone Layout

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│  LEFT ZONE (240px fixed)  │          CENTER ZONE (flex-grow)         │  RIGHT ZONE  │
│                           │                                           │   (auto)     │
│  [🔷 Logo 32px]  [Name]  │  [▾ Acme Corp ▾]  │  [🔍 Search...]    │  [⌘K][🔔][👤]│
│                           │                                           │              │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

### Left Zone (240px wide — matches sidebar)

| Element | Width | Purpose |
|---------|-------|---------|
| Logo mark | `32px` | Product icon, links to `/dashboard` |
| Product name | Auto | "Injaazh Lead AI" text, hidden on collapse and mobile |
| Zone total | `240px` | Intentionally aligned with sidebar width |

**Behavior**: Left zone width stays at `240px` whether sidebar is expanded or collapsed. This creates a consistent header structure that doesn't jump.

### Center Zone (flex-grow)

| Element | Width | Purpose |
|---------|-------|---------|
| Org Switcher | `180px max` | Current org name + chevron, click opens dropdown |
| Divider | `1px` | Vertical separator line |
| Search Bar | `max 480px` | Global search input, fluid width |

**Org Switcher placement**: Left-edge of center zone (not floating).  
**Search Bar**: Centered within the remaining space of the center zone.

### Right Zone (auto width)

From left to right within right zone:

| Element | Size | Gap to next |
|---------|------|------------|
| ⌘K Button | `32px × 32px` icon button | `8px` |
| AI Panel Toggle Button | `32px × 32px` icon button | `8px` |
| Notification Bell | `32px × 32px` icon button + badge | `8px` |
| User Avatar | `32px × 32px` circle | `16px` edge padding |

**Right zone total padding**: `16px` right edge.

### Topbar Responsive Behavior

| Breakpoint | Changes |
|-----------|---------|
| `< 640px` | Product name hidden; search bar compresses to icon; org switcher shows only first 12 chars |
| `640px – 767px` | Product name hidden; search bar shrinks to `200px` |
| `768px – 1023px` | Product name visible; org switcher visible; search bar `300px` |
| `≥ 1024px` | Full topbar — all elements visible |
| `≥ 1440px` | Search bar expands to `480px` max |

---

## 5. Sidebar

### Role
The sidebar is the primary navigation system. It tells the user where they can go and marks where they currently are.

### Dimensions

| State | Width | Transition |
|-------|-------|-----------|
| Expanded | `240px` | `width 250ms ease` |
| Collapsed | `64px` | `width 250ms ease` |
| Hidden (mobile) | `0px` / off-canvas | `transform translateX(-100%) 300ms ease` |

### Position

| Property | Value |
|----------|-------|
| Position | `fixed` |
| Top | `60px` (below topbar) |
| Left | `0` |
| Bottom | `0` |
| Height | `calc(100vh - 60px)` |
| Z-index | `40` |
| Background | `rgba(11, 14, 20, 0.95)` |
| Right border | `1px solid rgba(255, 255, 255, 0.05)` |
| Overflow | `hidden` (hides labels in collapsed mode) |
| Overflow-Y | `auto` (scrollable if nav items exceed height) |

### Structural Sections

```
┌─────────────────────────────────────────────────────┐
│ LOGO AREA (60px height, matches topbar)             │ ← Logo + Collapse toggle
├─────────────────────────────────────────────────────┤
│ MAIN NAV ITEMS (flex-grow, scrollable)              │ ← Primary navigation
│                                                     │
│  📊 Dashboard                                       │
│  👥 Leads                          [142]            │
│     └─ All Leads                                    │
│     └─ Import                                       │
│     └─ Segments                                     │
│  📣 Campaigns                      [3 Active]       │
│     └─ All Campaigns                                │
│     └─ New Campaign                                 │
│  🔀 Sequences                                       │
│  ◧  CRM                                             │
│     └─ Pipeline                                     │
│     └─ Tasks                                        │
│     └─ Notes                                        │
│  ✨ AI Tools                                        │
│     └─ Website Audit                                │
│     └─ Follow-up Gen.                               │
│     └─ Subject Lines                                │
│  ── divider ──────────────────────────────────      │
│  ⚙  Settings          [Owner/Admin only]           │
│     └─ Email Accounts                               │
│     └─ Team Members                                 │
│     └─ Prompt Templates                             │
│     └─ Billing                                      │
├─────────────────────────────────────────────────────┤
│ FOOTER ITEMS (fixed at bottom)                      │
│  ❓ Help & Docs (external link)                     │
│  ⚡ What's New                                      │
└─────────────────────────────────────────────────────┘
```

### Sidebar Sections Detail

#### Logo Area
- **Height**: `60px` (aligned with topbar)
- **Content expanded**: Brand icon (32px) + "Injaazh" wordmark + collapse toggle button (right-aligned)
- **Content collapsed**: Brand icon (32px) centered + expand toggle icon (below icon, centered)
- **Collapse toggle**: `IconButton`, chevron-left icon, rotates to chevron-right when collapsed

#### Main Nav Area
- **Position**: Below logo area, above footer
- **Overflow-Y**: `auto` with hidden scrollbar (scrolls when many items)
- **Padding**: `12px 0` (no horizontal padding — items have their own)
- **Nav item height**: `44px` (meets touch target minimum)
- **Section spacing**: `8px` between groups
- **Divider**: `1px` horizontal line between navigation groups and settings group

#### Nav Item Structure

```
┌──────────────────────────────────────────────────┐
│  [3px accent bar]  [icon 20px]  [Label]  [Badge] │  ← Expanded
└──────────────────────────────────────────────────┘

┌──────────────────┐
│  [3px bar] [icon]│  ← Collapsed (label hidden, badge hidden)
└──────────────────┘
```

- **Item padding**: `0 12px` (sides), vertically centered in 44px
- **Icon**: `20px`, `strokeWidth: 1.5`, left-aligned
- **Label**: `14px`, `font-weight: 500`, auto hides in collapsed mode
- **Label transition**: `opacity 150ms ease, width 150ms ease`
- **Badge**: Pill shape, right edge of item, hidden in collapsed mode
- **Active accent bar**: Left `3px` wide bar, `height: 28px`, gradient `#6366F1 → #A855F7`, `border-radius: 0 2px 2px 0`

#### Sub-Items
- **Visibility**: Only shown when parent item is the active section
- **Animation**: Slide down (height 0 → auto, 200ms ease)
- **Indent**: `20px` left indent from parent icon position
- **Height**: `36px` per sub-item
- **Font**: `13px`, `font-weight: 400`, `text.secondary` color → `text.primary` on active
- **Left marker**: `1px` vertical line connecting sub-items (subtle, `rgba(255,255,255,0.1)`)
- **Hidden in collapsed mode**: Sub-items never shown in collapsed sidebar

#### Footer Area
- **Position**: Absolute bottom of sidebar, `bottom: 0`
- **Background**: Same as sidebar (no gradient, just same dark)
- **Top border**: `1px solid rgba(255, 255, 255, 0.05)`
- **Height**: `auto` (2 items × 44px = 88px)
- **Help & Docs**: Opens external documentation link in new tab, external link icon `↗`
- **What's New**: Navigates to `/changelog`

### Sidebar Collapsed State Rules

| Element | Collapsed Behavior |
|---------|------------------|
| Product name (logo area) | Hidden (`opacity: 0`, `width: 0`) |
| Nav item labels | Hidden (`opacity: 0`, `width: 0`) |
| Nav item badges | Hidden |
| Sub-items | Never shown |
| Footer labels | Hidden |
| Active accent bar | Still visible (3px left bar) |
| Icon | Always visible, centered in 64px |
| Tooltip | Appears on hover showing the label |
| Section divider | Still visible (hairline) |

### Sidebar Width Impact on Content

The content area uses `margin-left` to accommodate the sidebar:

```
Sidebar Expanded  → Content margin-left: 240px
Sidebar Collapsed → Content margin-left: 64px
Transition: both sidebar width AND content margin-left animate simultaneously (250ms ease)
```

This synchronized transition prevents the "snap" effect of content jumping.

---

## 6. Content Area

### Role
The content area is the primary workspace. It hosts every page's content, changes on navigation, and is the only zone that scrolls vertically.

### Dimensions

| Property | Value |
|----------|-------|
| Position | `relative` (not fixed — scrolls) |
| Margin-left | `240px` (expanded) / `64px` (collapsed) |
| Margin-right | `0` (no AI panel) / `320px` (AI panel open) |
| Padding-top | `60px` (offset for fixed topbar) |
| Min-height | `calc(100vh - 60px)` |
| Background | Inherits canvas background |
| Overflow-Y | `auto` (scrollable) |
| Overflow-X | `hidden` |

### Inner Content Constraints

```
CONTENT AREA (variable width)
└── CONTENT CANVAS (max-width: 1200px, centered, padded)
    └── PAGE CONTENT
        ├── BREADCRUMB (optional)
        ├── PAGE HEADER (title + actions)
        └── PAGE BODY (widgets, forms, tables, etc.)
```

| Property | Value |
|----------|-------|
| Canvas max-width | `1200px` |
| Canvas horizontal padding | `2rem 5%` (desktop) → `1.5rem` (tablet) → `1rem` (mobile) |
| Canvas centering | `margin: 0 auto` |
| Canvas top padding | `2rem` |
| Canvas bottom padding | `3rem` |

### Content Area Scroll Behavior

- Only the content area scrolls — topbar, sidebar, and right panel are fixed.
- On scroll, the content passes behind the fixed topbar (topbar's backdrop-blur creates depth).
- No horizontal scroll on the content area — all content adapts to available width.
- Scroll position resets to top on every navigation (route change).

### Content Structure Anatomy

```
CONTENT CANVAS
│
├── BREADCRUMB ROW (height: auto, margin-bottom: 0.5rem)
│   Only shown on Level 2+ screens
│
├── PAGE HEADER ROW (height: auto, margin-bottom: 2rem)
│   [h1 Title (gradient)] ─────────────────── [Action Buttons]
│
└── PAGE BODY (variable)
    This is the page-specific content:
    - Dashboard: Widget grid
    - Leads: DataTable
    - Add Lead: FormCard
    - Campaign Builder: StepWizard
    - etc.
```

### Content Area & Right Panel Interaction

When the Right AI Panel opens:
- Content area `margin-right` increases from `0` to `320px`
- This pushes content left — content area shrinks in available width
- At desktop widths `≥ 1280px`: content canvas still has space to render full grid
- At `1024px–1279px`: content canvas compresses — 4-column grids may collapse to 3

---

## 7. Right AI Assistant Panel

### Role
An optional, contextual AI panel that slides in from the right side of the screen. It provides AI-powered assistance without requiring navigation to a separate page. Context-sensitive: its content changes based on the current page.

### Activation

| Trigger | Action |
|---------|--------|
| AI Panel icon button in topbar | Toggles panel open/closed |
| Keyboard shortcut `Ctrl/Cmd+Shift+A` | Toggles panel |
| "Open AI Panel" CTA on lead detail page | Opens panel in "Lead Insights" mode |
| "Generate Email" CTA on lead detail | Opens panel in "Email Generation" mode |

### Dimensions

| Property | Value |
|----------|-------|
| Width | `320px` |
| Position | `fixed`, `right: 0`, `top: 60px`, `bottom: 0` |
| Z-index | `30` |
| Background | `rgba(15, 23, 42, 0.95)` |
| Backdrop filter | `blur(16px)` |
| Left border | `1px solid rgba(255, 255, 255, 0.07)` |
| Overflow-Y | `auto` |
| Transition | `transform 300ms ease` (slides in from right) |

### Panel States

| State | Description |
|-------|-------------|
| **Hidden** | Off-screen right (`transform: translateX(320px)`) |
| **Open** | On-screen (`transform: translateX(0)`) |
| **Loading** | Panel visible, AI content loading (spinner/skeletons) |
| **Context: Dashboard** | AI performance digest + suggestion cards |
| **Context: Lead Detail** | Website audit results + email generation |
| **Context: Campaign** | Campaign analysis + A/B suggestions |
| **Context: Any other** | Default AI tools shortcut list |

### Panel Internal Structure

```
┌──────────────────────────────────────────────────┐
│  PANEL HEADER (56px height)                      │
│  [✨ AI Assistant]        [Context Label]  [×]  │
├──────────────────────────────────────────────────┤
│  CONTEXT SWITCHER (optional, if multiple modes)  │
│  [Lead Insights] [Email Gen] [Subject Lines]     │
├──────────────────────────────────────────────────┤
│                                                  │
│  PANEL BODY (scrollable, flex-grow)              │
│                                                  │
│  Context-specific content:                       │
│  ──────────────────────────                      │
│  [MODE: Lead Insights]                           │
│    Website Analysis Card                         │
│    Pain Points Card                              │
│    Suggested talking points                      │
│    [Run Audit] button                            │
│                                                  │
│  [MODE: Email Generation]                        │
│    Template selector                             │
│    [Generate] button                             │
│    Generated email preview                       │
│    [Edit] [Copy] [Regenerate]                    │
│                                                  │
│  [MODE: Dashboard Digest]                        │
│    Top leads to contact                          │
│    Enrichment queue status                       │
│    Campaign recommendation                       │
│                                                  │
└──────────────────────────────────────────────────┘
```

### Panel Header Detail

| Element | Description |
|---------|-------------|
| Panel title | "✨ AI Assistant" — 14px, font-weight 600 |
| Context label | Current mode shown as small badge (e.g., "Lead: John Doe") |
| Close button | `×` IconButton, dismisses panel |
| Header height | `56px` |
| Header border-bottom | `1px solid rgba(255, 255, 255, 0.05)` |

### Context Switcher (when multiple modes apply)

- Horizontal pill tab bar below header
- Max 3 context tabs shown
- Active tab: indigo background pill, white text
- Inactive: ghost style, `text.secondary`
- Tabs: "Insights", "Email", "Follow-up"

### Panel Body Content Rules

- Panel body is scrollable (overflow-y: auto)
- Content sections inside body are separated by `Divider` components
- Each AI output (generated email, audit result) is displayed in an `inline card` with a light inner background
- Action buttons (Copy, Regenerate, Edit) are grouped at the bottom of each output card

### Right Panel Responsive Rules

| Breakpoint | Behavior |
|-----------|---------|
| `< 1024px` | Panel disabled entirely — AI features accessed via dedicated pages (`/ai/*`) |
| `1024px – 1279px` | Panel available but narrows to `280px`; content area compresses |
| `≥ 1280px` | Full `320px` width; content area comfortably accommodates both |
| `≥ 1440px` | Panel stays `320px`; content area benefits from extra viewport width |

---

## 8. Notification Drawer

### Role
A slide-in panel from the right listing all in-app notifications for the current user. Unlike the Right AI Panel, the Notification Drawer overlays the content without pushing it.

### Activation
- Click the 🔔 Notification Bell in the topbar
- The bell icon shows an unread count badge when unread items exist

### Dimensions

| Property | Value |
|----------|-------|
| Width | `380px` |
| Position | `fixed`, `right: 0`, `top: 60px`, `bottom: 0` |
| Z-index | `60` (above AI panel, sidebar, content) |
| Background | `rgba(15, 23, 42, 0.98)` |
| Backdrop filter | `blur(24px)` |
| Left border | `1px solid rgba(255, 255, 255, 0.08)` |
| Transition | `transform 300ms ease` |
| Overlay | Dark semi-transparent backdrop (`rgba(0,0,0,0.40)`) behind drawer |

> **Key difference from Right AI Panel**: The notification drawer uses a backdrop overlay and does **not** push the content area. It layers on top.

### Drawer vs. Right Panel Coexistence

- Notification drawer and Right AI Panel can both exist simultaneously.
- Drawer renders at `z-index: 60`, above the AI panel (`z-index: 30`).
- If both are open simultaneously, the drawer covers the panel partially (the rightmost 320px of the drawer overlaps the AI panel).
- Opening the notification drawer does NOT close the AI panel.

### Drawer Internal Structure

```
┌──────────────────────────────────────────────────────────┐
│  DRAWER HEADER (60px)                                    │
│  [Notifications]                      [Mark All Read]   │
├──────────────────────────────────────────────────────────┤
│  FILTER TABS (optional, 44px)                            │
│  [All] [Unread] [Campaigns] [Tasks]                      │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  DRAWER BODY (scrollable)                                │
│                                                          │
│  ── TODAY ──────────────────────────────────────────    │
│  [Notification Item — unread — accent left bar]         │
│  [Notification Item — unread]                           │
│                                                          │
│  ── EARLIER ────────────────────────────────────────    │
│  [Notification Item — read]                             │
│  [Notification Item — read]                             │
│  [Notification Item — read]                             │
│                                                          │
│  [Load Earlier Notifications]                           │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

### Notification Item Structure

```
[EVENT ICON (36px circle)] [CONTENT BLOCK]                [TIME]
                           [Bold title / headline]        [2m ago]
                           [Description text, 2 lines]
                           [Action link: "View Task →"]
```

| Element | Spec |
|---------|------|
| Event icon circle | `36px × 36px`, `radius.full`, color-coded per event type |
| Title | `14px`, `font-weight: 600`, `text.primary` |
| Description | `13px`, `font-weight: 400`, `text.secondary`, max 2 lines |
| Time | `12px`, `text.tertiary`, right-aligned |
| Action link | `13px`, indigo, hover underline |
| Unread indicator | `3px` left accent bar, `rgba(99,102,241,0.7)`, slight background highlight |
| Dismiss button | `×` icon, appears on row hover, `top-right` |

### Drawer Closing Rules
- Click outside the drawer (on the backdrop overlay)
- Press `Escape`
- Click the notification bell again (toggle)

---

## 9. Global Search

### Role
The search bar in the topbar center zone provides instant entity search across the entire organization. It opens a floating results panel below the search bar (not a full-page takeover).

### Activation
- Click on the search bar in the topbar
- Keyboard shortcut `Ctrl/Cmd+/` focuses the search bar
- Typing `Ctrl/Cmd+K` opens the Command Palette instead (the heavier power-user search)

### Search Panel Dimensions

| Property | Value |
|----------|-------|
| Width | Matches the search bar width (min `360px`, max `560px`) |
| Position | `absolute`, `top: 100%`, aligned with search bar left edge |
| Max height | `480px` (scrollable if more results) |
| Z-index | `70` |
| Background | `rgba(15, 23, 42, 0.98)` + `blur(24px)` |
| Border | `1px solid rgba(255, 255, 255, 0.08)` |
| Border-radius | `radius.lg` (12px) |
| Shadow | Level 2 elevation shadow |
| Top offset | `8px` below the search bar bottom edge |

### Search Panel Internal Layout

```
┌────────────────────────────────────────────────────────┐
│  🔍  "john doe"                               [Esc ×] │
├────────────────────────────────────────────────────────┤
│  LEADS                                                 │
│  [👤] John Doe · john@acme.com          [New] badge   │
│  [👤] John Smith · jsmith@b2b.io        [Active] badge │
├────────────────────────────────────────────────────────┤
│  CAMPAIGNS                                             │
│  [📣] John Doe Outreach 2026                          │
├────────────────────────────────────────────────────────┤
│  TASKS                                                 │
│  [✅] Call John Doe re: proposal          Jul 10      │
├────────────────────────────────────────────────────────┤
│  Show all 7 results for "john doe" →                   │
└────────────────────────────────────────────────────────┘
```

### Search Panel Sections

| Section | Max items shown | Description |
|---------|----------------|-------------|
| Leads | 3 | Name + email + status badge |
| Campaigns | 3 | Campaign name + status badge |
| Sequences | 2 | Sequence name + step count |
| Tasks | 2 | Task title + due date |
| Notes | 2 | Truncated note + lead name |
| "Show all" footer | — | Link to full results page (future) |

### Empty Query State (No typing yet)
Shows "Recent" items — last 5 visited entities:

```
┌────────────────────────────────────────┐
│  🔍  Search leads, campaigns...        │
├────────────────────────────────────────┤
│  RECENT                                │
│  [👤] John Doe · Lead                 │
│  [📣] Summer Outreach · Campaign      │
│  [✅] Call Jane · Task                │
└────────────────────────────────────────┘
```

### No Results State

```
┌────────────────────────────────────────────────────┐
│  🔍  "xyzblorgfoo"                                 │
├────────────────────────────────────────────────────┤
│  No results for "xyzblorgfoo"                      │
│  Try a different search term.                      │
│                                                    │
│  [+ Add Lead named "xyzblorgfoo"]                  │
└────────────────────────────────────────────────────┘
```

### Search Loading State
- After 300ms debounce fires, a `Spinner` (16px) appears inside the search bar (right side)
- Results panel shows "Searching..." while loading
- On result arrival, panel content replaces loading state

### Search Panel Closing Rules
- Press `Escape`
- Click outside the panel and search bar
- Select a result (closes and navigates)

### Mobile Search Behavior
- Search bar collapses to a `🔍` icon button in the topbar
- Tap icon → search bar expands to full width (topbar becomes search mode)
- Cancel button appears on right to collapse back
- Same floating results panel appears below topbar

---

## 10. Command Palette

### Role
The power-user interface for navigating the entire application, triggering quick actions, running AI tools, and searching entities — all without leaving the keyboard.

### Activation
- `Ctrl+K` (Windows/Linux) / `Cmd+K` (Mac) — from anywhere in the app
- Click the `⌘K` icon button in the topbar right zone

### Palette Dimensions

| Property | Value |
|----------|-------|
| Width | `min(640px, 90vw)` |
| Max height | `70vh` (scrollable within) |
| Position | `fixed`, centered: `top: 20vh`, `left: 50%`, `transform: translateX(-50%)` |
| Z-index | `80` |
| Background | `rgba(15, 23, 42, 0.98)` + `blur(32px)` |
| Border | `1px solid rgba(255, 255, 255, 0.10)` |
| Border-radius | `radius.xl` (16px) |
| Shadow | Level 3 elevation shadow |
| Backdrop overlay | `rgba(0, 0, 0, 0.60)`, full viewport, `z-index: 79` |

### Palette Internal Layout

```
┌──────────────────────────────────────────────────────────────────┐
│  [🔍]  Type a command or search...                               │
├──────────────────────────────────────────────────────────────────┤
│  NAVIGATE TO                                                     │
│  ▸  [📊]  Dashboard                              [↵ Enter]      │
│     [👥]  Leads                                                  │
│     [📣]  Campaigns                                              │
│     [🔀]  Sequences                                              │
├──────────────────────────────────────────────────────────────────┤
│  QUICK ACTIONS                                                   │
│  ▸  [+]   Add New Lead                                          │
│     [↑]   Import Leads (CSV)                                    │
│     [📣]  Create Campaign                                        │
│     [✅]  Add Task                                               │
├──────────────────────────────────────────────────────────────────┤
│  AI TOOLS                                                        │
│     [✨]  Run Website Audit                                      │
│     [✨]  Generate Follow-up Email                               │
│     [✨]  Optimize Subject Line                                  │
├──────────────────────────────────────────────────────────────────┤
│  RECENT                                                          │
│     [👤]  John Doe · Lead                                       │
│     [📣]  Summer Outreach · Campaign                            │
└──────────────────────────────────────────────────────────────────┘
│  [↑↓] Navigate   [↵] Open   [Esc] Close         ⌘K             │
└──────────────────────────────────────────────────────────────────┘
```

### Input Bar

| Property | Value |
|----------|-------|
| Height | `56px` |
| Padding | `0 1rem` |
| Font size | `16px` |
| Background | Transparent (palette background shows through) |
| Border-bottom | `1px solid rgba(255, 255, 255, 0.06)` |
| Placeholder | "Type a command or search..." |
| Auto-focus | Yes — immediately on open |
| Left icon | `🔍` Search icon, `20px`, `text.tertiary` |

### Item Anatomy

```
[Active indicator (3px left bar, only on focused item)]
[Category icon (20px)] [Item Label] [Keyboard shortcut hint (right-aligned)]
```

- Item height: `44px`
- Font: `14px`, `font-weight: 500`
- Active item: `background.hover`, left accent bar, text brightens
- Keyboard shortcut hint: `text.tertiary`, `12px`, right-aligned

### Keyboard Shortcut Footer
Persistent bar at the very bottom of the palette:
```
[↑↓] Navigate   [↵] Open   [Esc] Close   — displayed as small greyed out hints
```

### Filtering Behavior

As the user types:
1. All category sections filter in real-time (debounce: 150ms)
2. Categories with no matching items are hidden entirely (not shown as empty)
3. A "Search Results" section appears at top if query matches entity data (from API)
4. Items are ranked: exact-start matches > contains matches > fuzzy matches

### Command Palette Closing Rules
- Press `Escape`
- Click the backdrop overlay
- Select an item (executes action, then closes)

### Mobile Behavior
- Same `⌘K` shortcut (virtual keyboard shortcut button shown)
- Full-screen overlay on mobile (100vw × 100vh)
- Same internal structure but items are larger (48px height for touch)
- Keyboard input auto-shows virtual keyboard

---

## 11. Mobile Navigation

### Breakpoint
Active at `< 768px`.

### Structure: Bottom Navigation Bar

The sidebar is completely hidden and replaced by a fixed bottom navigation bar.

```
VIEWPORT
├── TOPBAR (fixed top, 60px)
│   └── [Logo] ─────── [Search Icon] ─── [🔔] [👤]
│
├── CONTENT AREA (top: 60px, bottom: 56px)
│   └── Page content (scrollable)
│
└── BOTTOM NAV BAR (fixed bottom, 56px)
    ┌──────────────────────────────────────────────────────┐
    │  [📊 Dashboard] [👥 Leads] [📣 Campaigns] [◧ CRM] [··· More] │
    └──────────────────────────────────────────────────────┘
```

### Bottom Nav Bar Dimensions

| Property | Value |
|----------|-------|
| Height | `56px` |
| Width | `100vw` |
| Position | `fixed`, `bottom: 0`, `left: 0`, `right: 0` |
| Z-index | `50` |
| Background | `rgba(11, 14, 20, 0.95)` |
| Backdrop filter | `blur(12px)` |
| Top border | `1px solid rgba(255, 255, 255, 0.06)` |

### Bottom Nav Items (max 5)

| Position | Label | Icon | Destination |
|----------|-------|------|-------------|
| 1 | Dashboard | `BarChart2` | `/dashboard` |
| 2 | Leads | `Users` | `/leads` |
| 3 | Campaigns | `Megaphone` | `/campaigns` |
| 4 | CRM | `Kanban` | `/crm/pipeline` |
| 5 | More | `Grid` | Opens a "More" drawer |

### "More" Drawer (Mobile)
When the user taps "More":
- A bottom sheet drawer slides up from the bottom
- Contains all remaining navigation items not in the bottom bar:
  - Sequences
  - AI Tools
  - Segments
  - Settings (role-gated)
  - Help & Docs
  - Sign Out

```
┌──────────────────────────────────────────┐
│  ─ ─ ─ (drag handle)                    │
├──────────────────────────────────────────┤
│  [🔀] Sequences                         │
│  [✨] AI Tools                          │
│  [🔦] Segments                          │
│  [⚙] Settings                          │
│  [❓] Help & Docs             ↗         │
│  [🚪] Sign Out                          │
└──────────────────────────────────────────┘
```

More drawer dimensions:
- Height: Auto (content height, max 70vh)
- Position: Fixed bottom, full width
- Handle: 4px × 36px pill at top center, `rgba(255,255,255,0.2)`
- Backdrop: Dark overlay behind drawer

### Mobile Content Area Adjustments

- `padding-top: 60px` (topbar offset)
- `padding-bottom: 56px` (bottom nav offset — prevents content hiding behind bar)
- `padding-left: 1rem`, `padding-right: 1rem`
- No sidebar margin

### Mobile-Specific Layout Behaviors

| Component | Mobile Behavior |
|-----------|----------------|
| Modals | Full-screen (100vw × 100vh) |
| Drawers (Notification, AI) | Full-screen bottom sheet |
| Dropdowns (User Menu, Org Switcher) | Full-screen bottom sheet |
| Search | Topbar enters "search mode" — input expands full width |
| Command Palette | Full-screen modal |
| Right AI Panel | Disabled — use `/ai/*` pages instead |
| Form rows (2-col) | Stack to 1-col |
| Data tables | Horizontal scroll, 3 columns max visible |
| Kanban Board | Vertical accordion (no horizontal scroll) |
| Charts | Simplified or hidden (redirected to dedicated analytics page) |

---

## 12. Tablet Layout

### Breakpoint
Active at `768px – 1023px`.

### Key Changes vs. Desktop

| Element | Desktop | Tablet |
|---------|---------|--------|
| Sidebar | 240px expanded | 64px collapsed (icon-only) by default |
| Sidebar expand | Click toggle | Tap toggle — sidebar overlays content (not push) |
| Content area margin-left | 240px | 64px |
| Right AI Panel | Available | Disabled — accessed via `/ai/*` pages |
| Metric cards | 4-column row | 2 × 2 grid |
| Chart + Quick Actions row | `2fr 1fr` side by side | Stacked (chart full width, quick actions full width) |
| Lead Summary + Campaign row | `1fr 1fr` side by side | Stacked |
| Activities + AI Insights row | `2fr 1fr` side by side | Stacked |
| Bottom nav | No | No (sidebar exists at 64px) |

### Tablet Sidebar: Overlay Mode

On tablet, when the user taps the expand toggle:
- The sidebar expands from 64px to 240px
- **It overlays the content** (does not push) — a backdrop appears behind it
- Tapping the backdrop or anywhere outside collapses it again

```
TABLET SIDEBAR EXPANDED:
┌──────────────────────────────────────────────────────────────┐
│  TOPBAR                                                      │
├──────┬───────────────────────────────────────────────────────┤
│      │ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ ← Semi-transparent    │
│ SIDE │ ░ backdrop behind sidebar     ░    overlay            │
│ BAR  │ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░                       │
│ 240px│                                                       │
│ (ov- │   CONTENT AREA (unchanged, but dimmed behind overlay) │
│ er-  │                                                       │
│ lay) │                                                       │
└──────┴───────────────────────────────────────────────────────┘
```

### Tablet Content Area

| Property | Value |
|----------|-------|
| Margin-left | `64px` (collapsed sidebar, always) |
| Margin-right | `0` (no right AI panel) |
| Padding-top | `60px` |
| Horizontal padding | `1.5rem` |

### Tablet Grid Adaptation

Row 1 (Metric Cards):
```
Desktop: [Card] [Card] [Card] [Card]  ← 4 columns
Tablet:  [Card] [Card]                ← 2 columns
         [Card] [Card]                ← 2 rows
```

Row 2 (Chart + Quick Actions):
```
Desktop: [Chart (2/3)] [Quick Actions (1/3)]
Tablet:  [Chart (full width)]
         [Quick Actions (full width, buttons in 2-col grid)]
```

Row 3 (Lead Summary + Campaign Summary):
```
Desktop: [Lead Summary (1/2)] [Campaign Summary (1/2)]
Tablet:  [Lead Summary (full)]
         [Campaign Summary (full)]
```

Row 4 (Activities + AI Insights):
```
Desktop: [Activities (2/3)] [AI Insights (1/3)]
Tablet:  [Activities (full)]
         [AI Insights (full, simplified)]
```

### Tablet Typography Scale

| Element | Desktop Size | Tablet Size |
|---------|-------------|------------|
| Page title (h1) | `2.5rem` | `2rem` |
| Metric card value | `2.5rem` | `2rem` |
| Section heading (h2) | `2rem` | `1.75rem` |
| Body text | `1rem` | `1rem` |

---

## 13. Desktop Layout

### Breakpoint
Active at `≥ 1024px`.

### Standard Desktop (1024px – 1279px)

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                     TOPBAR — 60px — full width                               │
├──────────────┬────────────────────────────────────────────────────────────────┤
│              │                                                                │
│  SIDEBAR     │                  CONTENT AREA                                 │
│  240px       │                  margin-left: 240px                           │
│  expanded    │                  No right panel                               │
│              │                  Full 4-column widget grid                    │
│              │                                                                │
└──────────────┴────────────────────────────────────────────────────────────────┘
```

- Right AI Panel: available but closed by default
- Content max-width: 1200px centered
- All 4 rows of dashboard widgets visible in correct column ratios

### Wide Desktop (1280px – 1439px)

```
┌──────────────────────────────────────────────────────────────────────────────────────┐
│                        TOPBAR — full width                                           │
├──────────────┬────────────────────────────────────────────────────┬──────────────────┤
│              │                                                    │                  │
│  SIDEBAR     │              CONTENT AREA                         │  AI PANEL        │
│  240px       │              margin-left: 240px                   │  320px           │
│              │              margin-right: 320px (if open)        │  (when open)     │
│              │              Slightly compressed canvas           │                  │
│              │                                                    │                  │
└──────────────┴────────────────────────────────────────────────────┴──────────────────┘
```

- AI Panel available; if open, content compresses
- At this width, content still displays all columns comfortably (1280 - 240 - 320 = 720px usable)

### Ultra-Wide Desktop (≥ 1440px)

```
All three zones fully comfortable:
  Sidebar: 240px
  AI Panel (open): 320px
  Content canvas: max 1200px centered in remaining space (1440 - 240 - 320 = 880px available)
```

At 1920px (ultrawide):
- Sidebar: 240px
- AI Panel: 320px
- Content area: 1360px usable, canvas capped at 1200px, auto-margins on sides

### Content Canvas Centering on Wide Screens

```
         [240px sidebar] [auto left margin] [1200px canvas] [auto right margin] [320px AI panel]
```

The canvas never exceeds 1200px regardless of viewport width. Extra space becomes margin.

### Desktop Layout Rules

1. **Sidebar always pushes content** — never overlays (overlay behavior is tablet-only).
2. **AI Panel always pushes content** — content area margin-right increases when panel opens.
3. **No bottom navigation bar** — desktop-only navigation is entirely in the sidebar.
4. **All rows and columns visible** — no widgets are hidden or collapsed.
5. **Search bar is always visible** in the topbar center zone — not icon-only.

---

## 14. Layout Zones Summary Table

| Zone | Desktop Width | Tablet Width | Mobile Width | Position | Z-index | Pushes Content? |
|------|-------------|-------------|-------------|----------|---------|----------------|
| **Topbar** | 100vw | 100vw | 100vw | fixed top | 50 | No (content has padding-top) |
| **Sidebar** | 240px / 64px | 64px (overlay when expanded) | Hidden | fixed left | 40 | Yes (margin-left) |
| **Content Area** | Remaining | Remaining | Full width | relative | 10 | — (is the content) |
| **Right AI Panel** | 320px / hidden | Hidden | Hidden | fixed right | 30 | Yes (margin-right) |
| **Notification Drawer** | 380px | 380px | Full width | fixed right | 60 | No (overlays) |
| **Search Results Panel** | 360–560px | 360px | Full width search mode | absolute (topbar) | 70 | No (floating) |
| **Command Palette** | 640px centered | 90vw | 100vw | fixed centered | 80 | No (modal overlay) |
| **Modals** | Variable | Variable | Full screen | fixed centered | 80 | No (modal overlay) |
| **Toasts** | 320px | 320px | Full width | fixed bottom-right | 90 | No (floating) |
| **Bottom Nav Bar** | Hidden | Hidden | 100vw × 56px | fixed bottom | 50 | No (content has padding-bottom) |

---

## 15. Z-Index Stack

```
Layer 0    z-index: 0      Background canvas, glow blobs
Layer 1    z-index: 10     Content area, page content
Layer 2    z-index: 30     Right AI Assistant Panel
Layer 3    z-index: 40     Sidebar
Layer 4    z-index: 50     Topbar, Bottom Navigation Bar
Layer 5    z-index: 60     Notification Drawer
Layer 6    z-index: 70     Search Results Panel, Command Palette Backdrop
Layer 7    z-index: 80     Command Palette, Modals, Modal Backdrops
Layer 8    z-index: 90     Toast Notifications (always topmost)
```

### Z-Index Rules

1. **Never use arbitrary z-index values** outside this defined stack.
2. **Backdrops** are always 1 less than their panel: Modal at `z-80`, backdrop at `z-79`.
3. **Toasts at z-90** — nothing ever renders above them (they are always visible).
4. **Nested z-index contexts**: Components inside a transformed or fixed container create their own stacking context. Avoid transforms on containers that need to z-index above fixed panels.

---

## 16. Transition & Animation Rules

### Layout Transition Catalogue

| Transition | Element | Duration | Easing |
|-----------|---------|---------|--------|
| Sidebar expand/collapse | Sidebar width, Content margin-left | `250ms` | `ease` |
| AI Panel open/close | Panel transform translateX, Content margin-right | `300ms` | `ease` |
| Notification Drawer open/close | Drawer transform translateX | `300ms` | `ease` |
| Notification Drawer backdrop | Opacity 0 → 0.40 | `300ms` | `ease` |
| Command Palette open | Opacity + scale 0.95 → 1 | `200ms` | `ease` |
| Command Palette close | Opacity + scale 1 → 0.95 | `150ms` | `ease` |
| Search panel appear | Opacity + translateY(-4px) → 0 | `200ms` | `ease` |
| Bottom sheet / More drawer | translateY(100%) → 0 | `300ms` | `ease` |
| Modal open | Opacity + scale 0.95 → 1 | `200ms` | `ease` |
| Modal close | Opacity + scale 1 → 0.95 | `150ms` | `ease` |
| Toast enter | translateX(100%) → 0 | `300ms` | `cubic-bezier(0.16, 1, 0.3, 1)` |
| Toast exit | translateX(0) → 100% | `250ms` | `ease` |
| Page navigation | Opacity 0 → 1 of new page content | `200ms` | `ease` |
| Row hover (tables/lists) | background-color change | `150ms` | `ease` |
| Card hover lift | transform + box-shadow | `300ms` | `ease` |

### Reduced Motion Fallbacks

When `prefers-reduced-motion: reduce` is active:
- All `transform` transitions → instant (0ms)
- All `opacity` transitions → `100ms` (very quick, no motion)
- Sidebar expand → instant width change (no sliding)
- Panel open → instant opacity change (no transform)
- Skeleton shimmer → static low-opacity block (no animation)
- Page transition → instant opacity (no fade)

---

## 17. Layout State Management

### What Is Stored Where

| State | Storage | Key | Default |
|-------|---------|-----|---------|
| Sidebar expanded/collapsed | `localStorage` | `sidebar_expanded` | `"true"` |
| AI Panel open/closed | `localStorage` | `ai_panel_open` | `"false"` |
| Theme (dark/light) | `localStorage` | `theme_preference` | `"dark"` |
| Notification last-read timestamp | `localStorage` | `notifications_last_read` | `null` |
| Command palette recent items | `localStorage` | `palette_recents` | `[]` (max 5) |
| Search bar query | React state only | — | `""` (not persisted) |
| Current page context (for AI panel) | React context | — | Derived from route |

### Layout Context

A global `LayoutContext` (React context) provides and controls:

```
{
  sidebarExpanded: boolean,
  setSidebarExpanded: (v: boolean) => void,

  aiPanelOpen: boolean,
  setAiPanelOpen: (v: boolean) => void,

  aiPanelMode: 'insights' | 'email' | 'followup' | 'default',
  setAiPanelMode: (mode: string) => void,

  notificationDrawerOpen: boolean,
  setNotificationDrawerOpen: (v: boolean) => void,

  commandPaletteOpen: boolean,
  setCommandPaletteOpen: (v: boolean) => void,

  searchQuery: string,
  setSearchQuery: (q: string) => void,

  theme: 'dark' | 'light',
  setTheme: (t: string) => void,
}
```

### Layout Context Consumer Rules

1. **Page components never manage their own panel open/close state** — they call the layout context.
2. **The AppShell reads layout context** to apply margin offsets (margin-left, margin-right).
3. **Only one modal-type overlay can be open at a time** (command palette, modals). Opening one closes others.
4. **Notification drawer can coexist** with the AI panel but not with modals or command palette.

### Mutual Exclusion Rules

| If this opens... | ...this closes automatically |
|-----------------|------------------------------|
| Command Palette | Notification Drawer, Search Panel |
| Any Modal | Notification Drawer, Search Panel |
| Notification Drawer | Search Panel |
| Search Panel (with results) | Nothing forced — user can interact with both |
| AI Panel | Nothing (coexists with all) |

---

*This document defines the spatial and structural architecture of the entire application. Every new panel, overlay, or navigation element introduced in future sprints must have a defined position within this document before it is built.*

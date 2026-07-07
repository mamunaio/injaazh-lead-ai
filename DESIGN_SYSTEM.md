# DESIGN_SYSTEM.md — Injaazh Lead AI: Design System

> **Design Tokens, Component Standards & Visual Language**  
> Version: 1.0 | Last Updated: July 2026  
> Companion documents: [PRODUCT.md](./PRODUCT.md) | [IA.md](./IA.md) | [DASHBOARD.md](./DASHBOARD.md)  
> Status: Living Document — All UI work must reference this before implementation.

---

## Table of Contents

1. [Philosophy](#1-philosophy)
2. [Colors](#2-colors)
3. [Typography](#3-typography)
4. [Spacing](#4-spacing)
5. [Border Radius](#5-border-radius)
6. [Elevation & Shadows](#6-elevation--shadows)
7. [Buttons](#7-buttons)
8. [Forms & Inputs](#8-forms--inputs)
9. [Tables](#9-tables)
10. [Cards](#10-cards)
11. [Charts](#11-charts)
12. [Icons](#12-icons)
13. [Dark Mode](#13-dark-mode)
14. [Light Mode](#14-light-mode)
15. [Accessibility](#15-accessibility)
16. [Responsive Rules](#16-responsive-rules)

---

## 1. Philosophy

### Core Principles

**Premium over Plain**  
Every element earns its place. Avoid generic defaults. Colors are curated, not arbitrary. Typography has intention. Spacing is deliberate.

**Dark-First**  
The application is designed in Dark Mode as its default and primary state. Light Mode is a secondary, optional mode. Dark Mode is not an afterthought — it is the brand.

**Hierarchy through Light**  
In a dark interface, light creates emphasis. The brightest elements demand the most attention. Gradient text signals critical data. Muted text signals secondary information.

**Glass, not Flat**  
Primary surfaces use glassmorphism: translucent backgrounds with backdrop blur. This creates depth without heavy shadows and makes the UI feel alive and dimensional.

**Motion as Meaning**  
Animations communicate state changes, not decoration. A lift on hover signals interactivity. A shimmer signals loading. A slide signals navigation.

---

## 2. Colors

### 2.1 Color Naming Convention

Colors are named by **role**, not hue. This enables switching between Dark and Light modes without changing semantic names.

```
background.canvas       ← The page background
background.surface      ← Widget / card background
background.elevated     ← Modals, dropdowns (one layer above surface)
background.overlay      ← Dimming overlays behind modals

border.default          ← Standard borders
border.subtle           ← Dividers, separator lines
border.focus            ← Input focus rings
border.interactive      ← Hover states

text.primary            ← Main readable text
text.secondary          ← Labels, metadata, helper text
text.tertiary           ← Placeholder text, disabled text
text.inverse            ← Text on colored backgrounds (e.g., badge labels)

accent.primary          ← Main brand action color (indigo)
accent.secondary        ← Secondary brand color (purple)
accent.gradient.start   ← Gradient left/top color
accent.gradient.end     ← Gradient right/bottom color

semantic.success        ← Positive states, new leads, active status
semantic.warning        ← Caution states, paused, amber alerts
semantic.danger         ← Errors, failed, lost, destructive actions
semantic.info           ← Informational states, tips, neutral alerts

data.blue               ← Lead volume, primary metrics
data.purple             ← Email metrics
data.green              ← Performance positive (open rate, high score)
data.orange             ← Reply rate, secondary performance
data.red                ← Errors, low score, lost
data.amber              ← Warnings, medium score, paused
```

---

### 2.2 Dark Mode Color Values

#### Canvas & Surfaces

| Token | Hex | Usage |
|-------|-----|-------|
| `background.canvas` | `#0B0E14` | Page background |
| `background.surface` | `rgba(30, 41, 59, 0.40)` | Widget cards, panels |
| `background.elevated` | `rgba(15, 23, 42, 0.90)` | Modals, dropdowns |
| `background.overlay` | `rgba(0, 0, 0, 0.60)` | Modal backdrop dimmer |
| `background.input` | `rgba(15, 23, 42, 0.60)` | Form inputs |
| `background.hover` | `rgba(255, 255, 255, 0.03)` | Row hover, item hover |
| `background.active` | `rgba(99, 102, 241, 0.08)` | Active nav item |

#### Borders

| Token | Hex | Usage |
|-------|-----|-------|
| `border.default` | `rgba(255, 255, 255, 0.05)` | Cards, panels |
| `border.subtle` | `rgba(255, 255, 255, 0.04)` | Dividers within panels |
| `border.interactive` | `rgba(255, 255, 255, 0.10)` | Input default border |
| `border.focus` | `#6366f1` | Input focus ring color |
| `border.danger` | `rgba(239, 68, 68, 0.20)` | Error input border |
| `border.accent` | `rgba(99, 102, 241, 0.30)` | Hover card border |

#### Text

| Token | Hex | Usage |
|-------|-----|-------|
| `text.primary` | `#F1F5F9` | Main body text, headings |
| `text.secondary` | `#94A3B8` | Labels, metadata, captions |
| `text.tertiary` | `#475569` | Placeholder text, disabled |
| `text.inverse` | `#0B0E14` | Text on light-colored badges |
| `text.link` | `#818CF8` | Hyperlinks |
| `text.danger` | `#F87171` | Error messages |

#### Brand / Accent

| Token | Hex | Usage |
|-------|-----|-------|
| `accent.primary` | `#6366F1` | Primary buttons, active states, focus ring |
| `accent.secondary` | `#A855F7` | Secondary accent, gradient end |
| `accent.gradient.start` | `#6366F1` | Gradient beginning (indigo) |
| `accent.gradient.end` | `#A855F7` | Gradient ending (purple) |
| `accent.glow.indigo` | `rgba(99, 102, 241, 0.15)` | Background glow blobs |
| `accent.glow.purple` | `rgba(168, 85, 247, 0.15)` | Background glow blobs |

#### Semantic Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `semantic.success` | `#10B981` | Success states, active |
| `semantic.success.bg` | `rgba(52, 211, 153, 0.10)` | Success badge background |
| `semantic.success.border` | `rgba(52, 211, 153, 0.20)` | Success badge border |
| `semantic.warning` | `#F59E0B` | Warning states, paused |
| `semantic.warning.bg` | `rgba(251, 191, 36, 0.10)` | Warning badge background |
| `semantic.warning.border` | `rgba(251, 191, 36, 0.20)` | Warning badge border |
| `semantic.danger` | `#EF4444` | Error states, failed |
| `semantic.danger.bg` | `rgba(239, 68, 68, 0.10)` | Error badge/alert background |
| `semantic.danger.border` | `rgba(239, 68, 68, 0.20)` | Error badge border |
| `semantic.info` | `#60A5FA` | Info states, completed |
| `semantic.info.bg` | `rgba(96, 165, 250, 0.10)` | Info badge background |
| `semantic.info.border` | `rgba(96, 165, 250, 0.20)` | Info badge border |

#### Data Visualization Colors

| Token | Hex | Used For |
|-------|-----|---------|
| `data.blue` | `#3B82F6` | Total leads, primary metric |
| `data.blue.light` | `#60A5FA` | Gradient start for blue data |
| `data.purple` | `#9333EA` | Email volume |
| `data.purple.light` | `#C084FC` | Gradient start for purple data |
| `data.green` | `#10B981` | Positive performance (opens, high score) |
| `data.green.light` | `#34D399` | Gradient start for green data |
| `data.orange` | `#F97316` | Reply rate, secondary performance |
| `data.orange.light` | `#FB923C` | Gradient start for orange data |
| `data.red` | `#EF4444` | Errors, low score, negative |
| `data.red.light` | `#F87171` | Gradient start for red |
| `data.amber` | `#F59E0B` | Medium score, warnings |
| `data.amber.light` | `#FCD34D` | Gradient start for amber |

---

### 2.3 Gradients

| Token | Definition | Used For |
|-------|-----------|---------|
| `gradient.brand` | `135deg, #6366F1 → #A855F7` | Buttons, active indicators, hero text |
| `gradient.blue` | `135deg, #60A5FA → #3B82F6` | Total Leads metric value |
| `gradient.purple` | `135deg, #C084FC → #9333EA` | Emails Sent metric value |
| `gradient.green` | `135deg, #34D399 → #10B981` | Open Rate metric value, high score |
| `gradient.orange` | `135deg, #FB923C → #F97316` | Reply Rate metric value |
| `gradient.red` | `135deg, #F87171 → #EF4444` | Low score, danger states |
| `gradient.amber` | `135deg, #FCD34D → #F59E0B` | Medium score, warning states |
| `gradient.surface` | `180deg, rgba(30,41,59,0.5) → rgba(15,23,42,0.4)` | Card backgrounds (subtle depth) |
| `gradient.highlight` | `90deg, transparent → rgba(255,255,255,0.1) → transparent` | Card top-edge highlight line |

---

### 2.4 Status Color Map

| Status | Text Color | Background | Border | Label |
|--------|-----------|-----------|--------|-------|
| New | `#34D399` | `rgba(52,211,153,0.1)` | `rgba(52,211,153,0.2)` | Green |
| Contacted | `#60A5FA` | `rgba(96,165,250,0.1)` | `rgba(96,165,250,0.2)` | Blue |
| Qualified | `#FBBF24` | `rgba(251,191,36,0.1)` | `rgba(251,191,36,0.2)` | Amber |
| Lost | `#F87171` | `rgba(248,113,113,0.1)` | `rgba(248,113,113,0.2)` | Red |
| Won | `#A78BFA` | `rgba(167,139,250,0.1)` | `rgba(167,139,250,0.2)` | Violet |
| Active | `#34D399` | `rgba(52,211,153,0.1)` | `rgba(52,211,153,0.2)` | Green |
| Paused | `#FBBF24` | `rgba(251,191,36,0.1)` | `rgba(251,191,36,0.2)` | Amber |
| Draft | `#94A3B8` | `rgba(148,163,184,0.1)` | `rgba(148,163,184,0.2)` | Slate |
| Completed | `#60A5FA` | `rgba(96,165,250,0.1)` | `rgba(96,165,250,0.2)` | Blue |
| Stopped | `#F87171` | `rgba(248,113,113,0.1)` | `rgba(248,113,113,0.2)` | Red |
| Failed | `#F87171` | `rgba(248,113,113,0.1)` | `rgba(248,113,113,0.2)` | Red |
| Processing | `#A78BFA` | `rgba(167,139,250,0.1)` | `rgba(167,139,250,0.2)` | Violet |

---

## 3. Typography

### 3.1 Font Family

| Role | Font | Fallback | Google Fonts Import |
|------|------|----------|-------------------|
| **Primary (UI)** | Inter | system-ui, -apple-system, sans-serif | `Inter:wght@300;400;500;600;700;800` |
| **Monospace (code, IDs)** | JetBrains Mono | ui-monospace, Consolas, monospace | `JetBrains+Mono:wght@400;500` |

**Inter** is used for all body text, labels, headings, and UI elements.  
**JetBrains Mono** is used for: API keys, token values, code snippets, IDs.

---

### 3.2 Type Scale

| Token | Size | Line Height | Weight | Usage |
|-------|------|------------|--------|-------|
| `text.display` | `3rem (48px)` | `1.1` | `800` | Hero numbers, 404 pages |
| `text.h1` | `2.5rem (40px)` | `1.2` | `700` | Page titles |
| `text.h2` | `2rem (32px)` | `1.25` | `700` | Section headings |
| `text.h3` | `1.5rem (24px)` | `1.3` | `600` | Widget titles, sub-headings |
| `text.h4` | `1.25rem (20px)` | `1.4` | `600` | Card headings |
| `text.h5` | `1.125rem (18px)` | `1.4` | `600` | Sub-card headings |
| `text.body.lg` | `1.125rem (18px)` | `1.6` | `400` | Large body text, descriptions |
| `text.body` | `1rem (16px)` | `1.6` | `400` | Default body text |
| `text.body.sm` | `0.9375rem (15px)` | `1.6` | `400` | Compact body text |
| `text.sm` | `0.875rem (14px)` | `1.5` | `400/500` | Labels, metadata |
| `text.xs` | `0.75rem (12px)` | `1.5` | `500/600` | Captions, badges, timestamps |
| `text.mono` | `0.875rem (14px)` | `1.5` | `400` | Code, IDs, API keys |

---

### 3.3 Font Weight Usage

| Weight | Value | Usage |
|--------|-------|-------|
| Light | `300` | Rarely used — only for large decorative numbers |
| Regular | `400` | Body text, descriptions, input values |
| Medium | `500` | Labels, helper text, secondary navigation |
| Semibold | `600` | Widget titles, table headers, form labels, button text |
| Bold | `700` | Page titles, metric values, name fields in tables |
| Extrabold | `800` | Display numbers, hero metric values |

---

### 3.4 Letter Spacing

| Usage | Value |
|-------|-------|
| Uppercase labels (widget titles, table headers) | `0.05em` |
| Normal body text | `0` (default) |
| Display numbers | `-0.02em` (slight tightening) |
| Badges/status text | `0.04em` |

---

### 3.5 Gradient Text

Used for key metric values and page titles. Applied via CSS `background-clip: text` technique.

| Context | Gradient | Weight |
|---------|---------|--------|
| Page title ("Analytics Overview") | `gradient.brand` | `700` |
| Metric card values | Semantic gradient per metric | `700` |
| Score badges (text inside) | Inverse (dark) text on gradient badge | `700` |

---

## 4. Spacing

### 4.1 Base Unit

The spacing system is based on a **4px base unit** (`0.25rem`).

### 4.2 Spacing Scale

| Token | px | rem | Usage |
|-------|-----|-----|-------|
| `space.0` | 0 | 0 | No spacing |
| `space.0.5` | 2px | 0.125rem | Micro — icon gap, inline tight |
| `space.1` | 4px | 0.25rem | Tight internal spacing |
| `space.1.5` | 6px | 0.375rem | Small gap between inline items |
| `space.2` | 8px | 0.5rem | Icon to label gap, tag internal padding |
| `space.2.5` | 10px | 0.625rem | — |
| `space.3` | 12px | 0.75rem | Badge padding (vertical) |
| `space.4` | 16px | 1rem | Mobile edge padding, input padding |
| `space.5` | 20px | 1.25rem | Button padding (vertical) |
| `space.6` | 24px | 1.5rem | Widget row gap, section spacing |
| `space.7` | 28px | 1.75rem | — |
| `space.8` | 32px | 2rem | Widget header height, section padding |
| `space.10` | 40px | 2.5rem | — |
| `space.12` | 48px | 3rem | Large section gaps |
| `space.16` | 64px | 4rem | Empty state icon spacing |
| `space.20` | 80px | 5rem | — |
| `space.24` | 96px | 6rem | Large hero spacing |

### 4.3 Semantic Spacing Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `spacing.widget.padding` | `space.6 (1.5rem)` | Internal padding of all widget cards |
| `spacing.widget.header` | `space.5 space.6 (1.25rem 1.5rem)` | Widget header padding |
| `spacing.widget.gap` | `space.6 (1.5rem)` | Gap between widgets in the canvas grid |
| `spacing.page.horizontal` | `5% (desktop), space.4 (mobile)` | Page left/right padding |
| `spacing.page.top` | `space.8 (2rem)` | Canvas top padding (below header) |
| `spacing.row.gap` | `space.6 (1.5rem)` | Vertical gap between widget rows |
| `spacing.col.gap` | `space.6 (1.5rem)` | Horizontal gap between widget columns |
| `spacing.input.vertical` | `space.3 space.4 (0.875rem 1rem)` | Input field padding |
| `spacing.button.sm` | `space.2 space.3 (0.5rem 0.75rem)` | Small button padding |
| `spacing.button.md` | `space.3 space.5 (0.75rem 1.25rem)` | Default button padding |
| `spacing.button.lg` | `space.4 space.6 (1rem 1.5rem)` | Large button padding |
| `spacing.table.cell` | `space.5 space.6 (1.25rem 1.5rem)` | Table cell padding |
| `spacing.badge.horizontal` | `space.3 (0.75rem)` | Badge horizontal padding |
| `spacing.badge.vertical` | `space.1 (0.25rem)` | Badge vertical padding |
| `spacing.section.title.gap` | `space.6 (1.5rem)` | Section title to content gap |

---

## 5. Border Radius

### 5.1 Radius Scale

| Token | Value | Usage |
|-------|-------|-------|
| `radius.none` | `0` | Flush edges (table rows, dividers) |
| `radius.xs` | `4px` | Skeleton loaders, small chips |
| `radius.sm` | `6px` | Small buttons, tooltip boxes |
| `radius.md` | `8px` | Inputs, action buttons, dropdowns, tags |
| `radius.lg` | `12px` | Cards within widgets |
| `radius.xl` | `16px` | **Main widget cards, panels** — primary radius |
| `radius.2xl` | `20px` | Modals, drawers |
| `radius.3xl` | `24px` | Large promotional cards (future) |
| `radius.full` | `9999px` | Pills, badges, score circles, toggles |

### 5.2 Component Radius Assignments

| Component | Radius Token |
|-----------|-------------|
| Widget card | `radius.xl` (16px) |
| Modal | `radius.2xl` (20px) |
| Dropdown panel | `radius.lg` (12px) |
| Button (default) | `radius.md` (8px) |
| Input field | `radius.md` (8px) |
| Toast notification | `radius.lg` (12px) |
| Status badge | `radius.full` (9999px) |
| Score badge | `radius.full` (9999px) |
| Tag/pill | `radius.full` (9999px) |
| Avatar | `radius.full` (9999px) |
| Progress bar | `radius.full` (9999px) |
| Sidebar nav item | `radius.md` (8px) |
| Table rows | `radius.none` (0) |
| Chart tooltip | `radius.lg` (12px) |
| Skeleton blocks | `radius.xs` (4px) |

---

## 6. Elevation & Shadows

### 6.1 Design Principle
In a dark glassmorphism interface, elevation is communicated through **transparency + blur + border brightness** rather than traditional drop shadows. Heavier blur and lighter border = higher elevation.

### 6.2 Elevation Levels

| Level | Name | Background | Backdrop Blur | Border | Shadow |
|-------|------|-----------|--------------|--------|--------|
| 0 | Canvas | `#0B0E14` | None | None | None |
| 1 | Surface | `rgba(30,41,59,0.40)` | `blur(12px)` | `rgba(255,255,255,0.05)` | None |
| 2 | Elevated | `rgba(15,23,42,0.90)` | `blur(20px)` | `rgba(255,255,255,0.08)` | `0 8px 32px rgba(0,0,0,0.30)` |
| 3 | Modal | `rgba(15,23,42,0.95)` | `blur(32px)` | `rgba(255,255,255,0.10)` | `0 20px 60px rgba(0,0,0,0.50)` |
| 4 | Overlay | `rgba(0,0,0,0.60)` | None | None | None |

### 6.3 Hover Shadow (Interactive Cards)

When hovering over a clickable card:
- Box shadow added: `0 10px 30px -10px rgba(99, 102, 241, 0.15)` (indigo glow)
- Border changes to: `rgba(99, 102, 241, 0.30)`
- Transform: `translateY(-5px)`

### 6.4 Focus Shadow (Interactive Elements)

When an input or button receives keyboard focus:
- Box shadow: `0 0 0 2px rgba(99, 102, 241, 0.40)` (inset-style focus ring)
- Border color changes to `accent.primary` (#6366F1)

### 6.5 Background Glow Blobs (Page-level decoration)

Two radial gradient blobs are positioned on the canvas:

| Blob | Position | Size | Color |
|------|----------|------|-------|
| Blob 1 (Indigo) | Top-left: `-10% top, -5% left` | `500px × 500px` | `radial-gradient(circle, rgba(99,102,241,0.15), transparent 70%)` |
| Blob 2 (Purple) | Bottom-right: `-20% bottom, -10% right` | `600px × 600px` | `radial-gradient(circle, rgba(168,85,247,0.15), transparent 70%)` |

- Blobs are `pointer-events: none`, `z-index: 0`, `position: absolute`.
- Content sits at `z-index: 1` above blobs.
- Blobs are hidden on mobile (`< 768px`) for performance.

---

## 7. Buttons

### 7.1 Button Hierarchy

| Variant | Priority | Usage |
|---------|----------|-------|
| **Primary** | #1 — Most important action | "Save Lead", "Launch Campaign", "Create Account" |
| **Secondary** | #2 — Supportive action | "Cancel", "Dashboard", "View All" |
| **Danger** | Destructive action | "Delete", "Stop Campaign" |
| **Ghost** | Lowest emphasis | Navigation links, inline actions |
| **Icon-only** | Compact actions | Collapse sidebar, close modal, delete tag |

---

### 7.2 Button Variants

#### Primary Button

| Property | Value |
|----------|-------|
| Background | `linear-gradient(135deg, #6366F1, #4F46E5)` |
| Text color | `#FFFFFF` |
| Font weight | `600` |
| Border | None |
| Border-radius | `radius.md` (8px) |
| Padding | `spacing.button.md` |
| Hover background | Brighter: `linear-gradient(135deg, #818CF8, #6366F1)` |
| Hover transform | `translateY(-2px)` |
| Hover shadow | `0 10px 20px -10px rgba(99, 102, 241, 0.50)` |
| Active transform | `translateY(0)` |
| Disabled opacity | `0.60` |
| Disabled cursor | `not-allowed` |
| Focus ring | `0 0 0 2px rgba(99,102,241,0.40)` |
| Transition | `all 0.2s ease` |

#### Secondary Button

| Property | Value |
|----------|-------|
| Background | `rgba(255, 255, 255, 0.05)` |
| Text color | `text.primary` (#F1F5F9) |
| Border | `1px solid rgba(255, 255, 255, 0.10)` |
| Border-radius | `radius.md` (8px) |
| Padding | `spacing.button.md` |
| Hover background | `rgba(255, 255, 255, 0.10)` |
| Hover border | `rgba(255, 255, 255, 0.15)` |
| Disabled opacity | `0.50` |
| Transition | `all 0.2s ease` |

#### Danger Button

| Property | Value |
|----------|-------|
| Background | `rgba(239, 68, 68, 0.10)` |
| Text color | `#F87171` |
| Border | `1px solid rgba(239, 68, 68, 0.20)` |
| Border-radius | `radius.md` (8px) |
| Hover background | `rgba(239, 68, 68, 0.20)` |
| Hover border | `rgba(239, 68, 68, 0.35)` |
| Transition | `all 0.2s ease` |

#### Ghost Button (Text link style)

| Property | Value |
|----------|-------|
| Background | `transparent` |
| Text color | `#818CF8` (accent link color) |
| Border | None |
| Hover text color | `#6366F1` |
| Hover decoration | Underline |
| Padding | `space.1 space.2` (minimal) |

---

### 7.3 Button Sizes

| Size | Padding | Font Size | Height |
|------|---------|----------|--------|
| `sm` | `0.5rem 0.75rem` | `0.75rem` | `32px` |
| `md` (default) | `0.75rem 1.25rem` | `0.875rem` | `40px` |
| `lg` | `1rem 1.5rem` | `1rem` | `48px` |
| `xl` | `1.25rem 2rem` | `1.125rem` | `56px` |

---

### 7.4 Button Loading State

- Text changes: e.g., "Save Lead" → "Saving..."
- Spinner: Small (16px) circular spinner appears to the left of the text
- Button remains the same size (no layout shift)
- Disabled (non-clickable) during loading

### 7.5 Button with Icon

- Icon size: `16px` (sm/md buttons), `20px` (lg/xl buttons)
- Gap between icon and label: `space.2` (8px)
- Icon-left is the default (icon precedes text)
- Icon-right used only for "View All →" style navigational links

---

## 8. Forms & Inputs

### 8.1 Input Field Anatomy

```
[Label]
[Input field: [Prefix icon]  Placeholder or value  [Suffix icon/action]]
[Helper text or error message]
```

### 8.2 Input States

| State | Border | Background | Text | Shadow |
|-------|--------|-----------|------|--------|
| Default | `rgba(255,255,255,0.10)` | `rgba(15,23,42,0.60)` | `text.primary` | None |
| Hover | `rgba(255,255,255,0.15)` | `rgba(15,23,42,0.70)` | `text.primary` | None |
| Focus | `#6366F1` (2px) | `rgba(15,23,42,0.70)` | `text.primary` | `0 0 0 2px rgba(99,102,241,0.25)` |
| Filled | `rgba(255,255,255,0.10)` | `rgba(15,23,42,0.60)` | `text.primary` | None |
| Error | `rgba(239,68,68,0.50)` | `rgba(15,23,42,0.60)` | `text.primary` | `0 0 0 2px rgba(239,68,68,0.15)` |
| Disabled | `rgba(255,255,255,0.05)` | `rgba(15,23,42,0.30)` | `text.tertiary` | None |

### 8.3 Input Specs

| Property | Value |
|----------|-------|
| Height | `44px` (standard), `40px` (compact) |
| Padding | `0.875rem 1rem` |
| Font size | `1rem` (16px) — prevents mobile zoom |
| Font color | `text.primary` |
| Placeholder color | `text.tertiary` (#475569) |
| Border-radius | `radius.md` (8px) |
| Border width | `1px` |
| Transition | `border-color 0.2s ease, box-shadow 0.2s ease` |

### 8.4 Label Specs

| Property | Value |
|----------|-------|
| Font size | `0.875rem` (14px) |
| Font weight | `500` |
| Color | `text.secondary` (#94A3B8) |
| Margin bottom | `space.2` (8px) |
| Required indicator | `" *"` appended, `semantic.danger` color |

### 8.5 Helper / Error Text

| Type | Color | Font size | Position |
|------|-------|----------|----------|
| Helper text | `text.secondary` | `0.8125rem` (13px) | Below input, `space.1.5` margin-top |
| Error text | `semantic.danger` (#F87171) | `0.8125rem` (13px) | Below input, `space.1.5` margin-top |
| Validation icon | ✗ red (error) / ✓ green (success) | Appears inside input right side |

### 8.6 Select / Dropdown

- Same visual spec as text input
- Custom dropdown panel: `background.elevated`, `radius.lg`, `border.default`, shadow Level 2
- Option hover: `background.hover`
- Selected option: `background.active`, `accent.primary` text
- Caret icon: `ChevronDown`, 16px, `text.secondary`

### 8.7 Textarea

- Same visual spec as text input
- Min height: `120px`
- Resize: vertical only
- Line height: `1.6`

### 8.8 Toggle / Switch

| Property | Value |
|----------|-------|
| Track OFF | `rgba(255,255,255,0.10)` |
| Track ON | `accent.primary` (#6366F1) |
| Thumb | White circle |
| Width × Height | `44px × 24px` |
| Thumb size | `18px` |
| Transition | `all 0.2s ease` |

### 8.9 Checkbox

| Property | Value |
|----------|-------|
| Size | `18px × 18px` |
| Unchecked border | `rgba(255,255,255,0.20)` |
| Unchecked background | `transparent` |
| Checked background | `accent.primary` |
| Check icon | White checkmark, `12px` |
| Border-radius | `radius.xs` (4px) |

### 8.10 Radio Button

| Property | Value |
|----------|-------|
| Size | `18px × 18px` |
| Border | `rgba(255,255,255,0.20)` (unchecked) |
| Inner dot | `accent.primary`, `10px` (checked) |
| Border-radius | `radius.full` |

### 8.11 Form Layout Rules

- Full-width inputs by default within their container.
- Two-column field rows: `display: flex; gap: space.6`. Each field takes `flex: 1`.
- On mobile (< 768px): All two-column rows collapse to single column.
- Form sections separated by `space.6` (24px) between groups.
- Form action buttons always at the bottom-right of the form, separated by a divider (`border.subtle`, `space.6` padding-top).

---

## 9. Tables

### 9.1 Table Structure

```
[Table container — glass panel, radius.xl]
  [Header row]
    [Column 1 header] [Column 2 header] ... [Column N header]
  [Data row 1]
    [Cell 1] [Cell 2] ... [Cell N]
  [Data row 2]
    ...
  [Empty state row] (conditional)
  [Pagination row] (conditional)
```

### 9.2 Table Specs

| Element | Value |
|---------|-------|
| Container background | `background.surface` |
| Container backdrop blur | `blur(12px)` |
| Container border | `border.default` |
| Container border-radius | `radius.xl` (16px) |
| Container overflow | `hidden` |
| Header background | `rgba(0, 0, 0, 0.20)` |
| Header border-bottom | `border.default` |
| Header padding | `spacing.table.cell` (1.25rem 1.5rem) |
| Header font size | `0.875rem` (14px) |
| Header font weight | `600` |
| Header color | `text.secondary` (#94A3B8) |
| Header text-transform | `uppercase` |
| Header letter-spacing | `0.05em` |
| Row padding | `spacing.table.cell` (1.25rem 1.5rem) |
| Row border-bottom | `border.subtle` (`rgba(255,255,255,0.05)`) |
| Last row border-bottom | None |
| Row hover background | `background.hover` (`rgba(255,255,255,0.03)`) |
| Row transition | `background 0.2s ease` |
| Cell font size | `0.95rem` |
| Cell color | `#CBD5E1` |
| Cell align | Vertically centered |

### 9.3 Column Width Strategy

| Column Type | Width | Notes |
|-------------|-------|-------|
| Name + subtitle (2-line) | `2fr` | Widest — primary identifier |
| Status badge | `1fr` | Fixed enough for badge |
| Short text (title, role) | `1fr` | Medium |
| Numeric value | `1fr` | Right-aligned |
| Score badge (circle) | `80px` | Fixed, centered |
| Action column | `120px` | Fixed — contains icon buttons |

### 9.4 Special Table Cells

#### Name Cell (Two-line)

```
[Bold name text — text.primary, 0.95rem, weight 600]
[Email or subtitle — text.secondary, 0.85rem, weight 400]
```

#### Status Badge Cell
Uses the Status Color Map from §2.4. Always pill-shaped (`radius.full`).

#### Score Badge Cell
Circular badge, 32×32px:
- 80–100: `gradient.green`
- 50–79: `gradient.amber`
- 0–49: `gradient.red`
- No score: `background.hover` + `text.secondary` `"–"`
Text: `font-weight: 700`, `font-size: 0.875rem`

#### Numeric Cell
- Right-aligned text
- Monospace font (`JetBrains Mono`) for long numbers
- Color: `text.primary`

#### Action Cell
- Icon buttons (ghost style, 32×32px click targets)
- Hidden by default on non-hovered rows, visible on row hover
- OR: always visible if table has ≤ 3 columns

### 9.5 Table Empty State
Displayed in a single full-span row below the header:
```
Centered content:
[Icon (40px)]
[Heading — h4 size]
[Body text — secondary]
[CTA button]
Padding: space.16 (64px) top and bottom
```

### 9.6 Table Loading State
Skeleton rows replace data rows. Number of skeleton rows: 5 (default).
Each skeleton row contains per-column placeholder blocks matching the column width pattern.

---

## 10. Cards

### 10.1 Card Variants

| Variant | Usage | Background | Border |
|---------|-------|-----------|--------|
| **Surface** | Widgets, panels, data containers | `rgba(30,41,59,0.40)` + blur | `rgba(255,255,255,0.05)` |
| **Elevated** | Modals, dropdowns, hover-preview popovers | `rgba(15,23,42,0.90)` + heavy blur | `rgba(255,255,255,0.08)` |
| **Interactive** | Clickable cards (metric cards, campaign cards) | Surface + hover lift | Hover: `rgba(99,102,241,0.30)` |
| **Inline** | Content sub-sections inside a widget | `rgba(0,0,0,0.15)` | `rgba(255,255,255,0.04)` |
| **Danger** | Destructive action zones | `rgba(239,68,68,0.05)` | `rgba(239,68,68,0.15)` |
| **Success** | Confirmation banners | `rgba(16,185,129,0.05)` | `rgba(16,185,129,0.15)` |

### 10.2 Widget Card (Primary Card)

All dashboard widgets, settings panels, and content sections use this base spec:

| Property | Value |
|----------|-------|
| Background | `rgba(30, 41, 59, 0.40)` |
| Backdrop filter | `blur(12px)` |
| Border | `1px solid rgba(255, 255, 255, 0.05)` |
| Border-radius | `16px` |
| Top highlight | `1px` linear gradient line (see §2.3 `gradient.highlight`) |
| Overflow | `hidden` |
| Transition | `none` (static widget, not interactive) |

### 10.3 Interactive / Metric Card

Extends Widget Card with:

| Property | Value |
|----------|-------|
| Cursor | `pointer` |
| Default transform | `translateY(0)` |
| Hover transform | `translateY(-5px)` |
| Hover border-color | `rgba(99, 102, 241, 0.30)` |
| Hover box-shadow | `0 10px 30px -10px rgba(99, 102, 241, 0.15)` |
| Transition | `all 0.3s ease` |

### 10.4 Card Anatomy

```
┌──────────────────────────────────────────────────────┐
│  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │ ← top highlight gradient line
│  CARD HEADER (optional)                              │
│    Title                               [Action CTA]  │
│  ──────────────────────────────────────────────────  │ ← header divider (border.subtle)
│  CARD BODY                                           │
│    [Primary content]                                 │
│                                                      │
└──────────────────────────────────────────────────────┘
```

### 10.5 Form Card

Used for login, register, add-lead, and all standalone forms:

| Property | Value |
|----------|-------|
| Background | `rgba(30, 41, 59, 0.60)` (slightly more opaque for readability) |
| Backdrop filter | `blur(20px)` |
| Border | `1px solid rgba(255, 255, 255, 0.10)` |
| Border-radius | `16px` |
| Padding | `2.5rem` |
| Max-width | `480px` (login/register), `600px` (content forms) |
| Position | Centered horizontally on page |

### 10.6 Alert / Banner Cards

| Type | Background | Border-left | Icon |
|------|-----------|------------|------|
| Error | `rgba(239,68,68,0.10)` | `3px solid #EF4444` | ✗ red |
| Warning | `rgba(245,158,11,0.10)` | `3px solid #F59E0B` | ⚠ amber |
| Success | `rgba(16,185,129,0.10)` | `3px solid #10B981` | ✓ green |
| Info | `rgba(96,165,250,0.10)` | `3px solid #60A5FA` | ℹ blue |

All banners:
- Border-radius: `radius.md` (8px)
- Padding: `space.4` (1rem)
- Font size: `0.875rem`
- Animate in: `fadeIn` (0.3s ease, from `translateY(-5px)` to `translateY(0)`)

---

## 11. Charts

### 11.1 Chart Design Principles

- **No borders on chart containers** — charts live inside widget cards.
- **Grid lines**: Horizontal only. Light opacity (`rgba(255,255,255,0.04)`). No vertical grid.
- **Axis labels**: `text.tertiary`, `0.75rem`, no bold.
- **Tooltips**: Elevated card style (Level 2 elevation). Dark, glassy. Show all active series values.
- **No chart titles** — the widget card header serves as the title.
- **Accessible colors** — All chart series must be distinguishable by both color AND shape/pattern for colorblind users.
- **Smooth curves** — Line charts use cubic bezier interpolation, not straight segments.

### 11.2 Chart Color Palette

| Series | Primary Color | Fill Opacity |
|--------|-------------|-------------|
| Open Rate | `#6366F1` (indigo) | `0.08` |
| Reply Rate | `#10B981` (emerald) | `0.08` |
| Emails Sent | `#A855F7` (purple) | `0.60` (bars) |
| Leads Imported | `#60A5FA` (blue) | `0.60` (bars) |
| Completed | `#10B981` | `0.70` (bars) |
| Failed | `#EF4444` | `0.70` (bars) |

### 11.3 Line / Area Chart Spec

| Property | Value |
|----------|-------|
| Line width | `2px` |
| Line style | Solid |
| Area fill | Same color as line, `0.08` opacity |
| Data point dot | `6px` radius, visible on hover only |
| Dot fill | Line color |
| Dot border | `2px solid background.canvas` |
| Curve type | `monotone` (smooth, no sharp angles) |
| Tooltip trigger | Mouse hover over chart area |

### 11.4 Bar Chart Spec

| Property | Value |
|----------|-------|
| Bar border-radius | `4px` (top corners only) |
| Bar gap | `30%` of bar width |
| Bar hover | Brighter shade, `0.9` opacity |
| Bar width | Auto-calculated to fill X-axis |

### 11.5 Donut / Pie Chart Spec (Future)

| Property | Value |
|----------|-------|
| Inner radius | `60%` (donut, not pie) |
| Segment gap | `3px` |
| Active segment | Extends outward `8px` on hover |
| Center label | Total count (large number) + "Leads" label |

### 11.6 Axis Specifications

| Axis | Label Format | Tick Count |
|------|-------------|-----------|
| X-axis (time) | `"Jul 1"`, `"Jul 15"` (abbreviated month + day) | 6–8 ticks |
| Y-axis (percentage) | `"0%"`, `"25%"`, `"50%"` | 4–5 ticks |
| Y-axis (count) | `"0"`, `"500"`, `"1K"` | 4–5 ticks |

### 11.7 Chart Tooltip

```
┌───────────────────────────────┐
│  July 15, 2026                │
│  ─── Open Rate:   38.2%       │
│  ─── Reply Rate:   8.7%       │
└───────────────────────────────┘
```

- Background: `rgba(15, 23, 42, 0.95)` + blur
- Border: `rgba(255,255,255,0.08)`
- Border-radius: `radius.lg` (12px)
- Padding: `space.3 space.4` (0.75rem 1rem)
- Shadow: Level 2

### 11.8 Legend Spec

- Below chart, left-aligned
- Each item: colored line/swatch (16px wide, 2px tall) + label text
- Color swatch matches the series line/bar color
- Label: `text.secondary`, `0.875rem`
- Gap between items: `space.6` (1.5rem)

---

## 12. Icons

### 12.1 Icon Library

**Primary**: [Lucide Icons](https://lucide.dev) — open source, consistent stroke style, SVG-based.  
**Fallback**: None — all icons must come from Lucide to ensure visual consistency.

### 12.2 Icon Sizes

| Token | Size | Usage |
|-------|------|-------|
| `icon.xs` | `14px` | Inline with text, badges |
| `icon.sm` | `16px` | Button icons, form prefix icons |
| `icon.md` | `20px` | Sidebar nav icons, card header icons |
| `icon.lg` | `24px` | Empty state accent icons |
| `icon.xl` | `32px` | Feature illustration icons |
| `icon.2xl` | `48px` | Large empty state or onboarding icons |

### 12.3 Icon Colors

| Context | Color |
|---------|-------|
| Sidebar (inactive) | `#94A3B8` (text.secondary) |
| Sidebar (active) | `#FFFFFF` |
| Button icons | Inherits button text color |
| Metric card icons | `rgba(148, 163, 184, 0.40)` (very muted) |
| Form input prefix | `#64748B` |
| Status indicators | Matches semantic color |
| Empty state icons | `#334155` (subtle, very muted) |

### 12.4 Icon Usage Map

| Icon | Used For |
|------|---------|
| `BarChart2` | Dashboard nav item |
| `Users` | Leads nav item, Total Leads card |
| `Megaphone` | Campaigns nav item, campaign empty state |
| `GitBranch` | Sequences nav item |
| `Kanban` | CRM nav item |
| `Sparkles` | AI Tools nav item, AI Insights header |
| `Filter` | Segments nav item |
| `Settings` | Settings nav item |
| `HelpCircle` | Help & Docs nav item |
| `Zap` | What's New nav item |
| `Mail` | Emails Sent card |
| `Eye` | Open Rate card |
| `MessageSquare` | Reply Rate card |
| `Bell` | Notification bell in header |
| `Search` | Search bar |
| `ChevronDown` | Dropdown carets, org switcher |
| `ChevronLeft` | Sidebar collapse |
| `Plus` | Add new item actions |
| `Upload` | Import |
| `CheckSquare` | Task complete |
| `FileText` | Notes |
| `Trash2` | Delete action |
| `Edit3` | Edit action |
| `ExternalLink` | External links |
| `LogOut` | Sign Out |
| `AlertTriangle` | Warning states |
| `XCircle` | Error states, close |
| `CheckCircle` | Success states |
| `Info` | Info states |
| `Lock` | 403 error screen |
| `MapPin` | 404 error screen |
| `Cloud` | Network/server error |

### 12.5 Icon Stroke Width

- All Lucide icons use `strokeWidth={1.5}` (slightly lighter than default `2`) for a premium feel on dark backgrounds.

---

## 13. Dark Mode

Dark Mode is the **default and primary** mode of the application. All design tokens in §2 are defined for Dark Mode.

### 13.1 Dark Mode Design Decisions

| Decision | Rationale |
|----------|-----------|
| `#0B0E14` canvas (not pure black) | Pure black is harsh. Slightly blue-tinted dark creates depth and warmth. |
| Glass surfaces at 40% opacity | Lets glow blobs show through, creating a sense of layered depth. |
| Gradient text on key numbers | On dark backgrounds, gradient text pops without requiring a light background. |
| `rgba(255,255,255,0.05)` borders | Subtle enough to define edges without harsh lines on dark. |
| Glow blobs (indigo + purple) | Add ambient color and life to an otherwise stark dark canvas. |
| Backdrop blur on all surfaces | Creates hierarchy and glass depth effect that works only in dark mode. |

### 13.2 Dark Mode Applied — Component Summary

| Component | Background | Text | Border |
|-----------|-----------|------|--------|
| Canvas | `#0B0E14` | — | — |
| Widget card | `rgba(30,41,59,0.40)` | `#F1F5F9` | `rgba(255,255,255,0.05)` |
| Input | `rgba(15,23,42,0.60)` | `#F1F5F9` | `rgba(255,255,255,0.10)` |
| Dropdown | `rgba(15,23,42,0.90)` | `#F1F5F9` | `rgba(255,255,255,0.08)` |
| Modal | `rgba(15,23,42,0.95)` | `#F1F5F9` | `rgba(255,255,255,0.10)` |
| Primary button | Brand gradient | `#FFFFFF` | None |
| Secondary button | `rgba(255,255,255,0.05)` | `#F1F5F9` | `rgba(255,255,255,0.10)` |
| Sidebar | `rgba(11,14,20,0.95)` | `#94A3B8` | `rgba(255,255,255,0.05)` |
| Header | `rgba(11,14,20,0.85)` | `#F1F5F9` | `rgba(255,255,255,0.05)` |
| Badge (status) | Semantic.bg | Semantic color | Semantic.border |
| Table header | `rgba(0,0,0,0.20)` | `#94A3B8` | `rgba(255,255,255,0.05)` |
| Table row hover | `rgba(255,255,255,0.03)` | — | — |

---

## 14. Light Mode

Light Mode is a **secondary mode** toggled via user preference in the User Menu. It uses inverted semantics where white becomes the default surface and dark becomes text.

> Light Mode full token values to be defined at implementation. The following establishes the design intent and mapping rules.

### 14.1 Light Mode Design Intent

- **Background**: Clean white (`#FFFFFF`) or near-white (`#F8FAFC`) canvas
- **Surfaces**: White cards with subtle light grey borders (`#E2E8F0`)
- **Text**: Dark slate (`#0F172A` primary, `#475569` secondary)
- **Accents**: Same indigo/purple brand colors — they work on both modes
- **Shadows**: Traditional box shadows (Light mode cannot rely on blur-over-dark)
- **No glow blobs**: Replaced with subtle light-mode background pattern or removed entirely

### 14.2 Dark → Light Token Mapping

| Dark Mode Token | Light Mode Value |
|----------------|-----------------|
| `background.canvas` `#0B0E14` | `#F8FAFC` |
| `background.surface` `rgba(30,41,59,0.40)` | `#FFFFFF` |
| `background.elevated` `rgba(15,23,42,0.90)` | `#FFFFFF` |
| `background.input` `rgba(15,23,42,0.60)` | `#FFFFFF` |
| `border.default` `rgba(255,255,255,0.05)` | `#E2E8F0` |
| `border.interactive` `rgba(255,255,255,0.10)` | `#CBD5E1` |
| `text.primary` `#F1F5F9` | `#0F172A` |
| `text.secondary` `#94A3B8` | `#64748B` |
| `text.tertiary` `#475569` | `#94A3B8` |
| `background.hover` `rgba(255,255,255,0.03)` | `#F1F5F9` |
| `background.active` `rgba(99,102,241,0.08)` | `rgba(99,102,241,0.08)` (same) |
| Backdrop blur | Removed — use `box-shadow` instead |
| Glow blobs | Removed |

### 14.3 Light Mode Elevation

| Level | Background | Border | Shadow |
|-------|-----------|--------|--------|
| 0 (Canvas) | `#F8FAFC` | — | — |
| 1 (Surface) | `#FFFFFF` | `#E2E8F0` | `0 1px 3px rgba(0,0,0,0.08)` |
| 2 (Elevated) | `#FFFFFF` | `#E2E8F0` | `0 4px 16px rgba(0,0,0,0.12)` |
| 3 (Modal) | `#FFFFFF` | `#E2E8F0` | `0 12px 48px rgba(0,0,0,0.16)` |

### 14.4 Mode Toggle Storage

- User's preference stored in `localStorage` key: `theme_preference`
- Values: `"dark"` (default) | `"light"`
- Applied via `data-theme="dark"` attribute on `<html>` element
- CSS custom properties switch per theme

---

## 15. Accessibility

### 15.1 Color Contrast Requirements

All text must meet **WCAG 2.1 Level AA** minimum contrast ratios:

| Element | Min Contrast | Target Contrast |
|---------|-------------|----------------|
| Body text on surface | 4.5:1 | ≥ 7:1 |
| Large text (18px+ or 14px+ bold) | 3:1 | ≥ 4.5:1 |
| Badge text on badge background | 4.5:1 | ≥ 4.5:1 |
| Button label on button background | 4.5:1 | ≥ 4.5:1 |
| Placeholder text | 3:1 | ≥ 4.5:1 |
| Disabled text | No requirement (indicates non-interactivity) | — |
| Chart lines on dark canvas | 3:1 | ≥ 4.5:1 |

> **Key contrast values to verify:**
> - `#F1F5F9` on `rgba(30,41,59,0.40)` → Test at implementation
> - `#94A3B8` (secondary text) on `#0B0E14` → Verify meets 3:1 minimum
> - Badge label colors on their respective badge backgrounds → Verify per badge

### 15.2 Focus Management

- All interactive elements must have a **visible focus ring**.
- Focus ring specification: `0 0 0 2px rgba(99, 102, 241, 0.60)` (indigo glow).
- Never use `outline: none` without providing an alternative focus indicator.
- Focus order must follow the logical reading order of the page (top-to-bottom, left-to-right).
- Modal opening → focus moves to first focusable element inside modal.
- Modal closing → focus returns to the element that triggered the modal.

### 15.3 Keyboard Navigation

| Key | Behavior |
|-----|---------|
| `Tab` | Move focus forward through interactive elements |
| `Shift+Tab` | Move focus backward |
| `Enter` / `Space` | Activate buttons, checkboxes, toggles |
| `Escape` | Close modals, dropdowns, command palette, notification drawer |
| `Arrow keys` | Navigate within menus, select dropdowns, Kanban columns |
| `Ctrl/Cmd+K` | Open Command Palette |
| `Ctrl/Cmd+/` | Focus search bar |

### 15.4 Semantic HTML Requirements

| Element | Correct Semantic Usage |
|---------|----------------------|
| Navigation | `<nav>` with `aria-label` for sidebar and breadcrumbs |
| Main content | `<main>` wrapping the dashboard canvas |
| Headings | One `<h1>` per page (page title); `<h2>` for widget titles |
| Buttons | `<button>` — never `<div onClick>` |
| Links | `<a href>` — never `<div onClick>` |
| Tables | `<table>` with `<thead>`, `<tbody>`, `<th scope>`, `<td>` |
| Forms | `<form>` with `<label for>` and matching `id` on inputs |
| Lists | `<ul>` / `<ol>` for activity feeds, navigation, and lists |
| Alerts | `role="alert"` on error/success banners |
| Modal | `role="dialog"` + `aria-modal="true"` + `aria-labelledby` |
| Loading | `aria-busy="true"` on containers showing skeleton states |
| Icons | `aria-hidden="true"` on decorative icons; `aria-label` on icon-only buttons |

### 15.5 ARIA Labels

| Component | Required ARIA |
|-----------|-------------|
| Breadcrumb nav | `aria-label="Breadcrumb"` |
| Current breadcrumb item | `aria-current="page"` |
| Sidebar nav | `aria-label="Main navigation"` |
| Icon-only buttons | `aria-label="Close"`, `aria-label="Delete"`, etc. |
| Form fields | `aria-required="true"` on required inputs |
| Form error fields | `aria-invalid="true"` + `aria-describedby` → error message ID |
| Status badges | Include text content, not color alone: `"Active"` not just a colored dot |
| Progress bars | `role="progressbar"` + `aria-valuenow` + `aria-valuemin` + `aria-valuemax` |
| Notification bell | `aria-label="Notifications (2 unread)"` (dynamic count) |
| Search | `aria-label="Search"` + `role="search"` on form |
| Loading skeletons | `aria-label="Loading..."` on skeleton container |

### 15.6 Color Independence

- Status is **never communicated by color alone**.
- Every status badge has a text label ("Active", "Failed") alongside its color.
- Error states include an icon (✗) AND red color AND text.
- Charts have a text legend in addition to colored lines.
- Score badges show the numeric score alongside the gradient color.

### 15.7 Motion & Animation

- Respect the `prefers-reduced-motion` OS setting.
- When reduced motion is preferred:
  - Remove all `transform` animations (`translateY`, `translateX`)
  - Remove shimmer animations on skeletons (use static low-opacity blocks)
  - Remove the chart line draw animation
  - Keep only instant opacity transitions (fade in/out at `0.1s`)
- Hover effects remain (subtle background changes) — only transforms are disabled.

### 15.8 Touch Targets

- All interactive elements must have a minimum touch target size of **44px × 44px** on mobile.
- Small visual elements (16px icons) must have sufficient padding to meet this requirement.
- Table row click targets span the full row width and use the full row height.

---

## 16. Responsive Rules

### 16.1 Breakpoints

| Name | Token | Min Width | Typical Device |
|------|-------|----------|---------------|
| Mobile (S) | `sm` | `0px` | Small phones |
| Mobile (L) | `md` | `640px` | Large phones |
| Tablet | `lg` | `768px` | iPad portrait, large phones landscape |
| Desktop (S) | `xl` | `1024px` | iPad landscape, small laptops |
| Desktop (M) | `2xl` | `1280px` | Standard laptops |
| Desktop (L) | `3xl` | `1440px` | Large monitors |
| Wide | `4xl` | `1920px` | Ultra-wide monitors |

### 16.2 Layout Adaptation Rules

#### Sidebar
| Breakpoint | Behavior |
|-----------|---------|
| `< 768px` | Hidden. Replaced by bottom navigation bar (5 tabs max). |
| `768px – 1023px` | Collapsed (64px, icon-only). Toggle to expand temporarily. |
| `≥ 1024px` | Expanded (240px). Collapse/expand persists to localStorage. |

#### Header
| Breakpoint | Behavior |
|-----------|---------|
| `< 640px` | Product name hidden. Search bar compresses to icon-only (click to expand). |
| `640px – 767px` | Product name hidden. Search bar visible but narrower. |
| `≥ 768px` | Full header visible. |

#### Canvas Maximum Width
| Breakpoint | Max Width | Padding |
|-----------|---------|---------|
| `< 768px` | 100% | 16px sides |
| `768px – 1023px` | 100% | 24px sides |
| `≥ 1024px` | `1200px` centered | `2rem 5%` |
| `≥ 1440px` | `1200px` centered | Auto margins |

#### Grid Column Adaptation

| Row | Desktop | Tablet | Mobile |
|-----|---------|--------|--------|
| Metric Cards | 4 columns | 2 × 2 | 2 × 2 |
| Charts + Quick Actions | `2fr 1fr` | Stacked (full width each) | Charts hidden; Quick Actions full |
| Lead + Campaign Summary | `1fr 1fr` | Stacked | Stacked |
| Activities + AI Insights | `2fr 1fr` | Stacked | Activities only (AI Insights hidden) |

### 16.3 Typography Scaling

| Token | Desktop | Tablet | Mobile |
|-------|---------|--------|--------|
| `text.h1` (page title) | `2.5rem` | `2rem` | `1.75rem` |
| `text.h2` | `2rem` | `1.75rem` | `1.5rem` |
| `text.h3` | `1.5rem` | `1.375rem` | `1.25rem` |
| Metric card value | `2.5rem` | `2rem` | `2rem` |
| Body text | `1rem` | `1rem` | `1rem` (never below 16px) |
| Input font size | `1rem` | `1rem` | `1rem` (critical — prevents iOS zoom) |

### 16.4 Component Adaptation Rules

| Component | Mobile Behavior |
|-----------|----------------|
| Table | Columns reduced: show Name + Status + 1 metric max. |
| Form rows (2-col) | Collapse to 1-column stacked layout. |
| Sidebar sub-items | Shown in bottom sheet drawer on tap of nav item. |
| Modals | Full-screen on mobile (no floating card — fill entire viewport). |
| Dropdowns | Full-screen bottom sheet on mobile. |
| Chart tooltips | Tap to reveal (no hover on touch). |
| Kanban board | Vertical accordion (no horizontal scroll). |
| Data tables | Horizontal scroll within the table container (no layout break). |
| Notification drawer | Full-screen bottom sheet on mobile. |
| Command palette | Full-screen overlay on mobile. |

### 16.5 Touch-Specific Rules

- Tap target minimum: `44px × 44px` (see §15.8)
- Swipe gestures:
  - Bottom navigation: swipe left/right to navigate between tabs
  - Kanban cards: swipe to move between stages
  - Notification drawer: swipe down to dismiss
- No hover-dependent functionality (all hover states have equivalent tap interactions)
- Double-tap for edit is never used — explicit Edit buttons always present

### 16.6 Print Rules

- Sidebar and header: hidden on print
- Background colors: set to `white`, text to `black`
- Charts: retain color but at reduced opacity for ink efficiency
- Cards: no backdrop blur (not supported in print)
- Font: fall back to system serif for print if Inter is unavailable

---

*This Design System is the single source of truth for all visual decisions. Any deviation from these specifications requires explicit approval and a corresponding update to this document. Engineers and designers must reference this document before starting any new component or screen.*

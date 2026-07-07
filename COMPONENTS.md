# COMPONENTS.md — Injaazh Lead AI: Component Library

> **Reusable UI Component Reference**  
> Version: 1.0 | Last Updated: July 2026  
> Companion documents: [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) | [SCREENS.md](./SCREENS.md) | [IA.md](./IA.md)  
> Status: Living Document — Add a new entry for every new reusable component before building it.

---

## Document Conventions

- **Props**: Each prop listed with `name (type, required?)` format.
- **States**: Visual/behavioral states the component must handle.
- **Variants**: Distinct visual or behavioral configurations.
- **Reusability**: Where the component is used across the application.
- **Accessibility**: ARIA and keyboard requirements.
- **No code**: Descriptions only — no JSX, TypeScript, or CSS.

---

## Component Index

### Layout Components
- [C-01 AppShell](#c-01-appshell)
- [C-02 Topbar](#c-02-topbar)
- [C-03 Sidebar](#c-03-sidebar)
- [C-04 PageHeader](#c-04-pageheader)
- [C-05 Breadcrumb](#c-05-breadcrumb)

### Primitive Components
- [C-06 Button](#c-06-button)
- [C-07 IconButton](#c-07-iconbutton)
- [C-08 Badge](#c-08-badge)
- [C-09 Avatar](#c-09-avatar)
- [C-10 Spinner](#c-10-spinner)
- [C-11 Skeleton](#c-11-skeleton)
- [C-12 Divider](#c-12-divider)
- [C-13 Tooltip](#c-13-tooltip)
- [C-14 ProgressBar](#c-14-progressbar)

### Form Components
- [C-15 Input](#c-15-input)
- [C-16 Textarea](#c-16-textarea)
- [C-17 Select](#c-17-select)
- [C-18 Toggle](#c-18-toggle)
- [C-19 Checkbox](#c-19-checkbox)
- [C-20 RadioGroup](#c-20-radiogroup)
- [C-21 FormGroup](#c-21-formgroup)
- [C-22 FormRow](#c-22-formrow)

### Feedback Components
- [C-23 AlertBanner](#c-23-alertbanner)
- [C-24 Toast](#c-24-toast)
- [C-25 EmptyState](#c-25-emptystate)
- [C-26 ErrorState](#c-26-errorstate)

### Data Display Components
- [C-27 MetricCard](#c-27-metriccard)
- [C-28 DataTable](#c-28-datatable)
- [C-29 TableRow](#c-29-tablerow)
- [C-30 StatusBadge](#c-30-statusbadge)
- [C-31 ScoreBadge](#c-31-scorebadge)
- [C-32 TagPill](#c-32-tagpill)
- [C-33 ActivityItem](#c-33-activityitem)
- [C-34 ActivityFeed](#c-34-activityfeed)

### Card Components
- [C-35 WidgetCard](#c-35-widgetcard)
- [C-36 FormCard](#c-36-formcard)
- [C-37 CampaignCard](#c-37-campaigncard)
- [C-38 LeadCard](#c-38-leadcard)
- [C-39 QuickActionButton](#c-39-quickactionbutton)

### Navigation Components
- [C-40 SidebarNavItem](#c-40-sidebarnavitem)
- [C-41 BreadcrumbItem](#c-41-breadcrumbitem)
- [C-42 TabBar](#c-42-tabbar)
- [C-43 BottomNavBar](#c-43-bottomnavbar)

### Overlay Components
- [C-44 Modal](#c-44-modal)
- [C-45 Drawer](#c-45-drawer)
- [C-46 Dropdown](#c-46-dropdown)
- [C-47 CommandPalette](#c-47-commandpalette)

### Specialized Components
- [C-48 NotificationCenter](#c-48-notificationcenter)
- [C-49 OrgSwitcher](#c-49-orgswitcher)
- [C-50 UserMenu](#c-50-usermenu)
- [C-51 OnboardingChecklist](#c-51-onboardingchecklist)
- [C-52 SearchBar](#c-52-searchbar)
- [C-53 ProtectedRoute](#c-53-protectedroute)
- [C-54 StepWizard](#c-54-stepwizard)
- [C-55 KanbanBoard](#c-55-kanbanboard)
- [C-56 KanbanCard](#c-56-kanbancard)
- [C-57 SequenceStepEditor](#c-57-sequenceStepeditor)
- [C-58 ChartWidget](#c-58-chartwidget)

---

---

# LAYOUT COMPONENTS

---

## C-01: AppShell

### Purpose
The root layout wrapper for all authenticated screens. Composes the Topbar, Sidebar, and main content area into a single consistent application frame. This component ensures the three-zone layout is applied uniformly across every protected page.

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `children` | ReactNode | ✅ | The page content rendered in the main area |

### States

| State | Description |
|-------|-------------|
| **Authenticated** | Full shell rendered (Topbar + Sidebar + Main) |
| **Sidebar Expanded** | Sidebar at 240px with labels visible |
| **Sidebar Collapsed** | Sidebar at 64px, icon-only, labels hidden |
| **Mobile** | Sidebar hidden; bottom nav replaces it |

### Variants
None — AppShell has a single configuration. Layout variant is controlled by responsive CSS and sidebar toggle state.

### Reusability
Used as the layout wrapper for every route that requires authentication:
- `/dashboard`
- `/leads`, `/leads/new`, `/leads/:id`
- `/campaigns`, `/campaigns/new`, `/campaigns/:id`
- All CRM, Sequences, AI Tools, and Settings routes

**Not used on:** `/login`, `/register`, `/forgot-password` (unauthenticated routes use a plain centered layout).

### Accessibility
- `<main>` element wraps the page content area with `id="main-content"`.
- Skip-to-main link hidden off-screen, visible on keyboard focus: "Skip to main content."
- Sidebar landmark: `<nav aria-label="Main navigation">`.
- Header landmark: `<header>`.

### Examples

```
Dashboard page:
  <AppShell>
    <DashboardPage />
  </AppShell>

Leads page:
  <AppShell>
    <LeadsPage />
  </AppShell>
```

---

## C-02: Topbar

### Purpose
The fixed top header strip present on every authenticated screen. Provides global context: product branding, organization switching, global search, notifications, and user menu access.

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `organizationName` | string | ✅ | Current org name shown in switcher |
| `unreadCount` | number | ✅ | Notification bell badge count |
| `userEmail` | string | ✅ | User email shown in user menu |
| `userAvatarInitials` | string | ✅ | Two-letter initials for avatar |
| `onNotificationsOpen` | function | ✅ | Callback to open notification drawer |
| `onUserMenuOpen` | function | ✅ | Callback to open user menu dropdown |
| `onCommandPaletteOpen` | function | ✅ | Callback triggered by ⌘K |
| `onSearchFocus` | function | ✅ | Callback when search bar is focused |

### States

| State | Description |
|-------|-------------|
| **Default** | Full topbar visible with all zones |
| **Search Active** | Search bar expands, shows results panel below |
| **Mobile — Search Collapsed** | Search icon only; tap expands to full-width input |
| **Notification Unread** | Bell icon shows badge with unread count |
| **Notification Read** | Bell icon has no badge |

### Variants
None — single configuration; responsive behavior handled internally.

### Reusability
Used once, inside `AppShell`. Not reused per-page. All per-page differences are driven by context/props.

### Accessibility
- `<header role="banner">`
- Logo link: `aria-label="Injaazh Lead AI — Go to Dashboard"`
- Search input: `aria-label="Search"`, wrapped in `<form role="search">`
- Notification bell: `aria-label="Notifications, {n} unread"` (dynamic)
- Command palette button: `aria-label="Open command palette"`, `aria-keyshortcuts="Control+k Meta+k"`
- User avatar button: `aria-label="User menu"` + `aria-expanded` on open state

### Examples

```
Context: Dashboard page
  Organization: "Acme Corp"
  Unread notifications: 3
  Shows: "🔷 Injaazh | ▾ Acme Corp ▾ | [🔍] | [⌘K] | [🔔3] | [👤]"
```

---

## C-03: Sidebar

### Purpose
The fixed left navigation panel. Renders primary navigation items, their icons, active states, sub-items, and the collapse toggle. It is the backbone of global navigation.

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `currentPath` | string | ✅ | Active route used to compute active state |
| `isExpanded` | boolean | ✅ | Whether sidebar is in expanded (240px) or collapsed (64px) mode |
| `onToggleExpand` | function | ✅ | Callback to toggle expand/collapse |
| `navItems` | NavItem[] | ✅ | Array of navigation items (see structure below) |
| `role` | UserRole | ✅ | User's role — used to filter role-gated items |

**NavItem structure:**

| Field | Type | Description |
|-------|------|-------------|
| `label` | string | Display name ("Dashboard", "Leads", etc.) |
| `icon` | IconName | Lucide icon name |
| `href` | string | Route path |
| `badge` | number \| null | Count badge value |
| `subItems` | SubItem[] \| null | Nested navigation items |
| `requiredRole` | UserRole \| null | Minimum role to see this item |

### States

| State | Description |
|-------|-------------|
| **Expanded** | 240px, labels + icons visible |
| **Collapsed** | 64px, icons only, tooltips on hover |
| **Item Default** | Inactive nav item |
| **Item Active** | Current section highlighted — left accent bar, bold, bright icon |
| **Item Hover** | Subtle background highlight |
| **Item with Sub-items Open** | Sub-items shown below parent (only when parent is active) |
| **Item with Badge** | Count badge shown to right of label |

### Variants

| Variant | Description |
|---------|-------------|
| `expanded` | Full 240px sidebar with labels |
| `collapsed` | 64px icon-only sidebar |

### Reusability
Used once inside `AppShell`. Shared across all authenticated pages.

### Accessibility
- Wrapped in `<nav aria-label="Main navigation">`
- Each `SidebarNavItem` renders as `<a>` with `aria-current="page"` on the active item
- Collapsed mode: each icon button has a `title` attribute matching the label (browser tooltip) AND a `Tooltip` component for visual users
- Sub-items: wrapped in `<ul>` with `aria-label="{parent} sub-navigation"`
- Toggle button: `aria-label="Collapse navigation"` / `"Expand navigation"` (dynamic)

### Examples

```
Active route: /leads
  Result:
  - "Leads" item has left accent bar, white icon, bold label
  - Sub-items visible: "All Leads", "Import", "Segments"
  - Badge shows total lead count: "142"

Collapsed mode:
  - All labels hidden
  - Only icons visible, centered
  - Hovering "Leads" icon shows tooltip "Leads"
```

---

## C-04: PageHeader

### Purpose
The top section of each page's content area. Displays the page title, optional description, and primary page-level action buttons. Provides visual consistency across all pages.

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `title` | string | ✅ | Page title (e.g., "Analytics Overview") |
| `description` | string | — | Optional subtitle/description line |
| `actions` | ReactNode | — | Primary and secondary action buttons |
| `gradient` | boolean | — | Whether title uses gradient text (default: `true`) |

### States

| State | Description |
|-------|-------------|
| **Default** | Title + optional actions |
| **With description** | Title + subtitle below it |
| **No actions** | Title only (informational pages) |

### Variants

| Variant | Description |
|---------|-------------|
| `page` | Used at top of full pages (h1) |
| `section` | Used within a page for sub-sections (h2) |
| `widget` | Used inside widget cards (styled differently — smaller, uppercase, muted) |

### Reusability
Used on every page in the main content area, just below the Breadcrumb (or at the very top if no breadcrumb).

### Accessibility
- `page` variant renders as `<h1>` — only one per page
- `section` variant renders as `<h2>`
- `widget` variant renders as `<h3>` or `<p>` with `role="heading" aria-level="3"`

### Examples

```
Dashboard:
  title="Analytics Overview"
  gradient=true
  actions=[<Link href="/leads">Manage Leads</Link>, <Button onClick={logout}>Sign Out</Button>]

Lead List:
  title="Leads Management"
  gradient=true
  actions=[<Button variant="secondary" href="/dashboard">Dashboard</Button>,
           <Button variant="primary" href="/leads/new">+ Add Lead</Button>]

Add Lead:
  title="Add New Lead"
  gradient=true
  (no actions — form has its own submit button)
```

---

## C-05: Breadcrumb

### Purpose
Navigation trail showing the user's current position in the page hierarchy. Every segment (except the last) is a clickable link. Helps users navigate back to parent sections quickly.

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `items` | BreadcrumbItem[] | ✅ | Array of breadcrumb segments |

**BreadcrumbItem structure:**

| Field | Type | Description |
|-------|------|-------------|
| `label` | string | Display text |
| `href` | string \| null | If null, renders as plain text (current page) |

### States

| State | Description |
|-------|-------------|
| **Default** | All segments rendered, last one as plain text |
| **Single item** | Only current page shown as plain text (no links) |
| **Mobile** | Only immediate parent shown: "← {Parent Label}" |

### Variants
None — single configuration.

### Reusability
Used on all Level 2+ screens. Not shown on Level 1 (root section) screens.

Pages where it appears:
- `/leads/new` → "Leads / Add New Lead"
- `/leads/:id` → "Leads / {Lead Name}"
- `/campaigns/new` → "Campaigns / New Campaign"
- `/settings/team` → "Settings / Team Members"

### Accessibility
- Wrapped in `<nav aria-label="Breadcrumb">`
- Rendered as `<ol>` with `<li>` items
- Last item has `aria-current="page"`
- Separator (/) is `aria-hidden="true"`

### Examples

```
Route: /leads/new
  items=[
    { label: "Leads", href: "/leads" },
    { label: "Add New Lead", href: null }
  ]

Renders: Leads / Add New Lead
         (link)   (plain text)
```

---

---

# PRIMITIVE COMPONENTS

---

## C-06: Button

### Purpose
The primary interactive element for triggering actions. Used for form submissions, navigation, confirmations, and destructive actions. Provides consistent click targets, loading states, and visual hierarchy.

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `variant` | `primary \| secondary \| danger \| ghost` | — | Visual style (default: `primary`) |
| `size` | `sm \| md \| lg \| xl` | — | Button size (default: `md`) |
| `label` | string | ✅ | Button text |
| `icon` | IconName | — | Lucide icon shown before label |
| `iconPosition` | `left \| right` | — | Icon position (default: `left`) |
| `isLoading` | boolean | — | Shows spinner and disables button |
| `loadingLabel` | string | — | Text shown while loading (e.g., "Saving...") |
| `isDisabled` | boolean | — | Disables interaction |
| `href` | string | — | If provided, renders as `<a>` instead of `<button>` |
| `onClick` | function | — | Click handler |
| `type` | `button \| submit \| reset` | — | HTML button type (default: `button`) |
| `fullWidth` | boolean | — | Stretches button to container width |

### States

| State | Visual |
|-------|--------|
| **Default** | Standard appearance per variant |
| **Hover** | Brightened background + lift (`translateY(-2px)`) + glow shadow |
| **Active / Pressed** | Returns to original position (`translateY(0)`) |
| **Focus** | Visible focus ring (indigo glow, `0 0 0 2px rgba(99,102,241,0.40)`) |
| **Loading** | Spinner on left + loading label, disabled |
| **Disabled** | 60% opacity, `cursor: not-allowed`, no hover effects |

### Variants

| Variant | Background | Text | Border | Use Case |
|---------|-----------|------|--------|---------|
| `primary` | Brand gradient | White | None | Main CTA — one per form/section |
| `secondary` | Translucent | White | Subtle | Cancel, Back, View All |
| `danger` | Red translucent | Red | Red subtle | Delete, Stop Campaign |
| `ghost` | None | Indigo | None | Inline links, navigation |

### Reusability
Most-used component across the entire application. Present on every form, table row action, modal, header, and card.

### Accessibility
- Renders as `<button type="button">` by default
- `aria-disabled="true"` when disabled (not just HTML `disabled` — preserves focusability)
- `aria-busy="true"` when loading
- If rendered as link (`href` provided): renders `<a>` with proper `href`
- Focus ring always visible (never removed)

### Examples

```
Primary submit:
  variant="primary", label="Save Lead", type="submit"
  Loading: label="Saving...", isLoading=true

Secondary cancel:
  variant="secondary", label="Cancel", onClick={router.back}

Danger delete:
  variant="danger", label="Delete Lead", icon="Trash2"

Ghost navigation:
  variant="ghost", label="View All →", href="/leads"

Full-width on mobile:
  variant="primary", label="Create Account", fullWidth=true, type="submit"
```

---

## C-07: IconButton

### Purpose
A compact button that displays only an icon with no visible label. Used for space-constrained actions like table row controls, modal close buttons, sidebar toggles, and tag removal.

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `icon` | IconName | ✅ | Lucide icon to display |
| `ariaLabel` | string | ✅ | Accessible label (required — no visible text) |
| `variant` | `default \| danger \| ghost` | — | Visual style (default: `default`) |
| `size` | `sm \| md` | — | Size (default: `md`) |
| `isLoading` | boolean | — | Spinner replaces icon |
| `isDisabled` | boolean | — | Disables interaction |
| `onClick` | function | — | Click handler |
| `tooltip` | string | — | Tooltip text on hover (if different from ariaLabel) |

### States
Same as Button (Default, Hover, Focus, Active, Loading, Disabled).

### Variants

| Variant | Background | Icon Color | Use Case |
|---------|-----------|-----------|---------|
| `default` | Translucent on hover | `text.secondary` | Generic actions |
| `danger` | Red on hover | `text.danger` on hover | Delete actions |
| `ghost` | None | Muted | Sidebar toggle, close modal |

### Reusability
- Modal close button (top-right `×`)
- Sidebar collapse toggle
- Table row: Edit, Delete icons (shown on hover)
- Tag pill: remove `×` button
- Notification item: dismiss `×`
- Topbar: ⌘K icon trigger

### Accessibility
- `aria-label` is **required** — there is no visible text
- If `tooltip` is provided, use `title` attribute AND a `Tooltip` component
- Same keyboard behavior as Button
- Minimum 44×44px touch target even if visual size is smaller

### Examples

```
Close modal:
  icon="X", ariaLabel="Close modal", variant="ghost"

Delete row (hover-visible):
  icon="Trash2", ariaLabel="Delete lead", variant="danger"

Remove tag:
  icon="X", ariaLabel="Remove tag VIP", size="sm"

Collapse sidebar:
  icon="ChevronLeft", ariaLabel="Collapse navigation", variant="ghost"
```

---

## C-08: Badge

### Purpose
A small, compact label used to communicate metadata, counts, or short categorical values. Not to be confused with `StatusBadge` (which is context-specific) — this is the generic base badge.

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `label` | string | ✅ | Badge text |
| `variant` | `default \| success \| warning \| danger \| info \| neutral` | — | Color variant |
| `size` | `sm \| md` | — | Size (default: `md`) |
| `dot` | boolean | — | Shows a colored dot before the label |
| `icon` | IconName | — | Optional icon before label |
| `onRemove` | function | — | If provided, shows a remove `×` button |

### States

| State | Description |
|-------|-------------|
| **Default** | Static display |
| **With remove** | `×` button appears; hover highlights it |

### Variants

| Variant | Text Color | Background | Border |
|---------|-----------|-----------|--------|
| `success` | `#34D399` | `rgba(52,211,153,0.10)` | `rgba(52,211,153,0.20)` |
| `warning` | `#FBBF24` | `rgba(251,191,36,0.10)` | `rgba(251,191,36,0.20)` |
| `danger` | `#F87171` | `rgba(239,68,68,0.10)` | `rgba(239,68,68,0.20)` |
| `info` | `#60A5FA` | `rgba(96,165,250,0.10)` | `rgba(96,165,250,0.20)` |
| `neutral` | `#94A3B8` | `rgba(148,163,184,0.10)` | `rgba(148,163,184,0.20)` |
| `default` | `#A78BFA` | `rgba(167,139,250,0.10)` | `rgba(167,139,250,0.20)` |

### Reusability
- Notification count on bell icon
- Sidebar nav badge (lead count)
- AI feature labels
- Onboarding step indicators

### Accessibility
- `role="status"` if the badge content updates dynamically (e.g., notification count)
- If purely decorative/informational: no ARIA role needed

### Examples

```
Unread count:
  label="3", variant="danger"

Nav badge:
  label="142", variant="neutral"

New feature label:
  label="NEW", variant="info", size="sm"

Tag with remove:
  label="VIP", variant="default", onRemove={() => removeTag("VIP")}
```

---

## C-09: Avatar

### Purpose
A circular visual representation of a user or entity. Displays initials with a gradient background when no image is available.

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `initials` | string | ✅ | 1–2 character initials (e.g., "JD" for John Doe) |
| `size` | `xs \| sm \| md \| lg` | — | Size (default: `md`) |
| `gradient` | `blue \| purple \| green \| orange \| amber \| red` | — | Background gradient color |
| `imageUrl` | string | — | Optional photo URL — shown instead of initials |
| `alt` | string | — | Alt text for image (required when imageUrl is provided) |

### States

| State | Description |
|-------|-------------|
| **Initials** | Default — shows letter(s) on gradient background |
| **Image** | Shows user photo |
| **Image Error** | Falls back to initials if image fails to load |

### Variants
Controlled via `size` and `gradient` props.

| Size | Dimensions |
|------|-----------|
| `xs` | 24px × 24px |
| `sm` | 32px × 32px |
| `md` | 40px × 40px |
| `lg` | 64px × 64px |

### Reusability
- User menu button in topbar
- Activity feed items (user who created note/task)
- Team member list
- Lead profile page (lead avatar)
- AI Insights top leads
- Task assignee

### Accessibility
- If image: `<img alt="{person name}">` with descriptive alt
- If initials: `aria-label="{person name}"` on the container

### Examples

```
Lead with initials:
  initials="JD", size="md", gradient="blue"
  → Shows "JD" on blue gradient circle

User in topbar:
  initials="AJ", size="sm", gradient="purple"

Lead with photo:
  imageUrl="https://...", alt="John Doe", size="md"
```

---

## C-10: Spinner

### Purpose
An animated circular loading indicator used inline within buttons, panels, and full-screen loading overlays.

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `size` | `sm \| md \| lg` | — | Spinner size (default: `md`) |
| `color` | `white \| accent \| muted` | — | Color (default: `accent`) |
| `label` | string | — | Screen-reader text (default: "Loading") |

### States
Single animated state (spinning).

### Variants

| Size | Dimensions | Use Case |
|------|-----------|---------|
| `sm` | 16px | Inside buttons |
| `md` | 24px | Inside cards, inline loading |
| `lg` | 40px | Full-page loading |

### Reusability
- Button loading state (always `sm`, `white`)
- Inline data fetch waiting
- AI generation waiting (with text below)
- Full-page initial load (before AppShell data)

### Accessibility
- `role="status"` on container
- `aria-label="{label}"` (default "Loading")
- Spinner SVG: `aria-hidden="true"` (decorative)

---

## C-11: Skeleton

### Purpose
Placeholder shimmer blocks that approximate the shape of content while it loads. Prevents layout shift and communicates that content is coming.

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `width` | string | — | CSS width (e.g., `"60%"`, `"120px"`) |
| `height` | string | — | CSS height (e.g., `"16px"`, `"40px"`) |
| `borderRadius` | string | — | CSS border-radius (e.g., `"4px"`, `"9999px"` for circle) |
| `animate` | boolean | — | Enable shimmer animation (default: `true`) |

### States
Single shimmer-animated state. Can be static (no animation) if `animate=false`.

### Variants

| Variant | Shape | Use Case |
|---------|-------|---------|
| `text` | Short wide rect | Single line of text |
| `title` | Wider rect | Heading text |
| `paragraph` | Multiple stacked text skeletons | Body text block |
| `circle` | Round (equal width/height, `border-radius: 9999px`) | Avatar, score badge |
| `badge` | Pill shape | Status badge placeholder |
| `card` | Full card-shaped block | Entire widget placeholder |
| `button` | Rounded rect | Button placeholder |

### Reusability
Used in every data-dependent component's loading state:
- Metric cards
- Table rows
- Activity feed items
- Lead summary rows
- Campaign rows
- AI insights section

### Accessibility
- Container has `aria-label="Loading..."` and `aria-busy="true"`
- Individual skeleton elements are `aria-hidden="true"`

### Examples

```
Name cell loading:
  <Skeleton width="60%" height="16px" /> (name line)
  <Skeleton width="80%" height="13px" /> (email line)

Score badge loading:
  <Skeleton width="32px" height="32px" borderRadius="9999px" />

Metric card loading:
  <Skeleton width="50%" height="14px" />  (label)
  <Skeleton width="70%" height="40px" />  (value)
```

---

## C-12: Divider

### Purpose
A thin horizontal or vertical line used to separate content sections within a card or form.

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `orientation` | `horizontal \| vertical` | — | Direction (default: `horizontal`) |
| `spacing` | `sm \| md \| lg` | — | Margin above and below (default: `md`) |

### Reusability
- Form card action area separator
- Widget card header bottom border
- User menu section dividers
- Settings page section separators

### Accessibility
- Rendered as `<hr>` with `aria-hidden="true"` (decorative separator)

---

## C-13: Tooltip

### Purpose
A small floating label that appears on hover (desktop) or long-press (mobile) to reveal the name or purpose of an icon-only element or truncated text.

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `content` | string | ✅ | Tooltip text |
| `position` | `top \| bottom \| left \| right` | — | Position relative to trigger (default: `top`) |
| `children` | ReactNode | ✅ | The element that triggers the tooltip |
| `delay` | number | — | Delay in ms before tooltip appears (default: `400`) |

### States

| State | Description |
|-------|-------------|
| **Hidden** | Default — tooltip not visible |
| **Visible** | Shown after hover delay |
| **Mobile** | No hover; shown on long-press (optional) |

### Reusability
- Collapsed sidebar nav items (icon → "Leads" tooltip)
- Icon-only buttons
- Truncated text cells in tables
- Score badges (shows "AI Score: 92" on hover)

### Accessibility
- Tooltip content linked to trigger via `aria-describedby`
- Tooltip `role="tooltip"`
- Tooltip has unique `id` matching the `aria-describedby`
- Dismissible with `Escape` key

---

## C-14: ProgressBar

### Purpose
A horizontal filled bar showing completion percentage. Used in campaign progress, onboarding checklist, and segment match previews.

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `value` | number | ✅ | Current value |
| `max` | number | ✅ | Maximum value |
| `color` | `brand \| green \| amber \| red \| blue` | — | Fill color (default: `brand`) |
| `size` | `sm \| md` | — | Bar height (default: `md`) |
| `showLabel` | boolean | — | Show "X/Y" or "X%" label beside bar |
| `labelFormat` | `fraction \| percent` | — | Label format (default: `fraction`) |
| `animate` | boolean | — | Animate fill on mount (default: `true`) |

### States

| State | Description |
|-------|-------------|
| **0%** | Empty bar (unfilled track only) |
| **Partial** | Filled to proportional width |
| **100%** | Fully filled |
| **Animated** | Bar grows from 0 to value on mount |

### Variants
Controlled by `color` and `size` props.

| Size | Height |
|------|--------|
| `sm` | `4px` |
| `md` | `8px` |

### Reusability
- Campaign card: "42/60 leads" progress
- Onboarding checklist: "3/4 steps complete — 75%"
- Segment Builder: lead count preview bar
- AI Lead Scoring: score breakdown bar

### Accessibility
- `role="progressbar"`
- `aria-valuenow="{value}"`
- `aria-valuemin="0"`
- `aria-valuemax="{max}"`
- `aria-label="{description}"` (e.g., "Campaign progress: 42 of 60 leads processed")

---

---

# FORM COMPONENTS

---

## C-15: Input

### Purpose
The standard text input for all forms in the application. Handles text, email, password, URL, number, and search input types.

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | ✅ | Unique ID linking to its `<label>` |
| `type` | string | — | HTML input type (default: `text`) |
| `placeholder` | string | — | Placeholder text |
| `value` | string | ✅ | Controlled value |
| `onChange` | function | ✅ | Change handler |
| `label` | string | — | Label text (renders above input) |
| `helperText` | string | — | Helper text below input |
| `error` | string | — | Error message (replaces helperText when set) |
| `prefixIcon` | IconName | — | Icon displayed inside left of input |
| `suffixIcon` | IconName | — | Icon or element inside right of input |
| `isDisabled` | boolean | — | Disables input |
| `isRequired` | boolean | — | Adds required indicator to label |
| `autoFocus` | boolean | — | Auto-focuses on mount |
| `maxLength` | number | — | Character limit |

### States
Default → Hover → Focus → Filled → Error → Disabled (see DESIGN_SYSTEM.md §8.2)

### Variants

| Variant | Type prop | Behavior |
|---------|-----------|---------|
| Text | `type="text"` | Standard single line |
| Email | `type="email"` | Email keyboard on mobile |
| Password | `type="password"` | Hidden characters + show/hide toggle |
| URL | `type="url"` | URL keyboard hint on mobile |
| Number | `type="number"` | Numeric keyboard on mobile |
| Search | `type="search"` | Search icon prefix, clear button |

### Reusability
Every form in the application:
- Login, Register
- Add Lead / Edit Lead
- Campaign Builder
- Sequence Builder
- Add Task modal
- Settings forms

### Accessibility
- `<label for="{id}">` always paired with input `id`
- `aria-required="true"` when `isRequired`
- `aria-invalid="true"` when `error` is set
- `aria-describedby="{id}-error"` when error present
- `aria-describedby="{id}-helper"` when helperText present

---

## C-16: Textarea

### Purpose
Multi-line text input for notes, prompt templates, descriptions, and long-form content.

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | ✅ | Unique ID |
| `value` | string | ✅ | Controlled value |
| `onChange` | function | ✅ | Change handler |
| `label` | string | — | Label text |
| `placeholder` | string | — | Placeholder text |
| `rows` | number | — | Initial visible row count (default: `4`) |
| `maxLength` | number | — | Character limit |
| `showCharCount` | boolean | — | Shows "X / Y characters" below textarea |
| `error` | string | — | Error message |
| `isDisabled` | boolean | — | Disables textarea |
| `resize` | `none \| vertical \| both` | — | CSS resize behavior (default: `vertical`) |

### States
Same as Input.

### Reusability
- Add Note form (activity timeline)
- Prompt Template editor
- Task description field
- Campaign description
- Settings forms

### Accessibility
Same as Input.

---

## C-17: Select

### Purpose
A styled dropdown for selecting one value from a predefined list. Replaces the default browser `<select>` with a custom panel that matches the design system.

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | ✅ | Unique ID |
| `label` | string | — | Label text |
| `value` | string | ✅ | Currently selected value |
| `onChange` | function | ✅ | Selection handler |
| `options` | Option[] | ✅ | Array of `{ value, label, icon? }` |
| `placeholder` | string | — | Shown when no value selected |
| `error` | string | — | Error message |
| `isDisabled` | boolean | — | Disables select |
| `isLoading` | boolean | — | Shows spinner; disables interaction |
| `isRequired` | boolean | — | Adds required marker to label |

### States

| State | Description |
|-------|-------------|
| **Closed** | Shows selected value or placeholder |
| **Open** | Dropdown panel visible, options listed |
| **Loading** | Spinner inside trigger, options not yet available |
| **Option Hover** | Highlighted background on hovered option |
| **Option Selected** | Checkmark indicator on selected option |
| **Error** | Error border + message |
| **Disabled** | Greyed out, no interaction |

### Variants
None — single variant.

### Reusability
- Lead status selector
- Campaign audience (Segment) selector
- Sequence selector in campaign builder
- Prompt template selector
- Task type selector
- Role selector in team invite
- Time range selector in charts

### Accessibility
- `role="combobox"` on trigger
- `aria-expanded` on trigger
- `aria-haspopup="listbox"` on trigger
- Option list: `role="listbox"`
- Each option: `role="option"` + `aria-selected`
- Keyboard: `↑↓` navigate options, `Enter` selects, `Escape` closes

---

## C-18: Toggle

### Purpose
An on/off switch for boolean settings. Visually communicates enabled/disabled state through position and color.

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | ✅ | Unique ID |
| `checked` | boolean | ✅ | Current on/off state |
| `onChange` | function | ✅ | Toggle handler |
| `label` | string | — | Label text |
| `description` | string | — | Optional description below label |
| `isDisabled` | boolean | — | Disables toggle |

### States
Checked (ON) / Unchecked (OFF) / Disabled.

### Reusability
- Sequence builder: "Stop on Reply" toggle
- Settings: notification preferences
- Email account: set as default

### Accessibility
- Renders as `<button role="switch">` (not `<input type="checkbox">`)
- `aria-checked="true/false"` dynamically updated
- `aria-labelledby` linking to label

---

## C-19: Checkbox

### Purpose
A boolean selection element for single-field yes/no choices, multi-select lists, and table row selection.

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | ✅ | Unique ID |
| `checked` | boolean | ✅ | Current state |
| `onChange` | function | ✅ | Change handler |
| `label` | string | — | Label text |
| `isDisabled` | boolean | — | Disables checkbox |
| `isIndeterminate` | boolean | — | Shows indeterminate dash (for "select all" with partial selection) |

### Reusability
- Task list: mark task complete
- Multi-select table rows (future bulk actions)
- Agreement checkboxes (terms, future)

### Accessibility
- `<input type="checkbox">` with paired `<label>`
- `aria-checked="mixed"` when `isIndeterminate=true`

---

## C-20: RadioGroup

### Purpose
A group of mutually exclusive options where only one can be selected at a time.

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `name` | string | ✅ | Group name (used for HTML grouping) |
| `value` | string | ✅ | Currently selected value |
| `onChange` | function | ✅ | Selection handler |
| `options` | RadioOption[] | ✅ | Array of `{ value, label, description? }` |
| `orientation` | `horizontal \| vertical` | — | Layout (default: `vertical`) |
| `label` | string | — | Group label |

### Reusability
- Campaign Builder Step 5 (Schedule): "Start Now" vs. "Schedule for later"
- Settings: appearance (Dark / Light)
- Future: billing plan selection

### Accessibility
- Wrapped in `<fieldset>` with `<legend>` (the group label)
- Each option: `<input type="radio">` with `<label>`
- `role="radiogroup"` on container

---

## C-21: FormGroup

### Purpose
A wrapper that combines a label, input/control, helper text, and error message into a single cohesive unit. Enforces consistent spacing between all form elements.

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `children` | ReactNode | ✅ | The input/control element |
| `label` | string | — | Label text |
| `htmlFor` | string | — | ID of the child input (for label association) |
| `helperText` | string | — | Helper text below the input |
| `error` | string | — | Error message (overrides helperText) |
| `isRequired` | boolean | — | Shows * on label |

### Reusability
Wraps every individual input in every form.

---

## C-22: FormRow

### Purpose
A two-column flex container for placing two form fields side by side on desktop, collapsing to single column on mobile.

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `children` | ReactNode | ✅ | Two `FormGroup` components |
| `gap` | string | — | Gap between columns (default: `space.6`) |

### Reusability
- Register: First Name + Last Name
- Add Lead: First Name + Last Name, Job Title + Company
- Settings Profile: First Name + Last Name

---

---

# FEEDBACK COMPONENTS

---

## C-23: AlertBanner

### Purpose
An inline message banner inside a form or content area communicating success, error, warning, or informational messages. Not a floating toast — it is anchored within the page or card.

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `type` | `error \| warning \| success \| info` | ✅ | Visual type |
| `title` | string | — | Bold headline of the alert |
| `message` | string | ✅ | Full alert text |
| `action` | ActionProps | — | Optional `{ label, onClick }` button inside banner |
| `onDismiss` | function | — | If provided, shows × dismiss button |
| `animate` | boolean | — | Fade+slide in on mount (default: `true`) |

### States

| State | Description |
|-------|-------------|
| **Visible** | Banner shown, may animate in |
| **Dismissed** | Banner fades out, then unmounts |

### Variants
Controlled by `type` prop. See DESIGN_SYSTEM.md §10.6 for color values.

### Reusability
- Login/Register: authentication error
- Any form: API submission failure
- Campaign Detail: campaign error
- Email Accounts: connection failure
- Import: partial failure summary

### Accessibility
- `role="alert"` — causes screen readers to announce automatically
- `aria-live="assertive"` for errors, `"polite"` for success/info

### Examples

```
Login error:
  type="error"
  message="Invalid email or password. Please try again."

Import partial success:
  type="warning"
  title="Import completed with errors"
  message="132 leads imported, 18 rows skipped."
  action={ label: "Download Error Log", onClick: downloadLog }
```

---

## C-24: Toast

### Purpose
A transient floating notification that appears at a fixed position (bottom-right) and auto-dismisses after a timeout. Used for system feedback on actions that don't require a response.

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `type` | `success \| error \| warning \| info` | ✅ | Toast type |
| `message` | string | ✅ | Toast message text |
| `duration` | number | — | Auto-dismiss delay in ms (default: `4000`) |
| `action` | ActionProps | — | Optional inline link/button |
| `onDismiss` | function | — | Called when dismissed (auto or manual) |

### States

| State | Description |
|-------|-------------|
| **Entering** | Slides in from right, fades in |
| **Visible** | Displayed with auto-dismiss progress bar |
| **Exiting** | Slides out right, fades out |

### Reusability
- "Lead created successfully"
- "Campaign paused"
- "Note saved"
- "Link copied to clipboard"
- "Session expired" (before redirect)

### Accessibility
- `role="status"` for non-critical toasts
- `role="alert"` for error toasts
- Dismiss button: `aria-label="Dismiss notification"`
- Not the only source of critical feedback — errors always also appear inline

---

## C-25: EmptyState

### Purpose
A full-panel placeholder shown when a section has no content yet. Guides the user toward the action that will populate it.

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `icon` | IconName | ✅ | Lucide icon to display |
| `title` | string | ✅ | Primary heading |
| `description` | string | ✅ | Supporting description |
| `primaryAction` | ActionProps | — | `{ label, onClick/href }` — main CTA |
| `secondaryAction` | ActionProps | — | Optional secondary link/button |

### States
Single visual state (no loading/error — empty IS the state).

### Reusability
Used in every list, table, and panel that can have zero items. See full definitions in IA.md §13 and SCREENS.md individual screen entries.

### Accessibility
- Heading rendered as `<h3>` or `<h2>` depending on context
- Icon: `aria-hidden="true"` (decorative)

---

## C-26: ErrorState

### Purpose
A full-panel state displayed when a data fetch or operation fails at the page or section level. Distinct from `AlertBanner` (which is inline) and `Toast` (which is transient).

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `type` | `network \| notFound \| accessDenied \| server` | ✅ | Error category |
| `title` | string | — | Custom title (overrides type default) |
| `description` | string | — | Custom description |
| `onRetry` | function | — | If provided, shows [↻ Retry] button |
| `backHref` | string | — | URL for back navigation |

### States
Single visual state per type.

### Reusability
- Page-level: 404, 403, 500 screens
- Section-level: table failed to load, widget failed to load
- API error on action (launch campaign fails)

---

---

# DATA DISPLAY COMPONENTS

---

## C-27: MetricCard

### Purpose
A single KPI card displaying a key business metric with a label, large value, optional trend indicator, and icon.

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `label` | string | ✅ | Metric name (e.g., "Total Leads") |
| `value` | string \| number | ✅ | The metric value |
| `suffix` | string | — | Appended after value (e.g., "%") |
| `icon` | IconName | — | Lucide icon in top-right corner |
| `gradient` | `blue \| purple \| green \| orange \| red \| amber` | — | Value text gradient |
| `trend` | TrendProps | — | `{ value, direction: 'up'|'down', label }` |
| `isLoading` | boolean | — | Shows skeleton instead of content |
| `onClick` | function | — | Makes card interactive (hover lift) |
| `href` | string | — | Makes card a link (hover lift) |

### States

| State | Description |
|-------|-------------|
| **Loading** | Two skeleton blocks (label + value) |
| **Loaded** | Full content rendered |
| **Hover (if interactive)** | Lift + glow + border brightens |

### Reusability
Dashboard Row 1: Total Leads, Emails Sent, Open Rate, Reply Rate

### Accessibility
- Non-interactive: `<article>` or `<div>`
- Interactive: `<a>` or `<button>` wrapping content
- `aria-label="{label}: {value}"` on interactive cards

---

## C-28: DataTable

### Purpose
A glass-styled data table with a header row and data rows. The backbone of all list screens (leads, campaigns, sequences, tasks).

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `columns` | Column[] | ✅ | Column definitions |
| `rows` | RowData[] | ✅ | Data rows |
| `isLoading` | boolean | — | Shows skeleton rows |
| `emptyState` | EmptyStateProps | — | Config for empty state |
| `onRowClick` | function | — | Row click handler (makes rows interactive) |
| `skeletonRowCount` | number | — | Number of skeleton rows (default: `5`) |

**Column definition:**

| Field | Type | Description |
|-------|------|-------------|
| `key` | string | Data key |
| `label` | string | Column header text |
| `width` | string | CSS width (e.g., `"2fr"`, `"120px"`) |
| `align` | `left \| right \| center` | Text alignment |
| `render` | function | Custom cell renderer |

### States

| State | Description |
|-------|-------------|
| **Loading** | Skeleton rows |
| **Populated** | Data rows rendered |
| **Empty** | EmptyState displayed |
| **Error** | ErrorState displayed |
| **Interactive rows** | Row hover highlight + cursor pointer |

### Reusability
- Leads List (S-06)
- Campaign List (S-11)
- Sequence List (S-14)
- Task List (S-18)
- Campaign Detail lead-by-lead table (S-13)
- Team Management (S-29)
- Prompt Templates (S-30)

### Accessibility
- `<table>` with `<thead>`, `<tbody>`
- `<th scope="col">` on each column header
- `<tr>` rows: if clickable, `tabIndex="0"`, `role="row"`, `onKeyDown` handles `Enter`
- `aria-busy="true"` on tbody when loading

---

## C-29: TableRow

### Purpose
An individual row within a `DataTable`. Handles hover state, click behavior, and renders cells according to column definitions.

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `data` | RowData | ✅ | Row data object |
| `columns` | Column[] | ✅ | Column definitions (to know what to render per cell) |
| `onClick` | function | — | Row click handler |
| `isClickable` | boolean | — | Enables hover highlight and pointer cursor |

### States
Default / Hover / Focus (keyboard).

---

## C-30: StatusBadge

### Purpose
A pill-shaped badge specifically for entity status values (Lead Status, Campaign Status, Task Status). Uses the predefined Status Color Map from the Design System.

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `status` | string | ✅ | Status value (e.g., "Active", "New", "Completed") |

### States
Single visual state per status string.

### Reusability
- Lead list and detail (lead status)
- Campaign list and detail (campaign status)
- Task list (task status)
- CRM Pipeline deal status

### Accessibility
- Color is not the only differentiator — always includes text label
- No ARIA role needed for static display; `role="status"` if it updates live

---

## C-31: ScoreBadge

### Purpose
A circular badge displaying a numeric AI score (0–100) with a gradient fill color communicating quality tier.

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `score` | number \| null | ✅ | Score value; null shows "–" |
| `size` | `sm \| md` | — | Size (default: `md`) |
| `showTooltip` | boolean | — | Shows "AI Score: {n}" on hover |

### States

| State | Appearance |
|-------|-----------|
| High (80–100) | Green gradient |
| Medium (50–79) | Amber gradient |
| Low (0–49) | Red gradient |
| No score (null) | Neutral grey, "–" |

### Reusability
- Lead list table (Score column)
- Lead detail header
- AI Insights top leads list
- Lead Summary widget (Top Leads section)

### Accessibility
- `aria-label="AI Score: {score}"` or `"AI Score: not yet scored"`
- Visual gradient is supplementary — score number is always present as text

---

## C-32: TagPill

### Purpose
A compact removable or read-only tag/label attached to a lead or entity.

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `label` | string | ✅ | Tag text |
| `onRemove` | function | — | If provided, shows × remove button |
| `isReadOnly` | boolean | — | Removes hover effects (default: `false`) |
| `color` | string | — | Custom background color (default: brand violet) |

### States
Default / Hover (remove button highlights) / Read-only.

### Reusability
- Lead detail header (tag list)
- Lead list (tag column, future)
- Segment filter rules (active filters as pills)
- CSV column mapping (mapped fields as pills)

### Accessibility
- Remove button: `aria-label="Remove tag {label}"`
- Container: no role needed (informational)

---

## C-33: ActivityItem

### Purpose
A single entry in an activity timeline. Displays an event icon, description, linked entities, and relative timestamp.

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `type` | ActivityType | ✅ | Event type (determines icon + color) |
| `description` | string | ✅ | Human-readable event description |
| `timestamp` | Date | ✅ | When the event occurred |
| `leadName` | string | — | Linked lead name (if applicable) |
| `leadHref` | string | — | Link to lead detail |
| `campaignName` | string | — | Linked campaign name (if applicable) |
| `campaignHref` | string | — | Link to campaign detail |

### States
Default / Hover (linked entities highlight).

### Reusability
- Dashboard: Recent Activities widget
- Lead Detail: Activity Timeline tab
- Notification Center: per-notification item

### Accessibility
- `<li>` element within `<ul>` activity list
- Linked entities: `<a>` with descriptive text
- Timestamp: `<time datetime="{ISO string}">` with relative display

---

## C-34: ActivityFeed

### Purpose
A scrollable list of `ActivityItem` components forming a chronological event timeline. Handles loading, empty, and paginated states.

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `items` | ActivityItem[] | ✅ | Activity events |
| `isLoading` | boolean | — | Shows skeleton rows |
| `hasMore` | boolean | — | Whether more items exist (shows "Load More") |
| `onLoadMore` | function | — | Fetches next page of activities |

### States
Loading / Populated / Empty / Load-more available.

### Reusability
- Dashboard Recent Activities widget
- Lead Detail activity timeline (S-08)

---

---

# CARD COMPONENTS

---

## C-35: WidgetCard

### Purpose
The standard glass card container used for all dashboard widgets and content panels. Provides consistent padding, border, blur, and header structure.

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `title` | string | — | Widget section title |
| `action` | ActionProps | — | Optional header action link (`{ label, href/onClick }`) |
| `children` | ReactNode | ✅ | Widget content |
| `isLoading` | boolean | — | Passes loading state down to content |
| `noPadding` | boolean | — | Removes body padding (for full-bleed content like tables) |

### States
Default / Loading (content slots show skeletons).

### Reusability
Every widget on the Dashboard:
- Metric Cards row container
- Lead Summary
- Campaign Summary
- Performance Chart
- Recent Activities
- AI Insights
- Quick Actions

Also used in Settings panels and CRM section containers.

---

## C-36: FormCard

### Purpose
A glass card specifically designed for forms. Slightly more opaque and blurred than WidgetCard to optimize text readability in input-heavy contexts.

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `children` | ReactNode | ✅ | Form content |
| `maxWidth` | string | — | Max card width (default: `"480px"`) |
| `title` | string | — | Heading inside the card |
| `subtitle` | string | — | Sub-heading below title |

### Reusability
- Login page (S-01)
- Register page (S-02)
- Add Lead form (S-07)
- Edit Lead form (S-09)
- New Campaign wizard card (S-12)
- Settings forms (S-27 through S-31)

---

## C-37: CampaignCard

### Purpose
A summary card representing a single campaign in the Campaign Summary widget and Campaign List. Shows name, status, audience, and a progress bar.

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | ✅ | Campaign ID (for navigation) |
| `name` | string | ✅ | Campaign name |
| `status` | CampaignStatus | ✅ | Current status |
| `totalLeads` | number | ✅ | Total leads in campaign |
| `completedLeads` | number | ✅ | Leads that have completed the sequence |
| `openRate` | number | — | Open rate percentage |
| `replyRate` | number | — | Reply rate percentage |
| `onClick` | function | — | Click handler (navigate to campaign detail) |

### States
Default / Hover (lift, border brightens).

### Reusability
- Dashboard Campaign Summary widget
- Campaign List page (S-11)

---

## C-38: LeadCard

### Purpose
A summary card for a single lead, showing name, company, score, and status. Used in the Lead Summary widget's "Top Leads" section and the AI Insights widget.

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | ✅ | Lead ID |
| `firstName` | string | ✅ | First name |
| `lastName` | string | ✅ | Last name |
| `company` | string | — | Company name |
| `score` | number \| null | — | AI score |
| `status` | string | ✅ | Lead status |
| `engagementHint` | string | — | Short line: "Opened last email", "Ready for follow-up" |
| `onClick` | function | — | Navigate to lead detail |

### Reusability
- Dashboard Lead Summary widget (Top Leads section)
- Dashboard AI Insights widget
- Command Palette search results

---

## C-39: QuickActionButton

### Purpose
A full-width interactive row button in the Quick Actions widget. Shows an icon, label, and a right-facing chevron. Navigates or triggers an action on click.

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `icon` | IconName | ✅ | Lucide icon |
| `iconColor` | string | — | Icon accent color |
| `label` | string | ✅ | Button label |
| `href` | string | — | Navigation destination |
| `onClick` | function | — | Click handler |

### States
Default / Hover (background lightens, label slides right 3px).

### Reusability
Dashboard Quick Actions widget exclusively.

---

---

# NAVIGATION COMPONENTS

---

## C-40: SidebarNavItem

### Purpose
A single clickable navigation entry in the sidebar. Handles active state, hover, icons, badges, and collapsible sub-items.

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `label` | string | ✅ | Display label |
| `icon` | IconName | ✅ | Lucide icon |
| `href` | string | ✅ | Navigation route |
| `isActive` | boolean | ✅ | Whether this item matches current route |
| `badge` | number | — | Count badge |
| `subItems` | SubNavItem[] | — | Nested items |
| `isCollapsed` | boolean | ✅ | Whether sidebar is in collapsed mode |

### States
Default / Hover / Active / Active+SubItems open.

### Accessibility
- `<a aria-current="page">` when active
- `aria-expanded` on items with sub-menus
- Sub-items in `<ul>` with `aria-label="{parent} submenu"`

---

## C-41: BreadcrumbItem

### Purpose
A single segment within the Breadcrumb component. Renders as a link or plain text depending on whether it represents the current page.

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `label` | string | ✅ | Segment text |
| `href` | string | — | If null or omitted, renders as current page text |
| `isLast` | boolean | — | Hides separator after this item |

---

## C-42: TabBar

### Purpose
A horizontal set of tabs for filtering or switching views within a section.

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `tabs` | Tab[] | ✅ | Array of `{ label, value, count? }` |
| `activeTab` | string | ✅ | Currently active tab value |
| `onChange` | function | ✅ | Tab change handler |
| `variant` | `pills \| underline` | — | Visual style (default: `pills`) |

### States
Default / Active tab / Hover.

### Reusability
- Campaign List: status filter tabs (All / Active / Draft / Paused / Completed)
- Lead Detail: tabs (Overview / Activity / Tasks)
- Settings: sub-section navigation

### Accessibility
- `role="tablist"` on container
- Each tab: `role="tab"` + `aria-selected` + `aria-controls="{panel-id}"`
- Tab panels: `role="tabpanel"` + `aria-labelledby="{tab-id}"`

---

## C-43: BottomNavBar

### Purpose
The mobile-only bottom navigation bar. Replaces the sidebar at small screen widths with 5 icon+label tabs at the bottom of the viewport.

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `items` | NavItem[] | ✅ | Max 5 navigation items |
| `currentPath` | string | ✅ | Active route for active state detection |

### States
Default / Active tab (indigo gradient icon + colored label).

### Reusability
Mobile-only, used inside AppShell, replaces Sidebar below `768px`.

### Accessibility
- `<nav aria-label="Mobile navigation">`
- `aria-current="page"` on active tab

---

---

# OVERLAY COMPONENTS

---

## C-44: Modal

### Purpose
A centered floating dialog for confirmations, add-forms, and focused tasks. Overlays the page with a dark backdrop. Traps focus while open.

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `isOpen` | boolean | ✅ | Controls visibility |
| `onClose` | function | ✅ | Called on backdrop click or Escape key |
| `title` | string | — | Modal heading |
| `description` | string | — | Modal subheading |
| `children` | ReactNode | ✅ | Modal body content |
| `footer` | ReactNode | — | Action buttons at bottom |
| `size` | `sm \| md \| lg` | — | Modal width (default: `md`) |
| `preventClose` | boolean | — | Disables backdrop/Escape closing |

### States
Closed / Entering (fade + scale in) / Open / Closing (fade + scale out).

| Size | Width |
|------|-------|
| `sm` | `400px` |
| `md` | `520px` |
| `lg` | `640px` |

### Reusability
- Campaign pause/stop confirmation
- Add Task
- Invite Team Member
- Delete confirmation dialogs
- Create Organization

### Accessibility
- `role="dialog"` + `aria-modal="true"`
- `aria-labelledby` → modal title ID
- `aria-describedby` → modal description ID
- Focus trap: Tab cycles only within modal
- On open: focus moves to first focusable element
- On close: focus returns to trigger element
- Backdrop click + Escape key close modal (unless `preventClose`)

---

## C-45: Drawer

### Purpose
A panel that slides in from the right (desktop) or bottom (mobile). Used for secondary content like the Notification Center that doesn't require full focus trapping.

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `isOpen` | boolean | ✅ | Controls visibility |
| `onClose` | function | ✅ | Called on Escape or backdrop click |
| `title` | string | — | Drawer heading |
| `children` | ReactNode | ✅ | Drawer content |
| `position` | `right \| bottom` | — | Slide direction (default: `right`) |
| `width` | string | — | Drawer width for right position (default: `380px`) |

### States
Closed / Entering (slide in) / Open / Closing (slide out).

### Reusability
- Notification Center (right drawer)
- Mobile: sidebar as bottom sheet

### Accessibility
- `role="complementary"` or `role="dialog"` depending on use
- Focus management same as Modal
- Escape key closes

---

## C-46: Dropdown

### Purpose
A small floating menu anchored to a trigger element. Used for user menu, org switcher, status change dropdowns, and action menus.

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `trigger` | ReactNode | ✅ | Element that opens the dropdown |
| `items` | DropdownItem[] | ✅ | Menu items |
| `align` | `left \| right` | — | Panel alignment to trigger (default: `right`) |
| `isOpen` | boolean | ✅ | Controlled open state |
| `onClose` | function | ✅ | Close handler |

**DropdownItem:**

| Field | Type | Description |
|-------|------|-------------|
| `label` | string | Item text |
| `icon` | IconName | Optional icon |
| `onClick` | function | Click handler |
| `href` | string | Navigation link |
| `variant` | `default \| danger` | Danger items styled red |
| `dividerAbove` | boolean | Adds separator above item |

### States
Closed / Open (panel visible) / Item hover.

### Reusability
- User Menu (C-50)
- Org Switcher dropdown (C-49)
- Table row action menu
- Status change picker

### Accessibility
- Trigger: `aria-haspopup="menu"` + `aria-expanded`
- Panel: `role="menu"`
- Items: `role="menuitem"` or `role="menuitemradio"` or `role="menuitemcheckbox"`
- Keyboard: `↑↓` navigate, `Enter` select, `Escape` close

---

## C-47: CommandPalette

### Purpose
A modal-style overlay triggered by `Ctrl/Cmd+K` that enables power-user keyboard navigation, quick actions, and global search from anywhere in the app.

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `isOpen` | boolean | ✅ | Controls visibility |
| `onClose` | function | ✅ | Close handler |
| `recentItems` | RecentItem[] | — | Last 5 visited entities |

### States

| State | Description |
|-------|-------------|
| **Empty query** | Shows Navigate To + Quick Actions + Recent |
| **Typing** | Filters all categories in real time |
| **No results** | Shows "No results for '{query}'" |
| **Loading results** | Spinner during search API call |

### Reusability
Used globally — one instance mounted at the app root, triggered from topbar or keyboard shortcut.

### Accessibility
- `role="dialog"` + `aria-modal="true"` + `aria-label="Command palette"`
- Search input: `aria-autocomplete="list"`
- Results: `role="listbox"` with `role="option"` items
- Active item: `aria-selected="true"`
- Keyboard: `↑↓` navigate options, `Enter` activate, `Escape` close

---

---

# SPECIALIZED COMPONENTS

---

## C-48: NotificationCenter

### Purpose
The right-side drawer panel listing all recent notifications for the authenticated user. Handles grouping by date, read/unread state, and mark-all-read action.

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `isOpen` | boolean | ✅ | Controls drawer visibility |
| `onClose` | function | ✅ | Close handler |
| `notifications` | Notification[] | ✅ | List of notification objects |
| `isLoading` | boolean | — | Loading state |
| `onMarkAllRead` | function | ✅ | Marks all notifications as read |
| `onNotificationClick` | function | ✅ | Handles navigation + mark-read on click |
| `onLoadMore` | function | — | Fetches older notifications |

### States
Loading / Populated / Empty.

### Reusability
Single instance mounted at app root, opened via topbar bell icon.

---

## C-49: OrgSwitcher

### Purpose
A dropdown anchored to the organization name in the topbar that lets users switch between multiple organizations or create a new one.

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `currentOrg` | Org | ✅ | The active organization |
| `organizations` | Org[] | ✅ | All orgs the user belongs to |
| `onSwitch` | function | ✅ | Called with new org ID on selection |
| `onCreateNew` | function | ✅ | Navigates to create-org flow |
| `onJoinWithCode` | function | ✅ | Opens join-by-code modal |

### States
Closed / Open (dropdown panel visible).

---

## C-50: UserMenu

### Purpose
A dropdown anchored to the user avatar in the topbar. Provides access to profile, appearance toggle, settings, and sign-out.

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `userEmail` | string | ✅ | Displayed in menu header |
| `userFullName` | string | ✅ | Displayed in menu header |
| `userRole` | string | ✅ | Role label shown |
| `orgName` | string | ✅ | Current org name |
| `onLogout` | function | ✅ | Sign out handler |
| `onThemeToggle` | function | ✅ | Dark/Light mode toggle |
| `currentTheme` | `dark \| light` | ✅ | Current mode |

---

## C-51: OnboardingChecklist

### Purpose
A progress widget shown on the dashboard for new organizations. Tracks completion of the 4 onboarding steps and disappears once all are complete.

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `steps` | OnboardingStep[] | ✅ | Array of `{ label, isComplete, href }` |
| `onDismiss` | function | — | Optional early dismiss |

### States
Active (some steps incomplete) / Complete (all done — component unmounts).

### Reusability
Used only within the Quick Actions widget on the Dashboard.

---

## C-52: SearchBar

### Purpose
The global search input in the topbar. Displays search results in a floating panel below the input. Works together with the CommandPalette (Cmd+K opens the palette; search bar also activates it).

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `value` | string | ✅ | Controlled search query |
| `onChange` | function | ✅ | Query change handler |
| `results` | SearchResults | — | Grouped search results |
| `isLoading` | boolean | — | Shows spinner during API call |
| `onResultClick` | function | ✅ | Navigates to clicked entity |
| `onClose` | function | ✅ | Closes results panel |

### States
Collapsed (icon-only on mobile) / Focused (input active) / Results visible / No results.

---

## C-53: ProtectedRoute

### Purpose
A higher-order component that wraps any page requiring authentication. Checks for a valid JWT token and redirects to `/login` if absent or expired.

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `children` | ReactNode | ✅ | The protected page content |
| `requiredRole` | UserRole | — | Minimum role required (renders 403 if not met) |

### States

| State | Description |
|-------|-------------|
| **Checking** | Briefly shows nothing (or a loader) while verifying token |
| **Authorized** | Renders `children` |
| **Unauthorized** | Redirects to `/login` |
| **Forbidden** | Renders `ErrorState` with `type="accessDenied"` |

### Reusability
Wraps every page component that is part of the authenticated application.

---

## C-54: StepWizard

### Purpose
A multi-step form container with a step progress indicator, step content area, and Back/Next navigation. Used for multi-step creation flows.

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `steps` | WizardStep[] | ✅ | Array of `{ label, content, isValid }` |
| `currentStep` | number | ✅ | Zero-indexed current step |
| `onNext` | function | ✅ | Advance to next step |
| `onBack` | function | ✅ | Return to previous step |
| `onComplete` | function | ✅ | Called on final step completion |
| `primaryActionLabel` | string | — | Final step submit button label |
| `isSubmitting` | boolean | — | Shows loading on final submit |

### States
Step N of M / Submitting final step.

### Reusability
- Campaign Builder (S-12) — 6 steps
- CSV Import Wizard (S-10) — 3 steps

### Accessibility
- Progress indicator: `role="list"` with each step as `role="listitem"`
- Current step: `aria-current="step"`
- Step content area: `aria-live="polite"` (announces step changes)

---

## C-55: KanbanBoard

### Purpose
A horizontally scrollable drag-and-drop board organized into stage columns. Used for the CRM Pipeline.

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `columns` | KanbanColumn[] | ✅ | Ordered stage columns |
| `onCardMove` | function | ✅ | Called with `(cardId, fromColumn, toColumn)` |
| `isLoading` | boolean | — | Shows skeleton cards |
| `emptyState` | EmptyStateProps | — | Shown when board has no deals |

### States
Default / Loading / Empty / Card being dragged / Drop target highlighted.

### Reusability
CRM Pipeline screen (S-17) only.

---

## C-56: KanbanCard

### Purpose
A draggable card within a KanbanBoard column representing a single deal or entity.

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `id` | string | ✅ | Deal ID |
| `title` | string | ✅ | Lead / deal name |
| `company` | string | — | Company name |
| `assigneeInitials` | string | — | Assignee avatar initials |
| `dueDate` | Date | — | Due date if set |
| `priority` | `low \| medium \| high` | — | Priority indicator |
| `onClick` | function | — | Navigate to deal detail |

### States
Default / Dragging (elevated, semi-transparent) / Drop zone hover.

---

## C-57: SequenceStepEditor

### Purpose
The visual step-building interface in the Sequence Builder. Renders a vertical list of EMAIL and WAIT step cards that can be added, deleted, and (future) reordered.

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `steps` | SequenceStep[] | ✅ | Current sequence steps |
| `onAddEmail` | function | ✅ | Add an EMAIL step |
| `onAddWait` | function | ✅ | Add a WAIT step |
| `onDeleteStep` | function | ✅ | Delete step by index |
| `onUpdateStep` | function | ✅ | Update a step's properties |
| `templateOptions` | Template[] | ✅ | Available prompt templates |

### States
Empty (no steps — shows "Add your first step") / Has steps.

### Reusability
Sequence Builder (S-15) and Sequence Detail edit mode (S-16).

---

## C-58: ChartWidget

### Purpose
A self-contained chart panel wrapping chart library output with the application's design system (glass card, themed colors, loading state, time range selector, and legend).

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `title` | string | ✅ | Widget heading |
| `type` | `line \| area \| bar \| donut` | ✅ | Chart type |
| `data` | ChartData | ✅ | Time-series or categorical data |
| `series` | Series[] | ✅ | Data series definitions (key, label, color) |
| `isLoading` | boolean | — | Shows skeleton placeholder |
| `timeRanges` | string[] | — | Tab labels for time range selector |
| `activeRange` | string | — | Currently selected range |
| `onRangeChange` | function | — | Range selection handler |
| `emptyState` | EmptyStateProps | — | Shown when data is all zeros |

### States
Loading / Populated / Empty (all zeros) / Error.

### Reusability
- Dashboard Performance Chart (Row 2 left)
- Campaign Detail analytics charts (future)
- Any future analytics screen charts

---

*Every UI element in the application must correspond to a component listed here. Before building a new element, check if a suitable component already exists and can be extended via props. Add a new entry when creating a genuinely new abstraction.*

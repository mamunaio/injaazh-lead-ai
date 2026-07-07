# Dashboard Wireframe Specification
> **Low-Fidelity 12-Column Grid Mapping**
> Aligned with `FINAL_DASHBOARD_SPEC.md`

## 1. Grid System Overview

The dashboard content area uses a standard **12-column grid**.
- **Max Width**: 1600px
- **Columns**: 12 equal-width columns (`1fr` each)
- **Gap (Gutter)**: 24px (Desktop/Laptop), 20px (Tablet), 16px (Mobile)

---

## 2. Desktop Layout (≥ 1280px)

The content area spans all 12 columns. 

### Visual Map

```text
Row 1 (120px)
[ 3 cols ] [ 3 cols ] [ 3 cols ] [ 3 cols ]
[ KPI 1  ] [ KPI 2  ] [ KPI 3  ] [ KPI 4  ]

Row 2 (280px)
[       8 cols      ] [      4 cols      ]
[ Performance Chart ] [ AI Insight Strip ]

Row 3 (320px)
[      6 cols       ] [      6 cols       ]
[   Lead Pipeline   ] [ Campaign Summary  ]

Row 4 (360px)
[       8 cols      ] [      4 cols      ]
[  Recent Activity  ] [  Quick Actions   ]
```

### Widget Sizing (Desktop)

| Widget | Width (Cols) | Height (px) | Hierarchy |
|--------|-------------|-------------|-----------|
| KPI: Today's Imports | 3 | 120 | Primary (Scannable) |
| KPI: Qualified Leads | 3 | 120 | Primary (Scannable) |
| KPI: Emails Sent | 3 | 120 | Primary (Scannable) |
| KPI: Reply Rate | 3 | 120 | Primary (Scannable) |
| Performance Chart | 8 | 280 | Secondary (Analysis) |
| AI Insight Strip | 4 | 280 | Secondary (Actionable) |
| Lead Pipeline | 6 | 320 | Tertiary (Context) |
| Campaign Summary | 6 | 320 | Tertiary (Context) |
| Recent Activity | 8 | 360 | Quaternary (Audit) |
| Quick Actions | 4 | 360 | Quaternary (Utility) |

---

## 3. Tablet Layout (768px – 1279px)

The layout reflows to accommodate the narrower viewport. Elements that were side-by-side begin to stack.

### Visual Map

```text
Row 1 & 2 (120px each)
[      6 cols       ] [      6 cols       ]
[      KPI 1        ] [      KPI 2        ]
[      KPI 3        ] [      KPI 4        ]

Row 3 (280px)
[                  12 cols                ]
[            Performance Chart            ]

Row 4 (Auto-height)
[                  12 cols                ]
[             AI Insight Strip            ]

Row 5 (320px)
[                  12 cols                ]
[             Lead Pipeline               ]

Row 6 (320px)
[                  12 cols                ]
[            Campaign Summary             ]

Row 7 (360px)
[                  12 cols                ]
[             Recent Activity             ]

Row 8 (Auto-height)
[                  12 cols                ]
[              Quick Actions              ]
```

### Widget Sizing (Tablet)

| Widget | Width (Cols) | Row Span | Priority Shift |
|--------|-------------|----------|----------------|
| KPI Cards (x4) | 6 (2 per row) | 2 rows | Maintained |
| Performance Chart | 12 | 1 row | Promoted (Full width) |
| AI Insight Strip | 12 | 1 row | Demoted (Below chart) |
| Pipeline & Campaigns | 12 each | 2 rows | Stacked vertically |
| Activity & Actions | 12 each | 2 rows | Stacked vertically |

---

## 4. Mobile Layout (< 768px)

A strictly single-column layout. The grid collapses entirely.

### Visual Map

```text
[      12 cols      ]
[      KPI 1        ]
[      KPI 2        ]
[      KPI 3        ]
[      KPI 4        ]

[      12 cols      ]
[  AI Insight Strip ]  <-- Chart is hidden

[      12 cols      ]
[   Lead Pipeline   ]

[      12 cols      ]
[ Campaign Summary  ]

[      12 cols      ]
[  Recent Activity  ]

< Quick Actions move to bottom sheet navigation >
```

### Widget Sizing (Mobile)

| Widget | Width (Cols) | Visibility / Note |
|--------|-------------|-------------------|
| KPI Cards | 6 (2x2 grid) | Reduced padding/font size |
| Performance Chart | 0 | **HIDDEN** to save vertical space |
| AI Insight Strip | 12 | Retained for AI-driven workflow |
| Lead Pipeline | 12 | Compact rows |
| Campaign Summary | 12 | Compact rows |
| Recent Activity | 12 | Reduced feed count (show 5) |
| Quick Actions | 0 | **MOVED** into mobile bottom nav drawer |

---

## 5. Hierarchy & Zoning Principles

1. **Top Zone (Rows 1)**: *Immediate Value*. The KPI cards provide the instant context of the system's health.
2. **Middle Zone (Row 2-3)**: *Primary Work*. The Chart provides historical context, while the AI Strip offers the immediate "Next Best Action". The Pipeline and Campaigns offer drill-down capabilities.
3. **Bottom Zone (Row 4)**: *Audit & Utility*. The activity feed provides a chronological audit trail, while quick actions are for intentional task initiation.

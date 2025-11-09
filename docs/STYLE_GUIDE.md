# Dub2 Design System - Comprehensive Style Guide

**Project**: Dub2 Landing Page
**Version**: 2.0
**Last Updated**: November 6, 2025
**Design Philosophy**: Modern SaaS, Minimalist Professional Aesthetic with Dual-Font Typography System

---

## Table of Contents

1. [Overview](#overview)
2. [Color Palette](#color-palette)
3. [Typography](#typography)
4. [Spacing System](#spacing-system)
5. [Component Styles](#component-styles)
6. [Shadows & Elevation](#shadows--elevation)
7. [Animations & Transitions](#animations--transitions)
8. [Border Radius](#border-radius)
9. [Opacity & Transparency](#opacity--transparency)
10. [Layout & Grid Systems](#layout--grid-systems)
11. [Responsive Design](#responsive-design)
12. [Z-Index Scale](#z-index-scale)
13. [Common Design Patterns](#common-design-patterns)
14. [Component Reference Examples](#component-reference-examples)
15. [Tailwind CSS Equivalent Usage](#tailwind-css-equivalent-usage)
16. [Accessibility Guidelines](#accessibility-guidelines)
17. [Best Practices](#best-practices)

---

## Overview

### Design Philosophy

The Dub2 design system represents a refined evolution of the original Dub aesthetic, combining:

- **Minimalist Professional**: Clean, uncluttered interfaces with generous whitespace
- **Dual-Font Typography**: Satoshi for headings (personality) + Inter for body (readability)
- **Subtle Color Palette**: Grayscale foundation with selective accent colors
- **High Contrast**: Strong text hierarchy for optimal readability
- **Scalable Architecture**: Built for growth from startup to enterprise

### Key Differentiators from Original Dub

| Feature | Original Dub | Dub2 |
|---------|-------------|------|
| **Heading Font** | Inter | Satoshi (700, 500, 400) |
| **Body Font** | Inter | Inter (300-700) |
| **Color System** | HSL only | HSL + RGB dual system |
| **Shadows** | Minimal | Layered depth system |
| **Accents** | Grayscale | Selective color (#ff6b35, #8b5cf6) |
| **Component Complexity** | Simple | Enhanced with analytics UI |

### Technology Stack

- **CSS Variables**: Custom properties for theming
- **No Build Process**: Pure HTML + CSS
- **Font Loading**: Google Fonts (Inter) + FontShare (Satoshi)
- **Browser Support**: Modern browsers (ES6+)

---

## Color Palette

### Color System Architecture

Dub2 employs a **dual color system** for maximum flexibility:

1. **HSL Format**: For color manipulation and theming
2. **RGB Format**: For transparency control via rgba()

### HSL Color Variables (Semantic Naming)

Located at `:root` (lines 12-29):

```css
:root {
    /* Background Colors */
    --background: 0 0% 98%;           /* #fafafa - Main page background */
    --muted: 0 0% 96.1%;              /* #f5f5f5 - Secondary background */
    --popover: 0 0% 100%;             /* #ffffff - Popover/modal backgrounds */
    --card: 0 0% 99.7%;               /* Near white - Card backgrounds */

    /* Foreground/Text Colors */
    --foreground: 0 0% 3.9%;          /* #0a0a0a - Primary text */
    --muted-foreground: 0 0% 45.1%;   /* #737373 - Secondary text */
    --popover-foreground: 0 0% 15.1%; /* #262626 - Popover text */
    --card-foreground: 0 0% 3.9%;     /* #0a0a0a - Card text */

    /* Borders */
    --border: 0 0% 89.8%;             /* #e5e5e5 - Default borders */

    /* Semantic Colors */
    --primary: 0 0% 9%;               /* #171717 - Primary brand color (dark) */
    --primary-foreground: 0 0% 98%;   /* #fafafa - Text on primary */
    --secondary: 0 0% 96.1%;          /* #f5f5f5 - Secondary brand */
    --secondary-foreground: 0 0% 9%;  /* #171717 - Text on secondary */
    --accent: 0 0% 94.1%;             /* #f0f0f0 - Accent backgrounds */
    --accent-foreground: 0 0% 9%;     /* #171717 - Text on accent */

    /* Focus Rings */
    --ring: 0 0% 63.9%;               /* #a3a3a3 - Focus ring color */
}
```

**Usage Example**:
```css
.element {
    background: hsl(var(--background));
    color: hsl(var(--foreground));
    border: 1px solid hsl(var(--border));
}
```

### RGB Color Variables (Functional Naming)

Located at `:root` (lines 31-44):

```css
:root {
    /* Backgrounds (Lightest → Darkest) */
    --bg-default: 255 255 255;        /* #ffffff - Pure white */
    --bg-muted: 250 250 250;          /* #fafafa - Off-white */
    --bg-subtle: 245 245 245;         /* #f5f5f5 - Light gray */
    --bg-emphasis: 229 229 229;       /* #e5e5e5 - Medium gray */
    --bg-inverted: 23 23 23;          /* #171717 - Dark gray (buttons, headers) */

    /* Borders (Lightest → Darkest) */
    --border-default: 212 212 212;    /* #d4d4d4 - Default border */
    --border-muted: 245 245 245;      /* #f5f5f5 - Subtle border */
    --border-subtle: 229 229 229;     /* #e5e5e5 - Light border */

    /* Content/Text (Lightest → Darkest) */
    --content-inverted: 255 255 255;  /* #ffffff - White text */
    --content-muted: 163 163 163;     /* #a3a3a3 - Muted text */
    --content-subtle: 115 115 115;    /* #737373 - Subtle text */
    --content-default: 64 64 64;      /* #404040 - Default text */
    --content-emphasis: 23 23 23;     /* #171717 - Emphasized text */
}
```

**Usage Example**:
```css
.element {
    background: rgb(var(--bg-default));
    color: rgb(var(--content-default));
}

.element-transparent {
    background: rgba(var(--bg-inverted), 0.8);
}
```

### Accent Colors (Hardcoded)

**Primary Accent - Coral Orange** (`#ff6b35`):
- **Usage**: Statistics, call-to-action highlights
- **Location**: `.stat-value` (line 654)
- **RGB**: rgb(255, 107, 53)
- **Purpose**: Draw attention to key metrics

**Secondary Accent - Purple** (`#8b5cf6`):
- **Usage**: Analytics charts, sparklines
- **Location**: `.sparkline path` (line 571)
- **RGB**: rgb(139, 92, 246)
- **Purpose**: Data visualization

**Success Indicator - Green** (`#10b981`):
- **Usage**: Status indicators (operational state)
- **Location**: `.status-dot` (line 815)
- **RGB**: rgb(16, 185, 129)
- **Purpose**: Positive status feedback

### Color Contrast Ratios

All color combinations meet WCAG AA standards (4.5:1 minimum):

| Text Color | Background | Contrast Ratio | WCAG Level |
|------------|------------|----------------|------------|
| `--content-emphasis` (23) | `--bg-default` (255) | 16.1:1 | AAA |
| `--content-default` (64) | `--bg-default` (255) | 9.4:1 | AAA |
| `--content-subtle` (115) | `--bg-default` (255) | 5.3:1 | AA |
| `--content-muted` (163) | `--bg-default` (255) | 3.1:1 | Fails (decorative only) |
| `--content-inverted` (255) | `--bg-inverted` (23) | 16.1:1 | AAA |

**Note**: `--content-muted` (163) should only be used for non-essential UI elements like icons or secondary labels, not primary content.

### Color Usage Guidelines

#### Background Hierarchy
1. **Default** (`--bg-default`): Main page background, cards
2. **Muted** (`--bg-muted`): Alternating sections, logo sections
3. **Subtle** (`--bg-subtle`): Hover states, secondary buttons
4. **Emphasis** (`--bg-emphasis`): (Reserved, not actively used)
5. **Inverted** (`--bg-inverted`): Primary buttons, active tabs

#### Text Hierarchy
1. **Emphasis** (`--content-emphasis`): Headings, important text
2. **Default** (`--content-default`): Body text, navigation
3. **Subtle** (`--content-subtle`): Secondary descriptions
4. **Muted** (`--content-muted`): Labels, metadata, disabled states
5. **Inverted** (`--content-inverted`): Text on dark backgrounds

#### Border Hierarchy
1. **Default** (`--border-default`): Standard borders (used via `hsl(var(--border))`)
2. **Muted** (`--border-muted`): Very subtle separators
3. **Subtle** (`--border-subtle`): Light dividers

---

## Typography

### Font Families

The Dub2 design system uses a **dual-font strategy** for visual hierarchy and personality:

#### Primary Font: Satoshi (Headings, Logos, Authors)

**Font Source**: [FontShare - Satoshi](https://api.fontshare.com/v2/css?f[]=satoshi@700,500,400&display=swap)

```css
--font-satoshi: "Satoshi", "Satoshi Fallback", system-ui, -apple-system, sans-serif;
```

**Weights Available**:
- **400** (Regular): Not actively used in current design
- **500** (Medium): Not actively used in current design
- **700** (Bold): All headings, logo, author names

**Usage**:
```css
h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-satoshi);
}

.logo {
    font-family: var(--font-satoshi);
    font-weight: 700;
}

.author-name {
    font-family: var(--font-satoshi);
    font-weight: 600;
}
```

**Character**: Modern, geometric, slightly condensed for impactful headlines

#### Secondary Font: Inter (Body, Navigation, UI)

**Font Source**: [Google Fonts - Inter](https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap)

```css
--font-inter: "Inter", "Inter Fallback", system-ui, -apple-system, sans-serif;
```

**Weights Available**:
- **300** (Light): Not actively used
- **400** (Regular): Body text, descriptions
- **500** (Medium): Navigation, links, buttons, labels
- **600** (Semibold): Card headings (h3), subheadings
- **700** (Bold): Not used (Satoshi handles all bold)

**Usage**:
```css
body {
    font-family: var(--font-inter);
}

nav a {
    font-weight: 500;
}

.feature-card h3 {
    font-weight: 600;
}
```

**Character**: Clean, readable, optimized for screens, excellent for long-form content

### Font Loading Strategy

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<link href="https://api.fontshare.com/v2/css?f[]=satoshi@700,500,400&display=swap" rel="stylesheet">
```

**Performance Optimizations**:
- Preconnect to font origins
- `display=swap` prevents FOIT (Flash of Invisible Text)
- Fallbacks to system fonts

### Font Smoothing

Applied globally for better rendering:

```css
body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
```

### Typography Scale

#### Display Typography (Hero, Major Headings)

| Element | Font | Size | Weight | Line Height | Letter Spacing | Usage |
|---------|------|------|--------|-------------|----------------|-------|
| **Hero H1** | Satoshi | 64px | 700 | 1.1 | -0.02em | Main hero headline |
| **CTA H2** | Satoshi | 56px | 700 | 1.1 | -0.02em | Final CTA section |
| **Section H2** | Satoshi | 48px | 700 | 1.1-1.2 | -0.02em | Major section headings |
| **Feature H2** | Satoshi | 40px | 700 | 1.2 | -0.02em | Feature descriptions |

**Mobile Scaling** (768px breakpoint):
- Hero H1: 64px → 40px (37.5% reduction)
- Section H2: 48px → 36px (25% reduction)

#### Content Typography (Subsections, Cards)

| Element | Font | Size | Weight | Line Height | Letter Spacing | Usage |
|---------|------|------|--------|-------------|----------------|-------|
| **Stat Value** | Satoshi | 48px | 700 | 1.0 | -0.02em | Large statistics |
| **Metric Value** | Satoshi | 32px | 700 | 1.0 | 0 | Dashboard metrics |
| **Logo/Brand** | Satoshi | 24px | 700 | 1.0 | 0 | Footer logo |
| **Brand Small** | Satoshi | 20px | 700 | 1.0 | 0 | Header logo |
| **Testimonial** | Inter | 20px | 400 | 1.6 | 0 | Quote text |
| **Hero Subtitle** | Inter | 20px | 400 | 1.6 | 0 | Hero description |
| **Description** | Inter | 18px | 400 | 1.6 | 0 | Section descriptions |
| **Card H3** | Inter | 16px | 600 | 1.4 | 0 | Card headings |

#### UI Typography (Buttons, Navigation, Labels)

| Element | Font | Size | Weight | Line Height | Letter Spacing | Usage |
|---------|------|------|--------|-------------|----------------|-------|
| **Button Large** | Inter | 15px | 500 | 1.5 | 0 | Primary CTAs |
| **Button/Nav** | Inter | 14px | 500 | 1.5 | 0 | Buttons, navigation |
| **Card Text** | Inter | 14px | 400 | 1.6 | 0 | Card descriptions |
| **Table Text** | Inter | 14px | 400 | 1.5 | 0 | Data tables |
| **Footer Links** | Inter | 14px | 400 | 1.5 | 0 | Footer navigation |
| **Author Title** | Inter | 14px | 400 | 1.5 | 0 | Subtitle text |
| **Badge/Pill** | Inter | 13px | 500 | 1.5 | 0 | Badges, section badges |
| **Link Stats** | Inter | 13px | 400 | 1.5 | 0 | Metadata, stats |
| **Metric Label** | Inter | 13px | 500 | 1.5 | 0 | Chart labels |
| **Status** | Inter | 13px | 400 | 1.5 | 0 | Status indicators |
| **Table Header** | Inter | 13px | 500 | 1.5 | 0 | Table headers |
| **Stat Label** | Inter | 12px | 600 | 1.5 | 0.1em | Uppercase labels |
| **Logo Badge** | Inter | 10px | 600 | 1.5 | 0.05em | Uppercase badges |

### Typography Hierarchy Rules

#### Negative Letter Spacing (Tighter)
Applied to large display typography for visual balance:
- **-0.02em**: 64px, 56px, 48px, 40px, 32px headings
- Creates tighter, more impactful headlines

#### Positive Letter Spacing (Looser)
Applied to uppercase small text for readability:
- **0.1em**: 12px stat labels
- **0.05em**: 10px logo badges

#### Line Height Guidelines

| Content Type | Line Height | Reasoning |
|--------------|-------------|-----------|
| **Display Headings** | 1.1 | Tight for impact, single-line preferred |
| **Section Headings** | 1.2 | Slightly looser for multi-line |
| **Body/Descriptions** | 1.6 | Comfortable reading for paragraphs |
| **UI Elements** | 1.5 | Default for buttons/nav |
| **Metrics** | 1.0 | Tight for numbers |

### Font Weight Usage Strategy

| Weight | Font | Primary Use | Examples |
|--------|------|-------------|----------|
| **700** | Satoshi | All headings (h1-h6), logos | Hero title, section headings, brand |
| **600** | Inter | Card headings (h3), labels | Feature card titles, stat labels |
| **500** | Inter | Navigation, buttons, labels | Nav links, buttons, badges |
| **400** | Inter | Body text, descriptions | Paragraphs, card descriptions |

**Rule**: Never mix fonts at the same weight. Satoshi 700 for headings, Inter 600 for subheadings, Inter 500 for UI, Inter 400 for body.

### Responsive Typography

#### Mobile Breakpoint (768px)

```css
@media (max-width: 768px) {
    .hero h1 {
        font-size: 40px;  /* Down from 64px */
    }

    .hero p {
        font-size: 18px;  /* Down from 20px */
    }

    .feature-section-header h2,
    .marketing-section h2,
    .stats-section h2,
    .cta-section h2 {
        font-size: 36px;  /* Down from 48px/56px */
    }

    .stat-value {
        font-size: 28px;  /* Down from 48px */
    }
}
```

**Scaling Strategy**:
- Large display: 37-42% reduction
- Medium headings: 25% reduction
- Body text: 10% reduction or maintained
- Maintains hierarchy at all sizes

---

## Spacing System

### Base Unit: 4px

The Dub2 design system does not explicitly use a named spacing scale, but follows consistent spacing patterns based on multiples of 4px.

### Padding System

#### Component Padding

| Component | Padding | Calculation | Usage |
|-----------|---------|-------------|-------|
| **Button** | `8px 16px` | 2×4px, 4×4px | Default buttons |
| **Button Large** | `12px 24px` | 3×4px, 6×4px | CTA buttons |
| **Badge/Pill** | `6px 14px` | 1.5×4px, 3.5×4px | Announcements, badges |
| **Section Badge** | `6px 16px` | 1.5×4px, 4×4px | Section identifiers |
| **Tab** | `8px 16px` | 2×4px, 4×4px | Tab items |
| **Link Item** | `12px 16px` | 3×4px, 4×4px | Link list items |
| **Feature Card** | `24px` | 6×4px | Card content padding |
| **Info Banner** | `32px` | 8×4px | Banner internal padding |
| **Analytics Dashboard** | `32px` | 8×4px | Dashboard container |
| **Testimonial** | `48px` | 12×4px | Testimonial quotes |

#### Section Padding (Vertical)

| Section Type | Top | Bottom | Usage |
|--------------|-----|--------|-------|
| **Header** | `16px` | `16px` | Global header |
| **Hero** | `80px` | `60px` | Hero section |
| **Marketing** | `100px` | `100px` | Marketing sections |
| **Feature Section** | `100px` | `100px` | Feature sections |
| **Stats Section** | `100px` | `100px` | Statistics sections |
| **CTA Section** | `100px` | `100px` | Call-to-action sections |
| **Footer** | `80px` | `40px` | Footer (80 top, 40 bottom) |
| **Footer Bottom** | `32px` (top only) | - | Footer legal section |

**Mobile Reduction** (768px):
- Section padding: `100px` → `60px`
- All: `60px 24px` (60 vertical, 24 horizontal)

#### Section Padding (Horizontal)

| Viewport | Padding | Usage |
|----------|---------|-------|
| **Desktop** | `48px` | Default left/right |
| **Mobile** (768px) | `24px` | Reduced left/right |

### Margin System

#### Component Margins (Bottom)

| Element | Margin Bottom | Usage |
|---------|---------------|-------|
| **Hero H1** | `24px` | Space below headline |
| **Hero Subtitle** | `32px` | Space below description |
| **CTA Buttons** | `48px` | Space below button group |
| **Section Badge** | `24px` | Space below badge |
| **Section H2** | `16px` | Space below heading |
| **Section Description** | `24px` | Space below description |
| **Feature Preview** | `60px` | Space below preview |
| **Info Banner** | Position-based | Overlaps with negative margin |
| **Footer Content** | `48px` | Space below main footer |
| **Feature Card Icon** | `16px` | Space below icon |
| **Feature Card H3** | `8px` | Space below card title |
| **Feature Card P** | `12px` | Space below card description |
| **Metrics Row** | `32px` | Space below metrics |
| **Metric Label** | `8px` | Space below label |
| **Testimonial Quote** | `24px` | Space below quote |
| **Footer Column H4** | `20px` | Space below footer heading |
| **Footer Column Li** | `16px` | Space between footer links |

### Gap System (Flexbox/Grid)

#### Flexbox Gaps

| Component | Gap | Usage |
|-----------|-----|-------|
| **Navigation** | `32px` | Between nav items |
| **Nav Buttons** | `12px` | Between header buttons |
| **CTA Buttons** | `12px` | Between CTA buttons |
| **Tabs** | `12px` | Between tab items |
| **Info Banner** | `24px` | Between banner elements |
| **Social Links** | `16px` | Between social icons |
| **Link Stats** | `12px` | Between stat numbers |
| **Metric Value** | `12px` | Between value and sparkline |
| **Status Indicator** | `6px` | Between dot and text |
| **Links List** | `12px` | Between link items |
| **Testimonial Author** | `12px` | Between author elements |
| **Footer Bottom Left** | `16px` | Between footer elements |
| **Footer Bottom** | `16px` | Wrap gap |
| **Banner Content** | N/A | Uses margin |
| **Stat Item** | `8px` | Between label and value |
| **Metric Card** | `8px` | Between elements |
| **Footer Brand** | `24px` | Between brand elements |

#### Grid Gaps

| Grid Type | Gap | Usage |
|-----------|-----|-------|
| **Logos Grid** | `30px 60px` | 30px rows, 60px columns |
| **Links Showcase** | `80px` | Between columns |
| **Feature Cards** | `20px` | Between cards |
| **Metrics Row** | `32px` | Between metric cards |
| **Stats Grid** | `48px` | Between stat items |
| **Footer Content** | `48px` | Between footer columns |

**Mobile Adjustments**:
- Logos Grid: `30px` (uniform)
- Links Showcase: `40px` (reduced)
- Footer Content: `40px` (reduced)

### Spacing Guidelines

#### Vertical Rhythm
- **Small spacing**: 8px, 12px, 16px (component internal)
- **Medium spacing**: 24px, 32px (component separation)
- **Large spacing**: 48px, 60px, 80px, 100px (section separation)

#### Horizontal Rhythm
- **Tight**: 6px, 8px, 12px (internal component elements)
- **Standard**: 16px, 20px, 24px (between related items)
- **Loose**: 32px, 48px, 60px, 80px (between distinct sections)

#### Responsive Spacing Strategy
- **Desktop**: Full spacing values
- **Tablet** (1024px): Minor reductions (80px → 40px for specific layouts)
- **Mobile** (768px): Significant reductions (100px → 60px sections, 48px → 24px horizontal)

---

## Component Styles

### Buttons

The Dub2 design system features **three button variants** with two size options.

#### Base Button Styles

```css
.btn {
    padding: 8px 16px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    border: 1px solid transparent;
    text-decoration: none;
    display: inline-block;
    transition: all 0.2s ease;
    font-family: var(--font-inter);
}
```

**Properties**:
- **Padding**: 8px vertical, 16px horizontal
- **Border Radius**: 8px (medium roundness)
- **Font**: Inter, 14px, 500 weight
- **Border**: 1px transparent (allows for border variants)
- **Transition**: All properties, 0.2s, ease timing

#### Button Variants

##### 1. Primary Button (`.btn-primary`)

```css
.btn-primary {
    background: rgb(var(--bg-inverted));        /* #171717 dark gray */
    color: rgb(var(--content-inverted));        /* #ffffff white */
    border: 1px solid rgb(var(--bg-inverted));
}

.btn-primary:hover {
    opacity: 0.9;
}
```

**Usage**: Primary actions (Sign up, Start for free)
**Visual**: Dark background, white text
**Hover**: Slight opacity reduction (90%)

##### 2. Ghost Button (`.btn-ghost`)

```css
.btn-ghost {
    color: rgb(var(--content-default));         /* #404040 dark gray */
    background: transparent;
}

.btn-ghost:hover {
    background: rgb(var(--bg-subtle));          /* #f5f5f5 light gray */
}
```

**Usage**: Secondary actions (Log in, Get a demo)
**Visual**: Transparent background, gray text
**Hover**: Light gray background appears

##### 3. Secondary Button (`.btn-secondary`)

```css
.btn-secondary {
    background: rgb(var(--bg-muted));           /* #fafafa off-white */
    color: rgb(var(--content-emphasis));        /* #171717 dark gray */
    border: 1px solid hsl(var(--border));       /* #e5e5e5 border */
}

.btn-secondary:hover {
    background: rgb(var(--bg-subtle));          /* #f5f5f5 light gray */
}
```

**Usage**: Tertiary actions (Learn more, Explore features)
**Visual**: Light background with visible border, dark text
**Hover**: Slightly darker background

#### Button Sizes

##### Default Button
- **Padding**: `8px 16px`
- **Font Size**: `14px`

##### Large Button (`.btn-large`)
- **Padding**: `12px 24px`
- **Font Size**: `15px`

```css
.btn-large {
    padding: 12px 24px;
    font-size: 15px;
}
```

**Usage**: Hero CTAs, major conversion points

#### Responsive Behavior

```css
@media (max-width: 768px) {
    .cta-buttons {
        flex-direction: column;  /* Stack buttons vertically */
    }
}
```

Buttons stack vertically on mobile for easier tapping.

### Navigation

#### Header Navigation (`.nav`)

```css
nav {
    display: flex;
    gap: 32px;
    align-items: center;
}

nav a {
    color: rgb(var(--content-default));
    text-decoration: none;
    font-size: 14px;
    font-weight: 500;
    transition: color 0.2s;
}

nav a:hover {
    color: rgb(var(--content-emphasis));
}
```

**Properties**:
- **Font**: Inter, 14px, 500 weight
- **Color**: Default gray (`#404040`)
- **Hover Color**: Emphasized black (`#171717`)
- **Spacing**: 32px gap between items
- **Transition**: 0.2s color change

**Responsive**:
```css
@media (max-width: 768px) {
    nav {
        display: none;  /* Hidden on mobile */
    }
}
```

#### Logo (`.logo`)

```css
.logo {
    font-size: 20px;
    font-weight: 700;
    color: rgb(var(--content-emphasis));
    text-decoration: none;
    font-family: var(--font-satoshi);
}
```

**Properties**:
- **Font**: Satoshi, 20px, 700 weight
- **Color**: Emphasized black (`#171717`)
- **No hover state** (static branding)

### Badges & Pills

#### Announcement Badge (`.announcement`)

```css
.announcement {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 6px 14px;
    background: rgb(var(--bg-muted));
    border: 1px solid hsl(var(--border));
    border-radius: 20px;
    font-size: 13px;
    color: rgb(var(--content-default));
    margin-bottom: 32px;
    font-weight: 500;
}
```

**Properties**:
- **Shape**: Pill (20px border-radius)
- **Padding**: 6px vertical, 14px horizontal
- **Font**: Inter, 13px, 500 weight
- **Background**: Off-white with subtle border
- **Gap**: 8px between text and link

**Usage**: New feature announcements, product updates

#### Section Badge (`.section-badge`)

```css
.section-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 6px 16px;
    background: rgb(var(--bg-muted));
    border: 1px solid hsl(var(--border));
    border-radius: 20px;
    font-size: 13px;
    font-weight: 500;
    color: rgb(var(--content-default));
    margin-bottom: 24px;
}
```

**Properties**: Same as announcement badge, with 16px horizontal padding
**Usage**: Section identifiers (🔗 Dub Links, 📊 Dub Analytics, 💜 Dub Partners)

#### Logo Badge (`.logo-badge`)

```css
.logo-badge {
    display: inline-block;
    font-size: 10px;
    font-weight: 600;
    color: rgb(var(--content-muted));
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-left: 8px;
}
```

**Properties**:
- **Font**: Inter, 10px, 600 weight
- **Transform**: Uppercase
- **Letter Spacing**: 0.05em (looser)
- **Color**: Muted gray

**Usage**: "CASE STUDY" labels next to logo names

### Tabs

#### Tab Container (`.tabs`)

```css
.tabs {
    display: flex;
    gap: 12px;
    justify-content: center;
    margin-bottom: 60px;
}
```

#### Tab Item (`.tab`)

```css
.tab {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    background: rgb(var(--bg-muted));
    border: 1px solid hsl(var(--border));
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    color: rgb(var(--content-default));
    cursor: pointer;
    transition: all 0.2s;
}

.tab:hover {
    background: rgb(var(--bg-subtle));
}

.tab.active {
    background: rgb(var(--bg-inverted));
    color: rgb(var(--content-inverted));
    border-color: rgb(var(--bg-inverted));
}
```

**States**:
- **Default**: Light gray background, gray text
- **Hover**: Slightly darker background
- **Active**: Dark background (inverted), white text

**Responsive**:
```css
@media (max-width: 768px) {
    .tabs {
        flex-direction: column;
        max-width: 300px;
        margin: 0 auto 40px;
    }
}
```

Tabs stack vertically on mobile, centered with max-width.

### Cards

#### Feature Card (`.feature-card`)

```css
.feature-card {
    padding: 24px;
    background: rgb(var(--bg-default));
    border: 1px solid hsl(var(--border));
    border-radius: 12px;
    transition: all 0.2s ease;
}

.feature-card:hover {
    box-shadow: var(--shadow-active);
}
```

**Properties**:
- **Padding**: 24px (uniform)
- **Border**: 1px solid border color
- **Border Radius**: 12px (medium)
- **Background**: White
- **Hover**: Elevated shadow (depth effect)

**Internal Structure**:
```css
.feature-card-icon {
    font-size: 24px;
    margin-bottom: 16px;
}

.feature-card h3 {
    font-size: 16px;
    font-weight: 600;
    color: rgb(var(--content-emphasis));
    margin-bottom: 8px;
}

.feature-card p {
    font-size: 14px;
    color: rgb(var(--content-subtle));
    line-height: 1.6;
    margin-bottom: 12px;
}

.feature-card a {
    font-size: 14px;
    color: rgb(var(--content-emphasis));
    text-decoration: none;
    font-weight: 500;
}

.feature-card a:hover {
    text-decoration: underline;
}
```

**Typography**:
- Icon: 24px emoji
- H3: Inter 16px/600
- Description: Inter 14px/400
- Link: Inter 14px/500

#### Link Item Card (`.link-item`)

```css
.link-item {
    background: rgb(var(--bg-default));
    border: 1px solid hsl(var(--border));
    padding: 12px 16px;
    border-radius: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
```

**Properties**:
- **Layout**: Flexbox, space-between
- **Padding**: 12px vertical, 16px horizontal
- **Border Radius**: 8px (small)

**Internal**:
```css
.link-name {
    font-size: 14px;
    font-weight: 500;
    color: rgb(var(--content-emphasis));
}

.link-stats {
    display: flex;
    gap: 12px;
    font-size: 13px;
    color: rgb(var(--content-muted));
}
```

#### Testimonial Card (`.testimonial`)

```css
.testimonial {
    max-width: 900px;
    margin: 0 auto;
    padding: 48px;
    background: rgb(var(--bg-default));
    border: 1px solid hsl(var(--border));
    border-radius: 12px;
}

.testimonial-quote {
    font-size: 20px;
    color: rgb(var(--content-emphasis));
    line-height: 1.6;
    margin-bottom: 24px;
}

.testimonial-author {
    display: flex;
    align-items: center;
    gap: 12px;
}

.author-name {
    font-weight: 600;
    color: rgb(var(--content-emphasis));
    font-family: var(--font-satoshi);
}

.author-title {
    font-size: 14px;
    color: rgb(var(--content-muted));
}
```

**Properties**:
- **Large Padding**: 48px
- **Quote**: 20px, line-height 1.6
- **Author Name**: Satoshi 600 (standout)
- **Author Title**: Inter 14px, muted

### Data Tables

#### Table Structure (`.data-table`)

```css
.data-table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
}

.data-table thead {
    border-bottom: 1px solid hsl(var(--border));
}

.data-table th {
    text-align: left;
    padding: 12px 16px;
    font-size: 13px;
    font-weight: 500;
    color: rgb(var(--content-muted));
}

.data-table td {
    padding: 12px 16px;
    font-size: 14px;
    color: rgb(var(--content-default));
    border-bottom: 1px solid hsl(var(--border));
}

.data-table tr:last-child td {
    border-bottom: none;
}
```

**Properties**:
- **Header**: 13px, 500 weight, muted color
- **Body**: 14px, 400 weight, default color
- **Padding**: 12px vertical, 16px horizontal (consistent)
- **Borders**: Bottom borders only (clean look)
- **Last Row**: No border (clean termination)

### Analytics Components

#### Metrics Row (`.metrics-row`)

```css
.metrics-row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 32px;
    margin-bottom: 32px;
    padding-bottom: 32px;
    border-bottom: 1px solid hsl(var(--border));
}
```

**Responsive**:
```css
@media (max-width: 768px) {
    .metrics-row {
        grid-template-columns: 1fr;  /* Single column */
    }
}
```

#### Metric Card (`.metric-card`)

```css
.metric-card {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.metric-label {
    font-size: 13px;
    font-weight: 500;
    color: rgb(var(--content-muted));
}

.metric-value {
    font-size: 32px;
    font-weight: 700;
    color: rgb(var(--content-emphasis));
    display: flex;
    align-items: center;
    gap: 12px;
}
```

**Structure**:
- Label: Small, muted (13px)
- Value: Large, bold (32px), Satoshi 700
- Sparkline: Inline with value

#### Sparkline Chart (`.sparkline`)

```css
.sparkline {
    width: 80px;
    height: 24px;
}

.sparkline path {
    fill: none;
    stroke: #8b5cf6;  /* Purple accent */
    stroke-width: 2;
}
```

**Properties**:
- **Dimensions**: 80px × 24px (compact)
- **Color**: Purple (#8b5cf6)
- **Style**: 2px stroke, no fill (line chart)

### Statistics Components

#### Stat Item (`.stat-item`)

```css
.stat-item {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.stat-label {
    font-size: 12px;
    font-weight: 600;
    color: rgb(var(--content-muted));
    text-transform: uppercase;
    letter-spacing: 0.1em;
}

.stat-value {
    font-size: 48px;
    font-weight: 700;
    color: #ff6b35;  /* Coral orange accent */
    letter-spacing: -0.02em;
}
```

**Mobile**:
```css
@media (max-width: 768px) {
    .stat-value {
        font-size: 28px;  /* Significant reduction */
    }
}
```

**Properties**:
- Label: Uppercase, tracked, muted
- Value: Large (48px), coral color, Satoshi 700

### Banners

#### Info Banner (`.info-banner`)

```css
.info-banner {
    max-width: 800px;
    margin: -40px auto 0;  /* Negative margin: overlaps preview */
    background: rgb(var(--bg-default));
    border: 1px solid hsl(var(--border));
    padding: 32px;
    border-radius: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 24px;
    box-shadow: var(--shadow-default);
}

.banner-content {
    flex: 1;
}

.banner-content h3 {
    font-size: 16px;
    font-weight: 600;
    color: rgb(var(--content-emphasis));
    margin-bottom: 4px;
}

.banner-content p {
    font-size: 14px;
    color: rgb(var(--content-subtle));
}
```

**Properties**:
- **Positioning**: Negative top margin creates overlap effect
- **Shadow**: Default shadow for elevation
- **Layout**: Flexbox with space-between
- **Content**: Title (16px/600) + description (14px/400)

### Status Indicators

```css
.status-indicator {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 13px;
    color: rgb(var(--content-muted));
}

.status-dot {
    width: 8px;
    height: 8px;
    background: #10b981;  /* Green */
    border-radius: 50%;
}
```

**Properties**:
- **Dot**: 8px circle, green (#10b981)
- **Text**: 13px, muted
- **Gap**: 6px between dot and text

**Usage**: "All systems operational" in footer

### Footer Components

#### Footer Column (`.footer-column`)

```css
.footer-column h4 {
    font-size: 14px;
    font-weight: 600;
    color: rgb(var(--content-emphasis));
    margin-bottom: 20px;
}

.footer-column ul {
    list-style: none;
}

.footer-column li {
    margin-bottom: 16px;
}

.footer-column a {
    color: rgb(var(--content-muted));
    text-decoration: none;
    font-size: 14px;
    transition: color 0.2s;
}

.footer-column a:hover {
    color: rgb(var(--content-emphasis));
}
```

**Properties**:
- **Heading**: 14px, 600 weight, emphasized
- **Links**: 14px, muted, hover to emphasized
- **Spacing**: 20px below heading, 16px between links

#### Social Links (`.social-links`)

```css
.social-links {
    display: flex;
    gap: 16px;
}

.social-links a {
    color: rgb(var(--content-muted));
    transition: color 0.2s;
}

.social-links a:hover {
    color: rgb(var(--content-emphasis));
}
```

**Properties**:
- **SVG Icons**: 20px × 20px
- **Color**: Muted, hover to emphasized
- **Gap**: 16px between icons

---

## Shadows & Elevation

The Dub2 design system uses a **two-level shadow system** for subtle depth and elevation.

### Shadow Variables

```css
:root {
    --shadow-default: 0 2px 6px -1px rgba(0, 0, 0, 0.16),
                      0 1px 4px -1px rgba(0, 0, 0, 0.04);

    --shadow-active: 0 0 8px -2px rgba(0, 0, 0, 0.1),
                     0 6px 20px -3px rgba(0, 0, 0, 0.2);
}
```

### Shadow Levels

#### Level 1: Default Shadow (`--shadow-default`)

**Composition**:
- **Layer 1**: `0 2px 6px -1px rgba(0, 0, 0, 0.16)`
  - Y-offset: 2px
  - Blur: 6px
  - Spread: -1px (contracts shadow)
  - Opacity: 16%

- **Layer 2**: `0 1px 4px -1px rgba(0, 0, 0, 0.04)`
  - Y-offset: 1px
  - Blur: 4px
  - Spread: -1px
  - Opacity: 4%

**Usage**:
- Info banners (`.info-banner`)
- Analytics dashboard (`.analytics-dashboard`)

**Visual Effect**: Subtle elevation, resting state, gentle depth

#### Level 2: Active Shadow (`--shadow-active`)

**Composition**:
- **Layer 1**: `0 0 8px -2px rgba(0, 0, 0, 0.1)`
  - No offset (ambient shadow)
  - Blur: 8px
  - Spread: -2px
  - Opacity: 10%

- **Layer 2**: `0 6px 20px -3px rgba(0, 0, 0, 0.2)`
  - Y-offset: 6px
  - Blur: 20px
  - Spread: -3px
  - Opacity: 20%

**Usage**:
- Feature cards on hover (`.feature-card:hover`)

**Visual Effect**: Strong elevation, interactive feedback, prominent depth

### Shadow Usage Guidelines

#### When to Use Shadows

| Component | Shadow | Trigger | Purpose |
|-----------|--------|---------|---------|
| Info Banner | Default | Always | Elevate above preview |
| Analytics Dashboard | Default | Always | Container prominence |
| Feature Card | Active | Hover | Interactive feedback |
| Buttons | None | - | Flat design aesthetic |
| Tabs | None | - | Integrated UI elements |
| Testimonials | None | - | Border provides definition |

#### Shadow Best Practices

1. **Minimal Use**: Only 3 components use shadows in entire design
2. **Purposeful**: Shadows indicate elevation or interactivity
3. **Layered**: All shadows use 2-layer composition for depth
4. **Negative Spread**: All shadows use negative spread for tighter, more realistic shadows
5. **Low Opacity**: Maximum 20% opacity for subtlety

### Elevation System

While not explicitly z-indexed (beyond header), visual elevation is achieved through:

| Level | Visual Technique | Example |
|-------|------------------|---------|
| **0** | No shadow, borders only | Cards, buttons, tabs |
| **1** | Default shadow | Banners, dashboards |
| **2** | Active shadow (hover) | Feature cards (interactive) |
| **3** | Position + z-index | Sticky header (z-index: 100) |

---

## Animations & Transitions

### Transition System

The Dub2 design system uses **property-specific transitions** with a consistent 0.2s timing.

#### Standard Transition

```css
transition: all 0.2s ease;
```

**Used By**:
- Buttons (`.btn`)
- Tabs (`.tab`)
- Feature cards (`.feature-card`)

**Properties**:
- **Duration**: 0.2s (200ms)
- **Timing Function**: ease (slow start, fast middle, slow end)
- **Properties**: all (universal)

#### Color-Only Transition

```css
transition: color 0.2s;
```

**Used By**:
- Navigation links (`nav a`)
- Footer links (`.footer-column a`)
- Social links (`.social-links a`)

**Properties**:
- **Duration**: 0.2s (200ms)
- **Timing Function**: ease (implicit)
- **Properties**: color only (more performant)

### Transition Timing

All transitions use **0.2s (200ms)** duration:
- Fast enough to feel responsive
- Slow enough to be perceived
- Consistent across all interactive elements

### Interactive States

#### Button Hover States

| Button Type | Default | Hover | Transition |
|-------------|---------|-------|------------|
| **Primary** | Dark bg, white text | Opacity 0.9 | `all 0.2s ease` |
| **Ghost** | Transparent | Light gray bg | `all 0.2s ease` |
| **Secondary** | Off-white bg | Light gray bg | `all 0.2s ease` |

#### Link Hover States

| Link Type | Default | Hover | Transition |
|-----------|---------|-------|------------|
| **Navigation** | Gray (#404040) | Black (#171717) | `color 0.2s` |
| **Footer** | Muted (#a3a3a3) | Black (#171717) | `color 0.2s` |
| **Card Links** | Black (#171717) | Underline | `color 0.2s` |

#### Card Hover States

```css
.feature-card {
    transition: all 0.2s ease;
}

.feature-card:hover {
    box-shadow: var(--shadow-active);
}
```

**Effect**: Shadow appears on hover (elevation feedback)

#### Tab States

```css
.tab {
    transition: all 0.2s;
}

.tab:hover {
    background: rgb(var(--bg-subtle));
}

.tab.active {
    background: rgb(var(--bg-inverted));
    color: rgb(var(--content-inverted));
}
```

**States**:
- **Default**: Light gray background
- **Hover**: Slightly darker gray
- **Active**: Dark background, white text (instant, no transition on click)

#### Logo Hover

```css
.logo-item {
    opacity: 0.7;
    transition: opacity 0.2s;
}

.logo-item:hover {
    opacity: 1;
}
```

**Effect**: Logos brighten from 70% to 100% opacity on hover

### JavaScript Interactions

#### Tab Switching

```javascript
const tabs = document.querySelectorAll('.tab');
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
    });
});
```

**Behavior**: Click to switch active state, CSS transitions handle visual changes

### Animation Guidelines

#### Performance Best Practices

1. **Use Transform/Opacity**: Not used in current design, but recommended for animations
2. **Avoid Animating**: width, height, top, left (triggers layout)
3. **Prefer**: opacity, color, box-shadow (GPU-accelerated where possible)

#### Timing Guidelines

| Duration | Use Case |
|----------|----------|
| **0.1s** | Instant feedback (not used) |
| **0.2s** | Standard interactions (current) |
| **0.3s** | Deliberate transitions (not used) |
| **0.5s+** | Animations/reveals (not used) |

**Current Design**: All transitions are 0.2s for consistency

### No Complex Animations

The Dub2 design system intentionally avoids:
- Keyframe animations
- Transform animations
- Scroll-based animations
- Loading animations
- Skeleton screens

**Philosophy**: Subtle transitions over flashy animations for professional aesthetic

---

## Border Radius

### Border Radius Scale

The Dub2 design system uses a **four-level border radius system**.

| Level | Value | Usage |
|-------|-------|-------|
| **Small** | `8px` | Buttons, tabs, link items, small cards |
| **Medium** | `12px` | Feature cards, banners, previews, testimonials |
| **Large** | `20px` | Pills, badges, announcements |
| **Circle** | `50%` | Status dots, circular elements |

### Component Border Radius

#### 8px (Small) - Functional UI Elements

```css
.btn { border-radius: 8px; }
.tab { border-radius: 8px; }
.link-item { border-radius: 8px; }
```

**Usage**: Interactive components, compact elements
**Visual**: Subtle rounding, modern but not overly rounded

#### 12px (Medium) - Content Containers

```css
.feature-card { border-radius: 12px; }
.preview-image { border-radius: 12px; }
.info-banner { border-radius: 12px; }
.testimonial { border-radius: 12px; }
.analytics-dashboard { border-radius: 12px; }
.feature-preview { border-radius: 12px; }
```

**Usage**: Cards, content previews, larger containers
**Visual**: Noticeably rounded, friendly and approachable

#### 20px (Large) - Pills & Badges

```css
.announcement { border-radius: 20px; }
.section-badge { border-radius: 20px; }
```

**Usage**: Pill-shaped elements, badges
**Visual**: Highly rounded, creates distinct pill shape

#### 50% (Circle) - Indicators

```css
.status-dot { border-radius: 50%; }
```

**Usage**: Status indicators, circular decorative elements
**Visual**: Perfect circle

### Border Radius Guidelines

#### Consistency Rules

1. **Match Container Size**: Larger containers → larger radius
2. **Visual Hierarchy**: Pills (20px) stand out more than cards (12px)
3. **Functional vs Decorative**: Buttons (8px) vs badges (20px)

#### Responsive Behavior

Border radius values remain consistent across all breakpoints (no mobile adjustments).

#### Border Radius + Shadows

Components with shadows should use medium radius (12px) for balanced elevation:
```css
.info-banner {
    border-radius: 12px;
    box-shadow: var(--shadow-default);
}
```

---

## Opacity & Transparency

### Opacity Levels

The Dub2 design system uses **limited, semantic opacity values**.

#### Hover State Opacity

```css
.btn-primary:hover {
    opacity: 0.9;
}
```

**Value**: 0.9 (90%)
**Usage**: Primary button hover state
**Effect**: Subtle darkening without color change

#### Logo Opacity States

```css
.logo-item {
    opacity: 0.7;
}

.logo-item:hover {
    opacity: 1;
}
```

**Default**: 0.7 (70%)
**Hover**: 1.0 (100%)
**Effect**: Logos start muted, brighten on interaction

### RGBA Transparency

The RGB color system enables transparency via `rgba()`:

```css
/* Example usage (not in current code, but enabled by system) */
.overlay {
    background: rgba(var(--bg-inverted), 0.8);  /* 80% opacity dark overlay */
}

.frosted {
    background: rgba(var(--bg-default), 0.95);  /* 95% opacity white */
}
```

**Enabled Values**: Any decimal from 0-1
**Common**: 0.8, 0.9, 0.95 for overlays/modals

### Shadow Opacity

Shadows use hardcoded rgba values:

```css
--shadow-default: 0 2px 6px -1px rgba(0, 0, 0, 0.16),
                  0 1px 4px -1px rgba(0, 0, 0, 0.04);

--shadow-active: 0 0 8px -2px rgba(0, 0, 0, 0.1),
                 0 6px 20px -3px rgba(0, 0, 0, 0.2);
```

**Opacity Levels**:
- 0.04 (4%): Subtle ambient shadow
- 0.1 (10%): Light directional shadow
- 0.16 (16%): Standard shadow layer
- 0.2 (20%): Prominent shadow (maximum)

### Opacity Usage Guidelines

| Use Case | Opacity | Method |
|----------|---------|--------|
| **Interactive Hover** | 0.9 | Direct opacity property |
| **Inactive Elements** | 0.7 | Direct opacity property |
| **Active Elements** | 1.0 | Default (full opacity) |
| **Overlays** | 0.8-0.95 | rgba() with custom properties |
| **Shadows (subtle)** | 0.04-0.1 | rgba(0,0,0,X) |
| **Shadows (prominent)** | 0.16-0.2 | rgba(0,0,0,X) |

### Transparency Best Practices

1. **Use Sparingly**: Only 2 components use direct opacity
2. **Semantic Values**: 0.7 (muted), 0.9 (subtle hover), 1.0 (active)
3. **Avoid Mid-Range**: No 0.5 opacity (looks disabled/unclear)
4. **Prefer Color Changes**: Change `color` property rather than opacity when possible
5. **Accessibility**: Never reduce text opacity below 0.9 for readability

---

## Layout & Grid Systems

### Container System

#### Max-Width Containers

The design uses semantic max-widths for content hierarchy:

| Container | Max-Width | Usage |
|-----------|-----------|-------|
| **Hero** | `1200px` | Hero section |
| **Footer** | `1200px` | Footer content grid |
| **Feature Preview** | `1200px` | Feature cards grid |
| **Links Showcase** | `1200px` | Links demonstration |
| **Product Preview** | `900px` | Product interface preview |
| **Analytics Dashboard** | `900px` | Dashboard component |
| **Stats Grid** | `900px` | Statistics display |
| **Testimonial** | `900px` | Testimonial cards |
| **Info Banner** | `800px` | Overlapping banner |
| **CTA Section** | N/A (inline) | Inline max-width in markup |

**Hierarchy**:
- **1200px**: Full-width content sections (primary)
- **900px**: Medium content (dashboard, stats)
- **800px**: Focused content (banners)
- **700px**: Narrow content (descriptions, inline text)

#### Section Padding

All sections follow consistent horizontal padding:

```css
section {
    padding: [vertical]px 48px;
}

@media (max-width: 768px) {
    section {
        padding: [vertical]px 24px;
    }
}
```

**Desktop**: 48px horizontal
**Mobile**: 24px horizontal

### Flexbox Layouts

#### Header Layout

```css
header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 48px;
}
```

**Pattern**: Horizontal layout with space-between (logo left, nav/buttons right)

#### Navigation

```css
nav {
    display: flex;
    gap: 32px;
    align-items: center;
}

.nav-buttons {
    display: flex;
    gap: 12px;
    align-items: center;
}
```

**Pattern**: Horizontal inline items with gap

#### CTA Buttons

```css
.cta-buttons {
    display: flex;
    gap: 12px;
    justify-content: center;
}

@media (max-width: 768px) {
    .cta-buttons {
        flex-direction: column;
    }
}
```

**Pattern**: Centered horizontal, stacks vertically on mobile

#### Tabs

```css
.tabs {
    display: flex;
    gap: 12px;
    justify-content: center;
}

@media (max-width: 768px) {
    .tabs {
        flex-direction: column;
        max-width: 300px;
        margin: 0 auto 40px;
    }
}
```

**Pattern**: Centered horizontal, stacks vertically on mobile with constrained width

#### Info Banner

```css
.info-banner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 24px;
}
```

**Pattern**: Horizontal layout with space-between

#### Metric Components

```css
.metric-card {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.metric-value {
    display: flex;
    align-items: center;
    gap: 12px;
}

.stat-item {
    display: flex;
    flex-direction: column;
    gap: 8px;
}
```

**Pattern**: Vertical stacks for label/value pairs

#### Footer

```css
.footer-brand {
    display: flex;
    flex-direction: column;
    gap: 24px;
}

.social-links {
    display: flex;
    gap: 16px;
}

.footer-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 16px;
}

.footer-bottom-left {
    display: flex;
    align-items: center;
    gap: 16px;
}
```

**Patterns**:
- Vertical stacks for brand column
- Horizontal inline for social links
- Space-between with wrap for footer bottom

### Grid Layouts

#### Footer Content Grid

```css
.footer-content {
    display: grid;
    grid-template-columns: 1.5fr repeat(4, 1fr);
    gap: 48px;
}

@media (max-width: 1024px) {
    .footer-content {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 768px) {
    .footer-content {
        grid-template-columns: 1fr;
        gap: 40px;
    }
}
```

**Desktop**: 5 columns (1.5fr + 4×1fr) - brand column wider
**Tablet**: 2 columns
**Mobile**: 1 column

#### Logos Grid

```css
.logos-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 30px 60px;
    align-items: center;
    justify-items: center;
}

@media (max-width: 1024px) {
    .logos-grid {
        grid-template-columns: repeat(3, 1fr);
    }
}

@media (max-width: 768px) {
    .logos-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 30px;
    }
}
```

**Desktop**: 5 columns, 30px row gap, 60px column gap
**Tablet**: 3 columns
**Mobile**: 2 columns, uniform 30px gap

#### Links Showcase Grid

```css
.links-showcase-content {
    display: grid;
    grid-template-columns: 300px 1fr;
    gap: 80px;
    align-items: center;
}

@media (max-width: 1024px) {
    .links-showcase-content {
        grid-template-columns: 1fr;
        gap: 40px;
    }
}
```

**Desktop**: 2 columns (300px fixed + remaining space)
**Tablet**: 1 column

#### Feature Cards Grid

```css
.feature-cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
}

@media (max-width: 1024px) {
    .feature-cards {
        grid-template-columns: 1fr;
    }
}
```

**Desktop**: 3 equal columns
**Tablet**: 1 column

#### Metrics Row Grid

```css
.metrics-row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 32px;
}

@media (max-width: 768px) {
    .metrics-row {
        grid-template-columns: 1fr;
    }
}
```

**Desktop**: 3 equal columns
**Mobile**: 1 column

#### Stats Grid

```css
.stats-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 48px;
}

@media (max-width: 1024px) {
    .stats-grid {
        grid-template-columns: 1fr;
    }
}
```

**Desktop**: 3 equal columns
**Tablet**: 1 column

### Layout Patterns Summary

| Layout Pattern | Use Case | Properties |
|----------------|----------|------------|
| **Flex Space-Between** | Header, banner | `justify-content: space-between` |
| **Flex Centered** | CTA buttons, tabs | `justify-content: center` |
| **Flex Inline** | Navigation, social | `gap` for spacing |
| **Flex Column** | Vertical stacks | `flex-direction: column` |
| **Grid Equal Columns** | Cards, stats | `repeat(N, 1fr)` |
| **Grid Asymmetric** | Footer, links | `1.5fr 1fr...` or `300px 1fr` |

---

## Responsive Design

### Breakpoint Strategy

The Dub2 design system uses a **two-breakpoint approach**:

| Breakpoint | Width | Target |
|------------|-------|--------|
| **Desktop** | Default | Large screens (1025px+) |
| **Tablet** | `max-width: 1024px` | Medium screens (769-1024px) |
| **Mobile** | `max-width: 768px` | Small screens (0-768px) |

### Responsive Patterns

#### 1. Navigation Collapse

```css
@media (max-width: 768px) {
    nav {
        display: none;  /* Hidden on mobile */
    }
}
```

**Effect**: Main navigation hidden, only logo and buttons visible

#### 2. Typography Scaling

```css
@media (max-width: 768px) {
    .hero h1 { font-size: 40px; }           /* 64px → 40px (-37.5%) */
    .hero p { font-size: 18px; }            /* 20px → 18px (-10%) */

    .feature-section-header h2,
    .marketing-section h2,
    .stats-section h2,
    .cta-section h2 { font-size: 36px; }    /* 48px → 36px (-25%) */

    .stat-value { font-size: 28px; }        /* 48px → 28px (-42%) */
}
```

**Strategy**:
- Large display: 37-42% reduction
- Medium headings: 25% reduction
- Body text: 10% reduction or maintained

#### 3. Padding Reduction

```css
@media (max-width: 768px) {
    header {
        padding: 16px 24px;  /* 16px 48px → 16px 24px */
    }

    .feature-section,
    .marketing-section,
    .stats-section,
    .cta-section {
        padding: 60px 24px;  /* 100px 48px → 60px 24px */
    }
}
```

**Horizontal**: 48px → 24px (50% reduction)
**Vertical**: 100px → 60px (40% reduction)

#### 4. Grid Column Collapse

##### Footer Grid
```css
/* Desktop */
grid-template-columns: 1.5fr repeat(4, 1fr);  /* 5 columns */

/* Tablet (1024px) */
grid-template-columns: repeat(2, 1fr);        /* 2 columns */

/* Mobile (768px) */
grid-template-columns: 1fr;                   /* 1 column */
```

##### Logos Grid
```css
/* Desktop */
grid-template-columns: repeat(5, 1fr);        /* 5 columns */

/* Tablet (1024px) */
grid-template-columns: repeat(3, 1fr);        /* 3 columns */

/* Mobile (768px) */
grid-template-columns: repeat(2, 1fr);        /* 2 columns */
```

##### Feature Cards, Stats, Metrics
```css
/* Desktop */
grid-template-columns: repeat(3, 1fr);        /* 3 columns */

/* Tablet (1024px) */
grid-template-columns: 1fr;                   /* 1 column */
```

#### 5. Flexbox Direction Change

```css
@media (max-width: 768px) {
    .cta-buttons {
        flex-direction: column;  /* Horizontal → Vertical */
    }

    .tabs {
        flex-direction: column;
        max-width: 300px;
        margin: 0 auto 40px;
    }

    .footer-bottom {
        flex-direction: column;
        text-align: center;
    }
}
```

**Effect**: Buttons and tabs stack vertically for easier mobile interaction

#### 6. Gap Reduction

```css
@media (max-width: 1024px) {
    .links-showcase-content {
        gap: 40px;  /* Down from 80px */
    }
}

@media (max-width: 768px) {
    .logos-grid {
        gap: 30px;  /* Down from 30px 60px */
    }

    .footer-content {
        gap: 40px;  /* Down from 48px */
    }
}
```

### Mobile-First vs Desktop-First

**Current Approach**: Desktop-first (overrides at smaller sizes)

```css
/* Desktop default */
.hero h1 {
    font-size: 64px;
}

/* Mobile override */
@media (max-width: 768px) {
    .hero h1 {
        font-size: 40px;
    }
}
```

**Alternative Mobile-First** (not used, but recommended):
```css
/* Mobile default */
.hero h1 {
    font-size: 40px;
}

/* Desktop enhancement */
@media (min-width: 769px) {
    .hero h1 {
        font-size: 64px;
    }
}
```

### Responsive Testing Checklist

- [ ] Header: Logo visible, nav hidden on mobile
- [ ] Hero: Typography scales, buttons stack
- [ ] Tabs: Vertical stack, centered, max-width 300px
- [ ] Product Preview: Full width maintained
- [ ] Logos: 5 → 3 → 2 column progression
- [ ] Feature Cards: 3 → 1 column
- [ ] Analytics Dashboard: Metrics 3 → 1 column
- [ ] Stats: 3 → 1 column
- [ ] Footer: 5 → 2 → 1 column progression
- [ ] All sections: 48px → 24px horizontal padding
- [ ] All sections: 100px → 60px vertical padding

---

## Z-Index Scale

The Dub2 design system uses a **minimal z-index approach**.

### Z-Index Values

| Level | Value | Element | Purpose |
|-------|-------|---------|---------|
| **Default** | `auto` | Most elements | Natural stacking |
| **Sticky Header** | `100` | `header` | Always visible navigation |

### Header Z-Index

```css
header {
    position: sticky;
    top: 0;
    z-index: 100;
}
```

**Purpose**: Ensures header stays above all content when scrolling
**Value**: 100 (room for future layers 0-99)

### Implicit Stacking

All other elements use default stacking context:

- Info banner: Shadow creates visual elevation (no z-index)
- Feature cards: Hover shadow (no z-index)
- Testimonials: Border provides definition (no z-index)

### Z-Index Best Practices

1. **Minimal Use**: Only 1 component needs z-index
2. **Semantic Values**: 100 for sticky header (not 9999)
3. **Room to Grow**: 0-99 available for future modals/overlays
4. **Visual Elevation ≠ Z-Index**: Use shadows for depth, not z-index

### Recommended Z-Index Scale (for future)

If expanding the design system:

| Layer | Z-Index | Usage |
|-------|---------|-------|
| **Base** | 0 | Default content |
| **Dropdowns** | 10 | Dropdown menus |
| **Sticky Elements** | 100 | Sticky header (current) |
| **Modals** | 1000 | Modal overlays |
| **Toasts** | 2000 | Notifications |
| **Tooltips** | 3000 | Tooltips (top layer) |

---

## Common Design Patterns

### Pattern 1: Section with Badge + Heading + Description + CTA

**Example**: Feature sections (Dub Links, Dub Analytics, Dub Partners)

```html
<section class="feature-section">
    <span class="section-badge">🔗 Dub Links</span>
    <div class="feature-section-header">
        <h2>It starts with a link</h2>
        <p>Create branded short links with superpowers...</p>
        <a href="#" class="btn btn-secondary">Explore Links</a>
    </div>
    <!-- Feature content -->
</section>
```

**CSS**:
```css
.feature-section {
    padding: 100px 48px;
}

.section-badge {
    /* Pill badge styles */
}

.feature-section-header {
    max-width: 600px;
    margin-bottom: 60px;
}

.feature-section-header h2 {
    font-size: 48px;
    margin-bottom: 16px;
}

.feature-section-header p {
    font-size: 18px;
    margin-bottom: 24px;
}
```

**Pattern Elements**:
1. Section badge (emoji + text, pill shape)
2. Large heading (Satoshi 48px)
3. Description paragraph (Inter 18px)
4. Secondary CTA button
5. 100px vertical padding

### Pattern 2: Preview + Info Banner

**Example**: Product preview section

```html
<section class="product-preview">
    <div class="preview-image">
        <span>Product Interface Preview</span>
    </div>

    <div class="info-banner">
        <div class="banner-content">
            <h3>Short Links</h3>
            <p>Create and manage short links at scale...</p>
        </div>
        <a href="#" class="btn btn-secondary">Learn more</a>
    </div>
</section>
```

**CSS**:
```css
.product-preview {
    max-width: 900px;
    margin: 0 auto 80px;
}

.preview-image {
    /* Large preview container */
    margin-bottom: 40px;
}

.info-banner {
    margin: -40px auto 0;  /* Negative margin overlaps preview */
    box-shadow: var(--shadow-default);
    /* Flexbox space-between layout */
}
```

**Pattern Features**:
- Preview container with aspect ratio
- Overlapping banner with negative margin
- Shadow elevation on banner
- Horizontal flexbox layout (content + button)

### Pattern 3: Three-Column Feature Cards

**Example**: Feature cards grid

```html
<div class="feature-cards">
    <div class="feature-card">
        <div class="feature-card-icon">🌐</div>
        <h3>Custom domains</h3>
        <p>Boost click-through rates...</p>
        <a href="#">Learn more →</a>
    </div>
    <!-- Repeat 2 more times -->
</div>
```

**CSS**:
```css
.feature-cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
}

.feature-card {
    padding: 24px;
    border: 1px solid hsl(var(--border));
    border-radius: 12px;
    transition: all 0.2s ease;
}

.feature-card:hover {
    box-shadow: var(--shadow-active);
}
```

**Pattern Structure**:
1. Icon/emoji (24px)
2. Heading (Inter 16px/600)
3. Description (Inter 14px/400)
4. Link (Inter 14px/500)
5. Hover shadow effect

**Responsive**: 3 columns → 1 column on tablet

### Pattern 4: Analytics Dashboard

**Example**: Metrics + data table

```html
<div class="analytics-dashboard">
    <div class="metrics-row">
        <div class="metric-card">
            <div class="metric-label">Clicks</div>
            <div class="metric-value">
                7.3K
                <svg class="sparkline">...</svg>
            </div>
        </div>
        <!-- Repeat for Leads, Sales -->
    </div>

    <table class="data-table">
        <!-- Table structure -->
    </table>
</div>
```

**CSS**:
```css
.analytics-dashboard {
    max-width: 900px;
    padding: 32px;
    box-shadow: var(--shadow-default);
}

.metrics-row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 32px;
    border-bottom: 1px solid hsl(var(--border));
    padding-bottom: 32px;
}
```

**Pattern Components**:
- Container with shadow elevation
- Metrics grid (3 columns)
- Bottom border separator
- Data table below metrics

### Pattern 5: Stats Section

**Example**: Large numbers with labels

```html
<section class="stats-section">
    <h2>Built to scale</h2>
    <p>Our powerful infrastructure...</p>

    <div class="stats-grid">
        <div class="stat-item">
            <div class="stat-label">Links Created</div>
            <div class="stat-value">91,135,591</div>
        </div>
        <!-- Repeat -->
    </div>
</section>
```

**CSS**:
```css
.stats-section {
    padding: 100px 48px;
    background: rgb(var(--bg-muted));
    text-align: center;
}

.stats-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 48px;
}

.stat-value {
    font-size: 48px;
    font-weight: 700;
    color: #ff6b35;  /* Accent color */
}
```

**Pattern Features**:
- Centered text layout
- Muted background section
- Uppercase small labels
- Large colored numbers (Satoshi 48px)
- 3-column grid layout

### Pattern 6: Testimonial

**Example**: Quote + author

```html
<div class="testimonial">
    <p class="testimonial-quote">"Dub is simply put the best way..."</p>
    <div class="testimonial-author">
        <div>
            <div class="author-name">Jorn van Dijk</div>
            <div class="author-title">CEO, Framer</div>
        </div>
    </div>
</div>
```

**CSS**:
```css
.testimonial {
    max-width: 900px;
    padding: 48px;
    background: white;
    border: 1px solid hsl(var(--border));
    border-radius: 12px;
}

.testimonial-quote {
    font-size: 20px;
    line-height: 1.6;
}

.author-name {
    font-family: var(--font-satoshi);
    font-weight: 600;
}
```

**Pattern Structure**:
- Large padding (48px)
- Readable quote (20px, 1.6 line-height)
- Author name in Satoshi (standout)
- Title in muted color

### Pattern 7: Footer Multi-Column

**Example**: Brand + 4 link columns

```html
<footer>
    <div class="footer-content">
        <div class="footer-brand">
            <div class="footer-logo">dub</div>
            <div class="social-links">...</div>
        </div>

        <div class="footer-column">
            <h4>Product</h4>
            <ul>
                <li><a href="#">Dub Links</a></li>
                <!-- More links -->
            </ul>
        </div>
        <!-- Repeat for Resources, Company, Compare -->
    </div>

    <div class="footer-bottom">
        <div class="footer-bottom-left">
            <div class="status-indicator">...</div>
        </div>
        <div class="footer-bottom-right">© 2025</div>
    </div>
</footer>
```

**CSS**:
```css
.footer-content {
    display: grid;
    grid-template-columns: 1.5fr repeat(4, 1fr);
    gap: 48px;
}

.footer-bottom {
    display: flex;
    justify-content: space-between;
    padding-top: 32px;
    border-top: 1px solid hsl(var(--border));
}
```

**Pattern Features**:
- Asymmetric grid (brand column 1.5× wider)
- Vertical link lists
- Horizontal social icons
- Bottom bar with space-between
- Status indicator (green dot + text)

---

## Component Reference Examples

### Example 1: Complete Hero Section

```html
<section class="hero">
    <div class="announcement">
        <span>Introducing Dub Partners</span>
        <a href="#">Read more →</a>
    </div>

    <h1>Turn clicks into revenue</h1>

    <p>Dub is the modern link attribution platform for short links, conversion tracking, and affiliate programs.</p>

    <div class="cta-buttons">
        <a href="#" class="btn btn-primary btn-large">Start for free</a>
        <a href="#" class="btn btn-ghost btn-large">Get a demo</a>
    </div>

    <div class="tabs">
        <div class="tab active">
            <span>🔗</span>
            Short Links
        </div>
        <div class="tab">
            <span>📊</span>
            Conversion Analytics
        </div>
        <div class="tab">
            <span>💜</span>
            Affiliate Programs
        </div>
    </div>
</section>
```

**Key CSS**:
```css
.hero {
    text-align: center;
    padding: 80px 48px 60px;
    max-width: 1200px;
    margin: 0 auto;
}

.hero h1 {
    font-family: var(--font-satoshi);
    font-size: 64px;
    font-weight: 700;
    letter-spacing: -0.02em;
    line-height: 1.1;
    margin-bottom: 24px;
}

.hero p {
    font-size: 20px;
    line-height: 1.6;
    max-width: 650px;
    margin: 0 auto 32px;
}
```

**Features**:
- Centered text alignment
- Announcement badge at top
- Large Satoshi heading (64px)
- Readable description (20px, constrained width)
- Dual CTA buttons (primary + ghost)
- Interactive tabs below

### Example 2: Complete Feature Card

```html
<div class="feature-card">
    <div class="feature-card-icon">🌐</div>
    <h3>Custom domains</h3>
    <p>Boost click-through rates by 30% with custom domains that match your brand.</p>
    <a href="#">Learn more →</a>
</div>
```

**Key CSS**:
```css
.feature-card {
    padding: 24px;
    background: rgb(var(--bg-default));
    border: 1px solid hsl(var(--border));
    border-radius: 12px;
    transition: all 0.2s ease;
}

.feature-card:hover {
    box-shadow: 0 0 8px -2px rgba(0, 0, 0, 0.1),
                0 6px 20px -3px rgba(0, 0, 0, 0.2);
}

.feature-card-icon {
    font-size: 24px;
    margin-bottom: 16px;
}

.feature-card h3 {
    font-size: 16px;
    font-weight: 600;
    color: rgb(var(--content-emphasis));
    margin-bottom: 8px;
}

.feature-card p {
    font-size: 14px;
    color: rgb(var(--content-subtle));
    line-height: 1.6;
    margin-bottom: 12px;
}

.feature-card a {
    font-size: 14px;
    color: rgb(var(--content-emphasis));
    font-weight: 500;
}
```

**Structure**:
1. Icon (24px emoji, 16px bottom margin)
2. Heading (16px/600, 8px bottom margin)
3. Description (14px/400, subtle color, 12px bottom margin)
4. Link (14px/500, emphasized color)
5. Hover shadow effect

### Example 3: Complete Analytics Metric Card

```html
<div class="metric-card">
    <div class="metric-label">Clicks</div>
    <div class="metric-value">
        7.3K
        <svg class="sparkline" viewBox="0 0 80 24">
            <path d="M 0 20 L 10 18 L 20 15 L 30 12 L 40 14 L 50 10 L 60 8 L 70 6 L 80 4" />
        </svg>
    </div>
</div>
```

**Key CSS**:
```css
.metric-card {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.metric-label {
    font-size: 13px;
    font-weight: 500;
    color: rgb(var(--content-muted));
}

.metric-value {
    font-size: 32px;
    font-weight: 700;
    color: rgb(var(--content-emphasis));
    font-family: var(--font-satoshi);
    display: flex;
    align-items: center;
    gap: 12px;
}

.sparkline {
    width: 80px;
    height: 24px;
}

.sparkline path {
    fill: none;
    stroke: #8b5cf6;
    stroke-width: 2;
}
```

**Features**:
- Vertical layout (flex column)
- Small muted label
- Large bold value (Satoshi 32px)
- Inline sparkline chart (purple)
- 8px gap between elements

### Example 4: Complete Button Group

```html
<div class="cta-buttons">
    <a href="#" class="btn btn-primary btn-large">Start for free</a>
    <a href="#" class="btn btn-ghost btn-large">Get a demo</a>
</div>
```

**Key CSS**:
```css
.cta-buttons {
    display: flex;
    gap: 12px;
    justify-content: center;
    margin-bottom: 48px;
}

.btn {
    padding: 8px 16px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    border: 1px solid transparent;
    transition: all 0.2s ease;
}

.btn-large {
    padding: 12px 24px;
    font-size: 15px;
}

.btn-primary {
    background: rgb(23, 23, 23);
    color: rgb(255, 255, 255);
}

.btn-primary:hover {
    opacity: 0.9;
}

.btn-ghost {
    color: rgb(64, 64, 64);
    background: transparent;
}

.btn-ghost:hover {
    background: rgb(245, 245, 245);
}

@media (max-width: 768px) {
    .cta-buttons {
        flex-direction: column;
    }
}
```

**Features**:
- Centered horizontal layout
- 12px gap between buttons
- Primary (dark) + Ghost (transparent) variants
- Large size (12px 24px, 15px font)
- Stacks vertically on mobile

### Example 5: Complete Data Table

```html
<table class="data-table">
    <thead>
        <tr>
            <th>Event</th>
            <th>Link</th>
            <th>Referrer</th>
            <th>Country</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Link click</td>
            <td>acme.link</td>
            <td>(direct)</td>
            <td>United States</td>
        </tr>
        <tr>
            <td>Sign Up</td>
            <td>acme.link/signup</td>
            <td>google.com</td>
            <td>India</td>
        </tr>
    </tbody>
</table>
```

**Key CSS**:
```css
.data-table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
}

.data-table thead {
    border-bottom: 1px solid hsl(0 0% 89.8%);
}

.data-table th {
    text-align: left;
    padding: 12px 16px;
    font-size: 13px;
    font-weight: 500;
    color: rgb(163, 163, 163);
}

.data-table td {
    padding: 12px 16px;
    font-size: 14px;
    color: rgb(64, 64, 64);
    border-bottom: 1px solid hsl(0 0% 89.8%);
}

.data-table tr:last-child td {
    border-bottom: none;
}
```

**Features**:
- Full width table
- Left-aligned text
- Smaller muted headers (13px)
- Regular body text (14px)
- Bottom borders on rows
- No border on last row

---

## Tailwind CSS Equivalent Usage

The Dub2 design uses custom CSS, but here's how it maps to Tailwind CSS utilities.

### Color Classes

#### Background Colors

| Custom CSS | Tailwind Equivalent | Color |
|------------|---------------------|-------|
| `rgb(var(--bg-default))` | `bg-white` | #ffffff |
| `rgb(var(--bg-muted))` | `bg-neutral-50` | #fafafa |
| `rgb(var(--bg-subtle))` | `bg-neutral-100` | #f5f5f5 |
| `rgb(var(--bg-inverted))` | `bg-neutral-900` | #171717 |

#### Text Colors

| Custom CSS | Tailwind Equivalent | Color |
|------------|---------------------|-------|
| `rgb(var(--content-emphasis))` | `text-neutral-900` | #171717 |
| `rgb(var(--content-default))` | `text-neutral-700` | #404040 |
| `rgb(var(--content-subtle))` | `text-neutral-600` | #737373 |
| `rgb(var(--content-muted))` | `text-neutral-400` | #a3a3a3 |
| `rgb(var(--content-inverted))` | `text-white` | #ffffff |

#### Border Colors

| Custom CSS | Tailwind Equivalent | Color |
|------------|---------------------|-------|
| `hsl(var(--border))` | `border-neutral-200` | #e5e5e5 |

#### Accent Colors

| Custom CSS | Tailwind Equivalent | Color |
|------------|---------------------|-------|
| `#ff6b35` | `text-orange-500` | Coral orange |
| `#8b5cf6` | `text-violet-500` | Purple |
| `#10b981` | `text-emerald-500` | Green |

### Typography Classes

#### Font Families

```jsx
// Custom CSS
font-family: var(--font-satoshi)
font-family: var(--font-inter)

// Tailwind equivalent (with config)
className="font-satoshi"
className="font-inter"  // or font-sans if Inter is default
```

**Tailwind Config**:
```javascript
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        satoshi: ['Satoshi', 'system-ui', 'sans-serif'],
        inter: ['Inter', 'system-ui', 'sans-serif'],
      }
    }
  }
}
```

#### Font Sizes

| Element | Custom CSS | Tailwind Equivalent |
|---------|------------|---------------------|
| Hero H1 | `font-size: 64px` | `text-6xl` (60px) or custom `text-[64px]` |
| CTA H2 | `font-size: 56px` | `text-5xl` (48px) or custom `text-[56px]` |
| Section H2 | `font-size: 48px` | `text-5xl` |
| Feature H2 | `font-size: 40px` | `text-4xl` |
| Stat Value | `font-size: 48px` | `text-5xl` |
| Metric Value | `font-size: 32px` | `text-3xl` |
| Logo | `font-size: 20px` | `text-xl` |
| Hero P | `font-size: 20px` | `text-xl` |
| Description | `font-size: 18px` | `text-lg` |
| Card H3 | `font-size: 16px` | `text-base` |
| Button/Nav | `font-size: 14px` | `text-sm` |
| Badge | `font-size: 13px` | `text-[13px]` |
| Stat Label | `font-size: 12px` | `text-xs` |
| Logo Badge | `font-size: 10px` | `text-[10px]` |

#### Font Weights

| Custom CSS | Tailwind Equivalent |
|------------|---------------------|
| `font-weight: 300` | `font-light` |
| `font-weight: 400` | `font-normal` |
| `font-weight: 500` | `font-medium` |
| `font-weight: 600` | `font-semibold` |
| `font-weight: 700` | `font-bold` |

#### Line Heights

| Custom CSS | Tailwind Equivalent |
|------------|---------------------|
| `line-height: 1.1` | `leading-none` (1) or `leading-[1.1]` |
| `line-height: 1.2` | `leading-tight` (1.25) or `leading-[1.2]` |
| `line-height: 1.5` | `leading-normal` (1.5) |
| `line-height: 1.6` | `leading-relaxed` (1.625) or `leading-[1.6]` |

#### Letter Spacing

| Custom CSS | Tailwind Equivalent |
|------------|---------------------|
| `letter-spacing: -0.02em` | `tracking-tight` (-0.025em) or `tracking-[-0.02em]` |
| `letter-spacing: 0.05em` | `tracking-wide` (0.025em) or `tracking-[0.05em]` |
| `letter-spacing: 0.1em` | `tracking-wider` (0.05em) or `tracking-[0.1em]` |

### Spacing Classes

#### Padding

| Custom CSS | Tailwind Equivalent |
|------------|---------------------|
| `padding: 8px 16px` | `px-4 py-2` |
| `padding: 12px 24px` | `px-6 py-3` |
| `padding: 6px 14px` | `px-3.5 py-1.5` |
| `padding: 24px` | `p-6` |
| `padding: 32px` | `p-8` |
| `padding: 48px` | `p-12` |
| `padding: 100px 48px` | `px-12 py-25` (custom) |

#### Margin

| Custom CSS | Tailwind Equivalent |
|------------|---------------------|
| `margin-bottom: 8px` | `mb-2` |
| `margin-bottom: 12px` | `mb-3` |
| `margin-bottom: 16px` | `mb-4` |
| `margin-bottom: 24px` | `mb-6` |
| `margin-bottom: 32px` | `mb-8` |
| `margin-bottom: 48px` | `mb-12` |
| `margin-bottom: 60px` | `mb-15` (custom) |

#### Gap

| Custom CSS | Tailwind Equivalent |
|------------|---------------------|
| `gap: 8px` | `gap-2` |
| `gap: 12px` | `gap-3` |
| `gap: 16px` | `gap-4` |
| `gap: 20px` | `gap-5` |
| `gap: 24px` | `gap-6` |
| `gap: 32px` | `gap-8` |
| `gap: 48px` | `gap-12` |

### Border Radius

| Custom CSS | Tailwind Equivalent |
|------------|---------------------|
| `border-radius: 8px` | `rounded-lg` |
| `border-radius: 12px` | `rounded-xl` |
| `border-radius: 20px` | `rounded-[20px]` |
| `border-radius: 50%` | `rounded-full` |

### Shadows

| Custom CSS | Tailwind Equivalent |
|------------|---------------------|
| `var(--shadow-default)` | `shadow-md` (close) or custom |
| `var(--shadow-active)` | `shadow-xl` (close) or custom |

**Tailwind Config** (for exact shadows):
```javascript
module.exports = {
  theme: {
    extend: {
      boxShadow: {
        'dub-default': '0 2px 6px -1px rgba(0, 0, 0, 0.16), 0 1px 4px -1px rgba(0, 0, 0, 0.04)',
        'dub-active': '0 0 8px -2px rgba(0, 0, 0, 0.1), 0 6px 20px -3px rgba(0, 0, 0, 0.2)',
      }
    }
  }
}
```

### Complete Component Examples (Tailwind)

#### Button Component

```jsx
// Primary Button
<a className="px-6 py-3 text-sm font-medium bg-neutral-900 text-white rounded-lg transition-all duration-200 hover:opacity-90">
  Sign Up
</a>

// Ghost Button
<a className="px-6 py-3 text-sm font-medium text-neutral-700 bg-transparent rounded-lg transition-all duration-200 hover:bg-neutral-100">
  Log in
</a>

// Secondary Button
<a className="px-6 py-3 text-sm font-medium bg-neutral-50 text-neutral-900 border border-neutral-200 rounded-lg transition-all duration-200 hover:bg-neutral-100">
  Learn more
</a>
```

#### Feature Card Component

```jsx
<div className="p-6 bg-white border border-neutral-200 rounded-xl transition-all duration-200 hover:shadow-dub-active">
  <div className="text-2xl mb-4">🌐</div>
  <h3 className="text-base font-semibold text-neutral-900 mb-2">
    Custom domains
  </h3>
  <p className="text-sm text-neutral-600 leading-relaxed mb-3">
    Boost click-through rates by 30% with custom domains that match your brand.
  </p>
  <a href="#" className="text-sm font-medium text-neutral-900 hover:underline">
    Learn more →
  </a>
</div>
```

#### Hero Section Component

```jsx
<section className="text-center px-12 py-20 max-w-7xl mx-auto">
  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-neutral-50 border border-neutral-200 rounded-full text-[13px] font-medium mb-8">
    <span>Introducing Dub Partners</span>
    <a href="#" className="text-neutral-700">Read more →</a>
  </div>

  <h1 className="font-satoshi text-[64px] font-bold text-neutral-900 mb-6 tracking-tight leading-[1.1]">
    Turn clicks into revenue
  </h1>

  <p className="text-xl text-neutral-600 max-w-2xl mx-auto mb-8 leading-relaxed">
    Dub is the modern link attribution platform for short links, conversion tracking, and affiliate programs.
  </p>

  <div className="flex gap-3 justify-center mb-12">
    <a href="#" className="px-6 py-3 text-sm font-medium bg-neutral-900 text-white rounded-lg">
      Start for free
    </a>
    <a href="#" className="px-6 py-3 text-sm font-medium text-neutral-700 rounded-lg hover:bg-neutral-100">
      Get a demo
    </a>
  </div>
</section>
```

#### Metric Card Component

```jsx
<div className="flex flex-col gap-2">
  <div className="text-[13px] font-medium text-neutral-400">
    Clicks
  </div>
  <div className="font-satoshi text-3xl font-bold text-neutral-900 flex items-center gap-3">
    7.3K
    <svg className="w-20 h-6" viewBox="0 0 80 24">
      <path d="M 0 20 L 10 18 L 20 15..." fill="none" stroke="#8b5cf6" strokeWidth="2" />
    </svg>
  </div>
</div>
```

### Responsive Classes

```jsx
// Hero heading responsive
<h1 className="text-[40px] md:text-[64px] font-bold">
  Turn clicks into revenue
</h1>

// Section padding responsive
<section className="px-6 py-15 md:px-12 md:py-25">
  {/* Content */}
</section>

// Grid responsive
<div className="grid grid-cols-1 md:grid-cols-3 gap-5">
  {/* Feature cards */}
</div>

// Flex direction responsive
<div className="flex flex-col md:flex-row gap-3">
  {/* CTA buttons */}
</div>
```

---

## Accessibility Guidelines

### Color Contrast

All text meets WCAG AA standards (4.5:1 minimum):

| Text | Background | Ratio | Pass |
|------|------------|-------|------|
| Emphasis (#171717) | White (#ffffff) | 16.1:1 | AAA ✓ |
| Default (#404040) | White | 9.4:1 | AAA ✓ |
| Subtle (#737373) | White | 5.3:1 | AA ✓ |
| Muted (#a3a3a3) | White | 3.1:1 | Fail (decorative only) |
| Inverted (white) | Dark (#171717) | 16.1:1 | AAA ✓ |

**Exception**: Content-muted color fails contrast but is used only for decorative elements (icons, metadata) not essential content.

### Semantic HTML

The design uses proper semantic elements:

```html
<header>         <!-- Site header -->
<nav>            <!-- Navigation -->
<section>        <!-- Page sections -->
<h1>, <h2>, <h3> <!-- Heading hierarchy -->
<footer>         <!-- Site footer -->
<ul>, <li>       <!-- Lists -->
<table>, <thead>, <tbody>, <th>, <td> <!-- Data tables -->
```

### Focus States

While not explicitly styled in current code, focus states should be added:

```css
/* Recommended additions */
.btn:focus-visible {
    outline: 2px solid hsl(var(--ring));
    outline-offset: 2px;
}

nav a:focus-visible {
    outline: 2px solid hsl(var(--ring));
    outline-offset: 4px;
}
```

### Keyboard Navigation

All interactive elements use proper HTML:

- **Buttons**: `<a>` tags with href (keyboard accessible)
- **Tabs**: JavaScript adds/removes `active` class on click
- **Links**: Standard `<a>` elements

**Recommendation**: Add keyboard support for tabs:

```javascript
tab.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
    }
});
```

### ARIA Attributes

Current usage:

```html
<a href="#" aria-label="Twitter">
<a href="#" aria-label="LinkedIn">
<a href="#" aria-label="GitHub">
<a href="#" aria-label="YouTube">
```

**Recommendations**:

```html
<!-- Tab component -->
<div class="tabs" role="tablist">
    <div class="tab active" role="tab" aria-selected="true" tabindex="0">
        <span>🔗</span> Short Links
    </div>
    <div class="tab" role="tab" aria-selected="false" tabindex="-1">
        <span>📊</span> Conversion Analytics
    </div>
</div>

<!-- Navigation -->
<nav aria-label="Main navigation">
    <a href="#">Product</a>
    <a href="#">Solutions</a>
</nav>

<!-- Status indicator -->
<div class="status-indicator">
    <span class="status-dot" role="img" aria-label="Operational"></span>
    All systems operational
</div>
```

### Image Alternatives

Current design uses emojis for icons (inherently accessible). For production:

```html
<!-- Decorative emojis -->
<span role="img" aria-hidden="true">🔗</span>

<!-- Meaningful icons -->
<span role="img" aria-label="Link icon">🔗</span>
```

### Form Accessibility

While no forms exist in current design, recommended pattern:

```html
<label for="email">Email address</label>
<input
    type="email"
    id="email"
    name="email"
    aria-required="true"
    aria-describedby="email-hint"
/>
<p id="email-hint">We'll never share your email.</p>
```

### Skip Links

Recommended addition:

```html
<a href="#main-content" class="skip-link">Skip to main content</a>

<main id="main-content">
    <!-- Page content -->
</main>
```

```css
.skip-link {
    position: absolute;
    left: -9999px;
    top: 0;
}

.skip-link:focus {
    left: 0;
    z-index: 9999;
    padding: 8px 16px;
    background: rgb(var(--bg-inverted));
    color: rgb(var(--content-inverted));
}
```

---

## Best Practices

### Design System Principles

1. **Consistency**: Use color variables, not hardcoded values
2. **Hierarchy**: Clear visual hierarchy through size, weight, color
3. **Whitespace**: Generous spacing creates breathing room
4. **Performance**: Minimize shadows, transitions, use GPU-accelerated properties
5. **Accessibility**: Meet WCAG AA contrast ratios, semantic HTML

### Color Usage

✅ **Do**:
- Use `rgb(var(--bg-default))` for backgrounds
- Use `rgb(var(--content-emphasis))` for headings
- Use `hsl(var(--border))` for borders
- Define accent colors once, reuse

❌ **Don't**:
- Hardcode hex colors throughout CSS
- Use `--content-muted` for essential text (fails contrast)
- Mix HSL and RGB for same element (choose one)

### Typography

✅ **Do**:
- Use Satoshi for all headings (h1-h6)
- Use Inter for all body, navigation, UI
- Apply negative letter-spacing to large headings (-0.02em)
- Use 1.6 line-height for body text

❌ **Don't**:
- Mix fonts within same hierarchy level
- Use font sizes outside the defined scale
- Apply letter-spacing to body text (default 0)
- Use Satoshi for long paragraphs (less readable)

### Spacing

✅ **Do**:
- Use multiples of 4px when possible
- Maintain consistent section padding (100px vertical, 48px horizontal)
- Use gap for flexbox/grid spacing
- Reduce spacing proportionally on mobile

❌ **Don't**:
- Use arbitrary pixel values (17px, 23px, etc.)
- Mix padding/margin for same purpose
- Forget to adjust spacing on mobile breakpoints

### Components

✅ **Do**:
- Include all button states (default, hover, active, focus)
- Use 0.2s transitions for consistency
- Apply hover shadows to cards for depth
- Use semantic class names (`.btn-primary`, not `.blue-button`)

❌ **Don't**:
- Create components without hover states
- Use different transition durations arbitrarily
- Add shadows to all components (minimal use)
- Nest classes deeply (`.card .content .title .text`)

### Responsive Design

✅ **Do**:
- Test all breakpoints (desktop, tablet, mobile)
- Reduce font sizes 25-40% on mobile
- Stack flex items vertically on mobile
- Collapse grids to 1-2 columns on mobile

❌ **Don't**:
- Hide essential content on mobile (nav is exception)
- Use fixed widths (use max-width)
- Forget to adjust padding/margins
- Use too many breakpoints (2 is sufficient)

### Performance

✅ **Do**:
- Transition specific properties when possible (`color`, not `all`)
- Use `will-change` for known animations (sparingly)
- Minimize repaints (transform over top/left)
- Load fonts with `display=swap`

❌ **Don't**:
- Animate layout properties (width, height, top, left)
- Add excessive shadows
- Create complex animations
- Load unnecessary font weights

### Accessibility

✅ **Do**:
- Use semantic HTML elements
- Provide aria-labels for icon-only buttons
- Ensure 4.5:1 contrast for text
- Support keyboard navigation

❌ **Don't**:
- Use div/span for buttons
- Rely only on color to convey information
- Remove focus outlines without replacement
- Use low-contrast text for essential content

---

## Conclusion

The **Dub2 Design System** represents a mature, professional SaaS aesthetic built on:

- **Dual-Font Typography**: Satoshi for personality, Inter for readability
- **Minimal Color Palette**: Grayscale foundation with selective accents
- **Subtle Depth**: Two-level shadow system, minimal use
- **Consistent Spacing**: 4px base, clear hierarchy
- **Responsive-First**: Mobile-optimized with single breakpoint
- **Performance-Focused**: Fast transitions, minimal animations

### Design System Stats

- **Colors**: 18 semantic + 3 accent colors
- **Typography Scale**: 12 font sizes (10px - 64px)
- **Spacing Values**: 15+ consistent values
- **Components**: 15+ reusable patterns
- **Shadows**: 2 levels
- **Border Radius**: 4 levels
- **Breakpoints**: 2 (tablet, mobile)

### Quick Reference

| Aspect | Key Values |
|--------|------------|
| **Fonts** | Satoshi (headings), Inter (body) |
| **Primary Color** | #171717 (dark gray) |
| **Background** | #ffffff (white), #fafafa (off-white) |
| **Accents** | #ff6b35 (coral), #8b5cf6 (purple) |
| **Border Radius** | 8px (small), 12px (medium), 20px (pills) |
| **Shadows** | 2-layer system (default, active) |
| **Transitions** | 0.2s ease (all interactions) |
| **Section Padding** | 100px vertical, 48px horizontal |
| **Mobile Breakpoint** | 768px |

---

**End of Style Guide** | **Total Lines**: 2,500+ | **Version**: 2.0 | **Last Updated**: November 6, 2025

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**ContentGen** - An AI-powered content generation SaaS platform for creating SEO-ready articles, blog posts, and social media content.

**Current State**: Landing page prototype (HTML/CSS only, no backend or framework)

**Tech Stack**:
- Pure HTML + Tailwind CSS (CDN)
- Vanilla JavaScript for interactions
- Font: Satoshi (headings) + Inter (body text)
- No build process, package.json, or dependencies

## Design System

This project follows the **Dub2 Design System** documented in `STYLE_GUIDE.md`. Key principles:

### Color System (Dual HSL + RGB)
- Background: `rgb(255 255 255)` (white), `rgb(250 250 250)` (muted), `rgb(245 245 245)` (subtle)
- Text: `rgb(23 23 23)` (emphasis), `rgb(64 64 64)` (default), `rgb(115 115 115)` (subtle)
- Borders: `hsl(0 0% 89.8%)` or `#e5e5e5`
- Accents: `#ff6b35` (orange), `#8b5cf6` (purple), `#10b981` (green)

### Typography
- **Headings (h1-h6)**: `font-family: var(--font-satoshi)` (Satoshi 700 bold)
- **Card headings (h3)**: Inter 600 semibold
- **Body text**: Inter 400
- **Buttons/labels**: Inter 500 medium

### Spacing (4px base unit)
- Section padding: `py-[100px] px-12` (desktop) → `py-[60px] px-6` (mobile)
- Button padding: `py-2 px-4` (small), `py-3 px-6` (large)
- Gaps: `gap-3` (12px), `gap-8` (32px), `gap-12` (48px)

### Border Radius
- Buttons/tabs: `rounded-lg` (8px)
- Cards: `rounded-xl` (12px)
- Pills/badges: `rounded-[20px]` (20px)

### Shadows
```css
--shadow-default: 0 2px 6px -1px rgba(0, 0, 0, 0.16), 0 1px 4px -1px rgba(0, 0, 0, 0.04)
--shadow-active: 0 0 8px -2px rgba(0, 0, 0, 0.1), 0 6px 20px -3px rgba(0, 0, 0, 0.2)
```

## MVP Requirements (Dashboard)

See `req_1.md` for full frontend MVP requirements. Key sections to implement:

1. **Sidebar Navigation**: Logo, plan info, nav links (Dashboard, AI Article Writer, All Tools, My Content), profile avatar/dropdown
2. **Header**: Greeting message, 4 metric cards (Words Generated, Items Generated, Time Saved, Tools Used)
3. **Most Popular Tools**: Grid of tool cards with icon, title, description, chevron
4. **Promotional Banner**: SEO autopilot feature with CTA button
5. **Recent Content**: List/grid of generated articles with hover actions (View/Edit/Delete)
6. **Floating Chat Button**: Bottom-right, circular help icon

**Important**: All functionality is mock/static data - no backend integration in MVP.

## Responsive Breakpoints
- Mobile: `md:` (768px)
- Tablet: `lg:` (1024px)
- Desktop: multi-column layout, fixed sidebar

## Current File Structure
```
/home/nishil/Documents/work/article-gen/
├── contentgen.html      # Landing page (complete)
├── req_1.md             # Dashboard MVP requirements
├── STYLE_GUIDE.md       # Comprehensive design system (85KB)
└── CLAUDE.md           # This file
```

## Development Notes

### When creating new pages/components:
1. **Always** reference `STYLE_GUIDE.md` for exact color values, spacing units, and component patterns
2. Use the same CSS variable structure from `contentgen.html:68-89`
3. Follow the dual-font system (Satoshi headings + Inter body)
4. Maintain responsive patterns: mobile-first approach with `md:` and `lg:` breakpoints
5. Use inline comments to document design token mapping (see `contentgen.html:18-66`)

### Component Reusability
- Extract sidebar navigation as standalone component for reuse across dashboard pages
- Metric cards, tool cards, and content cards should use consistent styling from design system
- Button variants: primary (`bg-[#171717] text-white`), secondary (`bg-[#fafafa] border border-[#e5e5e5]`)

### JavaScript Patterns
- Keep JavaScript minimal and inline (see `contentgen.html:925-975`)
- Use vanilla DOM manipulation (no jQuery or frameworks)
- Mobile menu toggle pattern with aria-expanded accessibility
- FAQ accordion with single-open behavior

### Accessibility
- All interactive elements need `aria-label` or `aria-expanded` attributes
- Semantic HTML structure (header, nav, main, section, footer)
- Color contrast meets WCAG AA standards (text-[#737373] on white background is minimum)

## Common Tasks

### Creating the Dashboard MVP
1. Start with the HTML structure from `contentgen.html` (header, responsive layout)
2. Implement sidebar navigation component first (reusable across pages)
3. Build metric cards section with mock data
4. Add tool grid using feature card pattern from landing page
5. Implement recent content table/grid with hover states
6. Add floating chat button (fixed bottom-right positioning)

### Styling New Components
Always check `STYLE_GUIDE.md` first for:
- Exact Tailwind class combinations
- Shadow utilities (`.shadow-default`, `.shadow-active`)
- Animation/transition durations (200ms standard)
- Hover state patterns

## Design Philosophy

**Modern SaaS Minimalism**:
- Generous whitespace (don't crowd elements)
- High contrast text hierarchy
- Subtle hover states (opacity-90, bg-[#f5f5f5])
- Clean borders over heavy shadows
- Icons and emojis for visual interest (but don't overuse)

**Content-First**:
- Clear information hierarchy
- Scannable layouts with section badges
- Strong CTAs without being pushy
- Mobile-optimized reading experience

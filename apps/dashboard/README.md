# ContentGen Dashboard

A modern, responsive dashboard for the ContentGen AI content generation platform.

## Features

### Implemented Components

- **Sidebar Navigation**: Fixed sidebar with logo, plan information, navigation links, and user profile
- **Dashboard Header**: Personalized greeting message
- **Metrics Cards**: 4 metric cards displaying:
  - Words Generated
  - Items Generated
  - Time Saved
  - Tools Used
- **Most Popular Tools**: Grid of tool cards with descriptions
- **Promotional Banner**: SEO Autopilot feature promotion with benefits list
- **Recent Content**: List of generated content with hover actions (View, Edit, Delete)
- **Floating Chat Button**: Fixed bottom-right help button

### Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom design tokens
- **UI Components**: shadcn/ui (customized)
- **Fonts**: Satoshi (headings) + Inter (body)
- **Design System**: Dub2

## Getting Started

### Development

```bash
# Install dependencies
npm install

# Run development server (port 3001)
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Access

- Development: http://localhost:3001
- Landing page: http://localhost:3000 (if running)

## Design System

The dashboard follows the Dub2 design system:

### Colors

- Background: `#ffffff` (white), `#fafafa` (muted), `#f5f5f5` (subtle)
- Text: `#171717` (emphasis), `#404040` (default), `#737373` (subtle)
- Borders: `#e5e5e5`
- Accents: `#ff6b35` (orange), `#8b5cf6` (purple), `#10b981` (green)

### Typography

- Headings: Satoshi 700 bold
- UI Elements: Inter (400, 500, 600)

### Spacing

- Base unit: 4px
- Section padding: 100px (desktop) → 60px (mobile)
- Component gaps: 12px, 24px, 48px

### Shadows

- Default: Subtle elevation
- Active: Hover state

## Responsive Design

- **Desktop** (1024px+): Multi-column layout with fixed sidebar
- **Tablet** (768px - 1023px): Collapsible sidebar
- **Mobile** (<768px): Single-column, hamburger menu

## Mock Data

All functionality uses mock data from `lib/mockData.ts`:

- User information
- Metrics statistics
- Tool descriptions
- Recent content items

## Interactive Features (Mock)

All interactions show "Coming Soon" alerts:

- Tool navigation
- Content actions (View, Edit, Delete)
- SEO Autopilot activation
- Chat button
- Plan upgrade

## Component Structure

```
components/
├── ui/                          # shadcn/ui base components
│   ├── button.tsx
│   ├── card.tsx
│   ├── badge.tsx
│   └── avatar.tsx
├── sidebar.tsx                  # Main navigation sidebar
├── metric-card.tsx             # Metric display card
├── tool-card.tsx               # Tool card with hover effects
├── content-card.tsx            # Content item with actions
├── promotional-banner.tsx      # SEO Autopilot promotion
└── floating-chat-button.tsx   # Help button
```

## Future Enhancements

- Backend integration for real data
- Authentication and user management
- Real-time statistics
- Functional content management
- Advanced analytics
- Multi-language support

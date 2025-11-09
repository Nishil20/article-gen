# Article Generator — Frontend Requirements (MVP)

This document defines the functional and structural requirements for the frontend MVP. It excludes any visual color, typography, or spacing specifications, as those will follow the separate design guide provided by the user.

---

## Dashboard Overview

The goal is to create a clean, modern dashboard focusing on a friendly tone, clear layout, and easy access to tools and statistics.

### Primary Sections

1. **Sidebar Navigation**

   * Logo and app name at the top.
   * Plan info (e.g., Free Trial, words left) with an upgrade button.
   * Navigation links:

     * Dashboard (active state for current page)
     * AI Article Writer
     * All Tools
     * My Content
   * Bottom section: profile avatar, username, and dropdown (mock only).

2. **Header (Main Content Top)**

   * Greeting message: “Hey [User] — Let’s boost your website traffic today!”
   * Four summary metric cards showing:

     * Words Generated
     * Items Generated
     * Time Saved
     * Tools Used
   * Each card displays a bold numeric value and descriptive label.

3. **Most Popular Tools Section**

   * Title: *Most Popular Tools*
   * Subtext: “These are the most popular tools and a good place to start. Give them a try!”
   * Tool cards (e.g., Article Generator, Blog Post Writer, Content Rewriter, Paragraph Generator).
   * Each tool card includes:

     * Icon
     * Title
     * Short description
     * Navigation arrow or chevron.

4. **Promotional Banner (Hero Area)**

   * Large, full-width section promoting automated SEO features.
   * Includes headline, brief benefits list, and a primary CTA button (e.g., “Activate Autopilot”).
   * Right side: placeholder for visuals (mock analytic widgets or charts).

5. **Recent Content Section**

   * Title: *Recent Content*
   * List or grid of generated articles with thumbnail, title, date, and word count.
   * Hover actions: “View,” “Edit,” and “Delete” (mock only).
   * “View All” button at top-right.

6. **Floating Chat Button**

   * Fixed bottom-right position.
   * Circular button with a chat/help icon.

---

## Responsiveness

* Desktop: multi-column layout (sidebar fixed, main content centered).
* Tablet: collapsible sidebar.
* Mobile: single-column stacking, sidebar accessible via drawer.

---

## Interactivity & Mock Behavior

* All tool cards, buttons, and charts are **non-functional** in the MVP.
* Metric numbers and content lists are **static or random** mock data.
* “Activate Autopilot” triggers a mock modal or toast (“Coming Soon”).
* Sidebar links visually update active state but stay on the same page.

---

## UI Component Map (shadcn components)

| Section        | Components                                                   |
| -------------- | ------------------------------------------------------------ |
| Sidebar        | `Card`, `Button`, `NavigationMenu`, `Avatar`, `DropdownMenu` |
| Metrics        | `Card`, `Badge`, `Tooltip`                                   |
| Tools Grid     | `Card`, `Button`, `Tooltip`                                  |
| Banner         | `Card`, `Button`, `Separator`, `Badge`                       |
| Recent Content | `Card`, `Table` or grid, `Button`                            |
| Floating Chat  | `Button` (circular variant)                                  |

---

## Animation & Transitions

* Subtle fade-in and slide transitions for cards and tool grids.
* Hover transitions for interactivity feedback.

---

## Deliverables for Frontend MVP

1. Dashboard page replicating layout and structure.
2. Sidebar component reusable across other tool pages.
3. Mock data (metrics, tools, recent content) in local constants.
4. Responsive layout for desktop, tablet, and mobile.
5. No backend — all functionality is static or simulated.

---

## Future Expansion (Post-MVP)

* Integrate backend for real user data.
* Add authentication, billing, and analytics.
* Enable real-time stats and AI-driven article management.

---

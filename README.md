# ContentGen - AI-Powered Content Generation Platform

A modern monorepo setup for the ContentGen SaaS platform, featuring a landing page and future dashboard application.

## 🏗️ Project Structure

```
article-gen/
├── apps/
│   ├── landing/          # Landing page (Next.js 14 + TypeScript)
│   └── web/              # Dashboard app (coming soon)
├── packages/
│   ├── ui/               # Shared React components (coming soon)
│   ├── design-tokens/    # Design system (Tailwind preset)
│   └── tsconfig/         # Shared TypeScript configs
├── docs/                 # Project documentation
│   ├── CLAUDE.md
│   ├── STYLE_GUIDE.md
│   └── req_1.md
├── archive/
│   └── contentgen.html   # Original HTML prototype
├── package.json          # Root workspace configuration
├── turbo.json            # Turborepo pipeline config
└── vercel.json           # Vercel deployment config
```

## 🚀 Tech Stack

### Landing Page (apps/landing)
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom design tokens
- **Fonts**: Inter (Google Fonts) + Satoshi (FontShare)
- **Build Tool**: Turborepo

### Design System
- Dub2-inspired minimalist design
- Dual color system (HSL + RGB)
- Consistent spacing (4px base unit)
- Custom shadows and animations

## 📦 Installation

### Prerequisites
- Node.js >= 18.0.0
- npm >= 10.2.4

### Setup

1. **Clone the repository**
   ```bash
   cd /path/to/article-gen
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

   This will install all dependencies for the monorepo including all workspace packages.

## 🛠️ Development

### Run the landing page locally

```bash
# Option 1: Using workspace command
npm run dev --workspace=@contentgen/landing

# Option 2: Using Turborepo
npm run dev

# The app will be available at http://localhost:3000
```

### Build for production

```bash
# Build landing page
npm run build --workspace=@contentgen/landing

# Or build all apps with Turborepo
npm run build
```

### Lint

```bash
npm run lint
```

### Clean build artifacts

```bash
npm run clean
```

## 📁 Adding New Apps

To add a new app (e.g., dashboard):

1. Create the app directory: `apps/dashboard`
2. Initialize Next.js app with TypeScript
3. Update `package.json` name to `@contentgen/dashboard`
4. Add to workspace in root `package.json`
5. Configure `tsconfig.json` to extend `@contentgen/tsconfig/nextjs.json`
6. Configure `tailwind.config.ts` to use `@contentgen/design-tokens` preset

## 🎨 Design System Usage

The design tokens package provides a Tailwind preset with all the design system values:

```typescript
// In your tailwind.config.ts
import designTokens from '@contentgen/design-tokens';

export default {
  presets: [designTokens],
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
};
```

### Available Design Tokens

- **Colors**: `bg-default`, `bg-muted`, `content-emphasis`, etc.
- **Fonts**: `font-satoshi`, `font-inter`
- **Shadows**: `shadow-default`, `shadow-active`
- **Border Radius**: `rounded-pill` (20px)

See `packages/design-tokens/tailwind.preset.js` for full list.

## 🌐 Deployment

### Vercel (Recommended)

1. **Push your code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Next.js landing page"
   git branch -M main
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your GitHub repository
   - Vercel will automatically detect the configuration from `vercel.json`
   - Click "Deploy"

3. **Deploy separate apps** (future)
   - Create separate Vercel projects for `apps/landing` and `apps/web`
   - Set root directory to `apps/landing` or `apps/web` in project settings
   - Vercel will handle monorepo builds automatically

### Environment Variables

Currently, no environment variables are required for the landing page. When you add backend functionality:

1. Create `.env.local` files in each app directory
2. Add to `.gitignore` (already configured)
3. Set in Vercel project settings

## 📝 Key Files

- **`turbo.json`**: Turborepo build pipeline configuration
- **`vercel.json`**: Vercel deployment settings for monorepo
- **`packages/design-tokens/`**: Shared design system
- **`packages/tsconfig/`**: Shared TypeScript configurations
- **`docs/STYLE_GUIDE.md`**: Complete design system documentation
- **`docs/CLAUDE.md`**: Development guidelines and project context

## 🧪 Testing

To verify the conversion was successful:

1. Start the dev server: `npm run dev --workspace=@contentgen/landing`
2. Open http://localhost:3000
3. Test all sections scroll into view
4. Test mobile menu toggle (hamburger icon)
5. Test FAQ accordion (single-open behavior)
6. Verify responsive design at different breakpoints
7. Check fonts are loading correctly (Inter for body, Satoshi for headings)

## 🎯 Next Steps

1. ✅ Landing page converted to Next.js
2. ⏳ Build dashboard app in `apps/web/` (see `docs/req_1.md`)
3. ⏳ Create shared UI component library in `packages/ui/`
4. ⏳ Add backend integration
5. ⏳ Set up authentication
6. ⏳ Deploy to production

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Turborepo Documentation](https://turbo.build/repo/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vercel Documentation](https://vercel.com/docs)

## 🤝 Contributing

This is a private project. For development guidelines, see `docs/CLAUDE.md`.

## 📄 License

Proprietary - All rights reserved.

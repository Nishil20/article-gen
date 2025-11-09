/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        // Background colors (RGB format for transparency support)
        bg: {
          default: 'rgb(255 255 255)',
          muted: 'rgb(250 250 250)',
          subtle: 'rgb(245 245 245)',
          emphasis: 'rgb(229 229 229)',
          inverted: 'rgb(23 23 23)',
        },
        // Content/text colors
        content: {
          inverted: 'rgb(255 255 255)',
          muted: 'rgb(163 163 163)',
          subtle: 'rgb(115 115 115)',
          default: 'rgb(64 64 64)',
          emphasis: 'rgb(23 23 23)',
        },
        // Accent colors
        accent: {
          orange: '#ff6b35',
          purple: '#8b5cf6',
          green: '#10b981',
        },
        // Border color (HSL format)
        border: {
          DEFAULT: 'hsl(0 0% 89.8%)', // #e5e5e5
        },
      },
      fontFamily: {
        satoshi: ['var(--font-satoshi)', 'system-ui', 'sans-serif'],
        inter: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        default: '0 2px 6px -1px rgba(0, 0, 0, 0.16), 0 1px 4px -1px rgba(0, 0, 0, 0.04)',
        active: '0 0 8px -2px rgba(0, 0, 0, 0.1), 0 6px 20px -3px rgba(0, 0, 0, 0.2)',
      },
      spacing: {
        // Custom spacing values (in addition to Tailwind's default 4px scale)
        section: {
          y: '100px',
          'y-mobile': '60px',
          x: '48px',
          'x-mobile': '24px',
        },
      },
      borderRadius: {
        // Semantic border radius values
        pill: '20px',
      },
      letterSpacing: {
        tighter: '-0.02em',
      },
      transitionDuration: {
        DEFAULT: '200ms',
      },
    },
  },
  plugins: [],
};

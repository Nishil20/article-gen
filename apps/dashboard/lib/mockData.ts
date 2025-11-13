export const mockUser = {
  name: "Sarah Ali",
  email: "sarah@example.com",
  avatar: "/avatars/user.jpg",
  initials: "SA",
  plan: "Free Trial",
  wordsLeft: 2500,
  totalWords: 10000,
};

export const mockMetrics = [
  {
    id: "words-generated",
    label: "Words Generated",
    value: "7,500",
    icon: "✍️",
  },
  {
    id: "items-generated",
    label: "Items Generated",
    value: "24",
    icon: "📝",
  },
  {
    id: "time-saved",
    label: "Time Saved",
    value: "15 hours",
    icon: "⏱️",
  },
  {
    id: "tools-used",
    label: "Tools Used",
    value: "8",
    icon: "🛠️",
  },
];

export const mockTools = [
  {
    id: "old-article-generator",
    title: "Old Article Generator",
    description: "Generate full-length SEO-optimized articles in seconds",
    icon: "📄",
    category: "Content Creation",
  },
  {
    id: "blog-post-writer",
    title: "Blog Post Writer",
    description: "Create engaging blog posts with AI assistance",
    icon: "✨",
    category: "Content Creation",
  },
  {
    id: "article-generator",
    title: "Article Generator",
    description: "Complete end-to-end article creation with outline, sections, editing, and SEO",
    icon: "🚀",
    category: "Content Creation",
  },
  {
    id: "content-rewriter",
    title: "Content Rewriter",
    description: "Rewrite and improve existing content for better engagement",
    icon: "🔄",
    category: "Editing",
  },
  {
    id: "paragraph-generator",
    title: "Paragraph Generator",
    description: "Generate compelling paragraphs for any topic",
    icon: "📋",
    category: "Content Creation",
  },
];

export const mockRecentContent = [
  {
    id: "1",
    title: "10 Proven Strategies to Boost Your SEO Rankings in 2024",
    thumbnail: "/placeholders/article-1.jpg",
    date: "2 hours ago",
    wordCount: 1250,
    status: "published" as const,
  },
  {
    id: "2",
    title: "The Ultimate Guide to Content Marketing for Beginners",
    thumbnail: "/placeholders/article-2.jpg",
    date: "1 day ago",
    wordCount: 2100,
    status: "draft" as const,
  },
  {
    id: "3",
    title: "How AI is Transforming the Future of Content Creation",
    thumbnail: "/placeholders/article-3.jpg",
    date: "2 days ago",
    wordCount: 1800,
    status: "published" as const,
  },
  {
    id: "4",
    title: "Social Media Marketing Tips That Actually Work",
    thumbnail: "/placeholders/article-4.jpg",
    date: "3 days ago",
    wordCount: 950,
    status: "published" as const,
  },
  {
    id: "5",
    title: "Building a Successful Blog: From Zero to Hero",
    thumbnail: "/placeholders/article-5.jpg",
    date: "5 days ago",
    wordCount: 1650,
    status: "draft" as const,
  },
];

export const mockNavigation = [
  {
    name: "Dashboard",
    href: "/",
    icon: "LayoutDashboard",
    active: true,
  },
  {
    name: "Blog Post Writer",
    href: "/blog-post-writer",
    icon: "Sparkles",
    active: false,
  },
  {
    name: "Article Generator",
    href: "/article-generator",
    icon: "Rocket",
    active: false,
  },
  {
    name: "Old Article Writer",
    href: "/old-article-writer",
    icon: "PenTool",
    active: false,
  },
  {
    name: "Content Rewriter",
    href: "/content-rewriter",
    icon: "RefreshCw",
    active: false,
  },
  {
    name: "Paragraph Generator",
    href: "/paragraph-generator",
    icon: "AlignLeft",
    active: false,
  },
  {
    name: "All Tools",
    href: "/tools",
    icon: "Wrench",
    active: false,
  },
  {
    name: "My Content",
    href: "/content",
    icon: "Folder",
    active: false,
  },
  {
    name: "Upgrade",
    href: "/upgrade",
    icon: "ArrowUpCircle",
    active: false,
  },
];

export const mockBanner = {
  badge: "✨ New Feature",
  title: "Activate SEO Autopilot",
  description: "Let AI optimize your content automatically with our new SEO Autopilot feature.",
  benefits: [
    "Automatic keyword optimization",
    "Real-time SEO scoring",
    "Content performance analytics",
    "Competitor analysis",
  ],
  ctaText: "Activate Autopilot",
  ctaAction: "coming-soon",
};

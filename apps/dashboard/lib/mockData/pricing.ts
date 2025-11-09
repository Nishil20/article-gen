// Mock data for Upgrade/Pricing page

export interface PricingPlan {
  id: string;
  name: string;
  tagline: string;
  monthlyPrice: number;
  annualPrice: number;
  badge: string | null;
  wordsPerMonth: string;
  features: string[];
  limits: {
    articles: number | string;
    tools: string;
    users: number | string;
  };
  cta: string;
  ctaVariant: "default" | "outline" | "ghost";
  highlighted?: boolean;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar: string | null;
  rating: number;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export const pricingPlans: PricingPlan[] = [
  {
    id: "pro",
    name: "Pro",
    tagline: "Perfect for individuals",
    monthlyPrice: 29,
    annualPrice: 23, // 20% discount (29 * 0.8 = 23.2 ≈ 23)
    badge: null,
    wordsPerMonth: "50,000",
    features: [
      "50,000 words per month",
      "AI Article Writer (all workflows)",
      "All content tools",
      "SEO optimization",
      "Basic analytics",
      "Export to MD/HTML/TXT",
      "Email support",
    ],
    limits: {
      articles: 50,
      tools: "All",
      users: 1,
    },
    cta: "Choose Pro",
    ctaVariant: "outline",
  },
  {
    id: "max",
    name: "Max",
    tagline: "Best for growing teams",
    monthlyPrice: 79,
    annualPrice: 63, // 20% discount (79 * 0.8 = 63.2 ≈ 63)
    badge: "Most Popular",
    wordsPerMonth: "200,000",
    features: [
      "200,000 words per month",
      "Everything in Pro",
      "Priority AI processing",
      "Advanced SEO tools",
      "Bulk content generation",
      "Team collaboration (3 users)",
      "Advanced analytics",
      "Priority support",
      "Custom templates",
    ],
    limits: {
      articles: 200,
      tools: "All + Advanced",
      users: 3,
    },
    cta: "Choose Max",
    ctaVariant: "default",
    highlighted: true,
  },
  {
    id: "ultra",
    name: "Ultra",
    tagline: "For agencies & enterprises",
    monthlyPrice: 199,
    annualPrice: 159, // 20% discount (199 * 0.8 = 159.2 ≈ 159)
    badge: "Enterprise",
    wordsPerMonth: "Unlimited",
    features: [
      "Unlimited words",
      "Everything in Max",
      "Unlimited users",
      "API access",
      "White-label options",
      "Custom integrations",
      "Dedicated account manager",
      "24/7 priority support",
      "Custom AI training",
      "SLA guarantee",
    ],
    limits: {
      articles: "Unlimited",
      tools: "All + Custom",
      users: "Unlimited",
    },
    cta: "Choose Ultra",
    ctaVariant: "outline",
  },
];

export interface ComparisonFeature {
  name: string;
  pro: boolean | string;
  max: boolean | string;
  ultra: boolean | string;
}

export interface ComparisonCategory {
  category: string;
  features: ComparisonFeature[];
}

export const comparisonFeatures: ComparisonCategory[] = [
  {
    category: "Content Generation",
    features: [
      { name: "Words per month", pro: "50K", max: "200K", ultra: "Unlimited" },
      { name: "AI Article Writer", pro: true, max: true, ultra: true },
      { name: "All content tools", pro: true, max: true, ultra: true },
      { name: "Quick workflow", pro: true, max: true, ultra: true },
      { name: "Standard workflow", pro: true, max: true, ultra: true },
      { name: "Complete workflow", pro: true, max: true, ultra: true },
      { name: "Bulk generation", pro: false, max: true, ultra: true },
      { name: "Custom templates", pro: false, max: true, ultra: true },
    ],
  },
  {
    category: "SEO & Optimization",
    features: [
      { name: "SEO optimization", pro: true, max: true, ultra: true },
      { name: "Keyword research", pro: true, max: true, ultra: true },
      { name: "Meta tags generation", pro: true, max: true, ultra: true },
      { name: "Advanced SEO tools", pro: false, max: true, ultra: true },
      { name: "Competitor analysis", pro: false, max: true, ultra: true },
      { name: "Rank tracking", pro: false, max: true, ultra: true },
    ],
  },
  {
    category: "Collaboration & Users",
    features: [
      { name: "Team members", pro: "1", max: "3", ultra: "Unlimited" },
      { name: "Content library", pro: true, max: true, ultra: true },
      { name: "Role-based access", pro: false, max: true, ultra: true },
      { name: "Approval workflows", pro: false, max: false, ultra: true },
    ],
  },
  {
    category: "Support & Services",
    features: [
      { name: "Email support", pro: true, max: true, ultra: true },
      { name: "Priority support", pro: false, max: true, ultra: true },
      { name: "24/7 support", pro: false, max: false, ultra: true },
      { name: "Dedicated manager", pro: false, max: false, ultra: true },
      { name: "Custom training", pro: false, max: false, ultra: true },
    ],
  },
  {
    category: "Advanced Features",
    features: [
      { name: "API access", pro: false, max: false, ultra: true },
      { name: "White-label", pro: false, max: false, ultra: true },
      { name: "Custom integrations", pro: false, max: false, ultra: true },
      { name: "SLA guarantee", pro: false, max: false, ultra: true },
    ],
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "1",
    quote:
      "ContentGen has transformed how we create content. We've increased our output by 10x while maintaining quality. The Max plan is perfect for our team size.",
    author: "Sarah Johnson",
    role: "Content Director",
    company: "TechCorp Inc.",
    avatar: null,
    rating: 5,
  },
  {
    id: "2",
    quote:
      "The collaboration features and priority support in the Max plan are game-changers. Our content production has never been smoother.",
    author: "Michael Chen",
    role: "Marketing Manager",
    company: "GrowthLabs",
    avatar: null,
    rating: 5,
  },
  {
    id: "3",
    quote:
      "As an agency, the Ultra plan gives us everything we need. Unlimited words and API access are essential for managing multiple clients efficiently.",
    author: "Emma Williams",
    role: "Agency Owner",
    company: "Digital Boost Agency",
    avatar: null,
    rating: 5,
  },
];

export const faqs: FAQ[] = [
  {
    id: "1",
    question: "Can I change my plan later?",
    answer:
      "Yes! You can upgrade or downgrade your plan at any time. When upgrading, you'll be charged the prorated difference immediately. When downgrading, the change takes effect at the end of your current billing cycle, and you'll receive a prorated credit.",
  },
  {
    id: "2",
    question: "What happens if I exceed my word limit?",
    answer:
      "If you exceed your monthly word limit, you can either upgrade to a higher tier or purchase additional words at $10 per 10,000 words. We'll send you notifications when you reach 80% and 100% of your limit so you can plan accordingly.",
  },
  {
    id: "3",
    question: "Is there a free trial?",
    answer:
      "Yes! All new users get a 14-day free trial with 10,000 words to test all features across all workflows. No credit card required to start your trial. You can upgrade to any plan at any time during or after your trial.",
  },
  {
    id: "4",
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and bank transfers for annual plans. Enterprise customers can also request invoice billing with NET 30 terms.",
  },
  {
    id: "5",
    question: "How does the annual discount work?",
    answer:
      "Annual plans save you 20% compared to monthly billing. You'll be charged once per year upfront. You can cancel anytime and receive a prorated refund for the unused months remaining in your annual term.",
  },
  {
    id: "6",
    question: "Do you offer refunds?",
    answer:
      "Yes! We offer a 30-day money-back guarantee on all plans. If you're not completely satisfied with ContentGen, contact us within 30 days of your purchase for a full refund, no questions asked.",
  },
  {
    id: "7",
    question: "Can I get a custom plan for my specific needs?",
    answer:
      "Absolutely! If none of our standard plans fit your requirements, contact our sales team to discuss a custom plan. We can tailor word limits, user count, features, and pricing to match your exact needs.",
  },
  {
    id: "8",
    question: "Do unused words roll over to the next month?",
    answer:
      "Unused words do not roll over to the next month. Your word count resets at the beginning of each billing cycle. However, if you're on the Ultra plan with unlimited words, this doesn't apply to you.",
  },
];

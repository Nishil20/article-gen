import Link from 'next/link';

const features = [
  {
    icon: '🚀',
    title: 'AI-Powered Writing',
    description:
      'Generate high-quality articles, blog posts, and social media content with advanced AI that understands context and tone.',
  },
  {
    icon: '🎯',
    title: 'SEO Optimization',
    description:
      'Built-in SEO tools analyze keywords, readability, and meta descriptions to ensure your content ranks higher.',
  },
  {
    icon: '⚡',
    title: 'Lightning Fast',
    description:
      'Generate 2,000-word articles in under 60 seconds. Save hours of writing time every week.',
  },
  {
    icon: '🎨',
    title: 'Brand Voice Control',
    description:
      'Maintain consistency across all content with customizable tone, style, and voice settings.',
  },
  {
    icon: '🌐',
    title: 'Multi-Language Support',
    description:
      'Create content in 25+ languages with native-level fluency and cultural understanding.',
  },
  {
    icon: '📊',
    title: 'Analytics Dashboard',
    description:
      'Track performance metrics, engagement rates, and ROI for every piece of content you create.',
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="px-6 md:px-12 py-[60px] md:py-[100px] bg-[#fafafa]"
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Section Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-[6px] mb-6 bg-white border border-[#e5e5e5] rounded-[20px]">
          <span className="text-[13px] font-medium text-[#404040]">
            ✨ Features
          </span>
        </div>

        {/* Section Heading */}
        <h2 className="text-[36px] md:text-[48px] font-bold text-[#171717] leading-[1.1] tracking-[-0.02em] mb-4 font-satoshi">
          Everything you need to create amazing content
        </h2>

        {/* Section Description */}
        <p className="text-lg text-[#737373] leading-[1.6] mb-12 md:mb-16 max-w-[700px]">
          Powerful AI-driven features designed to streamline your content
          creation workflow.
        </p>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 bg-white border border-[#e5e5e5] rounded-xl hover:shadow-active transition-all duration-200"
            >
              <div className="text-2xl mb-4">{feature.icon}</div>
              <h3 className="text-base font-semibold text-[#171717] mb-2 font-inter">
                {feature.title}
              </h3>
              <p className="text-sm text-[#737373] leading-[1.6] mb-3">
                {feature.description}
              </p>
              <Link
                href="#"
                className="text-sm font-medium text-[#171717] hover:underline no-underline"
              >
                Learn more →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

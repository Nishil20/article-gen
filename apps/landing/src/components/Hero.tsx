import Link from 'next/link';

export default function Hero() {
  return (
    <section className="px-6 md:px-12 pt-20 pb-16 md:pt-[80px] md:pb-[60px]">
      <div className="max-w-[1200px] mx-auto text-center">
        {/* Announcement Badge */}
        <div className="inline-flex items-center gap-2 px-[14px] py-[6px] mb-8 bg-[#fafafa] border border-[#e5e5e5] rounded-[20px]">
          <span className="text-[13px] font-medium text-[#404040]">
            🎉 New: AI-powered SEO optimizer
          </span>
          <Link
            href="#features"
            className="text-[13px] font-medium text-[#171717] hover:underline"
          >
            Learn more →
          </Link>
        </div>

        {/* Hero Headline */}
        <h1 className="text-[40px] md:text-[64px] font-bold text-[#171717] leading-[1.1] tracking-[-0.02em] mb-6 font-satoshi">
          Generate SEO-Ready Articles, Blogs & Social Posts in Seconds
        </h1>

        {/* Hero Subheadline */}
        <p className="text-lg md:text-xl text-[#737373] leading-[1.6] mb-8 max-w-[700px] mx-auto">
          ContentGen uses advanced AI to create high-quality, engaging content
          that ranks. Save hours of writing time while maintaining your unique
          brand voice.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-3 mb-12">
          <Link
            href="#pricing"
            className="w-full md:w-auto px-6 py-3 text-[15px] font-medium text-white bg-[#171717] hover:opacity-90 rounded-lg transition-all duration-200 no-underline"
          >
            Try for Free
          </Link>
          <Link
            href="#how-it-works"
            className="w-full md:w-auto px-6 py-3 text-[15px] font-medium text-[#171717] bg-[#fafafa] border border-[#e5e5e5] hover:bg-[#f5f5f5] rounded-lg transition-all duration-200 no-underline"
          >
            Watch Demo
          </Link>
        </div>

        {/* Social Proof */}
        <p className="text-sm text-[#a3a3a3]">
          Trusted by 10,000+ content creators and marketing teams
        </p>
      </div>
    </section>
  );
}

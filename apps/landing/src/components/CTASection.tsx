import Link from 'next/link';

export default function CTASection() {
  return (
    <section className="px-6 md:px-12 py-[60px] md:py-[100px]">
      <div className="max-w-[900px] mx-auto text-center">
        <h2 className="text-[36px] md:text-[56px] font-bold text-[#171717] leading-[1.1] tracking-[-0.02em] mb-6 font-satoshi">
          Ready to transform your content creation?
        </h2>

        <p className="text-lg md:text-xl text-[#737373] leading-[1.6] mb-8 max-w-[700px] mx-auto">
          Join thousands of content creators who are saving time and creating
          better content with ContentGen.
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-3">
          <Link
            href="#pricing"
            className="w-full md:w-auto px-6 py-3 text-[15px] font-medium text-white bg-[#171717] hover:opacity-90 rounded-lg transition-all duration-200 no-underline"
          >
            Start Free Trial
          </Link>
          <Link
            href="#pricing"
            className="w-full md:w-auto px-6 py-3 text-[15px] font-medium text-[#171717] bg-[#fafafa] border border-[#e5e5e5] hover:bg-[#f5f5f5] rounded-lg transition-all duration-200 no-underline"
          >
            View Pricing
          </Link>
        </div>

        <p className="mt-6 text-sm text-[#a3a3a3]">
          No credit card required • 14-day free trial • Cancel anytime
        </p>
      </div>
    </section>
  );
}

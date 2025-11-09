const testimonials = [
  {
    quote:
      '"ContentGen has completely transformed our content workflow. What used to take our team 5 hours now takes 30 minutes. The quality is incredible and our SEO rankings have improved significantly."',
    initials: 'SM',
    name: 'Sarah Martinez',
    title: 'Head of Marketing, TechCorp',
  },
  {
    quote:
      '"As a solo content creator, ContentGen is a game-changer. I\'ve 10xed my output without sacrificing quality. The brand voice feature keeps everything consistent with my personal style."',
    initials: 'JC',
    name: 'James Chen',
    title: 'Freelance Writer & Blogger',
  },
  {
    quote:
      '"The multi-language support is phenomenal. We\'re now creating content in 12 different markets with the same ease as English. Our global reach has expanded dramatically."',
    initials: 'EP',
    name: 'Emma Patel',
    title: 'Content Director, GlobalBrand',
  },
  {
    quote:
      '"The ROI on ContentGen is insane. We\'ve cut content production costs by 70% while doubling our output. The analytics show our engagement rates are at an all-time high."',
    initials: 'MJ',
    name: 'Michael Johnson',
    title: 'CEO, StartupHub',
  },
];

export default function Testimonials() {
  return (
    <section className="px-6 md:px-12 py-[60px] md:py-[100px]">
      <div className="max-w-[1200px] mx-auto">
        {/* Section Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-[6px] mb-6 bg-[#fafafa] border border-[#e5e5e5] rounded-[20px]">
          <span className="text-[13px] font-medium text-[#404040]">
            💬 Testimonials
          </span>
        </div>

        {/* Section Heading */}
        <h2 className="text-[36px] md:text-[48px] font-bold text-[#171717] leading-[1.2] tracking-[-0.02em] mb-12 md:mb-16 font-satoshi">
          Loved by content creators worldwide
        </h2>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="p-8 md:p-12 bg-white border border-[#e5e5e5] rounded-xl"
            >
              <p className="text-lg md:text-xl text-[#171717] leading-[1.6] mb-6">
                {testimonial.quote}
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#f5f5f5] rounded-full flex items-center justify-center text-lg font-bold text-[#404040] font-satoshi">
                  {testimonial.initials}
                </div>
                <div>
                  <div className="font-semibold text-[#171717] font-satoshi">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-[#a3a3a3]">
                    {testimonial.title}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const steps = [
  {
    number: '1',
    title: 'Choose Your Topic',
    description:
      'Enter your topic, keywords, or upload a brief. Our AI analyzes your input to understand exactly what you need.',
  },
  {
    number: '2',
    title: 'Customize Settings',
    description:
      'Select tone, style, length, and target audience. Set SEO parameters and brand voice preferences.',
  },
  {
    number: '3',
    title: 'Generate & Publish',
    description:
      'Click generate and watch as high-quality content appears in seconds. Edit, refine, and publish directly to your platform.',
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="px-6 md:px-12 py-[60px] md:py-[100px]"
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Section Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-[6px] mb-6 bg-[#fafafa] border border-[#e5e5e5] rounded-[20px]">
          <span className="text-[13px] font-medium text-[#404040]">
            🔧 How it Works
          </span>
        </div>

        {/* Section Heading */}
        <h2 className="text-[36px] md:text-[48px] font-bold text-[#171717] leading-[1.2] tracking-[-0.02em] mb-4 font-satoshi">
          Create amazing content in 3 simple steps
        </h2>

        {/* Section Description */}
        <p className="text-lg text-[#737373] leading-[1.6] mb-12 md:mb-16 max-w-[700px]">
          From idea to published content in minutes—no writing experience
          required.
        </p>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center md:text-left">
              <div className="inline-flex items-center justify-center w-12 h-12 mb-6 text-xl font-bold text-white bg-[#171717] rounded-lg font-satoshi">
                {step.number}
              </div>
              <h3 className="text-xl font-bold text-[#171717] mb-3 font-satoshi">
                {step.title}
              </h3>
              <p className="text-base text-[#737373] leading-[1.6]">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import Link from 'next/link';

const CheckIcon = () => (
  <svg
    className="w-5 h-5 mt-0.5 flex-shrink-0 text-[#10b981]"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

const pricingPlans = [
  {
    name: 'Starter',
    description: 'Perfect for individuals',
    price: '$29',
    period: '/month',
    ctaText: 'Start Free Trial',
    ctaStyle:
      'block w-full px-6 py-3 mb-8 text-center text-[15px] font-medium text-[#171717] bg-[#fafafa] border border-[#e5e5e5] hover:bg-[#f5f5f5] rounded-lg transition-all duration-200 no-underline',
    features: [
      '50 articles per month',
      'SEO optimization',
      '5 brand voices',
      'Email support',
    ],
    popular: false,
  },
  {
    name: 'Professional',
    description: 'For content creators',
    price: '$79',
    period: '/month',
    ctaText: 'Start Free Trial',
    ctaStyle:
      'block w-full px-6 py-3 mb-8 text-center text-[15px] font-medium text-white bg-[#171717] hover:opacity-90 rounded-lg transition-all duration-200 no-underline',
    features: [
      '<strong>200 articles</strong> per month',
      'Advanced SEO tools',
      '<strong>Unlimited</strong> brand voices',
      'Analytics dashboard',
      'Priority support',
    ],
    popular: true,
  },
  {
    name: 'Enterprise',
    description: 'For large teams',
    price: '$299',
    period: '/month',
    ctaText: 'Contact Sales',
    ctaStyle:
      'block w-full px-6 py-3 mb-8 text-center text-[15px] font-medium text-[#171717] bg-[#fafafa] border border-[#e5e5e5] hover:bg-[#f5f5f5] rounded-lg transition-all duration-200 no-underline',
    features: [
      '<strong>Unlimited</strong> articles',
      'Custom AI training',
      'Team collaboration',
      'API access',
      'Dedicated account manager',
    ],
    popular: false,
  },
];

export default function Pricing() {
  return (
    <section
      id="pricing"
      className="px-6 md:px-12 py-[60px] md:py-[100px] bg-[#fafafa]"
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Section Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-[6px] mb-6 bg-white border border-[#e5e5e5] rounded-[20px]">
          <span className="text-[13px] font-medium text-[#404040]">
            💰 Pricing
          </span>
        </div>

        {/* Section Heading */}
        <h2 className="text-[36px] md:text-[48px] font-bold text-[#171717] leading-[1.2] tracking-[-0.02em] mb-4 font-satoshi">
          Simple, transparent pricing
        </h2>

        {/* Section Description */}
        <p className="text-lg text-[#737373] leading-[1.6] mb-12 md:mb-16 max-w-[700px]">
          Choose the perfect plan for your content creation needs. All plans
          include a 14-day free trial.
        </p>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`p-8 bg-white rounded-xl relative ${
                plan.popular ? 'border-2 border-[#171717]' : 'border border-[#e5e5e5]'
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-block px-4 py-1 text-xs font-semibold text-white bg-[#171717] rounded-full font-inter">
                    MOST POPULAR
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-bold text-[#171717] mb-2 font-satoshi">
                  {plan.name}
                </h3>
                <p className="text-sm text-[#737373]">{plan.description}</p>
              </div>

              <div className="mb-6">
                <span className="text-[48px] font-bold text-[#171717] leading-[1] font-satoshi">
                  {plan.price}
                </span>
                <span className="text-base text-[#737373]">{plan.period}</span>
              </div>

              <Link href="#" className={plan.ctaStyle}>
                {plan.ctaText}
              </Link>

              <ul className="space-y-3">
                {plan.features.map((feature, featureIndex) => (
                  <li
                    key={featureIndex}
                    className="flex items-start gap-3 text-sm text-[#404040]"
                  >
                    <CheckIcon />
                    <span dangerouslySetInnerHTML={{ __html: feature }} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

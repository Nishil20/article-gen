import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="px-6 md:px-12 pt-20 pb-10 bg-[#fafafa] border-t border-[#e5e5e5]">
      <div className="max-w-[1200px] mx-auto">
        {/* Footer Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 md:gap-12 mb-12">
          {/* Brand Column (wider) */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <Link
                href="/"
                className="text-2xl font-bold text-[#171717] no-underline font-satoshi"
              >
                ContentGen
              </Link>
            </div>
            <p className="text-sm text-[#737373] leading-[1.6] mb-6 max-w-[300px]">
              Generate SEO-ready articles, blogs & social posts in seconds with
              advanced AI technology.
            </p>

            {/* Social Links */}
            <div className="flex gap-4">
              <Link
                href="#"
                className="text-[#a3a3a3] hover:text-[#171717] transition-colors duration-200"
                aria-label="Twitter"
              >
                <svg
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                </svg>
              </Link>
              <Link
                href="#"
                className="text-[#a3a3a3] hover:text-[#171717] transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <svg
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </Link>
              <Link
                href="#"
                className="text-[#a3a3a3] hover:text-[#171717] transition-colors duration-200"
                aria-label="GitHub"
              >
                <svg
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"></path>
                </svg>
              </Link>
            </div>
          </div>

          {/* Product Column */}
          <div>
            <h4 className="text-sm font-semibold text-[#171717] mb-5 font-inter">
              Product
            </h4>
            <ul className="space-y-4">
              <li>
                <Link
                  href="#features"
                  className="text-sm text-[#a3a3a3] hover:text-[#171717] transition-colors duration-200 no-underline"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="#pricing"
                  className="text-sm text-[#a3a3a3] hover:text-[#171717] transition-colors duration-200 no-underline"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-[#a3a3a3] hover:text-[#171717] transition-colors duration-200 no-underline"
                >
                  Integrations
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-[#a3a3a3] hover:text-[#171717] transition-colors duration-200 no-underline"
                >
                  API
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="text-sm font-semibold text-[#171717] mb-5 font-inter">
              Company
            </h4>
            <ul className="space-y-4">
              <li>
                <Link
                  href="#"
                  className="text-sm text-[#a3a3a3] hover:text-[#171717] transition-colors duration-200 no-underline"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-[#a3a3a3] hover:text-[#171717] transition-colors duration-200 no-underline"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-[#a3a3a3] hover:text-[#171717] transition-colors duration-200 no-underline"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-[#a3a3a3] hover:text-[#171717] transition-colors duration-200 no-underline"
                >
                  Press
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h4 className="text-sm font-semibold text-[#171717] mb-5 font-inter">
              Resources
            </h4>
            <ul className="space-y-4">
              <li>
                <Link
                  href="#"
                  className="text-sm text-[#a3a3a3] hover:text-[#171717] transition-colors duration-200 no-underline"
                >
                  Documentation
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-[#a3a3a3] hover:text-[#171717] transition-colors duration-200 no-underline"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-[#a3a3a3] hover:text-[#171717] transition-colors duration-200 no-underline"
                >
                  Community
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-[#a3a3a3] hover:text-[#171717] transition-colors duration-200 no-underline"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-8 border-t border-[#e5e5e5] flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-[#a3a3a3]">
            <span>© 2025 ContentGen. All rights reserved.</span>
            <Link
              href="#"
              className="hover:text-[#171717] transition-colors duration-200 no-underline"
            >
              Privacy
            </Link>
            <Link
              href="#"
              className="hover:text-[#171717] transition-colors duration-200 no-underline"
            >
              Terms
            </Link>
            <Link
              href="#"
              className="hover:text-[#171717] transition-colors duration-200 no-underline"
            >
              Cookies
            </Link>
          </div>

          {/* Status Indicator */}
          <div className="flex items-center gap-2 text-sm text-[#a3a3a3]">
            <div className="w-2 h-2 bg-[#10b981] rounded-full"></div>
            <span>All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

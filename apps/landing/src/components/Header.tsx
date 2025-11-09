'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#e5e5e5]">
      <div className="flex items-center justify-between px-6 md:px-12 py-4">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-bold text-[#171717] no-underline font-satoshi"
        >
          ContentGen
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="#features"
            className="text-sm font-medium text-[#404040] hover:text-[#171717] transition-colors duration-200 no-underline"
          >
            Features
          </Link>
          <Link
            href="#how-it-works"
            className="text-sm font-medium text-[#404040] hover:text-[#171717] transition-colors duration-200 no-underline"
          >
            How it Works
          </Link>
          <Link
            href="#pricing"
            className="text-sm font-medium text-[#404040] hover:text-[#171717] transition-colors duration-200 no-underline"
          >
            Pricing
          </Link>
          <Link
            href="#faq"
            className="text-sm font-medium text-[#404040] hover:text-[#171717] transition-colors duration-200 no-underline"
          >
            FAQ
          </Link>
        </nav>

        {/* Header Buttons */}
        <div className="flex items-center gap-3">
          <Link
            href="#pricing"
            className="hidden md:inline-block px-4 py-2 text-sm font-medium text-[#404040] bg-transparent hover:bg-[#f5f5f5] rounded-lg transition-all duration-200 no-underline"
          >
            Log In
          </Link>
          <Link
            href="#pricing"
            className="px-4 py-2 text-sm font-medium text-white bg-[#171717] hover:opacity-90 rounded-lg transition-all duration-200 no-underline"
          >
            Try for Free
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden text-[#171717]"
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
          >
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <nav
          className="flex flex-col gap-0 md:hidden border-t border-[#e5e5e5]"
          aria-label="Mobile navigation"
        >
          <Link
            href="#features"
            onClick={closeMobileMenu}
            className="px-6 py-3 text-sm font-medium text-[#404040] hover:bg-[#f5f5f5] transition-colors duration-200 no-underline block"
          >
            Features
          </Link>
          <Link
            href="#how-it-works"
            onClick={closeMobileMenu}
            className="px-6 py-3 text-sm font-medium text-[#404040] hover:bg-[#f5f5f5] transition-colors duration-200 no-underline block"
          >
            How it Works
          </Link>
          <Link
            href="#pricing"
            onClick={closeMobileMenu}
            className="px-6 py-3 text-sm font-medium text-[#404040] hover:bg-[#f5f5f5] transition-colors duration-200 no-underline block"
          >
            Pricing
          </Link>
          <Link
            href="#faq"
            onClick={closeMobileMenu}
            className="px-6 py-3 text-sm font-medium text-[#404040] hover:bg-[#f5f5f5] transition-colors duration-200 no-underline block"
          >
            FAQ
          </Link>
        </nav>
      )}
    </header>
  );
}

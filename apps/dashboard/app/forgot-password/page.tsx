'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // TODO: Implement password reset logic
    console.log('Password reset request for:', email);
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-50 via-white to-neutral-100 px-4">
      <div className="w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <Link
            href="/login"
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-neutral-900 mb-4 hover:opacity-90 transition-opacity"
          >
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </Link>
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">
            Forgot password?
          </h1>
          <p className="text-neutral-600">
            No worries, we'll send you reset instructions
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-neutral-200 p-8">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Input */}
              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-11"
                />
                <p className="text-sm text-neutral-500">
                  Enter the email associated with your account
                </p>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full h-11 text-base font-semibold"
                disabled={isLoading}
              >
                {isLoading ? 'Sending...' : 'Send reset link'}
              </Button>

              {/* Back to Login */}
              <div className="text-center">
                <Link
                  href="/login"
                  className="inline-flex items-center text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                  Back to login
                </Link>
              </div>
            </form>
          ) : (
            <div className="text-center space-y-4">
              {/* Success Icon */}
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-2">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-neutral-900 mb-2">
                  Check your email
                </h2>
                <p className="text-neutral-600 mb-4">
                  We've sent password reset instructions to{' '}
                  <span className="font-medium text-neutral-900">{email}</span>
                </p>
                <p className="text-sm text-neutral-500 mb-6">
                  Didn't receive the email? Check your spam folder or{' '}
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="text-neutral-900 font-medium hover:underline"
                  >
                    try again
                  </button>
                </p>
              </div>

              <Button
                onClick={() => (window.location.href = '/login')}
                variant="outline"
                className="w-full h-11"
              >
                Back to login
              </Button>
            </div>
          )}
        </div>

        {/* Help Text */}
        {!isSubmitted && (
          <p className="text-center mt-6 text-sm text-neutral-600">
            Need help?{' '}
            <Link
              href="/support"
              className="font-semibold text-neutral-900 hover:underline"
            >
              Contact support
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}

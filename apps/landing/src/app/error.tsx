'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        <h2 className="text-2xl font-bold text-[#171717] mb-4 font-satoshi">
          Something went wrong!
        </h2>
        <p className="text-base text-[#737373] mb-6">
          We apologize for the inconvenience. Please try again.
        </p>
        <button
          onClick={reset}
          className="px-6 py-3 text-[15px] font-medium text-white bg-[#171717] hover:opacity-90 rounded-lg transition-all duration-200"
        >
          Try again
        </button>
      </div>
    </div>
  );
}

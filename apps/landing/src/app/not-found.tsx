import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        <h1 className="text-6xl font-bold text-[#171717] mb-4 font-satoshi">
          404
        </h1>
        <h2 className="text-2xl font-bold text-[#171717] mb-4 font-satoshi">
          Page Not Found
        </h2>
        <p className="text-base text-[#737373] mb-6">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 text-[15px] font-medium text-white bg-[#171717] hover:opacity-90 rounded-lg transition-all duration-200 no-underline"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
}

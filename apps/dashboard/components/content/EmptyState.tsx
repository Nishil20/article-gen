import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function EmptyState() {
  return (
    <Card className="p-12 text-center max-w-[600px] mx-auto">
      <div className="text-7xl mb-6">📝</div>
      <h2 className="text-2xl font-bold text-[#171717] mb-3 font-satoshi">
        No content yet
      </h2>
      <p className="text-base text-[#737373] leading-[1.6] mb-8">
        Create your first article with AI and start building your content library
      </p>

      {/* Quick Start Guide */}
      <div className="bg-[#fafafa] rounded-lg p-6 mb-8 text-left">
        <h3 className="text-sm font-semibold text-[#171717] mb-4">
          Quick Start Guide:
        </h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-[#171717] flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-xs font-bold">1</span>
            </div>
            <div>
              <p className="text-sm font-medium text-[#404040]">
                Click "New Article" button
              </p>
              <p className="text-xs text-[#737373] mt-1">
                Choose your preferred workflow
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-[#171717] flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-xs font-bold">2</span>
            </div>
            <div>
              <p className="text-sm font-medium text-[#404040]">
                Enter your topic and preferences
              </p>
              <p className="text-xs text-[#737373] mt-1">
                Let AI know what you want to write about
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-[#171717] flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-xs font-bold">3</span>
            </div>
            <div>
              <p className="text-sm font-medium text-[#404040]">
                Generate and save your article
              </p>
              <p className="text-xs text-[#737373] mt-1">
                Review, export, or save to your content library
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTAs */}
      <div className="flex gap-3 justify-center">
        <Link href="/article-writer">
          <Button size="lg">
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
                d="M12 4v16m8-8H4"
              />
            </svg>
            Create First Article
          </Button>
        </Link>
        <Link href="/">
          <Button variant="ghost" size="lg">
            Back to Dashboard
          </Button>
        </Link>
      </div>
    </Card>
  );
}

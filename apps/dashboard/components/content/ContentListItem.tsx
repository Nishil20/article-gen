"use client";

import * as React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Article } from "@/lib/mockData/myContent";
import { cn } from "@/lib/utils";

interface ContentListItemProps {
  article: Article;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onDuplicate: () => void;
}

export function ContentListItem({
  article,
  onView,
  onEdit,
  onDelete,
  onDuplicate,
}: ContentListItemProps) {
  const [showActions, setShowActions] = React.useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <Card
      className="p-6 hover:shadow-active transition-all duration-200 cursor-pointer"
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
      onClick={onView}
    >
      <div className="flex gap-4">
        {/* Thumbnail/Icon */}
        <div className="w-16 h-16 bg-[#f5f5f5] rounded-lg flex items-center justify-center flex-shrink-0">
          <span className="text-2xl">📄</span>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Title and Status */}
          <div className="flex items-start justify-between gap-3 mb-2">
            <h3 className="text-base font-semibold text-[#171717] font-inter line-clamp-2 flex-1">
              {article.title}
            </h3>
            <Badge
              variant={article.status === "published" ? "success" : "outline"}
              className="flex-shrink-0"
            >
              {article.status}
            </Badge>
          </div>

          {/* Excerpt */}
          <p className="text-sm text-[#737373] leading-[1.6] mb-3 line-clamp-2">
            {article.excerpt}
          </p>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-[#737373] mb-3">
            <span>{article.wordCount.toLocaleString()} words</span>
            <span>•</span>
            <span>{article.readingTime} min read</span>
            <span>•</span>
            <span>{formatDate(article.updatedAt)}</span>
            {article.seoScore && (
              <>
                <span>•</span>
                <span className="text-[#10b981] font-medium">
                  SEO: {article.seoScore}
                </span>
              </>
            )}
          </div>

          {/* Keywords */}
          <div className="flex flex-wrap gap-2 mb-3">
            {article.keywords.slice(0, 3).map((keyword, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-[#fafafa] text-[#737373] text-xs rounded"
              >
                {keyword}
              </span>
            ))}
            {article.keywords.length > 3 && (
              <span className="px-2 py-1 text-[#a3a3a3] text-xs">
                +{article.keywords.length - 3} more
              </span>
            )}
          </div>

          {/* Actions */}
          <div
            className={cn(
              "flex gap-2 transition-opacity duration-200",
              showActions ? "opacity-100" : "opacity-0"
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              variant="outline"
              size="sm"
              onClick={onView}
              className="text-xs"
            >
              <svg
                className="w-3 h-3 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
              View
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onEdit}
              className="text-xs"
            >
              <svg
                className="w-3 h-3 mr-1"
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
              Edit
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onDuplicate}
              className="text-xs"
            >
              <svg
                className="w-3 h-3 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              Duplicate
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onDelete}
              className="text-xs text-[#ff6b35] border-[#ff6b35] hover:bg-[#ff6b35] hover:text-white"
            >
              <svg
                className="w-3 h-3 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
              Delete
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}

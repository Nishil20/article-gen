"use client";

import * as React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ContentCardProps {
  title: string;
  thumbnail?: string;
  date: string;
  wordCount: number;
  status: "published" | "draft";
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  className?: string;
}

export function ContentCard({
  title,
  thumbnail,
  date,
  wordCount,
  status,
  onView,
  onEdit,
  onDelete,
  className,
}: ContentCardProps) {
  const [showActions, setShowActions] = React.useState(false);

  return (
    <Card
      className={cn(
        "overflow-hidden hover:shadow-active transition-all duration-200 cursor-pointer",
        className
      )}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className="flex gap-4 p-4">
        {/* Thumbnail placeholder */}
        <div className="w-24 h-24 bg-[#f5f5f5] rounded-lg flex-shrink-0 flex items-center justify-center">
          <span className="text-3xl">📄</span>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="text-sm font-semibold text-[#171717] font-inter line-clamp-2">
              {title}
            </h3>
            <Badge
              variant={status === "published" ? "success" : "outline"}
              className="flex-shrink-0"
            >
              {status}
            </Badge>
          </div>
          <div className="flex items-center gap-4 text-xs text-[#737373] mb-3">
            <span>{date}</span>
            <span>•</span>
            <span>{wordCount.toLocaleString()} words</span>
          </div>

          {/* Actions - show on hover */}
          <div
            className={cn(
              "flex gap-2 transition-opacity duration-200",
              showActions ? "opacity-100" : "opacity-0"
            )}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                onView?.();
              }}
              className="px-3 py-1 text-xs font-medium text-[#404040] bg-[#fafafa] border border-[#e5e5e5] rounded-lg hover:bg-[#f5f5f5] transition-colors duration-200"
            >
              View
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit?.();
              }}
              className="px-3 py-1 text-xs font-medium text-[#404040] bg-[#fafafa] border border-[#e5e5e5] rounded-lg hover:bg-[#f5f5f5] transition-colors duration-200"
            >
              Edit
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete?.();
              }}
              className="px-3 py-1 text-xs font-medium text-[#ff6b35] bg-[#fafafa] border border-[#e5e5e5] rounded-lg hover:bg-[#f5f5f5] transition-colors duration-200"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
}

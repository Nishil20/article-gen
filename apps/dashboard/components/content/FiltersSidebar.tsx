"use client";

import * as React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FiltersSidebarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  statusFilter: "all" | "draft" | "published";
  onStatusChange: (status: "all" | "draft" | "published") => void;
  dateRange: string;
  onDateRangeChange: (range: string) => void;
  sortBy: string;
  onSortByChange: (sort: string) => void;
  onClearFilters: () => void;
  className?: string;
}

export function FiltersSidebar({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
  dateRange,
  onDateRangeChange,
  sortBy,
  onSortByChange,
  onClearFilters,
  className,
}: FiltersSidebarProps) {
  return (
    <Card className={cn("p-6 space-y-6", className)}>
      {/* Search */}
      <div>
        <label className="block text-sm font-medium text-[#404040] mb-2">
          Search
        </label>
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search articles..."
            className="w-full px-4 py-2 pl-10 border border-[#e5e5e5] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#171717] transition-all"
          />
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#737373]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* Status Filter */}
      <div>
        <label className="block text-sm font-medium text-[#404040] mb-2">
          Status
        </label>
        <div className="space-y-2">
          {[
            { value: "all", label: "All Articles" },
            { value: "draft", label: "Drafts" },
            { value: "published", label: "Published" },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => onStatusChange(option.value as any)}
              className={cn(
                "w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-all",
                statusFilter === option.value
                  ? "bg-[#171717] text-white"
                  : "bg-[#fafafa] text-[#404040] hover:bg-[#f5f5f5]"
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Date Range */}
      <div>
        <label className="block text-sm font-medium text-[#404040] mb-2">
          Date Range
        </label>
        <select
          value={dateRange}
          onChange={(e) => onDateRangeChange(e.target.value)}
          className="w-full px-4 py-2 border border-[#e5e5e5] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#171717] transition-all"
        >
          <option value="all">All Time</option>
          <option value="7days">Last 7 Days</option>
          <option value="30days">Last 30 Days</option>
          <option value="3months">Last 3 Months</option>
        </select>
      </div>

      {/* Sort By */}
      <div>
        <label className="block text-sm font-medium text-[#404040] mb-2">
          Sort By
        </label>
        <select
          value={sortBy}
          onChange={(e) => onSortByChange(e.target.value)}
          className="w-full px-4 py-2 border border-[#e5e5e5] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#171717] transition-all"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="title-asc">Title A-Z</option>
          <option value="title-desc">Title Z-A</option>
          <option value="words-desc">Most Words</option>
          <option value="words-asc">Least Words</option>
        </select>
      </div>

      {/* Clear Filters */}
      <Button
        variant="ghost"
        onClick={onClearFilters}
        className="w-full"
      >
        Clear All Filters
      </Button>
    </Card>
  );
}

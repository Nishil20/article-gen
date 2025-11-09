"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/content/EmptyState";
import { ContentStats } from "@/components/content/ContentStats";
import { FiltersSidebar } from "@/components/content/FiltersSidebar";
import { ContentListItem } from "@/components/content/ContentListItem";
import { ContentPreviewModal } from "@/components/content/ContentPreviewModal";
import { mockArticles, mockContentStats, type Article } from "@/lib/mockData/myContent";
import { Sidebar } from "@/components/sidebar";

export default function ContentPage() {
  const router = useRouter();
  const [articles, setArticles] = React.useState<Article[]>(mockArticles);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<"all" | "draft" | "published">("all");
  const [dateRange, setDateRange] = React.useState("all");
  const [sortBy, setSortBy] = React.useState("newest");
  const [currentPage, setCurrentPage] = React.useState(1);
  const [selectedArticle, setSelectedArticle] = React.useState<Article | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = React.useState(false);
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const itemsPerPage = 10;

  // Filter and sort articles
  const filteredArticles = React.useMemo(() => {
    let filtered = [...articles];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (article) =>
          article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
          article.keywords.some((k) => k.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((article) => article.status === statusFilter);
    }

    // Date range filter
    if (dateRange !== "all") {
      const now = new Date();
      const ranges: Record<string, number> = {
        "7days": 7,
        "30days": 30,
        "3months": 90,
      };
      const days = ranges[dateRange];
      if (days) {
        filtered = filtered.filter((article) => {
          const articleDate = new Date(article.updatedAt);
          const diffTime = Math.abs(now.getTime() - articleDate.getTime());
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          return diffDays <= days;
        });
      }
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
        case "oldest":
          return new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
        case "title-asc":
          return a.title.localeCompare(b.title);
        case "title-desc":
          return b.title.localeCompare(a.title);
        case "words-desc":
          return b.wordCount - a.wordCount;
        case "words-asc":
          return a.wordCount - b.wordCount;
        default:
          return 0;
      }
    });

    return filtered;
  }, [articles, searchQuery, statusFilter, dateRange, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);
  const paginatedArticles = filteredArticles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleClearFilters = () => {
    setSearchQuery("");
    setStatusFilter("all");
    setDateRange("all");
    setSortBy("newest");
    setCurrentPage(1);
  };

  const handleView = (article: Article) => {
    setSelectedArticle(article);
    setIsPreviewOpen(true);
  };

  const handleEdit = (article: Article) => {
    alert(`Edit article: ${article.title} (Mock: would navigate to article writer with pre-filled data)`);
    // router.push(`/article-writer/standard?edit=${article.id}`);
  };

  const handleDelete = (article: Article) => {
    if (confirm(`Are you sure you want to delete "${article.title}"? This cannot be undone.`)) {
      setArticles((prev) => prev.filter((a) => a.id !== article.id));
      alert("Article deleted successfully!");
    }
  };

  const handleDuplicate = (article: Article) => {
    const duplicate: Article = {
      ...article,
      id: `${article.id}-copy-${Date.now()}`,
      title: `${article.title} (Copy)`,
      status: "draft",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setArticles((prev) => [duplicate, ...prev]);
    alert("Article duplicated successfully!");
  };

  // Show empty state if no articles at all
  if (mockArticles.length === 0) {
    return (
      <div className="min-h-screen bg-white flex">
        <Sidebar />
        <div className="flex-1 md:ml-64">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-12">
            <EmptyState />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex">
      <Sidebar />
      <div className="flex-1 md:ml-64">
      {/* Header */}
      <div className="border-b border-[#e5e5e5] bg-[#fafafa]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-[#171717] mb-2 font-satoshi tracking-[-0.02em]">
                My Content
              </h1>
              <p className="text-base text-[#737373]">
                Manage and organize your generated articles
              </p>
            </div>
            <Link href="/article-writer">
              <Button>
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
                New Article
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <ContentStats {...mockContentStats} />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-12">
        <div className="flex gap-8">
          {/* Filters Sidebar - Desktop */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <FiltersSidebar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              statusFilter={statusFilter}
              onStatusChange={setStatusFilter}
              dateRange={dateRange}
              onDateRangeChange={setDateRange}
              sortBy={sortBy}
              onSortByChange={setSortBy}
              onClearFilters={handleClearFilters}
            />
          </div>

          {/* Mobile Filter Toggle */}
          <div className="lg:hidden fixed bottom-6 right-6 z-40">
            <Button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              size="lg"
              className="rounded-full shadow-active"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                />
              </svg>
              Filters
            </Button>
          </div>

          {/* Mobile Filters Drawer */}
          {sidebarOpen && (
            <>
              <div
                className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                onClick={() => setSidebarOpen(false)}
              />
              <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-white rounded-t-xl shadow-active max-h-[80vh] overflow-y-auto">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-[#171717]">Filters</h3>
                    <button onClick={() => setSidebarOpen(false)}>
                      <svg
                        className="w-5 h-5 text-[#737373]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                  <FiltersSidebar
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    statusFilter={statusFilter}
                    onStatusChange={setStatusFilter}
                    dateRange={dateRange}
                    onDateRangeChange={setDateRange}
                    sortBy={sortBy}
                    onSortByChange={setSortBy}
                    onClearFilters={handleClearFilters}
                    className="border-0 p-0 shadow-none"
                  />
                </div>
              </div>
            </>
          )}

          {/* Content List */}
          <div className="flex-1">
            {filteredArticles.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="text-xl font-bold text-[#171717] mb-2">No articles found</h3>
                <p className="text-[#737373] mb-6">
                  Try adjusting your filters or search query
                </p>
                <Button variant="outline" onClick={handleClearFilters}>
                  Clear All Filters
                </Button>
              </div>
            ) : (
              <>
                <div className="space-y-4">
                  {paginatedArticles.map((article) => (
                    <ContentListItem
                      key={article.id}
                      article={article}
                      onView={() => handleView(article)}
                      onEdit={() => handleEdit(article)}
                      onDelete={() => handleDelete(article)}
                      onDuplicate={() => handleDuplicate(article)}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-8">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </Button>
                    <span className="text-sm text-[#737373] px-4">
                      Page {currentPage} of {totalPages}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      <ContentPreviewModal
        article={selectedArticle}
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        onEdit={() => handleEdit(selectedArticle!)}
        onDelete={() => handleDelete(selectedArticle!)}
      />
      </div>
    </div>
  );
}

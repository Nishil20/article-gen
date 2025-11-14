"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  LayoutDashboard,
  Sparkles,
  PenTool,
  RefreshCw,
  AlignLeft,
  Wrench,
  Folder,
  ArrowUpCircle,
} from "lucide-react";
import { mockUser, mockNavigation } from "@/lib/mockData";
import { cn } from "@/lib/utils";
import { AllToolsModal } from "./all-tools-modal";
import { useAuth } from "@/contexts/AuthContext";

// Icon mapping
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  LayoutDashboard,
  Sparkles,
  PenTool,
  RefreshCw,
  AlignLeft,
  Wrench,
  Folder,
  ArrowUpCircle,
};

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const pathname = usePathname();
  const { user, signOut } = useAuth();

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  // Get user display data
  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User';
  const userEmail = user?.email || '';
  const userInitials = userName
    .split(' ')
    .map((n: string) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  // Calculate progress percentage for plan usage (keeping mock data for now)
  const progressPercentage =
    ((mockUser.totalWords - mockUser.wordsLeft) / mockUser.totalWords) * 100;

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 md:hidden p-2 bg-white border border-[#e5e5e5] rounded-lg shadow-default"
        aria-label="Toggle menu"
      >
        <svg
          className="w-6 h-6 text-[#171717]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-screen w-64 bg-white border-r border-[#e5e5e5] flex flex-col transition-transform duration-200",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
          className
        )}
      >
        {/* Logo */}
        <div className="p-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#171717] rounded-lg flex items-center justify-center text-white font-bold">
              C
            </div>
            <span className="text-lg font-bold text-[#171717] font-satoshi">
              ContentGen
            </span>
          </div>
        </div>
          
        {/* Navigation Links */}
        <nav className="flex-1 px-3 py-2 space-y-0.5 overflow-y-auto">
          {mockNavigation.map((item) => {
            const active = isActive(item.href);
            const IconComponent = iconMap[item.icon];

            if (item.name === "All Tools") {
              return (
                <AllToolsModal key={item.name}>
                  <div
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-lg text-[15px] font-normal transition-all duration-200 cursor-pointer",
                      active
                        ? "bg-[#f5f5f5] text-[#171717]"
                        : "text-[#171717] hover:bg-[#fafafa]"
                    )}
                  >
                    {IconComponent && <IconComponent className="w-5 h-5" />}
                    <span>{item.name}</span>
                  </div>
                </AllToolsModal>
              );
            }

            return (
              <a
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-[15px] font-normal transition-all duration-200",
                  active
                    ? "bg-[#f5f5f5] text-[#171717]"
                    : "text-[#171717] hover:bg-[#fafafa]"
                )}
              >
                {IconComponent && <IconComponent className="w-5 h-5" />}
                <span>{item.name}</span>
              </a>
            );
          })}
        </nav>

        {/* Plan Info */}
        <div className="p-6 border-b border-[#e5e5e5]">
          <Card className="p-4 bg-[#fafafa] border-[#e5e5e5]">
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <span className="text-sm font-medium text-[#404040]">
                  {mockUser.plan}
                </span>
                <span className="text-sm text-[#737373]">
                  {mockUser.wordsLeft.toLocaleString()} left
                </span>
              </div>
              {/* Progress bar */}
              <div className="w-full h-2 bg-[#e5e5e5] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#171717] rounded-full transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
              <a href="/upgrade" className="mt-3 block">
                <Button
                  variant="default"
                  size="sm"
                  className="w-full"
                >
                  Upgrade Plan
                </Button>
              </a>
            </div>
          </Card>
        </div>

        {/* Profile Section */}
        <div className="p-3 border-t border-[#e5e5e5]">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#fafafa] transition-all duration-200 cursor-pointer">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-[#171717] text-white font-semibold text-xs">
                    {userInitials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#171717] truncate">
                    {userName}
                  </p>
                  <p className="text-xs text-[#737373] truncate">
                    {userEmail}
                  </p>
                </div>
                <svg
                  className="w-4 h-4 text-[#a3a3a3] flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium text-[#171717]">
                    {userName}
                  </p>
                  <p className="text-xs text-[#737373]">
                    {userEmail}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer" asChild>
                <a href="/profile">Profile</a>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                Billing
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="cursor-pointer text-red-600 focus:text-red-600"
                onClick={signOut}
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </aside>
    </>
  );
}

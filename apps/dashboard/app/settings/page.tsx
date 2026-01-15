"use client";

import * as React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings2, Globe, Database, Bell, Shield } from "lucide-react";
import Link from "next/link";

interface SettingCard {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  available: boolean;
}

export default function SettingsPage() {
  const settings: SettingCard[] = [
    {
      title: "WordPress Integration",
      description: "Configure your WordPress site connection and publishing settings",
      icon: <Globe className="w-6 h-6" />,
      href: "/settings/wordpress",
      available: true,
    },
    {
      title: "Database",
      description: "Manage your content database and published posts",
      icon: <Database className="w-6 h-6" />,
      href: "/settings/database",
      available: false,
    },
    {
      title: "Notifications",
      description: "Configure email and push notification preferences",
      icon: <Bell className="w-6 h-6" />,
      href: "/settings/notifications",
      available: false,
    },
    {
      title: "Security",
      description: "Manage security settings, passwords, and two-factor authentication",
      icon: <Shield className="w-6 h-6" />,
      href: "/settings/security",
      available: false,
    },
  ];

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <div className="max-w-4xl mx-auto p-6 md:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#171717] font-satoshi mb-2">
            Settings
          </h1>
          <p className="text-[#737373]">
            Manage your account settings and integrations
          </p>
        </div>

        {/* Settings Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {settings.map((setting) => (
            <Card
              key={setting.href}
              className={`p-6 bg-white border-[#e5e5e5] shadow-sm transition-all ${
                setting.available
                  ? "hover:border-[#404040] hover:shadow-md cursor-pointer"
                  : "opacity-60"
              }`}
            >
              {setting.available ? (
                <Link href={setting.href} className="block">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-[#fafafa] rounded-lg border border-[#e5e5e5]">
                      {setting.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-[#171717] mb-1">
                        {setting.title}
                      </h3>
                      <p className="text-sm text-[#737373]">
                        {setting.description}
                      </p>
                    </div>
                  </div>
                </Link>
              ) : (
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[#fafafa] rounded-lg border border-[#e5e5e5]">
                    {setting.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-semibold text-[#171717]">
                        {setting.title}
                      </h3>
                      <span className="text-xs bg-[#e5e5e5] text-[#737373] px-2 py-0.5 rounded">
                        Coming Soon
                      </span>
                    </div>
                    <p className="text-sm text-[#737373]">
                      {setting.description}
                    </p>
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <Card className="mt-6 p-6 bg-white border-[#e5e5e5] shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <Settings2 className="w-5 h-5 text-[#404040]" />
            <h3 className="text-lg font-semibold text-[#171717]">
              Quick Actions
            </h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-[#737373]">
                Export all your data
              </span>
              <Button variant="outline" size="sm" disabled>
                Export
              </Button>
            </div>
            <div className="flex items-center justify-between py-2 border-t border-[#e5e5e5]">
              <span className="text-sm text-[#737373]">
                Clear cache and temporary files
              </span>
              <Button variant="outline" size="sm" disabled>
                Clear Cache
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

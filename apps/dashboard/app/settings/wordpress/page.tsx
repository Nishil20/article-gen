"use client";

import * as React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Globe, ArrowLeft, CheckCircle2, XCircle, Loader2, AlertCircle, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

interface WordPressSettings {
  site_url: string;
  username: string;
  site_name?: string;
  is_active: boolean;
  last_tested_at?: string;
}

export default function WordPressSettingsPage() {
  const { user } = useAuth();
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);
  const [testing, setTesting] = React.useState(false);
  const [configured, setConfigured] = React.useState(false);
  const [testResult, setTestResult] = React.useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const [formData, setFormData] = React.useState({
    site_url: "",
    username: "",
    password: "",
    site_name: "",
  });

  // Load existing settings on mount
  React.useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const response = await fetch("/api/wordpress/get-settings");
      const data = await response.json();

      if (data.configured && data.settings) {
        setConfigured(true);
        setFormData({
          site_url: data.settings.site_url || "",
          username: data.settings.username || "",
          password: "", // Never populate password from server
          site_name: data.settings.site_name || "",
        });
      }
    } catch (error) {
      console.error("Failed to load WordPress settings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setTestResult(null); // Clear test result when user changes input
  };

  const handleTestConnection = async () => {
    if (!formData.site_url || !formData.username || !formData.password) {
      setTestResult({
        success: false,
        message: "Please fill in all required fields before testing.",
      });
      return;
    }

    setTesting(true);
    setTestResult(null);

    try {
      const response = await fetch("/api/wordpress/test-connection", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          site_url: formData.site_url,
          username: formData.username,
          password: formData.password,
        }),
      });

      const data = await response.json();
      setTestResult(data);

      if (data.success && data.site_name) {
        setFormData((prev) => ({
          ...prev,
          site_name: data.site_name || prev.site_name,
        }));
      }
    } catch (error) {
      setTestResult({
        success: false,
        message: "Failed to test connection. Please try again.",
      });
    } finally {
      setTesting(false);
    }
  };

  const handleSave = async () => {
    if (!formData.site_url || !formData.username || !formData.password) {
      setTestResult({
        success: false,
        message: "Please fill in all required fields.",
      });
      return;
    }

    setSaving(true);

    try {
      const response = await fetch("/api/wordpress/save-settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setConfigured(true);
        setTestResult({
          success: true,
          message: "WordPress settings saved successfully!",
        });
      } else {
        setTestResult({
          success: false,
          message: data.error || "Failed to save settings.",
        });
      }
    } catch (error) {
      setTestResult({
        success: false,
        message: "Failed to save settings. Please try again.",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fafafa] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#404040]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <div className="max-w-3xl mx-auto p-6 md:p-8">
        {/* Header */}
        <div className="mb-6">
          <Link
            href="/settings"
            className="inline-flex items-center gap-2 text-sm text-[#737373] hover:text-[#404040] mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Settings
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-white rounded-lg border border-[#e5e5e5]">
              <Globe className="w-6 h-6 text-[#404040]" />
            </div>
            <h1 className="text-3xl font-bold text-[#171717] font-satoshi">
              WordPress Integration
            </h1>
          </div>
          <p className="text-[#737373]">
            Configure your WordPress site to publish blog posts directly
          </p>
        </div>

        {/* Configuration Card */}
        <Card className="p-6 md:p-8 bg-white border-[#e5e5e5] shadow-sm mb-6">
          <div className="space-y-6">
            {/* Site URL */}
            <div className="space-y-2">
              <Label htmlFor="site_url" className="text-[#171717]">
                WordPress Site URL <span className="text-red-500">*</span>
              </Label>
              <Input
                id="site_url"
                name="site_url"
                type="url"
                placeholder="https://yoursite.com"
                value={formData.site_url}
                onChange={handleInputChange}
                className="border-[#e5e5e5]"
              />
              <p className="text-xs text-[#737373]">
                The full URL of your WordPress site
              </p>
            </div>

            {/* Username */}
            <div className="space-y-2">
              <Label htmlFor="username" className="text-[#171717]">
                WordPress Username <span className="text-red-500">*</span>
              </Label>
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="admin"
                value={formData.username}
                onChange={handleInputChange}
                className="border-[#e5e5e5]"
              />
              <p className="text-xs text-[#737373]">
                Your WordPress username with publishing permissions
              </p>
            </div>

            {/* Application Password */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-[#171717]">
                Application Password <span className="text-red-500">*</span>
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="xxxx xxxx xxxx xxxx xxxx xxxx"
                value={formData.password}
                onChange={handleInputChange}
                className="border-[#e5e5e5]"
              />
              <div className="flex items-start gap-2 text-xs text-[#737373] bg-[#fafafa] p-3 rounded border border-[#e5e5e5]">
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="mb-1">
                    Generate an Application Password in WordPress:
                  </p>
                  <ol className="list-decimal list-inside space-y-1">
                    <li>Go to Users → Profile in WordPress</li>
                    <li>Scroll to "Application Passwords"</li>
                    <li>Enter a name and click "Add New Application Password"</li>
                    <li>Copy the generated password and paste it here</li>
                  </ol>
                </div>
              </div>
            </div>

            {/* Test Result */}
            {testResult && (
              <div
                className={`flex items-start gap-3 p-4 rounded border ${
                  testResult.success
                    ? "bg-green-50 border-green-200"
                    : "bg-red-50 border-red-200"
                }`}
              >
                {testResult.success ? (
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                )}
                <div className="flex-1">
                  <p
                    className={`text-sm font-medium ${
                      testResult.success ? "text-green-900" : "text-red-900"
                    }`}
                  >
                    {testResult.message}
                  </p>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-[#e5e5e5]">
              <Button
                onClick={handleTestConnection}
                disabled={testing || saving}
                variant="outline"
                className="flex-1"
              >
                {testing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Testing...
                  </>
                ) : (
                  "Test Connection"
                )}
              </Button>
              <Button
                onClick={handleSave}
                disabled={testing || saving || !testResult?.success}
                className="flex-1 bg-[#171717] hover:bg-[#404040]"
              >
                {saving ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : configured ? (
                  "Update Settings"
                ) : (
                  "Save Settings"
                )}
              </Button>
            </div>
          </div>
        </Card>

        {/* Help Card */}
        <Card className="p-6 bg-white border-[#e5e5e5] shadow-sm">
          <h3 className="text-lg font-semibold text-[#171717] mb-3">
            Need Help?
          </h3>
          <div className="space-y-2 text-sm text-[#737373]">
            <p>
              WordPress Application Passwords are available in WordPress 5.6+.
              They provide a secure way to authenticate without exposing your
              main password.
            </p>
            <a
              href="https://make.wordpress.org/core/2020/11/05/application-passwords-integration-guide/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[#171717] hover:underline"
            >
              Learn more about Application Passwords
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </Card>
      </div>
    </div>
  );
}

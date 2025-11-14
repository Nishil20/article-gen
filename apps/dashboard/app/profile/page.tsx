"use client";

import * as React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { User, Mail, FileText, Camera } from "lucide-react";

export default function ProfilePage() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = React.useState(false);

  // Get user display data
  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User';
  const userEmail = user?.email || '';
  const userInitials = userName
    .split(' ')
    .map((n: string) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  // Form state
  const [formData, setFormData] = React.useState({
    fullName: userName,
    email: userEmail,
    bio: user?.user_metadata?.bio || '',
    company: user?.user_metadata?.company || '',
    location: user?.user_metadata?.location || '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // This will be connected to actual save logic later
    console.log('Saving profile:', formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset form to original values
    setFormData({
      fullName: userName,
      email: userEmail,
      bio: user?.user_metadata?.bio || '',
      company: user?.user_metadata?.company || '',
      location: user?.user_metadata?.location || '',
    });
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <div className="max-w-4xl mx-auto p-6 md:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#171717] font-satoshi mb-2">
            Profile Settings
          </h1>
          <p className="text-[#737373]">
            Manage your account details and preferences
          </p>
        </div>

        {/* Profile Card */}
        <Card className="p-6 md:p-8 bg-white border-[#e5e5e5] shadow-sm">
          {/* Avatar Section */}
          <div className="flex flex-col items-center md:flex-row md:items-start gap-6 mb-8 pb-8 border-b border-[#e5e5e5]">
            <div className="relative group">
              <Avatar className="w-24 h-24 md:w-32 md:h-32">
                <AvatarFallback className="bg-[#171717] text-white font-bold text-3xl">
                  {userInitials}
                </AvatarFallback>
              </Avatar>
              <button
                className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                disabled={!isEditing}
              >
                <Camera className="w-8 h-8 text-white" />
              </button>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-bold text-[#171717] mb-1">
                {formData.fullName}
              </h2>
              <p className="text-[#737373] mb-4">{formData.email}</p>
              {!isEditing && (
                <Button
                  onClick={() => setIsEditing(true)}
                  variant="outline"
                  className="border-[#e5e5e5]"
                >
                  Edit Profile
                </Button>
              )}
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-6">
            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-[#171717] flex items-center gap-2">
                <User className="w-4 h-4 text-[#737373]" />
                Full Name
              </Label>
              <Input
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="border-[#e5e5e5] disabled:bg-[#fafafa] disabled:text-[#171717]"
                placeholder="Enter your full name"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[#171717] flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#737373]" />
                Email Address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="border-[#e5e5e5] disabled:bg-[#fafafa] disabled:text-[#171717]"
                placeholder="Enter your email"
              />
            </div>

            {/* Bio */}
            <div className="space-y-2">
              <Label htmlFor="bio" className="text-[#171717] flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#737373]" />
                Bio
              </Label>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                disabled={!isEditing}
                rows={4}
                className="flex w-full rounded-md border border-[#e5e5e5] bg-white px-3 py-2 text-base ring-offset-white placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-[#fafafa] disabled:text-[#171717] md:text-sm"
                placeholder="Write a short bio about yourself"
              />
              <p className="text-xs text-[#737373]">
                Brief description for your profile. Max 200 characters.
              </p>
            </div>

            {/* Company */}
            <div className="space-y-2">
              <Label htmlFor="company" className="text-[#171717]">
                Company
              </Label>
              <Input
                id="company"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="border-[#e5e5e5] disabled:bg-[#fafafa] disabled:text-[#171717]"
                placeholder="Your company name"
              />
            </div>

            {/* Location */}
            <div className="space-y-2">
              <Label htmlFor="location" className="text-[#171717]">
                Location
              </Label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="border-[#e5e5e5] disabled:bg-[#fafafa] disabled:text-[#171717]"
                placeholder="City, Country"
              />
            </div>
          </div>

          {/* Action Buttons */}
          {isEditing && (
            <div className="flex gap-3 mt-8 pt-6 border-t border-[#e5e5e5]">
              <Button
                onClick={handleSave}
                className="flex-1 md:flex-none md:min-w-[120px]"
              >
                Save Changes
              </Button>
              <Button
                onClick={handleCancel}
                variant="outline"
                className="flex-1 md:flex-none md:min-w-[120px] border-[#e5e5e5]"
              >
                Cancel
              </Button>
            </div>
          )}
        </Card>

        {/* Additional Info Cards */}
        <div className="grid gap-6 mt-6 md:grid-cols-2">
          {/* Account Info */}
          <Card className="p-6 bg-white border-[#e5e5e5] shadow-sm">
            <h3 className="text-lg font-semibold text-[#171717] mb-4">
              Account Information
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-[#737373]">Member since</span>
                <span className="text-[#171717] font-medium">
                  {new Date(user?.created_at || Date.now()).toLocaleDateString('en-US', {
                    month: 'long',
                    year: 'numeric'
                  })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#737373]">Account Status</span>
                <span className="text-green-600 font-medium">Active</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#737373]">Email Verified</span>
                <span className="text-[#171717] font-medium">
                  {user?.email_confirmed_at ? 'Yes' : 'No'}
                </span>
              </div>
            </div>
          </Card>

          {/* Security */}
          <Card className="p-6 bg-white border-[#e5e5e5] shadow-sm">
            <h3 className="text-lg font-semibold text-[#171717] mb-4">
              Security
            </h3>
            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full justify-start border-[#e5e5e5]"
              >
                Change Password
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start border-[#e5e5e5]"
              >
                Two-Factor Authentication
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start border-[#e5e5e5] text-red-600 hover:text-red-700"
              >
                Delete Account
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

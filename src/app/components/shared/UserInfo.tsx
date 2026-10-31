"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  UserRound,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface UserInfoProps {
  user: {
    name?: string | null;
    email: string;
    image?: string | null;
  };
  accountLinks: {
    name: string;
    href: string;
    icon: LucideIcon;
  }[];
  variant?: "dropdown" | "card";
}

export default function UserInfo({
  user,
  accountLinks,
  variant = "dropdown",
}: UserInfoProps) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Profile page display
  if (variant === "card") {
    return (
      <div className="flex items-center gap-4 rounded-2xl border border-[#E5E8F0] bg-white p-5 dark:border-[#343B59] dark:bg-[#1D2340]">
        {user.image ? (
          <img
            src={user.image}
            alt={user.name || "Profile"}
            className="h-16 w-16 rounded-full border-2 border-[#E9EAFE] object-cover"
          />
        ) : (
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#E9EAFE] text-[#5265D5] dark:bg-[#292E50] dark:text-[#C5CBFF]">
            <UserRound size={28} />
          </div>
        )}

        <div className="min-w-0">
          <p className="truncate text-lg font-semibold text-[#252B42] dark:text-white">
            {user.name || "User"}
          </p>
          <p className="mt-1 truncate text-sm text-[#737B91]">
            {user.email}
          </p>
        </div>
      </div>
    );
  }

  // Navbar profile dropdown
  return (
    <div className="relative">
      {/* Profile Button */}
      <button
        type="button"
        onClick={() => setIsProfileOpen(!isProfileOpen)}
        aria-expanded={isProfileOpen}
        aria-label="Open profile menu"
        className="flex items-center gap-2 rounded-xl border border-[#E5E8F0] px-2 py-1.5 transition hover:bg-[#F7F8FC] dark:border-[#343B59] dark:hover:bg-[#292E50]"
      >
        {user.image ? (
          <img
            src={user.image}
            alt={user.name || "Profile"}
            className="h-9 w-9 rounded-full border-2 border-[#E9EAFE] object-cover"
          />
        ) : (
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E9EAFE] text-[#5265D5] dark:bg-[#292E50] dark:text-[#C5CBFF]">
            <UserRound size={19} />
          </div>
        )}

        <ChevronDown
          size={16}
          className={`text-[#9299AC] transition-transform ${
            isProfileOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Content */}
      {isProfileOpen && (
        <div className="absolute right-0 top-full z-50 mt-3 w-64 overflow-hidden rounded-2xl border border-[#E5E8F0] bg-white shadow-xl dark:border-[#343B59] dark:bg-[#1D2340]">
          {/* User Information */}
          <div className="border-b border-[#E5E8F0] px-4 py-3 dark:border-[#343B59]">
            <p className="truncate text-sm font-semibold text-[#252B42] dark:text-white">
              {user.name || "User"}
            </p>

            <p className="mt-1 truncate text-xs text-[#737B91]">
              {user.email}
            </p>
          </div>

          {/* Account Links */}
          <div className="p-2">
            {accountLinks.map((link) => {
              const Icon = link.icon;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsProfileOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-[#252B42] transition hover:bg-[#F0EDFF] hover:text-[#6477E8] dark:text-[#C1C6D8] dark:hover:bg-[#292E50]"
                >
                  <Icon size={17} className="text-[#6477E8]" />
                  {link.name}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
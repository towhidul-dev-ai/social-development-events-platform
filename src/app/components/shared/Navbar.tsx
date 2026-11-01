
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  HeartHandshake,
  Menu,
  X,
  Sun,
  Moon,
  UserRound,
  CalendarDays,
  PlusCircle,
  Settings,
  LogOut,
  ChevronDown,
  LayoutDashboard,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";

const accountLinks = [

  {
    name: "My Profile",
    href: "/profile",
    icon: UserRound,
  },

  {
    name: "Create Event",
    href: "/create-event",
    icon: PlusCircle,
  },
  {
    name: "Manage Events",
    href: "/manage-events",
    icon: Settings,
  },
  {
    name: "Joined Events",
    href: "/joint-events",
    icon: CalendarDays,
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const isLoggedIn = !!user;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isThemeLoaded, setIsThemeLoaded] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Upcoming Events", href: "/upcoming-events" },
  ];

  // Initialize saved theme
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    const darkMode =
      savedTheme === "dark" ||
      (!savedTheme &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);

    setIsDark(darkMode);
    document.documentElement.classList.toggle("dark", darkMode);
    setIsThemeLoaded(true);
  }, []);

  // Toggle full-site theme
  const toggleTheme = () => {
    const newTheme = !isDark;

    setIsDark(newTheme);
    document.documentElement.classList.toggle("dark", newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  // Logout
  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);

      const { error } = await authClient.signOut();

      if (error) {
        console.error("Logout failed:", error.message);
        return;
      }

      setIsMenuOpen(false);
      setIsProfileOpen(false);

      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  // Active navigation link
  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const linkStyle = (href: string) =>
    `rounded-xl px-4 py-2.5 text-sm font-semibold transition-all ${
      isActive(href)
        ? "bg-[#E9EAFE] text-[#5265D5] dark:bg-[#292E50] dark:text-[#C5CBFF]"
        : "text-[#626B83] hover:bg-[#F0EDFF] hover:text-[#6477E8] dark:text-[#C1C6D8] dark:hover:bg-[#292E50]"
    }`;

  const closeMenus = () => {
    setIsMenuOpen(false);
    setIsProfileOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[#E5E8F0] bg-white/95 backdrop-blur-xl dark:border-[#343B59] dark:bg-[#14182B]/95">
      <nav className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Brand */}
        <Link
          href="/"
          onClick={closeMenus}
          className="flex shrink-0 items-center gap-3"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#6477E8] to-[#8B83D9] text-white shadow-md shadow-[#6477E8]/20">
            <HeartHandshake size={25} strokeWidth={2.2} />
          </div>

          <div>
            <span className="text-xl font-extrabold tracking-tight text-[#252B42] dark:text-white">
              Good<span className="text-[#6477E8]">Gather</span>
            </span>

            <p className="hidden text-[10px] font-semibold tracking-[0.16em] text-[#9299AC] sm:block">
              COMMUNITY & CONNECTION
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-2 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={linkStyle(link.href)}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 md:flex">

          {/* Theme Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={
              isDark ? "Switch to light theme" : "Switch to dark theme"
            }
            title={isDark ? "Light mode" : "Dark mode"}
            className="rounded-xl border border-[#E5E8F0] p-2.5 text-[#626B83] transition hover:bg-[#F0EDFF] hover:text-[#6477E8] dark:border-[#343B59] dark:text-[#C1C6D8] dark:hover:bg-[#292E50]"
          >
            {!isThemeLoaded ? (
              <Moon size={19} />
            ) : isDark ? (
              <Sun size={19} />
            ) : (
              <Moon size={19} />
            )}
          </button>

          {isPending ? (
            <div className="h-10 w-24 animate-pulse rounded-xl bg-[#E9EAFE] dark:bg-[#292E50]" />
          ) : !isLoggedIn ? (
            <Link
              href="/login"
              className="inline-flex items-center gap-2 rounded-xl bg-[#6477E8] px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-[#6477E8]/20 transition hover:bg-[#5367D5]"
            >
              Login
              <ArrowRightIcon />
            </Link>
          ) : (
            <div className="flex items-center gap-3">

              {/* Profile Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setIsProfileOpen(true)}
                onMouseLeave={() => setIsProfileOpen(false)}
              >
                <button
                  type="button"
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  aria-expanded={isProfileOpen}
                  aria-label="Open profile menu"
                  className="flex items-center gap-2 rounded-xl border border-[#E5E8F0] bg-white p-1.5 pr-3 transition hover:border-[#6477E8]/40 hover:bg-[#F7F8FC] dark:border-[#343B59] dark:bg-[#1D2340] dark:hover:bg-[#292E50]"
                >
                  {user.image ? (
                    <img
                      src={user.image}
                      alt={user.name || "Profile"}
                      className="h-9 w-9 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#E9EAFE] text-[#6477E8] dark:bg-[#292E50]">
                      <UserRound size={20} />
                    </div>
                  )}

                  <span className="max-w-[110px] truncate text-sm font-semibold text-[#252B42] dark:text-white">
                    {user.name || "My Account"}
                  </span>

                  <ChevronDown
                    size={15}
                    className={`text-[#737B91] transition-transform ${
                      isProfileOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown Content */}
                {isProfileOpen && (
                  <div className="absolute right-0 top-full z-50 w-64 pt-2">
                    <div className="overflow-hidden rounded-2xl border border-[#E5E8F0] bg-white p-2 shadow-xl dark:border-[#343B59] dark:bg-[#1D2340]">

                      <div className="border-b border-[#E5E8F0] px-3 py-3 dark:border-[#343B59]">
                        <p className="truncate text-sm font-bold text-[#252B42] dark:text-white">
                          {user.name || "User"}
                        </p>
                        <p className="mt-1 truncate text-xs text-[#737B91]">
                          {user.email}
                        </p>
                      </div>

                      <div className="py-2">
                        <p className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-[#9299AC]">
                          Account Management
                        </p>

                        {accountLinks.map((link) => {
                          const Icon = link.icon;

                          return (
                            <Link
                              key={link.href}
                              href={link.href}
                              onClick={closeMenus}
                              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                                isActive(link.href)
                                  ? "bg-[#E9EAFE] text-[#5265D5] dark:bg-[#292E50] dark:text-[#C5CBFF]"
                                  : "text-[#626B83] hover:bg-[#F7F8FC] hover:text-[#6477E8] dark:text-[#C1C6D8] dark:hover:bg-[#292E50]"
                              }`}
                            >
                              <Icon size={17} />
                              {link.name}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Logout */}
              <button
                type="button"
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold text-red-500 transition hover:bg-red-50 disabled:opacity-60 dark:hover:bg-red-950/30"
              >
                <LogOut size={17} />
                {isLoggingOut ? "Logging out..." : "Logout"}
              </button>
            </div>
          )}
        </div>

        {/* Mobile Actions */}
        <div className="flex items-center gap-2 md:hidden">

          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="rounded-xl border border-[#E5E8F0] p-2.5 text-[#626B83] dark:border-[#343B59] dark:text-[#C1C6D8]"
          >
            {!isThemeLoaded ? (
              <Moon size={19} />
            ) : isDark ? (
              <Sun size={19} />
            ) : (
              <Moon size={19} />
            )}
          </button>

          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
            className="rounded-xl border border-[#E5E8F0] p-2.5 text-[#252B42] dark:border-[#343B59] dark:text-white"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="border-t border-[#E5E8F0] bg-white px-4 py-5 dark:border-[#343B59] dark:bg-[#14182B] md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-2">

            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenus}
                className={linkStyle(link.href)}
              >
                {link.name}
              </Link>
            ))}

            {isPending ? (
              <div className="mt-3 h-10 animate-pulse rounded-xl bg-[#E9EAFE] dark:bg-[#292E50]" />
            ) : !isLoggedIn ? (
              <Link
                href="/login"
                onClick={closeMenus}
                className="mt-3 rounded-xl bg-[#6477E8] px-4 py-3 text-center text-sm font-semibold text-white"
              >
                Login
              </Link>
            ) : (
              <>
                {/* Mobile User Information */}
                <div className="mt-3 flex items-center gap-3 rounded-xl bg-[#F7F8FC] p-3 dark:bg-[#1D2340]">
                  {user.image ? (
                    <img
                      src={user.image}
                      alt={user.name || "Profile"}
                      className="h-11 w-11 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#E9EAFE] text-[#5265D5] dark:bg-[#292E50]">
                      <UserRound size={21} />
                    </div>
                  )}

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-[#252B42] dark:text-white">
                      {user.name || "User"}
                    </p>
                    <p className="truncate text-xs text-[#737B91]">
                      {user.email}
                    </p>
                  </div>
                </div>

                {/* Mobile Account Links */}
                <div className="mt-2">
                  <p className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-[#9299AC]">
                    Account Management
                  </p>

                  {accountLinks.map((link) => {
                    const Icon = link.icon;

                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={closeMenus}
                        className={linkStyle(link.href)}
                      >
                        <span className="flex items-center gap-3">
                          <Icon size={17} />
                          {link.name}
                        </span>
                      </Link>
                    );
                  })}
                </div>

                {/* Mobile Logout */}
                <button
                  type="button"
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="mt-2 flex items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold text-red-500 transition hover:bg-red-50 disabled:opacity-60 dark:hover:bg-red-950/30"
                >
                  <LogOut size={17} />
                  {isLoggingOut ? "Logging out..." : "Logout"}
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

function ArrowRightIcon() {
  return <LayoutDashboard size={16} />;
}

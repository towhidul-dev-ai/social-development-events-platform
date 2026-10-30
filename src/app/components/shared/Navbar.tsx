"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  HeartHandshake,
  Menu,
  X,
  Sun,
  Moon,
  ChevronDown,
  UserRound,
  CalendarDays,
  PlusCircle,
  Settings,
  LogOut,
} from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDark, setIsDark] = useState(false);

  // Initialize saved theme
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    const darkMode =
      savedTheme === "dark" ||
      (!savedTheme &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);

    setIsDark(darkMode);
    document.documentElement.classList.toggle("dark", darkMode);
  }, []);

  // Theme toggle
  const toggleTheme = () => {
    const newTheme = !isDark;

    setIsDark(newTheme);
    document.documentElement.classList.toggle("dark", newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Upcoming Events", href: "/events" },
  ];

  const isActive = (href: string) => pathname === href;

  const linkStyle = (href: string) =>
    `rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
      isActive(href)
        ? "bg-[#E9EAFE] text-[#5265D5] dark:bg-[#292E50] dark:text-[#C5CBFF]"
        : "text-[#626B83] hover:bg-[#F0EDFF] hover:text-[#6477E8] dark:text-[#C1C6D8] dark:hover:bg-[#292E50]"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-[#E5E8F0] bg-white/90 backdrop-blur-xl dark:border-[#343B59] dark:bg-[#14182B]/90">
      <nav className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Brand Logo */}
        <Link
          href="/"
          onClick={() => setIsMenuOpen(false)}
          className="flex shrink-0 items-center gap-3"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#6477E8] to-[#8B83D9] text-white shadow-md shadow-[#6477E8]/20">
            <HeartHandshake size={25} strokeWidth={2.2} />
          </div>

          <div>
            <span className="text-xl font-bold tracking-tight text-[#252B42] dark:text-white">
              Cat<span className="text-[#6477E8]">-</span>Hermione
            </span>
            <p className="hidden text-[10px] font-medium tracking-[0.16em] text-[#9299AC] sm:block">
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
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="rounded-xl border border-[#E5E8F0] p-2.5 text-[#626B83] transition hover:bg-[#F0EDFF] hover:text-[#6477E8] dark:border-[#343B59] dark:text-[#C1C6D8] dark:hover:bg-[#292E50]"
          >
            {isDark ? <Sun size={19} /> : <Moon size={19} />}
          </button>

          {!isLoggedIn ? (
            <Link
              href="/login"
              className="rounded-xl bg-[#6477E8] px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-[#6477E8]/20 transition hover:-translate-y-0.5 hover:bg-[#5265D5]"
            >
              Login
            </Link>
          ) : (
            <div className="group relative">
              <button className="flex items-center gap-2 rounded-xl border border-[#E5E8F0] px-3 py-2 dark:border-[#343B59]">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E9EAFE] text-[#5265D5] dark:bg-[#292E50] dark:text-[#C5CBFF]">
                  <UserRound size={19} />
                </div>

                <span className="text-sm font-semibold text-[#252B42] dark:text-white">
                  My Account
                </span>

                <ChevronDown size={16} className="text-[#9299AC]" />
              </button>

              <div className="invisible absolute right-0 top-full mt-3 w-56 rounded-2xl border border-[#E5E8F0] bg-white p-2 opacity-0 shadow-xl transition-all group-hover:visible group-hover:opacity-100 dark:border-[#343B59] dark:bg-[#1D2340]">
                <p className="px-3 py-2 text-xs font-medium text-[#9299AC]">
                  Manage your activities
                </p>

                <Link href="/create-event" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-[#626B83] transition hover:bg-[#F0EDFF] hover:text-[#6477E8] dark:text-[#C1C6D8] dark:hover:bg-[#292E50]">
                  <PlusCircle size={17} /> Create Event
                </Link>

                <Link href="/manage-events" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-[#626B83] transition hover:bg-[#F0EDFF] hover:text-[#6477E8] dark:text-[#C1C6D8] dark:hover:bg-[#292E50]">
                  <Settings size={17} /> Manage Events
                </Link>

                <Link href="/joined-events" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-[#626B83] transition hover:bg-[#F0EDFF] hover:text-[#6477E8] dark:text-[#C1C6D8] dark:hover:bg-[#292E50]">
                  <CalendarDays size={17} /> Joined Events
                </Link>

                <div className="my-2 border-t border-[#E5E8F0] dark:border-[#343B59]" />

                <button
                  onClick={() => setIsLoggedIn(false)}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-red-500 transition hover:bg-red-50 dark:hover:bg-red-950/30"
                >
                  <LogOut size={17} /> Logout
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Actions */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="rounded-xl border border-[#E5E8F0] p-2.5 text-[#626B83] dark:border-[#343B59] dark:text-[#C1C6D8]"
          >
            {isDark ? <Sun size={19} /> : <Moon size={19} />}
          </button>

          <button
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
                onClick={() => setIsMenuOpen(false)}
                className={linkStyle(link.href)}
              >
                {link.name}
              </Link>
            ))}

            {!isLoggedIn ? (
              <Link
                href="/login"
                onClick={() => setIsMenuOpen(false)}
                className="mt-2 rounded-xl bg-[#6477E8] px-5 py-3 text-center text-sm font-semibold text-white"
              >
                Login
              </Link>
            ) : (
              <>
                <Link href="/create-event" onClick={() => setIsMenuOpen(false)} className={linkStyle("/create-event")}>
                  Create Event
                </Link>
                <Link href="/manage-events" onClick={() => setIsMenuOpen(false)} className={linkStyle("/manage-events")}>
                  Manage Events
                </Link>
                <Link href="/joined-events" onClick={() => setIsMenuOpen(false)} className={linkStyle("/joined-events")}>
                  Joined Events
                </Link>
                <button
                  onClick={() => {
                    setIsLoggedIn(false);
                    setIsMenuOpen(false);
                  }}
                  className="rounded-lg px-3 py-2 text-left text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

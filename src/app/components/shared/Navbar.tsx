
// "use client";

// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import {
//   HeartHandshake,
//   Menu,
//   X,
//   Sun,
//   Moon,
//   ChevronDown,
//   UserRound,
//   CalendarDays,
//   PlusCircle,
//   Settings,
//   LogOut,
// } from "lucide-react";

// import { authClient } from "@/lib/auth-client";

// const accountLinks = [
//   {
//     name: "Create Event",
//     href: "/create-event",
//     icon: PlusCircle,
//   },
//   {
//     name: "Manage Events",
//     href: "/manage-events",
//     icon: Settings,
//   },
//   {
//     name: "Joined Events",
//     href: "/joined-events",
//     icon: CalendarDays,
//   },
// ];

// export default function Navbar() {
//   const pathname = usePathname();
//   const router = useRouter();

//   const { data: session, isPending } = authClient.useSession();

//   const user = session?.user;
//   const isLoggedIn = !!user;

//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isProfileOpen, setIsProfileOpen] = useState(false);
//   const [isDark, setIsDark] = useState(false);
//   const [isLoggingOut, setIsLoggingOut] = useState(false);

//   // Initialize theme
//   useEffect(() => {
//     const savedTheme = localStorage.getItem("theme");

//     const darkMode =
//       savedTheme === "dark" ||
//       (!savedTheme &&
//         window.matchMedia("(prefers-color-scheme: dark)").matches);

//     setIsDark(darkMode);
//     document.documentElement.classList.toggle("dark", darkMode);
//   }, []);

//   // Theme toggle
//   const toggleTheme = () => {
//     const newTheme = !isDark;

//     setIsDark(newTheme);
//     document.documentElement.classList.toggle("dark", newTheme);
//     localStorage.setItem("theme", newTheme ? "dark" : "light");
//   };

//   // Logout
//   const handleLogout = async () => {
//     try {
//       setIsLoggingOut(true);

//       const { error } = await authClient.signOut();

//       if (error) {
//         console.error("Logout failed:", error.message);
//         return;
//       }

//       setIsProfileOpen(false);
//       setIsMenuOpen(false);

//       router.push("/");
//       router.refresh();
//     } catch (error) {
//       console.error("Logout failed:", error);
//     } finally {
//       setIsLoggingOut(false);
//     }
//   };

//   const navLinks = [
//     { name: "Home", href: "/" },
//     { name: "Upcoming Events", href: "/events" },
//   ];

//   const isActive = (href: string) => {
//     if (href === "/") return pathname === "/";
//     return pathname === href || pathname.startsWith(`${href}/`);
//   };

//   const linkStyle = (href: string) =>
//     `rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
//       isActive(href)
//         ? "bg-[#E9EAFE] text-[#5265D5] dark:bg-[#292E50] dark:text-[#C5CBFF]"
//         : "text-[#626B83] hover:bg-[#F0EDFF] hover:text-[#6477E8] dark:text-[#C1C6D8] dark:hover:bg-[#292E50]"
//     }`;

//   return (
//     <header className="sticky top-0 z-50 border-b border-[#E5E8F0] bg-white/90 backdrop-blur-xl dark:border-[#343B59] dark:bg-[#14182B]/90">
//       <nav className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

//         {/* Brand */}
//         <Link
//           href="/"
//           onClick={() => setIsMenuOpen(false)}
//           className="flex shrink-0 items-center gap-3"
//         >
//           <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#6477E8] to-[#8B83D9] text-white shadow-md shadow-[#6477E8]/20">
//             <HeartHandshake size={25} strokeWidth={2.2} />
//           </div>

//           <div>
//             <span className="text-xl font-bold tracking-tight text-[#252B42] dark:text-white">
//               Cat<span className="text-[#6477E8]">-</span>Hermione
//             </span>

//             <p className="hidden text-[10px] font-medium tracking-[0.16em] text-[#9299AC] sm:block">
//               COMMUNITY & CONNECTION
//             </p>
//           </div>
//         </Link>

//         {/* Desktop Navigation */}
//         <div className="hidden items-center gap-2 md:flex">
//           {navLinks.map((link) => (
//             <Link
//               key={link.href}
//               href={link.href}
//               className={linkStyle(link.href)}
//             >
//               {link.name}
//             </Link>
//           ))}
//         </div>

//         {/* Desktop Actions */}
//         <div className="hidden items-center gap-3 md:flex">

//           {/* Theme Toggle */}
//           <button
//             type="button"
//             onClick={toggleTheme}
//             aria-label="Toggle theme"
//             className="rounded-xl border border-[#E5E8F0] p-2.5 text-[#626B83] transition hover:bg-[#F0EDFF] hover:text-[#6477E8] dark:border-[#343B59] dark:text-[#C1C6D8] dark:hover:bg-[#292E50]"
//           >
//             {isDark ? <Sun size={19} /> : <Moon size={19} />}
//           </button>

//           {isPending ? (
//             <div className="h-10 w-24 animate-pulse rounded-xl bg-[#E9EAFE] dark:bg-[#292E50]" />
//           ) : !isLoggedIn ? (
//             <div className="flex items-center gap-2">
//               <Link
//                 href="/login"
//                 className="rounded-xl px-5 py-2.5 text-sm font-semibold text-[#6477E8] transition hover:bg-[#E9EAFE] dark:hover:bg-[#292E50]"
//               >
//                 Login
//               </Link>

//               <Link
//                 href="/register"
//                 className="rounded-xl bg-[#6477E8] px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-[#6477E8]/20 transition hover:bg-[#5367D5]"
//               >
//                 Register
//               </Link>
//             </div>
//           ) : (
//             /* Profile Dropdown */
//             <div className="relative">

//               {/* Profile Button */}
//               <button
//                 type="button"
//                 onClick={() => setIsProfileOpen(!isProfileOpen)}
//                 aria-expanded={isProfileOpen}
//                 aria-label="Open profile menu"
//                 className="flex items-center gap-2 rounded-xl border border-[#E5E8F0] px-2 py-1.5 transition hover:bg-[#F7F8FC] dark:border-[#343B59] dark:hover:bg-[#292E50]"
//               >
//                 {user.image ? (
//                   <img
//                     src={user.image}
//                     alt={user.name || "Profile"}
//                     className="h-9 w-9 rounded-full border-2 border-[#E9EAFE] object-cover"
//                   />
//                 ) : (
//                   <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E9EAFE] text-[#5265D5] dark:bg-[#292E50] dark:text-[#C5CBFF]">
//                     <UserRound size={19} />
//                   </div>
//                 )}

//                 <ChevronDown
//                   size={16}
//                   className={`text-[#9299AC] transition-transform ${
//                     isProfileOpen ? "rotate-180" : ""
//                   }`}
//                 />
//               </button>

//               {/* Dropdown Content */}
//               {isProfileOpen && (
//                 <div className="absolute right-0 top-full mt-3 w-64 overflow-hidden rounded-2xl border border-[#E5E8F0] bg-white shadow-xl dark:border-[#343B59] dark:bg-[#1D2340]">

//                   {/* Section 1: User Information */}
//                   <div className="border-b border-[#E5E8F0] px-4 py-3 dark:border-[#343B59]">
//                     <p className="truncate text-sm font-semibold text-[#252B42] dark:text-white">
//                       {user.name}
//                     </p>
//                     <p className="mt-1 truncate text-xs text-[#737B91]">
//                       {user.email}
//                     </p>
//                   </div>

//                   {/* Section 2: Account Links */}
//                   <div className="border-b border-[#E5E8F0] p-2 dark:border-[#343B59]">
//                     {accountLinks.map((link) => {
//                       const Icon = link.icon;

//                       return (
//                         <Link
//                           key={link.href}
//                           href={link.href}
//                           onClick={() => setIsProfileOpen(false)}
//                           className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-[#252B42] transition hover:bg-[#F0EDFF] hover:text-[#6477E8] dark:text-[#C1C6D8] dark:hover:bg-[#292E50]"
//                         >
//                           <Icon size={17} className="text-[#6477E8]" />
//                           {link.name}
//                         </Link>
//                       );
//                     })}
//                   </div>

//                   {/* Section 3: Logout */}
//                   <div className="p-2">
//                     <button
//                       type="button"
//                       onClick={handleLogout}
//                       disabled={isLoggingOut}
//                       className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-500 transition hover:bg-red-50 disabled:opacity-60 dark:hover:bg-red-950/30"
//                     >
//                       <LogOut size={17} />
//                       {isLoggingOut ? "Logging out..." : "Logout"}
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>

//         {/* Mobile Actions */}
//         <div className="flex items-center gap-2 md:hidden">
//           <button
//             type="button"
//             onClick={toggleTheme}
//             aria-label="Toggle theme"
//             className="rounded-xl border border-[#E5E8F0] p-2.5 text-[#626B83] dark:border-[#343B59] dark:text-[#C1C6D8]"
//           >
//             {isDark ? <Sun size={19} /> : <Moon size={19} />}
//           </button>

//           <button
//             type="button"
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//             aria-label="Toggle navigation menu"
//             aria-expanded={isMenuOpen}
//             className="rounded-xl border border-[#E5E8F0] p-2.5 text-[#252B42] dark:border-[#343B59] dark:text-white"
//           >
//             {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
//           </button>
//         </div>
//       </nav>

//       {/* Mobile Navigation */}
//       {isMenuOpen && (
//         <div className="border-t border-[#E5E8F0] bg-white px-4 py-5 dark:border-[#343B59] dark:bg-[#14182B] md:hidden">
//           <div className="mx-auto flex max-w-7xl flex-col gap-2">

//             {navLinks.map((link) => (
//               <Link
//                 key={link.href}
//                 href={link.href}
//                 onClick={() => setIsMenuOpen(false)}
//                 className={linkStyle(link.href)}
//               >
//                 {link.name}
//               </Link>
//             ))}

//             {isPending ? (
//               <div className="mt-3 h-10 animate-pulse rounded-xl bg-[#E9EAFE] dark:bg-[#292E50]" />
//             ) : !isLoggedIn ? (
//               <div className="mt-3 grid grid-cols-2 gap-3">
//                 <Link
//                   href="/login"
//                   onClick={() => setIsMenuOpen(false)}
//                   className="rounded-xl border border-[#6477E8] px-4 py-3 text-center text-sm font-semibold text-[#6477E8]"
//                 >
//                   Login
//                 </Link>

//                 <Link
//                   href="/register"
//                   onClick={() => setIsMenuOpen(false)}
//                   className="rounded-xl bg-[#6477E8] px-4 py-3 text-center text-sm font-semibold text-white"
//                 >
//                   Register
//                 </Link>
//               </div>
//             ) : (
//               <>
//                 {/* Mobile User Information */}
//                 <div className="mt-3 flex items-center gap-3 rounded-xl bg-[#F7F8FC] p-3 dark:bg-[#1D2340]">
//                   {user.image ? (
//                     <img
//                       src={user.image}
//                     //   height={300}
//                     //   width={400}
//                       alt={user.name || "Profile"}
//                       className="h-11 w-11 rounded-full object-cover"
//                     />
//                   ) : (
//                     <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#E9EAFE] text-[#5265D5]">
//                       <UserRound size={21} />
//                     </div>
//                   )}

//                   <div className="min-w-0">
//                     <p className="truncate text-sm font-semibold text-[#252B42] dark:text-white">
//                       {user.name}
//                     </p>
//                     <p className="truncate text-xs text-[#737B91]">
//                       {user.email}
//                     </p>
//                   </div>
//                 </div>

//                 {/* Mobile Account Links */}
//                 {accountLinks.map((link) => {
//                   const Icon = link.icon;

//                   return (
//                     <Link
//                       key={link.href}
//                       href={link.href}
//                       onClick={() => setIsMenuOpen(false)}
//                       className={linkStyle(link.href)}
//                     >
//                       <span className="flex items-center gap-3">
//                         <Icon size={17} />
//                         {link.name}
//                       </span>
//                     </Link>
//                   );
//                 })}

//                 {/* Mobile Logout */}
//                 <button
//                   type="button"
//                   onClick={handleLogout}
//                   disabled={isLoggingOut}
//                   className="flex items-center gap-3 rounded-lg px-3 py-3 text-left text-sm font-medium text-red-500 hover:bg-red-50 disabled:opacity-60 dark:hover:bg-red-950/30"
//                 >
//                   <LogOut size={17} />
//                   {isLoggingOut ? "Logging out..." : "Logout"}
//                 </button>
//               </>
//             )}
//           </div>
//         </div>
//       )}
//     </header>
//   );
// }

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
  ChevronDown,
  UserRound,
  CalendarDays,
  PlusCircle,
  Settings,
  LogOut,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";

const accountLinks = [
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
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [currentDate, setCurrentDate] = useState("");

  // Navigation links
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Upcoming Events", href: "/upcoming-events" },
  ];

  // Initialize theme and current date
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    const darkMode =
      savedTheme === "dark" ||
      (!savedTheme &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);

    setIsDark(darkMode);
    document.documentElement.classList.toggle("dark", darkMode);

    setCurrentDate(
      new Date().toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    );
  }, []);

  // Theme toggle
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

      setIsProfileOpen(false);
      setIsMenuOpen(false);

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

  // Navigation link styles
  const linkStyle = (href: string) =>
    `rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
      isActive(href)
        ? "bg-[#E9EAFE] text-[#5265D5] dark:bg-[#292E50] dark:text-[#C5CBFF]"
        : "text-[#626B83] hover:bg-[#F0EDFF] hover:text-[#6477E8] dark:text-[#C1C6D8] dark:hover:bg-[#292E50]"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-[#E5E8F0] bg-white/90 backdrop-blur-xl dark:border-[#343B59] dark:bg-[#14182B]/90">
      <nav className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Brand */}
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

          {/* Current Date */}
          {currentDate && (
            <div className="ml-3 flex items-center gap-2 rounded-lg border border-[#E5E8F0] bg-[#F7F8FC] px-3 py-2 text-xs font-medium text-[#737B91] dark:border-[#343B59] dark:bg-[#1D2340]">
              <CalendarDays size={15} className="text-[#6477E8]" />
              {currentDate}
            </div>
          )}
        </div>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 md:flex">

          {/* Theme Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="rounded-xl border border-[#E5E8F0] p-2.5 text-[#626B83] transition hover:bg-[#F0EDFF] hover:text-[#6477E8] dark:border-[#343B59] dark:text-[#C1C6D8] dark:hover:bg-[#292E50]"
          >
            {isDark ? <Sun size={19} /> : <Moon size={19} />}
          </button>

          {isPending ? (
            <div className="h-10 w-24 animate-pulse rounded-xl bg-[#E9EAFE] dark:bg-[#292E50]" />
          ) : !isLoggedIn ? (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="rounded-xl px-5 py-2.5 text-sm font-semibold text-[#6477E8] transition hover:bg-[#E9EAFE] dark:hover:bg-[#292E50]"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="rounded-xl bg-[#6477E8] px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-[#6477E8]/20 transition hover:bg-[#5367D5]"
              >
                Register
              </Link>
            </div>
          ) : (
            /* Profile Dropdown */
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
                <div className="absolute right-0 top-full mt-3 w-64 overflow-hidden rounded-2xl border border-[#E5E8F0] bg-white shadow-xl dark:border-[#343B59] dark:bg-[#1D2340]">

                  {/* User Information */}
                  <div className="border-b border-[#E5E8F0] px-4 py-3 dark:border-[#343B59]">
                    <p className="truncate text-sm font-semibold text-[#252B42] dark:text-white">
                      {user.name}
                    </p>

                    <p className="mt-1 truncate text-xs text-[#737B91]">
                      {user.email}
                    </p>
                  </div>

                  {/* Account Links */}
                  <div className="border-b border-[#E5E8F0] p-2 dark:border-[#343B59]">
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

                  {/* Logout */}
                  <div className="p-2">
                    <button
                      type="button"
                      onClick={handleLogout}
                      disabled={isLoggingOut}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-500 transition hover:bg-red-50 disabled:opacity-60 dark:hover:bg-red-950/30"
                    >
                      <LogOut size={17} />
                      {isLoggingOut ? "Logging out..." : "Logout"}
                    </button>
                  </div>
                </div>
              )}
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
            {isDark ? <Sun size={19} /> : <Moon size={19} />}
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

            {/* Navigation Links */}
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

            {/* Mobile Date */}
            {currentDate && (
              <div className="mt-2 flex items-center gap-2 rounded-xl bg-[#F7F8FC] px-3 py-3 text-sm text-[#737B91] dark:bg-[#1D2340]">
                <CalendarDays size={17} className="text-[#6477E8]" />
                {currentDate}
              </div>
            )}

            {isPending ? (
              <div className="mt-3 h-10 animate-pulse rounded-xl bg-[#E9EAFE] dark:bg-[#292E50]" />
            ) : !isLoggedIn ? (
              <div className="mt-3 grid grid-cols-2 gap-3">
                <Link
                  href="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-xl border border-[#6477E8] px-4 py-3 text-center text-sm font-semibold text-[#6477E8]"
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-xl bg-[#6477E8] px-4 py-3 text-center text-sm font-semibold text-white"
                >
                  Register
                </Link>
              </div>
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
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#E9EAFE] text-[#5265D5]">
                      <UserRound size={21} />
                    </div>
                  )}

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-[#252B42] dark:text-white">
                      {user.name}
                    </p>

                    <p className="truncate text-xs text-[#737B91]">
                      {user.email}
                    </p>
                  </div>
                </div>

                {/* Mobile Account Links */}
                {accountLinks.map((link) => {
                  const Icon = link.icon;

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={linkStyle(link.href)}
                    >
                      <span className="flex items-center gap-3">
                        <Icon size={17} />
                        {link.name}
                      </span>
                    </Link>
                  );
                })}

                {/* Mobile Logout */}
                <button
                  type="button"
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="flex items-center gap-3 rounded-lg px-3 py-3 text-left text-sm font-medium text-red-500 hover:bg-red-50 disabled:opacity-60 dark:hover:bg-red-950/30"
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


import Link from "next/link";
import {
  HeartHandshake,
  Mail,
  MapPin,
  ArrowUpRight,
  Share2,
  Camera,
  Users,
} from "lucide-react";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Upcoming Events", href: "/upcoming-events" },
  { label: "Login", href: "/login" },
  { label: "Register", href: "/register" },
];

const communityLinks = [
  { label: "Explore Events", href: "/upcoming-events" },
  { label: "Create Event", href: "/create-event" },
  { label: "Manage Events", href: "/manage-events" },
  { label: "Joined Events", href: "/joined-events" },
];

const socialLinks = [
  { label: "Facebook", icon: Share2, href: "#" },
  { label: "Instagram", icon: Camera, href: "#" },
  { label: "LinkedIn", icon: Users, href: "#" },
];

export default function Footer() {
  return (
    <footer className="border-t border-[#E5E8F0] bg-white text-[#252B42] transition-colors duration-300 dark:border-[#343B59] dark:bg-[#14182B] dark:text-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8">

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">

          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#6477E8] text-white shadow-md shadow-[#6477E8]/20">
                <HeartHandshake size={23} />
              </span>

              <span className="text-xl font-bold tracking-tight text-[#252B42] dark:text-white">
                Good<span className="text-[#6477E8]">Gather</span>
              </span>
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-7 text-[#737B91] dark:text-[#AAB1C8]">
              Bringing people together through meaningful community events.
              Join us and make a positive difference in society.
            </p>

            {/* Social Links */}
            <div className="mt-5 flex items-center gap-3">
              {socialLinks.map(({ label, icon: Icon, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  title={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E5E8F0] bg-[#F7F8FC] text-[#6477E8] transition-all hover:border-[#6477E8] hover:bg-[#6477E8] hover:text-white dark:border-[#343B59] dark:bg-[#1D2340] dark:text-[#AAB1FF] dark:hover:bg-[#6477E8] dark:hover:text-white"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-5 text-base font-semibold text-[#252B42] dark:text-white">
              Quick Links
            </h3>

            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#737B91] transition-colors hover:text-[#6477E8] dark:text-[#AAB1C8] dark:hover:text-[#AAB1FF]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="mb-5 text-base font-semibold text-[#252B42] dark:text-white">
              Community
            </h3>

            <ul className="space-y-3">
              {communityLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#737B91] transition-colors hover:text-[#6477E8] dark:text-[#AAB1C8] dark:hover:text-[#AAB1FF]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-5 text-base font-semibold text-[#252B42] dark:text-white">
              Get in Touch
            </h3>

            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail
                  size={18}
                  className="mt-0.5 shrink-0 text-[#6477E8]"
                />
                <span className="break-all text-sm text-[#737B91] dark:text-[#AAB1C8]">
                  hello@example.com
                </span>
              </li>

              <li className="flex items-start gap-3">
                <MapPin
                  size={18}
                  className="mt-0.5 shrink-0 text-[#6477E8]"
                />
                <span className="text-sm leading-6 text-[#737B91] dark:text-[#AAB1C8]">
                  Building stronger communities, one event at a time.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-[#E5E8F0] pt-6 text-center transition-colors sm:flex-row sm:text-left dark:border-[#343B59]">
          <p className="text-xs leading-5 text-[#737B91] dark:text-[#AAB1C8] sm:text-sm">
            © {new Date().getFullYear()} GoodGather. All rights reserved.
          </p>

          <Link
            href="/upcoming-events"
            className="inline-flex items-center gap-1 text-sm font-medium text-[#6477E8] transition-colors hover:text-[#5367D5] dark:text-[#AAB1FF] dark:hover:text-white"
          >
            Explore Events
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </footer>
  );
}

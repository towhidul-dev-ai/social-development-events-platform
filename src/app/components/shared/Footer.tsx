
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
  { label: "Upcoming Events", href: "/events" },
  { label: "Login", href: "/login" },
  { label: "Register", href: "/register" },
];

const communityLinks = [
  { label: "Explore Events", href: "/events" },
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
    <footer className="border-t border-border bg-card text-card-foreground">
      <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
        {/* Main footer content */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">

          {/* Brand section */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <HeartHandshake size={23} />
              </span>

              <span className="text-xl font-bold tracking-tight">
                Social<span className="text-primary">Connect</span>
              </span>
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-7 text-muted-foreground">
              Bringing people together through meaningful community events.
              Join us and make a positive difference in society.
            </p>

            {/* Social links */}
            <div className="mt-5 flex items-center gap-3">
              {socialLinks.map(({ label, icon: Icon, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  title={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-muted-foreground transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="mb-5 text-base font-semibold">Quick Links</h3>

            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community links */}
          <div>
            <h3 className="mb-5 text-base font-semibold">Community</h3>

            <ul className="space-y-3">
              {communityLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact section */}
          <div>
            <h3 className="mb-5 text-base font-semibold">Get in Touch</h3>

            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail
                  size={18}
                  className="mt-0.5 shrink-0 text-primary"
                />
                <span className="break-all text-sm text-muted-foreground">
                  hello@example.com
                </span>
              </li>

              <li className="flex items-start gap-3">
                <MapPin
                  size={18}
                  className="mt-0.5 shrink-0 text-primary"
                />
                <span className="text-sm leading-6 text-muted-foreground">
                  Building stronger communities, one event at a time.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom footer */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 text-center sm:flex-row sm:text-left">
          <p className="text-xs leading-5 text-muted-foreground sm:text-sm">
            © {new Date().getFullYear()} SocialConnect. All rights reserved.
          </p>

          <Link
            href="/events"
            className="inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:opacity-80"
          >
            Explore Events
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </footer>
  );
}

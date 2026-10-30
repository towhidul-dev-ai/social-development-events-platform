
import Link from "next/link";
import {
  Mail,
  Send,
  HeartHandshake,
  ArrowRight,
} from "lucide-react";

export default function NewsletterSection() {
  return (
    <section className="bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-3xl bg-[#E9EAFE] px-6 py-12 sm:px-10 sm:py-16 lg:px-16">

          {/* Decorative Background Elements */}
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#6477E8]/10 blur-3xl" />
          <div className="absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-white/60 blur-3xl" />

          <div className="relative mx-auto max-w-3xl text-center">

            {/* Badge */}
            <span className="inline-flex items-center gap-2 rounded-full border border-[#6477E8]/20 bg-white/70 px-4 py-2 text-sm font-medium text-[#4F5FC4]">
              <Mail size={16} />
              Stay Connected
            </span>

            {/* Heading */}
            <h2 className="mt-6 text-3xl font-bold leading-tight tracking-tight text-[#252B42] sm:text-4xl lg:text-5xl">
              Be Part of Something
              <span className="block text-[#6477E8]">
                Meaningful.
              </span>
            </h2>

            {/* Description */}
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#737B91] sm:text-base sm:leading-8">
              Stay updated with upcoming community events, volunteering
              opportunities, and inspiring stories. Together, we can
              create a positive impact.
            </p>

            {/* Newsletter Form Design */}
            <div className="mx-auto mt-9 flex max-w-xl flex-col gap-3 rounded-2xl border border-[#E5E8F0] bg-white p-3 shadow-lg shadow-[#6477E8]/5 sm:flex-row sm:items-center">
              <div className="flex min-w-0 flex-1 items-center gap-3 px-3">
                <Mail className="shrink-0 text-[#6477E8]" size={20} />

                <input
                  type="email"
                  placeholder="Enter your email address"
                  aria-label="Email address"
                //   disabled
                  className="h-11 w-full min-w-0 bg-transparent text-sm text-[#252B42] outline-none placeholder:text-[#A5ABC0] disabled:cursor-not-allowed"
                />
              </div>

              <button
                type="button"
                // disabled
                className="inline-flex min-h-12 shrink-0 cursor-not-allowed items-center justify-center gap-2 rounded-xl bg-[#6477E8] px-6 py-3 text-sm font-semibold text-white opacity-70"
              >
                Coming Soon
                <Send size={17} />
              </button>
            </div>

            {/* Supporting Text */}
            <p className="mt-4 text-xs text-[#737B91] sm:text-sm">
              Newsletter subscriptions will be available soon.
            </p>

            {/* Bottom CTA */}
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <span className="inline-flex items-center gap-2 text-sm font-medium text-[#4F5FC4]">
                <HeartHandshake size={18} />
                Make a difference with us
              </span>

              <span className="hidden text-[#A5ABC0] sm:inline">•</span>

              <Link
                href="/events"
                className="inline-flex items-center gap-1 text-sm font-semibold text-[#6477E8] transition-colors hover:text-[#5367D5]"
              >
                Explore Events
                <ArrowRight size={16} />
              </Link>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

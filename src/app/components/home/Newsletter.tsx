
import { Mail, ArrowRight, Heart, Sparkles } from "lucide-react";

export default function Newsletter() {
  return (
    <section className="bg-[#F7F8FC] px-4 py-20 dark:bg-[#14182B] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="relative overflow-hidden rounded-3xl border border-[#E5E8F0] bg-white shadow-sm dark:border-[#343B59] dark:bg-[#1D2340]">
          {/* Decorative background */}
          <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-[#E9EAFE] opacity-70 blur-3xl dark:bg-[#6477E8]/20" />
          <div className="absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-[#E9EAFE] opacity-70 blur-3xl dark:bg-[#6477E8]/20" />

          <div className="relative grid items-center gap-10 px-6 py-12 sm:px-10 md:grid-cols-[1fr_auto] md:px-14 md:py-16">
            {/* Content */}
            <div className="max-w-xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#E5E8F0] bg-[#F7F8FC] px-3 py-1.5 text-xs font-semibold tracking-wide text-[#6477E8] dark:border-[#343B59] dark:bg-[#292E50] dark:text-[#AAB5FF]">
                <Sparkles size={14} />
                STAY CONNECTED
              </div>

              <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-[#252B42] dark:text-white sm:text-4xl">
                Good things happen
                <span className="block text-[#6477E8]">
                  when we stay connected.
                </span>
              </h2>

              <p className="mt-5 max-w-lg text-sm leading-7 text-[#737B91] dark:text-gray-400 sm:text-base">
                Be part of a community that cares. Discover upcoming
                volunteering opportunities, local initiatives, and inspiring
                stories from people making a difference.
              </p>

              {/* Benefits */}
              <div className="mt-6 flex flex-wrap gap-x-5 gap-y-3 text-sm text-[#737B91] dark:text-gray-300">
                <span className="flex items-center gap-2">
                  <Heart size={16} className="text-[#6477E8]" />
                  Meaningful causes
                </span>
                <span className="flex items-center gap-2">
                  <Mail size={16} className="text-[#6477E8]" />
                  Community updates
                </span>
              </div>
            </div>

            {/* Newsletter Card */}
            <div className="w-full rounded-2xl border border-[#E5E8F0] bg-[#F7F8FC]/90 p-5 dark:border-[#343B59] dark:bg-[#292E50]/80 sm:p-6 md:w-[320px]">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#E9EAFE] text-[#6477E8] dark:bg-[#6477E8]/20 dark:text-[#AAB5FF]">
                <Mail size={23} />
              </div>

              <h3 className="text-lg font-bold text-[#252B42] dark:text-white">
                Get the latest updates
              </h3>

              <p className="mt-2 text-sm leading-6 text-[#737B91] dark:text-gray-400">
                Stay informed about events and opportunities near you.
              </p>

              <form className="mt-5 space-y-3">
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>

                <input
                  id="newsletter-email"
                  type="email"
                  placeholder="Enter your email address"
                  className="h-12 w-full rounded-xl border border-[#E5E8F0] bg-white px-4 text-sm text-[#252B42] outline-none transition placeholder:text-[#A0A6B5] focus:border-[#6477E8] focus:ring-2 focus:ring-[#6477E8]/20 dark:border-[#343B59] dark:bg-[#1D2340] dark:text-white"
                />

                <button
                  type="button"
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#6477E8] px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#5367D5] hover:shadow-md"
                >
                  Subscribe
                  <ArrowRight size={17} />
                </button>
              </form>

              <p className="mt-4 text-center text-xs leading-5 text-[#737B91] dark:text-gray-400">
                Stay inspired. Unsubscribe whenever you like.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

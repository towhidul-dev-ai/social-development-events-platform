
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  HeartHandshake,
  Users,
  CalendarCheck,
  HandHeart,
  MapPin,
} from "lucide-react";

const communityStats = [
  {
    number: "1,200+",
    label: "Community Members",
    icon: Users,
  },
  {
    number: "85+",
    label: "Events Organized",
    icon: CalendarCheck,
  },
  {
    number: "3,500+",
    label: "Volunteer Hours",
    icon: HandHeart,
  },
  {
    number: "25+",
    label: "Communities Reached",
    icon: MapPin,
  },
];

export default function HeroSection() {
  return (
    <section className="overflow-hidden bg-[#F7F8FC]">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">

        {/* Main Hero Layout */}
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">

          {/* Left Content */}
          <div className="flex flex-col items-start">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#6477E8]/20 bg-[#E9EAFE] px-4 py-2">
              <HeartHandshake size={17} className="text-[#6477E8]" />
              <span className="text-sm font-medium text-[#4F5FC4]">
                Together, We Can Make a Difference
              </span>
            </div>

            <h1 className="max-w-xl text-4xl font-bold leading-tight tracking-tight text-[#252B42] sm:text-5xl lg:text-6xl">
              Small Actions,
              <span className="block text-[#6477E8]">
                Big Changes.
              </span>
            </h1>

            <p className="mt-6 max-w-lg text-base leading-7 text-[#737B91] sm:text-lg sm:leading-8">
              Discover meaningful community events, connect with
              passionate people, and take part in creating a better
              world. Every action matters, and your journey starts here.
            </p>

            {/* Action Buttons */}
            <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <Link
                href="/upcoming-events"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#6477E8] px-6 py-3 text-sm font-semibold text-white shadow-md shadow-[#6477E8]/20 transition-all hover:-translate-y-0.5 hover:bg-[#5367D5]"
              >
                Explore Upcoming Events
                <ArrowRight size={18} />
              </Link>

              <Link
                href="/create-event"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-[#6477E8]/25 bg-white px-6 py-3 text-sm font-semibold text-[#4F5FC4] transition-colors hover:border-[#6477E8] hover:bg-[#E9EAFE]"
              >
                <CalendarDays size={18} />
                Create an Event
              </Link>
            </div>

            <p className="mt-5 text-sm text-[#737B91]">
              Be part of something meaningful. Start making a difference today.
            </p>
          </div>

          {/* Right Image */}
          <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
            <div className="absolute -right-5 -top-5 h-32 w-32 rounded-full bg-[#6477E8]/15 blur-2xl sm:h-48 sm:w-48" />

            <div className="absolute -bottom-5 -left-5 h-32 w-32 rounded-full bg-[#E9EAFE] blur-2xl sm:h-48 sm:w-48" />

            <div className="relative overflow-hidden rounded-3xl border border-[#E5E8F0] bg-white p-2 shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1200&q=85"
                alt="Volunteers working together in a community service activity"
                className="h-[280px] w-full rounded-2xl object-cover sm:h-[380px] lg:h-[460px]"
              />
            </div>

            {/* Floating Message */}
            <div className="absolute -bottom-5 left-3 flex items-center gap-3 rounded-2xl border border-[#E5E8F0] bg-white p-3 shadow-lg sm:bottom-6 sm:-left-6 sm:p-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#E9EAFE] text-[#6477E8]">
                <HeartHandshake size={23} />
              </div>

              <div>
                <p className="text-sm font-semibold text-[#252B42]">
                  Make an Impact
                </p>
                <p className="text-xs text-[#737B91]">
                  One event at a time
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Full-Width Community Statistics */}
        <div className="mt-16 border-t border-[#E5E8F0] pt-10 lg:mt-20">
          <div className="mb-6 text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-[#6477E8]">
              Our Community Impact
            </p>
            <h2 className="mt-2 text-xl font-bold text-[#252B42] sm:text-2xl">
              Making a Difference Together
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-5">
            {communityStats.map((stat) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.label}
                  className="flex flex-col items-center justify-center rounded-2xl border border-[#E5E8F0] bg-white px-3 py-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#6477E8]/30 hover:shadow-md sm:py-7"
                >
                  <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-[#E9EAFE] text-[#6477E8]">
                    <Icon size={21} />
                  </div>

                  <h3 className="text-2xl font-extrabold tracking-tight text-[#6477E8] sm:text-3xl">
                    {stat.number}
                  </h3>

                  <p className="mt-2 text-xs font-medium text-[#737B91] sm:text-sm">
                    {stat.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}

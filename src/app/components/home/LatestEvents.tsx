
import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  CalendarDays,
  ArrowRight,
  Users,
} from "lucide-react";

const events = [
  {
    id: 1,
    title: "Community Cleaning Campaign",
    category: "Environment",
    location: "Chattogram, Bangladesh",
    date: "November 15, 2026",
    image:
      "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&q=85",
    participants: "25+",
  },
  {
    id: 2,
    title: "Tree Plantation Program",
    category: "Plantation",
    location: "Dhaka, Bangladesh",
    date: "November 20, 2026",
    image:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=85",
    participants: "40+",
  },
  {
    id: 3,
    title: "Food Donation Drive",
    category: "Donation",
    location: "Sylhet, Bangladesh",
    date: "November 25, 2026",
    image:
      "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&q=85",
    participants: "30+",
  },
];

export default function LatestEvents() {
  return (
    <section className="bg-[#F7F8FC] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#6477E8]/20 bg-[#E9EAFE] px-4 py-2 text-sm font-medium text-[#4F5FC4]">
              <CalendarDays size={16} />
              Make a Difference
            </span>

            <h2 className="mt-5 text-3xl font-bold tracking-tight text-[#252B42] sm:text-4xl lg:text-5xl">
              Latest Upcoming
              <span className="text-[#6477E8]"> Events</span>
            </h2>

            <p className="mt-4 text-base leading-7 text-[#737B91]">
              Explore upcoming community activities and find an
              opportunity to contribute to something meaningful.
            </p>
          </div>

          <Link
            href="/events"
            className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-[#6477E8] transition-colors hover:text-[#5367D5]"
          >
            View All Events
            <ArrowRight size={17} />
          </Link>
        </div>

        {/* Event Cards */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3">

          {events.map((event) => (
            <article
              key={event.id}
              className="group overflow-hidden rounded-2xl border border-[#E5E8F0] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#6477E8]/10"
            >
              {/* Event Image */}
              <div className="relative h-52 overflow-hidden sm:h-56">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <span className="absolute left-4 top-4 rounded-full bg-[#E9EAFE] px-3 py-1.5 text-xs font-semibold text-[#4F5FC4]">
                  {event.category}
                </span>
              </div>

              {/* Event Information */}
              <div className="p-5 sm:p-6">
                <h3 className="text-lg font-semibold text-[#252B42] transition-colors group-hover:text-[#6477E8] sm:text-xl">
                  {event.title}
                </h3>

                <div className="mt-5 space-y-3">
                  <div className="flex items-center gap-3 text-sm text-[#737B91]">
                    <CalendarDays size={17} className="shrink-0 text-[#6477E8]" />
                    <span>{event.date}</span>
                  </div>

                  <div className="flex items-center gap-3 text-sm text-[#737B91]">
                    <MapPin size={17} className="shrink-0 text-[#6477E8]" />
                    <span>{event.location}</span>
                  </div>

                  <div className="flex items-center gap-3 text-sm text-[#737B91]">
                    <Users size={17} className="shrink-0 text-[#6477E8]" />
                    <span>{event.participants} interested participants</span>
                  </div>
                </div>

                <Link
                  href="/events"
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#6477E8]/25 bg-[#E9EAFE] px-4 py-3 text-sm font-semibold text-[#4F5FC4] transition-all hover:bg-[#6477E8] hover:text-white"
                >
                  Explore Event
                  <ArrowRight size={16} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

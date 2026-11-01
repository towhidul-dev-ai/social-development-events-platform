
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  CalendarDays,
  MapPin,
  ArrowRight,
  UserRound,
  Tag,
  HeartHandshake,
  AlertCircle,
} from "lucide-react";

const API_URL =
  process.env.API_URL || "http://localhost:8000";

interface Event {
  _id: string;
  title: string;
  description: string;
  eventType: string;
  thumbnail: string;
  location: string;
  eventDate: string;
  creatorName?: string;
}

interface EventsResponse {
  success: boolean;
  events?: Event[];
  message?: string;
}

const categoryColors: Record<string, string> = {
  "Food Drive": "bg-[#E9EAFE] text-[#6477E8]",
  Donation: "bg-pink-50 text-pink-600",
  Cleanup: "bg-teal-50 text-teal-600",
  Plantation: "bg-green-50 text-green-600",
  "Health Camp": "bg-indigo-50 text-indigo-600",
  Education: "bg-blue-50 text-blue-600",
  Environment: "bg-emerald-50 text-emerald-600",
  Community: "bg-violet-50 text-violet-600",
};

function formatDate(dateString: string) {
  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return "Date unavailable";
  }

  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function RecentUpcomingEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUpcomingEvents = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${API_URL}/api/events/upcoming`,
          { cache: "no-store" }
        );

        const result: EventsResponse = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(
            result.message || "Failed to load upcoming events."
          );
        }

        const sortedEvents = [...(result.events || [])]
          .filter((event) => {
            const date = new Date(event.eventDate);
            return !Number.isNaN(date.getTime());
          })
          .sort(
            (a, b) =>
              new Date(a.eventDate).getTime() -
              new Date(b.eventDate).getTime()
          );

        // Homepage only: show nearest 6 events.
        setEvents(sortedEvents.slice(0, 6));
      } catch (err) {
        console.error("Upcoming events error:", err);

        setError(
          err instanceof Error
            ? err.message
            : "Something went wrong."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUpcomingEvents();
  }, []);

  return (
    <section className="bg-[#F7F8FC] px-4 py-14 dark:bg-[#14182B] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#6477E8]">
              <HeartHandshake size={18} />
              Community Participation
            </div>

            <h2 className="text-2xl font-extrabold tracking-tight text-[#252B42] dark:text-white sm:text-3xl">
              Recent Upcoming Events
            </h2>

            <p className="mt-2 text-sm text-[#737B91] dark:text-[#C1C6D8]">
              Discover the latest community events and become part
              of something meaningful.
            </p>
          </div>

          <Link
            href="/upcoming-events"
            className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-[#6477E8] transition hover:bg-[#E9EAFE] dark:hover:bg-[#292E50]"
          >
            View All Events
            <ArrowRight size={17} />
          </Link>
        </div>

        {/* Loading */}
        {loading && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="overflow-hidden rounded-2xl border border-[#E5E8F0] bg-white shadow-sm dark:border-[#343B59] dark:bg-[#1D2340]"
              >
                <div className="h-52 animate-pulse bg-[#E9EAFE] dark:bg-[#292E50]" />

                <div className="space-y-3 p-5">
                  <div className="h-5 w-3/4 animate-pulse rounded-lg bg-[#E9EAFE] dark:bg-[#292E50]" />
                  <div className="h-4 w-full animate-pulse rounded-lg bg-[#E9EAFE] dark:bg-[#292E50]" />
                  <div className="h-4 w-1/2 animate-pulse rounded-lg bg-[#E9EAFE] dark:bg-[#292E50]" />
                  <div className="h-10 w-full animate-pulse rounded-xl bg-[#E9EAFE] dark:bg-[#292E50]" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center dark:border-red-900 dark:bg-red-950/30">
            <AlertCircle size={30} className="mx-auto text-red-500" />

            <p className="mt-3 text-sm text-red-600 dark:text-red-400">
              {error}
            </p>
          </div>
        )}

        {/* Empty */}
        {!loading && !error && events.length === 0 && (
          <div className="rounded-2xl border border-dashed border-[#D7DAE8] bg-white px-5 py-16 text-center dark:border-[#343B59] dark:bg-[#1D2340]">
            <CalendarDays size={42} className="mx-auto text-[#6477E8]" />

            <h3 className="mt-4 text-lg font-bold text-[#252B42] dark:text-white">
              No Upcoming Events
            </h3>

            <p className="mt-2 text-sm text-[#737B91] dark:text-[#C1C6D8]">
              New community events will appear here when available.
            </p>
          </div>
        )}

        {/* Event Cards */}
        {!loading && !error && events.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <article
                key={event._id}
                className="group overflow-hidden rounded-2xl border border-[#E5E8F0] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-[#343B59] dark:bg-[#1D2340]"
              >
                {/* Thumbnail */}
                <div className="relative h-52 overflow-hidden bg-[#E9EAFE] dark:bg-[#292E50]">
                  {event.thumbnail ? (
                    <img
                      src={event.thumbnail}
                      alt={event.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-[#6477E8]">
                      <HeartHandshake size={48} />
                    </div>
                  )}

                  {/* Category */}
                  <span
                    className={`absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold shadow-sm ${
                      categoryColors[event.eventType] ||
                      "bg-[#E9EAFE] text-[#6477E8]"
                    }`}
                  >
                    <Tag size={12} />
                    {event.eventType}
                  </span>

                  {/* Date */}
                  <div className="absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-lg bg-[#252B42]/90 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
                    <CalendarDays
                      size={14}
                      className="text-[#AAB5FF]"
                    />
                    {formatDate(event.eventDate)}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="line-clamp-1 text-lg font-bold text-[#252B42] transition group-hover:text-[#6477E8] dark:text-white">
                    {event.title}
                  </h3>

                  <div className="mt-3 flex items-center gap-2 text-sm text-[#737B91] dark:text-[#C1C6D8]">
                    <MapPin
                      size={16}
                      className="shrink-0 text-[#6477E8]"
                    />
                    <span className="truncate">{event.location}</span>
                  </div>

                  <p className="mt-3 line-clamp-2 min-h-10 text-sm leading-5 text-[#737B91] dark:text-[#C1C6D8]">
                    {event.description}
                  </p>

                  {/* Organizer */}
                  <div className="mt-5 flex items-center gap-2 border-t border-[#E5E8F0] pt-4 text-sm text-[#737B91] dark:border-[#343B59] dark:text-[#C1C6D8]">
                    <UserRound
                      size={16}
                      className="shrink-0 text-[#6477E8]"
                    />
                    <span className="truncate">
                      {event.creatorName || "Community Organizer"}
                    </span>
                  </div>

                  {/* Details */}
                  <Link
                    href={`/upcoming-event-details/${event._id}`}
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#6477E8] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#5367D5]"
                  >
                    View Event
                    <ArrowRight size={17} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

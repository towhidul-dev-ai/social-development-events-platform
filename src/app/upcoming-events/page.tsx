
"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

type Event = {
  _id: string;
  title: string;
  description: string;
  eventType: string;
  thumbnail: string;
  location: string;
  eventDate: string;
  creatorId?: string;
  creatorName?: string;
  creatorEmail?: string;
  creatorImage?: string;
};

const categories = [
  "All",
  "Donation",
  "Cleanup",
  "Plantation",
  "Winter Relief",
  "Food Drive",
  "Health Camp",
  "Education",
  "Environment",
  "Community",
  "Health",
  "Social Welfare",
  "Other",
];

export default function UpcomingEventsPage() {
  const { data: session } = authClient.useSession();

  const [events, setEvents] = useState<Event[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch all upcoming events
  const fetchUpcomingEvents = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${API_URL}/api/events/upcoming`,
        {
          cache: "no-store",
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Failed to load upcoming events."
        );
      }

      setEvents(result.events || []);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  // Load events when page opens
  useEffect(() => {
    fetchUpcomingEvents();
  }, [fetchUpcomingEvents]);

  // Filter events by category and search
  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesCategory =
        selectedCategory === "All" ||
        event.eventType?.toLowerCase() ===
          selectedCategory.toLowerCase();

      const searchText = search.toLowerCase().trim();

      const matchesSearch =
        !searchText ||
        event.title?.toLowerCase().includes(searchText) ||
        event.location?.toLowerCase().includes(searchText) ||
        event.description?.toLowerCase().includes(searchText) ||
        event.eventType?.toLowerCase().includes(searchText) ||
        event.creatorName?.toLowerCase().includes(searchText);

      return matchesCategory && matchesSearch;
    });
  }, [events, selectedCategory, search]);

  // Format event date
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <main className="min-h-screen bg-[#F7F8FC] px-4 py-10 dark:bg-[#14182B]">
      <div className="mx-auto max-w-7xl">

        {/* Page Heading */}
        <section className="mb-8 border-b border-[#E5E8F0] pb-7 dark:border-[#343B59]">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-[#E9EAFE] px-3 py-1.5 text-xs font-semibold text-[#4F5FC4]">
                <span>📅</span>
                Future Community Drives
              </span>

              <h1 className="mt-4 text-3xl font-bold text-[#252B42] sm:text-4xl dark:text-white">
                Upcoming Events
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-6 text-[#737B91]">
                Discover community initiatives scheduled for upcoming
                dates. Explore events created by our community and
                find opportunities to make a difference.
              </p>
            </div>

            {session?.user && (
              <Link
                href="/create-event"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#6477E8] px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-[#5367D5]"
              >
                <span>＋</span>
                Create Event
              </Link>
            )}
          </div>
        </section>

        {/* Filters and Search */}
        <section className="mb-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-center">

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                  selectedCategory === category
                    ? "border-[#6477E8] bg-[#6477E8] text-white"
                    : "border-[#E5E8F0] bg-white text-[#737B91] hover:border-[#6477E8] hover:text-[#6477E8] dark:border-[#343B59] dark:bg-[#1D2340] dark:text-gray-300"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full lg:max-w-xs">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#737B91]">
              🔍
            </span>

            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search events or areas..."
              className="w-full rounded-xl border border-[#E5E8F0] bg-white py-3 pl-11 pr-4 text-sm text-[#252B42] outline-none transition focus:border-[#6477E8] dark:border-[#343B59] dark:bg-[#1D2340] dark:text-white"
            />
          </div>
        </section>

        {/* Event Count */}
        {!loading && !error && (
          <div className="mb-5 flex items-center justify-between">
            <p className="text-sm font-medium text-[#737B91]">
              Showing {filteredEvents.length} of {events.length} upcoming events
            </p>

            <button
              type="button"
              onClick={fetchUpcomingEvents}
              className="text-sm font-semibold text-[#6477E8] hover:underline"
            >
              ↻ Refresh
            </button>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="overflow-hidden rounded-2xl border border-[#E5E8F0] bg-white dark:border-[#343B59] dark:bg-[#1D2340]"
              >
                <div className="h-52 animate-pulse bg-[#E9EAFE] dark:bg-[#252B43]" />
                <div className="space-y-4 p-5">
                  <div className="h-4 w-24 animate-pulse rounded bg-[#E9EAFE] dark:bg-[#252B43]" />
                  <div className="h-5 w-3/4 animate-pulse rounded bg-[#E9EAFE] dark:bg-[#252B43]" />
                  <div className="h-4 w-full animate-pulse rounded bg-[#E9EAFE] dark:bg-[#252B43]" />
                  <div className="h-10 animate-pulse rounded-xl bg-[#E9EAFE] dark:bg-[#252B43]" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
            <p className="font-medium text-red-600">{error}</p>

            <button
              type="button"
              onClick={fetchUpcomingEvents}
              className="mt-5 rounded-xl bg-[#6477E8] px-6 py-3 font-semibold text-white hover:bg-[#5367D5]"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredEvents.length === 0 && (
          <div className="rounded-2xl border border-[#E5E8F0] bg-white px-6 py-20 text-center dark:border-[#343B59] dark:bg-[#1D2340]">
            <div className="text-5xl">📅</div>

            <h2 className="mt-5 text-xl font-bold text-[#252B42] dark:text-white">
              No Events Found
            </h2>

            <p className="mt-2 text-sm text-[#737B91]">
              {search || selectedCategory !== "All"
                ? "Try changing your search or category filter."
                : "There are no upcoming events at the moment."}
            </p>

            {(search || selectedCategory !== "All") && (
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setSelectedCategory("All");
                }}
                className="mt-5 rounded-xl bg-[#6477E8] px-5 py-2.5 font-semibold text-white hover:bg-[#5367D5]"
              >
                Clear Filters
              </button>
            )}

            {!search && selectedCategory === "All" && session?.user && (
              <Link
                href="/create-event"
                className="mt-5 inline-block rounded-xl bg-[#6477E8] px-5 py-3 font-semibold text-white hover:bg-[#5367D5]"
              >
                Create an Event
              </Link>
            )}
          </div>
        )}

        {/* Events Grid */}
        {!loading && !error && filteredEvents.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredEvents.map((event) => (
              <article
                key={event._id}
                className="group overflow-hidden rounded-2xl border border-[#E5E8F0] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-[#343B59] dark:bg-[#1D2340]"
              >
                {/* Thumbnail */}
                <div className="relative h-52 overflow-hidden bg-[#E9EAFE]">
                  {event.thumbnail ? (
                    <img
                      src={event.thumbnail}
                      alt={event.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-4xl">
                      🌱
                    </div>
                  )}

                  {/* Category Badge */}
                  <span className="absolute left-4 top-4 rounded-full border border-white/60 bg-white/90 px-3 py-1 text-xs font-semibold text-[#4F5FC4] shadow-sm backdrop-blur">
                    {event.eventType}
                  </span>

                  {/* Event Date */}
                  <span className="absolute bottom-4 left-4 rounded-lg bg-[#14182B]/85 px-3 py-2 text-xs font-semibold text-white">
                    📅 {formatDate(event.eventDate)}
                  </span>
                </div>

                {/* Event Information */}
                <div className="flex flex-col p-5">
                  <h2 className="line-clamp-1 text-lg font-bold text-[#252B42] transition group-hover:text-[#6477E8] dark:text-white">
                    {event.title}
                  </h2>

                  {/* Location */}
                  <p className="mt-2 flex items-center gap-2 text-sm text-[#737B91]">
                    <span>📍</span>
                    <span className="line-clamp-1">{event.location}</span>
                  </p>

                  {/* Description */}
                  <p className="mt-3 min-h-[60px] line-clamp-3 text-sm leading-5 text-[#737B91]">
                    {event.description}
                  </p>

                  {/* Organizer */}
                  <div className="mt-4 flex items-center gap-2 border-t border-[#E5E8F0] pt-4 dark:border-[#343B59]">
                    {event.creatorImage ? (
                      <img
                        src={event.creatorImage}
                        alt={event.creatorName || "Organizer"}
                        className="h-7 w-7 rounded-full object-cover"
                      />
                    ) : (
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#E9EAFE] text-xs font-bold text-[#6477E8]">
                        {(event.creatorName || "O")
                          .charAt(0)
                          .toUpperCase()}
                      </div>
                    )}

                    <span className="line-clamp-1 text-xs text-[#737B91]">
                      {event.creatorName || "Community Organizer"}
                    </span>
                  </div>

                  {/* View Event */}
                  <Link
                    href={`/events/${event._id}`}
                    className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#6477E8] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#5367D5]"
                  >
                    View Event
                    <span>→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

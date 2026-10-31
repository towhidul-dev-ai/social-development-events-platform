
"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  CalendarDays,
  MapPin,
  ArrowRight,
  Users,
  HeartHandshake,
  Loader2,
  AlertCircle,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

interface Event {
  _id: string;
  title: string;
  description: string;
  eventType: string;
  thumbnail: string;
  location: string;
  eventDate: string;
  creatorName?: string;
  creatorImage?: string;
  joinedAt?: string;
}

export default function JoinedEventsPage() {
  const { data: session, isPending: sessionLoading } =
    authClient.useSession();

  const user = session?.user;

  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch joined events
  const fetchJoinedEvents = useCallback(async () => {
    if (!user?.email) {
      setEvents([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${API_URL}/api/joined-events?email=${encodeURIComponent(
          user.email
        )}`,
        {
          cache: "no-store",
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Failed to load joined events."
        );
      }

      setEvents(data.events || []);
    } catch (error) {
      console.error("Joined events error:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  }, [user?.email]);

  useEffect(() => {
    if (!sessionLoading) {
      fetchJoinedEvents();
    }
  }, [sessionLoading, fetchJoinedEvents]);

  // Loading state
  if (sessionLoading || loading) {
    return (
      <main className="min-h-screen bg-[#F7F8FC] px-4 py-12 dark:bg-[#14182B]">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 h-8 w-56 animate-pulse rounded-lg bg-[#E9EAFE] dark:bg-[#292E50]" />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="overflow-hidden rounded-2xl bg-white shadow-sm dark:bg-[#1D2340]"
              >
                <div className="h-48 animate-pulse bg-[#E9EAFE] dark:bg-[#292E50]" />

                <div className="space-y-3 p-5">
                  <div className="h-5 w-3/4 animate-pulse rounded bg-[#E9EAFE] dark:bg-[#292E50]" />
                  <div className="h-4 w-full animate-pulse rounded bg-[#E9EAFE] dark:bg-[#292E50]" />
                  <div className="h-4 w-1/2 animate-pulse rounded bg-[#E9EAFE] dark:bg-[#292E50]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    );
  }

  // Login required
  if (!user) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-[#F7F8FC] px-4 dark:bg-[#14182B]">
        <div className="w-full max-w-md rounded-2xl border border-[#E5E8F0] bg-white p-8 text-center shadow-sm dark:border-[#343B59] dark:bg-[#1D2340]">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#E9EAFE] text-[#6477E8] dark:bg-[#292E50]">
            <HeartHandshake size={30} />
          </div>

          <h1 className="mt-5 text-xl font-bold text-[#252B42] dark:text-white">
            Login Required
          </h1>

          <p className="mt-2 text-sm leading-6 text-[#737B91] dark:text-[#C1C6D8]">
            Please log in to see the events you have joined.
          </p>

          <Link
            href="/login"
            className="mt-6 inline-flex items-center justify-center rounded-xl bg-[#6477E8] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#5367D5]"
          >
            Login to Continue
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F7F8FC] px-4 py-10 dark:bg-[#14182B] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Page Header */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-sm font-semibold text-[#6477E8]">
                <HeartHandshake size={18} />
                Community Participation
              </div>

              <h1 className="mt-2 text-2xl font-bold text-[#252B42] dark:text-white sm:text-3xl">
                Joined Events
              </h1>

              <p className="mt-2 text-sm text-[#737B91] dark:text-[#C1C6D8]">
                Keep track of the social initiatives you are participating in.
              </p>
            </div>

            <Link
              href="/upcoming-events"
              className="inline-flex items-center gap-2 rounded-xl bg-[#6477E8] px-5 py-3 text-sm font-semibold text-white shadow-md shadow-[#6477E8]/20 transition hover:bg-[#5367D5]"
            >
              Explore Events
              <ArrowRight size={17} />
            </Link>
          </div>

          {/* Statistics */}
          <div className="mt-7 flex items-center gap-4 rounded-2xl border border-[#E5E8F0] bg-white p-5 dark:border-[#343B59] dark:bg-[#1D2340]">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#E9EAFE] text-[#6477E8] dark:bg-[#292E50]">
              <Users size={23} />
            </div>

            <div>
              <p className="text-2xl font-bold text-[#252B42] dark:text-white">
                {events.length}
              </p>

              <p className="text-xs font-medium text-[#737B91]">
                Total Joined Events
              </p>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600 dark:border-red-900 dark:bg-red-950/30 dark:text-red-400">
            <AlertCircle size={19} />
            {error}
          </div>
        )}

        {/* Empty State */}
        {!error && events.length === 0 && (
          <div className="rounded-2xl border border-dashed border-[#D7DAE8] bg-white px-5 py-16 text-center dark:border-[#343B59] dark:bg-[#1D2340]">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#E9EAFE] text-[#6477E8] dark:bg-[#292E50]">
              <HeartHandshake size={30} />
            </div>

            <h2 className="mt-5 text-xl font-bold text-[#252B42] dark:text-white">
              No Joined Events Yet
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#737B91] dark:text-[#C1C6D8]">
              You haven't joined any social initiatives yet. Explore upcoming
              events and become part of your community.
            </p>

            <Link
              href="/upcoming-events"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#6477E8] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#5367D5]"
            >
              Explore Upcoming Events
              <ArrowRight size={17} />
            </Link>
          </div>
        )}

        {/* Event Cards */}
        {events.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <article
                key={event._id}
                className="group overflow-hidden rounded-2xl border border-[#E5E8F0] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-[#343B59] dark:bg-[#1D2340]"
              >
                {/* Thumbnail */}
                <div className="relative h-48 overflow-hidden bg-[#E9EAFE] dark:bg-[#292E50]">
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

                  <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-[#5265D5] shadow-sm">
                    {event.eventType}
                  </span>

                  <span className="absolute right-4 top-4 rounded-full bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm">
                    Joined
                  </span>
                </div>

                {/* Card Content */}
                <div className="p-5">
                  <h2 className="line-clamp-1 text-lg font-bold text-[#252B42] dark:text-white">
                    {event.title}
                  </h2>

                  <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-5 text-[#737B91] dark:text-[#C1C6D8]">
                    {event.description}
                  </p>

                  <div className="mt-4 space-y-3 border-t border-[#E5E8F0] pt-4 dark:border-[#343B59]">
                    <div className="flex items-center gap-2 text-sm text-[#737B91] dark:text-[#C1C6D8]">
                      <CalendarDays
                        size={16}
                        className="shrink-0 text-[#6477E8]"
                      />

                      {new Date(event.eventDate).toLocaleDateString(
                        "en-US",
                        {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        }
                      )}
                    </div>

                    <div className="flex items-center gap-2 text-sm text-[#737B91] dark:text-[#C1C6D8]">
                      <MapPin
                        size={16}
                        className="shrink-0 text-[#6477E8]"
                      />

                      <span className="truncate">{event.location}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-[#737B91] dark:text-[#C1C6D8]">
                      <Users
                        size={16}
                        className="shrink-0 text-[#6477E8]"
                      />

                      Organizer: {event.creatorName || "Community Organizer"}
                    </div>
                  </div>

                  {/* Joined Date */}
                  {event.joinedAt && (
                    <p className="mt-4 text-xs text-[#9299AC]">
                      Joined on{" "}
                      {new Date(event.joinedAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  )}

                  {/* Details Link */}
                  <Link
                    href={`/upcoming-event-details/${event._id}`}
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-[#6477E8] px-4 py-3 text-sm font-semibold text-[#6477E8] transition hover:bg-[#6477E8] hover:text-white"
                  >
                    View Event Details
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Refresh */}
        {events.length > 0 && (
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={fetchJoinedEvents}
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-xl border border-[#E5E8F0] bg-white px-5 py-3 text-sm font-semibold text-[#6477E8] transition hover:bg-[#E9EAFE] disabled:opacity-60 dark:border-[#343B59] dark:bg-[#1D2340] dark:hover:bg-[#292E50]"
            >
              {loading ? (
                <Loader2 size={17} className="animate-spin" />
              ) : (
                <CalendarDays size={17} />
              )}
              Refresh Events
            </button>
          </div>
        )}
      </div>
    </main>
  );
}

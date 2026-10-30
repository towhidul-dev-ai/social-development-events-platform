
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

type Event = {
  _id: string;
  title: string;
  eventType: string;
  eventDate: string;
  location: string;
  thumbnail: string;
  description: string;
  createdAt?: string;
};

export default function ManageEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`${API_URL}/api/events`);

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "Failed to load events.");
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
    };

    fetchEvents();
  }, []);

  return (
    <main className="min-h-screen bg-[#F7F8FC] px-4 py-12 dark:bg-[#14182B]">
      <div className="mx-auto max-w-7xl">

        {/* Page Header */}
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-bold text-[#252B42] dark:text-white">
              Manage Events
            </h1>

            <p className="mt-2 text-[#737B91]">
              View all events created on the platform.
            </p>
          </div>

          <Link
            href="/create-event"
            className="inline-flex items-center justify-center rounded-xl bg-[#6477E8] px-5 py-3 font-semibold text-white transition hover:bg-[#5367D5]"
          >
            + Create New Event
          </Link>
        </div>

        {/* Loading */}
        {loading && (
          <div className="py-20 text-center">
            <p className="text-[#737B91]">Loading events...</p>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="rounded-xl bg-red-50 p-5 text-center text-red-600">
            {error}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && events.length === 0 && (
          <div className="rounded-2xl border border-[#E5E8F0] bg-white px-6 py-16 text-center dark:border-[#343B59] dark:bg-[#1D2340]">
            <h2 className="text-xl font-semibold text-[#252B42] dark:text-white">
              No Events Found
            </h2>

            <p className="mt-2 text-[#737B91]">
              You haven't created any events yet.
            </p>

            <Link
              href="/create-event"
              className="mt-6 inline-block rounded-xl bg-[#6477E8] px-6 py-3 font-medium text-white hover:bg-[#5367D5]"
            >
              Create Your First Event
            </Link>
          </div>
        )}

        {/* Events */}
        {!loading && !error && events.length > 0 && (
          <>
            <div className="mb-6">
              <p className="font-medium text-[#737B91]">
                Total Events: {events.length}
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {events.map((event) => (
                <article
                  key={event._id}
                  className="overflow-hidden rounded-2xl border border-[#E5E8F0] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-[#343B59] dark:bg-[#1D2340]"
                >
                  <img
                    src={event.thumbnail}
                    alt={event.title}
                    className="h-52 w-full object-cover"
                  />

                  <div className="p-5">
                    <span className="inline-block rounded-full bg-[#E9EAFE] px-3 py-1 text-xs font-semibold text-[#4F5FC4]">
                      {event.eventType}
                    </span>

                    <h2 className="mt-4 text-xl font-bold text-[#252B42] dark:text-white">
                      {event.title}
                    </h2>

                    <div className="mt-3 space-y-2 text-sm text-[#737B91]">
                      <p>
                        <span className="font-medium">Location:</span>{" "}
                        {event.location}
                      </p>

                      <p>
                        <span className="font-medium">Date:</span>{" "}
                        {new Date(event.eventDate).toLocaleDateString()}
                      </p>
                    </div>

                    <p className="mt-4 line-clamp-3 text-sm leading-6 text-[#737B91]">
                      {event.description}
                    </p>
                    <div className="mt-5">
  <Link
    href={`/events/${event._id}`}
    className="inline-flex w-full items-center justify-center rounded-xl bg-[#6477E8] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#5367D5]"
  >
    View Details
  </Link>
</div>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}

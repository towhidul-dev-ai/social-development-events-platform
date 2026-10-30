
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

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
  creatorName?: string;
  creatorEmail?: string;
  createdAt?: string;
};

export default function EventDetailsPage() {
  const params = useParams();
  const id = params.id as string;

  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    const fetchEvent = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`${API_URL}/api/events/${id}`);

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "Failed to load event.");
        }

        setEvent(result.event);
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

    fetchEvent();
  }, [id]);

  // Loading State
  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F7F8FC] dark:bg-[#14182B]">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-[#E9EAFE] border-t-[#6477E8]" />
          <p className="mt-4 text-[#737B91]">Loading event details...</p>
        </div>
      </main>
    );
  }

  // Error State
  if (error || !event) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F7F8FC] px-4 dark:bg-[#14182B]">
        <div className="w-full max-w-md rounded-2xl border border-[#E5E8F0] bg-white p-8 text-center dark:border-[#343B59] dark:bg-[#1D2340]">
          <h1 className="text-2xl font-bold text-[#252B42] dark:text-white">
            Event Not Found
          </h1>

          <p className="mt-3 text-[#737B91]">
            {error || "The event you are looking for does not exist."}
          </p>

          <Link
            href="/manage-events"
            className="mt-6 inline-block rounded-xl bg-[#6477E8] px-6 py-3 font-semibold text-white transition hover:bg-[#5367D5]"
          >
            Back to Manage Events
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F7F8FC] px-4 py-10 dark:bg-[#14182B] sm:py-14">
      <div className="mx-auto max-w-5xl">

        {/* Back Button */}
        <Link
          href="/manage-events"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-[#737B91] transition hover:text-[#6477E8]"
        >
          ← Back to Manage Events
        </Link>

        {/* Event Card */}
        <article className="overflow-hidden rounded-3xl border border-[#E5E8F0] bg-white shadow-sm dark:border-[#343B59] dark:bg-[#1D2340]">

          {/* Event Image */}
          <div className="relative h-64 sm:h-80 md:h-[420px]">
            {event.thumbnail ? (
              <img
                src={event.thumbnail}
                alt={event.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-[#E9EAFE] text-[#6477E8]">
                No Event Image
              </div>
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
              <span className="inline-block rounded-full bg-white px-4 py-2 text-xs font-semibold text-[#4F5FC4]">
                {event.eventType}
              </span>

              <h1 className="mt-4 text-3xl font-bold text-white sm:text-4xl md:text-5xl">
                {event.title}
              </h1>

              <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/90">
                <p>
                  📍 {event.location}
                </p>

                <p>
                  📅{" "}
                  {new Date(event.eventDate).toLocaleDateString(
                    "en-US",
                    {
                      weekday: "short",
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    }
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Event Content */}
          <div className="grid gap-8 p-6 sm:p-10 md:grid-cols-[1fr_280px]">

            {/* Description */}
            <section>
              <h2 className="text-xl font-bold text-[#252B42] dark:text-white">
                About This Social Initiative
              </h2>

              <p className="mt-4 whitespace-pre-wrap text-sm leading-7 text-[#737B91]">
                {event.description}
              </p>

              <div className="mt-8 border-t border-[#E5E8F0] pt-6 dark:border-[#343B59]">
                <h3 className="font-semibold text-[#252B42] dark:text-white">
                  Event Information
                </h3>

                <div className="mt-4 space-y-4 text-sm">
                  <div className="flex justify-between gap-4">
                    <span className="text-[#737B91]">Event Type</span>
                    <span className="font-medium text-[#252B42] dark:text-white">
                      {event.eventType}
                    </span>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span className="text-[#737B91]">Location</span>
                    <span className="text-right font-medium text-[#252B42] dark:text-white">
                      {event.location}
                    </span>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span className="text-[#737B91]">Event Date</span>
                    <span className="text-right font-medium text-[#252B42] dark:text-white">
                      {new Date(event.eventDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* Organizer Information */}
            <aside>
              <div className="rounded-2xl border border-[#E5E8F0] bg-[#F7F8FC] p-6 dark:border-[#343B59] dark:bg-[#14182B]">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#737B91]">
                  Initiative Organizer
                </p>

                <div className="mt-5 flex items-center gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#E9EAFE] text-xl text-[#6477E8]">
                    👤
                  </div>

                  <div className="min-w-0">
                    <p className="font-semibold text-[#252B42] dark:text-white">
                      {event.creatorName || "Event Organizer"}
                    </p>

                    <p className="break-all text-xs text-[#737B91]">
                      {event.creatorEmail || "Organizer information unavailable"}
                    </p>
                  </div>
                </div>

                <div className="mt-6 border-t border-[#E5E8F0] pt-4 dark:border-[#343B59]">
                  <p className="text-xs text-[#737B91]">
                    ✓ Community Event
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </article>
      </div>
    </main>
  );
}

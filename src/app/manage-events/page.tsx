
"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import EditEventDialog from "../components/events/EditEventDialog";
import DeleteEventDialog from "../components/events/DeleteEventDialog";

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

  // Edit modal states
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [editOpen, setEditOpen] = useState(false);

  // Delete modal states
  const [selectedDeleteEvent, setSelectedDeleteEvent] =
    useState<Event | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);

  // Fetch events
  const fetchEvents = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API_URL}/api/events`);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to load events.");
      }

      setEvents(result.events || []);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  // Load events when page opens
  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  // Open edit modal
  const handleEdit = (eventId: string) => {
    setSelectedEventId(eventId);
    setEditOpen(true);
  };

  // Close edit modal
  const handleCloseEdit = () => {
    setEditOpen(false);
    setSelectedEventId(null);
  };

  // Open delete confirmation modal
  const handleDelete = (event: Event) => {
    setSelectedDeleteEvent(event);
    setDeleteOpen(true);
  };

  // Close delete modal
  const handleCloseDelete = () => {
    setDeleteOpen(false);
    setSelectedDeleteEvent(null);
  };

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
              View, edit, and manage your events.
            </p>
          </div>

          <Link
            href="/create-event"
            className="inline-flex items-center justify-center rounded-xl bg-[#6477E8] px-5 py-3 font-semibold text-white transition hover:bg-[#5367D5]"
          >
            + Create New Event
          </Link>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="py-20 text-center">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-[#E9EAFE] border-t-[#6477E8]" />

            <p className="mt-4 text-[#737B91]">
              Loading events...
            </p>
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-center text-red-600">
            <p>{error}</p>

            <button
              onClick={fetchEvents}
              className="mt-4 rounded-lg bg-[#6477E8] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#5367D5]"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && events.length === 0 && (
          <div className="rounded-2xl border border-[#E5E8F0] bg-white px-6 py-16 text-center dark:border-[#343B59] dark:bg-[#1D2340]">
            <div className="text-5xl">📅</div>

            <h2 className="mt-5 text-xl font-semibold text-[#252B42] dark:text-white">
              No Events Found
            </h2>

            <p className="mt-2 text-[#737B91]">
              You haven&apos;t created any events yet.
            </p>

            <Link
              href="/create-event"
              className="mt-6 inline-block rounded-xl bg-[#6477E8] px-6 py-3 font-medium text-white transition hover:bg-[#5367D5]"
            >
              Create Your First Event
            </Link>
          </div>
        )}

        {/* Events Grid */}
        {!loading && !error && events.length > 0 && (
          <>
            <div className="mb-6 flex items-center justify-between">
              <p className="font-medium text-[#737B91]">
                Total Events: {events.length}
              </p>

              <button
                onClick={fetchEvents}
                className="rounded-lg border border-[#E5E8F0] bg-white px-4 py-2 text-sm font-medium text-[#6477E8] transition hover:bg-[#E9EAFE] dark:border-[#343B59] dark:bg-[#1D2340]"
              >
                ↻ Refresh
              </button>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {events.map((event) => (
                <article
                  key={event._id}
                  className="overflow-hidden rounded-2xl border border-[#E5E8F0] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-[#343B59] dark:bg-[#1D2340]"
                >
                  {/* Event Image */}
                  <div className="h-52 overflow-hidden bg-[#E9EAFE]">
                    {event.thumbnail ? (
                      <img
                        src={event.thumbnail}
                        alt={event.title}
                        className="h-full w-full object-cover transition duration-300 hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-[#6477E8]">
                        No Image Available
                      </div>
                    )}
                  </div>

                  {/* Event Information */}
                  <div className="p-5">
                    <span className="inline-block rounded-full bg-[#E9EAFE] px-3 py-1 text-xs font-semibold text-[#4F5FC4]">
                      {event.eventType}
                    </span>

                    <h2 className="mt-4 line-clamp-1 text-xl font-bold text-[#252B42] dark:text-white">
                      {event.title}
                    </h2>

                    {/* Location and Date */}
                    <div className="mt-3 space-y-2 text-sm text-[#737B91]">
                      <p>
                        <span className="font-medium">Location:</span>{" "}
                        {event.location}
                      </p>

                      <p>
                        <span className="font-medium">Date:</span>{" "}
                        {new Date(event.eventDate).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          }
                        )}
                      </p>
                    </div>

                    {/* Description */}
                    <p className="mt-4 line-clamp-3 text-sm leading-6 text-[#737B91]">
                      {event.description}
                    </p>

                    {/* Action Buttons */}
                    <div className="mt-5 grid grid-cols-2 gap-3">

                      {/* View Details */}
                      <Link
                        href={`/events/${event._id}`}
                        className="col-span-2 inline-flex items-center justify-center rounded-xl bg-[#6477E8] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#5367D5]"
                      >
                        View Details
                      </Link>

                      {/* Edit */}
                      <button
                        type="button"
                        onClick={() => handleEdit(event._id)}
                        className="inline-flex items-center justify-center rounded-xl border border-[#6477E8] px-4 py-3 text-sm font-semibold text-[#6477E8] transition hover:bg-[#E9EAFE]"
                      >
                        ✏️ Edit
                      </button>

                      {/* Delete */}
                      <button
                        type="button"
                        onClick={() => handleDelete(event)}
                        className="inline-flex items-center justify-center rounded-xl border border-red-200 px-4 py-3 text-sm font-semibold text-red-500 transition hover:bg-red-50"
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Edit Event Modal */}
      {selectedEventId && (
        <EditEventDialog
          eventId={selectedEventId}
          open={editOpen}
          onClose={handleCloseEdit}
          onUpdated={fetchEvents}
        />
      )}

      {/* Delete Event Modal */}
      {selectedDeleteEvent && (
        <DeleteEventDialog
          eventId={selectedDeleteEvent._id}
          eventTitle={selectedDeleteEvent.title}
          open={deleteOpen}
          onClose={handleCloseDelete}
          onDeleted={fetchEvents}
        />
      )}
    </main>
  );
}

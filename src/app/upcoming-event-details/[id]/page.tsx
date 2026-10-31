"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  MapPin,
  Users,
  Share2,
  CheckCircle2,
  Loader2,
  HeartHandshake,
  ShieldCheck,
  Clock,
  X,
  Sparkles,
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
  creatorId?: string;
  creatorName?: string;
  creatorEmail?: string;
  creatorImage?: string;
}

interface Volunteer {
  name: string;
  image?: string;
}

interface JoinStatusResponse {
  success: boolean;
  isJoined: boolean;
  volunteerCount: number;
  volunteers: Volunteer[];
  message?: string;
}

type ToastType = "success" | "error" | "info";

interface Toast {
  message: string;
  type: ToastType;
}

export default function UpcomingEventDetailsPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const id = params.id;

  // Better Auth session
  const { data: session, isPending: sessionLoading } =
    authClient.useSession();

  // Safely access the user
  const user = session?.user;

  // Event states
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Volunteer states
  const [isJoined, setIsJoined] = useState(false);
  const [volunteerCount, setVolunteerCount] = useState(0);
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);

  // Action states
  const [joining, setJoining] = useState(false);
  const [toast, setToast] = useState<Toast | null>(null);

  // Show notification
  const showToast = (
    message: string,
    type: ToastType = "success"
  ) => {
    setToast({ message, type });
  };

  // Automatically hide notification
  useEffect(() => {
    if (!toast) return;

    const timer = setTimeout(() => {
      setToast(null);
    }, 3500);

    return () => clearTimeout(timer);
  }, [toast]);

  // Fetch event details
  const fetchEvent = useCallback(async () => {
    if (!id) return;

    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API_URL}/api/events/${id}`, {
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Event not found.");
      }

      setEvent(data.event);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to load event."
      );
    } finally {
      setLoading(false);
    }
  }, [id]);

  // Fetch volunteer information and join status
  const userEmail = user?.email;

const fetchJoinStatus = useCallback(async () => {
  if (!id) return;

  try {
    const query = userEmail
      ? `?email=${encodeURIComponent(userEmail)}`
      : "";

    const response = await fetch(
      `${API_URL}/api/events/${id}/join-status${query}`,
      {
        cache: "no-store",
      }
    );

    const data: JoinStatusResponse = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(
        data.message || "Failed to fetch volunteer information."
      );
    }

    setIsJoined(data.isJoined ?? false);
    setVolunteerCount(data.volunteerCount ?? 0);
    setVolunteers(data.volunteers ?? []);
  } catch (err) {
    console.error("Failed to fetch join status:", err);
  }
}, [id, userEmail]);

  // Load event details
  useEffect(() => {
    fetchEvent();
  }, [fetchEvent]);

  // Load volunteer information after session loading finishes.
  // This also works when the visitor is not logged in.
  useEffect(() => {
    if (!sessionLoading) {
      fetchJoinStatus();
    }
  }, [sessionLoading, fetchJoinStatus]);

  // Join or leave event
  const handleJoinToggle = async () => {
    if (!user) {
      router.push("/login");
      return;
    }

    if (!event || joining) return;

    const wasJoined = isJoined;

    try {
      setJoining(true);

      const response = await fetch(
        `${API_URL}/api/events/${id}/join`,
        {
          method: wasJoined ? "DELETE" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userEmail: user.email,
            userName: user.name || user.email,
            userImage: user.image || "",
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Unable to update your membership."
        );
      }

      showToast(
        wasJoined
          ? "You have successfully left this event."
          : "You have successfully joined this event.",
        "success"
      );

      // Get the latest volunteer count and membership status
      await fetchJoinStatus();
    } catch (err) {
      showToast(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
        "error"
      );
    } finally {
      setJoining(false);
    }
  };

  // Share event
  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      showToast("Event link copied successfully!", "success");
    } catch {
      showToast("Unable to copy the event link.", "error");
    }
  };

  // Loading screen
  if (loading) {
    return (
      <main className="min-h-screen bg-[#F7F8FC] px-4 py-12 dark:bg-[#14182B]">
        <div className="mx-auto max-w-5xl animate-pulse overflow-hidden rounded-2xl bg-white shadow-sm dark:bg-[#1D2340]">
          <div className="h-72 bg-[#E9EAFE] dark:bg-[#292E50]" />

          <div className="space-y-5 p-8">
            <div className="h-7 w-2/3 rounded bg-[#E9EAFE] dark:bg-[#292E50]" />
            <div className="h-4 w-1/2 rounded bg-[#E9EAFE] dark:bg-[#292E50]" />
            <div className="h-28 rounded bg-[#E9EAFE] dark:bg-[#292E50]" />
          </div>
        </div>
      </main>
    );
  }

  // Error screen
  if (error || !event) {
    return (
      <main className="flex min-h-[70vh] flex-col items-center justify-center bg-[#F7F8FC] px-4 dark:bg-[#14182B]">
        <div className="rounded-2xl bg-white p-8 text-center shadow-sm dark:bg-[#1D2340]">
          <HeartHandshake
            size={42}
            className="mx-auto mb-4 text-[#6477E8]"
          />

          <h2 className="text-xl font-bold text-[#252B42] dark:text-white">
            Event Not Found
          </h2>

          <p className="mt-2 text-sm text-[#737B91]">
            {error || "This event may have been removed."}
          </p>

          <Link
            href="/upcoming-events"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#6477E8] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#5367D5]"
          >
            <ArrowLeft size={16} />
            Back to Events
          </Link>
        </div>
      </main>
    );
  }

  // Format event date
  const eventDate = new Date(event.eventDate);

  const formattedDate = eventDate.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const formattedTime = eventDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <main className="min-h-screen bg-[#F7F8FC] px-4 py-8 dark:bg-[#14182B] sm:px-6">
      {/* Toast notification */}
      {toast && (
        <div
          role="status"
          aria-live="polite"
          className={`fixed right-5 top-5 z-[100] flex w-[calc(100%-40px)] max-w-sm items-start gap-3 rounded-2xl border p-4 shadow-2xl ${
            toast.type === "success"
              ? "border-emerald-200 bg-white text-emerald-800 dark:border-emerald-800 dark:bg-[#1D2340] dark:text-emerald-400"
              : toast.type === "error"
                ? "border-red-200 bg-white text-red-700 dark:border-red-800 dark:bg-[#1D2340] dark:text-red-400"
                : "border-blue-200 bg-white text-blue-700 dark:border-blue-800 dark:bg-[#1D2340] dark:text-blue-400"
          }`}
        >
          <div className="mt-0.5 shrink-0">
            {toast.type === "success" ? (
              <CheckCircle2 size={22} />
            ) : (
              <ShieldCheck size={22} />
            )}
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold">
              {toast.type === "success"
                ? "Success!"
                : toast.type === "error"
                  ? "Something went wrong"
                  : "Notice"}
            </p>

            <p className="mt-1 text-xs leading-5 opacity-80">
              {toast.message}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setToast(null)}
            className="shrink-0 rounded-lg p-1 opacity-50 transition hover:bg-black/5 hover:opacity-100"
            aria-label="Close notification"
          >
            <X size={16} />
          </button>
        </div>
      )}

      <div className="mx-auto max-w-5xl">
        {/* Back button */}
        <Link
          href="/upcoming-events"
          className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-[#737B91] transition hover:text-[#6477E8]"
        >
          <ArrowLeft size={17} />
          Back to Upcoming Events
        </Link>

        {/* Main event card */}
        <div className="overflow-hidden rounded-3xl border border-[#E5E8F0] bg-white shadow-xl shadow-[#252B42]/5 dark:border-[#343B59] dark:bg-[#1D2340]">
          {/* Event cover */}
          <div className="relative h-64 sm:h-80">
            {event.thumbnail ? (
              <img
                src={event.thumbnail}
                alt={event.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-gradient-to-br from-[#6477E8] to-[#9B8BE8]">
                <HeartHandshake
                  size={70}
                  className="text-white/80"
                />
              </div>
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            {/* Event category */}
            <span className="absolute left-6 top-6 inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-xs font-bold text-[#252B42] shadow-lg backdrop-blur">
              <Sparkles size={14} className="text-emerald-600" />
              {event.eventType}
            </span>

            {/* Event title and information */}
            <div className="absolute bottom-0 left-0 w-full p-6 sm:p-8">
              <h1 className="text-2xl font-extrabold text-white sm:text-3xl md:text-4xl">
                {event.title}
              </h1>

              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-3 text-sm text-white/90">
                <span className="flex items-center gap-2">
                  <MapPin size={16} className="text-emerald-400" />
                  {event.location}
                </span>

                <span className="flex items-center gap-2">
                  <CalendarDays
                    size={16}
                    className="text-emerald-400"
                  />
                  {formattedDate}
                </span>

                <span className="flex items-center gap-2">
                  <Clock size={16} className="text-emerald-400" />
                  {formattedTime}
                </span>
              </div>
            </div>
          </div>

          {/* Event content */}
          <div className="grid gap-7 p-5 sm:p-7 lg:grid-cols-[1fr_290px]">
            {/* Left column */}
            <div className="min-w-0">
              {/* Join status section */}
              <div className="flex flex-col gap-4 rounded-2xl border border-[#E5E8F0] bg-gradient-to-r from-[#F7F8FC] to-white p-4 dark:border-[#343B59] dark:from-[#252B43] dark:to-[#1D2340] sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400">
                    <Users size={23} />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-[#252B42] dark:text-white">
                      {volunteerCount}{" "}
                      {volunteerCount === 1
                        ? "Volunteer"
                        : "Volunteers"}{" "}
                      Joined
                    </p>

                    <p className="mt-1 text-xs text-[#737B91] dark:text-[#AEB5CC]">
                      {isJoined
                        ? "You are confirmed for this initiative."
                        : "Be part of this community initiative."}
                    </p>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex items-center gap-2">
                  {/* Share button */}
                  <button
                    type="button"
                    onClick={handleShare}
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#E5E8F0] bg-white text-[#737B91] transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600 dark:border-[#343B59] dark:bg-[#1D2340] dark:hover:bg-[#343B59]"
                    aria-label="Share event"
                    title="Share event"
                  >
                    <Share2 size={19} />
                  </button>

                  {/* Join / Leave button */}
                  <button
                    type="button"
                    onClick={handleJoinToggle}
                    disabled={joining || sessionLoading}
                    className={`flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl px-5 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 sm:flex-none ${
                      isJoined
                        ? "bg-indigo-600 shadow-indigo-500/20 hover:bg-indigo-700"
                        : "bg-gradient-to-r from-emerald-500 to-teal-600 shadow-emerald-500/20 hover:from-emerald-600 hover:to-teal-700"
                    }`}
                  >
                    {joining ? (
                      <Loader2 size={18} className="animate-spin" />
                    ) : (
                      <CheckCircle2 size={18} />
                    )}

                    {joining
                      ? "Please wait..."
                      : isJoined
                        ? "Joined · Leave Event"
                        : user
                          ? "Join Event"
                          : "Login to Join"}
                  </button>
                </div>
              </div>

              {/* About event */}
              <section className="mt-7">
                <h2 className="text-lg font-bold text-[#252B42] dark:text-white">
                  About This Social Initiative
                </h2>

                <p className="mt-3 whitespace-pre-line text-sm leading-7 text-[#737B91] dark:text-[#C1C6D8]">
                  {event.description}
                </p>
              </section>

              {/* Volunteer guidelines */}
              <section className="mt-7 border-t border-[#E5E8F0] pt-6 dark:border-[#343B59]">
                <h3 className="text-sm font-bold uppercase tracking-wide text-[#737B91] dark:text-[#AEB5CC]">
                  Volunteer Guidelines
                </h3>

                <ul className="mt-4 space-y-3 text-sm text-[#737B91] dark:text-[#C1C6D8]">
                  <li className="flex gap-3">
                    <CheckCircle2
                      size={16}
                      className="mt-0.5 shrink-0 text-emerald-500"
                    />
                    Please arrive on time at the designated location.
                  </li>

                  <li className="flex gap-3">
                    <CheckCircle2
                      size={16}
                      className="mt-0.5 shrink-0 text-emerald-500"
                    />
                    Follow the event organizer&apos;s instructions.
                  </li>

                  <li className="flex gap-3">
                    <CheckCircle2
                      size={16}
                      className="mt-0.5 shrink-0 text-emerald-500"
                    />
                    Respect other volunteers and community members.
                  </li>
                </ul>
              </section>
            </div>

            {/* Right column */}
            <aside className="space-y-5">
              {/* Event organizer */}
              <div className="rounded-2xl border border-[#E5E8F0] p-5 dark:border-[#343B59]">
                <h3 className="text-xs font-bold uppercase tracking-wide text-[#737B91] dark:text-[#AEB5CC]">
                  Initiative Organizer
                </h3>

                <div className="mt-4 flex items-center gap-3">
                  {event.creatorImage ? (
                    <img
                      src={event.creatorImage}
                      alt={event.creatorName || "Organizer"}
                      className="h-11 w-11 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#E9EAFE] text-[#6477E8] dark:bg-[#343B59]">
                      <HeartHandshake size={20} />
                    </div>
                  )}

                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-[#252B42] dark:text-white">
                      {event.creatorName || "Community Organizer"}
                    </p>

                    <p className="mt-1 truncate text-xs text-[#737B91]">
                      {event.creatorEmail || "Community Member"}
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex items-center gap-2 border-t border-[#E5E8F0] pt-4 text-xs text-[#737B91] dark:border-[#343B59]">
                  <ShieldCheck
                    size={16}
                    className="text-emerald-500"
                  />
                  Community Organizer
                </div>
              </div>

              {/* Confirmed volunteers */}
              <div className="rounded-2xl border border-[#E5E8F0] p-5 dark:border-[#343B59]">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-xs font-bold uppercase tracking-wide text-[#737B91] dark:text-[#AEB5CC]">
                    Confirmed Volunteers
                  </h3>

                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400">
                    {volunteerCount}
                  </span>
                </div>

                <div className="mt-4 space-y-3">
                  {volunteers.length > 0 ? (
                    volunteers.slice(0, 5).map((volunteer, index) => (
                      <div
                        key={`${volunteer.name}-${index}`}
                        className="flex items-center gap-3"
                      >
                        {volunteer.image ? (
                          <img
                            src={volunteer.image}
                            alt={volunteer.name}
                            className="h-8 w-8 rounded-full object-cover"
                          />
                        ) : (
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E9EAFE] text-xs font-bold text-[#6477E8] dark:bg-[#343B59]">
                            {volunteer.name
                              ?.charAt(0)
                              .toUpperCase() || "V"}
                          </div>
                        )}

                        <p className="truncate text-sm text-[#252B42] dark:text-[#C1C6D8]">
                          {volunteer.name}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-[#737B91]">
                      No volunteers have joined yet.
                    </p>
                  )}
                </div>

                {volunteers.length > 5 && (
                  <p className="mt-4 border-t border-[#E5E8F0] pt-3 text-xs text-[#737B91] dark:border-[#343B59]">
                    And {volunteers.length - 5} more volunteers
                  </p>
                )}
              </div>
            </aside>
          </div>
        </div>
      </div>
    </main>
  );
}
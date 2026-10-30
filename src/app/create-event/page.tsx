
"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  Image as ImageIcon,
  MapPin,
  Tag,
  Type,
  HeartHandshake,
  CheckCircle2,
  AlertCircle,
  Loader2,
  PlusCircle,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";

const eventTypes = [
  "Donation",
  "Cleanup",
  "Plantation",
  "Winter Relief",
  "Food Drive",
  "Health Camp",
  "Education",
];

const imagePresets = [
  {
    label: "Winter Clothes",
    url: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=1200&q=85",
  },
  {
    label: "Blanket Relief",
    url: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=85",
  },
  {
    label: "Cleanup",
    url: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=1200&q=85",
  },
  {
    label: "Tree Plantation",
    url: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=85",
  },
];

type FormMessage = {
  type: "success" | "error";
  text: string;
};

export default function CreateEventPage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [title, setTitle] = useState("");
  const [eventType, setEventType] = useState("Donation");
  const [eventDate, setEventDate] = useState("");
  const [location, setLocation] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [description, setDescription] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<FormMessage | null>(null);

  // Format today's date using the user's local timezone.
  const today = new Date();
  const minDate = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");

  // Redirect users who are not signed in.
  useEffect(() => {
    if (!isPending && !session) {
      router.replace("/login");
    }
  }, [isPending, session, router]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage(null);

    if (!session?.user) {
      setMessage({
        type: "error",
        text: "Please sign in before creating an event.",
      });
      return;
    }

    if (!title.trim() || !location.trim() || !description.trim()) {
      setMessage({
        type: "error",
        text: "Please complete all required fields.",
      });
      return;
    }

    if (!eventDate || eventDate < minDate) {
      setMessage({
        type: "error",
        text: "Please select today or a future date.",
      });
      return;
    }

    try {
      setIsSubmitting(true);

      const apiUrl = process.env.NEXT_PUBLIC_API_URL;

      if (!apiUrl) {
        throw new Error(
          "API URL is not configured. Add NEXT_PUBLIC_API_URL to your frontend .env.local file."
        );
      }

      const response = await fetch(`${apiUrl}/api/events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          title: title.trim(),
          eventType,
          eventDate,
          location: location.trim(),
          thumbnail: thumbnail.trim(),
          description: description.trim(),
          creatorEmail: session.user.email,
        }),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          result?.message || result?.error || "Unable to create the event."
        );
      }

      setMessage({
        type: "success",
        text: "Your event has been published successfully!",
      });

      setTimeout(() => {
        router.push("/events");
        router.refresh();
      }, 1200);
    } catch (error) {
      setMessage({
        type: "error",
        text:
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isPending || !session) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-[#F7F8FC] px-4 dark:bg-[#14182B]">
        <div className="flex items-center gap-3 text-sm text-[#737B91]">
          <Loader2 className="animate-spin text-[#6477E8]" size={20} />
          Loading your account...
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F7F8FC] px-4 py-10 dark:bg-[#14182B] sm:px-6 sm:py-14">
      <div className="mx-auto max-w-3xl">

        {/* Back link */}
        <Link
          href="/events"
          className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-[#737B91] transition hover:text-[#6477E8] dark:text-[#A5ABC0]"
        >
          <ArrowLeft size={17} />
          Back to Upcoming Events
        </Link>

        {/* Form Card */}
        <div className="overflow-hidden rounded-3xl border border-[#E5E8F0] bg-white shadow-sm dark:border-[#343B59] dark:bg-[#1D2340]">
          <div className="p-5 sm:p-8 lg:p-10">

            {/* Heading */}
            <div className="mb-8">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#6477E8]/20 bg-[#E9EAFE] px-3 py-1.5 text-xs font-semibold text-[#4F5FC4] dark:border-[#8998FF]/20 dark:bg-[#292E50] dark:text-[#C5CBFF]">
                <HeartHandshake size={15} />
                Social Service Drive
              </span>

              <h1 className="mt-4 text-2xl font-bold tracking-tight text-[#252B42] dark:text-white sm:text-3xl">
                Create a Community Event
              </h1>

              <p className="mt-2 text-sm leading-6 text-[#737B91] dark:text-[#A5ABC0]">
                Organize a local relief effort, environmental cleanup, or
                community support drive.
              </p>
            </div>

            {/* Status message */}
            {message && (
              <div
                role="status"
                className={`mb-6 flex items-start gap-3 rounded-xl border p-4 text-sm ${
                  message.type === "success"
                    ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-300"
                    : "border-red-200 bg-red-50 text-red-600 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300"
                }`}
              >
                {message.type === "success" ? (
                  <CheckCircle2 size={19} className="mt-0.5 shrink-0" />
                ) : (
                  <AlertCircle size={19} className="mt-0.5 shrink-0" />
                )}
                <span>{message.text}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Event Title */}
              <div>
                <label
                  htmlFor="event-title"
                  className="mb-2 block text-sm font-semibold text-[#252B42] dark:text-white"
                >
                  Event Title <span className="text-red-500">*</span>
                </label>

                <div className="relative">
                  <Type
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9299AC]"
                  />
                  <input
                    id="event-title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Winter Clothes Distribution – Mirpur 10, Dhaka"
                    maxLength={120}
                    required
                    className="h-12 w-full rounded-xl border border-[#E5E8F0] bg-[#F7F8FC] pl-11 pr-4 text-sm text-[#252B42] outline-none transition placeholder:text-[#9299AC] focus:border-[#6477E8] focus:ring-2 focus:ring-[#6477E8]/15 dark:border-[#343B59] dark:bg-[#252B43] dark:text-white"
                  />
                </div>
              </div>

              {/* Event Type and Date */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                {/* Event Type */}
                <div>
                  <label
                    htmlFor="event-type"
                    className="mb-2 block text-sm font-semibold text-[#252B42] dark:text-white"
                  >
                    Event Type <span className="text-red-500">*</span>
                  </label>

                  <div className="relative">
                    <Tag
                      size={17}
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#9299AC]"
                    />
                    <select
                      id="event-type"
                      value={eventType}
                      onChange={(e) => setEventType(e.target.value)}
                      required
                      className="h-12 w-full appearance-none rounded-xl border border-[#E5E8F0] bg-[#F7F8FC] pl-11 pr-4 text-sm text-[#252B42] outline-none transition focus:border-[#6477E8] focus:ring-2 focus:ring-[#6477E8]/15 dark:border-[#343B59] dark:bg-[#252B43] dark:text-white"
                    >
                      {eventTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Event Date */}
                <div>
                  <label
                    htmlFor="event-date"
                    className="mb-2 block text-sm font-semibold text-[#252B42] dark:text-white"
                  >
                    Event Date <span className="text-red-500">*</span>
                  </label>

                  <div className="relative">
                    <CalendarDays
                      size={17}
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#9299AC]"
                    />
                    <input
                      id="event-date"
                      type="date"
                      min={minDate}
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      required
                      className="h-12 w-full rounded-xl border border-[#E5E8F0] bg-[#F7F8FC] pl-11 pr-3 text-sm text-[#252B42] outline-none transition focus:border-[#6477E8] focus:ring-2 focus:ring-[#6477E8]/15 dark:border-[#343B59] dark:bg-[#252B43] dark:text-white"
                    />
                  </div>

                  <p className="mt-2 text-xs text-[#9299AC]">
                    Dates must be today or in the future.
                  </p>
                </div>
              </div>

              {/* Location */}
              <div>
                <label
                  htmlFor="event-location"
                  className="mb-2 block text-sm font-semibold text-[#252B42] dark:text-white"
                >
                  Location / Venue <span className="text-red-500">*</span>
                </label>

                <div className="relative">
                  <MapPin
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9299AC]"
                  />
                  <input
                    id="event-location"
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Mohammadpur Town Hall, Dhaka"
                    maxLength={200}
                    required
                    className="h-12 w-full rounded-xl border border-[#E5E8F0] bg-[#F7F8FC] pl-11 pr-4 text-sm text-[#252B42] outline-none transition placeholder:text-[#9299AC] focus:border-[#6477E8] focus:ring-2 focus:ring-[#6477E8]/15 dark:border-[#343B59] dark:bg-[#252B43] dark:text-white"
                  />
                </div>
              </div>

              {/* Thumbnail URL */}
              <div>
                <label
                  htmlFor="event-thumbnail"
                  className="mb-2 block text-sm font-semibold text-[#252B42] dark:text-white"
                >
                  Thumbnail Image URL <span className="text-red-500">*</span>
                </label>

                <div className="relative">
                  <ImageIcon
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9299AC]"
                  />
                  <input
                    id="event-thumbnail"
                    type="url"
                    value={thumbnail}
                    onChange={(e) => setThumbnail(e.target.value)}
                    placeholder="https://images.unsplash.com/photo-..."
                    required
                    className="h-12 w-full rounded-xl border border-[#E5E8F0] bg-[#F7F8FC] pl-11 pr-4 text-sm text-[#252B42] outline-none transition placeholder:text-[#9299AC] focus:border-[#6477E8] focus:ring-2 focus:ring-[#6477E8]/15 dark:border-[#343B59] dark:bg-[#252B43] dark:text-white"
                  />
                </div>

                {/* Quick presets */}
                <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-2 text-xs">
                  <span className="text-[#9299AC]">Quick photo presets:</span>
                  {imagePresets.map((preset, index) => (
                    <span key={preset.label} className="inline-flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setThumbnail(preset.url)}
                        className="font-medium text-[#6477E8] transition hover:text-[#5367D5] hover:underline dark:text-[#AAB5FF]"
                      >
                        {preset.label}
                      </button>
                      {index !== imagePresets.length - 1 && (
                        <span className="text-[#C4C9D5]">•</span>
                      )}
                    </span>
                  ))}
                </div>

                {/* Image preview */}
                {thumbnail && (
                  <div className="mt-4 overflow-hidden rounded-xl border border-[#E5E8F0] dark:border-[#343B59]">
                    <img
                      src={thumbnail}
                      alt="Event thumbnail preview"
                      className="h-48 w-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Description */}
              <div>
                <label
                  htmlFor="event-description"
                  className="mb-2 block text-sm font-semibold text-[#252B42] dark:text-white"
                >
                  Event Description <span className="text-red-500">*</span>
                </label>

                <textarea
                  id="event-description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Explain the purpose of the drive, volunteers required, items being distributed or tasks to complete..."
                  rows={5}
                  maxLength={2000}
                  required
                  className="w-full resize-y rounded-xl border border-[#E5E8F0] bg-[#F7F8FC] px-4 py-3 text-sm leading-6 text-[#252B42] outline-none transition placeholder:text-[#9299AC] focus:border-[#6477E8] focus:ring-2 focus:ring-[#6477E8]/15 dark:border-[#343B59] dark:bg-[#252B43] dark:text-white"
                />

                <p className="mt-1 text-right text-xs text-[#9299AC]">
                  {description.length}/2000
                </p>
              </div>

              {/* Organizer Email */}
              <div className="flex flex-col gap-2 rounded-xl border border-[#E5E8F0] bg-[#F7F8FC] px-4 py-4 sm:flex-row sm:items-center sm:justify-between dark:border-[#343B59] dark:bg-[#252B43]">
                <span className="text-xs text-[#737B91] dark:text-[#A5ABC0]">
                  Organizer Email attached:
                </span>
                <span className="break-all text-xs font-semibold text-[#252B42] dark:text-white">
                  {session.user.email}
                </span>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#6477E8] px-6 py-3 text-sm font-semibold text-white shadow-md shadow-[#6477E8]/20 transition hover:-translate-y-0.5 hover:bg-[#5367D5] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Publishing Event...
                  </>
                ) : (
                  <>
                    <PlusCircle size={18} />
                    Publish Event
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

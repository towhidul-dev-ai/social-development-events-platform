
"use client";

import { FormEvent, useEffect, useState } from "react";
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
};

type EditEventDialogProps = {
  eventId: string;
  open: boolean;
  onClose: () => void;
  onUpdated: () => void;
};

type FormData = {
  title: string;
  description: string;
  eventType: string;
  thumbnail: string;
  location: string;
  eventDate: string;
};

const initialFormData: FormData = {
  title: "",
  description: "",
  eventType: "",
  thumbnail: "",
  location: "",
  eventDate: "",
};

export default function EditEventDialog({
  eventId,
  open,
  onClose,
  onUpdated,
}: EditEventDialogProps) {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch selected event when modal opens
  useEffect(() => {
    if (!open || !eventId) return;

    const fetchEvent = async () => {
      try {
        setLoading(true);
        setError("");
        setSuccess("");

        const response = await fetch(`${API_URL}/api/events/${eventId}`);
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "Failed to load event.");
        }

        const event: Event = result.event;

        setFormData({
          title: event.title || "",
          description: event.description || "",
          eventType: event.eventType || "",
          thumbnail: event.thumbnail || "",
          location: event.location || "",
          eventDate: event.eventDate
            ? new Date(event.eventDate).toISOString().slice(0, 10)
            : "",
        });
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Something went wrong."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [open, eventId]);

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // Submit updated event
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isPending) {
      setError("Please wait while your session loads.");
      return;
    }

    if (!user?.email) {
      setError("Please log in to update your event.");
      return;
    }

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const response = await fetch(
        `${API_URL}/api/events/${eventId}?email=${encodeURIComponent(
          user.email
        )}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to update event.");
      }

      setSuccess("Event updated successfully!");

      await onUpdated();
      onClose();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to update event."
      );
    } finally {
      setSaving(false);
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 px-4 py-6"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget && !saving) onClose();
      }}
    >
      <div className="my-auto w-full max-w-2xl rounded-2xl bg-white shadow-2xl dark:bg-[#1D2340]">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-[#E5E8F0] px-6 py-5 dark:border-[#343B59]">
          <div>
            <h2 className="text-xl font-bold text-[#252B42] dark:text-white">
              Edit Event
            </h2>
            <p className="mt-1 text-sm text-[#737B91]">
              Update your event information.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            className="rounded-lg px-3 py-2 text-xl text-[#737B91] transition hover:bg-[#E9EAFE] hover:text-[#6477E8] disabled:opacity-50"
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="space-y-5 p-6">
          {loading ? (
            <div className="py-12 text-center text-[#737B91]">
              Loading event information...
            </div>
          ) : (
            <>
              {error && (
                <div className="rounded-xl bg-red-50 p-3 text-sm text-red-600">
                  {error}
                </div>
              )}

              {success && (
                <div className="rounded-xl bg-green-50 p-3 text-sm text-green-700">
                  {success}
                </div>
              )}

              {/* Title */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#252B42] dark:text-white">
                  Event Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  placeholder="Enter event title"
                  className="w-full rounded-xl border border-[#E5E8F0] bg-white px-4 py-3 text-sm text-[#252B42] outline-none transition focus:border-[#6477E8] dark:border-[#343B59] dark:bg-[#14182B] dark:text-white"
                />
              </div>

              {/* Event Type */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#252B42] dark:text-white">
                  Event Type *
                </label>
                <select
                  name="eventType"
                  value={formData.eventType}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-[#E5E8F0] bg-white px-4 py-3 text-sm text-[#252B42] outline-none focus:border-[#6477E8] dark:border-[#343B59] dark:bg-[#14182B] dark:text-white"
                >
                  <option value="">Select event type</option>
                  <option value="Environment">Environment</option>
                  <option value="Education">Education</option>
                  <option value="Health">Health</option>
                  <option value="Community">Community</option>
                  <option value="Food Drive">Food Drive</option>
                  <option value="Social Welfare">Social Welfare</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Date and Location */}
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#252B42] dark:text-white">
                    Event Date *
                  </label>
                  <input
                    type="date"
                    name="eventDate"
                    value={formData.eventDate}
                    onChange={handleChange}
                    min={new Date().toLocaleDateString("en-CA")}
                    required
                    className="w-full rounded-xl border border-[#E5E8F0] bg-white px-4 py-3 text-sm text-[#252B42] outline-none focus:border-[#6477E8] dark:border-[#343B59] dark:bg-[#14182B] dark:text-white"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#252B42] dark:text-white">
                    Location *
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    placeholder="Enter event location"
                    className="w-full rounded-xl border border-[#E5E8F0] bg-white px-4 py-3 text-sm text-[#252B42] outline-none focus:border-[#6477E8] dark:border-[#343B59] dark:bg-[#14182B] dark:text-white"
                  />
                </div>
              </div>

              {/* Thumbnail */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#252B42] dark:text-white">
                  Thumbnail URL
                </label>
                <input
                  type="url"
                  name="thumbnail"
                  value={formData.thumbnail}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                  className="w-full rounded-xl border border-[#E5E8F0] bg-white px-4 py-3 text-sm text-[#252B42] outline-none focus:border-[#6477E8] dark:border-[#343B59] dark:bg-[#14182B] dark:text-white"
                />
              </div>

              {/* Image Preview */}
              {formData.thumbnail && (
                <div>
                  <p className="mb-2 text-sm font-semibold text-[#252B42] dark:text-white">
                    Image Preview
                  </p>
                  <img
                    src={formData.thumbnail}
                    alt="Event preview"
                    className="h-40 w-full rounded-xl object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </div>
              )}

              {/* Description */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#252B42] dark:text-white">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Describe your event..."
                  className="w-full resize-y rounded-xl border border-[#E5E8F0] bg-white px-4 py-3 text-sm text-[#252B42] outline-none focus:border-[#6477E8] dark:border-[#343B59] dark:bg-[#14182B] dark:text-white"
                />
              </div>

              {/* Actions */}
              <div className="flex flex-col-reverse gap-3 border-t border-[#E5E8F0] pt-5 sm:flex-row sm:justify-end dark:border-[#343B59]">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={saving}
                  className="rounded-xl border border-[#E5E8F0] px-6 py-3 text-sm font-semibold text-[#737B91] transition hover:bg-[#F7F8FC] disabled:opacity-50 dark:border-[#343B59] dark:hover:bg-[#292E50]"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving || loading || isPending || !user?.email}
                  className="rounded-xl bg-[#6477E8] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#5367D5] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving ? "Saving Changes..." : "Save Changes"}
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
}

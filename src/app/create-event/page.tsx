
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export default function CreateEventPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    eventType: "",
    eventDate: "",
    location: "",
    thumbnail: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const minDate = [
    tomorrow.getFullYear(),
    String(tomorrow.getMonth() + 1).padStart(2, "0"),
    String(tomorrow.getDate()).padStart(2, "0"),
  ].join("-");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    setError("");

    try {
      const response = await fetch(`${API_URL}/api/events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to create event.");
      }

      setMessage("Event created successfully!");

      setFormData({
        title: "",
        eventType: "",
        eventDate: "",
        location: "",
        thumbnail: "",
        description: "",
      });

      setTimeout(() => {
        router.push("/manage-events");
      }, 1000);
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

  return (
    <main className="min-h-screen bg-[#F7F8FC] px-4 py-12 dark:bg-[#14182B]">
      <div className="mx-auto max-w-3xl">

        <div className="mb-8">
          <Link
            href="/"
            className="text-sm font-medium text-[#6477E8] hover:underline"
          >
            ← Back to Home
          </Link>

          <h1 className="mt-5 text-3xl font-bold text-[#252B42] dark:text-white">
            Create New Event
          </h1>

          <p className="mt-2 text-[#737B91]">
            Create an event and bring your community together.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-2xl border border-[#E5E8F0] bg-white p-6 shadow-sm sm:p-8 dark:border-[#343B59] dark:bg-[#1D2340]"
        >
          {message && (
            <p className="rounded-lg bg-green-50 p-3 text-sm text-green-700">
              {message}
            </p>
          )}

          {error && (
            <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
              {error}
            </p>
          )}

          {/* Event Title */}
          <div>
            <label className="mb-2 block font-medium text-[#252B42] dark:text-white">
              Event Title *
            </label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter event title"
              required
              className="w-full rounded-xl border border-[#E5E8F0] px-4 py-3 outline-none focus:border-[#6477E8] dark:border-[#343B59] dark:bg-[#252B43] dark:text-white"
            />
          </div>

          {/* Event Type */}
          <div>
            <label className="mb-2 block font-medium text-[#252B42] dark:text-white">
              Event Type *
            </label>

            <select
              name="eventType"
              value={formData.eventType}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-[#E5E8F0] px-4 py-3 outline-none focus:border-[#6477E8] dark:border-[#343B59] dark:bg-[#252B43] dark:text-white"
            >
              <option value="">Select event type</option>
              <option value="Environment">Environment</option>
              <option value="Education">Education</option>
              <option value="Community">Community</option>
              <option value="Health">Health</option>
              <option value="Social Welfare">Social Welfare</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Event Date */}
          <div>
            <label className="mb-2 block font-medium text-[#252B42] dark:text-white">
              Event Date *
            </label>

            <input
              type="date"
              name="eventDate"
              value={formData.eventDate}
              onChange={handleChange}
              min={minDate}
              required
              className="w-full rounded-xl border border-[#E5E8F0] px-4 py-3 outline-none focus:border-[#6477E8] dark:border-[#343B59] dark:bg-[#252B43] dark:text-white"
            />
          </div>

          {/* Location */}
          <div>
            <label className="mb-2 block font-medium text-[#252B42] dark:text-white">
              Location *
            </label>

            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter event location"
              required
              className="w-full rounded-xl border border-[#E5E8F0] px-4 py-3 outline-none focus:border-[#6477E8] dark:border-[#343B59] dark:bg-[#252B43] dark:text-white"
            />
          </div>

          {/* Thumbnail */}
          <div>
            <label className="mb-2 block font-medium text-[#252B42] dark:text-white">
              Thumbnail Image URL *
            </label>

            <input
              type="url"
              name="thumbnail"
              value={formData.thumbnail}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              required
              className="w-full rounded-xl border border-[#E5E8F0] px-4 py-3 outline-none focus:border-[#6477E8] dark:border-[#343B59] dark:bg-[#252B43] dark:text-white"
            />
          </div>

          {/* Description */}
          <div>
            <label className="mb-2 block font-medium text-[#252B42] dark:text-white">
              Event Description *
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your event..."
              rows={5}
              required
              className="w-full resize-y rounded-xl border border-[#E5E8F0] px-4 py-3 outline-none focus:border-[#6477E8] dark:border-[#343B59] dark:bg-[#252B43] dark:text-white"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[#6477E8] px-6 py-3 font-semibold text-white transition hover:bg-[#5367D5] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Publishing Event..." : "Publish Event"}
          </button>
        </form>
      </div>
    </main>
  );
}


"use client";

import { useState } from "react";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

type DeleteEventDialogProps = {
  eventId: string;
  eventTitle: string;
  open: boolean;
  onClose: () => void;
  onDeleted: () => void;
};

export default function DeleteEventDialog({
  eventId,
  eventTitle,
  open,
  onClose,
  onDeleted,
}: DeleteEventDialogProps) {
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  if (!open) return null;

  const handleDelete = async () => {
    try {
      setDeleting(true);
      setError("");

      const response = await fetch(
        `${API_URL}/api/events/${eventId}`,
        {
          method: "DELETE",
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to delete event.");
      }

      onDeleted();
      onClose();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong."
      );
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 px-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget && !deleting) onClose();
      }}
    >
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl dark:bg-[#1D2340]">

        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-2xl">
          🗑️
        </div>

        <h2 className="mt-5 text-center text-xl font-bold text-[#252B42] dark:text-white">
          Delete Event?
        </h2>

        <p className="mt-3 text-center text-sm leading-6 text-[#737B91]">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-[#252B42] dark:text-white">
            {eventTitle}
          </span>
          ? This action cannot be undone.
        </p>

        {error && (
          <p className="mt-4 rounded-lg bg-red-50 p-3 text-center text-sm text-red-600">
            {error}
          </p>
        )}

        <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row">
          <button
            type="button"
            onClick={onClose}
            disabled={deleting}
            className="flex-1 rounded-xl border border-[#E5E8F0] px-5 py-3 text-sm font-semibold text-[#737B91] transition hover:bg-[#F7F8FC] disabled:opacity-50 dark:border-[#343B59]"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting}
            className="flex-1 rounded-xl bg-red-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {deleting ? "Deleting..." : "Yes, Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

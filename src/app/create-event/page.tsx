// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import { authClient } from "@/lib/auth-client";

// const API_URL =
//   process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// export default function CreateEventPage() {
//   const router = useRouter();

//   const { data: session, isPending: sessionLoading } =
//     authClient.useSession();

//   const [formData, setFormData] = useState({
//     title: "",
//     eventType: "",
//     eventDate: "",
//     location: "",
//     thumbnail: "",
//     description: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");

//   const tomorrow = new Date();
//   tomorrow.setDate(tomorrow.getDate() + 1);

//   const minDate = [
//     tomorrow.getFullYear(),
//     String(tomorrow.getMonth() + 1).padStart(2, "0"),
//     String(tomorrow.getDate()).padStart(2, "0"),
//   ].join("-");

//   const handleChange = (
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
//     >
//   ) => {
//     const { name, value } = e.target;

//     setFormData((previous) => ({
//       ...previous,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (
//     e: React.FormEvent<HTMLFormElement>
//   ) => {
//     e.preventDefault();

//     setLoading(true);
//     setMessage("");
//     setError("");

//     try {
//       // Make sure the user is logged in
//       if (!session?.user) {
//         throw new Error("Please log in before creating an event.");
//       }

//       // Organizer information from the Better Auth session
//       const organizer = {
//         creatorId: session.user.id,
//         creatorName: session.user.name || "Community Organizer",
//         creatorEmail: session.user.email,
//         creatorImage: session.user.image || "",
//       };

//       const response = await fetch(`${API_URL}/api/events`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           ...formData,
//           ...organizer,
//         }),
//       });

//       const result = await response.json();

//       if (!response.ok) {
//         throw new Error(result.message || "Failed to create event.");
//       }

//       setMessage("Event created successfully!");

//       setFormData({
//         title: "",
//         eventType: "",
//         eventDate: "",
//         location: "",
//         thumbnail: "",
//         description: "",
//       });

//       setTimeout(() => {
//         router.push("/upcoming-events");
//       }, 1000);
//     } catch (err) {
//       setError(
//         err instanceof Error
//           ? err.message
//           : "Something went wrong."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Wait until Better Auth checks the current session
//   if (sessionLoading) {
//     return (
//       <main className="flex min-h-screen items-center justify-center bg-[#F7F8FC] dark:bg-[#14182B]">
//         <div className="text-center">
//           <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-[#E9EAFE] border-t-[#6477E8]" />
//           <p className="mt-4 text-[#737B91]">Checking your session...</p>
//         </div>
//       </main>
//     );
//   }

//   // Only logged-in users can create events
//   if (!session?.user) {
//     return (
//       <main className="flex min-h-screen items-center justify-center bg-[#F7F8FC] px-4 dark:bg-[#14182B]">
//         <div className="w-full max-w-md rounded-2xl border border-[#E5E8F0] bg-white p-8 text-center dark:border-[#343B59] dark:bg-[#1D2340]">
//           <div className="text-5xl">🔒</div>

//           <h1 className="mt-5 text-2xl font-bold text-[#252B42] dark:text-white">
//             Login Required
//           </h1>

//           <p className="mt-3 text-[#737B91]">
//             Please log in to create and publish a community event.
//           </p>

//           <Link
//             href="/login"
//             className="mt-6 inline-block rounded-xl bg-[#6477E8] px-6 py-3 font-semibold text-white transition hover:bg-[#5367D5]"
//           >
//             Go to Login
//           </Link>
//         </div>
//       </main>
//     );
//   }

//   return (
//     <main className="min-h-screen bg-[#F7F8FC] px-4 py-12 dark:bg-[#14182B]">
//       <div className="mx-auto max-w-3xl">
//         <div className="mb-8">
//           <Link
//             href="/"
//             className="text-sm font-medium text-[#6477E8] hover:underline"
//           >
//             ← Back to Home
//           </Link>

//           <h1 className="mt-5 text-3xl font-bold text-[#252B42] dark:text-white">
//             Create New Event
//           </h1>

//           <p className="mt-2 text-[#737B91]">
//             Create an event and bring your community together.
//           </p>
//         </div>

//         {/* Organizer Preview */}
//         <div className="mb-6 flex items-center gap-3 rounded-xl border border-[#E5E8F0] bg-white p-4 dark:border-[#343B59] dark:bg-[#1D2340]">
//           {session.user.image ? (
//             <img
//               src={session.user.image}
//               alt={session.user.name || "Organizer"}
//               className="h-12 w-12 rounded-full object-cover"
//             />
//           ) : (
//             <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E9EAFE] font-bold text-[#6477E8]">
//               {(session.user.name || "U").charAt(0).toUpperCase()}
//             </div>
//           )}

//           <div>
//             <p className="font-semibold text-[#252B42] dark:text-white">
//               {session.user.name || "Community Organizer"}
//             </p>
//             <p className="text-sm text-[#737B91]">
//               {session.user.email}
//             </p>
//           </div>
//         </div>

//         <form
//           onSubmit={handleSubmit}
//           className="space-y-6 rounded-2xl border border-[#E5E8F0] bg-white p-6 shadow-sm sm:p-8 dark:border-[#343B59] dark:bg-[#1D2340]"
//         >
//           {message && (
//             <p className="rounded-lg bg-green-50 p-3 text-sm text-green-700">
//               {message}
//             </p>
//           )}

//           {error && (
//             <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
//               {error}
//             </p>
//           )}

//           {/* Event Title */}
//           <div>
//             <label className="mb-2 block font-medium text-[#252B42] dark:text-white">
//               Event Title *
//             </label>

//             <input
//               type="text"
//               name="title"
//               value={formData.title}
//               onChange={handleChange}
//               placeholder="Enter event title"
//               required
//               className="w-full rounded-xl border border-[#E5E8F0] px-4 py-3 outline-none focus:border-[#6477E8] dark:border-[#343B59] dark:bg-[#252B43] dark:text-white"
//             />
//           </div>

//           {/* Event Type */}
//           <div>
//             <label className="mb-2 block font-medium text-[#252B42] dark:text-white">
//               Event Type *
//             </label>

//             <select
//               name="eventType"
//               value={formData.eventType}
//               onChange={handleChange}
//               required
//               className="w-full rounded-xl border border-[#E5E8F0] px-4 py-3 outline-none focus:border-[#6477E8] dark:border-[#343B59] dark:bg-[#252B43] dark:text-white"
//             >
//               <option value="">Select event type</option>
//               <option value="Donation">Donation</option>
//               <option value="Cleanup">Cleanup</option>
//               <option value="Plantation">Plantation</option>
//               <option value="Winter Relief">Winter Relief</option>
//               <option value="Food Drive">Food Drive</option>
//               <option value="Health Camp">Health Camp</option>
//               <option value="Education">Education</option>
//               <option value="Environment">Environment</option>
//               <option value="Community">Community</option>
//               <option value="Health">Health</option>
//               <option value="Social Welfare">Social Welfare</option>
//               <option value="Other">Other</option>
//             </select>
//           </div>

//           {/* Event Date */}
//           <div>
//             <label className="mb-2 block font-medium text-[#252B42] dark:text-white">
//               Event Date *
//             </label>

//             <input
//               type="date"
//               name="eventDate"
//               value={formData.eventDate}
//               onChange={handleChange}
//               min={minDate}
//               required
//               className="w-full rounded-xl border border-[#E5E8F0] px-4 py-3 outline-none focus:border-[#6477E8] dark:border-[#343B59] dark:bg-[#252B43] dark:text-white"
//             />
//           </div>

//           {/* Location */}
//           <div>
//             <label className="mb-2 block font-medium text-[#252B42] dark:text-white">
//               Location *
//             </label>

//             <input
//               type="text"
//               name="location"
//               value={formData.location}
//               onChange={handleChange}
//               placeholder="Enter event location"
//               required
//               className="w-full rounded-xl border border-[#E5E8F0] px-4 py-3 outline-none focus:border-[#6477E8] dark:border-[#343B59] dark:bg-[#252B43] dark:text-white"
//             />
//           </div>

//           {/* Thumbnail */}
//           <div>
//             <label className="mb-2 block font-medium text-[#252B42] dark:text-white">
//               Thumbnail Image URL *
//             </label>

//             <input
//               type="url"
//               name="thumbnail"
//               value={formData.thumbnail}
//               onChange={handleChange}
//               placeholder="https://example.com/image.jpg"
//               required
//               className="w-full rounded-xl border border-[#E5E8F0] px-4 py-3 outline-none focus:border-[#6477E8] dark:border-[#343B59] dark:bg-[#252B43] dark:text-white"
//             />
//           </div>

//           {/* Description */}
//           <div>
//             <label className="mb-2 block font-medium text-[#252B42] dark:text-white">
//               Event Description *
//             </label>

//             <textarea
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
//               placeholder="Describe your event..."
//               rows={5}
//               required
//               className="w-full resize-y rounded-xl border border-[#E5E8F0] px-4 py-3 outline-none focus:border-[#6477E8] dark:border-[#343B59] dark:bg-[#252B43] dark:text-white"
//             />
//           </div>

//           {/* Submit */}
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full rounded-xl bg-[#6477E8] px-6 py-3 font-semibold text-white transition hover:bg-[#5367D5] disabled:cursor-not-allowed disabled:opacity-60"
//           >
//             {loading ? "Publishing Event..." : "Publish Event"}
//           </button>
//         </form>
//       </div>
//     </main>
//   );
// }


"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const INITIAL_FORM_DATA = {
  title: "",
  eventType: "",
  eventDate: "",
  location: "",
  thumbnail: "",
  description: "",
};

const EVENT_TYPES = [
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

export default function CreateEventPage() {
  const router = useRouter();

  const { data: session, isPending: sessionLoading } =
    authClient.useSession();

  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Calculate tomorrow's date for the minimum event date.
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

    setError("");
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (loading) return;

    setMessage("");
    setError("");

    if (!session?.user) {
      setError("Please log in before creating an event.");
      return;
    }

    // Validate required fields.
    const {
      title,
      eventType,
      eventDate,
      location,
      thumbnail,
      description,
    } = formData;

    if (
      !title.trim() ||
      !eventType ||
      !eventDate ||
      !location.trim() ||
      !thumbnail.trim() ||
      !description.trim()
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    // Validate event date.
    const selectedDate = new Date(`${eventDate}T00:00:00`);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (
      Number.isNaN(selectedDate.getTime()) ||
      selectedDate <= today
    ) {
      setError("Please select a future event date.");
      return;
    }

    // Validate thumbnail URL.
    try {
      const imageUrl = new URL(thumbnail.trim());

      if (!["http:", "https:"].includes(imageUrl.protocol)) {
        throw new Error("Invalid image URL.");
      }
    } catch {
      setError("Please enter a valid thumbnail image URL.");
      return;
    }

    setLoading(true);

    try {
      // Organizer information from the current Better Auth session.
      const organizer = {
        creatorId: session.user.id,
        creatorName: session.user.name || "Community Organizer",
        creatorEmail: session.user.email,
        creatorImage: session.user.image || "",
      };

      const response = await fetch(`${API_URL}/api/events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title.trim(),
          eventType,
          eventDate,
          location: location.trim(),
          thumbnail: thumbnail.trim(),
          description: description.trim(),
          ...organizer,
        }),
      });

      // Safely handle API responses.
      const result = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          result?.message || "Failed to create event. Please try again."
        );
      }

      setMessage("Event created successfully!");

      setFormData({ ...INITIAL_FORM_DATA });

      // Redirect after successful creation.
      setTimeout(() => {
        router.push("/upcoming-events");
      }, 1000);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Wait until Better Auth checks the current session.
  if (sessionLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F7F8FC] dark:bg-[#14182B]">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-[#E9EAFE] border-t-[#6477E8]" />
          <p className="mt-4 text-[#737B91]">
            Checking your session...
          </p>
        </div>
      </main>
    );
  }

  // Only logged-in users can create events.
  if (!session?.user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F7F8FC] px-4 dark:bg-[#14182B]">
        <div className="w-full max-w-md rounded-2xl border border-[#E5E8F0] bg-white p-8 text-center dark:border-[#343B59] dark:bg-[#1D2340]">
          <div className="text-5xl">🔒</div>

          <h1 className="mt-5 text-2xl font-bold text-[#252B42] dark:text-white">
            Login Required
          </h1>

          <p className="mt-3 text-[#737B91]">
            Please log in to create and publish a community event.
          </p>

          <Link
            href="/login"
            className="mt-6 inline-block rounded-xl bg-[#6477E8] px-6 py-3 font-semibold text-white transition hover:bg-[#5367D5]"
          >
            Go to Login
          </Link>
        </div>
      </main>
    );
  }

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

        {/* Organizer Preview */}
        <div className="mb-6 flex items-center gap-3 rounded-xl border border-[#E5E8F0] bg-white p-4 dark:border-[#343B59] dark:bg-[#1D2340]">
          {session.user.image ? (
            <img
              src={session.user.image}
              alt={session.user.name || "Organizer"}
              className="h-12 w-12 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E9EAFE] font-bold text-[#6477E8]">
              {(session.user.name || "U")
                .charAt(0)
                .toUpperCase()}
            </div>
          )}

          <div>
            <p className="font-semibold text-[#252B42] dark:text-white">
              {session.user.name || "Community Organizer"}
            </p>

            <p className="text-sm text-[#737B91]">
              {session.user.email}
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-2xl border border-[#E5E8F0] bg-white p-6 shadow-sm sm:p-8 dark:border-[#343B59] dark:bg-[#1D2340]"
        >
          {/* Success Message */}
          {message && (
            <p
              role="status"
              className="rounded-lg bg-green-50 p-3 text-sm text-green-700"
            >
              {message}
            </p>
          )}

          {/* Error Message */}
          {error && (
            <p
              role="alert"
              className="rounded-lg bg-red-50 p-3 text-sm text-red-600"
            >
              {error}
            </p>
          )}

          {/* Event Title */}
          <div>
            <label
              htmlFor="title"
              className="mb-2 block font-medium text-[#252B42] dark:text-white"
            >
              Event Title *
            </label>

            <input
              id="title"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter event title"
              maxLength={100}
              required
              className="w-full rounded-xl border border-[#E5E8F0] px-4 py-3 outline-none focus:border-[#6477E8] dark:border-[#343B59] dark:bg-[#252B43] dark:text-white"
            />
          </div>

          {/* Event Type */}
          <div>
            <label
              htmlFor="eventType"
              className="mb-2 block font-medium text-[#252B42] dark:text-white"
            >
              Event Type *
            </label>

            <select
              id="eventType"
              name="eventType"
              value={formData.eventType}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-[#E5E8F0] px-4 py-3 outline-none focus:border-[#6477E8] dark:border-[#343B59] dark:bg-[#252B43] dark:text-white"
            >
              <option value="">Select event type</option>

              {EVENT_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Event Date */}
          <div>
            <label
              htmlFor="eventDate"
              className="mb-2 block font-medium text-[#252B42] dark:text-white"
            >
              Event Date *
            </label>

            <input
              id="eventDate"
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
            <label
              htmlFor="location"
              className="mb-2 block font-medium text-[#252B42] dark:text-white"
            >
              Location *
            </label>

            <input
              id="location"
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter event location"
              maxLength={200}
              required
              className="w-full rounded-xl border border-[#E5E8F0] px-4 py-3 outline-none focus:border-[#6477E8] dark:border-[#343B59] dark:bg-[#252B43] dark:text-white"
            />
          </div>

          {/* Thumbnail */}
          <div>
            <label
              htmlFor="thumbnail"
              className="mb-2 block font-medium text-[#252B42] dark:text-white"
            >
              Thumbnail Image URL *
            </label>

            <input
              id="thumbnail"
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
            <label
              htmlFor="description"
              className="mb-2 block font-medium text-[#252B42] dark:text-white"
            >
              Event Description *
            </label>

            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your event..."
              rows={5}
              maxLength={3000}
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

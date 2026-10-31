// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import { authClient } from "@/lib/auth-client";

// const API_URL =
//   process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// const INITIAL_FORM_DATA = {
//   title: "",
//   eventType: "",
//   eventDate: "",
//   location: "",
//   thumbnail: "",
//   description: "",
// };

// const EVENT_TYPES = [
//   "Donation",
//   "Cleanup",
//   "Plantation",
//   "Winter Relief",
//   "Food Drive",
//   "Health Camp",
//   "Education",
//   "Environment",
//   "Community",
//   "Health",
//   "Social Welfare",
//   "Other",
// ];

// export default function CreateEventPage() {
//   const router = useRouter();

//   const { data: session, isPending: sessionLoading } =
//     authClient.useSession();

//   const [formData, setFormData] = useState(INITIAL_FORM_DATA);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");

//   // Calculate tomorrow's date for the minimum event date.
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

//     setError("");
//   };

//   const handleSubmit = async (
//     e: React.FormEvent<HTMLFormElement>
//   ) => {
//     e.preventDefault();

//     if (loading) return;

//     setMessage("");
//     setError("");

//     if (!session?.user) {
//       setError("Please log in before creating an event.");
//       return;
//     }

//     // Validate required fields.
//     const {
//       title,
//       eventType,
//       eventDate,
//       location,
//       thumbnail,
//       description,
//     } = formData;

//     if (
//       !title.trim() ||
//       !eventType ||
//       !eventDate ||
//       !location.trim() ||
//       !thumbnail.trim() ||
//       !description.trim()
//     ) {
//       setError("Please fill in all required fields.");
//       return;
//     }

//     // Validate event date.
//     const selectedDate = new Date(`${eventDate}T00:00:00`);
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);

//     if (
//       Number.isNaN(selectedDate.getTime()) ||
//       selectedDate <= today
//     ) {
//       setError("Please select a future event date.");
//       return;
//     }

//     // Validate thumbnail URL.
//     try {
//       const imageUrl = new URL(thumbnail.trim());

//       if (!["http:", "https:"].includes(imageUrl.protocol)) {
//         throw new Error("Invalid image URL.");
//       }
//     } catch {
//       setError("Please enter a valid thumbnail image URL.");
//       return;
//     }

//     setLoading(true);

//     try {
//       // Organizer information from the current Better Auth session.
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
//           title: title.trim(),
//           eventType,
//           eventDate,
//           location: location.trim(),
//           thumbnail: thumbnail.trim(),
//           description: description.trim(),
//           ...organizer,
//         }),
//       });

//       // Safely handle API responses.
//       const result = await response.json().catch(() => null);

//       if (!response.ok) {
//         throw new Error(
//           result?.message || "Failed to create event. Please try again."
//         );
//       }

//       setMessage("Event created successfully!");

//       setFormData({ ...INITIAL_FORM_DATA });

//       // Redirect after successful creation.
//       setTimeout(() => {
//         router.push("/upcoming-events");
//       }, 1000);
//     } catch (err) {
//       setError(
//         err instanceof Error
//           ? err.message
//           : "Something went wrong. Please try again."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Wait until Better Auth checks the current session.
//   if (sessionLoading) {
//     return (
//       <main className="flex min-h-screen items-center justify-center bg-[#F7F8FC] dark:bg-[#14182B]">
//         <div className="text-center">
//           <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-[#E9EAFE] border-t-[#6477E8]" />
//           <p className="mt-4 text-[#737B91]">
//             Checking your session...
//           </p>
//         </div>
//       </main>
//     );
//   }

//   // Only logged-in users can create events.
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
//               {(session.user.name || "U")
//                 .charAt(0)
//                 .toUpperCase()}
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
//           {/* Success Message */}
//           {message && (
//             <p
//               role="status"
//               className="rounded-lg bg-green-50 p-3 text-sm text-green-700"
//             >
//               {message}
//             </p>
//           )}

//           {/* Error Message */}
//           {error && (
//             <p
//               role="alert"
//               className="rounded-lg bg-red-50 p-3 text-sm text-red-600"
//             >
//               {error}
//             </p>
//           )}

//           {/* Event Title */}
//           <div>
//             <label
//               htmlFor="title"
//               className="mb-2 block font-medium text-[#252B42] dark:text-white"
//             >
//               Event Title *
//             </label>

//             <input
//               id="title"
//               type="text"
//               name="title"
//               value={formData.title}
//               onChange={handleChange}
//               placeholder="Enter event title"
//               maxLength={100}
//               required
//               className="w-full rounded-xl border border-[#E5E8F0] px-4 py-3 outline-none focus:border-[#6477E8] dark:border-[#343B59] dark:bg-[#252B43] dark:text-white"
//             />
//           </div>

//           {/* Event Type */}
//           <div>
//             <label
//               htmlFor="eventType"
//               className="mb-2 block font-medium text-[#252B42] dark:text-white"
//             >
//               Event Type *
//             </label>

//             <select
//               id="eventType"
//               name="eventType"
//               value={formData.eventType}
//               onChange={handleChange}
//               required
//               className="w-full rounded-xl border border-[#E5E8F0] px-4 py-3 outline-none focus:border-[#6477E8] dark:border-[#343B59] dark:bg-[#252B43] dark:text-white"
//             >
//               <option value="">Select event type</option>

//               {EVENT_TYPES.map((type) => (
//                 <option key={type} value={type}>
//                   {type}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Event Date */}
//           <div>
//             <label
//               htmlFor="eventDate"
//               className="mb-2 block font-medium text-[#252B42] dark:text-white"
//             >
//               Event Date *
//             </label>

//             <input
//               id="eventDate"
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
//             <label
//               htmlFor="location"
//               className="mb-2 block font-medium text-[#252B42] dark:text-white"
//             >
//               Location *
//             </label>

//             <input
//               id="location"
//               type="text"
//               name="location"
//               value={formData.location}
//               onChange={handleChange}
//               placeholder="Enter event location"
//               maxLength={200}
//               required
//               className="w-full rounded-xl border border-[#E5E8F0] px-4 py-3 outline-none focus:border-[#6477E8] dark:border-[#343B59] dark:bg-[#252B43] dark:text-white"
//             />
//           </div>

//           {/* Thumbnail */}
//           <div>
//             <label
//               htmlFor="thumbnail"
//               className="mb-2 block font-medium text-[#252B42] dark:text-white"
//             >
//               Thumbnail Image URL *
//             </label>

//             <input
//               id="thumbnail"
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
//             <label
//               htmlFor="description"
//               className="mb-2 block font-medium text-[#252B42] dark:text-white"
//             >
//               Event Description *
//             </label>

//             <textarea
//               id="description"
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
//               placeholder="Describe your event..."
//               rows={5}
//               maxLength={3000}
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
import type { ReactNode } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  MapPin,
  Image as ImageIcon,
  FileText,
  Tag,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";
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

type FormData = typeof INITIAL_FORM_DATA;
type FormErrors = Partial<Record<keyof FormData, string>>;

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

function validateEventForm(data: FormData): FormErrors {
  const errors: FormErrors = {};

  if (!data.title.trim()) {
    errors.title = "Event title is required.";
  } else if (data.title.trim().length < 5) {
    errors.title = "Title must contain at least 5 characters.";
  } else if (data.title.trim().length > 100) {
    errors.title = "Title cannot exceed 100 characters.";
  }

  if (!data.eventType) {
    errors.eventType = "Please select an event type.";
  } else if (!EVENT_TYPES.includes(data.eventType)) {
    errors.eventType = "Please select a valid event type.";
  }

  if (!data.eventDate) {
    errors.eventDate = "Please select an event date.";
  } else {
    const selectedDate = new Date(`${data.eventDate}T00:00:00`);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (
      Number.isNaN(selectedDate.getTime()) ||
      selectedDate <= today
    ) {
      errors.eventDate = "Event date must be in the future.";
    }
  }

  if (!data.location.trim()) {
    errors.location = "Event location is required.";
  } else if (data.location.trim().length < 3) {
    errors.location = "Location must contain at least 3 characters.";
  } else if (data.location.trim().length > 200) {
    errors.location = "Location cannot exceed 200 characters.";
  }

  if (!data.thumbnail.trim()) {
    errors.thumbnail = "Thumbnail image URL is required.";
  } else {
    try {
      const imageUrl = new URL(data.thumbnail.trim());

      if (!["http:", "https:"].includes(imageUrl.protocol)) {
        errors.thumbnail = "Please enter a valid HTTP or HTTPS URL.";
      }
    } catch {
      errors.thumbnail = "Please enter a valid image URL.";
    }
  }

  if (!data.description.trim()) {
    errors.description = "Event description is required.";
  } else if (data.description.trim().length < 20) {
    errors.description =
      "Description must contain at least 20 characters.";
  } else if (data.description.trim().length > 3000) {
    errors.description =
      "Description cannot exceed 3000 characters.";
  }

  return errors;
}

export default function CreateEventPage() {
  const router = useRouter();

  const { data: session, isPending: sessionLoading } =
    authClient.useSession();

  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Tomorrow's date is the minimum selectable date.
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const minDate = [
    tomorrow.getFullYear(),
    String(tomorrow.getMonth() + 1).padStart(2, "0"),
    String(tomorrow.getDate()).padStart(2, "0"),
  ].join("-");

  const handleChange = (
    e: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    const fieldName = name as keyof FormData;

    setFormData((previous) => ({
      ...previous,
      [fieldName]: value,
    }));

    // Clear the changed field's validation error.
    setErrors((previous) => ({
      ...previous,
      [fieldName]: undefined,
    }));

    setError("");
    setMessage("");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (loading) return;

    setMessage("");
    setError("");

    if (!session?.user) {
      setError("Please log in before creating an event.");
      return;
    }

    // Validate all form fields.
    const validationErrors = validateEventForm(formData);

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setError("Please review the highlighted fields and try again.");
      return;
    }

    setLoading(true);

    try {
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
          title: formData.title.trim(),
          eventType: formData.eventType,
          eventDate: formData.eventDate,
          location: formData.location.trim(),
          thumbnail: formData.thumbnail.trim(),
          description: formData.description.trim(),
          ...organizer,
        }),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          result?.message || "Failed to create event. Please try again."
        );
      }

      setMessage("Your event has been published successfully!");
      setFormData({ ...INITIAL_FORM_DATA });
      setErrors({});

      setTimeout(() => {
        router.push("/upcoming-events");
      }, 1200);
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

  const inputClass = (field: keyof FormData) =>
    `w-full rounded-xl border bg-white px-4 py-3 text-sm text-[#252B42] outline-none transition placeholder:text-[#A0A6B5] focus:ring-2 dark:bg-[#252B43] dark:text-white ${
      errors[field]
        ? "border-red-400 focus:border-red-400 focus:ring-red-100"
        : "border-[#E5E8F0] focus:border-[#6477E8] focus:ring-[#6477E8]/15 dark:border-[#343B59]"
    }`;

 const FieldError = ({
  field,
}: {
  field: keyof FormData;
}): ReactNode => {
  return errors[field] ? (
    <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-red-500">
      <AlertCircle size={14} />
      {errors[field]}
    </p>
  ) : null;
};

  // Session loading state.
  if (sessionLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F7F8FC] dark:bg-[#14182B]">
        <div className="text-center">
          <Loader2 className="mx-auto h-10 w-10 animate-spin text-[#6477E8]" />
          <p className="mt-4 text-sm text-[#737B91]">
            Checking your session...
          </p>
        </div>
      </main>
    );
  }

  // Login required.
  if (!session?.user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F7F8FC] px-4 dark:bg-[#14182B]">
        <div className="w-full max-w-md rounded-2xl border border-[#E5E8F0] bg-white p-8 text-center shadow-sm dark:border-[#343B59] dark:bg-[#1D2340]">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#E9EAFE] text-3xl dark:bg-[#292E50]">
            🔒
          </div>

          <h1 className="mt-5 text-2xl font-bold text-[#252B42] dark:text-white">
            Login Required
          </h1>

          <p className="mt-3 text-sm leading-6 text-[#737B91] dark:text-gray-400">
            Please log in to create and publish a community event.
          </p>

          <Link
            href="/login"
            className="mt-6 inline-flex items-center justify-center rounded-xl bg-[#6477E8] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#5367D5]"
          >
            Go to Login
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F7F8FC] px-4 py-10 dark:bg-[#14182B] sm:py-14">
      <div className="mx-auto max-w-3xl">

        {/* Page Heading */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#6477E8] transition hover:text-[#5367D5]"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>

          <div className="mt-6">
            <span className="rounded-full bg-[#E9EAFE] px-3 py-1.5 text-xs font-bold tracking-wide text-[#6477E8] dark:bg-[#292E50] dark:text-[#AAB5FF]">
              COMMUNITY CONTRIBUTION
            </span>

            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-[#252B42] dark:text-white sm:text-4xl">
              Create New Event
            </h1>

            <p className="mt-3 text-sm leading-6 text-[#737B91] dark:text-gray-400 sm:text-base">
              Bring people together, support meaningful causes, and make
              a positive impact in your community.
            </p>
          </div>
        </div>

        {/* Organizer Preview */}
        <div className="mb-6 flex items-center gap-4 rounded-2xl border border-[#E5E8F0] bg-white p-4 dark:border-[#343B59] dark:bg-[#1D2340]">
          {session.user.image ? (
            <img
              src={session.user.image}
              alt={session.user.name || "Organizer"}
              className="h-12 w-12 rounded-full border border-[#E5E8F0] object-cover"
            />
          ) : (
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E9EAFE] text-lg font-bold text-[#6477E8] dark:bg-[#292E50]">
              {(session.user.name || "U").charAt(0).toUpperCase()}
            </div>
          )}

          <div className="min-w-0">
            <p className="text-sm font-semibold text-[#252B42] dark:text-white">
              {session.user.name || "Community Organizer"}
            </p>
            <p className="truncate text-xs text-[#737B91] dark:text-gray-400">
              {session.user.email}
            </p>
          </div>

          <span className="ml-auto rounded-full bg-[#E9EAFE] px-3 py-1 text-xs font-semibold text-[#6477E8] dark:bg-[#292E50] dark:text-[#AAB5FF]">
            Organizer
          </span>
        </div>

        {/* Event Form */}
        <form
          onSubmit={handleSubmit}
          noValidate
          className="space-y-7 rounded-2xl border border-[#E5E8F0] bg-white p-5 shadow-sm sm:p-8 dark:border-[#343B59] dark:bg-[#1D2340]"
        >
          {/* Form Header */}
          <div className="border-b border-[#E5E8F0] pb-5 dark:border-[#343B59]">
            <h2 className="text-lg font-bold text-[#252B42] dark:text-white">
              Event Information
            </h2>
            <p className="mt-1 text-sm text-[#737B91] dark:text-gray-400">
              Complete the information below to publish your event.
            </p>
          </div>

          {/* Success Message */}
          {message && (
            <div
              role="status"
              className="flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 p-4 text-sm font-medium text-green-700 dark:border-green-900 dark:bg-green-950/30 dark:text-green-400"
            >
              <CheckCircle2 size={19} />
              {message}
            </div>
          )}

          {/* General Error */}
          {error && (
            <div
              role="alert"
              className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600 dark:border-red-900 dark:bg-red-950/30 dark:text-red-400"
            >
              <AlertCircle size={19} className="shrink-0" />
              {error}
            </div>
          )}

          {/* Event Title */}
          <div>
            <label
              htmlFor="title"
              className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#252B42] dark:text-white"
            >
              Event Title <span className="text-red-500">*</span>
            </label>

            <input
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Community Food Distribution"
              maxLength={100}
              aria-invalid={!!errors.title}
              aria-describedby={errors.title ? "title-error" : undefined}
              className={inputClass("title")}
            />

            <div className="mt-2 flex items-center justify-between">
              <FieldError field="title" />
              <span className="ml-auto text-xs text-[#A0A6B5]">
                {formData.title.length}/100
              </span>
            </div>
          </div>

          {/* Event Type */}
          <div>
            <label
              htmlFor="eventType"
              className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#252B42] dark:text-white"
            >
              <Tag size={16} className="text-[#6477E8]" />
              Event Category <span className="text-red-500">*</span>
            </label>

            <select
              id="eventType"
              name="eventType"
              value={formData.eventType}
              onChange={handleChange}
              aria-invalid={!!errors.eventType}
              className={inputClass("eventType")}
            >
              <option value="">Choose an event category</option>
              {EVENT_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>

            <FieldError field="eventType" />
          </div>

          {/* Date and Location */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label
                htmlFor="eventDate"
                className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#252B42] dark:text-white"
              >
                <CalendarDays size={16} className="text-[#6477E8]" />
                Event Date <span className="text-red-500">*</span>
              </label>

              <input
                id="eventDate"
                name="eventDate"
                type="date"
                value={formData.eventDate}
                onChange={handleChange}
                min={minDate}
                aria-invalid={!!errors.eventDate}
                className={inputClass("eventDate")}
              />

              <FieldError field="eventDate" />
            </div>

            <div>
              <label
                htmlFor="location"
                className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#252B42] dark:text-white"
              >
                <MapPin size={16} className="text-[#6477E8]" />
                Event Location <span className="text-red-500">*</span>
              </label>

              <input
                id="location"
                name="location"
                type="text"
                value={formData.location}
                onChange={handleChange}
                placeholder="City, area or venue"
                maxLength={200}
                aria-invalid={!!errors.location}
                className={inputClass("location")}
              />

              <FieldError field="location" />
            </div>
          </div>

          {/* Thumbnail URL */}
          <div>
            <label
              htmlFor="thumbnail"
              className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#252B42] dark:text-white"
            >
              <ImageIcon size={16} className="text-[#6477E8]" />
              Thumbnail Image URL <span className="text-red-500">*</span>
            </label>

            <input
              id="thumbnail"
              name="thumbnail"
              type="url"
              value={formData.thumbnail}
              onChange={handleChange}
              placeholder="https://example.com/event-image.jpg"
              aria-invalid={!!errors.thumbnail}
              className={inputClass("thumbnail")}
            />

            <FieldError field="thumbnail" />

            <p className="mt-2 text-xs text-[#737B91] dark:text-gray-400">
              Provide a publicly accessible image URL.
            </p>
          </div>

          {/* Image Preview */}
          {formData.thumbnail && !errors.thumbnail && (
            <div className="overflow-hidden rounded-xl border border-[#E5E8F0] dark:border-[#343B59]">
              <p className="border-b border-[#E5E8F0] bg-[#F7F8FC] px-4 py-2 text-xs font-semibold text-[#737B91] dark:border-[#343B59] dark:bg-[#252B43] dark:text-gray-300">
                Image URL Preview
              </p>
              <img
                src={formData.thumbnail}
                alt="Event thumbnail preview"
                className="h-48 w-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>
          )}

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#252B42] dark:text-white"
            >
              <FileText size={16} className="text-[#6477E8]" />
              Event Description <span className="text-red-500">*</span>
            </label>

            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the purpose of your event, activities, and how people can participate..."
              rows={6}
              maxLength={3000}
              aria-invalid={!!errors.description}
              className={`${inputClass("description")} resize-y`}
            />

            <div className="mt-2 flex items-center justify-between">
              <FieldError field="description" />
              <span className="ml-auto text-xs text-[#A0A6B5]">
                {formData.description.length}/3000
              </span>
            </div>
          </div>

          {/* Submit */}
          <div className="border-t border-[#E5E8F0] pt-6 dark:border-[#343B59]">
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#6477E8] px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#5367D5] hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Publishing Event...
                </>
              ) : (
                "Publish Event"
              )}
            </button>

            <p className="mt-3 text-center text-xs text-[#737B91] dark:text-gray-400">
              Please review your event details before publishing.
            </p>
          </div>
        </form>
      </div>
    </main>
  );
}

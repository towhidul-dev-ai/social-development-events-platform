
// "use client";

// import { useCallback, useEffect, useState } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { authClient } from "@/lib/auth-client";

// import {
//   ArrowLeft,
//   CalendarDays,
//   Clock,
//   MapPin,
//   Users,
//   HeartHandshake,
//   Share2,
//   LoaderCircle,
//   CheckCircle2,
//   AlertCircle,
//   UserRound,
// } from "lucide-react";

// const API_URL =
//   process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// interface InitialUser {
//   id: string;
//   name: string;
//   email: string;
//   image?: string | null;
// }

// interface Event {
//   _id: string;
//   title?: string;
//   name?: string;
//   eventName?: string;
//   description?: string;
//   image?: string;
//   imageUrl?: string;
//   eventImage?: string;
//   category?: string;
//   eventType?: string;
//   location?: string;
//   date?: string;
//   eventDate?: string;
//   time?: string;
//   organizerName?: string;
//   creatorName?: string;
// }

// interface Volunteer {
//   name: string;
//   image: string;
// }

// interface Props {
//   eventId: string;
//   initialUser: InitialUser | null;
// }

// interface JoinStatusResponse {
//   success?: boolean;
//   isJoined?: boolean;
//   volunteerCount?: number;
//   volunteers?: Volunteer[];
//   message?: string;
// }

// // Format the event date using Bangladesh time.
// function formatEventDate(date?: string) {
//   if (!date) return "Date not specified";

//   // Date-only values should not be shifted by timezone conversion.
//   const dateOnly = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date);

//   if (dateOnly) {
//     const [, year, month, day] = dateOnly;

//     return new Date(
//       Number(year),
//       Number(month) - 1,
//       Number(day)
//     ).toLocaleDateString("en-GB", {
//       day: "2-digit",
//       month: "long",
//       year: "numeric",
//     });
//   }

//   const parsedDate = new Date(date);

//   if (Number.isNaN(parsedDate.getTime())) {
//     return "Date not specified";
//   }

//   return parsedDate.toLocaleDateString("en-GB", {
//     day: "2-digit",
//     month: "long",
//     year: "numeric",
//     timeZone: "Asia/Dhaka",
//   });
// }

// // Format a separately stored event time.
// function formatSeparateTime(time?: string) {
//   if (!time?.trim()) return null;

//   const value = time.trim();

//   // Supports values such as 14:30 or 09:15:00.
//   const match = /^(\d{1,2}):(\d{2})(?::\d{2})?$/.exec(value);

//   if (match) {
//     const hours = Number(match[1]);
//     const minutes = Number(match[2]);

//     if (hours > 23 || minutes > 59) return value;

//     const parsed = new Date();
//     parsed.setHours(hours, minutes, 0, 0);

//     return parsed.toLocaleTimeString("en-US", {
//       hour: "2-digit",
//       minute: "2-digit",
//       hour12: true,
//     });
//   }

//   // Supports already formatted values such as 2:30 PM.
//   return value;
// }

// // If the backend stores a complete datetime, extract its Bangladesh time.
// // Midnight UTC is treated as a date-only value, not an event time.
// function getEventTime(event: Event) {
//   const separateTime = formatSeparateTime(event.time);

//   if (separateTime) return separateTime;

//   const dateValue = event.eventDate || event.date;

//   if (!dateValue) return "Time not specified";

//   const dateOnly = /^\d{4}-\d{2}-\d{2}$/.test(dateValue);

//   if (dateOnly) return "Time not specified";

//   const parsedDate = new Date(dateValue);

//   if (Number.isNaN(parsedDate.getTime())) {
//     return "Time not specified";
//   }

//   // A midnight UTC timestamp commonly represents a date-only value.
//   if (
//     parsedDate.getUTCHours() === 0 &&
//     parsedDate.getUTCMinutes() === 0 &&
//     parsedDate.getUTCSeconds() === 0
//   ) {
//     return "Time not specified";
//   }

//   return parsedDate.toLocaleTimeString("en-US", {
//     hour: "2-digit",
//     minute: "2-digit",
//     hour12: true,
//     timeZone: "Asia/Dhaka",
//   });
// }

// export default function UpcomingEventDetailsClient({
//   eventId,
//   initialUser,
// }: Props) {
//   const router = useRouter();

//   const [event, setEvent] = useState<Event | null>(null);
//   const [token, setToken] = useState<string | null>(null);
//   const [tokenLoading, setTokenLoading] = useState(Boolean(initialUser));

//   const [isJoined, setIsJoined] = useState(false);
//   const [volunteerCount, setVolunteerCount] = useState(0);
//   const [volunteers, setVolunteers] = useState<Volunteer[]>([]);

//   const [loading, setLoading] = useState(true);
//   const [joining, setJoining] = useState(false);
//   const [error, setError] = useState("");
//   const [notice, setNotice] = useState("");

//   // 1. Retrieve JWT from Better Auth.
//   useEffect(() => {
//     let active = true;

//     const getToken = async () => {
//       if (!initialUser) {
//         setToken(null);
//         setTokenLoading(false);
//         return;
//       }

//       setTokenLoading(true);

//       try {
//         const { data, error } = await authClient.token();

//         if (error) {
//           throw new Error("Unable to retrieve authentication token.");
//         }

//         if (!data?.token) {
//           throw new Error("JWT token was not returned by Better Auth.");
//         }

//         if (active) {
//           setToken(data.token);
//           setError("");
//           console.log("JWT retrieved successfully.");
//         }
//       } catch (err) {
//         if (active) {
//           setToken(null);
//           setError(
//             err instanceof Error
//               ? err.message
//               : "Authentication failed."
//           );
//         }
//       } finally {
//         if (active) setTokenLoading(false);
//       }
//     };

//     getToken();

//     return () => {
//       active = false;
//     };
//   }, [initialUser]);

//   // 2. Authorization headers.
//   const getAuthHeaders = useCallback((): HeadersInit => {
//     return {
//       "Content-Type": "application/json",
//       ...(token ? { Authorization: `Bearer ${token}` } : {}),
//     };
//   }, [token]);

//   // 3. Fetch event details.
//   const fetchEvent = useCallback(async () => {
//     const response = await fetch(
//       `${API_URL}/api/events/${eventId}`,
//       { cache: "no-store" }
//     );

//     const data = await response.json();

//     if (!response.ok || data.success === false) {
//       throw new Error(data.message || "Failed to load event.");
//     }

//     const eventData = data.event ?? data;

//     if (!eventData?._id) {
//       throw new Error("Event information is unavailable.");
//     }

//     setEvent(eventData);
//   }, [eventId]);

//   // 4. Fetch volunteer list and join status.
//   const fetchJoinStatus = useCallback(async () => {
//     if (!initialUser || !token) {
//       setIsJoined(false);
//       setVolunteerCount(0);
//       setVolunteers([]);
//       return;
//     }

//     const response = await fetch(
//       `${API_URL}/api/events/${eventId}/join-status`,
//       {
//         method: "GET",
//         headers: getAuthHeaders(),
//         cache: "no-store",
//       }
//     );

//     const data: JoinStatusResponse = await response.json();

//     if (!response.ok || data.success === false) {
//       throw new Error(
//         data.message ||
//           `Failed to fetch volunteer information (${response.status}).`
//       );
//     }

//     setIsJoined(data.isJoined ?? false);
//     setVolunteerCount(
//       data.volunteerCount ?? data.volunteers?.length ?? 0
//     );
//     setVolunteers(data.volunteers ?? []);
//   }, [eventId, initialUser, token, getAuthHeaders]);

//   // 5. Load event and volunteer information.
//   useEffect(() => {
//     let active = true;

//     const loadPage = async () => {
//       setLoading(true);
//       setError("");

//       try {
//         await fetchEvent();

//         // Wait for JWT retrieval before requesting protected data.
//         if (initialUser && !token) {
//           return;
//         }

//         await fetchJoinStatus();
//       } catch (err) {
//         console.error("Event details error:", err);

//         if (active) {
//           setError(
//             err instanceof Error
//               ? err.message
//               : "Unable to load event information."
//           );
//         }
//       } finally {
//         if (active) setLoading(false);
//       }
//     };

//     loadPage();

//     return () => {
//       active = false;
//     };
//   }, [fetchEvent, fetchJoinStatus, initialUser, token]);

//   // 6. Join or leave event.
//   const handleJoinToggle = async () => {
//     if (!initialUser) {
//       router.push("/login");
//       return;
//     }

//     if (!token) {
//       setNotice("Authentication token is unavailable. Please sign in again.");
//       return;
//     }

//     try {
//       setJoining(true);
//       setNotice("");

//       const response = await fetch(
//         `${API_URL}/api/events/${eventId}/join`,
//         {
//           method: isJoined ? "DELETE" : "POST",
//           headers: getAuthHeaders(),
//         }
//       );

//       const data = await response.json();

//       if (!response.ok || data.success === false) {
//         throw new Error(data.message || "Unable to update registration.");
//       }

//       setNotice(
//         isJoined
//           ? "You have left this event."
//           : "You have successfully joined this event."
//       );

//       await fetchJoinStatus();
//     } catch (err) {
//       setNotice(
//         err instanceof Error
//           ? err.message
//           : "Something went wrong."
//       );
//     } finally {
//       setJoining(false);
//     }
//   };

//   // 7. Share event.
//   const handleShare = async () => {
//     try {
//       await navigator.clipboard.writeText(window.location.href);
//       setNotice("Event link copied to clipboard.");
//     } catch {
//       setNotice("Unable to copy the event link.");
//     }
//   };

//   // Loading screen.
//   if (loading || tokenLoading) {
//     return (
//       <main className="flex min-h-[70vh] items-center justify-center bg-[#F7F8FC] dark:bg-[#14182B]">
//         <div className="text-center">
//           <LoaderCircle className="mx-auto h-12 w-12 animate-spin text-[#6477E8]" />
//           <p className="mt-4 text-[#737B91] dark:text-[#AAB1C8]">
//             Loading event details...
//           </p>
//         </div>
//       </main>
//     );
//   }

//   // Error screen.
//   if (error || !event) {
//     return (
//       <main className="flex min-h-[70vh] items-center justify-center bg-[#F7F8FC] px-4 dark:bg-[#14182B]">
//         <div className="max-w-md rounded-2xl border border-[#E5E8F0] bg-white p-8 text-center dark:border-[#343B59] dark:bg-[#1D2340]">
//           <AlertCircle className="mx-auto h-12 w-12 text-red-500" />

//           <h2 className="mt-4 text-xl font-bold text-[#252B42] dark:text-white">
//             Event Not Found
//           </h2>

//           <p className="mt-2 text-sm text-[#737B91] dark:text-[#AAB1C8]">
//             {error || "We could not find this event."}
//           </p>

//           <Link
//             href="/upcoming-events"
//             className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#6477E8] px-5 py-3 font-semibold text-white hover:bg-[#5367D5]"
//           >
//             <ArrowLeft size={18} />
//             Back to Events
//           </Link>
//         </div>
//       </main>
//     );
//   }

//   const title =
//     event.title || event.eventName || event.name || "Community Event";

//   const image =
//     event.imageUrl ||
//     event.eventImage ||
//     event.image ||
//     "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8";

//   const eventDate = formatEventDate(event.eventDate || event.date);
//   const eventTime = getEventTime(event);

//   return (
//     <main className="min-h-screen bg-[#F7F8FC] px-4 py-10 transition-colors dark:bg-[#14182B] sm:px-6 lg:px-8">
//       <div className="mx-auto max-w-6xl">
//         <Link
//           href="/upcoming-events"
//           className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-[#6477E8] hover:text-[#5367D5]"
//         >
//           <ArrowLeft size={18} />
//           Back to Upcoming Events
//         </Link>

//         {notice && (
//           <div className="mb-5 flex items-center gap-2 rounded-xl border border-[#E5E8F0] bg-white px-4 py-3 text-sm text-[#252B42] dark:border-[#343B59] dark:bg-[#1D2340] dark:text-white">
//             <CheckCircle2 size={18} className="shrink-0 text-[#6477E8]" />
//             <span>{notice}</span>

//             <button
//               onClick={() => setNotice("")}
//               className="ml-auto"
//               aria-label="Dismiss notification"
//             >
//               ×
//             </button>
//           </div>
//         )}

//         <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
//           {/* Event information */}
//           <section className="space-y-6 lg:col-span-2">
//             <div className="overflow-hidden rounded-2xl bg-white shadow-sm dark:bg-[#1D2340]">
//               <img
//                 src={image}
//                 alt={title}
//                 className="h-64 w-full object-cover sm:h-96"
//               />
//             </div>

//             <div className="rounded-2xl border border-[#E5E8F0] bg-white p-6 shadow-sm dark:border-[#343B59] dark:bg-[#1D2340] sm:p-8">
//               {(event.category || event.eventType) && (
//                 <span className="inline-block rounded-full bg-[#E9EAFE] px-4 py-1.5 text-sm font-semibold text-[#5367D5] dark:bg-[#292E50] dark:text-[#AAB1FF]">
//                   {event.category || event.eventType}
//                 </span>
//               )}

//               <h1 className="mt-4 text-3xl font-bold text-[#252B42] dark:text-white sm:text-4xl">
//                 {title}
//               </h1>

//               <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
//                 <InfoItem
//                   icon={<CalendarDays />}
//                   label="Event Date"
//                   value={eventDate}
//                 />

//                 <InfoItem
//                   icon={<Clock />}
//                   label="Event Time"
//                   value={eventTime}
//                 />

//                 <div className="sm:col-span-2">
//                   <InfoItem
//                     icon={<MapPin />}
//                     label="Location"
//                     value={event.location || "Location not specified"}
//                   />
//                 </div>
//               </div>

//               <hr className="my-8 border-[#E5E8F0] dark:border-[#343B59]" />

//               <h2 className="text-xl font-bold text-[#252B42] dark:text-white">
//                 About This Event
//               </h2>

//               <p className="mt-4 whitespace-pre-line leading-7 text-[#737B91] dark:text-[#AAB1C8]">
//                 {event.description || "No event description is available."}
//               </p>
//             </div>
//           </section>

//           {/* Sidebar */}
//           <aside className="space-y-6">
//             {/* Join card */}
//             <div className="rounded-2xl border border-[#E5E8F0] bg-white p-6 shadow-sm dark:border-[#343B59] dark:bg-[#1D2340]">
//               <div className="flex items-center gap-3">
//                 <div className="rounded-xl bg-[#E9EAFE] p-3 dark:bg-[#292E50]">
//                   <HeartHandshake className="h-6 w-6 text-[#6477E8]" />
//                 </div>

//                 <div>
//                   <p className="text-sm text-[#737B91] dark:text-[#AAB1C8]">
//                     Community Volunteers
//                   </p>

//                   <p className="text-2xl font-bold text-[#252B42] dark:text-white">
//                     {volunteerCount}
//                   </p>
//                 </div>
//               </div>

//               <button
//                 onClick={handleJoinToggle}
//                 disabled={joining || (Boolean(initialUser) && !token)}
//                 className={`mt-6 flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-60 ${
//                   isJoined
//                     ? "bg-red-500 hover:bg-red-600"
//                     : "bg-[#6477E8] hover:bg-[#5367D5]"
//                 }`}
//               >
//                 {joining ? (
//                   <LoaderCircle className="h-5 w-5 animate-spin" />
//                 ) : (
//                   <HeartHandshake size={19} />
//                 )}

//                 {joining
//                   ? "Please wait..."
//                   : isJoined
//                     ? "Leave Event"
//                     : "Join This Event"}
//               </button>

//               <button
//                 onClick={handleShare}
//                 className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-[#E5E8F0] px-5 py-3 font-semibold text-[#252B42] hover:bg-[#F7F8FC] dark:border-[#343B59] dark:text-white dark:hover:bg-[#292E50]"
//               >
//                 <Share2 size={18} />
//                 Share Event
//               </button>

//               {!initialUser && (
//                 <p className="mt-4 text-center text-xs text-[#737B91] dark:text-[#AAB1C8]">
//                   Please sign in to join this event.
//                 </p>
//               )}
//             </div>

//             {/* Organizer */}
//             <div className="rounded-2xl border border-[#E5E8F0] bg-white p-6 shadow-sm dark:border-[#343B59] dark:bg-[#1D2340]">
//               <h2 className="font-bold text-[#252B42] dark:text-white">
//                 Event Organizer
//               </h2>

//               <div className="mt-4 flex items-center gap-3">
//                 <div className="rounded-full bg-[#E9EAFE] p-3 dark:bg-[#292E50]">
//                   <UserRound className="text-[#6477E8]" />
//                 </div>

//                 <div>
//                   <p className="font-semibold text-[#252B42] dark:text-white">
//                     {event.organizerName ||
//                       event.creatorName ||
//                       "Community Organizer"}
//                   </p>

//                   <p className="text-xs text-[#737B91] dark:text-[#AAB1C8]">
//                     Event Organizer
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* Volunteers */}
//             <div className="rounded-2xl border border-[#E5E8F0] bg-white p-6 shadow-sm dark:border-[#343B59] dark:bg-[#1D2340]">
//               <div className="flex items-center justify-between">
//                 <h2 className="font-bold text-[#252B42] dark:text-white">
//                   Volunteers
//                 </h2>

//                 <span className="rounded-full bg-[#E9EAFE] px-3 py-1 text-xs font-bold text-[#5367D5] dark:bg-[#292E50] dark:text-[#AAB1FF]">
//                   {volunteerCount}
//                 </span>
//               </div>

//               {volunteers.length > 0 ? (
//                 <div className="mt-5 space-y-4">
//                   {volunteers.map((volunteer, index) => (
//                     <div
//                       key={`${volunteer.name}-${index}`}
//                       className="flex items-center gap-3"
//                     >
//                       {volunteer.image ? (
//                         <img
//                           src={volunteer.image}
//                           alt={volunteer.name}
//                           className="h-10 w-10 rounded-full object-cover"
//                         />
//                       ) : (
//                         <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E9EAFE] dark:bg-[#292E50]">
//                           <Users size={18} className="text-[#6477E8]" />
//                         </div>
//                       )}

//                       <p className="text-sm font-medium text-[#252B42] dark:text-white">
//                         {volunteer.name}
//                       </p>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <div className="py-8 text-center">
//                   <Users className="mx-auto h-9 w-9 text-[#AAB1C8]" />

//                   <p className="mt-3 text-sm text-[#737B91] dark:text-[#AAB1C8]">
//                     No volunteers yet. Be the first to join!
//                   </p>
//                 </div>
//               )}
//             </div>
//           </aside>
//         </div>
//       </div>
//     </main>
//   );
// }

// // Reusable information item.
// function InfoItem({
//   icon,
//   label,
//   value,
// }: {
//   icon: React.ReactNode;
//   label: string;
//   value: string;
// }) {
//   return (
//     <div className="flex items-center gap-3">
//       <div className="rounded-xl bg-[#E9EAFE] p-3 dark:bg-[#292E50]">
//         <span className="text-[#6477E8]">{icon}</span>
//       </div>

//       <div>
//         <p className="text-xs text-[#737B91] dark:text-[#AAB1C8]">
//           {label}
//         </p>

//         <p className="font-semibold text-[#252B42] dark:text-white">
//           {value}
//         </p>
//       </div>
//     </div>
//   );
// }
"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

import {
  ArrowLeft,
  CalendarDays,
  Clock,
  MapPin,
  Users,
  HeartHandshake,
  Share2,
  LoaderCircle,
  CheckCircle2,
  AlertCircle,
  UserRound,
} from "lucide-react";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

interface InitialUser {
  id: string;
  name: string;
  email: string;
  image?: string | null;
}

interface Event {
  _id: string;
  title?: string;
  name?: string;
  eventName?: string;
  description?: string;
  image?: string;
  imageUrl?: string;
  eventImage?: string;
  category?: string;
  eventType?: string;
  location?: string;

  date?: string;
  eventDate?: string;
  time?: string;
  eventTime?: string;
  startTime?: string;

  organizerName?: string;
  creatorName?: string;
}

interface Volunteer {
  name: string;
  image: string;
}

interface Props {
  eventId: string;
  initialUser: InitialUser | null;
}

interface JoinStatusResponse {
  success?: boolean;
  isJoined?: boolean;
  volunteerCount?: number;
  volunteers?: Volunteer[];
  message?: string;
}

// Format the event date.
function formatEventDate(date?: string) {
  if (!date) return "Date not specified";

  // Handle date-only values without timezone shifting.
  const dateOnly = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date);

  if (dateOnly) {
    const [, year, month, day] = dateOnly;

    const parsed = new Date(
      Number(year),
      Number(month) - 1,
      Number(day)
    );

    return parsed.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  }

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Date not specified";
  }

  return parsedDate.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  });
}

// Format a separately stored time such as 14:30 or 02:30 PM.
function formatSeparateTime(time?: string) {
  if (!time?.trim()) return null;

  const value = time.trim();

  const timeMatch = /^(\d{1,2}):(\d{2})(?::(\d{2}))?$/.exec(value);

  if (timeMatch) {
    const hours = Number(timeMatch[1]);
    const minutes = Number(timeMatch[2]);

    if (hours > 23 || minutes > 59) return null;

    const parsed = new Date();
    parsed.setHours(hours, minutes, 0, 0);

    return parsed.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  }

  // Already formatted time, e.g. 02:30 PM.
  return value;
}

// Get the event time from the available API fields.
function getEventTime(event: Event) {
  const separateTime =
    event.eventTime ||
    event.time ||
    event.startTime;

  const formattedTime = formatSeparateTime(separateTime);

  if (formattedTime) return formattedTime;

  // If the API stores date and time together, extract the time.
  const dateValue = event.eventDate || event.date;

  if (!dateValue) return "Time not specified";

  // A date-only value does not contain an event time.
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateValue)) {
    return "Time not specified";
  }

  const parsedDate = new Date(dateValue);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Time not specified";
  }

  // Do not treat midnight UTC as automatically date-only.
  // If the backend stores a complete datetime, display its Dhaka time.
  return parsedDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Dhaka",
  });
}

export default function UpcomingEventDetailsClient({
  eventId,
  initialUser,
}: Props) {
  const router = useRouter();

  const [event, setEvent] = useState<Event | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [tokenLoading, setTokenLoading] = useState(Boolean(initialUser));

  const [isJoined, setIsJoined] = useState(false);
  const [volunteerCount, setVolunteerCount] = useState(0);
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);

  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  // 1. Retrieve JWT from Better Auth.
  useEffect(() => {
    let active = true;

    const getToken = async () => {
      if (!initialUser) {
        setToken(null);
        setTokenLoading(false);
        return;
      }

      setTokenLoading(true);

      try {
        const { data, error } = await authClient.token();

        if (error) {
          throw new Error("Unable to retrieve authentication token.");
        }

        if (!data?.token) {
          throw new Error("JWT token was not returned by Better Auth.");
        }

        if (active) {
          setToken(data.token);
          setError("");
          console.log("JWT retrieved successfully.");
        }
      } catch (err) {
        if (active) {
          setToken(null);
          setError(
            err instanceof Error
              ? err.message
              : "Authentication failed."
          );
        }
      } finally {
        if (active) {
          setTokenLoading(false);
        }
      }
    };

    getToken();

    return () => {
      active = false;
    };
  }, [initialUser]);

  // 2. Authorization headers.
  const getAuthHeaders = useCallback((): HeadersInit => {
    return {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
  }, [token]);

  // 3. Fetch event details.
  const fetchEvent = useCallback(async () => {
    const response = await fetch(
      `${API_URL}/api/events/${eventId}`,
      { cache: "no-store" }
    );

    const data = await response.json();

    if (!response.ok || data.success === false) {
      throw new Error(data.message || "Failed to load event.");
    }

    const eventData = data.event ?? data;

    if (!eventData?._id) {
      throw new Error("Event information is unavailable.");
    }

    setEvent(eventData);
  }, [eventId]);

  // 4. Fetch volunteer list and join status.
  const fetchJoinStatus = useCallback(async () => {
    if (!initialUser || !token) {
      setIsJoined(false);
      setVolunteerCount(0);
      setVolunteers([]);
      return;
    }

    const response = await fetch(
      `${API_URL}/api/events/${eventId}/join-status`,
      {
        method: "GET",
        headers: getAuthHeaders(),
        cache: "no-store",
      }
    );

    const data: JoinStatusResponse = await response.json();

    if (!response.ok || data.success === false) {
      throw new Error(
        data.message ||
          `Failed to fetch volunteer information (${response.status}).`
      );
    }

    setIsJoined(data.isJoined ?? false);
    setVolunteerCount(
      data.volunteerCount ?? data.volunteers?.length ?? 0
    );
    setVolunteers(data.volunteers ?? []);
  }, [eventId, initialUser, token, getAuthHeaders]);

  // 5. Load event and volunteer information.
  useEffect(() => {
    let active = true;

    const loadPage = async () => {
      setLoading(true);
      setError("");

      try {
        await fetchEvent();

        if (initialUser && !token) {
          return;
        }

        await fetchJoinStatus();
      } catch (err) {
        console.error("Event details error:", err);

        if (active) {
          setError(
            err instanceof Error
              ? err.message
              : "Unable to load event information."
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadPage();

    return () => {
      active = false;
    };
  }, [fetchEvent, fetchJoinStatus, initialUser, token]);

  // 6. Join or leave event.
  const handleJoinToggle = async () => {
    if (!initialUser) {
      router.push("/login");
      return;
    }

    if (!token) {
      setNotice(
        "Authentication token is unavailable. Please sign in again."
      );
      return;
    }

    try {
      setJoining(true);
      setNotice("");

      const response = await fetch(
        `${API_URL}/api/events/${eventId}/join`,
        {
          method: isJoined ? "DELETE" : "POST",
          headers: getAuthHeaders(),
        }
      );

      const data = await response.json();

      if (!response.ok || data.success === false) {
        throw new Error(
          data.message || "Unable to update registration."
        );
      }

      setNotice(
        isJoined
          ? "You have left this event."
          : "You have successfully joined this event."
      );

      await fetchJoinStatus();
    } catch (err) {
      setNotice(
        err instanceof Error
          ? err.message
          : "Something went wrong."
      );
    } finally {
      setJoining(false);
    }
  };

  // 7. Share event.
  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setNotice("Event link copied to clipboard.");
    } catch {
      setNotice("Unable to copy the event link.");
    }
  };

  // Loading screen.
  if (loading || tokenLoading) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-[#F7F8FC] dark:bg-[#14182B]">
        <div className="text-center">
          <LoaderCircle className="mx-auto h-12 w-12 animate-spin text-[#6477E8]" />
          <p className="mt-4 text-[#737B91] dark:text-[#AAB1C8]">
            Loading event details...
          </p>
        </div>
      </main>
    );
  }

  // Error screen.
  if (error || !event) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-[#F7F8FC] px-4 dark:bg-[#14182B]">
        <div className="max-w-md rounded-2xl border border-[#E5E8F0] bg-white p-8 text-center dark:border-[#343B59] dark:bg-[#1D2340]">
          <AlertCircle className="mx-auto h-12 w-12 text-red-500" />

          <h2 className="mt-4 text-xl font-bold text-[#252B42] dark:text-white">
            Event Not Found
          </h2>

          <p className="mt-2 text-sm text-[#737B91] dark:text-[#AAB1C8]">
            {error || "We could not find this event."}
          </p>

          <Link
            href="/upcoming-events"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#6477E8] px-5 py-3 font-semibold text-white hover:bg-[#5367D5]"
          >
            <ArrowLeft size={18} />
            Back to Events
          </Link>
        </div>
      </main>
    );
  }

  const title =
    event.title ||
    event.eventName ||
    event.name ||
    "Community Event";

  const image =
    event.imageUrl ||
    event.eventImage ||
    event.image ||
    "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8";

  const eventDate = formatEventDate(event.eventDate || event.date);
  const eventTime = getEventTime(event);

  return (
    <main className="min-h-screen bg-[#F7F8FC] px-4 py-10 transition-colors dark:bg-[#14182B] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/upcoming-events"
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-[#6477E8] hover:text-[#5367D5]"
        >
          <ArrowLeft size={18} />
          Back to Upcoming Events
        </Link>

        {notice && (
          <div className="mb-5 flex items-center gap-2 rounded-xl border border-[#E5E8F0] bg-white px-4 py-3 text-sm text-[#252B42] dark:border-[#343B59] dark:bg-[#1D2340] dark:text-white">
            <CheckCircle2
              size={18}
              className="shrink-0 text-[#6477E8]"
            />
            <span>{notice}</span>

            <button
              onClick={() => setNotice("")}
              className="ml-auto"
              aria-label="Dismiss notification"
            >
              ×
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Event information */}
          <section className="space-y-6 lg:col-span-2">
            {/* Event image with title, location and date */}
            <div className="relative overflow-hidden rounded-2xl bg-[#1D2340] shadow-sm">
              <img
                src={image}
                alt={title}
                className="h-64 w-full object-cover sm:h-96"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                {event.category || event.eventType ? (
                  <span className="mb-3 inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                    {event.category || event.eventType}
                  </span>
                ) : null}

                <h1 className="text-3xl font-bold text-white sm:text-4xl">
                  {title}
                </h1>

                <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/90">
                  <span className="flex items-center gap-2">
                    <MapPin size={16} />
                    {event.location || "Location not specified"}
                  </span>

                  <span className="flex items-center gap-2">
                    <CalendarDays size={16} />
                    {eventDate}
                  </span>

                  <span className="flex items-center gap-2">
                    <Clock size={16} />
                    {eventTime}
                  </span>
                </div>
              </div>
            </div>

            {/* Event details */}
            <div className="rounded-2xl border border-[#E5E8F0] bg-white p-6 shadow-sm dark:border-[#343B59] dark:bg-[#1D2340] sm:p-8">
              <h2 className="text-2xl font-bold text-[#252B42] dark:text-white">
                {title}
              </h2>

              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <InfoItem
                  icon={<CalendarDays />}
                  label="Event Date"
                  value={eventDate}
                />

                <InfoItem
                  icon={<Clock />}
                  label="Event Time"
                  value={eventTime}
                />

                <div className="sm:col-span-2">
                  <InfoItem
                    icon={<MapPin />}
                    label="Location"
                    value={event.location || "Location not specified"}
                  />
                </div>
              </div>

              <hr className="my-8 border-[#E5E8F0] dark:border-[#343B59]" />

              <h2 className="text-xl font-bold text-[#252B42] dark:text-white">
                About This Event
              </h2>

              <p className="mt-4 whitespace-pre-line leading-7 text-[#737B91] dark:text-[#AAB1C8]">
                {event.description || "No event description is available."}
              </p>
            </div>
          </section>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Join card */}
            <div className="rounded-2xl border border-[#E5E8F0] bg-white p-6 shadow-sm dark:border-[#343B59] dark:bg-[#1D2340]">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-[#E9EAFE] p-3 dark:bg-[#292E50]">
                  <HeartHandshake className="h-6 w-6 text-[#6477E8]" />
                </div>

                <div>
                  <p className="text-sm text-[#737B91] dark:text-[#AAB1C8]">
                    Community Volunteers
                  </p>

                  <p className="text-2xl font-bold text-[#252B42] dark:text-white">
                    {volunteerCount}
                  </p>
                </div>
              </div>

              <button
                onClick={handleJoinToggle}
                disabled={joining || (Boolean(initialUser) && !token)}
                className={`mt-6 flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-60 ${
                  isJoined
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-[#6477E8] hover:bg-[#5367D5]"
                }`}
              >
                {joining ? (
                  <LoaderCircle className="h-5 w-5 animate-spin" />
                ) : (
                  <HeartHandshake size={19} />
                )}

                {joining
                  ? "Please wait..."
                  : isJoined
                    ? "Leave Event"
                    : "Join This Event"}
              </button>

              <button
                onClick={handleShare}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-[#E5E8F0] px-5 py-3 font-semibold text-[#252B42] hover:bg-[#F7F8FC] dark:border-[#343B59] dark:text-white dark:hover:bg-[#292E50]"
              >
                <Share2 size={18} />
                Share Event
              </button>

              {!initialUser && (
                <p className="mt-4 text-center text-xs text-[#737B91] dark:text-[#AAB1C8]">
                  Please sign in to join this event.
                </p>
              )}
            </div>

            {/* Organizer */}
            <div className="rounded-2xl border border-[#E5E8F0] bg-white p-6 shadow-sm dark:border-[#343B59] dark:bg-[#1D2340]">
              <h2 className="font-bold text-[#252B42] dark:text-white">
                Event Organizer
              </h2>

              <div className="mt-4 flex items-center gap-3">
                <div className="rounded-full bg-[#E9EAFE] p-3 dark:bg-[#292E50]">
                  <UserRound className="text-[#6477E8]" />
                </div>

                <div>
                  <p className="font-semibold text-[#252B42] dark:text-white">
                    {event.organizerName ||
                      event.creatorName ||
                      "Community Organizer"}
                  </p>

                  <p className="text-xs text-[#737B91] dark:text-[#AAB1C8]">
                    Event Organizer
                  </p>
                </div>
              </div>
            </div>

            {/* Volunteers */}
            <div className="rounded-2xl border border-[#E5E8F0] bg-white p-6 shadow-sm dark:border-[#343B59] dark:bg-[#1D2340]">
              <div className="flex items-center justify-between">
                <h2 className="font-bold text-[#252B42] dark:text-white">
                  Volunteers
                </h2>

                <span className="rounded-full bg-[#E9EAFE] px-3 py-1 text-xs font-bold text-[#5367D5] dark:bg-[#292E50] dark:text-[#AAB1FF]">
                  {volunteerCount}
                </span>
              </div>

              {volunteers.length > 0 ? (
                <div className="mt-5 space-y-4">
                  {volunteers.map((volunteer, index) => (
                    <div
                      key={`${volunteer.name}-${index}`}
                      className="flex items-center gap-3"
                    >
                      {volunteer.image ? (
                        <img
                          src={volunteer.image}
                          alt={volunteer.name}
                          className="h-10 w-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E9EAFE] dark:bg-[#292E50]">
                          <Users
                            size={18}
                            className="text-[#6477E8]"
                          />
                        </div>
                      )}

                      <p className="text-sm font-medium text-[#252B42] dark:text-white">
                        {volunteer.name}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center">
                  <Users className="mx-auto h-9 w-9 text-[#AAB1C8]" />

                  <p className="mt-3 text-sm text-[#737B91] dark:text-[#AAB1C8]">
                    No volunteers yet. Be the first to join!
                  </p>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

// Reusable information item.
function InfoItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="rounded-xl bg-[#E9EAFE] p-3 dark:bg-[#292E50]">
        <span className="text-[#6477E8]">{icon}</span>
      </div>

      <div>
        <p className="text-xs text-[#737B91] dark:text-[#AAB1C8]">
          {label}
        </p>

        <p className="font-semibold text-[#252B42] dark:text-white">
          {value}
        </p>
      </div>
    </div>
  );
}
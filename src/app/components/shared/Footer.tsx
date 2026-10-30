
// import Link from "next/link";
// import {
//   HeartHandshake,
//   Facebook,
//   Instagram,
//   Linkedin,
//   Mail,
//   MapPin,
// } from "lucide-react";

// export default function Footer() {
//   return (
//     <footer className="border-t border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-950">

//       <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">

//         {/* Brand Information */}
//         <div>
//           <Link href="/" className="mb-4 flex items-center gap-2">
//             <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white">
//               <HeartHandshake size={24} />
//             </div>

//             <span className="text-xl font-bold text-gray-900 dark:text-white">
//               Cat<span className="text-emerald-600">-</span>Hermione
//             </span>
//           </Link>

//           <p className="max-w-xs text-sm leading-7 text-gray-600 dark:text-gray-400">
//             Bringing people together to create positive changes through
//             community service, volunteering, and social development.
//           </p>

//           <div className="mt-5 flex gap-3">
//             <a href="#" aria-label="Facebook" className="rounded-full bg-white p-2 text-gray-600 shadow-sm transition hover:bg-emerald-600 hover:text-white dark:bg-gray-900 dark:text-gray-300">
//               <Facebook size={18} />
//             </a>
//             <a href="#" aria-label="Instagram" className="rounded-full bg-white p-2 text-gray-600 shadow-sm transition hover:bg-emerald-600 hover:text-white dark:bg-gray-900 dark:text-gray-300">
//               <Instagram size={18} />
//             </a>
//             <a href="#" aria-label="LinkedIn" className="rounded-full bg-white p-2 text-gray-600 shadow-sm transition hover:bg-emerald-600 hover:text-white dark:bg-gray-900 dark:text-gray-300">
//               <Linkedin size={18} />
//             </a>
//           </div>
//         </div>

//         {/* Quick Links */}
//         <div>
//           <h3 className="mb-5 font-semibold text-gray-900 dark:text-white">
//             Quick Links
//           </h3>

//           <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
//             <li>
//               <Link href="/" className="transition hover:text-emerald-600">
//                 Home
//               </Link>
//             </li>
//             <li>
//               <Link href="/events" className="transition hover:text-emerald-600">
//                 Upcoming Events
//               </Link>
//             </li>
//             <li>
//               <Link href="/login" className="transition hover:text-emerald-600">
//                 Login
//               </Link>
//             </li>
//             <li>
//               <Link href="/register" className="transition hover:text-emerald-600">
//                 Register
//               </Link>
//             </li>
//           </ul>
//         </div>

//         {/* Community */}
//         <div>
//           <h3 className="mb-5 font-semibold text-gray-900 dark:text-white">
//             Our Community
//           </h3>

//           <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
//             <li>
//               <Link href="/events" className="transition hover:text-emerald-600">
//                 Explore Events
//               </Link>
//             </li>
//             <li>
//               <Link href="/create-event" className="transition hover:text-emerald-600">
//                 Create an Event
//               </Link>
//             </li>
//             <li>
//               <Link href="/joined-events" className="transition hover:text-emerald-600">
//                 Joined Events
//               </Link>
//             </li>
//           </ul>
//         </div>

//         {/* Contact */}
//         <div>
//           <h3 className="mb-5 font-semibold text-gray-900 dark:text-white">
//             Contact Us
//           </h3>

//           <ul className="space-y-4 text-sm text-gray-600 dark:text-gray-400">
//             <li className="flex items-center gap-3">
//               <Mail size={18} className="text-emerald-600" />
//               <span>contact@example.com</span>
//             </li>

//             <li className="flex items-center gap-3">
//               <MapPin size={18} className="text-emerald-600" />
//               <span>Community Service Platform</span>
//             </li>
//           </ul>
//         </div>
//       </div>

//       {/* Copyright */}
//       <div className="border-t border-gray-200 dark:border-gray-800">
//         <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 text-center text-sm text-gray-500 sm:px-6 md:flex-row lg:px-8">
//           <p>
//             © {new Date().getFullYear()} Cat-Hermione. All rights reserved.
//           </p>

//           <p>
//             Made with{" "}
//             <span className="font-semibold text-emerald-600">
//               care for our community
//             </span>
//           </p>
//         </div>
//       </div>

//     </footer>
//   );
// }

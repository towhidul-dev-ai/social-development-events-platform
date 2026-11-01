"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  CalendarDays,
  Compass,
  HeartHandshake,
  Home,
} from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-[80vh] items-center justify-center bg-[#F7F8FC] px-4 py-16 text-[#252B42] transition-colors duration-300 dark:bg-[#14182B] dark:text-white">
      <div className="mx-auto w-full max-w-2xl text-center">
        {/* Illustration */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative mx-auto mb-8 flex h-52 w-52 items-center justify-center rounded-full bg-[#E9EAFE] dark:bg-[#1D2340]"
        >
          <div className="absolute inset-5 rounded-full border-2 border-dashed border-[#6477E8]/40" />

          <div className="flex h-32 w-32 items-center justify-center rounded-full bg-white shadow-lg dark:bg-[#292E50]">
            <Compass className="h-16 w-16 text-[#6477E8] dark:text-[#8998FF]" />
          </div>

          <span className="absolute right-5 top-5 rounded-full bg-white p-3 shadow-md dark:bg-[#292E50]">
            <CalendarDays className="h-6 w-6 text-[#6477E8] dark:text-[#8998FF]" />
          </span>

          <span className="absolute bottom-5 left-4 rounded-full bg-white p-3 shadow-md dark:bg-[#292E50]">
            <HeartHandshake className="h-6 w-6 text-[#6477E8] dark:text-[#8998FF]" />
          </span>
        </motion.div>

        {/* Error Code */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-8xl font-extrabold tracking-tight text-[#6477E8] dark:text-[#8998FF] sm:text-9xl"
        >
          404
        </motion.h1>

        <h2 className="mt-4 text-2xl font-bold sm:text-3xl">
          Oops! Page Not Found
        </h2>

        <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-[#737B91] dark:text-[#AAB1C8] sm:text-base">
          Looks like this page has wandered off. The page you are looking for
          may have been moved, deleted, or never existed.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#6477E8] px-6 py-3 font-semibold text-white shadow-md shadow-[#6477E8]/20 transition hover:bg-[#5367D5]"
          >
            <Home className="h-5 w-5" />
            Back to Home
          </Link>

          <Link
            href="/upcoming-events"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#E5E8F0] bg-white px-6 py-3 font-semibold text-[#252B42] transition hover:border-[#6477E8] hover:text-[#6477E8] dark:border-[#343B59] dark:bg-[#1D2340] dark:text-white dark:hover:border-[#8998FF] dark:hover:text-[#8998FF]"
          >
            <ArrowLeft className="h-5 w-5" />
            Explore Events
          </Link>
        </div>

        <p className="mt-10 text-sm text-[#737B91] dark:text-[#AAB1C8]">
          Made with care by{" "}
          <span className="font-semibold text-[#6477E8] dark:text-[#8998FF]">
            GoodGather
          </span>
        </p>
      </div>
    </main>
  );
}
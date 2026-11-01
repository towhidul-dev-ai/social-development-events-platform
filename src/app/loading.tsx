"use client";

import { motion } from "framer-motion";
import { HeartHandshake, LoaderCircle } from "lucide-react";

export default function Loading() {
  return (
    <main className="flex min-h-[80vh] items-center justify-center bg-[#F7F8FC] px-4 text-[#252B42] transition-colors duration-300 dark:bg-[#14182B] dark:text-white">
      <div className="flex flex-col items-center text-center">
        {/* Logo */}
        <motion.div
          animate={{ scale: [1, 1.08, 1] }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-[#E9EAFE] dark:bg-[#1D2340]"
        >
          <HeartHandshake className="h-10 w-10 text-[#6477E8] dark:text-[#8998FF]" />
        </motion.div>

        {/* Brand */}
        <h2 className="text-2xl font-bold tracking-tight">
          Good<span className="text-[#6477E8] dark:text-[#8998FF]">Gather</span>
        </h2>

        {/* Loading Spinner */}
        <div className="mt-8 flex items-center gap-3">
          <LoaderCircle className="h-6 w-6 animate-spin text-[#6477E8] dark:text-[#8998FF]" />

          <p className="text-sm font-medium text-[#737B91] dark:text-[#AAB1C8]">
            Bringing people together...
          </p>
        </div>

        {/* Loading Bar */}
        <div className="mt-6 h-1.5 w-48 overflow-hidden rounded-full bg-[#E5E8F0] dark:bg-[#343B59]">
          <motion.div
            animate={{ x: ["-100%", "200%"] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="h-full w-1/2 rounded-full bg-[#6477E8] dark:bg-[#8998FF]"
          />
        </div>

        <p className="mt-6 text-xs text-[#737B91] dark:text-[#AAB1C8]">
          Please wait while we prepare everything for you.
        </p>
      </div>
    </main>
  );
}
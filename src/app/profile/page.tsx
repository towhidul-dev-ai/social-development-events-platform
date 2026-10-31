
"use client";

import { UserRound, Mail } from "lucide-react";

import { authClient } from "@/lib/auth-client";
import UserInfo from "../components/shared/UserInfo";


export default function ProfilePage() {
  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;

  // Wait until the session check is complete.
  if (isPending) {
    return null;
  }

  // Proxy.js will handle redirecting unauthenticated users later.
  if (!user) {
    return null;
  }

  return (
    <main className="min-h-screen bg-[#F7F8FC] px-4 py-12 dark:bg-[#14182B]">
      <div className="mx-auto max-w-4xl">

        {/* Page Heading */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#252B42] dark:text-white">
            My Profile
          </h1>

          <p className="mt-2 text-sm text-[#737B91]">
            Manage and view your account information.
          </p>
        </div>

        {/* User Information */}
        <UserInfo
          user={user}
          accountLinks={[]}
          variant="card"
        />

        {/* Account Details */}
        <section className="mt-8 rounded-2xl border border-[#E5E8F0] bg-white p-6 dark:border-[#343B59] dark:bg-[#1D2340]">
          <h2 className="mb-5 text-lg font-semibold text-[#252B42] dark:text-white">
            Account Information
          </h2>

          <div className="space-y-5">

            {/* Full Name */}
            <div className="flex items-center gap-3">
              <UserRound className="text-[#6477E8]" size={20} />

              <div>
                <p className="text-xs text-[#737B91]">
                  Full Name
                </p>

                <p className="text-sm font-medium text-[#252B42] dark:text-white">
                  {user.name || "Not provided"}
                </p>
              </div>
            </div>

            {/* Email Address */}
            <div className="flex items-center gap-3">
              <Mail className="text-[#6477E8]" size={20} />

              <div>
                <p className="text-xs text-[#737B91]">
                  Email Address
                </p>

                <p className="text-sm font-medium text-[#252B42] dark:text-white">
                  {user.email}
                </p>
              </div>
            </div>

          </div>
        </section>

      </div>
    </main>
  );
}

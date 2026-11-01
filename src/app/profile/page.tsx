
"use client";

import { useEffect, useState } from "react";
import { UserRound, Mail, Pencil, Save, X, Loader2, Camera } from "lucide-react";
import { toast } from "sonner";

import { authClient } from "@/lib/auth-client";
import UserInfo from "../components/shared/UserInfo";

export default function ProfilePage() {
  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setImage(user.image || "");
    }
  }, [user]);

  if (isPending) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F7F8FC] dark:bg-[#14182B]">
        <Loader2 className="animate-spin text-[#6477E8]" size={32} />
      </main>
    );
  }

  if (!user) {
    return null;
  }

  const handleCancel = () => {
    setName(user.name || "");
    setImage(user.image || "");
    setIsEditing(false);
  };

  const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedName = name.trim();
    const trimmedImage = image.trim();

    if (!trimmedName) {
      toast.error("Please enter your name.");
      return;
    }

    if (trimmedImage) {
      try {
        const parsedUrl = new URL(trimmedImage);

        if (!["http:", "https:"].includes(parsedUrl.protocol)) {
          toast.error("Please enter a valid image URL.");
          return;
        }
      } catch {
        toast.error("Please enter a valid image URL.");
        return;
      }
    }

    try {
      setIsSaving(true);

      const { error } = await authClient.updateUser({
        name: trimmedName,
        image: trimmedImage || null,
      });

      if (error) {
        throw new Error(error.message || "Failed to update profile.");
      }

      toast.success("Profile updated successfully!");
      setIsEditing(false);

      // Refresh the current session data.
      await authClient.getSession();
    } catch (error) {
      console.error("Profile update error:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F7F8FC] px-4 py-12 dark:bg-[#14182B]">
      <div className="mx-auto max-w-4xl">

        {/* Page Heading */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[#252B42] dark:text-white">
              My Profile
            </h1>

            <p className="mt-2 text-sm text-[#737B91] dark:text-[#AAB1C8]">
              Manage and update your account information.
            </p>
          </div>

          {!isEditing && (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-[#6477E8] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#5367D5]"
            >
              <Pencil size={17} />
              Edit Profile
            </button>
          )}
        </div>

        {/* User Information */}
        {!isEditing && (
          <>
            <UserInfo
              user={user}
              accountLinks={[]}
              variant="card"
            />

            <section className="mt-8 rounded-2xl border border-[#E5E8F0] bg-white p-6 dark:border-[#343B59] dark:bg-[#1D2340]">
              <h2 className="mb-5 text-lg font-semibold text-[#252B42] dark:text-white">
                Account Information
              </h2>

              <div className="space-y-5">
                <div className="flex items-center gap-3">
                  <UserRound className="text-[#6477E8]" size={20} />

                  <div>
                    <p className="text-xs text-[#737B91] dark:text-[#AAB1C8]">
                      Full Name
                    </p>

                    <p className="text-sm font-medium text-[#252B42] dark:text-white">
                      {user.name || "Not provided"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="text-[#6477E8]" size={20} />

                  <div>
                    <p className="text-xs text-[#737B91] dark:text-[#AAB1C8]">
                      Email Address
                    </p>

                    <p className="text-sm font-medium text-[#252B42] dark:text-white">
                      {user.email}
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}

        {/* Edit Profile Form */}
        {isEditing && (
          <section className="rounded-2xl border border-[#E5E8F0] bg-white p-6 shadow-sm dark:border-[#343B59] dark:bg-[#1D2340] sm:p-8">
            <div className="mb-7">
              <h2 className="text-xl font-bold text-[#252B42] dark:text-white">
                Edit Your Profile
              </h2>

              <p className="mt-2 text-sm text-[#737B91] dark:text-[#AAB1C8]">
                Update your display name and profile picture.
              </p>
            </div>

            <form onSubmit={handleUpdateProfile} className="space-y-6">

              {/* Profile Image Preview */}
              <div className="flex flex-col items-center gap-3">
                <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border-4 border-[#E9EAFE] bg-[#E9EAFE] dark:border-[#343B59] dark:bg-[#292E50]">
                  {image.trim() ? (
                    <img
                      src={image}
                      alt="Profile preview"
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  ) : (
                    <UserRound size={45} className="text-[#6477E8]" />
                  )}
                </div>

                <span className="flex items-center gap-2 text-xs text-[#737B91] dark:text-[#AAB1C8]">
                  <Camera size={15} />
                  Profile Picture Preview
                </span>
              </div>

              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-semibold text-[#252B42] dark:text-white"
                >
                  Full Name
                </label>

                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  required
                  maxLength={80}
                  className="w-full rounded-xl border border-[#E5E8F0] bg-[#F7F8FC] px-4 py-3 text-sm text-[#252B42] outline-none transition focus:border-[#6477E8] focus:ring-2 focus:ring-[#6477E8]/20 dark:border-[#343B59] dark:bg-[#14182B] dark:text-white"
                />
              </div>

              {/* Profile Image URL */}
              <div>
                <label
                  htmlFor="image"
                  className="mb-2 block text-sm font-semibold text-[#252B42] dark:text-white"
                >
                  Profile Picture URL
                </label>

                <input
                  id="image"
                  type="url"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="https://example.com/profile.jpg"
                  className="w-full rounded-xl border border-[#E5E8F0] bg-[#F7F8FC] px-4 py-3 text-sm text-[#252B42] outline-none transition focus:border-[#6477E8] focus:ring-2 focus:ring-[#6477E8]/20 dark:border-[#343B59] dark:bg-[#14182B] dark:text-white"
                />

                <p className="mt-2 text-xs text-[#9299AC]">
                  Paste a publicly accessible image URL.
                </p>
              </div>

              {/* Email - Read Only */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-[#252B42] dark:text-white"
                >
                  Email Address
                </label>

                <input
                  id="email"
                  type="email"
                  value={user.email}
                  readOnly
                  className="w-full cursor-not-allowed rounded-xl border border-[#E5E8F0] bg-gray-100 px-4 py-3 text-sm text-[#737B91] outline-none dark:border-[#343B59] dark:bg-[#292E50] dark:text-[#AAB1C8]"
                />

                <p className="mt-2 text-xs text-[#9299AC]">
                  Your registered email address cannot be changed here.
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-col-reverse gap-3 border-t border-[#E5E8F0] pt-6 dark:border-[#343B59] sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={isSaving}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#E5E8F0] px-5 py-3 text-sm font-semibold text-[#737B91] transition hover:bg-[#F7F8FC] disabled:opacity-50 dark:border-[#343B59] dark:text-[#C1C6D8] dark:hover:bg-[#292E50]"
                >
                  <X size={17} />
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSaving}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#6477E8] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#5367D5] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSaving ? (
                    <Loader2 size={17} className="animate-spin" />
                  ) : (
                    <Save size={17} />
                  )}

                  {isSaving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </section>
        )}
      </div>
    </main>
  );
}

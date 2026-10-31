
"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  HeartHandshake,
  User,
  Mail,
  Lock,
  Image as ImageIcon,
  Eye,
  EyeOff,
  ArrowRight,
  Check,
  X,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasMinLength = password.length >= 6;

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Please enter your full name.");
      return;
    }

    if (!hasUppercase || !hasLowercase || !hasMinLength) {
      setError("Please meet all password requirements.");
      return;
    }

    setLoading(true);

    try {
      const { error } = await authClient.signUp.email({
        name: name.trim(),
        email: email.trim(),
        password,
        image: photoURL.trim() || undefined,
        callbackURL: "/",
      });

      if (error) {
        setError(error.message || "Registration failed.");
        return;
      }

      router.push("/");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // const handleGoogleRegister = async () => {
  //   setError("");
  //   setLoading(true);

  //   try {
  //     await authClient.signIn.social({
  //       provider: "google",
  //       callbackURL: "/",
  //     });
  //   } catch {
  //     setError("Google registration failed. Please try again.");
  //     setLoading(false);
  //   }
  // };

  const handleGithubRegister = async () => {
  try {
    setLoading(true);

    await authClient.signIn.social({
      provider: "github",
      callbackURL: "/",
    });
  } catch (error) {
    console.error("GitHub registration failed:", error);
    toast.error("GitHub registration failed. Please try again.");
    setLoading(false);
  }
};

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F7F8FC] px-4 py-10">
      <div className="w-full max-w-md rounded-3xl border border-[#E5E8F0] bg-white p-6 shadow-xl shadow-[#252B42]/5 sm:p-9">

        {/* Logo */}
        <div className="text-center">
          <Link
            href="/"
            className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#6477E8] text-white shadow-lg shadow-[#6477E8]/20"
          >
            <HeartHandshake size={25} />
          </Link>

          <h1 className="mt-5 text-3xl font-bold text-[#252B42]">
            Create Account
          </h1>

          <p className="mt-2 text-sm text-[#737B91]">
            Join the community and start driving social change.
          </p>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleRegister} className="mt-8 space-y-5">

          {/* Full Name */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-[#252B42]">
              Full Name
            </label>

            <div className="flex h-12 items-center gap-3 rounded-xl border border-[#E5E8F0] bg-[#F7F8FC] px-4 focus-within:border-[#6477E8]">
              <User size={18} className="text-[#737B91]" />

              <input
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
                required
                className="w-full bg-transparent text-sm text-[#252B42] outline-none placeholder:text-[#A5ABC0]"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-[#252B42]">
              Email Address
            </label>

            <div className="flex h-12 items-center gap-3 rounded-xl border border-[#E5E8F0] bg-[#F7F8FC] px-4 focus-within:border-[#6477E8]">
              <Mail size={18} className="text-[#737B91]" />

              <input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
                className="w-full bg-transparent text-sm text-[#252B42] outline-none placeholder:text-[#A5ABC0]"
              />
            </div>
          </div>

          {/* Profile Photo */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-[#252B42]">
              Profile Photo URL
            </label>

            <div className="flex h-12 items-center gap-3 rounded-xl border border-[#E5E8F0] bg-[#F7F8FC] px-4 focus-within:border-[#6477E8]">
              <ImageIcon size={18} className="text-[#737B91]" />

              <input
                type="url"
                placeholder="https://example.com/photo.jpg"
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
                className="w-full bg-transparent text-sm text-[#252B42] outline-none placeholder:text-[#A5ABC0]"
              />
            </div>

            <p className="mt-2 text-xs text-[#737B91]">
              Optional: Leave empty for the default avatar.
            </p>
          </div>

          {/* Password */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-[#252B42]">
              Password
            </label>

            <div className="flex h-12 items-center gap-3 rounded-xl border border-[#E5E8F0] bg-[#F7F8FC] px-4 focus-within:border-[#6477E8]">
              <Lock size={18} className="text-[#737B91]" />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                required
                className="w-full bg-transparent text-sm text-[#252B42] outline-none placeholder:text-[#A5ABC0]"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="text-[#737B91] hover:text-[#6477E8]"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Password Requirements */}
            <div className="mt-3 space-y-2">
              <p className={`flex items-center gap-2 text-xs ${hasUppercase ? "text-green-600" : "text-[#737B91]"}`}>
                {hasUppercase ? <Check size={15} /> : <X size={15} />}
                At least one uppercase letter (A-Z)
              </p>

              <p className={`flex items-center gap-2 text-xs ${hasLowercase ? "text-green-600" : "text-[#737B91]"}`}>
                {hasLowercase ? <Check size={15} /> : <X size={15} />}
                At least one lowercase letter (a-z)
              </p>

              <p className={`flex items-center gap-2 text-xs ${hasMinLength ? "text-green-600" : "text-[#737B91]"}`}>
                {hasMinLength ? <Check size={15} /> : <X size={15} />}
                Minimum 6 characters length
              </p>
            </div>
          </div>

          {/* Error */}
          {error && (
            <p
              role="alert"
              className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"
            >
              {error}
            </p>
          )}

          {/* Register Button */}
          <button
            type="submit"
            disabled={loading}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#6477E8] text-sm font-semibold text-white shadow-md shadow-[#6477E8]/20 transition hover:bg-[#5367D5] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Register"}
            {!loading && <ArrowRight size={18} />}
          </button>
        </form>

        {/* Google */}
        {/* <div className="my-7 flex items-center gap-4">
          <div className="h-px flex-1 bg-[#E5E8F0]" />
          <span className="text-xs font-medium text-[#737B91]">
            OR CONTINUE WITH
          </span>
          <div className="h-px flex-1 bg-[#E5E8F0]" />
        </div>

        <button
          type="button"
          onClick={handleGoogleRegister}
          disabled={loading}
          className="flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-[#E5E8F0] bg-white text-sm font-semibold text-[#252B42] transition hover:bg-[#F7F8FC] disabled:opacity-60"
        >
          <span className="font-bold text-[#4285F4]">G</span>
          Continue with Google
        </button> */}

        {/* GitHub */}
        <button
        type="button"
        onClick={handleGithubRegister}
        disabled={loading}
        className="mt-3 flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-[#E5E8F0] bg-white text-sm font-semibold text-[#252B42] transition hover:bg-[#F7F8FC] disabled:opacity-60"
        >
      <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="currentColor"
      aria-hidden="true"
       >
      <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.55.1.76-.24.76-.54v-2.08c-3.1.67-3.75-1.32-3.75-1.32-.5-1.29-1.24-1.63-1.24-1.63-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15.99 1.7 2.6 1.21 3.23.93.1-.72.39-1.21.71-1.49-2.47-.28-5.07-1.24-5.07-5.5 0-1.22.44-2.22 1.15-3-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.05 1.14a10.6 10.6 0 0 1 5.55 0c2.12-1.44 3.05-1.14 3.05-1.14.61 1.54.23 2.68.12 2.96.71.78 1.14 1.78 1.14 3 0 4.27-2.6 5.21-5.08 5.49.4.35.75 1.02.75 2.06v3.07c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z" />
      </svg>
      Continue with GitHub
      </button>

        {/* Login Link */}
        <p className="mt-7 text-center text-sm text-[#737B91]">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-[#6477E8] hover:text-[#5367D5]"
          >
            Login here
          </Link>
        </p>
      </div>
    </main>
  );
}

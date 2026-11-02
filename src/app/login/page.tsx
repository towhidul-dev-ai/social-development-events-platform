
// "use client";

// import { useState, type FormEvent } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import {
//   HeartHandshake,
//   Mail,
//   Lock,
//   Eye,
//   EyeOff,
//   ArrowRight,
//   AlertCircle,
//   Loader2,
// } from "lucide-react";
// import { authClient } from "@/lib/auth-client";
// import { toast } from "sonner";

// type LoginErrors = {
//   email?: string;
//   password?: string;
// };

// export default function LoginPage() {
//   const router = useRouter();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [errors, setErrors] = useState<LoginErrors>({});
//   const [error, setError] = useState("");

//   // Validate login fields.
//   const validateForm = (): LoginErrors => {
//     const newErrors: LoginErrors = {};
//     const trimmedEmail = email.trim();

//     if (!trimmedEmail) {
//       newErrors.email = "Email address is required.";
//     } else if (
//       !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)
//     ) {
//       newErrors.email = "Please enter a valid email address.";
//     }

//     if (!password) {
//       newErrors.password = "Password is required.";
//     } else if (password.length < 6) {
//       newErrors.password =
//         "Password must contain at least 6 characters.";
//     }

//     return newErrors;
//   };

//   // Handle field changes.
//   const handleEmailChange = (value: string) => {
//     setEmail(value);
//     setErrors((previous) => ({
//       ...previous,
//       email: undefined,
//     }));
//     setError("");
//   };

//   const handlePasswordChange = (value: string) => {
//     setPassword(value);
//     setErrors((previous) => ({
//       ...previous,
//       password: undefined,
//     }));
//     setError("");
//   };

//   // Email and password login.
//   const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     if (loading) return;

//     setError("");

//     const validationErrors = validateForm();
//     setErrors(validationErrors);

//     if (Object.keys(validationErrors).length > 0) {
//       return;
//     }

//     setLoading(true);

//     try {
//       const { error: authError } = await authClient.signIn.email({
//         email: email.trim(),
//         password,
//         callbackURL: "/",
//       });

//       if (authError) {
//         setError(
//           authError.message || "Invalid email or password."
//         );
//         return;
//       }

//       toast.success("Login successful!");

//       router.push("/");
//       router.refresh();
//     } catch (err) {
//       console.error("Login failed:", err);
//       setError("Something went wrong. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // GitHub login.
//   const handleGithubLogin = async () => {
//     if (loading) return;

//     setError("");
//     setLoading(true);

//     try {
//       await authClient.signIn.social({
//         provider: "github",
//         callbackURL: "/",
//       });
//     } catch (err) {
//       console.error("GitHub login failed:", err);
//       toast.error("GitHub login failed. Please try again.");
//       setLoading(false);
//     }
//   };

//   const inputClass = (hasError: boolean) =>
//     `w-full bg-transparent text-sm text-[#252B42] outline-none placeholder:text-[#A5ABC0] ${
//       hasError ? "placeholder:text-red-300" : ""
//     }`;

//   return (
//     <main className="flex min-h-screen items-center justify-center bg-[#F7F8FC] px-4 py-10">
//       <div className="w-full max-w-md rounded-3xl border border-[#E5E8F0] bg-white p-6 shadow-xl shadow-[#252B42]/5 sm:p-9">

//         {/* Logo and Heading */}
//         <div className="text-center">
//           <Link
//             href="/"
//             className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#6477E8] text-white shadow-lg shadow-[#6477E8]/20"
//           >
//             <HeartHandshake size={25} />
//           </Link>

//           <h1 className="mt-5 text-3xl font-bold text-[#252B42]">
//             Welcome Back
//           </h1>

//           <p className="mt-2 text-sm text-[#737B91]">
//             Sign in to organize and join community drives.
//           </p>
//         </div>

//         {/* Login Form */}
//         <form onSubmit={handleLogin} noValidate className="mt-9 space-y-5">

//           {/* Email */}
//           <div>
//             <label
//               htmlFor="email"
//               className="mb-2 block text-sm font-semibold text-[#252B42]"
//             >
//               Email <span className="text-red-500">*</span>
//             </label>

//             <div
//               className={`flex h-12 items-center gap-3 rounded-xl border bg-[#F7F8FC] px-4 transition focus-within:border-[#6477E8] ${
//                 errors.email
//                   ? "border-red-400"
//                   : "border-[#E5E8F0]"
//               }`}
//             >
//               <Mail
//                 size={18}
//                 className={
//                   errors.email ? "text-red-400" : "text-[#737B91]"
//                 }
//               />

//               <input
//                 id="email"
//                 type="email"
//                 placeholder="name@example.com"
//                 value={email}
//                 onChange={(e) => handleEmailChange(e.target.value)}
//                 autoComplete="email"
//                 aria-invalid={!!errors.email}
//                 aria-describedby={errors.email ? "email-error" : undefined}
//                 disabled={loading}
//                 className={inputClass(!!errors.email)}
//               />
//             </div>

//             {errors.email && (
//               <p
//                 id="email-error"
//                 className="mt-2 flex items-center gap-1.5 text-xs font-medium text-red-500"
//               >
//                 <AlertCircle size={14} />
//                 {errors.email}
//               </p>
//             )}
//           </div>

//           {/* Password */}
//           <div>
//             <label
//               htmlFor="password"
//               className="mb-2 block text-sm font-semibold text-[#252B42]"
//             >
//               Password <span className="text-red-500">*</span>
//             </label>

//             <div
//               className={`flex h-12 items-center gap-3 rounded-xl border bg-[#F7F8FC] px-4 transition focus-within:border-[#6477E8] ${
//                 errors.password
//                   ? "border-red-400"
//                   : "border-[#E5E8F0]"
//               }`}
//             >
//               <Lock
//                 size={18}
//                 className={
//                   errors.password ? "text-red-400" : "text-[#737B91]"
//                 }
//               />

//               <input
//                 id="password"
//                 type={showPassword ? "text" : "password"}
//                 placeholder="Enter your password"
//                 value={password}
//                 onChange={(e) => handlePasswordChange(e.target.value)}
//                 autoComplete="current-password"
//                 aria-invalid={!!errors.password}
//                 aria-describedby={
//                   errors.password ? "password-error" : undefined
//                 }
//                 disabled={loading}
//                 className={inputClass(!!errors.password)}
//               />

//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 aria-label={
//                   showPassword ? "Hide password" : "Show password"
//                 }
//                 disabled={loading}
//                 className="shrink-0 text-[#737B91] transition hover:text-[#6477E8]"
//               >
//                 {showPassword ? (
//                   <EyeOff size={18} />
//                 ) : (
//                   <Eye size={18} />
//                 )}
//               </button>
//             </div>

//             {errors.password && (
//               <p
//                 id="password-error"
//                 className="mt-2 flex items-center gap-1.5 text-xs font-medium text-red-500"
//               >
//                 <AlertCircle size={14} />
//                 {errors.password}
//               </p>
//             )}
//           </div>

//           {/* Authentication Error */}
//           {error && (
//             <div
//               role="alert"
//               className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"
//             >
//               <AlertCircle size={17} className="shrink-0" />
//               {error}
//             </div>
//           )}

//           {/* Submit Button */}
//           <button
//             type="submit"
//             disabled={loading}
//             className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#6477E8] text-sm font-semibold text-white shadow-md shadow-[#6477E8]/20 transition hover:bg-[#5367D5] disabled:cursor-not-allowed disabled:opacity-60"
//           >
//             {loading ? (
//               <>
//                 <Loader2 size={18} className="animate-spin" />
//                 Signing in...
//               </>
//             ) : (
//               <>
//                 Sign In
//                 <ArrowRight size={18} />
//               </>
//             )}
//           </button>
//         </form>

//         {/* Divider */}
//         <div className="my-7 flex items-center gap-4">
//           <div className="h-px flex-1 bg-[#E5E8F0]" />

//           <span className="text-xs font-medium text-[#737B91]">
//             OR CONTINUE WITH
//           </span>

//           <div className="h-px flex-1 bg-[#E5E8F0]" />
//         </div>

//         {/* GitHub Login */}
//         <button
//           type="button"
//           onClick={handleGithubLogin}
//           disabled={loading}
//           className="flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-[#E5E8F0] bg-white text-sm font-semibold text-[#252B42] transition hover:bg-[#F7F8FC] disabled:cursor-not-allowed disabled:opacity-60"
//         >
//           {loading ? (
//             <Loader2 size={18} className="animate-spin" />
//           ) : (
//             <svg
//               viewBox="0 0 24 24"
//               className="h-5 w-5"
//               fill="currentColor"
//               aria-hidden="true"
//             >
//               <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.55.1.76-.24.76-.54v-2.08c-3.1.67-3.75-1.32-3.75-1.32-.5-1.29-1.24-1.63-1.24-1.63-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15.99 1.7 2.6 1.21 3.23.93.1-.72.39-1.21.71-1.49-2.47-.28-5.07-1.24-5.07-5.5 0-1.22.44-2.22 1.15-3-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.05 1.14a10.6 10.6 0 0 1 5.55 0c2.12-1.44 3.05-1.14 3.05-1.14.61 1.54.23 2.68.12 2.96.71.78 1.14 1.78 1.14 3 0 4.27-2.6 5.21-5.08 5.49.4.35.75 1.02.75 2.06v3.07c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z" />
//             </svg>
//           )}

//           Continue with GitHub
//         </button>

//         {/* Register Link */}
//         <p className="mt-7 text-center text-sm text-[#737B91]">
//           Don&apos;t have an account?{" "}
//           <Link
//             href="/register"
//             className="font-semibold text-[#6477E8] transition hover:text-[#5367D5]"
//           >
//             Register here
//           </Link>
//         </p>
//       </div>
//     </main>
//   );
// }


"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  HeartHandshake,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  AlertCircle,
  Loader2,
  Sun,
  Moon,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

type LoginErrors = {
  email?: string;
  password?: string;
};

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<LoginErrors>({});
  const [error, setError] = useState("");

  // Theme state
  const [isDark, setIsDark] = useState(false);
  const [themeLoaded, setThemeLoaded] = useState(false);

  // Load saved theme
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark =
      document.documentElement.classList.contains("dark");

    const darkMode = savedTheme
      ? savedTheme === "dark"
      : prefersDark;

    setIsDark(darkMode);
    document.documentElement.classList.toggle("dark", darkMode);
    setThemeLoaded(true);
  }, []);

  // Toggle theme
  const toggleTheme = () => {
    const nextTheme = !isDark;

    setIsDark(nextTheme);
    document.documentElement.classList.toggle("dark", nextTheme);
    localStorage.setItem("theme", nextTheme ? "dark" : "light");
  };

  // Validate login fields
  const validateForm = (): LoginErrors => {
    const newErrors: LoginErrors = {};
    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      newErrors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!password) {
      newErrors.password = "Password is required.";
    } else if (password.length < 6) {
      newErrors.password =
        "Password must contain at least 6 characters.";
    }

    return newErrors;
  };

  // Handle email changes
  const handleEmailChange = (value: string) => {
    setEmail(value);

    setErrors((previous) => ({
      ...previous,
      email: undefined,
    }));

    setError("");
  };

  // Handle password changes
  const handlePasswordChange = (value: string) => {
    setPassword(value);

    setErrors((previous) => ({
      ...previous,
      password: undefined,
    }));

    setError("");
  };

  // Email and password login
  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (loading) return;

    setError("");

    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setLoading(true);

    try {
      const { error: authError } = await authClient.signIn.email({
        email: email.trim(),
        password,
        callbackURL: "/",
      });

      if (authError) {
        setError(authError.message || "Invalid email or password.");
        return;
      }

      toast.success("Login successful!");

      router.push("/");
      router.refresh();
    } catch (err) {
      console.error("Login failed:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // GitHub login
  const handleGithubLogin = async () => {
    if (loading) return;

    setError("");
    setLoading(true);

    try {
      await authClient.signIn.social({
        provider: "github",
        callbackURL: "/",
      });
    } catch (err) {
      console.error("GitHub login failed:", err);
      toast.error("GitHub login failed. Please try again.");
      setLoading(false);
    }
  };

  const inputClass = (hasError: boolean) =>
    `w-full bg-transparent text-sm text-[#252B42] outline-none placeholder:text-[#A5ABC0] dark:text-white dark:placeholder:text-[#7F89A8] ${
      hasError ? "placeholder:text-red-300" : ""
    }`;

  return (
    <main className="relative flex min-h-screen items-center justify-center bg-[#F7F8FC] px-4 py-10 transition-colors duration-300 dark:bg-[#14182B]">

      {/* Theme Toggle */}
      <button
        type="button"
        onClick={toggleTheme}
        disabled={!themeLoaded}
        aria-label={
          isDark ? "Switch to light mode" : "Switch to dark mode"
        }
        className="fixed right-5 top-5 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-[#E5E8F0] bg-white text-[#252B42] shadow-md transition hover:scale-105 hover:bg-[#F7F8FC] disabled:opacity-50 dark:border-[#343B59] dark:bg-[#1D2340] dark:text-white dark:hover:bg-[#252B42]"
      >
        {isDark ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      {/* Login Card */}
      <div className="w-full max-w-md rounded-3xl border border-[#E5E8F0] bg-white p-6 shadow-xl shadow-[#252B42]/5 transition-colors duration-300 dark:border-[#343B59] dark:bg-[#1D2340] sm:p-9">

        {/* Logo and Heading */}
        <div className="text-center">
          <Link
            href="/"
            className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#6477E8] text-white shadow-lg shadow-[#6477E8]/20"
          >
            <HeartHandshake size={25} />
          </Link>

          <h1 className="mt-5 text-3xl font-bold text-[#252B42] dark:text-white">
            Welcome Back
          </h1>

          <p className="mt-2 text-sm text-[#737B91] dark:text-[#AAB1C8]">
            Sign in to organize and join community drives.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} noValidate className="mt-9 space-y-5">

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-semibold text-[#252B42] dark:text-white"
            >
              Email <span className="text-red-500">*</span>
            </label>

            <div
              className={`flex h-12 items-center gap-3 rounded-xl border bg-[#F7F8FC] px-4 transition focus-within:border-[#6477E8] dark:bg-[#14182B] ${
                errors.email
                  ? "border-red-400"
                  : "border-[#E5E8F0] dark:border-[#343B59]"
              }`}
            >
              <Mail
                size={18}
                className={
                  errors.email ? "text-red-400" : "text-[#737B91]"
                }
              />

              <input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => handleEmailChange(e.target.value)}
                autoComplete="email"
                aria-invalid={!!errors.email}
                aria-describedby={
                  errors.email ? "email-error" : undefined
                }
                disabled={loading}
                className={inputClass(!!errors.email)}
              />
            </div>

            {errors.email && (
              <p
                id="email-error"
                className="mt-2 flex items-center gap-1.5 text-xs font-medium text-red-500"
              >
                <AlertCircle size={14} />
                {errors.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-semibold text-[#252B42] dark:text-white"
            >
              Password <span className="text-red-500">*</span>
            </label>

            <div
              className={`flex h-12 items-center gap-3 rounded-xl border bg-[#F7F8FC] px-4 transition focus-within:border-[#6477E8] dark:bg-[#14182B] ${
                errors.password
                  ? "border-red-400"
                  : "border-[#E5E8F0] dark:border-[#343B59]"
              }`}
            >
              <Lock
                size={18}
                className={
                  errors.password ? "text-red-400" : "text-[#737B91]"
                }
              />

              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => handlePasswordChange(e.target.value)}
                autoComplete="current-password"
                aria-invalid={!!errors.password}
                aria-describedby={
                  errors.password ? "password-error" : undefined
                }
                disabled={loading}
                className={inputClass(!!errors.password)}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={
                  showPassword ? "Hide password" : "Show password"
                }
                disabled={loading}
                className="shrink-0 text-[#737B91] transition hover:text-[#6477E8]"
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>

            {errors.password && (
              <p
                id="password-error"
                className="mt-2 flex items-center gap-1.5 text-xs font-medium text-red-500"
              >
                <AlertCircle size={14} />
                {errors.password}
              </p>
            )}
          </div>

          {/* Authentication Error */}
          {error && (
            <div
              role="alert"
              className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-300"
            >
              <AlertCircle size={17} className="shrink-0" />
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#6477E8] text-sm font-semibold text-white shadow-md shadow-[#6477E8]/20 transition hover:bg-[#5367D5] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Signing in...
              </>
            ) : (
              <>
                Sign In
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="my-7 flex items-center gap-4">
          <div className="h-px flex-1 bg-[#E5E8F0] dark:bg-[#343B59]" />

          <span className="text-xs font-medium text-[#737B91] dark:text-[#AAB1C8]">
            OR CONTINUE WITH
          </span>

          <div className="h-px flex-1 bg-[#E5E8F0] dark:bg-[#343B59]" />
        </div>

        {/* GitHub Login */}
        <button
          type="button"
          onClick={handleGithubLogin}
          disabled={loading}
          className="flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-[#E5E8F0] bg-white text-sm font-semibold text-[#252B42] transition hover:bg-[#F7F8FC] disabled:cursor-not-allowed disabled:opacity-60 dark:border-[#343B59] dark:bg-[#1D2340] dark:text-white dark:hover:bg-[#252B42]"
        >
          {loading ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.55.1.76-.24.76-.54v-2.08c-3.1.67-3.75-1.32-3.75-1.32-.5-1.29-1.24-1.63-1.24-1.63-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15.99 1.7 2.6 1.21 3.23.93.1-.72.39-1.21.71-1.49-2.47-.28-5.07-1.24-5.07-5.5 0-1.22.44-2.22 1.15-3-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.05 1.14a10.6 10.6 0 0 1 5.55 0c2.12-1.44 3.05-1.14 3.05-1.14.61 1.54.23 2.68.12 2.96.71.78 1.14 1.78 1.14 3 0 4.27-2.6 5.21-5.08 5.49.4.35.75 1.02.75 2.06v3.07c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z" />
            </svg>
          )}

          Continue with GitHub
        </button>

        {/* Register Link */}
        <p className="mt-7 text-center text-sm text-[#737B91] dark:text-[#AAB1C8]">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-semibold text-[#6477E8] transition hover:text-[#5367D5]"
          >
            Register here
          </Link>
        </p>
      </div>
    </main>
  );
}

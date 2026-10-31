
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
// } from "lucide-react";
// import { authClient } from "@/lib/auth-client";
// import { toast } from "sonner";

// export default function LoginPage() {
//   const router = useRouter();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     try {
//       const { error } = await authClient.signIn.email({
//         email: email.trim(),
//         password,
//         callbackURL: "/",
//       });

//       if (error) {
//         setError(error.message || "Invalid email or password.");
//         return;
//       }

//       router.push("/");
//       router.refresh();
//     } catch {
//       setError("Something went wrong. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // const handleGoogleLogin = async () => {
//   //   setError("");
//   //   setLoading(true);

//   //   try {
//   //     await authClient.signIn.social({
//   //       provider: "google",
//   //       callbackURL: "/",
//   //     });
//   //   } catch {
//   //     setError("Google sign-in failed. Please try again.");
//   //     setLoading(false);
//   //   }
//   // };

//   const handleGithubLogin = async () => {
//   try {
//     setLoading(true);

//     await authClient.signIn.social({
//       provider: "github",
//       callbackURL: "/",
//     });
//   } catch (error) {
//     console.error("GitHub login failed:", error);
//     toast.error("GitHub login failed. Please try again.");
//   } finally {
//     setLoading(false);
//   }
// };

//   return (
//     <main className="flex min-h-screen items-center justify-center bg-[#F7F8FC] px-4 py-10">
//       <div className="w-full max-w-md rounded-3xl border border-[#E5E8F0] bg-white p-6 shadow-xl shadow-[#252B42]/5 sm:p-9">

//         {/* Logo */}
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
//         <form onSubmit={handleLogin} className="mt-9 space-y-5">

//           {/* Email */}
//           <div>
//             <label className="mb-2 block text-sm font-semibold text-[#252B42]">
//               Email
//             </label>

//             <div className="flex h-12 items-center gap-3 rounded-xl border border-[#E5E8F0] bg-[#F7F8FC] px-4 focus-within:border-[#6477E8]">
//               <Mail size={18} className="text-[#737B91]" />

//               <input
//                 type="email"
//                 placeholder="name@example.com"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 autoComplete="email"
//                 required
//                 className="w-full bg-transparent text-sm text-[#252B42] outline-none placeholder:text-[#A5ABC0]"
//               />
//             </div>
//           </div>

//           {/* Password */}
//           <div>
//             <label className="mb-2 block text-sm font-semibold text-[#252B42]">
//               Password
//             </label>

//             <div className="flex h-12 items-center gap-3 rounded-xl border border-[#E5E8F0] bg-[#F7F8FC] px-4 focus-within:border-[#6477E8]">
//               <Lock size={18} className="text-[#737B91]" />

//               <input
//                 type={showPassword ? "text" : "password"}
//                 placeholder="Enter your password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 autoComplete="current-password"
//                 required
//                 className="w-full bg-transparent text-sm text-[#252B42] outline-none placeholder:text-[#A5ABC0]"
//               />

//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 aria-label={showPassword ? "Hide password" : "Show password"}
//                 className="text-[#737B91] hover:text-[#6477E8]"
//               >
//                 {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//               </button>
//             </div>
//           </div>

//           {/* Error */}
//           {error && (
//             <p
//               role="alert"
//               className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"
//             >
//               {error}
//             </p>
//           )}

//           {/* Submit */}
//           <button
//             type="submit"
//             disabled={loading}
//             className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#6477E8] text-sm font-semibold text-white shadow-md shadow-[#6477E8]/20 transition hover:bg-[#5367D5] disabled:cursor-not-allowed disabled:opacity-60"
//           >
//             {loading ? "Signing in..." : "Sign In"}
//             {!loading && <ArrowRight size={18} />}
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

//         {/* Google */}
//         {/* <button
//           type="button"
//           onClick={handleGoogleLogin}
//           disabled={loading}
//           className="flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-[#E5E8F0] bg-white text-sm font-semibold text-[#252B42] transition hover:bg-[#F7F8FC] disabled:opacity-60"
//         >
//           <svg viewBox="0 0 48 48" className="h-5 w-5" aria-hidden="true">
//             <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z" />
//             <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.73 7.18l7.72 5.99c4.51-4.18 7.05-10.34 7.05-17.64Z" />
//             <path fill="#FBBC05" d="M10.53 28.59A14.4 14.4 0 0 1 9.75 24c0-1.59.27-3.13.75-4.59l-7.98-6.19A23.9 23.9 0 0 0 0 24c0 3.88.93 7.55 2.56 10.78l7.97-6.19Z" />
//             <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.91-5.81l-7.72-5.99c-2.14 1.45-4.88 2.3-8.19 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48Z" />
//           </svg>
//           Continue with Google
//         </button> */}

//         {/* GitHub */}
// <button
//   type="button"
//   onClick={handleGithubLogin}
//   disabled={loading}
//   className="flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-[#E5E8F0] bg-white text-sm font-semibold text-[#252B42] transition hover:bg-[#F7F8FC] disabled:opacity-60"
// >
//   <svg
//     viewBox="0 0 24 24"
//     className="h-5 w-5"
//     fill="currentColor"
//     aria-hidden="true"
//   >
//     <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.55.1.76-.24.76-.54v-2.08c-3.1.67-3.75-1.32-3.75-1.32-.5-1.29-1.24-1.63-1.24-1.63-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15.99 1.7 2.6 1.21 3.23.93.1-.72.39-1.21.71-1.49-2.47-.28-5.07-1.24-5.07-5.5 0-1.22.44-2.22 1.15-3-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.05 1.14a10.6 10.6 0 0 1 5.55 0c2.12-1.44 3.05-1.14 3.05-1.14.61 1.54.23 2.68.12 2.96.71.78 1.14 1.78 1.14 3 0 4.27-2.6 5.21-5.08 5.49.4.35.75 1.02.75 2.06v3.07c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z" />
//   </svg>

//   Continue with GitHub
// </button>

//         {/* Register Link */}
//         <p className="mt-7 text-center text-sm text-[#737B91]">
//           Don&apos;t have an account?{" "}
//           <Link
//             href="/register"
//             className="font-semibold text-[#6477E8] hover:text-[#5367D5]"
//           >
//             Register here
//           </Link>
//         </p>
//       </div>
//     </main>
//   );
// }


"use client";

import { useState, type FormEvent } from "react";
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

  // Validate login fields.
  const validateForm = (): LoginErrors => {
    const newErrors: LoginErrors = {};
    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      newErrors.email = "Email address is required.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)
    ) {
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

  // Handle field changes.
  const handleEmailChange = (value: string) => {
    setEmail(value);
    setErrors((previous) => ({
      ...previous,
      email: undefined,
    }));
    setError("");
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    setErrors((previous) => ({
      ...previous,
      password: undefined,
    }));
    setError("");
  };

  // Email and password login.
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
        setError(
          authError.message || "Invalid email or password."
        );
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

  // GitHub login.
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
    `w-full bg-transparent text-sm text-[#252B42] outline-none placeholder:text-[#A5ABC0] ${
      hasError ? "placeholder:text-red-300" : ""
    }`;

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F7F8FC] px-4 py-10">
      <div className="w-full max-w-md rounded-3xl border border-[#E5E8F0] bg-white p-6 shadow-xl shadow-[#252B42]/5 sm:p-9">

        {/* Logo and Heading */}
        <div className="text-center">
          <Link
            href="/"
            className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#6477E8] text-white shadow-lg shadow-[#6477E8]/20"
          >
            <HeartHandshake size={25} />
          </Link>

          <h1 className="mt-5 text-3xl font-bold text-[#252B42]">
            Welcome Back
          </h1>

          <p className="mt-2 text-sm text-[#737B91]">
            Sign in to organize and join community drives.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} noValidate className="mt-9 space-y-5">

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-semibold text-[#252B42]"
            >
              Email <span className="text-red-500">*</span>
            </label>

            <div
              className={`flex h-12 items-center gap-3 rounded-xl border bg-[#F7F8FC] px-4 transition focus-within:border-[#6477E8] ${
                errors.email
                  ? "border-red-400"
                  : "border-[#E5E8F0]"
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
                aria-describedby={errors.email ? "email-error" : undefined}
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
              className="mb-2 block text-sm font-semibold text-[#252B42]"
            >
              Password <span className="text-red-500">*</span>
            </label>

            <div
              className={`flex h-12 items-center gap-3 rounded-xl border bg-[#F7F8FC] px-4 transition focus-within:border-[#6477E8] ${
                errors.password
                  ? "border-red-400"
                  : "border-[#E5E8F0]"
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
              className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"
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
          <div className="h-px flex-1 bg-[#E5E8F0]" />

          <span className="text-xs font-medium text-[#737B91]">
            OR CONTINUE WITH
          </span>

          <div className="h-px flex-1 bg-[#E5E8F0]" />
        </div>

        {/* GitHub Login */}
        <button
          type="button"
          onClick={handleGithubLogin}
          disabled={loading}
          className="flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-[#E5E8F0] bg-white text-sm font-semibold text-[#252B42] transition hover:bg-[#F7F8FC] disabled:cursor-not-allowed disabled:opacity-60"
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
        <p className="mt-7 text-center text-sm text-[#737B91]">
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

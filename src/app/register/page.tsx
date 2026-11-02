
// "use client";

// import { useState, type FormEvent } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import {
//   HeartHandshake,
//   User,
//   Mail,
//   Lock,
//   Image as ImageIcon,
//   Eye,
//   EyeOff,
//   ArrowRight,
//   Check,
//   X,
//   AlertCircle,
//   Loader2,
// } from "lucide-react";
// import { authClient } from "@/lib/auth-client";
// import { toast } from "sonner";

// type RegisterErrors = {
//   name?: string;
//   email?: string;
//   photoURL?: string;
//   password?: string;
// };

// export default function RegisterPage() {
//   const router = useRouter();

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [photoURL, setPhotoURL] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [errors, setErrors] = useState<RegisterErrors>({});

//   // Live password requirements.
//   const hasUppercase = /[A-Z]/.test(password);
//   const hasLowercase = /[a-z]/.test(password);
//   const hasMinLength = password.length >= 6;

//   // Validate all registration fields.
//   const validateForm = (): RegisterErrors => {
//     const newErrors: RegisterErrors = {};

//     const trimmedName = name.trim();
//     const trimmedEmail = email.trim();
//     const trimmedPhotoURL = photoURL.trim();

//     // Name validation.
//     if (!trimmedName) {
//       newErrors.name = "Full name is required.";
//     } else if (trimmedName.length < 3) {
//       newErrors.name = "Name must contain at least 3 characters.";
//     } else if (trimmedName.length > 50) {
//       newErrors.name = "Name cannot exceed 50 characters.";
//     } else if (!/^[\p{L}\p{M}][\p{L}\p{M}\s.'-]*$/u.test(trimmedName)) {
//       newErrors.name =
//         "Please enter a valid name using letters only.";
//     }

//     // Email validation.
//     if (!trimmedEmail) {
//       newErrors.email = "Email address is required.";
//     } else if (
//       !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)
//     ) {
//       newErrors.email = "Please enter a valid email address.";
//     }

//     // Optional profile photo URL validation.
//     if (trimmedPhotoURL) {
//       try {
//         const imageURL = new URL(trimmedPhotoURL);

//         if (!["http:", "https:"].includes(imageURL.protocol)) {
//           newErrors.photoURL =
//             "Please enter an HTTP or HTTPS image URL.";
//         }
//       } catch {
//         newErrors.photoURL = "Please enter a valid photo URL.";
//       }
//     }

//     // Password validation.
//     if (!password) {
//       newErrors.password = "Password is required.";
//     } else if (!hasMinLength || !hasUppercase || !hasLowercase) {
//       newErrors.password =
//         "Please meet all password requirements below.";
//     }

//     return newErrors;
//   };

//   // Clear individual field errors.
//   const handleFieldChange = (
//     field: keyof RegisterErrors,
//     value: string
//   ) => {
//     switch (field) {
//       case "name":
//         setName(value);
//         break;
//       case "email":
//         setEmail(value);
//         break;
//       case "photoURL":
//         setPhotoURL(value);
//         break;
//       case "password":
//         setPassword(value);
//         break;
//     }

//     setErrors((previous) => ({
//       ...previous,
//       [field]: undefined,
//     }));

//     setError("");
//   };

//   // Registration handler.
//   const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
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
//       const { error: authError } = await authClient.signUp.email({
//         name: name.trim(),
//         email: email.trim(),
//         password,
//         image: photoURL.trim() || undefined,
//         callbackURL: "/",
//       });

//       if (authError) {
//         setError(authError.message || "Registration failed.");
//         return;
//       }

//       toast.success("Account created successfully!");

//       router.push("/");
//       router.refresh();
//     } catch (err) {
//       console.error("Registration failed:", err);
//       setError("Something went wrong. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // GitHub registration.
//   const handleGithubRegister = async () => {
//     if (loading) return;

//     setError("");
//     setLoading(true);

//     try {
//       await authClient.signIn.social({
//         provider: "github",
//         callbackURL: "/",
//       });
//     } catch (err) {
//       console.error("GitHub registration failed:", err);
//       toast.error("GitHub registration failed. Please try again.");
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

//         {/* Logo */}
//         <div className="text-center">
//           <Link
//             href="/"
//             className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#6477E8] text-white shadow-lg shadow-[#6477E8]/20"
//           >
//             <HeartHandshake size={25} />
//           </Link>

//           <h1 className="mt-5 text-3xl font-bold text-[#252B42]">
//             Create Account
//           </h1>

//           <p className="mt-2 text-sm text-[#737B91]">
//             Join the community and start driving social change.
//           </p>
//         </div>

//         {/* Registration Form */}
//         <form
//           onSubmit={handleRegister}
//           noValidate
//           className="mt-8 space-y-5"
//         >
//           {/* Full Name */}
//           <div>
//             <label
//               htmlFor="name"
//               className="mb-2 block text-sm font-semibold text-[#252B42]"
//             >
//               Full Name <span className="text-red-500">*</span>
//             </label>

//             <div
//               className={`flex h-12 items-center gap-3 rounded-xl border bg-[#F7F8FC] px-4 focus-within:border-[#6477E8] ${
//                 errors.name ? "border-red-400" : "border-[#E5E8F0]"
//               }`}
//             >
//               <User
//                 size={18}
//                 className={errors.name ? "text-red-400" : "text-[#737B91]"}
//               />

//               <input
//                 id="name"
//                 type="text"
//                 placeholder="Enter your full name"
//                 value={name}
//                 onChange={(e) =>
//                   handleFieldChange("name", e.target.value)
//                 }
//                 autoComplete="name"
//                 maxLength={50}
//                 aria-invalid={!!errors.name}
//                 disabled={loading}
//                 className={inputClass(!!errors.name)}
//               />
//             </div>

//             {errors.name && (
//               <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-red-500">
//                 <AlertCircle size={14} />
//                 {errors.name}
//               </p>
//             )}
//           </div>

//           {/* Email */}
//           <div>
//             <label
//               htmlFor="email"
//               className="mb-2 block text-sm font-semibold text-[#252B42]"
//             >
//               Email Address <span className="text-red-500">*</span>
//             </label>

//             <div
//               className={`flex h-12 items-center gap-3 rounded-xl border bg-[#F7F8FC] px-4 focus-within:border-[#6477E8] ${
//                 errors.email ? "border-red-400" : "border-[#E5E8F0]"
//               }`}
//             >
//               <Mail
//                 size={18}
//                 className={errors.email ? "text-red-400" : "text-[#737B91]"}
//               />

//               <input
//                 id="email"
//                 type="email"
//                 placeholder="name@example.com"
//                 value={email}
//                 onChange={(e) =>
//                   handleFieldChange("email", e.target.value)
//                 }
//                 autoComplete="email"
//                 aria-invalid={!!errors.email}
//                 disabled={loading}
//                 className={inputClass(!!errors.email)}
//               />
//             </div>

//             {errors.email && (
//               <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-red-500">
//                 <AlertCircle size={14} />
//                 {errors.email}
//               </p>
//             )}
//           </div>

//           {/* Profile Photo */}
//           <div>
//             <label
//               htmlFor="photoURL"
//               className="mb-2 block text-sm font-semibold text-[#252B42]"
//             >
//               Profile Photo URL
//               <span className="ml-1 text-xs font-normal text-[#737B91]">
//                 (Optional)
//               </span>
//             </label>

//             <div
//               className={`flex h-12 items-center gap-3 rounded-xl border bg-[#F7F8FC] px-4 focus-within:border-[#6477E8] ${
//                 errors.photoURL
//                   ? "border-red-400"
//                   : "border-[#E5E8F0]"
//               }`}
//             >
//               <ImageIcon
//                 size={18}
//                 className={
//                   errors.photoURL ? "text-red-400" : "text-[#737B91]"
//                 }
//               />

//               <input
//                 id="photoURL"
//                 type="url"
//                 placeholder="https://example.com/photo.jpg"
//                 value={photoURL}
//                 onChange={(e) =>
//                   handleFieldChange("photoURL", e.target.value)
//                 }
//                 disabled={loading}
//                 aria-invalid={!!errors.photoURL}
//                 className={inputClass(!!errors.photoURL)}
//               />
//             </div>

//             {errors.photoURL ? (
//               <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-red-500">
//                 <AlertCircle size={14} />
//                 {errors.photoURL}
//               </p>
//             ) : (
//               <p className="mt-2 text-xs text-[#737B91]">
//                 Optional: Leave empty for the default avatar.
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
//               className={`flex h-12 items-center gap-3 rounded-xl border bg-[#F7F8FC] px-4 focus-within:border-[#6477E8] ${
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
//                 placeholder="Create a password"
//                 value={password}
//                 onChange={(e) =>
//                   handleFieldChange("password", e.target.value)
//                 }
//                 autoComplete="new-password"
//                 aria-invalid={!!errors.password}
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
//                 className="shrink-0 text-[#737B91] hover:text-[#6477E8]"
//               >
//                 {showPassword ? (
//                   <EyeOff size={18} />
//                 ) : (
//                   <Eye size={18} />
//                 )}
//               </button>
//             </div>

//             {/* Password Requirements */}
//             <div className="mt-3 space-y-2 rounded-xl bg-[#F7F8FC] p-3">
//               <p className="mb-2 text-xs font-semibold text-[#252B42]">
//                 Password requirements
//               </p>

//               <p
//                 className={`flex items-center gap-2 text-xs ${
//                   hasUppercase ? "text-green-600" : "text-[#737B91]"
//                 }`}
//               >
//                 {hasUppercase ? <Check size={15} /> : <X size={15} />}
//                 At least one uppercase letter (A-Z)
//               </p>

//               <p
//                 className={`flex items-center gap-2 text-xs ${
//                   hasLowercase ? "text-green-600" : "text-[#737B91]"
//                 }`}
//               >
//                 {hasLowercase ? <Check size={15} /> : <X size={15} />}
//                 At least one lowercase letter (a-z)
//               </p>

//               <p
//                 className={`flex items-center gap-2 text-xs ${
//                   hasMinLength ? "text-green-600" : "text-[#737B91]"
//                 }`}
//               >
//                 {hasMinLength ? <Check size={15} /> : <X size={15} />}
//                 Minimum 6 characters
//               </p>
//             </div>

//             {errors.password && (
//               <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-red-500">
//                 <AlertCircle size={14} />
//                 {errors.password}
//               </p>
//             )}
//           </div>

//           {/* General Error */}
//           {error && (
//             <div
//               role="alert"
//               className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"
//             >
//               <AlertCircle size={17} className="shrink-0" />
//               {error}
//             </div>
//           )}

//           {/* Register Button */}
//           <button
//             type="submit"
//             disabled={loading}
//             className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#6477E8] text-sm font-semibold text-white shadow-md shadow-[#6477E8]/20 transition hover:bg-[#5367D5] disabled:cursor-not-allowed disabled:opacity-60"
//           >
//             {loading ? (
//               <>
//                 <Loader2 size={18} className="animate-spin" />
//                 Creating account...
//               </>
//             ) : (
//               <>
//                 Register
//                 <ArrowRight size={18} />
//               </>
//             )}
//           </button>
//         </form>

//         {/* GitHub */}
//         <button
//           type="button"
//           onClick={handleGithubRegister}
//           disabled={loading}
//           className="mt-6 flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-[#E5E8F0] bg-white text-sm font-semibold text-[#252B42] transition hover:bg-[#F7F8FC] disabled:cursor-not-allowed disabled:opacity-60"
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
//               <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.55.1.76-.24.76-.54v-2.08c-3.1.67-3.75-1.32-3.75-1.32-.5-1.29-1.24-1.63-1.24-1.63-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15.99 1.7 2.6 1.21 3.23.93.1-.72.39-1.21.71-1.49-.28-2.47-1.24-5.07-5.5-5.07-1.22 0-2.22.44-3 1.15-.28-.12-1.42-.5-2.96.11 0 0-.3.94 1.14 3.05a10.6 10.6 0 0 1 0 5.55c-1.44 2.12-1.14 3.05-1.14 3.05 1.54.61 2.68.23 2.96.12.78.71 1.78 1.14 3 1.14 4.27 0 5.21-2.6 5.49-5.08.35.4 1.02.75 2.06.75h3.07c.3 0 .65.2.54.77A11.1 11.1 0 0 0 12 .9Z" />
//             </svg>
//           )}
//           Continue with GitHub
//         </button>

//         {/* Login Link */}
//         <p className="mt-7 text-center text-sm text-[#737B91]">
//           Already have an account?{" "}
//           <Link
//             href="/login"
//             className="font-semibold text-[#6477E8] hover:text-[#5367D5]"
//           >
//             Login here
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
  User,
  Mail,
  Lock,
  Image as ImageIcon,
  Eye,
  EyeOff,
  ArrowRight,
  Check,
  X,
  AlertCircle,
  Loader2,
  Sun,
  Moon,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

type RegisterErrors = {
  name?: string;
  email?: string;
  photoURL?: string;
  password?: string;
};

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState<RegisterErrors>({});

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

  // Live password requirements
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasMinLength = password.length >= 6;

  // Validate registration fields
  const validateForm = (): RegisterErrors => {
    const newErrors: RegisterErrors = {};

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedPhotoURL = photoURL.trim();

    // Name validation
    if (!trimmedName) {
      newErrors.name = "Full name is required.";
    } else if (trimmedName.length < 3) {
      newErrors.name = "Name must contain at least 3 characters.";
    } else if (trimmedName.length > 50) {
      newErrors.name = "Name cannot exceed 50 characters.";
    } else if (
      !/^[\p{L}\p{M}][\p{L}\p{M}\s.'-]*$/u.test(trimmedName)
    ) {
      newErrors.name = "Please enter a valid name using letters only.";
    }

    // Email validation
    if (!trimmedEmail) {
      newErrors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      newErrors.email = "Please enter a valid email address.";
    }

    // Optional photo URL validation
    if (trimmedPhotoURL) {
      try {
        const imageURL = new URL(trimmedPhotoURL);

        if (!["http:", "https:"].includes(imageURL.protocol)) {
          newErrors.photoURL =
            "Please enter an HTTP or HTTPS image URL.";
        }
      } catch {
        newErrors.photoURL = "Please enter a valid photo URL.";
      }
    }

    // Password validation
    if (!password) {
      newErrors.password = "Password is required.";
    } else if (!hasMinLength || !hasUppercase || !hasLowercase) {
      newErrors.password =
        "Please meet all password requirements below.";
    }

    return newErrors;
  };

  // Handle field changes
  const handleFieldChange = (
    field: keyof RegisterErrors,
    value: string
  ) => {
    switch (field) {
      case "name":
        setName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "photoURL":
        setPhotoURL(value);
        break;
      case "password":
        setPassword(value);
        break;
    }

    setErrors((previous) => ({
      ...previous,
      [field]: undefined,
    }));

    setError("");
  };

  // Email registration
  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
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
      const { error: authError } = await authClient.signUp.email({
        name: name.trim(),
        email: email.trim(),
        password,
        image: photoURL.trim() || undefined,
        callbackURL: "/",
      });

      if (authError) {
        setError(authError.message || "Registration failed.");
        return;
      }

      toast.success("Account created successfully!");

      router.push("/");
      router.refresh();
    } catch (err) {
      console.error("Registration failed:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // GitHub registration
  const handleGithubRegister = async () => {
    if (loading) return;

    setError("");
    setLoading(true);

    try {
      await authClient.signIn.social({
        provider: "github",
        callbackURL: "/",
      });
    } catch (err) {
      console.error("GitHub registration failed:", err);
      toast.error("GitHub registration failed. Please try again.");
      setLoading(false);
    }
  };

  // Input styling
  const inputClass = (hasError: boolean) =>
    `w-full bg-transparent text-sm text-[#252B42] outline-none placeholder:text-[#A5ABC0] dark:text-white dark:placeholder:text-[#7F89A8] ${
      hasError ? "placeholder:text-red-300" : ""
    }`;

  const fieldContainerClass = (hasError: boolean) =>
    `flex h-12 items-center gap-3 rounded-xl border bg-[#F7F8FC] px-4 transition focus-within:border-[#6477E8] dark:bg-[#14182B] ${
      hasError
        ? "border-red-400"
        : "border-[#E5E8F0] dark:border-[#343B59]"
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

      {/* Registration Card */}
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
            Create Account
          </h1>

          <p className="mt-2 text-sm text-[#737B91] dark:text-[#AAB1C8]">
            Join the community and start driving social change.
          </p>
        </div>

        {/* Registration Form */}
        <form
          onSubmit={handleRegister}
          noValidate
          className="mt-8 space-y-5"
        >
          {/* Full Name */}
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-semibold text-[#252B42] dark:text-white"
            >
              Full Name <span className="text-red-500">*</span>
            </label>

            <div className={fieldContainerClass(!!errors.name)}>
              <User
                size={18}
                className={errors.name ? "text-red-400" : "text-[#737B91]"}
              />

              <input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) =>
                  handleFieldChange("name", e.target.value)
                }
                autoComplete="name"
                maxLength={50}
                aria-invalid={!!errors.name}
                disabled={loading}
                className={inputClass(!!errors.name)}
              />
            </div>

            {errors.name && (
              <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-red-500">
                <AlertCircle size={14} />
                {errors.name}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-semibold text-[#252B42] dark:text-white"
            >
              Email Address <span className="text-red-500">*</span>
            </label>

            <div className={fieldContainerClass(!!errors.email)}>
              <Mail
                size={18}
                className={errors.email ? "text-red-400" : "text-[#737B91]"}
              />

              <input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) =>
                  handleFieldChange("email", e.target.value)
                }
                autoComplete="email"
                aria-invalid={!!errors.email}
                disabled={loading}
                className={inputClass(!!errors.email)}
              />
            </div>

            {errors.email && (
              <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-red-500">
                <AlertCircle size={14} />
                {errors.email}
              </p>
            )}
          </div>

          {/* Profile Photo */}
          <div>
            <label
              htmlFor="photoURL"
              className="mb-2 block text-sm font-semibold text-[#252B42] dark:text-white"
            >
              Profile Photo URL
              <span className="ml-1 text-xs font-normal text-[#737B91] dark:text-[#AAB1C8]">
                (Optional)
              </span>
            </label>

            <div className={fieldContainerClass(!!errors.photoURL)}>
              <ImageIcon
                size={18}
                className={
                  errors.photoURL ? "text-red-400" : "text-[#737B91]"
                }
              />

              <input
                id="photoURL"
                type="url"
                placeholder="https://example.com/photo.jpg"
                value={photoURL}
                onChange={(e) =>
                  handleFieldChange("photoURL", e.target.value)
                }
                disabled={loading}
                aria-invalid={!!errors.photoURL}
                className={inputClass(!!errors.photoURL)}
              />
            </div>

            {errors.photoURL ? (
              <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-red-500">
                <AlertCircle size={14} />
                {errors.photoURL}
              </p>
            ) : (
              <p className="mt-2 text-xs text-[#737B91] dark:text-[#AAB1C8]">
                Optional: Leave empty for the default avatar.
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

            <div className={fieldContainerClass(!!errors.password)}>
              <Lock
                size={18}
                className={
                  errors.password ? "text-red-400" : "text-[#737B91]"
                }
              />

              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                value={password}
                onChange={(e) =>
                  handleFieldChange("password", e.target.value)
                }
                autoComplete="new-password"
                aria-invalid={!!errors.password}
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

            {/* Password Requirements */}
            <div className="mt-3 space-y-2 rounded-xl bg-[#F7F8FC] p-3 dark:bg-[#14182B]">
              <p className="mb-2 text-xs font-semibold text-[#252B42] dark:text-white">
                Password requirements
              </p>

              <p
                className={`flex items-center gap-2 text-xs ${
                  hasUppercase
                    ? "text-green-600 dark:text-green-400"
                    : "text-[#737B91] dark:text-[#AAB1C8]"
                }`}
              >
                {hasUppercase ? <Check size={15} /> : <X size={15} />}
                At least one uppercase letter (A-Z)
              </p>

              <p
                className={`flex items-center gap-2 text-xs ${
                  hasLowercase
                    ? "text-green-600 dark:text-green-400"
                    : "text-[#737B91] dark:text-[#AAB1C8]"
                }`}
              >
                {hasLowercase ? <Check size={15} /> : <X size={15} />}
                At least one lowercase letter (a-z)
              </p>

              <p
                className={`flex items-center gap-2 text-xs ${
                  hasMinLength
                    ? "text-green-600 dark:text-green-400"
                    : "text-[#737B91] dark:text-[#AAB1C8]"
                }`}
              >
                {hasMinLength ? <Check size={15} /> : <X size={15} />}
                Minimum 6 characters
              </p>
            </div>

            {errors.password && (
              <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-red-500">
                <AlertCircle size={14} />
                {errors.password}
              </p>
            )}
          </div>

          {/* General Error */}
          {error && (
            <div
              role="alert"
              className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-300"
            >
              <AlertCircle size={17} className="shrink-0" />
              {error}
            </div>
          )}

          {/* Register Button */}
          <button
            type="submit"
            disabled={loading}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#6477E8] text-sm font-semibold text-white shadow-md shadow-[#6477E8]/20 transition hover:bg-[#5367D5] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Creating account...
              </>
            ) : (
              <>
                Register
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center gap-4">
          <div className="h-px flex-1 bg-[#E5E8F0] dark:bg-[#343B59]" />

          <span className="text-xs font-medium text-[#737B91] dark:text-[#AAB1C8]">
            OR CONTINUE WITH
          </span>

          <div className="h-px flex-1 bg-[#E5E8F0] dark:bg-[#343B59]" />
        </div>

        {/* GitHub Registration */}
        <button
          type="button"
          onClick={handleGithubRegister}
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
              <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.55.1.76-.24.76-.54v-2.08c-3.1.67-3.75-1.32-3.75-1.32-.5-1.29-1.24-1.63-1.24-1.63-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15.99 1.7 2.6 1.21 3.23.93.1-.72.39-1.21.71-1.49-.28-2.47-1.24-5.07-5.5-5.07-1.22 0-2.22.44-3 1.15-.28-.12-1.42-.5-2.96.11 0 0-.3.94 1.14 3.05a10.6 10.6 0 0 1 0 5.55c-1.44 2.12-1.14 3.05-1.14 3.05 1.54.61 2.68.23 2.96.12.78.71 1.78 1.14 3 1.14 4.27 0 5.21-2.6 5.49-5.08.35.4.75 1.02.75 2.06v3.07c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z" />
            </svg>
          )}

          Continue with GitHub
        </button>

        {/* Login Link */}
        <p className="mt-7 text-center text-sm text-[#737B91] dark:text-[#AAB1C8]">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-[#6477E8] transition hover:text-[#5367D5]"
          >
            Login here
          </Link>
        </p>
      </div>
    </main>
  );
}

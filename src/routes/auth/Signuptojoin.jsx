import React, { useEffect, useState } from "react";
import handleGoogleAuth from "../../utils/handleGoogleAuth";
import { useNavigate } from "react-router";
import supabase from "../../config/supabase";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";

import signuptojoinGif from "../../assets/signuptojoin.gif";

const GoogleG = (props) => (
  <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true" {...props}>
    <path
      fill="#FFC107"
      d="M43.611 20.083H42V20H24v8h11.303C33.99 32.659 29.37 36 24 36c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
    />
    <path
      fill="#FF3D00"
      d="M6.306 14.691l6.571 4.819C14.655 16.108 19.027 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
    />
    <path
      fill="#4CAF50"
      d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.349 0-9.957-3.318-11.281-7.946l-6.52 5.02C9.512 39.556 16.227 44 24 44z"
    />
    <path
      fill="#1976D2"
      d="M43.611 20.083H42V20H24v8h11.303c-.63 1.764-1.736 3.29-3.084 4.57l.003-.002 6.19 5.238C36.971 40.205 44 36 44 24c0-1.341-.138-2.65-.389-3.917z"
    />
  </svg>
);

const Eye = (props) => (
  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" {...props}>
    <path
      fill="currentColor"
      d="M12 5c-7 0-10 7-10 7s3 7 10 7 10-7 10-7-3-7-10-7Zm0 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10Z"
    />
    <path fill="currentColor" d="M12 9a3 3 0 1 0 0 6a3 3 0 0 0 0-6Z" />
  </svg>
);

const EyeOff = (props) => (
  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" {...props}>
    <path
      fill="currentColor"
      d="M3.28 2.22a.75.75 0 0 0-1.06 1.06l2.09 2.09C2.55 7.04 2 8.5 2 8.5S5 15.5 12 15.5c1.6 0 3.01-.37 4.22-.95l2.5 2.5a.75.75 0 1 0 1.06-1.06L3.28 2.22ZM12 13.5c-4.64 0-7.2-4.02-7.92-5.29c.23-.4.62-1 1.2-1.62l1.54 1.54A4.99 4.99 0 0 0 12 14c.52 0 1.02-.08 1.49-.22l1.08 1.08c-.77.3-1.63.64-2.57.64ZM9.2 6.51l1.72 1.72A3 3 0 0 1 15.8 13.1l1.33 1.33c1.55-1.05 2.55-2.6 2.95-3.33C19.3 9.82 16.74 5.8 12.1 5.8c-.95 0-1.84.13-2.9.71Z"
    />
  </svg>
);

const Signuptojoin = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState,
    formState: { errors },
  } = useForm();
  const { isSubmitting } = formState;

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (formData) => {
    const { username, password, email } = formData;

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        username,
      },
    });

    if (error) return toast.error(error.message);

    toast.success("Signup succesfully done");
    navigate("/dashboard");
  };

  return (
    <main className="relative min-h-screen w-full overflow-hidden flex items-center justify-center px-5 py-10">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <img src={signuptojoinGif} alt="Signup background" className="h-full w-full object-cover" />

        {/* Cinematic overlay */}
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 opacity-35 [background:radial-gradient(circle_at_top,rgba(34,197,94,0.26),transparent_55%)]" />
        <div className="absolute inset-0 opacity-20 [background:radial-gradient(circle_at_bottom,rgba(255,255,255,0.18),transparent_60%)]" />
        <div className="absolute inset-0 [background:linear-gradient(to_bottom,rgba(0,0,0,0.18),transparent_40%,rgba(0,0,0,0.75))]" />
      </div>

      {/* Layout */}
      <div className="w-full max-w-[980px] grid gap-6 lg:grid-cols-2 items-center">
        {/* Left hero */}
        <section className="hidden lg:block">
          <div className="relative rounded-3xl border border-white/12 bg-white/6 backdrop-blur-2xl p-8 shadow-[0_30px_120px_rgba(0,0,0,0.55)] overflow-hidden">
            <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-green-500/12 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

            <div className="inline-flex items-center gap-2 rounded-full border border-white/14 bg-white/8 px-3 py-1 text-xs text-white/80">
              <span className="drop-shadow-[0_0_10px_rgba(34,197,94,0.55)]">●</span>
              Live rooms • people studying right now
            </div>

            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white">
              Bro people are cooking{" "}
              <span className="inline-block align-middle text-3xl drop-shadow-[0_0_12px_rgba(255,120,0,0.70)]">
                🔥
              </span>
            </h1>

            <p className="mt-3 text-white/70 leading-relaxed">
              Create a quick account and jump into a room. Track your streak, stay focused,
              and study with others without feeling alone.
            </p>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <div className="rounded-2xl border border-white/10 bg-white/6 p-4">
                <p className="text-xs text-white/60">Streak</p>
                <p className="mt-1 text-lg font-semibold text-white">🔥 Daily</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/6 p-4">
                <p className="text-xs text-white/60">Rooms</p>
                <p className="mt-1 text-lg font-semibold text-white">Live</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/6 p-4">
                <p className="text-xs text-white/60">Focus</p>
                <p className="mt-1 text-lg font-semibold text-white">Timer</p>
              </div>
            </div>

            <div className="mt-6 text-xs text-white/55">
              Tip: use a short username — looks clean in the room list.
            </div>
          </div>
        </section>

        {/* Right card */}
        <section className="w-full max-w-[420px] mx-auto">
          <div className="relative rounded-3xl border border-white/14 bg-white/10 backdrop-blur-2xl shadow-[0_26px_100px_rgba(0,0,0,0.60)] overflow-hidden">
            {/* glow */}
            <div className="absolute -top-14 -left-14 h-52 w-52 rounded-full bg-green-500/12 blur-3xl" />
            <div className="absolute -bottom-16 -right-14 h-56 w-56 rounded-full bg-white/10 blur-3xl" />

            <div className="relative p-6">
              {/* small header */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-white/90">Join the room</p>
                  <p className="mt-1 text-xs text-white/60">
                    Make an account to join them — takes 10 seconds.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => navigate("/signin")}
                  className="rounded-full border border-white/14 bg-white/8 px-3 py-1 text-xs text-white/75 hover:bg-white/12 transition"
                >
                  Login
                </button>
              </div>

              {/* form */}
              <form className="mt-5 flex flex-col gap-3.5" onSubmit={handleSubmit(onSubmit)}>
                {/* Username */}
                <div className="space-y-1.5">
                  <label className="text-[11px] text-white/65">Username</label>
                  <input
                    type="text"
                    className="
                      w-full h-11 rounded-2xl
                      border border-white/14
                      bg-white/10
                      px-4
                      text-sm text-white
                      placeholder:text-white/35
                      outline-none
                      focus:border-green-400/45
                      focus:ring-2 focus:ring-green-500/25
                      transition
                    "
                    placeholder="ex: will_rivera"
                    {...register("username", { required: "username is required" })}
                  />
                  {errors.username && (
                    <span className="text-[11px] text-red-200">{errors.username.message}</span>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label className="text-[11px] text-white/65">Email</label>
                  <input
                    type="text"
                    placeholder="you@email.com"
                    className="
                      w-full h-11 rounded-2xl
                      border border-white/14
                      bg-white/10
                      px-4
                      text-sm text-white
                      placeholder:text-white/35
                      outline-none
                      focus:border-green-400/45
                      focus:ring-2 focus:ring-green-500/25
                      transition
                    "
                    {...register("email", { required: "email is required" })}
                  />
                  {errors.email && (
                    <span className="text-[11px] text-red-200">{errors.email.message}</span>
                  )}
                </div>

                {/* Password */}
                <div className="space-y-1.5">
                  <label className="text-[11px] text-white/65">Password</label>
                  <div className="relative">
                    <input
                      className="
                        w-full h-11 rounded-2xl
                        border border-white/14
                        bg-white/10
                        pl-4 pr-12
                        text-sm text-white
                        placeholder:text-white/35
                        outline-none
                        focus:border-green-400/45
                        focus:ring-2 focus:ring-green-500/25
                        transition
                      "
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      {...register("password", { required: "password is required" })}
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="
                        absolute right-2 top-1/2 -translate-y-1/2
                        grid place-items-center
                        h-9 w-9 rounded-2xl
                        border border-white/10
                        bg-white/5
                        text-white/75
                        hover:bg-white/10 hover:text-white
                        transition
                      "
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff /> : <Eye />}
                    </button>
                  </div>

                  {errors.password && (
                    <span className="text-[11px] text-red-200">{errors.password.message}</span>
                  )}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="
                    w-full h-11 rounded-2xl
                    bg-green-600 text-white
                    hover:bg-green-600/90
                    border border-green-700/25
                    shadow-[0_16px_50px_rgba(34,197,94,0.20)]
                    active:scale-[0.98]
                    transition
                    text-sm font-medium
                    disabled:opacity-70 disabled:cursor-not-allowed
                  "
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Creating..." : "Signup to join"}
                </button>

                {/* Divider */}
                <div className="flex items-center gap-3 py-1">
                  <div className="h-px flex-1 bg-white/12" />
                  <span className="text-[11px] text-white/55">OR</span>
                  <div className="h-px flex-1 bg-white/12" />
                </div>

                {/* Google auth */}
                <div
                  onClick={handleGoogleAuth}
                  className="
                    cursor-pointer
                    w-full h-11 rounded-2xl
                    bg-white/12 text-white
                    border border-white/15
                    hover:bg-white/16
                    active:scale-[0.98]
                    transition
                    flex items-center justify-center gap-2
                    text-sm
                    select-none
                  "
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") handleGoogleAuth();
                  }}
                >
                  <span className="grid place-items-center rounded-xl bg-white/90 p-1.5">
                    <GoogleG />
                  </span>
                  Continue with Google
                </div>

                {/* small terms */}
                <p className="text-[11px] text-white/50 text-center pt-1 leading-relaxed">
                  By continuing you agree to basic app rules. No spam, be respectful.
                </p>
              </form>
            </div>
          </div>

          {/* Mobile hero (since left side hidden) */}
          <div className="lg:hidden mt-4 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/14 bg-white/8 px-3 py-1 text-xs text-white/75">
              <span className="drop-shadow-[0_0_10px_rgba(34,197,94,0.55)]">●</span>
              Live rooms • join now
            </div>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">
              Bro people are cooking{" "}
              <span className="inline-block align-middle drop-shadow-[0_0_12px_rgba(255,120,0,0.70)]">🔥</span>
            </h2>
            <p className="mt-2 text-sm text-white/65">
              Make an account and jump into a study room.
            </p>
          </div>
        </section>
      </div>

      <ToastContainer
        position="top-center"
        autoClose={2200}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </main>
  );
};

export default Signuptojoin;

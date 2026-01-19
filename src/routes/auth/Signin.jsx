import React from "react";
import { useNavigate } from "react-router";
import supabase from "../../config/supabase";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import heroGif from "../../assets/login-image.gif";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Separator } from "../../components/ui/separator";

const Signin = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  //****Signin with supabase*** */
  const onSubmit = async (formData) => {
    const { password, email } = formData;
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Signin succesfully done");
    navigate("/dashboard");
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-black">
      {/* Background GIF */}
      <div className="absolute inset-0">
        <img
          src={heroGif}
          alt="Signin background"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Page content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
        <Card
          className="
            w-full max-w-md
            rounded-2xl
            border border-white/15
            bg-white/5
            text-white
            backdrop-blur-2xl
            shadow-2xl
          "
        >
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-semibold tracking-tight">
              Sign in
            </CardTitle>
            <CardDescription className="text-white/70">
              Welcome. Enter your details.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form
              className="flex flex-col gap-4"
              onSubmit={handleSubmit(onSubmit)}
            >
              {/* Email */}
              <div className="space-y-2 text-left">
                <Label className="text-white/80">Email</Label>
                <Input
                  type="text"
                  placeholder="name@example.com"
                  className="
                    border-white/15 bg-white/5 text-white
                    placeholder:text-white/40
                    focus-visible:ring-white/20
                  "
                  {...register("email", { required: "email is required" })}
                />
                {errors.email && (
                  <p className="text-xs text-red-300">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-2 text-left">
                <Label className="text-white/80">Password</Label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  className="
                    border-white/15 bg-white/5 text-white
                    placeholder:text-white/40
                    focus-visible:ring-white/20
                  "
                  {...register("password", {
                    required: "password is required",
                  })}
                />
                {errors.password && (
                  <p className="text-xs text-red-300">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Submit */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-green-500 text-black hover:bg-green-400"
              >
                {isSubmitting ? "submitting.." : "Signin"}
              </Button>

              {/* Divider */}
              <div className="relative py-1">
                <Separator className="bg-white/10" />
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-2 text-xs text-white/50">
                  OR
                </span>
              </div>

              {/* Signup link */}
              <div className="pt-2 text-center text-sm text-white/70">
                don&apos;t have an account?{" "}
                <button
                  type="button"
                  className="text-white underline underline-offset-4 hover:text-white/90"
                  onClick={() => navigate("/signup")}
                >
                  signup
                </button>
              </div>
            </form>

            <ToastContainer />
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default Signin;

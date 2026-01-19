import React from "react";
import { useNavigate } from "react-router";
import supabase from "../../config/supabase";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import heroGif from "../../assets/homepage-gif (1).gif";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Separator } from "../../components/ui/separator";

const Signup = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  //****Signup with supabase*** */
const onSubmit = async (formData) => {
  try {
    const {
      fullname,
      specialization,
      lisence_number,
      password,
      email,
      identity_doc,
      license_doc,
    } = formData;

    // 1️⃣ Signup doctor
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          fullname,
          specialization,
          lisence_number,
          role: "doctor",
        },
      },
    });

    if (error) {
      toast.error(error.message);
      return;
    }

    const docter_id = data.user.id;

    // 2️⃣ Upload identity document
    const identityFile = identity_doc[0];
    const identityPath = `identity/${docter_id}-${Date.now()}-${identityFile.name}`;

    const { error: identityError } = await supabase.storage
      .from("documents")
      .upload(identityPath, identityFile);

    if (identityError) {
      toast.error("Identity document upload failed");
      return;
    }

    // 3️⃣ Upload license document
    const licenseFile = license_doc[0];
    const licensePath = `license/${docter_id}-${Date.now()}-${licenseFile.name}`;

    const { error: licenseError } = await supabase.storage
      .from("documents")
      .upload(licensePath, licenseFile);

    if (licenseError) {
      toast.error("License document upload failed");
      return;
    }

    // 4️⃣ Insert doctor record
    await supabase.from("available_docters").insert({
      docter_id,
      docter_name: fullname,
      specialization,
      lisence_number,
      identity_doc_path: identityPath,
      license_doc_path: licensePath,
      is_verified: false, // KYC pending
    });

    toast.success("Signup successful! Verification pending.");
    navigate("/docter_dashboard");
  } catch (err) {
    console.error(err);
    toast.error("Something went wrong");
  }
};

  return (
    <main className="relative min-h-screen overflow-hidden bg-black">
      {/* Background GIF */}
      <div className="absolute inset-0">
        <img
          src={heroGif}
          alt="Signup background"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
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
              Create account
            </CardTitle>
          </CardHeader>

          <CardContent>
            <form
              className="flex flex-col gap-4"
              onSubmit={handleSubmit(onSubmit)}
            >
              {/* Full name */}
              <div className="space-y-2 text-left">
                <Label className="text-white/80">Fullname</Label>
                <Input
                  type="text"
                  placeholder="Fullname"
                  className="
                    border-white/15 bg-white/5 text-white
                    placeholder:text-white/40
                    focus-visible:ring-green-400/40
                  "
                  {...register("fullname", {
                    required: "fullname is required",
                  })}
                />
                {errors.fullname && (
                  <p className="text-xs text-red-300">
                    {errors.fullname.message}
                  </p>
                )}
              </div>

              {/* Lisence number*/}
              <div className="space-y-2 text-left">
                <Label className="text-white/80">Lisense Number</Label>
                <Input
                  type="text"
                  placeholder="Lisense number"
                  className="
                    border-white/15 bg-white/5 text-white
                    placeholder:text-white/40
                    focus-visible:ring-green-400/40
                  "
                  {...register("lisense_number", {
                    required: "lisense is required",
                  })}
                />
                {errors.lisence_number && (
                  <p className="text-xs text-red-300">
                    {errors.lisense_number.message}
                  </p>
                )}
              </div>

              {/* specialization*/}
              <div className="space-y-2 text-left">
                <Label className="text-white/80">Specialization</Label>
                <Input
                  type="text"
                  placeholder="Lisense number"
                  className="
                    border-white/15 bg-white/5 text-white
                    placeholder:text-white/40
                    focus-visible:ring-green-400/40
                  "
                  {...register("specialization", {
                    required: "lisense is required",
                  })}
                />
                {errors.specialization && (
                  <p className="text-xs text-red-300">
                    {errors.specialization.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2 text-left">
                <Label className="text-white/80">Email</Label>
                <Input
                  type="text"
                  placeholder="name@example.com"
                  className="
                    border-white/15 bg-white/5 text-white
                    placeholder:text-white/40
                    focus-visible:ring-green-400/40
                  "
                  {...register("email", { required: "email is required" })}
                />
                {errors.email && (
                  <p className="text-xs text-red-300">{errors.email.message}</p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-2 text-left">
                <Label className="text-white/80">Password</Label>
                <Input
                  type="password"
                  placeholder="set password"
                  className="
                    border-white/15 bg-white/5 text-white
                    placeholder:text-white/40
                    focus-visible:ring-green-400/40
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

              {/* Identity verification */}
              <div className="space-y-2 text-left">
                <Label className="text-white/80">
                  Identity Document (Citizenship / ID)
                </Label>
                <Input
                  type="file"
                 accept="image/*,.webp,.pdf"
                  className="border-white/15 bg-white/5 text-white"
                  {...register("identity_doc", {
                    required: "Identity document is required",
                  })}
                />
                {errors.identity_doc && (
                  <p className="text-xs text-red-300">
                    {errors.identity_doc.message}
                  </p>
                )}
              </div>

              {/* License verification */}
              <div className="space-y-2 text-left">
                <Label className="text-white/80">
                  Medical License Document
                </Label>
                <Input
                  type="file"
              accept="image/*,.webp,.pdf"
                  className="border-white/15 bg-white/5 text-white"
                  {...register("license_doc", {
                    required: "License document is required",
                  })}
                />
                {errors.license_doc && (
                  <p className="text-xs text-red-300">
                    {errors.license_doc.message}
                  </p>
                )}
              </div>

              {/* Submit */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-green-500 text-black hover:bg-green-400"
              >
                {isSubmitting ? "submitting.." : "Signup"}
              </Button>

              {/* Divider */}
              <div className="relative py-1">
                <Separator className="bg-white/10" />
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-2 text-xs text-white/50">
                  OR
                </span>
              </div>

              {/* Sign in link */}
              <div className="pt-2 text-center text-sm text-white/70">
                have account?{" "}
                <button
                  type="button"
                  className="text-white underline underline-offset-4 hover:text-white/90"
                  onClick={() => navigate("/signin")}
                >
                  login
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

export default Signup;

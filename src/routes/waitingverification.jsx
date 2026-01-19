import React from 'react'
import { useEffect } from "react";
import { useNavigate } from "react-router";
import heroGif from "@/assets/homepage-gif (1).gif";
import { Button } from "@/components/ui/button";

export default function WaitingVerification() {
  const navigate = useNavigate();

  useEffect(() => {
    // Optional: redirect after some time (e.g., 30s) to refresh session
    const timer = setTimeout(() => {
      navigate("/dashboard"); // try to recheck KYC
    }, 30000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-black flex items-center justify-center">
      {/* Background GIF */}
      <div className="absolute inset-0">
        <img
          src={heroGif}
          alt="Background"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center p-6 rounded-2xl bg-white/5 border border-green-400/20 backdrop-blur-xl max-w-md">
        <h1 className="text-3xl font-bold text-green-400 mb-4">
          Waiting for Verification
        </h1>
        <p className="text-white/70 mb-6">
          Your account is currently under review. An admin will verify your
          credentials soon.
        </p>
        <Button
          onClick={() => navigate("/")}
          className="bg-green-500 hover:bg-green-400 text-black"
        >
          Go to Home
        </Button>
      </div>
    </main>
  );
}

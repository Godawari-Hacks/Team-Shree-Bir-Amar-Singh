import React, { useRef, useState } from "react";
import { useNavigate } from "react-router";
import heroGif from "../assets/homepage-gif (1).gif";
import logoImage from "../assets/logo.png"; // Added logo import
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "@/components/ui/input";
import { toast, ToastContainer } from "react-toastify";

const Home = () => {
  const navigate = useNavigate();
  const anonnameRef = useRef(null);
  const [lang, setLang] = useState("en");

  const content = {
    en: {
      title: "AfnoCare",
      description: "Safe and anonymous sexual health care for youth in Nepal.",
      stats: { value: "28", label: "doctors online" },
      actions: {
        secondary: { label: "Login as Doctor", link: "/signup" },
      },
      chatBtn: "Chat Anonymously with AI",
      doctorBtn: "Ask a Doctor Anonymously",
      placeholder: "Your anonymous name..."
    },
    ne: {
      title: "AfnoCare",
      description: "नेपालका युवाहरूका लागि सुरक्षित र गोप्य यौन स्वास्थ्य सेवा।",
      stats: { value: "२८", label: "डाक्टरहरू अनलाइन" },
      actions: {
        secondary: { label: "डाक्टर लगइन", link: "/signup" },
      },
      chatBtn: "गोप्य कुराकानी",
      doctorBtn: "डाक्टरलाई सोध्नुहोस्",
      placeholder: "तपाईंको गोप्य नाम..."
    }
  };

  const { title, description, stats, actions, chatBtn, doctorBtn, placeholder } = content[lang];

  //Set anon name
  const setAnonname = async () => {
    const name = anonnameRef.current.value;
    if (!name.trim()) return toast.error("anon name is required");
    localStorage.setItem("anonname", name.trim());
    navigate('/chat');
  };


  const chatwithdocter=async ()=>{
      const name = anonnameRef.current.value;
    if (!name.trim()) return toast.error("anon name is required");
    localStorage.setItem("anonname", name.trim());
    navigate('/chatwithdocter');
  }

  return (
   <main className="relative h-screen w-screen bg-black overflow-hidden">
  {/* Background - forced to cover without causing scroll */}
  <div className="absolute inset-0 pointer-events-none">
    <img
      src={heroGif}
      alt=""
      className="absolute inset-0 h-full w-full object-cover"
      draggable={false}
    />
    <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/65 to-black/92" />
  </div>

  {/* Language Toggle */}
  <div className="absolute top-6 right-6 z-50">
    <Button
      size="sm"
      variant="ghost"
      className="text-white/80 hover:text-white hover:bg-white/10 border border-white/10 rounded-full h-8 px-3 text-xs backdrop-blur-md transition-all"
      onClick={() => setLang(l => l === "en" ? "ne" : "en")}
    >
      {lang === "en" ? "नेपाली" : "English"}
    </Button>
  </div>

  {/* Content container - uses safe area + flex centering */}
  <div 
    className="
      relative z-10 
      h-screen w-screen 
      flex flex-col items-center justify-center 
      px-5 sm:px-6 
      pb-[env(safe-area-inset-bottom)] pt-[env(safe-area-inset-top)]
    "
  >
    <div className="w-full max-w-md space-y-5 sm:space-y-7">
      <Card
        className="
          w-full
          rounded-2xl
          border border-white/8
          bg-black/30
          backdrop-blur-2xl
          shadow-2xl shadow-black/70
          overflow-hidden
        "
      >
        <CardContent className="p-6 sm:p-8 flex flex-col items-center text-center gap-5 sm:gap-6">
          {/* Logo - smaller on mobile */}
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden ring-4 ring-white/10 shadow-lg">
            <img
              src={logoImage}
              alt="Logo"
              className="w-full h-full object-cover"
              draggable={false}
            />
          </div>

          <h1 
            className="
              text-3.5xl sm:text-4.5xl md:text-5xl 
              font-extrabold 
              tracking-tight 
              bg-gradient-to-b from-white to-white/75 
              bg-clip-text text-transparent
              leading-tight
            "
          >
            {title}
          </h1>

          {/* Live indicator - compact */}
          <div className="flex items-center gap-2 bg-black/40 px-4 py-1.5 rounded-full border border-white/5">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span className="text-sm font-medium text-green-400">
              {stats.value} {stats.label}
            </span>
          </div>

          {/* Description - line clamp + smaller text on mobile */}
          <p className="text-sm sm:text-base text-white/70 leading-relaxed line-clamp-3 max-w-[92%]">
            {description}
          </p>

          {/* Input - compact height */}
          <Input
            type="text"
            ref={anonnameRef}
            placeholder={placeholder}
            className="
              h-11 sm:h-12
              text-sm sm:text-base
              bg-black/40 
              border-white/15 
              text-white 
              placeholder:text-white/50
              focus-visible:ring-[#0F766E]/60
              rounded-xl
            "
          />

          {/* Buttons - stacked, reduced padding/gaps */}
          <div className="w-full space-y-3.5 pt-2">
            <Button
              size="lg"
              onClick={setAnonname}
              className="
                w-full h-12 sm:h-13
                text-sm sm:text-base
                font-bold
                bg-gradient-to-b from-teal-700 to-teal-900
                hover:from-teal-600 hover:to-teal-800
                text-white
                shadow-lg shadow-teal-900/30
                transition-all
                hover:scale-[1.015]
                active:scale-95
                rounded-xl
              "
            >
              {chatBtn}
            </Button>

            <Button
              size="lg"
              onClick={chatwithdocter}
              className="
                w-full h-12 sm:h-13
                text-sm sm:text-base
                font-bold
                bg-gradient-to-b from-teal-700 to-teal-900
                hover:from-teal-600 hover:to-teal-800
                text-white
                shadow-lg shadow-teal-900/30
                transition-all
                hover:scale-[1.015]
                active:scale-95
                rounded-xl
              "
            >
              {doctorBtn}
            </Button>

            <Button
              variant="ghost"
              onClick={() => navigate(actions.secondary.link)}
              className="
                w-full h-10
                text-xs sm:text-sm
                text-teal-400 hover:text-teal-300
                bg-white/5 backdrop-blur-md
                border border-white/10
                hover:bg-white/10
                transition-colors
                rounded-xl
              "
            >
              {actions.secondary.label}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>

  <ToastContainer autoClose={2200} limit={2} position="bottom-center" />
</main>
  );
};

export default Home;

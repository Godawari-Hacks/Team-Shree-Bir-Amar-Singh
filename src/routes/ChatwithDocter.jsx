import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import supabase from "@/config/supabase";

const ChatwithDocter = () => {
  const [anonname, setAnonName] = useState("");
  const [docterlists, setDocterLists] = useState([]);
  const [selectedDocter, setSelectedDocter] = useState(null);
  const [messages, setMessages] = useState([]);
  const messageRef = useRef(null);
  const myChannel = useRef(null);
  const chatContainerRef = useRef(null);

  // Get anon username from localStorage
  useEffect(() => {
    const storedName = localStorage.getItem("anonname");
    if (storedName) {
      setAnonName(storedName);
      fetchDocters();
    }
  }, []);

  // Fetch all available docters
  const fetchDocters = async () => {
    const { data, error } = await supabase.from("available_docters").select();
    if (error) {
      console.error("Error fetching docters:", error.message);
      return;
    }
    setDocterLists(data || []);
  };

  // Create Supabase channel and listen for messages
  useEffect(() => {
    myChannel.current = supabase.channel("message-channel");
    myChannel.current.subscribe();

    const messageReceived = ({ payload }) => {
      const { message, username, sender } = payload;

      // Only show messages for selected doctor
      if (!selectedDocter || username !== selectedDocter.docter_name) return;

      setMessages((prev) => [...prev, { message, username, sender }]);

      // Scroll to bottom
      chatContainerRef.current?.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    };

    myChannel.current.on("broadcast", { event: "message" }, messageReceived);

    return () => {
      myChannel.current.unsubscribe();
      myChannel.current = null;
    };
  }, [selectedDocter]);

  // Select a docter to chat with
  const chatwiththis = (d) => {
    setSelectedDocter(d);
    setMessages([]); // reset chat messages for new doctor
  };

  // Send a message
  const sendMessage = async () => {
    const message = messageRef.current.value.trim();
    if (!message || !selectedDocter) return;

    // Send message to channel
    myChannel.current.send({
      type: "broadcast",
      event: "message",
      payload: {
        message,
        username: selectedDocter.docter_name,
        sender: "patient",
      },
    });

    // Add message locally as patient's own message
    setMessages((prev) => [
      ...prev,
      { message, username: anonname, sender: "patient" },
    ]);

    messageRef.current.value = "";

    chatContainerRef.current?.scrollTo({
      top: chatContainerRef.current.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <main className="h-screen w-full flex flex-col bg-zinc-950 text-zinc-200">
      {/* Header */}
      <header className="p-6 border-b border-white/5 bg-zinc-900/50 backdrop-blur-xl">
        <h1 className="text-2xl font-bold text-center tracking-tight bg-gradient-to-br from-white to-zinc-500 bg-clip-text text-transparent">
          Chat with doctor anonymously
        </h1>
      </header>

      {/* Main chat section */}
      <section className="flex flex-1 overflow-hidden">
        {/* Left panel: docter list */}
        <div className="left w-2/5 h-full border-r border-white/10 p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-800">
          <h2 className="text-lg font-semibold mb-4 text-zinc-100">
            Available Doctors
          </h2>
          {docterlists.length > 0 ? (
            docterlists.map((d, i) => (
              <div
                key={i}
                onClick={() => chatwiththis(d)}
                className={`mb-3 p-4 rounded-xl cursor-pointer transition-all border group relative overflow-hidden ${
                  selectedDocter?.docter_name === d.docter_name
                    ? "bg-emerald-900/20 border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.1)]"
                    : "bg-zinc-900/50 border-white/5 hover:bg-zinc-900/80 hover:border-white/10"
                }`}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                        selectedDocter?.docter_name === d.docter_name
                          ? "bg-emerald-500 text-black"
                          : "bg-zinc-800 text-zinc-400 group-hover:bg-zinc-700"
                      }`}
                    >
                      {d.docter_name.charAt(0).toUpperCase()}
                    </div>
                    <span
                      className={`font-medium transition-colors ${
                        selectedDocter?.docter_name === d.docter_name
                          ? "text-emerald-400"
                          : "text-zinc-300"
                      }`}
                    >
                      {d.docter_name}
                    </span>
                  </div>

                  {selectedDocter?.docter_name === d.docter_name && (
                    <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)] animate-pulse" />
                  )}
                </div>

                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    selectedDocter?.docter_name === d.docter_name
                      ? "max-h-40 opacity-100 mt-3 pt-3 border-t border-emerald-500/10"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-xs text-emerald-200/70 uppercase tracking-wider font-semibold mb-1">
                    Specialization
                  </p>
                  <p className="text-sm text-zinc-300">{d.specialization}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-zinc-500 text-sm text-center mt-10">
              No doctors available right now.
            </p>
          )}
        </div>

        {/* Right panel: chat */}
        <div className="right w-3/5 h-full flex flex-col p-4 bg-zinc-950/50">
          <header className="font-semibold text-lg border-b border-white/10 pb-4 mb-4 text-zinc-100 flex items-center gap-2">
            {selectedDocter ? (
              <>
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                {selectedDocter.docter_name}
              </>
            ) : (
              <span className="text-zinc-500">Select a doctor to chat</span>
            )}
          </header>

          <main
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto mb-4 p-4 border border-white/10 rounded-2xl bg-zinc-900/30 flex flex-col gap-3 scrollbar-thin scrollbar-thumb-zinc-800"
          >
            {messages.length > 0 ? (
              messages.map((msg, i) => (
                <div
                  key={i}
                  className={`p-3 rounded-2xl max-w-sm text-sm ${
                    msg.sender === "patient"
                      ? "bg-emerald-600/20 text-emerald-100 self-end border border-emerald-500/20 rounded-br-none"
                      : "bg-zinc-800 text-zinc-300 self-start border border-white/5 rounded-bl-none"
                  }`}
                >
                  <strong
                    className={`block text-xs mb-1 ${
                      msg.sender === "patient"
                        ? "text-emerald-400"
                        : "text-zinc-500"
                    }`}
                  >
                    {msg.sender === "patient" ? "You" : msg.username}
                  </strong>
                  {msg.message}
                </div>
              ))
            ) : (
              <div className="h-full flex items-center justify-center text-zinc-600 text-sm">
                No messages yet. Start the conversation!
              </div>
            )}
          </main>

          <div className="flex gap-3 items-center">
            {/* Hidden file input */}
            <input
              type="file"
              id="file-upload"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) console.log("Selected file:", file);
              }}
            />

            {/* Add / Attach Icon */}
            <label
              htmlFor="file-upload"
              className="bg-zinc-900 border border-white/10 rounded-xl p-3 hover:bg-zinc-800 transition-all cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </label>

            {/* Message input */}
            <input
              type="text"
              placeholder="Type your message..."
              ref={messageRef}
              className="flex-1 bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-emerald-500/50 transition-all"
            />

            {/* Send button */}
            <Button
              onClick={sendMessage}
              className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl p-6 shadow-[0_0_15px_rgba(16,185,129,0.2)] transition-all"
            >
              <img
                src="https://img.icons8.com/?size=100&id=100004&format=png&color=000000"
                alt="Send"
                className="h-6 w-6"
              />
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ChatwithDocter;

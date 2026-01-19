import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import supabase from "@/config/supabase";
import getUserName from "@/utils/getUserName";

const DocterDashboard = () => {
  const [user, setUser] = useState(null);
  const [userlists, setUserLists] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const messageRef = useRef(null);
  const myChannel = useRef(null);
  const chatContainerRef = useRef(null);
  const navigate = useNavigate();
  const [isVerified, setIsVerified] = useState(false);

  // Create and subscribe to Supabase channel
  useEffect(() => {
    myChannel.current = supabase.channel("message-channel");
    myChannel.current.subscribe();

    const messageReceived = ({ payload }) => {
      const { message, username, sender } = payload;

      // Add new patient to the list if not exists
      if (sender === "patient") {
        const exists = userlists.some((user) => user.username === username);
        if (!exists) {
          setUserLists((prev) => [...prev, { username }]);
        }
      }

      // Only append messages for the selected patient
      if (selectedUser?.username === username || sender === "doctor") {
        setMessages((prev) => [...prev, { message, username, sender }]);

        // Scroll to bottom
        chatContainerRef.current?.scrollTo({
          top: chatContainerRef.current.scrollHeight,
          behavior: "smooth",
        });
      }
    };

    myChannel.current.on("broadcast", { event: "message" }, messageReceived);

    return () => {
      myChannel.current.unsubscribe();
      myChannel.current = null;
    };
  }, [userlists, selectedUser]);

  // Check doctor session
  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.user) {
        setUser(session.user); // keep state
        checkKYC(session.user); // pass the user directly
      } else {
        navigate("/signup");
      }
    };

    checkUser();
  }, [navigate]);

 
const checkKYC = async (currentUser) => {
  try {
    if (!currentUser) return;

    const { data, error } = await supabase
      .from("available_docters")
      .select("is_verified")
      .eq("docter_id", currentUser.id)
      .single();

    if (error) return console.error(error);

    if (!data?.is_verified) {
      navigate("/waiting-verification");
      return;
    }

    setIsVerified(true); // only render dashboard when verified
  } catch (err) {
    console.error(err);
  }
};


  // Select a patient to chat with
  const chatwiththis = (d) => {
    setSelectedUser(d);
    setMessages([]); // clear messages for new patient
  };

  // Send message to selected patient
  const sendMessage = async () => {
    const message = messageRef.current.value.trim();
    if (!message || !selectedUser) return;

    const username = selectedUser.username; // target patient

    // Send message to Supabase channel with sender="doctor"
    myChannel.current.send({
      type: "broadcast",
      event: "message",
      payload: { message, username, sender: "doctor" },
    });

    // Add message locally
    setMessages((prev) => [...prev, { message, username, sender: "doctor" }]);

    messageRef.current.value = "";
    chatContainerRef.current?.scrollTo({
      top: chatContainerRef.current.scrollHeight,
      behavior: "smooth",
    });
  };


  if (!isVerified) {
  return null; // or a loader while checking KYC
}


  return (
    <main className="h-screen w-full flex flex-col bg-zinc-950 text-zinc-200">
        {/* Header */}
        <header className="p-6 border-b border-white/5 bg-zinc-900/50 backdrop-blur-xl">
          <h1 className="text-2xl font-bold text-center tracking-tight bg-gradient-to-br from-white to-zinc-500 bg-clip-text text-transparent">
            Chat with anonymous patients.
          </h1>
        </header>
  
        {/* Main chat */}
        <section className="flex flex-1 overflow-hidden">
          {/* Left panel: patient list */}
          <div className="left w-2/5 h-full border-r border-white/10 p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-800">
            <h2 className="text-lg font-semibold mb-4 text-zinc-100">Anonymous Patients</h2>
            {userlists.length > 0 ? (
              userlists.map((d, i) => (
                <div
                  key={i}
                  className={`mb-3 p-4 rounded-xl flex justify-between items-center transition-all border ${
                    selectedUser?.username === d.username 
                      ? "bg-emerald-900/20 border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.1)]" 
                      : "bg-zinc-900/50 border-white/5 hover:bg-zinc-900 hover:border-white/10"
                  }`}
                >
                  <span className="font-medium text-zinc-200">{d.username}</span>
                  <Button 
                    size="sm" 
                    onClick={() => chatwiththis(d)}
                    className={selectedUser?.username === d.username 
                      ? "bg-emerald-600 hover:bg-emerald-500 text-white" 
                      : "bg-zinc-800 hover:bg-zinc-700 text-zinc-300"}
                  >
                    Chat
                  </Button>
                </div>
              ))
            ) : (
              <p className="text-zinc-500 text-sm text-center mt-10">No patients online yet.</p>
            )}
          </div>
  
          {/* Right panel: chat messages */}
          <div className="right w-3/5 h-full flex flex-col p-4 bg-zinc-950/50">
            <header className="font-semibold text-lg border-b border-white/10 pb-4 mb-4 text-zinc-100 flex items-center gap-2">
              {selectedUser ? (
                <>
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"/>
                  {selectedUser.username}
                </>
              ) : (
                <span className="text-zinc-500">Select a patient to chat</span>
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
                      msg.sender === "doctor" 
                        ? "bg-emerald-600/20 text-emerald-100 self-end border border-emerald-500/20 rounded-br-none" 
                        : "bg-zinc-800 text-zinc-300 self-start border border-white/5 rounded-bl-none"
                    }`}
                  >
                    <strong className={`block text-xs mb-1 ${
                      msg.sender === "doctor" ? "text-emerald-400" : "text-zinc-500"
                    }`}>
                      {msg.sender === "doctor" ? "You" : msg.username}
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
              <input
                type="text"
                placeholder="Type your message..."
                ref={messageRef}
                className="flex-1 bg-zinc-900 border 
                border-white/10 rounded-xl px-4 py-3 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-emerald-500/50 transition-all"
              />
              <Button 
                onClick={sendMessage}
                className="bg-emerald-600
                 hover:bg-emerald-500 text-white
                  rounded-xl px-6
                   shadow-[0_0_15px_rgba(16,185,129,0.2)] transition-all"
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

export default DocterDashboard;

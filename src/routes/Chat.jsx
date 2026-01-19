import { useRef, useState } from "react";
import { useEffect } from "react";
import ChatData from "@/components/custom/ChatData";
import { chat_with_ai } from "@/utils/chat_with_ai";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const sexualHealthProblems = [
  "Sexually Transmitted Infections (STIs)",
  "Unintended Pregnancies",
  "Puberty-Related Issues",
  "Reproductive Health Disorders",
];

// Main jsx
export default function Chat() {
  const [chats, setChats] = useState([]);
  const inputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
   const [anonname, setAnonName] = useState("");

  useEffect(() => {
    const storedName = localStorage.getItem("anonname");
    if (storedName){
      console.log(storedName)
       setAnonName(storedName);
    }
  }, []);

  //Send first message to AI
  async function sendMessage() {
    const message = inputRef.current.value;
    if (!message.trim() || isLoading) return;
    setIsLoading(true);

    console.log("adding the users messsage");
    setChats((prev) => [...prev, { role: "user", message }]);

    // chatting with the ai
    const res = await chat_with_ai(message);
    const { choices } = await res;
    console.log("response from the ai", choices[0].message.content);

    console.log("Settting data into chats");
    setChats((prev) => [
      ...prev,
      { role: "ai", message: choices[0].message.content },
    ]);

    inputRef.current.value = "";
    setIsLoading(false);
  }

  //mantually sending messages to ai
  const handleManaual = (m) => {
    inputRef.current.value = m;
    sendMessage();
  };
  return (
    <main className="h-screen w-full flex flex-col bg-zinc-950 text-zinc-200">
      {/* Header */}
      <header className="p-6 border-b border-white/5 bg-zinc-900/50 backdrop-blur-xl">
        <h1 className="text-2xl font-bold text-center tracking-tight bg-gradient-to-br from-white to-zinc-500 bg-clip-text text-transparent">
          How can we help you ({anonname}) ?
        </h1>
      </header>

      {/* suggestions */}
    <section className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 max-w-4xl mx-auto w-full">
  {sexualHealthProblems.map((s, i) => (
    <div
      key={i}
      onClick={() => handleManaual(s)}
      className="cursor-pointer rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 hover:border-emerald-500/50 transition-all duration-300 px-4 py-3 text-center text-sm text-zinc-400 hover:text-emerald-400 shadow-sm"
    >
      {s}
    </div>
  ))}
</section>


      {/* Chat content */}
      <section className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
        <div className="max-w-4xl mx-auto w-full flex flex-col gap-4">
        {chats.length > 0 &&
          chats.map((c, index) => <ChatData c={c} key={index} />)}
        </div>
      </section>

      {/* Input area */}
      <footer className="flex gap-3 p-4 border-t border-white/5 bg-zinc-900/80 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto w-full flex gap-3">
        <Input
          placeholder="Type your message anonymously..."
          disabled={isLoading}
          ref={inputRef}
          className="flex-1 h-12 rounded-xl px-4 bg-zinc-950 border-white/10 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-emerald-500/30 focus-visible:border-emerald-500/30"
        />

        <Button
          onClick={sendMessage}
          disabled={isLoading}
          className="h-12 px-8 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium shadow-[0_0_15px_rgba(16,185,129,0.2)] transition-all"
        >
          {isLoading ? (
            "Sending..."
          ) : (
            <img
              src="https://img.icons8.com/?size=100&id=100004&format=png&color=000000"
              alt="Send"
              className="h-6 w-6"
            />
          )}
        </Button>
        </div>
      </footer>
    </main>
  );
}

import React from "react";
import { useEffect ,useState} from "react";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router";
import { give_prevention } from "@/utils/give_prevention";

const Questioning = () => {
  const { state } = useLocation();
  const [answers, setAnswers] = useState([]);
  const { calm_reply, questions } = state;
  const navigate=useNavigate()
  const [isLoading, setIsLoading] = useState(false);


  console.log("state", state);


  //   // Handle input change for a question
  const handleAnswerChange = (index, value) => {
    setAnswers((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };

  //Submitting all the answers
    const submitAnswer = async () => {
      setIsLoading(true)
    console.log("Answers", answers);
    const res = await give_prevention(questions, answers);
    const { choices } = res;
    console.log("response from the ai", choices[0].message.content);
    navigate('/overview',{state:{overviews:choices[0].message.content}})
    setIsLoading(false)
  };

  return (
    <main className="min-h-screen w-full bg-zinc-950 text-zinc-200 p-6 md:p-12 flex flex-col items-center overflow-y-auto">
      <div className="max-w-2xl w-full space-y-8">
        <div className="space-y-6">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-zinc-800/40 to-zinc-900/40 p-8 md:p-10 border border-white/5 shadow-2xl backdrop-blur-sm">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
            <h1 className="text-lg md:text-xl font-light text-zinc-100 leading-relaxed tracking-wide text-center whitespace-pre-wrap">
              {calm_reply}
            </h1>
          </div>
          <p className="text-center text-zinc-500 text-xs font-medium tracking-widest uppercase opacity-60">Your answers remain completely anonymous</p>
        </div>

      <section className="space-y-6">
        {questions.length > 0 &&
          questions.map((q, index) => {
            return (
              <div className="group rounded-2xl border border-white/5 bg-zinc-900/50 p-6 backdrop-blur-xl transition-all hover:border-emerald-500/20 hover:bg-zinc-900/80 shadow-sm" key={index}>
                <h2 className="mb-4 text-lg font-medium text-zinc-100">{q}</h2>
                <input
                  type="text"
                  placeholder="Type your answer..."
                  className="w-full rounded-xl border border-white/10 bg-zinc-950 px-4 py-3 text-zinc-100 placeholder:text-zinc-600 focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/50 transition-all"
                  onChange={(e) => handleAnswerChange(index, e.target.value)}
                />
              </div>
            );
          })}

        <div className="flex justify-end pt-4">
          <Button onClick={submitAnswer}
          disabled={isLoading}
          className="h-12 px-8 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium shadow-[0_0_20px_rgba(16,185,129,0.15)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {
              isLoading ? "Analyzing..."  : "Submit Analysis"
            }
          </Button>
        </div>
      </section>
      </div>
    </main>
  );
};

export default Questioning;

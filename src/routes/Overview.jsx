import React from "react";
import { useLocation } from "react-router";
import { Shield, AlertTriangle, FileText, CheckCircle2, Activity, Download } from "lucide-react";

const Overview = () => {
  const { state } = useLocation();
  if (!state) return null;

  const data =
    typeof state.overviews === "string"
      ? JSON.parse(state.overviews)
      : state.overviews;

  const {
    preventives = [],
    main_causes = [],
    evidences = [],
  } = data || {};

  return (
    <main className="min-h-screen w-full bg-zinc-950 text-zinc-400 font-sans selection:bg-zinc-800 print:bg-white print:text-black">
      <div className="mx-auto max-w-3xl px-6 py-12 md:py-20 print:py-10">
        
        {/* Report Header */}
        <header className="mb-12 border-b border-zinc-800 pb-6 flex items-start justify-between print:border-zinc-200">
          <div>
            <div className="flex items-center gap-3 mb-2">
               <Activity className="h-6 w-6 text-emerald-500 print:text-black" />
               <h1 className="text-3xl font-semibold tracking-tight text-zinc-100 print:text-black">Health Analysis Report</h1>
            </div>
            <p className="text-sm text-zinc-500 print:text-zinc-600">Generated overview based on your consultation.</p>
          </div>
          <button 
            onClick={() => window.print()}
            className="flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/50 px-4 py-2 text-xs font-medium text-zinc-400 transition-all hover:bg-zinc-800 hover:text-zinc-100 hover:border-zinc-700 print:hidden"
          >
            <Download className="h-4 w-4" />
            <span>Save Report</span>
          </button>
        </header>

        <div className="space-y-12">
            {/* Preventives */}
            <section>
                <div className="flex items-center gap-2 mb-4 text-emerald-400 print:text-black">
                    <Shield className="h-5 w-5 print:text-black" />
                    <h2 className="text-sm font-medium uppercase tracking-wider">Preventive Measures</h2>
                </div>
                <ul className="grid gap-3">
            {preventives.map((p, i) => (
              <li key={i} className="flex items-start gap-3 rounded-lg border border-zinc-800/50 bg-zinc-900/20 px-4 py-3 transition-colors hover:border-zinc-700/50 print:border-zinc-200 print:bg-transparent">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500/70 print:text-black" />
                <span className="text-sm text-zinc-300 leading-relaxed print:text-black">{p}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Main Causes */}
        <section>
            <div className="flex items-center gap-2 mb-4 text-amber-400 print:text-black">
                <AlertTriangle className="h-5 w-5 print:text-black" />
                <h2 className="text-sm font-medium uppercase tracking-wider">Potential Causes</h2>
            </div>
             <ul className="grid gap-3">
            {main_causes.map((p, i) => (
              <li key={i} className="flex items-start gap-3 rounded-lg border border-zinc-800/50 bg-zinc-900/20 px-4 py-3 transition-colors hover:border-zinc-700/50 print:border-zinc-200 print:bg-transparent">
                <div className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500/70 print:bg-black" />
                <span className="text-sm text-zinc-300 leading-relaxed print:text-black">{p}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Evidences */}
        <section>
            <div className="flex items-center gap-2 mb-4 text-blue-400 print:text-black">
                <FileText className="h-5 w-5 print:text-black" />
                <h2 className="text-sm font-medium uppercase tracking-wider">Clinical Evidence</h2>
            </div>
            <div className="grid gap-4">
            {evidences.map((a, i) => (
              <div key={i} className="group relative overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900/30 p-5 transition-all hover:border-zinc-700 print:border-zinc-200 print:bg-transparent print:break-inside-avoid">
                <p className="text-sm text-zinc-200 leading-relaxed mb-3 print:text-black">"{a.fact}"</p>
                <div className="flex items-center gap-2 border-t border-zinc-800/50 pt-3 print:border-zinc-200">
                    <span className="text-[10px] font-medium uppercase tracking-wider text-zinc-600 print:text-zinc-500">Source</span>
                    <span className="text-xs text-zinc-500 font-medium print:text-black">{a.source}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
        </div>
      </div>
    </main>
  );
};

export default Overview;
  
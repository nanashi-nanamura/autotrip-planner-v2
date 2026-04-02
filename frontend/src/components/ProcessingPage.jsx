import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Loader2 } from "lucide-react";

const STEPS = [
  { id: 1, text: "Finding best travel options..." },
  { id: 2, text: "Selecting hotel based on budget..." },
  { id: 3, text: "Generating itinerary..." },
  { id: 4, text: "Polishing your personalized plan..." },
];

export function ProcessingPage({ onComplete, stepDurationMs = 900 }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const finishedRef = useRef(false);

  useEffect(() => {
    if (activeIndex >= STEPS.length) {
      if (finishedRef.current) return undefined;
      finishedRef.current = true;
      const t = setTimeout(onComplete, 400);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setActiveIndex((i) => i + 1), stepDurationMs);
    return () => clearTimeout(t);
  }, [activeIndex, onComplete, stepDurationMs]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35 }}
      className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-lg flex-col justify-center px-4 py-12 sm:px-6"
    >
      <div className="glass-strong relative overflow-hidden rounded-[1.35rem] p-6 sm:p-10">
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(110deg,transparent_40%,rgba(255,255,255,0.04)_50%,transparent_60%)] bg-[length:200%_100%] animate-shimmer"
          aria-hidden
        />

        <h2 className="relative mb-2 font-display text-xl font-semibold text-white sm:text-2xl">
          Orchestrating your trip
        </h2>
        <p className="relative mb-8 text-sm text-slate-400">
          Live execution panel — each step runs in sequence.
        </p>

        <ul className="relative space-y-4">
          {STEPS.map((step, index) => {
            const done = index < activeIndex;
            const current = index === activeIndex && activeIndex < STEPS.length;
            const pending = index > activeIndex;

            return (
              <motion.li
                key={step.id}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.06 }}
                className={`flex items-start gap-4 rounded-2xl border px-4 py-3 transition-colors ${
                  done
                    ? "border-emerald-500/30 bg-emerald-500/10"
                    : current
                      ? "border-cyan-400/40 bg-cyan-500/10 shadow-glow-cyan"
                      : "border-white/5 bg-white/[0.03]"
                }`}
              >
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                  <AnimatePresence mode="wait">
                    {done ? (
                      <motion.span
                        key="check"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                      >
                        <Check className="h-5 w-5 text-emerald-400" strokeWidth={2.5} />
                      </motion.span>
                    ) : current ? (
                      <motion.span
                        key="load"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-cyan-300"
                      >
                        <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
                      </motion.span>
                    ) : (
                      <motion.span
                        key="wait"
                        className="text-slate-500"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        <span className="text-lg leading-none">⏳</span>
                      </motion.span>
                    )}
                  </AnimatePresence>
                </span>
                <div className="min-w-0 flex-1 pt-1">
                  <p
                    className={`text-sm font-medium ${
                      done ? "text-emerald-100" : current ? "text-cyan-100" : "text-slate-500"
                    }`}
                  >
                    {step.text}
                  </p>
                  {current && (
                    <motion.div
                      className="mt-2 h-1 overflow-hidden rounded-full bg-white/10"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <motion.div
                        className="h-full rounded-full bg-gradient-brand"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: stepDurationMs / 1000, ease: "easeInOut" }}
                      />
                    </motion.div>
                  )}
                </div>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </motion.div>
  );
}

import { motion } from "framer-motion";
import { Plane } from "lucide-react";

export function Navbar({ onBrandClick }) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-20 border-b border-white/5 bg-navy/40 px-4 py-4 backdrop-blur-md sm:px-8"
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between">
        <button
          type="button"
          onClick={() => onBrandClick?.()}
          className="group flex items-center gap-2 font-display text-lg font-semibold tracking-tight text-white transition hover:opacity-90 sm:text-xl"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-brand shadow-glow transition group-hover:scale-105">
            <Plane className="h-4 w-4 text-white" aria-hidden />
          </span>
          <span className="text-gradient">AutoTrip</span>
          <span className="text-cyan-300/90" aria-hidden>
            ✈
          </span>
        </button>
        <p className="hidden text-sm text-slate-400 sm:block">Intelligent Travel Orchestrator</p>
      </div>
    </motion.header>
  );
}

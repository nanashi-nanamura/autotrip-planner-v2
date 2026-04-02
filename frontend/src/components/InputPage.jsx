import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const BUDGETS = [
  { id: "low", label: "Low", emoji: "💸" },
  { id: "medium", label: "Medium", emoji: "💰" },
  { id: "extravagant", label: "Extravagant", emoji: "💎" },
];

function FloatingField({ id, label, value, onChange, type = "text", required }) {
  const isDate = type === "date";
  return (
    <div className="relative">
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={isDate ? undefined : " "}
        required={required}
        className={`w-full rounded-2xl border border-white/10 bg-white/5 px-4 text-sm text-white transition hover:border-white/15 focus:border-cyan-400/50 focus:outline-none focus:ring-[3px] focus:ring-cyan-400/20 ${
          isDate ? "peer py-2.5 pt-7" : "peer pb-2.5 pt-6 placeholder-transparent"
        }`}
      />
      <label
        htmlFor={id}
        className={`pointer-events-none absolute left-4 text-xs font-medium text-violet-200/80 transition-all peer-focus:text-cyan-300 ${
          isDate
            ? "top-2"
            : "top-2 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-slate-400 peer-focus:top-2 peer-focus:text-xs"
        }`}
      >
        {label}
      </label>
    </div>
  );
}

export function InputPage({
  origin,
  destination,
  startDate,
  endDate,
  budget,
  error,
  onOrigin,
  onDestination,
  onStartDate,
  onEndDate,
  onBudget,
  onSubmit,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-lg flex-col justify-center px-4 py-10 sm:px-6"
    >
      <div className="glass-strong relative overflow-hidden rounded-[1.35rem] p-6 shadow-glow sm:p-10">
        <div
          className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-violet-500/20 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-cyan-500/15 blur-3xl"
          aria-hidden
        />

        <div className="relative mb-8 text-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.08 }}
            className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-cyan-200/90"
          >
            <Sparkles className="h-3.5 w-3.5" />
            AI-assisted planning
          </motion.div>
          <h1 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Plan Your Dream Trip
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            Tell us where you&apos;re going — we orchestrate the rest.
          </p>
        </div>

        <form className="relative space-y-5" onSubmit={onSubmit}>
          {error ? (
            <div
              className="rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200"
              role="alert"
            >
              {error}
              <p className="mt-1 text-xs text-red-200/70">
                Run the Spring Boot server on port 8080 (see project <code className="text-cyan-200/90">backend</code>).
              </p>
            </div>
          ) : null}
          <FloatingField id="origin" label="From (city or airport)" value={origin} onChange={onOrigin} required />
          <FloatingField
            id="destination"
            label="To (city or airport)"
            value={destination}
            onChange={onDestination}
            required
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <FloatingField id="start" label="Start date" value={startDate} onChange={onStartDate} type="date" />
            <FloatingField id="end" label="End date" value={endDate} onChange={onEndDate} type="date" />
          </div>

          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Budget</p>
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {BUDGETS.map((b) => {
                const active = budget === b.id;
                return (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => onBudget(b.id)}
                    className={`rounded-2xl border px-2 py-3 text-center text-sm font-semibold transition-all sm:px-3 ${
                      active
                        ? "border-cyan-400/50 bg-gradient-brand text-white shadow-glow-cyan scale-[1.02]"
                        : "border-white/10 bg-white/5 text-slate-200 hover:border-white/20 hover:bg-white/[0.08]"
                    }`}
                  >
                    <span className="mb-0.5 block text-lg" aria-hidden>
                      {b.emoji}
                    </span>
                    {b.label}
                  </button>
                );
              })}
            </div>
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full rounded-2xl bg-gradient-brand py-3.5 font-display text-base font-semibold text-white shadow-glow transition hover:shadow-glow-cyan"
          >
            Generate Trip Plan
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
}

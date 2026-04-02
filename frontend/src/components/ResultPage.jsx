import { motion } from "framer-motion";
import { Building2, CalendarDays, Plane, RotateCcw } from "lucide-react";

const cardMotion = {
  initial: { opacity: 0, y: 20 },
  animate: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.08 * i, duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  }),
};

function Badge({ children, variant }) {
  const styles =
    variant === "luxury"
      ? "border-amber-400/40 bg-amber-500/15 text-amber-200"
      : variant === "budget"
        ? "border-sky-400/40 bg-sky-500/15 text-sky-200"
        : "border-violet-400/40 bg-violet-500/15 text-violet-200";
  return (
    <span className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${styles}`}>{children}</span>
  );
}

export function ResultPage({ plan, onPlanAgain }) {
  const hotelVariant =
    plan.hotel.badge === "Luxury" ? "luxury" : plan.hotel.badge === "Budget" ? "budget" : "balanced";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35 }}
      className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8"
    >
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">Your trip blueprint</h2>
          <p className="mt-1 text-slate-400">Curated transport, stay, and day-by-day flow.</p>
        </div>
        <motion.button
          type="button"
          onClick={onPlanAgain}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center justify-center gap-2 self-start rounded-2xl border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:border-cyan-400/40 hover:bg-white/10"
        >
          <RotateCcw className="h-4 w-4" />
          Plan another trip
        </motion.button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <motion.article
          custom={0}
          variants={cardMotion}
          initial="initial"
          animate="animate"
          whileHover={{ y: -6 }}
          className="glass group relative overflow-hidden rounded-2xl p-6 transition-shadow duration-300 hover:shadow-glow"
        >
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-brand shadow-glow">
              <Plane className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-display text-lg font-semibold text-white">Travel</h3>
          </div>
          <p className="text-sm font-medium text-cyan-200/90">{plan.travel.route}</p>
          <p className="mt-2 text-sm text-slate-300">{plan.travel.mode}</p>
          <p className="mt-3 text-xs text-slate-500">{plan.travel.window}</p>
          <p className="mt-2 text-xs text-slate-400">{plan.travel.carrierHint}</p>
        </motion.article>

        <motion.article
          custom={1}
          variants={cardMotion}
          initial="initial"
          animate="animate"
          whileHover={{ y: -6 }}
          className="glass group relative overflow-hidden rounded-2xl p-6 transition-shadow duration-300 hover:shadow-glow"
        >
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/20 bg-white/10">
                <Building2 className="h-6 w-6 text-violet-200" />
              </div>
              <h3 className="font-display text-lg font-semibold text-white">Hotel</h3>
            </div>
            <Badge variant={hotelVariant}>{plan.hotel.badge}</Badge>
          </div>
          <p className="text-sm font-semibold text-white">{plan.hotel.name}</p>
          <p className="mt-2 text-sm leading-relaxed text-slate-300">{plan.hotel.blurb}</p>
        </motion.article>
      </div>

      <motion.article
        custom={2}
        variants={cardMotion}
        initial="initial"
        animate="animate"
        whileHover={{ y: -4 }}
        className="glass mt-6 overflow-hidden rounded-2xl p-6 transition-shadow hover:shadow-glow-cyan md:p-8"
      >
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/20 bg-white/10">
            <CalendarDays className="h-6 w-6 text-cyan-200" />
          </div>
          <h3 className="font-display text-lg font-semibold text-white">Itinerary</h3>
        </div>

        {/* Mobile: vertical timeline */}
        <ol className="relative space-y-0 border-l border-white/10 pl-4 md:hidden">
          {plan.itinerary.map((block) => (
            <li key={block.day} className="relative pb-8 last:pb-0">
              <span className="absolute -left-[21px] top-1.5 flex h-3 w-3 rounded-full border-2 border-navy bg-gradient-brand shadow-glow" />
              <p className="text-xs font-bold uppercase tracking-wider text-violet-300/90">Day {block.day}</p>
              <p className="mt-1 font-medium text-white">{block.title}</p>
              <ul className="mt-2 space-y-1.5 text-sm text-slate-400">
                {block.items.map((line, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-cyan-500/80">—</span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>

        {/* Tablet+: three-day columns */}
        <div className="hidden gap-4 md:grid md:grid-cols-3">
          {plan.itinerary.map((block) => (
            <div
              key={block.day}
              className="relative rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition hover:border-cyan-400/25"
            >
              <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-brand text-xs font-bold text-white shadow-glow">
                {block.day}
              </div>
              <p className="text-xs font-bold uppercase tracking-wider text-violet-300/90">Day {block.day}</p>
              <p className="mt-1 font-medium text-white">{block.title}</p>
              <ul className="mt-3 space-y-2 text-sm text-slate-400">
                {block.items.map((line, i) => (
                  <li key={i} className="border-t border-white/5 pt-2 first:border-0 first:pt-0">
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </motion.article>
    </motion.div>
  );
}

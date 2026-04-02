import { useCallback, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Navbar } from "./components/Navbar.jsx";
import { InputPage } from "./components/InputPage.jsx";
import { ProcessingPage } from "./components/ProcessingPage.jsx";
import { ResultPage } from "./components/ResultPage.jsx";

const API_BASE = import.meta.env.VITE_API_URL ?? "";

export default function App() {
  const [phase, setPhase] = useState("input");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [budget, setBudget] = useState("medium");
  const [plan, setPlan] = useState(null);
  const [error, setError] = useState("");
  const planPromiseRef = useRef(null);

  const goInput = useCallback(() => {
    setPhase("input");
    setPlan(null);
    setError("");
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    planPromiseRef.current = fetch(`${API_BASE}/api/trip/plan`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        origin: origin.trim(),
        destination: destination.trim(),
        budget,
        startDate: startDate || null,
        endDate: endDate || null,
      }),
    }).then(async (res) => {
      const text = await res.text();
      if (!res.ok) {
        throw new Error(text || `Request failed (${res.status})`);
      }
      return text ? JSON.parse(text) : null;
    });
    setPhase("processing");
  };

  const finishProcessing = useCallback(async () => {
    try {
      const next = await planPromiseRef.current;
      setPlan(next);
      setPhase("result");
    } catch (err) {
      setError(err.message || "Could not reach the trip planner service.");
      setPhase("input");
    }
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-navy bg-mesh">
      <Navbar onBrandClick={goInput} />

      <main className="relative z-10">
        <AnimatePresence mode="wait">
          {phase === "input" && (
            <motion.div
              key="input"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <InputPage
                origin={origin}
                destination={destination}
                startDate={startDate}
                endDate={endDate}
                budget={budget}
                error={error}
                onOrigin={setOrigin}
                onDestination={setDestination}
                onStartDate={setStartDate}
                onEndDate={setEndDate}
                onBudget={setBudget}
                onSubmit={handleSubmit}
              />
            </motion.div>
          )}

          {phase === "processing" && (
            <motion.div
              key="processing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <ProcessingPage onComplete={finishProcessing} stepDurationMs={950} />
            </motion.div>
          )}

          {phase === "result" && plan && (
            <motion.div
              key="result"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <ResultPage plan={plan} onPlanAgain={goInput} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

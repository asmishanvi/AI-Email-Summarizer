import { useState } from "react";
import EmailInput from "../components/EmailInput";
import AnalyzeButton from "../components/AnalyzeButton";
import ResultCard from "../components/ResultCard";
import { analyzeEmail, AnalysisResult } from "../services/api";

const EXAMPLES = [
  "Please finish the tax report by Friday and share it with the finance team.",
  "Can you review the onboarding deck by March 15 and send feedback to Alex?",
  "Let's meet next Tuesday to finalize the Q2 roadmap. Please prepare the KPI snapshot."
];

export default function Home() {
  const [emailText, setEmailText] = useState("");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!emailText.trim()) {
      setError("Please paste an email before analyzing.");
      setResult(null);
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const analysis = await analyzeEmail(emailText.trim());
      setResult(analysis);
    } catch (err) {
      setError("We couldn't analyze this email. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleExample = (text: string) => {
    setEmailText(text);
    setError(null);
    setResult(null);
  };

  return (
    <div className="px-6 py-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <header className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-slate-500">
              AI Workflow
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-ink sm:text-4xl">
              AI Email Summarizer & Task Extractor
            </h1>
            <p className="mt-3 max-w-2xl text-base text-slate-600">
              Paste any email and get a crisp summary, action items, and deadlines
              ready to drop into your task system.
            </p>
          </div>
          <div className="rounded-2xl border border-white/70 bg-white/70 px-4 py-3 text-sm text-slate-600 shadow-soft">
            <div className="font-semibold text-ink">Tip</div>
            <div>Clear verbs and dates improve extraction quality.</div>
          </div>
        </header>

        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <section className="rounded-3xl border border-white/80 bg-white/80 p-6 shadow-soft backdrop-blur">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-ink">Email Input</h2>
              <span className="text-xs uppercase tracking-[0.2em] text-slate-500">
                Ready
              </span>
            </div>

            <EmailInput
              value={emailText}
              onChange={(value) => {
                setEmailText(value);
                if (error) {
                  setError(null);
                }
              }}
            />

            <div className="mt-6 flex flex-wrap items-center gap-2 text-xs text-slate-600">
              <span className="rounded-full bg-slate-100 px-3 py-1">
                Try an example:
              </span>
              {EXAMPLES.map((example, index) => (
                <button
                  key={example}
                  type="button"
                  onClick={() => handleExample(example)}
                  className="rounded-full border border-slate-200 bg-white px-3 py-1 transition hover:border-slate-300 hover:bg-slate-50"
                >
                  Example {index + 1}
                </button>
              ))}
            </div>

            <div className="mt-6">
              <AnalyzeButton
                onClick={handleAnalyze}
                loading={loading}
                disabled={loading}
              />
            </div>
          </section>

          <ResultCard result={result} loading={loading} error={error} />
        </div>
      </div>
    </div>
  );
}

import TaskList from "./TaskList";
import { AnalysisResult } from "../services/api";

interface ResultCardProps {
  result: AnalysisResult | null;
  loading: boolean;
  error: string | null;
}

export default function ResultCard({ result, loading, error }: ResultCardProps) {
  return (
    <section className="rounded-3xl border border-white/80 bg-white/85 p-6 shadow-soft backdrop-blur">
      <h2 className="text-lg font-semibold text-ink">Analysis</h2>

      {loading ? (
        <div className="mt-6 rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-6 text-sm text-slate-600">
          Analyzing the email and extracting structured insights...
        </div>
      ) : error ? (
        <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-6 text-sm text-red-700">
          {error}
        </div>
      ) : !result ? (
        <div className="mt-6 rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-6 text-sm text-slate-600">
          Paste an email and click Analyze to see the summary, tasks, and deadlines.
        </div>
      ) : (
        <div className="mt-6 space-y-6">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
              Summary
            </p>
            <p className="mt-2 text-base text-slate-700">
              {result.summary || "No summary returned."}
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
              Tasks
            </p>
            <div className="mt-3">
              <TaskList tasks={result.tasks} />
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
              Deadlines
            </p>
            <div className="mt-3">
              {result.deadlines.length ? (
                <ul className="flex flex-wrap gap-2">
                  {result.deadlines.map((deadline) => (
                    <li
                      key={deadline}
                      className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700"
                    >
                      {deadline}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-slate-500">No deadlines found.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

interface AnalyzeButtonProps {
  onClick: () => void;
  loading: boolean;
  disabled?: boolean;
}

export default function AnalyzeButton({
  onClick,
  loading,
  disabled
}: AnalyzeButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-ocean px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white shadow-soft transition hover:bg-ocean/90 disabled:cursor-not-allowed disabled:opacity-70"
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/70 border-t-transparent" />
          Analyzing
        </span>
      ) : (
        "Analyze Email"
      )}
    </button>
  );
}

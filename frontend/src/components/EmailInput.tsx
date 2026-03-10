interface EmailInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function EmailInput({ value, onChange }: EmailInputProps) {
  return (
    <div className="mt-4">
      <label className="text-sm font-medium text-slate-700">Paste email text</label>
      <textarea
        className="mt-2 h-56 w-full resize-none rounded-2xl border border-slate-200 bg-white/90 p-4 text-sm text-slate-800 shadow-sm outline-none transition focus:border-ocean focus:ring-2 focus:ring-ocean/20"
        placeholder="Paste the email or message here..."
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}

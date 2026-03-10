interface TaskListProps {
  tasks: string[];
}

export default function TaskList({ tasks }: TaskListProps) {
  if (!tasks.length) {
    return <p className="text-sm text-slate-500">No tasks found.</p>;
  }

  return (
    <ul className="space-y-2">
      {tasks.map((task, index) => (
        <li
          key={`${task}-${index}`}
          className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50 px-3 py-2 text-sm text-slate-700"
        >
          <span className="mt-1 h-2.5 w-2.5 rounded-full bg-ocean" />
          <span>{task}</span>
        </li>
      ))}
    </ul>
  );
}

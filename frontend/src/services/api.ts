export interface AnalysisResult {
  summary: string;
  tasks: string[];
  deadlines: string[];
}

const ACTION_TRIGGERS = [
  "please",
  "kindly",
  "can you",
  "could you",
  "would you",
  "need to",
  "needs to",
  "you should",
  "remember to",
  "make sure to",
  "let's",
  "let us",
  "we should",
  "action item",
  "action items",
  "todo",
  "to-do"
];

const BULLET_REGEX = /^(\d+[.)]|[-*•])\s+/;

const DEADLINE_PATTERNS: RegExp[] = [
  /\b(?:by|before|on|due|deadline|no later than)\s+((?:next|this)?\s*(?:monday|tuesday|wednesday|thursday|friday|saturday|sunday))\b/gi,
  /\b(?:by|before|on|due|deadline|no later than)\s+([a-z]{3,9}\s+\d{1,2}(?:st|nd|rd|th)?(?:,\s*\d{4})?)\b/gi,
  /\b(?:by|before|on|due|deadline|no later than)\s+(\d{1,2}\/\d{1,2}(?:\/\d{2,4})?)\b/gi,
  /\b(?:by|before|on|due|deadline|no later than)\s+(\d{4}-\d{2}-\d{2})\b/gi,
  /\b(?:today|tomorrow|tonight|eod|end of day|eow|end of week|eom|end of month|eoq|end of quarter)\b/gi
];

function normalizeSpaces(text: string): string {
  return text.replace(/\s+/g, " ").trim();
}

function splitSentences(text: string): string[] {
  const normalized = normalizeSpaces(text);
  if (!normalized) {
    return [];
  }

  const matches = normalized.match(/[^.!?]+[.!?]*/g);
  if (!matches) {
    return [normalized];
  }

  return matches.map((sentence) => sentence.trim()).filter(Boolean);
}

function stripLeadPhrases(text: string): string {
  let cleaned = text.trim();
  cleaned = cleaned.replace(BULLET_REGEX, "");

  const lower = cleaned.toLowerCase();
  for (const trigger of ACTION_TRIGGERS) {
    if (lower.startsWith(`${trigger} `)) {
      cleaned = cleaned.slice(trigger.length).trim();
      break;
    }
  }

  return cleaned.replace(/[.!?]+$/, "").trim();
}

function extractSummary(emailText: string): string {
  const sentences = splitSentences(emailText);
  let summary = sentences[0] || normalizeSpaces(emailText);
  summary = summary.replace(/^(please|kindly)\s+/i, "").trim();

  if (!summary) {
    return "";
  }

  if (summary.length > 200) {
    summary = `${summary.slice(0, 197)}...`;
  }

  if (!/[.!?]$/.test(summary)) {
    summary = `${summary}.`;
  }

  return summary;
}

function splitCompoundTasks(task: string): string[] {
  const parts = task.split(/\s+and\s+/i).map((part) => part.trim());
  if (parts.length <= 1) {
    return [task];
  }
  return parts.filter(Boolean);
}

function extractTasks(emailText: string): string[] {
  const tasks = new Set<string>();
  const lines = emailText.split(/\r?\n/).map((line) => line.trim());

  for (const line of lines) {
    if (!line) {
      continue;
    }

    if (BULLET_REGEX.test(line)) {
      const cleaned = stripLeadPhrases(line);
      splitCompoundTasks(cleaned).forEach((task) => tasks.add(task));
      continue;
    }

    const actionItemMatch = line.match(/action items?:\s*(.+)/i);
    if (actionItemMatch?.[1]) {
      actionItemMatch[1]
        .split(/[;•]/)
        .map((item) => item.trim())
        .filter(Boolean)
        .forEach((item) => tasks.add(stripLeadPhrases(item)));
      continue;
    }

    const hasTrigger = ACTION_TRIGGERS.some((trigger) =>
      line.toLowerCase().includes(trigger)
    );
    if (hasTrigger) {
      const cleaned = stripLeadPhrases(line);
      splitCompoundTasks(cleaned).forEach((task) => tasks.add(task));
    }
  }

  const sentences = splitSentences(emailText);
  for (const sentence of sentences) {
    const lower = sentence.toLowerCase();
    if (ACTION_TRIGGERS.some((trigger) => lower.includes(trigger))) {
      const cleaned = stripLeadPhrases(sentence);
      splitCompoundTasks(cleaned).forEach((task) => tasks.add(task));
    }
  }

  return Array.from(tasks).filter(Boolean);
}

function extractDeadlines(emailText: string): string[] {
  const deadlines = new Set<string>();

  for (const pattern of DEADLINE_PATTERNS) {
    pattern.lastIndex = 0;
    let match: RegExpExecArray | null;
    while ((match = pattern.exec(emailText)) !== null) {
      const value = (match[1] || match[0]).trim();
      if (value) {
        deadlines.add(value);
      }
    }
  }

  return Array.from(deadlines);
}

export async function analyzeEmail(emailText: string): Promise<AnalysisResult> {
  const cleaned = emailText.trim();

  if (!cleaned) {
    return {
      summary: "",
      tasks: [],
      deadlines: []
    };
  }

  return {
    summary: extractSummary(cleaned),
    tasks: extractTasks(cleaned),
    deadlines: extractDeadlines(cleaned)
  };
}

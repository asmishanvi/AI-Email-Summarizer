# AI Email Summarizer and Task Extractor

A frontend-only web app that turns email text into a short summary, actionable tasks, and detected deadlines using rule-based heuristics (no API keys or paid services required).

## Features
- Paste any email and analyze it with one click
- Structured output: summary, tasks, and deadlines
- Input validation and error handling
- Responsive, modern UI

## Project Structure
frontend/
  src/
    components/
    pages/
    services/

## Setup
1. `cd frontend`
2. `npm install`
3. `npm run dev`

Frontend runs on `http://localhost:5173`.

## Example Emails
- Please finish the tax report by Friday and share it with the finance team.
- Can you review the onboarding deck by March 15 and send feedback to Alex?
- Let's meet next Tuesday to finalize the Q2 roadmap. Please prepare the KPI snapshot.

## Extraction Logic
This project uses local heuristics (no network calls) to extract:
- Summary (first sentence, normalized)
- Tasks (lines or sentences containing action phrases)
- Deadlines (simple date/day/time phrases)

## Future Extension
- Optional backend for OpenAI or Gmail integration.

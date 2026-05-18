# Operational MEL Command Centre — Sample Tool

A sanitised, public-facing demonstration of how MEL systems, data quality, partner reporting, dashboards, indicator tracking, and management action follow-up connect into a single operational system for multi-partner development programs.

## Sanitisation statement

This is a sanitised public sample created to demonstrate MEL systems design, dashboarding, data quality tracking, partner reporting workflows, and operational tool development. It does not contain confidential information from any employer, donor, client, partner, or active program. All partners, indicators, values, dates, and findings are fictional and illustrative.

## What V1 includes

- Executive Portfolio Dashboard: headline metrics, RAG status, target performance, gender disaggregation, partner status, DQA and reporting trends
- Indicator Tracker / PITT: illustrative indicators with quarterly data, aggregation logic, data quality flags, and filtered views
- Data Quality Review: five-dimension DQA scoring, radar chart, heatmap, recurring issues, and corrective actions
- Partner Reporting Tracker: submission compliance, timeliness, completeness, quality, review status, and next action
- Management Action Tracker: actions from reports, DQAs, evaluations, and CLA reviews, with priority, owner, due date, and status

Planned for V2: field survey operations, beneficiary traceability, evidence repository, CLA and learning log, and executive report builder.

## Tech stack

- React 18 + Vite
- Tailwind CSS
- Recharts
- Lucide React
- IBM Plex Sans and IBM Plex Mono

No backend. All data is local mock data in `src/App.jsx`.

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Build for production

```bash
npm run build
npm run preview
```

Output is in `dist/`.

## Deploy to Vercel

1. Connect this GitHub repository to Vercel.
2. Vercel should auto-detect Vite.
3. Build command: `npm run build`.
4. Output directory: `dist`.
5. Deploy.

## Author

Michael Ashiteye — MEL & Project Management Specialist  
https://www.linkedin.com/in/michael-ashiteye-0580a971

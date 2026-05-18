import React, { useMemo, useState } from 'react';
import {
  BarChart, Bar, LineChart, Line, RadarChart, Radar, PolarGrid, PolarAngleAxis,
  PolarRadiusAxis, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';
import { LayoutDashboard, BarChart3, ShieldCheck, FileCheck2, ClipboardList, Info, Search, AlertTriangle, Filter, Linkedin } from 'lucide-react';

const NAVY = '#1F3A5F';
const NAVY_LIGHT = '#2E5A87';
const GOLD = '#B8924A';
const RAG = {
  green: { text: '#15803D', bg: '#DCFCE7', solid: '#16A34A' },
  amber: { text: '#B45309', bg: '#FEF3C7', solid: '#D97706' },
  red: { text: '#B91C1C', bg: '#FEE2E2', solid: '#DC2626' },
  grey: { text: '#475569', bg: '#F1F5F9', solid: '#64748B' }
};

const partners = [
  { id: 'A', name: 'Partner A', focus: 'Inclusive Finance', status: 'amber', dqa: 4.12 },
  { id: 'B', name: 'Partner B', focus: 'Enterprise Growth', status: 'amber', dqa: 3.60 },
  { id: 'C', name: 'Partner C', focus: 'Youth Skills & Work', status: 'green', dqa: 4.40 },
  { id: 'D', name: 'Partner D', focus: 'Last-Mile Financial', status: 'red', dqa: 2.96 }
];

const metrics = [
  ['Total Beneficiaries Reached', 98420, 125000, '+12% QoQ'],
  ['Youth in Dignified Work', 41200, 45000, '+8% QoQ'],
  ['MSMEs Accessing Finance', 7100, 8500, '+5% QoQ'],
  ['Women-Led Enterprises Supported', 4950, 5200, '+15% QoQ'],
  ['Value of Finance Mobilised', 62.4, 85, '+3% QoQ', '$', 'M'],
  ['Partners Meeting DQA Standard', 75, 100, 'No change', '', '%'],
  ['Reports Submitted On Time', 67, 100, '-8% QoQ', '', '%'],
  ['Open Management Actions', 11, null, '+2 this quarter']
];

const progress = [
  { indicator: 'Beneficiaries', Target: 100, Actual: 78 },
  { indicator: 'Youth in Work', Target: 100, Actual: 92 },
  { indicator: 'MSME Finance', Target: 100, Actual: 84 },
  { indicator: 'Women-led Ent.', Target: 100, Actual: 95 },
  { indicator: 'Finance Mobilised', Target: 100, Actual: 73 },
  { indicator: 'Training Delivered', Target: 100, Actual: 102 }
];

const youth = [
  { partner: 'Partner A', female: 4200, male: 3100 },
  { partner: 'Partner B', female: 5800, male: 4900 },
  { partner: 'Partner C', female: 9400, male: 6200 },
  { partner: 'Partner D', female: 4600, male: 3000 }
];

const gender = [
  { name: 'Women & Girls', value: 58, fill: NAVY },
  { name: 'Men & Boys', value: 41, fill: NAVY_LIGHT },
  { name: 'Not disclosed', value: 1, fill: '#CBD5E1' }
];

const trend = [
  { q: 'Q1 Y1', dqa: 3.2, reporting: 50 }, { q: 'Q2 Y1', dqa: 3.4, reporting: 67 },
  { q: 'Q3 Y1', dqa: 3.5, reporting: 75 }, { q: 'Q4 Y1', dqa: 3.7, reporting: 75 },
  { q: 'Q1 Y2', dqa: 3.6, reporting: 75 }, { q: 'Q2 Y2', dqa: 3.8, reporting: 67 },
  { q: 'Q3 Y2', dqa: 3.77, reporting: 67 }
];

const indicators = [
  ['IMP-1.1', 'Youth in dignified and fulfilling work', 'Impact', 'All', 45000, 9800, 10400, 11000, 10000, 'sum', false, 'Complete'],
  ['IMP-2.1', 'Individual resilience score', 'Impact', 'All', 3.8, null, 3.1, null, 3.4, 'latest', false, 'Complete'],
  ['OUT-1.1', 'MSMEs accessing financial products', 'Outcome', 'A, B', 8500, 1450, 1820, 1980, 1850, 'sum', false, 'Complete'],
  ['OUT-1.2', 'Enterprises reporting productivity gains', 'Outcome', 'B, D', 3200, 580, 720, 840, 760, 'sum', false, 'Complete'],
  ['OUT-2.1', 'Financial institutions adopting inclusive products', 'Outcome', 'A, D', 12, 2, 3, 2, 2, 'sum', false, 'N/A'],
  ['OUT-2.2', 'Value of credit unlocked', 'Outcome', 'A, D', 85, 12, 14, 18, 18.4, 'sum', false, 'N/A'],
  ['OUT-3.1', 'Youth demonstrating improved skills', 'Outcome', 'C', 22000, 4800, 5600, 6100, 5400, 'sum', false, 'Complete'],
  ['OUP-1.1', 'Individuals participating in training', 'Output', 'A, B, C, D', 35000, 8200, 9100, 9800, 8600, 'sum', false, 'Complete'],
  ['OUP-2.1', 'MSMEs receiving BDS', 'Output', 'A, B', 6800, 1300, 1620, 1750, 1480, 'sum', false, 'Complete'],
  ['OUP-2.2', 'Functional savings groups supported', 'Output', 'D', 1200, 240, 290, 320, 280, 'sum', true, 'Missing age'],
  ['OUT-4.1', 'Policy reforms influenced', 'Outcome', 'A, D', 6, null, 1, null, 2, 'sum', true, 'Stale']
].map(([code, name, level, partner, target, q1, q2, q3, q4, aggregation, dqaFlag, disagg]) => ({ code, name, level, partner, target, q1, q2, q3, q4, aggregation, dqaFlag, disagg }));

const dqaScores = [
  { partner: 'Partner A', Validity: 4.2, Reliability: 4.0, Integrity: 4.5, Precision: 3.8, Timeliness: 4.1, overall: 4.12, rating: 'Strong' },
  { partner: 'Partner B', Validity: 3.8, Reliability: 3.5, Integrity: 4.0, Precision: 3.2, Timeliness: 3.5, overall: 3.60, rating: 'Acceptable' },
  { partner: 'Partner C', Validity: 4.5, Reliability: 4.3, Integrity: 4.6, Precision: 4.2, Timeliness: 4.4, overall: 4.40, rating: 'Strong' },
  { partner: 'Partner D', Validity: 3.0, Reliability: 2.8, Integrity: 3.5, Precision: 2.5, Timeliness: 3.0, overall: 2.96, rating: 'Needs Improvement' }
];
const dimensions = ['Validity', 'Reliability', 'Integrity', 'Precision', 'Timeliness'];
const dqaIssues = [
  ['DQA-014', 'Partner D', 'OUP-2.2', 'Precision', 'Age disaggregation missing from group registers', 'Update register template and train field officers', '2026-06-15', 'In Progress'],
  ['DQA-013', 'Partner D', 'OUT-4.1', 'Timeliness', 'Policy tracker not updated since Q2', 'Backdate entries and establish monthly update cadence', '2026-05-31', 'Overdue'],
  ['DQA-012', 'Partner B', 'OUT-1.2', 'Precision', 'Productivity scores aggregated with inconsistent methodology', 'Apply single scoring rubric and recompute values', '2026-06-30', 'In Progress'],
  ['DQA-011', 'Partner B', 'OUP-2.1', 'Reliability', 'BDS attendance and recipient lists do not reconcile', 'Spot-check submissions and reconcile rosters', '2026-05-25', 'Open'],
  ['DQA-008', 'Partner C', 'OUT-3.1', 'Validity', 'Pre/post test items not piloted in current cohort context', 'Pilot revised instrument with 30 participants', '2026-07-15', 'In Progress']
].map(([id, partner, indicator, dimension, issue, action, due, status]) => ({ id, partner, indicator, dimension, issue, action, due, status }));

const reports = [
  ['R-12', 'Partner A', 'Quarterly Q3', '2026-04-15', '2026-04-14', 0, 96, 4.0, 'Approved', 'Closed'],
  ['R-13', 'Partner B', 'Quarterly Q3', '2026-04-15', '2026-04-15', 0, 88, 3.5, 'Conditional', 'Revisions requested'],
  ['R-14', 'Partner C', 'Quarterly Q3', '2026-04-15', '2026-04-13', 0, 99, 4.4, 'Approved', 'Closed'],
  ['R-15', 'Partner D', 'Quarterly Q3', '2026-04-15', null, 33, null, null, 'Pending', 'Escalated'],
  ['R-16', 'Partner A', 'Annual Y2', '2026-03-31', '2026-03-30', 0, 94, 4.1, 'Approved', 'Closed'],
  ['R-17', 'Partner B', 'Annual Y2', '2026-03-31', '2026-04-10', 10, 85, 3.4, 'Conditional', 'Revisions requested'],
  ['R-18', 'Partner C', 'Annual Y2', '2026-03-31', '2026-03-29', 0, 100, 4.5, 'Approved', 'Closed'],
  ['R-19', 'Partner D', 'Annual Y2', '2026-03-31', '2026-04-25', 25, 76, 2.9, 'Rejected', 'Resubmission required'],
  ['R-20', 'Partner A', 'DQA Response Q2', '2026-02-28', '2026-02-26', 0, 100, 4.2, 'Approved', 'Closed'],
  ['R-21', 'Partner B', 'DQA Response Q2', '2026-02-28', '2026-02-27', 0, 92, 3.6, 'Approved', 'Closed'],
  ['R-22', 'Partner C', 'DQA Response Q2', '2026-02-28', '2026-02-25', 0, 100, 4.6, 'Approved', 'Closed'],
  ['R-23', 'Partner D', 'DQA Response Q2', '2026-02-28', '2026-03-22', 22, 70, 2.8, 'Conditional', 'Further response requested']
].map(([id, partner, type, due, submitted, late, completeness, quality, review, action]) => ({ id, partner, type, due, submitted, late, completeness, quality, review, action }));

const actions = [
  ['ACT-031', 'D', 'DQA Q3', 'Late reporting from Partner D for three cycles', 'Embed MEL officer support and review staffing capacity', 'Program MEL Lead', '2026-06-15', 'High', 'In Progress'],
  ['ACT-030', 'C', 'Evaluation', 'Weak training-to-work linkage for one cohort', 'Strengthen placement support and pilot tracer approach', 'C / Program Lead', '2026-07-30', 'High', 'In Progress'],
  ['ACT-029', 'D', 'CLA Review', 'VSLA groups reporting lower repayment than benchmark', 'Diagnostic study and review group formation criteria', 'D / Field Lead', '2026-06-30', 'Medium', 'Open'],
  ['ACT-028', 'B', 'Partner Report', 'Revenue data shows implausible jumps', 'Validate source and re-administer survey if needed', 'B / M&E Lead', '2026-05-31', 'High', 'Open'],
  ['ACT-027', 'All', 'Annual Review', 'Disability disaggregation incomplete', 'Add disability fields to PIRDs and train partners', 'Program MEL Lead', '2026-08-15', 'Medium', 'Open'],
  ['ACT-025', 'A', 'Partner Report', 'Loan portfolio data lagging by 30+ days', 'Negotiate data-sharing SLA and explore API integration', 'A / MEL Officer', '2026-09-30', 'Low', 'Open'],
  ['ACT-023', 'A', 'CLA Review', 'Gender-responsive product uptake below projection', 'Co-create revised features with women entrepreneurs', 'A / Product Lead', '2026-06-30', 'High', 'In Progress'],
  ['ACT-021', 'All', 'Partner Report', 'Youth-led enterprise definition inconsistent', 'Finalize harmonised definition and reconcile data', 'Program MEL Lead', '2026-05-15', 'High', 'Resolved']
].map(([id, partner, source, issue, recommendation, owner, due, priority, status]) => ({ id, partner, source, issue, recommendation, owner, due, priority, status }));

const n = (v) => v === null || v === undefined ? '—' : (typeof v === 'number' ? (v % 1 ? v.toFixed(1) : v.toLocaleString()) : v);
const statusFromPct = (pct) => pct === null ? 'grey' : pct >= 90 ? 'green' : pct >= 70 ? 'amber' : 'red';
const Badge = ({ status, children }) => <span className="inline-flex items-center gap-1.5 rounded-sm px-2 py-0.5 text-xs font-medium" style={{ background: RAG[status].bg, color: RAG[status].text }}><span className="h-1.5 w-1.5 rounded-full" style={{ background: RAG[status].solid }} />{children}</span>;
const Card = ({ children, className = '' }) => <div className={`border border-slate-200 bg-white ${className}`}>{children}</div>;
const CardHeader = ({ title, subtitle }) => <div className="border-b border-slate-200 px-5 py-3"><h3 className="text-sm font-semibold text-slate-900">{title}</h3>{subtitle && <p className="mt-0.5 text-xs text-slate-500">{subtitle}</p>}</div>;
const partnerFilter = (partner, selected) => selected === 'All' || partner === 'All' || partner.includes(selected) || partner === `Partner ${selected}`;
const quarterIndex = { Q1: 0, Q2: 1, Q3: 2, Q4: 3, All: 3 };
const getValues = (row, quarter) => [row.q1, row.q2, row.q3, row.q4].slice(0, (quarterIndex[quarter] ?? 3) + 1).filter(v => v !== null && v !== undefined);
const ytd = (row, quarter = 'All') => { const vals = getValues(row, quarter); if (!vals.length) return null; if (row.aggregation === 'latest') return vals[vals.length - 1]; if (row.aggregation === 'average') return vals.reduce((a, b) => a + b, 0) / vals.length; return vals.reduce((a, b) => a + b, 0); };
const pct = (row, quarter = 'All') => row.target ? Math.round((ytd(row, quarter) / row.target) * 100) : null;

function PageHeader({ title, subtitle, filters, setFilters }) {
  return <div className="space-y-4"><div><h1 className="text-2xl font-bold tracking-tight text-slate-900">{title}</h1><p className="mt-0.5 text-sm text-slate-600">{subtitle}</p></div><Card className="px-4 py-3"><div className="flex flex-wrap items-center gap-2"><Filter className="h-3.5 w-3.5 text-slate-500" /><span className="mr-2 text-xs font-medium uppercase tracking-wider text-slate-500">Filters</span>{[{ k: 'quarter', label: 'Quarter', options: ['All', 'Q1', 'Q2', 'Q3', 'Q4'] }, { k: 'partner', label: 'Partner', options: ['All', 'A', 'B', 'C', 'D'] }].map(f => <div key={f.k} className="flex items-center gap-1.5"><span className="text-xs text-slate-500">{f.label}:</span><select value={filters[f.k]} onChange={e => setFilters({ ...filters, [f.k]: e.target.value })} className="border border-slate-200 bg-white px-2 py-1 text-xs text-slate-700 outline-none">{f.options.map(o => <option key={o}>{o}</option>)}</select></div>)}{(filters.partner !== 'All' || filters.quarter !== 'All') && <button onClick={() => setFilters({ quarter: 'All', partner: 'All' })} className="text-xs text-slate-500 underline">Clear filters</button>}</div></Card></div>;
}

function Stat({ m }) {
  const [label, value, target, trend, prefix = '', suffix = ''] = m;
  const p = target ? Math.round((value / target) * 100) : null;
  return <Card className="p-4"><p className="text-[11px] font-medium uppercase tracking-wider text-slate-500">{label}</p><div className="mt-1.5 flex items-baseline gap-2"><span className="text-2xl font-semibold tabular-nums text-slate-900">{prefix}{n(value)}{suffix}</span>{target && <span className="text-xs text-slate-500">/ {prefix}{n(target)}{suffix}</span>}</div><div className="mt-2 flex items-center justify-between">{p ? <Badge status={statusFromPct(p)}>{p}% of target</Badge> : <span className="text-xs text-slate-500">{trend}</span>}<span className="text-[11px] text-slate-500">{p ? trend : ''}</span></div></Card>;
}

function Dashboard({ filters, setFilters }) {
  const scopedYouth = youth.filter(r => partnerFilter(r.partner, filters.partner));
  const scopedPartners = partners.filter(p => filters.partner === 'All' || p.id === filters.partner);
  return <div className="space-y-6"><PageHeader title="Executive Portfolio Dashboard" subtitle="Portfolio-wide performance across four flagship partner programs" filters={filters} setFilters={setFilters} /><div className="grid grid-cols-2 gap-3 lg:grid-cols-4">{metrics.map((m, i) => <Stat key={i} m={m} />)}</div><div className="grid grid-cols-1 gap-3 lg:grid-cols-3"><Card className="lg:col-span-2"><CardHeader title="Portfolio Performance Against Annual Targets" subtitle="Year 2 to date" /><div className="h-72 p-4"><ResponsiveContainer><BarChart data={progress} layout="vertical" margin={{ left: 90, right: 30 }}><CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" horizontal={false} /><XAxis type="number" domain={[0, 110]} tickFormatter={v => `${v}%`} tick={{ fontSize: 11 }} /><YAxis dataKey="indicator" type="category" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} /><Tooltip formatter={v => `${v}%`} /><Bar dataKey="Target" fill="#E2E8F0" /><Bar dataKey="Actual" fill={NAVY} /></BarChart></ResponsiveContainer></div></Card><Card><CardHeader title="Gender Disaggregation" subtitle="Beneficiaries reached Y2" /><div className="h-72 p-4"><ResponsiveContainer><PieChart><Pie data={gender} dataKey="value" innerRadius={52} outerRadius={78}>{gender.map((g, i) => <Cell key={i} fill={g.fill} />)}</Pie><Tooltip formatter={v => `${v}%`} /></PieChart></ResponsiveContainer></div></Card></div><div className="grid grid-cols-1 gap-3 lg:grid-cols-2"><Card><CardHeader title="Youth Outcomes by Partner" subtitle="Disaggregated by gender" /><div className="h-72 p-4"><ResponsiveContainer><BarChart data={scopedYouth}><CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} /><XAxis dataKey="partner" tick={{ fontSize: 11 }} /><YAxis tick={{ fontSize: 11 }} /><Tooltip /><Legend /><Bar dataKey="female" fill={NAVY} /><Bar dataKey="male" fill={GOLD} /></BarChart></ResponsiveContainer></div></Card><Card><CardHeader title="Partner Performance Status" subtitle="Composite RAG by partner" /><div className="space-y-3 p-4">{scopedPartners.map(p => <div key={p.id} className="flex items-center justify-between border-b border-slate-100 py-2 last:border-0"><div className="flex items-center gap-3"><div className="flex h-8 w-8 items-center justify-center font-semibold text-white" style={{ background: NAVY }}>{p.id}</div><div><p className="text-sm font-medium text-slate-900">{p.name}</p><p className="text-xs text-slate-500">{p.focus}</p></div></div><div className="flex items-center gap-3"><span className="text-xs text-slate-500">DQA {p.dqa.toFixed(2)}</span><Badge status={p.status}>{p.status === 'green' ? 'On Track' : p.status === 'amber' ? 'Watch' : 'At Risk'}</Badge></div></div>)}</div></Card></div><div className="grid grid-cols-1 gap-3 lg:grid-cols-2"><TrendCard title="Data Quality Trend" dataKey="dqa" /><TrendCard title="Reporting Timeliness Trend" dataKey="reporting" percent /></div></div>;
}
function TrendCard({ title, dataKey, percent }) { return <Card><CardHeader title={title} subtitle={percent ? 'Percent submitted on time' : 'Portfolio average DQA score'} /><div className="h-64 p-4"><ResponsiveContainer><AreaChart data={trend}><CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" /><XAxis dataKey="q" tick={{ fontSize: 11 }} /><YAxis domain={percent ? [0, 100] : [2.5, 4.5]} tickFormatter={v => percent ? `${v}%` : v} tick={{ fontSize: 11 }} /><Tooltip formatter={v => percent ? `${v}%` : v} /><Area type="monotone" dataKey={dataKey} stroke={percent ? GOLD : NAVY} fill={percent ? GOLD : NAVY} fillOpacity={0.15} /></AreaChart></ResponsiveContainer></div></Card>; }

function PITT({ filters, setFilters }) {
  const [search, setSearch] = useState('');
  const [level, setLevel] = useState('All');
  const rows = indicators.filter(i => (level === 'All' || i.level === level) && partnerFilter(i.partner, filters.partner) && (!search || `${i.code} ${i.name}`.toLowerCase().includes(search.toLowerCase())));
  return <div className="space-y-6"><PageHeader title="Indicator Tracker — PITT" subtitle="Quarterly performance against targets, with aggregation logic and data quality flags" filters={filters} setFilters={setFilters} /><Card><div className="flex items-center gap-3 border-b border-slate-200 px-4 py-3"><Search className="h-4 w-4 text-slate-400" /><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search indicators" className="flex-1 bg-transparent text-sm outline-none" /><select value={level} onChange={e => setLevel(e.target.value)} className="border border-slate-200 px-3 py-1.5 text-sm"><option>All</option><option>Impact</option><option>Outcome</option><option>Output</option><option>Activity</option></select></div><Table headers={['Code','Indicator','Level','Agg','Target','Q1','Q2','Q3','Q4','YTD','% Target','RAG','DQ Flag']} rows={rows.map(i => { const p = pct(i, filters.quarter); const s = statusFromPct(p); return [i.code, i.name, i.level, i.aggregation, n(i.target), n(i.q1), n(i.q2), n(i.q3), n(i.q4), n(ytd(i, filters.quarter)), p ? `${p}%` : '—', <Badge status={s}>{s === 'green' ? 'On track' : s === 'amber' ? 'Watch' : s === 'red' ? 'At risk' : 'No data'}</Badge>, i.dqaFlag ? <span className="inline-flex items-center gap-1 text-xs text-amber-700"><AlertTriangle className="h-3.5 w-3.5" />{i.disagg}</span> : '—']; })} /></Card></div>;
}

function DQA({ filters, setFilters }) {
  const scores = dqaScores.filter(s => partnerFilter(s.partner, filters.partner));
  const issues = dqaIssues.filter(i => partnerFilter(i.partner, filters.partner));
  const radar = dimensions.map(d => Object.fromEntries([['dimension', d], ...scores.map(s => [s.partner, s[d]])]));
  return <div className="space-y-6"><PageHeader title="Data Quality Review" subtitle="DQA scores across five dimensions, with active issues and corrective actions" filters={filters} setFilters={setFilters} /><div className="grid grid-cols-2 gap-3 lg:grid-cols-4">{scores.map(s => <Card key={s.partner} className="p-4"><p className="text-[11px] uppercase tracking-wider text-slate-500">{s.partner}</p><p className="mt-1.5 text-2xl font-semibold">{s.overall.toFixed(2)} <span className="text-xs text-slate-500">/ 5.00</span></p><div className="mt-2"><Badge status={s.overall >= 4 ? 'green' : s.overall >= 3.5 ? 'amber' : 'red'}>{s.rating}</Badge></div></Card>)}</div><div className="grid grid-cols-1 gap-3 lg:grid-cols-3"><Card className="lg:col-span-2"><CardHeader title="DQA Dimensions by Partner" /><div className="h-80 p-4"><ResponsiveContainer><RadarChart data={radar}><PolarGrid /><PolarAngleAxis dataKey="dimension" tick={{ fontSize: 11 }} /><PolarRadiusAxis domain={[0,5]} tick={{ fontSize: 10 }} />{scores.map((s, i) => <Radar key={s.partner} dataKey={s.partner} stroke={[NAVY,NAVY_LIGHT,GOLD,'#94A3B8'][i]} fill={[NAVY,NAVY_LIGHT,GOLD,'#94A3B8'][i]} fillOpacity={0.12} />)}<Legend /><Tooltip /></RadarChart></ResponsiveContainer></div></Card><Card><CardHeader title="Top Recurring Issues" /><div className="space-y-3 p-4">{['Disaggregation gaps','Late submission','Definition inconsistency','Source reconciliation','Methodology drift'].map((x,i) => <div key={x}><div className="mb-1 flex justify-between text-sm"><span>{x}</span><span>{8-i}</span></div><div className="h-1.5 bg-slate-100"><div className="h-full" style={{ width: `${(8-i)*12}%`, background: NAVY }} /></div></div>)}</div></Card></div><Card><CardHeader title="DQA Heatmap" subtitle="Partner × dimension" /><Table headers={['Partner', ...dimensions, 'Overall']} rows={scores.map(s => [s.partner, ...dimensions.map(d => <div className="py-1 text-center" style={{ background: RAG[s[d] >= 4 ? 'green' : s[d] >= 3.5 ? 'amber' : 'red'].bg, color: RAG[s[d] >= 4 ? 'green' : s[d] >= 3.5 ? 'amber' : 'red'].text }}>{s[d].toFixed(1)}</div>), s.overall.toFixed(2)])} /></Card><Card><CardHeader title="Active DQA Issues and Corrective Actions" /><Table headers={['ID','Partner','Indicator','Dimension','Issue','Due','Status']} rows={issues.map(i => [i.id, i.partner, i.indicator, i.dimension, i.issue, i.due, <Badge status={i.status === 'Overdue' ? 'red' : i.status === 'Resolved' ? 'green' : 'amber'}>{i.status}</Badge>])} /></Card></div>;
}

function Reporting({ filters, setFilters }) {
  const rows = reports.filter(r => partnerFilter(r.partner, filters.partner));
  const late = rows.filter(r => r.late > 0 && r.submitted);
  const stats = { total: rows.length, onTime: rows.filter(r => r.late === 0).length, overdue: rows.filter(r => !r.submitted).length, avg: late.length ? Math.round(late.reduce((s,r)=>s+r.late,0)/late.length) : 0 };
  return <div className="space-y-6"><PageHeader title="Partner Reporting Tracker" subtitle="Submission status, completeness, quality scores, review status and next actions" filters={filters} setFilters={setFilters} /><div className="grid grid-cols-2 gap-3 lg:grid-cols-4"><Mini title="Reports Tracked" value={stats.total} note="Filtered cycle" /><Mini title="On Time" value={stats.onTime} note={`${Math.round(stats.onTime / Math.max(stats.total,1) * 100)}% of total`} /><Mini title="Submitted Late" value={late.length} note={late.length ? `Avg lateness ${stats.avg} days` : 'No late submissions'} /><Mini title="Overdue" value={stats.overdue} badge="Escalated" status="red" /></div><Card><Table headers={['ID','Partner','Report Type','Due','Submitted','Days Late','Completeness','Quality','Review','Next Action']} rows={rows.map(r => [r.id, r.partner, r.type, r.due, r.submitted || '—', r.late === 0 ? 'On time' : `${r.late}d`, r.completeness ? `${r.completeness}%` : '—', r.quality ? r.quality.toFixed(1) : '—', <Badge status={r.review === 'Approved' ? 'green' : r.review === 'Rejected' ? 'red' : r.review === 'Pending' ? 'grey' : 'amber'}>{r.review}</Badge>, r.action])} /></Card></div>;
}

function Actions({ filters, setFilters }) {
  const [status, setStatus] = useState('All');
  const rows = actions.filter(a => partnerFilter(a.partner, filters.partner)).filter(a => status === 'All' || a.status === status);
  const open = rows.filter(a => a.status !== 'Resolved');
  return <div className="space-y-6"><PageHeader title="Management Action Tracker" subtitle="Follow-up actions from reports, DQAs, evaluations and CLA reviews" filters={filters} setFilters={setFilters} /><div className="grid grid-cols-2 gap-3 lg:grid-cols-4"><Mini title="Total Open Actions" value={open.length} note="Current filter" /><Mini title="High Priority Open" value={open.filter(a=>a.priority==='High').length} badge="Escalate weekly" status="red" /><Mini title="In Progress" value={open.filter(a=>a.status==='In Progress').length} badge="Tracking" status="amber" /><Mini title="Resolved" value={rows.filter(a=>a.status==='Resolved').length} badge="Closed" status="green" /></div><Card><div className="flex items-center gap-2 border-b border-slate-200 px-4 py-3"><span className="text-sm font-medium">Status:</span>{['All','Open','In Progress','Resolved'].map(s => <button key={s} onClick={() => setStatus(s)} className="border border-slate-200 px-3 py-1 text-sm" style={status===s?{background:NAVY,color:'white'}:{}}>{s}</button>)}</div><Table headers={['ID','Partner','Source','Issue','Recommendation','Owner','Due','Priority','Status']} rows={rows.map(a => [a.id, a.partner, a.source, a.issue, a.recommendation, a.owner, a.due, <Badge status={a.priority==='High'?'red':a.priority==='Medium'?'amber':'grey'}>{a.priority}</Badge>, <Badge status={a.status==='Resolved'?'green':a.status==='In Progress'?'amber':'grey'}>{a.status}</Badge>])} /></Card></div>;
}

function About() { return <div className="space-y-6"><div><h1 className="text-2xl font-bold tracking-tight text-slate-900">About This Sample</h1><p className="mt-0.5 text-sm text-slate-600">Purpose, scope, sanitisation and attribution</p></div><Card className="max-w-4xl space-y-5 p-6"><div><h3 className="mb-1.5 text-sm font-semibold text-slate-900">Purpose</h3><p className="text-sm leading-relaxed text-slate-700">This is a sanitised, public-facing demonstration of how MEL systems, data quality, partner reporting, dashboards, indicator tracking, and management action follow-up connect into a single operational system for multi-partner development programs.</p></div><div><h3 className="mb-1.5 text-sm font-semibold text-slate-900">V1 demonstrates</h3><p className="text-sm leading-relaxed text-slate-700">Executive dashboarding, Performance Indicator Tracking Table logic, DQA scoring, partner reporting compliance, and management action tracking.</p></div><div><h3 className="mb-1.5 text-sm font-semibold text-slate-900">Planned for V2</h3><p className="text-sm leading-relaxed text-slate-700">Field survey operations, beneficiary traceability, evidence repository, CLA and learning log, and executive report builder.</p></div><div><h3 className="mb-1.5 text-sm font-semibold text-slate-900">Sanitisation</h3><p className="text-sm leading-relaxed text-slate-700">All data is fictional and illustrative. Partners are anonymised. No real donor, partner, location, beneficiary, or program data appears anywhere in this tool.</p></div><div className="border-t border-slate-200 pt-4"><h3 className="mb-2 text-sm font-semibold text-slate-900">Built by</h3><div className="flex items-center gap-3"><div className="flex h-12 w-12 items-center justify-center font-semibold text-white" style={{ background: NAVY }}>MA</div><div><p className="text-sm font-medium text-slate-900">Michael Ashiteye</p><p className="text-sm text-slate-600">MEL & Project Management Specialist</p><a className="mt-1.5 inline-flex items-center gap-1.5 text-sm font-medium hover:underline" style={{ color: NAVY }} href="https://www.linkedin.com/in/michael-ashiteye-0580a971" target="_blank" rel="noreferrer"><Linkedin className="h-3.5 w-3.5" /> linkedin.com/in/michael-ashiteye-0580a971</a></div></div></div></Card></div>; }

function Mini({ title, value, note, badge, status = 'amber' }) { return <Card className="p-4"><p className="text-[11px] font-medium uppercase tracking-wider text-slate-500">{title}</p><p className="mt-1.5 text-2xl font-semibold tabular-nums text-slate-900">{value}</p><div className="mt-2">{badge ? <Badge status={status}>{badge}</Badge> : <p className="text-xs text-slate-500">{note}</p>}</div></Card>; }
function Table({ headers, rows }) { return <div className="overflow-x-auto"><table className="w-full text-sm"><thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-600"><tr>{headers.map(h => <th key={h} className="px-3 py-2.5 text-left font-medium">{h}</th>)}</tr></thead><tbody>{rows.map((r,i) => <tr key={i} className="border-t border-slate-100 hover:bg-slate-50">{r.map((c,j) => <td key={j} className="max-w-xs px-3 py-2.5 align-top text-slate-700">{c}</td>)}</tr>)}</tbody></table></div>; }

const modules = [
  ['dashboard', 'Executive Dashboard', LayoutDashboard, Dashboard],
  ['pitt', 'Indicator Tracker', BarChart3, PITT],
  ['dqa', 'Data Quality Review', ShieldCheck, DQA],
  ['reporting', 'Partner Reporting', FileCheck2, Reporting],
  ['actions', 'Management Actions', ClipboardList, Actions],
  ['about', 'About', Info, About]
];

export default function App() {
  const [active, setActive] = useState('dashboard');
  const [filters, setFilters] = useState({ quarter: 'All', partner: 'All' });
  const Current = modules.find(m => m[0] === active)[3];
  return <div className="min-h-screen bg-slate-100"><div className="py-1.5 text-center text-xs font-medium tracking-wide text-white" style={{ background: GOLD }}>SAMPLE TOOL · ILLUSTRATIVE DATA ONLY · NOT BASED ON ANY ACTUAL DONOR, PARTNER, OR PROGRAM</div><header className="border-b border-slate-200 bg-white"><div className="flex items-center justify-between px-6 py-4"><div className="flex items-center gap-3"><div className="flex h-9 w-9 items-center justify-center" style={{ background: NAVY }}><BarChart3 className="h-5 w-5 text-white" /></div><div><h1 className="text-base font-bold leading-tight text-slate-900">Operational MEL Command Centre</h1><p className="text-xs leading-tight text-slate-500">Multi-Partner Development Program · Sample Portfolio</p></div></div><div className="hidden text-xs text-slate-500 lg:block">Last refresh: 18 May 2026, 09:42 GMT</div></div></header><div className="flex flex-col lg:flex-row"><aside className="hidden w-60 border-r border-slate-200 bg-white lg:block" style={{ minHeight: 'calc(100vh - 90px)' }}><nav className="space-y-0.5 p-3">{modules.map(([id,label,Icon]) => <button key={id} onClick={() => setActive(id)} className={`flex w-full items-center gap-3 px-3 py-2 text-left text-sm ${active === id ? 'text-white' : 'text-slate-700 hover:bg-slate-50'}`} style={active === id ? { background: NAVY } : {}}><Icon className="h-4 w-4" /><span className="font-medium">{label}</span></button>)}</nav><div className="mx-3 mt-2 border-t border-slate-200 px-3 py-4"><p className="mb-2 text-[10px] font-medium uppercase tracking-wider text-slate-500">V1 Scope</p><p className="text-xs leading-relaxed text-slate-600">5 core modules. Survey Ops, traceability, CLA, and Report Builder planned for V2.</p></div></aside><div className="overflow-x-auto border-b border-slate-200 bg-white px-3 py-2 lg:hidden"><div className="flex gap-1">{modules.map(([id,label]) => <button key={id} onClick={() => setActive(id)} className="whitespace-nowrap border border-slate-200 px-2.5 py-1.5 text-xs" style={active === id ? { background: NAVY, color: 'white' } : {}}>{label}</button>)}</div></div><main className="min-w-0 flex-1 p-4 lg:p-6"><Current filters={filters} setFilters={setFilters} /></main></div><footer className="border-t border-slate-200 bg-white px-6 py-4"><p className="text-center text-xs text-slate-500">Sample tool · Michael Ashiteye · MEL & Project Management Specialist · Illustrative data only</p></footer></div>;
}

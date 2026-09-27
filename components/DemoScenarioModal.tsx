import React from 'react';
import { usePravahState } from '../hooks/usePravahState';
import {
  Play,
  CheckCircle2,
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  RotateCcw
} from 'lucide-react';

interface StepDetail {
  step: number;
  title: string;
  category: string;
  description: string;
  targetView: string;
}

const DEMO_STEPS: StepDetail[] = [
  {
    step: 1,
    title: 'Create & View Project Profile',
    category: 'Module 1 — Project Profile',
    description: 'Inspect Aarohan Precision Components Pvt. Ltd. (Pune, ₹12 Cr capex, 145 staff, Orange Category, 450 kVA HT power).',
    targetView: 'Project Profile Wizard'
  },
  {
    step: 2,
    title: 'Run Deterministic Approval Discovery',
    category: 'Module 2 — Approval Discovery Engine',
    description: 'Rules engine evaluates project attributes against statutory triggers. Maps 11 valid clearances and verifies 14 exemptions.',
    targetView: 'Approval Discovery Engine'
  },
  {
    step: 3,
    title: 'Synthesize Topological Dependency Graph',
    category: 'Module 3 — Dependency Graph & Critical Path',
    description: 'Analyzes prerequisites, parallel tracks, and critical path (78 working days vs 194 sequential, 59.7% velocity gain).',
    targetView: 'Regulatory Dependency Graph'
  },
  {
    step: 4,
    title: 'Upload Document & Ingest Dossier',
    category: 'Module 6 — Document Intelligence',
    description: 'Accepts PDF/CAD drawings with SHA-256 cryptographic checksum ingestion into sandbox.',
    targetView: 'Document Intelligence (AI OCR)'
  },
  {
    step: 5,
    title: 'Execute AI Layout & OCR Extraction',
    category: 'Module 6 — Document Intelligence',
    description: 'TableNet layout parsing & NER extracts structured fields into the Evidence Wallet review staging area.',
    targetView: 'Document Intelligence (AI OCR)'
  },
  {
    step: 6,
    title: 'Detect Statutory Anomaly & CAD Conflict',
    category: 'Module 7 — Mismatch / Anomaly Engine',
    description: 'Detects conflict: Architect CAD specifies 7.5m turning radius vs 9.0m minimum required under UDCPR §14.8.',
    targetView: 'Evidence Wallet (Fact Ledger)'
  },
  {
    step: 7,
    title: '1-Click Conflict Resolution via Evidence Wallet',
    category: 'Module 5 & 7 — Evidence Vault',
    description: 'Auto-aligns CAD with validated 9.4m MIDC Cadastral corridor v3, unblocking Fire NOC and downstream DISH filing.',
    targetView: 'Evidence Wallet (Fact Ledger)'
  },
  {
    step: 8,
    title: 'Execute Statutory Form Autofill',
    category: 'Module 8 — Autofill Engine',
    description: 'Maps 36/38 verified facts automatically into MPCB CTE Form 1 with full source provenance and confidence.',
    targetView: 'Autofill Engine'
  },
  {
    step: 9,
    title: 'Initiate Concurrent Approval Execution',
    category: 'Module 3 & 4 — Workflow Guidance',
    description: 'Fires simultaneous filing across MPCB, DISH, and MSEDCL power grids without sequential lag.',
    targetView: 'Regulatory Dependency Graph'
  },
  {
    step: 10,
    title: 'Monitor SLA Risk Index & RTSA Timers',
    category: 'Module 11 — SLA Guardian',
    description: 'Evaluates Day 24 of 30 SLA countdown with statutory notice triggers under Maharashtra RTSA 2015.',
    targetView: 'SLA Guardian'
  },
  {
    step: 11,
    title: 'Switch to Government Officer Command Center',
    category: 'Module 17 — Officer Dashboard',
    description: 'Simulates Sub-Regional Officer (MPCB / DISH) reviewing pending workload, verifying facts, and issuing sanctions.',
    targetView: 'Officer Command Center'
  },
  {
    step: 12,
    title: 'Schedule Joint Site Inspection Protocol',
    category: 'Module 12 — Inspection Center',
    description: 'Coordinates combined DISH, MPCB, and MIDC Fire officers on 28 Oct 2026 with drone cadastral verification.',
    targetView: 'Inspection Center'
  },
  {
    step: 13,
    title: 'Raise Formal Query & Grievance Escalation',
    category: 'Module 13 — Escalations',
    description: 'Dispatches structured departmental query ticket with countdown timer and officer response history.',
    targetView: 'Queries & Escalations'
  },
  {
    step: 14,
    title: 'Simulate Gazette Regulatory Policy Amendment',
    category: 'Module 14 — Regulatory Impact Engine',
    description: 'Applies Maharashtra Industrial Policy 2026 Amendment IND-44/B version 1 vs version 2 diff comparison.',
    targetView: 'Regulatory Impact Engine'
  },
  {
    step: 15,
    title: 'Calculate Affected Approvals & Projects',
    category: 'Module 14 — Regulatory Impact Engine',
    description: 'Identifies Aarohan as affected and relaxes rooftop captive solar mandate from 450 kW down to 220 kW.',
    targetView: 'Regulatory Impact Engine'
  },
  {
    step: 16,
    title: 'Execute Automatic Scope Recalculation',
    category: 'Module 14 & 5 — Evidence Adjustment',
    description: 'Updates solar energy quota in Evidence Wallet, saving ₹1.15 Crore in upfront capital outlay.',
    targetView: 'Evidence Wallet & Overview'
  },
  {
    step: 17,
    title: 'Dispatch Multi-Channel Notification',
    category: 'Module 15 — Notification Engine',
    description: 'Event bus issues instant notifications with zero duplicate dispatch across investor and officer terminals.',
    targetView: 'Overview Dashboard'
  }
];

export const DemoScenarioModal: React.FC = () => {
  const {
    isDemoModalOpen,
    setIsDemoModalOpen,
    demoTourStep,
    runDemoStep,
    resetAllDemoState
  } = usePravahState();

  if (!isDemoModalOpen) return null;

  const current = DEMO_STEPS[demoTourStep - 1] || DEMO_STEPS[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="bg-white max-w-2xl w-full rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-xs">
              <Play className="w-4 h-4 fill-current" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold font-heading">
                  Smart India Hackathon 2026 — Guided Demo
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 font-bold border border-blue-400/30">
                  Step {demoTourStep} of 17
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Full 17-Module End-to-End Orchestration Walkthrough
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsDemoModalOpen(false)}
            className="text-slate-400 hover:text-white p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Content */}
        <div className="p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-1 rounded">
              {current.category}
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Target: <strong className="text-slate-800">{current.targetView}</strong>
            </span>
          </div>

          <div>
            <h3 className="text-lg font-bold text-slate-900">
              {current.step}. {current.title}
            </h3>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
              {current.description}
            </p>
          </div>

          {/* Quick step navigation pills */}
          <div className="pt-2 border-t border-slate-100">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
              All 17 Demo Milestones (Click to Jump):
            </span>
            <div className="grid grid-cols-6 sm:grid-cols-9 gap-1.5">
              {DEMO_STEPS.map((s) => (
                <button
                  key={s.step}
                  onClick={() => runDemoStep(s.step)}
                  className={`h-7 rounded text-xs font-mono font-bold transition-all cursor-pointer ${
                    s.step === demoTourStep
                      ? 'bg-blue-600 text-white shadow-xs'
                      : s.step < demoTourStep
                      ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                  title={`${s.step}. ${s.title}`}
                >
                  {s.step < demoTourStep ? '✓' : s.step}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="bg-slate-50 p-4 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={resetAllDemoState}
            className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 font-medium cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo State</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              disabled={demoTourStep <= 1}
              onClick={() => runDemoStep(demoTourStep - 1)}
              className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <button
              onClick={() => {
                runDemoStep(demoTourStep);
                setIsDemoModalOpen(false);
              }}
              className="px-4 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <span>Execute This Step in App</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            </button>

            <button
              disabled={demoTourStep >= 17}
              onClick={() => runDemoStep(demoTourStep + 1)}
              className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1 disabled:opacity-40 disabled:cursor-not-allowed shadow-xs cursor-pointer"
            >
              <span>Next Step</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

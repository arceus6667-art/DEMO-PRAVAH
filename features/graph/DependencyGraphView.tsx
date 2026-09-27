import React, { useState } from 'react';
import { usePravahState } from '../../hooks/usePravahState';
import { DAGEngineService } from '../../services/dagEngineService';
import { DAGNode } from '../../types/approval';
import {
  GitBranch,
  RefreshCw,
  Download,
  AlertTriangle,
  Clock,
  CheckCircle2,
  Lock,
  Zap,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Building,
  HelpCircle,
  Play,
  Layers,
  Table,
  Workflow,
  Check
} from 'lucide-react';

export const DependencyGraphView: React.FC = () => {
  const { approvals, resolveDiscrepancy, setActiveTab, discrepancies } = usePravahState();
  const [selectedNodeId, setSelectedNodeId] = useState<string>('MIDC-FIRE-NOC-01');
  const [viewMode, setViewMode] = useState<'graph' | 'table'>('graph');
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);

  const analysis = DAGEngineService.analyzeGraph(approvals);
  const fireNocDiscrepancy = discrepancies.find((d) => d.id === 'DISC-FIRE-CAD-01' && !d.isResolved);

  const selectedApproval =
    approvals.find((a) => a.approvalId === selectedNodeId) || approvals[1];

  const handleSimulateHarmonization = () => {
    resolveDiscrepancy('DISC-FIRE-CAD-01', 'OPT-AUTO-ALIGN');
    setActionFeedback(
      'Topological Auto-Harmonization Succeeded! Fire NOC CAD turning radius auto-aligned to 9.4m. Downstream DISH Factory Plan unlocked. Critical path timeline secured at 78 working days.'
    );
  };

  const handleSimulateDelay = () => {
    setActionFeedback(
      'Simulating +10 day bureaucratic delay: Ground Breaking milestone shifts from Day 78 to Day 88. Idle equipment penalty evaluated at ₹42 Lakh.'
    );
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1600px] mx-auto pb-16">
      {/* Top Banner */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-2xs flex flex-col xl:flex-row xl:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-bold border border-blue-200">
              MODULE 03 • TOPOLOGICAL DAG ENGINE
            </span>
            <span className="text-xs text-slate-500 font-mono">
              SIH 2026 Problem Statement 130
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold font-heading text-slate-900 tracking-tight mt-1">
            Regulatory Dependency Graph & Critical Path Engine
          </h1>
          <p className="text-xs text-slate-600 mt-0.5 max-w-3xl leading-relaxed">
            Real-time directed acyclic graph (DAG) synthesizing statutory prerequisite rules, parallel clearing tracks, and cross-departmental clearances for Ground Breaking readiness.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-slate-50 border border-slate-200/80 p-3.5 rounded-xl shrink-0">
          <div className="w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center shadow-xs">
            <GitBranch className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
              <span>CRITICAL PATH EFFICIENCY</span>
              <span className="font-mono text-[10px] font-bold px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800">
                Zero Deadlocks
              </span>
            </div>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="font-mono text-xl font-bold text-slate-900">
                {analysis.parallelWorkingDays} Working Days
              </span>
              <span className="font-mono text-xs text-slate-400 line-through">
                {analysis.sequentialDays}d Seq.
              </span>
              <span className="text-xs font-bold text-emerald-700">
                (-{analysis.velocityGainPercentage}%)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Notification Banner */}
      {actionFeedback && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl text-emerald-900 text-xs flex items-center justify-between animate-in fade-in duration-200 shadow-2xs">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span className="font-medium">{actionFeedback}</span>
          </div>
          <button
            onClick={() => setActionFeedback(null)}
            className="text-emerald-700 font-bold hover:underline"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Topological Visualization Rules Callout */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-950 text-white rounded-2xl p-5 shadow-sm flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Workflow className="w-4 h-4 text-amber-300" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-300">
              Deterministic Topological Analysis & Parallel Tracking
            </h3>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-slate-300 border border-white/20">
            Topological Sort: Valid DAG
          </span>
        </div>

        <div className="p-3 bg-white/10 backdrop-blur-xs rounded-xl border border-white/15 text-xs text-blue-100 leading-relaxed">
          <strong className="text-white block mb-1">Visualization Model Rule:</strong>
          <span className="font-mono text-amber-200">
            "A (MIDC Land Allotment) and B (MSEDCL 33kV Grid) can begin in parallel. C (MPCB CTE) and D (Fire NOC) depend on A and execute in parallel. E (DISH Factory Building Plan) remains BLOCKED until D completes. F (Joint Site Inspection) blocked until C, D, and E complete."
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-1">
          {analysis.parallelApprovals.map((grp, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-white/5 border border-white/10 flex flex-col gap-1">
              <span className="text-[10px] font-bold text-blue-300 uppercase">{grp.stage}</span>
              <p className="text-[11px] text-slate-200 leading-tight">{grp.explanation}</p>
              <div className="flex items-center gap-1 mt-1 text-[9px] font-mono text-amber-300">
                <span>Parallel:</span>
                <span>{grp.approvalIds.join(' + ')}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Canvas Controls Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="bg-slate-100 p-1 rounded-lg flex items-center gap-1 text-xs font-semibold text-slate-600">
            <button
              onClick={() => setViewMode('graph')}
              className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'graph' ? 'bg-white text-blue-700 shadow-2xs font-bold' : 'hover:text-slate-900'
              }`}
            >
              <GitBranch className="w-3.5 h-3.5" />
              <span>Interactive DAG Canvas</span>
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'table' ? 'bg-white text-blue-700 shadow-2xs font-bold' : 'hover:text-slate-900'
              }`}
            >
              <Table className="w-3.5 h-3.5" />
              <span>Topological Matrix View</span>
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs text-slate-500">Legend:</span>
          <span className="inline-flex items-center gap-1 text-[11px] text-red-700 font-bold bg-red-50 px-2 py-0.5 rounded border border-red-200">
            <span className="w-2 h-2 rounded-full bg-red-600"></span>
            Critical Path
          </span>
          <span className="inline-flex items-center gap-1 text-[11px] text-blue-700 font-bold bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
            <span className="w-2 h-2 rounded-full bg-blue-600"></span>
            Parallel Track
          </span>
          <span className="inline-flex items-center gap-1 text-[11px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
            Exempted Path
          </span>
        </div>
      </div>

      {viewMode === 'graph' ? (
        /* Main Workspace: DAG Visualizer (8 of 12) + Node Inspector Drawer (4 of 12) */
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
          {/* Left Column: Interactive DAG Canvas */}
          <div className="xl:col-span-8 flex flex-col gap-4">
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs min-h-[580px] overflow-x-auto relative">
              {/* Lane Markers Header */}
              <div className="grid grid-cols-5 gap-3 mb-6 min-w-[780px]">
                <div className="bg-slate-50 p-2 rounded-lg border border-slate-200 text-center">
                  <span className="font-mono text-[10px] text-blue-700 font-bold block">LANE 1 • DAY 0-14</span>
                  <span className="text-xs font-semibold text-slate-800">Land & Cadastral</span>
                </div>
                <div className="bg-slate-50 p-2 rounded-lg border border-slate-200 text-center">
                  <span className="font-mono text-[10px] text-blue-700 font-bold block">LANE 2 • DAY 15-45</span>
                  <span className="text-xs font-semibold text-slate-800">Pre-Construction</span>
                </div>
                <div className="bg-slate-50 p-2 rounded-lg border border-slate-200 text-center">
                  <span className="font-mono text-[10px] text-blue-700 font-bold block">LANE 3 • DAY 30-60</span>
                  <span className="text-xs font-semibold text-slate-800">Utilities Grid</span>
                </div>
                <div className="bg-slate-50 p-2 rounded-lg border border-slate-200 text-center">
                  <span className="font-mono text-[10px] text-blue-700 font-bold block">LANE 4 • DAY 65</span>
                  <span className="text-xs font-semibold text-slate-800">Joint Inspection</span>
                </div>
                <div className="bg-slate-50 p-2 rounded-lg border border-slate-200 text-center">
                  <span className="font-mono text-[10px] text-blue-700 font-bold block">LANE 5 • DAY 78</span>
                  <span className="text-xs font-semibold text-slate-800">Final Sanction</span>
                </div>
              </div>

              {/* Grid Canvas with DAG Nodes */}
              <div className="grid grid-cols-5 gap-3 min-w-[780px] relative z-10">
                {/* Col 1: Lane 1 */}
                <div className="flex flex-col gap-4">
                  <div
                    onClick={() => setSelectedNodeId('MIDC-LAND-ALLOTMENT')}
                    className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                      selectedNodeId === 'MIDC-LAND-ALLOTMENT'
                        ? 'border-blue-600 bg-blue-50/60 shadow-xs ring-1 ring-blue-500'
                        : 'border-slate-200 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                      <span className="text-emerald-700 font-bold">CLEARED</span>
                      <span className="text-slate-400">#8821</span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-900 leading-tight">
                      MIDC Land Allotment
                    </h4>
                    <p className="text-[10px] text-slate-500 mt-1">Plot A-42, 4,050 sq.m</p>
                    <div className="mt-2 text-[10px] font-mono text-emerald-800 font-bold">14d SLA Completed</div>
                  </div>
                </div>

                {/* Col 2: Lane 2 */}
                <div className="flex flex-col gap-4">
                  {/* Node: MPCB CTE */}
                  <div
                    onClick={() => setSelectedNodeId('MPCB-CTE-2026-IND')}
                    className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                      selectedNodeId === 'MPCB-CTE-2026-IND'
                        ? 'border-blue-600 bg-blue-50/60 shadow-xs ring-1 ring-blue-500'
                        : 'border-slate-200 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                      <span className="text-blue-700 font-bold">IN REVIEW</span>
                      <span className="bg-red-100 text-red-800 px-1 rounded font-bold">CP-1</span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-900 leading-tight">
                      MPCB Consent to Establish (CTE)
                    </h4>
                    <div className="mt-2 bg-slate-100 p-1.5 rounded text-[10px] font-mono">
                      <div className="flex justify-between">
                        <span>Day 18 / 45</span>
                        <span className="text-blue-700 font-bold">92% Ready</span>
                      </div>
                    </div>
                  </div>

                  {/* Node: Fire Provisional NOC */}
                  <div
                    onClick={() => setSelectedNodeId('MIDC-FIRE-NOC-01')}
                    className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all relative ${
                      selectedNodeId === 'MIDC-FIRE-NOC-01'
                        ? 'border-amber-500 bg-amber-50 shadow-md ring-2 ring-amber-400'
                        : fireNocDiscrepancy
                        ? 'border-amber-300 bg-amber-50/40 hover:bg-amber-50'
                        : 'border-slate-200 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                      <span className="text-amber-900 font-bold">
                        {fireNocDiscrepancy ? 'ACTION REQ.' : 'CLEARED'}
                      </span>
                      <span className="bg-red-600 text-white px-1.5 py-0.2 rounded font-bold">CRITICAL</span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-900 leading-tight">
                      MIDC Provisional Fire NOC
                    </h4>
                    <p className="text-[10px] text-amber-900 mt-1 font-semibold">
                      {fireNocDiscrepancy ? 'CAD Turning Radius: 7.5m' : 'Turning Radius: 9.4m OK'}
                    </p>
                    <div className="mt-2 text-[10px] font-mono text-amber-900 font-bold">
                      {fireNocDiscrepancy ? 'BLOCKING DISH FACTORY PLAN' : 'Unblocked'}
                    </div>
                  </div>
                </div>

                {/* Col 3: Lane 3 */}
                <div className="flex flex-col gap-4">
                  {/* Node: DISH Factory Building Plan */}
                  <div
                    onClick={() => setSelectedNodeId('DISH-MH-ACT-SEC6')}
                    className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                      selectedNodeId === 'DISH-MH-ACT-SEC6'
                        ? 'border-blue-600 bg-blue-50/60 shadow-xs ring-1 ring-blue-500'
                        : fireNocDiscrepancy
                        ? 'border-slate-200 bg-slate-50 opacity-60'
                        : 'border-slate-200 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                      <span className={fireNocDiscrepancy ? 'text-slate-400 font-bold' : 'text-blue-700 font-bold'}>
                        {fireNocDiscrepancy ? 'BLOCKED' : 'READY'}
                      </span>
                      <span className="text-slate-400">30d SLA</span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-900 leading-tight">
                      DISH Factory Plan Form 1
                    </h4>
                    <p className="text-[10px] text-slate-500 mt-1">145 Employees • CNC Line</p>
                    <div className="mt-2 text-[10px] font-mono text-slate-600">
                      Depends on Fire NOC
                    </div>
                  </div>

                  {/* Node: MSEDCL 33kV Dedicated Power */}
                  <div
                    onClick={() => setSelectedNodeId('MSEDCL-HT-450KVA')}
                    className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                      selectedNodeId === 'MSEDCL-HT-450KVA'
                        ? 'border-blue-600 bg-blue-50/60 shadow-xs ring-1 ring-blue-500'
                        : 'border-blue-200 bg-blue-50/30 hover:bg-blue-50/60'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                      <span className="text-blue-700 font-bold">PARALLEL</span>
                      <span className="text-slate-500">450 kVA</span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-900 leading-tight">
                      MSEDCL 33kV Feeder Sanction
                    </h4>
                    <p className="text-[10px] text-slate-500 mt-1">Chakan Substation Line</p>
                  </div>

                  {/* Node: CGWA Groundwater Exemption */}
                  <div
                    onClick={() => setSelectedNodeId('CGWA-EXEMPT-SEC3')}
                    className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                      selectedNodeId === 'CGWA-EXEMPT-SEC3'
                        ? 'border-emerald-600 bg-emerald-50/60 shadow-xs ring-1 ring-emerald-500'
                        : 'border-emerald-200 bg-emerald-50/30 hover:bg-emerald-50/60'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                      <span className="text-emerald-800 font-bold">EXEMPTED</span>
                      <span className="text-emerald-700 font-bold">60d Saved</span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-900 leading-tight">
                      CGWA Groundwater NOC
                    </h4>
                    <p className="text-[10px] text-slate-500 mt-1">100% MIDC Bulk Water Line</p>
                  </div>
                </div>

                {/* Col 4: Lane 4 */}
                <div className="flex flex-col gap-4 justify-center">
                  <div
                    onClick={() => setSelectedNodeId('JOINT-SITE-INSPECTION-GATE')}
                    className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                      selectedNodeId === 'JOINT-SITE-INSPECTION-GATE'
                        ? 'border-blue-600 bg-blue-50/60 shadow-xs ring-1 ring-blue-500'
                        : 'border-slate-200 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                      <span className="text-purple-700 font-bold">04 OCT 2026</span>
                      <span className="bg-red-600 text-white px-1.5 py-0.2 rounded font-bold">GATE</span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-900 leading-tight">
                      Joint Field Inspection
                    </h4>
                    <p className="text-[10px] text-slate-500 mt-1">MPCB + DISH + MIDC Fire</p>
                    <div className="mt-2 text-[10px] font-mono text-slate-600">
                      Synchronized Single Visit
                    </div>
                  </div>
                </div>

                {/* Col 5: Lane 5 */}
                <div className="flex flex-col gap-4 justify-center">
                  <div
                    onClick={() => setSelectedNodeId('PLINTH-COMMENCEMENT-GATE')}
                    className={`p-4 rounded-xl border text-left cursor-pointer transition-all bg-slate-900 text-white shadow-md ${
                      selectedNodeId === 'PLINTH-COMMENCEMENT-GATE' ? 'ring-2 ring-blue-400' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                      <span className="text-emerald-400 font-bold">TARGET DAY 78</span>
                      <span className="bg-blue-600 text-white px-1.5 py-0.2 rounded font-bold">SANCTION</span>
                    </div>
                    <h4 className="text-xs font-bold text-white leading-tight">
                      Plinth & Commencement
                    </h4>
                    <p className="text-[10px] text-slate-400 mt-1">Ground Breaking Certificate</p>
                    <div className="mt-2 text-[10px] font-mono text-emerald-400 font-bold">
                      Target: 12 Dec 2026
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Active Node Inspector Drawer */}
          <div className="xl:col-span-4 flex flex-col gap-4">
            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
                <span className="text-[10px] font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded uppercase">
                  Node Inspector
                </span>
                <span className="font-mono text-xs text-slate-500">{selectedApproval.approvalId}</span>
              </div>

              <div>
                <h3 className="text-base font-bold font-heading text-slate-900">
                  {selectedApproval.approvalName}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {selectedApproval.department} • {selectedApproval.issuingOfficer}
                </p>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-2 gap-2 my-4 bg-slate-50 p-3 rounded-xl border border-slate-200/70">
                <div>
                  <span className="text-[10px] text-slate-400 font-mono block">STATUTORY SLA</span>
                  <span className="text-sm font-mono font-bold text-slate-900">
                    {selectedApproval.elapsedDays} / {selectedApproval.statutorySlaDays} Days
                  </span>
                  <span className="text-[10px] text-slate-500 block">
                    {selectedApproval.remainingDays} days remaining
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-mono block">READINESS</span>
                  <span className="text-sm font-mono font-bold text-blue-700">
                    {selectedApproval.evidenceReadinessPercentage}%
                  </span>
                  <span className="text-[10px] text-slate-500 block">
                    Autofill: {selectedApproval.autofillPercentage}%
                  </span>
                </div>
              </div>

              {/* Explainable Inspection details */}
              {selectedApproval.approvalId === 'MIDC-FIRE-NOC-01' ? (
                <div className="space-y-3">
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900">
                    <div className="flex items-center gap-1.5 font-bold mb-1">
                      <AlertTriangle className="w-4 h-4 text-amber-700" />
                      <span>Explainable Rule Audit: CAD Blueprint Flagged</span>
                    </div>
                    <p className="text-[11px] leading-relaxed">
                      Uploaded architect drawing specifies vehicular turning radius as <strong>7.5m</strong> at Gate 2. Chakan Industrial Fire Zone regulations (UDCPR 2020 §14.8) mandate <strong>9.0m minimum</strong> for 32-ton high-reach water bowsers.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <button
                      onClick={handleSimulateHarmonization}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Auto-Align with Cadastral v3 (1-Click)</span>
                    </button>
                    <button
                      onClick={() => setActiveTab('evidence-wallet')}
                      className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold py-2 px-3 rounded-xl text-xs transition-colors cursor-pointer"
                    >
                      Open Evidence Wallet Conflict Triage
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700">
                    <span className="font-bold block text-slate-900 mb-1">Statutory Rationale:</span>
                    <ul className="space-y-1 text-[11px]">
                      {selectedApproval.reasons.map((r, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-blue-600">•</span>
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={() => setActiveTab('autofill-engine')}
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <span>Open Form in Autofill Engine</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* Tabular View */
        <div className="bg-white border border-slate-200/80 rounded-2xl shadow-2xs overflow-hidden">
          <div className="p-5 border-b border-slate-200 bg-slate-50/70 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Topological Clearance Dependency Matrix
              </h3>
              <p className="text-xs text-slate-500">
                Deterministic prerequisites, SLAs, downstream dependents, and critical path analysis
              </p>
            </div>
            <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-blue-50 text-blue-700 border border-blue-200">
              {approvals.length} Statutory Clearances
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                <tr>
                  <th className="px-5 py-3">Approval ID & Clearance</th>
                  <th className="px-5 py-3">Department & Act</th>
                  <th className="px-5 py-3">Statutory SLA</th>
                  <th className="px-5 py-3">Prerequisites</th>
                  <th className="px-5 py-3">Topological Status</th>
                  <th className="px-5 py-3">Critical Path</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {approvals.map((app) => {
                  const isReady = analysis.readyToInitiate.includes(app.approvalId);
                  const isBlocked = analysis.blockedApprovals.includes(app.approvalId);
                  const isCP = analysis.criticalPathNodes.includes(app.approvalId);

                  return (
                    <tr key={app.approvalId} className="hover:bg-slate-50/70 transition-colors">
                      <td className="px-5 py-3.5">
                        <div className="flex flex-col">
                          <span className="font-mono font-bold text-blue-700 text-[11px]">
                            {app.approvalId}
                          </span>
                          <span className="font-semibold text-slate-900 mt-0.5">
                            {app.approvalName}
                          </span>
                        </div>
                      </td>

                      <td className="px-5 py-3.5">
                        <div className="flex flex-col text-[11px]">
                          <span className="font-bold text-slate-800">{app.department}</span>
                          <span className="text-slate-500 text-[10px]">{app.statutoryAct}</span>
                        </div>
                      </td>

                      <td className="px-5 py-3.5 font-mono text-slate-800 font-bold">
                        {app.statutorySlaDays} Days
                      </td>

                      <td className="px-5 py-3.5">
                        {app.prerequisites.length > 0 ? (
                          <div className="flex flex-wrap gap-1">
                            {app.prerequisites.map((p) => (
                              <span
                                key={p}
                                className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200"
                              >
                                {p}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span className="text-slate-400 text-[11px] font-mono">None (Genesis)</span>
                        )}
                      </td>

                      <td className="px-5 py-3.5">
                        {app.status === 'NOC_GRANTED' ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            CLEARED
                          </span>
                        ) : isReady ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                            <Play className="w-3 h-3 text-blue-600" />
                            READY TO INITIATE
                          </span>
                        ) : isBlocked ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                            <Lock className="w-3 h-3 text-amber-600" />
                            BLOCKED BY PREREQS
                          </span>
                        ) : (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                            {app.status}
                          </span>
                        )}
                      </td>

                      <td className="px-5 py-3.5">
                        {isCP ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-100 text-red-800 border border-red-200">
                            CRITICAL PATH
                          </span>
                        ) : (
                          <span className="text-slate-400 text-[10px] font-mono">Parallel</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Predictive AI Routing Bar */}
      <div className="bg-slate-900 text-white p-5 rounded-2xl shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] font-bold text-blue-300 uppercase tracking-wider">
                PRAVAH Topological DAG Engine Insight
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span className="text-xs text-emerald-400 font-semibold">Optimal Critical Path Identified</span>
            </div>
            <p className="text-xs text-slate-300 mt-1 max-w-4xl leading-relaxed">
              Resolving the Fire NOC turning radius today unlocks DISH Factory Plan submission <strong>12 days ahead of schedule</strong>, preserving the <strong>78-day Ground Breaking timeline</strong> and avoiding an estimated ₹4.2 Lakh/day idle plant penalty.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleSimulateDelay}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition-colors cursor-pointer"
          >
            Simulate +10d Delay
          </button>
          <button
            onClick={handleSimulateHarmonization}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Run Auto-Harmonization</span>
          </button>
        </div>
      </div>
    </div>
  );
};

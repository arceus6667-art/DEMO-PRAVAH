import React, { useState } from 'react';
import { usePravahState } from '../../hooks/usePravahState';
import { useTranslations } from '../../hooks/useTranslations';
import { RegulatoryChangeService, PolicyDiffItem } from '../../services/regulatoryChangeService';
import {
  Scale,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  History,
  FileText,
  Clock,
  Layers,
  Zap,
  TrendingDown,
  Building
} from 'lucide-react';

export const RegulatoryImpactView: React.FC = () => {
  const { project, simulateRegulatoryPolicyUpdate, setActiveTab } = usePravahState();
  const { t } = useTranslations();

  const [hasSimulated, setHasSimulated] = useState(false);

  const gazetteDetails = RegulatoryChangeService.getGazetteChangeDetails(project);
  const policyDiffs = gazetteDetails.diffItems;

  const handleRunSimulation = () => {
    simulateRegulatoryPolicyUpdate();
    setHasSimulated(true);
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-[1600px] mx-auto pb-16">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-2xs flex flex-col xl:flex-row xl:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 mb-1">
            <Scale className="w-4 h-4" />
            <span>MODULE 14 • REGULATORY CHANGE IMPACT & POLICY DIFF ENGINE</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Statutory Versioning & Real-Time Gazette Adaptation
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            Continuously monitors Maharashtra Gazette circulars and automatically adapts project compliance
            obligations. Prevents retrospective violations.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleRunSimulation}
            disabled={hasSimulated}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-2xs transition-colors cursor-pointer ${
              hasSimulated
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            {hasSimulated ? 'Gazette 2026/09 Applied' : 'Simulate New Gazette Notification'}
          </button>
        </div>
      </div>

      {hasSimulated && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl text-emerald-900 text-xs flex items-center justify-between animate-in fade-in duration-200">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <span className="font-bold">
                Maharashtra Industrial Policy 2026 (Gazette 2026/09) Successfully Synthesized!
              </span>
              <p className="text-emerald-800 text-[11px] mt-0.5">
                • 1 obsolete approval eliminated (Groundwater NOC fully exempted in piped MIDC zones)
                <br />
                • Factory Plan SLA shortened by 15 working days (60d → 45d statutory cap)
                <br />• Critical path duration compressed from 88 days to 78 days.
              </p>
            </div>
          </div>
          <button
            onClick={() => setActiveTab('dependency-graph')}
            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg cursor-pointer"
          >
            View Updated DAG
          </button>
        </div>
      )}

      {/* Impact KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Active Baseline Policy
          </span>
          <p className="text-lg font-bold text-slate-900 mt-1">{gazetteDetails.versionOld}</p>
          <span className="text-[11px] text-slate-500 mt-0.5 block">Baseline statutory matrix</span>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs">
          <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider">
            Incoming Policy Update
          </span>
          <p className="text-lg font-bold text-blue-700 mt-1">{gazetteDetails.versionNew}</p>
          <span className="text-[11px] text-blue-600/80 mt-0.5 block">Effective {gazetteDetails.effectiveDate}</span>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs">
          <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider">
            Net Estimated Capex Saving
          </span>
          <p className="text-2xl font-extrabold text-emerald-700 font-mono mt-1">
            {gazetteDetails.evidenceAdjustment.savingEstimated}
          </p>
          <span className="text-[11px] text-emerald-600/80 mt-0.5 block">
            Solar quota reduction ({gazetteDetails.evidenceAdjustment.previousValue} → {gazetteDetails.evidenceAdjustment.newValue})
          </span>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs">
          <span className="text-[11px] font-bold text-purple-600 uppercase tracking-wider">
            Aarohan Project Impact
          </span>
          <p className="text-lg font-bold text-purple-700 mt-1">Net Favorable (Relaxation)</p>
          <span className="text-[11px] text-purple-600/80 mt-0.5 block">Zero penalty liabilities</span>
        </div>
      </div>

      {/* Side-by-Side Policy Diff Matrix */}
      <div className="bg-white border border-slate-200/80 rounded-2xl shadow-2xs overflow-hidden flex flex-col">
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/70 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <History className="w-4 h-4 text-blue-600" />
              Statutory Gazette Policy Diff Matrix
            </h3>
            <p className="text-xs text-slate-500">
              Deterministic comparison between previous rules and updated circulars
            </p>
          </div>
          <span className="text-xs font-mono text-slate-500 font-semibold">
            {policyDiffs.length} Active Clause Diffs
          </span>
        </div>

        <div className="divide-y divide-slate-100">
          {policyDiffs.map((diff: PolicyDiffItem) => (
            <div key={diff.id} className="p-6 flex flex-col gap-4 hover:bg-slate-50/40 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-900">{diff.field}</span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      diff.impactType === 'RELAXATION'
                        ? 'bg-emerald-100 text-emerald-800'
                        : diff.impactType === 'STRINGENCY'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {diff.impactType}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-slate-400">
                  {diff.statutorySource} • ID: {diff.id}
                </span>
              </div>

              {/* Comparative Rule Comparison */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                {/* Previous */}
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col gap-1">
                  <span className="text-[10px] font-bold uppercase text-slate-400">
                    Previous Statutory Rule
                  </span>
                  <p className="text-slate-700 font-mono leading-relaxed mt-1">{diff.previousRule}</p>
                </div>

                {/* Updated */}
                <div className="p-4 bg-blue-50/60 rounded-xl border border-blue-200 flex flex-col gap-1">
                  <span className="text-[10px] font-bold uppercase text-blue-700">
                    Amended Statutory Rule
                  </span>
                  <p className="text-blue-950 font-mono font-medium leading-relaxed mt-1">
                    {diff.updatedRule}
                  </p>
                </div>
              </div>

              <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Impact on Aarohan Precision Components:</span>{' '}
                  {diff.impactSummary}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

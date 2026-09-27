import React, { useState } from 'react';
import { usePravahState } from '../../hooks/usePravahState';
import { useTranslations } from '../../hooks/useTranslations';
import { REGULATORY_SOURCES } from '../../data/regulatorySources';
import { DISCOVERY_RULES } from '../../data/approvalRules';
import {
  Settings,
  ShieldCheck,
  Scale,
  RefreshCw,
  ExternalLink,
  BookOpen,
  Sliders,
  CheckCircle2,
  Lock,
  Layers,
  Sparkles,
  AlertTriangle
} from 'lucide-react';

export const AdminGovernanceView: React.FC = () => {
  const { resetAllDemoState, currentRole, setCurrentRole } = usePravahState();
  const { t } = useTranslations();

  const [activeTabSub, setActiveTabSub] = useState<'sources' | 'rules' | 'sla'>('sources');
  const [resetMessage, setResetMessage] = useState<string | null>(null);

  const handleReset = () => {
    resetAllDemoState();
    setResetMessage('All demonstration state, facts, and applications restored to clean baseline.');
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-[1600px] mx-auto pb-16">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-2xs flex flex-col xl:flex-row xl:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 mb-1">
            <Settings className="w-4 h-4" />
            <span>MODULE 2 & ADMIN • STATUTORY GOVERNANCE & REGULATORY REGISTRY</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            System Administration & Legal Corpus Management
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            Configure statutory rules engine thresholds, certified gazette source versions, and platform-wide SLA
            parameters.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleReset}
            className="px-4 py-2.5 bg-red-50 text-red-700 hover:bg-red-100 rounded-xl text-xs font-bold flex items-center gap-2 border border-red-200 transition-colors cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            Reset Demo State
          </button>
        </div>
      </div>

      {resetMessage && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl text-emerald-900 text-xs flex items-center justify-between animate-in fade-in duration-200">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span className="font-medium">{resetMessage}</span>
          </div>
          <button onClick={() => setResetMessage(null)} className="text-emerald-700 font-bold hover:underline">
            Dismiss
          </button>
        </div>
      )}

      {/* Admin Tab Switcher */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTabSub('sources')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-2 ${
            activeTabSub === 'sources'
              ? 'bg-blue-600 text-white shadow-2xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          Certified Gazette Sources ({REGULATORY_SOURCES.length})
        </button>
        <button
          onClick={() => setActiveTabSub('rules')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-2 ${
            activeTabSub === 'rules'
              ? 'bg-blue-600 text-white shadow-2xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Sliders className="w-4 h-4" />
          Deterministic Discovery Rules ({DISCOVERY_RULES.length})
        </button>
      </div>

      {activeTabSub === 'sources' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {REGULATORY_SOURCES.map((source) => (
            <div
              key={source.id}
              className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-bold border border-blue-200">
                    {source.id}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    {source.status}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 mt-1">{source.title}</h3>
                <p className="text-xs text-slate-500 mt-0.5">Authority: {source.authority}</p>

                <p className="text-xs text-slate-600 mt-3 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                  {source.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span>Effective: {source.effectiveFrom}</span>
                <span className="font-mono text-slate-700 font-semibold">
                  Version: {source.version}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-2xl shadow-2xs overflow-hidden">
          <div className="p-5 border-b border-slate-200 bg-slate-50/70">
            <h3 className="text-sm font-bold text-slate-900">
              Statutory Applicability Decision Rules
            </h3>
            <p className="text-xs text-slate-500">
              Deterministic boolean rules evaluated against the Project Profile
            </p>
          </div>

          <div className="divide-y divide-slate-100">
            {DISCOVERY_RULES.map((rule) => (
              <div key={rule.ruleId} className="p-5 flex flex-col gap-2 hover:bg-slate-50/50">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-blue-700">{rule.ruleId}</span>
                  <span className="text-xs font-mono font-semibold text-slate-500">
                    {rule.department} • Statutory SLA: {rule.statutorySlaDays}d
                  </span>
                </div>
                <h4 className="text-sm font-bold text-slate-900">{rule.approvalName}</h4>
                <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-200 font-mono">
                  Statutory Act: {rule.statutoryAct} ({rule.statutorySection})
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

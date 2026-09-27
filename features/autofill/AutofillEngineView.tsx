import React, { useState } from 'react';
import { usePravahState } from '../../hooks/usePravahState';
import { useTranslations } from '../../hooks/useTranslations';
import { AutofillService } from '../../services/autofillService';
import { ApplicationSchema } from '../../types/evidence';
import {
  Zap,
  ShieldCheck,
  Sparkles,
  AlertCircle,
  FileCheck2,
  CheckCircle2,
  Download,
  Building2,
  FileText,
  Lock,
  ArrowRight,
  Send,
  HelpCircle
} from 'lucide-react';

export const AutofillEngineView: React.FC = () => {
  const { applicationSchemas, facts, updateApprovalStatus, approvals, setActiveTab } =
    usePravahState();
  const { t } = useTranslations();

  const [selectedSchemaId, setSelectedSchemaId] = useState<string>(
    applicationSchemas[0]?.applicationId || ''
  );
  const [successToast, setSuccessToast] = useState<string | null>(null);

  const activeSchema =
    applicationSchemas.find((s) => s.applicationId === selectedSchemaId) || applicationSchemas[0];

  const autofillResult = AutofillService.generateAutofill(activeSchema, facts);

  const handleApplyAutofillAndSubmit = () => {
    updateApprovalStatus(activeSchema.applicationId, 'UNDER_DESK_REVIEW');
    setSuccessToast(
      `Autofill dossier for ${activeSchema.title} locked and transmitted to ${activeSchema.department} Single Window scrutiny desk.`
    );
  };

  const handleDownloadPayload = () => {
    const dataStr =
      'data:text/json;charset=utf-8,' +
      encodeURIComponent(JSON.stringify(autofillResult, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `${activeSchema.applicationId}_autofill_dossier.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-[1600px] mx-auto pb-16">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-2xs flex flex-col xl:flex-row xl:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 mb-1">
            <Zap className="w-4 h-4 fill-blue-600" />
            <span>MODULE 8 • DETERMINISTIC AUTOFILL SYNTHESIS ENGINE</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Universal Dossier Auto-Generation & Provenance Binding
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            Map verified statutory facts into complex departmental application forms without duplicate
            data entry. Eliminates human transposition errors across multi-agency filings.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleDownloadPayload}
            className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4" />
            Export Dossier JSON
          </button>
          <button
            onClick={handleApplyAutofillAndSubmit}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-2xs transition-colors cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            Submit Dossier to Dept
          </button>
        </div>
      </div>

      {successToast && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 text-xs flex items-center justify-between animate-in fade-in duration-200">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{successToast}</span>
          </div>
          <button
            onClick={() => setSuccessToast(null)}
            className="text-emerald-700 font-bold hover:underline"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Schema Selector Tabs */}
      <div className="flex items-center gap-3 overflow-x-auto pb-1">
        {applicationSchemas.map((schema) => {
          const isSelected = schema.applicationId === selectedSchemaId;
          const summary = AutofillService.generateAutofill(schema, facts);

          return (
            <button
              key={schema.applicationId}
              onClick={() => {
                setSelectedSchemaId(schema.applicationId);
                setSuccessToast(null);
              }}
              className={`p-4 rounded-xl border text-left transition-all cursor-pointer min-w-[240px] flex flex-col justify-between ${
                isSelected
                  ? 'border-blue-600 bg-white ring-2 ring-blue-500/20 shadow-xs'
                  : 'border-slate-200 bg-slate-50 hover:bg-white'
              }`}
            >
              <div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                  {schema.applicationId}
                </span>
                <h4 className="text-xs font-bold text-slate-900 mt-2 line-clamp-1">{schema.title}</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">{schema.department}</p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">Autofilled:</span>
                <span className="font-mono font-bold text-emerald-700">{summary.percentage}%</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Autofill Card & Field Matrix */}
      <div className="bg-white border border-slate-200/80 rounded-2xl shadow-2xs overflow-hidden flex flex-col">
        {/* Top Summary Bar */}
        <div className="p-6 border-b border-slate-200 bg-slate-50/70 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-600 text-white rounded-xl shadow-xs">
              <FileCheck2 className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-mono font-bold text-blue-700 uppercase">
                {activeSchema.department} • {activeSchema.applicationId}
              </span>
              <h2 className="text-lg font-bold text-slate-900">{activeSchema.title}</h2>
              <p className="text-xs text-slate-500">Total Statutory Fields: {activeSchema.totalFields}</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex flex-col text-right">
              <span className="text-[10px] uppercase font-bold text-slate-400">Completion</span>
              <span className="text-xl font-extrabold text-emerald-600 font-mono">
                {autofillResult.autofilledCount} / {autofillResult.totalFields} Fields (
                {autofillResult.percentage}%)
              </span>
            </div>
            <div className="w-28 h-3 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all"
                style={{ width: `${autofillResult.percentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* Fields List */}
        <div className="p-6 flex flex-col gap-4">
          <div className="grid grid-cols-1 gap-3">
            {autofillResult.fields.map((f, i) => (
              <div
                key={i}
                className="p-4 rounded-xl border border-slate-200 hover:border-slate-300 bg-white transition-all flex flex-col md:flex-row md:items-center justify-between gap-3"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-slate-900">{f.fieldLabel}</span>
                    {f.status === 'VERIFIED_AUTOFILL' && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                        <ShieldCheck className="w-3 h-3 text-emerald-600" />
                        VERIFIED AUTOFILL
                      </span>
                    )}
                    {f.status === 'SUGGESTED' && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                        <Sparkles className="w-3 h-3 text-amber-600" />
                        AI SUGGESTED
                      </span>
                    )}
                    {f.status === 'MANUAL_REQUIRED' && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                        <AlertCircle className="w-3 h-3 text-slate-500" />
                        MANUAL ENTRY
                      </span>
                    )}
                    {f.status === 'CONFLICT' && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-100 text-red-800 border border-red-200">
                        <AlertCircle className="w-3 h-3 text-red-600" />
                        CONFLICT
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">
                    Target Field Key: <span className="text-slate-600">{f.fieldId}</span>
                  </span>
                </div>

                {/* Field Value Box */}
                <div className="flex items-center gap-4">
                  <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg min-w-[200px] text-right">
                    <span className="font-mono font-bold text-slate-900 text-xs">
                      {f.populatedValue || '—'}
                    </span>
                  </div>

                  {f.sourceDoc && (
                    <div className="text-[10px] text-slate-500 flex flex-col text-right">
                      <span className="font-mono font-bold text-slate-700">
                        {f.evidenceFactId || 'Direct'}
                      </span>
                      <span>{f.sourceDoc}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-6 border-t border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs text-slate-500 flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5" />
            All submissions certified under Section 193 of the Indian Penal Code & Digital Signature
            Act.
          </span>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('applications-tracker')}
              className="px-4 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 cursor-pointer"
            >
              Return to Applications Tracker
            </button>
            <button
              onClick={handleApplyAutofillAndSubmit}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-2xs transition-colors cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              Transmit Electronically
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

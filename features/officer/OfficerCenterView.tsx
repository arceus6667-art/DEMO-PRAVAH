import React, { useState } from 'react';
import { usePravahState } from '../../hooks/usePravahState';
import { useTranslations } from '../../hooks/useTranslations';
import { RegulatoryApproval } from '../../types/approval';
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Eye,
  FileText,
  Search,
  Building2,
  Calendar,
  Send,
  MessageSquareWarning,
  Sparkles,
  Lock,
  ArrowRight
} from 'lucide-react';

export const OfficerCenterView: React.FC = () => {
  const {
    approvals,
    updateApprovalStatus,
    currentRole,
    setCurrentRole,
    facts,
    slaRecords,
    setActiveTab
  } = usePravahState();
  const { t } = useTranslations();

  const [selectedDept, setSelectedDept] = useState<string>('ALL');
  const [activeApproval, setActiveApproval] = useState<RegulatoryApproval>(approvals[0]);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [queryInput, setQueryInput] = useState('');
  const [isQueryModalOpen, setIsQueryModalOpen] = useState(false);

  const filteredApprovals = approvals.filter((a) =>
    selectedDept === 'ALL' ? true : a.department.includes(selectedDept as any)
  );

  const handleApprove = (approvalId: string) => {
    updateApprovalStatus(approvalId, 'NOC_GRANTED');
    setFeedback(`Clearance ${approvalId} granted statutory sanction by Competent Authority.`);
  };

  const handleSendOfficialQuery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!queryInput.trim()) return;

    updateApprovalStatus(activeApproval.approvalId, 'ACTION_REQUIRED');
    setFeedback(
      `Technical query dispatched for ${activeApproval.approvalId}. Statutory SLA clock frozen per Section 7.`
    );
    setIsQueryModalOpen(false);
    setQueryInput('');
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-[1600px] mx-auto pb-16">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-2xs flex flex-col xl:flex-row xl:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>MODULE 16 • GOVERNMENT OFFICER SCRUTINY & SANCTION DESK</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Inter-Departmental Scrutiny Workbench
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            Competent authority desk for reviewing evidence dossiers, issuing statutory queries, and executing
            digital sanctions.
          </p>
        </div>

        {currentRole !== 'OFFICER' && (
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentRole('OFFICER')}
              className="px-4 py-2.5 bg-blue-600 text-white hover:bg-blue-700 rounded-xl text-xs font-bold flex items-center gap-2 shadow-2xs transition-colors cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4" />
              Switch to Officer Perspective
            </button>
          </div>
        )}
      </div>

      {feedback && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl text-emerald-900 text-xs flex items-center justify-between animate-in fade-in duration-200">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span className="font-medium">{feedback}</span>
          </div>
          <button onClick={() => setFeedback(null)} className="text-emerald-700 font-bold hover:underline">
            Dismiss
          </button>
        </div>
      )}

      {/* Main Officer Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Clearances Pending Review */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-900">
                Departmental Scrutiny Docket ({filteredApprovals.length})
              </h3>
              <div className="flex items-center gap-1">
                {['ALL', 'MPCB', 'MIDC', 'DISH'].map((d) => (
                  <button
                    key={d}
                    onClick={() => setSelectedDept(d)}
                    className={`px-2 py-0.5 rounded text-[10px] font-bold cursor-pointer ${
                      selectedDept === d
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3">
              {filteredApprovals.map((app) => {
                const isSelected = activeApproval.approvalId === app.approvalId;
                const isApproved = app.status === 'NOC_GRANTED';
                const isQuery = app.status === 'ACTION_REQUIRED';

                return (
                  <button
                    key={app.approvalId}
                    onClick={() => {
                      setActiveApproval(app);
                      setFeedback(null);
                    }}
                    className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col gap-2 ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/50 ring-2 ring-blue-500/20 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-white text-blue-700 border border-slate-200">
                        {app.approvalId}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          isApproved
                            ? 'bg-emerald-100 text-emerald-800'
                            : isQuery
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {app.status.replace(/_/g, ' ')}
                      </span>
                    </div>

                    <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{app.approvalName}</h4>

                    <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100">
                      <span>{app.department}</span>
                      <span className="font-mono text-slate-600 font-semibold">
                        SLA: {app.statutorySlaDays} Days
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Scrutiny Action Desk */}
        <div className="lg:col-span-7 flex flex-col gap-5">
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-2xs flex flex-col gap-5">
            <div className="flex items-start justify-between pb-4 border-b border-slate-200">
              <div>
                <span className="text-[10px] font-mono font-bold text-blue-700 uppercase">
                  {activeApproval.department} • STATUTORY DESK
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                  {activeApproval.approvalName}
                </h3>
                <p className="text-xs text-slate-500">
                  Application ID: <span className="font-mono text-slate-800 font-semibold">{activeApproval.approvalId}</span>
                </p>
              </div>

              <span
                className={`text-xs font-bold px-3 py-1 rounded-full uppercase ${
                  activeApproval.status === 'NOC_GRANTED'
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-blue-100 text-blue-800'
                }`}
              >
                {activeApproval.status.replace(/_/g, ' ')}
              </span>
            </div>

            {/* Facts Pre-Scrutiny Check */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold text-slate-700">
                Verified Evidence Facts Linked to this Application:
              </span>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col gap-2">
                {facts.slice(0, 4).map((f) => (
                  <div key={f.id} className="flex items-center justify-between text-xs">
                    <span className="font-medium text-slate-700">{f.key}</span>
                    <span className="font-mono font-bold text-slate-900">{String(f.value)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Officer Scrutiny Buttons */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col gap-3">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Competent Officer Statutory Decisions:
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={() => handleApprove(activeApproval.approvalId)}
                  disabled={activeApproval.status === 'NOC_GRANTED'}
                  className={`p-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    activeApproval.status === 'NOC_GRANTED'
                      ? 'bg-emerald-100 text-emerald-800 cursor-not-allowed'
                      : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-2xs'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Grant Official Clearance
                </button>

                <button
                  onClick={() => setIsQueryModalOpen(true)}
                  className="p-3 rounded-xl font-bold text-xs bg-amber-500 hover:bg-amber-600 text-slate-950 flex items-center justify-center gap-2 transition-all cursor-pointer shadow-2xs"
                >
                  <MessageSquareWarning className="w-4 h-4" />
                  Issue Statutory Query
                </button>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-200 text-xs text-slate-500">
                <span>Joint Inspection Scheduled: 04 Oct 2026</span>
                <button
                  onClick={() => setActiveTab('inspection-center')}
                  className="text-blue-600 hover:underline font-semibold"
                >
                  Manage Inspection →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Query Dispatch Modal */}
      {isQueryModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 animate-in fade-in zoom-in-95 duration-150 flex flex-col gap-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">
                Dispatch Formal Technical Query
              </h3>
              <button
                onClick={() => setIsQueryModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-semibold"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Formal queries will be posted directly to the applicant's docket and freeze the RTS statutory
              countdown timer. Provide specific technical clauses.
            </p>

            <form onSubmit={handleSendOfficialQuery} className="flex flex-col gap-3">
              <textarea
                value={queryInput}
                onChange={(e) => setQueryInput(e.target.value)}
                placeholder="Specify required technical documentation or statutory clarification..."
                rows={4}
                className="w-full p-3 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
              />

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsQueryModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-2 shadow-2xs transition-colors cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  Dispatch Query to Docket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

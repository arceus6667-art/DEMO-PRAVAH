import React, { useState } from 'react';
import { usePravahState } from '../../hooks/usePravahState';
import { useTranslations } from '../../hooks/useTranslations';
import { EscalationCase } from '../../types/platform';
import {
  MessageSquareWarning,
  Send,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ShieldAlert,
  ArrowUpRight,
  User,
  Paperclip,
  Building,
  HelpCircle,
  FileCheck
} from 'lucide-react';

export const QueriesEscalationsView: React.FC = () => {
  const { escalations, replyToEscalation, setActiveTab } = usePravahState();
  const { t } = useTranslations();

  const [selectedCase, setSelectedCase] = useState<EscalationCase>(escalations[0]);
  const [replyText, setReplyText] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    replyToEscalation(selectedCase.caseId, replyText);
    setToastMessage(
      `Response transmitted to ${selectedCase.department} scrutiny docket. Statutory query clock stopped.`
    );
    setReplyText('');
  };

  const handleApplyPreCannedReply = () => {
    setReplyText(
      'Regarding the 15 KLD effluent query: Aarohan Precision has integrated a 20 KLD Multi-Effect Evaporator (MEE) and Reverse Osmosis ZLD system under Fact ID: EFF-9921-ENV. 94% of treated water will be recycled into cooling towers.'
    );
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-[1600px] mx-auto pb-16">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-2xs flex flex-col xl:flex-row xl:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 mb-1">
            <MessageSquareWarning className="w-4 h-4" />
            <span>MODULE 13 • SCRUTINY QUERIES & STATUTORY ESCALATION LADDER</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Inter-Departmental Query Resolution & Grievance Redressal
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            Auditable dialogue channel between industrial applicants and departmental officers.
            Prevents artificial application rejections via statutory query freezing.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('sla-guardian')}
            className="px-4 py-2.5 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-xl text-xs font-semibold flex items-center gap-2 border border-blue-200 transition-colors cursor-pointer"
          >
            <Clock className="w-4 h-4" />
            Check SLA Freezing Status
          </button>
        </div>
      </div>

      {toastMessage && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl text-emerald-900 text-xs flex items-center justify-between animate-in fade-in duration-200">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span className="font-medium">{toastMessage}</span>
          </div>
          <button onClick={() => setToastMessage(null)} className="text-emerald-700 font-bold hover:underline">
            Dismiss
          </button>
        </div>
      )}

      {/* Main Split Layout: Escalation Cases List vs Thread Viewer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Queries & Escalations List */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-900">
                Departmental Queries & Tickets ({escalations.length})
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                Action Pending
              </span>
            </div>

            <div className="flex flex-col gap-3">
              {escalations.map((c) => {
                const isSelected = selectedCase.caseId === c.caseId;
                const isPending = c.status === 'INVESTOR_ACTION_PENDING';

                return (
                  <button
                    key={c.caseId}
                    onClick={() => {
                      setSelectedCase(c);
                      setToastMessage(null);
                    }}
                    className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col gap-2 ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/50 ring-2 ring-blue-500/20 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-white text-blue-700 border border-slate-200">
                        {c.caseId}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          isPending
                            ? 'bg-amber-100 text-amber-800 animate-pulse'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {c.status.replace(/_/g, ' ')}
                      </span>
                    </div>

                    <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{c.subject}</h4>

                    <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100">
                      <span>{c.department}</span>
                      <span className="font-mono text-slate-400">{c.createdAt}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Statutory Freeze Rule Alert */}
          <div className="p-4 bg-slate-900 text-white rounded-2xl flex flex-col gap-2 shadow-sm text-xs">
            <div className="flex items-center gap-2 text-amber-400 font-bold">
              <Clock className="w-4 h-4" />
              <span>Statutory Query Freeze Provision</span>
            </div>
            <p className="text-slate-300 leading-relaxed text-[11px]">
              Under Maharashtra RTS Act Section 7, issuance of a formal technical query legitimately pauses the departmental SLA timer. Responding promptly restarts the statutory clock toward final deemed approval.
            </p>
          </div>
        </div>

        {/* Right Column: Case Messaging Workbench */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="bg-white border border-slate-200/80 rounded-2xl shadow-2xs overflow-hidden flex flex-col">
            {/* Case Header */}
            <div className="p-5 border-b border-slate-200 bg-slate-50/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-mono font-bold text-blue-700 uppercase">
                  {selectedCase.department} • CLEARANCE #{selectedCase.applicationId}
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-0.5">{selectedCase.subject}</h3>
                <p className="text-xs text-slate-500">
                  Assigned Officer: {selectedCase.assignedOfficer} ({selectedCase.department})
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                  SLA Deadline: {selectedCase.slaDeadline}
                </span>
              </div>
            </div>

            {/* Messages Stream */}
            <div className="p-6 flex flex-col gap-4 max-h-[400px] overflow-y-auto bg-slate-50/30">
              {selectedCase.history.map((m, idx) => {
                const isOfficer = m.senderRole === 'OFFICER';

                return (
                  <div
                    key={idx}
                    className={`flex flex-col gap-1 max-w-[85%] ${
                      isOfficer ? 'self-start' : 'self-end items-end'
                    }`}
                  >
                    <div className="flex items-center gap-2 text-[10px] text-slate-400">
                      <span className="font-semibold text-slate-600">{m.sender}</span>
                      <span>•</span>
                      <span className="font-mono">{m.timestamp}</span>
                    </div>

                    <div
                      className={`p-4 rounded-2xl text-xs leading-relaxed ${
                        isOfficer
                          ? 'bg-white border border-slate-200 text-slate-800 shadow-2xs rounded-tl-xs'
                          : 'bg-blue-600 text-white shadow-2xs rounded-tr-xs'
                      }`}
                    >
                      {m.content}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Reply Composer */}
            <div className="p-5 border-t border-slate-200 bg-white flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">Compose Official Response:</span>
                <button
                  type="button"
                  onClick={handleApplyPreCannedReply}
                  className="text-[11px] font-semibold text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
                >
                  + Use Verified ZLD Technical Reply
                </button>
              </div>

              <form onSubmit={handleSendReply} className="flex flex-col gap-3">
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Enter formal response with technical justifications, certified drawing references, or statutory evidence..."
                  rows={3}
                  className="w-full p-3 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
                />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Paperclip className="w-4 h-4 text-slate-400" />
                    <span>Evidence facts automatically linked</span>
                  </div>

                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-2xs transition-colors cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Transmit Official Reply
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

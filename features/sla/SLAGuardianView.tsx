import React, { useState } from 'react';
import { usePravahState } from '../../hooks/usePravahState';
import { useTranslations } from '../../hooks/useTranslations';
import { SLAService } from '../../services/slaService';
import { SLARecord } from '../../types/platform';
import {
  Clock,
  AlertTriangle,
  CheckCircle2,
  ShieldAlert,
  ArrowUpRight,
  Calendar,
  Building,
  UserCheck,
  Zap,
  HelpCircle,
  Scale,
  Sparkles,
  RefreshCw,
  Send
} from 'lucide-react';

export const SLAGuardianView: React.FC = () => {
  const { slaRecords, updateApprovalStatus, setActiveTab } = usePravahState();
  const { t } = useTranslations();

  const [selectedRecord, setSelectedRecord] = useState<SLARecord>(slaRecords[0]);
  const [deemedSuccess, setDeemedSuccess] = useState<string | null>(null);

  const handleTriggerDeemedApproval = (approvalId: string) => {
    updateApprovalStatus(approvalId, 'NOC_GRANTED');
    setDeemedSuccess(
      `Statutory Deemed Approval invoked for ${approvalId} under Section 4 of the Maharashtra Right to Public Services Act 2015. Certificate issued with digital timestamp.`
    );
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-[1600px] mx-auto pb-16">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-2xs flex flex-col xl:flex-row xl:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 mb-1">
            <Clock className="w-4 h-4" />
            <span>MODULE 11 • SLA GUARDIAN & STATUTORY CLOCK</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Statutory Timeline Monitor & Deemed Clearance Engine
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            Enforces strict service-level agreements under the Maharashtra Right to Public Services Act 2015.
            Predicts bureaucratic bottlenecks before deadlines breach.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('inspection-center')}
            className="px-4 py-2.5 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-xl text-xs font-semibold flex items-center gap-2 border border-blue-200 transition-colors cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            Coordinate Joint Inspection
          </button>
          <button
            onClick={() => setActiveTab('queries-escalations')}
            className="px-4 py-2.5 bg-slate-900 text-white hover:bg-slate-800 rounded-xl text-xs font-semibold flex items-center gap-2 shadow-2xs transition-colors cursor-pointer"
          >
            <ShieldAlert className="w-4 h-4 text-amber-300" />
            File Appellate Grievance
          </button>
        </div>
      </div>

      {deemedSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl text-emerald-900 text-xs flex items-center justify-between animate-in fade-in duration-200">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span className="font-medium">{deemedSuccess}</span>
          </div>
          <button onClick={() => setDeemedSuccess(null)} className="text-emerald-700 font-bold hover:underline">
            Dismiss
          </button>
        </div>
      )}

      {/* KPI SLA Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Overall SLA Adherence
          </span>
          <p className="text-3xl font-extrabold text-emerald-600 font-mono mt-1">94.2%</p>
          <span className="text-[11px] text-slate-500 mt-1 block">
            Across 7 statutory clearances
          </span>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs">
          <span className="text-[11px] font-bold text-amber-600 uppercase tracking-wider">
            Clearances At Risk
          </span>
          <p className="text-3xl font-extrabold text-amber-600 font-mono mt-1">1 Clearance</p>
          <span className="text-[11px] text-slate-500 mt-1 block">
            6 days remaining on Fire NOC
          </span>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs">
          <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider">
            Mean Processing Velocity
          </span>
          <p className="text-3xl font-extrabold text-blue-700 font-mono mt-1">18.4 Days</p>
          <span className="text-[11px] text-slate-500 mt-1 block">
            Versus 45-day statutory cap
          </span>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs">
          <span className="text-[11px] font-bold text-purple-600 uppercase tracking-wider">
            Deemed Approvals Issued
          </span>
          <p className="text-3xl font-extrabold text-purple-700 font-mono mt-1">0 Invoked</p>
          <span className="text-[11px] text-slate-500 mt-1 block">RTS Section 4 guarantee</span>
        </div>
      </div>

      {/* SLA Records Table & Inspection Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Clearances SLA Timeline */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          <div className="bg-white border border-slate-200/80 rounded-2xl shadow-2xs overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-600" />
                Active Departmental Scrutiny Timers
              </h3>
              <span className="text-xs text-slate-500 font-medium">
                Live statutory clock synchronizer
              </span>
            </div>

            <div className="divide-y divide-slate-100">
              {slaRecords.map((rec) => {
                const isSelected = selectedRecord.approvalId === rec.approvalId;
                const isHighRisk = rec.riskLevel === 'HIGH';
                const percentageElapsed = Math.min(
                  100,
                  Math.round((rec.elapsedDays / rec.officialSlaDays) * 100)
                );

                return (
                  <div
                    key={rec.approvalId}
                    onClick={() => setSelectedRecord(rec)}
                    className={`p-5 transition-all cursor-pointer flex flex-col gap-3 ${
                      isSelected
                        ? 'bg-blue-50/50 ring-1 ring-blue-500/20'
                        : 'hover:bg-slate-50/70'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                            {rec.approvalId}
                          </span>
                          <span className="text-xs font-bold text-slate-900">
                            {rec.approvalName}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          {rec.department} • Officer In-Charge: {rec.officerName} (
                          {rec.officerDesignation})
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        {isHighRisk ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-red-100 text-red-800 border border-red-200 animate-pulse">
                            <AlertTriangle className="w-3 h-3 text-red-600" />
                            HIGH RISK ({rec.remainingDays}d left)
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            ON TRACK ({rec.remainingDays}d left)
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="flex flex-col gap-1.5">
                      <div className="flex justify-between text-[11px]">
                        <span className="text-slate-500">
                          Elapsed: <strong className="text-slate-800">{rec.elapsedDays} days</strong> of {rec.officialSlaDays} days
                        </span>
                        <span className="font-mono font-bold text-slate-700">
                          {percentageElapsed}% statutory duration
                        </span>
                      </div>
                      <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all ${
                            isHighRisk ? 'bg-red-500' : 'bg-blue-600'
                          }`}
                          style={{ width: `${percentageElapsed}%` }}
                        />
                      </div>
                    </div>

                    {rec.riskFactors.length > 0 && (
                      <p className="text-[11px] text-amber-800 bg-amber-50 p-2.5 rounded-lg border border-amber-200 leading-tight">
                        <strong>Predictive Anomaly:</strong> {rec.riskFactors.join(', ')}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Selected Record Deep Dive & Deemed Approval Action */}
        <div className="lg:col-span-4 flex flex-col gap-5">
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-2xs flex flex-col gap-4">
            <div className="flex items-center gap-2 text-xs font-bold text-blue-700 uppercase tracking-wider">
              <Scale className="w-4 h-4" />
              Statutory Rights & Recourse
            </div>

            <h3 className="text-base font-bold text-slate-900 leading-snug">
              {selectedRecord.approvalName}
            </h3>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col gap-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Department:</span>
                <span className="font-semibold text-slate-800">{selectedRecord.department}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Competent Officer:</span>
                <span className="font-semibold text-slate-800">{selectedRecord.officerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Submission Date:</span>
                <span className="font-mono text-slate-800">{selectedRecord.submittedAt}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Next Escalation:</span>
                <span className="font-mono font-bold text-red-600">
                  {selectedRecord.nextEscalationDate}
                </span>
              </div>
            </div>

            {/* Deemed Approval Statutory Box */}
            <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-xl flex flex-col gap-3">
              <div className="flex items-start gap-2">
                <Zap className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div className="text-xs text-amber-900 leading-relaxed">
                  <strong>Section 4 — Maharashtra RTS Act:</strong> If the competent authority fails to decide within {selectedRecord.officialSlaDays} working days without documented technical justification, applicant holds statutory right to invoke deemed sanction.
                </div>
              </div>

              <button
                onClick={() => handleTriggerDeemedApproval(selectedRecord.approvalId)}
                className="w-full py-2.5 px-4 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
              >
                <Zap className="w-3.5 h-3.5" />
                Simulate Deemed Approval Invocation
              </button>
            </div>

            <div className="flex flex-col gap-2 pt-2 border-t border-slate-100">
              <span className="text-xs font-bold text-slate-700">Appellate Ladder:</span>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-[11px] text-slate-600 flex flex-col gap-1">
                <span>
                  <strong>1st Appeal:</strong> Addl. Commissioner of Industries (within 30 days)
                </span>
                <span>
                  <strong>2nd Appeal:</strong> Divisional Commissioner / State RTS Commission
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

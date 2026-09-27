import React, { useState } from 'react';
import { usePravahState } from '../../hooks/usePravahState';
import { useTranslations } from '../../hooks/useTranslations';
import { StatusChip } from '../../components/StatusChip';
import { RegulatoryApproval } from '../../types/approval';
import {
  Download,
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  Building,
  Clock,
  ShieldCheck,
  ChevronRight,
  Filter
} from 'lucide-react';

export const InvestorDashboard: React.FC = () => {
  const {
    project,
    approvals,
    discrepancies,
    setActiveTab,
    resolveDiscrepancy
  } = usePravahState();

  const { t } = useTranslations();
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'REVIEW' | 'ACTION' | 'GRANTED' | 'EXEMPTED'>('ALL');

  const fireNocDiscrepancy = discrepancies.find((d) => d.id === 'DISC-FIRE-CAD-01' && !d.isResolved);

  // Filtered approvals calculation
  const filteredApprovals = approvals.filter((a) => {
    if (statusFilter === 'REVIEW') {
      return a.status === 'UNDER_DESK_REVIEW' || a.status === 'SUBMITTED' || a.status === 'FEASIBILITY_CLEARED';
    }
    if (statusFilter === 'ACTION') {
      return a.status === 'ACTION_REQUIRED' || a.status === 'EVIDENCE_PENDING';
    }
    if (statusFilter === 'GRANTED') {
      return a.status === 'NOC_GRANTED';
    }
    if (statusFilter === 'EXEMPTED') {
      return a.status === 'EXEMPTED';
    }
    return true;
  });

  const grantedCount = approvals.filter((a) => a.status === 'NOC_GRANTED').length;
  const underReviewCount = approvals.filter((a) =>
    a.status === 'UNDER_DESK_REVIEW' || a.status === 'SUBMITTED' || a.status === 'FEASIBILITY_CLEARED'
  ).length;
  const actionRequiredCount = approvals.filter((a) =>
    a.status === 'ACTION_REQUIRED' || a.status === 'EVIDENCE_PENDING'
  ).length;

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto">
      {/* 1. Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/80">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold font-heading text-[#1E3A8A] tracking-tight">
            {t('navOverview', 'Regulatory Clearances Overview')}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {project.organisation} · <span className="font-mono text-slate-600">MIDC Chakan Phase II, Pune</span>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => alert(`Downloading consolidated regulatory dossier for ${project.organisation} (PDF, 4.2 MB)`)}
            className="flex items-center gap-1.5 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>{t('downloadDossier', 'Download Dossier (PDF)')}</span>
          </button>
          <button
            onClick={() => setActiveTab('dependency-graph')}
            className="flex items-center gap-1.5 bg-[#1E3A8A] hover:bg-[#1e3066] text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors shadow-2xs cursor-pointer"
          >
            <span>{t('continueJourney', 'View Dependency Graph')}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 2. Key Summary Cards (MAITRI Government Color Configuration) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Clearances - Soft Blue/Navy Tint */}
        <div className="bg-[#EFF6FF] p-4 rounded-xl border border-[#BFDBFE] shadow-2xs">
          <div className="flex items-center justify-between text-[#1E40AF] text-xs font-medium">
            <span>{t('totalClearances', 'Total Clearances')}</span>
            <Building className="w-4 h-4 text-[#1E3A8A]" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-[#1E3A8A] font-mono">{approvals.length}</span>
            <span className="text-xs text-[#3B82F6]">6 {t('coveringLineDepts', 'Depts')}</span>
          </div>
        </div>

        {/* Granted & Vaulted - Soft Mint/Green Tint */}
        <div className="bg-[#ECFDF5] p-4 rounded-xl border border-[#A7F3D0] shadow-2xs">
          <div className="flex items-center justify-between text-[#065F46] text-xs font-medium">
            <span>{t('completed', 'NOCs Granted')}</span>
            <CheckCircle2 className="w-4 h-4 text-[#059669]" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-[#047857] font-mono">0{grantedCount}</span>
            <span className="text-xs text-[#059669] font-medium">36% {t('completed', 'Cleared')}</span>
          </div>
        </div>

        {/* In Review - Soft Purple / Lavender Tint (like MAITRI Feedback card) */}
        <div className="bg-[#F5F3FF] p-4 rounded-xl border border-[#DDD6FE] shadow-2xs">
          <div className="flex items-center justify-between text-[#5B21B6] text-xs font-medium">
            <span>{t('underReview', 'Under Review')}</span>
            <Clock className="w-4 h-4 text-[#7C3AED]" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-[#6D28D9] font-mono">0{underReviewCount}</span>
            <span className="text-xs text-[#7C3AED]">{t('parallelProcessing', 'On schedule')}</span>
          </div>
        </div>

        {/* Action Required - Warm Amber / Yellow Tint (like MAITRI Quick Links card) */}
        <div className={`p-4 rounded-xl border shadow-2xs ${
          actionRequiredCount > 0 ? 'bg-[#FFFBEB] border-[#FDE68A]' : 'bg-[#FEFCE8] border-[#FEF08A]'
        }`}>
          <div className="flex items-center justify-between text-xs font-medium">
            <span className={actionRequiredCount > 0 ? 'text-[#92400E]' : 'text-[#854D0E]'}>
              {t('actionRequired', 'Action Required')}
            </span>
            <AlertTriangle className={`w-4 h-4 ${actionRequiredCount > 0 ? 'text-[#D97706]' : 'text-[#CA8A04]'}`} />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className={`text-2xl font-bold font-mono ${actionRequiredCount > 0 ? 'text-[#92400E]' : 'text-[#854D0E]'}`}>
              0{actionRequiredCount}
            </span>
            <span className={`text-xs ${actionRequiredCount > 0 ? 'text-[#B45309]' : 'text-[#A16207]'}`}>
              {actionRequiredCount > 0 ? 'Fire NOC Layout' : 'All Clear'}
            </span>
          </div>
        </div>
      </div>

      {/* 3. Action Required Notice (Clean & Non-Intrusive) */}
      {fireNocDiscrepancy ? (
        <div className="bg-amber-50/70 border border-amber-300 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-amber-950">
                {t('criticalBlockingFactor', 'Attention Required')}: MIDC Fire Safety Clearance
              </span>
              <p className="text-amber-900 mt-0.5 leading-relaxed">
                Architect layout CAD v1 reflects 7.5m internal turning radius. UDCPR 2020 §14.8 requires 9.0m minimum. Resolve to unblock downstream Factory Plan approval.
              </p>
            </div>
          </div>
          <button
            onClick={() => resolveDiscrepancy('DISC-FIRE-CAD-01', 'OPT-AUTO-ALIGN')}
            className="shrink-0 bg-amber-900 hover:bg-amber-950 text-white px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer flex items-center gap-1.5 self-start sm:self-center"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
            <span>{t('resolveWithCadastral', 'Resolve with Cadastral v3 (1-Click)')}</span>
          </button>
        </div>
      ) : (
        <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-3 flex items-center justify-between text-xs text-emerald-900">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span className="font-medium">
              {t('allBlockingFactorsResolved', 'All critical clearance factors resolved! Fire NOC Cadastral v3 9.4m turning radius verified.')}
            </span>
          </div>
          <button
            onClick={() => setActiveTab('autofill-engine')}
            className="text-emerald-800 font-semibold hover:underline"
          >
            {t('proceedToAutofill', 'Proceed to Form Autofill →')}
          </button>
        </div>
      )}

      {/* 4. Main Clearance Status Table */}
      <div className="bg-white border border-slate-200/80 rounded-xl shadow-2xs overflow-hidden">
        {/* Table Filter Tabs */}
        <div className="px-5 py-3 border-b border-slate-200/80 flex flex-wrap items-center justify-between gap-3 bg-slate-50/50">
          <div className="flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-slate-400 mr-1" />
            <button
              onClick={() => setStatusFilter('ALL')}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                statusFilter === 'ALL'
                  ? 'bg-white text-slate-900 font-semibold shadow-2xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All ({approvals.length})
            </button>
            <button
              onClick={() => setStatusFilter('REVIEW')}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                statusFilter === 'REVIEW'
                  ? 'bg-white text-[#1E3A8A] font-semibold shadow-2xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t('underReview', 'In Review')} ({underReviewCount})
            </button>
            <button
              onClick={() => setStatusFilter('ACTION')}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                statusFilter === 'ACTION'
                  ? 'bg-white text-amber-900 font-semibold shadow-2xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t('actionRequired', 'Action Required')} ({actionRequiredCount})
            </button>
            <button
              onClick={() => setStatusFilter('GRANTED')}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                statusFilter === 'GRANTED'
                  ? 'bg-white text-emerald-700 font-semibold shadow-2xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t('completed', 'Granted')} ({grantedCount})
            </button>
          </div>

          <span className="text-xs text-slate-500 hidden sm:inline">
            {t('statutoryLifecycleJourneyTracker', 'Single Window Clearance Pipeline')}
          </span>
        </div>

        {/* Clearances Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200/80 text-slate-500 font-medium">
                <th className="py-2.5 px-4">{t('statutoryAuthority', 'Clearance & Statutory Scheme')}</th>
                <th className="py-2.5 px-4">{t('jurisdictionOfficer', 'Department & Officer')}</th>
                <th className="py-2.5 px-4">{t('currentState', 'Status')}</th>
                <th className="py-2.5 px-4">{t('statutorySlaWindow', 'Statutory SLA')}</th>
                <th className="py-2.5 px-4 text-right">{t('action', 'Action')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredApprovals.map((approval) => {
                const isDiscrepant = approval.approvalId === 'MIDC-FIRE-NOC-01' && fireNocDiscrepancy;
                const statusToDisplay = isDiscrepant ? 'ACTION_REQUIRED' : approval.status;

                return (
                  <tr key={approval.approvalId} className="hover:bg-slate-50/60 transition-colors">
                    {/* Clearance Title & ID */}
                    <td className="py-3 px-4">
                      <div>
                        <div className="font-semibold text-slate-900">{approval.approvalName}</div>
                        <div className="font-mono text-[11px] text-slate-500 mt-0.5">
                          {approval.approvalId} · {approval.statutoryAct}
                        </div>
                      </div>
                    </td>

                    {/* Department & Officer */}
                    <td className="py-3 px-4">
                      <div className="font-medium text-slate-800">{approval.department}</div>
                      <div className="text-[11px] text-slate-500">{approval.issuingOfficer}</div>
                    </td>

                    {/* Status Chip (Localized) */}
                    <td className="py-3 px-4">
                      <StatusChip status={statusToDisplay} />
                    </td>

                    {/* SLA Progress */}
                    <td className="py-3 px-4">
                      {approval.remainingDays > 0 ? (
                        <div>
                          <span className="font-mono font-semibold text-slate-800">
                            {approval.remainingDays} {t('daysLeft', 'Days Left')}
                          </span>
                          <div className="w-24 bg-slate-100 rounded-full h-1 mt-1 overflow-hidden">
                            <div
                              className={`h-1 rounded-full ${
                                approval.remainingDays < 7 ? 'bg-amber-500' : 'bg-blue-600'
                              }`}
                              style={{
                                width: `${Math.min(100, Math.round((approval.elapsedDays / approval.statutorySlaDays) * 100))}%`
                              }}
                            />
                          </div>
                        </div>
                      ) : (
                        <span className="text-emerald-700 font-medium">✓ Cleared</span>
                      )}
                    </td>

                    {/* Action link */}
                    <td className="py-3 px-4 text-right">
                      {isDiscrepant ? (
                        <button
                          onClick={() => resolveDiscrepancy('DISC-FIRE-CAD-01', 'OPT-AUTO-ALIGN')}
                          className="text-amber-900 bg-amber-100 hover:bg-amber-200 px-2 py-1 rounded text-xs font-semibold transition-colors cursor-pointer"
                        >
                          {t('resolve', 'Resolve')}
                        </button>
                      ) : (
                        <button
                          onClick={() => setActiveTab('applications-tracker')}
                          className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center gap-0.5 cursor-pointer"
                        >
                          <span>Tracker</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. Clean Milestone Progression Bar */}
      <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-2xs">
        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">
          Regulatory Clearance Stages
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          {/* Stage 1 */}
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 flex flex-col justify-between">
            <div className="flex items-center justify-between text-emerald-700 font-semibold mb-1">
              <span>01. Demarcation & Land</span>
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <p className="text-slate-500 text-[11px]">Plot A-42 MIDC Allotment registered & verified</p>
          </div>

          {/* Stage 2 */}
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 flex flex-col justify-between">
            <div className="flex items-center justify-between text-emerald-700 font-semibold mb-1">
              <span>02. Clearance Discovery</span>
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <p className="text-slate-500 text-[11px]">11 statutory approvals mapped on topological DAG</p>
          </div>

          {/* Stage 3 */}
          <div className="p-3 rounded-lg bg-blue-50/60 border border-blue-200 flex flex-col justify-between">
            <div className="flex items-center justify-between text-blue-800 font-semibold mb-1">
              <span>03. Evidence Verification</span>
              <Clock className="w-4 h-4 text-blue-600" />
            </div>
            <p className="text-slate-600 text-[11px]">48 canonical facts verified across statutory deeds</p>
          </div>

          {/* Stage 4 */}
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 opacity-70 flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-400 font-medium mb-1">
              <span>04. Operating Consent (CTO)</span>
              <span>Pending</span>
            </div>
            <p className="text-slate-400 text-[11px]">Triggered post-construction & joint inspection</p>
          </div>
        </div>
      </div>
    </div>
  );
};

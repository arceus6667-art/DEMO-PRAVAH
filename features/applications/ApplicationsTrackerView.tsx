import React, { useState } from 'react';
import { usePravahState } from '../../hooks/usePravahState';
import { useTranslations } from '../../hooks/useTranslations';
import { ApplicationSchema } from '../../types/evidence';
import {
  FileCheck,
  Clock,
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  ExternalLink,
  Zap,
  Eye,
  FileText,
  Send,
  Building2,
  Lock,
  Sparkles,
  ChevronRight,
  Download
} from 'lucide-react';

export const ApplicationsTrackerView: React.FC = () => {
  const {
    project,
    approvals,
    applicationSchemas,
    facts,
    discrepancies,
    updateApprovalStatus,
    setActiveTab
  } = usePravahState();
  const { t } = useTranslations();

  const [selectedSchema, setSelectedSchema] = useState<ApplicationSchema | null>(null);
  const [activeFormTab, setActiveFormTab] = useState<'preview' | 'schema' | 'sandbox'>('preview');
  const [submissionFeedback, setSubmissionFeedback] = useState<string | null>(null);

  const unresolvedConflicts = discrepancies.filter((d) => !d.isResolved);

  // Workflow Checkpoints Definition
  const journeyStages = [
    {
      id: 'STAGE_1',
      title: 'Project Setup & Demarcation',
      status: 'COMPLETED',
      owner: 'Investor',
      timestamp: '24 Sep 2026',
      sla: 'Self-paced',
      desc: 'MIDC Chakan Phase II cadastral plot allocation registered'
    },
    {
      id: 'STAGE_2',
      title: 'Regulatory Discovery & DAG',
      status: 'COMPLETED',
      owner: 'PRAVAH Engine',
      timestamp: '25 Sep 2026',
      sla: '< 1 second',
      desc: '7 statutory clearances mapped with topological critical path'
    },
    {
      id: 'STAGE_3',
      title: 'Evidence Verification & Fact Extraction',
      status: unresolvedConflicts.length > 0 ? 'ATTENTION' : 'COMPLETED',
      owner: 'Sunita Deshmukh (Head Reg)',
      timestamp: '26 Sep 2026',
      sla: 'Immediate',
      desc:
        unresolvedConflicts.length > 0
          ? `${unresolvedConflicts.length} fact conflict detected (Fire CAD turning radius)`
          : 'All 8 statutory evidence facts verified & locked'
    },
    {
      id: 'STAGE_4',
      title: 'Dossier Auto-Fill & Pre-scrutiny',
      status: 'IN_PROGRESS',
      owner: 'PRAVAH Form Engine',
      timestamp: 'Active Now',
      sla: 'Instantaneous',
      desc: '100% facts synthesized for MPCB CTE Form 1 & MIDC Form 4'
    },
    {
      id: 'STAGE_5',
      title: 'Statutory Submission & Fee Payment',
      status: 'IN_PROGRESS',
      owner: 'Departments',
      timestamp: 'Est. 28 Sep 2026',
      sla: 'Gov Portal sync',
      desc: 'Automated electronic push via Maha-SWC API adapter'
    },
    {
      id: 'STAGE_6',
      title: 'Department Scrutiny & Joint Inspection',
      status: 'PENDING',
      owner: 'Joint Inspection Board',
      timestamp: 'Tentative 04 Oct 2026',
      sla: '14 Working Days',
      desc: 'Single joint inspection across MPCB, DISH, and MIDC'
    },
    {
      id: 'STAGE_7',
      title: 'Statutory Decision & Final Clearance',
      status: 'PENDING',
      owner: 'District Authority',
      timestamp: 'Est. 18 Oct 2026',
      sla: 'Section 4 RTS Act (45d)',
      desc: 'Deemed approval guarantee under Maharashtra Right to Services'
    }
  ];

  const handlePreviewForm = (schema: ApplicationSchema) => {
    setSelectedSchema(schema);
    setSubmissionFeedback(null);
  };

  const handleSimulateSubmit = (schemaId: string) => {
    // Find matching approval
    const approval = approvals.find((a) => a.approvalId.includes(schemaId.split('-')[0]));
    if (approval) {
      updateApprovalStatus(approval.approvalId, 'UNDER_DESK_REVIEW');
      setSubmissionFeedback(
        `Application ${schemaId} successfully submitted to ${approval.department} gateway. SLA countdown timer initiated (45 days statutory window).`
      );
    } else {
      setSubmissionFeedback(`Application ${schemaId} transmitted to Department Single Window portal.`);
    }
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-[1600px] mx-auto pb-16">
      {/* Top Banner */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-2xs flex flex-col xl:flex-row xl:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 mb-1">
            <FileCheck className="w-4 h-4" />
            <span>MODULE 4 & 9 • WORKFLOW GUIDANCE & APPLICATION TRACKER</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Regulatory Journey Checkpoints & Application Dossiers
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            Delivery-tracking style governance checkpoints with deterministic next-best-action orchestration for{' '}
            <span className="font-semibold text-slate-800">{project.organisation}</span> ({project.id}).
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('autofill-engine')}
            className="px-4 py-2.5 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-xl text-xs font-semibold flex items-center gap-2 border border-blue-200 transition-colors cursor-pointer"
          >
            <Zap className="w-4 h-4 text-blue-600" />
            Launch Autofill Engine
          </button>
          <button
            onClick={() => setActiveTab('sla-guardian')}
            className="px-4 py-2.5 bg-slate-900 text-white hover:bg-slate-800 rounded-xl text-xs font-semibold flex items-center gap-2 shadow-2xs transition-colors cursor-pointer"
          >
            <Clock className="w-4 h-4 text-amber-400" />
            Monitor SLA Guardian
          </button>
        </div>
      </div>

      {/* Next Best Action Card */}
      <div className="bg-gradient-to-r from-blue-700 to-indigo-800 rounded-2xl p-6 text-white shadow-md relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 opacity-10 pointer-events-none flex items-center pr-10">
          <Sparkles className="w-64 h-64 text-white" />
        </div>
        <div className="relative z-10 max-w-4xl">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-xs font-bold text-amber-300 w-fit mb-3">
            <Zap className="w-3.5 h-3.5 fill-amber-300" />
            <span>NEXT BEST ACTION • DETERMINISTIC RECOMMENDATION</span>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">
            {unresolvedConflicts.length > 0
              ? 'Resolve Cadastral Discrepancy on Fire NOC (Turning Radius 9.4m)'
              : 'Execute Pre-flight Submission for MPCB Consent to Establish (CTE)'}
          </h3>
          <p className="text-blue-100 text-xs sm:text-sm mb-4 leading-relaxed">
            {unresolvedConflicts.length > 0
              ? 'The Evidence Wallet has detected a conflict between the Architect Master Layout (9.1m) and CFO Statutory Fire Safety norms (9.4m minimum). Harmonize this now to unlock both MIDC Fire NOC and Factory Plan approval.'
              : 'All statutory facts have been verified. MPCB Form 1 is 100% autofilled with SHA-256 provenance hashes. You can submit directly to the departmental scrutiny queue.'}
          </p>
          <div className="flex items-center gap-3">
            {unresolvedConflicts.length > 0 ? (
              <button
                onClick={() => setActiveTab('evidence-wallet')}
                className="px-5 py-2.5 bg-amber-400 text-slate-950 hover:bg-amber-300 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-2 cursor-pointer"
              >
                Resolve Conflict in Evidence Wallet
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => handlePreviewForm(applicationSchemas[0])}
                className="px-5 py-2.5 bg-white text-blue-900 hover:bg-blue-50 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-2 cursor-pointer"
              >
                Inspect & Submit MPCB Form 1
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={() => setActiveTab('dependency-graph')}
              className="px-4 py-2.5 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-semibold text-white transition-colors cursor-pointer border border-white/20"
            >
              View Topological Critical Path
            </button>
          </div>
        </div>
      </div>

      {/* Delivery-Style Journey Checkpoints */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-2xs">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              Statutory Lifecycle Journey Tracker
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Live state transitions across 7 progressive milestone stages
            </p>
          </div>
          <span className="text-xs font-mono font-semibold px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200">
            Current Stage: 4 of 7 Active
          </span>
        </div>

        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4">
            {journeyStages.map((stage, idx) => {
              const isCompleted = stage.status === 'COMPLETED';
              const isInProgress = stage.status === 'IN_PROGRESS';
              const isAttention = stage.status === 'ATTENTION';

              return (
                <div
                  key={stage.id}
                  className={`p-4 rounded-xl border flex flex-col justify-between transition-all ${
                    isCompleted
                      ? 'bg-emerald-50/50 border-emerald-200 text-slate-800'
                      : isInProgress
                      ? 'bg-blue-50/70 border-blue-300 ring-2 ring-blue-500/20 shadow-xs'
                      : isAttention
                      ? 'bg-amber-50 border-amber-300 ring-2 ring-amber-500/20'
                      : 'bg-slate-50/70 border-slate-200 text-slate-400 opacity-80'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-white/70 border border-slate-200">
                        0{idx + 1}
                      </span>
                      {isCompleted && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                      {isInProgress && <Clock className="w-4 h-4 text-blue-600 animate-spin" />}
                      {isAttention && <AlertTriangle className="w-4 h-4 text-amber-600" />}
                      {stage.status === 'PENDING' && <Lock className="w-4 h-4 text-slate-400" />}
                    </div>
                    <h4 className="text-xs font-bold text-slate-900 leading-snug mb-1">
                      {stage.title}
                    </h4>
                    <p className="text-[11px] text-slate-600 line-clamp-3 leading-tight mb-3">
                      {stage.desc}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-200/60 flex flex-col gap-1 text-[10px]">
                    <div className="flex justify-between text-slate-500">
                      <span>Owner:</span>
                      <span className="font-semibold text-slate-700 truncate max-w-[100px]">
                        {stage.owner}
                      </span>
                    </div>
                    <div className="flex justify-between text-slate-500">
                      <span>SLA:</span>
                      <span className="font-mono text-slate-700">{stage.sla}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Applications Dossiers Grid */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Configured Departmental Dossiers</h2>
            <p className="text-xs text-slate-500">
              Deterministic form schemas ready for autofill verification and statutory e-filing
            </p>
          </div>
          <span className="text-xs text-slate-600 font-medium">
            Showing {applicationSchemas.length} statutory application packs
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {applicationSchemas.map((schema) => {
            const approval = approvals.find((a) => a.approvalId.includes(schema.applicationId.split('-')[0]));
            const isApproved = approval?.status === 'NOC_GRANTED';
            const isUnderReview = approval?.status === 'UNDER_DESK_REVIEW';
            const isAutoFillReady = approval?.status === 'AUTOFILL_READY';

            return (
              <div
                key={schema.applicationId}
                className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 font-semibold border border-blue-200">
                      {schema.applicationId}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                        isApproved
                          ? 'bg-emerald-100 text-emerald-800'
                          : isUnderReview
                          ? 'bg-blue-100 text-blue-800'
                          : isAutoFillReady
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {approval?.status?.replace(/_/g, ' ') || 'DRAFT'}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mb-1 leading-snug">
                    {schema.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-3">
                    <Building2 className="w-3.5 h-3.5" />
                    <span>{schema.department}</span>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 mb-4 flex flex-col gap-1.5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Statutory Scheme:</span>
                      <span className="font-mono font-medium text-slate-800">{schema.applicationId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Department:</span>
                      <span className="font-semibold text-slate-700">{schema.department}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Form Fields:</span>
                      <span className="font-mono text-slate-800">{schema.fields.length} items</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => handlePreviewForm(schema)}
                    className="flex-1 py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    Preview Form
                  </button>
                  <button
                    onClick={() => handleSimulateSubmit(schema.applicationId)}
                    disabled={isApproved || isUnderReview}
                    className={`py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                      isApproved || isUnderReview
                        ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700 text-white shadow-2xs'
                    }`}
                  >
                    <Send className="w-3.5 h-3.5" />
                    {isUnderReview ? 'Submitted' : isApproved ? 'Granted' : 'Submit'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Form Sandbox & Inspection Drawer / Modal */}
      {selectedSchema && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 text-blue-700 rounded-lg">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">{selectedSchema.title}</h3>
                  <p className="text-xs text-slate-500">
                    {selectedSchema.department} • Schema ID: {selectedSchema.applicationId}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedSchema(null)}
                className="text-slate-400 hover:text-slate-600 p-2 rounded-lg hover:bg-slate-200 text-sm font-semibold"
              >
                ✕ Close
              </button>
            </div>

            {/* Modal Tab Bar */}
            <div className="px-6 py-2 border-b border-slate-200 flex items-center gap-4 bg-white text-xs font-semibold">
              <button
                onClick={() => setActiveFormTab('preview')}
                className={`py-2 border-b-2 transition-colors cursor-pointer ${
                  activeFormTab === 'preview'
                    ? 'border-blue-600 text-blue-700 font-bold'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                Autofilled Form Preview
              </button>
              <button
                onClick={() => setActiveFormTab('schema')}
                className={`py-2 border-b-2 transition-colors cursor-pointer ${
                  activeFormTab === 'schema'
                    ? 'border-blue-600 text-blue-700 font-bold'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                Statutory Schema JSON
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto max-h-[60vh] flex flex-col gap-4">
              {submissionFeedback && (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{submissionFeedback}</span>
                </div>
              )}

              {activeFormTab === 'preview' ? (
                <div className="flex flex-col gap-4">
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-center justify-between text-xs text-amber-900">
                    <span className="flex items-center gap-1.5 font-medium">
                      <ShieldCheck className="w-4 h-4 text-amber-600" />
                      All mapped fields are cryptographically bound to verified Evidence Facts.
                    </span>
                    <span className="font-mono font-bold text-amber-800">
                      {selectedSchema.fields.length} / {selectedSchema.fields.length} Mapped
                    </span>
                  </div>

                  <div className="border border-slate-200 rounded-xl overflow-hidden">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                        <tr>
                          <th className="px-4 py-2.5">Field Name</th>
                          <th className="px-4 py-2.5">Autofilled Value</th>
                          <th className="px-4 py-2.5">Source Fact ID</th>
                          <th className="px-4 py-2.5">Provenance Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {selectedSchema.fields.map((f, i) => (
                          <tr key={i} className="hover:bg-slate-50/70">
                            <td className="px-4 py-2.5 font-medium text-slate-800">{f.fieldLabel}</td>
                            <td className="px-4 py-2.5 font-mono text-slate-900">
                              {f.populatedValue || 'Not specified'}
                            </td>
                            <td className="px-4 py-2.5 font-mono text-slate-500">
                              {f.evidenceFactId || 'Canonical'}
                            </td>
                            <td className="px-4 py-2.5">
                              <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                                {f.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <pre className="p-4 bg-slate-900 text-emerald-400 font-mono text-xs rounded-xl overflow-x-auto">
                  {JSON.stringify(selectedSchema, null, 2)}
                </pre>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                Demonstration statutory schema • Simulated gateway push enabled
              </span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSelectedSchema(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 cursor-pointer"
                >
                  Dismiss
                </button>
                <button
                  onClick={() => handleSimulateSubmit(selectedSchema.applicationId)}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-2xs transition-colors cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  E-File Application Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

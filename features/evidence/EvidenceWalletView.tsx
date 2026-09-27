import React, { useState } from 'react';
import { usePravahState } from '../../hooks/usePravahState';
import { useTranslations } from '../../hooks/useTranslations';
import { EvidenceFact, VerificationStatus } from '../../types/evidence';
import {
  WalletCards,
  ShieldCheck,
  AlertTriangle,
  FileText,
  Clock,
  CheckCircle2,
  ExternalLink,
  Search,
  Filter,
  Eye,
  RefreshCw,
  Sparkles,
  ArrowRight,
  Hash,
  Layers,
  ChevronDown
} from 'lucide-react';

export const EvidenceWalletView: React.FC = () => {
  const {
    facts,
    documents,
    discrepancies,
    resolveDiscrepancy,
    verifyFact,
    project,
    setActiveTab
  } = usePravahState();
  const { t } = useTranslations();

  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFact, setSelectedFact] = useState<EvidenceFact | null>(null);

  const unresolvedDiscrepancies = discrepancies.filter((d) => !d.isResolved);

  const filteredFacts = facts.filter((fact) => {
    const matchesStatus =
      selectedStatus === 'ALL' ? true : fact.verificationStatus === selectedStatus;
    const matchesSearch =
      fact.key.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fact.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      String(fact.value).toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusBadge = (status: VerificationStatus) => {
    switch (status) {
      case 'VERIFIED':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
            <ShieldCheck className="w-3 h-3 text-emerald-600" />
            VERIFIED
          </span>
        );
      case 'AI_EXTRACTED':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-200">
            <Sparkles className="w-3 h-3 text-blue-600" />
            AI EXTRACTED
          </span>
        );
      case 'NEEDS_REVIEW':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
            <Clock className="w-3 h-3 text-amber-600" />
            NEEDS REVIEW
          </span>
        );
      case 'CONFLICT':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-100 text-red-800 border border-red-200 animate-pulse">
            <AlertTriangle className="w-3 h-3 text-red-600" />
            CONFLICT
          </span>
        );
      default:
        return (
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-[1600px] mx-auto pb-16">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-2xs flex flex-col xl:flex-row xl:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 mb-1">
            <WalletCards className="w-4 h-4" />
            <span>MODULE 5 & 7 • EVIDENCE FACT VAULT & ANOMALY RESOLUTION</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Single Source of Regulatory Truth & Provenance Vault
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            Certified canonical facts extracted from statutory deeds, CA certificates, and CAD blueprints.
            Cryptographically bound to downstream application forms.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('document-intelligence')}
            className="px-4 py-2.5 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-xl text-xs font-semibold flex items-center gap-2 border border-blue-200 transition-colors cursor-pointer"
          >
            <FileText className="w-4 h-4" />
            Upload Document for OCR
          </button>
          <button
            onClick={() => setActiveTab('autofill-engine')}
            className="px-4 py-2.5 bg-slate-900 text-white hover:bg-slate-800 rounded-xl text-xs font-semibold flex items-center gap-2 shadow-2xs transition-colors cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            Review Autofill Mappings
          </button>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Total Facts
          </span>
          <p className="text-2xl font-extrabold text-slate-900 mt-1">{facts.length}</p>
          <span className="text-[11px] text-slate-500 mt-1 block">Canonical attributes</span>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs">
          <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider">
            Verified Facts
          </span>
          <p className="text-2xl font-extrabold text-emerald-700 mt-1">
            {facts.filter((f) => f.verificationStatus === 'VERIFIED').length}
          </p>
          <span className="text-[11px] text-emerald-600/80 mt-1 block">Locked & form ready</span>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs">
          <span className="text-[11px] font-bold text-amber-600 uppercase tracking-wider">
            Needs Review
          </span>
          <p className="text-2xl font-extrabold text-amber-700 mt-1">
            {facts.filter((f) => f.verificationStatus === 'NEEDS_REVIEW' || f.verificationStatus === 'AI_EXTRACTED').length}
          </p>
          <span className="text-[11px] text-amber-600/80 mt-1 block">Awaiting sign-off</span>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs">
          <span className="text-[11px] font-bold text-red-600 uppercase tracking-wider">
            Active Conflicts
          </span>
          <p className="text-2xl font-extrabold text-red-700 mt-1">
            {unresolvedDiscrepancies.length}
          </p>
          <span className="text-[11px] text-red-600/80 mt-1 block">Discrepancies detected</span>
        </div>
      </div>

      {/* Discrepancy Alerts (If Any) */}
      {unresolvedDiscrepancies.length > 0 && (
        <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-6 shadow-sm flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-amber-500 text-white rounded-xl shadow-xs">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Cadastral & Cross-Document Conflicts Detected ({unresolvedDiscrepancies.length})
                </h3>
                <p className="text-xs text-amber-800">
                  Deterministic contradiction detected across uploaded documents. Resolve to unblock downstream approval DAG.
                </p>
              </div>
            </div>
            <span className="px-3 py-1 bg-amber-200/80 text-amber-900 text-xs font-bold rounded-full">
              High Regulatory Risk
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {unresolvedDiscrepancies.map((disc) => (
              <div
                key={disc.id}
                className="bg-white border border-amber-200 rounded-xl p-5 shadow-2xs flex flex-col gap-3"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[11px] font-mono font-bold text-amber-700 uppercase">
                      Conflict #{disc.id} • {disc.affectedApprovalName}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 mt-0.5">{disc.title}</h4>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {disc.explanation}
                    </p>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-100 text-red-800">
                    {disc.severity}
                  </span>
                </div>

                {/* Values Comparison */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200/70 text-xs">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-bold text-slate-400">
                      {disc.fieldA.label}
                    </span>
                    <span className="font-mono font-bold text-slate-800 text-sm mt-0.5">
                      {disc.fieldA.value}
                    </span>
                    <span className="text-[10px] text-slate-500">{disc.fieldA.source}</span>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-bold text-slate-400">
                      {disc.fieldB.label}
                    </span>
                    <span className="font-mono font-bold text-red-600 text-sm mt-0.5">
                      {disc.fieldB.value}
                    </span>
                    <span className="text-[10px] text-slate-500">{disc.fieldB.source}</span>
                  </div>
                </div>

                {/* Resolution Options */}
                <div className="flex flex-col gap-2 pt-2 border-t border-slate-100">
                  <span className="text-xs font-bold text-slate-700">Select Resolution Strategy:</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {disc.resolutionOptions.map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => resolveDiscrepancy(disc.id, opt.id)}
                        className="p-3 text-left rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50/50 transition-all flex flex-col justify-between cursor-pointer group"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-bold text-slate-900 group-hover:text-blue-700">
                            {opt.title}
                          </span>
                          <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 transition-transform group-hover:translate-x-0.5" />
                        </div>
                        <p className="text-[11px] text-slate-500 leading-tight">
                          {opt.description}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Fact Vault Table */}
      <div className="bg-white border border-slate-200/80 rounded-2xl shadow-2xs overflow-hidden">
        {/* Table Filter Toolbar */}
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50/50">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search facts by key, ID, or value..."
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            {['ALL', 'VERIFIED', 'AI_EXTRACTED', 'NEEDS_REVIEW', 'CONFLICT'].map((st) => (
              <button
                key={st}
                onClick={() => setSelectedStatus(st)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                  selectedStatus === st
                    ? 'bg-blue-600 text-white shadow-2xs'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {st.replace(/_/g, ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Facts List */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
              <tr>
                <th className="px-5 py-3">Fact Identifier & Key</th>
                <th className="px-5 py-3">Canonical Value</th>
                <th className="px-5 py-3">Source Provenance</th>
                <th className="px-5 py-3">Confidence</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredFacts.map((fact) => {
                const doc = documents.find((d) => d.id === fact.sourceDocumentId);
                const isVerified = fact.verificationStatus === 'VERIFIED';

                return (
                  <tr key={fact.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex flex-col">
                        <span className="font-mono font-bold text-slate-800 text-[11px]">
                          {fact.id}
                        </span>
                        <span className="text-slate-500 text-[11px] font-medium mt-0.5">
                          {fact.key}
                        </span>
                        <span className="text-[10px] text-slate-400 mt-0.5">
                          v{fact.version} • Used by {fact.usedByApplications.length} form(s)
                        </span>
                      </div>
                    </td>

                    <td className="px-5 py-3.5">
                      <span className="font-mono font-bold text-slate-900 bg-slate-100 px-2 py-1 rounded">
                        {String(fact.value)}
                      </span>
                    </td>

                    <td className="px-5 py-3.5">
                      <div className="flex flex-col text-[11px]">
                        <span className="font-medium text-slate-700 truncate max-w-[200px]">
                          {doc?.name || fact.sourceDocumentName || fact.sourceDocumentId}
                        </span>
                        <span className="text-slate-400 text-[10px]">
                          Page {fact.sourcePage} • {fact.sourceType}
                        </span>
                      </div>
                    </td>

                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-1.5 font-mono text-[11px]">
                        <div className="w-12 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${
                              fact.confidence > 0.9 ? 'bg-emerald-500' : 'bg-amber-500'
                            }`}
                            style={{ width: `${Math.round(fact.confidence * 100)}%` }}
                          />
                        </div>
                        <span className="text-slate-600">
                          {Math.round(fact.confidence * 100)}%
                        </span>
                      </div>
                    </td>

                    <td className="px-5 py-3.5">{getStatusBadge(fact.verificationStatus)}</td>

                    <td className="px-5 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {!isVerified && (
                          <button
                            onClick={() => verifyFact(fact.id)}
                            className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[11px] font-bold transition-colors cursor-pointer"
                          >
                            Verify & Lock
                          </button>
                        )}
                        <button
                          onClick={() => setSelectedFact(fact)}
                          className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer"
                        >
                          Provenance
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Fact Provenance Modal */}
      {selectedFact && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 animate-in fade-in zoom-in-95 duration-150 flex flex-col gap-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Hash className="w-5 h-5 text-blue-600" />
                <h3 className="text-base font-bold text-slate-900">Provenance & Audit Details</h3>
              </div>
              <button
                onClick={() => setSelectedFact(null)}
                className="text-slate-400 hover:text-slate-600 text-sm font-semibold"
              >
                ✕
              </button>
            </div>

            <div className="flex flex-col gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex flex-col gap-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-500">Fact ID:</span>
                  <span className="font-mono font-bold text-slate-900">{selectedFact.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Canonical Key:</span>
                  <span className="font-mono font-semibold text-slate-800">{selectedFact.key}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Value:</span>
                  <span className="font-mono font-bold text-blue-700">
                    {String(selectedFact.value)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Status:</span>
                  <span>{getStatusBadge(selectedFact.verificationStatus)}</span>
                </div>
              </div>

              <div className="p-3 bg-blue-50/60 border border-blue-200/80 rounded-xl flex flex-col gap-1.5">
                <div className="flex justify-between">
                  <span className="text-blue-700 font-semibold">Source Document:</span>
                  <span className="font-medium text-slate-800">
                    {selectedFact.sourceDocumentName || selectedFact.sourceDocumentId}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700 font-semibold">Source Page:</span>
                  <span className="font-mono text-slate-800">{selectedFact.sourcePage}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700 font-semibold">Verified By:</span>
                  <span className="font-medium text-slate-800">
                    {selectedFact.verifiedBy || 'Pending human sign-off'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700 font-semibold">Extraction Confidence:</span>
                  <span className="font-mono text-slate-800">
                    {Math.round(selectedFact.confidence * 100)}%
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <span className="font-semibold text-slate-700">Downstream Consuming Forms:</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedFact.usedByApplications.map((appId) => (
                    <span
                      key={appId}
                      className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-mono text-[10px]"
                    >
                      {appId}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
              {selectedFact.verificationStatus !== 'VERIFIED' && (
                <button
                  onClick={() => {
                    verifyFact(selectedFact.id);
                    setSelectedFact(null);
                  }}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                >
                  Verify & Lock Fact
                </button>
              )}
              <button
                onClick={() => setSelectedFact(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

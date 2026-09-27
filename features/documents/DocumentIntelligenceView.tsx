import React, { useState } from 'react';
import { usePravahState } from '../../hooks/usePravahState';
import { useTranslations } from '../../hooks/useTranslations';
import { DocumentRecord, EvidenceFact } from '../../types/evidence';
import {
  EvidenceService,
  DocumentExtractionResult,
  ExtractedFieldItem
} from '../../services/evidenceService';
import {
  FileSearch,
  UploadCloud,
  FileText,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Eye,
  Sparkles,
  Lock,
  Layers,
  FileCode,
  Check,
  Clock,
  RefreshCw,
  Plus,
  X,
  FileCheck2,
  Hash
} from 'lucide-react';

export const DocumentIntelligenceView: React.FC = () => {
  const {
    documents,
    facts,
    setFacts,
    uploadNewDocument,
    verifyFact,
    setActiveTab
  } = usePravahState();
  const { t } = useTranslations();

  const [selectedDoc, setSelectedDoc] = useState<DocumentRecord>(documents[0]);
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractedData, setExtractedData] = useState<DocumentExtractionResult>(() =>
    EvidenceService.simulateDocumentExtraction(documents[0].name)
  );
  const [activeTabSub, setActiveTabSub] = useState<'review' | 'json' | 'preview'>('review');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // Staged fields tracked in local review buffer
  const [stagedFieldKeys, setStagedFieldKeys] = useState<Record<string, 'STAGED' | 'VERIFIED' | 'DISMISSED'>>({});

  // Prototype upload modal state
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [customDocName, setCustomDocName] = useState('');
  const [customDocType, setCustomDocType] = useState<DocumentRecord['documentType']>('LAND_NOC');
  const [customDocSize, setCustomDocSize] = useState('3.4');
  const [customDocPages, setCustomDocPages] = useState('4');

  const handleSelectDocument = (doc: DocumentRecord) => {
    setSelectedDoc(doc);
    setIsExtracting(true);
    setStatusMessage(null);
    setTimeout(() => {
      const result = EvidenceService.simulateDocumentExtraction(doc.name);
      setExtractedData(result);
      setIsExtracting(false);
    }, 300);
  };

  const handlePromoteToEvidenceWallet = (field: ExtractedFieldItem) => {
    // 1. Create staged fact (with status 'AI_EXTRACTED' - NEVER directly 'VERIFIED')
    const stagedFact = EvidenceService.createStagedFact(field, selectedDoc);

    // 2. Add or update into facts list
    setFacts((prev) => {
      const existingIdx = prev.findIndex((f) => f.key === field.key);
      if (existingIdx >= 0) {
        const copy = [...prev];
        copy[existingIdx] = stagedFact;
        return copy;
      }
      return [stagedFact, ...prev];
    });

    setStagedFieldKeys((prev) => ({ ...prev, [field.key]: 'STAGED' }));
    setStatusMessage(
      `Field "${field.name}" staged into Evidence Wallet as AI_EXTRACTED. Mandatory human review required before locking.`
    );
  };

  const handleCustomUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customDocName.trim()) return;

    uploadNewDocument(customDocName.trim(), customDocType);
    setIsUploadModalOpen(false);
    setStatusMessage(
      `Document "${customDocName}" ingested successfully with spatial OCR extraction completed.`
    );
    setCustomDocName('');
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-[1600px] mx-auto pb-16">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-2xs flex flex-col xl:flex-row xl:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 mb-1">
            <FileSearch className="w-4 h-4" />
            <span>MODULE 6 • DOCUMENT INTELLIGENCE & OCR PIPELINE</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Document Extraction & Pre-Verification Workbench
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            Deterministic spatial table extraction and entity recognition for statutory deeds.
            Protects the Evidence Wallet with mandatory human-in-the-loop review.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-2xs transition-colors cursor-pointer"
          >
            <UploadCloud className="w-4 h-4" />
            Upload Document (PDF/Metadata)
          </button>
          <button
            onClick={() => setActiveTab('evidence-wallet')}
            className="px-4 py-2.5 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-xl text-xs font-semibold flex items-center gap-2 border border-blue-200 transition-colors cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4" />
            Open Evidence Wallet
          </button>
        </div>
      </div>

      {statusMessage && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 text-xs flex items-center justify-between animate-in fade-in duration-150">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="font-medium">{statusMessage}</span>
          </div>
          <button
            onClick={() => setStatusMessage(null)}
            className="text-emerald-700 font-bold hover:underline"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Main Split Layout: Documents List / Upload on Left, OCR Extraction & Review on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Documents Selector & Upload Presets */}
        <div className="lg:col-span-4 flex flex-col gap-5">
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-600" />
                Project Documents ({documents.length})
              </h3>
              <button
                onClick={() => setIsUploadModalOpen(true)}
                className="text-[11px] text-blue-600 font-bold hover:underline cursor-pointer"
              >
                + New Ingestion
              </button>
            </div>

            <div className="flex flex-col gap-2">
              {documents.map((doc) => {
                const isSelected = selectedDoc.id === doc.id;
                return (
                  <button
                    key={doc.id}
                    onClick={() => handleSelectDocument(doc)}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col gap-1 ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/60 ring-2 ring-blue-500/20 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white font-bold text-slate-700 border border-slate-200">
                        {doc.documentType}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {doc.sizeMb.toFixed(1)} MB
                      </span>
                    </div>
                    <span className="text-xs font-bold text-slate-900 mt-1 line-clamp-1">
                      {doc.name}
                    </span>
                    <div className="flex items-center justify-between text-[10px] text-slate-500 mt-1 pt-1.5 border-t border-slate-200/60">
                      <span>{doc.pageCount} Pages • OCR Verified</span>
                      <span className="font-mono text-emerald-700 font-semibold">Active</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Preset Demonstrators */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-5 shadow-sm flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-300" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                Sample Statutory Instruments
              </h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Click any verified Maharashtra regulatory document to inspect deterministic spatial OCR extraction.
            </p>
            <div className="flex flex-col gap-2 mt-1">
              <button
                onClick={() =>
                  uploadNewDocument(
                    'MIDC_Chakan_Plot_A42_Allotment_Deed_Cadastral_NOC.pdf',
                    'LAND_NOC'
                  )
                }
                className="w-full py-2 px-3 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-semibold text-left transition-colors flex items-center justify-between cursor-pointer"
              >
                <span>+ Factory Land Allotment & NOC</span>
                <span className="text-[10px] font-mono text-blue-300">MIDC</span>
              </button>
              <button
                onClick={() =>
                  uploadNewDocument(
                    'MCA_Certificate_Of_Incorporation_Aarohan_CIN.pdf',
                    'MCA_INCORPORATION'
                  )
                }
                className="w-full py-2 px-3 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-semibold text-left transition-colors flex items-center justify-between cursor-pointer"
              >
                <span>+ Company Incorporation Certificate</span>
                <span className="text-[10px] font-mono text-emerald-300">MCA CIN</span>
              </button>
              <button
                onClick={() =>
                  uploadNewDocument(
                    'CA_Gross_Investment_Networth_Certificate.pdf',
                    'CA_CERTIFICATE'
                  )
                }
                className="w-full py-2 px-3 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-semibold text-left transition-colors flex items-center justify-between cursor-pointer"
              >
                <span>+ CA Capital Investment Certificate</span>
                <span className="text-[10px] font-mono text-amber-300">UDIN</span>
              </button>
              <button
                onClick={() =>
                  uploadNewDocument(
                    'Architect_Master_Layout_Fire_Safety_Plan.dwg',
                    'CAD_DRAWING'
                  )
                }
                className="w-full py-2 px-3 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-semibold text-left transition-colors flex items-center justify-between cursor-pointer"
              >
                <span>+ Architect Master Layout (9.4m Radius)</span>
                <span className="text-[10px] font-mono text-purple-300">DWG</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: OCR Extraction & Review Workbench */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          <div className="bg-white border border-slate-200/80 rounded-2xl shadow-2xs overflow-hidden flex flex-col">
            {/* Workbench Top Bar */}
            <div className="px-6 py-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/70">
              <div>
                <span className="text-[10px] font-mono font-bold text-blue-700 uppercase">
                  ACTIVE OCR INSPECTION • {extractedData.documentType}
                </span>
                <h3 className="text-base font-bold text-slate-900">{selectedDoc.name}</h3>
                <p className="text-xs text-slate-500 font-mono mt-0.5">
                  SHA-256: {selectedDoc.checksumSha256.substring(0, 36)}...
                </p>
              </div>

              {/* Sub tabs */}
              <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 text-xs font-semibold">
                <button
                  onClick={() => setActiveTabSub('review')}
                  className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                    activeTabSub === 'review'
                      ? 'bg-blue-600 text-white shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Review & Staging Tray
                </button>
                <button
                  onClick={() => setActiveTabSub('json')}
                  className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                    activeTabSub === 'json'
                      ? 'bg-blue-600 text-white shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Strict JSON Payload
                </button>
              </div>
            </div>

            {/* Workbench Body */}
            <div className="p-6">
              {isExtracting ? (
                <div className="py-20 flex flex-col items-center justify-center gap-3">
                  <RefreshCw className="w-8 h-8 text-blue-600 animate-spin" />
                  <p className="text-xs font-semibold text-slate-600">
                    Running OCR spatial parser & entity resolution...
                  </p>
                </div>
              ) : activeTabSub === 'review' ? (
                <div className="flex flex-col gap-6">
                  {/* Governance Notice */}
                  <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-xl flex items-start gap-3 text-xs text-amber-900">
                    <Lock className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold">Human-in-the-Loop Pre-Verification Policy:</span>
                      <p className="mt-0.5 leading-relaxed text-amber-800/90">
                        In accordance with Maharashtra single-window standards, raw OCR extractions are never written directly into VERIFIED evidence. They are staged in the Review Buffer with provenance metadata until signed off.
                      </p>
                    </div>
                  </div>

                  {/* Fields Review Table */}
                  <div className="border border-slate-200 rounded-xl overflow-hidden">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                        <tr>
                          <th className="px-4 py-3">Extracted Statutory Field</th>
                          <th className="px-4 py-3">Value</th>
                          <th className="px-4 py-3">Source Provenance</th>
                          <th className="px-4 py-3">Confidence</th>
                          <th className="px-4 py-3 text-right">Review Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {extractedData.fields.map((f, idx) => {
                          const isAlreadyStaged =
                            stagedFieldKeys[f.key] === 'STAGED' ||
                            facts.some((fact) => fact.key === f.key);

                          return (
                            <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                              <td className="px-4 py-3">
                                <div className="flex flex-col">
                                  <span className="font-semibold text-slate-900">{f.name}</span>
                                  <span className="text-[10px] font-mono text-slate-400">
                                    Key: {f.key}
                                  </span>
                                </div>
                              </td>

                              <td className="px-4 py-3">
                                <span className="font-mono font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
                                  {f.displayValue}
                                </span>
                              </td>

                              <td className="px-4 py-3 font-mono text-slate-500 text-[11px]">
                                Page {f.page}
                              </td>

                              <td className="px-4 py-3 font-mono">
                                <span className="text-emerald-700 font-bold">
                                  {Math.round(f.confidence * 100)}%
                                </span>
                              </td>

                              <td className="px-4 py-3 text-right">
                                {isAlreadyStaged ? (
                                  <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
                                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                                    STAGED IN WALLET
                                  </span>
                                ) : (
                                  <button
                                    onClick={() => handlePromoteToEvidenceWallet(f)}
                                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer shadow-2xs"
                                  >
                                    Accept & Stage
                                  </button>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs text-slate-500">
                      Extracted {extractedData.fields.length} canonical attributes from {selectedDoc.name}
                    </span>
                    <button
                      onClick={() => setActiveTab('evidence-wallet')}
                      className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold flex items-center gap-2 cursor-pointer transition-colors"
                    >
                      <span>Proceed to Evidence Wallet</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                    <span>Strict JSON OCR Payload Structure</span>
                    <span className="font-mono">application/json</span>
                  </div>
                  <pre className="p-4 bg-slate-900 text-emerald-400 font-mono text-xs rounded-xl overflow-x-auto max-h-[460px]">
                    {JSON.stringify(extractedData, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Upload Prototype Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-in fade-in zoom-in-95 duration-150 flex flex-col gap-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <UploadCloud className="w-5 h-5 text-blue-600" />
                <h3 className="text-base font-bold text-slate-900">Upload Project Instrument</h3>
              </div>
              <button
                onClick={() => setIsUploadModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-semibold"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Accepts PDF, DWG, or scanned TIFF image metadata. The document intelligence pipeline
              calculates SHA-256 integrity checksums and runs spatial entity extraction.
            </p>

            <form onSubmit={handleCustomUploadSubmit} className="flex flex-col gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Document File Name
                </label>
                <input
                  type="text"
                  required
                  value={customDocName}
                  onChange={(e) => setCustomDocName(e.target.value)}
                  placeholder="e.g. Factory_Land_Demarcation_NOC_2026.pdf"
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Statutory Document Classification
                </label>
                <select
                  value={customDocType}
                  onChange={(e) => setCustomDocType(e.target.value as any)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option value="LAND_NOC">Factory Land Allotment & Cadastral NOC (MIDC)</option>
                  <option value="MCA_INCORPORATION">Company Incorporation Certificate (MCA CIN)</option>
                  <option value="CA_CERTIFICATE">Chartered Accountant Capex / Net Worth Certificate</option>
                  <option value="CAD_DRAWING">Architect Master Layout / Fire Safety Blueprint (DWG)</option>
                  <option value="FIRE_HYDRANT_CALC">CFO Fire Hydrant Calculation Sheet</option>
                  <option value="DPR">Detailed Techno-Economic Project Report (DPR)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Size (MB)</label>
                  <input
                    type="text"
                    value={customDocSize}
                    onChange={(e) => setCustomDocSize(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Pages Count</label>
                  <input
                    type="text"
                    value={customDocPages}
                    onChange={(e) => setCustomDocPages(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-2xs transition-colors cursor-pointer"
                >
                  <UploadCloud className="w-4 h-4" />
                  Ingest & Run OCR
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

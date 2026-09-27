import React, { useState, useEffect } from 'react';
import { usePravahState } from '../hooks/usePravahState';
import { Search, X, Compass, FileText, Scale, ArrowRight } from 'lucide-react';
import { REGULATORY_SOURCES } from '../data/regulatorySources';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, approvals, documents, setActiveTab } = usePravahState();
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(!isSearchOpen);
      }
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  if (!isSearchOpen) return null;

  const q = query.toLowerCase().trim();

  const matchingApprovals = approvals.filter(
    (a) =>
      a.approvalName.toLowerCase().includes(q) ||
      a.department.toLowerCase().includes(q) ||
      a.statutoryAct.toLowerCase().includes(q)
  );

  const matchingDocs = documents.filter(
    (d) =>
      d.name.toLowerCase().includes(q) ||
      d.documentType.toLowerCase().includes(q)
  );

  const matchingSources = REGULATORY_SOURCES.filter(
    (s) =>
      s.title.toLowerCase().includes(q) ||
      s.document.toLowerCase().includes(q) ||
      s.authority.toLowerCase().includes(q)
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-slate-900/40 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="bg-white max-w-2xl w-full rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        {/* Search Input Box */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-200 gap-3">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type clearance name, authority, act section, or document..."
            className="w-full text-sm text-slate-900 placeholder:text-slate-400 outline-hidden bg-transparent"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline font-mono text-[10px] text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-3 divide-y divide-slate-100">
          {/* Section 1: Approvals */}
          {matchingApprovals.length > 0 && (
            <div className="pb-3">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1 block">
                Statutory Approvals ({matchingApprovals.length})
              </span>
              {matchingApprovals.slice(0, 4).map((app) => (
                <div
                  key={app.approvalId}
                  onClick={() => {
                    setActiveTab('approval-discovery');
                    setIsSearchOpen(false);
                  }}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <Compass className="w-4 h-4 text-blue-600 shrink-0" />
                    <div>
                      <div className="text-xs font-semibold text-slate-800">
                        {app.approvalName}
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono">
                        {app.department} • {app.statutoryAct}
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                </div>
              ))}
            </div>
          )}

          {/* Section 2: Regulatory Acts */}
          {matchingSources.length > 0 && (
            <div className="py-3">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1 block">
                Gazette & Regulatory Codes ({matchingSources.length})
              </span>
              {matchingSources.slice(0, 3).map((src) => (
                <div
                  key={src.id}
                  onClick={() => {
                    setActiveTab('regulatory-impact');
                    setIsSearchOpen(false);
                  }}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <Scale className="w-4 h-4 text-emerald-600 shrink-0" />
                    <div>
                      <div className="text-xs font-semibold text-slate-800">
                        {src.title}
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono">
                        {src.authority} • {src.document}
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                </div>
              ))}
            </div>
          )}

          {/* Section 3: Documents */}
          {matchingDocs.length > 0 && (
            <div className="pt-3">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1 block">
                Evidence Documents ({matchingDocs.length})
              </span>
              {matchingDocs.slice(0, 3).map((doc) => (
                <div
                  key={doc.id}
                  onClick={() => {
                    setActiveTab('document-intelligence');
                    setIsSearchOpen(false);
                  }}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <FileText className="w-4 h-4 text-purple-600 shrink-0" />
                    <div>
                      <div className="text-xs font-semibold text-slate-800">
                        {doc.name}
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono">
                        {doc.sizeMb} MB • {doc.extractedFactsCount} facts extracted
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                </div>
              ))}
            </div>
          )}

          {matchingApprovals.length === 0 && matchingSources.length === 0 && matchingDocs.length === 0 && (
            <div className="p-8 text-center text-slate-500 text-xs">
              No matching statutory records found for "{query}". Try searching "Fire", "MPCB", "UDCPR", or "Groundwater".
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="bg-slate-50 px-4 py-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
          <span>Search across 19 statutory acts, local MIDC byelaws & evidence facts</span>
          <span className="font-mono">Press ESC to dismiss</span>
        </div>
      </div>
    </div>
  );
};

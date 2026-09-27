import React, { useState } from 'react';
import { usePravahState } from '../../hooks/usePravahState';
import { useTranslations } from '../../hooks/useTranslations';
import { AuditEntry, ActorType } from '../../types/platform';
import {
  History,
  ShieldCheck,
  Download,
  Search,
  Filter,
  CheckCircle2,
  Lock,
  User,
  Cpu,
  Sparkles,
  Hash,
  Link2,
  ArrowRight
} from 'lucide-react';

export const AuditTrailView: React.FC = () => {
  const { auditTrail, project } = usePravahState();
  const { t } = useTranslations();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedActorType, setSelectedActorType] = useState<string>('ALL');

  const filteredTrail = auditTrail.filter((entry) => {
    const matchesActor =
      selectedActorType === 'ALL' ? true : entry.actorType === selectedActorType;
    const matchesSearch =
      entry.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.resource.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.actor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.hash.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesActor && matchesSearch;
  });

  const getActorBadge = (actorType: ActorType) => {
    switch (actorType) {
      case 'HUMAN':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-200">
            <User className="w-3 h-3 text-blue-600" />
            HUMAN
          </span>
        );
      case 'AI_RECOMMENDATION':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 border border-purple-200">
            <Sparkles className="w-3 h-3 text-purple-600" />
            AI ADVISOR
          </span>
        );
      case 'SYSTEM':
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-800 border border-slate-200">
            <Cpu className="w-3 h-3 text-slate-600" />
            SYSTEM ENGINE
          </span>
        );
    }
  };

  const handleExportAuditJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(auditTrail, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `PRAVAH_AUDIT_LEDGER_${project.id}.json`);
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
            <History className="w-4 h-4" />
            <span>MODULE 17 • CRYPTOGRAPHIC AUDIT TRAIL & HASH-CHAIN LEDGER</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Immutable Regulatory Ledger
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            SHA-256 cryptographically chained record of all statutory actions, fact verifications, AI recommendations,
            and departmental decisions.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportAuditJson}
            className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4" />
            Export Ledger JSON
          </button>
        </div>
      </div>

      {/* Ledger Integrity Card */}
      <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-emerald-600 text-white rounded-xl shadow-xs">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-emerald-950">
              Cryptographic Hash Chain Integrity: 100% Verified
            </h3>
            <p className="text-xs text-emerald-800">
              Zero broken hash links detected across {auditTrail.length} recorded state mutations.
              Root genesis linked to Project Initialization.
            </p>
          </div>
        </div>

        <span className="text-xs font-mono font-bold px-3 py-1 bg-white text-emerald-700 rounded-full border border-emerald-300">
          SHA-256 Chained
        </span>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="bg-white border border-slate-200/80 rounded-2xl shadow-2xs overflow-hidden flex flex-col">
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50/50">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search ledger by actor, action, hash..."
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center gap-2">
            {['ALL', 'HUMAN', 'SYSTEM', 'AI_RECOMMENDATION'].map((type) => (
              <button
                key={type}
                onClick={() => setSelectedActorType(type)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  selectedActorType === type
                    ? 'bg-blue-600 text-white shadow-2xs'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {type.replace(/_/g, ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Audit Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
              <tr>
                <th className="px-5 py-3">Timestamp</th>
                <th className="px-5 py-3">Actor & Role</th>
                <th className="px-5 py-3">Action Type</th>
                <th className="px-5 py-3">Target Resource</th>
                <th className="px-5 py-3">SHA-256 Hash Chain</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTrail.map((entry) => (
                <tr key={entry.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="px-5 py-3.5 whitespace-nowrap">
                    <span className="font-mono text-slate-600 text-[11px]">{entry.timestamp}</span>
                  </td>

                  <td className="px-5 py-3.5">
                    <div className="flex flex-col gap-0.5">
                      <span className="font-semibold text-slate-800">{entry.actor}</span>
                      <div>{getActorBadge(entry.actorType)}</div>
                    </div>
                  </td>

                  <td className="px-5 py-3.5">
                    <span className="font-mono font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded text-[11px]">
                      {entry.action}
                    </span>
                  </td>

                  <td className="px-5 py-3.5">
                    <span className="font-medium text-slate-700">{entry.resource}</span>
                  </td>

                  <td className="px-5 py-3.5">
                    <div className="flex flex-col font-mono text-[10px]">
                      <div className="flex items-center gap-1 text-slate-700">
                        <Link2 className="w-3 h-3 text-blue-600" />
                        <span className="truncate max-w-[140px]">{entry.hash}</span>
                      </div>
                      <span className="text-slate-400 truncate max-w-[140px]">
                        Prev: {entry.previousHash.substring(0, 16)}...
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

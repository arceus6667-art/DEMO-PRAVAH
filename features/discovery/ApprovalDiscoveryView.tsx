import React, { useState } from 'react';
import { usePravahState } from '../../hooks/usePravahState';
import { RegulatoryApproval } from '../../types/approval';
import {
  Compass,
  FileDown,
  RefreshCw,
  MapPin,
  Flame,
  Zap,
  Building,
  Users,
  FlaskConical,
  Scale,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Sparkles,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Search,
  Filter,
  Check,
  Eye,
  Sliders,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';

export const ApprovalDiscoveryView: React.FC = () => {
  const { project, setProject, approvals, setApprovals, setActiveTab } = usePravahState();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStage, setSelectedStage] = useState<'all' | 'pre-const' | 'pre-op' | 'utility'>('all');
  const [selectedDept, setSelectedDept] = useState<string>('all');
  const [showExemptions, setShowExemptions] = useState(false);
  const [isRerunning, setIsRerunning] = useState(false);

  // Filter approvals based on state
  const filteredApprovals = approvals.filter((app) => {
    const q = searchQuery.toLowerCase();
    const matchQuery =
      !q ||
      app.approvalName.toLowerCase().includes(q) ||
      app.department.toLowerCase().includes(q) ||
      app.statutoryAct.toLowerCase().includes(q) ||
      app.reasons.some((r) => r.toLowerCase().includes(q));

    let matchStage = true;
    if (selectedStage === 'pre-const') matchStage = app.stage === 'PRE_CONSTRUCTION';
    else if (selectedStage === 'pre-op') matchStage = app.stage === 'PRE_OPERATION';
    else if (selectedStage === 'utility') matchStage = app.stage === 'UTILITY_GRID';

    let matchDept = true;
    if (selectedDept !== 'all') matchDept = app.department === selectedDept;

    return matchQuery && matchStage && matchDept;
  });

  const handleRerunEngine = () => {
    setIsRerunning(true);
    setTimeout(() => {
      setIsRerunning(false);
      alert('PRAVAH Discovery Engine Re-evaluated: All statutory rules synced with latest project parameters.');
    }, 1000);
  };

  const handleSimulatePesoOptimization = () => {
    // Reduce solvent inventory to 950 L (Just-in-Time delivery)
    setProject((prev) => ({
      ...prev,
      fuelAndChemicals: {
        ...prev.fuelAndChemicals,
        solventsClassBStoredLitres: 950
      }
    }));

    // Update PESO clearance to EXEMPTED
    setApprovals((prev) =>
      prev.map((a) =>
        a.approvalId === 'PESO-PETRO-CLASS-B'
          ? {
              ...a,
              applicability: 'Not Applicable',
              status: 'EXEMPTED',
              exemptionGround: 'Batch storage reduced to 950 Litres (< 1,000L threshold). Statutory PESO license exempt under Petroleum Rules 2002 Rule 116(1).'
            }
          : a
      )
    );

    alert('Scope Optimization Model Executed!\n\nSetting planned solvent batch storage to 950 Litres (< 1,000L statutory cutoff):\n\n• PESO License status: STATUTORILY EXEMPTED\n• Mandatory pre-operation clearances reduced by 1\n• Eliminates 35-day approval cycle and ₹15,000 statutory fee.');
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1600px] mx-auto pb-12">
      {/* 1. Header & Project Classification Banner */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700">{project.organisation}</span>
            <span>/</span>
            <span className="text-slate-900 font-bold">Regulatory Discovery Engine</span>
            <span>/</span>
            <span className="font-mono text-[10px] bg-slate-100 text-blue-700 px-2 py-0.5 rounded font-bold border border-slate-200">
              Rule Matrix v3.2-MH
            </span>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-slate-200 rounded-full font-mono text-[11px] text-slate-600 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
            <span>CPCB/MPCB Statutory Gazetteer Refreshed: Today 08:30 IST</span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 bg-blue-50 text-blue-800 text-[10px] font-bold uppercase tracking-wider rounded border border-blue-200">
                Engine Output • Screen 03
              </span>
              <span className="font-mono text-xs text-slate-500">CIN: {project.cin}</span>
            </div>
            <h1 className="text-2xl font-bold font-heading text-slate-900 tracking-tight">
              Applicable Regulatory Approvals Discovery
            </h1>
            <p className="text-xs text-slate-600 mt-1 max-w-3xl leading-relaxed">
              Rule-based and AI-orchestrated legal discovery based on Aarohan Precision Components project characteristics. Replaces arbitrary 60+ generic checklists with statutory certitude.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => alert('Exporting Discovery Matrix as CSV/PDF')}
              className="flex items-center gap-2 px-3.5 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-xl text-xs font-semibold shadow-2xs cursor-pointer"
            >
              <FileDown className="w-4 h-4 text-blue-600" />
              <span>Export Discovery Matrix</span>
              <span className="font-mono text-[10px] bg-slate-100 px-1 rounded">PDF</span>
            </button>
            <button
              onClick={handleRerunEngine}
              disabled={isRerunning}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs transition-all cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRerunning ? 'animate-spin' : ''}`} />
              <span>{isRerunning ? 'Evaluating Rules...' : 'Re-run Engine with Updated Scope'}</span>
            </button>
          </div>
        </div>

        {/* Evaluated Project Scope Anchor Card (Dark Navy Anchor) */}
        <div className="bg-slate-900 text-white rounded-2xl p-5 shadow-md relative overflow-hidden">
          <div className="absolute -right-8 -bottom-8 w-60 h-60 bg-blue-600/10 rounded-full blur-2xl pointer-events-none"></div>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
            <div className="flex-1 flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-300 font-bold">
                  Evaluated Project Scope Anchor
                </span>
                <span className="font-mono text-[10px] bg-slate-800 text-emerald-400 px-2 py-0.5 rounded font-semibold border border-slate-700">
                  NIC Code {project.nicCode}
                </span>
              </div>

              {/* Scope Chips */}
              <div className="flex flex-wrap gap-2 pt-1 text-xs">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700 text-slate-200">
                  <MapPin className="w-3.5 h-3.5 text-blue-400" />
                  <span className="text-slate-400">Location:</span>
                  <strong className="text-white">MIDC Chakan Phase II, Pune</strong>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700 text-slate-200">
                  <Flame className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-slate-400">Pollution Cat:</span>
                  <strong className="text-white">Orange (CPI 48.5)</strong>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700 text-slate-200">
                  <Zap className="w-3.5 h-3.5 text-yellow-300" />
                  <span className="text-slate-400">Power:</span>
                  <strong className="text-white font-mono">{project.power.connectedLoadKva} kVA (33kV HT)</strong>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700 text-slate-200">
                  <Building className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-slate-400">Built-up:</span>
                  <strong className="text-white font-mono">{project.land.builtUpAreaSqMeters} sq.m (Plot: 4,050 sqm)</strong>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700 text-slate-200">
                  <Users className="w-3.5 h-3.5 text-purple-400" />
                  <span className="text-slate-400">Staff:</span>
                  <strong className="text-white font-mono">{project.workforce.totalEmployees} Personnel (3 Shifts)</strong>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700 text-slate-200">
                  <FlaskConical className="w-3.5 h-3.5 text-rose-400" />
                  <span className="text-slate-400">Solvents:</span>
                  <strong className="text-white font-mono">{project.fuelAndChemicals.solventsClassBStoredLitres}L Storage</strong>
                </div>
              </div>
            </div>

            {/* Legal Gazette Assurance Sidebox */}
            <div className="lg:w-80 shrink-0 bg-slate-800/80 backdrop-blur-xs rounded-xl p-4 border border-slate-700 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Scale className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold text-white">Statutory Gazette Assurance</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-snug">
                Discovery logic is cross-indexed with 19 statutory acts, CPCB 2016 Indexing, and MIDC GDCR 2022. Exemption grounds carry binding statutory citation references.
              </p>
              <div className="flex items-center justify-between pt-1">
                <span className="font-mono text-[10px] text-emerald-400 font-bold">100% Traceable Citations</span>
                <button
                  onClick={() => setShowExemptions(true)}
                  className="text-[11px] text-blue-400 hover:text-white underline cursor-pointer"
                >
                  View 14 Exemptions
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Discovery Summary KPI Cards (Horizontal 5) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5">
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[10px] font-bold uppercase tracking-wider">Mandatory Stage 1</span>
            <span className="w-2.5 h-2.5 rounded-full bg-red-600"></span>
          </div>
          <div className="my-2">
            <div className="font-mono text-2xl font-bold text-slate-900">06</div>
            <div className="text-xs font-bold text-slate-800">Pre-requisite Clearances</div>
          </div>
          <span className="text-[11px] text-slate-500 flex items-center gap-1">
            Zero construction before clearance
          </span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[10px] font-bold uppercase tracking-wider">Concurrent Stage 2</span>
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
          </div>
          <div className="my-2">
            <div className="font-mono text-2xl font-bold text-slate-900">03</div>
            <div className="text-xs font-bold text-slate-800">Parallel Operational</div>
          </div>
          <span className="text-[11px] text-slate-500">Simultaneous departmental filing</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[10px] font-bold uppercase tracking-wider">Threshold Scrutiny</span>
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
          </div>
          <div className="my-2">
            <div className="font-mono text-2xl font-bold text-slate-900">02</div>
            <div className="text-xs font-bold text-slate-800">Conditional Approvals</div>
          </div>
          <span className="text-[11px] text-amber-700 font-semibold">Requires officer determination</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[10px] font-bold uppercase tracking-wider">Statutory Exemptions</span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
          </div>
          <div className="my-2">
            <div className="font-mono text-2xl font-bold text-slate-900">14</div>
            <div className="text-xs font-bold text-slate-800">Not Applicable (Exempt)</div>
          </div>
          <span className="text-[11px] text-emerald-800 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            Rationale auto-documented
          </span>
        </div>

        <div className="col-span-2 sm:col-span-1 bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200/80 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-blue-800">
            <span className="text-[10px] font-bold uppercase tracking-wider">Parallel Path SLA</span>
            <Clock className="w-4 h-4 text-blue-700" />
          </div>
          <div className="my-2">
            <div className="flex items-baseline gap-2">
              <span className="font-mono text-2xl font-bold text-blue-900">78</span>
              <span className="text-xs font-semibold text-slate-600">Working Days</span>
            </div>
            <div className="w-full bg-blue-200/70 rounded-full h-1.5 mt-1.5 overflow-hidden">
              <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: '40%' }}></div>
            </div>
          </div>
          <div className="font-mono text-[10px] flex items-center justify-between text-slate-500">
            <span className="text-emerald-700 font-bold">116 Days Saved</span>
            <span className="line-through text-slate-400">194d seq.</span>
          </div>
        </div>
      </div>

      {/* 3. Comparative Proposition Banner: "Why PRAVAH vs Portals" */}
      <div className="p-4 rounded-xl bg-slate-100/80 border border-slate-200/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center shrink-0 border border-blue-200">
            <Scale className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-900 block">
              Regulatory Intelligence Advantage (PRAVAH USP)
            </span>
            <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
              <strong className="text-slate-800">Conventional Single-Window Portals:</strong> dumps 180+ unranked statutory forms across 28 departments without contextual awareness. <strong className="text-blue-700">PRAVAH Smart Engine:</strong> distilled this project to exactly 11 valid clearances, flagged 1 actionable groundwater exemption certificate (saving 60 days), and synthesized a parallel sequencing dependency graph.
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowExemptions(!showExemptions)}
          className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-blue-700 shadow-2xs transition-colors cursor-pointer"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>{showExemptions ? 'Hide 14 Exemptions' : 'Inspect 14 Exemptions'}</span>
        </button>
      </div>

      {/* 4. Hidden/Expandable Exemption Inspector Drawer */}
      {showExemptions && (
        <div className="p-5 bg-white border border-emerald-300 rounded-2xl shadow-sm animate-in fade-in">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <h2 className="text-sm font-bold font-heading text-slate-900">
                14 Statutorily Excluded Clearances (Auto-Certified Exemption Log)
              </h2>
            </div>
            <button
              onClick={() => setShowExemptions(false)}
              className="text-xs text-slate-400 hover:text-slate-700 cursor-pointer"
            >
              Close ✕
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
              <div className="flex items-center justify-between font-bold text-slate-900 mb-1">
                <span>Forest Land Diversion (FC Act)</span>
                <span className="font-mono text-[9px] bg-slate-200 px-1 rounded">MoEFCC</span>
              </div>
              <p className="text-slate-600 text-[11px]">
                <strong>Ground:</strong> Plot lies within gazetted MIDC Chakan notified industrial park. Zero forest land proximity (&gt;8.4 km).
              </p>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
              <div className="flex items-center justify-between font-bold text-slate-900 mb-1">
                <span>Coastal Zone (CRZ Clearance)</span>
                <span className="font-mono text-[9px] bg-slate-200 px-1 rounded">MCZMA</span>
              </div>
              <p className="text-slate-600 text-[11px]">
                <strong>Ground:</strong> Pune district geographic elevation is inland plateau (&gt;560m MSL). Coastal rules non-applicable.
              </p>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
              <div className="flex items-center justify-between font-bold text-slate-900 mb-1">
                <span>EIA Environmental Clearance</span>
                <span className="font-mono text-[9px] bg-slate-200 px-1 rounded">SEIAA</span>
              </div>
              <p className="text-slate-600 text-[11px]">
                <strong>Ground:</strong> Orange category precision machining with built-up &lt;1,50,000 sqm and zero chemical smelting operations.
              </p>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
              <div className="flex items-center justify-between font-bold text-slate-900 mb-1">
                <span>Mining Lease / Quarrying NOC</span>
                <span className="font-mono text-[9px] bg-slate-200 px-1 rounded">Geology</span>
              </div>
              <p className="text-slate-600 text-[11px]">
                <strong>Ground:</strong> Secondary transmission machining. Zero commercial mineral extraction activity.
              </p>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
              <div className="flex items-center justify-between font-bold text-slate-900 mb-1">
                <span>Boiler Registration (Boilers Act)</span>
                <span className="font-mono text-[9px] bg-slate-200 px-1 rounded">Boilers Dept</span>
              </div>
              <p className="text-slate-600 text-[11px]">
                <strong>Ground:</strong> Electric thermic fluid heaters proposed. Zero steam boilers &gt;25 Litres capacity.
              </p>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
              <div className="flex items-center justify-between font-bold text-slate-900 mb-1">
                <span>Drug & Cosmetics Mfg License</span>
                <span className="font-mono text-[9px] bg-slate-200 px-1 rounded">FDA MH</span>
              </div>
              <p className="text-slate-600 text-[11px]">
                <strong>Ground:</strong> Automotive parts and transmission gear forging. Zero pharmaceutical or drug scope.
              </p>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
            <span className="font-mono text-[10px] text-slate-500">
              Cryptographic Exemption Docket ID: #EXEMPT-8F09-CHAKAN
            </span>
            <button
              onClick={() => alert('Downloading Consolidated 14 Statutory Exemption Immunity Docket (PDF)')}
              className="text-xs font-bold text-blue-700 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>Download Signed Immunity Docket (PDF)</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* 5. Filtering & Search Controls */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter clearances by name, statutory act, or officer..."
            className="w-full bg-slate-50 border border-slate-200 pl-9 pr-4 py-2 rounded-lg text-xs text-slate-900 placeholder:text-slate-400 outline-hidden"
          />
        </div>

        {/* Stage Pills */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg text-xs font-semibold text-slate-600">
          <button
            onClick={() => setSelectedStage('all')}
            className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
              selectedStage === 'all' ? 'bg-white text-blue-700 shadow-2xs' : 'hover:text-slate-900'
            }`}
          >
            All Stages ({approvals.length})
          </button>
          <button
            onClick={() => setSelectedStage('pre-const')}
            className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
              selectedStage === 'pre-const' ? 'bg-white text-blue-700 shadow-2xs' : 'hover:text-slate-900'
            }`}
          >
            Pre-Construction
          </button>
          <button
            onClick={() => setSelectedStage('pre-op')}
            className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
              selectedStage === 'pre-op' ? 'bg-white text-blue-700 shadow-2xs' : 'hover:text-slate-900'
            }`}
          >
            Pre-Operation
          </button>
          <button
            onClick={() => setSelectedStage('utility')}
            className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
              selectedStage === 'utility' ? 'bg-white text-blue-700 shadow-2xs' : 'hover:text-slate-900'
            }`}
          >
            Utilities & Grid
          </button>
        </div>
      </div>

      {/* 6. Rich Approval Catalog Cards */}
      <div className="space-y-4">
        {filteredApprovals.map((app) => {
          const isExempt = app.status === 'EXEMPTED' || app.applicability === 'Not Applicable';
          const isFire = app.approvalId === 'MIDC-FIRE-NOC-01';
          const isPeso = app.approvalId === 'PESO-PETRO-CLASS-B';

          return (
            <div
              key={app.approvalId}
              className={`bg-white rounded-2xl border p-6 shadow-2xs transition-all hover:shadow-xs ${
                app.status === 'ACTION_REQUIRED'
                  ? 'border-amber-300 ring-1 ring-amber-200'
                  : isExempt
                  ? 'border-emerald-300 bg-emerald-50/20'
                  : 'border-slate-200/80'
              }`}
            >
              {/* Card Header */}
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      isExempt
                        ? 'bg-emerald-100 text-emerald-800'
                        : isFire
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-blue-50 text-blue-700'
                    }`}
                  >
                    {isExempt ? <CheckCircle2 className="w-5 h-5" /> : isFire ? <Flame className="w-5 h-5" /> : <Compass className="w-5 h-5" />}
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider font-mono ${
                          isExempt
                            ? 'bg-emerald-100 text-emerald-800'
                            : app.status === 'ACTION_REQUIRED'
                            ? 'bg-amber-100 text-amber-900'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {isExempt ? 'Statutory Exemption Verified' : app.stage.replace('_', ' ')}
                      </span>
                      <span className="font-mono text-xs text-slate-500 font-semibold">
                        {app.approvalId}
                      </span>
                      <span className="font-mono text-xs text-slate-400">
                        {app.statutoryAct}
                      </span>
                    </div>

                    <h2 className="text-base font-bold font-heading text-slate-900">
                      {app.approvalName}
                    </h2>
                    <span className="text-xs text-slate-500">
                      Issuing Authority: {app.department} • {app.issuingOfficer} ({app.jurisdiction})
                    </span>
                  </div>
                </div>

                <div className="flex md:flex-col items-end justify-between md:justify-start gap-1">
                  <div
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                      isExempt
                        ? 'bg-emerald-100 text-emerald-800'
                        : app.status === 'ACTION_REQUIRED'
                        ? 'bg-amber-100 text-amber-900'
                        : 'bg-blue-50 text-blue-800'
                    }`}
                  >
                    <span>
                      {isExempt
                        ? '60 Days Saved'
                        : app.status === 'ACTION_REQUIRED'
                        ? 'CAD Variance Detected'
                        : `Readiness: ${app.evidenceReadinessPercentage}%`}
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-slate-500">
                    Confidence: {(app.confidence * 100).toFixed(0)}%
                  </span>
                </div>
              </div>

              {/* Rationale & Legal Source (Dual Box) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 bg-slate-50 p-4 rounded-xl mt-4 border border-slate-200/70">
                {/* Left: Why is this required / exempted */}
                <div className="lg:col-span-7 flex flex-col gap-2">
                  <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                    <span>Why is this clearance required for Aarohan? (PRAVAH Rationale)</span>
                  </span>
                  <ul className="text-xs text-slate-700 space-y-1.5">
                    {app.reasons.map((r, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Special simulation for PESO */}
                  {isPeso && app.status !== 'EXEMPTED' && (
                    <div className="mt-2 p-2.5 bg-white border border-amber-300 rounded-lg flex items-center justify-between gap-3">
                      <span className="text-[11px] text-amber-950 font-medium">
                        <strong>Scope Optimization Opportunity:</strong> Reduce parts-washing batch solvent to 950 Litres to achieve complete statutory exemption.
                      </span>
                      <button
                        onClick={handleSimulatePesoOptimization}
                        className="shrink-0 px-2.5 py-1 rounded bg-amber-800 hover:bg-amber-900 text-white font-bold text-[10px] shadow-2xs cursor-pointer"
                      >
                        Simulate 950L Scope Change
                      </button>
                    </div>
                  )}
                </div>

                {/* Right: Statutory Source */}
                <div className="lg:col-span-5 bg-white p-3.5 rounded-lg border border-slate-200 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        Statutory Authority Source
                      </span>
                      <span className="font-mono text-[10px] text-emerald-700 font-bold">Legally Binding</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-snug">
                      Cross-referenced against <strong>{app.statutoryAct}</strong> ({app.statutorySection}).
                    </p>
                  </div>
                  <div className="pt-2 flex items-center justify-between border-t border-slate-100 mt-2 text-[11px]">
                    <span className="font-mono text-slate-500">
                      SLA: {app.statutorySlaDays} Days
                    </span>
                    <span className="font-mono text-slate-700 font-bold">
                      Rule ID: {app.ruleId}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Footer */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t border-slate-100 mt-4">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span>Prerequisites:</span>
                  <strong className="text-slate-800">
                    {app.prerequisites.length > 0 ? app.prerequisites.join(', ') : 'None (Independent)'}
                  </strong>
                </div>

                <div className="flex items-center gap-2">
                  {isExempt ? (
                    <button
                      onClick={() => alert('Downloading official statutory exemption certificate.')}
                      className="px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-colors shadow-2xs cursor-pointer"
                    >
                      Download Exemption Certificate (PDF)
                    </button>
                  ) : app.status === 'ACTION_REQUIRED' ? (
                    <button
                      onClick={() => setActiveTab('evidence-wallet')}
                      className="px-3.5 py-1.5 rounded-lg bg-amber-800 hover:bg-amber-900 text-white text-xs font-bold transition-colors shadow-2xs flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Resolve in Evidence Wallet</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <button
                      onClick={() => setActiveTab('autofill-engine')}
                      className="px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors shadow-2xs flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Open Form Autofill</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 7. Statutory Sequencing Timeline */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-2xs">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-bold font-heading text-slate-900">
              Statutory Sequencing & Critical Clearance Path
            </h3>
            <p className="text-xs text-slate-500">
              Parallel approval execution pipeline synthesized by PRAVAH dependency mapping algorithms.
            </p>
          </div>
          <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
            Zero Deadlocks Detected
          </span>
        </div>

        <div className="overflow-x-auto py-2">
          <div className="min-w-[700px] flex flex-col gap-3">
            <div className="grid grid-cols-4 gap-3 text-center text-xs font-bold text-slate-600">
              <div className="p-2 bg-blue-50 text-blue-800 rounded-lg">T+0 Days • Filing Phase</div>
              <div className="p-2 bg-slate-50 rounded-lg">T+21 Days • Technical Scrutiny</div>
              <div className="p-2 bg-slate-50 rounded-lg">T+45 Days • Consents Cleared</div>
              <div className="p-2 bg-emerald-50 text-emerald-800 rounded-lg">T+78 Days • Ground Breaking Ready</div>
            </div>

            <div className="bg-slate-50 rounded-xl p-4 flex flex-col gap-3 border border-slate-200/70">
              <div className="flex items-center text-xs">
                <span className="w-28 font-mono font-bold text-slate-800">MPCB CTE</span>
                <div className="flex-1 bg-slate-200 rounded-full h-4 relative">
                  <div
                    className="bg-blue-600 h-4 rounded-full flex items-center justify-between px-2 text-[10px] text-white font-mono font-bold"
                    style={{ width: '58%' }}
                  >
                    <span>Day 0 to 45 (Parallel Active)</span>
                    <span>45d</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center text-xs">
                <span className="w-28 font-mono font-bold text-slate-800">Fire NOC</span>
                <div className="flex-1 bg-slate-200 rounded-full h-4 relative">
                  <div
                    className="bg-amber-500 h-4 rounded-full flex items-center justify-between px-2 text-[10px] text-white font-mono font-bold"
                    style={{ width: '30%' }}
                  >
                    <span>Day 0 to 21 (Parallel)</span>
                    <span>21d</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center text-xs">
                <span className="w-28 font-mono font-bold text-slate-800">DISH Plan</span>
                <div className="flex-1 bg-slate-200 rounded-full h-4 relative">
                  <div
                    className="bg-indigo-600 h-4 rounded-full flex items-center justify-between px-2 text-[10px] text-white font-mono font-bold"
                    style={{ width: '38%', marginLeft: '30%' }}
                  >
                    <span>T+21 to 51 (Dependent on Layout)</span>
                    <span>30d</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs font-mono text-slate-500">
              <span>Critical path governed by MPCB CTE (45d) + Joint Site Inspection (15d)</span>
              <span className="text-blue-700 font-bold">Total Duration: 78 Working Days</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

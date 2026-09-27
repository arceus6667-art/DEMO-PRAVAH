import React, { useState } from 'react';
import { usePravahState } from '../../hooks/usePravahState';
import { ProjectProfile } from '../../types/project';
import {
  Building2,
  MapPin,
  Coins,
  Zap,
  Users,
  Save,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Sparkles
} from 'lucide-react';

export const ProjectProfileWizard: React.FC = () => {
  const { project, setProject, setActiveTab } = usePravahState();
  const [activeStep, setActiveStep] = useState(1);
  const [formData, setFormData] = useState<ProjectProfile>(project);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const steps = [
    { num: 1, title: 'Identity & Sector', icon: <Building2 className="w-4 h-4" /> },
    { num: 2, title: 'Location & MIDC', icon: <MapPin className="w-4 h-4" /> },
    { num: 3, title: 'Capex & Civil Land', icon: <Coins className="w-4 h-4" /> },
    { num: 4, title: 'Power & Water ZLD', icon: <Zap className="w-4 h-4" /> },
    { num: 5, title: 'Workforce & Chemistry', icon: <Users className="w-4 h-4" /> }
  ];

  const handleSaveDraft = () => {
    setProject(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleSaveAndDiscover = () => {
    setProject(formData);
    setActiveTab('approval-discovery');
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1200px] mx-auto pb-12">
      {/* Top Banner */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-bold border border-blue-200">
              MODULE 01 • PROJECT WIZARD
            </span>
            <span className="text-xs text-slate-500 font-mono">
              Project ID: {formData.id}
            </span>
          </div>
          <h1 className="text-xl font-bold font-heading text-slate-900 tracking-tight mt-1">
            Industrial Project Baseline & Applicability Attributes
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure multi-dimensional technical attributes that govern deterministic regulatory clearance discovery.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleSaveDraft}
            className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200/80 text-slate-700 px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Draft</span>
          </button>
          <button
            onClick={handleSaveAndDiscover}
            className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-200" />
            <span>Run Discovery Engine →</span>
          </button>
        </div>
      </div>

      {savedSuccess && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 px-4 py-2.5 rounded-xl text-xs flex items-center justify-between animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span className="font-semibold">Project profile draft saved to local storage repository.</span>
          </div>
          <span className="font-mono text-[10px] text-emerald-700">100% Persisted</span>
        </div>
      )}

      {/* Stepper Header */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {steps.map((s) => {
          const isCurrent = activeStep === s.num;
          const isDone = activeStep > s.num;
          return (
            <button
              key={s.num}
              onClick={() => setActiveStep(s.num)}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                isCurrent
                  ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                  : isDone
                  ? 'bg-emerald-50/80 border-emerald-300 text-emerald-900'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className={`text-[10px] font-mono font-bold ${isCurrent ? 'text-blue-100' : 'text-slate-400'}`}>
                  STEP 0{s.num}
                </span>
                {isDone ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <span className={isCurrent ? 'text-white' : 'text-slate-400'}>{s.icon}</span>
                )}
              </div>
              <div className="text-xs font-bold truncate">{s.title}</div>
            </button>
          );
        })}
      </div>

      {/* Step Content Card */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-2xs">
        {activeStep === 1 && (
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
              Step 1: Organisation & Sector Classification
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Organisation / Company Name</label>
                <input
                  type="text"
                  value={formData.organisation}
                  onChange={(e) => setFormData({ ...formData, organisation: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-900 font-medium"
                />
              </div>
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Corporate Identification Number (CIN)</label>
                <input
                  type="text"
                  value={formData.cin}
                  onChange={(e) => setFormData({ ...formData, cin: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 font-mono text-slate-900 font-medium"
                />
              </div>
              <div>
                <label className="block text-slate-600 font-semibold mb-1">National Industrial Classification (NIC Code)</label>
                <input
                  type="text"
                  value={formData.nicCode}
                  onChange={(e) => setFormData({ ...formData, nicCode: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 font-mono text-slate-900 font-medium"
                />
              </div>
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Primary Industrial Activity</label>
                <input
                  type="text"
                  value={formData.industry}
                  onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-900 font-medium"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-slate-600 font-semibold mb-1">Detailed Technical Process Description</label>
                <textarea
                  rows={3}
                  value={formData.activityDescription}
                  onChange={(e) => setFormData({ ...formData, activityDescription: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-900 font-medium"
                />
              </div>
            </div>
          </div>
        )}

        {activeStep === 2 && (
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
              Step 2: Location, Jurisdiction & MIDC Demarcation
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-slate-600 font-semibold mb-1">State / Province</label>
                <input
                  type="text"
                  value={formData.state}
                  disabled
                  className="w-full bg-slate-100 border border-slate-200 rounded-lg p-2.5 text-slate-700 font-medium"
                />
              </div>
              <div>
                <label className="block text-slate-600 font-semibold mb-1">District / Revenue Circle</label>
                <input
                  type="text"
                  value={formData.district}
                  onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-900 font-medium"
                />
              </div>
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Notified Industrial Area Status</label>
                <select
                  value={formData.isMIDC ? 'MIDC' : 'NON_MIDC'}
                  onChange={(e) => setFormData({ ...formData, isMIDC: e.target.value === 'MIDC' })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-900 font-medium"
                >
                  <option value="MIDC">Notified MIDC Industrial Zone (Automatic Town Planning Exemption)</option>
                  <option value="NON_MIDC">Non-MIDC / Private Agricultural Conversion (NA Required)</option>
                </select>
              </div>
              <div>
                <label className="block text-slate-600 font-semibold mb-1">MIDC Industrial Cluster</label>
                <input
                  type="text"
                  value={formData.midcZone}
                  onChange={(e) => setFormData({ ...formData, midcZone: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-900 font-medium"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-slate-600 font-semibold mb-1">Cadastral Plot Address & GPS Coordinates</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-900 font-medium"
                />
              </div>
            </div>
          </div>
        )}

        {activeStep === 3 && (
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
              Step 3: Capital Outlay & Civil Land Dimensions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Total Capex (₹ Crore)</label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.investment.totalCapexCr}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      investment: { ...formData.investment, totalCapexCr: parseFloat(e.target.value) || 0 }
                    })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 font-mono text-slate-900 font-bold"
                />
              </div>
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Plant & Machinery (₹ Cr)</label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.investment.plantAndMachineryCr}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      investment: { ...formData.investment, plantAndMachineryCr: parseFloat(e.target.value) || 0 }
                    })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 font-mono text-slate-900"
                />
              </div>
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Civil & Building (₹ Cr)</label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.investment.civilAndBuildingCr}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      investment: { ...formData.investment, civilAndBuildingCr: parseFloat(e.target.value) || 0 }
                    })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 font-mono text-slate-900"
                />
              </div>
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Plot Area (sq. meters)</label>
                <input
                  type="number"
                  value={formData.land.plotAreaSqMeters}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      land: { ...formData.land, plotAreaSqMeters: parseInt(e.target.value) || 0 }
                    })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 font-mono text-slate-900"
                />
              </div>
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Built-Up Area (sq. meters)</label>
                <input
                  type="number"
                  value={formData.land.builtUpAreaSqMeters}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      land: { ...formData.land, builtUpAreaSqMeters: parseInt(e.target.value) || 0 }
                    })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 font-mono text-slate-900"
                />
              </div>
              <div>
                <label className="block text-slate-600 font-semibold mb-1">
                  Shed Ridge Apex Height (meters)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.land.shedRidgeHeightMeters}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      land: { ...formData.land, shedRidgeHeightMeters: parseFloat(e.target.value) || 0 }
                    })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 font-mono text-slate-900"
                />
                <span className="text-[10px] text-slate-400 mt-0.5 block">&gt; 9.0m triggers CFO Fire Review</span>
              </div>
            </div>
          </div>
        )}

        {activeStep === 4 && (
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
              Step 4: Electrical Power Grid & Water Effluent Balance
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Connected Load (kVA)</label>
                <input
                  type="number"
                  value={formData.power.connectedLoadKva}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      power: { ...formData.power, connectedLoadKva: parseInt(e.target.value) || 0 }
                    })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 font-mono text-slate-900 font-bold"
                />
                <span className="text-[10px] text-slate-400 mt-0.5 block">&gt; 100 kVA mandates 33kV Dedicated HT feeder</span>
              </div>
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Water Source Supply</label>
                <select
                  value={formData.water.source}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      water: { ...formData.water, source: e.target.value as any }
                    })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-900 font-medium"
                >
                  <option value="MIDC_PIPED_SUPPLY">MIDC Industrial Piped Bulk Supply (CGWA Exempt)</option>
                  <option value="GROUNDWATER_BOREWELL">Groundwater Borewell / Tube-well (CGWA NOC Mandatory)</option>
                </select>
              </div>
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Total Wastewater Effluent (KLD)</label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.water.totalEffluentKld}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      water: { ...formData.water, totalEffluentKld: parseFloat(e.target.value) || 0 }
                    })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 font-mono text-slate-900"
                />
                <span className="text-[10px] text-slate-400 mt-0.5 block">&gt; 5.0 KLD triggers Orange Category CTE</span>
              </div>
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Effluent Treatment Strategy</label>
                <input
                  type="text"
                  value={formData.water.treatmentType}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      water: { ...formData.water, treatmentType: e.target.value }
                    })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-900 font-medium"
                />
              </div>
            </div>
          </div>
        )}

        {activeStep === 5 && (
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
              Step 5: Workforce Distribution & Chemical Inventories
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Total Peak Workforce</label>
                <input
                  type="number"
                  value={formData.workforce.totalEmployees}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      workforce: { ...formData.workforce, totalEmployees: parseInt(e.target.value) || 0 }
                    })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 font-mono text-slate-900 font-bold"
                />
                <span className="text-[10px] text-slate-400 mt-0.5 block">&ge; 20 workers with power triggers DISH Form 1</span>
              </div>
              <div>
                <label className="block text-slate-600 font-semibold mb-1">
                  Class B Flammable Solvent Storage (Litres)
                </label>
                <input
                  type="number"
                  value={formData.fuelAndChemicals.solventsClassBStoredLitres}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      fuelAndChemicals: {
                        ...formData.fuelAndChemicals,
                        solventsClassBStoredLitres: parseInt(e.target.value) || 0
                      }
                    })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 font-mono text-slate-900"
                />
                <span className="text-[10px] text-amber-700 mt-0.5 block">&gt; 1,000L requires PESO License (Try 950L to exempt)</span>
              </div>
              <div>
                <label className="block text-slate-600 font-semibold mb-1">Environmental Category</label>
                <select
                  value={formData.environmentalCharacteristics.category}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      environmentalCharacteristics: {
                        ...formData.environmentalCharacteristics,
                        category: e.target.value as any
                      }
                    })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-900 font-bold"
                >
                  <option value="Orange">Orange Category (CPI 41 - 59)</option>
                  <option value="Red">Red Category (CPI &ge; 60)</option>
                  <option value="Green">Green Category (CPI 21 - 40)</option>
                  <option value="White">White Category (CPI &le; 20)</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Navigation buttons */}
        <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between">
          <button
            disabled={activeStep <= 1}
            onClick={() => setActiveStep(activeStep - 1)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous Step</span>
          </button>

          <div className="flex items-center gap-2">
            {activeStep < 5 ? (
              <button
                onClick={() => setActiveStep(activeStep + 1)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white shadow-xs cursor-pointer"
              >
                <span>Next Step</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSaveAndDiscover}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-xs cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-blue-200" />
                <span>Save & Execute Approval Discovery Engine →</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { usePravahState } from '../../hooks/usePravahState';
import { useTranslations } from '../../hooks/useTranslations';
import { InspectionRecord } from '../../types/platform';
import {
  CalendarCheck,
  MapPin,
  Users,
  CheckCircle2,
  Clock,
  Camera,
  FileCheck,
  ShieldCheck,
  Calendar,
  Building,
  AlertCircle,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Send
} from 'lucide-react';

export const InspectionCenterView: React.FC = () => {
  const { inspections, scheduleInspection, project, setActiveTab } = usePravahState();
  const { t } = useTranslations();

  const [activeInspection, setActiveInspection] = useState<InspectionRecord>(inspections[0]);
  const [rescheduleDate, setRescheduleDate] = useState('2026-10-04');
  const [rescheduleTime, setRescheduleTime] = useState('11:00 AM');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Local checklist toggle state
  const [checklist, setChecklist] = useState([
    {
      id: 'CHK-01',
      label: 'Plot Setbacks & Cadastral Boundaries (MIDC Zone C)',
      checked: true,
      officer: 'MIDC Field Engineer',
      geotagged: 'Lat 18.7523° N, Long 73.8189° E'
    },
    {
      id: 'CHK-02',
      label: 'Zero Liquid Discharge (ZLD) Effluent Piping & ETP Civil Base',
      checked: true,
      officer: 'MPCB SRO Pune II',
      geotagged: 'Lat 18.7525° N, Long 73.8191° E'
    },
    {
      id: 'CHK-03',
      label: 'Fire Appliance Access Turning Radius (Minimum 9.4m)',
      checked: true,
      officer: 'CFO MIDC Fire Officer',
      geotagged: 'Lat 18.7521° N, Long 73.8185° E'
    },
    {
      id: 'CHK-04',
      label: 'Worker Ventilation, Lighting & Emergency Exit Corridors',
      checked: false,
      officer: 'DISH Safety Inspector',
      geotagged: 'Pending visual verification'
    }
  ]);

  const toggleChecklistItem = (id: string) => {
    setChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  };

  const handleReschedule = () => {
    scheduleInspection(rescheduleDate, rescheduleTime);
    setToastMessage(
      `Joint Inspection synchronized for ${rescheduleDate} at ${rescheduleTime}. Multi-agency calendar invitations dispatched to MPCB, DISH, and MIDC.`
    );
  };

  const completedCount = checklist.filter((c) => c.checked).length;

  return (
    <div className="flex flex-col gap-8 w-full max-w-[1600px] mx-auto pb-16">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-2xs flex flex-col xl:flex-row xl:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 mb-1">
            <CalendarCheck className="w-4 h-4" />
            <span>MODULE 12 • JOINT INSPECTION SYNCHRONIZATION PLATFORM</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Single-Visit Multi-Departmental Inspection Center
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            Replaces repeated uncoordinated department visits with a unified joint site audit across MPCB,
            DISH, and MIDC.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('officer-center')}
            className="px-4 py-2.5 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-xl text-xs font-semibold flex items-center gap-2 border border-blue-200 transition-colors cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4" />
            Officer Sign-off Queue
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

      {/* Synchronized Slot Card */}
      <div className="bg-gradient-to-r from-slate-900 to-indigo-950 rounded-2xl p-6 text-white shadow-md flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex flex-col gap-2 max-w-2xl">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-bold text-amber-300 w-fit">
            <Calendar className="w-3.5 h-3.5" />
            <span>SYNCHRONIZED AUDIT WINDOW</span>
          </div>
          <h2 className="text-xl font-bold text-white">
            Confirmed Slot: {activeInspection.scheduledDate} ({activeInspection.scheduledTime})
          </h2>
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <MapPin className="w-4 h-4 text-red-400 shrink-0" />
            <span>Site Cadastral Point: {activeInspection.siteCadastralCoordinates} (MIDC Chakan Phase II)</span>
          </div>
          <p className="text-xs text-slate-300 mt-1 leading-relaxed">
            All three statutory officers will arrive synchronously in a single inspection vehicle,
            preventing repeated factory shutdowns.
          </p>
        </div>

        {/* Reschedule Form Box */}
        <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-xl p-4 flex flex-col gap-3 min-w-[280px]">
          <span className="text-xs font-bold text-white uppercase tracking-wider">
            Reschedule Request
          </span>
          <div className="flex flex-col gap-2">
            <input
              type="date"
              value={rescheduleDate}
              onChange={(e) => setRescheduleDate(e.target.value)}
              className="px-3 py-1.5 bg-white/20 border border-white/20 rounded-lg text-xs text-white focus:outline-none focus:ring-1 focus:ring-amber-400"
            />
            <select
              value={rescheduleTime}
              onChange={(e) => setRescheduleTime(e.target.value)}
              className="px-3 py-1.5 bg-slate-800 border border-white/20 rounded-lg text-xs text-white focus:outline-none focus:ring-1 focus:ring-amber-400"
            >
              <option value="10:00 AM">10:00 AM - 12:00 PM</option>
              <option value="11:00 AM">11:00 AM - 01:00 PM</option>
              <option value="02:30 PM">02:30 PM - 04:30 PM</option>
            </select>
          </div>
          <button
            onClick={handleReschedule}
            className="w-full py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-lg text-xs transition-colors cursor-pointer"
          >
            Confirm Synchronized Slot
          </button>
        </div>
      </div>

      {/* Participating Inspectors & Interactive Checklist Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Participating Officials */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-600" />
                Synchronized Inspection Board ({activeInspection.departments.length})
              </h3>
            </div>

            <div className="flex flex-col gap-3">
              {activeInspection.inspectingOfficers.map((insp, i) => (
                <div
                  key={i}
                  className="p-3.5 bg-slate-50 border border-slate-200/70 rounded-xl flex items-center justify-between"
                >
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-900">{insp.name}</span>
                    <span className="text-[11px] text-slate-500">{insp.designation}</span>
                    <span className="text-[10px] font-mono text-blue-700 font-semibold mt-0.5">
                      {insp.department}
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    CONFIRMED
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl flex items-start gap-3 text-xs text-blue-900">
            <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Government Notification 2026/G-88:</span>
              <p className="mt-0.5 leading-relaxed text-blue-800/90">
                Joint Site Inspection reports must be uploaded within 48 hours of site visit. Separate visits without board approval are strictly prohibited.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Joint Checklist */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="bg-white border border-slate-200/80 rounded-2xl shadow-2xs overflow-hidden flex flex-col">
            <div className="p-5 border-b border-slate-200 bg-slate-50/70 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <FileCheck className="w-4 h-4 text-blue-600" />
                  Statutory Joint Inspection Checklist
                </h3>
                <p className="text-xs text-slate-500">
                  Real-time geotagged verification items across all participating departments
                </p>
              </div>

              <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                {completedCount} / {checklist.length} Verified
              </span>
            </div>

            <div className="p-5 flex flex-col gap-3">
              {checklist.map((item) => (
                <div
                  key={item.id}
                  onClick={() => toggleChecklistItem(item.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                    item.checked
                      ? 'bg-emerald-50/40 border-emerald-200'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={item.checked}
                      onChange={() => {}}
                      className="mt-1 w-4 h-4 text-blue-600 rounded cursor-pointer"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 leading-snug">{item.label}</h4>
                      <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-500">
                        <span>Lead Auditor: <strong>{item.officer}</strong></span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-400 block mt-0.5">
                        {item.geotagged}
                      </span>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                      item.checked
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {item.checked ? 'PASSED' : 'PENDING'}
                  </span>
                </div>
              ))}
            </div>

            <div className="p-5 border-t border-slate-200 bg-slate-50/50 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                Reports electronically sealed on Maha-CAD portal.
              </span>
              <button
                onClick={() =>
                  setToastMessage('Joint Inspection Report finalized and synced with MPCB & DISH portals.')
                }
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-2xs transition-colors cursor-pointer"
              >
                Sign & Finalize Joint Audit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

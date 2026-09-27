import React from 'react';
import { usePravahState } from '../hooks/usePravahState';
import { useTranslations } from '../hooks/useTranslations';
import { ActiveTab } from '../types/auth';
import {
  LayoutDashboard,
  Building2,
  Compass,
  GitBranch,
  FileCheck2,
  WalletCards,
  FileSearch,
  Zap,
  Clock,
  CalendarCheck,
  Scale,
  MessageSquareWarning,
  ShieldCheck,
  History,
  Settings
} from 'lucide-react';

interface NavItem {
  id: ActiveTab;
  labelKey: string;
  icon: React.ReactNode;
}

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab } = usePravahState();
  const { t } = useTranslations();

  const coreNav: NavItem[] = [
    { id: 'overview', labelKey: 'navOverview', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'project-profile', labelKey: 'navProjectProfile', icon: <Building2 className="w-4 h-4" /> },
    { id: 'approval-discovery', labelKey: 'navApprovalDiscovery', icon: <Compass className="w-4 h-4" /> },
    { id: 'dependency-graph', labelKey: 'navDependencyGraph', icon: <GitBranch className="w-4 h-4" /> },
    { id: 'applications-tracker', labelKey: 'navApplicationsTracker', icon: <FileCheck2 className="w-4 h-4" /> }
  ];

  const intelligenceNav: NavItem[] = [
    { id: 'evidence-wallet', labelKey: 'navEvidenceWallet', icon: <WalletCards className="w-4 h-4" /> },
    { id: 'document-intelligence', labelKey: 'navDocumentIntelligence', icon: <FileSearch className="w-4 h-4" /> },
    { id: 'autofill-engine', labelKey: 'navAutofillEngine', icon: <Zap className="w-4 h-4" /> }
  ];

  const operationsNav: NavItem[] = [
    { id: 'sla-guardian', labelKey: 'navSlaGuardian', icon: <Clock className="w-4 h-4" /> },
    { id: 'inspection-center', labelKey: 'navInspectionCenter', icon: <CalendarCheck className="w-4 h-4" /> },
    { id: 'regulatory-impact', labelKey: 'navRegulatoryImpact', icon: <Scale className="w-4 h-4" /> },
    { id: 'queries-escalations', labelKey: 'navQueriesEscalations', icon: <MessageSquareWarning className="w-4 h-4" /> }
  ];

  const governmentNav: NavItem[] = [
    { id: 'officer-center', labelKey: 'navOfficerCenter', icon: <ShieldCheck className="w-4 h-4" /> },
    { id: 'audit-trail', labelKey: 'navAuditTrail', icon: <History className="w-4 h-4" /> },
    { id: 'admin-governance', labelKey: 'navAdminGovernance', icon: <Settings className="w-4 h-4" /> }
  ];

  const renderNavGroup = (title: string, items: NavItem[]) => (
    <div className="flex flex-col gap-0.5">
      <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
        {title}
      </span>
      <div className="flex flex-col gap-0.5">
        {items.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors text-left cursor-pointer ${
                isActive
                  ? 'bg-blue-50 text-[#1E3A8A] font-semibold border-l-3 border-[#1E3A8A]'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <span className={isActive ? 'text-[#1E3A8A]' : 'text-slate-400'}>
                {item.icon}
              </span>
              <span className="truncate">{t(item.labelKey)}</span>
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <aside className="fixed left-0 top-16 bottom-0 w-60 bg-white border-r border-slate-200/80 z-40 overflow-y-auto px-3 py-4 flex flex-col justify-between">
      <div className="flex flex-col gap-4">
        {renderNavGroup(t('groupCore', 'Core Workspace'), coreNav)}
        {renderNavGroup(t('groupIntelligence', 'Intelligence'), intelligenceNav)}
        {renderNavGroup(t('groupOperations', 'Operations'), operationsNav)}
        {renderNavGroup(t('groupGovernment', 'Governance'), governmentNav)}
      </div>
    </aside>
  );
};

import React from 'react';
import { LocalizationProvider } from '@/context/LocalizationContext';
import { PravahProvider, usePravahState } from '@/hooks/usePravahState';
import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { Footer } from '@/components/Footer';
import { SearchModal } from '@/components/SearchModal';
import { CopilotDrawer } from '@/components/CopilotDrawer';
import { DemoScenarioModal } from '@/components/DemoScenarioModal';

// Features
import { InvestorDashboard } from '@/features/dashboard/InvestorDashboard';
import { ProjectProfileWizard } from '@/features/project/ProjectProfileWizard';
import { ApprovalDiscoveryView } from '@/features/discovery/ApprovalDiscoveryView';
import { DependencyGraphView } from '@/features/graph/DependencyGraphView';
import { ApplicationsTrackerView } from '@/features/applications/ApplicationsTrackerView';
import { EvidenceWalletView } from '@/features/evidence/EvidenceWalletView';
import { DocumentIntelligenceView } from '@/features/documents/DocumentIntelligenceView';
import { AutofillEngineView } from '@/features/autofill/AutofillEngineView';
import { SLAGuardianView } from '@/features/sla/SLAGuardianView';
import { InspectionCenterView } from '@/features/inspection/InspectionCenterView';
import { RegulatoryImpactView } from '@/features/regulatory-change/RegulatoryImpactView';
import { QueriesEscalationsView } from '@/features/escalations/QueriesEscalationsView';
import { OfficerCenterView } from '@/features/officer/OfficerCenterView';
import { AuditTrailView } from '@/features/audit/AuditTrailView';
import { AdminGovernanceView } from '@/features/admin/AdminGovernanceView';

const PravahMainContent: React.FC = () => {
  const { activeTab } = usePravahState();

  const renderActiveView = () => {
    switch (activeTab) {
      case 'overview':
        return <InvestorDashboard />;
      case 'project-profile':
        return <ProjectProfileWizard />;
      case 'approval-discovery':
        return <ApprovalDiscoveryView />;
      case 'dependency-graph':
        return <DependencyGraphView />;
      case 'applications-tracker':
        return <ApplicationsTrackerView />;
      case 'evidence-wallet':
        return <EvidenceWalletView />;
      case 'document-intelligence':
        return <DocumentIntelligenceView />;
      case 'autofill-engine':
        return <AutofillEngineView />;
      case 'sla-guardian':
        return <SLAGuardianView />;
      case 'inspection-center':
        return <InspectionCenterView />;
      case 'regulatory-impact':
        return <RegulatoryImpactView />;
      case 'queries-escalations':
        return <QueriesEscalationsView />;
      case 'officer-center':
        return <OfficerCenterView />;
      case 'audit-trail':
        return <AuditTrailView />;
      case 'admin-governance':
        return <AdminGovernanceView />;
      default:
        return <InvestorDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col font-sans selection:bg-blue-500 selection:text-white">
      {/* Top Fixed Header with SIH Banner */}
      <Header />

      {/* Main Body Layout with Fixed Sidebar and Scrolling Content */}
      <div className="flex pt-16 flex-1">
        <Sidebar />

        <div className="flex-1 ml-60 flex flex-col min-h-[calc(100vh-4rem)]">
          <main className="flex-1 p-6 sm:p-8">
            {renderActiveView()}
          </main>
          <Footer />
        </div>
      </div>

      {/* Floating Drawers & Modals */}
      <SearchModal />
      <CopilotDrawer />
      <DemoScenarioModal />
    </div>
  );
};

export default function App() {
  return (
    <LocalizationProvider>
      <PravahProvider>
        <PravahMainContent />
      </PravahProvider>
    </LocalizationProvider>
  );
}

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocalization } from '../context/LocalizationContext';
import { ProjectProfile } from '../types/project';
import { RegulatoryApproval } from '../types/approval';
import { EvidenceFact, DocumentRecord, DiscrepancyRecord, ApplicationSchema } from '../types/evidence';
import { SLARecord, InspectionRecord, EscalationCase, NotificationItem, AuditEntry } from '../types/platform';
import { UserRole, Language, ActiveTab } from '../types/auth';
import {
  INITIAL_PROJECT,
  INITIAL_APPROVALS,
  INITIAL_EVIDENCE_FACTS,
  INITIAL_DOCUMENTS,
  INITIAL_DISCREPANCIES,
  INITIAL_APPLICATION_SCHEMAS,
  INITIAL_SLA_RECORDS,
  INITIAL_INSPECTIONS,
  INITIAL_ESCALATIONS,
  INITIAL_NOTIFICATIONS,
  INITIAL_AUDIT_TRAIL
} from '../data/mockData';
import { AuditService } from '../services/auditService';
import { NotificationService } from '../services/notificationService';

interface PravahContextType {
  project: ProjectProfile;
  setProject: React.Dispatch<React.SetStateAction<ProjectProfile>>;
  approvals: RegulatoryApproval[];
  setApprovals: React.Dispatch<React.SetStateAction<RegulatoryApproval[]>>;
  facts: EvidenceFact[];
  setFacts: React.Dispatch<React.SetStateAction<EvidenceFact[]>>;
  documents: DocumentRecord[];
  discrepancies: DiscrepancyRecord[];
  applicationSchemas: ApplicationSchema[];
  slaRecords: SLARecord[];
  inspections: InspectionRecord[];
  escalations: EscalationCase[];
  notifications: NotificationItem[];
  auditTrail: AuditEntry[];
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  currentLanguage: Language;
  setCurrentLanguage: (lang: Language) => void;
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  isCopilotOpen: boolean;
  setIsCopilotOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isDemoModalOpen: boolean;
  setIsDemoModalOpen: (open: boolean) => void;
  demoTourStep: number;
  setDemoTourStep: (step: number) => void;
  
  // High-level Mutators
  resolveDiscrepancy: (discrepancyId: string, optionId: string) => void;
  updateApprovalStatus: (approvalId: string, newStatus: RegulatoryApproval['status']) => void;
  uploadNewDocument: (name: string, type: DocumentRecord['documentType']) => void;
  verifyFact: (factId: string) => void;
  scheduleInspection: (date: string, time: string) => void;
  replyToEscalation: (caseId: string, content: string) => void;
  simulateRegulatoryPolicyUpdate: () => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  runDemoStep: (step: number) => void;
  resetAllDemoState: () => void;
}

const PravahContext = createContext<PravahContextType | undefined>(undefined);

export const PravahProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [project, setProject] = useState<ProjectProfile>(() => {
    const saved = localStorage.getItem('pravah_project_v1');
    return saved ? JSON.parse(saved) : INITIAL_PROJECT;
  });

  const [approvals, setApprovals] = useState<RegulatoryApproval[]>(INITIAL_APPROVALS);
  const [facts, setFacts] = useState<EvidenceFact[]>(INITIAL_EVIDENCE_FACTS);
  const [documents, setDocuments] = useState<DocumentRecord[]>(INITIAL_DOCUMENTS);
  const [discrepancies, setDiscrepancies] = useState<DiscrepancyRecord[]>(INITIAL_DISCREPANCIES);
  const [applicationSchemas, setApplicationSchemas] = useState<ApplicationSchema[]>(INITIAL_APPLICATION_SCHEMAS);
  const [slaRecords, setSlaRecords] = useState<SLARecord[]>(INITIAL_SLA_RECORDS);
  const [inspections, setInspections] = useState<InspectionRecord[]>(INITIAL_INSPECTIONS);
  const [escalations, setEscalations] = useState<EscalationCase[]>(INITIAL_ESCALATIONS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [auditTrail, setAuditTrail] = useState<AuditEntry[]>(INITIAL_AUDIT_TRAIL);

  const [currentRole, setCurrentRole] = useState<UserRole>('INVESTOR');
  const { language: currentLanguage, setLanguage: setCurrentLanguage } = useLocalization();
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');
  const [isCopilotOpen, setIsCopilotOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [demoTourStep, setDemoTourStep] = useState(1);

  // Sync project to local storage
  useEffect(() => {
    localStorage.setItem('pravah_project_v1', JSON.stringify(project));
  }, [project]);

  // Log audit helper
  const logAudit = (action: string, resource: string, metadata: Record<string, any> = {}, actorType: AuditEntry['actorType'] = 'HUMAN') => {
    setAuditTrail((prev) => {
      const actorName = currentRole === 'INVESTOR' ? 'Sunita Deshmukh' : (currentRole === 'OFFICER' ? 'K. Deshmukh (MPCB)' : 'Dr. Anand Joshi (Admin)');
      const newEntry = AuditService.createEntry(prev, actorName, actorType, action, resource, metadata);
      return [newEntry, ...prev];
    });
  };

  // Resolve discrepancy (Step 7 in demo)
  const resolveDiscrepancy = (discrepancyId: string, optionId: string) => {
    setDiscrepancies((prev) =>
      prev.map((d) => (d.id === discrepancyId ? { ...d, isResolved: true, resolvedWithOptionId: optionId } : d))
    );

    // If it's the fire CAD discrepancy:
    if (discrepancyId === 'DISC-FIRE-CAD-01') {
      // 1. Update project turning radius to 9.4m
      setProject((p) => ({
        ...p,
        land: { ...p.land, turningRadiusMeters: 9.4 }
      }));

      // 2. Update CAD fact to VERIFIED with 9.4m
      setFacts((prev) =>
        prev.map((f) =>
          f.key === 'fire_turning_radius'
            ? {
                ...f,
                value: 9.4,
                displayValue: '9.4 meters (Cadastral v3 Corridor)',
                verificationStatus: 'VERIFIED',
                verifiedBy: 'AI Auto-Alignment with MIDC GIS Pegging Survey'
              }
            : f
        )
      );

      // 3. Unblock Fire NOC status from ACTION_REQUIRED to UNDER_DESK_REVIEW / NOC_GRANTED
      setApprovals((prev) =>
        prev.map((a) => {
          if (a.approvalId === 'MIDC-FIRE-NOC-01') {
            return {
              ...a,
              status: 'UNDER_DESK_REVIEW',
              actionRequiredMessage: undefined,
              evidenceReadinessPercentage: 100,
              autofillPercentage: 96
            };
          }
          if (a.approvalId === 'DISH-MH-ACT-SEC6') {
            return {
              ...a,
              evidenceReadinessPercentage: 94
            };
          }
          return a;
        })
      );

      // 4. Dispatch notification
      setNotifications((prev) =>
        NotificationService.dispatchEvent(prev, {
          eventType: 'STATUS_CHANGED',
          title: 'Fire NOC Turning Radius Conflict Resolved',
          message: 'Cadastral v3 9.4m vehicular turning radius verified. Downstream DISH Factory Plan unblocked.',
          severity: 'SUCCESS',
          entityType: 'APPROVAL',
          entityId: 'MIDC-FIRE-NOC-01',
          actionURL: 'approval-discovery'
        })
      );

      logAudit('RESOLVE_DISCREPANCY', 'AR-DWG-002-v1 vs UDCPR §14.8', {
        resolutionOption: optionId,
        newTurningRadius: '9.4m',
        downstreamUnblocked: 'DISH-MH-ACT-SEC6'
      });
    }
  };

  const updateApprovalStatus = (approvalId: string, newStatus: RegulatoryApproval['status']) => {
    setApprovals((prev) =>
      prev.map((a) => (a.approvalId === approvalId ? { ...a, status: newStatus } : a))
    );
    logAudit('UPDATE_APPROVAL_STATUS', approvalId, { newStatus });
  };

  const uploadNewDocument = (name: string, type: DocumentRecord['documentType']) => {
    const newDoc: DocumentRecord = {
      id: `DOC-NEW-${Date.now().toString(36)}`,
      name,
      sizeMb: 5.6,
      pageCount: 16,
      uploadedAt: new Date().toISOString(),
      documentType: type,
      checksumSha256: `sha256-${Date.now().toString(16)}...`,
      extractedFactsCount: 12,
      verificationState: 'VERIFIED',
      statusDescription: 'AI OCR parsed 12 structured fields into Evidence Wallet review staging.'
    };

    setDocuments((prev) => [newDoc, ...prev]);

    setNotifications((prev) =>
      NotificationService.dispatchEvent(prev, {
        eventType: 'DOCUMENT_PROCESSED',
        title: `Document Processed: ${name}`,
        message: '12 new structured evidence fields extracted with 98% mean confidence.',
        severity: 'SUCCESS',
        entityType: 'DOCUMENT',
        entityId: newDoc.id,
        actionURL: 'evidence-wallet'
      })
    );

    logAudit('DOCUMENT_UPLOAD_AND_OCR', name, { documentType: type }, 'SYSTEM');
  };

  const verifyFact = (factId: string) => {
    setFacts((prev) =>
      prev.map((f) => (f.id === factId ? { ...f, verificationStatus: 'VERIFIED', verifiedBy: 'Officer In-Session Attestation' } : f))
    );
    logAudit('VERIFY_EVIDENCE_FACT', factId, { factId });
  };

  const scheduleInspection = (date: string, time: string) => {
    setInspections((prev) =>
      prev.map((insp) => ({
        ...insp,
        scheduledDate: date,
        scheduledTime: time,
        status: 'Scheduled'
      }))
    );

    setNotifications((prev) =>
      NotificationService.dispatchEvent(prev, {
        eventType: 'INSPECTION_SCHEDULED',
        title: `Joint Inspection Scheduled for ${date}`,
        message: `DISH, MPCB and MIDC CFO inspecting officers slot confirmed for ${time}.`,
        severity: 'INFO',
        entityType: 'INSPECTION',
        entityId: 'INSP-2026-088',
        actionURL: 'inspection-center'
      })
    );

    logAudit('SCHEDULE_JOINT_INSPECTION', 'INSP-2026-088', { date, time });
  };

  const replyToEscalation = (caseId: string, content: string) => {
    setEscalations((prev) =>
      prev.map((c) => {
        if (c.caseId === caseId) {
          return {
            ...c,
            status: 'OFFICER_REVIEW',
            history: [
              ...c.history,
              {
                id: `msg-${Date.now()}`,
                sender: currentRole === 'INVESTOR' ? 'Sunita Deshmukh' : 'K. Deshmukh',
                senderRole: currentRole === 'INVESTOR' ? 'INVESTOR' : 'OFFICER',
                timestamp: 'Just now',
                content
              }
            ]
          };
        }
        return c;
      })
    );
    logAudit('REPLY_ESCALATION_QUERY', caseId, { contentSnippet: content.slice(0, 50) });
  };

  const simulateRegulatoryPolicyUpdate = () => {
    // Gazette Watch Amendment IND-44/B
    setProject((p) => ({
      ...p,
      power: {
        ...p.power,
        solarRooftopKw: 220
      }
    }));

    setNotifications((prev) =>
      NotificationService.dispatchEvent(prev, {
        eventType: 'REGULATORY_IMPACT_FOUND',
        title: 'Gazette Watch: Captive Solar Requirement Reduced',
        message: 'Maharashtra Industrial Policy Amendment IND-44/B adjusted your solar quota from 450 kW to 220 kW.',
        severity: 'INFO',
        entityType: 'POLICY',
        entityId: 'REG-MIP-2026',
        actionURL: 'regulatory-impact'
      })
    );

    logAudit('REGULATORY_AMENDMENT_APPLIED', 'Gazette IND-44/B', {
      previousSolarKw: 450,
      newSolarKw: 220,
      estimatedSaving: '₹1.15 Cr'
    }, 'SYSTEM');
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  // 17-Step Guided Demo Runner
  const runDemoStep = (step: number) => {
    setDemoTourStep(step);
    switch (step) {
      case 1: // Create / View project
        setActiveTab('project-profile');
        break;
      case 2: // Discover approvals
        setActiveTab('approval-discovery');
        break;
      case 3: // Show dependencies (DAG)
        setActiveTab('dependency-graph');
        break;
      case 4: // Upload certificate
      case 5: // Extract investment ₹13.6 Cr
        setActiveTab('document-intelligence');
        break;
      case 6: // Detect conflict with ₹12 Cr project value / CAD radius conflict
        setActiveTab('evidence-wallet');
        break;
      case 7: // Resolve / flag conflict
        resolveDiscrepancy('DISC-FIRE-CAD-01', 'OPT-AUTO-ALIGN');
        setActiveTab('evidence-wallet');
        break;
      case 8: // Autofill application
        setActiveTab('autofill-engine');
        break;
      case 9: // Start parallel approvals
        setActiveTab('dependency-graph');
        break;
      case 10: // Trigger SLA risk
        setActiveTab('sla-guardian');
        break;
      case 11: // Show officer dashboard
        setCurrentRole('OFFICER');
        setActiveTab('officer-center');
        break;
      case 12: // Schedule inspection
        setActiveTab('inspection-center');
        scheduleInspection('2026-10-28', '11:00 AM IST');
        break;
      case 13: // Raise escalation
        setActiveTab('queries-escalations');
        break;
      case 14: // Simulate regulatory update
      case 15: // Identify affected project / application
      case 16: // Show required new action
        setActiveTab('regulatory-impact');
        simulateRegulatoryPolicyUpdate();
        break;
      case 17: // Generate notification
        setActiveTab('overview');
        break;
      default:
        setActiveTab('overview');
    }
  };

  const resetAllDemoState = () => {
    setProject(INITIAL_PROJECT);
    setApprovals(INITIAL_APPROVALS);
    setFacts(INITIAL_EVIDENCE_FACTS);
    setDocuments(INITIAL_DOCUMENTS);
    setDiscrepancies(INITIAL_DISCREPANCIES);
    setApplicationSchemas(INITIAL_APPLICATION_SCHEMAS);
    setSlaRecords(INITIAL_SLA_RECORDS);
    setInspections(INITIAL_INSPECTIONS);
    setEscalations(INITIAL_ESCALATIONS);
    setNotifications(INITIAL_NOTIFICATIONS);
    setAuditTrail(INITIAL_AUDIT_TRAIL);
    setCurrentRole('INVESTOR');
    setActiveTab('overview');
    setDemoTourStep(1);
    localStorage.removeItem('pravah_project_v1');
  };

  return (
    <PravahContext.Provider
      value={{
        project,
        setProject,
        approvals,
        setApprovals,
        facts,
        setFacts,
        documents,
        discrepancies,
        applicationSchemas,
        slaRecords,
        inspections,
        escalations,
        notifications,
        auditTrail,
        currentRole,
        setCurrentRole,
        currentLanguage,
        setCurrentLanguage,
        activeTab,
        setActiveTab,
        isCopilotOpen,
        setIsCopilotOpen,
        isSearchOpen,
        setIsSearchOpen,
        isDemoModalOpen,
        setIsDemoModalOpen,
        demoTourStep,
        setDemoTourStep,
        resolveDiscrepancy,
        updateApprovalStatus,
        uploadNewDocument,
        verifyFact,
        scheduleInspection,
        replyToEscalation,
        simulateRegulatoryPolicyUpdate,
        markNotificationRead,
        markAllNotificationsRead,
        runDemoStep,
        resetAllDemoState
      }}
    >
      {children}
    </PravahContext.Provider>
  );
};

export const usePravahState = () => {
  const context = useContext(PravahContext);
  if (!context) {
    throw new Error('usePravahState must be used within PravahProvider');
  }
  return context;
};

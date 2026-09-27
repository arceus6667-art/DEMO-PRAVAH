export type SLARiskLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'BREACHED';

export interface SLARecord {
  approvalId: string;
  approvalName: string;
  department: string;
  officerName: string;
  officerDesignation: string;
  submittedAt: string;
  officialSlaDays: number;
  elapsedDays: number;
  remainingDays: number;
  riskLevel: SLARiskLevel;
  riskFactors: string[];
  lastStatutoryNotice?: string;
  nextEscalationDate: string;
}

export type InspectionStatus =
  | 'Required'
  | 'Requested'
  | 'Scheduled'
  | 'Completed'
  | 'Report Pending';

export interface InspectionPrerequisite {
  id: string;
  label: string;
  isReady: boolean;
  docReference?: string;
}

export interface InspectionRecord {
  id: string;
  title: string;
  departments: string[];
  inspectingOfficers: {
    name: string;
    department: string;
    designation: string;
  }[];
  scheduledDate: string;
  scheduledTime: string;
  status: InspectionStatus;
  prerequisites: InspectionPrerequisite[];
  siteCadastralCoordinates: string;
  droneSurveyCompleted: boolean;
  notes: string;
  findingsSummary?: string;
}

export type CasePriority = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
export type CaseStatus = 'OPEN' | 'INVESTOR_ACTION_PENDING' | 'OFFICER_REVIEW' | 'RESOLVED' | 'ESCALATED';

export interface EscalationMessage {
  id: string;
  sender: string;
  senderRole: 'INVESTOR' | 'OFFICER' | 'SYSTEM';
  timestamp: string;
  content: string;
  attachments?: string[];
}

export interface EscalationCase {
  caseId: string;
  applicationId: string;
  applicationName: string;
  department: string;
  type: 'QUERY' | 'GRIEVANCE' | 'SLA_ESCALATION';
  subject: string;
  priority: CasePriority;
  status: CaseStatus;
  createdAt: string;
  slaDeadline: string;
  assignedOfficer: string;
  history: EscalationMessage[];
}

export type NotificationEventType =
  | 'PROJECT_CREATED'
  | 'APPROVAL_DISCOVERED'
  | 'DOCUMENT_UPLOADED'
  | 'DOCUMENT_PROCESSED'
  | 'EVIDENCE_CREATED'
  | 'EVIDENCE_CONFLICT'
  | 'APPLICATION_READY'
  | 'APPLICATION_SUBMITTED'
  | 'STATUS_CHANGED'
  | 'QUERY_RECEIVED'
  | 'SLA_RISK'
  | 'SLA_BREACH'
  | 'INSPECTION_REQUIRED'
  | 'INSPECTION_SCHEDULED'
  | 'ESCALATION_CREATED'
  | 'REGULATION_CHANGED'
  | 'REGULATORY_IMPACT_FOUND';

export interface NotificationItem {
  id: string;
  eventType: NotificationEventType;
  title: string;
  message: string;
  severity: 'INFO' | 'SUCCESS' | 'WARNING' | 'CRITICAL';
  entityType: 'APPROVAL' | 'DOCUMENT' | 'INSPECTION' | 'POLICY' | 'CASE';
  entityId: string;
  createdAt: string;
  read: boolean;
  actionURL?: string;
}

export type ActorType = 'HUMAN' | 'SYSTEM' | 'AI_RECOMMENDATION';

export interface AuditEntry {
  id: string;
  actor: string;
  actorType: ActorType;
  action: string;
  resource: string;
  timestamp: string;
  metadata: Record<string, any>;
  previousHash: string;
  hash: string;
}

export interface RegulatorySource {
  id: string;
  title: string;
  authority: string;
  document: string;
  version: string;
  effectiveFrom: string;
  effectiveTo?: string;
  sourceURL: string;
  hash: string;
  status: 'ACTIVE' | 'SUPERSEDED' | 'PROPOSED';
  description: string;
}

export interface RegulatoryChunk {
  chunkId: string;
  sourceId: string;
  section: string;
  page: number;
  version: string;
  effectiveDate: string;
  text: string;
  keywords: string[];
}

export interface RAGCitation {
  sourceId: string;
  sourceTitle: string;
  section: string;
  page: number;
  version: string;
  effectiveDate: string;
}

export interface RAGAnswer {
  answer: string;
  verified: boolean;
  citations: RAGCitation[];
  sourceVersion: string;
  effectiveDate: string;
  uncertainty: string;
}

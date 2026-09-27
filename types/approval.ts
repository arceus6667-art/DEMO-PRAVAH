export type ApprovalCategory =
  | 'Required'
  | 'Potentially Required'
  | 'Conditional'
  | 'Not Applicable';

export type ApprovalLifecycleState =
  | 'DISCOVERED'
  | 'EVIDENCE_PENDING'
  | 'AUTOFILL_READY'
  | 'SUBMITTED'
  | 'UNDER_DESK_REVIEW'
  | 'ACTION_REQUIRED'
  | 'FEASIBILITY_CLEARED'
  | 'INSPECTION_SCHEDULED'
  | 'NOC_GRANTED'
  | 'EXEMPTED'
  | 'REJECTED';

export interface RegulatoryApproval {
  demo: true;
  approvalId: string; // e.g., 'MPCB-CTE-2026-IND'
  approvalName: string; // 'Consent to Establish (CTE) — Combined Water & Air Act'
  department: 'MPCB' | 'MIDC' | 'DISH' | 'MSEDCL' | 'CGWA' | 'PESO' | 'CFO' | 'REVENUE' | 'SEIAA';
  stage: 'PRE_CONSTRUCTION' | 'PRE_OPERATION' | 'UTILITY_GRID' | 'POST_COMMISSIONING';
  applicability: ApprovalCategory;
  reasons: string[];
  ruleId: string;
  sourceId: string;
  sourceVersion: string;
  confidence: number;
  verificationRequired: boolean;
  status: ApprovalLifecycleState;
  statutoryAct: string;
  statutorySection: string;
  issuingOfficer: string;
  jurisdiction: string;
  statutorySlaDays: number;
  elapsedDays: number;
  remainingDays: number;
  prerequisites: string[]; // approvalIds
  downstreamApprovals: string[]; // approvalIds
  evidenceReadinessPercentage: number;
  autofillPercentage: number;
  actionRequiredMessage?: string;
  criticalPath: boolean;
  exemptionGround?: string;
  exemptionHash?: string;
}

export interface DAGNode {
  id: string;
  title: string;
  shortCode: string;
  department: string;
  lane: number; // 1 to 5
  laneLabel: string;
  status: ApprovalLifecycleState;
  criticalPath: boolean;
  isBottleneck: boolean;
  slaInfo: string;
  prerequisites: string[];
  downstream: string[];
  daysRequired: number;
  x?: number;
  y?: number;
}

export interface DAGEdge {
  id: string;
  from: string;
  to: string;
  type: 'PREREQUISITE' | 'PARALLEL' | 'CRITICAL' | 'BYPASSED';
  isBottleneck?: boolean;
}

export interface CriticalPathAnalysis {
  criticalPathNodes: string[];
  sequentialDays: number; // 194
  parallelWorkingDays: number; // 78
  velocityGainPercentage: number; // 59.7%
  deadlocksCount: number; // 0
  activeBottlenecks: {
    approvalId: string;
    approvalName: string;
    reason: string;
    daysDelayIfUnresolved: number;
    recommendedAction: string;
  }[];
  readyToInitiate: string[];
  blockedApprovals: string[];
  parallelApprovals: {
    stage: string;
    approvalIds: string[];
    explanation: string;
  }[];
  topologicalRulesSummary: string[];
}

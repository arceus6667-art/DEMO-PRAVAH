export type VerificationStatus =
  | 'VERIFIED'
  | 'AI_EXTRACTED'
  | 'NEEDS_REVIEW'
  | 'CONFLICT'
  | 'SUPERSEDED'
  | 'EXPIRED';

export interface EvidenceFact {
  id: string; // e.g., 'FACT_ID: LND-8821-CHK'
  key: string; // 'plot_cadastral_area'
  domain: 'LAND_CADASTRAL' | 'FINANCIAL_CAPEX' | 'POWER_UTILITIES' | 'ENVIRONMENTAL' | 'WORKFORCE' | 'LEGAL_REGISTRATION';
  label: string; // 'Plot Cadastral Area & Survey Coordinates'
  value: any; // 'Plot A-42, MIDC Chakan Phase II, 4,050.00 sq.m'
  displayValue: string;
  normalizedValue: any;
  sourceDocumentId: string;
  sourceDocumentName: string;
  sourcePage: number;
  sourceType: 'OFFICIAL_ORDER' | 'CA_CERTIFICATE' | 'DPR' | 'CAD_BLUEPRINT' | 'DISCOM_SANCTION';
  confidence: number;
  verificationStatus: VerificationStatus;
  verifiedBy: string; // e.g. 'MIDC Area Manager (Pune)', 'ICAI UDIN: 26038471BCDEF'
  version: number;
  createdAt: string;
  updatedAt: string;
  usedByApplications: string[]; // e.g. ['MPCB-CTE', 'DISH-FPA', 'MIDC-FIRE']
  provenance: {
    hash: string;
    signatureId?: string;
    extractedSnippet?: string;
  };
}

export interface DocumentRecord {
  id: string;
  name: string;
  sizeMb: number;
  pageCount: number;
  uploadedAt: string;
  documentType:
    | 'DPR'
    | 'CA_CERTIFICATE'
    | 'CAD_DRAWING'
    | 'MIDC_ALLOTMENT'
    | 'FIRE_HYDRANT_CALC'
    | 'MCA_INCORPORATION'
    | 'LAND_NOC';
  checksumSha256: string;
  extractedFactsCount: number;
  verificationState: 'VERIFIED' | 'DISCREPANCY' | 'IN_REVIEW';
  statusDescription: string;
}

export interface DiscrepancyRecord {
  id: string;
  title: string;
  severity: 'CRITICAL_BLOCKER' | 'MAJOR' | 'WARNING';
  affectedApprovalId: string;
  affectedApprovalName: string;
  fieldA: {
    label: string;
    value: string;
    source: string;
  };
  fieldB: {
    label: string;
    value: string;
    source: string;
  };
  statutoryRuleCitation: string;
  explanation: string;
  resolutionOptions: {
    id: string;
    title: string;
    description: string;
    isAiRecommended?: boolean;
    estimatedTurnaround: string;
  }[];
  isResolved: boolean;
  resolvedWithOptionId?: string;
}

export interface AutofillField {
  fieldId: string;
  fieldLabel: string;
  evidenceFactId?: string;
  populatedValue: string;
  status: 'VERIFIED_AUTOFILL' | 'SUGGESTED' | 'MANUAL_REQUIRED' | 'CONFLICT';
  sourceDoc: string;
  confidence: number;
  page?: number;
}

export interface ApplicationSchema {
  applicationId: string; // 'MPCB-CTE-FORM-1'
  title: string;
  department: string;
  totalFields: number;
  fields: AutofillField[];
}

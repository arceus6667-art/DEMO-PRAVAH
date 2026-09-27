import { ProjectProfile } from '../types/project';

export interface PolicyDiffItem {
  id: string;
  field: string;
  previousRule: string;
  updatedRule: string;
  impactType: 'RELAXATION' | 'STRINGENCY' | 'PROCEDURAL';
  impactSummary: string;
  statutorySource: string;
}

export interface RegulatoryImpactResult {
  policyTitle: string;
  versionOld: string;
  versionNew: string;
  effectiveDate: string;
  diffItems: PolicyDiffItem[];
  affectedApprovals: string[];
  affectedProjects: string[];
  evidenceAdjustment: {
    key: string;
    label: string;
    previousValue: string;
    newValue: string;
    savingEstimated: string;
  };
}

export class RegulatoryChangeService {
  public static getGazetteChangeDetails(project: ProjectProfile): RegulatoryImpactResult {
    return {
      policyTitle: 'Maharashtra Industrial Policy 2026 — Gazette Amendment No. IND-44/B',
      versionOld: 'Version 1.0 (Baseline 2026)',
      versionNew: 'Version 2.0 (Amended Aug 2026)',
      effectiveDate: '2026-08-15',
      diffItems: [
        {
          id: 'DIFF-01',
          field: 'Solar Captive Rooftop Quota',
          previousRule: 'Mandatory 100% connected load capacity (450 kW) rooftop solar installation for all new HT connections.',
          updatedRule: 'Relaxed to ~50% capacity (220 kW) for MSME precision auto-ancillaries with capex under ₹15 Crore.',
          impactType: 'RELAXATION',
          impactSummary: 'Reduces required rooftop solar capex by ₹1.15 Crore and accelerates MSEDCL grid tie-in.',
          statutorySource: 'GoM Gazette Extra-Ord. IV-B No. 104'
        },
        {
          id: 'DIFF-02',
          field: 'Discharge Effluent Compliance Audits',
          previousRule: 'Quarterly third-party laboratory grab sampling report mandatory for all Orange units.',
          updatedRule: 'Semi-annual audit allowed for Zero Liquid Discharge (ZLD) certified units with live IoT flow meters.',
          impactType: 'RELAXATION',
          impactSummary: 'Reduces recurring compliance reporting load from 4 times to 2 times annually.',
          statutorySource: 'MPCB Circular 2026/88-A'
        }
      ],
      affectedApprovals: ['MSEDCL-HT-450KVA', 'MPCB-CTE-2026-IND'],
      affectedProjects: [project.id],
      evidenceAdjustment: {
        key: 'solarRooftopKw',
        label: 'Mandatory Rooftop Solar Quota',
        previousValue: '450 kW',
        newValue: '220 kW',
        savingEstimated: '₹1.15 Cr Capital Savings'
      }
    };
  }
}

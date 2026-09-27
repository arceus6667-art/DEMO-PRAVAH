import { ProjectProfile } from '../types/project';
import { RegulatoryApproval } from '../types/approval';
import { DISCOVERY_RULES } from '../data/approvalRules';

export class RulesEngineService {
  /**
   * Deterministically evaluates a project against statutory discovery rules.
   * AI does not invent approvals; this rule engine decides prototype applicability.
   */
  public static discoverApprovals(project: ProjectProfile): RegulatoryApproval[] {
    const results: RegulatoryApproval[] = [];

    // Land tenure base approval
    results.push({
      demo: true,
      approvalId: 'MIDC-LAND-ALLOTMENT',
      approvalName: 'MIDC Plot Possession & Final Lease Allotment',
      department: 'MIDC',
      stage: 'PRE_CONSTRUCTION',
      applicability: 'Required',
      reasons: ['Prerequisite cadastral tenure order in notified MIDC Chakan Phase II industrial area.'],
      ruleId: 'RULE-MIDC-LAND-00',
      sourceId: 'REG-UDCPR-2020',
      sourceVersion: 'v2.1',
      confidence: 1.0,
      verificationRequired: false,
      status: 'NOC_GRANTED',
      statutoryAct: 'MIDC Act 1961 § 32',
      statutorySection: 'Lease Rule 8',
      issuingOfficer: 'Area Manager, MIDC Pune Division',
      jurisdiction: 'Chakan Industrial Circle',
      statutorySlaDays: 30,
      elapsedDays: 14,
      remainingDays: 0,
      prerequisites: [],
      downstreamApprovals: ['MPCB-CTE-2026-IND', 'MIDC-FIRE-NOC-01', 'MSEDCL-HT-450KVA'],
      evidenceReadinessPercentage: 100,
      autofillPercentage: 100,
      criticalPath: true
    });

    for (const rule of DISCOVERY_RULES) {
      const evaluation = rule.evaluate(project);

      results.push({
        demo: true,
        approvalId: rule.approvalId,
        approvalName: rule.approvalName,
        department: rule.department,
        stage: rule.stage,
        applicability: evaluation.category,
        reasons: evaluation.reasons || [],
        ruleId: rule.ruleId,
        sourceId: rule.sourceId,
        sourceVersion: rule.sourceVersion,
        confidence: evaluation.confidence,
        verificationRequired: evaluation.applicable && evaluation.category !== 'Not Applicable',
        status: evaluation.category === 'Not Applicable' ? 'EXEMPTED' : (rule.approvalId === 'MIDC-FIRE-NOC-01' ? 'ACTION_REQUIRED' : 'UNDER_DESK_REVIEW'),
        statutoryAct: rule.statutoryAct,
        statutorySection: rule.statutorySection,
        issuingOfficer: rule.issuingOfficer,
        jurisdiction: rule.jurisdiction,
        statutorySlaDays: rule.statutorySlaDays,
        elapsedDays: rule.approvalId === 'MIDC-FIRE-NOC-01' ? 24 : 15,
        remainingDays: rule.approvalId === 'MIDC-FIRE-NOC-01' ? 6 : Math.max(0, rule.statutorySlaDays - 15),
        prerequisites: rule.prerequisites,
        downstreamApprovals: ['JOINT-SITE-INSPECTION-GATE'],
        evidenceReadinessPercentage: rule.approvalId === 'MIDC-FIRE-NOC-01' ? 78 : 92,
        autofillPercentage: 88,
        criticalPath: rule.approvalId === 'MIDC-FIRE-NOC-01' || rule.approvalId === 'MPCB-CTE-2026-IND',
        exemptionGround: evaluation.exemptionGround
      });
    }

    // Joint Site Inspection Gate
    results.push({
      demo: true,
      approvalId: 'JOINT-SITE-INSPECTION-GATE',
      approvalName: 'Joint Pre-Commissioning Statutory Site Inspection',
      department: 'MIDC',
      stage: 'PRE_OPERATION',
      applicability: 'Required',
      reasons: ['Mandatory joint physical verification by DISH, MPCB, and MIDC CFO before plinth sanction.'],
      ruleId: 'RULE-JOINT-INSP-07',
      sourceId: 'REG-UDCPR-2020',
      sourceVersion: 'v2.1',
      confidence: 1.0,
      verificationRequired: true,
      status: 'INSPECTION_SCHEDULED',
      statutoryAct: 'Maharashtra Right to Public Services Act (RTSA) 2015',
      statutorySection: 'Joint Single-Window Inspection Protocol § 9',
      issuingOfficer: 'Combined Inter-Departmental Inspection Board',
      jurisdiction: 'MIDC Chakan Phase II',
      statutorySlaDays: 15,
      elapsedDays: 3,
      remainingDays: 12,
      prerequisites: ['MPCB-CTE-2026-IND', 'MIDC-FIRE-NOC-01', 'DISH-MH-ACT-SEC6'],
      downstreamApprovals: ['PLINTH-COMMENCEMENT-GATE'],
      evidenceReadinessPercentage: 88,
      autofillPercentage: 90,
      criticalPath: true
    });

    // Plinth Sanction Gate
    results.push({
      demo: true,
      approvalId: 'PLINTH-COMMENCEMENT-GATE',
      approvalName: 'Plinth Completion & Ground Breaking Sanction',
      department: 'MIDC',
      stage: 'POST_COMMISSIONING',
      applicability: 'Required',
      reasons: ['Final statutory milestone allowing civil erection and machinery placement on floor.'],
      ruleId: 'RULE-PLINTH-08',
      sourceId: 'REG-UDCPR-2020',
      sourceVersion: 'v2.1',
      confidence: 1.0,
      verificationRequired: true,
      status: 'DISCOVERED',
      statutoryAct: 'MIDC GDCR 2022',
      statutorySection: 'Section 5.3 Plinth Checking',
      issuingOfficer: 'Executive Engineer, MIDC Chakan Sub-Division',
      jurisdiction: 'MIDC Pune',
      statutorySlaDays: 15,
      elapsedDays: 0,
      remainingDays: 15,
      prerequisites: ['JOINT-SITE-INSPECTION-GATE', 'MSEDCL-HT-450KVA'],
      downstreamApprovals: [],
      evidenceReadinessPercentage: 45,
      autofillPercentage: 50,
      criticalPath: true
    });

    return results;
  }
}

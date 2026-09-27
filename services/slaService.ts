import { SLARecord, SLARiskLevel } from '../types/platform';
import { RegulatoryApproval } from '../types/approval';

export class SLAService {
  /**
   * Deterministically evaluates SLA risk with explicit statutory reasons.
   */
  public static evaluateRisk(
    elapsedDays: number,
    totalSlaDays: number,
    hasBlocker: boolean,
    isInspectionPending: boolean
  ): { riskLevel: SLARiskLevel; factors: string[] } {
    const percentage = (elapsedDays / totalSlaDays) * 100;
    const factors: string[] = [];

    if (elapsedDays >= totalSlaDays) {
      factors.push(`SLA timeframe breached (${elapsedDays}/${totalSlaDays} days exceeded).`);
      if (hasBlocker) factors.push('Unresolved applicant discrepancy delayed nodal officer review.');
      return { riskLevel: 'BREACHED', factors };
    }

    if (percentage >= 75 || hasBlocker) {
      factors.push(`${Math.round(percentage)}% of statutory RTSA review window consumed.`);
      if (hasBlocker) factors.push('Critical blocking factor (Fire NOC CAD turning radius) is pending applicant resolution.');
      if (isInspectionPending) factors.push('Mandatory multi-departmental field inspection has not been cleared.');
      return { riskLevel: 'HIGH', factors };
    }

    if (percentage >= 50) {
      factors.push(`${Math.round(percentage)}% of statutory window elapsed; normal technical scrutiny in progress.`);
      return { riskLevel: 'MEDIUM', factors };
    }

    factors.push(`Within nominal processing window (${elapsedDays}/${totalSlaDays} days elapsed).`);
    return { riskLevel: 'LOW', factors };
  }

  public static syncWithApprovals(approvals: RegulatoryApproval[]): SLARecord[] {
    return approvals
      .filter((a) => a.applicability === 'Required' && a.statutorySlaDays > 0)
      .map((app) => {
        const hasBlocker = app.status === 'ACTION_REQUIRED';
        const isInspection = app.approvalId.includes('INSPECTION');
        const evalRisk = this.evaluateRisk(
          app.elapsedDays,
          app.statutorySlaDays,
          hasBlocker,
          isInspection
        );

        return {
          approvalId: app.approvalId,
          approvalName: app.approvalName,
          department: app.department,
          officerName: app.issuingOfficer,
          officerDesignation: `${app.department} Desk Review Officer`,
          submittedAt: '2026-09-01T10:00:00Z',
          officialSlaDays: app.statutorySlaDays,
          elapsedDays: app.elapsedDays,
          remainingDays: app.remainingDays,
          riskLevel: evalRisk.riskLevel,
          riskFactors: evalRisk.factors,
          lastStatutoryNotice: hasBlocker ? 'RTSA reminder notice active on dashboard' : undefined,
          nextEscalationDate: '2026-10-05'
        };
      });
  }
}

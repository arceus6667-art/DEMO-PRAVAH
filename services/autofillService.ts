import { ApplicationSchema, AutofillField, EvidenceFact } from '../types/evidence';

export interface AutofillSummary {
  applicationId: string;
  totalFields: number;
  autofilledCount: number;
  percentage: number;
  fields: AutofillField[];
}

export class AutofillService {
  /**
   * Generates deterministic autofill mappings from verified and extracted facts in the evidence wallet.
   * Only VERIFIED evidence may autofill automatically.
   */
  public static generateAutofill(
    schema: ApplicationSchema,
    walletFacts: EvidenceFact[]
  ): AutofillSummary {
    const factsMap = new Map<string, EvidenceFact>();
    walletFacts.forEach((f) => factsMap.set(f.key, f));

    const populatedFields: AutofillField[] = schema.fields.map((field) => {
      // Find matching fact by label or key heuristics
      let matchingFact: EvidenceFact | undefined;

      if (field.fieldLabel.toLowerCase().includes('enterprise') || field.fieldLabel.toLowerCase().includes('factory name')) {
        matchingFact = walletFacts.find((f) => f.key === 'plot_cadastral_area');
      } else if (field.fieldLabel.toLowerCase().includes('cin')) {
        matchingFact = walletFacts.find((f) => f.key === 'cin');
      } else if (field.fieldLabel.toLowerCase().includes('plot') || field.fieldLabel.toLowerCase().includes('location')) {
        matchingFact = walletFacts.find((f) => f.key === 'plot_cadastral_area');
      } else if (field.fieldLabel.toLowerCase().includes('capex') || field.fieldLabel.toLowerCase().includes('investment')) {
        matchingFact = walletFacts.find((f) => f.key === 'project_capital_expenditure');
      } else if (field.fieldLabel.toLowerCase().includes('category')) {
        matchingFact = walletFacts.find((f) => f.key === 'effluent_discharge_rate');
      } else if (field.fieldLabel.toLowerCase().includes('power') || field.fieldLabel.toLowerCase().includes('load')) {
        matchingFact = walletFacts.find((f) => f.key === 'power_contract_demand');
      } else if (field.fieldLabel.toLowerCase().includes('person') || field.fieldLabel.toLowerCase().includes('workforce') || field.fieldLabel.toLowerCase().includes('headcount')) {
        matchingFact = walletFacts.find((f) => f.key === 'workforce_headcount');
      }

      if (matchingFact) {
        if (matchingFact.verificationStatus === 'CONFLICT') {
          return {
            ...field,
            evidenceFactId: matchingFact.id,
            status: 'CONFLICT',
            sourceDoc: matchingFact.sourceDocumentName,
            confidence: matchingFact.confidence
          };
        }

        if (matchingFact.verificationStatus === 'VERIFIED') {
          return {
            ...field,
            evidenceFactId: matchingFact.id,
            status: 'VERIFIED_AUTOFILL',
            sourceDoc: matchingFact.sourceDocumentName,
            confidence: matchingFact.confidence,
            page: matchingFact.sourcePage
          };
        }

        return {
          ...field,
          evidenceFactId: matchingFact.id,
          status: 'SUGGESTED',
          sourceDoc: matchingFact.sourceDocumentName,
          confidence: matchingFact.confidence
        };
      }

      return field;
    });

    const filledCount = populatedFields.filter(
      (f) => f.status === 'VERIFIED_AUTOFILL' || f.status === 'SUGGESTED'
    ).length;

    const percentage = Math.round((filledCount / schema.totalFields) * 100);

    return {
      applicationId: schema.applicationId,
      totalFields: schema.totalFields,
      autofilledCount: filledCount,
      percentage,
      fields: populatedFields
    };
  }
}

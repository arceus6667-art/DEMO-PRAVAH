import { EvidenceFact, DiscrepancyRecord, DocumentRecord } from '../types/evidence';
import { ProjectProfile } from '../types/project';

export interface ExtractedFieldItem {
  name: string;
  key: string;
  value: any;
  displayValue: string;
  confidence: number;
  page: number;
  domain: EvidenceFact['domain'];
  boundingBox?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

export interface DocumentExtractionResult {
  documentType: string;
  documentTitle: string;
  checksumSha256: string;
  extractedAt: string;
  fields: ExtractedFieldItem[];
}

export class EvidenceService {
  /**
   * Deterministically parses and extracts simulated or AI OCR fields from an uploaded document.
   * Produces strict JSON output.
   */
  public static simulateDocumentExtraction(fileName: string): DocumentExtractionResult {
    const fn = fileName.toLowerCase();

    // 1. Factory Land Allotment Deed & Cadastral NOC
    if (fn.includes('land') || fn.includes('allotment') || fn.includes('midc_plot') || fn.includes('cadastral')) {
      return {
        documentType: 'MIDC_ALLOTMENT',
        documentTitle: 'MIDC Industrial Land Allotment Deed & Cadastral Demarcation NOC',
        checksumSha256: 'sha256-4c91a0f8b1e423d6a718b456cd3288f12a890e0c1928374650192837465',
        extractedAt: new Date().toISOString(),
        fields: [
          {
            name: 'Plot Cadastral Area & Survey Number',
            key: 'plot_cadastral_area',
            value: 'Plot A-42, MIDC Chakan Phase II, 4,050.00 sq.m',
            displayValue: 'Plot A-42, MIDC Chakan Phase II, 4,050.00 sq.m',
            confidence: 0.992,
            page: 1,
            domain: 'LAND_CADASTRAL',
            boundingBox: { x: 75, y: 120, width: 480, height: 35 }
          },
          {
            name: 'Plot Allotment Order Number',
            key: 'allotment_order_no',
            value: 'MIDC/RO(P)/CHAKAN-II/AL-9921/2023',
            displayValue: 'Order #AL-9921/2023',
            confidence: 0.995,
            page: 1,
            domain: 'LAND_CADASTRAL',
            boundingBox: { x: 75, y: 170, width: 350, height: 30 }
          },
          {
            name: 'Lease Tenure & Permitted Industrial Use',
            key: 'land_permitted_use',
            value: '95 Years Lease • Precision Engineering & Auto-ancillary Manufacturing',
            displayValue: '95 Yrs Lease • Precision Engineering',
            confidence: 0.985,
            page: 2,
            domain: 'LAND_CADASTRAL'
          },
          {
            name: 'MIDC Water Connection Quota',
            key: 'allotted_piped_water_kld',
            value: 15.0,
            displayValue: '15.0 KLD Piped Water Allocation',
            confidence: 0.978,
            page: 3,
            domain: 'ENVIRONMENTAL'
          }
        ]
      };
    }

    // 2. Company Incorporation Certificate / MCA CIN
    if (fn.includes('incorporation') || fn.includes('mca') || fn.includes('cin') || fn.includes('roc')) {
      return {
        documentType: 'MCA_INCORPORATION',
        documentTitle: 'Ministry of Corporate Affairs (MCA) Certificate of Incorporation',
        checksumSha256: 'sha256-b99824c0fa1e8812cde441098a1278e90145bc09192837465192837465',
        extractedAt: new Date().toISOString(),
        fields: [
          {
            name: 'Corporate Identity Number (CIN)',
            key: 'cin',
            value: 'U29304PN2023PTC192841',
            displayValue: 'U29304PN2023PTC192841',
            confidence: 0.998,
            page: 1,
            domain: 'LEGAL_REGISTRATION',
            boundingBox: { x: 110, y: 150, width: 340, height: 35 }
          },
          {
            name: 'Company Legal Organization Name',
            key: 'organization_legal_name',
            value: 'Aarohan Precision Components Private Limited',
            displayValue: 'Aarohan Precision Components Pvt. Ltd.',
            confidence: 0.996,
            page: 1,
            domain: 'LEGAL_REGISTRATION',
            boundingBox: { x: 110, y: 200, width: 420, height: 40 }
          },
          {
            name: 'Date of Incorporation & RoC Jurisdiction',
            key: 'incorporation_date',
            value: '2023-04-18 (RoC Pune, Maharashtra)',
            displayValue: '18 Apr 2023 • RoC Pune',
            confidence: 0.989,
            page: 1,
            domain: 'LEGAL_REGISTRATION'
          },
          {
            name: 'Authorized Share Capital',
            key: 'authorized_capital_inr',
            value: 150000000,
            displayValue: '₹15.00 Crore',
            confidence: 0.975,
            page: 2,
            domain: 'FINANCIAL_CAPEX'
          }
        ]
      };
    }

    // 3. CA Capital Investment & Net Worth Certificate
    if (fn.includes('ca') || fn.includes('networth') || fn.includes('capex') || fn.includes('audit')) {
      return {
        documentType: 'CA_CERTIFICATE',
        documentTitle: 'Chartered Accountant Statutory Gross Capital Investment Certificate',
        checksumSha256: 'sha256-c33198fbb02931a789128374659182736450192837465192837465019283',
        extractedAt: new Date().toISOString(),
        fields: [
          {
            name: 'Gross Project Capital Investment (Capex)',
            key: 'project_capital_expenditure',
            value: 120000000,
            displayValue: '₹12.00 Crore',
            confidence: 0.994,
            page: 1,
            domain: 'FINANCIAL_CAPEX',
            boundingBox: { x: 120, y: 140, width: 380, height: 35 }
          },
          {
            name: 'Plant & Machinery Capital Investment',
            key: 'plant_machinery_capex',
            value: 84000000,
            displayValue: '₹8.40 Crore',
            confidence: 0.988,
            page: 1,
            domain: 'FINANCIAL_CAPEX',
            boundingBox: { x: 120, y: 185, width: 360, height: 30 }
          },
          {
            name: 'Factory Civil Building Works Capex',
            key: 'civil_works_capex',
            value: 36000000,
            displayValue: '₹3.60 Crore',
            confidence: 0.981,
            page: 1,
            domain: 'FINANCIAL_CAPEX'
          },
          {
            name: 'ICAI Certified UDIN Identifier',
            key: 'ca_udin_reference',
            value: '26038471BCDEF9921',
            displayValue: 'UDIN: 26038471BCDEF9921',
            confidence: 1.0,
            page: 1,
            domain: 'FINANCIAL_CAPEX'
          }
        ]
      };
    }

    // 4. Architect Master Layout & Fire Safety CAD Blueprint
    if (fn.includes('dwg') || fn.includes('cad') || fn.includes('blueprint') || fn.includes('layout')) {
      return {
        documentType: 'CAD_DRAWING',
        documentTitle: 'Architect Master Layout & Fire Tender Turning Radius Schematic',
        checksumSha256: 'sha256-f44211bc901172a11b6540cde1928374650192837465192837465019283',
        extractedAt: new Date().toISOString(),
        fields: [
          {
            name: 'Internal Vehicular Turning Radius',
            key: 'fire_turning_radius',
            value: 9.4,
            displayValue: '9.4 meters (Complies with UDCPR)',
            confidence: 0.982,
            page: 1,
            domain: 'LAND_CADASTRAL',
            boundingBox: { x: 340, y: 180, width: 220, height: 40 }
          },
          {
            name: 'Industrial Shed Apex Ridge Height',
            key: 'shed_ridge_height',
            value: 9.8,
            displayValue: '9.8 meters',
            confidence: 0.979,
            page: 1,
            domain: 'LAND_CADASTRAL',
            boundingBox: { x: 340, y: 230, width: 210, height: 35 }
          },
          {
            name: 'Main Emergency Gate Egress Width',
            key: 'gate_egress_width',
            value: 12.0,
            displayValue: '12.0 meters',
            confidence: 0.991,
            page: 1,
            domain: 'LAND_CADASTRAL'
          },
          {
            name: 'Total Factory Covered Built-up Footprint',
            key: 'built_up_footprint_sqm',
            value: 3900,
            displayValue: '3,900 sq.m',
            confidence: 0.984,
            page: 1,
            domain: 'LAND_CADASTRAL'
          }
        ]
      };
    }

    // Default Detailed Project Report (DPR)
    return {
      documentType: 'DPR',
      documentTitle: 'Comprehensive Techno-Economic Detailed Project Report (DPR)',
      checksumSha256: 'sha256-e8b9410ac349f788102b4a569cde7810432192837465019283746519283',
      extractedAt: new Date().toISOString(),
      fields: [
        {
          name: 'Gross Project Capital Investment',
          key: 'project_capital_expenditure',
          value: 120000000,
          displayValue: '₹12.00 Crore',
          confidence: 0.994,
          page: 17,
          domain: 'FINANCIAL_CAPEX',
          boundingBox: { x: 80, y: 220, width: 440, height: 45 }
        },
        {
          name: 'Sanctioned Connected Grid Power Load',
          key: 'power_contract_demand',
          value: 450,
          displayValue: '450 kVA (400 kW)',
          confidence: 0.989,
          page: 24,
          domain: 'POWER_UTILITIES',
          boundingBox: { x: 80, y: 310, width: 410, height: 40 }
        },
        {
          name: 'Pollution Categorization Rating',
          key: 'industry_categorization',
          value: 'Orange',
          displayValue: 'Orange (Machining & Assembly)',
          confidence: 0.972,
          page: 19,
          domain: 'ENVIRONMENTAL'
        },
        {
          name: 'Total Daily Effluent Generation',
          key: 'effluent_discharge_rate',
          value: 8.5,
          displayValue: '8.5 KLD Total',
          confidence: 0.968,
          page: 22,
          domain: 'ENVIRONMENTAL'
        },
        {
          name: 'Peak Workforce Headcount',
          key: 'workforce_headcount',
          value: 145,
          displayValue: '145 Personnel',
          confidence: 0.915,
          page: 28,
          domain: 'WORKFORCE'
        }
      ]
    };
  }

  /**
   * Staging Review Helper: Converts an extracted field into a staged EvidenceFact.
   * Note: Always created with status 'AI_EXTRACTED' or 'NEEDS_REVIEW' — NEVER directly 'VERIFIED'.
   */
  public static createStagedFact(
    field: ExtractedFieldItem,
    doc: DocumentRecord
  ): EvidenceFact {
    return {
      id: `FACT-${field.domain.substring(0, 3)}-${Math.floor(1000 + Math.random() * 9000)}`,
      key: field.key,
      domain: field.domain,
      label: field.name,
      value: field.value,
      displayValue: field.displayValue,
      normalizedValue: field.value,
      sourceDocumentId: doc.id,
      sourceDocumentName: doc.name,
      sourcePage: field.page,
      sourceType: doc.documentType as any,
      confidence: field.confidence,
      verificationStatus: field.confidence >= 0.98 ? 'AI_EXTRACTED' : 'NEEDS_REVIEW',
      verifiedBy: '', // Intentionally empty: Requires human-in-the-loop sign-off
      version: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      usedByApplications: ['MPCB-CTE-FORM-1', 'MIDC-PLAN-FORM-4'],
      provenance: {
        hash: doc.checksumSha256,
        signatureId: `STAGED-SIG-${Date.now().toString().slice(-6)}`,
        extractedSnippet: `Extracted from ${doc.name} (Page ${field.page}) with ${Math.round(field.confidence * 100)}% spatial OCR confidence.`
      }
    };
  }

  /**
   * Deterministic comparison logic to detect anomalies across project and documents.
   */
  public static detectAnomalies(
    project: ProjectProfile,
    facts: EvidenceFact[],
    discrepancies: DiscrepancyRecord[]
  ): DiscrepancyRecord[] {
    const list = [...discrepancies];

    // Check turning radius discrepancy
    const turningRadiusFact = facts.find((f) => f.key === 'fire_turning_radius');
    const existingFireDisc = list.find((d) => d.id === 'DISC-FIRE-CAD-01');

    if (turningRadiusFact && Number(turningRadiusFact.value) < 9.0) {
      if (!existingFireDisc) {
        list.push({
          id: 'DISC-FIRE-CAD-01',
          title: 'Critical Bottleneck: CAD Blueprint vs. Fire Safety Mandate',
          severity: 'CRITICAL_BLOCKER',
          affectedApprovalId: 'MIDC-FIRE-NOC-01',
          affectedApprovalName: 'Provisional Fire Safety Clearance',
          fieldA: {
            label: 'CAD Drawing Radius',
            value: `${turningRadiusFact.value}m`,
            source: 'AR-DWG-002-v1.dwg'
          },
          fieldB: {
            label: 'UDCPR 2020 §14.8 Statutory Mandate',
            value: '9.0m minimum',
            source: 'Maharashtra Fire Prevention & Life Safety Rules'
          },
          statutoryRuleCitation: 'UDCPR 2020 Rule 14.8',
          explanation: `Architect layout shows ${turningRadiusFact.value}m radius at Gate 2. Chakan Fire zone mandates 9.0m minimum for 32-ton fire tenders.`,
          resolutionOptions: [
            {
              id: 'OPT-AUTO-ALIGN',
              title: 'Auto-Align with Cadastral v3',
              description: 'Applies 9.4m cleared egress corridor from validated MIDC GIS map.',
              isAiRecommended: true,
              estimatedTurnaround: 'Instant (1-Click)'
            }
          ],
          isResolved: false
        });
      }
    }

    return list;
  }
}

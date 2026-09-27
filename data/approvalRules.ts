import { ProjectProfile } from '../types/project';
import { RegulatoryApproval } from '../types/approval';

export interface DiscoveryRule {
  ruleId: string;
  approvalId: string;
  approvalName: string;
  department: RegulatoryApproval['department'];
  stage: RegulatoryApproval['stage'];
  statutoryAct: string;
  statutorySection: string;
  sourceId: string;
  sourceVersion: string;
  evaluate: (project: ProjectProfile) => {
    applicable: boolean;
    category: RegulatoryApproval['applicability'];
    reasons: string[];
    confidence: number;
    exemptionGround?: string;
  };
  statutorySlaDays: number;
  issuingOfficer: string;
  jurisdiction: string;
  prerequisites: string[];
}

export const DISCOVERY_RULES: DiscoveryRule[] = [
  {
    ruleId: 'RULE-MPCB-CTE-01',
    approvalId: 'MPCB-CTE-2026-IND',
    approvalName: 'Consent to Establish (CTE) — Combined Water & Air Act',
    department: 'MPCB',
    stage: 'PRE_CONSTRUCTION',
    statutoryAct: 'Water Act 1974 § 25 / Air Act 1981 § 21',
    statutorySection: 'Section 25 / Section 21',
    sourceId: 'REG-MPCB-ENV-2024',
    sourceVersion: 'v3.2-2024',
    statutorySlaDays: 45,
    issuingOfficer: 'K. Deshmukh, SRO Pune-II',
    jurisdiction: 'Chakan Industrial Region',
    prerequisites: ['MIDC-LAND-ALLOTMENT'],
    evaluate: (p) => {
      const isManufacturing = p.industry.toLowerCase().includes('manufacturing') || p.nicCode.startsWith('29');
      const isOrangeOrRed = p.environmentalCharacteristics.category === 'Orange' || p.environmentalCharacteristics.category === 'Red';
      const hasEffluent = p.water.totalEffluentKld > 5.0;

      if (isManufacturing && (isOrangeOrRed || hasEffluent)) {
        return {
          applicable: true,
          category: 'Required',
          confidence: 0.98,
          reasons: [
            `NIC Code ${p.nicCode}: Manufacturing of precision machined transmission components involves industrial coolant wash.`,
            `CPCB ${p.environmentalCharacteristics.category} Classification: Calculated Pollution Index is ${p.environmentalCharacteristics.pollutionIndex} (within Orange 41-59 statutory band).`,
            `Effluent Threshold Exceeded: Projected trade & domestic discharge is ${p.water.totalEffluentKld} KLD (exceeds Green cutoff threshold of 5.0 KLD).`
          ]
        };
      }
      return {
        applicable: false,
        category: 'Not Applicable',
        confidence: 0.95,
        reasons: [],
        exemptionGround: 'Pollution index < 20 and domestic effluent < 5 KLD qualifies for White category exemption.'
      };
    }
  },
  {
    ruleId: 'RULE-MIDC-FIRE-02',
    approvalId: 'MIDC-FIRE-NOC-01',
    approvalName: 'Provisional Fire Safety Clearance (Building Layout NOC)',
    department: 'CFO',
    stage: 'PRE_CONSTRUCTION',
    statutoryAct: 'Maharashtra Fire Prevention & Life Safety Measures Act 2006',
    statutorySection: 'Section 3 & UDCPR 2020 § 14.3',
    sourceId: 'REG-UDCPR-2020',
    sourceVersion: 'v2.1-2022',
    statutorySlaDays: 21,
    issuingOfficer: 'Col. V. Shinde (Retd.), Divisional Fire Officer',
    jurisdiction: 'MIDC Fire Station, Chakan',
    prerequisites: ['MIDC-LAND-ALLOTMENT'],
    evaluate: (p) => {
      const heightTrigger = p.land.shedRidgeHeightMeters > 9.0;
      const plotTrigger = p.land.plotAreaSqMeters > 2500;
      const builtUpTrigger = p.land.builtUpAreaSqMeters > 1000;

      if (heightTrigger || plotTrigger || builtUpTrigger) {
        return {
          applicable: true,
          category: 'Required',
          confidence: 0.96,
          reasons: [
            `Building Height Exceeds Standard: Industrial shed apex ridge is ${p.land.shedRidgeHeightMeters}m (mandatory CFO review required for > 9.0m).`,
            `Industrial Plot Scale: Total plot area is ${p.land.plotAreaSqMeters} sq.m (exceeds statutory apron fire threshold of 2,500 sq.m).`,
            `Covered Built-up Footprint: Workshop floor is ${p.land.builtUpAreaSqMeters} sq.m (exceeds 1,000 sq.m industrial sprinkler mandate).`
          ]
        };
      }
      return {
        applicable: false,
        category: 'Not Applicable',
        confidence: 0.92,
        reasons: [],
        exemptionGround: 'Low-height single-storey shed under 9.0m ridge and plot area under 2,500 sq.m exempt from formal CFO scrutiny.'
      };
    }
  },
  {
    ruleId: 'RULE-DISH-FPA-03',
    approvalId: 'DISH-MH-ACT-SEC6',
    approvalName: 'Factory Building Plan Approval Form 1 & Registration',
    department: 'DISH',
    stage: 'PRE_CONSTRUCTION',
    statutoryAct: 'The Factories Act 1948',
    statutorySection: 'Section 6 & Rules 3 & 4 (MH Factories Rules 1963)',
    sourceId: 'REG-DISH-ACT-1948',
    sourceVersion: 'v2021-EaseOfBusiness',
    statutorySlaDays: 30,
    issuingOfficer: 'P. S. Kulkarni, Joint Director of Industrial Safety',
    jurisdiction: 'Pune Industrial Circle',
    prerequisites: ['MIDC-FIRE-NOC-01'],
    evaluate: (p) => {
      const powerTrigger = p.power.connectedLoadKva > 7.5; // > 10 HP
      const workforceTrigger = p.workforce.totalEmployees >= 20;

      if (powerTrigger && workforceTrigger) {
        return {
          applicable: true,
          category: 'Required',
          confidence: 0.99,
          reasons: [
            `Power Threshold Trigger: ${p.power.connectedLoadKva} kVA HT power exceeds 10 HP statutory threshold under Section 2(m)(i).`,
            `Headcount Mandate: ${p.workforce.totalEmployees} peak shopfloor employees exceeds Section 2(m)(i) minimum threshold of 20 workers.`,
            `Aisle & Machinery Clearance: Mandates DISH mechanical engineer scrutiny of safety egress corridors around CNC machining lines.`
          ]
        };
      }
      return {
        applicable: false,
        category: 'Not Applicable',
        confidence: 0.97,
        reasons: [],
        exemptionGround: 'Facility employs under 20 workers with power; falls under Shops & Commercial Establishments Act.'
      };
    }
  },
  {
    ruleId: 'RULE-MSEDCL-PWR-04',
    approvalId: 'MSEDCL-HT-450KVA',
    approvalName: '33kV Dedicated HT Industrial Grid Sanction & Feeder Metering',
    department: 'MSEDCL',
    stage: 'UTILITY_GRID',
    statutoryAct: 'MERC Electricity Supply Code 2021',
    statutorySection: 'Section 4 & HT Industrial Supply Schedule',
    sourceId: 'REG-UDCPR-2020',
    sourceVersion: 'v2.1-2022',
    statutorySlaDays: 30,
    issuingOfficer: 'Superintending Engineer, Chakan Industrial Circle',
    jurisdiction: 'MSEDCL Pune Rural',
    prerequisites: ['MIDC-LAND-ALLOTMENT'],
    evaluate: (p) => {
      if (p.power.connectedLoadKva > 100) {
        return {
          applicable: true,
          category: 'Required',
          confidence: 0.99,
          reasons: [
            `Connected Load Rating: Proposed demand load of ${p.power.connectedLoadKva} kVA exceeds LT (Low Tension 100 kVA) tariff threshold.`,
            `Express Feeder Mandate: Requires dedicated HT tapping from ${p.power.substation} via underground ducting.`
          ]
        };
      }
      return {
        applicable: false,
        category: 'Not Applicable',
        confidence: 0.95,
        reasons: [],
        exemptionGround: 'Connected load <= 100 kVA eligible for direct LT distribution feeder connection.'
      };
    }
  },
  {
    ruleId: 'RULE-CGWA-WATER-05',
    approvalId: 'CGWA-EXEMPT-SEC3',
    approvalName: 'Central Ground Water Authority (CGWA) Abstraction NOC',
    department: 'CGWA',
    stage: 'UTILITY_GRID',
    statutoryAct: 'CGWA Guidelines 2020',
    statutorySection: 'Section 1.0(v) Exemption Provision',
    sourceId: 'REG-CGWA-2020',
    sourceVersion: 'v2020-Gazette',
    statutorySlaDays: 0,
    issuingOfficer: 'Automated Sovereign Exemption Engine',
    jurisdiction: 'Central Ground Water Authority, Nagpur Regional Directorate',
    prerequisites: [],
    evaluate: (p) => {
      if (p.isMIDC && p.water.source === 'MIDC_PIPED_SUPPLY' && !p.water.borewellPlanned) {
        return {
          applicable: false,
          category: 'Not Applicable',
          confidence: 1.0,
          exemptionGround: 'Plot is inside MIDC Chakan notified industrial park with centralized statutory piped water supply (15 KLD allocated). Zero subsurface extraction.',
          reasons: [
            'Project is situated inside gazetted MIDC Chakan Industrial Area.',
            'Water allotment order guarantees 15 KLD piped surface supply.',
            'No groundwater borehole or deep tubewell planned on site. Exempt under CGWA 2020 § 1.0(v).'
          ]
        };
      }
      return {
        applicable: true,
        category: 'Required',
        confidence: 0.95,
        reasons: ['Subsurface tubewell abstraction planned outside notified industrial piped zone.']
      };
    }
  },
  {
    ruleId: 'RULE-PESO-SOLV-06',
    approvalId: 'PESO-PETRO-CLASS-B',
    approvalName: 'Petroleum & Solvents Storage License (Class B/C Flammable Solvents)',
    department: 'PESO',
    stage: 'PRE_OPERATION',
    statutoryAct: 'The Petroleum Rules, 2002',
    statutorySection: 'Rule 116(1) under Section 7 of Petroleum Act 1934',
    sourceId: 'REG-PESO-2002',
    sourceVersion: 'v2002-amended',
    statutorySlaDays: 35,
    issuingOfficer: 'Joint Chief Controller of Explosives, Mumbai Circle',
    jurisdiction: 'PESO West Circle',
    prerequisites: ['MIDC-FIRE-NOC-01', 'DISH-MH-ACT-SEC6'],
    evaluate: (p) => {
      const storageLitres = p.fuelAndChemicals.solventsClassBStoredLitres;
      if (storageLitres > 1000) {
        return {
          applicable: true,
          category: 'Conditional',
          confidence: 0.91,
          reasons: [
            `Current Solvent Inventory: Planned batch storage of ${storageLitres} Litres exceeds 1,000 Litres non-bulk statutory exemption threshold.`,
            'Class B hydrocarbon parts-washing solvents (flash point 23°C to 65°C) require PESO storage license unless inventory is optimized.',
            'Optimization Model: Reducing standing batch inventory to 950 Litres (Just-in-Time delivery) achieves complete statutory exemption.'
          ]
        };
      }
      return {
        applicable: false,
        category: 'Not Applicable',
        confidence: 0.98,
        reasons: [],
        exemptionGround: 'Storage under 1,000 Litres in non-bulk standard vessels complies with Petroleum Rules 2002 Rule 116(1) license exemption.'
      };
    }
  }
];

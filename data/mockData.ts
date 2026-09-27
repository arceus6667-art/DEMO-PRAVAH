import { ProjectProfile } from '../types/project';
import { RegulatoryApproval, DAGNode, DAGEdge } from '../types/approval';
import { EvidenceFact, DocumentRecord, DiscrepancyRecord, ApplicationSchema } from '../types/evidence';
import { SLARecord, InspectionRecord, EscalationCase, NotificationItem, AuditEntry } from '../types/platform';
import { DemoUser } from '../types/auth';

export const DEMO_USERS: Record<string, DemoUser> = {
  INVESTOR: {
    id: 'USR-INV-01',
    name: 'Sunita Deshmukh',
    role: 'INVESTOR',
    designation: 'Head of Regulatory & Compliance',
    organization: 'Aarohan Precision Components Pvt. Ltd.',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    jurisdiction: 'Maharashtra Industrial Cluster'
  },
  OFFICER: {
    id: 'USR-OFF-01',
    name: 'K. Deshmukh',
    role: 'OFFICER',
    designation: 'Sub-Regional Officer (SRO Pune-II / Chakan)',
    organization: 'Maharashtra Pollution Control Board (MPCB)',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    jurisdiction: 'Chakan Industrial Zone'
  },
  ADMIN: {
    id: 'USR-ADM-01',
    name: 'Dr. Anand Joshi',
    role: 'ADMIN',
    designation: 'Principal Systems Architect & Rules Governor',
    organization: 'Department of Industries, GoM / SIH GovTech',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    jurisdiction: 'Statewide Master Policy'
  }
};

export const INITIAL_PROJECT: ProjectProfile = {
  demo: true,
  id: 'PRV-MH-2026-001',
  cin: 'U29304PN2023PTC192841',
  organisation: 'Aarohan Precision Components Pvt. Ltd.',
  projectName: 'Aarohan Precision Transmission Component Unit',
  industry: 'Precision Manufacturing & Auto-Ancillary Machining',
  nicCode: '29301',
  activityDescription: 'Precision CNC machining, gear forging and heat-treatment of transmission shafts for EV and commercial powertrain systems.',
  state: 'Maharashtra',
  district: 'Pune',
  taluka: 'Khed',
  location: 'Plot A-42, MIDC Phase II, Chakan, Pune, Maharashtra',
  coordinates: {
    lat: 18.7521,
    lng: 73.8055,
    cadastralPlot: 'MIDC Chakan Phase II - Plot A-42'
  },
  isMIDC: true,
  midcZone: 'Chakan Phase II Industrial Area',
  investment: {
    totalCapexCr: 12.0,
    plantAndMachineryCr: 8.4,
    civilAndBuildingCr: 3.6,
    landLeaseYears: 95
  },
  land: {
    plotAreaSqMeters: 4050,
    plotAreaAcres: 1.0007,
    builtUpAreaSqMeters: 3900,
    shedRidgeHeightMeters: 11.2,
    turningRadiusMeters: 7.5 // CAD conflict initially! (Requires 9.0m UDCPR fire tender radius)
  },
  workforce: {
    totalEmployees: 145,
    generalShift: 75,
    shiftB: 45,
    shiftC: 25,
    femaleEmployees: 28
  },
  power: {
    connectedLoadKva: 450,
    contractDemandKw: 400,
    supplyVoltage: '33kV Dedicated HT Industrial Grid Feeder',
    substation: 'Chakan 132/33kV MSETCL Substation',
    solarRooftopKw: 450 // Before regulatory amendment IND-44/B; changes to 220 kW
  },
  water: {
    source: 'MIDC_PIPED_SUPPLY',
    dailyRequirementKld: 15.0,
    domesticEffluentKld: 6.0,
    tradeEffluentKld: 2.5,
    totalEffluentKld: 8.5,
    treatmentType: 'Zero Liquid Discharge (Integrated RO + MEE)',
    borewellPlanned: false
  },
  fuelAndChemicals: {
    hasBoiler: false,
    solventsClassBStoredLitres: 1200, // Conditional PESO trigger (>1000L)
    dgSetCapacityKva: 250
  },
  environmentalCharacteristics: {
    category: 'Orange',
    pollutionIndex: 48.5,
    hazardousWastePerAnnumMt: 0.8
  },
  status: 'ACTIVE_PHASE_1',
  completionPercentage: 92,
  lastUpdated: '2026-09-27T11:42:00 IST'
};

export const INITIAL_APPROVALS: RegulatoryApproval[] = [
  {
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
  },
  {
    demo: true,
    approvalId: 'MPCB-CTE-2026-IND',
    approvalName: 'Consent to Establish (CTE) — Combined Water & Air Act',
    department: 'MPCB',
    stage: 'PRE_CONSTRUCTION',
    applicability: 'Required',
    reasons: [
      'NIC Code 29301: Transmission manufacturing involves machining coolants and industrial degreasing.',
      'CPCB Orange Category: Calculated Pollution Index is 48.5 (falls in 41-59 statutory Orange range).',
      'Effluent Discharge Threshold: 8.5 KLD combined discharge exceeds Green category cutoff of 5.0 KLD.'
    ],
    ruleId: 'RULE-MPCB-CTE-01',
    sourceId: 'REG-MPCB-ENV-2024',
    sourceVersion: 'v3.2-2024',
    confidence: 0.98,
    verificationRequired: true,
    status: 'UNDER_DESK_REVIEW',
    statutoryAct: 'Water Act 1974 § 25 / Air Act 1981 § 21',
    statutorySection: 'Section 25 / Section 21',
    issuingOfficer: 'K. Deshmukh, SRO Pune-II',
    jurisdiction: 'Chakan Industrial Region',
    statutorySlaDays: 45,
    elapsedDays: 18,
    remainingDays: 27,
    prerequisites: ['MIDC-LAND-ALLOTMENT'],
    downstreamApprovals: ['JOINT-SITE-INSPECTION-GATE'],
    evidenceReadinessPercentage: 92,
    autofillPercentage: 94,
    criticalPath: true
  },
  {
    demo: true,
    approvalId: 'MIDC-FIRE-NOC-01',
    approvalName: 'Provisional Fire Safety Clearance (Building Layout NOC)',
    department: 'CFO',
    stage: 'PRE_CONSTRUCTION',
    applicability: 'Required',
    reasons: [
      'Building Height: Ridge apex is 11.2m (mandatory CFO review required for > 9.0m under UDCPR §14.3).',
      'Plot Scale: 4,050 sq.m exceeds statutory fire tender apron threshold of 2,500 sq.m.',
      'Covered Floor Footprint: 3,900 sq.m exceeds 1,000 sq.m industrial sprinkler system mandate.'
    ],
    ruleId: 'RULE-MIDC-FIRE-02',
    sourceId: 'REG-UDCPR-2020',
    sourceVersion: 'v2.1-2022',
    confidence: 0.96,
    verificationRequired: true,
    status: 'ACTION_REQUIRED',
    statutoryAct: 'MH Fire Prevention & Life Safety Measures Act 2006',
    statutorySection: 'Section 3 & UDCPR 2020 § 14.8',
    issuingOfficer: 'Col. V. Shinde (Retd.), Divisional Fire Officer',
    jurisdiction: 'MIDC Fire Station, Chakan',
    statutorySlaDays: 30,
    elapsedDays: 24,
    remainingDays: 6,
    prerequisites: ['MIDC-LAND-ALLOTMENT'],
    downstreamApprovals: ['DISH-MH-ACT-SEC6', 'JOINT-SITE-INSPECTION-GATE'],
    evidenceReadinessPercentage: 78,
    autofillPercentage: 85,
    actionRequiredMessage: 'Architect layout drawing AR-DWG-002-v1 shows 7.5m turning radius. Minimum 9.0m mandatory for 32-ton high-reach water bowsers.',
    criticalPath: true
  },
  {
    demo: true,
    approvalId: 'DISH-MH-ACT-SEC6',
    approvalName: 'Factory Building Plan Approval Form 1 & Registration',
    department: 'DISH',
    stage: 'PRE_CONSTRUCTION',
    applicability: 'Required',
    reasons: [
      'Power Connected: 450 kVA electrical connection satisfies manufacturing process with power (>10 HP).',
      'Workforce Mandate: 145 workers exceeds Section 2(m)(i) threshold of 20 or more persons.',
      'Heavy Machinery Egress: Mandates safety inspection of aisle clearances for CNC milling units.'
    ],
    ruleId: 'RULE-DISH-FPA-03',
    sourceId: 'REG-DISH-ACT-1948',
    sourceVersion: 'v2021',
    confidence: 0.99,
    verificationRequired: true,
    status: 'SUBMITTED',
    statutoryAct: 'The Factories Act 1948',
    statutorySection: 'Section 6 & Rules 3 & 4 (MH Factories Rules 1963)',
    issuingOfficer: 'P. S. Kulkarni, Joint Director of Industrial Safety',
    jurisdiction: 'Pune Circle',
    statutorySlaDays: 30,
    elapsedDays: 8,
    remainingDays: 22,
    prerequisites: ['MIDC-FIRE-NOC-01'],
    downstreamApprovals: ['JOINT-SITE-INSPECTION-GATE'],
    evidenceReadinessPercentage: 88,
    autofillPercentage: 88,
    criticalPath: false
  },
  {
    demo: true,
    approvalId: 'MSEDCL-HT-450KVA',
    approvalName: '33kV Dedicated HT Industrial Grid Sanction & Feeder Metering',
    department: 'MSEDCL',
    stage: 'UTILITY_GRID',
    applicability: 'Required',
    reasons: [
      'Connected Load Rating: Proposed demand load of 450 kVA exceeds LT (100 kVA) tariff threshold.',
      'Express Feeder Mandate: Requires dedicated HT underground ducting from Chakan Substation.'
    ],
    ruleId: 'RULE-MSEDCL-PWR-04',
    sourceId: 'REG-UDCPR-2020',
    sourceVersion: 'v2.1',
    confidence: 0.99,
    verificationRequired: false,
    status: 'FEASIBILITY_CLEARED',
    statutoryAct: 'MERC Electricity Supply Code 2021',
    statutorySection: 'Section 4 & HT Industrial Supply Schedule',
    issuingOfficer: 'Superintending Engineer, Chakan Industrial Circle',
    jurisdiction: 'MSEDCL Pune Rural',
    statutorySlaDays: 30,
    elapsedDays: 16,
    remainingDays: 14,
    prerequisites: ['MIDC-LAND-ALLOTMENT'],
    downstreamApprovals: ['PLINTH-COMMENCEMENT-GATE'],
    evidenceReadinessPercentage: 100,
    autofillPercentage: 100,
    criticalPath: false
  },
  {
    demo: true,
    approvalId: 'CGWA-EXEMPT-SEC3',
    approvalName: 'Ground Water Extraction NOC (CGWA)',
    department: 'CGWA',
    stage: 'UTILITY_GRID',
    applicability: 'Not Applicable',
    reasons: [
      'Project is situated inside notified MIDC Chakan Industrial Area with centralized piped water network.',
      'MIDC water allotment letter guarantees 15 KLD piped surface supply. Zero borehole extraction planned.'
    ],
    ruleId: 'RULE-CGWA-WATER-05',
    sourceId: 'REG-CGWA-2020',
    sourceVersion: 'v2020',
    confidence: 1.0,
    verificationRequired: false,
    status: 'EXEMPTED',
    statutoryAct: 'CGWA Guidelines 2020',
    statutorySection: 'Section 1.0(v) Industrial Exemption',
    issuingOfficer: 'Automated Sovereign Exemption Engine',
    jurisdiction: 'Ministry of Jal Shakti, West Central Region',
    statutorySlaDays: 0,
    elapsedDays: 0,
    remainingDays: 0,
    prerequisites: [],
    downstreamApprovals: [],
    evidenceReadinessPercentage: 100,
    autofillPercentage: 100,
    exemptionGround: 'Self-declaration generated and certified under Rule 4(A). Saves 60 days of central hydrogeological review.',
    exemptionHash: '8F09-91BC-CHAKAN',
    criticalPath: false
  },
  {
    demo: true,
    approvalId: 'PESO-PETRO-CLASS-B',
    approvalName: 'Petroleum & Solvents Storage License (Class B Flammable)',
    department: 'PESO',
    stage: 'PRE_OPERATION',
    applicability: 'Conditional',
    reasons: [
      'Planned solvent storage of 1,200 Litres exceeds 1,000 Litres statutory non-bulk exemption cutoff.',
      'Simulating reduction to 950 Litres batch inventory (Just-in-Time delivery) achieves complete license exemption.'
    ],
    ruleId: 'RULE-PESO-SOLV-06',
    sourceId: 'REG-PESO-2002',
    sourceVersion: 'v2002',
    confidence: 0.91,
    verificationRequired: true,
    status: 'UNDER_DESK_REVIEW',
    statutoryAct: 'The Petroleum Rules 2002',
    statutorySection: 'Rule 116(1) under Section 7 of Petroleum Act 1934',
    issuingOfficer: 'Joint Chief Controller of Explosives, Mumbai Circle',
    jurisdiction: 'PESO Western Circle',
    statutorySlaDays: 35,
    elapsedDays: 10,
    remainingDays: 25,
    prerequisites: ['MIDC-FIRE-NOC-01', 'DISH-MH-ACT-SEC6'],
    downstreamApprovals: ['PLINTH-COMMENCEMENT-GATE'],
    evidenceReadinessPercentage: 70,
    autofillPercentage: 65,
    criticalPath: false
  },
  {
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
  },
  {
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
  }
];

export const INITIAL_DAG_NODES: DAGNode[] = [
  {
    id: 'MIDC-LAND-ALLOTMENT',
    title: 'MIDC Land Allotment',
    shortCode: '#8821',
    department: 'MIDC',
    lane: 1,
    laneLabel: 'LANE 1 • DAY 0 (Land & Cadastral)',
    status: 'NOC_GRANTED',
    criticalPath: true,
    isBottleneck: false,
    slaInfo: 'Cleared on 14 Aug 2026',
    prerequisites: [],
    downstream: ['MPCB-CTE-2026-IND', 'MIDC-FIRE-NOC-01', 'MSEDCL-HT-450KVA'],
    daysRequired: 14,
    x: 20,
    y: 70
  },
  {
    id: 'MPCB-CTE-2026-IND',
    title: 'MPCB Consent to Establish (CTE)',
    shortCode: 'CP-1',
    department: 'MPCB',
    lane: 2,
    laneLabel: 'LANE 2 • DAY 15-45 (Pre-Construction)',
    status: 'UNDER_DESK_REVIEW',
    criticalPath: true,
    isBottleneck: false,
    slaInfo: 'Day 18 / 45 RTSA SLA',
    prerequisites: ['MIDC-LAND-ALLOTMENT'],
    downstream: ['JOINT-SITE-INSPECTION-GATE'],
    daysRequired: 45,
    x: 240,
    y: 30
  },
  {
    id: 'MIDC-FIRE-NOC-01',
    title: 'MIDC Provisional Fire NOC',
    shortCode: 'CRITICAL',
    department: 'CFO',
    lane: 2,
    laneLabel: 'LANE 2 • DAY 15-45 (Pre-Construction)',
    status: 'ACTION_REQUIRED',
    criticalPath: true,
    isBottleneck: true,
    slaInfo: 'Day 24 / 30 (6 Days Left)',
    prerequisites: ['MIDC-LAND-ALLOTMENT'],
    downstream: ['DISH-MH-ACT-SEC6', 'JOINT-SITE-INSPECTION-GATE'],
    daysRequired: 30,
    x: 240,
    y: 180
  },
  {
    id: 'DISH-MH-ACT-SEC6',
    title: 'DISH Factory Plan Form 1',
    shortCode: 'FPA-109',
    department: 'DISH',
    lane: 2,
    laneLabel: 'LANE 2 • DAY 15-45 (Pre-Construction)',
    status: 'SUBMITTED',
    criticalPath: false,
    isBottleneck: false,
    slaInfo: 'Day 8 / 30 RTSA SLA',
    prerequisites: ['MIDC-FIRE-NOC-01'],
    downstream: ['JOINT-SITE-INSPECTION-GATE'],
    daysRequired: 30,
    x: 240,
    y: 330
  },
  {
    id: 'MSEDCL-HT-450KVA',
    title: 'MSEDCL Feeder & Substation',
    shortCode: '33kV HT',
    department: 'MSEDCL',
    lane: 3,
    laneLabel: 'LANE 3 • DAY 30-60 (Utilities)',
    status: 'FEASIBILITY_CLEARED',
    criticalPath: false,
    isBottleneck: false,
    slaInfo: 'Feasibility OK • Day 16 / 30',
    prerequisites: ['MIDC-LAND-ALLOTMENT'],
    downstream: ['PLINTH-COMMENCEMENT-GATE'],
    daysRequired: 30,
    x: 480,
    y: 40
  },
  {
    id: 'PESO-PETRO-CLASS-B',
    title: 'PESO Solvent Storage License',
    shortCode: 'Class B',
    department: 'PESO',
    lane: 3,
    laneLabel: 'LANE 3 • DAY 30-60 (Utilities)',
    status: 'UNDER_DESK_REVIEW',
    criticalPath: false,
    isBottleneck: false,
    slaInfo: 'Day 10 / 35 (Simulatable to 950L Exempt)',
    prerequisites: ['MIDC-FIRE-NOC-01', 'DISH-MH-ACT-SEC6'],
    downstream: ['PLINTH-COMMENCEMENT-GATE'],
    daysRequired: 35,
    x: 480,
    y: 200
  },
  {
    id: 'CGWA-EXEMPT-SEC3',
    title: 'CGWA Groundwater NOC',
    shortCode: 'EXEMPT',
    department: 'CGWA',
    lane: 3,
    laneLabel: 'LANE 3 • DAY 30-60 (Utilities)',
    status: 'EXEMPTED',
    criticalPath: false,
    isBottleneck: false,
    slaInfo: 'Bypassed: 60d Saved (100% MIDC Bulk Supply)',
    prerequisites: [],
    downstream: [],
    daysRequired: 0,
    x: 480,
    y: 360
  },
  {
    id: 'JOINT-SITE-INSPECTION-GATE',
    title: 'Joint Field Inspection',
    shortCode: 'GATE',
    department: 'MIDC',
    lane: 4,
    laneLabel: 'LANE 4 • DAY 65 (Joint Inspections)',
    status: 'INSPECTION_SCHEDULED',
    criticalPath: true,
    isBottleneck: false,
    slaInfo: 'Slot: 28 Oct 2026 (MPCB+DISH+CFO)',
    prerequisites: ['MPCB-CTE-2026-IND', 'MIDC-FIRE-NOC-01', 'DISH-MH-ACT-SEC6'],
    downstream: ['PLINTH-COMMENCEMENT-GATE'],
    daysRequired: 15,
    x: 720,
    y: 140
  },
  {
    id: 'PLINTH-COMMENCEMENT-GATE',
    title: 'Plinth & Commencement Sanction',
    shortCode: 'DAY 78',
    department: 'MIDC',
    lane: 5,
    laneLabel: 'LANE 5 • DAY 78 (Commercial Plinth)',
    status: 'DISCOVERED',
    criticalPath: true,
    isBottleneck: false,
    slaInfo: 'Target Ground Breaking: 12 Dec 2026',
    prerequisites: ['JOINT-SITE-INSPECTION-GATE', 'MSEDCL-HT-450KVA'],
    downstream: [],
    daysRequired: 15,
    x: 940,
    y: 140
  }
];

export const INITIAL_DAG_EDGES: DAGEdge[] = [
  { id: 'E1', from: 'MIDC-LAND-ALLOTMENT', to: 'MPCB-CTE-2026-IND', type: 'CRITICAL' },
  { id: 'E2', from: 'MIDC-LAND-ALLOTMENT', to: 'MIDC-FIRE-NOC-01', type: 'CRITICAL', isBottleneck: true },
  { id: 'E3', from: 'MIDC-LAND-ALLOTMENT', to: 'MSEDCL-HT-450KVA', type: 'PARALLEL' },
  { id: 'E4', from: 'MIDC-FIRE-NOC-01', to: 'DISH-MH-ACT-SEC6', type: 'PREREQUISITE', isBottleneck: true },
  { id: 'E5', from: 'MPCB-CTE-2026-IND', to: 'JOINT-SITE-INSPECTION-GATE', type: 'CRITICAL' },
  { id: 'E6', from: 'MIDC-FIRE-NOC-01', to: 'JOINT-SITE-INSPECTION-GATE', type: 'CRITICAL', isBottleneck: true },
  { id: 'E7', from: 'DISH-MH-ACT-SEC6', to: 'JOINT-SITE-INSPECTION-GATE', type: 'PREREQUISITE' },
  { id: 'E8', from: 'MSEDCL-HT-450KVA', to: 'PLINTH-COMMENCEMENT-GATE', type: 'PARALLEL' },
  { id: 'E9', from: 'JOINT-SITE-INSPECTION-GATE', to: 'PLINTH-COMMENCEMENT-GATE', type: 'CRITICAL' },
  { id: 'E10', from: 'MIDC-LAND-ALLOTMENT', to: 'CGWA-EXEMPT-SEC3', type: 'BYPASSED' }
];

export const INITIAL_EVIDENCE_FACTS: EvidenceFact[] = [
  {
    id: 'FACT_ID: LND-8821-CHK',
    key: 'plot_cadastral_area',
    domain: 'LAND_CADASTRAL',
    label: 'Plot Cadastral Area & Survey Coordinates',
    value: 'Plot A-42, MIDC Chakan Phase II, 4,050.00 sq.m (1.0007 Acres)',
    displayValue: 'Plot A-42, MIDC Chakan Phase II, 4,050.00 sq.m (1.0007 Acres)',
    normalizedValue: 4050,
    sourceDocumentId: 'DOC-MIDC-01',
    sourceDocumentName: 'MIDC_Allotment_8821.pdf',
    sourcePage: 2,
    sourceType: 'OFFICIAL_ORDER',
    confidence: 1.0,
    verificationStatus: 'VERIFIED',
    verifiedBy: 'MIDC Area Manager (Pune)',
    version: 1,
    createdAt: '2026-08-14T15:40:00Z',
    updatedAt: '2026-08-14T15:40:00Z',
    usedByApplications: ['MPCB-CTE-2026-IND', 'MIDC-FIRE-NOC-01', 'DISH-MH-ACT-SEC6'],
    provenance: {
      hash: 'sha256-8821a0c49b1...',
      signatureId: 'DSC-MIDC-PN-8841',
      extractedSnippet: 'Plot No. A-42 admeasuring 4,050.00 square meters in Phase II of Chakan Industrial Area.'
    }
  },
  {
    id: 'FACT_ID: FIN-CPX-2026',
    key: 'project_capital_expenditure',
    domain: 'FINANCIAL_CAPEX',
    label: 'Gross Industrial Capital Outlay (Capex)',
    value: 120000000,
    displayValue: '₹12.00 Crore (INR 120,000,000)',
    normalizedValue: 12.0,
    sourceDocumentId: 'DOC-CA-01',
    sourceDocumentName: 'CA_Networth_UDIN.pdf',
    sourcePage: 1,
    sourceType: 'CA_CERTIFICATE',
    confidence: 0.992,
    verificationStatus: 'VERIFIED',
    verifiedBy: 'ICAI UDIN: 26038471BCDEF (M/s Kulkarni & Associates)',
    version: 3,
    createdAt: '2026-08-12T16:00:00Z',
    updatedAt: '2026-08-12T16:00:00Z',
    usedByApplications: ['MPCB-CTE-2026-IND', 'DISH-MH-ACT-SEC6'],
    provenance: {
      hash: 'sha256-ca120000bcf...',
      signatureId: 'UDIN-26038471BCDEF',
      extractedSnippet: 'Certified that Aarohan Precision Components Pvt. Ltd. has committed gross capital investment of ₹12,00,00,000/-'
    }
  },
  {
    id: 'FACT_ID: PWR-MSD-0450',
    key: 'power_contract_demand',
    domain: 'POWER_UTILITIES',
    label: 'Sanctioned Connected Electrical Load & Voltage',
    value: '450 kVA (Connected Load) • 400 kW (Contract Demand) via 33kV HT Feeder',
    displayValue: '450 kVA (Connected Load) • 400 kW (Contract Demand)',
    normalizedValue: 450,
    sourceDocumentId: 'DOC-MSEDCL-01',
    sourceDocumentName: 'MSEDCL_Feasibility_Letter.pdf',
    sourcePage: 4,
    sourceType: 'DISCOM_SANCTION',
    confidence: 1.0,
    verificationStatus: 'VERIFIED',
    verifiedBy: 'Superintending Engineer, MSEDCL Chakan',
    version: 1,
    createdAt: '2026-08-15T09:12:00Z',
    updatedAt: '2026-08-15T09:12:00Z',
    usedByApplications: ['DISH-MH-ACT-SEC6', 'MSEDCL-HT-450KVA'],
    provenance: {
      hash: 'sha256-msedcl9931...',
      signatureId: 'MSEDCL-DN-9931',
      extractedSnippet: 'Technical feasibility cleared for 450 kVA HT load from Chakan 132/33kV substation.'
    }
  },
  {
    id: 'FACT_ID: ENV-EFF-085',
    key: 'effluent_discharge_rate',
    domain: 'ENVIRONMENTAL',
    label: 'Industrial Effluent Discharge & ZLD Strategy',
    value: '8.5 KLD Total (Domestic: 6.0 KLD, Trade Effluent: 2.5 KLD)',
    displayValue: '8.5 KLD Total (Domestic: 6.0 KLD, Trade Effluent: 2.5 KLD)',
    normalizedValue: 8.5,
    sourceDocumentId: 'DOC-DPR-01',
    sourceDocumentName: 'DPR_Final_v3.pdf',
    sourcePage: 19,
    sourceType: 'DPR',
    confidence: 0.968,
    verificationStatus: 'VERIFIED',
    verifiedBy: 'Environmental Officer Bot (MPCB Automated Rule Engine)',
    version: 2,
    createdAt: '2026-08-16T11:20:00Z',
    updatedAt: '2026-08-16T11:20:00Z',
    usedByApplications: ['MPCB-CTE-2026-IND'],
    provenance: {
      hash: 'sha256-dpr9041eff...',
      extractedSnippet: 'Water balance confirms 8.5 KLD total wastewater with 100% recycling via RO & MEE (Zero Liquid Discharge).'
    }
  },
  {
    id: 'FACT_ID: LBR-EMP-0145',
    key: 'workforce_headcount',
    domain: 'WORKFORCE',
    label: 'Peak Shopfloor Employment & Shift Distribution',
    value: 145,
    displayValue: '145 Personnel (General Shift: 75, Shift B: 45, Shift C: 25)',
    normalizedValue: 145,
    sourceDocumentId: 'DOC-DPR-01',
    sourceDocumentName: 'DPR_Final_v3.pdf',
    sourcePage: 28,
    sourceType: 'DPR',
    confidence: 0.91,
    verificationStatus: 'NEEDS_REVIEW',
    verifiedBy: 'HR Statutory Cell',
    version: 1,
    createdAt: '2026-08-17T14:15:00Z',
    updatedAt: '2026-08-17T14:15:00Z',
    usedByApplications: ['DISH-MH-ACT-SEC6'],
    provenance: {
      hash: 'sha256-emp145dpr...',
      extractedSnippet: 'Factory workforce is 145 across 3 rotational shifts. Factories Act §46 canteen exempt (<250 workers).'
    }
  },
  {
    id: 'FACT_ID: CAD-TRN-0075',
    key: 'fire_turning_radius',
    domain: 'LAND_CADASTRAL',
    label: 'Vehicular Fire Egress Turning Radius',
    value: 7.5,
    displayValue: '7.5 meters (Gate 2 Ingress)',
    normalizedValue: 7.5,
    sourceDocumentId: 'DOC-CAD-01',
    sourceDocumentName: 'AR-DWG-002-v1.dwg',
    sourcePage: 1,
    sourceType: 'CAD_BLUEPRINT',
    confidence: 0.97,
    verificationStatus: 'CONFLICT',
    verifiedBy: 'AI CAD Vector Analyzer',
    version: 1,
    createdAt: '2026-08-18T10:00:00Z',
    updatedAt: '2026-08-18T10:00:00Z',
    usedByApplications: ['MIDC-FIRE-NOC-01'],
    provenance: {
      hash: 'sha256-cad75mtr...',
      extractedSnippet: 'Vector layer G2_ARC radius evaluated as 7.50m on boundary North-East corridor.'
    }
  }
];

export const INITIAL_DOCUMENTS: DocumentRecord[] = [
  {
    id: 'DOC-DPR-01',
    name: 'DPR_Final_v3.pdf',
    sizeMb: 14.2,
    pageCount: 48,
    uploadedAt: '2026-08-10T11:00:00Z',
    documentType: 'DPR',
    checksumSha256: 'e8b9410ac349f788102b4a569cde78104321',
    extractedFactsCount: 42,
    verificationState: 'VERIFIED',
    statusDescription: 'AI TableNet layout & NER extracted 42 statutory facts successfully.'
  },
  {
    id: 'DOC-MIDC-01',
    name: 'MIDC_Allotment_8821.pdf',
    sizeMb: 2.4,
    pageCount: 8,
    uploadedAt: '2026-08-14T09:30:00Z',
    documentType: 'MIDC_ALLOTMENT',
    checksumSha256: 'a901844b201cd99401738cbe2001',
    extractedFactsCount: 8,
    verificationState: 'VERIFIED',
    statusDescription: 'Digitally signed by MIDC Special Planning Authority.'
  },
  {
    id: 'DOC-CAD-01',
    name: 'AR-DWG-002-v1.dwg',
    sizeMb: 48.1,
    pageCount: 1,
    uploadedAt: '2026-08-18T08:15:00Z',
    documentType: 'CAD_DRAWING',
    checksumSha256: 'f44211bc901172a11b6540cde',
    extractedFactsCount: 14,
    verificationState: 'DISCREPANCY',
    statusDescription: 'Flagged 1 statutory conflict: 7.5m turning radius vs 9.0m UDCPR mandate.'
  },
  {
    id: 'DOC-CA-01',
    name: 'CA_Networth_UDIN.pdf',
    sizeMb: 1.1,
    pageCount: 3,
    uploadedAt: '2026-08-12T15:00:00Z',
    documentType: 'CA_CERTIFICATE',
    checksumSha256: 'c33198fbb02931a78',
    extractedFactsCount: 6,
    verificationState: 'VERIFIED',
    statusDescription: 'Reconciled to ₹12.0 Cr (UDIN 26038471BCDEF confirmed on ICAI portal).'
  },
  {
    id: 'DOC-FIRE-01',
    name: 'Fire_Hydrant_Calc_v1.pdf',
    sizeMb: 3.8,
    pageCount: 12,
    uploadedAt: '2026-08-19T14:30:00Z',
    documentType: 'FIRE_HYDRANT_CALC',
    checksumSha256: 'd9982441a1005',
    extractedFactsCount: 9,
    verificationState: 'IN_REVIEW',
    statusDescription: 'Pending cross-reference with updated CAD drawing v2.'
  }
];

export const INITIAL_DISCREPANCIES: DiscrepancyRecord[] = [
  {
    id: 'DISC-FIRE-CAD-01',
    title: 'Critical Bottleneck: CAD Blueprint vs. Fire Safety Mandate',
    severity: 'CRITICAL_BLOCKER',
    affectedApprovalId: 'MIDC-FIRE-NOC-01',
    affectedApprovalName: 'Provisional Fire Safety Clearance (Building Layout NOC)',
    fieldA: {
      label: 'CAD Architect Layout Radius',
      value: '7.5 meters',
      source: 'AR-DWG-002-v1.dwg (Gate 2 Corridor)'
    },
    fieldB: {
      label: 'UDCPR 2020 §14.8 Statutory Rule',
      value: '9.0 meters minimum',
      source: 'Unified Development Control Regulations 2020 & CFO Fire Code'
    },
    statutoryRuleCitation: 'Maharashtra Fire Prevention & Life Safety Measures Act 2006 & UDCPR §14.8',
    explanation: 'Architect CAD drawing specifies a 7.5m internal vehicular turning radius at Gate 2. This falls short of the 9.0m minimum required for 32-ton fire tenders to maneuver safely.',
    resolutionOptions: [
      {
        id: 'OPT-AUTO-ALIGN',
        title: 'Auto-Align with Cadastral Map v3',
        description: 'Applies 9.4m cleared egress corridor from validated MIDC GIS cadastral pegging survey.',
        isAiRecommended: true,
        estimatedTurnaround: 'Instant (1-Click)'
      },
      {
        id: 'OPT-ARCHITECT-NOTICE',
        title: 'Architect Revision Notice',
        description: 'Generates formal redline notice to Ar. Sanjay Mehta (COA #CA/2012/58911) requesting revised DWG.',
        isAiRecommended: false,
        estimatedTurnaround: '48 Hours'
      },
      {
        id: 'OPT-CFO-PETITION',
        title: 'CFO Rule 18 Relaxation Petition',
        description: 'Files formal special relaxation petition with Pune Municipal CFO.',
        isAiRecommended: false,
        estimatedTurnaround: 'Requires Formal Hearing'
      }
    ],
    isResolved: false
  },
  {
    id: 'DISC-CAPEX-DRAFT-02',
    title: 'Capex Reconciliation: Project Profile (₹12.0 Cr) vs Draft DPR (₹13.6 Cr)',
    severity: 'MAJOR',
    affectedApprovalId: 'MPCB-CTE-2026-IND',
    affectedApprovalName: 'Consent to Establish (CTE)',
    fieldA: {
      label: 'Statutory Project Profile',
      value: '₹12.00 Crore',
      source: 'CA Certificate (UDIN: 26038471BCDEF)'
    },
    fieldB: {
      label: 'Draft Feasibility Working Paper',
      value: '₹13.60 Crore',
      source: 'DPR Early Working File v1.2'
    },
    statutoryRuleCitation: 'MPCB Industrial Fee Schedule Notification 2024',
    explanation: 'Draft DPR included optional phase 2 machinery of ₹1.6 Cr which is not part of Phase 1 capex. Reconciled to ₹12.00 Cr in certified Evidence Wallet.',
    resolutionOptions: [
      {
        id: 'OPT-LOCK-12CR',
        title: 'Lock Phase 1 Capex at ₹12.00 Cr (CA Certified)',
        description: 'Binds verified CA net worth certificate to MPCB fee calculation tier (saving ₹45,000 excess consent fees).',
        isAiRecommended: true,
        estimatedTurnaround: 'Instant'
      }
    ],
    isResolved: true,
    resolvedWithOptionId: 'OPT-LOCK-12CR'
  }
];

export const INITIAL_APPLICATION_SCHEMAS: ApplicationSchema[] = [
  {
    applicationId: 'MPCB-CTE-FORM-1',
    title: 'Consent to Establish (CTE) Form 1',
    department: 'Maharashtra Pollution Control Board (MPCB)',
    totalFields: 38,
    fields: [
      { fieldId: 'f1', fieldLabel: 'Enterprise Name', populatedValue: 'Aarohan Precision Components Pvt. Ltd.', status: 'VERIFIED_AUTOFILL', sourceDoc: 'MIDC_Allotment_8821.pdf', confidence: 1.0 },
      { fieldId: 'f2', fieldLabel: 'Corporate Identification Number (CIN)', populatedValue: 'U29304PN2023PTC192841', status: 'VERIFIED_AUTOFILL', sourceDoc: 'MCA Master Data', confidence: 1.0 },
      { fieldId: 'f3', fieldLabel: 'Plot Number & Location', populatedValue: 'Plot A-42, MIDC Phase II, Chakan, Pune', status: 'VERIFIED_AUTOFILL', sourceDoc: 'MIDC_Allotment_8821.pdf', confidence: 1.0 },
      { fieldId: 'f4', fieldLabel: 'Gross Capital Investment (Capex)', populatedValue: '₹ 12,00,00,000/-', status: 'VERIFIED_AUTOFILL', sourceDoc: 'CA_Networth_UDIN.pdf', confidence: 0.99 },
      { fieldId: 'f5', fieldLabel: 'Industry Category', populatedValue: 'Orange (Machining & Assembly)', status: 'VERIFIED_AUTOFILL', sourceDoc: 'DPR_Final_v3.pdf', confidence: 0.98 },
      { fieldId: 'f6', fieldLabel: 'Domestic Water Consumption (KLD)', populatedValue: '6.0 KLD', status: 'VERIFIED_AUTOFILL', sourceDoc: 'DPR_Final_v3.pdf', confidence: 0.97 },
      { fieldId: 'f7', fieldLabel: 'Trade Effluent Generation (KLD)', populatedValue: '2.5 KLD', status: 'VERIFIED_AUTOFILL', sourceDoc: 'DPR_Final_v3.pdf', confidence: 0.97 },
      { fieldId: 'f8', fieldLabel: 'Effluent Treatment Plant (ETP) Capacity', populatedValue: '10.0 KLD RO+MEE Zero Liquid Discharge', status: 'VERIFIED_AUTOFILL', sourceDoc: 'DPR_Final_v3.pdf', confidence: 0.96 },
      { fieldId: 'f9', fieldLabel: 'Connected Electrical Load', populatedValue: '450 kVA (33kV HT Dedicated Feeder)', status: 'VERIFIED_AUTOFILL', sourceDoc: 'MSEDCL_Feasibility_Letter.pdf', confidence: 1.0 },
      { fieldId: 'f10', fieldLabel: 'DG Set Capacity with Acoustic Enclosure', populatedValue: '250 kVA Silent DG Set', status: 'SUGGESTED', sourceDoc: 'DPR_Final_v3.pdf', confidence: 0.91 }
    ]
  },
  {
    applicationId: 'DISH-FPA-FORM-1',
    title: 'Factories Act Form 1 & Layout Registration',
    department: 'Directorate of Industrial Safety & Health (DISH)',
    totalFields: 35,
    fields: [
      { fieldId: 'd1', fieldLabel: 'Factory Name', populatedValue: 'Aarohan Precision Components Pvt. Ltd.', status: 'VERIFIED_AUTOFILL', sourceDoc: 'MIDC_Allotment_8821.pdf', confidence: 1.0 },
      { fieldId: 'd2', fieldLabel: 'Max Number of Persons on Any Day', populatedValue: '145 Workers', status: 'VERIFIED_AUTOFILL', sourceDoc: 'DPR_Final_v3.pdf', confidence: 0.92 },
      { fieldId: 'd3', fieldLabel: 'Total Installed Motive Power (HP/kW)', populatedValue: '450 kVA / 400 kW', status: 'VERIFIED_AUTOFILL', sourceDoc: 'MSEDCL_Feasibility_Letter.pdf', confidence: 1.0 },
      { fieldId: 'd4', fieldLabel: 'Manufacturing Process Carried Out', populatedValue: 'Automotive transmission gear forging & precision machining', status: 'VERIFIED_AUTOFILL', sourceDoc: 'DPR_Final_v3.pdf', confidence: 0.98 },
      { fieldId: 'd5', fieldLabel: 'Structural Stability Certificate Ref', populatedValue: 'ICAI / Civil Engg Reg #PN-STR-2026-90', status: 'SUGGESTED', sourceDoc: 'Civil Structural Report', confidence: 0.89 }
    ]
  }
];

export const INITIAL_SLA_RECORDS: SLARecord[] = [
  {
    approvalId: 'MIDC-FIRE-NOC-01',
    approvalName: 'MIDC Provisional Fire Safety Clearance',
    department: 'Chief Fire Officer, MIDC',
    officerName: 'Col. V. Shinde (Retd.)',
    officerDesignation: 'Divisional Fire Officer, Chakan',
    submittedAt: '2026-09-03T10:00:00Z',
    officialSlaDays: 30,
    elapsedDays: 24,
    remainingDays: 6,
    riskLevel: 'HIGH',
    riskFactors: [
      '80% statutory SLA window consumed (Day 24 of 30).',
      'Mandatory CAD turning radius discrepancy holding final signature.',
      'Downstream DISH Factory Plan filing blocked until Fire NOC is cleared.'
    ],
    lastStatutoryNotice: 'RTSA Notice dispatched to Divisional Officer on Day 21.',
    nextEscalationDate: '2026-10-03'
  },
  {
    approvalId: 'MPCB-CTE-2026-IND',
    approvalName: 'Consent to Establish (CTE)',
    department: 'Maharashtra Pollution Control Board',
    officerName: 'K. Deshmukh',
    officerDesignation: 'Sub-Regional Officer (SRO Pune-II)',
    submittedAt: '2026-09-09T14:30:00Z',
    officialSlaDays: 45,
    elapsedDays: 18,
    remainingDays: 27,
    riskLevel: 'LOW',
    riskFactors: ['Desk scrutiny 100% compliant with Orange Category standards.'],
    nextEscalationDate: '2026-10-24'
  },
  {
    approvalId: 'DISH-MH-ACT-SEC6',
    approvalName: 'Factory Building Plan Approval Form 1',
    department: 'DISH Maharashtra',
    officerName: 'P. S. Kulkarni',
    officerDesignation: 'Joint Director of Industrial Safety (Pune)',
    submittedAt: '2026-09-19T11:00:00Z',
    officialSlaDays: 30,
    elapsedDays: 8,
    remainingDays: 22,
    riskLevel: 'LOW',
    riskFactors: ['Waiting on Fire NOC prerequisite before scheduling mechanical engineer site check.'],
    nextEscalationDate: '2026-10-19'
  }
];

export const INITIAL_INSPECTIONS: InspectionRecord[] = [
  {
    id: 'INSP-2026-088',
    title: 'Joint Pre-Commissioning Site Visit & Ingress Inspection',
    departments: ['MPCB', 'DISH', 'MIDC Fire CFO'],
    inspectingOfficers: [
      { name: 'K. Deshmukh', department: 'MPCB', designation: 'SRO Pune-II' },
      { name: 'P. S. Kulkarni', department: 'DISH', designation: 'Joint Director (Safety)' },
      { name: 'Col. V. Shinde', department: 'MIDC Fire', designation: 'Divisional Fire Officer' }
    ],
    scheduledDate: '2026-10-28',
    scheduledTime: '11:00 AM IST',
    status: 'Scheduled',
    siteCadastralCoordinates: 'Plot A-42, MIDC Chakan Phase II (18.7521°N, 73.8055°E)',
    droneSurveyCompleted: true,
    prerequisites: [
      { id: 'p1', label: 'Plot boundary pegging verified by MIDC Surveyor', isReady: true, docReference: 'MIDC_Pegging_Doc' },
      { id: 'p2', label: 'Storm water drain tie-in channel approved', isReady: true },
      { id: 'p3', label: 'Effluent discharge sampling pit constructed', isReady: true },
      { id: 'p4', label: 'CAD fire tender turning radius authenticated', isReady: false },
      { id: 'p5', label: 'Overhead 33kV power line clearance documented', isReady: true }
    ],
    notes: 'Joint inter-departmental site visit organized under Maharashtra RTSA 2015 Single-Window inspection guidelines.'
  }
];

export const INITIAL_ESCALATIONS: EscalationCase[] = [
  {
    caseId: 'CASE-MH-2026-091',
    applicationId: 'MIDC-FIRE-NOC-01',
    applicationName: 'Provisional Fire Safety Clearance',
    department: 'Chief Fire Officer, MIDC Chakan',
    type: 'QUERY',
    subject: 'Turning Radius Dimension Clarification for 32-Ton Fire Tender Access',
    priority: 'HIGH',
    status: 'INVESTOR_ACTION_PENDING',
    createdAt: '2026-09-24T14:00:00Z',
    slaDeadline: '2026-09-30T17:00:00Z',
    assignedOfficer: 'Col. V. Shinde (Retd.)',
    history: [
      {
        id: 'msg-1',
        sender: 'Col. V. Shinde (Retd.)',
        senderRole: 'OFFICER',
        timestamp: '2026-09-24T14:10:00Z',
        content: 'Applicant drawing AR-DWG-002-v1 shows 7.5m inner turning radius at Gate 2. As per UDCPR §14.8, industrial plots > 2500 sq.m require 9.0m minimum. Please upload amended drawing.'
      }
    ]
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'NOTIF-01',
    eventType: 'SLA_RISK',
    title: 'Critical SLA Warning: MIDC Fire Safety Clearance',
    message: '6 days remaining before statutory RTSA deadline breach. Action required on CAD vehicular turning radius.',
    severity: 'CRITICAL',
    entityType: 'APPROVAL',
    entityId: 'MIDC-FIRE-NOC-01',
    createdAt: '10 minutes ago',
    read: false,
    actionURL: 'evidence-wallet'
  },
  {
    id: 'NOTIF-02',
    eventType: 'REGULATION_CHANGED',
    title: 'Gazette Watch: Maharashtra Industrial Policy 2026 IND-44/B',
    message: 'Solar rooftop captive mandate relaxed for auto-ancillaries under ₹15 Cr. Solar requirement re-calculated from 450 kW to 220 kW.',
    severity: 'INFO',
    entityType: 'POLICY',
    entityId: 'REG-MIP-2026',
    createdAt: '1 hour ago',
    read: false,
    actionURL: 'regulatory-impact'
  },
  {
    id: 'NOTIF-03',
    eventType: 'APPLICATION_READY',
    title: 'Autofill Engine: Factory License Form 1 Ready',
    message: '31 of 35 fields mapped from DPR and MCA Master Data with 92% confidence score.',
    severity: 'SUCCESS',
    entityType: 'APPROVAL',
    entityId: 'DISH-MH-ACT-SEC6',
    createdAt: '3 hours ago',
    read: false,
    actionURL: 'autofill-engine'
  },
  {
    id: 'NOTIF-04',
    eventType: 'INSPECTION_SCHEDULED',
    title: 'Joint Field Inspection Scheduled for 28 Oct 2026',
    message: 'DISH, MPCB, and MIDC CFO joint officers confirmed 11:00 AM site visit slot.',
    severity: 'INFO',
    entityType: 'INSPECTION',
    entityId: 'INSP-2026-088',
    createdAt: 'Yesterday',
    read: true,
    actionURL: 'inspection-center'
  }
];

export const INITIAL_AUDIT_TRAIL: AuditEntry[] = [
  {
    id: 'AUD-001',
    actor: 'System Ingestion Bot',
    actorType: 'SYSTEM',
    action: 'INGEST_PROJECT_DOSSIER',
    resource: 'Project Profile: Aarohan Precision Components',
    timestamp: '2026-08-10 09:30:00 IST',
    metadata: { cin: 'U29304PN2023PTC192841', location: 'MIDC Chakan Phase II' },
    previousHash: 'GENESIS_BLOCK_0000000000000000',
    hash: '8f9b201a0942ffb3901a'
  },
  {
    id: 'AUD-002',
    actor: 'PRAVAH Discovery Engine',
    actorType: 'AI_RECOMMENDATION',
    action: 'EVALUATE_STATUTORY_RULES',
    resource: 'Approval Catalog v3.2-MH',
    timestamp: '2026-08-10 09:32:15 IST',
    metadata: { discoveredCount: 11, exemptCount: 14, criticalPathDays: 78 },
    previousHash: '8f9b201a0942ffb3901a',
    hash: 'c1044ba9028dfa89104b'
  },
  {
    id: 'AUD-003',
    actor: 'K. Deshmukh (SRO Pune-II)',
    actorType: 'HUMAN',
    action: 'DESK_REVIEW_COMPLIANT',
    resource: 'Consent to Establish (CTE) Form 1',
    timestamp: '2026-08-12 11:24:00 IST',
    metadata: { verifiedFields: 36, digitalSigId: 'DSC-MPCB-8841F' },
    previousHash: 'c1044ba9028dfa89104b',
    hash: 'd22940fa18933bce014c'
  },
  {
    id: 'AUD-004',
    actor: 'Sunita Deshmukh',
    actorType: 'HUMAN',
    action: 'VERIFY_EVIDENCE_FACT',
    resource: 'CA Net Worth Certificate v3 (₹12.0 Cr)',
    timestamp: '2026-08-14 16:15:00 IST',
    metadata: { udin: '26038471BCDEF', ca: 'M/s Kulkarni & Associates' },
    previousHash: 'd22940fa18933bce014c',
    hash: 'e99042ab67210f99231d'
  },
  {
    id: 'AUD-005',
    actor: 'PRAVAH Anomaly Engine',
    actorType: 'SYSTEM',
    action: 'FLAG_CAD_DISCREPANCY',
    resource: 'AR-DWG-002-v1.dwg vs UDCPR §14.8',
    timestamp: '2026-08-18 10:05:00 IST',
    metadata: { extractedRadius: '7.5m', requiredRadius: '9.0m', severity: 'CRITICAL_BLOCKER' },
    previousHash: 'e99042ab67210f99231d',
    hash: 'f00294da88172bca904e'
  }
];

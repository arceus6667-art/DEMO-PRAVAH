export type IndustryCategory = 'White' | 'Green' | 'Orange' | 'Red';

export interface ProjectProfile {
  demo: true;
  id: string; // e.g., 'PRV-MH-2026-001'
  cin: string; // 'U29304PN2023PTC192841'
  organisation: string; // 'Aarohan Precision Components Pvt. Ltd.'
  projectName: string;
  industry: string; // 'Precision Manufacturing & Auto-Ancillary Machining'
  nicCode: string; // '29301'
  activityDescription: string;
  state: string; // 'Maharashtra'
  district: string; // 'Pune'
  taluka: string; // 'Khed'
  location: string; // 'Plot A-42, MIDC Phase II, Chakan, Pune, Maharashtra'
  coordinates: {
    lat: number;
    lng: number;
    cadastralPlot: string;
  };
  isMIDC: boolean; // true
  midcZone: string; // 'Chakan Phase II'
  investment: {
    totalCapexCr: number; // 12.0
    plantAndMachineryCr: number; // 8.4
    civilAndBuildingCr: number; // 3.6
    landLeaseYears: number; // 95
  };
  land: {
    plotAreaSqMeters: number; // 4050
    plotAreaAcres: number; // 1.0007
    builtUpAreaSqMeters: number; // 3900
    shedRidgeHeightMeters: number; // 11.2
    turningRadiusMeters: number; // 7.5 initially (conflict), 9.4 resolved
  };
  workforce: {
    totalEmployees: number; // 145
    generalShift: number; // 75
    shiftB: number; // 45
    shiftC: number; // 25
    femaleEmployees: number; // 28
  };
  power: {
    connectedLoadKva: number; // 450
    contractDemandKw: number; // 400
    supplyVoltage: string; // '33kV HT Dedicated Feeder'
    substation: string; // 'Chakan 132/33kV MSETCL Substation'
    solarRooftopKw: number; // 450 initial, 220 amended
  };
  water: {
    source: 'MIDC_PIPED_SUPPLY' | 'GROUNDWATER_BOREWELL' | 'RIVER_CANAL';
    dailyRequirementKld: number; // 15
    domesticEffluentKld: number; // 6.0
    tradeEffluentKld: number; // 2.5
    totalEffluentKld: number; // 8.5
    treatmentType: string; // 'Zero Liquid Discharge (RO + MEE)'
    borewellPlanned: boolean; // false
  };
  fuelAndChemicals: {
    hasBoiler: boolean; // false (<25L electric thermic fluid heater)
    solventsClassBStoredLitres: number; // 1200 initially (review), can simulate 950
    dgSetCapacityKva: number; // 250
  };
  environmentalCharacteristics: {
    category: IndustryCategory; // Orange
    pollutionIndex: number; // 48.5
    hazardousWastePerAnnumMt: number; // 0.8 (used oil & coolant sludges)
  };
  status: 'DRAFT' | 'ACTIVE_PHASE_1' | 'UNDER_REVIEW' | 'COMMISSIONED';
  completionPercentage: number;
  lastUpdated: string;
}

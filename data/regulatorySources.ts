import { RegulatorySource } from '../types/platform';

export const REGULATORY_SOURCES: RegulatorySource[] = [
  {
    id: 'REG-MPCB-ENV-2024',
    title: 'Maharashtra Gazette & MPCB Re-categorization Circular 2024/09',
    authority: 'Maharashtra Pollution Control Board (Environment Dept, GoM)',
    document: 'ENV/2021/CR-88/TC-3',
    version: 'v3.2-2024',
    effectiveFrom: '2024-04-01',
    effectiveTo: '2029-03-31',
    sourceURL: 'https://mpcb.gov.in/notifications/circular-2024-09.pdf',
    hash: 'sha256-4c91a0f8b1e423d6a718b456cd3288f12a890e0c',
    status: 'ACTIVE',
    description: 'Categorization of Industrial Sectors under Red, Orange, Green and White categories based on Comprehensive Pollution Index (CPI).'
  },
  {
    id: 'REG-DISH-ACT-1948',
    title: 'The Factories Act, 1948 & Maharashtra Factories Rules 1963',
    authority: 'Directorate of Industrial Safety & Health (DISH), Maharashtra',
    document: 'Act No. 63 of 1948, Sections 2(m), 6, 7 & 46',
    version: 'v2021-EaseOfBusiness',
    effectiveFrom: '1948-09-23',
    effectiveTo: '2030-12-31',
    sourceURL: 'https://dish.maharashtra.gov.in/acts-rules',
    hash: 'sha256-a119f408ce917729bcae710298a44b9102c918f1',
    status: 'ACTIVE',
    description: 'Statutory mandates for manufacturing processes with power employing 20+ workers, aisle dimensions, and emergency exits.'
  },
  {
    id: 'REG-UDCPR-2020',
    title: 'Unified Development Control & Promotion Regulations (UDCPR 2020)',
    authority: 'Urban Development Department & MIDC Special Planning Authority',
    document: 'UDCPR-2020 Rule 14.3 & 14.8',
    version: 'v2.1-2022',
    effectiveFrom: '2020-12-02',
    effectiveTo: '2030-12-31',
    sourceURL: 'https://midcindia.org/regulations/udcpr-2020.pdf',
    hash: 'sha256-b99824c0fa1e8812cde441098a1278e90145bc09',
    status: 'ACTIVE',
    description: 'Prescribes mandatory minimum 9.0m vehicular turning radius for high-reach 32-ton fire tenders at industrial gates.'
  },
  {
    id: 'REG-CGWA-2020',
    title: 'Central Ground Water Authority (CGWA) Guidelines 2020',
    authority: 'Ministry of Jal Shakti, Government of India',
    document: 'CGWA/Guidelines/2020/Sec-1.0(v)',
    version: 'v2020-Gazette',
    effectiveFrom: '2020-09-24',
    effectiveTo: '2028-12-31',
    sourceURL: 'https://cgwa-noc.gov.in/guidelines-2020.pdf',
    hash: 'sha256-e88913b482ac90187bfca00912cb90144f81023a',
    status: 'ACTIVE',
    description: 'Exempts industrial consumers within notified industrial parks (such as MIDC) drawing purely municipal/bulk piped supply from borehole NOC.'
  },
  {
    id: 'REG-PESO-2002',
    title: 'The Petroleum Rules, 2002 under Petroleum Act 1934',
    authority: 'Petroleum and Explosives Safety Organisation (PESO), DPIIT',
    document: 'Petroleum Rules 2002 Rule 116(1)',
    version: 'v2002-amended',
    effectiveFrom: '2002-03-13',
    effectiveTo: '2030-12-31',
    sourceURL: 'https://peso.gov.in/rules/petroleum-rules-2002.pdf',
    hash: 'sha256-7f12e98d91a2bb4610cde19405ba891230cd71a8',
    status: 'ACTIVE',
    description: 'Allows non-bulk storage of Class B flammable solvents up to 1,000 Litres at a single industrial location without PESO license.'
  },
  {
    id: 'REG-MIP-2026',
    title: 'Maharashtra Industrial Policy 2026 (Gazette Amendment No. IND-44/B)',
    authority: 'Industries, Energy and Labour Department, GoM',
    document: 'Gazette Extra-Ord. IV-B No. 104',
    version: 'Version 2 (Gazette Ref: IND-44/B)',
    effectiveFrom: '2026-08-15',
    effectiveTo: '2031-08-14',
    sourceURL: 'https://industry.maharashtra.gov.in/policy-2026-ind44b.pdf',
    hash: 'sha256-3392a8e1b6f0099ab4cd09117823f99014bca882',
    status: 'ACTIVE',
    description: 'Amends captive solar rooftop generation mandate for precision auto-ancillaries under ₹15 Cr capex, scaling down quota from 450 kW to 220 kW.'
  }
];

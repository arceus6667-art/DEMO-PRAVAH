export type UserRole = 'INVESTOR' | 'OFFICER' | 'ADMIN';

export interface DemoUser {
  id: string;
  name: string;
  role: UserRole;
  designation: string;
  organization: string;
  avatarUrl?: string;
  jurisdiction?: string;
}

export type Language = 'en' | 'hi' | 'mr' | 'gu';

export type ActiveTab =
  | 'overview'
  | 'project-profile'
  | 'approval-discovery'
  | 'dependency-graph'
  | 'applications-tracker'
  | 'evidence-wallet'
  | 'document-intelligence'
  | 'autofill-engine'
  | 'sla-guardian'
  | 'inspection-center'
  | 'regulatory-impact'
  | 'queries-escalations'
  | 'officer-center'
  | 'audit-trail'
  | 'admin-governance';

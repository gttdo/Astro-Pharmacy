// Domain model for Astro — sterile IV compounding workflow.

export type Role = "RPH" | "TECH";
export type Hazard = "HD" | "NHD"; // Hazardous / Non-Hazardous drug

/** A physical cleanroom that staff "join" to begin work. */
export interface Cleanroom {
  id: string;
  name: string;
  hazard: Hazard;
  workstations: number;
  available: number;
}

/** Workflow status — drives the queue board and the verification loop. */
export type Status =
  | "new" // ordered, awaiting a technician
  | "in_progress" // technician is compounding on the worksheet
  | "in_review" // submitted; awaiting pharmacist verification
  | "approved" // pharmacist verified and released
  | "rejected"; // pharmacist sent back to the technician to fix

/** Column lane for NEW tickets (mirrors the Figma queue board). */
export type Lane = "first_dose" | "compounding" | "preparation";

/** A single line item on the compounding worksheet. */
export interface Component {
  id: string;
  kind: "medication" | "diluent" | "bag";
  name: string;
  dose: string;
  ndc: string;
  lot: string;
  kit?: string;
  manufacturer: string;
  expiration: string;
  /** Photos captured as documentation evidence (count). */
  photos: number;
  /** Photos required before this step can be verified. */
  photosRequired: number;
}

/** A compound order — the unit of work that flows through the system. */
export interface Ticket {
  id: string;
  medication: string;
  patientName: string;
  mrn: string;
  hazard: Hazard;
  prn: boolean;
  priority: "routine" | "stat";
  lane: Lane;
  status: Status;
  cleanroomId: string;
  rph: string | null;
  tech: string | null;
  components: Component[];
  /** Minutes until/since the due time. Negative = overdue. */
  dueInMinutes: number;
  rejectionReason?: string;
  history: { label: string; by: string; at: string }[];
}

export interface Session {
  role: Role | null;
  name: string | null;
  cleanroomId: string | null;
}

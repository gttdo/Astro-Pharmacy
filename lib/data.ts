import type { Cleanroom, Ticket } from "./types";

export const CLEANROOMS: Cleanroom[] = [
  { id: "hd-a", name: "HD Room A", hazard: "HD", workstations: 4, available: 3 },
  { id: "hd-c", name: "HD Room C", hazard: "HD", workstations: 4, available: 0 },
  { id: "nhd-b", name: "NHD Room B", hazard: "NHD", workstations: 8, available: 8 },
];

let seq = 0;
const cid = (p: string) => `${p}-${++seq}`;

/** Two documented medications + a diluent — the canonical worksheet shape. */
function oxaliplatinComponents() {
  return [
    {
      id: cid("c"),
      kind: "medication" as const,
      name: "Oxaliplatin 100mg Injectable",
      dose: "100 mg",
      ndc: "54392-7654-93",
      lot: "123545",
      kit: "654re",
      manufacturer: "Roche",
      expiration: "09/19/2025",
      photos: 0,
      photosRequired: 1,
    },
    {
      id: cid("c"),
      kind: "medication" as const,
      name: "Oxaliplatin 50mg Injectable",
      dose: "50 mg",
      ndc: "54392-7654-21",
      lot: "118402",
      kit: "654re",
      manufacturer: "Roche",
      expiration: "07/02/2025",
      photos: 0,
      photosRequired: 1,
    },
    {
      id: cid("c"),
      kind: "diluent" as const,
      name: "5% Dextrose in Water",
      dose: "500 mL",
      ndc: "00338-0085-04",
      lot: "P338201",
      manufacturer: "Baxter",
      expiration: "11/20/2025",
      photos: 0,
      photosRequired: 1,
    },
  ];
}

function vancomycinComponents() {
  return [
    {
      id: cid("c"),
      kind: "medication" as const,
      name: "Vancomycin 1g Injectable",
      dose: "1 g",
      ndc: "00409-6510-01",
      lot: "VN5521",
      kit: "221kd",
      manufacturer: "Hospira",
      expiration: "03/14/2026",
      photos: 0,
      photosRequired: 1,
    },
    {
      id: cid("c"),
      kind: "diluent" as const,
      name: "0.9% Sodium Chloride",
      dose: "250 mL",
      ndc: "00338-0049-03",
      lot: "NS44910",
      manufacturer: "Baxter",
      expiration: "01/09/2026",
      photos: 0,
      photosRequired: 1,
    },
  ];
}

/** Fresh demo state. Tickets span lanes, hazard classes and statuses. */
export function makeInitialTickets(): Ticket[] {
  seq = 0;
  return [
    {
      id: "RX-4821",
      medication: "Oxaliplatin 150 mg IV in 500 mls 5% Dextrose in Water",
      patientName: "John Wick",
      mrn: "12122356",
      hazard: "HD",
      prn: true,
      priority: "stat",
      lane: "first_dose",
      status: "new",
      cleanroomId: "hd-a",
      rph: null,
      tech: null,
      components: oxaliplatinComponents(),
      dueInMinutes: -12,
      history: [{ label: "Order received", by: "EHR", at: "9:02 AM" }],
    },
    {
      id: "RX-4822",
      medication: "Vancomycin 1 g IV in 250 mls 0.9% Sodium Chloride",
      patientName: "Maria Alvarez",
      mrn: "20984113",
      hazard: "NHD",
      prn: false,
      priority: "routine",
      lane: "first_dose",
      status: "new",
      cleanroomId: "nhd-b",
      rph: null,
      tech: null,
      components: vancomycinComponents(),
      dueInMinutes: 38,
      history: [{ label: "Order received", by: "EHR", at: "9:05 AM" }],
    },
    {
      id: "RX-4823",
      medication: "Cyclophosphamide 1.2 g IV in 500 mls 0.9% Sodium Chloride",
      patientName: "Devon Pierce",
      mrn: "33120876",
      hazard: "HD",
      prn: false,
      priority: "routine",
      lane: "compounding",
      status: "new",
      cleanroomId: "hd-a",
      rph: null,
      tech: null,
      components: oxaliplatinComponents(),
      dueInMinutes: 64,
      history: [{ label: "Order received", by: "EHR", at: "9:11 AM" }],
    },
    {
      id: "RX-4824",
      medication: "Piperacillin-Tazobactam 3.375 g IV in 100 mls 0.9% NaCl",
      patientName: "Aisha Khan",
      mrn: "41507992",
      hazard: "NHD",
      prn: false,
      priority: "routine",
      lane: "preparation",
      status: "new",
      cleanroomId: "nhd-b",
      rph: null,
      tech: null,
      components: vancomycinComponents(),
      dueInMinutes: 95,
      history: [{ label: "Order received", by: "EHR", at: "9:18 AM" }],
    },
    {
      id: "RX-4810",
      medication: "Carboplatin 450 mg IV in 250 mls 5% Dextrose in Water",
      patientName: "Robert Chen",
      mrn: "18820445",
      hazard: "HD",
      prn: false,
      priority: "stat",
      lane: "compounding",
      status: "in_progress",
      cleanroomId: "hd-a",
      rph: "K. Osei, PharmD",
      tech: "L. Romero, CPhT",
      components: oxaliplatinComponents().map((c, i) =>
        i === 0 ? { ...c, photos: 1 } : c
      ),
      dueInMinutes: 22,
      history: [
        { label: "Order received", by: "EHR", at: "8:40 AM" },
        { label: "Compounding started", by: "L. Romero, CPhT", at: "8:51 AM" },
      ],
    },
    {
      id: "RX-4808",
      medication: "Doxorubicin 70 mg IV in 250 mls 0.9% Sodium Chloride",
      patientName: "Priya Nadeem",
      mrn: "29447180",
      hazard: "HD",
      prn: false,
      priority: "routine",
      lane: "compounding",
      status: "in_review",
      cleanroomId: "hd-a",
      rph: "K. Osei, PharmD",
      tech: "L. Romero, CPhT",
      components: oxaliplatinComponents().map((c) => ({ ...c, photos: 1 })),
      dueInMinutes: 9,
      history: [
        { label: "Order received", by: "EHR", at: "8:20 AM" },
        { label: "Compounding started", by: "L. Romero, CPhT", at: "8:33 AM" },
        { label: "Submitted for verification", by: "L. Romero, CPhT", at: "8:58 AM" },
      ],
    },
  ];
}

"use client";

import { create } from "zustand";
import type { Role, Session, Ticket } from "./types";
import { makeInitialTickets } from "./data";

const NOW = "9:41 AM";

interface AstroState {
  session: Session;
  tickets: Ticket[];

  login: (role: Role, name: string) => void;
  switchRole: (role: Role) => void;
  logout: () => void;
  joinCleanroom: (cleanroomId: string) => void;
  leaveCleanroom: () => void;

  startCompounding: (ticketId: string) => void;
  capturePhoto: (ticketId: string, componentId: string) => void;
  submitForReview: (ticketId: string) => void;
  approve: (ticketId: string) => void;
  reject: (ticketId: string, reason: string) => void;

  resetDemo: () => void;
}

const DEFAULT_NAMES: Record<Role, string> = {
  RPH: "K. Osei, PharmD",
  TECH: "L. Romero, CPhT",
};

export const useAstro = create<AstroState>((set) => ({
  session: { role: null, name: null, cleanroomId: null },
  tickets: makeInitialTickets(),

  login: (role) =>
    set({ session: { role, name: DEFAULT_NAMES[role], cleanroomId: null } }),

  // Switch perspective without leaving the current cleanroom — lets a single
  // viewer drive both sides of the verification loop.
  switchRole: (role) =>
    set((s) => ({
      session: { ...s.session, role, name: DEFAULT_NAMES[role] },
    })),

  logout: () => set({ session: { role: null, name: null, cleanroomId: null } }),

  joinCleanroom: (cleanroomId) =>
    set((s) => ({ session: { ...s.session, cleanroomId } })),

  leaveCleanroom: () =>
    set((s) => ({ session: { ...s.session, cleanroomId: null } })),

  startCompounding: (ticketId) =>
    set((s) => ({
      tickets: s.tickets.map((t) =>
        t.id === ticketId
          ? {
              ...t,
              status: "in_progress",
              tech: t.tech ?? s.session.name,
              rejectionReason: undefined,
              history: [
                ...t.history,
                {
                  label:
                    t.status === "rejected"
                      ? "Re-work started"
                      : "Compounding started",
                  by: s.session.name ?? "Technician",
                  at: NOW,
                },
              ],
            }
          : t
      ),
    })),

  capturePhoto: (ticketId, componentId) =>
    set((s) => ({
      tickets: s.tickets.map((t) =>
        t.id === ticketId
          ? {
              ...t,
              components: t.components.map((c) =>
                c.id === componentId
                  ? { ...c, photos: Math.min(c.photos + 1, c.photosRequired + 2) }
                  : c
              ),
            }
          : t
      ),
    })),

  submitForReview: (ticketId) =>
    set((s) => ({
      tickets: s.tickets.map((t) =>
        t.id === ticketId
          ? {
              ...t,
              status: "in_review",
              history: [
                ...t.history,
                {
                  label: "Submitted for verification",
                  by: s.session.name ?? "Technician",
                  at: NOW,
                },
              ],
            }
          : t
      ),
    })),

  approve: (ticketId) =>
    set((s) => ({
      tickets: s.tickets.map((t) =>
        t.id === ticketId
          ? {
              ...t,
              status: "approved",
              rph: t.rph ?? s.session.name,
              history: [
                ...t.history,
                {
                  label: "Verified & released",
                  by: s.session.name ?? "Pharmacist",
                  at: NOW,
                },
              ],
            }
          : t
      ),
    })),

  reject: (ticketId, reason) =>
    set((s) => ({
      tickets: s.tickets.map((t) =>
        t.id === ticketId
          ? {
              ...t,
              status: "rejected",
              rph: t.rph ?? s.session.name,
              rejectionReason: reason,
              history: [
                ...t.history,
                {
                  label: `Rejected — ${reason}`,
                  by: s.session.name ?? "Pharmacist",
                  at: NOW,
                },
              ],
            }
          : t
      ),
    })),

  resetDemo: () =>
    set({
      session: { role: null, name: null, cleanroomId: null },
      tickets: makeInitialTickets(),
    }),
}));

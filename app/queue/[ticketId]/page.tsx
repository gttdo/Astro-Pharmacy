"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Plus,
  Camera,
  Check,
  Trash2,
  CircleAlert,
  CheckCircle2,
  ArrowLeftRight,
} from "lucide-react";
import { AppChrome } from "@/components/AppChrome";
import { Chip, HazardChip } from "@/components/Chip";
import { useAstro } from "@/lib/store";
import type { Component, Ticket } from "@/lib/types";

const TABS = ["Preparation", "Measurement", "Compounding"] as const;
type Tab = (typeof TABS)[number];

export default function WorksheetPage() {
  const { ticketId } = useParams<{ ticketId: string }>();
  const router = useRouter();
  const ticket = useAstro((s) => s.tickets.find((t) => t.id === ticketId));
  const role = useAstro((s) => s.session.role);
  const {
    startCompounding,
    capturePhoto,
    submitForReview,
    approve,
    reject,
    switchRole,
  } = useAstro();

  const [tab, setTab] = useState<Tab>("Preparation");
  const [rejecting, setRejecting] = useState(false);

  if (!ticket) {
    return (
      <AppChrome title="Worksheet" back="/queue">
        <p className="mt-10 text-center text-sm text-muted">Ticket not found.</p>
      </AppChrome>
    );
  }

  const isTech = role === "TECH";
  const editable = isTech && (ticket.status === "in_progress" || ticket.status === "rejected");
  const allDocumented = ticket.components.every((c) => c.photos >= c.photosRequired);

  return (
    <AppChrome title="Worksheet" back="/queue">
      {/* Order header */}
      <div className="rounded-card border border-line p-4">
        <h2 className="text-lg font-bold leading-snug text-ink">
          {ticket.medication}
        </h2>
        <div className="mt-2 flex flex-wrap gap-1.5">
          <HazardChip hazard={ticket.hazard} />
          {ticket.prn && <Chip tone="prn">PRN</Chip>}
          {ticket.priority === "stat" && <Chip tone="danger">STAT</Chip>}
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
          <Field label="Patient Name" value={ticket.patientName} />
          <Field label="MRN" value={ticket.mrn} />
        </div>
      </div>

      {ticket.status === "rejected" && (
        <Banner tone="danger" icon={<CircleAlert size={18} />}>
          <span className="font-semibold">Rejected by pharmacist.</span>{" "}
          {ticket.rejectionReason} — correct and resubmit.
        </Banner>
      )}
      {ticket.status === "approved" && (
        <Banner tone="success" icon={<CheckCircle2 size={18} />}>
          <span className="font-semibold">Verified &amp; released.</span> This
          preparation passed pharmacist verification.
        </Banner>
      )}

      {/* Tabs */}
      <div className="mt-5 flex gap-6 border-b border-line">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`-mb-px border-b-2 pb-2 text-sm font-medium transition-colors ${
              tab === t
                ? "border-primary text-primary"
                : "border-transparent text-muted hover:text-ink"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="mt-4">
        {tab === "Preparation" && (
          <div className="flex flex-col gap-3">
            {ticket.components.map((c) => (
              <ComponentCard
                key={c.id}
                component={c}
                editable={editable}
                onCapture={() => capturePhoto(ticket.id, c.id)}
              />
            ))}
          </div>
        )}
        {tab === "Measurement" && <Measurement ticket={ticket} />}
        {tab === "Compounding" && <Compounding ticket={ticket} />}
      </div>

      {/* Activity timeline */}
      <div className="mt-6">
        <h3 className="mb-2 text-sm font-semibold text-ink">Activity</h3>
        <ol className="space-y-2 border-l border-line pl-4">
          {ticket.history.map((h, i) => (
            <li key={i} className="relative text-xs">
              <span className="absolute -left-[21px] top-1 h-2 w-2 rounded-full bg-primary" />
              <span className="text-ink">{h.label}</span>
              <span className="text-faint">
                {" "}
                · {h.by} · {h.at}
              </span>
            </li>
          ))}
        </ol>
      </div>

      {/* Role-aware action bar */}
      <ActionBar
        ticket={ticket}
        role={role}
        allDocumented={allDocumented}
        onStart={() => startCompounding(ticket.id)}
        onSubmit={() => submitForReview(ticket.id)}
        onApprove={() => {
          approve(ticket.id);
        }}
        onReject={() => setRejecting(true)}
        onSwitch={(r) => switchRole(r)}
        onDone={() => router.push("/queue")}
      />

      {rejecting && (
        <RejectModal
          onCancel={() => setRejecting(false)}
          onConfirm={(reason) => {
            reject(ticket.id, reason);
            setRejecting(false);
          }}
        />
      )}
    </AppChrome>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs text-muted">{label}</div>
      <div className="mt-0.5 font-medium text-ink">{value}</div>
    </div>
  );
}

function Banner({
  tone,
  icon,
  children,
}: {
  tone: "danger" | "success";
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  const cls =
    tone === "danger"
      ? "bg-danger-tint text-danger"
      : "bg-green-tint text-green";
  return (
    <div className={`mt-3 flex items-start gap-2 rounded-card p-3 text-sm ${cls}`}>
      <span className="mt-0.5 shrink-0">{icon}</span>
      <p>{children}</p>
    </div>
  );
}

function ComponentCard({
  component: c,
  editable,
  onCapture,
}: {
  component: Component;
  editable: boolean;
  onCapture: () => void;
}) {
  const satisfied = c.photos >= c.photosRequired;
  const slots = Math.max(c.photosRequired, c.photos) + (editable ? 1 : 0);

  return (
    <div className="rounded-card border border-line p-4">
      <div className="flex items-start justify-between">
        <div className="font-semibold text-ink">{c.name}</div>
        {editable && <Trash2 size={16} className="text-faint" />}
      </div>
      <div className="mt-3 grid grid-cols-3 gap-x-3 gap-y-3 text-sm">
        <Meta label="Dose" value={c.dose} />
        <Meta label="NDC" value={c.ndc} />
        <Meta label="Expiration" value={c.expiration} />
        {c.kit && <Meta label="Kit #" value={c.kit} />}
        <Meta label="Lot #" value={c.lot} />
        <Meta label="Manufacturer" value={c.manufacturer} />
      </div>

      <div className="mt-3 flex items-center justify-between">
        <span className="text-xs text-muted">Photos</span>
        <span
          className={`flex items-center gap-1 text-xs font-medium ${
            satisfied ? "text-green" : "text-faint"
          }`}
        >
          {satisfied && <Check size={13} />}
          {c.photos} of {c.photosRequired} required
        </span>
      </div>
      <div className="mt-2 flex gap-2">
        {Array.from({ length: slots }).map((_, i) =>
          i < c.photos ? (
            <div
              key={i}
              className="grid h-14 w-14 place-items-center rounded-lg border border-line bg-canvas text-primary"
            >
              <Camera size={18} />
            </div>
          ) : editable ? (
            <button
              key={i}
              onClick={onCapture}
              className="grid h-14 w-14 place-items-center rounded-lg border border-dashed border-primary/50 text-primary transition-colors hover:bg-primary-tint"
              aria-label="Capture photo"
            >
              <Plus size={18} />
            </button>
          ) : (
            <div
              key={i}
              className="grid h-14 w-14 place-items-center rounded-lg border border-dashed border-line text-faint"
            >
              <Camera size={16} />
            </div>
          )
        )}
      </div>
    </div>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs text-muted">{label}</div>
      <div className="mt-0.5 text-ink">{value}</div>
    </div>
  );
}

function Measurement({ ticket }: { ticket: Ticket }) {
  return (
    <div className="overflow-hidden rounded-card border border-line">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-canvas text-left text-xs text-muted">
            <th className="px-4 py-2 font-medium">Component</th>
            <th className="px-4 py-2 font-medium">Ordered</th>
            <th className="px-4 py-2 font-medium">Measured</th>
            <th className="px-4 py-2 font-medium"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {ticket.components.map((c) => (
            <tr key={c.id}>
              <td className="px-4 py-3 text-ink">{c.name}</td>
              <td className="px-4 py-3 text-muted">{c.dose}</td>
              <td className="px-4 py-3 text-ink">{c.dose}</td>
              <td className="px-4 py-3 text-green">
                <Check size={15} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Compounding({ ticket }: { ticket: Ticket }) {
  return (
    <div className="rounded-card border border-line p-4 text-sm">
      <div className="mb-3 font-semibold text-ink">Final preparation</div>
      <p className="text-muted">{ticket.medication}</p>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <Field label="Route" value="IV infusion" />
        <Field
          label="Final volume"
          value={ticket.components.find((c) => c.kind === "diluent")?.dose ?? "—"}
        />
      </div>
      <div className="mt-4">
        <div className="text-xs text-muted">Notes to pharmacy</div>
        <p className="mt-1 rounded-lg bg-canvas p-3 text-ink">
          Protect from light. Deliver to oncology infusion within 2 hours of
          release.
        </p>
      </div>
    </div>
  );
}

function ActionBar({
  ticket,
  role,
  allDocumented,
  onStart,
  onSubmit,
  onApprove,
  onReject,
  onSwitch,
  onDone,
}: {
  ticket: Ticket;
  role: "RPH" | "TECH" | null;
  allDocumented: boolean;
  onStart: () => void;
  onSubmit: () => void;
  onApprove: () => void;
  onReject: () => void;
  onSwitch: (r: "RPH" | "TECH") => void;
  onDone: () => void;
}) {
  const isTech = role === "TECH";

  const primaryBtn =
    "flex-1 rounded-lg bg-primary py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-40";
  const ghostBtn =
    "flex items-center justify-center gap-1.5 rounded-lg border border-line py-3 text-sm font-medium text-muted transition-colors hover:bg-canvas";

  let content: React.ReactNode = null;

  if (ticket.status === "new") {
    content = isTech ? (
      <button onClick={onStart} className={primaryBtn}>
        Start compounding
      </button>
    ) : (
      <Waiting
        text="Awaiting a technician to begin compounding."
        cta="Compound as Technician"
        onClick={() => onSwitch("TECH")}
      />
    );
  } else if (ticket.status === "in_progress" || ticket.status === "rejected") {
    content = isTech ? (
      <button onClick={onSubmit} disabled={!allDocumented} className={primaryBtn}>
        {allDocumented ? "Submit for verification" : "Document all components to submit"}
      </button>
    ) : (
      <Waiting
        text="A technician is compounding this preparation."
        cta="Compound as Technician"
        onClick={() => onSwitch("TECH")}
      />
    );
  } else if (ticket.status === "in_review") {
    content = !isTech ? (
      <>
        <button onClick={onReject} className="flex-1 rounded-lg border border-danger py-3 text-sm font-semibold text-danger transition-colors hover:bg-danger-tint">
          Reject
        </button>
        <button onClick={onApprove} className={primaryBtn}>
          Approve
        </button>
      </>
    ) : (
      <Waiting
        text="Submitted — awaiting pharmacist verification."
        cta="Verify as Pharmacist"
        onClick={() => onSwitch("RPH")}
      />
    );
  } else if (ticket.status === "approved") {
    content = (
      <button onClick={onDone} className={ghostBtn + " w-full"}>
        Back to queue
      </button>
    );
  }

  return (
    <div className="sticky bottom-0 -mx-5 mt-6 flex gap-3 border-t border-line bg-surface/95 px-5 py-3 backdrop-blur">
      {content}
    </div>
  );
}

function Waiting({
  text,
  cta,
  onClick,
}: {
  text: string;
  cta: string;
  onClick: () => void;
}) {
  return (
    <div className="flex w-full flex-col gap-2">
      <p className="text-center text-xs text-muted">{text}</p>
      <button
        onClick={onClick}
        className="flex items-center justify-center gap-1.5 rounded-lg bg-primary-tint py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary-tint/70"
      >
        <ArrowLeftRight size={15} />
        {cta}
      </button>
    </div>
  );
}

function RejectModal({
  onCancel,
  onConfirm,
}: {
  onCancel: () => void;
  onConfirm: (reason: string) => void;
}) {
  const REASONS = [
    "Wrong diluent volume",
    "Photo unclear / missing label",
    "Lot # mismatch",
    "Expired component",
  ];
  const [reason, setReason] = useState("");

  return (
    <div className="absolute inset-0 z-50 flex items-end justify-center bg-black/40 p-4 sm:items-center">
      <div className="w-full max-w-sm rounded-2xl bg-surface p-5 shadow-xl">
        <h3 className="text-lg font-semibold text-ink">Reject preparation</h3>
        <p className="mt-1 text-sm text-muted">
          Select a reason. The ticket returns to the technician to correct.
        </p>
        <div className="mt-4 flex flex-col gap-2">
          {REASONS.map((r) => (
            <button
              key={r}
              onClick={() => setReason(r)}
              className={`rounded-lg border px-3 py-2.5 text-left text-sm transition-colors ${
                reason === r
                  ? "border-danger bg-danger-tint text-danger"
                  : "border-line text-ink hover:bg-canvas"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
        <div className="mt-5 flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 rounded-lg border border-line py-2.5 text-sm font-medium text-muted hover:bg-canvas"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(reason)}
            disabled={!reason}
            className="flex-1 rounded-lg bg-danger py-2.5 text-sm font-semibold text-white disabled:opacity-40"
          >
            Reject &amp; return
          </button>
        </div>
      </div>
    </div>
  );
}

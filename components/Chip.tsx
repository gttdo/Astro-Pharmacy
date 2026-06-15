import type { Hazard, Status } from "@/lib/types";

const TONE: Record<string, string> = {
  hazard: "bg-hazard-tint text-hazard",
  nonhazard: "bg-nonhazard-tint text-nonhazard",
  prn: "bg-prn-tint text-prn",
  danger: "bg-danger-tint text-danger",
  primary: "bg-primary-tint text-primary",
  success: "bg-green-tint text-green",
  muted: "bg-canvas text-muted",
};

export function Chip({
  children,
  tone = "muted",
  className = "",
}: {
  children: React.ReactNode;
  tone?: keyof typeof TONE;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ${TONE[tone]} ${className}`}
    >
      {children}
    </span>
  );
}

export function HazardChip({ hazard }: { hazard: Hazard }) {
  return hazard === "HD" ? (
    <Chip tone="hazard">Hazardous</Chip>
  ) : (
    <Chip tone="nonhazard">Non-Hazardous</Chip>
  );
}

const STATUS_LABEL: Record<Status, { label: string; tone: keyof typeof TONE }> = {
  new: { label: "New", tone: "muted" },
  in_progress: { label: "Compounding", tone: "primary" },
  in_review: { label: "In Review", tone: "primary" },
  approved: { label: "Verified", tone: "success" },
  rejected: { label: "Rejected", tone: "danger" },
};

export function StatusChip({ status }: { status: Status }) {
  const s = STATUS_LABEL[status];
  return <Chip tone={s.tone}>{s.label}</Chip>;
}

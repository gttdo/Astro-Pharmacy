function initials(name: string) {
  const words = name.replace(/,.*$/, "").split(/[\s.]+/).filter(Boolean);
  const first = words[0]?.[0] ?? "";
  const last = words.length > 1 ? words[words.length - 1][0] : "";
  return (first + last).toUpperCase() || "?";
}

/** Small ownership chip. `role` tints it; null name renders an "unassigned" slot. */
export function Avatar({
  name,
  role,
}: {
  name: string | null;
  role: "RPH" | "TECH";
}) {
  const tint =
    role === "RPH"
      ? "bg-primary-tint text-primary"
      : "bg-green-tint text-green";

  if (!name) {
    return (
      <span
        title={`${role === "RPH" ? "Pharmacist" : "Technician"} — unassigned`}
        className="grid h-6 w-6 place-items-center rounded-full border border-dashed border-line text-[10px] text-faint"
      >
        {role === "RPH" ? "Rx" : "T"}
      </span>
    );
  }

  return (
    <span
      title={`${role === "RPH" ? "Pharmacist" : "Technician"}: ${name}`}
      className={`grid h-6 w-6 place-items-center rounded-full text-[10px] font-semibold ${tint}`}
    >
      {initials(name)}
    </span>
  );
}

export default function OwnerBadge({ name }) {
  const parts = name.trim().split(/\s+/);
  const initials = (parts[0][0]+(parts.length>1?parts.at(-1)[0]:'')).toUpperCase();
  return <span className="inline-flex items-center gap-2 text-sm text-ink-muted">
    <span aria-hidden="true" className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-ink-primary">{initials}</span>
    <span><span className="sr-only">Assigned to </span>{name}</span>
  </span>;
}

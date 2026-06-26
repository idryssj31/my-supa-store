export function buildTrigram(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);

  if (parts.length === 0) {
    return "???";
  }

  if (parts.length === 1) {
    return parts[0].slice(0, 3).toUpperCase().padEnd(3, "X");
  }

  return parts
    .slice(0, 3)
    .map((part) => part[0]?.toUpperCase() ?? "X")
    .join("")
    .padEnd(3, "X")
    .slice(0, 3);
}

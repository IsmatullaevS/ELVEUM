export function getInitials(fullName?: string): string {
  if (!fullName) return "??";
  const cleaned = fullName
    .replace(/[\s\u00A0]+/g, " ")
    .replace(/[^\p{L}\p{N}\s'-]/gu, "")
    .trim();
  if (!cleaned) return "??";
  const parts = cleaned.split(" ").filter(Boolean);
  if (parts.length === 1) {
    const a = parts[0].charAt(0);
    const b = parts[0].slice(1).charAt(0);
    return (a + (b || "")).toUpperCase();
  }
  const first = parts[0].charAt(0);
  const last = parts[parts.length - 1].charAt(0);
  return (first + last).toUpperCase();
}
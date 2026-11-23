const PREFIX_UNITS = new Set(["€", "$", "£"]);
const TIGHT_SUFFIX = new Set(["%", "×", "x", "s", "ms"]);

/** Format a number exactly to the precision given. Never rounds further. */
export function formatNumber(value: number, precision = 0, signed = false) {
  const abs = new Intl.NumberFormat("en-GB", {
    minimumFractionDigits: precision,
    maximumFractionDigits: precision,
  }).format(Math.abs(value));
  const sign = value < 0 ? "−" : signed && value > 0 ? "+" : "";
  return sign + abs;
}

export function formatMetric(
  value: number,
  unit: string,
  precision = 0,
  signed = false,
) {
  const n = formatNumber(value, precision, signed);
  if (PREFIX_UNITS.has(unit)) {
    // keep the sign before the currency symbol: +€1,200
    const sign = /^[+−]/.test(n) ? n[0] : "";
    return `${sign}${unit}${sign ? n.slice(1) : n}`;
  }
  if (TIGHT_SUFFIX.has(unit)) return `${n}${unit}`;
  return `${n} ${unit}`;
}

export function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

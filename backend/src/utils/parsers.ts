export function parseJsonArray(value: unknown): unknown[] {
  if (!value || typeof value !== "string") return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function parseOptionalJsonArrayString(value: unknown): string {
  if (typeof value !== "string" || value.trim() === "") return "[]";
  try {
    const parsed = JSON.parse(value);
    if (Array.isArray(parsed)) return JSON.stringify(parsed);
  } catch {
    const items = value
      .split(/[\r\n,]+/)
      .map((item) => item.trim())
      .filter(Boolean);
    return JSON.stringify(items);
  }
  return "[]";
}

/**
 * Splits free-text lines into an array (layover itinerary/includes textareas).
 * Unlike parseOptionalJsonArrayString this never splits on commas, so copy such
 * as "Mercato with a chef, then a spice-market tasting" stays a single line.
 * JSON array strings are accepted as-is when they parse to an array of strings.
 */
export function parseLineList(value: unknown): string[] {
  if (value === null || value === undefined) return [];
  if (typeof value !== "string") return [];
  const trimmed = value.trim();
  if (trimmed === "") return [];
  if (trimmed.startsWith("[")) {
    try {
      const parsed: unknown = JSON.parse(trimmed);
      if (Array.isArray(parsed) && parsed.every((item) => typeof item === "string")) {
        return parsed;
      }
    } catch {
      // fall through to newline split
    }
  }
  return value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
}

export function parseCategoryIds(value: unknown): number[] {
  if (Array.isArray(value)) return value.map(Number).filter(Number.isInteger);
  if (typeof value === "string" && value.trim()) {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) return parsed.map(Number).filter(Number.isInteger);
    } catch {
      return value.split(",").map(Number).filter(Number.isInteger);
    }
  }
  return [];
}

export function toNumber(value: unknown): number | null {
  if (value === null || value === undefined || value === "") return null;
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : null;
}

export function toBoolean(value: unknown): boolean {
  return value === true || value === "true" || value === "1" || value === "on" || value === 1;
}
export interface Rgba {
  r: number;
  g: number;
  b: number;
  a: number;
}

function parseAlpha(value: string): number | null {
  const normalized = value.trim();
  const parsed = normalized.endsWith("%")
    ? Number.parseFloat(normalized.slice(0, -1)) / 100
    : Number.parseFloat(normalized);
  if (!Number.isFinite(parsed) || parsed < 0 || parsed > 1) return null;
  return parsed;
}

function parseChannel(value: string): number | null {
  const normalized = value.trim();
  if (normalized.endsWith("%")) {
    const percentage = Number.parseFloat(normalized.slice(0, -1));
    if (!Number.isFinite(percentage) || percentage < 0 || percentage > 100) return null;
    return Math.round((percentage / 100) * 255);
  }
  const channel = Number.parseFloat(normalized);
  if (!Number.isFinite(channel) || channel < 0 || channel > 255) return null;
  return Math.round(channel);
}

/**
 * Parses 3, 4, 6 and 8 digit hex plus rgb()/rgba() with numbers, percentages
 * or a slash alpha. Returns null for anything else.
 */
export function parseColor(input: string): Rgba | null {
  const value = input.trim().toLowerCase();
  if (!value) return null;

  const hex = /^#?([0-9a-f]{3,8})$/.exec(value);
  if (hex) {
    let digits = hex[1];
    if (![3, 4, 6, 8].includes(digits.length)) return null;
    if (digits.length === 3 || digits.length === 4) {
      digits = [...digits].map((digit) => digit + digit).join("");
    }
    const r = Number.parseInt(digits.slice(0, 2), 16);
    const g = Number.parseInt(digits.slice(2, 4), 16);
    const b = Number.parseInt(digits.slice(4, 6), 16);
    const a = digits.length === 8 ? Number.parseInt(digits.slice(6, 8), 16) / 255 : 1;
    return { r, g, b, a };
  }

  const rgb = /^rgba?\(([^)]+)\)$/.exec(value);
  if (rgb) {
    const parts = rgb[1].split(/[\s,/]+/).filter(Boolean);
    if (parts.length !== 3 && parts.length !== 4) return null;
    const [r, g, b] = parts.slice(0, 3).map(parseChannel);
    if (r === null || g === null || b === null) return null;
    const a = parts.length === 4 ? parseAlpha(parts[3]) : 1;
    if (a === null) return null;
    return { r, g, b, a };
  }

  return null;
}

export function toHex({ r, g, b, a }: Rgba): string {
  const base = [r, g, b].map((channel) => channel.toString(16).padStart(2, "0")).join("");
  return `#${base}${a < 1 ? Math.round(a * 255).toString(16).padStart(2, "0") : ""}`;
}

export function toOpaqueHex({ r, g, b }: Rgba): string {
  return `#${[r, g, b].map((channel) => channel.toString(16).padStart(2, "0")).join("")}`;
}

export function toRgbaCss({ r, g, b, a }: Rgba): string {
  return a < 1 ? `rgba(${r}, ${g}, ${b}, ${Number(a.toFixed(3))})` : `rgb(${r}, ${g}, ${b})`;
}

export function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  const red = r / 255;
  const green = g / 255;
  const blue = b / 255;
  const max = Math.max(red, green, blue);
  const min = Math.min(red, green, blue);
  const l = (max + min) / 2;
  let h = 0;
  let s = 0;

  if (max !== min) {
    const delta = max - min;
    s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min);
    switch (max) {
      case red:
        h = (green - blue) / delta + (green < blue ? 6 : 0);
        break;
      case green:
        h = (blue - red) / delta + 2;
        break;
      default:
        h = (red - green) / delta + 4;
        break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

export function toHslCss(color: Rgba): string {
  const { h, s, l } = rgbToHsl(color.r, color.g, color.b);
  return `hsl(${h}, ${s}%, ${l}%)`;
}

export function relativeLuminance({ r, g, b }: Rgba): number {
  const [red, green, blue] = [r, g, b].map((channel) => {
    const value = channel / 255;
    return value <= 0.03928 ? value / 12.92 : Math.pow((value + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
}

export function contrastRatio(first: Rgba, second: Rgba): number {
  const firstLuminance = relativeLuminance(first);
  const secondLuminance = relativeLuminance(second);
  const lighter = Math.max(firstLuminance, secondLuminance);
  const darker = Math.min(firstLuminance, secondLuminance);
  return (lighter + 0.05) / (darker + 0.05);
}

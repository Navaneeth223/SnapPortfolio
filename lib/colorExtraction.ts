import Vibrant from 'node-vibrant';

export async function extractColorFromAvatar(
  avatarUrl: string
): Promise<string> {
  try {
    const palette = await Vibrant.from(avatarUrl).getPalette();

    // Priority: Vibrant > DarkVibrant > Muted > LightVibrant
    const color =
      palette.Vibrant?.hex ||
      palette.DarkVibrant?.hex ||
      palette.Muted?.hex ||
      palette.LightVibrant?.hex ||
      '#FF5A1F'; // Fallback to Signal Orange

    // Validate contrast ratio
    if (isAccessibleColor(color)) {
      return color;
    }

    // If color fails accessibility, darken/lighten it
    return adjustColorForAccessibility(color);
  } catch (error) {
    console.error('Error extracting color:', error);
    return '#FF5A1F'; // Fallback
  }
}

function isAccessibleColor(hex: string): boolean {
  // Check contrast ratio against white background
  const contrastWithWhite = getContrastRatio(hex, '#FFFFFF');
  return contrastWithWhite >= 3; // WCAG AA for large text
}

function getContrastRatio(color1: string, color2: string): number {
  const lum1 = getLuminance(color1);
  const lum2 = getLuminance(color2);

  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);

  return (lighter + 0.05) / (darker + 0.05);
}

function getLuminance(hex: string): number {
  const rgb = hexToRgb(hex);
  if (!rgb) return 0;

  const [r, g, b] = [rgb.r, rgb.g, rgb.b].map((val) => {
    val /= 255;
    return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

function adjustColorForAccessibility(hex: string): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return '#FF5A1F';

  // Darken the color by reducing brightness
  const factor = 0.7;
  const adjusted = {
    r: Math.round(rgb.r * factor),
    g: Math.round(rgb.g * factor),
    b: Math.round(rgb.b * factor),
  };

  return `#${adjusted.r.toString(16).padStart(2, '0')}${adjusted.g.toString(16).padStart(2, '0')}${adjusted.b.toString(16).padStart(2, '0')}`;
}

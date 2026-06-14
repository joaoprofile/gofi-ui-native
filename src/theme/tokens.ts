/**
 * GOFI Design Tokens — React Native form.
 * Values come from the single source (knowledge/ui/design-tokens.md).
 * Web ships these as CSS variables; here they are a typed TS object.
 *
 * Brand is configurable: the docs let you switch between 3 live brands
 * (Blue #AAD7FF default, Violet, Green) + dark mode. A real project picks its
 * own brand on bootstrap (see the brand override protocol in the spec).
 */

export const palette = {
  primary: {
    50: '#F0F7FF', 100: '#DCEDFF', 200: '#AAD7FF', 300: '#7FC0FF', 400: '#54A8FF',
    500: '#2E90FA', 600: '#1B72D8', 700: '#1259AE', 800: '#0E4585', 900: '#0B2942',
  },
  secondary: {
    100: '#E0E3FF', 200: '#C3C9FF', 500: '#6172F3', 600: '#444CE7', 700: '#3538CD', 900: '#2D31A6',
  },
  gray: {
    50: '#F9FAFB', 100: '#F2F4F7', 200: '#EAECF0', 300: '#D0D5DD', 400: '#98A2B3',
    500: '#667085', 600: '#475467', 700: '#344054', 800: '#1D2939', 900: '#0C111D',
  },
  white: '#FFFFFF',
  success: '#12B76A', successBg: '#ECFDF3',
  warning: '#F79009', warningBg: '#FFFAEB',
  danger: '#F04438', dangerBg: '#FEF3F2',
  info: '#2E90FA', infoBg: '#EFF8FF',
} as const;

/** Static scales — identical across brands and themes. */
export const base = {
  space: { 0: 0, 1: 4, 2: 8, 3: 12, 4: 16, 5: 20, 6: 24, 8: 32, 10: 40, 12: 48, 16: 64 },
  radius: { sm: 8, md: 12, lg: 16, xl: 24, pill: 999 },
  motion: { fast: 100, base: 200, slow: 300 },
  font: {
    display: { size: 34, line: 42, weight: '700' as const },
    h1: { size: 28, line: 36, weight: '700' as const },
    h2: { size: 22, line: 30, weight: '600' as const },
    h3: { size: 18, line: 26, weight: '600' as const },
    body: { size: 16, line: 24, weight: '400' as const },
    bodySm: { size: 14, line: 20, weight: '400' as const },
    caption: { size: 12, line: 16, weight: '500' as const },
  },
} as const;

/** Soft, modern elevation via `boxShadow` (works on web + native; no deprecated shadow* props).
 *  Kept intentionally subtle — faithful to the reference, which is almost flat. */
export const shadow = {
  sm: { boxShadow: '0 1px 2px rgba(16,24,40,0.05)' },
  md: { boxShadow: '0 2px 8px rgba(16,24,40,0.06)' },
  lg: { boxShadow: '0 4px 16px rgba(16,24,40,0.08)' },
} as const;

export type ThemeMode = 'light' | 'dark';
export type BrandKey = 'blue' | 'violet' | 'green';

/**
 * Brand presets. Each is a LIGHT surface color (the dominant "bg-brand") with a
 * dark on-brand text, plus an `action` shade that passes AA over white.
 * By design: the brand is a surface, the action is the affordance.
 */
export const brands: Record<BrandKey, {
  label: string;
  brand: string;        // colorBrand — large surfaces
  onBrand: string;      // text/icon over the brand surface (navy/dark)
  action: string;       // affordance on white (AA)
  actionHover: string;
  actionDark: string;   // affordance on dark surfaces
  secondary: string;    // filled secondary accent (white text legible)
  secondaryDark: string;
}> = {
  blue:   { label: 'Blue',   brand: '#AAD7FF', onBrand: '#0B2942', action: '#1B72D8', actionHover: '#1259AE', actionDark: '#2E90FA', secondary: '#444CE7', secondaryDark: '#8098F9' },
  violet: { label: 'Violet', brand: '#C3C9FF', onBrand: '#2D31A6', action: '#444CE7', actionHover: '#3538CD', actionDark: '#8098F9', secondary: '#1B72D8', secondaryDark: '#54A8FF' },
  green:  { label: 'Green',  brand: '#A6F4C5', onBrand: '#054F31', action: '#099250', actionHover: '#087443', actionDark: '#3CCB7F', secondary: '#1B72D8', secondaryDark: '#54A8FF' },
};

/** Neutral surfaces/text — same for every brand, swap by mode. */
const neutral = {
  light: {
    surfacePage: palette.white,
    surfaceCard: palette.white,
    surfaceHover: palette.gray[100],
    surfaceSunken: palette.gray[100],
    surfaceBorder: palette.gray[200],
    textColor: palette.gray[900],
    textSecondary: palette.gray[500],
  },
  dark: {
    surfacePage: palette.gray[900],
    surfaceCard: '#161B26',
    surfaceHover: palette.gray[800],
    surfaceSunken: '#0C111D',
    surfaceBorder: palette.gray[700],
    textColor: palette.gray[50],
    textSecondary: palette.gray[400],
  },
} as const;

const status = {
  success: palette.success, successBg: palette.successBg, onSuccess: palette.white,
  warning: palette.warning, warningBg: palette.warningBg, onWarning: palette.gray[900],
  danger: palette.danger, dangerBg: palette.dangerBg, onDanger: palette.white,
  info: palette.info, infoBg: palette.infoBg, onInfo: palette.white,
} as const;

/** Build the full theme object for a given brand + mode. */
export function makeTheme(brandKey: BrandKey, mode: ThemeMode) {
  const b = brands[brandKey];
  const n = neutral[mode];
  const actionValue = mode === 'dark' ? b.actionDark : b.action;
  return {
    mode,
    brandKey,
    space: base.space,
    radius: base.radius,
    motion: base.motion,
    font: base.font,
    shadow,
    palette,
    ...n,
    ...status,
    colorBrand: b.brand,
    textOnBrand: b.onBrand,
    colorAction: actionValue,
    colorActionHover: mode === 'dark' ? b.action : b.actionHover,
    /** Delicate selection tint — the active color at low alpha. Use for
     *  selected/active states (tabs, chips, nav), never for primary affordances. */
    colorActionSubtle: `${actionValue}${mode === 'dark' ? '29' : '1F'}`,
    focusRing: actionValue,
    colorSecondary: mode === 'dark' ? b.secondaryDark : b.secondary,
    textOnSecondary: palette.white,
  };
}

export type Theme = ReturnType<typeof makeTheme>;

/** Default theme (Blue, light) — used when there is no ThemeProvider. */
export const defaultTheme = makeTheme('blue', 'light');

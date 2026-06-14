import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import { useColorScheme } from 'react-native';
import { makeTheme, defaultTheme, type BrandKey, type Theme, type ThemeMode } from './tokens';

interface ThemeContextValue {
  theme: Theme;
  mode: ThemeMode;
  brand: BrandKey;
  setBrand: (b: BrandKey) => void;
  setMode: (m: ThemeMode | null) => void;
  toggleMode: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export interface ThemeProviderProps {
  children: ReactNode;
  /** Force a brand (default 'blue' / #AAD7FF). */
  defaultBrand?: BrandKey;
  /** Force a mode; omit to follow the system color scheme. */
  defaultMode?: ThemeMode;
}

/**
 * Provides the GOFI theme. Holds the brand + mode; mode follows the system
 * color scheme unless overridden. Wrap your app root once.
 */
export function ThemeProvider({ children, defaultBrand = 'blue', defaultMode }: ThemeProviderProps) {
  const system = useColorScheme();
  const [brand, setBrand] = useState<BrandKey>(defaultBrand);
  const [override, setOverride] = useState<ThemeMode | null>(defaultMode ?? null);

  const mode: ThemeMode = override ?? (system === 'dark' ? 'dark' : 'light');
  const theme = useMemo(() => makeTheme(brand, mode), [brand, mode]);

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      mode,
      brand,
      setBrand,
      setMode: setOverride,
      toggleMode: () => setOverride(mode === 'dark' ? 'light' : 'dark'),
    }),
    [theme, mode, brand],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

/** Read the current theme object. Falls back to the default (Blue, light). */
export function useTheme(): Theme {
  return useContext(ThemeContext)?.theme ?? defaultTheme;
}

/** Read theme controls (brand/mode switch) — used by the docs top bar. */
export function useThemeControls(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useThemeControls must be used within <ThemeProvider>');
  return ctx;
}

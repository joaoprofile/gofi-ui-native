import { Text as RNText, type TextProps as RNTextProps } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import { base } from '../theme/tokens';

export type TextVariant = keyof typeof base.font;
export type TextColor = 'default' | 'secondary' | 'onBrand' | 'action' | 'danger' | 'inherit';

export interface TextProps extends RNTextProps {
  variant?: TextVariant;
  color?: TextColor;
}

/**
 * Typography primitive. Picks size/line/weight from the scale and color by
 * semantic role (never a raw hex). Respects Dynamic Type (allowFontScaling on).
 */
export function Text({ variant = 'body', color = 'default', style, maxFontSizeMultiplier = 1.6, ...rest }: TextProps) {
  const t = useTheme();
  const f = base.font[variant];

  const colorMap: Record<TextColor, string | undefined> = {
    default: t.textColor,
    secondary: t.textSecondary,
    onBrand: t.textOnBrand,
    action: t.colorAction,
    danger: t.danger,
    inherit: undefined,
  };

  const isHeading = variant === 'display' || variant === 'h1' || variant === 'h2' || variant === 'h3';

  return (
    <RNText
      accessibilityRole={isHeading ? 'header' : undefined}
      maxFontSizeMultiplier={maxFontSizeMultiplier}
      style={[{ fontSize: f.size, lineHeight: f.line, fontWeight: f.weight, color: colorMap[color] }, style]}
      {...rest}
    />
  );
}

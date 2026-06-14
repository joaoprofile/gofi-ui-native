import { type ReactNode } from 'react';
import { View, Pressable, type ViewStyle, type StyleProp } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';

export type CardVariant = 'default' | 'brand' | 'interactive' | 'outlined' | 'elevated';

export interface CardProps {
  variant?: CardVariant;
  onPress?: () => void;
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
  children: ReactNode;
}

/**
 * Grouping surface. The `brand` variant is the hero of mobile: it fills with the
 * dominant brand color (#AAD7FF) and uses navy on-brand text — never white.
 */
export function Card({ variant = 'default', onPress, accessibilityLabel, style, children }: CardProps) {
  const t = useTheme();

  const base: ViewStyle = {
    borderRadius: variant === 'brand' ? t.radius.xl : t.radius.lg,
    padding: t.space[5],
    gap: t.space[3],
  };

  const byVariant: ViewStyle =
    variant === 'brand'
      ? { backgroundColor: t.colorBrand }
      : variant === 'elevated'
        ? { backgroundColor: t.mode === 'dark' ? t.surfaceCard : '#F8F9FB' }
        : variant === 'outlined'
          ? { backgroundColor: t.surfaceCard, borderWidth: 1, borderColor: t.surfaceBorder }
          : { backgroundColor: t.surfaceCard, borderWidth: 1, borderColor: t.surfaceBorder, ...t.shadow.sm };

  if (variant === 'interactive' || onPress) {
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
        onPress={onPress}
        style={({ pressed }) => [base, byVariant, { opacity: pressed ? 0.92 : 1 }, style]}
      >
        {children}
      </Pressable>
    );
  }

  return <View style={[base, byVariant, style]}>{children}</View>;
}

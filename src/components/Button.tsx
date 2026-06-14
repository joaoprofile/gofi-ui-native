import { type ReactNode } from 'react';
import { Pressable, ActivityIndicator, View, type PressableProps, type ViewStyle } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import type { Theme } from '../theme/tokens';
import { Text } from './Text';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'brand';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends Omit<PressableProps, 'children' | 'style'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  full?: boolean;
  loading?: boolean;
  disabled?: boolean;
  iconStart?: ReactNode;
  iconEnd?: ReactNode;
  children: string;
}

const SIZES: Record<ButtonSize, { height: number; padX: number; font: 'body' | 'bodySm' }> = {
  sm: { height: 36, padX: 14, font: 'bodySm' },
  md: { height: 44, padX: 20, font: 'bodySm' },
  lg: { height: 52, padX: 24, font: 'body' },
};

function colors(t: Theme, v: ButtonVariant): { bg: string; fg: string; border?: string } {
  switch (v) {
    case 'primary': return { bg: t.colorAction, fg: '#FFFFFF' };
    case 'secondary': return { bg: 'transparent', fg: t.colorAction, border: t.colorAction };
    case 'ghost': return { bg: 'transparent', fg: t.textColor };
    case 'danger': return { bg: t.danger, fg: '#FFFFFF' };
    case 'brand': return { bg: t.colorBrand, fg: t.textOnBrand };
  }
}

/** Primary action is a filled PILL — faithful to the GOFI references. */
export function Button({
  variant = 'primary', size = 'md', full, loading, disabled, iconStart, iconEnd, children, ...rest
}: ButtonProps) {
  const t = useTheme();
  const s = SIZES[size];
  const c = colors(t, variant);
  const isDisabled = disabled || loading;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={children}
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      disabled={isDisabled}
      style={({ pressed }) => {
        const style: ViewStyle = {
          height: s.height,
          minHeight: 44,
          paddingHorizontal: s.padX,
          borderRadius: t.radius.pill,
          backgroundColor: c.bg,
          borderWidth: c.border ? 1 : 0,
          borderColor: c.border,
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          gap: t.space[2],
          alignSelf: full ? 'stretch' : 'flex-start',
          width: full ? '100%' : undefined,
          opacity: isDisabled ? 0.4 : pressed ? 0.85 : 1,
        };
        return style;
      }}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator size="small" color={c.fg} />
      ) : (
        <>
          {iconStart ? <View>{iconStart}</View> : null}
          <Text variant={s.font} color="inherit" style={{ color: c.fg, fontWeight: '600' }}>
            {children}
          </Text>
          {iconEnd ? <View>{iconEnd}</View> : null}
        </>
      )}
    </Pressable>
  );
}

export interface IconButtonProps extends Omit<PressableProps, 'children' | 'style'> {
  /** Required — describes the action for screen readers. */
  accessibilityLabel: string;
  variant?: 'ghost' | 'outline' | 'solid';
  children: ReactNode;
}

/** Icon-only action. `accessibilityLabel` is mandatory. Target ≥ 44pt. */
export function IconButton({ variant = 'ghost', children, accessibilityLabel, disabled, ...rest }: IconButtonProps) {
  const t = useTheme();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ disabled: !!disabled }}
      disabled={disabled}
      hitSlop={8}
      style={({ pressed }) => ({
        width: 44,
        height: 44,
        borderRadius: t.radius.pill,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: variant === 'solid' ? t.colorAction : pressed ? t.surfaceHover : 'transparent',
        borderWidth: variant === 'outline' ? 1 : 0,
        borderColor: t.surfaceBorder,
        opacity: disabled ? 0.4 : 1,
      })}
      {...rest}
    >
      {children}
    </Pressable>
  );
}

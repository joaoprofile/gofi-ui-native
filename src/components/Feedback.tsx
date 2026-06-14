import { useEffect, useRef } from 'react';
import { Animated, View, ActivityIndicator, Platform, type DimensionValue } from 'react-native';

const USE_NATIVE_DRIVER = Platform.OS !== 'web';
import { useTheme } from '../theme/ThemeProvider';
import { base } from '../theme/tokens';
import { useReduceMotion } from '../lib/useReduceMotion';

export interface SkeletonProps {
  width?: DimensionValue;
  height?: number;
  radius?: keyof typeof base.radius;
  /** Render N stacked text lines (the last one shorter). */
  lines?: number;
  /** Render a circle (uses `height` as the diameter) — e.g. an avatar placeholder. */
  circle?: boolean;
}

/** Loading placeholder in the shape of the real content (never a blank screen). */
export function Skeleton({ width = '100%', height = 16, radius = 'sm', lines, circle }: SkeletonProps) {
  const t = useTheme();
  const reduce = useReduceMotion();
  const pulse = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    if (reduce) return;
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1, duration: 700, useNativeDriver: USE_NATIVE_DRIVER }),
        Animated.timing(pulse, { toValue: 0.5, duration: 700, useNativeDriver: USE_NATIVE_DRIVER }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [reduce, pulse]);

  const bg = t.surfaceHover;
  const opacity = reduce ? 0.6 : pulse;
  const hidden = { accessibilityElementsHidden: true, importantForAccessibility: 'no-hide-descendants' as const };

  if (circle) {
    const d = typeof height === 'number' ? height : 40;
    return <Animated.View {...hidden} style={{ width: d, height: d, borderRadius: d / 2, backgroundColor: bg, opacity }} />;
  }

  if (lines && lines > 1) {
    return (
      <View {...hidden} style={{ gap: base.space[2] }}>
        {Array.from({ length: lines }).map((_, i) => (
          <Animated.View
            key={i}
            style={{ width: i === lines - 1 ? '60%' : '100%', height, borderRadius: base.radius[radius], backgroundColor: bg, opacity }}
          />
        ))}
      </View>
    );
  }

  return <Animated.View {...hidden} style={{ width, height, borderRadius: base.radius[radius], backgroundColor: bg, opacity }} />;
}

export interface SpinnerProps {
  size?: 'small' | 'large';
  label?: string;
  color?: string;
}

/** Spinner for a spot action without a known layout. */
export function Spinner({ size = 'small', label = 'Loading', color }: SpinnerProps) {
  const t = useTheme();
  return (
    <View accessibilityRole="progressbar" accessibilityLabel={label} accessibilityState={{ busy: true }}>
      <ActivityIndicator size={size} color={color ?? t.colorAction} />
    </View>
  );
}

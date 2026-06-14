import { View } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';

export interface ProgressProps {
  value: number;
  max?: number;
  label?: string;
  color?: string;
  height?: number;
}

/** Linear progress bar. Pair with a text label when the number matters. */
export function Progress({ value, max = 100, label, color, height = 8 }: ProgressProps) {
  const t = useTheme();
  const pct = Math.max(0, Math.min(1, value / max));
  const fill = color ?? (pct >= 1 ? t.success : t.colorAction);

  return (
    <View
      accessibilityRole="progressbar"
      accessibilityLabel={label}
      accessibilityValue={{ now: Math.round(pct * 100), min: 0, max: 100 }}
      style={{ height, borderRadius: height / 2, backgroundColor: t.surfaceBorder, overflow: 'hidden' }}
    >
      <View style={{ width: `${pct * 100}%`, height: '100%', borderRadius: height / 2, backgroundColor: fill }} />
    </View>
  );
}

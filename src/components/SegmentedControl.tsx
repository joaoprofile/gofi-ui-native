import { View, Pressable } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import { Text } from './Text';

export interface Segment<T extends string> {
  value: T;
  label: string;
}

export interface SegmentedControlProps<T extends string> {
  value: T;
  onChange: (v: T) => void;
  options: Segment<T>[]; // 2–4 short views
}

/** Switch between exclusive views in place. Immediate effect. */
export function SegmentedControl<T extends string>({ value, onChange, options }: SegmentedControlProps<T>) {
  const t = useTheme();
  return (
    <View
      accessibilityRole="tablist"
      style={{ flexDirection: 'row', backgroundColor: t.surfaceHover, borderRadius: t.radius.pill, padding: 3 }}
    >
      {options.map((o) => {
        const selected = o.value === value;
        return (
          <Pressable
            key={o.value}
            accessibilityRole="tab"
            accessibilityState={{ selected }}
            accessibilityLabel={o.label}
            onPress={() => onChange(o.value)}
            style={{
              flex: 1, minHeight: 36, alignItems: 'center', justifyContent: 'center',
              borderRadius: t.radius.pill,
              backgroundColor: selected ? t.surfaceCard : 'transparent',
            }}
          >
            <Text variant="bodySm" color="inherit" style={{ color: selected ? t.textColor : t.textSecondary, fontWeight: selected ? '600' : '500' }}>
              {o.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

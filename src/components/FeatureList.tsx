import { type ReactNode } from 'react';
import { View } from 'react-native';
import { Check } from 'lucide-react-native';
import { useTheme } from '../theme/ThemeProvider';
import { Text } from './Text';

export interface FeatureItem {
  icon?: ReactNode;
  label: string;
}

export interface FeatureListProps {
  items: FeatureItem[];
  /** Rendered over a brand surface → uses on-brand (navy) color. */
  onBrand?: boolean;
}

/**
 * List of value highlights (icon/check + short text). The hero of the onboarding
 * brand card. Over the brand surface, text/icon are navy (`textOnBrand`).
 */
export function FeatureList({ items, onBrand }: FeatureListProps) {
  const t = useTheme();
  const tint = onBrand ? t.textOnBrand : t.colorAction;
  const textColor = onBrand ? 'onBrand' : 'default';

  return (
    <View accessibilityRole="list" style={{ gap: t.space[3] }}>
      {items.map((it, i) => (
        <View key={i} accessibilityLabel={it.label} style={{ flexDirection: 'row', alignItems: 'center', gap: t.space[3] }}>
          {it.icon ?? <Check size={20} color={tint} strokeWidth={2.5} />}
          <Text variant="body" color={textColor} style={{ flex: 1 }}>{it.label}</Text>
        </View>
      ))}
    </View>
  );
}

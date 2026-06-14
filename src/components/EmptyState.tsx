import { type ReactNode } from 'react';
import { View } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import { Text } from './Text';

export type EmptyVariant = 'first-use' | 'no-results' | 'all-done';

export interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  variant?: EmptyVariant;
}

/**
 * The empty state is a product screen, not a void. Distinguish first-use vs.
 * no-results vs. all-done. Use as a FlatList ListEmptyComponent.
 */
export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  const t = useTheme();
  return (
    <View style={{ alignItems: 'center', gap: t.space[3], paddingVertical: t.space[10], paddingHorizontal: t.space[6] }}>
      {icon ? (
        <View
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
          style={{ width: 64, height: 64, borderRadius: 32, backgroundColor: t.surfaceHover, alignItems: 'center', justifyContent: 'center' }}
        >
          {icon}
        </View>
      ) : null}
      <Text variant="h3" accessibilityRole="header" style={{ textAlign: 'center' }}>{title}</Text>
      {description ? <Text variant="bodySm" color="secondary" style={{ textAlign: 'center' }}>{description}</Text> : null}
      {action ? <View style={{ marginTop: t.space[2] }}>{action}</View> : null}
    </View>
  );
}

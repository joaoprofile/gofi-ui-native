import { type ReactNode } from 'react';
import { Pressable, View } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import { useTheme } from '../theme/ThemeProvider';
import { Text } from './Text';

export interface ListItemProps {
  leading?: ReactNode;
  title: string;
  subtitle?: string;
  trailing?: ReactNode;
  /** Show a chevron when navigable (ignored if `trailing` is set). */
  chevron?: boolean;
  onPress?: () => void;
  selected?: boolean;
}

/** A rich row. Use inside a FlatList (virtualized), not map() in a ScrollView. */
export function ListItem({ leading, title, subtitle, trailing, chevron, onPress, selected }: ListItemProps) {
  const t = useTheme();

  const content = (
    <>
      {leading ? <View>{leading}</View> : null}
      <View style={{ flex: 1, gap: 2 }}>
        <Text variant="body" numberOfLines={1} style={{ fontWeight: '500' }}>{title}</Text>
        {subtitle ? <Text variant="bodySm" color="secondary" numberOfLines={1}>{subtitle}</Text> : null}
      </View>
      {trailing ?? (chevron ? <ChevronRight size={20} color={t.textSecondary} /> : null)}
    </>
  );

  const style = {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: t.space[3],
    minHeight: 56,
    paddingVertical: t.space[2],
  };

  if (onPress) {
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={[title, subtitle].filter(Boolean).join(', ')}
        accessibilityState={{ selected: !!selected }}
        onPress={onPress}
        style={({ pressed }) => [style, { backgroundColor: selected ? t.colorActionSubtle : pressed ? t.surfaceHover : 'transparent', borderRadius: t.radius.md }]}
      >
        {content}
      </Pressable>
    );
  }

  return (
    <View accessible accessibilityLabel={[title, subtitle].filter(Boolean).join(', ')} style={style}>
      {content}
    </View>
  );
}

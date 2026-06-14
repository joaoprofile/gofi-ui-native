import { type ComponentType } from 'react';
import { View, Pressable } from 'react-native';
import { type LucideProps } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../theme/ThemeProvider';
import { Text } from './Text';

export interface TabItem {
  key: string;
  label: string;
  icon: ComponentType<LucideProps>;
  badge?: number;
}

export interface TabBarProps {
  items: TabItem[]; // 3–5 destinations
  active: string;
  onChange: (key: string) => void;
}

/** Bottom navigation for 3–5 top destinations. Respects the bottom safe area. */
export function TabBar({ items, active, onChange }: TabBarProps) {
  const t = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View
      accessibilityRole="tablist"
      style={{
        flexDirection: 'row',
        paddingBottom: insets.bottom,
        paddingTop: t.space[2],
        backgroundColor: t.surfaceCard,
        borderTopWidth: 1,
        borderTopColor: t.surfaceBorder,
      }}
    >
      {items.map(({ key, label, icon: Icon, badge }) => {
        const selected = key === active;
        const color = selected ? t.colorAction : t.textSecondary;
        return (
          <Pressable
            key={key}
            accessibilityRole="tab"
            accessibilityState={{ selected }}
            accessibilityLabel={badge ? `${label}, ${badge} unread` : label}
            onPress={() => onChange(key)}
            style={{ flex: 1, alignItems: 'center', gap: 2, minHeight: 44, justifyContent: 'center' }}
          >
            <View style={{ paddingHorizontal: 16, paddingVertical: 3, borderRadius: t.radius.pill, backgroundColor: selected ? t.colorActionSubtle : 'transparent' }}>
              <Icon size={24} color={color} />
              {badge ? (
                <View style={{ position: 'absolute', top: -4, right: 0, minWidth: 16, height: 16, borderRadius: 8, paddingHorizontal: 4, backgroundColor: t.danger, alignItems: 'center', justifyContent: 'center' }}>
                  <Text color="inherit" style={{ color: '#FFFFFF', fontSize: 10, fontWeight: '700' }}>{badge}</Text>
                </View>
              ) : null}
            </View>
            <Text color="inherit" style={{ color, fontSize: 11, fontWeight: selected ? '600' : '400' }}>{label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

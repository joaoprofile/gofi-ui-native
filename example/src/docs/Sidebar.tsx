import { ScrollView, Pressable, View } from 'react-native';
import { useTheme } from 'gofi-ui-native';
import { Text } from 'gofi-ui-native';
import { NAV } from './nav';

export function Sidebar({ current, onNavigate }: { current: string; onNavigate: (id: string) => void }) {
  const t = useTheme();
  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ gap: t.space[5], paddingVertical: t.space[4] }}>
      {NAV.map((grp) => (
        <View key={grp.group} style={{ gap: t.space[1] }}>
          <Text variant="caption" color="secondary" style={{ textTransform: 'uppercase', letterSpacing: 1, fontWeight: '700', paddingHorizontal: t.space[3], marginBottom: 4 }}>
            {grp.group}
          </Text>
          {grp.items.map((it) => {
            const active = it.id === current;
            return (
              <Pressable
                key={it.id}
                accessibilityRole="link"
                accessibilityState={{ selected: active }}
                onPress={() => onNavigate(it.id)}
                style={{
                  minHeight: 40, justifyContent: 'center', paddingHorizontal: t.space[3], borderRadius: t.radius.pill,
                  backgroundColor: active ? t.colorActionSubtle : 'transparent',
                }}
              >
                <Text variant="bodySm" color="inherit" style={{ color: active ? t.colorAction : t.textColor, fontWeight: active ? '600' : '400' }}>
                  {it.label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      ))}
    </ScrollView>
  );
}

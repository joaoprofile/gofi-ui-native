import { useState } from 'react';
import { View, Pressable, ScrollView, useWindowDimensions, Modal } from 'react-native';
import { Menu, Moon, Sun, X, LayoutGrid } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme, useThemeControls } from 'gofi-ui-native';
import { brands, type BrandKey } from 'gofi-ui-native';
import { Text } from 'gofi-ui-native';
import { IconButton } from 'gofi-ui-native';
import { Sidebar } from './Sidebar';
import { useRoute } from './useRoute';
import { SHOWCASE_ROUTES } from './nav';
import { pages } from './pages';

function BrandSwitcher() {
  const t = useTheme();
  const { brand, setBrand } = useThemeControls();
  const keys: BrandKey[] = ['blue', 'violet', 'green'];
  return (
    <View accessibilityRole="radiogroup" style={{ flexDirection: 'row', gap: 4, padding: 4, borderRadius: t.radius.pill, borderWidth: 1, borderColor: t.surfaceBorder }}>
      {keys.map((k) => {
        const active = brand === k;
        return (
          <Pressable
            key={k}
            accessibilityRole="radio"
            accessibilityState={{ selected: active }}
            accessibilityLabel={brands[k].label}
            onPress={() => setBrand(k)}
            style={{ width: 24, height: 24, borderRadius: 12, backgroundColor: brands[k].brand, borderWidth: 2, borderColor: active ? t.colorAction : 'transparent' }}
          />
        );
      })}
    </View>
  );
}

function TopBar({ onMenu, onNavigate, wide }: { onMenu: () => void; onNavigate: (id: string) => void; wide: boolean }) {
  const t = useTheme();
  const insets = useSafeAreaInsets();
  const { mode, toggleMode } = useThemeControls();
  return (
    <View style={{ paddingTop: insets.top, backgroundColor: t.surfaceCard, borderBottomWidth: 1, borderBottomColor: t.surfaceBorder }}>
      <View style={{ height: 60, flexDirection: 'row', alignItems: 'center', paddingHorizontal: t.space[3], gap: t.space[2] }}>
        {!wide ? (
          <IconButton accessibilityLabel="Open navigation" onPress={onMenu}><Menu size={22} color={t.textColor} /></IconButton>
        ) : null}
        <Pressable accessibilityRole="button" onPress={() => onNavigate('introduction')} style={{ flexDirection: 'row', alignItems: 'center', gap: t.space[2], flex: 1 }}>
          <View style={{ width: 32, height: 32, borderRadius: t.radius.md, backgroundColor: t.colorBrand, alignItems: 'center', justifyContent: 'center' }}>
            <Text color="onBrand" style={{ fontWeight: '800' }}>G</Text>
          </View>
          <Text variant="h3" numberOfLines={1}>Gofi UI Native</Text>
        </Pressable>
        <Pressable accessibilityRole="button" accessibilityLabel="Showcase" onPress={() => onNavigate('showcase')} hitSlop={6} style={{ flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: t.space[2] }}>
          <LayoutGrid size={16} color={t.textSecondary} />
          {wide ? <Text variant="bodySm" color="secondary">Showcase</Text> : null}
        </Pressable>
        {wide ? <BrandSwitcher /> : null}
        <IconButton accessibilityLabel={mode === 'dark' ? 'Light mode' : 'Dark mode'} onPress={toggleMode} variant="outline">
          {mode === 'dark' ? <Sun size={18} color={t.textColor} /> : <Moon size={18} color={t.textColor} />}
        </IconButton>
      </View>
    </View>
  );
}

export function DocsApp() {
  const t = useTheme();
  const [route, navigate] = useRoute();
  const { width } = useWindowDimensions();
  const wide = width >= 900;
  const [drawer, setDrawer] = useState(false);

  const go = (id: string) => { navigate(id); setDrawer(false); };
  const Page = pages[route] ?? pages.introduction;
  const isShowcase = SHOWCASE_ROUTES.has(route);

  return (
    <View style={{ flex: 1, backgroundColor: t.surfacePage }}>
      <TopBar onMenu={() => setDrawer(true)} onNavigate={go} wide={wide} />

      <View style={{ flex: 1, flexDirection: 'row' }}>
        {wide ? (
          <View style={{ width: 280, borderRightWidth: 1, borderRightColor: t.surfaceBorder, paddingHorizontal: t.space[3] }}>
            <Sidebar current={route} onNavigate={go} />
          </View>
        ) : null}

        {isShowcase ? (
          <View style={{ flex: 1, alignItems: 'center', backgroundColor: t.surfaceSunken }}>
            <View style={{ flex: 1, width: '100%', maxWidth: 440, backgroundColor: t.surfacePage, borderLeftWidth: 1, borderRightWidth: 1, borderColor: t.surfaceBorder }}>
              <Page />
            </View>
          </View>
        ) : (
          <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: t.space[5], alignItems: 'center' }} showsVerticalScrollIndicator={false}>
            <View style={{ width: '100%', maxWidth: 820 }}>
              <Page />
            </View>
          </ScrollView>
        )}
      </View>

      {!wide && drawer ? (
        <Modal visible transparent animationType="fade" onRequestClose={() => setDrawer(false)}>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={{ width: 300, maxWidth: '85%', backgroundColor: t.surfaceCard, paddingHorizontal: t.space[3] }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: t.space[4], paddingRight: t.space[2] }}>
                <BrandSwitcher />
                <IconButton accessibilityLabel="Close navigation" onPress={() => setDrawer(false)}><X size={20} color={t.textColor} /></IconButton>
              </View>
              <Sidebar current={route} onNavigate={go} />
            </View>
            <Pressable accessibilityLabel="Close" style={{ flex: 1, backgroundColor: '#0009' }} onPress={() => setDrawer(false)} />
          </View>
        </Modal>
      ) : null}
    </View>
  );
}

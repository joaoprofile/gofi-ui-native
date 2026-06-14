import { type ReactNode } from 'react';
import { View, ScrollView, type ViewStyle, type StyleProp } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../theme/ThemeProvider';

export interface ScreenProps {
  children: ReactNode;
  /** Wrap content in a ScrollView (default true). */
  scroll?: boolean;
  /** Horizontal padding token (default 4 = 16). */
  padding?: number;
  /** Fill behind the brand surface to bleed under the status bar. */
  background?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * Base of every screen: applies safe-area insets, the page background and a
 * default horizontal padding. Content bottom padding keeps it off the home
 * indicator / tab bar.
 */
export function Screen({ children, scroll = true, padding = 16, background, style }: ScreenProps) {
  const t = useTheme();
  const insets = useSafeAreaInsets();
  const bg = background ?? t.surfacePage;

  const inner: StyleProp<ViewStyle> = {
    paddingTop: insets.top,
    paddingHorizontal: padding,
    paddingBottom: insets.bottom + t.space[6],
    gap: t.space[4],
  };

  if (!scroll) {
    return <View style={[{ flex: 1, backgroundColor: bg }, inner, style]}>{children}</View>;
  }

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: bg }}
      contentContainerStyle={[inner, style]}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  );
}

import { type ReactNode } from 'react';
import { View, type ViewStyle, type StyleProp } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import { base } from '../theme/tokens';

type SpaceKey = keyof typeof base.space;

export interface StackProps {
  /** Vertical gap between children (token from the 4/8 scale). */
  gap?: SpaceKey;
  align?: ViewStyle['alignItems'];
  justify?: ViewStyle['justifyContent'];
  style?: StyleProp<ViewStyle>;
  children: ReactNode;
}

/** Vertical stack with a consistent token gap. */
export function Stack({ gap = 4, align, justify, style, children }: StackProps) {
  return (
    <View style={[{ flexDirection: 'column', gap: base.space[gap], alignItems: align, justifyContent: justify }, style]}>
      {children}
    </View>
  );
}

export interface RowProps extends StackProps {
  wrap?: boolean;
}

/** Horizontal row with a token gap. */
export function Row({ gap = 2, align = 'center', justify, wrap, style, children }: RowProps) {
  return (
    <View
      style={[
        { flexDirection: 'row', gap: base.space[gap], alignItems: align, justifyContent: justify, flexWrap: wrap ? 'wrap' : 'nowrap' },
        style,
      ]}
    >
      {children}
    </View>
  );
}

export interface DividerProps {
  style?: StyleProp<ViewStyle>;
}

/** Hairline divider using the theme border color. */
export function Divider({ style }: DividerProps) {
  const t = useTheme();
  return <View style={[{ height: 1, backgroundColor: t.surfaceBorder }, style]} />;
}

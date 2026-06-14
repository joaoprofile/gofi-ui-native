import { Pressable, View } from 'react-native';
import { X } from 'lucide-react-native';
import { useTheme } from '../theme/ThemeProvider';
import type { Theme } from '../theme/tokens';
import { Text } from './Text';

export type Tone = 'success' | 'warning' | 'danger' | 'info' | 'neutral';

function toneColors(t: Theme, tone: Tone): { bg: string; fg: string } {
  switch (tone) {
    case 'success': return { bg: t.successBg, fg: t.success };
    case 'warning': return { bg: t.warningBg, fg: t.warning };
    case 'danger': return { bg: t.dangerBg, fg: t.danger };
    case 'info': return { bg: t.infoBg, fg: t.info };
    case 'neutral': return { bg: t.surfaceHover, fg: t.textSecondary };
  }
}

export interface BadgeProps {
  tone?: Tone;
  children: string;
  /** Accessible label override (e.g. "3 unread" for a count). */
  accessibilityLabel?: string;
}

/** Static status / category label. Color is never the only signal — pair with text. */
export function Badge({ tone = 'neutral', children, accessibilityLabel }: BadgeProps) {
  const t = useTheme();
  const c = toneColors(t, tone);
  return (
    <View
      accessibilityLabel={accessibilityLabel}
      style={{ alignSelf: 'flex-start', backgroundColor: c.bg, borderRadius: t.radius.pill, paddingHorizontal: t.space[2], paddingVertical: 2 }}
    >
      <Text variant="caption" color="inherit" style={{ color: c.fg, fontWeight: '600' }}>
        {children}
      </Text>
    </View>
  );
}

export interface ChipProps {
  selected?: boolean;
  onPress?: () => void;
  onRemove?: () => void;
  children: string;
}

/** Interactive filter/selection. Removable with an accessible ✕. */
export function Chip({ selected, onPress, onRemove, children }: ChipProps) {
  const t = useTheme();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={children}
      accessibilityState={{ selected: !!selected }}
      onPress={onPress}
      style={({ pressed }) => ({
        flexDirection: 'row',
        alignItems: 'center',
        gap: t.space[1],
        minHeight: 32,
        paddingHorizontal: t.space[3],
        borderRadius: t.radius.pill,
        borderWidth: 1,
        borderColor: selected ? t.colorAction : t.surfaceBorder,
        backgroundColor: selected ? t.colorActionSubtle : pressed ? t.surfaceHover : 'transparent',
      })}
    >
      <Text variant="bodySm" color="inherit" style={{ color: selected ? t.colorAction : t.textColor, fontWeight: '500' }}>
        {children}
      </Text>
      {onRemove ? (
        <Pressable accessibilityRole="button" accessibilityLabel={`Remove ${children}`} onPress={onRemove} hitSlop={8}>
          <X size={14} color={selected ? t.colorAction : t.textSecondary} />
        </Pressable>
      ) : null}
    </Pressable>
  );
}

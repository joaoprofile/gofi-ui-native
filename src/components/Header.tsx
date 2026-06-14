import { type ReactNode } from 'react';
import { View } from 'react-native';
import { ChevronLeft } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../theme/ThemeProvider';
import { Text } from './Text';
import { IconButton } from './Button';

export type HeaderVariant = 'default' | 'brand' | 'transparent';

export interface HeaderProps {
  title: string;
  onBack?: () => void;
  actions?: ReactNode;
  variant?: HeaderVariant;
  /** Respect the top safe-area inset (default true). */
  safeTop?: boolean;
}

/** Screen header: back + title + actions, respecting the top safe area. */
export function Header({ title, onBack, actions, variant = 'default', safeTop = true }: HeaderProps) {
  const t = useTheme();
  const insets = useSafeAreaInsets();
  const onBrand = variant === 'brand';

  return (
    <View
      style={{
        paddingTop: safeTop ? insets.top : 0,
        backgroundColor: onBrand ? t.colorBrand : variant === 'transparent' ? 'transparent' : t.surfaceCard,
        borderBottomWidth: variant === 'default' ? 1 : 0,
        borderBottomColor: t.surfaceBorder,
      }}
    >
      <View style={{ minHeight: 56, flexDirection: 'row', alignItems: 'center', paddingHorizontal: t.space[2], gap: t.space[2] }}>
        {onBack ? (
          <IconButton accessibilityLabel="Back" onPress={onBack}>
            <ChevronLeft size={24} color={onBrand ? t.textOnBrand : t.textColor} />
          </IconButton>
        ) : (
          <View style={{ width: t.space[2] }} />
        )}
        <Text variant="h3" accessibilityRole="header" color={onBrand ? 'onBrand' : 'default'} numberOfLines={1} style={{ flex: 1 }}>
          {title}
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: t.space[1] }}>{actions}</View>
      </View>
    </View>
  );
}

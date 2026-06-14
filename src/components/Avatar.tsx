import { useState } from 'react';
import { View, Image } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import { palette } from '../theme/tokens';
import { Text } from './Text';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

const DIM: Record<AvatarSize, number> = { xs: 24, sm: 32, md: 40, lg: 48, xl: 64 };

const SWATCHES = [palette.primary[600], palette.secondary[600], palette.success, palette.warning, palette.info];
function colorFor(name: string): string {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  return SWATCHES[h % SWATCHES.length];
}
function initials(name: string): string {
  const parts = name.trim().split(/\s+/);
  return ((parts[0]?.[0] ?? '') + (parts[1]?.[0] ?? '')).toUpperCase() || '?';
}

export interface AvatarProps {
  src?: string;
  name: string;
  size?: AvatarSize;
  status?: 'online' | 'offline';
}

/** Person/entity avatar. Falls back to initials if the image is missing/fails. */
export function Avatar({ src, name, size = 'md', status }: AvatarProps) {
  const t = useTheme();
  const [failed, setFailed] = useState(false);
  const dim = DIM[size];
  const showImage = src && !failed;

  return (
    <View accessibilityLabel={name} style={{ width: dim, height: dim }}>
      {showImage ? (
        <Image
          source={{ uri: src }}
          onError={() => setFailed(true)}
          style={{ width: dim, height: dim, borderRadius: dim / 2, backgroundColor: t.surfaceHover }}
        />
      ) : (
        <View style={{ width: dim, height: dim, borderRadius: dim / 2, backgroundColor: colorFor(name), alignItems: 'center', justifyContent: 'center' }}>
          <Text color="inherit" style={{ color: '#FFFFFF', fontWeight: '600', fontSize: dim * 0.38 }}>
            {initials(name)}
          </Text>
        </View>
      )}
      {status ? (
        <View
          style={{
            position: 'absolute', right: -1, bottom: -1,
            width: dim * 0.28, height: dim * 0.28, borderRadius: dim * 0.14,
            backgroundColor: status === 'online' ? t.success : t.palette.gray[400],
            borderWidth: 2, borderColor: t.surfaceCard,
          }}
        />
      ) : null}
    </View>
  );
}

export interface AvatarStackProps {
  items: AvatarProps[];
  max?: number;
  size?: AvatarSize;
}

/** Overlapping group with a trailing +N counter. */
export function AvatarStack({ items, max = 3, size = 'sm' }: AvatarStackProps) {
  const t = useTheme();
  const dim = DIM[size];
  const shown = items.slice(0, max);
  const extra = items.length - shown.length;

  return (
    <View accessibilityLabel={`${items.length} people`} style={{ flexDirection: 'row', alignItems: 'center' }}>
      {shown.map((it, i) => (
        <View key={i} style={{ marginLeft: i === 0 ? 0 : -dim * 0.35, borderRadius: dim / 2, borderWidth: 2, borderColor: t.surfaceCard }}>
          <Avatar {...it} size={size} />
        </View>
      ))}
      {extra > 0 ? (
        <View
          accessibilityLabel={`plus ${extra}`}
          style={{
            marginLeft: -dim * 0.35, width: dim, height: dim, borderRadius: dim / 2,
            backgroundColor: t.surfaceHover, borderWidth: 2, borderColor: t.surfaceCard,
            alignItems: 'center', justifyContent: 'center',
          }}
        >
          <Text color="secondary" style={{ fontSize: dim * 0.32, fontWeight: '600' }}>+{extra}</Text>
        </View>
      ) : null}
    </View>
  );
}

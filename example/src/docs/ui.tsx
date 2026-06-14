import { useState, type ReactNode } from 'react';
import { View, Pressable } from 'react-native';
import { ChevronDown, ChevronRight } from 'lucide-react-native';
import { useTheme } from 'gofi-ui-native';
import { Text } from 'gofi-ui-native';
import { Row, Divider } from 'gofi-ui-native';

/** Docs page shell: eyebrow + title + lead, then spaced sections. */
export function DocPage({ group, title, lead, children }: { group?: string; title: string; lead: string; children: ReactNode }) {
  const t = useTheme();
  return (
    <View style={{ gap: t.space[8], paddingBottom: t.space[16] }}>
      <View style={{ gap: t.space[3], borderBottomWidth: 1, borderBottomColor: t.surfaceBorder, paddingBottom: t.space[6] }}>
        {group ? <Text variant="caption" color="action" style={{ textTransform: 'uppercase', letterSpacing: 1, fontWeight: '700' }}>{group}</Text> : null}
        <Text variant="display">{title}</Text>
        <Text variant="body" color="secondary">{lead}</Text>
      </View>
      {children}
    </View>
  );
}

export function DocSection({ title, description, children }: { title: string; description?: string; children: ReactNode }) {
  const t = useTheme();
  return (
    <View style={{ gap: t.space[4] }}>
      <View style={{ gap: t.space[1] }}>
        <Text variant="h2">{title}</Text>
        {description ? <Text variant="bodySm" color="secondary">{description}</Text> : null}
      </View>
      {children}
    </View>
  );
}

/** Live preview frame for an example, with an optional collapsible "Show code" panel. */
export function Example({ children, code, padded = true }: { children: ReactNode; code?: string; padded?: boolean }) {
  const t = useTheme();
  const [open, setOpen] = useState(false);
  return (
    <View style={{ borderWidth: 1, borderColor: t.surfaceBorder, borderRadius: t.radius.lg, overflow: 'hidden' }}>
      <View style={{ backgroundColor: t.surfacePage, padding: padded ? t.space[5] : 0, gap: t.space[3] }}>
        {children}
      </View>
      {code ? (
        <>
          <Pressable
            accessibilityRole="button"
            accessibilityState={{ expanded: open }}
            accessibilityLabel={open ? 'Hide code' : 'Show code'}
            onPress={() => setOpen((v) => !v)}
            style={{ flexDirection: 'row', alignItems: 'center', gap: t.space[2], paddingHorizontal: t.space[4], paddingVertical: t.space[3], borderTopWidth: 1, borderTopColor: t.surfaceBorder, backgroundColor: t.surfaceCard }}
          >
            {open ? <ChevronDown size={16} color={t.textSecondary} /> : <ChevronRight size={16} color={t.textSecondary} />}
            <Text variant="bodySm" color="secondary" style={{ fontWeight: '600' }}>{open ? 'Hide code' : 'Show code'}</Text>
          </Pressable>
          {open ? (
            <View style={{ backgroundColor: '#0C111D', padding: t.space[4] }}>
              <Text color="inherit" style={{ color: '#D0D5DD', fontFamily: 'monospace', fontSize: 13, lineHeight: 20 }}>{code}</Text>
            </View>
          ) : null}
        </>
      ) : null}
    </View>
  );
}

export interface PropRow { name: string; type: string; default?: string; description: string; }

export function PropsTable({ rows }: { rows: PropRow[] }) {
  const t = useTheme();
  return (
    <View style={{ borderWidth: 1, borderColor: t.surfaceBorder, borderRadius: t.radius.lg, overflow: 'hidden' }}>
      {rows.map((r, i) => (
        <View key={r.name} style={{ padding: t.space[3], gap: 2, backgroundColor: i % 2 ? t.surfaceCard : t.surfacePage, borderTopWidth: i ? 1 : 0, borderTopColor: t.surfaceBorder }}>
          <Row gap={2} wrap>
            <Text variant="bodySm" style={{ fontWeight: '700', fontFamily: 'monospace' }}>{r.name}</Text>
            <Text variant="caption" color="action" style={{ fontFamily: 'monospace' }}>{r.type}</Text>
            {r.default ? <Text variant="caption" color="secondary" style={{ fontFamily: 'monospace' }}>= {r.default}</Text> : null}
          </Row>
          <Text variant="caption" color="secondary">{r.description}</Text>
        </View>
      ))}
    </View>
  );
}

export function Swatch({ color, name, hex }: { color: string; name: string; hex: string }) {
  const t = useTheme();
  return (
    <View style={{ gap: 6 }}>
      <View style={{ width: 88, height: 56, borderRadius: t.radius.md, backgroundColor: color, borderWidth: 1, borderColor: t.surfaceBorder }} />
      <Text variant="caption" style={{ fontWeight: '600' }}>{name}</Text>
      <Text variant="caption" color="secondary" style={{ fontFamily: 'monospace' }}>{hex}</Text>
    </View>
  );
}

export function Code({ code }: { code: string }) {
  const t = useTheme();
  return (
    <View style={{ backgroundColor: t.mode === 'dark' ? '#0C111D' : '#0C111D', borderRadius: t.radius.md, padding: t.space[4] }}>
      <Text color="inherit" style={{ color: '#D0D5DD', fontFamily: 'monospace', fontSize: 13, lineHeight: 20 }}>{code}</Text>
    </View>
  );
}

export { Divider };

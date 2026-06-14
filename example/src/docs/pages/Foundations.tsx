import { View } from 'react-native';
import { useTheme } from 'gofi-ui-native';
import { palette, base } from 'gofi-ui-native';
import { Text } from 'gofi-ui-native';
import { Row, Stack } from 'gofi-ui-native';
import { Card } from 'gofi-ui-native';
import { DocPage, DocSection, Example, Swatch, Code } from '../ui';

export function FoundationsPage() {
  const t = useTheme();
  const primary = Object.entries(palette.primary);
  const semantic: Array<[string, string]> = [
    ['brand', t.colorBrand], ['on-brand', t.textOnBrand], ['action', t.colorAction],
    ['secondary', t.colorSecondary], ['success', t.success], ['warning', t.warning],
    ['danger', t.danger], ['info', t.info],
  ];
  const typeScale = Object.keys(base.font) as Array<keyof typeof base.font>;

  return (
    <DocPage group="Foundations" title="Tokens · Colors · Type" lead="One TS token object feeds every component. Values come from the shared single source; the mobile form is a typed object.">
      <DocSection title="Primary scale" description="Derived from #AAD7FF — the brand surface (200) and the action affordance (600).">
        <Example>
          <Row gap={3} wrap>
            {primary.map(([k, hex]) => <Swatch key={k} color={hex} name={`primary-${k}`} hex={hex} />)}
          </Row>
        </Example>
      </DocSection>

      <DocSection title="Semantic" description="What the UI consumes (re-themes by brand + mode).">
        <Example>
          <Row gap={3} wrap>
            {semantic.map(([k, hex]) => <Swatch key={k} color={hex} name={k} hex={hex} />)}
          </Row>
        </Example>
      </DocSection>

      <DocSection title="The blue's dual role" description="#AAD7FF is light → text over it is navy (never white). Affordances on white use the darker action shade.">
        <Example padded={false}>
          <View style={{ padding: t.space[5], backgroundColor: t.colorBrand, gap: 4 }}>
            <Text variant="h3" color="onBrand">Brand surface</Text>
            <Text variant="bodySm" color="onBrand">on-brand text = navy #0B2942 (9.84:1)</Text>
          </View>
          <View style={{ padding: t.space[5], gap: 6 }}>
            <Text variant="bodySm" color="secondary">Action on white = #1B72D8 (AA)</Text>
            <View style={{ alignSelf: 'flex-start', backgroundColor: t.colorAction, borderRadius: t.radius.pill, paddingHorizontal: 16, paddingVertical: 8 }}>
              <Text color="inherit" style={{ color: '#fff', fontWeight: '600' }}>Action</Text>
            </View>
          </View>
        </Example>
      </DocSection>

      <DocSection title="Spacing (4/8)">
        <Example>
          <Stack gap={2}>
            {([1, 2, 3, 4, 6, 8] as const).map((k) => (
              <Row key={k} gap={3}>
                <Text variant="caption" color="secondary" style={{ width: 64, fontFamily: 'monospace' }}>space[{k}]</Text>
                <View style={{ height: 12, width: base.space[k], backgroundColor: t.colorAction, borderRadius: 3 }} />
                <Text variant="caption" color="secondary">{base.space[k]}px</Text>
              </Row>
            ))}
          </Stack>
        </Example>
      </DocSection>

      <DocSection title="Radius">
        <Example>
          <Row gap={4} wrap>
            {(Object.keys(base.radius) as Array<keyof typeof base.radius>).map((k) => (
              <View key={k} style={{ alignItems: 'center', gap: 6 }}>
                <View style={{ width: 56, height: 56, backgroundColor: t.surfaceHover, borderWidth: 1, borderColor: t.surfaceBorder, borderRadius: base.radius[k] }} />
                <Text variant="caption" color="secondary">{k}</Text>
              </View>
            ))}
          </Row>
        </Example>
      </DocSection>

      <DocSection title="Typography" description="Modular scale; respects Dynamic Type (allowFontScaling on).">
        <Example>
          <Stack gap={2}>
            {typeScale.map((v) => <Text key={v} variant={v}>{v} — The quick brown fox</Text>)}
          </Stack>
        </Example>
      </DocSection>
    </DocPage>
  );
}

export function ThemingPage() {
  return (
    <DocPage group="Foundations" title="Theme & Dark mode" lead="The ThemeProvider holds the brand + mode. Mode follows the system color scheme unless toggled. Try the brand swatches and the moon toggle in the top bar.">
      <DocSection title="useTheme()" description="Every component reads tokens from the current theme — never a hardcoded hex.">
        <Code code={`import { useTheme } from 'gofi-ui-native';

function Box() {
  const t = useTheme();
  return <View style={{ backgroundColor: t.surfaceCard, borderRadius: t.radius.lg }} />;
}`} />
      </DocSection>
      <DocSection title="Switch brand / mode" description="Used by the docs top bar; available to any app.">
        <Code code={`import { useThemeControls } from 'gofi-ui-native';

const { brand, setBrand, mode, toggleMode } = useThemeControls();
setBrand('violet');   // blue | violet | green
toggleMode();         // light <-> dark`} />
      </DocSection>
    </DocPage>
  );
}

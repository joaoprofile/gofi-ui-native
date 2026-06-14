import { View } from 'react-native';
import { useTheme } from 'gofi-ui-native';
import { Text } from 'gofi-ui-native';
import { Card } from 'gofi-ui-native';
import { Row } from 'gofi-ui-native';
import { Badge } from 'gofi-ui-native';
import { DocPage, DocSection, Code } from '../ui';

export function IntroductionPage() {
  const t = useTheme();
  const highlights = [
    ['Token, never a literal', 'Color/space/radius/type come from a single TS token object; swap theme and everything re-themes.'],
    ['Brand-dominant surfaces', 'The brand color fills large surfaces (#AAD7FF) with navy on-brand text.'],
    ['3 live brands + dark', 'Blue / Violet / Green + light/dark, switchable from the top bar.'],
    ['Accessibility-first', 'Roles, labels, states, ≥44pt targets, Dynamic Type and reduce-motion baked in.'],
  ];
  return (
    <DocPage
      group="Get started"
      title="gofi UI Native"
      lead="A React Native design system — the mobile counterpart of gofi-ui. Brand-color-dominant, accessible. Default brand #AAD7FF."
    >
      <DocSection title="Highlights">
        <View style={{ gap: t.space[3] }}>
          {highlights.map(([h, d]) => (
            <Card key={h} variant="outlined">
              <Text variant="h3">{h}</Text>
              <Text variant="bodySm" color="secondary">{d}</Text>
            </Card>
          ))}
        </View>
      </DocSection>

      <DocSection title="What's inside">
        <Row gap={2} wrap>
          {['Text', 'Button', 'Badge', 'Avatar', 'Field', 'Input', 'Switch', 'Card', 'ListItem', 'FeatureList', 'EmptyState', 'Header', 'TabBar', 'BottomSheet', 'Modal', 'Toast', 'SegmentedControl', 'Progress', 'Charts'].map((c) => (
            <Badge key={c} tone="info">{c}</Badge>
          ))}
        </Row>
      </DocSection>

      <DocSection title="Quick taste">
        <Code code={`import { Card, Text, Button, FeatureList } from 'gofi-ui-native';

<Card variant="brand">
  <Text variant="display" color="onBrand">Welcome</Text>
  <FeatureList onBrand items={[{ label: 'Accessible by default' }]} />
  <Button variant="primary" full onPress={start}>Get started</Button>
</Card>`} />
      </DocSection>
    </DocPage>
  );
}

export function InstallationPage() {
  return (
    <DocPage group="Get started" title="Installation" lead="Add gofi-ui-native to your Expo / React Native app.">
      <DocSection title="Install">
        <Code code={`# npm
npm install gofi-ui-native

# yarn
yarn add gofi-ui-native`} />
      </DocSection>
      <DocSection title="Peer dependencies" description="React Native apps already have react / react-native. The DS also uses these.">
        <Code code={`npx expo install react-native-safe-area-context react-native-svg
npm install lucide-react-native`} />
      </DocSection>
      <DocSection title="Wrap your app" description="Provide the theme and toast host once at the root.">
        <Code code={`import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider, ToastProvider } from 'gofi-ui-native';

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <ToastProvider>
          {/* your navigation */}
        </ToastProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}`} />
      </DocSection>
      <DocSection title="Brand override (per project)" description="Default brand is #AAD7FF. A real project picks its own primary/secondary on bootstrap and the scale is derived with validated contrast.">
        <Code code={`<ThemeProvider defaultBrand="blue" /* or violet / green */ >`} />
      </DocSection>
    </DocPage>
  );
}

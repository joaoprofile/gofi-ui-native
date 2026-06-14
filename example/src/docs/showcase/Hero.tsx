import { View, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from 'gofi-ui-native';
import { Text } from 'gofi-ui-native';
import { Card } from 'gofi-ui-native';
import { Button } from 'gofi-ui-native';
import { FeatureList } from 'gofi-ui-native';
import { Row } from 'gofi-ui-native';

export function HeroApp() {
  const t = useTheme();
  const insets = useSafeAreaInsets();
  return (
    <ScrollView style={{ flex: 1, backgroundColor: t.surfacePage }} contentContainerStyle={{ flexGrow: 1, paddingTop: insets.top + t.space[6], paddingBottom: insets.bottom + t.space[6], paddingHorizontal: t.space[4], gap: t.space[6], justifyContent: 'center' }}>
      <Card variant="brand" style={{ gap: t.space[5] }}>
        <View style={{ gap: t.space[2] }}>
          <Text variant="display" color="onBrand">Save smarter, every day</Text>
          <Text variant="body" color="onBrand">Track spending, set budgets and reach your goals — all in one calm, accessible place.</Text>
        </View>
        <FeatureList onBrand items={[
          { label: 'Automatic categories' },
          { label: 'Budgets that adapt' },
          { label: 'Private and secure' },
        ]} />
        <View style={{ gap: t.space[3] }}>
          <Button variant="primary" full onPress={() => {}}>Get started</Button>
          <Button variant="ghost" full onPress={() => {}}>I already have an account</Button>
        </View>
      </Card>

      <Row gap={2} justify="center">
        {[0, 1, 2].map((i) => (
          <View key={i} style={{ width: i === 0 ? 20 : 8, height: 8, borderRadius: 4, backgroundColor: i === 0 ? t.colorAction : t.surfaceBorder }} />
        ))}
      </Row>
    </ScrollView>
  );
}

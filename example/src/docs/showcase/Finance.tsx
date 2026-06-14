import { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { House, ChartPie, CreditCard, Settings, ArrowUpRight, ArrowDownRight, Utensils, ShoppingBag, Car, Film } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from 'gofi-ui-native';
import { Text } from 'gofi-ui-native';
import { Row, Stack, Divider } from 'gofi-ui-native';
import { Card } from 'gofi-ui-native';
import { Header } from 'gofi-ui-native';
import { TabBar } from 'gofi-ui-native';
import { SegmentedControl } from 'gofi-ui-native';
import { Progress } from 'gofi-ui-native';
import { DonutChart } from 'gofi-ui-native';
import { ListItem } from 'gofi-ui-native';

const tx = [
  { name: 'Whole Foods', cat: 'Groceries', amount: -82.4, Icon: Utensils },
  { name: 'Salary', cat: 'Income', amount: 4320, Icon: ArrowUpRight },
  { name: 'Zara', cat: 'Shopping', amount: -129.9, Icon: ShoppingBag },
  { name: 'Uber', cat: 'Transport', amount: -18.5, Icon: Car },
  { name: 'Netflix', cat: 'Entertainment', amount: -15.9, Icon: Film },
];
const money = (n: number) => `${n < 0 ? '-' : ''}$${Math.abs(n).toLocaleString('en-US', { minimumFractionDigits: 2 })}`;

export function FinanceApp() {
  const t = useTheme();
  const insets = useSafeAreaInsets();
  const [tab, setTab] = useState('home');
  const [period, setPeriod] = useState<'week' | 'month' | 'year'>('month');

  return (
    <View style={{ flex: 1, backgroundColor: t.surfacePage }}>
      <Header title="Wallet" safeTop />
      <ScrollView contentContainerStyle={{ padding: t.space[4], paddingBottom: insets.bottom + t.space[10], gap: t.space[4] }} showsVerticalScrollIndicator={false}>
        <Card variant="brand">
          <Text variant="bodySm" color="onBrand">Available balance</Text>
          <Text variant="display" color="onBrand">$12,840.50</Text>
          <Row gap={2} style={{ marginTop: t.space[2] }}>
            <View style={{ flex: 1, backgroundColor: '#FFFFFF55', borderRadius: t.radius.md, padding: t.space[3], gap: 2 }}>
              <Row gap={1}><ArrowUpRight size={14} color={t.textOnBrand} /><Text variant="caption" color="onBrand">Income</Text></Row>
              <Text variant="h3" color="onBrand">$6,320</Text>
            </View>
            <View style={{ flex: 1, backgroundColor: '#FFFFFF55', borderRadius: t.radius.md, padding: t.space[3], gap: 2 }}>
              <Row gap={1}><ArrowDownRight size={14} color={t.textOnBrand} /><Text variant="caption" color="onBrand">Expenses</Text></Row>
              <Text variant="h3" color="onBrand">$2,180</Text>
            </View>
          </Row>
        </Card>

        <SegmentedControl value={period} onChange={setPeriod} options={[{ value: 'week', label: 'Week' }, { value: 'month', label: 'Month' }, { value: 'year', label: 'Year' }]} />

        <Card>
          <Text variant="h3">Spending by category</Text>
          <DonutChart ariaLabel="Spending by category" centerLabel="$2.1k" data={[{ label: 'Groceries', value: 620 }, { label: 'Shopping', value: 540 }, { label: 'Transport', value: 320 }, { label: 'Other', value: 700 }]} />
        </Card>

        <Card>
          <Text variant="h3">Budgets</Text>
          <Stack gap={3}>
            {[['Groceries', 620, 800], ['Shopping', 540, 500], ['Transport', 320, 400]].map(([name, used, limit]) => (
              <View key={name as string} style={{ gap: 6 }}>
                <Row justify="space-between">
                  <Text variant="bodySm" style={{ fontWeight: '500' }}>{name}</Text>
                  <Text variant="caption" color={(used as number) > (limit as number) ? 'danger' : 'secondary'}>{money(used as number)} / {money(limit as number)}</Text>
                </Row>
                <Progress value={used as number} max={limit as number} color={(used as number) > (limit as number) ? t.danger : undefined} />
              </View>
            ))}
          </Stack>
        </Card>

        <Card>
          <Text variant="h3">Recent transactions</Text>
          <Stack gap={0}>
            {tx.map((r, i) => (
              <View key={i}>
                <ListItem
                  leading={<View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: t.surfaceHover, alignItems: 'center', justifyContent: 'center' }}><r.Icon size={18} color={t.textSecondary} /></View>}
                  title={r.name}
                  subtitle={r.cat}
                  trailing={<Text variant="bodySm" style={{ fontWeight: '600', color: r.amount < 0 ? t.textColor : t.success }}>{money(r.amount)}</Text>}
                />
                {i < tx.length - 1 ? <Divider /> : null}
              </View>
            ))}
          </Stack>
        </Card>
      </ScrollView>
      <TabBar active={tab} onChange={setTab} items={[
        { key: 'home', label: 'Home', icon: House },
        { key: 'stats', label: 'Stats', icon: ChartPie },
        { key: 'cards', label: 'Cards', icon: CreditCard },
        { key: 'settings', label: 'Settings', icon: Settings },
      ]} />
    </View>
  );
}

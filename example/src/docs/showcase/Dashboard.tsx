import { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Bell, House, ChartColumn, User, ArrowUpRight, ArrowDownRight } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from 'gofi-ui-native';
import { Text } from 'gofi-ui-native';
import { Row, Stack, Divider } from 'gofi-ui-native';
import { Card } from 'gofi-ui-native';
import { Header } from 'gofi-ui-native';
import { TabBar } from 'gofi-ui-native';
import { Avatar } from 'gofi-ui-native';
import { Badge } from 'gofi-ui-native';
import { IconButton } from 'gofi-ui-native';
import { BarChart, DonutChart, Sparkline } from 'gofi-ui-native';
import { ListItem } from 'gofi-ui-native';

function Kpi({ label, value, delta, up }: { label: string; value: string; delta: string; up: boolean }) {
  const t = useTheme();
  return (
    <Card variant="outlined" style={{ flex: 1, gap: t.space[1] }}>
      <Text variant="caption" color="secondary">{label}</Text>
      <Text variant="h2">{value}</Text>
      <Row gap={1}>
        {up ? <ArrowUpRight size={14} color={t.success} /> : <ArrowDownRight size={14} color={t.danger} />}
        <Text variant="caption" style={{ color: up ? t.success : t.danger, fontWeight: '600' }}>{delta}</Text>
      </Row>
    </Card>
  );
}

const recent = [
  { name: 'New subscription', who: 'Anna Carter', amount: '+$49', tone: 'success' as const },
  { name: 'Refund issued', who: 'Bruno Silva', amount: '-$20', tone: 'danger' as const },
  { name: 'New subscription', who: 'Carla Reis', amount: '+$99', tone: 'success' as const },
];

export function DashboardApp() {
  const t = useTheme();
  const insets = useSafeAreaInsets();
  const [tab, setTab] = useState('home');

  return (
    <View style={{ flex: 1, backgroundColor: t.surfacePage }}>
      <Header title="Overview" safeTop actions={<IconButton accessibilityLabel="Notifications, 3 unread"><Bell size={20} color={t.textColor} /></IconButton>} />
      <ScrollView contentContainerStyle={{ padding: t.space[4], paddingBottom: insets.bottom + t.space[10], gap: t.space[4] }} showsVerticalScrollIndicator={false}>
        <Card variant="brand">
          <Text variant="bodySm" color="onBrand">Total revenue · June</Text>
          <Text variant="display" color="onBrand">$48,290</Text>
          <Sparkline ariaLabel="Revenue trend" data={[20, 28, 24, 33, 31, 38, 42, 48]} color={t.textOnBrand} />
        </Card>

        <Row gap={3} align="stretch">
          <Kpi label="New users" value="1,284" delta="12.5%" up />
          <Kpi label="Churn" value="2.1%" delta="0.4%" up={false} />
        </Row>

        <Card>
          <Text variant="h3">Sales by month</Text>
          <BarChart ariaLabel="Sales by month" data={[{ label: 'Jan', value: 32 }, { label: 'Feb', value: 41 }, { label: 'Mar', value: 38 }, { label: 'Apr', value: 52 }, { label: 'May', value: 49 }, { label: 'Jun', value: 63 }]} />
        </Card>

        <Card>
          <Text variant="h3">Traffic source</Text>
          <DonutChart ariaLabel="Traffic source" data={[{ label: 'Direct', value: 42 }, { label: 'Organic', value: 28 }, { label: 'Social', value: 18 }, { label: 'Referral', value: 12 }]} />
        </Card>

        <Card>
          <Text variant="h3">Recent activity</Text>
          <Stack gap={0}>
            {recent.map((r, i) => (
              <View key={i}>
                <ListItem
                  leading={<Avatar name={r.who} size="md" />}
                  title={r.name}
                  subtitle={r.who}
                  trailing={<Badge tone={r.tone}>{r.amount}</Badge>}
                />
                {i < recent.length - 1 ? <Divider /> : null}
              </View>
            ))}
          </Stack>
        </Card>
      </ScrollView>
      <TabBar active={tab} onChange={setTab} items={[
        { key: 'home', label: 'Home', icon: House },
        { key: 'reports', label: 'Reports', icon: ChartColumn },
        { key: 'alerts', label: 'Alerts', icon: Bell, badge: 3 },
        { key: 'profile', label: 'Profile', icon: User },
      ]} />
    </View>
  );
}

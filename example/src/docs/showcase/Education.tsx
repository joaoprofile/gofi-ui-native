import { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { House, BookOpen, GraduationCap, User } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from 'gofi-ui-native';
import { Text } from 'gofi-ui-native';
import { Row, Stack } from 'gofi-ui-native';
import { Card } from 'gofi-ui-native';
import { Header } from 'gofi-ui-native';
import { TabBar } from 'gofi-ui-native';
import { SegmentedControl } from 'gofi-ui-native';
import { Progress } from 'gofi-ui-native';
import { AvatarStack } from 'gofi-ui-native';
import { Badge } from 'gofi-ui-native';
import { Button } from 'gofi-ui-native';

const courses = [
  { name: 'Monetary Policy & Banking', teacher: 'Ida Aguirre', done: 14, total: 22, students: [{ name: 'Ann Lee' }, { name: 'Bo Kim' }, { name: 'Cy Roy' }, { name: 'Di Fox' }], cta: 'Continue' },
  { name: 'International Economics', teacher: 'Tiffany Fowler', done: 12, total: 46, students: [{ name: 'Eva Mu' }, { name: 'Fox Li' }, { name: 'Gus Po' }], cta: 'Continue' },
  { name: 'Marketing Strategy', teacher: 'Rory Todd', done: 22, total: 22, students: [{ name: 'Hal Ng' }, { name: 'Ivy Su' }], cta: 'Review' },
];

export function EducationApp() {
  const t = useTheme();
  const insets = useSafeAreaInsets();
  const [tab, setTab] = useState('learn');
  const [filter, setFilter] = useState<'progress' | 'done'>('progress');

  const list = courses.filter((c) => (filter === 'done' ? c.done === c.total : true));

  return (
    <View style={{ flex: 1, backgroundColor: t.surfacePage }}>
      <Header title="My courses" variant="brand" safeTop />
      <ScrollView contentContainerStyle={{ padding: t.space[4], paddingBottom: insets.bottom + t.space[10], gap: t.space[4] }} showsVerticalScrollIndicator={false}>
        <Card variant="brand">
          <Text variant="bodySm" color="onBrand">Keep it up 👏</Text>
          <Text variant="h2" color="onBrand">3 courses in progress</Text>
          <View style={{ marginTop: t.space[2] }}><Progress value={48} max={100} color={t.textOnBrand} label="Overall progress" /></View>
        </Card>

        <SegmentedControl value={filter} onChange={setFilter} options={[{ value: 'progress', label: 'In progress' }, { value: 'done', label: 'Completed' }]} />

        <Stack gap={3}>
          {list.map((c) => {
            const pct = Math.round((c.done / c.total) * 100);
            return (
              <Card key={c.name}>
                <Row justify="space-between">
                  <View style={{ flex: 1, gap: 2 }}>
                    <Text variant="h3" numberOfLines={1}>{c.name}</Text>
                    <Text variant="bodySm" color="secondary">{c.teacher}</Text>
                  </View>
                  <Badge tone={pct === 100 ? 'success' : 'info'}>{`${pct}%`}</Badge>
                </Row>
                <Progress value={c.done} max={c.total} label={`${c.done} of ${c.total} lessons`} />
                <Row justify="space-between" align="center">
                  <AvatarStack items={c.students} max={3} size="xs" />
                  <Button size="sm" variant={pct === 100 ? 'secondary' : 'primary'} onPress={() => {}}>{c.cta}</Button>
                </Row>
              </Card>
            );
          })}
        </Stack>

        <Text variant="h3">Recommended</Text>
        <Row gap={3}>
          {['Statistics for Business', 'Intro to Finance'].map((r) => (
            <Card key={r} variant="outlined" style={{ flex: 1 }}>
              <Badge tone="neutral">Data</Badge>
              <Text variant="bodySm" style={{ fontWeight: '600' }}>{r}</Text>
              <Button size="sm" variant="ghost" onPress={() => {}}>Learn more</Button>
            </Card>
          ))}
        </Row>
      </ScrollView>
      <TabBar active={tab} onChange={setTab} items={[
        { key: 'home', label: 'Home', icon: House },
        { key: 'learn', label: 'Learn', icon: BookOpen },
        { key: 'grades', label: 'Grades', icon: GraduationCap },
        { key: 'profile', label: 'Profile', icon: User },
      ]} />
    </View>
  );
}

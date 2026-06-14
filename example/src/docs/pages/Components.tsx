import { useState } from 'react';
import { View } from 'react-native';
import { Plus, Search, Bell, Home, User, Inbox } from 'lucide-react-native';
import { useTheme } from 'gofi-ui-native';
import { Text } from 'gofi-ui-native';
import { Row, Stack, Divider } from 'gofi-ui-native';
import { Button, IconButton } from 'gofi-ui-native';
import { Badge, Chip } from 'gofi-ui-native';
import { Avatar, AvatarStack } from 'gofi-ui-native';
import { Skeleton, Spinner } from 'gofi-ui-native';
import { Field } from 'gofi-ui-native';
import { Input } from 'gofi-ui-native';
import { Switch, Checkbox, Radio } from 'gofi-ui-native';
import { SegmentedControl } from 'gofi-ui-native';
import { Card } from 'gofi-ui-native';
import { ListItem } from 'gofi-ui-native';
import { FeatureList } from 'gofi-ui-native';
import { EmptyState } from 'gofi-ui-native';
import { Progress } from 'gofi-ui-native';
import { Header } from 'gofi-ui-native';
import { BottomSheet } from 'gofi-ui-native';
import { ModalDialog, ConfirmDialog } from 'gofi-ui-native';
import { useToast } from 'gofi-ui-native';
import { BarChart, DonutChart, Sparkline } from 'gofi-ui-native';
import { DocPage, DocSection, Example, PropsTable } from '../ui';

const people = [
  { name: 'Anna Carter' }, { name: 'Bruno Silva' }, { name: 'Carla Reis' }, { name: 'Diego Luz' }, { name: 'Eva Mota' },
];

export function AtomsPage() {
  const t = useTheme();
  return (
    <DocPage group="Components" title="Atoms" lead="The primitives: Text, Button, Badge, Avatar, loading.">
      <DocSection title="Button" description="Primary is a filled pill. Variants and sizes.">
        <Example>
          <Row gap={2} wrap>
            <Button variant="primary" onPress={() => {}}>Primary</Button>
            <Button variant="secondary" onPress={() => {}}>Secondary</Button>
            <Button variant="ghost" onPress={() => {}}>Ghost</Button>
            <Button variant="danger" onPress={() => {}}>Delete</Button>
            <Button variant="brand" onPress={() => {}}>Brand</Button>
          </Row>
          <Row gap={2} wrap align="center">
            <Button size="sm" onPress={() => {}}>Small</Button>
            <Button size="md" onPress={() => {}}>Medium</Button>
            <Button size="lg" onPress={() => {}}>Large</Button>
            <Button loading onPress={() => {}}>Saving</Button>
            <IconButton accessibilityLabel="Add" variant="solid"><Plus size={20} color="#fff" /></IconButton>
          </Row>
          <Button variant="primary" full iconStart={<Plus size={18} color="#fff" />} onPress={() => {}}>Full width</Button>
        </Example>
        <PropsTable rows={[
          { name: 'variant', type: "'primary'|'secondary'|'ghost'|'danger'|'brand'", default: 'primary', description: 'Visual role.' },
          { name: 'size', type: "'sm'|'md'|'lg'", default: 'md', description: 'Height/padding.' },
          { name: 'full', type: 'boolean', description: 'Stretches to full width (common on mobile).' },
          { name: 'loading', type: 'boolean', description: 'Spinner + busy state; keeps the label.' },
          { name: 'onPress', type: '() => void', required: true, description: 'Press handler.' } as never,
        ]} />
      </DocSection>

      <DocSection title="Badge · Chip">
        <Example>
          <Row gap={2} wrap>
            <Badge tone="success">Active</Badge>
            <Badge tone="warning">Pending</Badge>
            <Badge tone="danger">Overdue</Badge>
            <Badge tone="info">New</Badge>
            <Badge tone="neutral">Draft</Badge>
            <Badge tone="danger" accessibilityLabel="3 unread">3</Badge>
          </Row>
          <Row gap={2} wrap>
            <Chip selected onPress={() => {}}>All</Chip>
            <Chip onPress={() => {}}>Active</Chip>
            <Chip onPress={() => {}} onRemove={() => {}}>Filter</Chip>
          </Row>
        </Example>
      </DocSection>

      <DocSection title="Avatar">
        <Example>
          <Row gap={3} align="center" wrap>
            <Avatar name="Anna Carter" size="sm" />
            <Avatar name="Bruno Silva" size="md" status="online" />
            <Avatar name="Carla Reis" size="lg" />
            <Avatar name="Diego Luz" size="xl" status="offline" />
            <AvatarStack items={people} max={3} />
          </Row>
        </Example>
      </DocSection>

      <DocSection title="Loading" description="Skeleton for known layout; spinner for spot actions.">
        <Example>
          <Stack gap={2}>
            <Skeleton height={20} width="60%" />
            <Skeleton height={14} />
            <Skeleton height={14} width="80%" />
          </Stack>
          <Row gap={3} align="center"><Spinner /><Text variant="bodySm" color="secondary">Loading…</Text></Row>
        </Example>
      </DocSection>
    </DocPage>
  );
}

export function FormsPage() {
  const [text, setText] = useState('');
  const [pwd, setPwd] = useState('');
  const [on, setOn] = useState(true);
  const [check, setCheck] = useState(false);
  const [plan, setPlan] = useState<'free' | 'pro'>('free');
  const [view, setView] = useState<'list' | 'grid'>('list');
  const t = useTheme();

  return (
    <DocPage group="Components" title="Forms" lead="Field + Input, toggles and segmented control. Labels always visible; errors with text.">
      <DocSection title="Field + Input">
        <Example>
          <Field label="Email" hint="We use it to send your access." required>
            <Input placeholder="you@example.com" keyboardType="email-address" autoCapitalize="none" value={text} onChangeText={setText} iconStart={<Search size={18} color={t.textSecondary} />} />
          </Field>
          <Field label="Password" error={pwd.length > 0 && pwd.length < 6 ? 'At least 6 characters' : undefined}>
            <Input password placeholder="••••••••" value={pwd} onChangeText={setPwd} />
          </Field>
        </Example>
      </DocSection>

      <DocSection title="Toggles">
        <Example>
          <Switch label="Push notifications" value={on} onValueChange={setOn} />
          <Divider />
          <Checkbox label="I accept the terms" value={check} onValueChange={setCheck} />
          <Divider />
          <Stack gap={1}>
            <Text variant="bodySm" color="secondary" style={{ fontWeight: '600' }}>Plan</Text>
            <Radio label="Free" selected={plan === 'free'} value={plan === 'free'} onValueChange={() => setPlan('free')} />
            <Radio label="Pro" selected={plan === 'pro'} value={plan === 'pro'} onValueChange={() => setPlan('pro')} />
          </Stack>
        </Example>
      </DocSection>

      <DocSection title="Segmented Control">
        <Example>
          <SegmentedControl value={view} onChange={setView} options={[{ value: 'list', label: 'List' }, { value: 'grid', label: 'Grid' }]} />
        </Example>
      </DocSection>
    </DocPage>
  );
}

export function ContainersPage() {
  const t = useTheme();
  return (
    <DocPage group="Components" title="Containers & Data" lead="Card (with the brand hero), ListItem, FeatureList, EmptyState and Progress.">
      <DocSection title="Card">
        <Example>
          <Card variant="default"><Text variant="h3">Default</Text><Text variant="bodySm" color="secondary">Surface with border + soft shadow.</Text></Card>
          <Card variant="brand"><Text variant="h3" color="onBrand">Brand</Text><Text variant="bodySm" color="onBrand">The hero surface — navy text on #AAD7FF.</Text></Card>
          <Card variant="outlined"><Text variant="h3">Outlined</Text><Text variant="bodySm" color="secondary">Border only, high density.</Text></Card>
        </Example>
      </DocSection>

      <DocSection title="ListItem">
        <Example padded={false}>
          <View style={{ padding: t.space[4] }}>
            {people.slice(0, 3).map((p, i) => (
              <View key={p.name}>
                <ListItem leading={<Avatar name={p.name} size="md" />} title={p.name} subtitle="Tap to open" chevron onPress={() => {}} />
                {i < 2 ? <Divider /> : null}
              </View>
            ))}
          </View>
        </Example>
      </DocSection>

      <DocSection title="FeatureList">
        <Example padded={false}>
          <Card variant="brand">
            <Text variant="h3" color="onBrand">Pro plan</Text>
            <FeatureList onBrand items={[{ label: 'Unlimited projects' }, { label: 'Priority support' }, { label: 'Advanced reports' }]} />
          </Card>
        </Example>
      </DocSection>

      <DocSection title="Progress">
        <Example>
          <Stack gap={3}>
            <Row gap={2}><Text variant="bodySm" style={{ width: 48 }}>14/22</Text><View style={{ flex: 1 }}><Progress value={14} max={22} label="Progress" /></View></Row>
            <Row gap={2}><Text variant="bodySm" style={{ width: 48 }}>100%</Text><View style={{ flex: 1 }}><Progress value={22} max={22} label="Complete" /></View></Row>
          </Stack>
        </Example>
      </DocSection>

      <DocSection title="EmptyState">
        <Example>
          <EmptyState variant="no-results" icon={<Inbox size={28} color={t.textSecondary} />} title="No results" description="Try another term or clear the filters." action={<Button variant="secondary" onPress={() => {}}>Clear filters</Button>} />
        </Example>
      </DocSection>
    </DocPage>
  );
}

export function OverlaysPage() {
  const [sheet, setSheet] = useState(false);
  const [modal, setModal] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const toast = useToast();
  const t = useTheme();

  return (
    <DocPage group="Components" title="Overlay & Feedback" lead="Header, BottomSheet, Modal/Confirm and Toast.">
      <DocSection title="Header">
        <Example padded={false}>
          <Header title="Screen title" onBack={() => {}} safeTop={false} actions={<IconButton accessibilityLabel="Notifications"><Bell size={20} color={t.textColor} /></IconButton>} />
          <Header title="Brand header" variant="brand" safeTop={false} onBack={() => {}} />
        </Example>
      </DocSection>

      <DocSection title="Overlays">
        <Example>
          <Row gap={2} wrap>
            <Button variant="secondary" onPress={() => setSheet(true)}>Bottom sheet</Button>
            <Button variant="secondary" onPress={() => setModal(true)}>Modal</Button>
            <Button variant="danger" onPress={() => setConfirm(true)}>Delete…</Button>
          </Row>
        </Example>
      </DocSection>

      <DocSection title="Toast" description="Transient feedback with optional Undo. Announced to screen readers.">
        <Example>
          <Row gap={2} wrap>
            <Button variant="secondary" onPress={() => toast({ tone: 'success', message: 'Saved', action: { label: 'Undo', onPress: () => {} } })}>Success + Undo</Button>
            <Button variant="secondary" onPress={() => toast({ tone: 'danger', message: 'Could not load data' })}>Error</Button>
          </Row>
        </Example>
      </DocSection>

      <BottomSheet open={sheet} onClose={() => setSheet(false)} title="Sort by">
        {['Newest', 'Oldest', 'A–Z'].map((o) => <ListItem key={o} title={o} onPress={() => setSheet(false)} />)}
      </BottomSheet>
      <ModalDialog open={modal} onClose={() => setModal(false)} title="Modal dialog" footer={<Row gap={2} justify="flex-end"><Button variant="ghost" onPress={() => setModal(false)}>Close</Button></Row>}>
        <Text variant="bodySm" color="secondary">On mobile, prefer a bottom sheet for most cases.</Text>
      </ModalDialog>
      <ConfirmDialog open={confirm} onClose={() => setConfirm(false)} title="Delete record?" description="This action cannot be undone." confirmLabel="Delete" onConfirm={() => toast({ tone: 'success', message: 'Deleted' })} />
    </DocPage>
  );
}

export function ChartsPage() {
  return (
    <DocPage group="Components" title="Charts" lead="Lightweight charts via react-native-svg, themed by the tokens.">
      <DocSection title="Bars">
        <Example>
          <BarChart ariaLabel="Sales by month" data={[{ label: 'Jan', value: 32 }, { label: 'Feb', value: 41 }, { label: 'Mar', value: 38 }, { label: 'Apr', value: 52 }, { label: 'May', value: 49 }, { label: 'Jun', value: 63 }]} />
        </Example>
      </DocSection>
      <DocSection title="Donut">
        <Example>
          <DonutChart ariaLabel="Traffic source" centerLabel="100%" data={[{ label: 'Direct', value: 42 }, { label: 'Organic', value: 28 }, { label: 'Social', value: 18 }, { label: 'Referral', value: 12 }]} />
        </Example>
      </DocSection>
      <DocSection title="Sparkline">
        <Example>
          <Sparkline ariaLabel="Balance trend" data={[12, 18, 15, 22, 28, 24, 33, 31, 38]} />
        </Example>
      </DocSection>
    </DocPage>
  );
}

import { useState } from 'react';
import { View, Pressable } from 'react-native';
import { Plus, Search, Bell, House, User, Inbox, LogIn, UserPlus, Database, ArrowRight } from 'lucide-react-native';
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
import { TabBar } from 'gofi-ui-native';
import { BottomSheet } from 'gofi-ui-native';
import { ModalDialog, ConfirmDialog } from 'gofi-ui-native';
import { useToast } from 'gofi-ui-native';
import { BarChart, DonutChart, Sparkline } from 'gofi-ui-native';
import { useRoute } from '../useRoute';
import { DocPage, DocSection, Example, PropsTable } from '../ui';

/** Compact link cards to the full-screen Patterns built from these form components. */
function PatternLinks() {
  const t = useTheme();
  const [, navigate] = useRoute();
  const links = [
    { id: 'pattern-login', name: 'Login / Sign in', desc: 'Email + password, biometrics, Google / Apple SSO.', Icon: LogIn },
    { id: 'pattern-register', name: 'Register / Sign up', desc: 'Validation, strength meter, terms consent.', Icon: UserPlus },
    { id: 'pattern-crud', name: 'CRUD', desc: 'List, create/edit in a sheet, delete with undo.', Icon: Database },
  ];
  return (
    <View style={{ gap: t.space[3] }}>
      {links.map(({ id, name, desc, Icon }) => (
        <Pressable
          key={id}
          accessibilityRole="button"
          accessibilityLabel={name}
          onPress={() => navigate(id)}
          style={({ pressed }) => ({
            flexDirection: 'row', alignItems: 'center', gap: t.space[3],
            borderWidth: 1, borderColor: t.surfaceBorder, borderRadius: t.radius.lg, backgroundColor: t.surfaceCard,
            padding: t.space[4], opacity: pressed ? 0.92 : 1,
          })}
        >
          <View style={{ width: 40, height: 40, borderRadius: t.radius.md, backgroundColor: t.colorBrand, alignItems: 'center', justifyContent: 'center' }}>
            <Icon size={20} color={t.textOnBrand} />
          </View>
          <View style={{ flex: 1, gap: 2 }}>
            <Text variant="bodySm" style={{ fontWeight: '700' }}>{name}</Text>
            <Text variant="caption" color="secondary">{desc}</Text>
          </View>
          <ArrowRight size={18} color={t.colorAction} />
        </Pressable>
      ))}
    </View>
  );
}

const people = [
  { name: 'Anna Carter' }, { name: 'Bruno Silva' }, { name: 'Carla Reis' }, { name: 'Diego Luz' }, { name: 'Eva Mota' },
];

export function AtomsPage() {
  return (
    <DocPage group="Components" title="Atoms" lead="The primitives: Text, Button, Badge, Avatar, loading.">
      <DocSection title="Text" description="One component, every type ramp. Variants set size/weight; color maps to a token.">
        <Example code={`<Stack gap={2}>
  <Text variant="display">Display</Text>
  <Text variant="h1">Heading 1</Text>
  <Text variant="h2">Heading 2</Text>
  <Text variant="h3">Heading 3</Text>
  <Text variant="body">Body — the default paragraph size.</Text>
  <Text variant="bodySm" color="secondary">Body small · secondary</Text>
  <Text variant="caption" color="action">CAPTION · ACTION</Text>
</Stack>`}>
          <Stack gap={2}>
            <Text variant="display">Display</Text>
            <Text variant="h1">Heading 1</Text>
            <Text variant="h2">Heading 2</Text>
            <Text variant="h3">Heading 3</Text>
            <Text variant="body">Body — the default paragraph size.</Text>
            <Text variant="bodySm" color="secondary">Body small · secondary</Text>
            <Text variant="caption" color="action">CAPTION · ACTION</Text>
          </Stack>
        </Example>
        <PropsTable rows={[
          { name: 'variant', type: "'display'|'h1'|'h2'|'h3'|'body'|'bodySm'|'caption'", default: 'body', description: 'Type ramp (size/line/weight).' },
          { name: 'color', type: "'default'|'secondary'|'onBrand'|'action'|'danger'|'inherit'", default: 'default', description: 'Maps to a theme token.' },
          { name: 'numberOfLines', type: 'number', description: 'Truncates with an ellipsis.' },
        ]} />
      </DocSection>

      <DocSection title="Button" description="Primary is a filled pill. Variants and sizes.">
        <Example code={`<Row gap={2} wrap>
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
  <IconButton accessibilityLabel="Add" variant="solid">
    <Plus size={20} color="#fff" />
  </IconButton>
</Row>

<Button variant="primary" full iconStart={<Plus size={18} color="#fff" />} onPress={() => {}}>
  Full width
</Button>`}>
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
          { name: 'onPress', type: '() => void', description: 'Press handler (required).' },
        ]} />
      </DocSection>

      <DocSection title="Badge · Chip">
        <Example code={`<Row gap={2} wrap>
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
</Row>`}>
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
        <Example code={`<Row gap={3} align="center" wrap>
  <Avatar name="Anna Carter" size="sm" />
  <Avatar name="Bruno Silva" size="md" status="online" />
  <Avatar name="Carla Reis" size="lg" />
  <Avatar name="Diego Luz" size="xl" status="offline" />
  <AvatarStack items={people} max={3} />
</Row>`}>
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
        <Example code={`<Stack gap={2}>
  <Skeleton height={20} width="60%" />
  <Skeleton height={14} />
  <Skeleton height={14} width="80%" />
</Stack>

<Row gap={3} align="center">
  <Spinner />
  <Text variant="bodySm" color="secondary">Loading…</Text>
</Row>`}>
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
        <Example code={`const [text, setText] = useState('');
const [pwd, setPwd] = useState('');

<Field label="Email" hint="We use it to send your access." required>
  <Input
    placeholder="you@example.com"
    keyboardType="email-address"
    autoCapitalize="none"
    value={text}
    onChangeText={setText}
    iconStart={<Search size={18} color={t.textSecondary} />}
  />
</Field>

<Field label="Password" error={pwd.length > 0 && pwd.length < 6 ? 'At least 6 characters' : undefined}>
  <Input password placeholder="••••••••" value={pwd} onChangeText={setPwd} />
</Field>`}>
          <Field label="Email" hint="We use it to send your access." required>
            <Input placeholder="you@example.com" keyboardType="email-address" autoCapitalize="none" value={text} onChangeText={setText} iconStart={<Search size={18} color={t.textSecondary} />} />
          </Field>
          <Field label="Password" error={pwd.length > 0 && pwd.length < 6 ? 'At least 6 characters' : undefined}>
            <Input password placeholder="••••••••" value={pwd} onChangeText={setPwd} />
          </Field>
        </Example>
      </DocSection>

      <DocSection title="Toggles">
        <Example code={`const [on, setOn] = useState(true);
const [check, setCheck] = useState(false);
const [plan, setPlan] = useState<'free' | 'pro'>('free');

<Switch label="Push notifications" value={on} onValueChange={setOn} />
<Divider />
<Checkbox label="I accept the terms" value={check} onValueChange={setCheck} />
<Divider />
<Radio label="Free" selected={plan === 'free'} value={plan === 'free'} onValueChange={() => setPlan('free')} />
<Radio label="Pro" selected={plan === 'pro'} value={plan === 'pro'} onValueChange={() => setPlan('pro')} />`}>
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
        <Example code={`const [view, setView] = useState<'list' | 'grid'>('list');

<SegmentedControl
  value={view}
  onChange={setView}
  options={[
    { value: 'list', label: 'List' },
    { value: 'grid', label: 'Grid' },
  ]}
/>`}>
          <SegmentedControl value={view} onChange={setView} options={[{ value: 'list', label: 'List' }, { value: 'grid', label: 'Grid' }]} />
        </Example>
      </DocSection>

      <DocSection title="Patterns built from forms" description="Full-screen flows assembled from these components. Open one to see it in context.">
        <PatternLinks />
      </DocSection>
    </DocPage>
  );
}

export function ContainersPage() {
  const t = useTheme();
  return (
    <DocPage group="Components" title="Containers & Data" lead="Layout primitives, Card (with the brand hero), ListItem, FeatureList, EmptyState and Progress.">
      <DocSection title="Layout — Stack · Row · Divider" description="Token-gap primitives. Stack is vertical, Row is horizontal; Divider is a hairline.">
        <Example code={`<Stack gap={3}>
  <Text variant="bodySm" color="secondary">Stack — vertical, gap from the token scale</Text>
  <Row gap={2} wrap>
    <Badge tone="info">One</Badge>
    <Badge tone="success">Two</Badge>
    <Badge tone="warning">Three</Badge>
  </Row>
  <Divider />
  <Row justify="space-between" align="center">
    <Text variant="body">Row — justify + align</Text>
    <Button size="sm" onPress={() => {}}>Action</Button>
  </Row>
</Stack>`}>
          <Stack gap={3}>
            <Text variant="bodySm" color="secondary">Stack — vertical, gap from the token scale</Text>
            <Row gap={2} wrap>
              <Badge tone="info">One</Badge>
              <Badge tone="success">Two</Badge>
              <Badge tone="warning">Three</Badge>
            </Row>
            <Divider />
            <Row justify="space-between" align="center">
              <Text variant="body">Row — justify + align</Text>
              <Button size="sm" onPress={() => {}}>Action</Button>
            </Row>
          </Stack>
        </Example>
      </DocSection>

      <DocSection title="Card" description="default, brand (the hero), outlined and elevated surfaces.">
        <Example code={`<Card variant="default">
  <Text variant="h3">Default</Text>
  <Text variant="bodySm" color="secondary">Surface with border + soft shadow.</Text>
</Card>

<Card variant="brand">
  <Text variant="h3" color="onBrand">Brand</Text>
  <Text variant="bodySm" color="onBrand">The hero surface — navy text on #AAD7FF.</Text>
</Card>

<Card variant="outlined">
  <Text variant="h3">Outlined</Text>
  <Text variant="bodySm" color="secondary">Border only, high density.</Text>
</Card>

<Card variant="elevated" onPress={() => {}} accessibilityLabel="Open">
  <Text variant="h3">Elevated · pressable</Text>
  <Text variant="bodySm" color="secondary">Raised surface; tappable as a whole.</Text>
</Card>`}>
          <Card variant="default"><Text variant="h3">Default</Text><Text variant="bodySm" color="secondary">Surface with border + soft shadow.</Text></Card>
          <Card variant="brand"><Text variant="h3" color="onBrand">Brand</Text><Text variant="bodySm" color="onBrand">The hero surface — navy text on #AAD7FF.</Text></Card>
          <Card variant="outlined"><Text variant="h3">Outlined</Text><Text variant="bodySm" color="secondary">Border only, high density.</Text></Card>
          <Card variant="elevated" onPress={() => {}} accessibilityLabel="Open"><Text variant="h3">Elevated · pressable</Text><Text variant="bodySm" color="secondary">Raised surface; tappable as a whole.</Text></Card>
        </Example>
      </DocSection>

      <DocSection title="ListItem">
        <Example padded={false} code={`{people.slice(0, 3).map((p, i) => (
  <View key={p.name}>
    <ListItem
      leading={<Avatar name={p.name} size="md" />}
      title={p.name}
      subtitle="Tap to open"
      chevron
      onPress={() => {}}
    />
    {i < 2 ? <Divider /> : null}
  </View>
))}`}>
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
        <Example padded={false} code={`<Card variant="brand">
  <Text variant="h3" color="onBrand">Pro plan</Text>
  <FeatureList
    onBrand
    items={[
      { label: 'Unlimited projects' },
      { label: 'Priority support' },
      { label: 'Advanced reports' },
    ]}
  />
</Card>`}>
          <Card variant="brand">
            <Text variant="h3" color="onBrand">Pro plan</Text>
            <FeatureList onBrand items={[{ label: 'Unlimited projects' }, { label: 'Priority support' }, { label: 'Advanced reports' }]} />
          </Card>
        </Example>
      </DocSection>

      <DocSection title="Progress">
        <Example code={`<Progress value={14} max={22} label="Progress" />
<Progress value={22} max={22} label="Complete" />`}>
          <Stack gap={3}>
            <Row gap={2}><Text variant="bodySm" style={{ width: 48 }}>14/22</Text><View style={{ flex: 1 }}><Progress value={14} max={22} label="Progress" /></View></Row>
            <Row gap={2}><Text variant="bodySm" style={{ width: 48 }}>100%</Text><View style={{ flex: 1 }}><Progress value={22} max={22} label="Complete" /></View></Row>
          </Stack>
        </Example>
      </DocSection>

      <DocSection title="EmptyState">
        <Example code={`<EmptyState
  variant="no-results"
  icon={<Inbox size={28} color={t.textSecondary} />}
  title="No results"
  description="Try another term or clear the filters."
  action={<Button variant="secondary" onPress={() => {}}>Clear filters</Button>}
/>`}>
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
  const [tab, setTab] = useState('home');
  const toast = useToast();
  const t = useTheme();

  return (
    <DocPage group="Components" title="Overlay & Feedback" lead="Header, TabBar, BottomSheet, Modal/Confirm and Toast.">
      <DocSection title="Header">
        <Example padded={false} code={`<Header
  title="Screen title"
  onBack={() => {}}
  actions={
    <IconButton accessibilityLabel="Notifications">
      <Bell size={20} color={t.textColor} />
    </IconButton>
  }
/>

<Header title="Brand header" variant="brand" onBack={() => {}} />`}>
          <Header title="Screen title" onBack={() => {}} safeTop={false} actions={<IconButton accessibilityLabel="Notifications"><Bell size={20} color={t.textColor} /></IconButton>} />
          <Header title="Brand header" variant="brand" safeTop={false} onBack={() => {}} />
        </Example>
      </DocSection>

      <DocSection title="TabBar" description="Bottom navigation for 3–5 top destinations. Respects the bottom safe area.">
        <Example padded={false} code={`const [tab, setTab] = useState('home');

<TabBar
  active={tab}
  onChange={setTab}
  items={[
    { key: 'home', label: 'Home', icon: House },
    { key: 'search', label: 'Search', icon: Search },
    { key: 'inbox', label: 'Inbox', icon: Inbox, badge: 3 },
    { key: 'profile', label: 'Profile', icon: User },
  ]}
/>`}>
          <TabBar
            active={tab}
            onChange={setTab}
            items={[
              { key: 'home', label: 'Home', icon: House },
              { key: 'search', label: 'Search', icon: Search },
              { key: 'inbox', label: 'Inbox', icon: Inbox, badge: 3 },
              { key: 'profile', label: 'Profile', icon: User },
            ]}
          />
        </Example>
      </DocSection>

      <DocSection title="BottomSheet · Modal · Confirm" description="Tap to open each overlay.">
        <Example code={`const [sheet, setSheet] = useState(false);
const [modal, setModal] = useState(false);
const [confirm, setConfirm] = useState(false);

<Button variant="secondary" onPress={() => setSheet(true)}>Bottom sheet</Button>
<Button variant="secondary" onPress={() => setModal(true)}>Modal</Button>
<Button variant="danger" onPress={() => setConfirm(true)}>Delete…</Button>

<BottomSheet open={sheet} onClose={() => setSheet(false)} title="Sort by">
  {['Newest', 'Oldest', 'A–Z'].map((o) => (
    <ListItem key={o} title={o} onPress={() => setSheet(false)} />
  ))}
</BottomSheet>

<ModalDialog
  open={modal}
  onClose={() => setModal(false)}
  title="Modal dialog"
  footer={<Button variant="ghost" onPress={() => setModal(false)}>Close</Button>}
>
  <Text variant="bodySm" color="secondary">On mobile, prefer a bottom sheet for most cases.</Text>
</ModalDialog>

<ConfirmDialog
  open={confirm}
  onClose={() => setConfirm(false)}
  title="Delete record?"
  description="This action cannot be undone."
  confirmLabel="Delete"
  onConfirm={() => toast({ tone: 'success', message: 'Deleted' })}
/>`}>
          <Row gap={2} wrap>
            <Button variant="secondary" onPress={() => setSheet(true)}>Bottom sheet</Button>
            <Button variant="secondary" onPress={() => setModal(true)}>Modal</Button>
            <Button variant="danger" onPress={() => setConfirm(true)}>Delete…</Button>
          </Row>
        </Example>
      </DocSection>

      <DocSection title="Toast" description="Transient feedback with optional Undo. Announced to screen readers.">
        <Example code={`const toast = useToast();

<Button
  variant="secondary"
  onPress={() => toast({ tone: 'success', message: 'Saved', action: { label: 'Undo', onPress: () => {} } })}
>
  Success + Undo
</Button>

<Button variant="secondary" onPress={() => toast({ tone: 'danger', message: 'Could not load data' })}>
  Error
</Button>`}>
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
        <Example code={`<BarChart
  ariaLabel="Sales by month"
  data={[
    { label: 'Jan', value: 32 }, { label: 'Feb', value: 41 }, { label: 'Mar', value: 38 },
    { label: 'Apr', value: 52 }, { label: 'May', value: 49 }, { label: 'Jun', value: 63 },
  ]}
/>`}>
          <BarChart ariaLabel="Sales by month" data={[{ label: 'Jan', value: 32 }, { label: 'Feb', value: 41 }, { label: 'Mar', value: 38 }, { label: 'Apr', value: 52 }, { label: 'May', value: 49 }, { label: 'Jun', value: 63 }]} />
        </Example>
      </DocSection>
      <DocSection title="Donut">
        <Example code={`<DonutChart
  ariaLabel="Traffic source"
  centerLabel="100%"
  data={[
    { label: 'Direct', value: 42 }, { label: 'Organic', value: 28 },
    { label: 'Social', value: 18 }, { label: 'Referral', value: 12 },
  ]}
/>`}>
          <DonutChart ariaLabel="Traffic source" centerLabel="100%" data={[{ label: 'Direct', value: 42 }, { label: 'Organic', value: 28 }, { label: 'Social', value: 18 }, { label: 'Referral', value: 12 }]} />
        </Example>
      </DocSection>
      <DocSection title="Sparkline">
        <Example code={`<Sparkline ariaLabel="Balance trend" data={[12, 18, 15, 22, 28, 24, 33, 31, 38]} />`}>
          <Sparkline ariaLabel="Balance trend" data={[12, 18, 15, 22, 28, 24, 33, 31, 38]} />
        </Example>
      </DocSection>
    </DocPage>
  );
}

import { useState, useRef, useEffect, type ComponentType, type ReactNode } from 'react';
import { View, ScrollView, Pressable, Animated, Platform } from 'react-native';
import Svg, { Path, Defs, LinearGradient, Stop, Rect } from 'react-native-svg';
import {
  User, House, Eye, EyeOff, Inbox, ChevronRight, ArrowRight, CreditCard, Building2, Gauge,
  QrCode, Barcode, HandCoins, ArrowRightLeft, ArrowDownToLine, DollarSign,
  CircleCheck, Clock, Wallet, ShieldCheck, Pencil, UserPlus, Settings, TrendingUp,
  ChevronLeft, Plus, ArrowDownLeft, ArrowUpRight,
  type LucideProps,
} from 'lucide-react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from 'gofi-ui-native';
import { Text } from 'gofi-ui-native';
import { Row, Stack, Divider } from 'gofi-ui-native';
import { Card } from 'gofi-ui-native';
import { Button, IconButton } from 'gofi-ui-native';
import { Badge } from 'gofi-ui-native';
import { Progress } from 'gofi-ui-native';
import { Avatar } from 'gofi-ui-native';
import { ListItem } from 'gofi-ui-native';
import { Switch } from 'gofi-ui-native';
import { SegmentedControl } from 'gofi-ui-native';
import { Field } from 'gofi-ui-native';
import { Input } from 'gofi-ui-native';
import { BottomSheet } from 'gofi-ui-native';
import { Skeleton } from 'gofi-ui-native';
import { useToast } from 'gofi-ui-native';

const SCORE = 742;
const SCORE_MAX = 1000;

type Screen = 'home' | 'score' | 'profile' | 'transactions';
const USE_NATIVE = Platform.OS !== 'web';
/** Simulated API latency for the loading skeleton (not too fast, not too slow). */
const API_DELAY = 800;

/** Semicircle score gauge (SVG arc). */
function ScoreGauge({ value, max = SCORE_MAX, size = 200, showValue = true }: { value: number; max?: number; size?: number; showValue?: boolean }) {
  const t = useTheme();
  const f = Math.max(0, Math.min(1, value / max));
  const stroke = size < 100 ? 9 : 16;
  const r = (size - stroke) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const ang = Math.PI * (1 - f);
  const x = cx + r * Math.cos(ang);
  const y = cy - r * Math.sin(ang);
  const color = f >= 0.7 ? t.success : f >= 0.4 ? t.warning : t.danger;
  const bg = `M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`;
  const val = `M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${x} ${y}`;

  return (
    <View style={{ width: size, height: size / 2 + stroke, alignItems: 'center' }}>
      <Svg width={size} height={size / 2 + stroke}>
        <Path d={bg} stroke={t.surfaceBorder} strokeWidth={stroke} fill="none" strokeLinecap="round" />
        <Path d={val} stroke={color} strokeWidth={stroke} fill="none" strokeLinecap="round" />
      </Svg>
      {showValue ? (
        <View style={{ position: 'absolute', top: size * 0.26, alignItems: 'center' }}>
          <Text variant="display">{value}</Text>
          <Text variant="caption" color="secondary">of {max}</Text>
        </View>
      ) : null}
    </View>
  );
}

interface Factor { title: string; detail: string; points: string; ok: boolean; Icon: ComponentType<LucideProps>; }
const FACTORS: Factor[] = [
  { title: 'Bills paid on time', detail: 'Last 12 months', points: '+120', ok: true, Icon: CircleCheck },
  { title: 'Healthy credit usage', detail: 'Below 30% of the limit', points: '+80', ok: true, Icon: CreditCard },
  { title: 'Credit history', detail: '6 years of relationship', points: '+60', ok: true, Icon: Clock },
  { title: 'Proven income', detail: 'Update it to earn points', points: '+40', ok: false, Icon: Wallet },
  { title: 'Complete profile', detail: 'Confirm your address', points: '+20', ok: false, Icon: ShieldCheck },
];

/** Inner-page top bar — same light-blue brand surface and height as the main header. */
function InnerHeader({ title, onBack, actions }: { title: string; onBack: () => void; actions?: ReactNode }) {
  const t = useTheme();
  const insets = useSafeAreaInsets();
  return (
    <View style={{ backgroundColor: t.colorBrand, paddingTop: insets.top + t.space[3], paddingHorizontal: t.space[2], paddingBottom: t.space[6] }}>
      <Row justify="space-between" align="center" style={{ minHeight: 40 }}>
        <Row gap={1} align="center" style={{ flex: 1 }}>
          <IconButton accessibilityLabel="Back" onPress={onBack}>
            <ChevronLeft size={24} color={t.textOnBrand} />
          </IconButton>
          <Text variant="h3" color="onBrand" accessibilityRole="header" numberOfLines={1}>{title}</Text>
        </Row>
        {actions}
      </Row>
    </View>
  );
}

const SEED_TX: { id: string; type: 'income' | 'expense'; name: string; category: string; amount: number }[] = [
  { id: '1', type: 'income', name: 'Salary', category: 'Income', amount: 4320 },
  { id: '2', type: 'expense', name: 'Whole Foods', category: 'Groceries', amount: 82.4 },
  { id: '3', type: 'expense', name: 'Netflix', category: 'Subscriptions', amount: 15.9 },
  { id: '4', type: 'income', name: 'Freelance', category: 'Income', amount: 600 },
  { id: '5', type: 'expense', name: 'Uber', category: 'Transport', amount: 18.5 },
];
const usd = (n: number) => `$${n.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;

/** Income & expense entries — list, summary and an add form (bottom sheet). */
function TransactionsScreen({ onBack }: { onBack: () => void }) {
  const t = useTheme();
  const insets = useSafeAreaInsets();
  const toast = useToast();
  const [items, setItems] = useState(SEED_TX);
  const [filter, setFilter] = useState<'all' | 'income' | 'expense'>('all');
  const [sheet, setSheet] = useState(false);
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [amount, setAmount] = useState('');
  const [desc, setDesc] = useState('');

  const income = items.filter((i) => i.type === 'income').reduce((s, i) => s + i.amount, 0);
  const expense = items.filter((i) => i.type === 'expense').reduce((s, i) => s + i.amount, 0);
  const list = items.filter((i) => filter === 'all' || i.type === filter);

  const add = () => {
    const v = parseFloat(amount.replace(',', '.'));
    if (!v || !desc.trim()) return;
    setItems((prev) => [{ id: String(Date.now()), type, name: desc.trim(), category: type === 'income' ? 'Income' : 'Expense', amount: v }, ...prev]);
    setSheet(false);
    setAmount('');
    setDesc('');
    toast({ tone: 'success', message: type === 'income' ? 'Income added' : 'Expense added' });
  };

  return (
    <View style={{ flex: 1, backgroundColor: t.surfacePage }}>
      <InnerHeader
        title="Income & expenses"
        onBack={onBack}
        actions={<IconButton accessibilityLabel="Add entry" onPress={() => setSheet(true)}><Plus size={22} color={t.textOnBrand} /></IconButton>}
      />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: t.space[4], paddingBottom: insets.bottom + 96, gap: t.space[3] }}>
        <Row gap={3}>
          <Card variant="elevated" style={{ flex: 1 }}>
            <Row gap={1}><ArrowDownLeft size={16} color={t.success} /><Text variant="caption" color="secondary">Income</Text></Row>
            <Text variant="h3" style={{ color: t.success }}>{usd(income)}</Text>
          </Card>
          <Card variant="elevated" style={{ flex: 1 }}>
            <Row gap={1}><ArrowUpRight size={16} color={t.danger} /><Text variant="caption" color="secondary">Expenses</Text></Row>
            <Text variant="h3" style={{ color: t.danger }}>{usd(expense)}</Text>
          </Card>
        </Row>

        <SegmentedControl
          value={filter}
          onChange={setFilter}
          options={[{ value: 'all', label: 'All' }, { value: 'income', label: 'Income' }, { value: 'expense', label: 'Expenses' }]}
        />

        <Card variant="elevated">
          {list.length === 0 ? (
            <Text variant="bodySm" color="secondary" style={{ textAlign: 'center', paddingVertical: t.space[6] }}>No entries yet.</Text>
          ) : (
            <Stack gap={0}>
              {list.map((tx, i) => (
                <View key={tx.id}>
                  <ListItem
                    leading={
                      <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: tx.type === 'income' ? t.successBg : t.dangerBg, alignItems: 'center', justifyContent: 'center' }}>
                        {tx.type === 'income' ? <ArrowDownLeft size={18} color={t.success} /> : <ArrowUpRight size={18} color={t.danger} />}
                      </View>
                    }
                    title={tx.name}
                    subtitle={tx.category}
                    trailing={<Text variant="bodySm" style={{ fontWeight: '700', color: tx.type === 'income' ? t.success : t.textColor }}>{`${tx.type === 'income' ? '+' : '-'}${usd(tx.amount)}`}</Text>}
                  />
                  {i < list.length - 1 ? <Divider /> : null}
                </View>
              ))}
            </Stack>
          )}
        </Card>
      </ScrollView>

      <BottomSheet open={sheet} onClose={() => setSheet(false)} title="New entry">
        <SegmentedControl
          value={type}
          onChange={setType}
          options={[{ value: 'expense', label: 'Expense' }, { value: 'income', label: 'Income' }]}
        />
        <Field label="Amount" required>
          <Input keyboardType="decimal-pad" placeholder="0.00" value={amount} onChangeText={setAmount} iconStart={<DollarSign size={18} color={t.textSecondary} />} />
        </Field>
        <Field label="Description" required>
          <Input placeholder="e.g. Groceries, Salary…" value={desc} onChangeText={setDesc} />
        </Field>
        <Row gap={2} justify="flex-end" style={{ marginTop: t.space[2] }}>
          <Button variant="ghost" onPress={() => setSheet(false)}>Cancel</Button>
          <Button variant="primary" onPress={add}>Add</Button>
        </Row>
      </BottomSheet>
    </View>
  );
}

function ScoreScreen({ onBack }: { onBack: () => void }) {
  const t = useTheme();
  const insets = useSafeAreaInsets();
  return (
    <View style={{ flex: 1, backgroundColor: t.surfacePage }}>
      <InnerHeader title="Family score" onBack={onBack} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: t.space[4], paddingBottom: insets.bottom + 96, gap: t.space[4] }}>
        <Card variant="elevated">
          <View style={{ alignItems: 'center', gap: t.space[2] }}>
            <ScoreGauge value={SCORE} />
            <Badge tone="success">Very good</Badge>
            <Text variant="bodySm" color="secondary" style={{ textAlign: 'center' }}>
              Your score went up 18 points last month 🎉
            </Text>
          </View>
        </Card>

        <Text variant="h3">5 factors analyzed</Text>
        <Card variant="elevated">
          <Stack gap={0}>
            {FACTORS.map((fct, i) => (
              <View key={fct.title}>
                <Row gap={3} align="center" style={{ paddingVertical: t.space[2] }}>
                  <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: fct.ok ? t.successBg : t.warningBg, alignItems: 'center', justifyContent: 'center' }}>
                    <fct.Icon size={18} color={fct.ok ? t.success : t.warning} />
                  </View>
                  <Stack gap={0} style={{ flex: 1 }}>
                    <Text variant="bodySm" style={{ fontWeight: '600' }}>{fct.title}</Text>
                    <Text variant="caption" color="secondary">{fct.detail}</Text>
                  </Stack>
                  <Stack gap={0} align="flex-end">
                    <Text variant="bodySm" style={{ fontWeight: '700', color: fct.ok ? t.success : t.textSecondary }}>{fct.points}</Text>
                    <Badge tone={fct.ok ? 'success' : 'warning'}>{fct.ok ? 'On track' : 'Pending'}</Badge>
                  </Stack>
                </Row>
                {i < FACTORS.length - 1 ? <Divider /> : null}
              </View>
            ))}
          </Stack>
        </Card>

        <Button variant="primary" full onPress={() => {}}>How to improve your score</Button>
      </ScrollView>
    </View>
  );
}

interface Action { icon: ComponentType<LucideProps>; label: string; onPress?: () => void; }

function ActionButton({ icon: Icon, label, onPress }: Action) {
  const t = useTheme();
  const ink = t.mode === 'dark' ? t.textColor : t.palette.gray[700];
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={label} onPress={onPress} style={{ width: 72, alignItems: 'center', gap: 8 }}>
      <View style={{ width: 60, height: 60, borderRadius: 30, alignItems: 'center', justifyContent: 'center', backgroundColor: t.surfaceHover }}>
        <Icon size={26} color={ink} />
      </View>
      <Text variant="caption" numberOfLines={1} style={{ textAlign: 'center', fontWeight: '500' }}>{label}</Text>
    </Pressable>
  );
}

const PROMOS: { Icon: ComponentType<LucideProps>; title: string }[] = [
  { Icon: Building2, title: 'Organize your business money with a Business account' },
  { Icon: HandCoins, title: 'Advance your salary with low rates' },
  { Icon: ShieldCheck, title: 'Protect the family with Life insurance' },
  { Icon: TrendingUp, title: 'Make your money grow in Pots' },
];

/** Horizontal, swipeable promo carousel with pagination dots. */
function PromoCarousel() {
  const t = useTheme();
  const [w, setW] = useState(0);
  const [idx, setIdx] = useState(0);
  const promoBg = t.mode === 'dark' ? t.surfaceHover : t.palette.primary[100];
  const promoText = t.mode === 'dark' ? t.textColor : t.palette.primary[900];

  return (
    <View onLayout={(e) => setW(e.nativeEvent.layout.width)} style={{ gap: t.space[3] }}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        scrollEventThrottle={16}
        onMomentumScrollEnd={(e) => { if (w) setIdx(Math.round(e.nativeEvent.contentOffset.x / w)); }}
      >
        {w > 0 && PROMOS.map((p, i) => (
          <Pressable key={i} accessibilityRole="button" accessibilityLabel={p.title} onPress={() => {}} style={{ width: w }}>
            <Row gap={3} align="center" style={{ backgroundColor: promoBg, borderRadius: t.radius.lg, padding: t.space[4] }}>
              <View style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: t.surfaceCard, alignItems: 'center', justifyContent: 'center' }}>
                <p.Icon size={20} color={t.colorAction} />
              </View>
              <Text variant="bodySm" style={{ flex: 1, fontWeight: '500', color: promoText }}>{p.title}</Text>
              <ArrowRight size={20} color={promoText} />
            </Row>
          </Pressable>
        ))}
      </ScrollView>
      <Row gap={1} justify="center">
        {PROMOS.map((_, i) => (
          <View key={i} style={{ width: i === idx ? 18 : 7, height: 7, borderRadius: 4, backgroundColor: i === idx ? t.colorAction : t.surfaceBorder }} />
        ))}
      </Row>
    </View>
  );
}

function HomeScreen({ onOpenScore, onOpenProfile, onOpenTx }: { onOpenScore: () => void; onOpenProfile: () => void; onOpenTx: () => void }) {
  const t = useTheme();
  const insets = useSafeAreaInsets();
  const [show, setShow] = useState(true);

  const actions: Action[] = [
    { icon: QrCode, label: 'Send' },
    { icon: Barcode, label: 'Pay' },
    { icon: HandCoins, label: 'Borrow' },
    { icon: ArrowRightLeft, label: 'Transfer' },
    { icon: Gauge, label: 'Score', onPress: onOpenScore },
    { icon: DollarSign, label: 'Request' },
  ];

  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: insets.bottom + 96 }}>
      {/* Brand header */}
      <View style={{ backgroundColor: t.colorBrand, paddingTop: insets.top + t.space[3], paddingHorizontal: t.space[4], paddingBottom: t.space[10], gap: t.space[4] }}>
        <Row justify="space-between" align="flex-start">
          <Pressable accessibilityRole="button" accessibilityLabel="Lima family profile" onPress={onOpenProfile} style={{ flex: 1 }}>
            <Stack gap={2}>
              <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: '#FFFFFF55', alignItems: 'center', justifyContent: 'center' }}>
                <User size={22} color={t.textOnBrand} />
              </View>
              <Row gap={1} align="center">
                <Text variant="h3" color="onBrand" style={{ flexShrink: 1 }} numberOfLines={1}>Hi, Lima family</Text>
                <ChevronRight size={20} color={t.textOnBrand} />
              </Row>
            </Stack>
          </Pressable>
          <Row gap={1}>
            <IconButton accessibilityLabel={show ? 'Hide balance' : 'Show balance'} onPress={() => setShow((s) => !s)}>
              {show ? <Eye size={22} color={t.textOnBrand} /> : <EyeOff size={22} color={t.textOnBrand} />}
            </IconButton>
            <IconButton accessibilityLabel="Inbox"><Inbox size={22} color={t.textOnBrand} /></IconButton>
          </Row>
        </Row>
      </View>

      <View style={{ paddingHorizontal: t.space[4], paddingTop: t.space[4], paddingBottom: t.space[4], gap: t.space[3] }}>
        {/* Account + quick actions — blends with the page (like the original white sheet) */}
        <Card variant="elevated" style={{ backgroundColor: t.surfacePage }}>
          <Row justify="space-between" align="center">
            <Stack gap={1}>
              <Text variant="bodySm" color="secondary">Family account</Text>
              <Text variant="h2">{show ? '$1,356.98' : '$ ••••••'}</Text>
            </Stack>
            <ChevronRight size={22} color={t.textSecondary} />
          </Row>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: t.space[2], paddingTop: t.space[3] }}>
            {actions.map((a) => <ActionButton key={a.label} {...a} />)}
          </ScrollView>
        </Card>

        {/* My cards */}
        <Card variant="elevated" onPress={() => {}} accessibilityLabel="My cards">
          <Row justify="space-between" align="center">
            <Row gap={3}>
              <View style={{ width: 40, height: 40, borderRadius: t.radius.md, backgroundColor: t.colorActionSubtle, alignItems: 'center', justifyContent: 'center' }}>
                <CreditCard size={20} color={t.colorAction} />
              </View>
              <Text variant="body" style={{ fontWeight: '500' }}>My cards</Text>
            </Row>
            <ChevronRight size={20} color={t.textSecondary} />
          </Row>
        </Card>

        {/* Family score — section row (full gauge lives on the Score screen) */}
        <Card variant="elevated" onPress={onOpenScore} accessibilityLabel="Open family score">
          <Row justify="space-between" align="center">
            <Row gap={3}>
              <View style={{ width: 40, height: 40, borderRadius: t.radius.md, backgroundColor: t.colorActionSubtle, alignItems: 'center', justifyContent: 'center' }}>
                <Gauge size={20} color={t.colorAction} />
              </View>
              <Stack gap={0}>
                <Text variant="body" style={{ fontWeight: '500' }}>Family score</Text>
                <Text variant="caption" color="secondary">{`${SCORE} · Very good`}</Text>
              </Stack>
            </Row>
            <ChevronRight size={20} color={t.textSecondary} />
          </Row>
        </Card>

        {/* Income & expenses */}
        <Card variant="elevated" onPress={onOpenTx} accessibilityLabel="Income and expenses">
          <Row justify="space-between" align="center">
            <Row gap={3}>
              <View style={{ width: 40, height: 40, borderRadius: t.radius.md, backgroundColor: t.colorActionSubtle, alignItems: 'center', justifyContent: 'center' }}>
                <Wallet size={20} color={t.colorAction} />
              </View>
              <Text variant="body" style={{ fontWeight: '500' }}>Income & expenses</Text>
            </Row>
            <ChevronRight size={20} color={t.textSecondary} />
          </Row>
        </Card>

        {/* Promo carousel — swipeable with pagination dots */}
        <PromoCarousel />

        {/* Credit card */}
        <Card variant="elevated">
          <Row justify="space-between" align="center">
            <Text variant="h3">Credit card</Text>
            <ChevronRight size={20} color={t.textSecondary} />
          </Row>
          <Stack gap={1}>
            <Text variant="bodySm" color="secondary">Current bill</Text>
            <Text variant="h2">{show ? '$1,094.80' : '$ ••••••'}</Text>
          </Stack>
          <Divider />
          <Stack gap={2}>
            <Row justify="space-between">
              <Text variant="bodySm" color="secondary">Available limit</Text>
              <Text variant="bodySm" style={{ fontWeight: '600' }}>$3,905.20</Text>
            </Row>
            <Progress value={1094.8} max={5000} label="Used limit" />
          </Stack>
        </Card>
      </View>
    </ScrollView>
  );
}

function ProfileScreen({ onBack }: { onBack: () => void }) {
  const t = useTheme();
  const insets = useSafeAreaInsets();
  const [notif, setNotif] = useState(true);
  const members = [
    { name: 'Gabriela Lima', role: 'Owner' },
    { name: 'Leo Lima', role: 'Adult' },
    { name: 'Ana Lima', role: 'Teen' },
    { name: 'Theo Lima', role: 'Dependent' },
  ];
  const circle = (Icon: ComponentType<LucideProps>, bg: string, color: string) => (
    <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: bg, alignItems: 'center', justifyContent: 'center' }}>
      <Icon size={18} color={color} />
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: t.surfacePage }}>
      <InnerHeader title="Profile" onBack={onBack} actions={<IconButton accessibilityLabel="Edit profile"><Pencil size={20} color={t.textOnBrand} /></IconButton>} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: t.space[4], paddingBottom: insets.bottom + 96, gap: t.space[4] }}>
        <Card variant="elevated">
          <View style={{ alignItems: 'center', gap: t.space[2] }}>
            <Avatar name="Gabriela Lima" size="xl" />
            <Stack gap={0} align="center">
              <Text variant="h3">Gabriela Lima</Text>
              <Text variant="bodySm" color="secondary">Owner · Family account</Text>
            </Stack>
            <Button variant="secondary" onPress={() => {}}>Edit profile</Button>
          </View>
        </Card>

        <Text variant="h3">Members</Text>
        <Card variant="elevated">
          <Stack gap={0}>
            {members.map((m, i) => (
              <View key={m.name}>
                <ListItem leading={<Avatar name={m.name} size="md" />} title={m.name} subtitle={m.role} chevron onPress={() => {}} />
                {i < members.length - 1 ? <Divider /> : null}
              </View>
            ))}
            <Divider />
            <ListItem leading={circle(UserPlus, t.infoBg, t.colorAction)} title="Add member" chevron onPress={() => {}} />
          </Stack>
        </Card>

        <Text variant="h3">Settings</Text>
        <Card variant="elevated">
          <Switch label="Notifications" value={notif} onValueChange={setNotif} />
          <Divider />
          <ListItem leading={circle(ShieldCheck, t.successBg, t.success)} title="Security" chevron onPress={() => {}} />
          <Divider />
          <ListItem leading={circle(Eye, t.colorActionSubtle, t.colorAction)} title="Privacy" chevron onPress={() => {}} />
          <Divider />
          <ListItem leading={circle(Settings, t.colorActionSubtle, t.colorAction)} title="Preferences" chevron onPress={() => {}} />
        </Card>

        <Button variant="danger" full onPress={() => {}}>Sign out</Button>
      </ScrollView>
    </View>
  );
}

/** Floating pill nav with a prominent round "$" button — faithful to the reference. */
function FloatingTabBar({ active, onNavigate }: { active: Screen; onNavigate: (s: Screen) => void }) {
  const t = useTheme();
  const insets = useSafeAreaInsets();
  const toast = useToast();

  // Uniform neutral icons; the active screen gets a delicate selection tint.
  const ink = t.mode === 'dark' ? t.textColor : t.palette.gray[700];
  const Item = ({ name, to, action, label }: {
    name: 'home' | 'speedometer' | 'cash' | 'card' | 'person';
    to?: Screen;
    action?: () => void;
    label: string;
  }) => {
    const on = !!to && to === active;
    const iconName = (on ? name : `${name}-outline`) as keyof typeof Ionicons.glyphMap;
    return (
      <Pressable
        accessibilityRole={to ? 'tab' : 'button'}
        accessibilityState={to ? { selected: on } : undefined}
        accessibilityLabel={label}
        onPress={() => (action ? action() : to ? onNavigate(to) : undefined)}
        style={{ width: 60, height: 56, alignItems: 'center', justifyContent: 'center' }}
      >
        <View style={{ width: 50, height: 50, borderRadius: 25, alignItems: 'center', justifyContent: 'center', backgroundColor: on ? t.colorActionSubtle : 'transparent' }}>
          <Ionicons name={iconName} size={24} color={on ? t.colorAction : ink} />
        </View>
      </Pressable>
    );
  };

  return (
    <View style={{ position: 'absolute', left: 0, right: 0, bottom: insets.bottom + 16, alignItems: 'center', pointerEvents: 'box-none' }}>
      <View
        style={{
          flexDirection: 'row', alignItems: 'center',
          backgroundColor: `${t.surfaceCard}E6`, borderRadius: t.radius.pill,
          paddingHorizontal: t.space[3], paddingVertical: t.space[2],
          ...t.shadow.sm,
        }}
      >
        <Item name="home" to="home" label="Home" />
        <Item name="speedometer" to="score" label="Score" />
        <Item name="cash" to="transactions" label="Pay" />
        <Item name="card" action={() => toast({ tone: 'info', message: 'Cards coming soon' })} label="Cards" />
        <Item name="person" to="profile" label="Profile" />
      </View>
    </View>
  );
}

/** Bottom fade so scrolling content disappears softly under the floating bar
 *  (no more content peeking beside the pill) — faithful to the reference. */
function BottomScrim() {
  const t = useTheme();
  const insets = useSafeAreaInsets();
  const h = insets.bottom + 112;
  return (
    <View pointerEvents="none" style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: h }}>
      <Svg style={{ width: '100%', height: '100%' }} viewBox="0 0 100 100" preserveAspectRatio="none">
        <Defs>
          <LinearGradient id="bottomScrim" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor={t.surfacePage} stopOpacity={0} />
            <Stop offset="0.5" stopColor={t.surfacePage} stopOpacity={0.55} />
            <Stop offset="1" stopColor={t.surfacePage} stopOpacity={0.82} />
          </LinearGradient>
        </Defs>
        <Rect x="0" y="0" width="100" height="100" fill="url(#bottomScrim)" />
      </Svg>
    </View>
  );
}

/** Generic loading placeholder shown briefly on navigation. */
function PageSkeleton() {
  const t = useTheme();
  const insets = useSafeAreaInsets();
  return (
    <View style={{ flex: 1, backgroundColor: t.surfacePage }}>
      <View style={{ backgroundColor: t.colorBrand, paddingTop: insets.top + t.space[3], paddingHorizontal: t.space[4], paddingBottom: t.space[6] }}>
        <View style={{ height: 40, justifyContent: 'center' }}>
          <Skeleton width={160} height={20} radius="sm" />
        </View>
      </View>
      <View style={{ padding: t.space[4], gap: t.space[3], marginTop: -t.space[4] }}>
        {[0, 1, 2].map((i) => (
          <View key={i} style={{ backgroundColor: t.surfaceCard, borderRadius: t.radius.lg, padding: t.space[5], gap: t.space[3] }}>
            <Skeleton width="45%" height={14} />
            <Skeleton width="70%" height={26} />
            <Skeleton width="100%" height={12} />
          </View>
        ))}
      </View>
    </View>
  );
}

export function BankHomeApp() {
  const t = useTheme();
  const [screen, setScreen] = useState<Screen>('home');
  const [loading, setLoading] = useState(false);
  const fade = useRef(new Animated.Value(1)).current;
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  const navigate = (s: Screen) => {
    if (s === screen) return;
    if (timer.current) clearTimeout(timer.current);
    setScreen(s);
    setLoading(true); // brief skeleton
    timer.current = setTimeout(() => {
      setLoading(false);
      fade.setValue(0); // then the real screen fades in
      Animated.timing(fade, { toValue: 1, duration: 260, useNativeDriver: USE_NATIVE }).start();
    }, API_DELAY);
  };

  const content = loading ? (
    <PageSkeleton />
  ) : screen === 'score' ? (
    <ScoreScreen onBack={() => navigate('home')} />
  ) : screen === 'profile' ? (
    <ProfileScreen onBack={() => navigate('home')} />
  ) : screen === 'transactions' ? (
    <TransactionsScreen onBack={() => navigate('home')} />
  ) : (
    <HomeScreen onOpenScore={() => navigate('score')} onOpenProfile={() => navigate('profile')} onOpenTx={() => navigate('transactions')} />
  );

  return (
    <View style={{ flex: 1, backgroundColor: t.surfacePage }}>
      <Animated.View style={{ flex: 1, opacity: fade }}>{content}</Animated.View>
      <BottomScrim />
      <FloatingTabBar active={screen} onNavigate={navigate} />
    </View>
  );
}

import { type ComponentType } from 'react';
import { View, Pressable } from 'react-native';
import { Sparkles, LayoutDashboard, Wallet, Landmark, Users, GraduationCap, ArrowRight, type LucideProps } from 'lucide-react-native';
import { useTheme } from 'gofi-ui-native';
import { Text } from 'gofi-ui-native';
import { Row } from 'gofi-ui-native';
import { Badge } from 'gofi-ui-native';
import { useRoute } from '../useRoute';
import { DocPage, DocSection } from '../ui';

interface Item { id: string; name: string; tag: string; description: string; Icon: ComponentType<LucideProps>; }

const EXAMPLES: Item[] = [
  { id: 'hero', name: 'Hero / Onboarding', tag: 'Brand', description: 'The brand card with a feature list and pill CTA — the signature surface.', Icon: Sparkles },
  { id: 'dashboard', name: 'Mobile Dashboard', tag: 'Analytics', description: 'KPIs, charts and a recent-activity list with a bottom tab bar.', Icon: LayoutDashboard },
  { id: 'finance', name: 'Personal Finance', tag: 'Fintech', description: 'Balance hero, income/expense semantics, categories, budgets and transactions.', Icon: Wallet },
  { id: 'bank', name: 'Blue Famly', tag: 'Fintech', description: 'Family banking — shared account, quick actions, credit score, profile and a floating nav, built on the blue brand.', Icon: Landmark },
  { id: 'crm', name: 'Mobile CRM', tag: 'CRUD', description: 'Contacts in a list, create/edit in a bottom sheet, delete with undo, the 4 states.', Icon: Users },
  { id: 'education', name: 'Education App', tag: 'Learn', description: 'Course portal: brand header, progress, avatar stacks and recommendations.', Icon: GraduationCap },
];

export function ShowcaseHomePage() {
  const t = useTheme();
  const [, navigate] = useRoute();

  return (
    <DocPage group="Showcase" title="Showcase" lead="Real mobile screens built end-to-end with gofi-ui-native. Each reacts live to dark mode and the brand switch. Open one to see the design system in context.">
      <DocSection title="Example apps">
        <View style={{ gap: t.space[3] }}>
          {EXAMPLES.map(({ id, name, tag, description, Icon }) => (
            <Pressable
              key={id}
              accessibilityRole="button"
              accessibilityLabel={name}
              onPress={() => navigate(id)}
              style={({ pressed }) => ({
                borderWidth: 1, borderColor: t.surfaceBorder, borderRadius: t.radius.lg, backgroundColor: t.surfaceCard,
                padding: t.space[5], gap: t.space[3], opacity: pressed ? 0.92 : 1, ...t.shadow.sm,
              })}
            >
              <Row justify="space-between">
                <View style={{ width: 48, height: 48, borderRadius: t.radius.md, backgroundColor: t.colorBrand, alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={24} color={t.textOnBrand} />
                </View>
                <Badge tone="neutral">{tag}</Badge>
              </Row>
              <View style={{ gap: 4 }}>
                <Text variant="h3">{name}</Text>
                <Text variant="bodySm" color="secondary">{description}</Text>
              </View>
              <Row gap={1}><Text variant="bodySm" color="action" style={{ fontWeight: '700' }}>Open example</Text><ArrowRight size={16} color={t.colorAction} /></Row>
            </Pressable>
          ))}
        </View>
      </DocSection>
    </DocPage>
  );
}

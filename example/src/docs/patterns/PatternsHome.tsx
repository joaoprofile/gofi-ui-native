import { type ComponentType } from 'react';
import { View, Pressable } from 'react-native';
import { Rocket, LogIn, UserPlus, Database, ArrowRight, type LucideProps } from 'lucide-react-native';
import { useTheme } from 'gofi-ui-native';
import { Text } from 'gofi-ui-native';
import { Row } from 'gofi-ui-native';
import { Badge } from 'gofi-ui-native';
import { useRoute } from '../useRoute';
import { DocPage, DocSection } from '../ui';

interface Item { id: string; name: string; tag: string; description: string; Icon: ComponentType<LucideProps>; }

const PATTERNS: Item[] = [
  { id: 'pattern-splash', name: 'Splash', tag: 'Launch', description: 'Branded launch screen with animated indeterminate progress, then a handoff to sign in.', Icon: Rocket },
  { id: 'pattern-login', name: 'Login / Sign in', tag: 'Auth', description: 'Email + password, remember me, forgot password, biometrics and Google / Apple SSO.', Icon: LogIn },
  { id: 'pattern-register', name: 'Register / Sign up', tag: 'Auth', description: 'Name, email and password with live validation, strength meter and terms consent.', Icon: UserPlus },
  { id: 'pattern-crud', name: 'CRUD', tag: 'Data', description: 'Contacts list with search, create/edit in a bottom sheet, delete with undo and empty states.', Icon: Database },
];

export function PatternsHomePage() {
  const t = useTheme();
  const [, navigate] = useRoute();

  return (
    <DocPage group="Patterns" title="Patterns" lead="Ready-made screens and flows built end-to-end with Gofi UI Native. Copy them as a starting point — each reacts live to dark mode and the brand switch.">
      <DocSection title="Screens & flows">
        <View style={{ gap: t.space[3] }}>
          {PATTERNS.map(({ id, name, tag, description, Icon }) => (
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
              <Row gap={1}><Text variant="bodySm" color="action" style={{ fontWeight: '700' }}>Open pattern</Text><ArrowRight size={16} color={t.colorAction} /></Row>
            </Pressable>
          ))}
        </View>
      </DocSection>
    </DocPage>
  );
}

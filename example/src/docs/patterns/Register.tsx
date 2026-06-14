import { useState, type ReactNode } from 'react';
import { View, ScrollView, Pressable } from 'react-native';
import { User, Mail, Lock, Check } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from 'gofi-ui-native';
import { Text } from 'gofi-ui-native';
import { Stack, Row, Divider } from 'gofi-ui-native';
import { Field } from 'gofi-ui-native';
import { Input } from 'gofi-ui-native';
import { Button } from 'gofi-ui-native';
import { Checkbox } from 'gofi-ui-native';
import { useToast } from 'gofi-ui-native';
import { useRoute } from '../useRoute';
import { GoogleLogo, AppleLogo } from './SocialLogos';

function SocialButton({ icon, label, onPress }: { icon: ReactNode; label: string; onPress: () => void }) {
  const t = useTheme();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      style={({ pressed }) => ({
        flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: t.space[2],
        minHeight: 48, borderRadius: t.radius.pill, borderWidth: 1, borderColor: t.surfaceBorder,
        backgroundColor: pressed ? t.surfaceHover : t.surfaceCard, paddingHorizontal: t.space[4],
      })}
    >
      {icon}
      <Text variant="body" style={{ fontWeight: '600' }}>{label}</Text>
    </Pressable>
  );
}

/** Small live password-strength meter. */
function Strength({ value }: { value: string }) {
  const t = useTheme();
  const score = [/.{8,}/, /[A-Z]/, /[0-9]/, /[^A-Za-z0-9]/].reduce((s, re) => s + (re.test(value) ? 1 : 0), 0);
  if (!value) return null;
  const labels = ['Weak', 'Fair', 'Good', 'Strong'];
  const colors = [t.danger, t.warning, t.colorAction, t.success];
  return (
    <Row gap={2} align="center">
      <Row gap={1} style={{ flex: 1 }}>
        {[0, 1, 2, 3].map((i) => (
          <View key={i} style={{ flex: 1, height: 4, borderRadius: 2, backgroundColor: i < score ? colors[score - 1] : t.surfaceBorder }} />
        ))}
      </Row>
      <Text variant="caption" style={{ color: colors[Math.max(0, score - 1)], fontWeight: '600' }}>{labels[Math.max(0, score - 1)]}</Text>
    </Row>
  );
}

export function RegisterApp() {
  const t = useTheme();
  const insets = useSafeAreaInsets();
  const toast = useToast();
  const [, navigate] = useRoute();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [terms, setTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState(false);

  const nameErr = touched && name.trim().length < 2 ? 'Tell us your name' : undefined;
  const emailErr = touched && !email.includes('@') ? 'Invalid email' : undefined;
  const pwdErr = touched && pwd.length < 6 ? 'At least 6 characters' : undefined;

  const submit = () => {
    setTouched(true);
    if (name.trim().length < 2 || !email.includes('@') || pwd.length < 6 || !terms) {
      if (!terms) toast({ tone: 'danger', message: 'Please accept the terms' });
      return;
    }
    setLoading(true);
    setTimeout(() => { setLoading(false); toast({ tone: 'success', message: 'Account created 🎉' }); }, 900);
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: t.surfacePage }}
      contentContainerStyle={{ flexGrow: 1, paddingTop: insets.top + t.space[8], paddingBottom: insets.bottom + t.space[8], paddingHorizontal: t.space[5], justifyContent: 'center' }}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <Stack gap={6}>
        <Stack gap={2}>
          <Text variant="display">Create account</Text>
          <Text variant="body" color="secondary">Join Gofi in under a minute.</Text>
        </Stack>

        <Stack gap={4}>
          <Field label="Full name" required error={nameErr}>
            <Input placeholder="Jane Doe" value={name} onChangeText={setName} iconStart={<User size={18} color={t.textSecondary} />} />
          </Field>
          <Field label="Email" required error={emailErr}>
            <Input placeholder="you@example.com" keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail} iconStart={<Mail size={18} color={t.textSecondary} />} />
          </Field>
          <Field label="Password" required hint="Use 8+ chars with a number and a symbol." error={pwdErr}>
            <Input password placeholder="••••••••" value={pwd} onChangeText={setPwd} iconStart={<Lock size={18} color={t.textSecondary} />} />
          </Field>
          <Strength value={pwd} />

          <Checkbox label="I agree to the Terms and Privacy Policy" value={terms} onValueChange={setTerms} />

          <Button variant="primary" full loading={loading} iconStart={<Check size={18} color="#fff" />} onPress={submit}>Create account</Button>
        </Stack>

        <Row gap={3} align="center">
          <View style={{ flex: 1 }}><Divider /></View>
          <Text variant="caption" color="secondary">OR SIGN UP WITH</Text>
          <View style={{ flex: 1 }}><Divider /></View>
        </Row>

        <Stack gap={3}>
          <SocialButton icon={<GoogleLogo size={20} />} label="Sign up with Google" onPress={() => toast({ tone: 'info', message: 'Google sign-up…' })} />
          <SocialButton icon={<AppleLogo size={20} color={t.textColor} />} label="Sign up with Apple" onPress={() => toast({ tone: 'info', message: 'Apple sign-up…' })} />
        </Stack>

        <Row gap={1} justify="center">
          <Text variant="bodySm" color="secondary">Already have an account?</Text>
          <Pressable accessibilityRole="link" onPress={() => navigate('pattern-login')} hitSlop={8}>
            <Text variant="bodySm" color="action" style={{ fontWeight: '700' }}>Sign in</Text>
          </Pressable>
        </Row>
      </Stack>
    </ScrollView>
  );
}

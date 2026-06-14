import { useState, type ReactNode } from 'react';
import { View, ScrollView, Pressable } from 'react-native';
import { Mail, Lock, Fingerprint } from 'lucide-react-native';
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

/** Outlined, full-width social/SSO button. */
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

export function LoginApp() {
  const t = useTheme();
  const insets = useSafeAreaInsets();
  const toast = useToast();
  const [, navigate] = useRoute();

  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const submit = () => {
    setError(undefined);
    if (!email.includes('@') || pwd.length < 6) {
      setError('Enter a valid email and a password with 6+ characters.');
      return;
    }
    setLoading(true);
    setTimeout(() => { setLoading(false); toast({ tone: 'success', message: 'Welcome back!' }); }, 900);
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: t.surfacePage }}
      contentContainerStyle={{ flexGrow: 1, paddingTop: insets.top + t.space[8], paddingBottom: insets.bottom + t.space[8], paddingHorizontal: t.space[5], justifyContent: 'center' }}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <Stack gap={6}>
        {/* Brand mark + heading */}
        <Stack gap={3} align="center">
          <View style={{ width: 64, height: 64, borderRadius: 18, backgroundColor: t.colorBrand, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 30, fontWeight: '800', color: t.textOnBrand }}>G</Text>
          </View>
          <Stack gap={1} align="center">
            <Text variant="display">Welcome back</Text>
            <Text variant="body" color="secondary">Sign in to continue</Text>
          </Stack>
        </Stack>

        {/* Email + password */}
        <Stack gap={4}>
          <Field label="Email" error={error && !email.includes('@') ? 'Invalid email' : undefined}>
            <Input
              placeholder="you@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
              iconStart={<Mail size={18} color={t.textSecondary} />}
            />
          </Field>
          <Field label="Password" error={error && pwd.length < 6 ? 'At least 6 characters' : undefined}>
            <Input
              password
              placeholder="••••••••"
              value={pwd}
              onChangeText={setPwd}
              iconStart={<Lock size={18} color={t.textSecondary} />}
            />
          </Field>

          <Row justify="space-between" align="center">
            <Checkbox label="Remember me" value={remember} onValueChange={setRemember} />
            <Pressable accessibilityRole="link" onPress={() => toast({ tone: 'info', message: 'Reset link sent' })} hitSlop={8}>
              <Text variant="bodySm" color="action" style={{ fontWeight: '600' }}>Forgot password?</Text>
            </Pressable>
          </Row>

          <Button variant="primary" full loading={loading} onPress={submit}>Sign in</Button>

          {/* Biometric */}
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Sign in with biometrics"
            onPress={() => toast({ tone: 'success', message: 'Authenticated with biometrics' })}
            style={{ alignSelf: 'center', alignItems: 'center', gap: 4, paddingVertical: t.space[2] }}
          >
            <View style={{ width: 52, height: 52, borderRadius: 26, alignItems: 'center', justifyContent: 'center', backgroundColor: t.colorActionSubtle }}>
              <Fingerprint size={26} color={t.colorAction} />
            </View>
            <Text variant="caption" color="secondary">Use Face ID / fingerprint</Text>
          </Pressable>
        </Stack>

        {/* Divider */}
        <Row gap={3} align="center">
          <View style={{ flex: 1 }}><Divider /></View>
          <Text variant="caption" color="secondary">OR CONTINUE WITH</Text>
          <View style={{ flex: 1 }}><Divider /></View>
        </Row>

        {/* Social */}
        <Stack gap={3}>
          <SocialButton icon={<GoogleLogo size={20} />} label="Continue with Google" onPress={() => toast({ tone: 'info', message: 'Google sign-in…' })} />
          <SocialButton icon={<AppleLogo size={20} color={t.textColor} />} label="Continue with Apple" onPress={() => toast({ tone: 'info', message: 'Apple sign-in…' })} />
        </Stack>

        {/* Footer */}
        <Row gap={1} justify="center">
          <Text variant="bodySm" color="secondary">New here?</Text>
          <Pressable accessibilityRole="link" onPress={() => navigate('pattern-register')} hitSlop={8}>
            <Text variant="bodySm" color="action" style={{ fontWeight: '700' }}>Create an account</Text>
          </Pressable>
        </Row>
      </Stack>
    </ScrollView>
  );
}

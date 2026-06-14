import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { Animated, View, Pressable, AccessibilityInfo, Platform } from 'react-native';
import { CheckCircle2, AlertTriangle, XCircle, Info } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../theme/ThemeProvider';
import type { Theme } from '../theme/tokens';
import { Text } from './Text';

export type ToastTone = 'success' | 'warning' | 'danger' | 'info';

export interface ToastOptions {
  tone?: ToastTone;
  message: string;
  action?: { label: string; onPress: () => void };
  duration?: number;
}

interface ToastState extends Required<Pick<ToastOptions, 'tone' | 'message'>> {
  id: number;
  action?: ToastOptions['action'];
}

const ToastContext = createContext<(o: ToastOptions) => void>(() => {});

/** Call `toast({ tone, message, action })` anywhere under the provider. */
export const useToast = () => useContext(ToastContext);

function iconFor(tone: ToastTone, color: string) {
  const p = { size: 20, color };
  if (tone === 'success') return <CheckCircle2 {...p} />;
  if (tone === 'warning') return <AlertTriangle {...p} />;
  if (tone === 'danger') return <XCircle {...p} />;
  return <Info {...p} />;
}

function toneColor(t: Theme, tone: ToastTone) {
  return { success: t.success, warning: t.warning, danger: t.danger, info: t.info }[tone];
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const t = useTheme();
  const insets = useSafeAreaInsets();
  const [toast, setToast] = useState<ToastState | null>(null);
  const fade = useRef(new Animated.Value(0)).current;
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const show = useCallback((o: ToastOptions) => {
    const tone = o.tone ?? 'info';
    setToast({ id: Date.now(), tone, message: o.message, action: o.action });
    AccessibilityInfo.announceForAccessibility(o.message);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(null), o.duration ?? 4500);
  }, []);

  useEffect(() => {
    Animated.timing(fade, { toValue: toast ? 1 : 0, duration: 200, useNativeDriver: Platform.OS !== 'web' }).start();
  }, [toast, fade]);

  return (
    <ToastContext.Provider value={show}>
      {children}
      {toast ? (
        <Animated.View
          style={{ position: 'absolute', left: 0, right: 0, bottom: insets.bottom + t.space[4], paddingHorizontal: t.space[4], opacity: fade, pointerEvents: 'box-none' }}
        >
          <View
            accessibilityRole="alert"
            style={{
              flexDirection: 'row', alignItems: 'center', gap: t.space[3],
              backgroundColor: t.surfaceCard, borderRadius: t.radius.md, borderLeftWidth: 4, borderLeftColor: toneColor(t, toast.tone),
              padding: t.space[3], ...t.shadow.lg,
            }}
          >
            {iconFor(toast.tone, toneColor(t, toast.tone))}
            <Text variant="bodySm" style={{ flex: 1 }}>{toast.message}</Text>
            {toast.action ? (
              <Pressable accessibilityRole="button" accessibilityLabel={toast.action.label} hitSlop={8} onPress={() => { toast.action?.onPress(); setToast(null); }}>
                <Text variant="bodySm" color="action" style={{ fontWeight: '700' }}>{toast.action.label}</Text>
              </Pressable>
            ) : null}
          </View>
        </Animated.View>
      ) : null}
    </ToastContext.Provider>
  );
}

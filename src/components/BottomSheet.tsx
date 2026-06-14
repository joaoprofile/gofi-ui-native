import { useEffect, useRef, type ReactNode } from 'react';
import { Modal, Pressable, Animated, View, useWindowDimensions, Platform } from 'react-native';

const USE_NATIVE_DRIVER = Platform.OS !== 'web';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../theme/ThemeProvider';
import { useReduceMotion } from '../lib/useReduceMotion';
import { Text } from './Text';

export interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

/**
 * Panel that slides up from the base — the preferred mobile overlay for
 * contextual actions, selection and mini-forms. Drag handle + backdrop close.
 */
export function BottomSheet({ open, onClose, title, children }: BottomSheetProps) {
  const t = useTheme();
  const insets = useSafeAreaInsets();
  const { height } = useWindowDimensions();
  const reduce = useReduceMotion();
  const y = useRef(new Animated.Value(height)).current;
  const fade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (open) {
      Animated.parallel([
        Animated.timing(y, { toValue: 0, duration: reduce ? 0 : t.motion.slow, useNativeDriver: USE_NATIVE_DRIVER }),
        Animated.timing(fade, { toValue: 1, duration: reduce ? 0 : t.motion.base, useNativeDriver: USE_NATIVE_DRIVER }),
      ]).start();
    } else {
      y.setValue(height);
      fade.setValue(0);
    }
  }, [open, height, reduce, t.motion.slow, t.motion.base, y, fade]);

  return (
    <Modal visible={open} transparent animationType="none" onRequestClose={onClose} statusBarTranslucent>
      <View style={{ flex: 1, justifyContent: 'flex-end' }}>
        <Animated.View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: '#0009', opacity: fade }}>
          <Pressable accessibilityLabel="Close" style={{ flex: 1 }} onPress={onClose} />
        </Animated.View>
        <Animated.View
          accessibilityViewIsModal
          style={{
            maxHeight: height * 0.9,
            transform: [{ translateY: y }],
            backgroundColor: t.surfaceCard,
            borderTopLeftRadius: t.radius.xl,
            borderTopRightRadius: t.radius.xl,
            paddingBottom: insets.bottom + t.space[4],
            paddingHorizontal: t.space[5],
            paddingTop: t.space[3],
            gap: t.space[3],
            ...t.shadow.lg,
          }}
        >
          <View style={{ alignSelf: 'center', width: 40, height: 4, borderRadius: 2, backgroundColor: t.surfaceBorder }} />
          {title ? <Text variant="h3" accessibilityRole="header">{title}</Text> : null}
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
}

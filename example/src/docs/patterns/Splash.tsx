import { useEffect, useRef } from 'react';
import { View, Animated, Easing } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from 'gofi-ui-native';
import { Text } from 'gofi-ui-native';
import { Button } from 'gofi-ui-native';
import { Stack } from 'gofi-ui-native';
import { useRoute } from '../useRoute';

/** Branded splash: logo + tagline + indeterminate progress, then hands off to Login. */
export function SplashApp() {
  const t = useTheme();
  const insets = useSafeAreaInsets();
  const [, navigate] = useRoute();

  const fade = useRef(new Animated.Value(0)).current;
  const lift = useRef(new Animated.Value(12)).current;
  const sweep = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fade, { toValue: 1, duration: 420, useNativeDriver: false }),
      Animated.timing(lift, { toValue: 0, duration: 420, easing: Easing.out(Easing.cubic), useNativeDriver: false }),
    ]).start();
    const loop = Animated.loop(
      Animated.timing(sweep, { toValue: 1, duration: 1100, easing: Easing.inOut(Easing.ease), useNativeDriver: false }),
    );
    loop.start();
    return () => loop.stop();
  }, [fade, lift, sweep]);

  const translateX = sweep.interpolate({ inputRange: [0, 1], outputRange: [-120, 120] });

  return (
    <View style={{ flex: 1, backgroundColor: t.colorBrand, paddingHorizontal: t.space[6], paddingTop: insets.top, paddingBottom: insets.bottom + t.space[8] }}>
      <Animated.View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', opacity: fade, transform: [{ translateY: lift }] }}>
        <Stack gap={5} align="center">
          <View style={{ width: 88, height: 88, borderRadius: 24, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center', ...t.shadow.md }}>
            <Text style={{ fontSize: 44, fontWeight: '800', color: t.textOnBrand }}>G</Text>
          </View>
          <Stack gap={1} align="center">
            <Text variant="display" color="onBrand">Gofi UI</Text>
            <Text variant="body" color="onBrand" style={{ opacity: 0.8 }}>Accessible mobile, by default.</Text>
          </Stack>

          {/* Indeterminate track */}
          <View style={{ width: 160, height: 4, borderRadius: 2, backgroundColor: '#FFFFFF55', overflow: 'hidden' }}>
            <Animated.View style={{ width: 64, height: 4, borderRadius: 2, backgroundColor: t.textOnBrand, transform: [{ translateX }] }} />
          </View>
        </Stack>
      </Animated.View>

      <Stack gap={3}>
        <Button variant="primary" full onPress={() => navigate('pattern-login')}>Continue</Button>
        <Text variant="caption" color="onBrand" style={{ textAlign: 'center', opacity: 0.7 }}>v1.0.0 · Gofi UI Native</Text>
      </Stack>
    </View>
  );
}

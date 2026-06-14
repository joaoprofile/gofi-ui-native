import { Pressable, View, Switch as RNSwitch } from 'react-native';
import { Check } from 'lucide-react-native';
import { useTheme } from '../theme/ThemeProvider';
import { Text } from './Text';

export interface ToggleProps {
  value: boolean;
  onValueChange: (v: boolean) => void;
  label: string;
  disabled?: boolean;
}

/** On/off with immediate effect (RN native Switch). Tap the whole row. */
export function Switch({ value, onValueChange, label, disabled }: ToggleProps) {
  const t = useTheme();
  return (
    <Pressable
      accessibilityRole="switch"
      accessibilityState={{ checked: value, disabled: !!disabled }}
      accessibilityLabel={label}
      onPress={() => !disabled && onValueChange(!value)}
      style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', minHeight: 44, opacity: disabled ? 0.4 : 1 }}
    >
      <Text variant="body">{label}</Text>
      <RNSwitch
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
        trackColor={{ true: t.colorAction, false: t.surfaceBorder }}
        thumbColor="#FFFFFF"
      />
    </Pressable>
  );
}

/** Multi-select boolean. Selected uses the action color. */
export function Checkbox({ value, onValueChange, label, disabled, indeterminate }: ToggleProps & { indeterminate?: boolean }) {
  const t = useTheme();
  const on = value || indeterminate;
  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityState={{ checked: indeterminate ? 'mixed' : value, disabled: !!disabled }}
      accessibilityLabel={label}
      onPress={() => !disabled && onValueChange(!value)}
      style={{ flexDirection: 'row', alignItems: 'center', gap: t.space[3], minHeight: 44, opacity: disabled ? 0.4 : 1 }}
    >
      <View
        style={{
          width: 22, height: 22, borderRadius: t.radius.sm, alignItems: 'center', justifyContent: 'center',
          borderWidth: on ? 0 : 2, borderColor: t.surfaceBorder, backgroundColor: on ? t.colorAction : 'transparent',
        }}
      >
        {value ? <Check size={15} color="#FFFFFF" strokeWidth={3} /> : indeterminate ? <View style={{ width: 10, height: 2, backgroundColor: '#FFFFFF' }} /> : null}
      </View>
      <Text variant="body" style={{ flex: 1 }}>{label}</Text>
    </Pressable>
  );
}

export interface RadioProps extends ToggleProps {
  /** Marks the control as part of a named exclusive group (a11y). */
  selected: boolean;
}

/** Exclusive choice (1 of N). Group several under a <fieldset>-like container. */
export function Radio({ selected, onValueChange, label, disabled }: RadioProps) {
  const t = useTheme();
  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ checked: selected, disabled: !!disabled }}
      accessibilityLabel={label}
      onPress={() => !disabled && onValueChange(true)}
      style={{ flexDirection: 'row', alignItems: 'center', gap: t.space[3], minHeight: 44, opacity: disabled ? 0.4 : 1 }}
    >
      <View
        style={{
          width: 22, height: 22, borderRadius: 11, alignItems: 'center', justifyContent: 'center',
          borderWidth: 2, borderColor: selected ? t.colorAction : t.surfaceBorder,
        }}
      >
        {selected ? <View style={{ width: 11, height: 11, borderRadius: 6, backgroundColor: t.colorAction }} /> : null}
      </View>
      <Text variant="body" style={{ flex: 1 }}>{label}</Text>
    </Pressable>
  );
}

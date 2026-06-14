import { useState, type ReactNode } from 'react';
import { View, TextInput, Pressable, type TextInputProps } from 'react-native';
import { Eye, EyeOff } from 'lucide-react-native';
import { useTheme } from '../theme/ThemeProvider';

export interface InputProps extends TextInputProps {
  invalid?: boolean;
  iconStart?: ReactNode;
  iconEnd?: ReactNode;
  /** Adds a show/hide toggle for password fields. */
  password?: boolean;
}

/** Text entry. Always used inside a <Field/> (label + error + hint). */
export function Input({ invalid, iconStart, iconEnd, password, secureTextEntry, style, ...rest }: InputProps) {
  const t = useTheme();
  const [focused, setFocused] = useState(false);
  const [hidden, setHidden] = useState(true);
  const secure = password ? hidden : secureTextEntry;

  const borderColor = invalid ? t.danger : focused ? t.colorAction : t.surfaceBorder;

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: t.space[2],
        minHeight: 44,
        paddingHorizontal: t.space[3],
        borderRadius: t.radius.sm,
        borderWidth: 1,
        borderColor,
        backgroundColor: rest.editable === false ? t.surfaceHover : t.surfaceCard,
      }}
    >
      {iconStart}
      <TextInput
        accessibilityState={{ disabled: rest.editable === false }}
        placeholderTextColor={t.textSecondary}
        secureTextEntry={secure}
        onFocus={(e) => { setFocused(true); rest.onFocus?.(e); }}
        onBlur={(e) => { setFocused(false); rest.onBlur?.(e); }}
        style={[{ flex: 1, color: t.textColor, fontSize: 16, paddingVertical: t.space[2] }, style]}
        {...rest}
      />
      {password ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={hidden ? 'Show password' : 'Hide password'}
          onPress={() => setHidden((h) => !h)}
          hitSlop={8}
        >
          {hidden ? <EyeOff size={18} color={t.textSecondary} /> : <Eye size={18} color={t.textSecondary} />}
        </Pressable>
      ) : (
        iconEnd
      )}
    </View>
  );
}

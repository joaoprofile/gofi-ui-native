import { type ReactNode } from 'react';
import { View } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import { Text } from './Text';
import { Row } from './Layout';

export interface FieldProps {
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
}

/**
 * Wrapper for every form control: associates label + hint + error message.
 * The label is always visible — a placeholder is not a substitute.
 */
export function Field({ label, hint, error, required, children }: FieldProps) {
  const t = useTheme();
  return (
    <View style={{ gap: t.space[2] }}>
      <Row gap={1}>
        <Text variant="bodySm" style={{ fontWeight: '600' }}>{label}</Text>
        {required ? <Text variant="bodySm" color="danger" accessibilityLabel="required">*</Text> : null}
      </Row>
      {children}
      {error ? (
        <Text variant="caption" color="danger">{error}</Text>
      ) : hint ? (
        <Text variant="caption" color="secondary">{hint}</Text>
      ) : null}
    </View>
  );
}

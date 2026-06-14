import { type ReactNode } from 'react';
import { Modal, Pressable, View } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import { Text } from './Text';
import { Button } from './Button';
import { Row } from './Layout';

export interface ModalDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  footer?: ReactNode;
  dismissable?: boolean;
  children?: ReactNode;
}

/** Centered modal for a short focused task. On mobile, prefer a BottomSheet. */
export function ModalDialog({ open, onClose, title, footer, dismissable = true, children }: ModalDialogProps) {
  const t = useTheme();
  return (
    <Modal visible={open} transparent animationType="fade" onRequestClose={onClose} statusBarTranslucent>
      <Pressable
        accessibilityLabel="Close"
        onPress={dismissable ? onClose : undefined}
        style={{ flex: 1, backgroundColor: '#0009', alignItems: 'center', justifyContent: 'center', padding: t.space[6] }}
      >
        <Pressable
          accessibilityViewIsModal
          onPress={(e) => e.stopPropagation()}
          style={{ width: '100%', maxWidth: 420, backgroundColor: t.surfaceCard, borderRadius: t.radius.lg, padding: t.space[5], gap: t.space[3], ...t.shadow.lg }}
        >
          <Text variant="h3" accessibilityRole="header">{title}</Text>
          {children}
          {footer ? <View style={{ marginTop: t.space[2] }}>{footer}</View> : null}
        </Pressable>
      </Pressable>
    </Modal>
  );
}

export interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  tone?: 'primary' | 'danger';
  onConfirm: () => void;
}

/** Confirm a destructive/important action. Use a specific verb, not "OK". */
export function ConfirmDialog({
  open, onClose, title, description, confirmLabel = 'Confirm', cancelLabel = 'Cancel', tone = 'danger', onConfirm,
}: ConfirmDialogProps) {
  return (
    <ModalDialog open={open} onClose={onClose} title={title}>
      {description ? <Text variant="bodySm" color="secondary">{description}</Text> : null}
      <Row gap={3} justify="flex-end" style={{ marginTop: 8 }}>
        <Button variant="ghost" onPress={onClose}>{cancelLabel}</Button>
        <Button variant={tone} onPress={() => { onConfirm(); onClose(); }}>{confirmLabel}</Button>
      </Row>
    </ModalDialog>
  );
}

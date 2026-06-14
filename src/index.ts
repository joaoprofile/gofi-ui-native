/**
 * gofi-ui-native — public barrel.
 * Import any component: `import { Button, Card } from 'gofi-ui-native'`.
 */

// Theme & tokens
export {
  ThemeProvider,
  useTheme,
  useThemeControls,
  type ThemeProviderProps,
} from './theme/ThemeProvider';
export {
  palette,
  base,
  shadow,
  brands,
  makeTheme,
  defaultTheme,
  type Theme,
  type ThemeMode,
  type BrandKey,
} from './theme/tokens';

// Lib
export { useReduceMotion } from './lib/useReduceMotion';

// Layout
export { Screen, type ScreenProps } from './components/Screen';
export { Stack, Row, Divider, type StackProps, type RowProps } from './components/Layout';

// Atoms
export { Text, type TextProps, type TextVariant, type TextColor } from './components/Text';
export { Button, IconButton, type ButtonProps, type IconButtonProps, type ButtonVariant } from './components/Button';
export { Badge, Chip, type BadgeProps, type ChipProps, type Tone } from './components/Badge';
export { Avatar, AvatarStack, type AvatarProps, type AvatarStackProps, type AvatarSize } from './components/Avatar';
export { Skeleton, Spinner, type SkeletonProps, type SpinnerProps } from './components/Feedback';

// Forms
export { Field, type FieldProps } from './components/Field';
export { Input, type InputProps } from './components/Input';
export { Switch, Checkbox, Radio, type ToggleProps, type RadioProps } from './components/Toggle';
export { SegmentedControl, type SegmentedControlProps, type Segment } from './components/SegmentedControl';

// Containers & data
export { Card, type CardProps, type CardVariant } from './components/Card';
export { ListItem, type ListItemProps } from './components/ListItem';
export { FeatureList, type FeatureListProps, type FeatureItem } from './components/FeatureList';
export { EmptyState, type EmptyStateProps, type EmptyVariant } from './components/EmptyState';
export { Progress, type ProgressProps } from './components/Progress';

// Navigation & overlay
export { Header, type HeaderProps, type HeaderVariant } from './components/Header';
export { TabBar, type TabBarProps, type TabItem } from './components/TabBar';
export { BottomSheet, type BottomSheetProps } from './components/BottomSheet';
export { ModalDialog, ConfirmDialog, type ModalDialogProps, type ConfirmDialogProps } from './components/Dialog';
export { ToastProvider, useToast, type ToastOptions, type ToastTone } from './components/Toast';

// Charts
export { BarChart, DonutChart, Sparkline, chartColors, type BarDatum, type DonutSlice, type SparklineProps } from './components/Charts';

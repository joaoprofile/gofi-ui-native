import { View } from 'react-native';
import Svg, { Circle, Polyline, Polygon, Defs, LinearGradient, Stop } from 'react-native-svg';
import { useTheme } from '../theme/ThemeProvider';
import { palette } from '../theme/tokens';
import { Text } from './Text';
import { Row } from './Layout';

export const chartColors = [palette.primary[600], palette.secondary[600], palette.success, palette.warning, palette.info, palette.primary[300]];

export interface BarDatum { label: string; value: number; }

export interface BarChartProps {
  data: BarDatum[];
  height?: number;
  ariaLabel: string;
  color?: string;
}

/** Simple vertical bar chart (View-based, no SVG needed). */
export function BarChart({ data, height = 160, ariaLabel, color }: BarChartProps) {
  const t = useTheme();
  const fill = color ?? t.colorAction;
  const max = Math.max(...data.map((d) => d.value), 1);

  return (
    <View accessibilityLabel={ariaLabel} style={{ gap: t.space[2] }}>
      <Row gap={2} align="flex-end" style={{ height, justifyContent: 'space-between' }}>
        {data.map((d, i) => (
          <View key={i} style={{ flex: 1, alignItems: 'center', gap: 4, justifyContent: 'flex-end', height: '100%' }}>
            <View style={{ width: '70%', height: Math.max(4, (d.value / max) * (height - 8)), borderRadius: 6, backgroundColor: fill }} />
          </View>
        ))}
      </Row>
      <Row gap={2} style={{ justifyContent: 'space-between' }}>
        {data.map((d, i) => (
          <Text key={i} variant="caption" color="secondary" style={{ flex: 1, textAlign: 'center' }} numberOfLines={1}>{d.label}</Text>
        ))}
      </Row>
    </View>
  );
}

export interface DonutSlice { label: string; value: number; color?: string; }

export interface DonutChartProps {
  data: DonutSlice[];
  size?: number;
  ariaLabel: string;
  centerLabel?: string;
}

/** Donut chart via SVG stroke segments. */
export function DonutChart({ data, size = 160, ariaLabel, centerLabel }: DonutChartProps) {
  const t = useTheme();
  const stroke = 18;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const total = data.reduce((s, d) => s + d.value, 0) || 1;
  let offset = 0;

  return (
    <View accessibilityLabel={ariaLabel} style={{ flexDirection: 'row', alignItems: 'center', gap: t.space[5] }}>
      <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
        <Svg width={size} height={size}>
          <Circle cx={size / 2} cy={size / 2} r={r} stroke={t.surfaceBorder} strokeWidth={stroke} fill="none" />
          {data.map((d, i) => {
            const frac = d.value / total;
            const seg = (
              <Circle
                key={i}
                cx={size / 2}
                cy={size / 2}
                r={r}
                stroke={d.color ?? chartColors[i % chartColors.length]}
                strokeWidth={stroke}
                strokeDasharray={`${frac * c} ${c}`}
                strokeDashoffset={-offset * c}
                strokeLinecap="butt"
                fill="none"
                rotation={-90}
                origin={`${size / 2}, ${size / 2}`}
              />
            );
            offset += frac;
            return seg;
          })}
        </Svg>
        {centerLabel ? (
          <View style={{ position: 'absolute', alignItems: 'center' }}>
            <Text variant="h3">{centerLabel}</Text>
          </View>
        ) : null}
      </View>
      <View style={{ flex: 1, gap: t.space[2] }}>
        {data.map((d, i) => (
          <Row key={i} gap={2}>
            <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: d.color ?? chartColors[i % chartColors.length] }} />
            <Text variant="bodySm" style={{ flex: 1 }} numberOfLines={1}>{d.label}</Text>
            <Text variant="bodySm" color="secondary">{Math.round((d.value / total) * 100)}%</Text>
          </Row>
        ))}
      </View>
    </View>
  );
}

export interface SparklineProps {
  data: number[];
  width?: number;
  height?: number;
  ariaLabel: string;
  color?: string;
  area?: boolean;
}

/** Compact trend line (SVG polyline + optional gradient area). */
export function Sparkline({ data, width = 300, height = 80, ariaLabel, color, area = true }: SparklineProps) {
  const t = useTheme();
  const stroke = color ?? t.colorAction;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const span = max - min || 1;
  const stepX = width / Math.max(1, data.length - 1);
  const points = data.map((v, i) => `${i * stepX},${height - ((v - min) / span) * (height - 8) - 4}`).join(' ');
  const areaPoints = `0,${height} ${points} ${width},${height}`;

  return (
    <View accessibilityLabel={ariaLabel}>
      <Svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
        <Defs>
          <LinearGradient id="spark" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor={stroke} stopOpacity={0.25} />
            <Stop offset="1" stopColor={stroke} stopOpacity={0} />
          </LinearGradient>
        </Defs>
        {area ? <Polygon points={areaPoints} fill="url(#spark)" /> : null}
        <Polyline points={points} fill="none" stroke={stroke} strokeWidth={2.5} strokeLinejoin="round" strokeLinecap="round" />
      </Svg>
    </View>
  );
}

import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';

import { FontSizes, FontWeights } from '../../../constants/typography';
import { useAppSelector } from '../../../app/hooks';
import {
  selectLast6MonthsTrend,
  selectMonthlyStats,
} from '../../../features/transactions/transactionsSelectors';
import { formatCurrency } from '../../../utils/currency';
import { GradientCard } from '../../../components/common/GradientCard';
import { useTheme } from '../../../theme/useTheme';
import { useStyles } from '../../../theme/useStyles';
import { Theme } from '../../../theme/types';

const { width } = Dimensions.get('window');
const CHART_W = width - 120;

export function ExpenseTrendChart() {
  const theme = useTheme();
  const styles = useStyles(getStyles);
  const currencySymbol = useAppSelector(s => s.ui.currencySymbol);
  const last6Months = useAppSelector(selectLast6MonthsTrend);
  const monthlyStats = useAppSelector(selectMonthlyStats);

  const lineData = last6Months.map(m => ({
    value: m.expense,
    label: m.label,
    dataPointColor: theme.colors.secondary,
  }));

  if (lineData.length === 0) return null;

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>6-Month Expense Trend</Text>
      <GradientCard>
        <View style={styles.monthStatsRow}>
          <View>
            <Text style={styles.monthStatLabel}>This Month Income</Text>
            <Text style={[styles.monthStatVal, { color: theme.colors.income }]}>
              {formatCurrency(monthlyStats.income, currencySymbol, true)}
            </Text>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={styles.monthStatLabel}>This Month Expense</Text>
            <Text
              style={[styles.monthStatVal, { color: theme.colors.expense }]}
            >
              {formatCurrency(monthlyStats.expense, currencySymbol, true)}
            </Text>
          </View>
        </View>

        <LineChart
          data={lineData}
          width={CHART_W}
          height={140}
          color={theme.colors.primary}
          thickness={2.5}
          startFillColor={theme.colors.primary}
          endFillColor="transparent"
          areaChart
          curved
          hideRules
          hideAxesAndRules={false}
          xAxisThickness={1}
          xAxisColor={theme.colors.border}
          yAxisThickness={0}
          yAxisTextStyle={styles.yAxisLabel}
          xAxisLabelTextStyle={styles.xLabel}
          yAxisLabelWidth={45}
          dataPointsRadius={4}
          dataPointsColor={theme.colors.secondary}
          isAnimated
          animationDuration={700}
          noOfSections={4}
          formatYLabel={(val: any) =>
            formatCurrency(parseFloat(val), currencySymbol, true)
          }
        />
      </GradientCard>
    </View>
  );
}

function getStyles(theme: Theme) {
  return StyleSheet.create({
    section: { marginBottom: 24 },
    sectionTitle: {
      fontSize: FontSizes.base,
      fontWeight: FontWeights.bold as '700',
      color: theme.colors.textPrimary,
      marginBottom: 12,
    },
    monthStatsRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 12,
    },
    monthStatLabel: {
      fontSize: FontSizes.xs,
      color: theme.colors.textMuted,
      marginBottom: 3,
    },
    monthStatVal: {
      fontSize: FontSizes.base,
      fontWeight: FontWeights.bold as '700',
    },
    xLabel: { color: theme.colors.textMuted, fontSize: 10 },
    yAxisLabel: { color: theme.colors.textMuted, fontSize: 9 },
  });
}

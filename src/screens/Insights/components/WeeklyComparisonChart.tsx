import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { FontSizes, FontWeights } from '../../../constants/typography';
import { useAppSelector } from '../../../app/hooks';
import {
  selectWeeklyChartData,
  selectThisWeekExpense,
  selectLastWeekExpense,
} from '../../../features/transactions/transactionsSelectors';
import { formatCurrency } from '../../../utils/currency';
import { GradientCard } from '../../../components/common/GradientCard';
import { useTheme } from '../../../theme/useTheme';
import { useStyles } from '../../../theme/useStyles';
import { Theme } from '../../../theme/types';

const { width } = Dimensions.get('window');
const CHART_W = width - 100;

export function WeeklyComparisonChart() {
  const theme = useTheme();
  const styles = useStyles(getStyles);
  const currencySymbol = useAppSelector(s => s.ui.currencySymbol);
  const { days, thisWeekData, lastWeekData } = useAppSelector(
    selectWeeklyChartData,
  );
  const thisWeekExpense = useAppSelector(selectThisWeekExpense);
  const lastWeekExpense = useAppSelector(selectLastWeekExpense);

  const weekChange =
    lastWeekExpense > 0
      ? ((thisWeekExpense - lastWeekExpense) / lastWeekExpense) * 100
      : 0;
  const weekTrend = weekChange >= 0 ? 'up' : 'down';

  const maxWeekVal = Math.max(...thisWeekData, ...lastWeekData, 1);
  const weekBarData: any[] = [];
  days.forEach((day, i) => {
    weekBarData.push({
      value: lastWeekData[i],
      label: day,
      frontColor: theme.colors.surfaceHighlight,
      barWidth: 14,
      spacing: 4,
    });
    weekBarData.push({
      value: thisWeekData[i],
      frontColor: theme.colors.primary,
      gradientColor: theme.colors.secondary,
      showGradient: true,
      barWidth: 14,
      spacing: 16,
    });
  });

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Week Comparison</Text>
      <GradientCard>
        <View style={styles.weekSummaryRow}>
          <View>
            <Text style={styles.weekLabel}>This Week</Text>
            <Text style={styles.weekVal}>
              {formatCurrency(thisWeekExpense, currencySymbol, true)}
            </Text>
          </View>
          <View
            style={[
              styles.trendBadge,
              {
                backgroundColor:
                  weekTrend === 'down'
                    ? theme.colors.incomeLight
                    : theme.colors.expenseLight,
              },
            ]}
          >
            <Icon
              name={weekTrend === 'down' ? 'trending-down' : 'trending-up'}
              size={16}
              color={
                weekTrend === 'down'
                  ? theme.colors.income
                  : theme.colors.expense
              }
            />
            <Text
              style={[
                styles.trendText,
                {
                  color:
                    weekTrend === 'down'
                      ? theme.colors.income
                      : theme.colors.expense,
                },
              ]}
            >
              {Math.abs(weekChange).toFixed(0)}%
            </Text>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={styles.weekLabel}>Last Week</Text>
            <Text
              style={[styles.weekVal, { color: theme.colors.textSecondary }]}
            >
              {formatCurrency(lastWeekExpense, currencySymbol, true)}
            </Text>
          </View>
        </View>

        <View style={styles.legendRow}>
          <View style={styles.legendItem}>
            <View
              style={[
                styles.legendDot,
                { backgroundColor: theme.colors.surfaceHighlight },
              ]}
            />
            <Text style={styles.legendLabel}>Last week</Text>
          </View>
          <View style={styles.legendItem}>
            <View
              style={[
                styles.legendDot,
                { backgroundColor: theme.colors.primary },
              ]}
            />
            <Text style={styles.legendLabel}>This week</Text>
          </View>
        </View>

        <BarChart
          data={weekBarData}
          width={CHART_W}
          height={130}
          spacing={0}
          roundedTop
          hideRules
          hideAxesAndRules
          yAxisLabelWidth={0}
          xAxisThickness={0}
          yAxisThickness={0}
          isAnimated
          animationDuration={700}
          labelWidth={36}
          xAxisLabelTextStyle={styles.xLabel}
          maxValue={maxWeekVal * 1.2}
          noOfSections={3}
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
    weekSummaryRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
    },
    weekLabel: {
      fontSize: FontSizes.xs,
      color: theme.colors.textMuted,
      marginBottom: 3,
    },
    weekVal: {
      fontSize: FontSizes.lg,
      fontWeight: FontWeights.bold as '700',
      color: theme.colors.textPrimary,
    },
    trendBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      paddingHorizontal: 10,
      paddingVertical: 6,
      borderRadius: 12,
    },
    trendText: {
      fontSize: FontSizes.sm,
      fontWeight: FontWeights.bold as '700',
    },
    legendRow: { flexDirection: 'row', gap: 16, marginBottom: 8 },
    legendItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
    legendDot: { width: 10, height: 10, borderRadius: 5 },
    legendLabel: { fontSize: FontSizes.xs, color: theme.colors.textMuted },
    xLabel: { color: theme.colors.textMuted, fontSize: 10 },
  });
}

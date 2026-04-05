import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontSizes, FontWeights } from '../../../constants/typography';
import { formatCurrency } from '../../../utils/currency';
import { useTheme } from '../../../theme/useTheme';
import { useStyles } from '../../../theme/useStyles';
import { Theme } from '../../../theme/types';

interface MonthlyStats {
  count: number;
  income: number;
  expense: number;
}

interface MonthlyStatsStripProps {
  monthlyStats: MonthlyStats;
  currencySymbol: string;
}

export function MonthlyStatsStrip({
  monthlyStats,
  currencySymbol,
}: MonthlyStatsStripProps) {
  const theme = useTheme();
  const styles = useStyles(getStyles);

  const netSavings = monthlyStats.income - monthlyStats.expense;

  return (
    <View style={styles.statsStrip}>
      <View style={styles.statItem}>
        <Text style={styles.statLabel}>This Month</Text>
        <Text style={styles.statValue}>{monthlyStats.count} transactions</Text>
      </View>
      <View style={styles.statDivider} />
      <View style={styles.statItem}>
        <Text style={styles.statLabel}>Net Savings</Text>
        <Text
          style={[
            styles.statValue,
            {
              color:
                netSavings > 0 ? theme.colors.income : theme.colors.expense,
            },
          ]}
        >
          {formatCurrency(Math.abs(netSavings), currencySymbol, true)}
        </Text>
      </View>
      <View style={styles.statDivider} />
      <View style={styles.statItem}>
        <Text style={styles.statLabel}>Expenses</Text>
        <Text style={[styles.statValue, { color: theme.colors.expense }]}>
          {formatCurrency(monthlyStats.expense, currencySymbol, true)}
        </Text>
      </View>
    </View>
  );
}

function getStyles(theme: Theme) {
  return StyleSheet.create({
    statsStrip: {
      flexDirection: 'row',
      backgroundColor: theme.colors.surfaceElevated,
      borderRadius: 16,
      padding: 14,
      marginBottom: 20,
      marginHorizontal: 20,
      borderWidth: 1,
      borderColor: theme.colors.border,
      alignItems: 'center',
    },
    statItem: { flex: 1, alignItems: 'center' },
    statDivider: { width: 1, height: 32, backgroundColor: theme.colors.border },
    statLabel: {
      fontSize: FontSizes.xs,
      color: theme.colors.textMuted,
      fontWeight: FontWeights.medium as '500',
      marginBottom: 3,
    },
    statValue: {
      fontSize: FontSizes.sm,
      color: theme.colors.textPrimary,
      fontWeight: FontWeights.bold as '700',
    },
  });
}

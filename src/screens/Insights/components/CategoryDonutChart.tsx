import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';

import { FontSizes, FontWeights } from '../../../constants/typography';
import { useAppSelector } from '../../../app/hooks';
import {
  selectCategoryBreakdown,
  selectTotalExpense,
} from '../../../features/transactions/transactionsSelectors';
import { formatCurrency } from '../../../utils/currency';
import { GradientCard } from '../../../components/common/GradientCard';
import { useTheme } from '../../../theme/useTheme';
import { useStyles } from '../../../theme/useStyles';
import { Theme } from '../../../theme/types';

export function CategoryDonutChart() {
  const theme = useTheme();
  const styles = useStyles(getStyles);
  const currencySymbol = useAppSelector(s => s.ui.currencySymbol);
  const categoryBreakdown = useAppSelector(selectCategoryBreakdown);
  const totalExpense = useAppSelector(selectTotalExpense);

  const pieData = categoryBreakdown.slice(0, 6).map(cat => ({
    value: cat.amount,
    color: cat.color,
    text: cat.category
      .replace(/_/g, ' ')
      .replace(/\b\w/g, c => c.toUpperCase()),
  }));

  if (pieData.length === 0) return null;

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Spending by Category</Text>
      <GradientCard>
        <View style={styles.pieContainer}>
          <PieChart
            data={pieData}
            donut
            radius={100}
            innerRadius={60}
            showText={false}
            isAnimated
            animationDuration={700}
            centerLabelComponent={() => (
              <View style={styles.pieCenter}>
                <Text style={styles.pieCenterText}>
                  {formatCurrency(totalExpense, currencySymbol, true)}
                </Text>
                <Text style={styles.pieCenterLabel}>total</Text>
              </View>
            )}
          />
          <View style={styles.pieLegend}>
            {categoryBreakdown.slice(0, 6).map(cat => (
              <View key={cat.category} style={styles.pieLegendRow}>
                <View
                  style={[styles.pieLegendDot, { backgroundColor: cat.color }]}
                />
                <Text style={styles.pieLegendText} numberOfLines={1}>
                  {cat.category
                    .replace(/_/g, ' ')
                    .replace(/\b\w/g, c => c.toUpperCase())}
                </Text>
                <Text style={styles.pieLegendAmt}>
                  {formatCurrency(cat.amount, currencySymbol, true)}
                </Text>
              </View>
            ))}
          </View>
        </View>
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
    pieContainer: {
      alignItems: 'center',
    },
    pieCenter: { alignItems: 'center' },
    pieCenterText: {
      fontSize: FontSizes.sm,
      fontWeight: FontWeights.extrabold as '800',
      color: theme.colors.textPrimary,
    },
    pieCenterLabel: { fontSize: FontSizes.xs, color: theme.colors.textMuted },
    pieLegend: { width: '100%', marginTop: 24, gap: 10 },
    pieLegendRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
    pieLegendDot: { width: 10, height: 10, borderRadius: 5 },
    pieLegendText: {
      flex: 1,
      fontSize: FontSizes.sm,
      color: theme.colors.textSecondary,
    },
    pieLegendAmt: {
      fontSize: FontSizes.sm,
      fontWeight: FontWeights.semibold as '600',
      color: theme.colors.textPrimary,
    },
  });
}

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { FontSizes, FontWeights } from '../../../constants/typography';
import { formatCurrency } from '../../../utils/currency';
import { GradientCard } from '../../../components/common/GradientCard';
import { useTheme } from '../../../theme/useTheme';
import { useStyles } from '../../../theme/useStyles';
import { Theme } from '../../../theme/types';

interface TopCategoryData {
  category: string;
  amount: number;
  icon: string;
  color: string;
}

interface TopSpendingCategoryProps {
  topCategory: TopCategoryData | null;
  totalExpense: number;
  currencySymbol: string;
}

export function TopSpendingCategory({
  topCategory,
  totalExpense,
  currencySymbol,
}: TopSpendingCategoryProps) {
  const theme = useTheme();
  const styles = useStyles(getStyles);

  if (!topCategory) return null;

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Top Spending Category</Text>
      <GradientCard
        variant="gradient"
        gradientColors={[
          theme.colors.cardGradientStart,
          theme.colors.cardGradientEnd,
        ]}
      >
        <View style={styles.topCatRow}>
          <View
            style={[
              styles.topCatIcon,
              { backgroundColor: `${topCategory.color}33` },
            ]}
          >
            <Icon name={topCategory.icon} size={30} color={topCategory.color} />
          </View>
          <View style={styles.topCatInfo}>
            <Text style={styles.topCatName}>
              {topCategory.category
                .replace(/_/g, ' ')
                .replace(/\b\w/g, c => c.toUpperCase())}
            </Text>
            <Text style={styles.topCatAmount}>
              {formatCurrency(topCategory.amount, currencySymbol)}
            </Text>
            <Text style={styles.topCatPct}>
              {totalExpense > 0
                ? ((topCategory.amount / totalExpense) * 100).toFixed(0)
                : 0}
              % of total spending
            </Text>
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
    topCatRow: { flexDirection: 'row', alignItems: 'center', gap: 16 },
    topCatIcon: {
      width: 64,
      height: 64,
      borderRadius: 32,
      alignItems: 'center',
      justifyContent: 'center',
    },
    topCatInfo: { flex: 1 },
    topCatName: {
      fontSize: FontSizes.base,
      fontWeight: FontWeights.semibold as '600',
      color: theme.colors.white,
      marginBottom: 4,
    },
    topCatAmount: {
      fontSize: FontSizes.xl,
      fontWeight: FontWeights.extrabold as '800',
      color: theme.colors.white,
      marginBottom: 2,
    },
    topCatPct: {
      fontSize: FontSizes.xs,
      color: 'rgba(255,255,255,0.7)',
    },
  });
}

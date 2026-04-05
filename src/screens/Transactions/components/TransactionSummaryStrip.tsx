import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { FontSizes, FontWeights } from '../../../constants/typography';
import { formatCurrency } from '../../../utils/currency';
import { useTheme } from '../../../theme/useTheme';
import { useStyles } from '../../../theme/useStyles';
import { Theme } from '../../../theme/types';

interface TransactionSummaryStripProps {
  income: number;
  expense: number;
  currencySymbol: string;
  totalEntries: number;
}

export function TransactionSummaryStrip({
  income,
  expense,
  currencySymbol,
  totalEntries,
}: TransactionSummaryStripProps) {
  const theme = useTheme();
  const styles = useStyles(getStyles);

  return (
    <View style={styles.summaryStrip}>
      <View style={styles.summaryItem}>
        <Icon name="arrow-down-circle" size={14} color={theme.colors.income} />
        <Text style={[styles.summaryValue, { color: theme.colors.income }]}>
          {formatCurrency(income, currencySymbol, true)}
        </Text>
      </View>
      <View style={styles.summaryDivider} />
      <View style={styles.summaryItem}>
        <Icon name="arrow-up-circle" size={14} color={theme.colors.expense} />
        <Text style={[styles.summaryValue, { color: theme.colors.expense }]}>
          {formatCurrency(expense, currencySymbol, true)}
        </Text>
      </View>
      <View style={styles.summaryDivider} />
      <Text style={styles.summaryCount}>{totalEntries} entries</Text>
    </View>
  );
}

function getStyles(theme: Theme) {
  return StyleSheet.create({
    summaryStrip: {
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: 20,
      marginBottom: 12,
      backgroundColor: theme.colors.surfaceElevated,
      borderRadius: 12,
      paddingVertical: 10,
      paddingHorizontal: 16,
      borderWidth: 1,
      borderColor: theme.colors.border,
      gap: 8,
    },
    summaryItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      flex: 1,
    },
    summaryValue: {
      fontSize: FontSizes.sm,
      fontWeight: FontWeights.bold as '700',
    },
    summaryDivider: {
      width: 1,
      height: 16,
      backgroundColor: theme.colors.border,
    },
    summaryCount: {
      fontSize: FontSizes.xs,
      color: theme.colors.textMuted,
      fontWeight: FontWeights.medium as '500',
    },
  });
}

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { FontSizes, FontWeights } from '../../../constants/typography';
import { SerializedTransaction } from '../../../features/transactions/transactionsSlice';
import { formatCurrency } from '../../../utils/currency';
import { formatDate } from '../../../utils/dateHelpers';
import { GradientCard } from '../../../components/common/GradientCard';
import { EmptyState } from '../../../components/common/EmptyState';
import { useTheme } from '../../../theme/useTheme';
import { useStyles } from '../../../theme/useStyles';
import { Theme } from '../../../theme/types';

interface RecentTransactionsListProps {
  transactions: SerializedTransaction[];
  currencySymbol: string;
}

export const RecentTransactionsList: React.FC<RecentTransactionsListProps> = ({
  transactions,
  currencySymbol,
}) => {
  const theme = useTheme();
  const styles = useStyles(getStyles);

  if (transactions.length === 0) {
    return (
      <EmptyState
        icon="receipt"
        title="No transactions yet"
        subtitle="Add your first transaction to get started"
      />
    );
  }

  return (
    <GradientCard style={styles.card}>
      {transactions.map((item, index) => (
        <React.Fragment key={item.id}>
          <View style={styles.row}>
            <View
              style={[
                styles.iconContainer,
                { backgroundColor: `${item.categoryColor}22` },
              ]}
            >
              <Icon
                name={item.categoryIcon}
                size={20}
                color={item.categoryColor}
              />
            </View>
            <View style={styles.info}>
              <Text style={styles.category}>
                {item.category.charAt(0).toUpperCase() +
                  item.category.slice(1).replace(/_/g, ' ')}
              </Text>
              <Text style={styles.notes} numberOfLines={1}>
                {item.notes || formatDate(item.date)}
              </Text>
            </View>
            <Text
              style={[
                styles.amount,
                {
                  color:
                    item.type === 'income'
                      ? theme.colors.income
                      : theme.colors.expense,
                },
              ]}
            >
              {item.type === 'income' ? '+' : '-'}
              {formatCurrency(item.amount, currencySymbol)}
            </Text>
          </View>
          {index < transactions.length - 1 && <View style={styles.separator} />}
        </React.Fragment>
      ))}
    </GradientCard>
  );
};

function getStyles(theme: Theme) {
  return StyleSheet.create({
    card: { padding: 8 },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 10,
      paddingHorizontal: 8,
    },
    iconContainer: {
      width: 42,
      height: 42,
      borderRadius: 21,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 12,
    },
    info: { flex: 1 },
    category: {
      fontSize: FontSizes.sm,
      fontWeight: FontWeights.semibold as '600',
      color: theme.colors.textPrimary,
      marginBottom: 2,
    },
    notes: {
      fontSize: FontSizes.xs,
      color: theme.colors.textMuted,
    },
    amount: {
      fontSize: FontSizes.base,
      fontWeight: FontWeights.bold as '700',
    },
    separator: {
      height: 1,
      backgroundColor: theme.colors.border,
      marginHorizontal: 8,
    },
  });
}

import React, { useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Alert,
} from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { FontSizes, FontWeights } from '../../../constants/typography';
import { SerializedTransaction } from '../../../features/transactions/transactionsSlice';
import { formatCurrency } from '../../../utils/currency';
import { formatDateShort } from '../../../utils/dateHelpers';
import { useTransactions } from '../../../hooks/useTransactions';
import { useTheme } from '../../../theme/useTheme';
import { useStyles } from '../../../theme/useStyles';
import { Theme } from '../../../theme/types';

interface TransactionItemProps {
  transaction: SerializedTransaction;
  currencySymbol: string;
  onEdit: (id: string) => void;
}

export const TransactionItem: React.FC<TransactionItemProps> = ({
  transaction,
  currencySymbol,
  onEdit,
}) => {
  const theme = useTheme();
  const styles = useStyles(getStyles);
  const swipeRef = useRef<Swipeable>(null);
  const { removeTransaction } = useTransactions();

  const handleDelete = () => {
    Alert.alert(
      'Delete Transaction',
      'Are you sure you want to delete this transaction?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: () => swipeRef.current?.close(),
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            swipeRef.current?.close();
            removeTransaction(transaction.id);
          },
        },
      ],
    );
  };

  const renderRightActions = (
    _progress: Animated.AnimatedInterpolation<number>,
    dragX: Animated.AnimatedInterpolation<number>,
  ) => {
    const scale = dragX.interpolate({
      inputRange: [-120, -60, 0],
      outputRange: [1, 0.8, 0],
      extrapolate: 'clamp',
    });
    return (
      <View style={styles.rightActions}>
        <TouchableOpacity
          style={styles.editAction}
          onPress={() => {
            swipeRef.current?.close();
            onEdit(transaction.id);
          }}
        >
          <Animated.View style={{ transform: [{ scale }] }}>
            <Icon name="pencil" size={20} color={theme.colors.white} />
          </Animated.View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteAction} onPress={handleDelete}>
          <Animated.View style={{ transform: [{ scale }] }}>
            <Icon name="trash-can" size={20} color={theme.colors.white} />
          </Animated.View>
        </TouchableOpacity>
      </View>
    );
  };

  const categoryLabel = transaction.category
    .replace(/_/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase());

  return (
    <Swipeable
      ref={swipeRef}
      renderRightActions={renderRightActions}
      rightThreshold={40}
      friction={2}
      overshootRight={false}
    >
      <View style={styles.container}>
        <View
          style={[
            styles.iconContainer,
            { backgroundColor: `${transaction.categoryColor}22` },
          ]}
        >
          <Icon
            name={transaction.categoryIcon}
            size={22}
            color={transaction.categoryColor}
          />
        </View>
        <View style={styles.info}>
          <Text style={styles.category}>{categoryLabel}</Text>
          <Text style={styles.notes} numberOfLines={1}>
            {transaction.notes || '—'}
          </Text>
        </View>
        <View style={styles.right}>
          <Text
            style={[
              styles.amount,
              {
                color:
                  transaction.type === 'income'
                    ? theme.colors.income
                    : theme.colors.expense,
              },
            ]}
          >
            {transaction.type === 'income' ? '+' : '-'}
            {formatCurrency(transaction.amount, currencySymbol)}
          </Text>
          <Text style={styles.date}>{formatDateShort(transaction.date)}</Text>
        </View>
      </View>
    </Swipeable>
  );
};

function getStyles(theme: Theme) {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.surface,
      borderRadius: 16,
      padding: 14,
      marginBottom: 8,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    iconContainer: {
      width: 46,
      height: 46,
      borderRadius: 23,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 12,
    },
    info: { flex: 1 },
    category: {
      fontSize: FontSizes.sm,
      fontWeight: FontWeights.semibold as '600',
      color: theme.colors.textPrimary,
      marginBottom: 3,
    },
    notes: {
      fontSize: FontSizes.xs,
      color: theme.colors.textMuted,
    },
    right: { alignItems: 'flex-end' },
    amount: {
      fontSize: FontSizes.base,
      fontWeight: FontWeights.bold as '700',
      marginBottom: 3,
    },
    date: {
      fontSize: FontSizes.xs,
      color: theme.colors.textMuted,
    },
    rightActions: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
      gap: 4,
    },
    editAction: {
      backgroundColor: theme.colors.primary,
      width: 56,
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 16,
    },
    deleteAction: {
      backgroundColor: theme.colors.expense,
      width: 56,
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 16,
    },
  });
}

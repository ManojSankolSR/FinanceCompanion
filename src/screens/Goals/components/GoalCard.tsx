import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { FontSizes, FontWeights } from '../../../constants/typography';
import { SerializedGoal } from '../../../features/goals/goalsSlice';
import { formatCurrency } from '../../../utils/currency';
import { getDaysLeft } from '../../../utils/dateHelpers';
import { GoalsStackParamList } from '../../../navigation/types';
import { selectGoalProgress } from '../../../features/goals/goalsSelectors';
import { useAppSelector } from '../../../app/hooks';
import { useTheme } from '../../../theme/useTheme';
import { useStyles } from '../../../theme/useStyles';
import { Theme } from '../../../theme/types';

type Nav = StackNavigationProp<GoalsStackParamList, 'Goals'>;

interface GoalCardProps {
  item: SerializedGoal;
  onDelete: (goal: SerializedGoal) => void;
}

export function GoalCard({ item, onDelete }: GoalCardProps) {
  const theme = useTheme();
  const styles = useStyles(getStyles);
  const navigation = useNavigation<Nav>();
  const currencySymbol = useAppSelector(s => s.ui.currencySymbol);
  const transactions = useAppSelector(s => s.transactions.items);

  const progress = selectGoalProgress(item, transactions);
  const savedAmount = progress * item.targetAmount;
  const daysLeft = getDaysLeft(item.endDate);

  const statusColor =
    progress >= 1
      ? theme.colors.income
      : daysLeft <= 5 && progress < 0.7
      ? theme.colors.expense
      : theme.colors.primary;

  const statusLabel =
    progress >= 1
      ? 'Achieved!'
      : daysLeft <= 5 && progress < 0.7
      ? 'At Risk'
      : 'On Track';

  return (
    <View style={styles.goalCard}>
      {}
      <View style={styles.goalHeader}>
        <Text style={styles.goalEmoji}>{item.emoji}</Text>
        <View style={styles.goalTitleArea}>
          <Text style={styles.goalTitle} numberOfLines={1}>
            {item.title}
          </Text>
          <View
            style={[styles.statusChip, { backgroundColor: `${statusColor}22` }]}
          >
            <Text style={[styles.statusText, { color: statusColor }]}>
              {statusLabel}
            </Text>
          </View>
        </View>
        <View style={styles.goalActions}>
          <TouchableOpacity
            onPress={() => navigation.navigate('AddGoal', { goalId: item.id })}
            style={styles.actionBtn}
          >
            <Icon
              name="pencil-outline"
              size={16}
              color={theme.colors.textSecondary}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onDelete(item)}
            style={styles.actionBtn}
          >
            <Icon
              name="trash-can-outline"
              size={16}
              color={theme.colors.expense}
            />
          </TouchableOpacity>
        </View>
      </View>

      {}
      <View style={styles.amountRow}>
        <View>
          <Text style={styles.savedLabel}>Saved</Text>
          <Text style={[styles.savedAmount, { color: statusColor }]}>
            {formatCurrency(savedAmount, currencySymbol)}
          </Text>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <Text style={styles.savedLabel}>Target</Text>
          <Text style={styles.targetAmount}>
            {formatCurrency(item.targetAmount, currencySymbol)}
          </Text>
        </View>
      </View>

      {}
      <View style={styles.progressBg}>
        <LinearGradient
          colors={[theme.colors.gradientStart, theme.colors.gradientEnd]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[
            styles.progressFill,
            { width: `${Math.min(progress * 100, 100)}%` },
          ]}
        />
      </View>
      <View style={styles.progressRow}>
        <Text style={styles.progressPct}>
          {(progress * 100).toFixed(0)}% complete
        </Text>
        <Text style={styles.daysLeft}>
          {daysLeft > 0 ? `${daysLeft} days left` : 'Goal ended'}
        </Text>
      </View>

      {}
      <View style={styles.streakRow}>
        <View style={styles.streakBadge}>
          <Text style={styles.streakIcon}>🔥</Text>
          <Text style={styles.streakText}>
            {item.currentStreak} month streak
          </Text>
        </View>
        <View style={styles.bestStreakBadge}>
          <Text style={styles.bestStreakText}>Best: {item.bestStreak}</Text>
        </View>
      </View>
    </View>
  );
}

function getStyles(theme: Theme) {
  return StyleSheet.create({
    goalCard: {
      backgroundColor: theme.colors.surface,
      borderRadius: 20,
      padding: 18,
      marginBottom: 14,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    goalHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 14,
      gap: 12,
    },
    goalEmoji: { fontSize: 36 },
    goalTitleArea: { flex: 1 },
    goalTitle: {
      fontSize: FontSizes.md,
      fontWeight: FontWeights.bold as '700',
      color: theme.colors.textPrimary,
      marginBottom: 5,
    },
    statusChip: {
      alignSelf: 'flex-start',
      paddingHorizontal: 8,
      paddingVertical: 3,
      borderRadius: 8,
    },
    statusText: {
      fontSize: FontSizes.xs,
      fontWeight: FontWeights.semibold as '600',
    },
    goalActions: { flexDirection: 'row', gap: 4 },
    actionBtn: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: theme.colors.surfaceElevated,
      alignItems: 'center',
      justifyContent: 'center',
    },
    amountRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 12,
    },
    savedLabel: {
      fontSize: FontSizes.xs,
      color: theme.colors.textMuted,
      marginBottom: 2,
    },
    savedAmount: {
      fontSize: FontSizes.lg,
      fontWeight: FontWeights.extrabold as '800',
    },
    targetAmount: {
      fontSize: FontSizes.lg,
      fontWeight: FontWeights.bold as '700',
      color: theme.colors.textSecondary,
    },
    progressBg: {
      height: 10,
      backgroundColor: theme.colors.surfaceHighlight,
      borderRadius: 5,
      marginBottom: 6,
      overflow: 'hidden',
    },
    progressFill: {
      height: '100%',
      borderRadius: 5,
    },
    progressRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 12,
    },
    progressPct: {
      fontSize: FontSizes.xs,
      color: theme.colors.primary,
      fontWeight: FontWeights.semibold as '600',
    },
    daysLeft: {
      fontSize: FontSizes.xs,
      color: theme.colors.textMuted,
    },
    streakRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingTop: 12,
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
    },
    streakBadge: { flexDirection: 'row', alignItems: 'center', gap: 6 },
    streakIcon: { fontSize: 16 },
    streakText: {
      fontSize: FontSizes.sm,
      color: theme.colors.textSecondary,
      fontWeight: FontWeights.medium as '500',
    },
    bestStreakBadge: {
      backgroundColor: theme.colors.savingsLight,
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 10,
    },
    bestStreakText: {
      fontSize: FontSizes.xs,
      color: theme.colors.savings,
      fontWeight: FontWeights.bold as '700',
    },
  });
}

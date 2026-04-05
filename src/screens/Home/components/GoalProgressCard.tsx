import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontSizes, FontWeights } from '../../../constants/typography';
import { SerializedGoal } from '../../../features/goals/goalsSlice';
import { selectGoalProgress } from '../../../features/goals/goalsSelectors';
import { useAppSelector } from '../../../app/hooks';
import { formatCurrency } from '../../../utils/currency';
import { getDaysLeft } from '../../../utils/dateHelpers';
import { GradientCard } from '../../../components/common/GradientCard';
import { useTheme } from '../../../theme/useTheme';
import { useStyles } from '../../../theme/useStyles';
import { Theme } from '../../../theme/types';

interface GoalProgressCardProps {
  goal: SerializedGoal;
  currencySymbol: string;
}

export const GoalProgressCard: React.FC<GoalProgressCardProps> = ({
  goal,
  currencySymbol,
}) => {
  const theme = useTheme();
  const styles = useStyles(getStyles);
  const transactions = useAppSelector(state => state.transactions.items);
  const progress = selectGoalProgress(goal, transactions);
  const daysLeft = getDaysLeft(goal.endDate);
  const savedAmount = progress * goal.targetAmount;

  const statusColor =
    progress >= 1
      ? theme.colors.income
      : daysLeft <= 5 && progress < 0.7
      ? theme.colors.expense
      : theme.colors.primary;

  const statusLabel =
    progress >= 1
      ? 'Achieved! 🎉'
      : daysLeft <= 5 && progress < 0.7
      ? 'At Risk ⚠️'
      : 'On Track ✓';

  return (
    <GradientCard style={styles.card}>
      <View style={styles.topRow}>
        <Text style={styles.emoji}>{goal.emoji}</Text>
        <View style={styles.info}>
          <Text style={styles.title} numberOfLines={1}>
            {goal.title}
          </Text>
          <View style={styles.statusBadge}>
            <View
              style={[styles.statusDot, { backgroundColor: statusColor }]}
            />
            <Text style={[styles.statusText, { color: statusColor }]}>
              {statusLabel}
            </Text>
          </View>
        </View>
        <View style={styles.streakBadge}>
          <Text style={styles.streakEmoji}>🔥</Text>
          <Text style={styles.streakCount}>{goal.currentStreak}</Text>
        </View>
      </View>

      {}
      <View style={styles.progressBg}>
        <View
          style={[
            styles.progressFill,
            {
              width: `${Math.min(progress * 100, 100)}%`,
              backgroundColor: statusColor,
            },
          ]}
        />
      </View>

      <View style={styles.bottomRow}>
        <Text style={styles.progressText}>
          {formatCurrency(savedAmount, currencySymbol, true)} /{' '}
          {formatCurrency(goal.targetAmount, currencySymbol, true)}
        </Text>
        <Text style={styles.daysLeft}>
          {daysLeft > 0 ? `${daysLeft}d left` : 'Ended'}
        </Text>
      </View>
    </GradientCard>
  );
};

function getStyles(theme: Theme) {
  return StyleSheet.create({
    card: { marginBottom: 10 },
    topRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 14,
      gap: 12,
    },
    emoji: { fontSize: 32 },
    info: { flex: 1 },
    title: {
      fontSize: FontSizes.base,
      fontWeight: FontWeights.bold as '700',
      color: theme.colors.textPrimary,
      marginBottom: 4,
    },
    statusBadge: { flexDirection: 'row', alignItems: 'center', gap: 4 },
    statusDot: { width: 6, height: 6, borderRadius: 3 },
    statusText: {
      fontSize: FontSizes.xs,
      fontWeight: FontWeights.semibold as '600',
    },
    streakBadge: {
      alignItems: 'center',
      backgroundColor: theme.colors.savingsLight,
      borderRadius: 12,
      paddingHorizontal: 10,
      paddingVertical: 6,
    },
    streakEmoji: { fontSize: 14 },
    streakCount: {
      fontSize: FontSizes.sm,
      fontWeight: FontWeights.extrabold as '800',
      color: theme.colors.savings,
    },
    progressBg: {
      height: 8,
      backgroundColor: theme.colors.surfaceHighlight,
      borderRadius: 4,
      marginBottom: 8,
      overflow: 'hidden',
    },
    progressFill: {
      height: '100%',
      borderRadius: 4,
    },
    bottomRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    progressText: {
      fontSize: FontSizes.xs,
      color: theme.colors.textSecondary,
      fontWeight: FontWeights.medium as '500',
    },
    daysLeft: {
      fontSize: FontSizes.xs,
      color: theme.colors.textMuted,
      fontWeight: FontWeights.medium as '500',
    },
  });
}

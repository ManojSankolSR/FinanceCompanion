import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { FontSizes, FontWeights } from '../../../constants/typography';
import { formatCurrency } from '../../../utils/currency';
import { useTheme } from '../../../theme/useTheme';
import { useStyles } from '../../../theme/useStyles';
import { Theme } from '../../../theme/types';

interface BalanceSummaryCardProps {
  balance: number;
  income: number;
  expense: number;
  currencySymbol: string;
}

export const BalanceSummaryCard: React.FC<BalanceSummaryCardProps> = ({
  balance,
  income,
  expense,
  currencySymbol,
}) => {
  const theme = useTheme();
  const styles = useStyles(getStyles);
  const scaleAnim = useRef(new Animated.Value(0.95)).current;

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      tension: 100,
      friction: 8,
      useNativeDriver: true,
    }).start();
  }, [scaleAnim]);

  return (
    <Animated.View
      style={[styles.container, { transform: [{ scale: scaleAnim }] }]}
    >
      <LinearGradient
        colors={[
          theme.colors.gradientStart,
          theme.colors.gradientEnd,
          theme.colors.primary,
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        {}
        <View style={styles.decorCircle1} />
        <View style={styles.decorCircle2} />

        <Text style={styles.label}>Total Balance</Text>
        <Text style={styles.balanceAmount}>
          {formatCurrency(balance, currencySymbol)}
        </Text>

        <View style={styles.divider} />

        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <View
              style={[
                styles.iconBadge,
                { backgroundColor: theme.colors.incomeLight },
              ]}
            >
              <Icon
                name="arrow-down-circle"
                size={16}
                color={theme.colors.income}
              />
            </View>
            <View>
              <Text style={styles.statLabel}>Income</Text>
              <Text style={[styles.statValue, { color: theme.colors.income }]}>
                {formatCurrency(income, currencySymbol, true)}
              </Text>
            </View>
          </View>

          <View style={styles.verticalDivider} />

          <View style={styles.statItem}>
            <View
              style={[
                styles.iconBadge,
                { backgroundColor: theme.colors.expenseLight },
              ]}
            >
              <Icon
                name="arrow-up-circle"
                size={16}
                color={theme.colors.expense}
              />
            </View>
            <View>
              <Text style={styles.statLabel}>Expenses</Text>
              <Text style={[styles.statValue, { color: theme.colors.expense }]}>
                {formatCurrency(expense, currencySymbol, true)}
              </Text>
            </View>
          </View>
        </View>
      </LinearGradient>
    </Animated.View>
  );
};

function getStyles(theme: Theme) {
  return StyleSheet.create({
    container: {
      marginBottom: 20,
      marginHorizontal: 20,
      borderRadius: 24,
      shadowColor: theme.colors.primary,
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.35,
      shadowRadius: 20,
      elevation: 12,
    },
    gradient: {
      borderRadius: 24,
      padding: 24,
      overflow: 'hidden',
    },
    decorCircle1: {
      position: 'absolute',
      width: 180,
      height: 180,
      borderRadius: 90,
      backgroundColor: 'rgba(255,255,255,0.1)',
      top: -60,
      right: -40,
    },
    decorCircle2: {
      position: 'absolute',
      width: 120,
      height: 120,
      borderRadius: 60,
      backgroundColor: 'rgba(255,255,255,0.08)',
      bottom: -30,
      left: -20,
    },
    label: {
      fontSize: FontSizes.sm,
      color: 'rgba(255,255,255,0.7)',
      fontWeight: FontWeights.medium as '500',
      marginBottom: 6,
      letterSpacing: 0.5,
    },
    balanceAmount: {
      fontSize: FontSizes['4xl'],
      fontWeight: FontWeights.extrabold as '800',
      color: theme.colors.white,
      letterSpacing: -1.5,
      marginBottom: 20,
    },
    divider: {
      height: 1,
      backgroundColor: 'rgba(255,255,255,0.15)',
      marginBottom: 16,
    },
    statsRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    statItem: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },
    iconBadge: {
      width: 32,
      height: 32,
      borderRadius: 16,
      alignItems: 'center',
      justifyContent: 'center',
    },
    statLabel: {
      fontSize: FontSizes.xs,
      color: 'rgba(255,255,255,0.6)',
      fontWeight: FontWeights.medium as '500',
    },
    statValue: {
      fontSize: FontSizes.base,
      fontWeight: FontWeights.bold as '700',
    },
    verticalDivider: {
      width: 1,
      height: 40,
      backgroundColor: 'rgba(255,255,255,0.15)',
      marginHorizontal: 12,
    },
  });
}

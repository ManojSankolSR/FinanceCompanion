import React, { useEffect, useRef } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Animated,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  selectBalance,
  selectTotalIncome,
  selectTotalExpense,
  selectRecentTransactions,
  selectMonthlyStats,
} from '../../features/transactions/transactionsSelectors';
import { selectActiveGoals } from '../../features/goals/goalsSelectors';
import { openAddTransaction } from '../../features/ui/uiSlice';
import { BalanceSummaryCard } from './components/BalanceSummaryCard';
import { WeeklyBarChart } from './components/WeeklyBarChart';
import { RecentTransactionsList } from './components/RecentTransactionsList';
import { GoalProgressCard } from './components/GoalProgressCard';
import { HomeHeader } from './components/HomeHeader';
import { MonthlyStatsStrip } from './components/MonthlyStatsStrip';
import { HomeSection } from './components/HomeSection';
import { HomeFab } from './components/HomeFab';
import { TransactionsStackParamList } from '../../navigation/types';
import { useTheme } from '../../theme/useTheme';
import { useStyles } from '../../theme/useStyles';
import { Theme } from '../../theme/types';

export default function HomeScreen() {
  const dispatch = useAppDispatch();
  const navigation =
    useNavigation<StackNavigationProp<TransactionsStackParamList>>();
  const theme = useTheme();
  const styles = useStyles(getStyles);

  const balance = useAppSelector(selectBalance);
  const income = useAppSelector(selectTotalIncome);
  const expense = useAppSelector(selectTotalExpense);
  const recentTransactions = useAppSelector(selectRecentTransactions);
  const activeGoals = useAppSelector(selectActiveGoals);
  const monthlyStats = useAppSelector(selectMonthlyStats);
  const currencySymbol = useAppSelector(state => state.ui.currencySymbol);
  const userName = useAppSelector(state => state.ui.userName);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  const handleAddTransaction = () => {
    dispatch(openAddTransaction());
    (navigation as any).navigate('TransactionsTab', {
      screen: 'AddTransaction',
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={theme.dark ? 'light-content' : 'dark-content'}
        backgroundColor={theme.colors.background}
      />
      <SafeAreaView edges={['top']} style={styles.safeArea}>
        <HomeHeader userName={userName} />

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }}
          >
            {}
            <BalanceSummaryCard
              balance={balance}
              income={income}
              expense={expense}
              currencySymbol={currencySymbol}
            />

            <MonthlyStatsStrip
              monthlyStats={monthlyStats}
              currencySymbol={currencySymbol}
            />

            {}
            <HomeSection title="This Week" subtitle="Spending overview">
              <WeeklyBarChart currencySymbol={currencySymbol} />
            </HomeSection>

            {}
            <HomeSection
              title="Savings Goals"
              subtitle="Your progress"
              onAction={() => navigation.navigate('GoalsTab' as any)}
            >
              {activeGoals.length > 0 ? (
                <View style={styles.goalsContainer}>
                  {activeGoals.map(goal => (
                    <GoalProgressCard
                      key={goal.id}
                      goal={goal}
                      currencySymbol={currencySymbol}
                    />
                  ))}
                </View>
              ) : null}
            </HomeSection>

            {}
            <HomeSection
              title="Recent Activity"
              subtitle="Your latest spending"
              onAction={() => navigation.navigate('TransactionsTab' as any)}
            >
              <RecentTransactionsList
                transactions={recentTransactions}
                currencySymbol={currencySymbol}
              />
            </HomeSection>
          </Animated.View>
        </ScrollView>

        <HomeFab onPress={handleAddTransaction} />
      </SafeAreaView>
    </View>
  );
}

function getStyles(theme: Theme) {
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.colors.background },
    safeArea: { flex: 1 },
    scroll: { flex: 1 },
    scrollContent: { paddingBottom: 100 },
    goalsContainer: { gap: 12 },
  });
}

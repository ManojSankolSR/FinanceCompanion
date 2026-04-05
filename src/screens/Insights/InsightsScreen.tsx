import React from 'react';
import { View, StyleSheet, ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAppSelector } from '../../app/hooks';
import {
  selectCategoryBreakdown,
  selectTopCategory,
  selectTotalExpense,
} from '../../features/transactions/transactionsSelectors';
import { EmptyState } from '../../components/common/EmptyState';

import { InsightsHeader } from './components/InsightsHeader';
import { TopSpendingCategory } from './components/TopSpendingCategory';
import { CategoryDonutChart } from './components/CategoryDonutChart';
import { WeeklyComparisonChart } from './components/WeeklyComparisonChart';
import { ExpenseTrendChart } from './components/ExpenseTrendChart';
import { useTheme } from '../../theme/useTheme';
import { useStyles } from '../../theme/useStyles';
import { Theme } from '../../theme/types';

export default function InsightsScreen() {
  const theme = useTheme();
  const styles = useStyles(getStyles);
  const currencySymbol = useAppSelector(s => s.ui.currencySymbol);
  const categoryBreakdown = useAppSelector(selectCategoryBreakdown);
  const topCategory = useAppSelector(selectTopCategory);
  const totalExpense = useAppSelector(selectTotalExpense);

  const hasData = categoryBreakdown.length > 0;

  return (
    <View style={styles.container}>
      <StatusBar barStyle={theme.dark ? 'light-content' : 'dark-content'} />
      <SafeAreaView edges={['top']} style={styles.safeArea}>
        <InsightsHeader />

        {!hasData ? (
          <EmptyState
            icon="chart-bar"
            title="Not enough data"
            subtitle="Add some transactions to see your spending insights"
            style={styles.empty}
          />
        ) : (
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <TopSpendingCategory
              topCategory={topCategory}
              totalExpense={totalExpense}
              currencySymbol={currencySymbol}
            />

            <WeeklyComparisonChart />
            <CategoryDonutChart />
            <ExpenseTrendChart />
          </ScrollView>
        )}
      </SafeAreaView>
    </View>
  );
}

function getStyles(theme: Theme) {
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.colors.background },
    safeArea: { flex: 1 },
    scrollContent: { paddingHorizontal: 20, paddingBottom: 100 },
    empty: { flex: 1 },
  });
}

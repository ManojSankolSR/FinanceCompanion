import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SectionList,
  RefreshControl,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { FontSizes, FontWeights } from '../../constants/typography';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  selectFilteredTransactions,
  selectTotalIncome,
  selectTotalExpense,
} from '../../features/transactions/transactionsSelectors';
import {
  setFilterType,
  setSearchQuery,
} from '../../features/transactions/transactionsSlice';
import { openAddTransaction } from '../../features/ui/uiSlice';
import { groupTransactionsByDate } from '../../utils/dateHelpers';
import { TransactionItem } from './components/TransactionItem';
import { TransactionSummaryStrip } from './components/TransactionSummaryStrip';
import { TransactionSearch } from './components/TransactionSearch';
import { FilterPillBar } from './components/FilterPillBar';
import { EmptyState } from '../../components/common/EmptyState';
import { TransactionsStackParamList } from '../../navigation/types';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTheme } from '../../theme/useTheme';
import { useStyles } from '../../theme/useStyles';
import { Theme } from '../../theme/types';

type Nav = StackNavigationProp<TransactionsStackParamList, 'Transactions'>;

export default function TransactionsScreen() {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<Nav>();
  const theme = useTheme();
  const styles = useStyles(getStyles);
  const [refreshing, setRefreshing] = useState(false);

  const filtered = useAppSelector(selectFilteredTransactions);
  const filterType = useAppSelector(s => s.transactions.filterType);
  const searchQuery = useAppSelector(s => s.transactions.searchQuery);
  const currencySymbol = useAppSelector(s => s.ui.currencySymbol);
  const income = useAppSelector(selectTotalIncome);
  const expense = useAppSelector(selectTotalExpense);

  const grouped = groupTransactionsByDate(filtered);
  const sections = grouped.map(g => ({ title: g.label, data: g.data }));

  const handleAddTransaction = () => {
    dispatch(openAddTransaction());
    navigation.navigate('AddTransaction');
  };

  const handleEditTransaction = (id: string) => {
    navigation.navigate('AddTransaction', { transactionId: id });
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 500);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle={theme.dark ? 'light-content' : 'dark-content'} />
      <SafeAreaView edges={['top']} style={styles.safeArea}>
        {}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Transactions</Text>
          <TouchableOpacity
            style={styles.addBtn}
            onPress={handleAddTransaction}
          >
            <Icon name="plus" size={20} color={theme.colors.white} />
          </TouchableOpacity>
        </View>

        <TransactionSummaryStrip
          income={income}
          expense={expense}
          currencySymbol={currencySymbol}
          totalEntries={filtered.length}
        />

        <TransactionSearch
          searchQuery={searchQuery}
          setSearchQuery={q => dispatch(setSearchQuery(q))}
        />

        <FilterPillBar
          filterType={filterType}
          setFilterType={val => dispatch(setFilterType(val))}
        />

        {}
        <SectionList
          sections={sections}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          stickySectionHeadersEnabled={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={theme.colors.primary}
            />
          }
          renderSectionHeader={({ section: { title } }) => (
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>{title}</Text>
            </View>
          )}
          renderItem={({ item }) => (
            <TransactionItem
              transaction={item}
              currencySymbol={currencySymbol}
              onEdit={handleEditTransaction}
            />
          )}
          ListEmptyComponent={
            <EmptyState
              icon="swap-horizontal"
              title="No matching transactions"
              subtitle="Try adjusting your filters or search query"
            />
          }
        />
      </SafeAreaView>
    </View>
  );
}

function getStyles(theme: Theme) {
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.colors.background },
    safeArea: { flex: 1 },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 16,
    },
    headerTitle: {
      fontSize: FontSizes['2xl'],
      fontWeight: FontWeights.bold as '700',
      color: theme.colors.textPrimary,
    },
    addBtn: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: theme.colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: theme.colors.primary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 4,
    },
    listContent: { paddingBottom: 100, paddingHorizontal: 20 },
    sectionHeader: {
      backgroundColor: 'transparent',
      paddingTop: 24,
      paddingBottom: 12,
    },
    sectionTitle: {
      fontSize: FontSizes.sm,
      fontWeight: FontWeights.bold as '700',
      color: theme.colors.textMuted,
      textTransform: 'uppercase',
      letterSpacing: 1.2,
    },
  });
}

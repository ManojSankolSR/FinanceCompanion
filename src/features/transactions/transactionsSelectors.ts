import { RootState } from '../../app/store';
import { SerializedTransaction } from './transactionsSlice';
import { createSelector } from '@reduxjs/toolkit';
import {
  isThisWeek,
  parseISO,
  startOfMonth,
  endOfMonth,
  isWithinInterval,
  startOfWeek,
  subWeeks,
  endOfWeek,
} from 'date-fns';

const isLastWeek = (
  date: Date,
  options?: { weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6 },
): boolean => {
  const lastWeekStart = startOfWeek(subWeeks(new Date(), 1), options);
  const lastWeekEnd = endOfWeek(subWeeks(new Date(), 1), options);
  return isWithinInterval(date, { start: lastWeekStart, end: lastWeekEnd });
};

const selectTransactionsState = (state: RootState) => state.transactions;

export const selectAllTransactions = (state: RootState) =>
  state.transactions.items;

export const selectFilteredTransactions = createSelector(
  selectTransactionsState,
  ({ items, filterType, filterCategory, searchQuery, sortOrder }) => {
    let result = [...items];

    if (filterType !== 'all') {
      result = result.filter(t => t.type === filterType);
    }
    if (filterCategory) {
      result = result.filter(t => t.category === filterCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        t =>
          t.category.toLowerCase().includes(q) ||
          t.notes.toLowerCase().includes(q),
      );
    }
    switch (sortOrder) {
      case 'oldest':
        result.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
        );
        break;
      case 'highest':
        result.sort((a, b) => b.amount - a.amount);
        break;
      case 'lowest':
        result.sort((a, b) => a.amount - b.amount);
        break;
      default:
        result.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        );
    }
    return result;
  },
);

export const selectTotalIncome = createSelector(selectAllTransactions, items =>
  items.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0),
);

export const selectTotalExpense = createSelector(selectAllTransactions, items =>
  items.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0),
);

export const selectBalance = createSelector(
  selectTotalIncome,
  selectTotalExpense,
  (income, expense) => income - expense,
);

export const selectRecentTransactions = createSelector(
  selectAllTransactions,
  items =>
    [...items]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5),
);

export const selectThisWeekExpense = createSelector(
  selectAllTransactions,
  items =>
    items
      .filter(
        t =>
          t.type === 'expense' &&
          isThisWeek(parseISO(t.date), { weekStartsOn: 1 }),
      )
      .reduce((s, t) => s + t.amount, 0),
);

export const selectLastWeekExpense = createSelector(
  selectAllTransactions,
  items =>
    items
      .filter(
        t =>
          t.type === 'expense' &&
          isLastWeek(parseISO(t.date), { weekStartsOn: 1 }),
      )
      .reduce((s, t) => s + t.amount, 0),
);

export const selectCategoryBreakdown = createSelector(
  selectAllTransactions,
  items => {
    const map: Record<string, { amount: number; color: string; icon: string }> =
      {};
    items
      .filter(t => t.type === 'expense')
      .forEach(t => {
        if (!map[t.category]) {
          map[t.category] = {
            amount: 0,
            color: t.categoryColor,
            icon: t.categoryIcon,
          };
        }
        map[t.category].amount += t.amount;
      });
    return Object.entries(map)
      .map(([category, data]) => ({ category, ...data }))
      .sort((a, b) => b.amount - a.amount);
  },
);

export const selectMonthlyExpenseByDay = createSelector(
  selectAllTransactions,
  items => {
    const today = new Date();
    const weekData: number[] = new Array(7).fill(0);
    items
      .filter(t => {
        const d = parseISO(t.date);
        return t.type === 'expense' && isThisWeek(d, { weekStartsOn: 1 });
      })
      .forEach(t => {
        const dayOfWeek = new Date(t.date).getDay();
        const idx = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
        weekData[idx] += t.amount;
      });
    return weekData;
  },
);

export const selectMonthlyStats = createSelector(
  selectAllTransactions,
  items => {
    const now = new Date();
    const monthStart = startOfMonth(now);
    const monthEnd = endOfMonth(now);
    const thisMonthItems = items.filter(t =>
      isWithinInterval(parseISO(t.date), { start: monthStart, end: monthEnd }),
    );
    const income = thisMonthItems
      .filter(t => t.type === 'income')
      .reduce((s, t) => s + t.amount, 0);
    const expense = thisMonthItems
      .filter(t => t.type === 'expense')
      .reduce((s, t) => s + t.amount, 0);
    return { income, expense, count: thisMonthItems.length };
  },
);

export const selectTopCategory = createSelector(
  selectCategoryBreakdown,
  breakdown => (breakdown.length > 0 ? breakdown[0] : null),
);

export const selectWeeklyChartData = createSelector(
  selectAllTransactions,
  items => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const thisWeekData = new Array(7).fill(0);
    const lastWeekData = new Array(7).fill(0);

    items
      .filter(t => t.type === 'expense')
      .forEach(t => {
        const d = parseISO(t.date);
        const dayOfWeek = d.getDay();
        const idx = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
        if (isThisWeek(d, { weekStartsOn: 1 })) {
          thisWeekData[idx] += t.amount;
        } else if (isLastWeek(d, { weekStartsOn: 1 })) {
          lastWeekData[idx] += t.amount;
        }
      });

    return { days, thisWeekData, lastWeekData };
  },
);

export const selectLast6MonthsTrend = createSelector(
  selectAllTransactions,
  items => {
    const months: { label: string; income: number; expense: number }[] = [];
    const now = new Date();
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const start = startOfMonth(d);
      const end = endOfMonth(d);
      const monthItems = items.filter(t =>
        isWithinInterval(parseISO(t.date), { start, end }),
      );
      months.push({
        label: d.toLocaleString('default', { month: 'short' }),
        income: monthItems
          .filter(t => t.type === 'income')
          .reduce((s, t) => s + t.amount, 0),
        expense: monthItems
          .filter(t => t.type === 'expense')
          .reduce((s, t) => s + t.amount, 0),
      });
    }
    return months;
  },
);

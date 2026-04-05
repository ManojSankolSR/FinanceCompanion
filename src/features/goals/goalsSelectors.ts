import { RootState } from '../../app/store';
import { createSelector } from '@reduxjs/toolkit';
import { SerializedGoal } from './goalsSlice';
import { SerializedTransaction } from '../transactions/transactionsSlice';
import { parseISO, isWithinInterval, startOfMonth, endOfMonth } from 'date-fns';

export const selectAllGoals = (state: RootState) => state.goals.items;
export const selectActiveGoals = createSelector(selectAllGoals, goals =>
  goals.filter(g => g.isActive),
);

export const selectGoalProgress = (
  goal: SerializedGoal,
  transactions: SerializedTransaction[],
): number => {
  const start = parseISO(goal.startDate);
  const end = parseISO(goal.endDate);
  const savings = transactions
    .filter(t => {
      const d = parseISO(t.date);
      return t.type === 'income' && isWithinInterval(d, { start, end });
    })
    .reduce((s, t) => s + t.amount, 0);
  const expenses = transactions
    .filter(t => {
      const d = parseISO(t.date);
      return t.type === 'expense' && isWithinInterval(d, { start, end });
    })
    .reduce((s, t) => s + t.amount, 0);
  const netSavings = Math.max(0, savings - expenses);
  return Math.min(1, netSavings / goal.targetAmount);
};

import { SerializedTransaction } from '../features/transactions/transactionsSlice';
import { SerializedGoal } from '../features/goals/goalsSlice';
import { subDays, subMonths, format } from 'date-fns';

const randomBetween = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const expenseEntries: Array<{
  category: string;
  categoryIcon: string;
  categoryColor: string;
  amountRange: [number, number];
  notes: string[];
}> = [
  {
    category: 'food',
    categoryIcon: 'food-fork-drink',
    categoryColor: '#F97316',
    amountRange: [80, 800],
    notes: ['Lunch', 'Dinner', 'Coffee', 'Swiggy order', 'Breakfast'],
  },
  {
    category: 'transport',
    categoryIcon: 'car',
    categoryColor: '#3B82F6',
    amountRange: [50, 500],
    notes: ['Uber ride', 'Metro card', 'Auto', 'Petrol', 'Bus fare'],
  },
  {
    category: 'shopping',
    categoryIcon: 'shopping',
    categoryColor: '#EC4899',
    amountRange: [200, 3000],
    notes: ['Amazon purchase', 'Clothes', 'Accessories', 'Electronics'],
  },
  {
    category: 'health',
    categoryIcon: 'heart-pulse',
    categoryColor: '#10B981',
    amountRange: [100, 2000],
    notes: ['Pharmacy', 'Doctor visit', 'Gym membership', 'Vitamins'],
  },
  {
    category: 'entertainment',
    categoryIcon: 'movie-open',
    categoryColor: '#8B5CF6',
    amountRange: [150, 1500],
    notes: ['Netflix', 'Movie ticket', 'Concert', 'Spotify'],
  },
  {
    category: 'bills',
    categoryIcon: 'lightning-bolt',
    categoryColor: '#F59E0B',
    amountRange: [300, 3000],
    notes: ['Electricity bill', 'Water bill', 'Internet', 'Mobile recharge'],
  },
  {
    category: 'groceries',
    categoryIcon: 'cart',
    categoryColor: '#22C55E',
    amountRange: [200, 2000],
    notes: ['BigBasket', 'Zepto', 'Vegetable market', 'DMart'],
  },
];

const incomeEntries: Array<{
  category: string;
  categoryIcon: string;
  categoryColor: string;
  amountRange: [number, number];
  notes: string[];
}> = [
  {
    category: 'salary',
    categoryIcon: 'briefcase',
    categoryColor: '#10B981',
    amountRange: [45000, 55000],
    notes: ['Monthly salary', 'Salary credit'],
  },
  {
    category: 'freelance',
    categoryIcon: 'laptop',
    categoryColor: '#22D3EE',
    amountRange: [2000, 15000],
    notes: ['Freelance project', 'Client payment', 'Design work'],
  },
  {
    category: 'investment',
    categoryIcon: 'trending-up',
    categoryColor: '#A78BFA',
    amountRange: [500, 5000],
    notes: ['Dividend', 'Mutual fund return', 'SIP maturity'],
  },
];

let idCounter = 1;
const makeId = () => (idCounter++).toString();

export const generateMockTransactions = (): SerializedTransaction[] => {
  const transactions: SerializedTransaction[] = [];
  const now = new Date();

  for (let m = 0; m < 3; m++) {
    const salaryDate = new Date(now.getFullYear(), now.getMonth() - m, 1);
    transactions.push({
      id: makeId(),
      amount: randomBetween(48000, 55000),
      type: 'income',
      category: 'salary',
      categoryIcon: 'briefcase',
      categoryColor: '#10B981',
      date: salaryDate.toISOString(),
      notes: 'Monthly salary',
      goalId: '',
      createdAt: salaryDate.toISOString(),
    });
  }

  for (let d = 0; d < 60; d++) {
    const date = subDays(now, d);
    const numTransactions = randomBetween(0, 3);
    for (let i = 0; i < numTransactions; i++) {
      const entry = expenseEntries[randomBetween(0, expenseEntries.length - 1)];
      transactions.push({
        id: makeId(),
        amount: randomBetween(...entry.amountRange),
        type: 'expense',
        category: entry.category,
        categoryIcon: entry.categoryIcon,
        categoryColor: entry.categoryColor,
        date: date.toISOString(),
        notes: entry.notes[randomBetween(0, entry.notes.length - 1)],
        goalId: '',
        createdAt: date.toISOString(),
      });
    }
  }

  for (let i = 0; i < 4; i++) {
    const date = subDays(now, randomBetween(5, 50));
    const entry = incomeEntries[randomBetween(1, 2)];
    transactions.push({
      id: makeId(),
      amount: randomBetween(...entry.amountRange),
      type: 'income',
      category: entry.category,
      categoryIcon: entry.categoryIcon,
      categoryColor: entry.categoryColor,
      date: date.toISOString(),
      notes: entry.notes[randomBetween(0, entry.notes.length - 1)],
      goalId: '',
      createdAt: date.toISOString(),
    });
  }

  return transactions.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
};

export const generateMockGoals = (): SerializedGoal[] => {
  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  return [
    {
      id: 'goal-1',
      title: 'Emergency Fund',
      emoji: '🛡️',
      targetAmount: 20000,
      startDate: monthStart.toISOString(),
      endDate: monthEnd.toISOString(),
      currentStreak: 2,
      bestStreak: 3,
      isActive: true,
      createdAt: subMonths(now, 2).toISOString(),
    },
    {
      id: 'goal-2',
      title: 'Vacation Fund',
      emoji: '✈️',
      targetAmount: 50000,
      startDate: monthStart.toISOString(),
      endDate: new Date(now.getFullYear(), now.getMonth() + 3, 0).toISOString(),
      currentStreak: 1,
      bestStreak: 1,
      isActive: true,
      createdAt: subMonths(now, 1).toISOString(),
    },
  ];
};

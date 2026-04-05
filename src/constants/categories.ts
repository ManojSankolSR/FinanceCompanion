export type Category = {
  id: string;
  label: string;
  icon: string;
  color: string;
  type: 'expense' | 'income' | 'both';
};

export const EXPENSE_CATEGORIES: Category[] = [
  {
    id: 'food',
    label: 'Food & Dining',
    icon: 'food-fork-drink',
    color: '#F97316',
    type: 'expense',
  },
  {
    id: 'transport',
    label: 'Transport',
    icon: 'car',
    color: '#3B82F6',
    type: 'expense',
  },
  {
    id: 'shopping',
    label: 'Shopping',
    icon: 'shopping',
    color: '#EC4899',
    type: 'expense',
  },
  {
    id: 'health',
    label: 'Health',
    icon: 'heart-pulse',
    color: '#10B981',
    type: 'expense',
  },
  {
    id: 'entertainment',
    label: 'Entertainment',
    icon: 'movie-open',
    color: '#8B5CF6',
    type: 'expense',
  },
  {
    id: 'education',
    label: 'Education',
    icon: 'school',
    color: '#06B6D4',
    type: 'expense',
  },
  {
    id: 'bills',
    label: 'Bills & Utilities',
    icon: 'lightning-bolt',
    color: '#F59E0B',
    type: 'expense',
  },
  {
    id: 'housing',
    label: 'Housing',
    icon: 'home',
    color: '#64748B',
    type: 'expense',
  },
  {
    id: 'travel',
    label: 'Travel',
    icon: 'airplane',
    color: '#0EA5E9',
    type: 'expense',
  },
  {
    id: 'groceries',
    label: 'Groceries',
    icon: 'cart',
    color: '#22C55E',
    type: 'expense',
  },
  {
    id: 'fitness',
    label: 'Fitness',
    icon: 'dumbbell',
    color: '#EF4444',
    type: 'expense',
  },
  {
    id: 'other_expense',
    label: 'Other',
    icon: 'dots-horizontal-circle',
    color: '#6B7280',
    type: 'expense',
  },
];

export const INCOME_CATEGORIES: Category[] = [
  {
    id: 'salary',
    label: 'Salary',
    icon: 'briefcase',
    color: '#10B981',
    type: 'income',
  },
  {
    id: 'freelance',
    label: 'Freelance',
    icon: 'laptop',
    color: '#22D3EE',
    type: 'income',
  },
  {
    id: 'investment',
    label: 'Investment',
    icon: 'trending-up',
    color: '#A78BFA',
    type: 'income',
  },
  { id: 'gift', label: 'Gift', icon: 'gift', color: '#F472B6', type: 'income' },
  {
    id: 'refund',
    label: 'Refund',
    icon: 'cash-refund',
    color: '#34D399',
    type: 'income',
  },
  {
    id: 'other_income',
    label: 'Other',
    icon: 'dots-horizontal-circle',
    color: '#6B7280',
    type: 'income',
  },
];

export const ALL_CATEGORIES: Category[] = [
  ...EXPENSE_CATEGORIES,
  ...INCOME_CATEGORIES,
];

export const getCategoryById = (id: string): Category | undefined =>
  ALL_CATEGORIES.find(c => c.id === id);

export const getCategoriesByType = (type: 'expense' | 'income'): Category[] =>
  type === 'expense' ? EXPENSE_CATEGORIES : INCOME_CATEGORIES;

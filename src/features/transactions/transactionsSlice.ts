import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SerializedTransaction {
  id: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  categoryIcon: string;
  categoryColor: string;
  date: string;
  notes: string;
  goalId: string;
  createdAt: string;
}

export type FilterType = 'all' | 'income' | 'expense';
export type SortOrder = 'newest' | 'oldest' | 'highest' | 'lowest';

interface TransactionsState {
  items: SerializedTransaction[];
  filterType: FilterType;
  filterCategory: string;
  searchQuery: string;
  sortOrder: SortOrder;
  isLoading: boolean;
}

const initialState: TransactionsState = {
  items: [],
  filterType: 'all',
  filterCategory: '',
  searchQuery: '',
  sortOrder: 'newest',
  isLoading: false,
};

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    setTransactions(state, action: PayloadAction<SerializedTransaction[]>) {
      state.items = action.payload;
    },
    addTransaction(state, action: PayloadAction<SerializedTransaction>) {
      state.items.unshift(action.payload);
    },
    updateTransaction(state, action: PayloadAction<SerializedTransaction>) {
      const index = state.items.findIndex(t => t.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    deleteTransaction(state, action: PayloadAction<string>) {
      state.items = state.items.filter(t => t.id !== action.payload);
    },
    setFilterType(state, action: PayloadAction<FilterType>) {
      state.filterType = action.payload;
    },
    setFilterCategory(state, action: PayloadAction<string>) {
      state.filterCategory = action.payload;
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    setSortOrder(state, action: PayloadAction<SortOrder>) {
      state.sortOrder = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    resetFilters(state) {
      state.filterType = 'all';
      state.filterCategory = '';
      state.searchQuery = '';
      state.sortOrder = 'newest';
    },
  },
});

export const {
  setTransactions,
  addTransaction,
  updateTransaction,
  deleteTransaction,
  setFilterType,
  setFilterCategory,
  setSearchQuery,
  setSortOrder,
  setLoading,
  resetFilters,
} = transactionsSlice.actions;

export default transactionsSlice.reducer;

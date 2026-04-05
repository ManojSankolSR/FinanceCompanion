import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  currency: string;
  currencySymbol: string;
  userName: string;
  monthlyBudget: number;
  addTransactionModalVisible: boolean;
  editingTransactionId: string | null;
  addGoalModalVisible: boolean;
  editingGoalId: string | null;
  snackbarMessage: string;
  snackbarVisible: boolean;
  hasOnboarded: boolean;
  themeMode: 'light' | 'dark' | 'system';
  colorPalette: 'default' | 'ocean' | 'forest' | 'sunset';
}

const initialState: UIState = {
  currency: 'INR',
  currencySymbol: '₹',
  userName: 'Friend',
  monthlyBudget: 50000,
  addTransactionModalVisible: false,
  editingTransactionId: null,
  addGoalModalVisible: false,
  editingGoalId: null,
  snackbarMessage: '',
  snackbarVisible: false,
  hasOnboarded: true,
  themeMode: 'system',
  colorPalette: 'default',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setCurrency(
      state,
      action: PayloadAction<{ currency: string; symbol: string }>,
    ) {
      state.currency = action.payload.currency;
      state.currencySymbol = action.payload.symbol;
    },
    setUserName(state, action: PayloadAction<string>) {
      state.userName = action.payload;
    },
    setMonthlyBudget(state, action: PayloadAction<number>) {
      state.monthlyBudget = action.payload;
    },
    openAddTransaction(state) {
      state.addTransactionModalVisible = true;
      state.editingTransactionId = null;
    },
    openEditTransaction(state, action: PayloadAction<string>) {
      state.addTransactionModalVisible = true;
      state.editingTransactionId = action.payload;
    },
    closeAddTransaction(state) {
      state.addTransactionModalVisible = false;
      state.editingTransactionId = null;
    },
    openAddGoal(state) {
      state.addGoalModalVisible = true;
      state.editingGoalId = null;
    },
    openEditGoal(state, action: PayloadAction<string>) {
      state.addGoalModalVisible = true;
      state.editingGoalId = action.payload;
    },
    closeAddGoal(state) {
      state.addGoalModalVisible = false;
      state.editingGoalId = null;
    },
    showSnackbar(state, action: PayloadAction<string>) {
      state.snackbarMessage = action.payload;
      state.snackbarVisible = true;
    },
    hideSnackbar(state) {
      state.snackbarVisible = false;
    },
    setHasOnboarded(state, action: PayloadAction<boolean>) {
      state.hasOnboarded = action.payload;
    },
    setThemeMode(state, action: PayloadAction<'light' | 'dark' | 'system'>) {
      state.themeMode = action.payload;
    },
    setColorPalette(
      state,
      action: PayloadAction<'default' | 'ocean' | 'forest' | 'sunset'>,
    ) {
      state.colorPalette = action.payload;
    },
  },
});

export const {
  setCurrency,
  setUserName,
  setMonthlyBudget,
  openAddTransaction,
  openEditTransaction,
  closeAddTransaction,
  openAddGoal,
  openEditGoal,
  closeAddGoal,
  showSnackbar,
  hideSnackbar,
  setHasOnboarded,
  setThemeMode,
  setColorPalette,
} = uiSlice.actions;

export default uiSlice.reducer;

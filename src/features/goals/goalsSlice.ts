import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SerializedGoal {
  id: string;
  title: string;
  emoji: string;
  targetAmount: number;
  startDate: string;
  endDate: string;
  currentStreak: number;
  bestStreak: number;
  isActive: boolean;
  createdAt: string;
}

interface GoalsState {
  items: SerializedGoal[];
  isLoading: boolean;
}

const initialState: GoalsState = {
  items: [],
  isLoading: false,
};

const goalsSlice = createSlice({
  name: 'goals',
  initialState,
  reducers: {
    setGoals(state, action: PayloadAction<SerializedGoal[]>) {
      state.items = action.payload;
    },
    addGoal(state, action: PayloadAction<SerializedGoal>) {
      state.items.unshift(action.payload);
    },
    updateGoal(state, action: PayloadAction<SerializedGoal>) {
      const index = state.items.findIndex(g => g.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    deleteGoal(state, action: PayloadAction<string>) {
      state.items = state.items.filter(g => g.id !== action.payload);
    },
    setGoalLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
  },
});

export const { setGoals, addGoal, updateGoal, deleteGoal, setGoalLoading } =
  goalsSlice.actions;

export default goalsSlice.reducer;

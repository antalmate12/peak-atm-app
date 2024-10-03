import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Transaction {
  amount: number;
  time: string;
  success: boolean;
  dispensed: { [key: number]: number };
}

interface HistoryState {
  history: Transaction[];
}

const initialState: HistoryState = {
  history: [],
};

export const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    addHistory: (state, action: PayloadAction<Transaction>) => {
      state.history.push(action.payload);
    },  
  },
});

export const { addHistory } = historySlice.actions;
export default historySlice.reducer;
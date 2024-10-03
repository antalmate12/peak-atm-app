import { createSlice } from '@reduxjs/toolkit';

type AllowedBills = '20000' | '10000' | '5000' | '2000';

interface AtmState {
  bills: Record<AllowedBills, number>;
  error: string | null;
}

const initialState: AtmState = {
  bills: {
    20000: 10,
    10000: 20,
    5000: 50,
    2000: 100,
  },
  error: null,
};

export const atmSlice = createSlice({
  name: 'atm',
  initialState,
  reducers: {}
});

export default atmSlice.reducer;
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
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
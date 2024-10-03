import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  history: [],
};

export const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {},
});

export default historySlice.reducer;
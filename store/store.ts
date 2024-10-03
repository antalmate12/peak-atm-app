import { configureStore } from '@reduxjs/toolkit';
import atmReducer from './atmSlice';
import historyReducer from './historySlice';

export const store = configureStore({
  reducer: {
    atm: atmReducer,
    history: historyReducer,
  },
});

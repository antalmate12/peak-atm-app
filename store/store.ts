import { configureStore } from '@reduxjs/toolkit';
import atmReducer from './slices/atmSlice';
import historyReducer from './slices/historySlice';

export const store = configureStore({
  reducer: {
    atm: atmReducer,
    history: historyReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
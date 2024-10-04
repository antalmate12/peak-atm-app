import { configureStore } from '@reduxjs/toolkit';
import rootReducer from "./configure-store";
import { persistStore } from 'redux-persist';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
// export type RootState = ReturnType<typeof store.getState>;
export { store, persistor };

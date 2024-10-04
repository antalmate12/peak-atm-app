import { combineReducers, Reducer } from "@reduxjs/toolkit";
import { documentDirectory, EncodingType } from "expo-file-system";
import { createExpoFileSystemStorage } from "redux-persist-expo-file-system-storage";
import atmReducer, { AtmState } from "./slices/atmSlice";
import historyReducer, { HistoryState } from "./slices/historySlice";
import { persistReducer } from "redux-persist";

export interface RootState {
  atm: AtmState;
  history: HistoryState;
}

console.log("Document Directory:", documentDirectory);

export const expoFileSystemStorage = createExpoFileSystemStorage({
  storagePath: `${documentDirectory}peakAtmStorage/`,
  encoding: EncodingType.UTF8,
  debug: true,
});

const persist = <S>(key: keyof RootState, reducer: Reducer<S>) =>
  persistReducer(
    {
      key: key as string,
      storage: expoFileSystemStorage,
    },
    reducer
  );

const combinePersistReducers = (keys: Record<keyof RootState, Reducer>) =>
  Object.keys(keys).reduce(
    (obj, key) => ({
      ...obj,
      [key]: persist(key as keyof RootState, keys[key as keyof RootState]),
    }),
    {} as Record<keyof RootState, Reducer>
  );

const reducers = combineReducers({
  ...combinePersistReducers({
    atm: atmReducer,
    history: historyReducer,
  }),
});

export default reducers;

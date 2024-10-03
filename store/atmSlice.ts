import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Toast from "react-native-root-toast";

export type AllowedBills = "20000" | "10000" | "5000" | "2000";
export type AtmBills = Record<AllowedBills, number>;

const BILL_VALUES: AllowedBills[] = ["20000", "10000", "5000", "2000"];

interface AtmState {
  bills: AtmBills;
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
  name: "atm",
  initialState,
  reducers: {
    withdraw: (state, action: PayloadAction<number>) => {
      const amount = action.payload;
      let remainingAmount = amount;
      const availableBills = { ...state.bills };
      const dispensedBills: AtmBills = {
        20000: 0,
        10000: 0,
        5000: 0,
        2000: 0,
      };

      for (const bill of BILL_VALUES) {
        const billValue = parseInt(bill);
        const numBills = Math.floor(remainingAmount / billValue);
        const billsToDispense = Math.min(numBills, availableBills[bill]);

        if (billsToDispense > 0) {
          dispensedBills[bill] = billsToDispense;
          availableBills[bill] -= billsToDispense;
          remainingAmount -= billsToDispense * billValue;
        }
      }

      // Check if the exact amount was dispensed
      if (remainingAmount > 0) {
        state.error =
          "Unable to dispense the exact amount with available bills";

          Toast.show('Unable to dispense the exact amount with available bills', {
            duration: Toast.durations.LONG,
          })
      } else {
        state.bills = availableBills;
        state.error = null;

        Toast.show('Dispense successful', {
          duration: Toast.durations.SHORT,
        })
      }
    },
    updateBills: (state, action: PayloadAction<AtmBills>) => {
      state.bills = action.payload;
    },
  },
});

export const { withdraw, updateBills } = atmSlice.actions;
export default atmSlice.reducer;

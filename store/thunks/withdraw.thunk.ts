import {
  AtmBills,
  AtmState,
  BILL_VALUES,
  setError,
  updateBills,
} from "../slices/atmSlice";
import { addHistory, Transaction } from "../slices/historySlice";
import { AppDispatch } from "../store";

export const withdrawThunk = (amount: number) => {
  return (dispatch: AppDispatch, getState: () => { atm: AtmState }) => {
    const state = getState();
    let remainingAmount = amount;
    const availableBills = { ...state.atm.bills };
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

    let transaction: Transaction = {
      amount,
      time: new Date().toISOString(),
      success: true,
      dispensed: dispensedBills,
    };
    let message = "Dispatched successfully";

    if (remainingAmount > 0) {
      transaction = {
        ...transaction,
        success: false,
      };
      message = "Unable to dispense the exact amount with available bills";
      dispatch(setError(message));
    } else {
      dispatch(updateBills(availableBills));
      dispatch(setError(null));
    }

    dispatch(addHistory(transaction));

    return transaction;
  };
};

import Toast from "react-native-root-toast";
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
    let dispensedBills: AtmBills = {
      20000: 0,
      10000: 0,
      5000: 0,
      2000: 0,
    };
    let remainingAmount = amount;
    const availableBills = { ...state.atm.bills };

    /**
     * Check if the exact amount can be dispensed
     */
    const possibleCheckRes = checkIfPossibleToDispense(remainingAmount);
    if (possibleCheckRes !== true) {
      return possibleCheckRes;
    }

    // Nagytól kicsiig haladunk a címleteken
    for (const bill of BILL_VALUES) {
      const billValue = parseInt(bill);
      while (
        remainingAmount >= billValue &&
        availableBills[bill as keyof AtmBills] > 0
      ) {
        // Ellenőrizzük, hogy ha ebből a címletből adunk, a maradék osztható lesz-e a kisebb címletekkel
        const potentialRemaining = remainingAmount - billValue;
        if (potentialRemaining % 2000 === 0) {
          dispensedBills[bill as keyof AtmBills] += 1;
          availableBills[bill as keyof AtmBills] -= 1;
          remainingAmount = potentialRemaining;
        } else {
          break; // Ha nem osztható a maradék, kilépünk a loopból, hogy más címleteket próbáljunk
        }
      }
    }

    function checkIfPossibleToDispense(remainingAmount: number) {
      if (remainingAmount % 2000 === 0) {
        // We can continue
        return true;
      } else {
        // Can't dispense
        const transaction: Transaction = {
          amount,
          time: new Date().toISOString(),
          success: false,
          dispensed: dispensedBills,
        };
        dispatch(addHistory(transaction));
        showError("Can't dispense the exact amount with available bills");
        return transaction;
      }
    }

    function showError(message: string) {
      Toast.show(message, {
        duration: Toast.durations.SHORT,
      });
      dispatch(setError(message));
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
      showError(message);
    } else {
      dispatch(updateBills(availableBills));
      dispatch(setError(null));

      Toast.show(message, {
        duration: Toast.durations.SHORT,
      });
    }

    dispatch(addHistory(transaction));
    return transaction;
  };
};

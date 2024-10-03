import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { RootState } from "@/store/store";
import { withdrawThunk } from "@/store/thunks/withdraw.thunk";
import { Transaction } from "@/store/slices/historySlice";

const UserWithdrawal = () => {
  const dispatch = useDispatch();
  const { error, bills } = useSelector((state: RootState) => state.atm);
  const  { history } = useSelector((state: RootState) => state.history);

  const [amount, setAmount] = useState("");
  const [transactionDetails, setTransactionDetails] = useState<Transaction | null>(null);
  

  const handleWithdraw = () => {
    const res: Transaction = dispatch(withdrawThunk(parseInt(amount)) as unknown as any);
    setTransactionDetails(res);
  };

  return (
    <ThemedView style={styles.container}>
      <TextInput
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
        placeholder="Enter amount"
      />
      <Button
      title="Withdraw" onPress={handleWithdraw} disabled={!amount} />
      {error ? (
        <ThemedText>{error}</ThemedText>
      ) : (
        <ThemedText>Bills dispensed: {JSON.stringify(bills)}</ThemedText>
      )}


        {
          transactionDetails &&
          <ThemedText>
            {JSON.stringify(transactionDetails)}
          </ThemedText>
        }


    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    gap: 16,
  },
});

export default UserWithdrawal;

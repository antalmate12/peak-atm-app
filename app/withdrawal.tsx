import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { RootState } from "@/store/store";
import { withdrawThunk } from "@/store/thunks/withdraw.thunk";

const UserWithdrawal = () => {
  const [amount, setAmount] = useState("");
  const dispatch = useDispatch();
  const { error, bills } = useSelector((state: RootState) => state.atm);
  const  { history } = useSelector((state: RootState) => state.history);

  const handleWithdraw = () => {
    dispatch(withdrawThunk(parseInt(amount)) as unknown as any);
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

      <ThemedText>History:</ThemedText>
      <ThemedText>{JSON.stringify(history)}</ThemedText>
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

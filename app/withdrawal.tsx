import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import { withdraw } from "@/store/atmSlice";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { RootState } from "@/store/store";

const UserWithdrawal = () => {
  const [amount, setAmount] = useState("");
  const dispatch = useDispatch();
  const { error, bills } = useSelector((state: RootState) => state.atm);

  const handleWithdraw = () => {
    const dispensed = dispatch(withdraw(parseInt(amount)));
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

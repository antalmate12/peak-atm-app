import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import { ThemedView } from "@/components/themed/ThemedView";
import { ThemedText } from "@/components/themed/ThemedText";
import { withdrawThunk } from "@/store/thunks/withdraw.thunk";
import { Transaction } from "@/store/slices/historySlice";
import { useThemeColor } from "@/hooks/useThemeColor";
import WithdrawErrorMessage from "@/components/WithdrawErrorMessage";
import WithdrawDispensedBills from "@/components/WithdrawDispensedBills";
import BillsCountDisplay from "@/components/BillsCountDisplay";
import FilledButton from "@/components/FilledButton";
import { RootState } from "@/store/configure-store";

const UserWithdrawal = () => {
  const dispatch = useDispatch();
  const { error, bills } = useSelector((state: RootState) => state.atm);
  const color = useThemeColor({}, "text");

  const [amount, setAmount] = useState("");
  const [lastSuccessfullTransaction, setLastSuccessfullTransaction] =
    useState<Transaction | null>(null);

  const handleWithdraw = () => {
    const res: Transaction = dispatch(
      withdrawThunk(parseInt(amount)) as unknown as any
    );
    setLastSuccessfullTransaction(res.success ? res : null);
    setAmount("");
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.inputContainer}>
        <TextInput
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
          placeholder="0"
          placeholderTextColor={color}
          style={[styles.input, { color }]}
        />
        <ThemedText style={styles.inputCurrency}>HUF</ThemedText>
      </ThemedView>
      {/* <Button
        title="Withdraw"
        onPress={handleWithdraw}
        disabled={!amount || amount === "0"}
      /> */}
      <FilledButton  onPress={handleWithdraw} title="Withdraw" disabled={!amount || amount === "0"} />

      {error && <WithdrawErrorMessage error={error} />}

      {lastSuccessfullTransaction && (
        <>
          <ThemedText style={styles.dispensedTitle}>Dispensed Bills</ThemedText>
          <BillsCountDisplay bills={lastSuccessfullTransaction.dispensed} />
        </>
      )}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    gap: 16,
  },
  inputContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 0,
  },
  input: {
    fontSize: 56,
    textAlign: "center",
    lineHeight: 50,
    fontWeight: "300",
  },
  inputCurrency: {
    fontSize: 36,
    textAlign: "center",
    lineHeight: 36,
    fontWeight: "600",
    opacity: 0.7,
  },
  dispensedTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 24,
  }
});

export default UserWithdrawal;

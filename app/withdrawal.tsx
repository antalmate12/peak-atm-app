import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";

const UserWithdrawal = () => {
  const [amount, setAmount] = useState("");
  const dispatch = useDispatch();

  return (
    <View>
      <TextInput
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
        placeholder="Enter amount"
      />
      <Button
        title="Withdraw"
        onPress={() => {
          console.log(amount);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
});

export default UserWithdrawal;

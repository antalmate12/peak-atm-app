import { RootState } from "@/store/store";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { ThemedView } from "./themed/ThemedView";
import { ThemedText } from "./themed/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { updateBills } from "@/store/slices/atmSlice";
import FilledButton from "./FilledButton";

const AdminChangeBillsCount = () => {
  const dispatch = useDispatch();
  const { bills } = useSelector((state: RootState) => state.atm);
  const [billsCount, setBillsCount] = useState(bills);
  const color = useThemeColor({}, "text");

  useEffect(() => {
    setBillsCount(bills);
  }, [bills]);

  const handleIncrement = (bill: keyof typeof bills) => {
    setBillsCount((prevBills) => ({
      ...prevBills,
      [bill]: prevBills[bill] + 1,
    }));
  };

  const handleDecrement = (bill: keyof typeof bills) => {
    setBillsCount((prevBills) => ({
      ...prevBills,
      [bill]: prevBills[bill] > 0 ? prevBills[bill] - 1 : 0,
    }));
  };

  const handleInputChange = (bill: keyof typeof bills, value: string) => {
    const numberValue = parseInt(value, 10);
      setBillsCount((prevBills) => ({
        ...prevBills,
        [bill]: !isNaN(numberValue) ? numberValue : 0,
      }));
    
  };

  const handleSave = () => {
    console.log("Saved bills:", bills);
    dispatch(updateBills(billsCount));
  };

  return (
    <ThemedView style={{padding:16}}>
      <ThemedText style={styles.title}>Change Bills Count</ThemedText>
      {/* <ThemedText>{JSON.stringify(billsCount)}</ThemedText> */}

      <ThemedView style={styles.container}>
        {Object.keys(bills).map((bill) => (
          <ThemedView key={bill} style={styles.billRow}>
            <ThemedText style={styles.billLabel}>{bill} HUF</ThemedText>
            <TouchableOpacity
              onPress={() => handleDecrement(bill as keyof typeof bills)}
            >
              <ThemedText style={styles.button}>-</ThemedText>
            </TouchableOpacity>
            <TextInput
              style={[styles.input, { color }]}
              keyboardType="numeric"
              value={billsCount[bill as keyof typeof bills].toString()}
              onChangeText={(value) =>
                handleInputChange(bill as keyof typeof bills, value)
              }
            />
            <TouchableOpacity
              onPress={() => handleIncrement(bill as keyof typeof bills)}
            >
              <ThemedText style={styles.button}>+</ThemedText>
            </TouchableOpacity>
          </ThemedView>
        ))}
        <FilledButton title="Save Changes" onPress={handleSave} />
      </ThemedView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  billsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
  container: {
    padding: 20,
  },
  billRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  billLabel: {
    fontSize: 18,
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 5,
    width: 60,
    textAlign: "center",
    marginHorizontal: 10,
  },
  button: {
    fontSize: 24,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  }
});

export default AdminChangeBillsCount;

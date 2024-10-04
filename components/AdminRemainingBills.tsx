import { StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { ThemedText } from "./themed/ThemedText";
import { ThemedView } from "./themed/ThemedView";
import BillsCountDisplay from "./BillsCountDisplay";
import { RootState } from "@/store/configure-store";

const AdminRemainingBills = () => {
  const { bills } = useSelector((state: RootState) => state.atm);

  return (
    <ThemedView style={{ padding: 16 }}>
      <ThemedText style={styles.title}>Remaining Bills</ThemedText>
      <BillsCountDisplay bills={bills} />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  }
});

export default AdminRemainingBills;

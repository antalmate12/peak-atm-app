import { Transaction } from "@/store/slices/historySlice";
import { ThemedText } from "./themed/ThemedText";
import { ThemedView } from "./themed/ThemedView";
import { StyleSheet } from "react-native";
import { formatPrice } from "@/utils/format-price";
import Ionicons from "@expo/vector-icons/Ionicons";
import TransactionItemStatusBadge from "./TransactionItemStatusBadge";
import BillsCountDisplay from "./BillsCountDisplay";

const TransactionItem = ({ transaction }: { transaction: Transaction }) => {
  return (
    <ThemedView style={styles.itemContainer}>
      <TransactionItemStatusBadge success={transaction.success} />

      <ThemedText style={styles.amountText}>
        Amount: {formatPrice(transaction.amount)}
      </ThemedText>
      <ThemedText
        style={transaction.success ? styles.successText : styles.errorText}
      >
        Status: {transaction.success ? "Success" : "Failed"}
      </ThemedText>
      <ThemedText style={styles.timeText}>
        Time: {new Date(transaction.time).toLocaleString()}
      </ThemedText>
      
      <ThemedText style={styles.dispensedText}>Dispensed Bills:</ThemedText>
      <BillsCountDisplay bills={transaction.dispensed} />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  amountText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  successText: {
    fontSize: 14,
    color: "green",
  },
  errorText: {
    fontSize: 14,
    color: "red",
  },
  timeText: {
    fontSize: 12,
    color: "gray",
  },
  dispensedText: {
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default TransactionItem;


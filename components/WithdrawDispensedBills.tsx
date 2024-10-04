import { Transaction } from "@/store/slices/historySlice";
import { ThemedView } from "./themed/ThemedView";
import { ThemedText } from "./themed/ThemedText";
import { StyleSheet, FlatList } from "react-native";
import { formatPrice } from "@/utils/format-price";

const WithdrawDispensedBills = ({
  transaction,
}: {
  transaction: Transaction;
}) => {
  return (
    <>
      <ThemedText style={styles.title}>Dispensed Bills</ThemedText>
      <ThemedView style={styles.billsContainer}>
        <FlatList
          data={Object.entries(transaction.dispensed)}
          numColumns={2}
          renderItem={({ item }) => (
            <ThemedView style={styles.billParent}>
              <ThemedText>
                {formatPrice(parseInt(item[0]))}: {item[1]}
              </ThemedText>
            </ThemedView>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </ThemedView>
    </>
  );
};

const styles = StyleSheet.create({
  billsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  billParent: {
    flex: 1,
    width: 100,
    backgroundColor: "#0e0e0e",
    margin: 4,
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
  }
});

export default WithdrawDispensedBills;

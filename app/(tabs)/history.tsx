import { ThemedText } from "@/components/themed/ThemedText";
import { ThemedView } from "@/components/themed/ThemedView";
import { Transaction } from "@/store/slices/historySlice";
import { RootState } from "@/store/store";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useSelector } from "react-redux";

const HistoryScreen = () => {
  const { history } = useSelector((state: RootState) => state.history);

  console.log(history[0])
  
  return (
    <ThemedView>
      <ThemedText>History</ThemedText>
      
     
      <FlatList
        data={history}
        renderItem={({ item }) => <TransactionItem transaction={item} />}
      keyExtractor={(item, index) => index.toString()} // használhatsz egyedi azonosítót is, ha van
      />
    </ThemedView>
  );
};

interface TransactionItemProps {
  transaction: Transaction;
}

const TransactionItem: React.FC<TransactionItemProps> = ({ transaction }) => {
  return (
    <View style={styles.itemContainer}>
      <Text style={styles.amountText}>Amount: {transaction.amount}</Text>
      <Text style={styles.successText}>
        Status: {transaction.success ? 'Success' : 'Failed'}
      </Text>
      <Text style={styles.timeText}>Time: {new Date(transaction.time).toLocaleString()}</Text>
      <Text style={styles.dispensedText}>Dispensed Bills:</Text>
      {Object.entries(transaction.dispensed).map(([bill, count]) => (
        <Text key={bill}>
          {bill}: {count}
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  amountText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  successText: {
    fontSize: 14,
    color: 'green',
  },
  timeText: {
    fontSize: 12,
    color: 'gray',
  },
  dispensedText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});


export default HistoryScreen;

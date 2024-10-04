import { ThemedView } from "@/components/themed/ThemedView";
import TransactionItem from "@/components/TransactionItem";
import { RootState } from "@/store/store";
import { StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useSelector } from "react-redux";

const HistoryScreen = () => {
  const { history } = useSelector((state: RootState) => state.history);
  console.log(history[0]);

  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={history}
        inverted={true}
        renderItem={({ item }) => <TransactionItem transaction={item} />}
        keyExtractor={(item, index) => index.toString()}
      />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HistoryScreen;

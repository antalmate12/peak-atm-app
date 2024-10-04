import { ThemedView } from "@/components/themed/ThemedView";
import TransactionItem from "@/components/TransactionItem";
import { Transaction } from "@/store/slices/historySlice";
import { RootState } from "@/store/store";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useSelector } from "react-redux";

const HistoryScreen = () => {
  const { history } = useSelector((state: RootState) => state.history);
  const [historyData, setHistoryData] = useState<Transaction[]>([]);

  useEffect(() => {
    setHistoryData([...history].reverse());
  }, [history]);

  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={historyData}
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

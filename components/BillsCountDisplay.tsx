import { AtmBills } from "@/store/slices/atmSlice";
import { ThemedText } from "./themed/ThemedText";
import { formatPrice } from "@/utils/format-price";
import { FlatList, useColorScheme, StyleSheet } from "react-native";
import { ThemedView } from "./themed/ThemedView";

const BillsCountDisplay = ({ bills }: { bills: AtmBills }) => {
  const colorScheme = useColorScheme();

  return (
    <ThemedView style={{width: '100%'}}>
      <FlatList
        data={Object.entries(bills)}
        numColumns={2}
        renderItem={({ item }) => (
          <ThemedView
            style={
              colorScheme === "dark"
                ? [styles.billParentDark, styles.billParent]
                : [styles.billParentLight, styles.billParent]
            }
          >
            <ThemedText>
              {formatPrice(parseInt(item[0]))}: {item[1]} db
            </ThemedText>
          </ThemedView>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  billParent: {
    flex: 1,
    width: 100,
    margin: 4,
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  billParentLight: {
    backgroundColor: "#efefef",
  },
  billParentDark: {
    backgroundColor: "#0e0e0e",
  },
});

export default BillsCountDisplay;

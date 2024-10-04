import { Ionicons } from "@expo/vector-icons";
import { ThemedView } from "./themed/ThemedView";

const TransactionItemStatusBadge = ({ success }: { success: boolean }) => {
  return (
    <ThemedView
      style={{
        position: "absolute",
        top: 16,
        right: 16,
        backgroundColor: success ? "green" : "red",
        padding: 8,
        borderRadius: 32,
      }}
    >
      <Ionicons
        name={success ? "checkmark-done" : "close-outline"}
        size={24}
        color="white"
      />
    </ThemedView>
  );
};

export default TransactionItemStatusBadge;

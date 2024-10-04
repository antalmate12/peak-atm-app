import AdminChangeBillsCount from "@/components/AdminChangeBillsCount";
import AdminRemainingBills from "@/components/AdminRemainingBills";
import { ThemedView } from "@/components/themed/ThemedView";
import { StyleSheet } from "react-native";

const AdminScreen = () => {
  return (
    <ThemedView style={styles.container}>
      <AdminRemainingBills />
      <AdminChangeBillsCount />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AdminScreen;

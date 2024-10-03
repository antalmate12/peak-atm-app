import { ThemedText } from "./themed/ThemedText";
import { StyleSheet, useColorScheme } from "react-native";
import { ThemedView } from "./themed/ThemedView";

export const WithdrawErrorMessage = ({ error }: { error: string }) => {
  const scheme = useColorScheme();
  const schemeViewStyles = scheme === "dark" ? [styles.errorViewDark, styles.errorView] : [styles.errorViewLight, styles.errorView];
  const schemeTextStyles = scheme === "dark" ? [styles.errorTextDark, styles.errorText] : [styles.errorTextLight, styles.errorText];

  return (
    <ThemedView style={schemeViewStyles}>
      <ThemedText style={schemeTextStyles}>
        {error}
      </ThemedText>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  errorView: {
    padding: 16,
    borderRadius: 4,
    marginVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    maxWidth: '80%',
  },
  errorViewLight: {
    backgroundColor: "#FF0000",
  },
  errorViewDark: {
    backgroundColor: "#FF0000",
  },

  errorText: {
    textAlign: "center",
  },
  errorTextLight: {},
  errorTextDark: {},
});

export default WithdrawErrorMessage;

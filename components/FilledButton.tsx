import { PRIMARY_INDIGO } from "@/constants/Colors";
import {
  Pressable,
  StyleSheet,
  View,
  Text,
  Platform,
  Button,
} from "react-native";

const FilledButton = (props: React.ComponentProps<typeof Button>) => {
  return (
    <View style={[props.disabled ? { opacity: 0.5 } : {}, styles.button]}>
      <Pressable
        disabled={props.disabled}
        android_ripple={{ color: "#ccc" }}
        onPress={props.onPress}
        style={({ pressed }) => [pressed && styles.pressed]}
      >
        <View style={styles.innerContainer}>
          <Text style={styles.text}>{props.title}</Text>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 40,
    borderRadius: 32,
    backgroundColor: PRIMARY_INDIGO,
    overflow: "hidden",
  },
  innerContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    paddingHorizontal: 32,
  },
  pressed:
    Platform.OS === "ios"
      ? {
          opacity: 0.5,
        }
      : {},
  text: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 40,
  },
});

export default FilledButton;

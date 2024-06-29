import { Text } from "@ui-kitten/components";
import { FunctionComponent } from "react";
import { StyleSheet, View } from "react-native";

export const Friends: FunctionComponent = () => {
  return (
    <View style={styles.container}>
      <Text>Friends</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});

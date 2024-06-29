import { Text } from "@ui-kitten/components";
import { FunctionComponent } from "react";
import { StyleSheet, View } from "react-native";

export const Feed: FunctionComponent = () => {
  return (
    <View style={styles.container}>
      <Text>Feed</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});

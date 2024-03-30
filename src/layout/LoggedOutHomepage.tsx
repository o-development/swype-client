import { Text } from "@ui-kitten/components";
import { FunctionComponent } from "react";
import { StyleSheet, View } from "react-native";

import { LoginButton } from "./LoginButton";

export const LoggedOutHomepage: FunctionComponent = () => {
  return (
    <View style={styles.contanier}>
      <Text category="h1" style={styles.textTitle}>
        swype.io
      </Text>
      <LoginButton size="large" />
    </View>
  );
};

const styles = StyleSheet.create({
  contanier: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textTitle: {
    fontSize: 48,
    marginBottom: 16,
  },
});

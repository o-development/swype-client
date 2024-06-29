import { Layout, Text } from "@ui-kitten/components";
import { FunctionComponent } from "react";
import { StyleSheet } from "react-native";

import { LoginButton } from "./LoginButton";

export const Header: FunctionComponent = () => {
  return (
    <Layout level="4" style={styles.headerContainer}>
      <Text category="h2">swype.io</Text>
      <LoginButton size="small" />
    </Layout>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 50,
    paddingHorizontal: 16,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  tabBarContainer: {
    width: 200,
    height: 46,
  },
});

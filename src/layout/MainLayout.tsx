import { useSolidAuth } from "@ldo/solid-react";
import { Layout } from "@ui-kitten/components";
import { FunctionComponent } from "react";
import { StyleSheet } from "react-native";

import { Header } from "./Header";
import { LoggedOutHomepage } from "./LoggedOutHomepage";
import { Feed } from "../feed/Feed";

export const MainLayout: FunctionComponent = () => {
  const { session, ranInitialAuthCheck } = useSolidAuth();

  return (
    <Layout style={styles.container}>
      <Header />
      {ranInitialAuthCheck &&
        (session.isLoggedIn ? <Feed /> : <LoggedOutHomepage />)}
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

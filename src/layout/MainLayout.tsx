import { useSolidAuth } from "@ldo/solid-react";
import { Layout } from "@ui-kitten/components";
import { FunctionComponent, useState } from "react";
import { StyleSheet } from "react-native";

import { Footer } from "./Footer";
import { Header } from "./Header";
import { LoggedOutHomepage } from "./LoggedOutHomepage";
import { usePrepareProfileOnInitialLoad } from "../actions/usePrepareProfileOnIntialLoad";
import { Feed } from "../feed/Feed";
import { Friends } from "../friends/Friends";
import { MyPosts } from "../myPosts/MyPosts";

export type PageName = "feed" | "friends" | "myPosts";

const pageMap: Record<PageName, FunctionComponent> = {
  feed: Feed,
  friends: Friends,
  myPosts: MyPosts,
};

export const MainLayout: FunctionComponent = () => {
  const { session, ranInitialAuthCheck } = useSolidAuth();
  const completedProfileSetup = usePrepareProfileOnInitialLoad();
  const [curPage, setCurPage] = useState<PageName>("myPosts");

  const CurComponent = pageMap[curPage];

  return (
    <Layout style={styles.container}>
      <Header />

      {ranInitialAuthCheck && completedProfileSetup && (
        <>
          {session.isLoggedIn ? <CurComponent /> : <LoggedOutHomepage />}
          {session.isLoggedIn && (
            <Footer curPage={curPage} setCurPage={setCurPage} />
          )}
        </>
      )}
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

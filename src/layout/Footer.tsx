import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
} from "@ui-kitten/components";
import {
  Dispatch,
  FunctionComponent,
  SetStateAction,
  useCallback,
  useMemo,
} from "react";

import { PageName } from "./MainLayout";

interface FooterProps {
  curPage: PageName;
  setCurPage: Dispatch<SetStateAction<PageName>>;
}

const tabData: { pageName: PageName; iconName: string }[] = [
  { pageName: "feed", iconName: "film-outline" },
  { pageName: "friends", iconName: "people-outline" },
  { pageName: "myPosts", iconName: "list-outline" },
];

export const Footer: FunctionComponent<FooterProps> = ({
  curPage,
  setCurPage,
}) => {
  const selectedIndex = useMemo(
    () => tabData.findIndex(({ pageName }) => pageName === curPage),
    [curPage]
  );
  const onSelect = useCallback((index: number) => {
    setCurPage(tabData[index].pageName);
  }, []);

  return (
    <BottomNavigation selectedIndex={selectedIndex} onSelect={onSelect}>
      {tabData.map(({ pageName, iconName }) => {
        return (
          <BottomNavigationTab
            icon={(props) => <Icon {...props} name={iconName} />}
            key={pageName}
          />
        );
      })}
    </BottomNavigation>
  );
};

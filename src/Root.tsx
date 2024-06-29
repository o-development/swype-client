import * as eva from "@eva-design/eva";
import { BrowserSolidLdoProvider } from "@ldo/solid-react";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { FunctionComponent } from "react";

import { usePrepareProfileOnInitialLoad } from "./actions/usePrepareProfileOnIntialLoad";
import { MainLayout } from "./layout/MainLayout";

export const Root: FunctionComponent = () => {
  return (
    <BrowserSolidLdoProvider>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.dark}>
        <MainLayout />
      </ApplicationProvider>
    </BrowserSolidLdoProvider>
  );
};

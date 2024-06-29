import { Container } from "@ldo/solid";
import { useLdo, useSolidAuth } from "@ldo/solid-react";
import { useState } from "react";
import useAsyncEffect from "use-async-effect";

import { displayError } from "./displayError";

export function useAppContainer(): Container | undefined {
  const { session } = useSolidAuth();
  const { getResource } = useLdo();
  const [container, setContainer] = useState<Container | undefined>();
  useAsyncEffect(async () => {
    if (!session.webId) return undefined;
    const profileResource = getResource(session.webId);
    const rootContianer = await profileResource.getRootContainer();
    if (rootContianer.isError) {
      displayError(rootContianer);
      return;
    }
    const appContainer = rootContianer.child("swype/");
    if (!appContainer.isPresent()) {
      const result = await appContainer.createIfAbsent();
      if (result.isError) {
        displayError(result);
        return;
      }
      appContainer.setWac({
        public: {
          read: true,
          write: false,
          append: false,
          control: false,
        },
        authenticated: {
          read: true,
          write: false,
          append: false,
          control: false,
        },
        agent: {
          [session.webId]: {
            read: true,
            write: true,
            append: true,
            control: true,
          },
        },
      });
    }
    setContainer(appContainer);
  }, [session.webId]);
  return container;
}

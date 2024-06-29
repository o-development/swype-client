import { LeafUri } from "@ldo/solid";
import { useLdo, useSolidAuth } from "@ldo/solid-react";
import { DocumentPickerAsset } from "expo-document-picker";
import { useCallback } from "react";
import { extension } from "react-native-mime-types";
import { v4 } from "uuid";

import { useOutbox } from "./useOutbox";
import {
  OrderedCollectionPageShapeType,
  VideoShapeType,
} from "../../.ldo/activityPub.shapeTypes";
import { displayError } from "../displayError";
import { useAppContainer } from "../useAppContainer";

export function useCreatePost() {
  const { session } = useSolidAuth();
  const { dataset } = useLdo();
  const appContainer = useAppContainer();
  const [outbox, outboxResource] = useOutbox(session.webId);

  return useCallback(
    async (asset: DocumentPickerAsset) => {
      if (!outboxResource || !appContainer || !outbox) {
        displayError(
          new Error("Cannot upload without an outbox or App Container.")
        );
        return;
      }

      const videoSlug = `${v4()}.${extension(asset.mimeType!)}` as LeafUri;
      const uploadResult = await appContainer.uploadChildAndOverwrite(
        videoSlug,
        asset.file!,
        asset.mimeType!
      );
      if (uploadResult.isError) {
        displayError(uploadResult);
        return;
      }
      const videoResource = uploadResult.resource;

      const transaction = dataset.startTransaction();
      // Create Metadata Object
      const metadataResource = appContainer.child(`${v4()}.ttl`);
      const cMetadata = transaction
        .usingType(VideoShapeType)
        .write(metadataResource.uri)
        .fromSubject(`${metadataResource.uri}#${v4()}`);
      cMetadata.url = [videoResource.uri];
      cMetadata.type = [{ "@id": "Video" }];

      // Add to Outbox
      const cOutbox = transaction
        .usingType(OrderedCollectionPageShapeType)
        .write(outboxResource.uri)
        .fromSubject(outbox["@id"]!);
      cOutbox.items?.push({
        "@id": cMetadata["@id"]!,
        type: [{ "@id": "Object" }],
      });

      const commitResult = await transaction.commitToPod();
      if (commitResult.isError) {
        displayError(commitResult);
      }
    },
    [appContainer, outbox, outboxResource]
  );
}

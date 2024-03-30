import { useLdo, useSolidAuth } from "@ldo/solid-react";
import { useAsyncEffect } from "use-async-effect";
import { v4 } from "uuid";

import { displayError } from "./displayError";
import {
  CollectionShapeType,
  OrderedCollectionShapeType,
  PersonShapeType,
} from "../.ldo/activityPub.shapeTypes";

export function usePrepareProfileOnInitialLoad() {
  const { dataset, getResource } = useLdo();
  const { session } = useSolidAuth();

  return useAsyncEffect(async () => {
    if (session.webId) {
      const profileResource = getResource(session.webId);
      const [readResult, rootResult] = await Promise.all([
        profileResource.read(),
        profileResource.getRootContainer(),
      ]);
      if (readResult.isError) {
        displayError(readResult);
        return;
      }
      if (rootResult.isError) {
        displayError(rootResult);
        return;
      }
      const transactionDataset = dataset.startTransaction();
      const person = transactionDataset
        .usingType(PersonShapeType)
        .write(session.webId)
        .fromSubject(session.webId);
      // Is a person type
      if (!person.type.some((val) => val["@id"] === "Person")) {
        person.type.push({ "@id": "Person" });
      }
      // Has an outbox
      if (!person.outbox) {
        const outboxResource = rootResult.child(v4());
        const outbox = transactionDataset
          .usingType(OrderedCollectionShapeType)
          .write(outboxResource.uri)
          .fromSubject(`${outboxResource.uri}#${v4()}`);
        outbox.type = [{ "@id": "OrderedCollection" }];
        person.outbox = outbox;
      }
      // Has a following
      if (!person.following) {
        const followingResource = rootResult.child(v4());
        const following = transactionDataset
          .usingType(CollectionShapeType)
          .write(followingResource.uri)
          .fromSubject(`${followingResource.uri}#${v4()}`);
        following.type = [{ "@id": "Collection" }];
        person.following = following;
      }
      const commitResult = await transactionDataset.commitToPod();
      if (commitResult.isError) {
        displayError(commitResult);
      }
    }
  }, [session.webId]);
}

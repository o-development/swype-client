import { LeafUri, Leaf } from "@ldo/solid";
import { useLdo, useResource, useSubject } from "@ldo/solid-react";
import { useEffect, useMemo } from "react";

import { displayError } from "../displayError";
import {
  OrderedCollectionShapeType,
  PersonShapeType,
} from "../../.ldo/activityPub.shapeTypes";
import { OrderedCollection } from "../../.ldo/activityPub.typings";

export function useOutbox(
  personUri?: string
): [OrderedCollection | undefined, Leaf | undefined] {
  const { getSubject, getResource } = useLdo();

  // Whenever ther WebID updates, look for a new outbox URI
  const outboxUri: LeafUri | undefined = useMemo(() => {
    if (!personUri) return undefined;
    const person = getSubject(PersonShapeType, personUri);
    return person.outbox["@id"] as LeafUri;
  }, [personUri]);

  // Get the outbox
  const outboxResource = useResource(outboxUri);
  const outbox = useSubject(OrderedCollectionShapeType, outboxUri);

  // Load the resources in the outbox
  useEffect(() => {
    outbox?.items?.forEach((item) => {
      const itemResource = getResource(item["@id"]!);
      itemResource.read().then((result) => {
        if (result.isError) displayError(result);
      });
    });
  }, [outbox?.items]);

  return [outbox, outboxResource];
}

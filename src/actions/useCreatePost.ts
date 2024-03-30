import { useLdo } from "@ldo/solid-react";
import { useCallback } from "react";

export function createPost() {
  const { dataset } = useLdo();
  return useCallback((file: File, mimeType: string) => {
    const transactionDataset = dataset.startTransaction();
    transactionDataset.
  }, []);
}

import { Button, Icon, Spinner } from "@ui-kitten/components";
import { getDocumentAsync } from "expo-document-picker";
import { FunctionComponent, useCallback, useState } from "react";
import { StyleSheet, View } from "react-native";

import { useCreatePost } from "../actions/post/useCreatePost";

export const MyPosts: FunctionComponent = () => {
  const createPost = useCreatePost();
  const [isLoading, setIsLoading] = useState(false);

  const onUpload = useCallback(async () => {
    setIsLoading(true);

    // Upload the Video
    const chosenDocument = await getDocumentAsync({
      copyToCacheDirectory: false,
      multiple: false,
      type: ["video/*"],
    });
    if (chosenDocument.canceled) return;
    const asset = chosenDocument.assets[0];

    await createPost(asset);

    setIsLoading(false);
  }, [createPost]);

  return (
    <View style={styles.container}>
      <Button
        onPress={onUpload}
        disabled={isLoading}
        accessoryLeft={(props) =>
          isLoading ? (
            <View
              style={[
                props?.style,
                { justifyContent: "center", alignItems: "center" },
              ]}>
              <Spinner status="info" size="small" />
            </View>
          ) : (
            <Icon {...props} name="upload-outline" />
          )
        }>
        Upload New Video
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
});

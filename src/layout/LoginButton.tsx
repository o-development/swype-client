import { useSolidAuth } from "@ldo/solid-react";
import { Button, Icon, Input, Modal } from "@ui-kitten/components";
import { FunctionComponent, useState } from "react";
import { StyleSheet, View } from "react-native";

export interface LoginButtonProps {
  size: "large" | "small";
}

export const LoginButton: FunctionComponent<LoginButtonProps> = ({ size }) => {
  const { login, logout, session } = useSolidAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [issuer, setIssuer] = useState("https://solidweb.me");

  if (session.isLoggedIn) {
    return (
      <Button size={size} onPress={logout}>
        Log Out
      </Button>
    );
  }

  return (
    <>
      <Button size={size} onPress={() => setIsModalOpen(true)}>
        Log In
      </Button>
      <Modal
        visible={isModalOpen}
        backdropStyle={styles.modalBackground}
        onBackdropPress={() => setIsModalOpen(false)}>
        <View style={styles.cardContainer}>
          <Input
            placeholder="Issuer Uri"
            value={issuer}
            onChangeText={(nextValue) => setIssuer(nextValue)}
            onSubmitEditing={() => console.log("hello")}
          />
          <Button
            style={styles.goButton}
            accessoryRight={(props) => (
              <Icon {...props} name="log-in-outline" />
            )}
            onPress={() => login(issuer)}
          />
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  cardContainer: {
    flexDirection: "row",
    alignItems: "stretch",
  },
  goButton: {
    height: 40,
  },
});

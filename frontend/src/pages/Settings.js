import { useContext } from "react";
import { Flex } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { FirebaseContext } from "../firebase";

const Settings = () => {
  const firebase = useContext(FirebaseContext);
  return (
    <Flex p={4} w="100%">
      <Button flex={1} onClick={() => firebase.signOut()}>
        Log out
      </Button>
    </Flex>
  );
};

export default Settings;

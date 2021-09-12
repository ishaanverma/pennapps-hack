import { useContext } from "react";
import { Flex, Heading, Box } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { FirebaseContext } from "../firebase";
import { Avatar } from "@chakra-ui/avatar";
import UserContext from "../context/UserContext";

const Settings = () => {
  const firebase = useContext(FirebaseContext);
  const { user } = useContext(UserContext);

  return (
    <Flex p={4} w="100%" direction="column" justify="center">
      <Flex flex={1} justify="center" align="center" direction="column" mb={10}>
        <Avatar name={user.user.displayName} size="lg" mb={5} />
        <Heading>{user.user.displayName}</Heading>
      </Flex>
      <Flex flex={1} direction="column">
        <Box mb={5} p={4} justify="center" bg="gray.500" rounded={4}>
          Profile
        </Box>
        <Box mb={5} p={4} justify="center" bg="gray.500" rounded={4}>
          Set Goals
        </Box>
        <Box mb={5} p={4} justify="center" bg="gray.500" rounded={4}>
          Manage Accounts
        </Box>
        <Button onClick={() => firebase.signOut()} h={10}>
          Log out
        </Button>
      </Flex>
    </Flex>
  );
};

export default Settings;

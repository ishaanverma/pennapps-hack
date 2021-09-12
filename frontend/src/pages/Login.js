import { useContext } from "react";
import { FirebaseContext } from "../firebase";
import {
  Flex,
  Heading,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";

const Login = () => {
  const firebase = useContext(FirebaseContext);
  const formBackground = useColorModeValue("gray.100", "gray.700");

  const loginWithGoogle = async () => {
    try {
      // Authenticate with Google
      await firebase.signInWithGoogle();
    } catch (err) {
      // Login Failed
      console.log('Login Failed');
    }
  };

  return (
    <Flex height="100vh" align="center" justify="center">
      <Flex
        direction="column"
        background={formBackground}
        px={8}
        py={12}
        rounded={6}
      >
        <Heading mb={6}>Log In</Heading>
        <Button onClick={() => loginWithGoogle()} colorScheme="teal" mb={6}>
          Log In with Google
        </Button>
      </Flex>
    </Flex>
  );
};

export default Login;

import Navbar from "../components/Navbar";
import { Flex, Heading, Text, Box, Button } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Home = () => {
  return (
    <>
      <Navbar />
      <Flex p={4}>
        <Box bg="gray.200" borderRadius={4} p={4}>
          <Text color="black">
            You're on track to meet your goal by 15th September!
          </Text>
        </Box>
      </Flex>
      <Flex justify="center" align="center" direction="column" mt={6} mb={4}>
        <Box>
          <Text>Current Balance</Text>
        </Box>
        <Box>
          <Heading size="md">$1,000</Heading>
        </Box>
      </Flex>
      <Flex justify="space-evenly" align="center">
        <Flex direction="column" justify="center" align="center">
          <Text>$168.7</Text>
          <Flex justify="center" align="center">
            <FontAwesomeIcon icon={["fas", "arrow-up"]} />
            <Text ml={2}>Spent</Text>
          </Flex>
        </Flex>
        <Flex direction="column" justify="center" align="center">
          <Text>$300.7</Text>
          <Flex justify="center" align="center">
            <FontAwesomeIcon icon={["fas", "arrow-down"]} />
            <Text ml={2}>Saved</Text>
          </Flex>
        </Flex>
      </Flex>
      <Flex px={4} my={4} w="100%">
        <Button flex={1}>Setup a Goal</Button>
      </Flex>
      <Flex align="start" p={4} direction="column">
        <Heading size="sm" mb={2}>
          SAVING STRATEGIES
        </Heading>
        <Box bg="gray.100" h={20} w="100%" borderRadius={4} p={4} mb={4}>
          <Text color="black">Round up my expenses</Text>
        </Box>
        <Box bg="gray.100" h={20} w="100%" borderRadius={4} p={4} mb={4}>
          <Text color="black">52 Week Challenge</Text>
        </Box>
        <Box bg="gray.100" h={20} w="100%" borderRadius={4} p={4} mb={4}>
          <Text color="black">Put a aside money when you get paid</Text>
        </Box>
      </Flex>
      <Flex align="start" p={4} direction="column">
        <Heading size="sm" mb={2}>
          SAVE FOR FUN
        </Heading>
        <Box bg="gray.100" h={20} w="100%" borderRadius={4} p={4} mb={4}>
          <Text color="black">Find Food Recipes</Text>
        </Box>
      </Flex>
      <Box h={30} />
    </>
  );
};

export default Home;

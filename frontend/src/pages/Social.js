import { Avatar } from "@chakra-ui/avatar";
import { Flex, Container, Box, VStack, Heading } from "@chakra-ui/layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Social = () => {
  return (
    <Container p={4}>
      <Flex direction="column" justify="center" align="center" py={4} mb={4}>
        <FontAwesomeIcon icon={["fas", "trophy"]} size="5x" />
        <Heading>Cache Master</Heading>
      </Flex>
      <VStack align="stretch" spacing={4}>
        <LeaderboardCard name="Ishaan Verma" points="140" />
        <LeaderboardCard name="Joel Rego" points="120"/>
        <LeaderboardCard name="Abhinav Rao" points="100" />
        <LeaderboardCard name="Varun Chopra" points="90" />
      </VStack>
    </Container>
  );
};

const LeaderboardCard = ({ name="", points="" }) => {
  return (
    <Box p={4} bg="white" rounded={4}>
      <Flex justify="space-between" align="center">
        <Flex align="center">
          <Avatar name={name} mr={4} />
          <Flex direction="column">
            <Heading color="black" size="sm">{name}</Heading>
          </Flex>
        </Flex>
        <Heading color="black" size="sm">{points} pts</Heading>
      </Flex>
    </Box>
  );
};

export default Social;

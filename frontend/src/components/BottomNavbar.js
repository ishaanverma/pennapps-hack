import { Flex, Box, Text, Link } from "@chakra-ui/layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link as RouterLink } from "react-router-dom";

const BottomNavbar = () => {
  return (
    <Flex
      direction="row"
      justify="space-evenly"
      align="center"
      bottom={0}
      position="fixed"
      background="teal"
      w="100%"
      h="10"
      py={7}
    >
      <Box p={2}>
        <Link as={RouterLink} to="/home">
          <Flex justify="center" align="center" direction="column">
            <FontAwesomeIcon icon={["fas", "home"]} />
            <Text>Home</Text>
          </Flex>
        </Link>
      </Box>
      <Box>
        <Link as={RouterLink} to="/social">
          <Flex justify="center" align="center" direction="column">
            <FontAwesomeIcon icon={["fas", "trophy"]} />
            <Text>Social</Text>
          </Flex>
        </Link>
      </Box>
      <Box>
        <Link as={RouterLink} to="/history">
          <Flex justify="center" align="center" direction="column">
            <FontAwesomeIcon icon={["fas", "donate"]} />
            <Text>Savings</Text>
          </Flex>
        </Link>
      </Box>
      <Box>
        <Link as={RouterLink} to="/offers">
          <Flex justify="center" align="center" direction="column">
            <FontAwesomeIcon icon={["fas", "tag"]} />
            <Text>Offers</Text>
          </Flex>
        </Link>
      </Box>
      <Box>
        <Link as={RouterLink} to="/settings">
          <Flex justify="center" align="center" direction="column">
            <FontAwesomeIcon icon={["fas", "cog"]} />
            <Text>Settings</Text>
          </Flex>
        </Link>
      </Box>
    </Flex>
  );
};

export default BottomNavbar;

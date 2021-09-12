import { Flex, Heading } from "@chakra-ui/layout";

const Navbar = () => {
  return (
    <Flex
      justify="center"
      align="center"
      p="4"
      zIndex={1}
    >
      <Heading size="lg">Cache</Heading>
    </Flex>
  );
};

export default Navbar;

import { Flex, Text } from "@chakra-ui/layout";

const Navbar = () => {
  return (
    <Flex
      justify="center"
      align="center"
      p="4"
      zIndex={1}
    >
      <Text size="md">FinHelp</Text>
    </Flex>
  );
};

export default Navbar;

import { Avatar } from "@chakra-ui/avatar";
import { Heading, Box, Flex, Container, VStack, Text } from "@chakra-ui/layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Offers = () => {
  return (
    <Container p={4}>
      <Flex align="center" mb={4}>
        <Box mr={4}>
          <FontAwesomeIcon icon={["fas", "tag"]} size="2x" />
        </Box>
        <Heading>Offers</Heading>
      </Flex>
      <VStack>
        <OfferCard
          vendorName="Instacart"
          source="https://pbs.twimg.com/profile_images/1326362477341282304/_-mW6X_x_400x400.jpg"
          venderOffer="20% cashback when you pay online"
        />
        <OfferCard
          vendorName="Aldo"
          source="https://pbs.twimg.com/profile_images/903333253662228480/mJUkUOzW_400x400.jpg"
          venderOffer="20% cashback when you pay online"
        />
        <OfferCard
          vendorName="H&M"
          source="https://scontent-lax3-2.xx.fbcdn.net/v/t1.18169-9/10649801_1504166349821613_415705308503646400_n.jpg?_nc_cat=1&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=sqKnbW5x5NQAX_E7Ovz&_nc_ht=scontent-lax3-2.xx&oh=7bf6af7dd1305be2b7b6f0aceac24c0c&oe=6164ED61"
          venderOffer="20% cashback upto $20"
        />
      </VStack>
    </Container>
  );
};

const OfferCard = ({ vendorName, venderOffer, source }) => {
  return (
    <Box bg="gray.500" p={4} w="100%" rounded={4}>
      <Flex>
        <Avatar mr={4} src={source}></Avatar>
        <Flex direction="column">
          <Text>{vendorName}</Text>
          <Text>{venderOffer}</Text>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Offers;

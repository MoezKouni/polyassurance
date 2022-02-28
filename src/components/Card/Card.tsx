import {
  Flex,
  Box,
  Image,
  useColorModeValue,
  Text,
  Button,
} from "@chakra-ui/react";

const data = {
  isNew: true,
  imageURL:
    "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=4600&q=80",
  name: "Wayfarer Classic",
  price: 4.5,
  rating: 4.2,
  numReviews: 34,
};

function Card() {
  return (
    <Flex p={0} w="full" alignItems="center" justifyContent="center" my="6">
      <Box
        bg={useColorModeValue("white", "gray.800")}
        maxW="sm"
        borderWidth="1px"
        rounded="lg"
        shadow="lg"
        position="relative"
      >
        <Image
          src={data.imageURL}
          alt={`Picture of ${data.name}`}
          roundedTop="lg"
        />

        <Box p="6">
          <Flex
            mt="1"
            direction={"column"}
            justifyContent="space-between"
            alignContent="center"
          >
            <Box
              fontSize="2xl"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              isTruncated
            >
              {data.name}
            </Box>
            <Text>
              Votre bien le plus précieux, en Tunisie ou à l'international,
              l'assurance maladie n'est plus une option !
            </Text>
          </Flex>

          <Flex justifyContent="space-between" alignContent="center" mt="4">
            <Button variant={"outline"} colorScheme="twitter">
              Voir détails
            </Button>
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
}

export default Card;

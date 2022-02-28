import { ArrowForwardIcon } from "@chakra-ui/icons";
import {
  Button,
  Container,
  Flex,
  Grid,
  Heading,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer/Footer";

export default function Produits() {
  return (
    <>
      <Container maxW={"7xl"} minH="600px" my="10">
        <Grid
          h="full"
          gridTemplateColumns={useBreakpointValue({
            base: "1fr",
            md: "1fr 1fr",
          })}
          gap="10"
          alignContent="center"
        >
          <Flex
            rounded={"2xl"}
            bg="gray.100"
            p="14"
            h="350px"
            direction={"column"}
            justify="space-between"
            align={"flex-start"}
            transition="0.5s"
            _hover={{ boxShadow: "lg" }}
          >
            <Heading>ASSURANCE AUTOMOBILE</Heading>
            <Text>
              Votre véhicule vous accompagne sur tous les trajets du quotidien.
              Pensez à le protéger ainsi que ses occupants avec une bonne
              assurance auto
            </Text>
            <Link to={"/nos-produits/automobile"}>
              <Button
                variant={"link"}
                colorScheme="twitter"
                _hover={{ "& svg": { transform: "translateX(5px)" } }}
                rightIcon={
                  <ArrowForwardIcon
                    transition={"0.5s"}
                    transform="translateX(-5px)"
                  />
                }
              >
                EN SAVOIR PLUS
              </Button>
            </Link>
          </Flex>
          <Flex
            rounded={"2xl"}
            bg="gray.100"
            p="14"
            h="350px"
            direction={"column"}
            justify="space-between"
            align={"flex-start"}
            transition="0.5s"
            _hover={{ boxShadow: "lg" }}
          >
            <Heading>MULTIRISQUES HABITATION</Heading>
            <Text>
              Que vous soyez propriétaire ou locataire, Votre maison et tout ce
              qu'elle contient constitue votre cadre de vie. Pensez à la
              protéger avec une assurance
            </Text>
            <Button
              variant={"link"}
              colorScheme="twitter"
              _hover={{ "& svg": { transform: "translateX(5px)" } }}
              rightIcon={
                <ArrowForwardIcon
                  transition={"0.5s"}
                  transform="translateX(-5px)"
                />
              }
            >
              EN SAVOIR PLUS
            </Button>
          </Flex>
        </Grid>
        <Flex
          rounded={"2xl"}
          bg="gray.100"
          p="14"
          h="200px"
          direction={"column"}
          justify="space-between"
          align={"flex-start"}
          mt="10"
        >
          <Heading textTransform={"uppercase"} size="lg">
            bientôt d'autres produits
          </Heading>
          <Text>
            Nous travaillons dur pour vous rendre plus en sécurité et assurer
            l'avenir pour vous et votre famille.
          </Text>
        </Flex>
      </Container>
      <Footer />
    </>
  );
}

import {
  Box,
  Button,
  Container,
  Heading,
  Stack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useAuthProvider } from "../../providers/AuthProvider";

export const Banner = () => {
  const { data } = useAuthProvider();
  const headingSize = useBreakpointValue({ base: "lg", md: "xl" });
  if (data) {
    return null;
  }
  return (
    <Box as="section" bg="bg-surface">
      <Container py={{ base: "16", md: "24" }}>
        <Stack spacing={{ base: "8", md: "10" }}>
          <Stack spacing={{ base: "4", md: "5" }} align="center">
            <Heading size={headingSize}>Êtes-vous prêt ?</Heading>
            <Text color="muted" maxW="2xl" textAlign="center" fontSize="xl">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
              eu mi ultricie.
            </Text>
          </Stack>
          <Stack
            spacing="3"
            direction={{ base: "column", sm: "row" }}
            justify="center"
          >
            <Link to="/inscription">
              <Button variant="outline" size="lg">
                S'inscrire
              </Button>
            </Link>
            <Link to="/connexion">
              <Button variant="solid" colorScheme={"twitter"} size="lg">
                Se connecter
              </Button>
            </Link>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

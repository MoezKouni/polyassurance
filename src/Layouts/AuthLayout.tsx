import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Box,
  Stack,
  Heading,
  Text,
  Container,
  SimpleGrid,
  useBreakpointValue,
  IconProps,
  Icon,
  IconButton,
  Button,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";

export default function AuthLayout({ children, title }: any) {
  const history = useHistory()
  return (
    <Box position={"relative"} display="grid" placeItems={"center"} h="100vh">
      <Container
        as={SimpleGrid}
        maxW={"7xl"}
        columns={{ base: 1, md: 2 }}
        spacing={{ base: 10, lg: 32 }}
        py={{ base: 10, sm: 20, lg: 20 }}
      >
        <Stack spacing={{ base: 10, md: 16 }}>
          <Heading
            lineHeight={1.1}
            fontSize={{ base: "3xl", sm: "4xl", md: "5xl", lg: "6xl" }}
            zIndex="2"
            fontWeight={800}
          >
            Vos tarifs d'assurance <br />
            <Text
              as={"span"}
              bgGradient="linear(to-r, blue.400,teal.400)"
              bgClip="text"
            >
              en quelques clics!
            </Text>
          </Heading>
          <Text fontSize={"xl"} maxW="30rem">
            Ne laissez plus votre vie et celle de votre famille entre les mains
            du hasard. <br />
            Nous vous protégeons en toutes circonstances
          </Text>
          <Button
            _hover={{ bg: "gray.50" }}
            p="6"
            aria-label="back"
            leftIcon={<ArrowBackIcon />}
            alignSelf="flex-start"
            zIndex={2}
            variant="ghost"
            onClick={() => history.push("/")}
          >
            Retour
            </Button>
        </Stack>
        <Stack
          bg={"gray.50"}
          rounded={"xl"}
          p={{ base: 4, sm: 6, md: 8 }}
          spacing={{ base: 8 }}
          maxW={{ lg: "lg" }}
        >
          <Stack spacing={4}>
            <Heading
              color={"gray.800"}
              lineHeight={1.1}
              fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
            >
              {title}
            </Heading>
            <Text color={"gray.500"} fontSize={{ base: "sm", sm: "md" }}>
              Nous vous proposons des services en ligne qui vous permettent en
              quelques clics de générer un devis en ligne et de connaitre
              immédiatement le prix de votre assurance.
            </Text>
          </Stack>
          {children}
        </Stack>
      </Container>
      <Blur
        position={"absolute"}
        top={-10}
        left={-10}
        style={{ filter: "blur(70px)" }}
      />
    </Box>
  );
}

export const Blur = (props: IconProps) => {
  const blurWidth = useBreakpointValue({
    base: "100%",
    md: "40vw",
    lg: "30vw",
  });
  const blurZIndex = useBreakpointValue({ base: -1, md: -1, lg: 0 });
  return (
    <Icon
      width={blurWidth}
      zIndex={blurZIndex}
      height="560px"
      viewBox="0 0 528 560"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="71" cy="61" r="111" fill="#F56565" />
      <circle cx="244" cy="106" r="139" fill="#4299E1" />
      <circle cy="291" r="139" fill="#ED64A6" />
      <circle cx="80.5" cy="189.5" r="101.5" fill="#ED8936" />
      <circle cx="196.5" cy="317.5" r="101.5" fill="#38B2AC" />
      <circle cx="70.5" cy="458.5" r="101.5" fill="#48BB78" />
      <circle cx="426.5" cy="-0.5" r="101.5" fill="#9F7AEA" />
    </Icon>
  );
};

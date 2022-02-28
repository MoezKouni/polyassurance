import {
  Box,
  Button,
  Container,
  Grid,
  GridItem,
  Heading,
  HStack,
  Icon,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { FaRegBuilding } from "react-icons/fa";
import { FiPhoneCall } from "react-icons/fi";
import { MdOutlineCarRental, MdOutlineCarRepair } from "react-icons/md";
import { RiCustomerService2Line } from "react-icons/ri";
import { GiHomeGarage } from "react-icons/gi";
import { Link, useLocation } from "react-router-dom";
import autombileBg from "../../assets/assurance-automobile.jpg";
import immoBg from "../../assets/Particuliers-Assurance-HABITATION.png";
import demande from "../../assets/demande.jpg";
import { BsHouseDoorFill } from "react-icons/bs";
import { IoConstructOutline } from "react-icons/io5";

const autoServices = [
  {
    icon: FiPhoneCall,
    title: "SERVICE D'ASSISTANCE",
    description:
      "Un service disponible 24h/24, 7j/7 pour dépanner, transporter ou remorquer votre voiture en cas de son immobilisation suite à une panne ou un accident.",
  },
  {
    icon: MdOutlineCarRental,
    title: "VOITURE DE REMPLACEMENT",
    description:
      "Une voiture de remplacement disponible dès le dépôt de votre véhicule chez un réparateur.",
  },
  {
    icon: MdOutlineCarRepair,
    title: "2ÈME REMORQUAGE GRATUIT",
    description: "Le deuxième remorquage est gratuit.",
  },
  {
    icon: RiCustomerService2Line,
    title: "SERVICE PERSONNALISÉ",
    description:
      "Un conseiller POLY ASSURANCE construit avec vous le contrat d'Assurance Poly Automobile qui répond le mieux à votre situation et à l'état actuel de votre véhicule.",
  },
  {
    icon: FaRegBuilding,
    title: "CENTRES D'EXPERTISE",
    description: "Des centres d'expertise dans toute la Tunisie.",
  },
  {
    icon: GiHomeGarage,
    title: "GARAGES CONVENTIONNÉS",
    description: "Des garages Conventionnés sur tout le territoire Tunisien.",
  },
];

const immoServices = [
  {
    icon: IoConstructOutline,
    title: "SERVICE D'ASSISTANCE À DOMICILE",
    description:
      "Vous bénéficiez de l'intervention d'un dépanneur dans les meilleurs délais.",
  },
  {
    icon: BsHouseDoorFill,
    title: "UNE OFFRE SUR MESURE",
    description:
      "Locataire ou propriétaire ? Appartement ou Maison, choisissez les garanties qui vous ressemblent.",
  },
];
export default function ProduitDetails() {
  const { pathname } = useLocation();
  if (pathname.includes("automobile")) {
    return (
      <Container maxW={"7xl"}>
        <Box
          position={"relative"}
          bgImage={`url(${autombileBg})`}
          borderRadius="xl"
          h="64"
          bgRepeat={"no-repeat"}
          bgSize="cover"
          overflow={"hidden"}
          display="grid"
          placeItems={"center"}
          color="white"
          _after={{
            content: '""',
            position: "absolute",
            bg: "blue.500",
            opacity: "0.5",
            height: "100%",
            width: "100%",
            top: "0px",
            left: "0px",
          }}
        >
          <Stack>
            <Heading zIndex={2}>ASSURANCE AUTOMOBILE</Heading>
            <Text zIndex={2} fontSize={"sm"} textAlign="center">
              Accueil - Assurance - Assurance Automobile
            </Text>
          </Stack>
        </Box>
        <Text textAlign={"center"} maxW="60rem" mx="auto" my="8">
          Votre véhicule vous accompagne sur tous les trajets du quotidien.
          Pensez à le protéger ainsi que ses passagers avec une bonne assurance
          auto
        </Text>
        <Heading textAlign={"center"} fontWeight="900" py="8">
          POURQUOI CHOISIR POLY ASSURANCE ?
        </Heading>
        <Grid
          templateColumns={{ base: "1fr", md: "repeat(3,1fr)" }}
          templateRows={"repeat(2, 1fr)"}
          gap="10"
          my="8"
        >
          {autoServices.map((el: any) => (
            <GridItem bg="gray.50" rounded="xl" p="4">
              <Stack align={"center"} spacing={4}>
                <Icon
                  aria-label={el.title}
                  as={el.icon}
                  color="white"
                  fontSize="6xl"
                  rounded={"full"}
                  bg="blue.700"
                  p="2"
                />
                <Text fontWeight={700} color="blue.400" textAlign={"center"}>
                  {el.title}
                </Text>
                <Text textAlign={"center"}>{el.description}</Text>
              </Stack>
            </GridItem>
          ))}
        </Grid>
        <Box rounded={"xl"} bg="gray.50" p="4" my="8" mt="12">
          <HStack spacing={10}>
            <Image
              src={demande}
              rounded={"xl"}
              alt="envoie demande"
              flex="0.2"
              width="500px"
            />
            <Stack flex="1" flexGrow={"1"} spacing={6}>
              <Box>
                <Heading fontSize={"2xl"}>Envoyer votre demande</Heading>
                <Text>
                  Une offre personnalisée pour mieux vous rendre service
                </Text>
              </Box>
              <Link to="/nos-produits/automobile/demander">
                <Button
                  variant={"solid"}
                  colorScheme={"twitter"}
                  alignSelf="flex-start"
                >
                  Demander
                </Button>
              </Link>
            </Stack>
          </HStack>
        </Box>
      </Container>
    );
  } else if (pathname.includes("habitation")) {
    return (
      <Container maxW={"7xl"}>
        <Box
          position={"relative"}
          bgImage={`url(${immoBg})`}
          borderRadius="xl"
          h="64"
          bgRepeat={"no-repeat"}
          bgSize="cover"
          overflow={"hidden"}
          display="grid"
          placeItems={"center"}
          color="white"
          _after={{
            content: '""',
            position: "absolute",
            bg: "blue.500",
            opacity: "0.5",
            height: "100%",
            width: "100%",
            top: "0px",
            left: "0px",
          }}
        >
          <Stack>
            <Heading textAlign="center" zIndex={2}>
              MULTIRISQUES HABITATION
            </Heading>
            <Text zIndex={2} fontSize={"sm"} textAlign="center">
              Accueil - Assurance - Multirisques Habitation
            </Text>
          </Stack>
        </Box>
        <Text textAlign={"center"} maxW="60rem" mx="auto" my="8">
          Que vous soyez propriétaire ou locataire, Votre maison et tout ce
          qu'elle contient constitue votre cadre de vie. Pensez à la protéger
          avec une assurance habitation qui vous ressemble
        </Text>
        <Heading textAlign={"center"} fontWeight="900" py="8">
          POURQUOI CHOISIR POLY ASSURANCE ?
        </Heading>
        <Grid
          templateColumns={{ base: "1fr", md: "repeat(2,1fr)" }}
          gap="10"
          my="8"
        >
          {immoServices.map((el: any) => (
            <GridItem bg="gray.50" rounded="xl" p="4">
              <Stack align={"center"} spacing={4}>
                <Icon
                  aria-label={el.title}
                  as={el.icon}
                  color="white"
                  fontSize="6xl"
                  rounded={"full"}
                  bg="blue.700"
                  p="2"
                />
                <Text fontWeight={700} color="blue.400" textAlign={"center"}>
                  {el.title}
                </Text>
                <Text textAlign={"center"}>{el.description}</Text>
              </Stack>
            </GridItem>
          ))}
        </Grid>
        <Box rounded={"xl"} bg="gray.50" p="4" my="8" mt="12">
          <HStack spacing={10}>
            <Image
              src={demande}
              rounded={"xl"}
              alt="envoie demande"
              flex="0.2"
              width="500px"
            />
            <Stack flex="1" flexGrow={"1"} spacing={6}>
              <Box>
                <Heading fontSize={"2xl"}>Envoyer votre demande</Heading>
                <Text>
                  Une offre personnalisée pour mieux vous rendre service
                </Text>
              </Box>
              <Link to="/nos-produits/habitation/demander">
                <Button
                  variant={"solid"}
                  colorScheme={"twitter"}
                  alignSelf="flex-start"
                >
                  Demander
                </Button>
              </Link>
            </Stack>
          </HStack>
        </Box>
      </Container>
    );
  } else return null;
}

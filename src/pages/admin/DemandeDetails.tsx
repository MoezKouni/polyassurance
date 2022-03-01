import {
  Badge,
  Box,
  Button,
  Divider,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  HStack,
  Spinner,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useMutation, useQuery } from "react-query";
import { useHistory, useParams } from "react-router-dom";
import {
  changeStatusDemande,
  getOneDemande,
} from "../../services/demandes/services";

import LightBox from "../../components/LightBox/LightBox";
import moment from "moment";

export default function DemandeDetails() {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const toast = useToast();
  const {
    data: demande,
    isLoading: demandeLoading,
    refetch,
  } = useQuery(`demande-${id}`, () => getOneDemande(id), {
    retry: false,
  });

  const { mutateAsync: changeStatus, isLoading: mutationLoading } = useMutation(
    changeStatusDemande,
    {
      onSuccess: (res: any) => {
        toast({
          title: `Demande ${res.status}.`,
          status: "success",
          duration: 4000,
          isClosable: true,
          position: "bottom-right",
        });
        refetch();
      },
      onError: (err: any) => {
        toast({
          duration: 4000,
          isClosable: true,
          position: "bottom-right",
          description: err.response.data.message,
          status: "warning",
          title: "Impossible",
        });
      },
    }
  );

  return (
    <Box>
      {demandeLoading ? (
        <Spinner />
      ) : (
        <Grid mb="20">
          <Stack>
            <Box bg="white" rounded="xl" p="4">
              <HStack justify={"space-between"} wrap="wrap">
                <Heading size={"lg"} mb="4">
                  Assurance:{" "}
                  <Heading fontWeight={"light"}>
                    {demande?.type.toUpperCase()}
                  </Heading>
                </Heading>
                {demande.status === "En attente" ? (
                  <Badge colorScheme="yellow">En attente</Badge>
                ) : demande.status === "Déclinée" ? (
                  <Badge colorScheme="red">Déclinée</Badge>
                ) : (
                  <Badge colorScheme="green">Approuvée</Badge>
                )}
              </HStack>
              <Divider />
              <Box
                border="1px solid"
                borderColor={"gray.200"}
                bg="gray.50"
                my="4"
                mt="6"
                p="4"
                rounded="xl"
              >
                <Text
                  fontWeight={700}
                  fontSize="xl"
                  textDecoration={"underline"}
                  mb="2"
                >
                  Information à propos le client:
                </Text>
                <Grid templateColumns={{ base: "1fr", md: "repeat(2,1fr)" }}>
                  <GridItem>
                    <HStack align={"baseline"} flexWrap="wrap">
                      <FormLabel fontWeight={600} color="blue.600">
                        Nom:
                      </FormLabel>
                      <Text>{demande.user.lastname}</Text>
                    </HStack>
                    <HStack align={"baseline"} flexWrap="wrap">
                      <FormLabel fontWeight={600} color="blue.600">
                        Prénom:
                      </FormLabel>
                      <Text>{demande.user.firstname}</Text>
                    </HStack>
                    <HStack align={"baseline"} flexWrap="wrap">
                      <FormLabel fontWeight={600} color="blue.600">
                        Adresse:
                      </FormLabel>
                      <Text>{demande.user.address}</Text>
                    </HStack>
                  </GridItem>
                  <GridItem>
                    <HStack align={"baseline"} flexWrap="wrap">
                      <FormLabel fontWeight={600} color="blue.600">
                        Adresse mail:
                      </FormLabel>
                      <Text>{demande.user.email}</Text>
                    </HStack>
                    <HStack align={"baseline"} flexWrap="wrap">
                      <FormLabel fontWeight={600} color="blue.600">
                        N° de téléphone:
                      </FormLabel>
                      <Text>{demande.user.phone}</Text>
                    </HStack>
                    <HStack align={"baseline"} flexWrap="wrap">
                      <FormLabel fontWeight={600} color="blue.600">
                        Date inscription:
                      </FormLabel>
                      <Text>
                        {moment(demande.user.createdAt).format("DD/MM/YYYY")}
                      </Text>
                    </HStack>
                  </GridItem>
                </Grid>
              </Box>
              <Divider />
              <Box
                border="1px solid"
                borderColor={"gray.200"}
                bg="gray.50"
                my="4"
                mt="6"
                p="4"
                rounded="xl"
              >
                <Text
                  fontWeight={700}
                  fontSize="xl"
                  textDecoration={"underline"}
                  mb="2"
                >
                  Information sur la demande:
                </Text>
                <Grid templateColumns={{ base: "1fr", md: "repeat(2,1fr)" }}>
                  <GridItem>
                    {demande.num_matricule && (
                      <HStack align={"baseline"} flexWrap="wrap">
                        <FormLabel fontWeight={600} color="blue.600">
                          N° d'immatriculation:
                        </FormLabel>
                        <Text>{demande.num_matricule}</Text>
                      </HStack>
                    )}
                    {demande.carburant && (
                      <HStack align={"baseline"} flexWrap="wrap">
                        <FormLabel fontWeight={600} color="blue.600">
                          Carburan:
                        </FormLabel>
                        <Text>{demande.carburant}</Text>
                      </HStack>
                    )}
                    {demande.mark && (
                      <HStack align={"baseline"} flexWrap="wrap">
                        <FormLabel fontWeight={600} color="blue.600">
                          Marque:
                        </FormLabel>
                        <Text>{demande.mark}</Text>
                      </HStack>
                    )}
                    {demande.model && (
                      <HStack align={"baseline"} flexWrap="wrap">
                        <FormLabel fontWeight={600} color="blue.600">
                          Modèle:
                        </FormLabel>
                        <Text>{demande.model}</Text>
                      </HStack>
                    )}
                    {demande.nb_place && (
                      <HStack align={"baseline"} flexWrap="wrap">
                        <FormLabel fontWeight={600} color="blue.600">
                          Nombre des places:
                        </FormLabel>
                        <Text>{demande.nb_place}</Text>
                      </HStack>
                    )}
                    {demande.maison && (
                      <HStack align={"baseline"} flexWrap="wrap">
                        <FormLabel fontWeight={600} color="blue.600">
                          Type d'immobilier:
                        </FormLabel>
                        <Text textTransform={"capitalize"}>
                          {demande.maison}
                        </Text>
                      </HStack>
                    )}
                    {demande.nb_piece && (
                      <HStack align={"baseline"} flexWrap="wrap">
                        <FormLabel fontWeight={600} color="blue.600">
                          Nombre des pièces:
                        </FormLabel>
                        <Text>{demande.nb_piece}</Text>
                      </HStack>
                    )}
                  </GridItem>
                  <GridItem>
                    {demande.superficie && (
                      <HStack align={"baseline"} flexWrap="wrap">
                        <FormLabel fontWeight={600} color="blue.600">
                          Superficie:
                        </FormLabel>
                        <Text>{demande.superficie}</Text>
                      </HStack>
                    )}
                    {demande.num_chassie && (
                      <HStack align={"baseline"} flexWrap="wrap">
                        <FormLabel fontWeight={600} color="blue.600">
                          N° chassie:
                        </FormLabel>
                        <Text>{demande.num_chassie}</Text>
                      </HStack>
                    )}
                    {demande.puissance && (
                      <HStack align={"baseline"} flexWrap="wrap">
                        <FormLabel fontWeight={600} color="blue.600">
                          Puissance fiscale:
                        </FormLabel>
                        <Text>{demande.puissance}</Text>
                      </HStack>
                    )}
                    {demande.year && (
                      <HStack align={"baseline"} flexWrap="wrap">
                        <FormLabel fontWeight={600} color="blue.600">
                          Année de mis en ciculation:
                        </FormLabel>
                        <Text>{demande.year}</Text>
                      </HStack>
                    )}
                    {demande.valeur && (
                      <HStack align={"baseline"} flexWrap="wrap">
                        <FormLabel fontWeight={600} color="blue.600">
                          Valeur estimée:
                        </FormLabel>
                        <Text>{demande.valeur}</Text>
                      </HStack>
                    )}
                  </GridItem>
                </Grid>
              </Box>
            </Box>
            <Box bg="white" rounded="xl" p="4">
              <Text
                fontWeight={700}
                fontSize="xl"
                textDecoration={"underline"}
                mb="2"
              >
                Documents attachés:
              </Text>
              <LightBox documents={demande.documents} />
            </Box>
          </Stack>
        </Grid>
      )}
      <Box
        bg="white"
        boxShadow={"2xl"}
        position={"fixed"}
        bottom="0px"
        width={"100%"}
        left="0px"
        p="3"
        zIndex={1}
      >
        <HStack justify={"flex-end"}>
          <Button variant={"ghost"} onClick={() => history.goBack()}>
            Annuler
          </Button>
          <Button
            colorScheme={"red"}
            onClick={() => changeStatus({ id, status: "Déclinée" })}
            isLoading={mutationLoading}
            loadingText={"...."}
          >
            Décliner
          </Button>
          <Button
            colorScheme={"green"}
            onClick={() => changeStatus({ id, status: "Approuvée" })}
            isLoading={mutationLoading}
            loadingText={"...."}
          >
            Approuver
          </Button>
        </HStack>
      </Box>
    </Box>
  );
}

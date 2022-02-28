import {
  Box,
  FormLabel,
  Heading,
  HStack,
  Image,
  Spinner,
  Stack,
  StatLabel,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getOneClient } from "../../services/client/services";
import avatarPlaceholder from "../../assets/avatar-placeholder.png";
import moment from "moment";

export default function ClientDetails() {
  const params = useParams<{ id: string }>();
  const {
    data: client,
    isLoading: isLoadingclient,
    isError,
  } = useQuery(`client-${params.id}`, () => getOneClient(params.id || ""), {
    refetchOnWindowFocus: false,
    retry: false,
    enabled: Boolean(params.id),
  });
  if (isLoadingclient) return <Spinner />;
  return (
    <Stack spacing={10}>
      <HStack rounded={"lg"} bg="white" p="6" spacing={10}>
        <Box>
          <Image src={client.avatar || avatarPlaceholder} fit="cover" />
        </Box>
        <HStack spacing={20} w="full" align={"flex-start"}>
          <Stack>
            <Text>
              <FormLabel fontWeight={"bold"}>Nom:</FormLabel>
              {client.lastname}
            </Text>
            <Text>
              <FormLabel fontWeight={"bold"}>Prénom:</FormLabel>
              {client.lastname}
            </Text>
            <Text>
              <FormLabel fontWeight={"bold"}>Adresse mail:</FormLabel>
              {client.email}
            </Text>
            <Text>
              <FormLabel fontWeight={"bold"}>Numéro téléphone:</FormLabel>
              {client.phone}
            </Text>
          </Stack>
          <Stack>
            <Text>
              <FormLabel fontWeight={"bold"}>Statut:</FormLabel>
              {client.archived ? "Archivé" : "Active"}
            </Text>
            <Text>
              <FormLabel fontWeight={"bold"}>Dérniere connexion:</FormLabel>
              {moment(client.last_login).format("DD/MM/YYYY - H:mm") || "n/a"}
            </Text>
            <Text>
              <FormLabel fontWeight={"bold"}>Assurance:</FormLabel>
              Type assurance ici
            </Text>
          </Stack>
        </HStack>
      </HStack>
      <Box bg="white" p="6" rounded={"lg"}>
          <Heading>DOCUMENTS LIST HERE</Heading>
      </Box>
    </Stack>
  );
}

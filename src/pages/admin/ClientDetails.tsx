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
import { getDemandesByUser } from "../../services/demandes/services";

export default function ClientDetails() {
  const params = useParams<{ id: string }>();
  const { data: demandes, isLoading: isLoadingDemandes } = useQuery(
    `client-${params.id}`,
    () => getDemandesByUser(params.id || ""),
    {
      refetchOnWindowFocus: false,
      retry: false,
      enabled: Boolean(params.id),
    }
  );

  if (isLoadingDemandes) return <Spinner />;
  return (
    <Stack spacing={10}>
      <HStack rounded={"lg"} bg="white" p="6" spacing={10}>
        <Box>
          <Image
            src={demandes[0]?.user?.avatar || avatarPlaceholder}
            fit="cover"
          />
        </Box>
        <HStack spacing={20} w="full" align={"flex-start"}>
          <Stack>
            <Text>
              <FormLabel fontWeight={"bold"}>Nom:</FormLabel>
              {demandes[0].user.lastname}
            </Text>
            <Text>
              <FormLabel fontWeight={"bold"}>Prénom:</FormLabel>
              {demandes[0].user.firstname}
            </Text>
            <Text>
              <FormLabel fontWeight={"bold"}>Adresse mail:</FormLabel>
              {demandes[0].user.email}
            </Text>
            <Text>
              <FormLabel fontWeight={"bold"}>Numéro téléphone:</FormLabel>
              {demandes[0].user.phone}
            </Text>
          </Stack>
          <Stack>
            <Text>
              <FormLabel fontWeight={"bold"}>Adresse:</FormLabel>
              {demandes[0].user.address}
            </Text>
            <Text>
              <FormLabel fontWeight={"bold"}>Statut:</FormLabel>
              {demandes[0].user.archived ? "Archivé" : "Active"}
            </Text>
            <Text>
              <FormLabel fontWeight={"bold"}>Dérniere connexion:</FormLabel>
              {moment(demandes[0].user.last_login).format(
                "DD/MM/YYYY - H:mm"
              ) || "n/a"}
            </Text>
          </Stack>
        </HStack>
      </HStack>
      <Box bg="white" p="6" rounded={"lg"}>
        <Text fontWeight={700} textDecoration="underline" mb="4">
          Historique:
        </Text>
        <Stack>
          {demandes.map((el: any) => (
            <Stack
              bg="gray.50"
              p="4"
              border={"1px solid"}
              borderColor="gray.300"
              rounded={"xl"}
            >
              <HStack align={"baseline"} spacing={0}>
                <FormLabel fontWeight={700}>Type:</FormLabel>
                <Text>{el.type}</Text>
              </HStack>
              <HStack align={"baseline"} spacing={0}>
                <FormLabel fontWeight={700}>Date:</FormLabel>
                <Text color="gray.600">{moment(el.createdAt).format("DD/MM/YYYY")}</Text>
              </HStack>
            </Stack>
          ))}
        </Stack>
      </Box>
    </Stack>
  );
}

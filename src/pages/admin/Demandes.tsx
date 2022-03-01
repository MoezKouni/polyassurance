import {
  Avatar,
  Badge,
  Box,
  Button,
  Heading,
  HStack,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import moment from "moment";
import { Table, Td, Th, Tr } from "../../components/Table/Table";
import avatarPlaceholder from "../../assets/avatar-placeholder.png";
import { AddIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Link, useHistory } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { useState } from "react";
import Forbidden from "../../components/Banner/Forbidden/Forbidden";
import { getAllDemandes } from "../../services/demandes/services";

export default function Demandes() {
  const [notAuthorized, setNotAuthorized] = useState<boolean | string>(false);
  const toast = useToast();

  const {
    data: demandes,
    isLoading: demandesLoading,
    refetch,
  } = useQuery("demandes", getAllDemandes, {
    retry: false,
    onError: (err: any) =>
      err.response.data.statusCode === 403 &&
      setNotAuthorized(err.response.data.message),
  });

  // const { mutateAsync, isLoading } = useMutation(archiveTeammember, {
  //   onSuccess: (res) => {
  //     toast({
  //       title: res.archived ? "Membre archivé." : "Membre restauré",
  //       status: "success",
  //       duration: 4000,
  //       isClosable: true,
  //       position: "bottom-right",
  //     });
  //     refetch();
  //   },
  //   onError: (err: any) => {
  //     toast({
  //       duration: 4000,
  //       isClosable: true,
  //       position: "bottom-right",
  //       description: err.response.data.message,
  //       status: "warning",
  //       title: "Impossible",
  //     });
  //   },
  // });

  return (
    <Box bg="white" p="6" rounded={"lg"}>
      <HStack justify={"space-between"} mb="4">
        <Heading size={"md"}>Demandes</Heading>
      </HStack>
      <Box rounded={"lg"} overflow="hidden">
        <Table>
          <thead>
            <Tr>
              <Th w="5%" />
              <Th>Nom</Th>
              <Th>Prénom</Th>
              <Th w="10%">Type d'assurance</Th>
              <Th w="10%">Statut</Th>
              <Th w="20%">Date de création</Th>
              <Th w="10%" />
            </Tr>
          </thead>
          <tbody>
            {demandesLoading ? (
              <Tr h="28">
                <Td colSpan={10} textAlign="center">
                  <Spinner />
                </Td>
              </Tr>
            ) : notAuthorized ? (
              <Tr>
                <Td colSpan="10">
                  <Forbidden msg={notAuthorized} />
                </Td>
              </Tr>
            ) : (
              demandes.map((demande: any) => (
                <Tr key={demande._id}>
                  <Td>
                    <Avatar src={avatarPlaceholder} size={"sm"} />
                  </Td>
                  <Td>{demande.user.lastname}</Td>
                  <Td>{demande.user.firstname}</Td>
                  <Td>{demande.type}</Td>
                  <Td>
                    {demande.status === "En attente" ? (
                      <Badge colorScheme="yellow">En attente</Badge>
                    ) : demande.status === "Déclinée" ? (
                      <Badge colorScheme="red">Déclinée</Badge>
                    ) : (
                      <Badge colorScheme="green">Approuvée</Badge>
                    )}
                  </Td>
                  <Td>
                    {moment(demande.createdAt).format("DD/MM/YYYY - H:mm")}
                  </Td>
                  <Td>
                    <HStack>
                      <Link to={`/demandes/details/${demande._id}`}>
                        <Button
                          variant={"ghost"}
                          colorScheme="twitter"
                          size="sm"
                          rightIcon={<ChevronRightIcon />}
                        >
                          Voir détails
                        </Button>
                      </Link>
                    </HStack>
                  </Td>
                </Tr>
              ))
            )}
          </tbody>
        </Table>
      </Box>
    </Box>
  );
}

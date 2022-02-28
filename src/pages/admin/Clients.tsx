import { useMutation, useQuery } from "react-query";
import { useState } from "react";
import { archiveClient, getClients } from "../../services/client/services";
import { AddIcon } from "@chakra-ui/icons";
import {
  Box,
  HStack,
  Heading,
  Button,
  Spinner,
  Avatar,
  useToast,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Table, Td, Th, Tr } from "../../components/Table/Table";
import Forbidden from "../../components/Banner/Forbidden/Forbidden";
import avatarPlaceholder from "../../assets/avatar-placeholder.png";
import moment from "moment";
import TableActions from "../../components/TableAction/TableActions";

export default function Clients() {
  const [notAuthorized, setNotAuthorized] = useState<boolean | string>(false);
  const toast = useToast();

  const {
    data: clients,
    isLoading: clientsLoading,
    refetch,
  } = useQuery("clients", getClients, {
    refetchOnWindowFocus: false,
    retry: false,
    onError: (err: any) =>
      err.response.data.statusCode === 403 &&
      setNotAuthorized(err.response.data.message),
  });

  const { mutateAsync, isLoading } = useMutation(archiveClient, {
    onSuccess: (res) => {
      toast({
        title: res.archived ? "Client archivé." : "Client restauré",
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
  });

  return (
    <Box bg="white" p="6" rounded={"lg"}>
      <HStack justify={"space-between"} mb="4">
        <Heading size={"md"}>Clients</Heading>
        <Link to="/clients/ajouter">
          <Button leftIcon={<AddIcon />}>Ajouter</Button>
        </Link>
      </HStack>
      <Box rounded={"lg"} overflow="hidden">
        <Table>
          <thead>
            <Tr>
              <Th w="5%" />
              <Th>Nom</Th>
              <Th>Prénom</Th>
              <Th w="10%">Role</Th>
              <Th w="20%">Derniére connexion</Th>
              <Th w="10%" textAlign={"center"}>
                Action
              </Th>
            </Tr>
          </thead>
          <tbody>
            {clientsLoading ? (
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
              clients.map((client: any) => (
                <Tr key={client._id}>
                  <Td>
                    <Avatar src={avatarPlaceholder} size={"sm"} />
                  </Td>
                  <Td>
                    <Link to={`/clients/details/${client._id}`}>
                      {client.lastname}
                    </Link>
                  </Td>
                  <Td>
                    <Link to={`/clients/details/${client._id}`}>
                      {client.firstname}
                    </Link>
                  </Td>
                  <Td>{client.role}</Td>
                  <Td>
                    {client.last_login &&
                      moment(client.last_login).format("DD/MM/YYYY - H:mm")}
                  </Td>
                  <Td>
                    <TableActions
                      user={client}
                      type={"clients"}
                      onArchive={() => mutateAsync(client._id)}
                      isLoading={isLoading}
                    />
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

import {
  Avatar,
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
import { AddIcon } from "@chakra-ui/icons";
import { Link, useHistory } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { archiveTeammember, getTeam } from "../../services/team/services";
import { useState } from "react";
import Forbidden from "../../components/Banner/Forbidden/Forbidden";
import TableActions from "../../components/TableAction/TableActions";

export default function Team() {
  const [notAuthorized, setNotAuthorized] = useState<boolean | string>(false);
  const toast = useToast();

  const {
    data: team,
    isLoading: teamLoading,
    refetch,
  } = useQuery("team", getTeam, {
    refetchOnWindowFocus: false,
    retry: false,
    onError: (err: any) =>
      err.response.data.statusCode === 403 &&
      setNotAuthorized(err.response.data.message),
  });

  const { mutateAsync, isLoading } = useMutation(archiveTeammember, {
    onSuccess: (res) => {
      toast({
        title: res.archived ? "Membre archivé." : "Membre restauré",
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
        <Heading size={"md"}>Equipe</Heading>
        <Link to="/equipe/ajouter">
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
            {teamLoading ? (
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
              team.map((teammember: any) => (
                <Tr key={teammember._id}>
                  <Td>
                    <Avatar src={avatarPlaceholder} size={"sm"} />
                  </Td>
                  <Td>{teammember.lastname}</Td>
                  <Td>{teammember.firstname}</Td>
                  <Td>{teammember.role}</Td>
                  <Td>
                    {teammember.last_login &&
                      moment(teammember.last_login).format("DD/MM/YYYY - H:mm")}
                  </Td>
                  <Td>
                    <TableActions
                      user={teammember}
                      type={"equipe"}
                      onArchive={() => mutateAsync(teammember._id)}
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

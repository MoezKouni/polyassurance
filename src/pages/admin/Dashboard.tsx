import { Grid, GridItem, Heading, HStack, Text } from "@chakra-ui/react";
import moment from "moment";
import AdminLayout from "../../Layouts/AdminLayout";
import { useAuthProvider } from "../../providers/AuthProvider";
import CardDetails from "../../components/CardDetails/CardDetails";
import { getRecentClients } from "../../services/client/services";
import { useQuery } from "react-query";
import { useState } from "react";

const fakeData = [
  {
    id: 1,
    firstname: "Marwa",
    lastname: "Bouchiba",
    avatar: "",
    createdAt: new Date(),
  },
  {
    id: 2,
    firstname: "Imad",
    lastname: "Gharbi",
    avatar: "",
    createdAt: new Date(),
  },
  {
    id: 3,
    firstname: "Chaker",
    lastname: "Hsan",
    avatar: "",
    createdAt: new Date(),
  },
  {
    id: 4,
    firstname: "Med",
    lastname: "Salah",
    avatar: "",
    createdAt: new Date(),
  },
  {
    id: 5,
    firstname: "Foulen",
    lastname: "Ben Falten",
    avatar: "",
    createdAt: new Date(),
  },
];

export default function Dashboard() {
  const { data } = useAuthProvider();
  const [notAuthorizedClients, setNotAuthorizedClients] = useState<boolean | string>(false);
  const { data: recentClients, isLoading: loadingClients } = useQuery(
    "recent-clients",
    getRecentClients,
    {
      refetchOnWindowFocus: false,
      retry: false,
      onError: (err: any) =>
        err.response.data.statusCode === 403 &&
        setNotAuthorizedClients(err.response.data.message),
    }
  );
  return (
    <>
      <HStack justify={"space-between"}>
        <Heading size={"lg"}>
          <span aria-label="waving-hand">👋🏻 </span>
          Bienvenue {data?.firstname}
        </Heading>
        <Text fontSize={"lg"} color="gray.600">
          {moment(new Date()).format("dddd, DD/MM/YYYY")}
        </Text>
      </HStack>
      <Grid templateColumns="repeat(3, 1fr)" gap={4} my="4">
        <GridItem boxShadow={"xl"} bg="white" rounded={"xl"} p="6">
          <CardDetails
            title="Dernières Inscriptions"
            data={recentClients}
            baseLink={"/clients"}
            isLoading={loadingClients}
            notAuthorized={notAuthorizedClients}
            />
        </GridItem>
        <GridItem boxShadow={"xl"} bg="white" rounded={"xl"} p="6">
          <CardDetails
            title="Dernières Demandes"
            data={fakeData}
            baseLink={"/demandes"}
            isLoading={false}
            notAuthorized={false}
            />
        </GridItem>
        <GridItem boxShadow={"xl"} bg="white" rounded={"xl"} p="6">
          <CardDetails
            title="Dernière connexion équipe"
            data={fakeData}
            baseLink={"/equipe"}
            isLoading={false}
            notAuthorized={false}
          />
        </GridItem>
      </Grid>
    </>
  );
}

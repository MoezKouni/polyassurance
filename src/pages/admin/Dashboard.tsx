import { Grid, GridItem, Heading, HStack, Text } from "@chakra-ui/react";
import moment from "moment";
import { useAuthProvider } from "../../providers/AuthProvider";
import CardDetails from "../../components/CardDetails/CardDetails";
import { getRecentClients } from "../../services/client/services";
import { useQuery } from "react-query";
import { useState } from "react";
import { getRecentDemandes } from "../../services/demandes/services";

export default function Dashboard() {
  const { data } = useAuthProvider();
  const [notAuthorizedClients, setNotAuthorizedClients] = useState<boolean | string>(false);
  const [notAuthorizedDemandes, setNotAuthorizedDemandes] = useState<boolean | string>(false);
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
  const { data: recentDemandes, isLoading: loadingDemandes } = useQuery(
    "recent-demandes",
    getRecentDemandes,
    {
      refetchOnWindowFocus: false,
      retry: false,
      onError: (err: any) =>
        err.response.data.statusCode === 403 &&
        setNotAuthorizedDemandes(err.response.data.message),
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
      <Grid templateColumns={{base: "1fr", md:"repeat(2, 1fr)"}} gap={4} my="4">
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
            data={recentDemandes}
            baseLink={"/demandes"}
            isLoading={loadingDemandes}
            notAuthorized={notAuthorizedDemandes}
            />
        </GridItem>
        {/* <GridItem boxShadow={"xl"} bg="white" rounded={"xl"} p="6">
          <CardDetails
            title="Dernière connexion équipe"
            data={fakeData}
            baseLink={"/equipe"}
            isLoading={false}
            notAuthorized={false}
          />
        </GridItem> */}
      </Grid>
    </>
  );
}

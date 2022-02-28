import { CloseIcon } from "@chakra-ui/icons";
import {
  Container,
  Box,
  Flex,
  Heading,
  Text,
  useToast,
  Stack,
  Grid,
  GridItem,
  HStack,
  Button,
} from "@chakra-ui/react";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { useHistory } from "react-router-dom";
import Field from "../../components/Fields";
import {
  createClient,
  getOneClient,
  updateClient,
} from "../../services/client/services";
import { IInputField } from "../../types";
import useQueryParams from "../../utils/useQueryParams";
import TeamForm from "./TeamForm";

export default function ClientContainer() {
  const queryParams = useQueryParams();
  const {
    data: client,
    isLoading: isLoadingclient,
    isError,
  } = useQuery(
    `agent-${queryParams.get("q")}`,
    () => getOneClient(queryParams.get("q") || ""),
    {
      refetchOnWindowFocus: false,
      retry: false,
      enabled: Boolean(queryParams.get("q")),
    }
  );

  if (isLoadingclient) return <h1>Loading...</h1>;
  if (isError && queryParams.get("q")) {
    return (
      <Container maxW={"7xl"}>
        <Box bg="red.50" p="8" borderRadius={"lg"} textAlign="center">
          <Box textAlign={"center"} display={"inline-block"}>
            <Flex
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              bg={"red.500"}
              rounded={"50px"}
              w={"55px"}
              h={"55px"}
              textAlign="center"
            >
              <CloseIcon boxSize={"20px"} color={"white"} />
            </Flex>
          </Box>
          <Heading color={"red.300"} textAlign={"center"} mt={6} mb={2}>
            Client introuvable
          </Heading>
          <Text color={"gray.500"}>
            Le client que vous voulez consulter n'existe pas.
          </Text>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxW={"7xl"}>
      <Box mb="4">
        <Heading size={"md"}>Ajouter un client</Heading>
      </Box>
      <ClientForm client={client} params={queryParams.get("q")} />
    </Container>
  );
}

function ClientForm({ client, params }: any) {
  const methods = useForm<any>({
    defaultValues: {
      firstname: params ? client.firstname : "",
      lastname: params ? client.lastname : "",
      email: params ? client.email : "",
      address: params ? client.address : "",
      phone: params ? client.phone : "",
      password: "",
    },
  });
  const history = useHistory();
  const toast = useToast();
  const createUserFields: IInputField[] = [
    {
      type: "text",
      name: "lastname",
      placeholder: "Nom",
      rules: {
        required: "Veuillez saisir votre nom",
      },
    },
    {
      type: "text",
      name: "firstname",
      placeholder: "Prénom",
      rules: {
        required: "Veuillez saisir votre prénom",
      },
    },
    {
      type: "text",
      name: "email",
      placeholder: "Adresse mail",
      rules: {
        required: "Veuillez saisir votre adresse email",
      },
    },
    {
      type: "text",
      name: "address",
      placeholder: "Adresse",
      rules: {
        required: "Veuillez saisir votre adresse",
      },
    },
    {
      type: "password",
      name: "password",
      placeholder: "Mot de passe",
      rules: {
        required: params ? false : "Veuillez saisir un mot de passe",
      },
    },
    {
      type: "text",
      name: "phone",
      placeholder: "Numéro téléphone",
      rules: {
        required: "Veuillez saisir votre numéro de téléphone",
      },
    },
  ];

  const { mutateAsync: createNewClient, isLoading: createLoading } =
    useMutation(createClient, {
      onSuccess: () => {
        toast({
          title: "Nouveau client crée.",
          status: "success",
          duration: 4000,
          isClosable: true,
          position: "bottom-right",
        });
        history.goBack();
      },
      onError: (err: any) => {
        toast({
          isClosable: true,
          position: "bottom-right",
          description: err.response.data.message,
          status: "warning",
          title: "Impossible",
          duration: 4000,
        });
      },
    });

  const { mutateAsync: modifyClient, isLoading: isLoadingUpdate } = useMutation(
    updateClient,
    {
      onSuccess: () => {
        toast({
          title: "Client modifié.",
          status: "success",
          duration: 4000,
          isClosable: true,
          position: "bottom-right",
        });
        history.goBack();
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

  const onSubmit = (data: any) => {
    if (params) {
      if (data.password === "") {
        delete data.password;
      }
      modifyClient({ ...data, _id: params });
    } else {
      // add
      createNewClient(data);
    }
  };

  return (
    <Box bg="white" p="6" rounded={"xl"}>
      <FormProvider {...methods}>
        <Stack
          as="form"
          onSubmit={methods.handleSubmit(onSubmit)}
          mt="4"
          spacing={4}
        >
          <Grid
            templateColumns="repeat(2, 1fr)"
            templateRows={"repeat(3,1fr)"}
            gap={4}
          >
            {createUserFields.map((field: any) => (
              <GridItem key={field.name}>
                <Field
                  {...field}
                  value={field.name === "role" ? methods.getValues("role") : ""}
                />
              </GridItem>
            ))}
          </Grid>
          <HStack justify={"flex-end"}>
            <Button
              variant={"outline"}
              colorScheme="twitter"
              onClick={() => history.goBack()}
              disabled={createLoading || isLoadingUpdate}
            >
              Annuler
            </Button>
            <Button
              variant={"solid"}
              colorScheme="twitter"
              type="submit"
              isLoading={createLoading || isLoadingUpdate}
              loadingText={
                params ? "Modification en cours" : "Création en cours"
              }
            >
              {params ? "Modifier" : "Créer"}
            </Button>
          </HStack>
        </Stack>
      </FormProvider>
    </Box>
  );
}

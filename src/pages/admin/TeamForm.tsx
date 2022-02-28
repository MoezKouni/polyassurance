import { CloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { FormProvider, useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { useHistory } from "react-router-dom";
import Field from "../../components/Fields";
import PermissionBlock from "../../components/PermissionBlock/PermissionBlock";
import { getPermissions } from "../../services/permissions/services";
import {
  createNewTeammember,
  getOneTeammember,
  updateTeammember,
} from "../../services/team/services";
import { IInputField } from "../../types";
import useQueryParams from "../../utils/useQueryParams";

export default function TeamContainer() {
  const queryParams = useQueryParams();
  const {
    data: agent,
    isLoading: isLoadingagent,
    isError,
  } = useQuery(
    `agent-${queryParams.get("q")}`,
    () => getOneTeammember(queryParams.get("q") || ""),
    {
      refetchOnWindowFocus: false,
      retry: false,
      enabled: Boolean(queryParams.get("q")),
    }
  );

  const { data: permissions, isLoading: loadingPermission } = useQuery(
    "permissions",
    getPermissions,
    { refetchOnWindowFocus: false, retry: false }
  );

  if (isLoadingagent || loadingPermission) return <h1>Loading...</h1>;
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
            Administratur introuvable
          </Heading>
          <Text color={"gray.500"}>
            L'administrateur que vous voulez consulter n'existe.
          </Text>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxW={"7xl"}>
      <Box mb="4">
        <Heading size={"md"}>Ajouter un agent ou admin</Heading>
      </Box>
      <TeamForm
        agent={agent}
        params={queryParams.get("q")}
        permissions={permissions}
      />
    </Container>
  );
}

function TeamForm({ agent, params, permissions }: any) {
  const methods = useForm<any>({
    defaultValues: {
      firstname: params ? agent.firstname : "",
      lastname: params ? agent.lastname : "",
      email: params ? agent.email : "",
      phone: params ? agent.phone : "",
      password: "",
      role: params ? agent.role : "",
      permissions: params ? agent.permissions.map((x: any) => x._id) : [],
    },
  });
  const history = useHistory();
  const input = methods.watch("role");
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
    {
      type: "select",
      name: "role",
      placeholder: "Rôle",
      options: [
        {
          id: 1,
          label: "Administrateur",
          value: "admin",
        },
        {
          id: 2,
          label: "Agent",
          value: "agent",
        },
      ],
      rules: {
        required: "Veuillez sélectionner le rôle",
      },
    },
  ];
  const permissionSections = ["team", "clients", "documents", "produits"];

  const { mutateAsync: createMember, isLoading: createLoading } = useMutation(
    createNewTeammember,
    {
      onSuccess: () => {
        toast({
          title: "Nouveau agent crée.",
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
    }
  );

  const { mutateAsync: mutateUpdate, isLoading: isLoadingUpdate } = useMutation(
    updateTeammember,
    {
      onSuccess: () => {
        toast({
          title: "Membre modifié.",
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
      // edit
      if (data.password === "") {
        delete data.password;
      }
      mutateUpdate({...data, _id: params});
    } else {
      // add
      createMember(data);
    }
  };

  return (
    <Box bg="white" p="6" rounded={"xl"}>
      {/* <Heading size={"md"}>Ajouter un agent ou admin</Heading> */}
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
          {input === "agent" && (
            <Box>
              {permissionSections.map((section: string, i: number) => (
                <PermissionBlock
                  permissions={permissions}
                  section={section}
                  key={i}
                />
              ))}
            </Box>
          )}
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

import {
  Box,
  Button,
  Container,
  FormLabel,
  Heading,
  Stack,
} from "@chakra-ui/react";
import { FormProvider, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useHistory, useParams } from "react-router-dom";
import Field from "../../components/Fields";
import { useAuthProvider } from "../../providers/AuthProvider";
import { createDemande } from "../../services/demandes/services";
import { IInputField } from "../../types";
import axiosInstance from "../../utils/axiosInstance";

const automobileFields: IInputField[] = [
  {
    type: "text",
    name: "num_matricule",
    placeholder: "Numéro d'immatriculation",
    rules: {
      required: "Veuillez saisir le numéro d'immatriculation",
    },
  },
  {
    type: "text",
    name: "puissance",
    placeholder: "Puissance fiscale",
    rules: {
      required: "Veuillez saisir la puissance fiscale",
    },
  },
  {
    type: "text",
    name: "num_chassie",
    placeholder: "Numéro de chassie",
    rules: {
      required: "Veuillez saisir le numéro de chassie",
    },
  },
  {
    type: "text",
    name: "mark",
    placeholder: "La marque",
    rules: {
      required: "Veuillez saisir la marque",
    },
  },
  {
    type: "text",
    name: "model",
    placeholder: "Modèle",
    rules: {
      required: "Veuillez saisir la modèle",
    },
  },
  {
    type: "text",
    name: "nb_place",
    placeholder: "Nombre des places",
    rules: {
      required: "Veuillez saisir le nombre des places",
    },
  },
  {
    type: "select",
    name: "carburant",
    placeholder: "Carburant",
    options: [
      {
        id: 1,
        label: "Essence",
        value: "essence",
      },
      {
        id: 2,
        label: "Gasoil",
        value: "gasoil",
      },
    ],
    rules: {
      required: "Veuillez sélectionner la carburant",
    },
  },
  {
    type: "text",
    name: "year",
    placeholder: "Année de mise en circulation",
    rules: {
      required: "Veuillez sélectionner l'année de mise en circulation",
    },
  },
  {
    type: "text",
    name: "valeur",
    placeholder: "La valeur estimée",
    rules: {
      required: "Veuillez sélectionner la valeur",
    },
  },
];

const immoFields: IInputField[] = [
  {
    type: "text",
    name: "adresse",
    placeholder: "Adresse compléte",
    rules: {
      required: "Veuillez saisir l'adresse",
    },
  },
  {
    type: "select",
    name: "maison",
    placeholder: "Type d'immobilier",
    options: [
      {
        id: 1,
        label: "Appartement",
        value: "appartement",
      },
      {
        id: 2,
        label: "Villa",
        value: "villa",
      },
      {
        id: 3,
        label: "Résidence",
        value: "résidence",
      },
    ],
    rules: {
      required: "Veuillez sélectionner type d'immobilier",
    },
  },
  {
    type: "text",
    name: "nb_piece",
    placeholder: "Nombre des pièces",
    rules: {
      required: "Veuillez saisir le nombre des pièces",
    },
  },
  {
    type: "text",
    name: "superficie",
    placeholder: "Superficie",
    rules: {
      required: "Veuillez saisir la superficie",
    },
  },
  {
    type: "text",
    name: "valeur",
    placeholder: "Valeur estimée",
    rules: {
      required: "Veuillez saisir la valeur estimée",
    },
  },
];
export default function Demande() {
  const autoMethods = useForm<any>({
    defaultValues: {
      num_matricule: "",
      puissance: "",
      num_chassie: "",
      mark: "",
      model: "",
      nb_place: "",
      carburant: "",
      year: "",
      valeur: "",
      cin: null,
      carte_grise: null,
    },
  });
  const immoMethods = useForm<any>({
    defaultValues: {
      adresse: "",
      maison: "",
      nb_piece: "",
      superficie: "",
      valeur: "",
      plan: null,
    },
  });
  const { type } = useParams<{ type: string }>();
  const history = useHistory();
  const { data: auth } = useAuthProvider();
  const methods = type === "habitation" ? immoMethods : autoMethods;

  const uploadImage = async (file: any, fieldName: string) => {
    const formData = new FormData();
    formData.append(fieldName, file);
    const response = await axiosInstance({
      method: "post",
      url: `/documents/${fieldName}/upload`,
      data: formData,
    });
    return response.data;
  };

  const onSubmit = (data: any) => {
    if (!auth) {
      history.push("/connexion");
      return;
    }
    const formData = new FormData();
    Object.keys(data).map((el: any) => formData.append(el, data[el]));
    // let docs: any = [];
    // if (data.cin) {
    //   const res = await uploadImage(methods.getValues("cin"), "cin");
    //   docs.push(res.file.url);
    // }
    // if (data.plan) {
    //   const res = await uploadImage(methods.getValues("plan"), "plan");
    //   docs.push(res.file.url);
    // }
    // if (data.carte_grise) {
    //   const res = await uploadImage(
    //     methods.getValues("carte_grise"),
    //     "carte_grise"
    //   );
    //   docs.push(res.file.url);
    // }
    // formData.append("documents", docs);
    // formData.append("user", auth._id)
    // console.log(docs)
    createNewDemande(formData);
  };

  const { mutateAsync: createNewDemande, isLoading: demandeLoading } =
    useMutation(createDemande);

  const handleFileChange = (e: any) => {
    methods.setValue(e.target.name, e.target.files[0]);
  };
  return (
    <Container maxW={"3xl"}>
      <Heading
        textAlign={"center"}
        size={"lg"}
        textTransform="uppercase"
        my="6"
      >
        Demande {type.toUpperCase()} assurance
      </Heading>
      <FormProvider {...methods}>
        <Stack
          spacing={4}
          mb="8"
          as="form"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          {type === "automobile"
            ? automobileFields.map((field: any) => (
                <Field
                  {...field}
                  key={field.name}
                  value={
                    field.name === "carburant"
                      ? methods.getValues("carburant")
                      : ""
                  }
                />
              ))
            : immoFields.map((field: any) => (
                <Field
                  {...field}
                  key={field.name}
                  value={
                    field.name === "maison" ? methods.getValues("maison") : ""
                  }
                />
              ))}
          {type === "automobile" ? (
            <>
              {/* <Box bg="gray.100" p="2" rounded="lg">
                <FormLabel>Carte grise</FormLabel>
                <input
                  type="file"
                  name="carte_grise"
                  onChange={handleFileChange}
                />
              </Box> */}
              <Box bg="gray.100" p="2" rounded="lg">
                <FormLabel>Carte d'identitée nationale</FormLabel>
                <input type="file" name="cin" onChange={handleFileChange} />
              </Box>
            </>
          ) : (
            <>
              <Box bg="gray.100" p="2" rounded="lg">
                <FormLabel>Plan</FormLabel>
                <input type="file" name="plan" onChange={handleFileChange} />
              </Box>
            </>
          )}
          <Button
            variant="solid"
            alignSelf={"center"}
            px="8"
            colorScheme={"twitter"}
            type="submit"
          >
            Envoyer
          </Button>
        </Stack>
      </FormProvider>
    </Container>
  );
}

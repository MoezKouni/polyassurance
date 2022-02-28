import {
  Stack,
  Text,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { Link, useHistory } from "react-router-dom";
import Field from "../../components/Fields";
import AuthLayout from "../../Layouts/AuthLayout";
import { registerUser } from "../../services/auth/services";
import { IInputField } from "../../types";

const registerFields: IInputField[] = [
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
    name: "phone",
    placeholder: "Numéro téléphone",
    rules: {
      required: "Veuillez saisir votre numéro de téléphone",
    },
  },
  {
    type: "password",
    name: "password",
    placeholder: "Mot de passe",
    rules: {
      required: "Veuillez saisir votre mot de passe",
    },
  },
];

export default function Register() {
  const methods = useForm({
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      password: "",
    },
  });
  const toast = useToast();
  const history = useHistory();

  const onSubmit = (data: any) => {
    register(data);
  };

  const { mutateAsync: register, isLoading: registerLoading } = useMutation(
    registerUser,
    {
      onError: (err: any) => {
        if (err.response.data.message.includes("Adresse email déjà utilisé")) {
          const errorsArray = err.response.data.message.split(",");
          const errorsField = Object.fromEntries(
            errorsArray.map((x: any) => x.split(":"))
          );
          methods.setError("email", { message: errorsField.email });
          toast({
            title: "Erreur lors de la création du compte.",
            description: errorsField.msg,
            status: "error",
            duration: 9000,
            isClosable: true,
            position: "bottom",
          });
        } else if (typeof err.response.data.message === "string") {
          const xxx = err.response.data.message.split(":");
          methods.setError(xxx[0], { message: xxx[1] });
          toast({
            title: "Erreur lors de la création du compte.",
            description: xxx[1],
            status: "error",
            duration: 9000,
            isClosable: true,
            position: "bottom",
          });
        } else {
          const errorsArray = err.response.data.message.map((el: string) =>
            el.split(":")
          );
          const errorsField = errorsArray.reduce(
            (a: any, v: any) => ({ ...a, [v[0]]: v[1].trim() }),
            {}
          );
          Object.keys(errorsField).map((field: any) =>
            methods.setError(field, { message: errorsField[field] })
          );
          toast({
            title: "Erreur lors de la création du compte.",
            description:
              Object.keys(errorsField).length > 1
                ? "Votre saisie est incorrecte merci de vérifier les données saisies"
                : errorsField[Object.keys(errorsField)[0]],
            status: "error",
            duration: 9000,
            isClosable: true,
            position: "bottom",
          });
        }
      },
      onSuccess: async (res) => {
        await localStorage.setItem("token", res.access_token);
        history.push("/");
      },
    }
  );
  useEffect(() => {
    if (localStorage.getItem("token")) {
      history.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localStorage.getItem("token")]);
  return (
    <AuthLayout title="Inscription">
      <FormProvider {...methods}>
        <Stack
          as={"form"}
          mt={10}
          spacing={4}
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          {registerFields.map((field: IInputField) => (
            <Field {...field} key={field.name} />
          ))}
          <Text textAlign={"right"} color="gray.500">
            Déjà inscript ?{" "}
            <Link to="/connexion">
              <Text as="span" color={"blue.400"}>
                Connexion
              </Text>
            </Link>
          </Text>
          <Button
            fontFamily={"heading"}
            type="submit"
            mt={8}
            w={"full"}
            bgGradient="linear(to-r, blue.400,teal.400)"
            color={"white"}
            _hover={{
              bgGradient: "linear(to-r, blue.400,teal.400)",
              boxShadow: "xl",
            }}
            _active={{ boxShadow: "none" }}
            disabled={registerLoading}
            isLoading={registerLoading}
            loadingText={"Inscription en cours"}
          >
            S'inscrire
          </Button>
        </Stack>
      </FormProvider>
    </AuthLayout>
  );
}
import { Stack, Button, Text, useToast } from "@chakra-ui/react";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { Link, useHistory } from "react-router-dom";
import Field from "../../components/Fields";
import AuthLayout from "../../Layouts/AuthLayout";
import { loginUser } from "../../services/auth/services";
import { IInputField } from "../../types";

const loginFields: IInputField[] = [
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
      required: "Veuillez saisir votre mot de passe",
    },
  },
];

export default function Login() {
  const methods = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const toast = useToast();
  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      history.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localStorage.getItem("token")]);

  const onSubmit = (data: any) => {
    login(data);
  };

  const { mutateAsync: login, isLoading: loginLoading } = useMutation(
    loginUser,
    {
      onError: ({
        response: {
          data: { message },
        },
      }) => {
        toast({
          title: "Impossible de se connecter.",
          description: message,
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "bottom",
        });
      },
      onSuccess: (res) => {
        localStorage.setItem("token", res.access_token);
        history.push("/");
        history.go(0)
      },
    }
  );
  return (
    <AuthLayout title="Connexion">
      <FormProvider {...methods}>
        <Stack
          as={"form"}
          mt={10}
          spacing={4}
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          {loginFields.map((field: IInputField) => (
            <Field {...field} key={field.name} />
          ))}
          <Text textAlign={"right"} color="gray.500">
            Nouveau client ?{" "}
            <Link to="/inscription">
              <Text as="span" color={"blue.400"}>
                Inscription
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
            disabled={loginLoading}
            isLoading={loginLoading}
            loadingText={"Connexion en cours"}
          >
            Se connecter
          </Button>
        </Stack>
      </FormProvider>
    </AuthLayout>
  );
}

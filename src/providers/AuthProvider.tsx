import { createContext, useContext } from "react";
import { useQuery } from "react-query";
import { Redirect } from "react-router-dom";
import { loadUser } from "../services/auth/services";
import { AuthContextType, AuthProviderProps, UseQueryDataType } from "../types";

const auth = createContext<AuthContextType>({} as AuthContextType);

export const useAuthProvider = () => useContext(auth);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const { isLoading, data, isSuccess, remove, isError, error } = useQuery<
    UseQueryDataType | undefined
  >(["user"], loadUser, {
    refetchOnWindowFocus: false,
    enabled: Boolean(localStorage.getItem("token")),
    retry: false,
  });
  if (isLoading) {
    return <h1>...loading</h1>;
  }
  if (
    !localStorage.getItem("token") ||
    (isError && (error as any).response.status === 401)
  ) {
    localStorage.removeItem("token");
    // return <Redirect to="/" />;
  }
  // if (isSuccess) {
    return <auth.Provider value={{ data, remove }}>{children}</auth.Provider>;
  // }


  // return <h1>Error</h1>;
};

export default AuthProvider;

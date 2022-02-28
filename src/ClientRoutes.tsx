import { ReactNode } from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import { useAuthProvider } from "./providers/AuthProvider";

const ClientRoutes = ({ children }: { children: ReactNode }) => {
  const { data } = useAuthProvider();
  return (
    <BrowserRouter>
      <Route
        render={({ location: { pathname, hash, search } }) => {
          const ends_with_slash =
            pathname.slice(-1) === "/" && pathname !== "/";
          // return !data || data?.role === "client" ? (
          // <Redirect to={`${pathname.slice(0, -1)}${search}${hash}`} />
          return children;
          // ) : (
          // <h1>You are not authorized !</h1>
          // );
        }}
      />
    </BrowserRouter>
  );
};

export default ClientRoutes;

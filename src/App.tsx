import { Route, Switch } from "react-router-dom";
import "./App.css";
import ClientRoutes from "./ClientRoutes";
import HomeContainer from "./containers/authorized/HomeContainer";
import Navbar from "./components/Navbar/Navbar";
import AdminRoutes from "./AdminRoutes";
import { useAuthProvider } from "./providers/AuthProvider";
import Dashboard from "./pages/admin/Dashboard";
import AdminLayout from "./Layouts/AdminLayout";
import Team from "./pages/admin/Team";
import TeamForm from "./pages/admin/TeamForm";
import Clients from "./pages/admin/Clients";
import ClientContainer from "./pages/admin/ClientForm";
import ClientDetails from "./pages/admin/ClientDetails";
import Demandes from "./pages/admin/Demandes";
import DemandeDetails from "./pages/admin/DemandeDetails";

function App() {
  const { data } = useAuthProvider();
  return (
    <>
      {(!data || data?.role === "client") && (
        <ClientRoutes>
          <Navbar />
          <Switch>
            <Route path={"/"}>
              <HomeContainer />
            </Route>
          </Switch>
        </ClientRoutes>
      )}
      {data && (data?.role === "admin" || data?.role === "agent") && (
        <AdminRoutes>
          <Switch>
            <Route exact path={"/"}>
              <AdminLayout>
                <Dashboard />
              </AdminLayout>
            </Route>
            <Route exact path={"/equipe"}>
              <AdminLayout>
                <Team />
              </AdminLayout>
            </Route>
            <Route exact path={"/clients"}>
              <AdminLayout>
                <Clients />
              </AdminLayout>
            </Route>
            <Route exact path={"/clients/details/:id"}>
              <AdminLayout>
                <ClientDetails />
              </AdminLayout>
            </Route>
            <Route exact path={"/clients/ajouter"}>
              <AdminLayout>
                <ClientContainer />
              </AdminLayout>
            </Route>
            <Route exact path={"/clients/modifier"}>
              <AdminLayout>
                <ClientContainer />
              </AdminLayout>
            </Route>
            <Route path={"/equipe/ajouter"}>
              <AdminLayout>
                <TeamForm />
              </AdminLayout>
            </Route>
            <Route path={"/equipe/modifier"}>
              <AdminLayout>
                <TeamForm />
              </AdminLayout>
            </Route>
            <Route exact path={`/demandes`}>
              <AdminLayout>
                <Demandes />
              </AdminLayout>
            </Route>
            <Route exact path={`/demandes/details/:id`}>
              <AdminLayout>
                <DemandeDetails />
              </AdminLayout>
            </Route>
            <Route path={"/produits"}>
              <AdminLayout>
                <h1>PRODUITS</h1>
              </AdminLayout>
            </Route>
            <Route>
              <h1>Page Not Found</h1>
            </Route>
          </Switch>
        </AdminRoutes>
      )}
    </>
  );
}

export default App;

import { Route, Switch, useRouteMatch } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Login from "../../pages/auth/Login";
import Register from "../../pages/auth/Register";
import Demande from "../../pages/demandes/Demande";
import HomePage from "../../pages/HomePage/HomePage";
import ProduitDetails from "../../pages/Produits/ProduitDetails";
import ProduitsContainer from "./ProduitsContainer";

export default function HomeContainer() {
  const { path } = useRouteMatch();

  return (
    <>
      <Switch>
        <Route exact path={`${path}`}>
          <HomePage />
        </Route>
        <Route path={`${path}inscription`}>
          <Register />
        </Route>
        <Route path={`${path}connexion`}>
          <Login />
        </Route>
        <Route exact path={`${path}nos-produits`}>
          <ProduitsContainer />
        </Route>
        <Route exact path={`${path}nos-produits/:type`}>
          <ProduitDetails />
          <Footer />
        </Route>
        <Route path={`${path}nos-produits/:type/demander`}>
          <Demande />
          <Footer />
        </Route>
       
        <Route>
          <h1>Page Not Found</h1>
        </Route>
      </Switch>
    </>
  );
}

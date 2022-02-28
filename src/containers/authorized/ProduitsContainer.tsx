import { Route, Switch, useRouteMatch } from "react-router-dom";
import Produits from "../../pages/Produits/Produits";

export default function ProduitsContainer() {
  const { path } = useRouteMatch();

  return (
    <>
      <Switch>
        <Route exact path={`${path}`}>
          <Produits />
        </Route>
        <Route path={`${path}/loul`}>
          <h1>Nos produit LOUL</h1>
        </Route>
        <Route>
          <h1>Page Not Found</h1>
        </Route>
      </Switch>
    </>
  );
}

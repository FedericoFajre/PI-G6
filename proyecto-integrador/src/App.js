import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./screen/Home/Home";
import Catalogo from "./screen/Catalogo/Catalogo";
import NotFound from "./screen/NotFound/NotFound";

function App() {
  return(
    <React.Fragment>
     <Switch>
      <Route path="/" exact= {true} component={Home}/>
      <Route path="/catalogo"  component={Catalogo}/>
      <Route path="" component={NotFound}/>
     </Switch>
    </React.Fragment>
  )
};

export default App;
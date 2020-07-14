import React, {useEffect} from 'react';
import { Route, Switch } from "react-router-dom";
import Landing from './pages/Landing';
import WilderProductPage from './pages/WilderProductPage';

const App = () => {

  return (
    <div>
      <Switch>
        <Route path="/" exact>
          <Landing/>
        </Route>
        <Route path="/wilder">
          <WilderProductPage/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
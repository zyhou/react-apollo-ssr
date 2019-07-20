import React from "react";
import { Route, Link } from "react-router-dom";

import Home from "./pages/Home";
import Fromages from "./pages/Fromages";

const App = () => (
  <div>
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/fromages">Fromages</Link>
        </li>
      </ul>
    </nav>

    <Route path="/" exact component={Home} />
    <Route path="/fromages" component={Fromages} />
  </div>
);

export default App;

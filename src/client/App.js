import React from "react";
import { Route, Link } from "react-router-dom";

import Fromage from "./pages/Fromage";
import Fromages from "./pages/Fromages";

const App = () => (
  <div>
    <nav>
      <ul>
        <li>
          <Link to="/">Fromages</Link>
        </li>
      </ul>
    </nav>

    <Route path="/" exact component={Fromages} />
    <Route path="/:id" component={Fromage} />
  </div>
);

export default App;

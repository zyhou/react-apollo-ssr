import React from "react";
import { Route, Link } from "react-router-dom";
import loadable from "@loadable/component";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";

const Fromage = loadable(() =>
  import(/* webpackChunkName: "Fromage" */ "./pages/Fromage")
);
const Fromages = loadable(() =>
  import(/* webpackChunkName: "Fromages" */ "./pages/Fromages")
);

const style = theme => css`
  color: ${theme.color};
`;

const App = () => (
  <div css={theme => style(theme)}>
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

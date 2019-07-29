import React from "react";
import { Route, Link as LinkRouter } from "react-router-dom";
import loadable from "@loadable/component";
import styled from "@emotion/styled";

const Fromage = loadable(() =>
  import(/* webpackChunkName: "Fromage" */ "./pages/Fromage")
);
const Fromages = loadable(() =>
  import(/* webpackChunkName: "Fromages" */ "./pages/Fromages")
);

const Link = styled(LinkRouter)`
  color: hsl(192, 17%, 99%);
`;

const App = () => (
  <React.Fragment>
    <section className="hero is-info is-small">
      <div className="hero-body">
        <div className="container has-text-centered">
          <p className="title">
            <Link to="/">Fromages</Link>
          </p>
        </div>
      </div>
    </section>

    <Route path="/" exact component={Fromages} />
    <Route path="/:id" component={Fromage} />
  </React.Fragment>
);

export default App;

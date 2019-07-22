import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import { loadableReady } from "@loadable/component";

import App from "./App";

const client = new ApolloClient({
  link: createHttpLink({ uri: "https://ku0n6.sse.codesandbox.io/" }),
  cache: new InMemoryCache().restore(window.__APOLLO_STATE__)
});

loadableReady(() => {
  ReactDOM.hydrate(
    <ApolloProvider client={client}>
      <Router>
        <App />
      </Router>
    </ApolloProvider>,
    document.getElementById("root")
  );
});

if (module.hot) {
  module.hot.accept();
}

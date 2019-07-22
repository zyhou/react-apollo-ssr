import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import { loadableReady } from "@loadable/component";
import { ThemeProvider } from "emotion-theming";
import { hydrate } from "emotion";
import { CacheProvider } from "@emotion/core";

import App from "./App";
import { cache } from "../shared/test";

const client = new ApolloClient({
  link: createHttpLink({ uri: "https://ku0n6.sse.codesandbox.io/" }),
  cache: new InMemoryCache().restore(window.__APOLLO_STATE__)
});

const theme = {
  color: "hotpink"
};

hydrate(window.__CLASS_IDS__);

loadableReady(() => {
  ReactDOM.hydrate(
    <CacheProvider value={cache}>
      <ApolloProvider client={client}>
        <Router>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </Router>
      </ApolloProvider>
    </CacheProvider>,
    document.getElementById("root")
  );
});

if (module.hot) {
  module.hot.accept();
}

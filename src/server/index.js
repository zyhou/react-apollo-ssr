import express from "express";
import ReactDOMServer from "react-dom/server";
import React from "react";
import { StaticRouter } from "react-router";
import { ApolloProvider, getDataFromTree } from "react-apollo";
import ApolloClient from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import fetch from "node-fetch";

import App from "../client/App";
import { getHtmlDocument } from "./htmlDocument";

const app = express();
const port = 3000;

const client = new ApolloClient({
  ssrMode: true,
  link: createHttpLink({
    uri: "https://ku0n6.sse.codesandbox.io/",
    fetch
  }),
  cache: new InMemoryCache()
});

if (process.env.NODE_ENV !== "production") {
  const webpackConfig = require("../../webpack.config.js");
  const webpackDevMiddleware = require("webpack-dev-middleware");
  const webpackHotMiddleware = require("webpack-hot-middleware");
  const webpack = require("webpack");
  const compiler = webpack(webpackConfig);

  app.use(
    webpackDevMiddleware(compiler, {
      publicPath: webpackConfig.output.publicPath,
      serverSideRender: true
    })
  );

  app.use(webpackHotMiddleware(compiler));
}

app.use("/static", express.static("public"));

app.get("*", async (req, res) => {
  const context = {};

  const components = (
    <ApolloProvider client={client}>
      <StaticRouter location={req.url} context={context}>
        <App />
      </StaticRouter>
    </ApolloProvider>
  );

  await getDataFromTree(components);
  const apolloState = client.extract();

  const html = ReactDOMServer.renderToString(components);
  const htmlDocument = getHtmlDocument(html, apolloState);

  return res.send(htmlDocument);
});

app.listen(port, () => console.log(`Listen on port ${port}!`));

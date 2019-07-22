import path from "path";
import express from "express";
import ReactDOMServer from "react-dom/server";
import React from "react";
import { StaticRouter } from "react-router";
import { ApolloProvider, getDataFromTree } from "react-apollo";
import ApolloClient from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import fetch from "node-fetch";
import { Helmet } from "react-helmet";
import { ChunkExtractor } from "@loadable/server";
import { CacheProvider } from "@emotion/core";
import createEmotionServer from "create-emotion-server";

import App from "../client/App";
import { getHtmlDocument } from "./htmlDocument";
import { cache } from "../shared/test";

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
      serverSideRender: true,
      writeToDisk(filePath) {
        return /loadable-stats/.test(filePath);
      }
    })
  );

  app.use(webpackHotMiddleware(compiler));
}

app.use("/static", express.static("public"));

app.get("*", async (req, res) => {
  const statsFile = path.resolve(__dirname, "../../dist/loadable-stats.json");
  const extractor = new ChunkExtractor({ statsFile });
  const context = {};
  const { extractCritical } = createEmotionServer(cache);

  const components = (
    <CacheProvider value={cache}>
      <ApolloProvider client={client}>
        <StaticRouter location={req.url} context={context}>
          <App />
        </StaticRouter>
      </ApolloProvider>
    </CacheProvider>
  );

  const jsx = extractor.collectChunks(components);

  await getDataFromTree(jsx);
  const apolloState = client.extract();

  const content = ReactDOMServer.renderToString(jsx);
  const helmet = Helmet.renderStatic();
  const { html, css, ids } = extractCritical(content);
  console.log({ css, ids });

  const htmlDocument = getHtmlDocument({
    html,
    css,
    serializedClassIds: JSON.stringify(ids),
    apolloState,
    helmet,
    extractor
  });

  return res.send(htmlDocument);
});

app.listen(port, () => console.log(`Listen on port ${port}!`));

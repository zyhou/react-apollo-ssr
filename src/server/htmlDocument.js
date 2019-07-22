export const getHtmlDocument = ({
  html,
  css,
  serializedClassIds,
  apolloState,
  helmet,
  extractor
}) => `
<!DOCTYPE html>
<html ${helmet.htmlAttributes.toString()}>
    <head>
        ${helmet.title.toString()}
        <meta charset="UTF-8" />
        ${helmet.meta.toString()}
        <link rel="icon" href="/static/favicon.ico" />
        ${helmet.link.toString()}
        <style>${css}</style>
    </head>
    <body ${helmet.bodyAttributes.toString()}>
        <div id="root">${html}</div>
        <noscript>
            You need to enable JavaScript to run this app.
        </noscript>
        <script type="text/javascript">window.__APOLLO_STATE__=${JSON.stringify(
          apolloState
        )}</script>
         <script>
            window.__CLASS_IDS__ = ${serializedClassIds}
        </script>
        ${extractor.getScriptTags()}
    </body>
</html>
`;

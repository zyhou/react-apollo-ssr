export const getHtmlDocument = (html, apolloState) => `
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8" />
        <title>Listing formages</title>
        <link rel="icon" href="/static/favicon.ico" />
    </head>
    <body>
        <div id="root">${html}</div>
        <noscript>
            You need to enable JavaScript to run this app.
        </noscript>
        <script type="text/javascript">window.__APOLLO_STATE__=${JSON.stringify(
          apolloState
        )}</script>
        <script src="/dist/bundle.js"></script>
    </body>
</html>
`;

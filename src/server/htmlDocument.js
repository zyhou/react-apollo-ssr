export const getHtmlDocument = ({ html, apolloState, helmet, extractor }) => `
<!DOCTYPE html>
<html ${helmet.htmlAttributes.toString()}>
    <head>
        ${helmet.title.toString()}
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1">
        ${helmet.meta.toString()}
        <link rel="icon" href="/static/favicon.ico" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.5/css/bulma.min.css">
        ${helmet.link.toString()}
        <script defer src="https://use.fontawesome.com/releases/v5.3.1/js/all.js"></script>
        <style>
            html {
                background: #EFF3F4;
            }
        </style>
    </head>
    <body ${helmet.bodyAttributes.toString()}>
        <div id="root">${html}</div>
        <noscript>
            You need to enable JavaScript to run this app.
        </noscript>
        <script type="text/javascript">window.__APOLLO_STATE__=${JSON.stringify(
          apolloState
        )}</script>
        ${extractor.getScriptTags()}
    </body>
</html>
`;

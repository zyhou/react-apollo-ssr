import express from "express";

const app = express();
const port = 3000;

const title = "Hello world";
app.get("/", (req, res) => res.json({ title }));

app.listen(port, () => console.log(`Listen on port ${port}!`));

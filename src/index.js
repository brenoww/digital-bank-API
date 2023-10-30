const express = require("express");
const port = 3000;
const app = express();
const rotas = require("./rotas");

app.use(express.json());

app.use(rotas);

app.listen(port);
import express from "express";

const app = express();
app.listen(5432, () => console.log("Server está rodando na porta 5432"));

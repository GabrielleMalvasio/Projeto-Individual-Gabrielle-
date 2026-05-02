require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

// DEBUG (pode remover depois)
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD);

// IMPORTA ROTAS
const usuarioRouter = require("./src/routes/usuarios");

// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// ARQUIVOS FRONT-END
app.use(express.static(path.join(__dirname, "public")));

// ROTAS
app.use("/usuarios", usuarioRouter);

// PORTA
const PORT = process.env.APP_PORT || 3333;

app.listen(PORT, function () {
    console.log(`Servidor Corpo & Mente rodando em http://localhost:${PORT}`);
});
var express = require("express");
var router = express.Router();

var criancaController = require("../controllers/criancaController");

// BUSCAR CRIANÇA PELO USUÁRIO
router.get("/listarPorUsuario/:idUsuario", function (req, res) {
    criancaController.listarPorUsuario(req, res);
});

// CADASTRAR CRIANÇA
router.post("/cadastrar", function (req, res) {
    criancaController.cadastrar(req, res);
});

module.exports = router;
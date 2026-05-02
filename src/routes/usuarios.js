var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

// CADASTRO
router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
});

// LOGIN
router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});

module.exports = router;
var express = require("express");
var router = express.Router();

var votoController = require("../controllers/votoController");

router.post("/registrar", function (req, res) {
    votoController.registrar(req, res);
});

router.get("/variacao", function (req, res) {
    votoController.variacao(req, res);
});

router.get("/medias", function (req, res) {
    votoController.medias(req, res);
});

module.exports = router;
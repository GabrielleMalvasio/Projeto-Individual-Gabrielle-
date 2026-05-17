var express = require("express");
var router = express.Router();

var votoController = require("../controllers/votoController");


// REGISTRAR VOTO
router.post("/registrar", function (req, res) {
    votoController.registrar(req, res);
});


// KPI VARIAÇÃO 
router.get("/variacao", function (req, res) {
    votoController.variacao(req, res);
});


router.get("/emocoesAntes", function (req, res) {
    votoController.emocoesAntes(req, res);
});


router.get("/emocoesDepois", function (req, res) {
    votoController.emocoesDepois(req, res);
});


// KPI 
router.get("/totalCriancas", function (req, res) {
    votoController.totalCriancas(req, res);
});


module.exports = router;
var usuarioModel = require("../models/usuarioModel");

function cadastrar(req, res) {

    var nome = req.body.nomeServer;
    var sobrenome = req.body.sobrenomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (!nome || !email || !senha) {
        res.status(400).send("Campos obrigatórios não preenchidos");
        return;
    }

    usuarioModel.cadastrar(nome, sobrenome, email, senha)
        .then(function (resultado) {
            res.json(resultado);
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).send("Erro no cadastro");
        });
}

function autenticar(req, res) {

    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    usuarioModel.autenticar(email, senha)
        .then(function (resultado) {

            if (resultado.length == 1) {
                res.json(resultado[0]);
            } else {
                res.status(403).send("Email ou senha inválidos");
            }

        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).send("Erro no login");
        });
}

module.exports = {
    cadastrar,
    autenticar
};
var usuarioModel = require("../models/usuarioModel");

function cadastrar(req, res) {

    var nome = req.body.nomeServer;
    var sobrenome = req.body.sobrenomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    var pais = req.body.paisServer;
    var estado = req.body.estadoServer;
    var cidade = req.body.cidadeServer;

    var nomeCrianca = req.body.nomeCriancaServer;
    var dataNascimentoCrianca = req.body.dataNascimentoCriancaServer;

    if (
        !nome ||
        !sobrenome ||
        !email ||
        !senha ||
        !pais ||
        !estado ||
        !cidade ||
        !nomeCrianca ||
        !dataNascimentoCrianca
    ) {
        res.status(400).send("Campos obrigatórios não preenchidos");
        return;
    }

    usuarioModel.cadastrar(nome, sobrenome, email, senha)
        .then(function (resultado) {

            var idUsuario = resultado.insertId;

            return usuarioModel.cadastrarEndereco(
                idUsuario,
                pais,
                estado,
                cidade
            )
            .then(function () {

                return usuarioModel.cadastrarCrianca(
                    idUsuario,
                    nomeCrianca,
                    dataNascimentoCrianca
                );
            });
        })
        .then(function () {
            res.status(200).send("Cadastro realizado com sucesso!");
        })
        .catch(function (erro) {
            console.log("ERRO COMPLETO:");
            console.log(erro);

            res.status(500).send(erro.sqlMessage);
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
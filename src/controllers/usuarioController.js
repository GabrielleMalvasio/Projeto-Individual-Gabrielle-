var usuarioModel = require("../models/usuarioModel");

function cadastrar(req, res) {

    var nome = req.body.nomeServer;
    var sobrenome = req.body.sobrenomeServer;
    var dataNascimento = req.body.dataNascimentoServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var nomeCrianca = req.body.nomeCriancaServer;

    if (
        !nome ||
        !sobrenome ||
        !dataNascimento ||
        !email ||
        !senha ||
        !nomeCrianca
    ) {
        res.status(400).send("Campos obrigatórios não preenchidos");
        return;
    }

    usuarioModel.cadastrar(
        nome,
        sobrenome,
        dataNascimento,
        email,
        senha,
        nomeCrianca
    )

    .then(function (resultado) {

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
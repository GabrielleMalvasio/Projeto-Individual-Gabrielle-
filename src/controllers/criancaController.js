var criancaModel = require("../models/criancaModel");

// LISTAR CRIANÇA PELO USUÁRIO
function listarPorUsuario(req, res) {

    var idUsuario = req.params.idUsuario;

    console.log("Buscando criança do usuário:", idUsuario);

    criancaModel.listarPorUsuario(idUsuario)
        .then(function (resultado) {

            if (resultado.length > 0) {
                res.json(resultado);
            } else {
                res.status(404).send("Nenhuma criança encontrada");
            }

        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).send("Erro ao buscar criança");
        });
}

// CADASTRAR CRIANÇA
function cadastrar(req, res) {

    var nome = req.body.nomeServer;
    var dataNascimento = req.body.dataNascimentoServer;
    var sexo = req.body.sexoServer;
    var fkUsuario = req.body.fkUsuarioServer;

    if (
        nome == undefined ||
        dataNascimento == undefined ||
        sexo == undefined ||
        fkUsuario == undefined
    ) {
        res.status(400).send("Dados da criança incompletos");
        return;
    }

    criancaModel.cadastrar(nome, dataNascimento, sexo, fkUsuario)
        .then(function (resultado) {
            res.json(resultado);
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).send("Erro ao cadastrar criança");
        });
}

module.exports = {
    listarPorUsuario,
    cadastrar
};
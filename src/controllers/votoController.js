var votoModel = require("../models/votoModel");


// REGISTRAR VOTO
function registrar(req, res) {

    var emocaoAntes = req.body.emocaoAntes;
    var emocaoDepois = req.body.emocaoDepois;
    var fkUsuario = req.body.idUsuario;
    var fkHistoria = req.body.idHistoria;

    console.log("Controller recebeu:");
    console.log("Antes:", emocaoAntes);
    console.log("Depois:", emocaoDepois);
    console.log("Usuário:", fkUsuario);
    console.log("História:", fkHistoria);

    if (
        emocaoAntes == null ||
        emocaoDepois == null ||
        fkUsuario == null ||
        fkHistoria == null
    ) {

        res.status(400).send("Dados incompletos");
        return;
    }

    votoModel.registrar(
        fkUsuario,
        fkHistoria,
        emocaoAntes,
        emocaoDepois
    )

    .then(function () {

        res.json({
            mensagem: "Voto registrado com sucesso!"
        });

    })

    .catch(function (erro) {

        console.log("ERRO NO BANCO:", erro);
        res.status(500).send(erro.sqlMessage);

    });

}

// DASHBOARD
function variacao(req, res) {

    votoModel.buscarVariacao()
        .then(function (resultado) {
            res.json(resultado);
        })
        .catch(function (erro) {
            console.log("Erro dashboard:", erro);
            res.status(500).send("Erro ao buscar dados");
        });
}



function medias(req, res) {

    votoModel.mediasEmocao()
        .then(function (resultado) {
            res.json(resultado);
        })
        .catch(function (erro) {
            console.log("Erro medias:", erro);
            res.status(500).send("Erro ao buscar médias");
        });
}

module.exports = {
    registrar,
    variacao,
    medias
};
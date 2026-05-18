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
    console.log("BODY RECEBIDO:", req.body);

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



// KPI VARIAÇÃO

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




function emocoesAntes(req, res) {

    votoModel.buscarEmocoesAntes()

    .then(function (resultado) {

        res.json(resultado);

    })

    .catch(function (erro) {

        console.log("Erro emoções antes:", erro);
        res.status(500).send("Erro ao buscar emoções");

    });
}




function emocoesDepois(req, res) {

    votoModel.buscarEmocoesDepois()

    .then(function (resultado) {

        res.json(resultado);

    })

    .catch(function (erro) {

        console.log("Erro emoções depois:", erro);
        res.status(500).send("Erro ao buscar emoções");

    });
}




function totalCriancas(req, res) {

    votoModel.buscarTotalCriancas()

    .then(function (resultado) {

        res.json(resultado);

    })

    .catch(function (erro) {

        console.log("Erro total crianças:", erro);
        res.status(500).send("Erro ao buscar total de crianças");

    });
}


module.exports = {
    registrar,
    variacao,
    emocoesAntes,
    emocoesDepois,
    totalCriancas
};
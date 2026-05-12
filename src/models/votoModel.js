var database = require("../database/config");

// REGISTRAR VOTO
function registrar(
    fkUsuario,
    fkHistoria,
    emocaoAntes,
    emocaoDepois
) {

    var instrucaoSql = `
        INSERT INTO voto
        (
            fk_usuario,
            fk_historia,
            emocao_antes,
            emocao_depois
        )

        VALUES
        (
            ${fkUsuario},
            ${fkHistoria},
            ${emocaoAntes},
            ${emocaoDepois}
        );
    `;

    console.log("Executando SQL voto:");
    console.log(instrucaoSql);

    return database.executar(instrucaoSql);
}

// DASHBOARD
function buscarVariacao() {

    var instrucaoSql = `

    SELECT

        CASE

            WHEN emocao_depois < emocao_antes
            THEN 'Melhoraram'

            WHEN emocao_depois > emocao_antes
            THEN 'Pioraram'

            ELSE 'Iguais'

        END AS variacao,

        COUNT(*) AS total

    FROM voto

    GROUP BY variacao;

`;

    return database.executar(instrucaoSql);
}



function mediasEmocao() {

    var instrucaoSql = `
        SELECT 
            AVG(emocao_antes) AS mediaAntes,
            AVG(emocao_depois) AS mediaDepois
        FROM voto;
    `;

    return database.executar(instrucaoSql);
}

module.exports = {
    registrar,
    buscarVariacao,
    mediasEmocao
};
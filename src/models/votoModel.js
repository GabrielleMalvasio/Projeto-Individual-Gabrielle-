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




// KPI VARIAÇÃO

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

    console.log(instrucaoSql);

    return database.executar(instrucaoSql);
}





function buscarEmocoesAntes() {

    var instrucaoSql = `

        SELECT
            emocao_antes,
            COUNT(*) AS total

        FROM voto

        GROUP BY emocao_antes

        ORDER BY emocao_antes;

    `;

    console.log(instrucaoSql);

    return database.executar(instrucaoSql);
}





function buscarEmocoesDepois() {

    var instrucaoSql = `

        SELECT
            emocao_depois,
            COUNT(*) AS total

        FROM voto

        GROUP BY emocao_depois

        ORDER BY emocao_depois;

    `;

    console.log(instrucaoSql);

    return database.executar(instrucaoSql);
}





function buscarTotalCriancas() {

    var instrucaoSql = `

        SELECT
            COUNT(*) AS totalCriancas
        FROM crianca;

    `;

    console.log(instrucaoSql);

    return database.executar(instrucaoSql);
}



module.exports = {
    registrar,
    buscarVariacao,
    buscarEmocoesAntes,
    buscarEmocoesDepois,
    buscarTotalCriancas
};
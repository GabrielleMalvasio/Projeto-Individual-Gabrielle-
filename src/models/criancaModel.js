var database = require("../database/config");

function listarPorUsuario(idUsuario) {

    var instrucaoSql = `
        SELECT id FROM crianca WHERE fk_usuario = ${idUsuario};
    `;

    console.log("Executando SQL:");
    console.log(instrucaoSql);

    return database.executar(instrucaoSql);
}

function cadastrar(nome, dataNascimento, sexo, fkUsuario) {

    var instrucaoSql = `
        INSERT INTO crianca (nome, data_nascimento, sexo, fk_usuario)
        VALUES (
            '${nome}',
            '${dataNascimento}',
            '${sexo}',
            ${fkUsuario}
        );
    `;

    console.log("Executando SQL de cadastro da criança:");
    console.log(instrucaoSql);

    return database.executar(instrucaoSql);
}

module.exports = {
    listarPorUsuario,
    cadastrar
};
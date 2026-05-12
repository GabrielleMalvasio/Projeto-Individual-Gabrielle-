var database = require("../database/config");

// CADASTRO
function cadastrar(
    nome,
    sobrenome,
    dataNascimento,
    email,
    senha,
    nomeCrianca
) {

    var instrucaoSql = `
        INSERT INTO usuario
        (
            nome,
            sobrenome,
            dataNascimento,
            email,
            senha,
            nomeCrianca
        )
        VALUES
        (
            '${nome}',
            '${sobrenome}',
            '${dataNascimento}',
            '${email}',
            '${senha}',
            '${nomeCrianca}'
        );
    `;

    console.log(instrucaoSql);

    return database.executar(instrucaoSql);
}

// LOGIN
function autenticar(email, senha) {

    var instrucaoSql = `
        SELECT id, nome, email, nomeCrianca
        FROM usuario
        WHERE email = '${email}'
        AND senha = '${senha}';
    `;

    return database.executar(instrucaoSql);
}

module.exports = {
    cadastrar,
    autenticar
};
var database = require("../database/config");

// CADASTRO
function cadastrar(nome, sobrenome, email, senha) {

    var instrucaoSql = `
        INSERT INTO usuario (nome, sobrenome, email, senha)
        VALUES ('${nome}', '${sobrenome}', '${email}', '${senha}');
    `;

    return database.executar(instrucaoSql);
}

// LOGIN
function autenticar(email, senha) {

    var instrucaoSql = `
        SELECT id, nome, email
        FROM usuario
        WHERE email = '${email}' AND senha = '${senha}';
    `;

    return database.executar(instrucaoSql);
}

module.exports = {
    cadastrar,
    autenticar
};
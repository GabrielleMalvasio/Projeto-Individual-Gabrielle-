var database = require("../database/config");


function cadastrar(nome, sobrenome, email, senha) {

    var instrucaoSql = `
        INSERT INTO usuario (nome, sobrenome, email, senha)
        VALUES ('${nome}', '${sobrenome}', '${email}', '${senha}');
    `;

    return database.executar(instrucaoSql);
}


function cadastrarEndereco(idUsuario, pais, estado, cidade) {

    var instrucaoSql = `
        INSERT INTO endereco (fk_usuario, pais, estado, cidade)
        VALUES (${idUsuario}, '${pais}', '${estado}', '${cidade}');
    `;

    return database.executar(instrucaoSql);
}


function cadastrarCrianca(idUsuario, nomeCrianca, dataNascimento) {

    var instrucaoSql = `
        INSERT INTO crianca (nome, data_nascimento, fk_usuario)
        VALUES ('${nomeCrianca}', '${dataNascimento}', ${idUsuario});
    `;

    return database.executar(instrucaoSql);
}


   

function autenticar(email, senha) {

    var instrucaoSql = `
        SELECT id, nome, email
        FROM usuario
        WHERE email = '${email}'
        AND senha = '${senha}';
    `;

    return database.executar(instrucaoSql);
}

module.exports = {
    cadastrar,
    cadastrarEndereco,
    cadastrarCrianca,
    autenticar
};
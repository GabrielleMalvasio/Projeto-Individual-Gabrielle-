CREATE DATABASE corpoemente;
USE corpoemente;


-- USUÁRIO 

CREATE TABLE usuario (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100),
    sobrenome VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    senha VARCHAR(100)
);


-- CRIANÇA 

CREATE TABLE crianca (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100),
    data_nascimento DATE,
    fk_usuario INT UNIQUE,

    FOREIGN KEY (fk_usuario) REFERENCES usuario(id)
);


-- ENDEREÇO

CREATE TABLE endereco (
    fk_usuario INT PRIMARY KEY,
    pais VARCHAR(50),
    estado VARCHAR(50),
    cidade VARCHAR(50),

    FOREIGN KEY (fk_usuario) REFERENCES usuario(id)
);


-- HISTÓRIA

CREATE TABLE historia (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(150) UNIQUE
);


-- VOTO 

CREATE TABLE voto (
    id INT PRIMARY KEY AUTO_INCREMENT,
    fk_usuario INT,
    fk_historia INT,
    emocao_antes INT,
    emocao_depois INT,
    dataRegistro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (fk_usuario) REFERENCES usuario(id),
    FOREIGN KEY (fk_historia) REFERENCES historia(id)
);




SELECT 
    u.id,
    u.nome,
    c.nome AS nomeCrianca,
    c.data_nascimento
FROM usuario u
JOIN crianca c ON c.fk_usuario = u.id;


SELECT 
    u.nome,
    e.pais,
    e.estado,
    e.cidade
FROM usuario u
JOIN endereco e ON e.fk_usuario = u.id;

SELECT 
    u.nome,
    h.nome AS historia,
    v.emocao_antes,
    v.emocao_depois,
    v.dataRegistro
FROM voto v
JOIN usuario u ON v.fk_usuario = u.id
JOIN historia h ON v.fk_historia = h.id;

select * from usuario;
select * from voto;
select * from endereco;
select * from historia;


SELECT
    CASE
        WHEN emocao_depois < emocao_antes THEN 'melhorou'
        WHEN emocao_depois > emocao_antes THEN 'piorou'
        ELSE 'igual'
    END AS variacao,
    COUNT(*) AS total
FROM voto
GROUP BY variacao;

CREATE VIEW vw_usuario_completo AS
SELECT
    u.id,
    u.nome,
    u.sobrenome,
    c.nome AS crianca,
    c.data_nascimento,
    e.pais,
    e.estado,
    e.cidade
FROM usuario u
LEFT JOIN crianca c ON c.fk_usuario = u.id
LEFT JOIN endereco e ON e.fk_usuario = u.id;

CREATE VIEW vw_votos AS
SELECT
    u.nome AS usuario,
    h.nome AS historia,
    v.emocao_antes,
    v.emocao_depois,
    v.dataRegistro,
    CASE
        WHEN v.emocao_depois < v.emocao_antes THEN 'melhorou'
        WHEN v.emocao_depois > v.emocao_antes THEN 'piorou'
        ELSE 'igual'
    END AS resultado
FROM voto v
JOIN usuario u ON v.fk_usuario = u.id
JOIN historia h ON v.fk_historia = h.id;



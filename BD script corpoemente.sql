CREATE DATABASE corpoemente;

USE corpoemente;

CREATE TABLE usuario (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100),
    sobrenome VARCHAR(100),
    dataNascimento DATE,
    email VARCHAR(100) UNIQUE,
    senha VARCHAR(100),
    nomeCrianca VARCHAR(100)
);



CREATE TABLE historia (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(150) UNIQUE
);

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

INSERT INTO historia (nome) VALUES
('Te amo para sempre, Pretinho'),
('A Nota 10'),
('Os Peixinhos');

INSERT INTO crianca (nome, data_nascimento, sexo, fk_usuario)
VALUES ('Teste', '2000-01-01', 'M', 1);

SELECT
    CASE
        WHEN emocao_depois < emocao_antes THEN 'melhorou'
        WHEN emocao_depois > emocao_antes THEN 'piorou'
        ELSE 'permaneceu igual'
    END AS variacao,
    COUNT(*) AS total
FROM voto
GROUP BY variacao;


SELECT * FROM usuario;
SELECT * FROM historia;
SELECT * FROM voto;

ALTER TABLE voto
ADD CONSTRAINT unica_votacao
UNIQUE (fk_crianca, fk_historia);

SELECT fk_crianca, fk_historia, COUNT(*) 
FROM voto
GROUP BY fk_crianca, fk_historia
HAVING COUNT(*) > 1;

DELETE FROM voto;
DELETE FROM voto WHERE id > 0;
ALTER TABLE voto DROP INDEX unica_votacao;
SHOW INDEX FROM voto;
DROP TABLE voto;
SHOW DATABASES;
use corpoemente;
DROP TABLE voto;
DROP TABLE crianca;
DROP TABLE usuario;
DESCRIBE usuario;

DROP TABLE IF EXISTS voto;

CREATE TABLE voto (
    id INT PRIMARY KEY AUTO_INCREMENT,
    fk_usuario INT,
    emocao INT,
    dataRegistro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (fk_usuario) REFERENCES usuario(id)
);

DROP TABLE voto;

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

DESCRIBE voto;
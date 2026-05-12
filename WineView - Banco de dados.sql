CREATE DATABASE IF NOT EXISTS WineView;
USE WineView;


-- TABELAS


CREATE TABLE Endereco (
    idEndereco INT PRIMARY KEY AUTO_INCREMENT,
    logradouro VARCHAR(100),
    numero VARCHAR(10),
    bairro VARCHAR(50),
    cep CHAR(9),
    cidade VARCHAR(45),
    estado VARCHAR(45)
);

CREATE TABLE Usuario (
    idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    nomeCompleto VARCHAR(50),
    email VARCHAR(60) UNIQUE,
    senha VARCHAR(50)
);

CREATE TABLE vinicola (
    idVinicola INT PRIMARY KEY AUTO_INCREMENT,
    nomeVinicola VARCHAR(100),
    telefone VARCHAR(15),
    cnpj CHAR(18) UNIQUE,
    qtdTanquesSuportados INT,
    fkUsuario INT UNIQUE NOT NULL,
    fkEndereco INT UNIQUE NOT NULL,

    CONSTRAINT fkVinicolaUsuario 
        FOREIGN KEY (fkUsuario) REFERENCES Usuario(idUsuario),

    CONSTRAINT fkVinicolaEndereco 
        FOREIGN KEY (fkEndereco) REFERENCES Endereco(idEndereco)
);

CREATE TABLE tanque (
    idTanque INT PRIMARY KEY AUTO_INCREMENT,
    codigoTanque VARCHAR(10) NOT NULL,
    capacidadeLitros INT,
    modelo VARCHAR(45),
    localizacao VARCHAR(45),
    fkVinicola INT NOT NULL,

    CONSTRAINT fkTanqueVinicola 
        FOREIGN KEY (fkVinicola) REFERENCES vinicola(idVinicola),

    CONSTRAINT uniqueTanqueVinicola 
        UNIQUE (codigoTanque, fkVinicola)
);

CREATE TABLE sensor (
    idSensor INT PRIMARY KEY AUTO_INCREMENT,
    statusSensor VARCHAR(15),
    localizacaoInstalacao VARCHAR(45),
    fkTanque INT NOT NULL,

    CONSTRAINT fkSensorTanque 
        FOREIGN KEY (fkTanque) REFERENCES tanque(idTanque)
);

CREATE TABLE registro (
    idRegistro INT PRIMARY KEY AUTO_INCREMENT,
    temperatura DECIMAL(4,2),
    dtHora DATETIME DEFAULT CURRENT_TIMESTAMP,
    fkSensor INT NOT NULL,

    CONSTRAINT fkRegistroSensor 
        FOREIGN KEY (fkSensor) REFERENCES sensor(idSensor)
);

CREATE TABLE alerta (
    idAlerta INT,
    fkRegistro INT,
    mensagem VARCHAR(60),
    dtHora DATETIME DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (idAlerta, fkRegistro),

    CONSTRAINT fkAlertaRegistro 
        FOREIGN KEY (fkRegistro) REFERENCES registro(idRegistro)
);


-- INSERTS 

INSERT INTO Endereco (logradouro, numero, bairro, cep, cidade, estado) VALUES 
('Rua das Flores', '123', 'Jardim', '12345-678', 'São Paulo', 'SP'),
('Avenida Brasil', '456', 'Centro', '87654-321', 'Rio de Janeiro', 'RJ'),
('Rua da Uva', '789', 'Vinhedo', '11223-445', 'Belo Horizonte', 'MG');

INSERT INTO Usuario (nomeCompleto, email, senha) VALUES 
('João Silva', 'joao.silva@email.com', 'senha123'),
('Maria Oliveira', 'maria.oliveira@email.com', 'senha456'),
('Carlos Souza', 'carlos.souza@email.com', 'senha789');

INSERT INTO vinicola (nomeVinicola, telefone, cnpj, qtdTanquesSuportados, fkUsuario, fkEndereco) VALUES 
('Vinícola do Vale', '11999999999', '12.345.678/0001-00', 10, 1, 1),
('Vinícola Sol Nascente', '21999999999', '23.456.789/0001-00', 15, 2, 2),
('Vinícola Terra Nova', '31999999999', '34.567.890/0001-00', 20, 3, 3);

INSERT INTO tanque (codigoTanque, capacidadeLitros, modelo, localizacao, fkVinicola) VALUES 
('T1', 1000, 'Inox', 'Área 1', 1),
('T2', 2000, 'Madeira', 'Área 2', 2),
('T3', 1500, 'Plástico', 'Área 3', 3);

INSERT INTO sensor (statusSensor, localizacaoInstalacao, fkTanque) VALUES 
('Ativo', 'Tanque T1', 1),
('Inativo', 'Tanque T2', 2),
('Manutenção', 'Tanque T3', 3);

INSERT INTO registro (temperatura, fkSensor) VALUES 
(32.5, 1),
(22.2, 2),
(15.5, 3);

INSERT INTO alerta (idAlerta, fkRegistro, mensagem) VALUES 
(1, 1, 'Temperatura Crítica: 32°C detectados'),
(1, 3, 'Temperatura crítica: 15°C detectados'),
(1, 2, 'Temperatura adequada: 22°C detectados');


-- CONSULTA FINAL

SELECT 
    t.codigoTanque,
    t.modelo,
    r.temperatura,
    a.mensagem,
    DATE_FORMAT(r.dtHora, '%H:%i') AS hora
FROM alerta a
JOIN registro r ON a.fkRegistro = r.idRegistro
JOIN sensor s ON r.fkSensor = s.idSensor
JOIN tanque t ON s.fkTanque = t.idTanque;

ALTER TABLE vinicola 
ADD CONSTRAINT uniqueUsuario 
UNIQUE (fkUsuario); 

 

ALTER TABLE vinicola 
ADD CONSTRAINT uniqueEndereco 
UNIQUE (fkEndereco); 


select * from Endereco;
select * from vinicola;
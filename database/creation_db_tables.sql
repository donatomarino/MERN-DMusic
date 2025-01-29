#DROP DATABASE DMusic;
CREATE DATABASE DMusic;
USE DMusic;

-- Creamos la tabla User
CREATE TABLE Users (
id_user INT AUTO_INCREMENT PRIMARY KEY,
full_name VARCHAR(255) NOT NULL,
email VARCHAR(255) NOT NULL,
pass VARCHAR(255) NOT NULL,
birtdate DATE NOT NULL,
gender VARCHAR(10) NOT NULL
);

-- Insertamos datos en la tabla users
INSERT INTO Users VALUES(NULL, 'Donato Marino', 'donato_8@icloud.com', '1234', '2000-01-15', 'hombre');

SELECT * FROM Users;

-- Creamos la tabla Songs
CREATE TABLE Songs(
id_song INT AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(255) NOT NULL,
duration TIME NOT NULL,
genre VARCHAR(255),
url VARCHAR(255) NOT NULL,
image VARCHAR(255),
score DECIMAL(5,2),
id_artist INT NOT NULL
);

-- Añadimos FK en la tabla Songs
ALTER TABLE Songs ADD CONSTRAINT FK_Artistas_Songs FOREIGN KEY (id_artist) REFERENCES Artists(id_artist) ON DELETE CASCADE ON UPDATE CASCADE;

SELECT * FROM Songs;

-- Creamos la tabla Artists
CREATE TABLE Artists(
id_artist INT AUTO_INCREMENT PRIMARY KEY,
full_name VARCHAR(255) NOT NULL,
avatar VARCHAR(255) NOT NULL,
popularity DECIMAL(5,2)
);

-- Creamos la tabla relación usuarios y canciones
CREATE TABLE users_songs(
id_user INT,
id_song INT,
FOREIGN KEY (id_user) REFERENCES Users(id_user),
FOREIGN KEY (id_song) REFERENCES Songs(id_song)
);

INSERT INTO users_songs VALUES(1, 1);

/*
--- Prueba JOIN tabla artists y songs ---
SELECT a.full_name, s.title FROM Songs s 
INNER JOIN Artists a ON a.id_artist = s.id_artist; 

--- Prueba JOIN tabla users y songs ---
SELECT u.full_name, u.email, s.title FROM users_songs us
JOIN Users u ON u.id_user = us.id_user
JOIN Songs s ON s.id_song = us.id_song;
*/












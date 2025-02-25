DROP DATABASE IF EXISTS `sgflashcard_db`;
CREATE DATABASE `sgflashcard_db`;
CREATE USER 'admin'@'%' IDENTIFIED BY 'adminP@55w0rd!Ok';
GRANT ALL PRIVILEGES ON `sgflashcard_db`.* TO 'admin'@'%';
FLUSH PRIVILEGES;

USE `sgflashcard_db`;

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb4;

-- flashcard module
DROP TABLE IF EXISTS `fashcard`;
CREATE TABLE `fashcard` (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`content`)),
  `subject` varchar(32) NOT NULL,
  `level` varchar(32) NOT NULL,
  `owner` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


DROP TABLE IF EXISTS `lesson`;
CREATE TABLE `lesson` (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(32) NOT NULL,
  `description` varchar(225) NOT NULL,
  `flashcards` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`flashcards`)),
  `subject` varchar(32) NOT NULL,
  `owner` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


DROP TABLE IF EXISTS `subject`;
CREATE TABLE `subject` (
  `title` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`title`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

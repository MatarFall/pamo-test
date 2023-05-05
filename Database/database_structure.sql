/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE DATABASE /*!32312 IF NOT EXISTS*/ pamo-backend-db /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE pamo-backend-db;

DROP TABLE IF EXISTS assureur;
CREATE TABLE `assureur` (
  `assureurId` int NOT NULL AUTO_INCREMENT,
  `userId` int DEFAULT NULL,
  PRIMARY KEY (`assureurId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS assureur_has_prestataire;
CREATE TABLE `assureur_has_prestataire` (
  `assureurId` int NOT NULL,
  `prestataireId` int NOT NULL,
  PRIMARY KEY (`assureurId`,`prestataireId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS fichemedicale;
CREATE TABLE `fichemedicale` (
  `fichemedicaleId` int NOT NULL AUTO_INCREMENT,
  `date_naissance` date DEFAULT NULL,
  `groupe_sanguin` varchar(25) DEFAULT NULL,
  `sexe` varchar(25) DEFAULT NULL,
  `maladies` varchar(255) DEFAULT NULL,
  `poids` double DEFAULT NULL,
  `taille` double DEFAULT NULL,
  `contact_urgence` varchar(200) DEFAULT NULL,
  `userId` int DEFAULT NULL,
  PRIMARY KEY (`fichemedicaleId`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS medecin;
CREATE TABLE `medecin` (
  `medecinid` int NOT NULL AUTO_INCREMENT,
  `structuresanitaireId` int DEFAULT NULL,
  `userId` int DEFAULT NULL,
  PRIMARY KEY (`medecinid`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS medecin_has_specialisation;
CREATE TABLE `medecin_has_specialisation` (
  `medecinId` int NOT NULL,
  `specialisationId` int NOT NULL,
  PRIMARY KEY (`medecinId`,`specialisationId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS meeting;
CREATE TABLE `meeting` (
  `meetingId` int NOT NULL AUTO_INCREMENT,
  `objet` varchar(50) NOT NULL,
  `type` varchar(50) NOT NULL,
  `date` datetime NOT NULL,
  `patientId` int NOT NULL,
  `medecinId` int NOT NULL,
  PRIMARY KEY (`meetingId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS news;
CREATE TABLE `news` (
  `newId` int NOT NULL AUTO_INCREMENT,
  `titre` varchar(40) NOT NULL,
  `categorie` varchar(20) NOT NULL,
  `contenu` text,
  `image_url` text,
  `is_actif` tinyint DEFAULT NULL,
  `date_publication` datetime DEFAULT NULL,
  PRIMARY KEY (`newId`),
  CONSTRAINT `news_chk_1` CHECK ((`is_actif` in (0,1)))
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS patient;
CREATE TABLE `patient` (
  `patientId` int NOT NULL AUTO_INCREMENT,
  `userId` int DEFAULT NULL,
  PRIMARY KEY (`patientId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS prestataire;
CREATE TABLE `prestataire` (
  `prestataireId` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(50) NOT NULL,
  `email` varchar(50) DEFAULT NULL,
  `date_creation` datetime DEFAULT NULL,
  `adresse` varchar(150) DEFAULT NULL,
  `is_actif` tinyint DEFAULT NULL,
  `is_all_night` tinyint DEFAULT NULL,
  PRIMARY KEY (`prestataireId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS role;
CREATE TABLE `role` (
  `roleId` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(20) NOT NULL,
  `code` varchar(20) NOT NULL,
  PRIMARY KEY (`roleId`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS specialisation;
CREATE TABLE `specialisation` (
  `specialisationId` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(100) NOT NULL,
  `code` varchar(50) NOT NULL,
  PRIMARY KEY (`specialisationId`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS structure_sanitaire;
CREATE TABLE `structure_sanitaire` (
  `structuresanitaireId` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(50) NOT NULL,
  `ville` varchar(50) DEFAULT NULL,
  `code` varchar(50) NOT NULL,
  PRIMARY KEY (`structuresanitaireId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS user;
CREATE TABLE `user` (
  `userId` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(50) NOT NULL,
  `prenom` varchar(50) NOT NULL,
  `numero` varchar(50) NOT NULL,
  `adresse` varchar(100) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(200) NOT NULL,
  `account_status` tinyint DEFAULT NULL,
  `date_creation` date DEFAULT NULL,
  `roleId` int DEFAULT NULL,
  PRIMARY KEY (`userId`),
  CONSTRAINT `users_chk_1` CHECK ((`account_status` in (0,1)))
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS usercredentials;
CREATE TABLE `usercredentials` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(512) NOT NULL,
  `password` varchar(512) NOT NULL,
  `userId` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;









/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

CREATE DATABASE  IF NOT EXISTS `pamo-backend-db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `pamo-backend-db`;
-- MySQL dump 10.13  Distrib 8.0.25, for macos11 (x86_64)
--
-- Host: pamo-db.cjubqvtdov4c.eu-west-3.rds.amazonaws.com    Database: pamo-backend-db
-- ------------------------------------------------------
-- Server version	8.0.23

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '';

--
-- Table structure for table `UserCredentials`
--

DROP TABLE IF EXISTS `UserCredentials`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `UserCredentials` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(512) NOT NULL,
  `password` varchar(512) NOT NULL,
  `userId` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserCredentials`
--

LOCK TABLES `UserCredentials` WRITE;
/*!40000 ALTER TABLE `UserCredentials` DISABLE KEYS */;
INSERT INTO `UserCredentials` VALUES (4,'bigbadwolf@yopmail.com','$2a$10$9KlSt.jCeyDGlSW8wMvOGOIN/Y57w0dRPI/JENTsUbNDAuUogeN6C',33),(5,'badjimoust@gmail.com','$2a$10$NXs3dks.X6NAoG3b.QRdQepMrpq3vDvIMUMSW0jXXqYIysXL6tIqW',34),(6,'tyny95@outlook.fr','$2a$10$gaxnKRbRy6Y4Fc04yoRqLugCUlf8XO8w9XXDtijUxROtFnQPoNHXS',35),(7,'matfal73@gmail.com','$2a$10$yQqREv5AOwYJMUKJ06RBle0AKDeb56wDdZf9GXgF2Tmf8iiBUXcVu',37),(8,'rimka12@gmail.com','$2a$10$.0nQpU4SdazLOpRe78O2pOYBF91BqAg1g.MiT/xriXvtaYsFvxjCm',38),(9,'sakhito@gmail.com','$2a$10$sqyF/IBKZuOxFDF8a5Sk9.95rey58T2Oa6oVrQh7WfL5ApxSCxNka',39),(10,'Alhpiao@gmail.com','$2a$10$aB/wVx.mgv3C7kwDyc0wquXTHGoAtP/TsWI.p/dcLahrhN9h3KHBK',40),(11,'diackElamin@gmail.com','$2a$10$1Lqc3SNb3tHxELnd7yzQmum2y8QQbOV951R7Q8zSXZHOQkdGo7VTW',41),(12,'thioneCr7@gmail.com','$2a$10$dYDllUAhYTV.RAzsujanPOZmEfvKeOhVVTCIr9J3wKLeQeKxn0Fs.',42),(13,'lyssa@gmail.com','$2a$10$6SzmPAHxeSzAsgVhAterc.11qMC5nyCkd47HJNzr7w7BXB8uKzeFO',44),(14,'dondong@gmail.com','$2a$10$NlmLhgUygjqxqSpMDKpc9exwoMum5gXMcFXtC724XKAfTuaIGjOWC',45),(15,'dikhasye@gmail.com','$2a$10$YkWsvB3oFxAb7XDYzAdiN.zBSxh4Qg7bP9o0ThDROUuNT0C4lu1DG',46),(16,'famadiop@gmail.com','$2a$10$x68JWLCEFgfS1P4lAaisFe2DmghZLn8nH0xT4pLrbg6c2p7A3fkPS',47),(17,'ndoyeasst@gmail.com','$2a$10$llkkVDi6xsZ69wjVUOlDdOj3rqDqNej4Do9kbdJZdHzaGu5zTdWUu',48),(18,'remareme@gmail.com','$2a$10$84uPrJWh6Q6MTPzxcz0oC.uoeQo99rpJUYVSx1bam2VeJUBY.UBi2',49),(19,'lodialaye@gmail.com','$2a$10$50t4gQ7aBFc7I7aqIcqC4uHzbwPGN6kpYAIXkbLP.uRbntWvAnNbO',50),(20,'sowDebma@gmail.com','$2a$10$1YKRXhe8kOBOpQJILfJOTu.rwRykvrVevoW21BfSNRkV3cjeaOQ/2',51),(21,'cheniang@gmail.com','$2a$10$nZ2tTPaa/1tWTa7dWDQZleYWpNzuHUzbebMWgwe.0mjhswRHbTIdW',52),(22,'moussbalde@gmail.com','$2a$10$xUkCXVe8VIiCglxag.SxrunYNJIzudsRXogAk8mb0kGurmQaqS9/a',53),(23,'sasene@gmail.com','$2a$10$wB6cwVx2JCKJ5Qk3bda2wOxx.ltx8H.qTdJPAF4dfeUpE6slJvCUq',54),(24,'aliberth@gmail.com','$2a$10$M0gSJhtKnw14bXOLcn0YFuBh2wI7OPoSKWcGRm9emaqXwiu.8M1tm',55),(25,'rokasse@gmail.com','$2a$10$Ibi1ww6H.4/uuEluvrVFze4GfCiPGcf.Co.pYRpWOy6naYJJj.5Ae',56),(26,'tyny111@gmail.com','$2a$10$sAjIuWmaiEBySs6jg.XQrOY8j.cZvKd1CBj3ecmuGFXW3xLJo0W12',57),(27,'tyny895@gmail.com','$2a$10$OlpSBL29O8yznvkIEevrBOrACXs6feUSNMnyT/oCIzGGlgQnj27x6',58),(28,'scheikhtidiane@gmail.com','$2a$10$yij7b6KLT0shc0DlZFZ.YurEAJSBsppTxa2V/pBmelaFHpFHvvlXu',59),(29,'daoudapamodjiba@gmail.com','$2a$10$2GB5vTMo/uCI1vavvWHh4eE8.ig/ena1QC.WPqVZfyALp4q0nqk/K',60),(30,'daoudapamodjiba1@gmail.com','$2a$10$vaIFIj.1nq9hghZL89Jj.OEuOG3ljlW6zptaaffcvEOzj6EoXUc5u',61),(31,'ddjiba86@yahoo.fr','$2a$10$yqk4k2S0XVtt3IQv3tXBx.mnpjklMO.xeOzw7jl.C3iRbc6/P1n3a',62),(32,'maataarfall@gmail.com','$2a$10$fHWc4Ukjc/etMzGRkdYh/OX9LGLEBmZWRbQ86TxzGobRVlpcnQz.q',63),(33,'djibaabdourahmane@gmail.com','$2a$10$/eicDw/M.3rJv0KMQU9E0.OoPyUA7KXN5Gp9TyeIuS1xwrJb1FYYS',64),(34,'mabdoulkarimdiop@gmail.com','$2a$10$aCglr6mm1/VS7.OvIsS7WOReoo3R93ONb7TSuAJOrg9rpPOha9VEO',65);
/*!40000 ALTER TABLE `UserCredentials` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `assureur`
--

DROP TABLE IF EXISTS `assureur`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `assureur` (
  `assureurId` int NOT NULL AUTO_INCREMENT,
  `userId` int DEFAULT NULL,
  PRIMARY KEY (`assureurId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `assureur`
--

LOCK TABLES `assureur` WRITE;
/*!40000 ALTER TABLE `assureur` DISABLE KEYS */;
/*!40000 ALTER TABLE `assureur` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `assureur_has_prestataire`
--

DROP TABLE IF EXISTS `assureur_has_prestataire`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `assureur_has_prestataire` (
  `assureurId` int NOT NULL,
  `prestataireId` int NOT NULL,
  PRIMARY KEY (`assureurId`,`prestataireId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `assureur_has_prestataire`
--

LOCK TABLES `assureur_has_prestataire` WRITE;
/*!40000 ALTER TABLE `assureur_has_prestataire` DISABLE KEYS */;
/*!40000 ALTER TABLE `assureur_has_prestataire` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fichemedicale`
--

DROP TABLE IF EXISTS `fichemedicale`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
  PRIMARY KEY (`fichemedicaleId`),
  UNIQUE KEY `userId` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fichemedicale`
--

LOCK TABLES `fichemedicale` WRITE;
/*!40000 ALTER TABLE `fichemedicale` DISABLE KEYS */;
INSERT INTO `fichemedicale` VALUES (30,'2000-05-22','O+','Masculin','',66,1.75,'781112211, 781112211',30),(31,'1995-08-07','O+','Masculin','string',75.6,175,'775109027',35);
/*!40000 ALTER TABLE `fichemedicale` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `medecin`
--

DROP TABLE IF EXISTS `medecin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `medecin` (
  `medecinid` int NOT NULL AUTO_INCREMENT,
  `structuresanitaireId` int DEFAULT NULL,
  `userId` int DEFAULT NULL,
  PRIMARY KEY (`medecinid`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `medecin`
--

LOCK TABLES `medecin` WRITE;
/*!40000 ALTER TABLE `medecin` DISABLE KEYS */;
INSERT INTO `medecin` VALUES (5,3,34),(6,3,37),(7,3,38),(8,3,39),(9,3,40),(10,3,41),(11,3,42),(12,3,44),(13,3,45),(14,3,46),(15,3,47),(16,3,48),(17,3,49),(18,3,50),(19,3,51),(20,3,52),(21,3,53),(22,3,54),(23,3,55),(24,3,56);
/*!40000 ALTER TABLE `medecin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `medecin_has_specialisation`
--

DROP TABLE IF EXISTS `medecin_has_specialisation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `medecin_has_specialisation` (
  `medecinId` int NOT NULL,
  `specialisationId` int NOT NULL,
  PRIMARY KEY (`medecinId`,`specialisationId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `medecin_has_specialisation`
--

LOCK TABLES `medecin_has_specialisation` WRITE;
/*!40000 ALTER TABLE `medecin_has_specialisation` DISABLE KEYS */;
INSERT INTO `medecin_has_specialisation` VALUES (5,5),(5,8);
/*!40000 ALTER TABLE `medecin_has_specialisation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `meeting`
--

DROP TABLE IF EXISTS `meeting`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `meeting` (
  `meetingId` int NOT NULL AUTO_INCREMENT,
  `objet` varchar(50) NOT NULL,
  `type` varchar(50) DEFAULT NULL,
  `patientId` int DEFAULT NULL,
  `medecinId` int NOT NULL,
  `nomPatient` varchar(50) NOT NULL,
  `prenomPatient` varchar(50) NOT NULL,
  `symptomes` mediumtext,
  `notes` mediumtext,
  `status` varchar(50) DEFAULT NULL,
  `date_patient` datetime NOT NULL,
  `date_medecin` datetime DEFAULT NULL,
  `is_approved_by_patient` tinyint DEFAULT NULL,
  `is_approved_by_medecin` tinyint DEFAULT NULL,
  PRIMARY KEY (`meetingId`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `meeting`
--

LOCK TABLES `meeting` WRITE;
/*!40000 ALTER TABLE `meeting` DISABLE KEYS */;
INSERT INTO `meeting` VALUES (2,'string','string',NULL,0,'string','string','string','string','string','2021-05-27 14:34:36','2021-05-27 14:34:36',1,1),(3,'string',NULL,NULL,0,'string','string',NULL,NULL,NULL,'2021-05-27 14:34:36',NULL,1,0),(4,'visite contre visite','visite contre visite',35,5,'DOE','John','J\'ai des maux de ventre depuis pluqieurs jours et je manque d\'appétit','visite contre visite','visite contre visite','2021-05-20 00:00:00','2021-05-20 00:00:00',1,0),(5,'visite contre visite','visite contre visite',35,5,'DOE','John','Maux de tête, fièvres par intermittence, manque de sommeil et fatigue','visite contre visite','visite contre visite','2021-05-05 00:00:00','2021-05-05 00:00:00',1,0),(7,'visite contre visite','visite contre visite',35,10,'DOE','John','toutes les douleurs du monde','visite contre visite','visite contre visite','2021-05-10 00:00:00','2021-05-10 00:00:00',1,0),(8,'visite contre visite','visite contre visite',35,11,'DOE','John','J\'ai des maux de tête atroces accompagnés d\'une fièvre','visite contre visite','visite contre visite','2021-05-29 00:00:00','2021-05-29 00:00:00',1,0),(9,'visite contre visite','visite contre visite',35,5,'SY','Fatima','Nausées, douleurs articulaires, difficultés respiratoires','visite contre visite','visite contre visite','2021-06-02 16:00:00','2021-06-02 16:00:00',1,0),(10,'visite contre visite','visite contre visite',35,5,'Ndiaye','Cheikh Ibrahima','Mon voisin a des maux de ventre atroces accompagnés de vomissements. Urgent urgent urgent','visite contre visite','visite contre visite','2021-06-05 12:00:00','2021-06-05 12:00:00',1,0),(11,'visite contre visite','visite contre visite',35,5,'Diaw','Fallou Gallas','Diarrhée et vomissements, maux de ventre. Je soupçonne une intoxication alimentaire','visite contre visite','visite contre visite','2021-06-14 15:00:00',NULL,1,0),(12,'visite contre visite','visite contre visite',35,5,'DIALLO','Zaccaria','Fatigue et manque de sommeil.','visite contre visite','visite contre visite','2021-06-02 09:00:00',NULL,1,0),(13,'visite contre visite','visite contre visite',35,5,'DIALLO','Khady','Ma cousine est en état de grossesse (6 mois)','visite contre visite','visite contre visite','2021-06-08 10:30:00',NULL,1,0),(14,'visite contre visite','visite contre visite',35,5,'Matar','FALL','Maux de ventre et manque d\'appétit','visite contre visite','visite contre visite','2021-06-30 10:30:00',NULL,1,0),(15,'visite contre visite','visite contre visite',35,5,'Matar','FALL','Maux de tête','visite contre visite','visite contre visite','2021-06-20 14:00:00',NULL,1,0),(16,'visite contre visite','visite contre visite',35,5,'Karim','DIOP','Diarrhée','visite contre visite','visite contre visite','2021-06-25 10:00:00',NULL,1,0),(17,'Consultation','visite contre visite',35,5,'Fatoumata','GAKOU','Légères douleurs ressenties au niveau du bas du dos, fatigue et manque de sommeil','visite contre visite','CONFIRMED','2021-06-17 09:00:00',NULL,1,0),(18,'Echographie','visite contre visite',35,5,'Assiétou','BA','Suivi de l\'état de ma grossesse qui est au stade de 6 mois','visite contre visite','PENDING','2021-06-17 10:00:00',NULL,1,0),(19,'Echographie','visite contre visite',35,5,'Gora','NDIAYE','Je veux refaire la circoncision qui a été mal faite pour mon neveu','visite contre visite','CANCELED','2021-06-17 11:00:00',NULL,1,0),(20,'Electrocardiogramme','visite contre visite',58,5,'Habibatou','KEBE','Veut consulter son ECG pour voir son état de santé cardiaque','visite contre visite','CONFIRMED','2021-06-17 15:30:00',NULL,1,0),(21,'Electrocardiogramme','visite contre visite',35,5,'KEBE','Papa Abdoulaye','J\'ai des maux de tête depuis 3 jours','visite contre visite','CONFIRMED','2021-06-27 11:00:00',NULL,1,0),(22,'Electrocardiogramme','visite contre visite',33,5,'Samba','778569584','j\'ai maux de tête répété','visite contre visite','CONFIRMED','2021-06-28 10:00:00',NULL,1,0),(23,'Electrocardiogramme','visite contre visite',35,5,'KEBE','Papa Abdoulaye','j\'ai des maux de têtes depuis des jours','visite contre visite','CONFIRMED','2021-07-16 10:30:00',NULL,1,0),(24,'Electrocardiogramme','visite contre visite',35,5,'Mariama','785557890','Douleurs au ventre','visite contre visite','CONFIRMED','2021-07-15 14:00:00',NULL,1,0),(25,'Electrocardiogramme','visite contre visite',35,5,'KEBE','Papa Abdoulaye','J\'ai mal partout depuis quelques jours','visite contre visite','CONFIRMED','2021-07-14 11:00:00',NULL,1,0),(26,'Electrocardiogramme','visite contre visite',35,5,'Moussa AW','774433668','Moussa a mal a la gorge depuis 5 jours','visite contre visite','CONFIRMED','2021-07-15 11:00:00',NULL,1,0),(27,'Electrocardiogramme','visite contre visite',65,5,'Diop','Mohamed Abdoul','Corona','visite contre visite','CONFIRMED','2021-07-29 10:00:00',NULL,1,0);
/*!40000 ALTER TABLE `meeting` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `news`
--

DROP TABLE IF EXISTS `news`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `news`
--

LOCK TABLES `news` WRITE;
/*!40000 ALTER TABLE `news` DISABLE KEYS */;
/*!40000 ALTER TABLE `news` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `patient`
--

DROP TABLE IF EXISTS `patient`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `patient` (
  `patientId` int NOT NULL AUTO_INCREMENT,
  `userId` int DEFAULT NULL,
  PRIMARY KEY (`patientId`),
  UNIQUE KEY `userId` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patient`
--

LOCK TABLES `patient` WRITE;
/*!40000 ALTER TABLE `patient` DISABLE KEYS */;
/*!40000 ALTER TABLE `patient` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prestataire`
--

DROP TABLE IF EXISTS `prestataire`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prestataire`
--

LOCK TABLES `prestataire` WRITE;
/*!40000 ALTER TABLE `prestataire` DISABLE KEYS */;
/*!40000 ALTER TABLE `prestataire` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `roleId` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(20) NOT NULL,
  `code` varchar(20) NOT NULL,
  PRIMARY KEY (`roleId`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (4,'Role Medecin','ROLE_MEDECIN'),(5,'Role User','ROLE_USER'),(6,'Role Admin','ROLE_ADMIN'),(7,'Role Test','ROLE_TEST'),(8,'Role','ROLE_TEST_1');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `specialisation`
--

DROP TABLE IF EXISTS `specialisation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `specialisation` (
  `specialisationId` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(100) NOT NULL,
  `code` varchar(50) NOT NULL,
  PRIMARY KEY (`specialisationId`),
  UNIQUE KEY `code` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `specialisation`
--

LOCK TABLES `specialisation` WRITE;
/*!40000 ALTER TABLE `specialisation` DISABLE KEYS */;
INSERT INTO `specialisation` VALUES (5,'Opticien Pro','OPTIC'),(6,'Dentiste','DENTISTE'),(7,'Pédiatre','PEDIATRE'),(9,'gynécologue','GYNE'),(10,'Urologue','URO'),(11,'Dermatologue','DERMO'),(12,'Neurologue','NEURO'),(13,'Psychiatre','PSY');
/*!40000 ALTER TABLE `specialisation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `structure_sanitaire`
--

DROP TABLE IF EXISTS `structure_sanitaire`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `structure_sanitaire` (
  `structuresanitaireId` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(50) NOT NULL,
  `ville` varchar(50) DEFAULT NULL,
  `code` varchar(50) NOT NULL,
  PRIMARY KEY (`structuresanitaireId`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `structure_sanitaire`
--

LOCK TABLES `structure_sanitaire` WRITE;
/*!40000 ALTER TABLE `structure_sanitaire` DISABLE KEYS */;
INSERT INTO `structure_sanitaire` VALUES (3,'Hopital Dalal Djam','Guedjawaye','HOPGUEDJ'),(4,'Clinique Naby','Rio','C12');
/*!40000 ALTER TABLE `structure_sanitaire` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `userId` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(50) NOT NULL,
  `prenom` varchar(50) NOT NULL,
  `numero` varchar(50) NOT NULL,
  `adresse` varchar(100) NOT NULL,
  `email` varchar(50) NOT NULL,
  `account_status` tinyint DEFAULT NULL,
  `date_creation` date DEFAULT NULL,
  `roleId` int DEFAULT NULL,
  `image` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`userId`),
  UNIQUE KEY `email` (`email`),
  CONSTRAINT `users_chk_1` CHECK ((`account_status` in (0,1)))
) ENGINE=InnoDB AUTO_INCREMENT=66 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (34,'BADJI','Moustapha','772763307','NORD-Foire','badjimoust@gmail.com',1,'2021-05-25',4,''),(37,'FALL','Matar','772439353','Golf Sud','matfal73@gmail.com',0,'2021-05-27',4,''),(38,'DIOP','Abdel Karim','781210942','Rio de Janeiro','rimka12@gmail.com',0,'2021-05-27',4,''),(39,'SAKHO','Dramane','772539763','Parcelles Assainies','sakhito@gmail.com',0,'2021-05-27',4,''),(40,'DIAO','Alpha','771947532','Médina','Alhpiao@gmail.com',0,'2021-05-27',4,''),(41,'DIACK','Lamine','771073452','Petit Mbao','diackElamin@gmail.com',0,'2021-05-27',4,''),(42,'THIONE','Christophe','778453610','Grand Dakar','thioneCr7@gmail.com',0,'2021-05-27',4,''),(44,'MBENGUE','Saly','783545621','Ouakam','lyssa@gmail.com',0,'2021-05-27',4,''),(45,'Ndong','Wilfried','772535434','Grand Yoff','dondong@gmail.com',0,'2021-05-27',4,''),(46,'SEYE','Khadija','771209743','Patte d\'Oie','dikhasye@gmail.com',0,'2021-05-27',4,''),(47,'DIOP','Fama','772836532','Impots et Domaines','famadiop@gmail.com',0,'2021-05-27',4,''),(48,'NDOYE','Astou','778465428','Thies','ndoyeasst@gmail.com',0,'2021-05-27',4,''),(49,'THIAM','Marème','773534521','Diamalye','remareme@gmail.com',0,'2021-05-27',4,''),(50,'Diallo','Laye','783654521','Castors','lodialaye@gmail.com',0,'2021-05-27',4,''),(51,'SOW','Demba','782411081','Pikine','sowDebma@gmail.com',0,'2021-05-27',4,''),(52,'NIANG','Cheikh','770129854','Diamaguene','cheniang@gmail.com',0,'2021-05-27',4,''),(53,'Balde','Moussa','773735521','HLM Maristes','moussbalde@gmail.com',0,'2021-05-27',4,''),(54,'SENE','Saliou','788534211','Dalifort','sasene@gmail.com',0,'2021-05-27',4,''),(55,'BERTHE','Alima','762442091','Dalifort','aliberth@gmail.com',0,'2021-05-27',4,''),(56,'KASSE','Roman','709376352','Ouset-Foire','rokasse@gmail.com',0,'2021-05-27',4,''),(57,'FALL','Papa Karim','773320000','Dakar','tyny111@gmail.com',1,'2021-05-30',5,''),(58,'KEBE','Papa Abdoulaye','775896287','Soprim Extension','tyny895@gmail.com',1,'2021-06-05',5,''),(59,'Sarr','Cheikh Tidiane','00212661323641','9 rue hafid salafi','scheikhtidiane@gmail.com',1,'2021-06-26',5,''),(60,'DJIBA','Daouda','774433668','daoudapamodjiba@gmail.com','daoudapamodjiba@gmail.com',1,'2021-07-07',5,''),(61,'PAMO','Daouda','778586695','Keur Massar','daoudapamodjiba1@gmail.com',1,'2021-07-10',5,''),(62,'DJIBA','Daouda','774343343','Keur Massar','ddjiba86@yahoo.fr',1,'2021-07-10',5,''),(63,'fall','matar','774774983','Golf sud','maataarfall@gmail.com',0,'2021-07-14',6,''),(64,'Djiba','Abou','771643526','Sedhiou','djibaabdourahmane@gmail.com',1,'2021-07-22',5,''),(65,'Diop','Mohamed Abdoul','781210942','Rufisque','mabdoulkarimdiop@gmail.com',1,'2021-07-28',5,'');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-08-01 15:34:37

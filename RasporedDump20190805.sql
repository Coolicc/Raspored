-- MySQL dump 10.13  Distrib 8.0.15, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: raspored
-- ------------------------------------------------------
-- Server version	8.0.15

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `predavac`
--

DROP TABLE IF EXISTS `predavac`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `predavac` (
  `PredavacID` int(11) NOT NULL AUTO_INCREMENT,
  `Tip` varchar(45) DEFAULT NULL,
  `Profesor` int(11) NOT NULL,
  `Predmet` int(11) NOT NULL,
  PRIMARY KEY (`PredavacID`),
  KEY `fk_Predavac_Profesor_idx` (`Profesor`),
  KEY `fk_Predavac_Predmet1_idx` (`Predmet`),
  CONSTRAINT `fk_Predavac_Predmet1` FOREIGN KEY (`Predmet`) REFERENCES `predmet` (`PredmetID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_Predavac_Profesor` FOREIGN KEY (`Profesor`) REFERENCES `profesor` (`ProfesorID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `predavac`
--

LOCK TABLES `predavac` WRITE;
/*!40000 ALTER TABLE `predavac` DISABLE KEYS */;
INSERT INTO `predavac` VALUES (15,'Profesor',9,10),(16,'Asistent',10,10),(17,'Profesor',8,11),(18,'Asistent',10,11),(19,'Profesor',11,12),(20,'Asistent',12,12),(21,'Profesor',13,13),(22,'Asistent',14,13);
/*!40000 ALTER TABLE `predavac` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `predavanje`
--

DROP TABLE IF EXISTS `predavanje`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `predavanje` (
  `PredavanjeID` int(11) NOT NULL AUTO_INCREMENT,
  `Dan` varchar(45) NOT NULL,
  `Od` datetime NOT NULL,
  `Do` datetime NOT NULL,
  `Tip` varchar(45) NOT NULL,
  `Predavac` int(11) NOT NULL,
  `Raspored` int(11) NOT NULL,
  `Ucionica` int(11) NOT NULL,
  PRIMARY KEY (`PredavanjeID`),
  KEY `fk_Predavanje_Predavac1_idx` (`Predavac`),
  KEY `fk_Predavanje_Raspored1_idx` (`Raspored`),
  KEY `fk_Predavanje_Ucionica1_idx` (`Ucionica`),
  CONSTRAINT `fk_Predavanje_Predavac1` FOREIGN KEY (`Predavac`) REFERENCES `predavac` (`PredavacID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_Predavanje_Raspored1` FOREIGN KEY (`Raspored`) REFERENCES `raspored` (`RasporedID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_Predavanje_Ucionica1` FOREIGN KEY (`Ucionica`) REFERENCES `ucionica` (`UcionicaID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `predavanje`
--

LOCK TABLES `predavanje` WRITE;
/*!40000 ALTER TABLE `predavanje` DISABLE KEYS */;
INSERT INTO `predavanje` VALUES (11,'Ponedeljak','1970-06-01 12:30:00','1970-06-01 15:45:00','Računarske vežbe',16,8,14),(12,'Utorak','1970-06-02 12:00:00','1970-06-02 14:00:00','Predavanje',15,8,16),(13,'Utorak','1970-06-02 12:30:00','1970-06-02 14:00:00','Računarske vežbe',20,8,15),(14,'Utorak','1970-06-02 14:15:00','1970-06-02 15:45:00','Računarske vežbe',20,8,15),(18,'Sreda','1970-06-03 16:00:00','1970-06-03 19:00:00','Predavanje',19,8,17),(19,'Četvrtak','1970-06-04 08:00:00','1970-06-04 10:00:00','Predavanje',17,8,19),(20,'Četvrtak','1970-06-04 10:15:00','1970-06-04 11:45:00','Računarske vežbe',18,8,14),(24,'Utorak','1970-06-02 12:00:00','1970-06-02 14:00:00','Predavanje',21,9,20),(25,'Petak','1970-06-05 08:00:00','1970-06-05 11:00:00','Vežbe',22,9,21);
/*!40000 ALTER TABLE `predavanje` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `predmet`
--

DROP TABLE IF EXISTS `predmet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `predmet` (
  `PredmetID` int(11) NOT NULL AUTO_INCREMENT,
  `Naziv` varchar(80) NOT NULL,
  `Godina` int(11) DEFAULT NULL,
  `Obavezan` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`PredmetID`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `predmet`
--

LOCK TABLES `predmet` WRITE;
/*!40000 ALTER TABLE `predmet` DISABLE KEYS */;
INSERT INTO `predmet` VALUES (10,'Distribuirani sistemi',4,0),(11,'Proces razvoja informacionih sistema',4,0),(12,'Arhitektura, dizajn i obrasci',4,1),(13,'Diskretna matematika 2',3,0);
/*!40000 ALTER TABLE `predmet` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profesor`
--

DROP TABLE IF EXISTS `profesor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `profesor` (
  `ProfesorID` int(11) NOT NULL AUTO_INCREMENT,
  `Ime` varchar(50) NOT NULL,
  `Prezime` varchar(50) NOT NULL,
  PRIMARY KEY (`ProfesorID`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profesor`
--

LOCK TABLES `profesor` WRITE;
/*!40000 ALTER TABLE `profesor` DISABLE KEYS */;
INSERT INTO `profesor` VALUES (8,'Srđan','Škrbić'),(9,'Danijela','Boberić Krstićev'),(10,'Milan','Jović'),(11,'Gordana','Rakić'),(12,'Nina','Medić'),(13,'Maja','Pech'),(14,'Anna','Slivková');
/*!40000 ALTER TABLE `profesor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `raspored`
--

DROP TABLE IF EXISTS `raspored`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `raspored` (
  `RasporedID` int(11) NOT NULL AUTO_INCREMENT,
  `Godina` int(11) DEFAULT NULL,
  `Smer` varchar(45) DEFAULT NULL,
  `Naziv` varchar(45) NOT NULL,
  `Prioritet` int(11) DEFAULT NULL,
  PRIMARY KEY (`RasporedID`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `raspored`
--

LOCK TABLES `raspored` WRITE;
/*!40000 ALTER TABLE `raspored` DISABLE KEYS */;
INSERT INTO `raspored` VALUES (8,4,'IT','IV godina IT',1),(9,3,'IT','III godina IT',0);
/*!40000 ALTER TABLE `raspored` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ruser`
--

DROP TABLE IF EXISTS `ruser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `ruser` (
  `RUserID` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(100) COLLATE utf8_bin NOT NULL,
  `password` varchar(100) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`RUserID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ruser`
--

LOCK TABLES `ruser` WRITE;
/*!40000 ALTER TABLE `ruser` DISABLE KEYS */;
INSERT INTO `ruser` VALUES (1,'admin','{bcrypt}$2a$10$UD4B/rG/FHDoXPQpUlgxQOfs6T/lL.XSwCtFfIvmmp1xiu7rmJu06');
/*!40000 ALTER TABLE `ruser` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ucionica`
--

DROP TABLE IF EXISTS `ucionica`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `ucionica` (
  `UcionicaID` int(11) NOT NULL AUTO_INCREMENT,
  `Naziv` varchar(45) NOT NULL,
  PRIMARY KEY (`UcionicaID`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ucionica`
--

LOCK TABLES `ucionica` WRITE;
/*!40000 ALTER TABLE `ucionica` DISABLE KEYS */;
INSERT INTO `ucionica` VALUES (14,'RC3'),(15,'RC59/1'),(16,'S62'),(17,'A5'),(18,'A1'),(19,'A7'),(20,'S63'),(21,'S64');
/*!40000 ALTER TABLE `ucionica` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-08-05 15:08:11

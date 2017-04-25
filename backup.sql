-- MySQL dump 10.13  Distrib 5.7.16, for osx10.11 (x86_64)
--
-- Host: 127.0.0.1    Database: monastir_1
-- ------------------------------------------------------
-- Server version	5.7.16

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Data`
--

DROP TABLE IF EXISTS `Data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Data` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first` varchar(255) DEFAULT NULL,
  `last` varchar(255) DEFAULT NULL,
  `image` longtext,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=73 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Data`
--

LOCK TABLES `Data` WRITE;
/*!40000 ALTER TABLE `Data` DISABLE KEYS */;
INSERT INTO `Data` VALUES (1,'Abram','Calderon','Abram_Calderon.jpg','2017-04-25 00:37:42','2017-04-25 00:37:42'),(2,'Albert','Alva','Albert_Alva.jpg','2017-04-25 00:40:30','2017-04-25 00:40:30'),(3,'Albert','Youshah','Albert_Youshah.jpg','2017-04-25 00:40:53','2017-04-25 00:40:53'),(6,'Betty','Hasson','Betty_Raphael_Hasson.jpg','2017-04-25 00:41:42','2017-04-25 00:41:42'),(7,'Raphael','Hasson','Betty_Raphael_Hasson.jpg','2017-04-25 00:41:55','2017-04-25 00:41:55'),(8,'Charlie','Camhi','Charlie_Esther_Camhi.jpg','2017-04-25 00:42:30','2017-04-25 00:42:30'),(12,'Bernice','Albahari','Bernice_Albahari.jpg','2017-04-25 00:43:42','2017-04-25 00:43:42'),(13,'Esther','Camhi','Charlie_Esther_Camhi.jpg','2017-04-25 00:43:55','2017-04-25 00:43:55'),(15,'Clara','Lustig','Clara_Lustig.jpg','2017-04-25 00:44:53','2017-04-25 00:44:53'),(16,'Eileen','Hasson','Eileen_Hasson.jpg','2017-04-25 00:44:53','2017-04-25 00:44:53'),(17,'Eli','Cassorla','Eli_Bella_Cassorla.jpg','2017-04-25 00:45:36','2017-04-25 00:45:36'),(18,'Bella','Cassorla','Eli_Bella_Cassorla.jpg','2017-04-25 00:45:45','2017-04-25 00:45:45'),(19,'Elie','Cassorla','Elie_Cassorla.jpg','2017-04-25 00:45:59','2017-04-25 00:45:59'),(20,'Elsie','Becker','Elsie_Joseph_Becker.jpg','2017-04-25 00:46:40','2017-04-25 00:46:40'),(21,'Joseph','Becker','Elsie_Joseph_Becker.jpg','2017-04-25 00:46:56','2017-04-25 00:46:56'),(22,'Estelle','Confino','Estelle_Ralph_Confino.jpg','2017-04-25 00:47:18','2017-04-25 00:47:18'),(23,'Ralph','Confino','Estelle_Ralph_Confino.jpg','2017-04-25 00:47:36','2017-04-25 00:47:36'),(25,'Harriet','Berknoff','Harriet_Berknoff.jpg','2017-04-25 00:47:59','2017-04-25 00:47:59'),(27,'Hilda','Behar','Hilda_Behar.jpg','2017-04-25 00:48:56','2017-04-25 00:48:56'),(29,'Howard','Simon','Howard_Simon.jpg','2017-04-25 00:49:36','2017-04-25 00:49:36'),(30,'Hyman','Hasson','Hyman_Hasson.jpg','2017-04-25 00:49:45','2017-04-25 00:49:45'),(31,'Jack','Behar','Jack_Behar.jpg','2017-04-25 00:49:59','2017-04-25 00:49:59'),(33,'Jack','Michaels','Jack_Michaels.jpg','2017-04-25 00:58:50','2017-04-25 00:58:50'),(34,'Jack','Thomas','jack_thomas.jpg','2017-04-25 00:59:00','2017-04-25 00:59:00'),(35,'Jean','Honen','Jean_Honen.jpg','2017-04-25 00:59:09','2017-04-25 00:59:09'),(36,'Jerry','Pardo','Jerry_Pardo.jpg','2017-04-25 00:59:18','2017-04-25 00:59:18'),(37,'Joseph','Camhi','joseph_camhi.jpg','2017-04-25 01:00:08','2017-04-25 01:00:08'),(38,'Joseph','Kassorla','Joseph_Kassorla.jpg','2017-04-25 01:00:21','2017-04-25 01:00:21'),(39,'Joseph','Farash','Joseph_Ruth_Farash.jpg','2017-04-25 01:00:50','2017-04-25 01:00:50'),(40,'Ruth','Farash','Joseph_Ruth_Farash.jpg','2017-04-25 01:01:00','2017-04-25 01:01:00'),(41,'Lilly','Calderon','Lilly_Calderon.jpg','2017-04-25 01:01:29','2017-04-25 01:01:29'),(42,'Michael','Calderon','Michael_Calderon.jpg','2017-04-25 01:01:42','2017-04-25 01:01:42'),(43,'Mickey','Kamhi','Mickey_Dorothea_Kamhi.jpg','2017-04-25 01:02:00','2017-04-25 01:02:00'),(44,'Dorothea','Kamhi','Mickey_Dorothea_Kamhi.jpg','2017-04-25 01:02:16','2017-04-25 01:02:16'),(45,'Morris','Calderon','Morris_Calderon.jpg','2017-04-25 01:02:28','2017-04-25 01:02:28'),(46,'Morris','Cassorla','Morris_Cassorla.jpg','2017-04-25 01:02:41','2017-04-25 01:02:41'),(47,'Morris','Hasson','Morris_Esther_Hasson.jpg','2017-04-25 01:03:29','2017-04-25 01:03:29'),(48,'Esther','Hasson','Morris_Esther_Hasson.jpg','2017-04-25 01:03:42','2017-04-25 01:03:42'),(50,'Murray','Albucker','Murray_Albucker.jpg','2017-04-25 01:04:16','2017-04-25 01:04:16'),(51,'Nina','Holzer','Nina_Holzer.jpg','2017-04-25 01:04:28','2017-04-25 01:04:28'),(54,'Perry','Aruti','Perry_Aruti.jpg','2017-04-25 01:04:41','2017-04-25 01:04:41'),(56,'Sarah','Confino','Sarah_Confino.jpg','2017-04-25 01:04:41','2017-04-25 01:04:41'),(57,'Sheldon','Stewart','Sheldon_Stewart.jpg','2017-04-25 01:05:29','2017-04-25 01:05:29'),(58,'Shirley','Finkelman','Shirley_Finkelman.jpg','2017-04-25 01:05:42','2017-04-25 01:05:42'),(59,'Sidney','Kamhi','Sidney_Kamhi.jpg','2017-04-25 01:05:51','2017-04-25 01:05:51'),(60,'Sue','Nahmias','Sue_Nahmias.jpg','2017-04-25 01:06:02','2017-04-25 01:06:02'),(61,'Teddy','Samaya','Teddy_Esther_Samaya.jpg','2017-04-25 01:06:15','2017-04-25 01:06:15'),(62,'Esther','Samaya','Teddy_Esther_Samaya.jpg','2017-04-25 01:06:27','2017-04-25 01:06:27'),(63,'Tillie','Camhi','Tillie_Joseph_Camhi.jpg','2017-04-25 01:07:29','2017-04-25 01:07:29'),(69,'Ovadia','Cohen','Ovadia_Cohen.jpg','2017-04-25 01:11:24','2017-04-25 01:11:24'),(70,'Reuben','Slovin','Reuben_Slovin.jpg','2017-04-25 01:11:50','2017-04-25 01:11:50'),(71,'Rochelle','Kamhi','Rochelle_Kamhi.jpg','2017-04-25 01:12:14','2017-04-25 01:12:14'),(72,'Joseph','Camhi','Tillie_Joseph_Camhi.jpg','2017-04-25 01:13:32','2017-04-25 01:13:32');
/*!40000 ALTER TABLE `Data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Sessions`
--

DROP TABLE IF EXISTS `Sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Sessions` (
  `sid` varchar(32) NOT NULL,
  `expires` datetime DEFAULT NULL,
  `data` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`sid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Sessions`
--

LOCK TABLES `Sessions` WRITE;
/*!40000 ALTER TABLE `Sessions` DISABLE KEYS */;
/*!40000 ALTER TABLE `Sessions` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-04-24 21:19:50

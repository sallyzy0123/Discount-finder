-- MariaDB dump 10.19  Distrib 10.8.3-MariaDB, for osx10.14 (x86_64)
--
-- Host: localhost    Database: projectdb
-- ------------------------------------------------------
-- Server version	10.8.3-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Category`
--

DROP TABLE IF EXISTS `Category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Category` (
  `CategoryId` int(11) NOT NULL AUTO_INCREMENT,
  `CategoryName` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`CategoryId`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Category`
--

LOCK TABLES `Category` WRITE;
/*!40000 ALTER TABLE `Category` DISABLE KEYS */;
INSERT INTO `Category` VALUES
(1,'Laptops'),
(2,'Smartphones'),
(3,'Headsets');
/*!40000 ALTER TABLE `Category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Comment`
--

DROP TABLE IF EXISTS `Comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Comment` (
  `CommentId` int(11) NOT NULL AUTO_INCREMENT,
  `UserId` int(11) DEFAULT NULL,
  `PostId` int(11) DEFAULT NULL,
  `Date` date DEFAULT curdate(),
  `Text` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`CommentId`),
  KEY `UserId` (`UserId`),
  KEY `PostId` (`PostId`),
  CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `User` (`UserId`),
  CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`PostId`) REFERENCES `Post` (`PostId`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Comment`
--

LOCK TABLES `Comment` WRITE;
/*!40000 ALTER TABLE `Comment` DISABLE KEYS */;
INSERT INTO `Comment` VALUES
(1,1,1,'2022-12-06','The price is really good for this device'),
(2,1,1,'2022-12-06','I am going to buy this! Thank you so much!'),
(3,2,3,'2022-12-06','I like this headset, looks pretty and cost-effective.');
/*!40000 ALTER TABLE `Comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Evaluation`
--

DROP TABLE IF EXISTS `Evaluation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Evaluation` (
  `Likes` int(11) DEFAULT 0,
  `Dislikes` int(11) DEFAULT 0,
  `UserId` int(11) DEFAULT NULL,
  `PostId` int(11) DEFAULT NULL,
  KEY `UserId` (`UserId`),
  KEY `PostId` (`PostId`),
  CONSTRAINT `evaluation_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `User` (`UserId`),
  CONSTRAINT `evaluation_ibfk_2` FOREIGN KEY (`PostId`) REFERENCES `Post` (`PostId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Evaluation`
--

LOCK TABLES `Evaluation` WRITE;
/*!40000 ALTER TABLE `Evaluation` DISABLE KEYS */;
INSERT INTO `Evaluation` VALUES
(1,0,1,2),
(1,0,1,1),
(1,0,2,1),
(1,1,2,3),
(1,0,1,3);
/*!40000 ALTER TABLE `Evaluation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Post`
--

DROP TABLE IF EXISTS `Post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Post` (
  `PostId` int(11) NOT NULL AUTO_INCREMENT,
  `UserId` int(11) DEFAULT NULL,
  `CategoryId` int(11) DEFAULT NULL,
  `Name` varchar(20) DEFAULT NULL,
  `Description` varchar(1000) DEFAULT NULL,
  `Location` varchar(20) DEFAULT NULL,
  `Picture` text DEFAULT NULL,
  `OriginalPrice` float DEFAULT NULL,
  `DiscountedPrice` float DEFAULT NULL,
  `Date` date DEFAULT curdate(),
  PRIMARY KEY (`PostId`),
  KEY `UserId` (`UserId`),
  KEY `CategoryId` (`CategoryId`),
  CONSTRAINT `post_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `User` (`UserId`),
  CONSTRAINT `post_ibfk_2` FOREIGN KEY (`CategoryId`) REFERENCES `Category` (`CategoryId`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Post`
--

LOCK TABLES `Post` WRITE;
/*!40000 ALTER TABLE `Post` DISABLE KEYS */;
INSERT INTO `Post` VALUES
(1,1,1,'Samsung S21 Ultra','Good phone','Helsinki','https://place-puppy.com/300x300',1200,900,'2022-12-06'),
(2,1,1,'Ipad Air 2022','The new iPad Air features the breakthrough M1 chip, ultra-fast 5G, a new front camera with Center Stage, and more','Gigantti','https://www.gigantti.fi/image/dv_web_D180001002945293/431421/ipad-air-2022-64-gb-wifi-violetti--pdp_zoom-3000.jpg',599,589,'2022-12-06'),
(3,2,1,'SteelSeries headset','Add super hearing to your list of abilities with the SteelSeries Arctis Prime gaming headset, which offers excellent sound quality with a versatile 3.5 mm jack, sound-isolating ear cushions, and a Discord-certified noise-canceling microphone.','Gigantti','https://www.gigantti.fi/image/dv_web_D1800010021173444/360882/steelseries-arctis-prime-pelikuulokkeet--pdp_zoom-3000--pdp_main-960.jpg',59.99,44.95,'2022-12-06'),
(4,8,2,'HP Laptop 15 laptop','The HP Laptop offers excellent performance in a compact package. The laptop has an AMD Ryzen™ 7 5700U Mobile Processor, and its Full HD screen resolution guarantees a detailed image.','Gigantti','https://www.gigantti.fi/image/dv_web_D180001002758707/312970/hp-laptop-15-r7-58256-156-kannettava--pdp_zoom-3000--pdp_main-960.jpg',749,549,'2022-12-06');
/*!40000 ALTER TABLE `Post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `User` (
  `UserId` int(11) NOT NULL AUTO_INCREMENT,
  `Username` varchar(20) DEFAULT NULL,
  `Email` varchar(50) DEFAULT NULL,
  `Password` text DEFAULT NULL,
  `Photo` text DEFAULT NULL,
  `Role` int(11) DEFAULT 0,
  PRIMARY KEY (`UserId`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
INSERT INTO `User` VALUES
(1,'cowboy','cowboy@texas.com','cowboy123','https://place-puppy.com/300x300',0),
(2,'sweetheart','sweetheart@gmail.com','sweetheart12345','https://place-puppy.com/300x300',0),
(3,'coldwinter','coldwinter@gamil.com','coldwinter123','https://divedigital.id/wp-content/uploads/2022/07/2-Aesthetic-Cat-with-Sleepy-Mask.jpg',1),
(5,'Sebubebu','sebu@bebu.com','12345','https://place-puppy.com/300x300',1),
(6,'Sebu','sebu@bebu.com','123456789','https://place-puppy.com/300x300',1),
(7,'Seb','sebu@seb.com','$2a$10$FRhMC8DAmZ3.DXP77Y.rbeF0N.K077mP9TGcWPd4DpHpWWvlWnN5e','https://place-puppy.com/300x300',1),
(8,'admin','admin@admin.com','$2a$10$H7bXhRqd68DjwFIVkw3G1OpfIdRWIRb735GvvzCBeuMhac/ZniGba','https://place-puppy.com/300x300',0),
(9,'user','user@user.com','12345678','https://place-puppy.com/300x300',1),
(10,'user3','user@user.com','12345678','https://place-puppy.com/300x300',1),
(11,'Sebastian','sebastian@sebastian.com','12345','https://place-puppy.com/300x300',1),
(12,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bookmarks`
--

DROP TABLE IF EXISTS `bookmarks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bookmarks` (
  `UserId` int(11) DEFAULT NULL,
  `PostId` int(11) DEFAULT NULL,
  KEY `UserId` (`UserId`),
  KEY `PostId` (`PostId`),
  CONSTRAINT `bookmarks_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `User` (`UserId`),
  CONSTRAINT `bookmarks_ibfk_2` FOREIGN KEY (`PostId`) REFERENCES `Post` (`PostId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookmarks`
--

LOCK TABLES `bookmarks` WRITE;
/*!40000 ALTER TABLE `bookmarks` DISABLE KEYS */;
INSERT INTO `bookmarks` VALUES
(1,2),
(1,1),
(2,3),
(3,1);
/*!40000 ALTER TABLE `bookmarks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `follows`
--

DROP TABLE IF EXISTS `follows`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `follows` (
  `UserId` int(11) DEFAULT NULL,
  `CategoryId` int(11) DEFAULT NULL,
  KEY `UserId` (`UserId`),
  KEY `CategoryId` (`CategoryId`),
  CONSTRAINT `follows_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `User` (`UserId`),
  CONSTRAINT `follows_ibfk_2` FOREIGN KEY (`CategoryId`) REFERENCES `Category` (`CategoryId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `follows`
--

LOCK TABLES `follows` WRITE;
/*!40000 ALTER TABLE `follows` DISABLE KEYS */;
INSERT INTO `follows` VALUES
(1,1),
(1,2),
(2,1);
/*!40000 ALTER TABLE `follows` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'projectdb'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-12-15  0:56:46

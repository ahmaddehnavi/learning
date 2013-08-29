-- phpMyAdmin SQL Dump
-- version 2.11.9.2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Aug 29, 2013 at 01:49 PM
-- Server version: 5.0.67
-- PHP Version: 5.2.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `panda`
--

-- --------------------------------------------------------

--
-- Table structure for table `academy`
--

CREATE TABLE IF NOT EXISTS `academy` (
  `academy_id` INT(11)                 NOT NULL AUTO_INCREMENT,
  `name`       VARCHAR(40)
               CHARACTER SET utf8
               COLLATE utf8_persian_ci NOT NULL,
  PRIMARY KEY (`academy_id`),
  UNIQUE KEY `name` (`name`)
)
  ENGINE = MyISAM
  DEFAULT CHARSET = latin1
  AUTO_INCREMENT = 6;

--
-- Dumping data for table `academy`
--

INSERT INTO `academy` (`academy_id`, `name`) VALUES
(1, 'آموزشگاه1'),
(2, 'آموزشگاه2'),
(3, 'آموزشگاه3'),
(4, 'آموزشگاه4'),
(5, 'آموزشگاه5');

-- --------------------------------------------------------

--
-- Table structure for table `auth_passwd_request`
--

CREATE TABLE IF NOT EXISTS `auth_passwd_request` (
  `user_id`      INT(11)          NOT NULL,
  `hash`         VARCHAR(40)      NOT NULL,
  `request_time` INT(10) UNSIGNED NOT NULL DEFAULT '0',
  PRIMARY KEY (`hash`)
)
  ENGINE = MyISAM
  DEFAULT CHARSET = latin1;

--
-- Dumping data for table `auth_passwd_request`
--


-- --------------------------------------------------------

--
-- Table structure for table `ci_sessions`
--

CREATE TABLE IF NOT EXISTS `ci_sessions` (
  `session_id`    VARCHAR(40)      NOT NULL DEFAULT '0',
  `ip_address`    VARCHAR(16)      NOT NULL DEFAULT '0',
  `user_agent`    VARCHAR(100)     NOT NULL,
  `last_activity` INT(10) UNSIGNED NOT NULL DEFAULT '0',
  `user_data`     TEXT             NOT NULL,
  PRIMARY KEY (`session_id`)
)
  ENGINE = MyISAM
  DEFAULT CHARSET = latin1;

--
-- Dumping data for table `ci_sessions`
--


-- --------------------------------------------------------

--
-- Table structure for table `class`
--

CREATE TABLE IF NOT EXISTS `class` (
  `class_id`    INT(11) NOT NULL AUTO_INCREMENT,
  `academy_id`  INT(11) NOT NULL,
  `field_id`    INT(11) NOT NULL,
  `lesson_id`   INT(11) NOT NULL,
  `prof_id`     INT(11) NOT NULL,
  `join_status` TINYINT(1) DEFAULT '1',
  PRIMARY KEY (`class_id`),
  UNIQUE KEY `academy_id` (`academy_id`, `field_id`, `lesson_id`, `prof_id`)
)
  ENGINE = MyISAM
  DEFAULT CHARSET = latin1
  AUTO_INCREMENT = 2;

--
-- Dumping data for table `class`
--

INSERT INTO `class` (`class_id`, `academy_id`, `field_id`, `lesson_id`, `prof_id`, `join_status`) VALUES
(1, 1, 1, 1, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `field`
--

CREATE TABLE IF NOT EXISTS `field` (
  `field_id` INT(11)                 NOT NULL AUTO_INCREMENT,
  `name`     VARCHAR(50)
             CHARACTER SET utf8
             COLLATE utf8_persian_ci NOT NULL,
  PRIMARY KEY (`field_id`),
  UNIQUE KEY `name` (`name`)
)
  ENGINE = MyISAM
  DEFAULT CHARSET = latin1
  AUTO_INCREMENT = 6;

--
-- Dumping data for table `field`
--

INSERT INTO `field` (`field_id`, `name`) VALUES
(1, 'رشته1'),
(2, 'رشته2'),
(3, 'رشته3'),
(4, 'رشته4'),
(5, 'رشته5');

-- --------------------------------------------------------

--
-- Table structure for table `lesson`
--

CREATE TABLE IF NOT EXISTS `lesson` (
  `lesson_id` INT(11)                 NOT NULL AUTO_INCREMENT,
  `name`      VARCHAR(40)
              CHARACTER SET utf8
              COLLATE utf8_persian_ci NOT NULL,
  PRIMARY KEY (`lesson_id`),
  UNIQUE KEY `name` (`name`)
)
  ENGINE = MyISAM
  DEFAULT CHARSET = latin1
  AUTO_INCREMENT = 6;

--
-- Dumping data for table `lesson`
--

INSERT INTO `lesson` (`lesson_id`, `name`) VALUES
(1, 'درس1'),
(2, 'درس2'),
(3, 'درس3'),
(4, 'درس4'),
(5, 'درس5');

-- --------------------------------------------------------

--
-- Table structure for table `profile`
--

CREATE TABLE IF NOT EXISTS `profile` (
  `user_id`    BIGINT(32) NOT NULL,
  `full_name`  VARCHAR(40)
               CHARACTER SET utf8
               COLLATE utf8_persian_ci DEFAULT 'your name',
  `academy_id` INT(11) DEFAULT NULL,
  `field_id`   INT(11) DEFAULT NULL,
  `about`      TEXT
               CHARACTER SET utf8
               COLLATE utf8_persian_ci,
  PRIMARY KEY (`user_id`)
)
  ENGINE = MyISAM
  DEFAULT CHARSET = latin1;

--
-- Dumping data for table `profile`
--

INSERT INTO `profile` (`user_id`, `full_name`, `academy_id`, `field_id`, `about`) VALUES
(1, 'Ahmad Dehnavi222', 1, 1, 'about    about    about    about    about    about    about    about    about    about    about    about    about    about    about    about    about');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `user_id`  INT(11)                 NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(40)
             CHARACTER SET utf8
             COLLATE utf8_persian_ci NOT NULL,
  `email`    VARCHAR(50)             NOT NULL,
  `password` VARCHAR(40)             NOT NULL,
  `salt`     VARCHAR(40)             NOT NULL,
  `status`   TINYINT(1)              NOT NULL DEFAULT '0',
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
)
  ENGINE = MyISAM
  DEFAULT CHARSET = latin1
  AUTO_INCREMENT = 2;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `username`, `email`, `password`, `salt`, `status`) VALUES
(1, 'test1', 'test1@mail.com', 'b82f6248d26bed7653baa619bd1d0848b8d405b5', 'da94036d1fac11f7e7821ab379ce0e4f447fc0ac', 0);

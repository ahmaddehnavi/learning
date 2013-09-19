-- phpMyAdmin SQL Dump
-- version 2.11.9.2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Sep 14, 2013 at 01:39 PM
-- Server version: 5.0.67
-- PHP Version: 5.2.6

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


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
  `academy_id` int(11) NOT NULL auto_increment,
  `name` varchar(40) character set utf8 collate utf8_persian_ci NOT NULL,
  PRIMARY KEY  (`academy_id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

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
  `user_id` int(11) NOT NULL,
  `hash` varchar(40) NOT NULL,
  `request_time` int(10) unsigned NOT NULL default '0',
  PRIMARY KEY  (`hash`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `auth_passwd_request`
--


-- --------------------------------------------------------

--
-- Table structure for table `ci_sessions`
--

CREATE TABLE IF NOT EXISTS `ci_sessions` (
  `session_id` varchar(40) NOT NULL default '0',
  `ip_address` varchar(16) NOT NULL default '0',
  `user_agent` varchar(100) NOT NULL,
  `last_activity` int(10) unsigned NOT NULL default '0',
  `user_data` text NOT NULL,
  PRIMARY KEY  (`session_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ci_sessions`
--


-- --------------------------------------------------------

--
-- Table structure for table `class`
--

CREATE TABLE IF NOT EXISTS `class` (
  `class_id` int(11) NOT NULL auto_increment,
  `academy_id` int(11) NOT NULL,
  `field_id` int(11) NOT NULL,
  `lesson_id` int(11) NOT NULL,
  `prof_id` int(11) NOT NULL,
  `join_status` tinyint(1) default '1',
  PRIMARY KEY  (`class_id`),
  UNIQUE KEY `academy_id` (`academy_id`,`field_id`,`lesson_id`,`prof_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=7 ;

--
-- Dumping data for table `class`
--

INSERT INTO `class` (`class_id`, `academy_id`, `field_id`, `lesson_id`, `prof_id`, `join_status`) VALUES
(2, 1, 1, 2, 2, 1),
(6, 1, 1, 4, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `class_member`
--

CREATE TABLE IF NOT EXISTS `class_member` (
  `class_id` int(11) NOT NULL,
  `student_id` int(32) NOT NULL,
  `status` enum('wait','active','block') NOT NULL,
  PRIMARY KEY  (`class_id`,`student_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `class_member`
--

INSERT INTO `class_member` (`class_id`, `student_id`, `status`) VALUES
(5, 1, 'wait'),
(2, 1, 'wait');

-- --------------------------------------------------------

--
-- Table structure for table `field_table`
--

CREATE TABLE IF NOT EXISTS `field_table` (
  `field_id` int(11) NOT NULL auto_increment,
  `name` varchar(50) character set utf8 collate utf8_persian_ci NOT NULL,
  PRIMARY KEY  (`field_id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

--
-- Dumping data for table `field_table`
--

INSERT INTO `field_table` (`field_id`, `name`) VALUES
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
  `lesson_id` int(11) NOT NULL auto_increment,
  `name` varchar(40) character set utf8 collate utf8_persian_ci NOT NULL,
  PRIMARY KEY  (`lesson_id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

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
  `user_id` bigint(32) NOT NULL,
  `full_name` varchar(40) character set utf8 collate utf8_persian_ci default 'your name',
  `academy_id` int(11) default NULL,
  `field_id` int(11) default NULL,
  `about` text character set utf8 collate utf8_persian_ci,
  PRIMARY KEY  (`user_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `profile`
--

INSERT INTO `profile` (`user_id`, `full_name`, `academy_id`, `field_id`, `about`) VALUES
(1, 'Ahmad Dehnavi', 1, 1, 'about    about    about    about    about    about    about    about    about    about    about    about    about    about    about    about\r\nsd'),
(2, 'asgar jafari', 1, 1, 'salam');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `user_id` int(11) NOT NULL auto_increment,
  `username` varchar(40) character set utf8 collate utf8_persian_ci NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(40) NOT NULL,
  `salt` varchar(40) NOT NULL,
  `status` tinyint(1) NOT NULL default '0',
  PRIMARY KEY  (`user_id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `username`, `email`, `password`, `salt`, `status`) VALUES
(1, 'test1', 'test1@mail.com', 'b82f6248d26bed7653baa619bd1d0848b8d405b5', 'da94036d1fac11f7e7821ab379ce0e4f447fc0ac', 0),
(2, 'test2', 'test2@mail.com', '9cdcb5afe93fa858984921e893aec4010f308ee0', 'd40bc776406e7e4153c811ee5c31c223eba2c197', 0);

-- phpMyAdmin SQL Dump
-- version 2.11.9.2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Oct 18, 2013 at 04:01 PM
-- Server version: 5.0.67
-- PHP Version: 5.2.6

SET FOREIGN_KEY_CHECKS=0;

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
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `academy`
--

INSERT INTO `academy` (`academy_id`, `name`) VALUES
(1, 'shahrood');

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
  `number_of_change` bigint(32) default '0',
  `join_status` tinyint(1) default '1',
  PRIMARY KEY  (`class_id`),
  UNIQUE KEY `academy_id` (`academy_id`,`field_id`,`lesson_id`,`prof_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `class`
--

INSERT INTO `class` (`class_id`, `academy_id`, `field_id`, `lesson_id`, `prof_id`, `number_of_change`, `join_status`) VALUES
(1, 1, 2, 2, 2, 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `class_member`
--

CREATE TABLE IF NOT EXISTS `class_member` (
  `class_id` int(11) NOT NULL,
  `student_id` int(32) NOT NULL,
  `number_of_change` bigint(32) default '0',
  `status` enum('wait','active','block') NOT NULL,
  PRIMARY KEY  (`class_id`,`student_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `class_member`
--

INSERT INTO `class_member` (`class_id`, `student_id`, `number_of_change`, `status`) VALUES
(1, 3, 0, 'wait'),
(1, 1, 0, 'wait');

-- --------------------------------------------------------

--
-- Table structure for table `class_post`
--

CREATE TABLE IF NOT EXISTS `class_post` (
  `class_id` bigint(32) NOT NULL,
  `post_id` bigint(32) NOT NULL,
  PRIMARY KEY  (`class_id`,`post_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `class_post`
--


-- --------------------------------------------------------

--
-- Table structure for table `field_table`
--

CREATE TABLE IF NOT EXISTS `field_table` (
  `field_id` int(11) NOT NULL auto_increment,
  `name` varchar(50) character set utf8 collate utf8_persian_ci NOT NULL,
  PRIMARY KEY  (`field_id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `field_table`
--

INSERT INTO `field_table` (`field_id`, `name`) VALUES
(1, 'information technology'),
(2, 'software');

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
(1, 'data base'),
(2, 'network'),
(3, 'advanced programming'),
(4, 'integence'),
(5, 'plt');

-- --------------------------------------------------------

--
-- Table structure for table `message`
--

CREATE TABLE IF NOT EXISTS `message` (
  `message_id` bigint(32) NOT NULL auto_increment,
  `from_id` bigint(32) NOT NULL,
  `to_id` bigint(32) NOT NULL,
  `time` bigint(32) NOT NULL,
  `message` text collate ucs2_persian_ci NOT NULL,
  `is_read` tinyint(1) default '0',
  PRIMARY KEY  (`message_id`),
  KEY `from` (`from_id`),
  KEY `to` (`to_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=ucs2 COLLATE=ucs2_persian_ci AUTO_INCREMENT=4 ;

--
-- Dumping data for table `message`
--

INSERT INTO `message` (`message_id`, `from_id`, `to_id`, `time`, `message`, `is_read`) VALUES
(1, 1, 3, 1382111172, 'hello\r\nplease mail to me answer of exercise \r\ntank.', 0),
(2, 2, 1, 1382111482, 'hello', 0),
(3, 2, 3, 1382111519, 'hello', 0);

-- --------------------------------------------------------

--
-- Table structure for table `post`
--

CREATE TABLE IF NOT EXISTS `post` (
  `post_id` bigint(32) NOT NULL auto_increment,
  `author_id` bigint(32) NOT NULL,
  `post_type` enum('notice','exercise','booklet') default 'notice',
  `is_public` tinyint(1) default '0',
  `subject` varchar(100) character set utf8 collate utf8_persian_ci NOT NULL,
  `body` text character set utf8 collate utf8_persian_ci NOT NULL,
  PRIMARY KEY  (`post_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Dumping data for table `post`
--


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
(1, 'ahmad dehnavi', 1, 2, NULL),
(2, 'ehsan amiri', NULL, NULL, NULL),
(3, 'mostafa hasani', 1, 2, NULL);

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
  `last_active_time` timestamp NULL default CURRENT_TIMESTAMP,
  `status` tinyint(1) NOT NULL default '0',
  PRIMARY KEY  (`user_id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `username`, `email`, `password`, `salt`, `last_active_time`, `status`) VALUES
(1, 'ahmad829', 'ahmad.829@gmail.com', '0bc27e8964b8e2210b32c9c03ada7b19c8c759c9', '387f5ef33f2d5ffae948724c40286582a123d5e5', '0000-00-00 00:00:00', 0),
(2, 'ehsan', 'ehsan@gmail.com', 'ec4c35b7641196c6ceccecc79ff92595a025dfe6', 'e5b490daec7a9feca42c12cbc66842a1f1a357b8', '0000-00-00 00:00:00', 0),
(3, 'mostafa', 'mostafa@gmail.com', '15b2c3ec763a20b83786773657cb9ba5df2c9079', '78d80dcfc68e197a2dac9df282ca78a0cb229ac5', '0000-00-00 00:00:00', 0);

SET FOREIGN_KEY_CHECKS=1;

-- phpMyAdmin SQL Dump
-- version 3.5.8.2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Oct 22, 2013 at 01:14 AM
-- Server version: 5.5.31-log
-- PHP Version: 5.3.27

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `programy_panda`
--

-- --------------------------------------------------------

--
-- Table structure for table `post`
--

CREATE TABLE IF NOT EXISTS `post` (
  `post_id` bigint(32) NOT NULL AUTO_INCREMENT,
  `author_id` bigint(32) NOT NULL,
  `post_type` enum('notice','exercise','booklet') DEFAULT 'notice',
  `is_public` tinyint(1) DEFAULT '0',
  `time` bigint(32) unsigned NOT NULL,
  `subject` varchar(100) CHARACTER SET utf8 COLLATE utf8_persian_ci NOT NULL,
  `body` text CHARACTER SET utf8 COLLATE utf8_persian_ci NOT NULL,
  PRIMARY KEY (`post_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=22 ;

--
-- Dumping data for table `post`
--

INSERT INTO `post` (`post_id`, `author_id`, `post_type`, `is_public`, `time`, `subject`, `body`) VALUES
(1, 4, 'notice', 1, 0, 'hello', '<p>hello&nbsp;</p>\r\n\r\n<p>i am ahmad</p>\r\n\r\n<p><a href="/CodeIgniter/files/uploads/4/files/Page #3.jpg">/CodeIgniter/files/uploads/4/files/Page #3.jpg</a></p>\r\n\r\n<p><img alt="" src="/CodeIgniter/files/uploads/4/files/Page #3.jpg" /></p>'),
(2, 4, 'notice', 1, 0, 'hello', '<p>hello</p>\r\n\r\n<p>i am ahmad</p>\r\n\r\n<p>this is test message</p>\r\n\r\n <p><img alt="koala" src="/CodeIgniter/files/uploads/4/files/Koala.jpg"  /></p>'),
(3, 2, 'exercise', NULL, 0, 'exercise', '<p>exercise</p>\r\n\r\n<p>exercise</p>\r\n\r\n<p>exercise</p>\r\n\r\n<p>&nbsp;</p>'),
(4, 4, 'notice', 1, 0, 'سلام', '<p style="text-align: right;">سلام</p>\r\n\r\n<p style="text-align: right;">&nbsp;</p>'),
(5, 4, 'notice', 1, 0, 'سلام', '<p >سلام</p>\r\n\r\n <p >&nbsp;</p>'),
(6, 4, 'notice', 1, 0, 'سلام', '<p >سلام</p>\r\n\r\n <p >&nbsp;</p>'),
(7, 4, 'notice', 1, 0, 'html', '<p>&lt;html&gt;</p>'),
(17, 4, 'notice', NULL, 0, 'test', '<p><img alt="smiley" src="http://localhost/Codeigniter/files/js/ckeditor/plugins/smiley/images/regular_smile.gif" style="height:20px;width:20px;" title="smiley" /></p>'),
(9, 4, 'notice', 1, 0, 'subject', '&lt;? echo phpinfo();?&gt;\r\n<a href="#fdxfd">link</a>'),
(10, 4, 'notice', NULL, 0, 'سلام', '<p><img alt="" src="/CodeIgniter/files/uploads/4/files/public/Tulips.jpg" style="float:right;height:150px;width:200px;" /></p>'),
(11, 4, 'notice', 1, 0, 'subject', '<p><img alt="" src="/CodeIgniter/files/uploads/4/files/public/Tulips.jpg" style="float:right;height:225px;width:300px;" /></p><div class="badboy"></div>'),
(18, 4, 'booklet', 1, 0, 'fsdf', '<p>sdfsd</p>'),
(19, 4, 'notice', NULL, 0, 'fsdf', '<p>fsdf</p>'),
(20, 4, 'notice', NULL, 0, 'fsdf', '<p>fsdf</p>'),
(21, 2, 'notice', NULL, 1382391061, 'test', '<p>time test</p>');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

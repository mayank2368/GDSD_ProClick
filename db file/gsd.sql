-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 16, 2022 at 02:39 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gsd`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_image_data`
--

CREATE TABLE `tbl_image_data` (
  `id` int(11) NOT NULL,
  `title` varchar(30) NOT NULL DEFAULT '',
  `description` varchar(30) NOT NULL DEFAULT '',
  `ipath` varchar(250) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_image_data`
--

INSERT INTO `tbl_image_data` (`id`, `title`, `description`, `ipath`) VALUES
(1, 'Hello', 'Tom', 'https://www.tourismus-fulda.de/'),
(2, 'bello', 'testing images path', '1christmas.jpg'),
(3, 'hello', 'testing image', '/mnt/c/Users/Hamza/Desktop/gsd_server/uploads/2022-05-18T08-37-34.211ZMiNorZouq.jpeg'),
(4, 'hello', 'testing image', '2022-05-18T08-42-09.734ZMiNorZouq.jpeg'),
(5, 'hello', 'testing image', '2022-05-18T11-21-53.895ZCopy of Eid Mubarak - Made with PosterMyWall.jpg'),
(6, 'hello', 'testing image', '2022-05-18T12-52-35.075ZCopy of Eid Mubarak - Made with PosterMyWall.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_media`
--

CREATE TABLE `tbl_media` (
  `media_id` int(10) NOT NULL,
  `title` varchar(100) NOT NULL,
  `media_category` varchar(50) NOT NULL,
  `sub_category` varchar(50) NOT NULL,
  `description` varchar(600) NOT NULL,
  `media_path` varchar(150) NOT NULL,
  `price` double(6,2) NOT NULL,
  `is_free` tinyint(1) NOT NULL DEFAULT 0,
  `status` varchar(15) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_media`
--

INSERT INTO `tbl_media` (`media_id`, `title`, `media_category`, `sub_category`, `description`, `media_path`, `price`, `is_free`, `status`, `user_id`) VALUES
(103, '21212df', 'dds', 'df', 'ddf', '2022-06-08T17-38-08.333ZCapturedwdw.PNG', 12.00, 0, 'approved', 1);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_sales`
--

CREATE TABLE `tbl_sales` (
  `sale_id` int(11) NOT NULL,
  `created_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `media_id` int(10) NOT NULL,
  `buyer_id` int(11) NOT NULL,
  `seller_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_sales`
--

INSERT INTO `tbl_sales` (`sale_id`, `created_date`, `media_id`, `buyer_id`, `seller_id`) VALUES
(1, '2022-06-16 12:31:16', 103, 1, 2);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `is_verified` tinyint(1) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `first_name`, `last_name`, `email`, `password`, `role`, `is_verified`, `token`, `createdAt`, `updatedAt`) VALUES
(2, 'hamza', 'mazhar', 'mayank123@gmail.com', '$2a$10$RGUXS6drsuKTzgf9yBlSB.6hXuG/updpdBJW.2PmDPrypC981Irxq', 'admin', NULL, '9fb183165540612cf601f81afcedb285', '2022-06-08 17:22:16', '2022-06-08 17:22:16'),
(3, 'bilal', 'ahmad', 'bilal@gmail.com', 'bilal', 'admin', NULL, NULL, '2022-06-14 17:18:14', '2022-06-14 17:18:14');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_image_data`
--
ALTER TABLE `tbl_image_data`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_media`
--
ALTER TABLE `tbl_media`
  ADD PRIMARY KEY (`media_id`);

--
-- Indexes for table `tbl_sales`
--
ALTER TABLE `tbl_sales`
  ADD PRIMARY KEY (`sale_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_image_data`
--
ALTER TABLE `tbl_image_data`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `tbl_media`
--
ALTER TABLE `tbl_media`
  MODIFY `media_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=104;

--
-- AUTO_INCREMENT for table `tbl_sales`
--
ALTER TABLE `tbl_sales`
  MODIFY `sale_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

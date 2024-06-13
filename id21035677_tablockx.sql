-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jun 13, 2024 at 04:47 AM
-- Server version: 10.5.20-MariaDB
-- PHP Version: 7.3.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `id21035677_tablockx`
--

-- --------------------------------------------------------

--
-- Table structure for table `logs`
--

CREATE TABLE `logs` (
  `id` int(11) NOT NULL,
  `des` varchar(200) NOT NULL,
  `time` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `logs`
--

INSERT INTO `logs` (`id`, `des`, `time`) VALUES
(1, 'pop', '2024-01-28 12:58:33'),
(2, 'startup log', '2024-01-28 18:34:37'),
(3, 'startup log', '2024-01-28 18:38:35'),
(4, 'startup log', '2024-01-28 19:26:09'),
(5, 'startup log', '2024-01-29 14:55:40'),
(6, 'startup log', '2024-01-29 17:34:19'),
(7, 'startup log', '2024-01-31 20:59:42'),
(8, 'startup log', '2024-02-01 08:48:24'),
(9, 'startup log', '2024-02-01 09:04:03'),
(10, 'startup log', '2024-02-01 19:35:43'),
(11, 'startup log', '2024-02-02 15:08:37'),
(12, 'startup log', '2024-02-02 20:16:39'),
(13, 'startup log', '2024-02-03 19:34:09'),
(14, 'startup log', '2024-02-03 20:26:03'),
(15, 'startup log', '2024-02-04 11:13:47'),
(16, 'startup log', '2024-02-06 09:34:01'),
(17, 'startup log', '2024-02-07 20:10:47'),
(18, 'startup log', '2024-02-07 21:21:25'),
(19, 'startup log', '2024-02-07 21:53:28'),
(20, 'startup log', '2024-02-09 18:08:25'),
(21, 'startup log', '2024-02-10 20:17:16'),
(22, 'startup log', '2024-02-10 22:05:24'),
(23, 'startup log', '2024-02-14 20:23:10');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(200) NOT NULL,
  `profile_pic` varchar(200) DEFAULT NULL,
  `password` varchar(200) NOT NULL,
  `reset_password` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `profile_pic`, `password`, `reset_password`) VALUES
(22, 'imvks786@gmail.com', 'upload/1689829519.png', '$2y$10$ja3DkhkdxAHRbo/kofNqZelTCjdFbyF6h.nedV7eISdjJ63rmAmsK', '7Mw5370JOc'),
(28, 'viveksingh9891285537@gmail.com', 'upload/1690258052.jpg', '$2y$10$tMP4f0yLWqlOvLXTft5CYumFCRN1wJKOrepO6oMfVg7Wk80yHU/am', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user_port`
--

CREATE TABLE `user_port` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `user_port`
--

INSERT INTO `user_port` (`id`, `username`, `password`) VALUES
(1, 'admin', 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `verification`
--

CREATE TABLE `verification` (
  `id` int(11) NOT NULL,
  `email` varchar(200) NOT NULL,
  `token` varchar(200) NOT NULL,
  `status` varchar(200) NOT NULL,
  `password` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `verification`
--

INSERT INTO `verification` (`id`, `email`, `token`, `status`, `password`) VALUES
(22, 'viveksingh9891285537@gmail.com', 'QplRlbvnRTXRnnhe7CWH', '0', '$2y$10$57AACQXhJMbgONDbIctnCOGUTBJTI.C2IPbr3MJFt1BPNfR1Uh3bi'),
(26, 'viveksingh9891285537@gmail.com', 'ARyhPlDi8v0DaiEKjflz', '0', '$2y$10$O55BAIGHJTLcbsnmnPGfB.KYIjBi8RjoL3aPSbZsQsGbyPXPxtuQ6'),
(27, 'viveksingh9891285537@gmail.com', 'S6jbvDtrykF9o3RUmUDx', '0', '$2y$10$MGMX/aRd6OJiy31lMER5UeE2GmtjMbThmP4v3oqZTs4IGpuMWg65W');

--
-- Triggers `verification`
--
DELIMITER $$
CREATE TRIGGER `add_user` AFTER UPDATE ON `verification` FOR EACH ROW IF NEW.status = 1 THEN
    INSERT INTO users (email,password) VALUES (NEW.email,NEW.password);
END IF
$$
DELIMITER ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `logs`
--
ALTER TABLE `logs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_port`
--
ALTER TABLE `user_port`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `verification`
--
ALTER TABLE `verification`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `logs`
--
ALTER TABLE `logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `user_port`
--
ALTER TABLE `user_port`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `verification`
--
ALTER TABLE `verification`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

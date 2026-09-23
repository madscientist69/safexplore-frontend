-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Sep 23, 2026 at 01:26 PM
-- Server version: 11.4.13-MariaDB
-- PHP Version: 8.4.24

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `unalityc_webpatrol_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `scans`
--

CREATE TABLE `scans` (
  `id` int(11) NOT NULL,
  `url` text NOT NULL,
  `is_infected` tinyint(1) NOT NULL,
  `findings` text DEFAULT NULL,
  `region` varchar(100) DEFAULT NULL,
  `scan_date` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `scans`
--

INSERT INTO `scans` (`id`, `url`, `is_infected`, `findings`, `region`, `scan_date`) VALUES
(1, 'https://www.unib.ac.id/', 0, '[]', 'Sumatera', '2026-09-21 06:24:59'),
(2, 'https://dummy-univ-surabaya.netlify.app/', 1, '[\"Ditemukan kata kunci injeksi: slot, gacor, judi, togel, maxwin\", \"Ditemukan tautan tersembunyi (Indikasi manipulasi SEO).\"]', 'Jawa', '2026-09-21 06:25:31'),
(3, 'https://smkn1bengkulu.sch.id/', 0, '[]', 'Sumatera', '2026-09-21 06:26:39'),
(4, 'https://unihaz.ac.id/', 0, '[]', 'Sumatera', '2026-09-21 06:28:05'),
(6, 'www.unpad.ac.id', 0, '[]', 'Jawa', '2026-09-22 02:34:22'),
(8, 'https://sikamu.umb.ac.id/', 0, '[]', 'Sumatera', '2026-09-22 14:03:53');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `scans`
--
ALTER TABLE `scans`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `scans`
--
ALTER TABLE `scans`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
unalityc_webpatrol_dbunalityc_webpatrol_dbunalityc_webpatrol_dbunalityc_webpatrol_db
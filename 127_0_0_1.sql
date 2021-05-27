-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 17, 2021 at 02:28 PM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `iniot`
--
CREATE DATABASE IF NOT EXISTS `iniot` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `iniot`;

-- --------------------------------------------------------

--
-- Table structure for table `alumnos`
--

CREATE TABLE `alumnos` (
  `id` int(11) NOT NULL,
  `dni` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `carritos`
--

CREATE TABLE `carritos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `detalle` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `carritos`
--

INSERT INTO `carritos` (`id`, `nombre`, `cantidad`, `detalle`) VALUES
(16, 'Carrito Uno', 30, 'No dejaron el Remito cuando entregaron las netbooks'),
(17, 'Carrito Dos', 30, '');

-- --------------------------------------------------------

--
-- Table structure for table `devoluciones`
--

CREATE TABLE `devoluciones` (
  `id` int(11) NOT NULL,
  `id_prestamo` int(11) NOT NULL,
  `fecha` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `docentes`
--

CREATE TABLE `docentes` (
  `id` int(11) NOT NULL,
  `dni` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `estados`
--

CREATE TABLE `estados` (
  `id` int(11) NOT NULL,
  `estado` varchar(20) NOT NULL,
  `nombre_estado` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `estados`
--

INSERT INTO `estados` (`id`, `estado`, `nombre_estado`) VALUES
(29, 'ACTIVA', 'Teclado'),
(30, 'ACTIVA', 'Desbloqueada'),
(31, 'INACTIVA', 'Bloqueada'),
(32, 'INACTIVA', 'Pantalla Rota'),
(33, 'ACTIVA', 'No detecta Bateria'),
(38, 'INACTIVA', 'Teclado Roto');

-- --------------------------------------------------------

--
-- Table structure for table `estados_netbooks`
--

CREATE TABLE `estados_netbooks` (
  `id` int(11) NOT NULL,
  `id_netbook` int(11) NOT NULL,
  `id_estado` int(11) NOT NULL,
  `fecha` datetime NOT NULL,
  `observaciones` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `estados_netbooks`
--

INSERT INTO `estados_netbooks` (`id`, `id_netbook`, `id_estado`, `fecha`, `observaciones`) VALUES
(5, 39, 29, '2021-05-04 08:57:00', 'Se presto a un alumno y devolvio con una tecla rota'),
(6, 39, 33, '2021-05-12 09:36:00', 'No detecta la bateria.-'),
(7, 31, 31, '2021-05-10 07:30:00', 'Pila agotada -'),
(8, 32, 31, '2021-05-11 08:10:00', 'Pila agotada'),
(9, 30, 29, '2021-05-12 08:55:00', 'Le falta la tecla \"ñ\"');

-- --------------------------------------------------------

--
-- Table structure for table `netbook`
--

CREATE TABLE `netbook` (
  `id` int(11) NOT NULL,
  `numero` varchar(10) NOT NULL,
  `serie` varchar(50) NOT NULL,
  `macaddress` varchar(50) DEFAULT NULL,
  `carrito` int(11) NOT NULL,
  `detalle` text DEFAULT NULL,
  `marca` varchar(100) DEFAULT NULL,
  `modelo` varchar(100) NOT NULL,
  `estado` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `netbook`
--

INSERT INTO `netbook` (`id`, `numero`, `serie`, `macaddress`, `carrito`, `detalle`, `marca`, `modelo`, `estado`) VALUES
(29, '101', 'AA9027170801', '', 16, '', 'NOBLEX', 'SF20BA', NULL),
(30, '102', 'AA7027084249', '', 16, '', 'NOBLEX', 'SF20BA', NULL),
(31, '103', 'AA4027139827', '', 16, '', 'NOBLEX', 'SF20BA', NULL),
(32, '104', 'AA1027162004', '', 16, '', 'NOBLEX', 'SF20BA', NULL),
(33, '105', 'AA7027216190', '', 16, '', 'NOBLEX', 'SF20BA', NULL),
(34, '106', 'AA1027237421', '', 16, '', 'NOBLEX', 'SF20BA', NULL),
(35, '107', 'AA7027067117', '', 16, '', 'NOBLEX', 'SF20BA', NULL),
(36, '108', 'AA9027151112', '', 16, '', 'NOBLEX', 'SF20BA', NULL),
(37, '109', 'AA9027062865', '', 16, '', 'NOBLEX', 'SF20BA', NULL),
(38, '110', 'AA8027240919', '', 16, '', 'NOBLEX', 'SF20BA', NULL),
(39, '201', 'AA9027273753', '', 17, '', 'NOBLEX', 'SF20BA', NULL),
(40, '202', 'AA9027272732', '', 17, '', 'NOBLEX', 'SF20BA', NULL),
(41, '203', 'AA8027086422', '', 17, '', 'NOBLEX', 'SF20BA', NULL),
(42, '204', 'AA9027259076', '', 17, '', 'NOBLEX', 'SF20BA', NULL),
(43, '205', 'AA9027228044', '', 17, '', 'NOBLEX', 'SF20BA', NULL),
(44, '206', 'AA9027285512', '', 17, '', 'NOBLEX', 'SF20BA', NULL),
(45, '207', 'AA8027158843', '', 17, '', 'NOBLEX', 'SF20BA', NULL),
(46, '208', 'AA9027290945', '', 17, '', 'NOBLEX', 'SF20BA', NULL),
(47, '209', 'AA9027259927', '', 17, '', 'NOBLEX', 'SF20BA', NULL),
(48, '210', 'AA3027031151', '', 17, '', 'NOBLEX', 'SF20BA', NULL),
(49, '211', 'AA3027021739', '', 17, '', 'NOBLEX', 'SF20BA', NULL),
(50, '212', 'AA9027175790', '', 17, '', 'NOBLEX', 'SF20BA', NULL),
(51, '213', 'AA9027271176', '', 17, '', 'NOBLEX', 'SF20BA', NULL),
(52, '214', 'AA9027270442', '', 17, '', 'NOBLEX', 'SF20BA', NULL),
(53, '215', 'AA9027182797', '', 17, '', 'NOBLEX', 'SF20BA', NULL),
(54, '216', 'AA9027276851', '', 17, '', 'NOBLEX', 'SF20BA', NULL),
(55, '217', 'AA9027255533', '', 17, '', 'NOBLEX', 'SF20BA', NULL),
(56, '218', 'AA9027257373', '', 17, '', 'NOBLEX', 'SF20BA', NULL),
(57, '219', 'AA9027272307', '', 17, '', 'NOBLEX', 'SF20BA', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `prestamos`
--

CREATE TABLE `prestamos` (
  `id` int(11) NOT NULL,
  `nombre_usuario` varchar(200) NOT NULL,
  `id_netbook` int(11) NOT NULL,
  `fecha` datetime NOT NULL,
  `observacion` text DEFAULT NULL,
  `devolvio` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `prestamos`
--

INSERT INTO `prestamos` (`id`, `nombre_usuario`, `id_netbook`, `fecha`, `observacion`, `devolvio`) VALUES
(12, 'Marcos Copetti', 29, '2021-05-12 08:30:30', 'Presentacion practico c/proyector', 0),
(13, 'El Charco', 48, '2021-05-12 08:35:53', '', 0),
(14, 'Schulz Facundo', 39, '2021-05-13 08:58:01', 'Lleva hoy', 0),
(15, 'Alves de Almeida Jose', 40, '2021-05-13 08:58:28', 'LLeva ahora', 0);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `password` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `nombre`, `password`) VALUES
(1, 'marcos', 'password'),
(2, 'marcos2', 'password'),
(3, 'marcos3', 'password'),
(4, 'marcos4', 'password');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `alumnos`
--
ALTER TABLE `alumnos`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `carritos`
--
ALTER TABLE `carritos`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `devoluciones`
--
ALTER TABLE `devoluciones`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `docentes`
--
ALTER TABLE `docentes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `estados`
--
ALTER TABLE `estados`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `estados_netbooks`
--
ALTER TABLE `estados_netbooks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_netbook` (`id_netbook`),
  ADD KEY `id_estado` (`id_estado`);

--
-- Indexes for table `netbook`
--
ALTER TABLE `netbook`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `prestamos`
--
ALTER TABLE `prestamos`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `alumnos`
--
ALTER TABLE `alumnos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `carritos`
--
ALTER TABLE `carritos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `devoluciones`
--
ALTER TABLE `devoluciones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `docentes`
--
ALTER TABLE `docentes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `estados`
--
ALTER TABLE `estados`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `estados_netbooks`
--
ALTER TABLE `estados_netbooks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `netbook`
--
ALTER TABLE `netbook`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT for table `prestamos`
--
ALTER TABLE `prestamos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `estados_netbooks`
--
ALTER TABLE `estados_netbooks`
  ADD CONSTRAINT `estados_netbooks_ibfk_1` FOREIGN KEY (`id_netbook`) REFERENCES `netbook` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `estados_netbooks_ibfk_2` FOREIGN KEY (`id_estado`) REFERENCES `estados` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

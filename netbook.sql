-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 13-05-2021 a las 18:41:37
-- Versión del servidor: 10.4.11-MariaDB
-- Versión de PHP: 7.4.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `iniot`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `netbook`
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
-- Volcado de datos para la tabla `netbook`
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

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `netbook`
--
ALTER TABLE `netbook`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `netbook`
--
ALTER TABLE `netbook`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

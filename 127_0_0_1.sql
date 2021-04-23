-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 23-04-2021 a las 14:29:18
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
CREATE DATABASE IF NOT EXISTS `iniot` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `iniot`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alumnos`
--

CREATE TABLE `alumnos` (
  `id` int(11) NOT NULL,
  `dni` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carritos`
--

CREATE TABLE `carritos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `detalle` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `carritos`
--

INSERT INTO `carritos` (`id`, `nombre`, `cantidad`, `detalle`) VALUES
(14, 'Carrito Uno', 30, ''),
(15, 'Carrito Dos', 30, 'Este tiene detalles');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `docentes`
--

CREATE TABLE `docentes` (
  `id` int(11) NOT NULL,
  `dni` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estados`
--

CREATE TABLE `estados` (
  `id` int(11) NOT NULL,
  `id_netbook` int(11) NOT NULL,
  `detalle` text NOT NULL,
  `fecha` date NOT NULL,
  `estado` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `estados`
--

INSERT INTO `estados` (`id`, `id_netbook`, `detalle`, `fecha`, `estado`) VALUES
(1, 2, 'Netbook Bloqueada', '2021-04-20', 'INACTIVA'),
(2, 2, 'No funciona el teclado', '2021-04-13', 'INACTIVA'),
(3, 2, 'Pila agotada', '2021-04-01', 'INACTIVA'),
(4, 2, 'l-jghxzxcvhbjnkml', '2021-04-22', 'ACTIVA'),
(5, 2, 'Estoy agregando este estado', '2021-04-22', 'INACTIVA'),
(6, 2, '1231243213523452345', '2021-04-22', 'ACTIVA'),
(7, 2, '123456789876543', '2021-04-21', 'INACTIVA'),
(8, 2, '123456789876543', '2021-04-21', 'INACTIVA'),
(9, 2, '124ryfgadfasdf', '2021-04-22', 'ACTIVA'),
(10, 2, '124ryfgadfasdf', '2021-04-22', 'ACTIVA'),
(11, 2, '124ryfgadfasdf', '2021-04-22', 'ACTIVA'),
(12, 2, 'asdfasdf', '2021-04-06', 'ACTIVA'),
(13, 2, 'vamosssssssssssssssssssssssssssssss', '2021-04-23', 'ACTIVA'),
(14, 2, 'asdszdfhsfghdfgh', '2021-04-13', 'ACTIVA'),
(15, 2, 'asdszdfhsfghdfgh', '2021-04-13', 'ACTIVA'),
(16, 2, 'sdfghjklñ´poij', '2021-04-21', 'ACTIVA'),
(17, 2, '1231212312', '2021-04-17', 'ACTIVA'),
(18, 2, '1231212312', '2021-04-17', 'ACTIVA');

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
(1, '101', 'AA20304050', NULL, 14, NULL, NULL, '', 'ACTIVA'),
(2, '101', 'AA34343434', 'DD:34:AB:CD', 15, 'asdfasdfasdf asddfasdf sadfasdfasdf fasdfasdf asdfasdfasdf asdf asdfasdf asdf sadf', 'NOBLEX', 'AS20AF', NULL),
(3, '101', 'AA34343434', 'DD:34:AB:CD', 15, 'Contra el corona virus', 'NOBLEX', 'AS20AF', NULL),
(4, '101', 'AA34343434', 'DD:34:AB:CD', 15, 'Contra el corona virus', 'NOBLEX', 'AS20AF', NULL),
(5, '102', 'AA10203040', 'DD:34:AB:00', 15, 'Contra el corona virus', 'NOBLEX', 'AS20AF', NULL),
(6, '103', 'AA10203040', 'DD:34:AB:00', 15, 'Contra el corona virus', 'NOBLEX', 'AS20AF', NULL),
(7, '104', 'AA20304051', 'DD:34:AB:CD', 15, 'Contra el dengue', 'NOBLEX', 'AS20AF', NULL),
(8, '203', 'AA102030221', 'DD:34:AB:CD', 15, '', 'NOBLEX', '', NULL),
(9, '109', 'AAASDFSADF', '', 15, '', '', '', NULL),
(10, '101', 'AA20304050', 'DD:34:AB:CD', 15, '', '', '', NULL),
(11, '110', 'AA20505050', 'DD:34:AB:CD', 15, '', '', '', NULL),
(12, '120', 'AA1111111111', 'DD:34:AB:CD', 15, '', '', '', NULL),
(13, '101', 'AA20304050', 'DD:34:AB:CD', 15, '', '', '', NULL),
(14, '101', 'AA20304050', '12345', 15, '', '', '', NULL),
(15, '101', 'AA20304050', 'DD:34:AB:CD', 15, '', '', '', NULL),
(16, '101', 'AA20304050', 'DD:34:AB:CD', 15, '', '', '', NULL),
(17, '101', 'AA20304050', 'DD:34:AB:CD', 15, '', '', '', NULL),
(18, '101', 'AA34343434', 'DD:34:AB:CD', 15, '', '', '', NULL),
(19, '1014', 'AA203040504', 'DD:34:AB:CD', 14, 'Netbook no reconoce la bateria', '', '', 'INACTIVA'),
(20, '10145', 'AA2030405042', 'DD:34:AB:CD', 14, '', '', '', NULL),
(21, '2020', 'AA1414141414', 'MACADDRESS', 14, '', '', '', NULL),
(22, '2021', 'AA141414142', 'ASDFASDF', 14, '', '', '', NULL),
(23, '101223', 'AA203042', 'DD:34:AB:CD', 14, '', 'NOBLEX', '', NULL),
(24, '2055', 'AA20304059', '12345', 14, '', '', '', NULL),
(25, '1013', 'AA203040503', 'DD:34:AB:CD', 14, '', '', '', NULL),
(26, '10135', 'AA2030405035', 'DD:34:AB:CD', 14, '', '', '', NULL),
(27, '1', 'MARCOS', 'MARCOS', 14, '', 'MARCOS', '', NULL),
(28, '10166', 'AA2030405033', '', 14, '', '', '', NULL);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `alumnos`
--
ALTER TABLE `alumnos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `carritos`
--
ALTER TABLE `carritos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `docentes`
--
ALTER TABLE `docentes`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `estados`
--
ALTER TABLE `estados`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `netbook`
--
ALTER TABLE `netbook`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `alumnos`
--
ALTER TABLE `alumnos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `carritos`
--
ALTER TABLE `carritos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `docentes`
--
ALTER TABLE `docentes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `estados`
--
ALTER TABLE `estados`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `netbook`
--
ALTER TABLE `netbook`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

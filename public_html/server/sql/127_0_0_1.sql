SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

CREATE DATABASE IF NOT EXISTS `tienda` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `tienda`;


--------------------------------------------------------------------------------
-- Creación de la tabla de relación 'administrador'
--------------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `administrador` (
  `id` int(20) unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `direccion` varchar(100) NOT NULL,
  `telefono` varchar(16) NOT NULL,
  `email` varchar(25) NOT NULL,
  `alias` varchar(16) NOT NULL,
  `password` varchar(16) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `alias` (`alias`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;


--------------------------------------------------------------------------------
-- Inserción de tuplas en la tabla 'administrador'
--------------------------------------------------------------------------------

INSERT INTO `administrador` (`id`, `nombre`, `apellido`, `direccion`, `telefono`, `email`, `alias`, `password`) VALUES
(1, 'admin', 'admin', 'admin', 'admin', 'admin', 'admin', 'admin');


--------------------------------------------------------------------------------
-- Creación de la tabla de relación 'categoria'
--------------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `categoria` (
  `id` int(20) unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;


--------------------------------------------------------------------------------
-- Creación de la tabla de relación 'linea_pedido'
--------------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `linea_pedido` (
  `id` int(20) unsigned NOT NULL AUTO_INCREMENT,
  `id_pedido` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;


--------------------------------------------------------------------------------
-- Creación de la tabla de relación 'pedido'
--------------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `pedido` (
  `id` int(20) unsigned NOT NULL AUTO_INCREMENT,
  `usuario` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;


--------------------------------------------------------------------------------
-- Creación de la tabla de relación 'producto'
--------------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `producto` (
  `id` int(20) unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `descripcion` varchar(255) NOT NULL,
  `precio` float NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `nombre` (`nombre`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;


--------------------------------------------------------------------------------
-- Inserción de tuplas en la tabla 'producto'
--------------------------------------------------------------------------------

INSERT INTO `producto` (`id`, `nombre`, `descripcion`, `precio`) VALUES
(1, 'Farming Simulator 2014', 'Simuladorzaco', 24.99);


--------------------------------------------------------------------------------
-- Creación de la tabla de relación 'usuario'
--------------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `usuario` (
  `id` int(20) unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `direccion` varchar(100) NOT NULL,
  `telefono` varchar(16) NOT NULL,
  `email` varchar(25) NOT NULL,
  `alias` varchar(16) NOT NULL,
  `password` varchar(16) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `alias` (`alias`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;


--------------------------------------------------------------------------------
-- Creación de la tabla de relación 'producto_categorias'
--------------------------------------------------------------------------------

CREATE TABLE `producto_categorias` (
	`idProducto` INT(11) NULL DEFAULT NULL,
	`idCategoria` INT(11) NULL DEFAULT NULL,
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	PRIMARY KEY (`id`)
)
ENGINE=InnoDB AUTO_INCREMENT=4;
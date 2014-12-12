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


INSERT INTO `administrador` (`id`, `nombre`, `apellido`, `direccion`, `telefono`, `email`, `alias`, `password`) VALUES
(1, 'admin', 'admin', 'admin', 'admin', 'admin', 'admin', 'admin');


CREATE TABLE IF NOT EXISTS `categoria` (
  `id` int(20) unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;


INSERT INTO `tienda`.`categoria` (`id`, `nombre`) VALUES (1, 'RPG');
INSERT INTO `tienda`.`categoria` (`id`, `nombre`) VALUES (2, 'FPS');
INSERT INTO `tienda`.`categoria` (`id`, `nombre`) VALUES (3, 'F2P');
INSERT INTO `tienda`.`categoria` (`id`, `nombre`) VALUES (4, 'Acción');
INSERT INTO `tienda`.`categoria` (`id`, `nombre`) VALUES (5, 'Aventura');
INSERT INTO `tienda`.`categoria` (`id`, `nombre`) VALUES (6, '3PS');


CREATE TABLE IF NOT EXISTS `linea_pedido` (
  `id` int(20) unsigned NOT NULL AUTO_INCREMENT,
  `id_pedido` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;


CREATE TABLE IF NOT EXISTS `pedido` (
  `id` int(20) unsigned NOT NULL AUTO_INCREMENT,
  `usuario` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;


CREATE TABLE IF NOT EXISTS `producto` (
  `id` int(20) unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `descripcion` varchar(255) NOT NULL,
  `precio` float NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `nombre` (`nombre`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;


INSERT INTO `tienda`.`producto` (`id`, `nombre`, `descripcion`, `precio`) 
VALUES (1, 'Dragon Age: Inquisition', 'Texto de Ejemplo', 50);
INSERT INTO `tienda`.`producto` (`id`, `nombre`, `descripcion`, `precio`) 
VALUES (2, 'Batman Arkham Knigth', 'Texto de Ejemplo', 50);
INSERT INTO `tienda`.`producto` (`id`, `nombre`, `descripcion`, `precio`) 
VALUES (3, 'Dishonored', 'Texto de Ejemplo', 30);
INSERT INTO `tienda`.`producto` (`id`, `nombre`, `descripcion`, `precio`) 
VALUES (4, 'Metal Gear Solid Rising', 'Texto de Ejemplo', 50);
INSERT INTO `tienda`.`producto` (`id`, `nombre`, `descripcion`, `precio`) 
VALUES (5, 'The Witcher 3', 'Texto de Ejemplo', 60);
INSERT INTO `tienda`.`producto` (`id`, `nombre`, `descripcion`, `precio`) 
VALUES (6, 'Gears of War 3', 'Texto de Ejemplo', 50);
INSERT INTO `tienda`.`producto` (`id`, `nombre`, `descripcion`, `precio`) 
VALUES (7, 'Dead Rising 3', 'Texto de Ejemplo', 50);


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


CREATE TABLE IF NOT EXISTS `producto_categorias` (
	`idProducto` INT(11) NULL DEFAULT NULL,
	`idCategoria` INT(11) NULL DEFAULT NULL,
	`idRelacion` INT(11) NOT NULL AUTO_INCREMENT,
	PRIMARY KEY (`idRelacion`)
)ENGINE=InnoDB AUTO_INCREMENT=4;


INSERT INTO `tienda`.`producto_categorias` (`idProducto`, `idCategoria`) VALUES (1, 4);
INSERT INTO `tienda`.`producto_categorias` (`idProducto`, `idCategoria`) VALUES (2, 4);
INSERT INTO `tienda`.`producto_categorias` (`idProducto`, `idCategoria`) VALUES (2, 5);
INSERT INTO `tienda`.`producto_categorias` (`idProducto`, `idCategoria`) VALUES (3, 4);
INSERT INTO `tienda`.`producto_categorias` (`idProducto`, `idCategoria`) VALUES (3, 5);
INSERT INTO `tienda`.`producto_categorias` (`idProducto`, `idCategoria`) VALUES (4, 4);
INSERT INTO `tienda`.`producto_categorias` (`idProducto`, `idCategoria`) VALUES (5, 4);
INSERT INTO `tienda`.`producto_categorias` (`idProducto`, `idCategoria`) VALUES (5, 5);
INSERT INTO `tienda`.`producto_categorias` (`idProducto`, `idCategoria`) VALUES (6, 2);
INSERT INTO `tienda`.`producto_categorias` (`idProducto`, `idCategoria`) VALUES (7, 4);
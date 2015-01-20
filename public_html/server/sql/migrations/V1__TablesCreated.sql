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


INSERT INTO `categoria` (`id`, `nombre`) VALUES (1, 'RPG');
INSERT INTO `categoria` (`id`, `nombre`) VALUES (2, 'FPS');
INSERT INTO `categoria` (`id`, `nombre`) VALUES (3, 'F2P');
INSERT INTO `categoria` (`id`, `nombre`) VALUES (4, 'Accion');
INSERT INTO `categoria` (`id`, `nombre`) VALUES (5, 'Aventura');
INSERT INTO `categoria` (`id`, `nombre`) VALUES (6, '3PS');


CREATE TABLE IF NOT EXISTS `pedido` (
  `id` int(20) unsigned NOT NULL AUTO_INCREMENT,
  `usuario` int(11) NOT NULL,
  `estado` VARCHAR(10) NULL NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `usuario` (`usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;


CREATE TABLE IF NOT EXISTS `linea_pedido` (
  `id` int(20) unsigned NOT NULL AUTO_INCREMENT,
  `id_pedido` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;


CREATE TABLE IF NOT EXISTS `producto` (
  `id` int(20) unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `descripcion` varchar(1000) NOT NULL,
  `precio` float NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `nombre` (`nombre`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;


INSERT INTO `producto` (`id`, `nombre`, `descripcion`, `precio`) 
VALUES (1, 'Dragon Age: Inquisition', 'Un cataclismo ha sumido las tierras de Thedas en la confusiÃ³n. Los Dragones oscurecen los cielos, invocando a las sombras del terror sobre el reino que en un tiempo fue pacÃ­fico. Los Magos inician una guerra sin cuartel contra los opresivos Templarios. Las naciones se levantan unas contra otras. Depende de ti y de tu grupo de hÃ©roes legendarios restablecer el orden como lider de la inquisiciÃ³n, cazando a los agentes del caos.', 50);
/*INSERT INTO `producto` (`id`, `nombre`, `descripcion`, `precio`) 
VALUES (2, 'Batman Arkham knight', 'Un año despues de la muerte del Joker durante los eventos de Arkham City, Batman esta luchando por llegar a terminos con la ausencia de su nemesis y la incomoda sensacion de que la pareja compartio un vinculo mas profundo que cualquiera podria admitir. Sin la presencia caotica del Joker, los ciudadanos de Gotham nunca se han sentido mas seguros, y el crimen en la ciudad ha disminuido dramaticamente. Sin embargo, esto le ha dado a los enemigos de Batman, incluyendo el Pingüino, Dos Caras y Harley Quinn, la oportunidad de unirse con el unico objetivo de matar a Batman. En la noche de Halloween, el Espantapajaros amenaza la ciudad con su recien creada variedad de la toxina del miedo, y bombas plantadas en toda Gotham, obligando a evacuar a los seis millones de civiles de la ciudad. Solo los criminales permanecen en la ciudad, dejando al Comisario Gordon y la Policia de Gotham City abrumados. Anticipandose a una nueva amenaza, Batman continua desarrollando tecnologia para combatir el crimen, y mantiene una vigilia sobre la ciudad.', 50);*/
INSERT INTO `producto` (`id`, `nombre`, `descripcion`, `precio`)
VALUES (2, 'Batman Arkham knight', 'Un año despues de la muerte del Joker durante los eventos de Arkham City, Batman esta luchando por llegar a terminos con la ausencia de su nemesis y la incomoda sensacion de que la pareja compartio un vinculo mas profundo que cualquiera podria admitir. Sin la presencia caotica del Joker, los ciudadanos de Gotham nunca se han sentido mas seguros, y el crimen en la ciudad ha disminuido dramaticamente. Sin embargo, esto le ha dado a los enemigos de Batman, incluyendo el Pingüino, Dos Caras y Harley Quinn, la oportunidad de unirse con el unico objetivo de matar a Batman.', 50);
/*INSERT INTO `producto` (`id`, `nombre`, `descripcion`, `precio`) 
VALUES (3, 'Dishonored', 'La historia se desarrolla en Dunwall, una ciudad industrial ballenera en la que el mas oscuro misticismo coexiste con el uso de extrañas tecnologias. Tras ser acusado falsamente del asesinato de la querida emperatriz, pasas de ser su guardaespaldas de confianza a convertirte en un temible asesino, conocido unicamente por la perturbadora mascara que has convertido en tu tarjeta de visita. La ciudad vive un periodo de incertidumbre y se encuentra asediada por la peste y por un regimen opresor armado con tecnologias neoindustriales. En este trasfondo, fuerzas oscuras conspiran para ofrecerte poderes que ningun otro ser humano jamas podria imaginar, pero… ¿cual es el precio? La verdad tras tu traicion es tan turbia como las aguas que rodean la ciudad y la vida que antes conocieras se ha desvanecido para siempre.', 30);*/
INSERT INTO `producto` (`id`, `nombre`, `descripcion`, `precio`)
VALUES (3, 'Dishonored', 'La historia se desarrolla en Dunwall, una ciudad industrial ballenera en la que el mas oscuro misticismo coexiste con el uso de extrañas tecnologias. Tras ser acusado falsamente del asesinato de la querida emperatriz, pasas de ser su guardaespaldas de confianza a convertirte en un temible asesino, conocido unicamente por la perturbadora mascara que has convertido en tu tarjeta de visita. La ciudad vive un periodo de incertidumbre y se encuentra asediada por la peste y por un regimen opresor armado con tecnologias neoindustriales.', 30);
INSERT INTO `producto` (`id`, `nombre`, `descripcion`, `precio`) 
VALUES (4, 'Metal Gear Solid Rising', 'Cuatro años despues de los eventos de la insurreccion de Liquid Ocelot; Raiden habia sido enviado a Africa para ser guarda-espaldas de un Primer Ministro de Africa, tras ser atacados por un misteriosos Cyborgs ninja, Raiden es forzado a defender al Primer ministro, despues de matar a esos cyborgs, descubre que al Primer Ministro lo habia secuestrado un cyborg llamado Sundowner.', 50);
INSERT INTO `producto` (`id`, `nombre`, `descripcion`, `precio`) 
VALUES (5, 'The Witcher 3', 'Seis meses despues de la invasion, las legiones de Nilfgaard ya habian conseguido llegar al corazon de los Reinos del Norte. a su paso dejaban campos bañados de sangre y paramos barridos por la guerra. Un lobo solitario recorria esas tierras destrozadas. Un cazador de bestias, un huracan de ira y acero. Dicen que era un hombre obsesionado con recuperar sus recuerdos: caras, aromas. Pero, en medio de semejante caos, no podia hacer otra cosa que no fuese seguir a su corazon.', 60);
INSERT INTO `producto` (`id`, `nombre`, `descripcion`, `precio`) 
VALUES (6, 'Gears of War 3', 'La historia empieza 24 meses despues que los COGs hundieron  el lugar conocido como Jacinto para deshacerse de  “The Hollows”, en donde vivian los “Locust”.   Algunos COGS ahora viven en el “Raven Nest” barco que fue usado para evacuar un enorme numero de civiles, armas y suplementos con destino a una remota Isla nombrada “Vectres”. El cuarteto Marcus Fenix, Dom Santiago, Anya Stroud y Jace Stratton son los personajes que inician el juego. Ya no existen pelotones de batalla, ahora todos son como familia, conocida como “BROTHERS TO THE END”. Tanto mujeres y hombres son capaces de sostener una  arma para defenderse en contra de los ataques.', 50);
INSERT INTO `producto` (`id`, `nombre`, `descripcion`, `precio`) 
VALUES (7, 'Dead Rising 3', 'Los acontecimientos toman lugar diez años despues de lo sucedido en Fortune City en Dead Rising 2. La historia sigue a un joven mecanico llamado Nick Ramos y su intento de sobrevivir al apocalipsis zombi en la ciudad ficticia de Los Perdidos, California. El virus ha llegado a la ciudad, al parecer por medio de ilegales. Nick, junto a Rhonda, Aniie y otros integrantes del equipo lucharan y encontraran la salida de la ciudad antes de que sea bombardeada. Nick Ramos tambien podra crear equipos con los otros supervivientes para lograr escapar de la ciudad de Los Perdidos antes de que un ataque militar arrase la ciudad y a sus habitantes.', 50);
INSERT INTO `producto` (`id`, `nombre`, `descripcion`, `precio`) 
VALUES (8, 'Mass Effect 3', 'La Tierra arde. Sorprendiendo desde mas alla del espacio conocido, una raza de maquinas aterradoras, los segadores, han comenzado la eliminacion de la vida en la Via Lactea, empezando por los batarianos y la humanidad. El participante toma el rol del Comandante Shepard, un ex-marine de la Alianza, que debe preparar una ofensiva para salvar a la especie humana de su extincion y a todas las especies de la galaxia. Una historia dinamica en la que el jugador decidira que planetas son aniquilados y a partir de alli, la historia y los eventos se modificaran.', 50);
/*INSERT INTO `producto` (`id`, `nombre`, `descripcion`, `precio`) 
VALUES (9, 'Bioshock Infinite', 'Gracias al auge de los Estados Unidos como potencia mundial, la ciudad flotante de Columbia, lanzada con gran pompa ante los vitores de un publico entregado, es un importantisimo simbolo de los ideales americanos. Pero lo que empieza como una empresa llena de esperanzas se convierte en un desastre al desaparecer la ciudad entre las nubes. Nadie conoce su paradero actual; el mayor logro de la historia estadounidense se ha desvanecido sin dejar rastro. El jugador asume el papel de Booker DeWitt, un ex agente de Pinkerton enviado a Columbia para rescatar a Elizabeth, una joven que lleva prisionera alli desde su infancia. Booker establecera una relacion con Elizabeth, que le permitira aumentar sus habilidades con las de ella para que ambos puedan escapar de una ciudad que se desprende del cielo, literalmente. DeWitt debera aprender a enfrentarse a sus enemigos en trepidantes combates aereos tanto en interiores como entre las nubes, y aprovechar el poder de un monton de nuevas armas y habilidades.', 50);*/
INSERT INTO `producto` (`id`, `nombre`, `descripcion`, `precio`)
VALUES (9, 'Bioshock Infinite', 'Gracias al auge de los Estados Unidos como potencia mundial, la ciudad flotante de Columbia, lanzada con gran pompa ante los vitores de un publico entregado, es un importantisimo simbolo de los ideales americanos.', 50);
/*INSERT INTO `producto` (`id`, `nombre`, `descripcion`, `precio`) 
VALUES (10, 'Lord of the Rings Online', 'Lord Of The Rings Online (LOTRO) es el primer MMORPG ambientado en el mundo de El Señor de los Anillos de JRR Tolkien. LOTRO tiene lugar en un mundo online persistente poblado con jugadores reales y NPCs que seguiran funcionando incluso si apagas el juego. Una de las ventajas de jugar LOTRO es la amplia gama de jugadores, que ofrece muchas opciones cuando los jugadores estan buscando disfrutar del juego con otras personas. Otra gran ventaja son las actualizaciones frecuentes que Turbine lanza con el fin de ampliar y mejorar el juego. Sin embargo, aprovecharse de este contenido puede ser dificil sin una comprension adecuada de las funciones de juego.', 50);*/
INSERT INTO `producto` (`id`, `nombre`, `descripcion`, `precio`) 
VALUES (10, 'Lord of the Rings Online', 'Lord Of The Rings Online (LOTRO) es el primer MMORPG ambientado en el mundo de El Señor de los Anillos de JRR Tolkien. LOTRO tiene lugar en un mundo online persistente poblado con jugadores reales y NPCs que seguiran funcionando incluso si apagas el juego. Una de las ventajas de jugar LOTRO es la amplia gama de jugadores, que ofrece muchas opciones cuando los jugadores estan buscando disfrutar del juego con otras personas.', 50);


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


INSERT INTO `producto_categorias` (`idProducto`, `idCategoria`) VALUES (1, 4);
INSERT INTO `producto_categorias` (`idProducto`, `idCategoria`) VALUES (2, 4);
INSERT INTO `producto_categorias` (`idProducto`, `idCategoria`) VALUES (2, 5);
INSERT INTO `producto_categorias` (`idProducto`, `idCategoria`) VALUES (3, 4);
INSERT INTO `producto_categorias` (`idProducto`, `idCategoria`) VALUES (3, 5);
INSERT INTO `producto_categorias` (`idProducto`, `idCategoria`) VALUES (4, 4);
INSERT INTO `producto_categorias` (`idProducto`, `idCategoria`) VALUES (5, 4);
INSERT INTO `producto_categorias` (`idProducto`, `idCategoria`) VALUES (5, 5);
INSERT INTO `producto_categorias` (`idProducto`, `idCategoria`) VALUES (6, 6);
INSERT INTO `producto_categorias` (`idProducto`, `idCategoria`) VALUES (7, 4);
INSERT INTO `producto_categorias` (`idProducto`, `idCategoria`) VALUES (8, 1);
INSERT INTO `producto_categorias` (`idProducto`, `idCategoria`) VALUES (8, 4);
INSERT INTO `producto_categorias` (`idProducto`, `idCategoria`) VALUES (9, 2);
INSERT INTO `producto_categorias` (`idProducto`, `idCategoria`) VALUES (9, 4);
INSERT INTO `producto_categorias` (`idProducto`, `idCategoria`) VALUES (10, 3);

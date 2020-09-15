-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Nov 24, 2018 at 07:18 AM
-- Server version: 5.7.20-log
-- PHP Version: 5.6.23

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gameshow`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `InsertarUsuario` (IN `usern` VARCHAR(50), IN `usera` VARCHAR(50), IN `usernick` VARCHAR(50), IN `usere` VARCHAR(50), IN `userfn` VARCHAR(300), IN `useract` TINYINT(1), IN `usertel` INT(8), IN `userp` VARCHAR(50), IN `userdir` VARCHAR(300), IN `useru` VARCHAR(50), IN `userpwd` VARCHAR(300), IN `userrol` TINYINT(1), IN `userimg` VARCHAR(100))  BEGIN
DECLARE exit handler FOR sqlexception
BEGIN
	ROLLBACK;
END;

START TRANSACTION;

INSERT into  jugadores(codJugadores, nombre_jugador, apellido_jugador, nickname_jugador,email, fecha_nacimiento,activo,telefono_jugador,pais_jugador,direccion,img_jugador)
VALUES (NULL, usern,usera,usernick,usere,userfn,useract,usertel,userp,userdir,userimg);

SELECT @idjugador:=MAX(codJugadores) FROM jugadores;

INSERT INTO usuarios(id_usuario,usuario,pwd,activo,jugadores_codJugadores,id_rol)
VALUES (NULL,useru,userpwd,useract,@idjugador,userrol);

COMMIT;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `juego`
--

CREATE TABLE `juego` (
  `id_juego` int(11) NOT NULL,
  `nombre_juego` varchar(100) NOT NULL,
  `activo` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `juego`
--

INSERT INTO `juego` (`id_juego`, `nombre_juego`, `activo`) VALUES
(1, 'League of Legends', 1),
(2, 'Fortnite', 1),
(3, 'Clash Royale', 1),
(4, 'DOTA2', 1),
(5, 'CS:GO', 1),
(6, 'Overwatch', 1),
(7, 'FIFA', 1);

-- --------------------------------------------------------

--
-- Table structure for table `jugadores`
--

CREATE TABLE `jugadores` (
  `codJugadores` int(11) NOT NULL,
  `nombre_jugador` varchar(45) NOT NULL,
  `apellido_jugador` varchar(45) NOT NULL,
  `nickname_jugador` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `fecha_nacimiento` date NOT NULL,
  `activo` tinyint(1) NOT NULL,
  `telefono_jugador` int(20) DEFAULT NULL,
  `pais_jugador` varchar(45) NOT NULL,
  `direccion` varchar(45) NOT NULL,
  `img_jugador` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `jugadores`
--

INSERT INTO `jugadores` (`codJugadores`, `nombre_jugador`, `apellido_jugador`, `nickname_jugador`, `email`, `fecha_nacimiento`, `activo`, `telefono_jugador`, `pais_jugador`, `direccion`, `img_jugador`) VALUES
(1, 'Javier', 'Castillo', 'Xneaky', 'admin@admin.com', '2018-11-08', 1, 12345678, 'El Salvador', 'Algo algo', '../img/blaze.png'),
(2, 'caleb', 'caleb', 'caleb0304', 'caleb@caleb.com', '2018-11-13', 1, 12345678, 'El Salvador', 'algun lugar', '../img/base.jpg'),
(3, 'Raulo', 'Batrelen', 'Blazeit', 'blaze@blaze.com', '2018-02-07', 1, 11112222, 'El Salvador', 'por ahi algun lugar', '../img/blaze.png'),
(4, 'Kevin', 'Sandoval', 'Kain', 'kain@gmail.com', '2018-11-13', 1, 22222222, 'El Salvador', 'por ahi', '../img/Morg.png'),
(5, 'asd', 'asd', 'asd', 'castillo_5326@hotmail.com', '2018-11-13', 1, 77463553, 'El Salvador', 'santa tecla el salvador', '../img/base.jpg'),
(6, 'Alvaro', 'Archila', 'Nismo', 'nismo@nismo.com', '2018-11-13', 1, 78787878, 'USA', 'Por ahi', '../img/base.jpg'),
(7, 'Roberto', 'Portillo', 'Xtillo', 'asd@asd.com', '2018-11-13', 1, 87878787, 'El Salvador', 'por ahi', '../img/base.jpg'),
(8, 'magda', 'magda', 'magda', 'magda@magda.com', '2018-11-07', 1, 45454545, 'magda', 'magda', '../img/base.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `jugadores_team`
--

CREATE TABLE `jugadores_team` (
  `idjugadores_team` int(11) NOT NULL,
  `jugadores_codJugadores` int(11) NOT NULL,
  `team_codTeam` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `jugadores_team`
--

INSERT INTO `jugadores_team` (`idjugadores_team`, `jugadores_codJugadores`, `team_codTeam`) VALUES
(2, 1, 1),
(4, 6, 1);

-- --------------------------------------------------------

--
-- Table structure for table `modulos`
--

CREATE TABLE `modulos` (
  `id_modulo` int(11) NOT NULL,
  `nombre_modulo` varchar(50) NOT NULL,
  `descripcion_modulo` varchar(300) NOT NULL,
  `activo` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `modulos`
--

INSERT INTO `modulos` (`id_modulo`, `nombre_modulo`, `descripcion_modulo`, `activo`) VALUES
(1, 'Brackets', 'Administracion de Brackets de Torneos', 1),
(2, 'Equipos', 'Administracion de Equipos', 1),
(3, 'Juegos', 'Administracion de Juegos', 1),
(4, 'Torneos', 'Administracion de Torneos', 1),
(5, 'Torneos Jugadores', 'Administracion de Torneos Jugadores', 1),
(6, 'Jugadores', 'Administracion de Jugadores', 1),
(7, 'Modulos', 'Administracion de Modulos', 1),
(8, 'Roles', 'Administracion de Roles', 1),
(9, 'Usuarios', 'Administracion de Usuarios', 1);

-- --------------------------------------------------------

--
-- Table structure for table `participantes`
--

CREATE TABLE `participantes` (
  `codParticipantes` int(11) NOT NULL,
  `torneos_codTorneo` int(11) NOT NULL,
  `team_codTeams` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `participantes`
--

INSERT INTO `participantes` (`codParticipantes`, `torneos_codTorneo`, `team_codTeams`) VALUES
(3, 1, 2);

-- --------------------------------------------------------

--
-- Table structure for table `participantes_j`
--

CREATE TABLE `participantes_j` (
  `codParticipantes_j` int(11) NOT NULL,
  `torneos_codTorneo` int(11) NOT NULL,
  `jugadores_codJugadores` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `partidos`
--

CREATE TABLE `partidos` (
  `codPartido` int(11) NOT NULL,
  `torneos_codTorneo` int(11) NOT NULL,
  `bracket` longtext
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id_rol` int(11) NOT NULL,
  `nombre_rol` varchar(50) NOT NULL,
  `modulos` varchar(80) NOT NULL,
  `descripcion_rol` varchar(250) NOT NULL,
  `activo` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id_rol`, `nombre_rol`, `modulos`, `descripcion_rol`, `activo`) VALUES
(1, 'Administrador', '1,2,5,6,7,3,4,8,9', 'Administrador', 1),
(2, 'Especial', '1,3,4,9', 'Ayudante del administrador', 1),
(3, 'Simple', '1,2,6,5', 'Jugador o visitante', 1);

-- --------------------------------------------------------

--
-- Table structure for table `team`
--

CREATE TABLE `team` (
  `codTeam` int(11) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `activo` tinyint(4) NOT NULL,
  `id_capitan` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `team`
--

INSERT INTO `team` (`codTeam`, `nombre`, `activo`, `id_capitan`) VALUES
(1, 'Wolfpack', 1, 1),
(2, 'EquipoNismo', 1, 6);

-- --------------------------------------------------------

--
-- Table structure for table `torneos`
--

CREATE TABLE `torneos` (
  `codTorneo` int(11) NOT NULL,
  `Nombre` varchar(45) NOT NULL,
  `activo` tinyint(1) NOT NULL,
  `tipo_torneo` varchar(25) NOT NULL,
  `num_participantes` int(11) NOT NULL,
  `descripcion` varchar(300) NOT NULL,
  `juego_id_juego` int(11) NOT NULL,
  `round_robin` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `torneos`
--

INSERT INTO `torneos` (`codTorneo`, `Nombre`, `activo`, `tipo_torneo`, `num_participantes`, `descripcion`, `juego_id_juego`, `round_robin`) VALUES
(1, 'Get', 1, 'Equipos', 23, 'asassaas', 1, 0),
(2, 'AXE FIFA', 1, 'Solitario', 12, '7', 7, 0),
(3, 'AXE Royale', 1, 'Solitario', 32, 'Torneo especial', 3, 0),
(4, 'AXE CSGO', 1, 'Equipos', 16, 'Prueba', 5, 0),
(5, 'AXE Fortnite', 1, 'Equipos', 16, 'Prueba', 2, 0),
(6, 'AXE Overwatch', 1, 'Equipos', 16, 'Prueba', 6, 0);

-- --------------------------------------------------------

--
-- Table structure for table `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` int(11) NOT NULL,
  `usuario` varchar(100) NOT NULL,
  `pwd` varchar(300) NOT NULL,
  `activo` tinyint(1) NOT NULL,
  `jugadores_codJugadores` int(11) NOT NULL,
  `id_rol` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `usuario`, `pwd`, `activo`, `jugadores_codJugadores`, `id_rol`) VALUES
(1, 'Xneaky', 'adminadmin', 1, 1, 1),
(2, 'Jhonny', 'jhonny', 1, 2, 2),
(3, 'Blazeit420', 'Blaze@blaze.com', 1, 3, 1),
(4, 'Kain', '1234', 1, 4, 3),
(5, 'asd', 'aqwsde', 1, 5, 3),
(6, 'Nismo', 'Nismo', 1, 6, 3),
(7, 'Xtillo', 'asd@asd.com', 1, 7, 1),
(8, 'magda', 'magda@magda.com', 1, 8, 1);

-- --------------------------------------------------------

--
-- Stand-in structure for view `vt_jugadores_team`
--
CREATE TABLE `vt_jugadores_team` (
`nombre_jugador` varchar(45)
,`apellido_jugador` varchar(45)
,`nickname_jugador` varchar(45)
,`team_codTeam` int(11)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `vt_usuarios_roles_jugadores`
--
CREATE TABLE `vt_usuarios_roles_jugadores` (
`id_usuario` int(11)
,`usuario` varchar(100)
,`pwd` varchar(300)
,`usuarioActivo` tinyint(1)
,`jugadores_codJugadores` int(11)
,`id_rol` int(11)
,`nombre_rol` varchar(50)
,`modulos` varchar(80)
,`rolActivo` tinyint(1)
,`nombre_jugador` varchar(45)
,`apellido_jugador` varchar(45)
,`nickname_jugador` varchar(45)
,`email` varchar(45)
,`fecha_nacimiento` date
,`jugadorActivo` tinyint(1)
,`telefono_jugador` int(20)
,`pais_jugador` varchar(45)
,`direccion` varchar(45)
,`img_jugador` varchar(100)
);

-- --------------------------------------------------------

--
-- Structure for view `vt_jugadores_team`
--
DROP TABLE IF EXISTS `vt_jugadores_team`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vt_jugadores_team`  AS  select `j`.`nombre_jugador` AS `nombre_jugador`,`j`.`apellido_jugador` AS `apellido_jugador`,`j`.`nickname_jugador` AS `nickname_jugador`,`jt`.`team_codTeam` AS `team_codTeam` from ((`jugadores` `j` join `jugadores_team` `jt` on((`j`.`codJugadores` = `jt`.`jugadores_codJugadores`))) join `team` `t` on((`t`.`codTeam` = `jt`.`team_codTeam`))) ;

-- --------------------------------------------------------

--
-- Structure for view `vt_usuarios_roles_jugadores`
--
DROP TABLE IF EXISTS `vt_usuarios_roles_jugadores`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vt_usuarios_roles_jugadores`  AS  select `u`.`id_usuario` AS `id_usuario`,`u`.`usuario` AS `usuario`,`u`.`pwd` AS `pwd`,`u`.`activo` AS `usuarioActivo`,`u`.`jugadores_codJugadores` AS `jugadores_codJugadores`,`r`.`id_rol` AS `id_rol`,`r`.`nombre_rol` AS `nombre_rol`,`r`.`modulos` AS `modulos`,`r`.`activo` AS `rolActivo`,`j`.`nombre_jugador` AS `nombre_jugador`,`j`.`apellido_jugador` AS `apellido_jugador`,`j`.`nickname_jugador` AS `nickname_jugador`,`j`.`email` AS `email`,`j`.`fecha_nacimiento` AS `fecha_nacimiento`,`j`.`activo` AS `jugadorActivo`,`j`.`telefono_jugador` AS `telefono_jugador`,`j`.`pais_jugador` AS `pais_jugador`,`j`.`direccion` AS `direccion`,`j`.`img_jugador` AS `img_jugador` from ((`usuarios` `u` join `roles` `r` on((`u`.`id_rol` = `r`.`id_rol`))) join `jugadores` `j` on((`j`.`codJugadores` = `u`.`jugadores_codJugadores`))) ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `juego`
--
ALTER TABLE `juego`
  ADD PRIMARY KEY (`id_juego`);

--
-- Indexes for table `jugadores`
--
ALTER TABLE `jugadores`
  ADD PRIMARY KEY (`codJugadores`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `jugadores_team`
--
ALTER TABLE `jugadores_team`
  ADD PRIMARY KEY (`idjugadores_team`,`jugadores_codJugadores`,`team_codTeam`),
  ADD KEY `fk_jugadores_team_jugadores1_idx` (`jugadores_codJugadores`),
  ADD KEY `fk_jugadores_team_team1_idx` (`team_codTeam`);

--
-- Indexes for table `modulos`
--
ALTER TABLE `modulos`
  ADD PRIMARY KEY (`id_modulo`);

--
-- Indexes for table `participantes`
--
ALTER TABLE `participantes`
  ADD PRIMARY KEY (`codParticipantes`,`torneos_codTorneo`,`team_codTeams`),
  ADD KEY `fk_participantes_torneos_idx` (`torneos_codTorneo`),
  ADD KEY `fk_participantes_team1_idx` (`team_codTeams`);

--
-- Indexes for table `participantes_j`
--
ALTER TABLE `participantes_j`
  ADD PRIMARY KEY (`codParticipantes_j`,`torneos_codTorneo`,`jugadores_codJugadores`),
  ADD KEY `fk_participantes_j_torneos1_idx` (`torneos_codTorneo`),
  ADD KEY `fk_participantes_j_jugadores1_idx` (`jugadores_codJugadores`);

--
-- Indexes for table `partidos`
--
ALTER TABLE `partidos`
  ADD PRIMARY KEY (`codPartido`,`torneos_codTorneo`),
  ADD KEY `fk_partidos_torneos1_idx` (`torneos_codTorneo`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id_rol`),
  ADD KEY `id_rol` (`id_rol`);

--
-- Indexes for table `team`
--
ALTER TABLE `team`
  ADD PRIMARY KEY (`codTeam`);

--
-- Indexes for table `torneos`
--
ALTER TABLE `torneos`
  ADD PRIMARY KEY (`codTorneo`,`juego_id_juego`),
  ADD KEY `fk_torneos_juego1_idx` (`juego_id_juego`);

--
-- Indexes for table `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`,`jugadores_codJugadores`,`id_rol`),
  ADD UNIQUE KEY `usuario` (`usuario`),
  ADD KEY `fk_usuarios_jugadores1_idx` (`jugadores_codJugadores`),
  ADD KEY `fk_usuarios_roles1_idx` (`id_rol`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `juego`
--
ALTER TABLE `juego`
  MODIFY `id_juego` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `jugadores`
--
ALTER TABLE `jugadores`
  MODIFY `codJugadores` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `jugadores_team`
--
ALTER TABLE `jugadores_team`
  MODIFY `idjugadores_team` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `modulos`
--
ALTER TABLE `modulos`
  MODIFY `id_modulo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT for table `participantes`
--
ALTER TABLE `participantes`
  MODIFY `codParticipantes` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `participantes_j`
--
ALTER TABLE `participantes_j`
  MODIFY `codParticipantes_j` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `partidos`
--
ALTER TABLE `partidos`
  MODIFY `codPartido` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id_rol` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `team`
--
ALTER TABLE `team`
  MODIFY `codTeam` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `torneos`
--
ALTER TABLE `torneos`
  MODIFY `codTorneo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `jugadores_team`
--
ALTER TABLE `jugadores_team`
  ADD CONSTRAINT `fk_jugadores_team_jugadores1` FOREIGN KEY (`jugadores_codJugadores`) REFERENCES `jugadores` (`codJugadores`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_jugadores_team_team1` FOREIGN KEY (`team_codTeam`) REFERENCES `team` (`codTeam`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `participantes`
--
ALTER TABLE `participantes`
  ADD CONSTRAINT `fk_participantes_team1` FOREIGN KEY (`team_codTeams`) REFERENCES `team` (`codTeam`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_participantes_torneos` FOREIGN KEY (`torneos_codTorneo`) REFERENCES `torneos` (`codTorneo`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `participantes_j`
--
ALTER TABLE `participantes_j`
  ADD CONSTRAINT `fk_participantes_j_jugadores1` FOREIGN KEY (`jugadores_codJugadores`) REFERENCES `jugadores` (`codJugadores`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_participantes_j_torneos1` FOREIGN KEY (`torneos_codTorneo`) REFERENCES `torneos` (`codTorneo`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `partidos`
--
ALTER TABLE `partidos`
  ADD CONSTRAINT `fk_partidos_torneos1` FOREIGN KEY (`torneos_codTorneo`) REFERENCES `torneos` (`codTorneo`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `torneos`
--
ALTER TABLE `torneos`
  ADD CONSTRAINT `fk_torneos_juego1` FOREIGN KEY (`juego_id_juego`) REFERENCES `juego` (`id_juego`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `fk_usuarios_jugadores1` FOREIGN KEY (`jugadores_codJugadores`) REFERENCES `jugadores` (`codJugadores`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_usuarios_rol1_idx` FOREIGN KEY (`id_rol`) REFERENCES `roles` (`id_rol`) ON DELETE NO ACTION ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

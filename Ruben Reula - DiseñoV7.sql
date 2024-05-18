-- Correciones del v.6:
-- Se ha corregido el parámetro (nombrealumno) que le pasaba a mi procedimiento saberNotaGlobal por el idalumno
-- Nota: Recuerda que un nombre NUNCA puede un id unico porque puede ser repetible, si tuviera dos alumnos con el mismo nombre tendrias un problema.

-- NOTAS DEL PARCHE v.7:
-- !WAITTING FOR 					Se han incluido 2 vistas y 1 trigger en el codigo de la BBDD.  
-- Duda: El trigger pide que evite borrar un alumno que tiene una empresa asignada, el tema es que, para eliminar a un alumno realmente PRIMERO tengo que borrar todos 
-- sus registros en otras tablas antes de borrarlo de la PRINCIPAL, solo entonces me permite borrar esta tabla, dicho de otra forma, tiene que ser la ultima tabla de borrarse.
-- El problema es que el campo que indica si un alumno tiene o no empresa no esta en gf_alumnos fct sino en candidatos, que es una tabla que tiene que ser borrada ANTES de borrar
-- la PRINCIPAL. Entonces, para mi caso, si quiero "evitar borrar un alumno" tecnicamente no seria refiriendonos al registro del alumno en si de la tabla principal, sino que mi trigger
-- tendria que evitar que se borrarse el idalumno de mi tabla candidatos, por lo que tecnicamente no estoy evitando borrar el idalumno de la tabla original. 
-- ------------------------------------------------------------------------------------------------------- DROP, CREATE & USE DATABASE
DROP DATABASE IF EXISTS alumnos_dual; -- Tirar la BBDD
CREATE DATABASE IF NOT EXISTS alumnos_dual; -- Crearla de nuevo
USE alumnos_dual; -- Seleccionar la BBDD.
-- ------------------------------------------------------------------------------------------------------- DROP FUNCTIONS (IF EXISTS)
DROP FUNCTION IF EXISTS alumnosPorAsignar;
DROP FUNCTION IF EXISTS alumnosQueFaltanEnEmpresa;
DROP FUNCTION IF EXISTS encriptarContrasenya;
DROP FUNCTION IF EXISTS desencriptarContrasenya;

-- -------------------------------------------------------------------------------------------------------- DROP PROCEDURES (IF EXISTS)
DROP PROCEDURE IF EXISTS eliminarEmpresaSinAlumnos;
DROP PROCEDURE IF EXISTS empresasSinConvenio;
DROP PROCEDURE IF EXISTS saberNotaGlobal;
-- ------------------------------------------------------------------------------------------------------------- CODIGO PREVIO INSTAURADO

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;


--
-- Estructura de tabla para la tabla `ge_contactos`
--

CREATE TABLE `ge_contactos` (
  `idcontacto` int NOT NULL,
  `iddomicilio` int NOT NULL,
  `dni` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `nombre` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `telefono` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `cargo` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `observaciones` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `especialidad` varchar(75) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Estructura de tabla para la tabla `ge_domicilios`
--

CREATE TABLE `ge_domicilios` (
  `iddomicilio` int NOT NULL,
  `idempresa` int NOT NULL,
  `domicilio` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `cp` varchar(5) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `provincia` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `localidad` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `telefono` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `especialidad` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ge_empresas`
--

CREATE TABLE `ge_empresas` (
  `idempresa` int NOT NULL,
  `cif` varchar(12) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `empresa` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `convenio` varchar(6) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `fechaconvenio` date NOT NULL,
  `web` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `observaciones` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ge_empresas`
--


-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `gf_alumnosfct`
--

CREATE TABLE `gf_alumnosfct` (
  `idalumno` int NOT NULL,
  `nombre` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `dni` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `domicilio` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `cp` varchar(5) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `localidad` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `telalumno` varchar(9) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `telfamilia` varchar(9) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `especialidad` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `idempresa` int NOT NULL,
  `iddomicilio` int NOT NULL,
  `idrepresentante` int NOT NULL,
  `idtutorempresa` int NOT NULL,
  `observaciones` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `mesFCT` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'Junio'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `ge_contactos`
--
ALTER TABLE `ge_contactos`
  ADD PRIMARY KEY (`idcontacto`) USING BTREE,
  ADD KEY `Secundario` (`nombre`) USING BTREE;

--
-- Indices de la tabla `ge_domicilios`
--
ALTER TABLE `ge_domicilios`
  ADD PRIMARY KEY (`iddomicilio`);

--
-- Indices de la tabla `ge_empresas`
--
ALTER TABLE `ge_empresas`
  ADD PRIMARY KEY (`idempresa`),
  ADD KEY `empresa` (`empresa`);

--
-- Indices de la tabla `gf_alumnosfct`
--
ALTER TABLE `gf_alumnosfct`
  ADD PRIMARY KEY (`idalumno`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `ge_contactos`
--
ALTER TABLE `ge_contactos`
  MODIFY `idcontacto` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7924;

--
-- AUTO_INCREMENT de la tabla `ge_domicilios`
--
ALTER TABLE `ge_domicilios`
  MODIFY `iddomicilio` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2662;

--
-- AUTO_INCREMENT de la tabla `ge_empresas`
--
ALTER TABLE `ge_empresas`
  MODIFY `idempresa` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3969;

--
-- AUTO_INCREMENT de la tabla `gf_alumnosfct`
--
ALTER TABLE `gf_alumnosfct`
  MODIFY `idalumno` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2078;

-- ---------------------------------------------------------------------------------------- CREACIÓN DE TABLAS & ALTERACION

-- idiomas
CREATE TABLE `idiomas` (
  `ididioma` 										INT,
  `idioma`  	 									VARCHAR(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
 )
ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
  
  -- idiomas_alumnos
CREATE TABLE `idiomas_alumnos` (
  `idalumno` 										INT NOT NULL,
  `ididioma` 										INT NOT NULL,
  `titulo`   										VARCHAR(10)  CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL
   )
ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
  
  -- doc_alumnos
  CREATE TABLE `doc_alumnos` (
  `iddocalumno` 									INT NOT NULL,
  `idalumno`  										INT NOT NULL,
  `docalum`   										VARCHAR(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `url`       										VARCHAR(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
  )
ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
  
  -- especialidades
  CREATE TABLE `especialidades` (
  `idespecialidad` 	  								INT NOT NULL,
  `nombre` 			  								VARCHAR(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `codigoespecialidad`								VARCHAR(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `especial` 										VARCHAR(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `codigo`											INT NULL
  )
ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
  
-- gf_alumnosfct
ALTER TABLE `gf_alumnosfct` 
ADD COLUMN `sexo`				 					VARCHAR(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL AFTER `nombre`,
ADD COLUMN `fechanacimiento` 						DATE NULL AFTER `dni`,
ADD COLUMN `preferencia1` 	  						INT NOT NULL AFTER `fechanacimiento`,
ADD COLUMN `preferencia2`       					INT NOT NULL AFTER `preferencia1`,
ADD COLUMN `preferencia3`       					INT NOT NULL AFTER `preferencia2`,
ADD COLUMN `fecha` 	     					    	DATE NOT NULL AFTER `preferencia3`,
ADD COLUMN `estadocurriculum` 						TINYINT NOT NULL DEFAULT 0 AFTER `fecha`,
ADD COLUMN `estadoadmision` 						TINYINT NOT NULL DEFAULT 0 AFTER `estadocurriculum`,
ADD COLUMN `emailinstituto` 						VARCHAR(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL AFTER `estadoadmision`,
ADD COLUMN `nacionalidad` 							VARCHAR(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL AFTER `emailinstituto`,
ADD COLUMN `carnetconducir` 						VARCHAR(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL AFTER `nacionalidad`,
ADD COLUMN `disponibilidad` 						TINYINT NOT NULL AFTER `carnetconducir`,
ADD COLUMN `numeroSS` 								VARCHAR(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL AFTER `disponibilidad`,
ADD COLUMN `situacionlaboral` 						VARCHAR(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL AFTER `numeroSS`,
ADD COLUMN `nombretutorlegal` 						VARCHAR(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL AFTER `situacionlaboral`,
ADD COLUMN `anyocursado` 							VARCHAR(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL AFTER `nombretutorlegal`,
CHANGE COLUMN `especialidad` `especialidad` 		VARCHAR(10) CHARACTER SET 'utf8mb4' NOT NULL AFTER `anyocursado`,
CHANGE COLUMN `telalumno` `telalumno` 				VARCHAR(9) CHARACTER SET 'utf8mb4' NOT NULL AFTER `especialidad`,
CHANGE COLUMN `telfamilia` `telfamilia` 			VARCHAR(9) CHARACTER SET 'utf8mb4' NOT NULL AFTER `telalumno`,
CHANGE COLUMN `email` `email` 						VARCHAR(60) CHARACTER SET 'utf8mb4' NOT NULL AFTER `telfamilia`,
CHANGE COLUMN `observaciones` `observaciones` 		LONGTEXT CHARACTER SET 'utf8mb4' NOT NULL AFTER `email`,
CHANGE COLUMN `mesFCT` `mesFCT` 					VARCHAR(10) CHARACTER SET 'utf8mb4' NOT NULL DEFAULT 'Junio' AFTER `observaciones`;

-- estados (empresas y alumnos)
CREATE TABLE `estados` (
  `idestado` 		INT NOT NULL,
  `tipo` 		    VARCHAR(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
  )
ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
  
-- candidatos
CREATE TABLE `candidatos` (
  `idcandidato` 		INT NOT NULL,
  `idalumno` 			INT NOT NULL,
  `fechaasignacion`		DATE NULL,
  `estadodualalumno` 	INT NOT NULL,
  `primeraempresa` 		INT NULL,
  `estadoempresa1` 		INT NOT NULL,
  `segundaempresa` 		INT NULL,
  `estadoempresa2` 		INT NOT NULL,
  `terceraempresa` 		INT NULL,
  `estadoempresa3` 		INT NOT NULL,
  `empresacontratada` 	INT NULL,
  `emaildualalumno` 	VARCHAR(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `opinionempresa` 		LONGTEXT NULL,
  `observaciones` 		LONGTEXT NULL,
  `turno` 				VARCHAR(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `anexorecibido` 		TINYINT NOT NULL DEFAULT 0,
  `anexorellenado` 		TINYINT NOT NULL DEFAULT 0,
  `estadocalendario` 	TINYINT NOT NULL DEFAULT 0,
  `anexo` 				VARCHAR(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `tiporelacion` 		VARCHAR(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `cno` 				INT NOT NULL
  )
ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- candidatos_contactos
CREATE TABLE `candidatos_contactos` (
  `idcandidato` 	INT NOT NULL,
  `tutor` 			INT NULL,
  `respempdual`		INT NULL,
  `respempresa`		INT NULL,
  `fechaasignacion` DATE NULL
  )
ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ge_contactos
ALTER TABLE 	`ge_contactos` 
ADD COLUMN 		`esTutor` 						TINYINT NOT NULL AFTER `cargo`,
ADD COLUMN 		`esRespLegal` 					TINYINT NOT NULL AFTER `esTutor`,
CHANGE COLUMN 	`especialidad` `especialidad` 	VARCHAR(75) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL AFTER `esRespLegal`;

-- ge_empresas
ALTER TABLE `ge_empresas` 
ADD COLUMN `razonsocial` 				VARCHAR(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL AFTER `empresa`,
ADD COLUMN `formulariorecibido` 		TINYINT NOT NULL DEFAULT 0 AFTER `observaciones`,
ADD COLUMN `conveniorecibido` 			TINYINT NOT NULL DEFAULT 0 AFTER `formulariorecibido`,
ADD COLUMN `compromisorecibido` 		TINYINT NOT NULL DEFAULT 0 AFTER `conveniorecibido`,
ADD COLUMN `menosdecincotrabajadores`   TINYINT NOT NULL AFTER `compromisorecibido`;

-- tipos_alumnos
CREATE TABLE `tipos_alumnos` (
  `idtipoalumno` 		INT NOT NULL,
  `idempresa` 			INT NOT NULL,
  `fecha` 				DATE NOT NULL,
  `especialidad` 		INT NOT NULL,
  `turno` 				VARCHAR(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `tiporelacionlaboral` VARCHAR(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `alumnosformacion` 	INT NOT NULL,
  `alumnosbeca` 		INT NOT NULL
  )
ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
  
  -- doc_empresa
  CREATE TABLE `doc_empresas` (
  `iddocempresa` INT NOT NULL,
  `idempresa` 	 INT NOT NULL,
  `docemp` 		 VARCHAR(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `url` 		 VARCHAR(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
  )
ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ge_domicilios
ALTER TABLE `ge_domicilios` 
ADD COLUMN `correodualempresa` VARCHAR(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL;


-- lugares_practicas
CREATE TABLE `lugares_practicas` (
  `iddomicilio` 	INT NOT NULL,
  `idcandidato` 	INT NOT NULL,
  `fechapracticas`  DATE NOT NULL
  ) 
ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- calendarios
CREATE TABLE `calendarios` (
  `idcalendario` 			INT NOT NULL,
  `fechainicio` 			DATE NOT NULL,
  `fechafin` 				DATE NULL,
  `festivos` 				INT NULL,
  `horaslunesjueves` 		FLOAT NULL,
  `horasviernes` 			FLOAT NULL,
  `L` 						VARCHAR(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `M` 						VARCHAR(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `X` 						VARCHAR(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `J` 						VARCHAR(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `V` 						VARCHAR(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `jornadacompleta` 		VARCHAR(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `horasanualesconvenio` 	INT NULL,
  `vacaciones` 				INT NULL,
  `totalhoras` 				FLOAT NULL,
  `urlcalendario` 			VARCHAR(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL
  ) 
ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- candidatos_calendarios
  CREATE TABLE `candidatos_calendarios` (
  `idcalendario`  INT NOT NULL,
  `idcandidato`   INT NOT NULL,
  `fecharegistro` DATE NOT NULL
  ) 
ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

  -- valoraciones
  CREATE TABLE `valoraciones` (
  `idvaloracion` 	INT NULL,
  `idalumno` 	 	INT NULL,
  `notamedia`    	FLOAT NULL,
  `notaidioma`   	INT NULL,
  `notamadurez`     INT NULL,
  `notacompetencia` INT NULL,
  `numfaltas`       INT NULL,
  `notafaltas` 		FLOAT NULL,
  `notaglobal` 		FLOAT NULL,
  `observaciones`   LONGTEXT NULL
  ) 
ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Preferencias
 CREATE TABLE `preferencias` (
  `idpreferencia` 	INT NOT NULL,
  `preferencia` 	VARCHAR(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL
  ) 
ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------------------------------  CLAVES PRIMARIAS (PK)

-- idiomas

  ALTER TABLE `idiomas`
  ADD PRIMARY KEY (`ididioma`);
  
-- idiomas_alumnos

  ALTER TABLE `idiomas_alumnos`
  ADD PRIMARY KEY (`idalumno`, `ididioma`);

-- doc_alumnos

  ALTER TABLE `doc_alumnos`
  ADD PRIMARY KEY (`iddocalumno`);

-- especialidades

  ALTER TABLE `especialidades`
  ADD PRIMARY KEY (`idespecialidad`);

-- estados (empresas y alumnos)

  ALTER TABLE `estados`
  ADD PRIMARY KEY (`idestado`);

-- candidatos

  ALTER TABLE `candidatos`
  ADD PRIMARY KEY (`idcandidato`);

-- candidatos_contactos
  ALTER TABLE `candidatos_contactos`
  ADD PRIMARY KEY (`idcandidato`, `tutor`,`respempdual`);

-- tipos_alumnos

  ALTER TABLE `tipos_alumnos`
  ADD PRIMARY KEY (`idtipoalumno`);

-- doc_empresa

  ALTER TABLE `doc_empresas`
  ADD PRIMARY KEY (`iddocempresa`);

-- lugares_practicas

  ALTER TABLE `lugares_practicas`
  ADD PRIMARY KEY (`iddomicilio`, `idcandidato`);

-- calendarios

  ALTER TABLE `calendarios`
  ADD PRIMARY KEY (`idcalendario`);

-- candidatos_calendarios

  ALTER TABLE `candidatos_calendarios`
  ADD PRIMARY KEY (`idcalendario`, `idcandidato`);

-- valoraciones

  ALTER TABLE `valoraciones` 
  ADD PRIMARY KEY (`idvaloracion`);
  
-- preferencias

ALTER TABLE `preferencias`
ADD PRIMARY KEY (`idpreferencia`);
  
-- -------------------------------------------------------------------------------------------- AUTO INCREMENT

-- idiomas

ALTER TABLE `idiomas`
	MODIFY `ididioma` INT NOT NULL AUTO_INCREMENT;

-- doc_alumnos

ALTER TABLE `doc_alumnos`
	MODIFY `iddocalumno` INT NOT NULL AUTO_INCREMENT;

-- especialidades

ALTER TABLE `especialidades`
	MODIFY `idespecialidad` INT NOT NULL AUTO_INCREMENT;

-- estados (alumnos y empresas)

ALTER TABLE `estados`
	MODIFY `idestado` INT NOT NULL AUTO_INCREMENT;

-- candidatos

ALTER TABLE `candidatos`
	MODIFY `idcandidato` INT NOT NULL AUTO_INCREMENT;

-- tipos_alumnos

ALTER TABLE `tipos_alumnos`
	MODIFY `idtipoalumno` INT NOT NULL AUTO_INCREMENT;

-- doc_empresas

ALTER TABLE `doc_empresas`
	MODIFY `iddocempresa` INT NOT NULL AUTO_INCREMENT;

-- calendarios

ALTER TABLE `calendarios`
	MODIFY `idcalendario` INT NOT NULL AUTO_INCREMENT;

-- valoraciones

ALTER TABLE `valoraciones`
	MODIFY `idvaloracion` INT NOT NULL AUTO_INCREMENT;

-- preferencias
ALTER TABLE `preferencias`
	MODIFY `idpreferencia` INT NOT NULL AUTO_INCREMENT;
    
-- ------------------------------------------------------------------------------------------  CLAVES FORÁNEAS (FK)

-- idiomas_alumnos

 ALTER TABLE `idiomas_alumnos`
 ADD FOREIGN KEY (idalumno) REFERENCES gf_alumnosfct(idalumno),
 ADD FOREIGN KEY (ididioma) REFERENCES idiomas(ididioma);
 
 -- gf_alumnos
 
  ALTER TABLE `gf_alumnosfct`
  ADD FOREIGN KEY (preferencia1) REFERENCES preferencias (idpreferencia),
  ADD FOREIGN KEY (preferencia2) REFERENCES preferencias (idpreferencia),
  ADD FOREIGN KEY (preferencia3) REFERENCES preferencias (idpreferencia);

-- doc_alumnos

  ALTER TABLE `doc_alumnos`
  ADD FOREIGN KEY (idalumno) REFERENCES gf_alumnosfct(idalumno);

-- candidatos

  ALTER TABLE `candidatos`
  ADD FOREIGN KEY (idalumno) REFERENCES gf_alumnosfct(idalumno),
  ADD FOREIGN KEY (empresacontratada) REFERENCES ge_empresas(idempresa),
  ADD FOREIGN KEY (estadodualalumno) REFERENCES estados(idestado),
  ADD FOREIGN KEY (estadoempresa1) REFERENCES estados(idestado),
  ADD FOREIGN KEY (estadoempresa2) REFERENCES estados(idestado),
  ADD FOREIGN KEY (estadoempresa3) REFERENCES estados(idestado),
  ADD FOREIGN KEY (primeraempresa) REFERENCES ge_empresas(idempresa),
  ADD FOREIGN KEY (segundaempresa) REFERENCES ge_empresas(idempresa),
  ADD FOREIGN KEY (terceraempresa) REFERENCES ge_empresas(idempresa);
  
-- ge_contactos
  
  ALTER TABLE `ge_contactos`
  ADD FOREIGN KEY (iddomicilio) REFERENCES ge_domicilios(iddomicilio);
  
-- ge_domicilios

   ALTER TABLE `ge_domicilios`
   ADD FOREIGN KEY (`idempresa`) REFERENCES ge_empresas(idempresa);
  
-- candidatos_contactos

  ALTER TABLE `candidatos_contactos`
  ADD FOREIGN KEY (idcandidato) REFERENCES candidatos (idcandidato),
  ADD FOREIGN KEY (tutor) REFERENCES ge_contactos (idcontacto),
  ADD FOREIGN KEY (respempdual) REFERENCES ge_contactos (idcontacto),
  ADD FOREIGN KEY (respempresa) REFERENCES ge_contactos (idcontacto);

-- tipos_alumnos

  ALTER TABLE `tipos_alumnos`
  ADD FOREIGN KEY (idempresa) REFERENCES ge_empresas(idempresa),
  ADD FOREIGN KEY (especialidad) REFERENCES especialidades(idespecialidad);

  -- doc_empresas
  ALTER TABLE `doc_empresas`
  ADD FOREIGN KEY (idempresa) REFERENCES ge_empresas(idempresa);

-- lugares_practicas

  ALTER TABLE `lugares_practicas`
  ADD FOREIGN KEY (iddomicilio) REFERENCES ge_domicilios(iddomicilio),
  ADD FOREIGN KEY (idcandidato) REFERENCES candidatos(idcandidato);

-- candidatos_calendarios
  ALTER TABLE `candidatos_calendarios`
  ADD FOREIGN KEY (idcalendario) REFERENCES calendarios(idcalendario),
  ADD FOREIGN KEY (idcandidato) REFERENCES candidatos(idcandidato);

  -- valoraciones
  ALTER TABLE `valoraciones`
  ADD FOREIGN KEY (idalumno) REFERENCES gf_alumnosfct(idalumno);

-- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- INSERTS
-- preferencias
INSERT INTO `preferencias` (`idpreferencia`,`preferencia`)
VALUES		(1, 'Backend');
INSERT INTO `preferencias` (`idpreferencia`,`preferencia`)
VALUES		(2, 'Frontend');
INSERT INTO `preferencias` (`idpreferencia`,`preferencia`)
VALUES		(3, 'Ciberseguridad');
INSERT INTO `preferencias` (`idpreferencia`,`preferencia`)
VALUES		(4, 'Sistemas informáticos');
INSERT INTO `preferencias` (`idpreferencia`,`preferencia`)
VALUES		(5, 'Telecomunicaciones');
INSERT INTO `preferencias` (`idpreferencia`,`preferencia`)
VALUES		(6, 'Radioenlaces');
INSERT INTO `preferencias` (`idpreferencia`,`preferencia`)
VALUES		(7, 'Instalaciones electricas');
INSERT INTO `preferencias` (`idpreferencia`,`preferencia`)
VALUES		(8, 'Electricidad para empresas');
INSERT INTO `preferencias` (`idpreferencia`,`preferencia`)
VALUES		(9, 'Circuiteria militar');
INSERT INTO `preferencias` (`idpreferencia`,`preferencia`)
VALUES		(10, 'Aplicaciones militares');
INSERT INTO `preferencias` (`idpreferencia`,`preferencia`)
VALUES		(11, 'Ingenieria industrial');
INSERT INTO `preferencias` (`idpreferencia`,`preferencia`)
VALUES		(12, 'Aeronáutica');
INSERT INTO `preferencias` (`idpreferencia`,`preferencia`)
VALUES		(13, 'Automocion transporte urbano');
INSERT INTO `preferencias` (`idpreferencia`,`preferencia`)
VALUES		(14, 'Automocion camiones');
INSERT INTO `preferencias` (`idpreferencia`,`preferencia`)
VALUES		(15, 'Automoción vehículos hidrógeno');
INSERT INTO `preferencias` (`idpreferencia`,`preferencia`)
VALUES		(16, 'Soldadura electrica');
INSERT INTO `preferencias` (`idpreferencia`,`preferencia`)
VALUES		(17, 'Circuitos');
INSERT INTO `preferencias` (`idpreferencia`,`preferencia`)
VALUES		(18, 'Electricidad en empresa');

-- ge_empresas
INSERT INTO `GE_EMPRESAS` (`idempresa`, `cif`, `empresa`, `razonsocial`, `convenio`, `fechaconvenio`, `web`, `observaciones`, `formulariorecibido`, `conveniorecibido`, `compromisorecibido`, `menosdecincotrabajadores`) 
VALUES ('3969', 'A12345671', 'INFORMATICA 1', 'INFORMATICA 1 S.A.', '301', '2023-05-01', '--', '--', '1', '1', '1', '0');
INSERT INTO `GE_EMPRESAS` (`idempresa`, `cif`, `empresa`, `razonsocial`, `convenio`, `fechaconvenio`, `web`, `observaciones`, `formulariorecibido`, `conveniorecibido`, `compromisorecibido`, `menosdecincotrabajadores`) 
VALUES ('3970', 'A12345672', 'INFORMATICA 2', 'INFORMATICA 2 S.A.', '302', '2022-05-02', '--', '--', '1', '1', '1', '0');
INSERT INTO `GE_EMPRESAS` (`idempresa`, `cif`, `empresa`, `razonsocial`, `convenio`, `fechaconvenio`, `web`, `observaciones`, `formulariorecibido`, `conveniorecibido`, `compromisorecibido`, `menosdecincotrabajadores`) 
VALUES ('3971', 'A12345673', 'INFORMATICA 3', 'INFORMATICA 3 S.A.', '303', '2020-05-03', '--', '--', '1', '1', '1', '0');
INSERT INTO `GE_EMPRESAS` (`idempresa`, `cif`, `empresa`, `razonsocial`, `convenio`, `fechaconvenio`, `web`, `observaciones`, `formulariorecibido`, `conveniorecibido`, `compromisorecibido`, `menosdecincotrabajadores`) 
VALUES ('3972', 'B98765432', 'AUTOMOCION 1', 'AUTOMOCION 1 S.A.', '304', '2019-05-04', '--', '--', '1', '1', '1', '0');
INSERT INTO `GE_EMPRESAS` (`idempresa`, `cif`, `empresa`, `razonsocial`, `convenio`, `fechaconvenio`, `web`, `observaciones`, `formulariorecibido`, `conveniorecibido`, `compromisorecibido`, `menosdecincotrabajadores`) 
VALUES ('3973', 'B98765433', 'AUTOMOCION 2', 'AUTOMOCION 2 S.A.', '305', '2022-05-05', '--', '--', '1', '1', '1', '1');
INSERT INTO `GE_EMPRESAS` (`idempresa`, `cif`, `empresa`, `razonsocial`, `convenio`, `fechaconvenio`, `web`, `observaciones`, `formulariorecibido`, `conveniorecibido`, `compromisorecibido`, `menosdecincotrabajadores`) 
VALUES ('3974', 'B98765434', 'AUTOMOCION 3', 'AUTOMOCION 3 S.A.', '306', '2015-05-06', '--', '--', '1', '1', '1', '1');
INSERT INTO `GE_EMPRESAS` (`idempresa`, `cif`, `empresa`, `razonsocial`, `convenio`, `fechaconvenio`, `web`, `observaciones`, `formulariorecibido`, `conveniorecibido`, `compromisorecibido`, `menosdecincotrabajadores`) 
VALUES ('3975', 'B98765435', 'ELECTRICAS 1', 'ELECTRICAS 1 S.A.', '307', '2016-05-07', '--', '--', '1', '1', '1', '0');
INSERT INTO `GE_EMPRESAS` (`idempresa`, `cif`, `empresa`, `razonsocial`, `convenio`, `fechaconvenio`, `web`, `observaciones`, `formulariorecibido`, `conveniorecibido`, `compromisorecibido`, `menosdecincotrabajadores`) 
VALUES ('3976', 'B98765436', 'ELECTRICAS 2', 'ELECTRICAS 2 S.A.', '-', '0000-00-00', '--', '--', '1', '0', '1', '0');
INSERT INTO `GE_EMPRESAS` (`idempresa`, `cif`, `empresa`, `razonsocial`, `convenio`, `fechaconvenio`, `web`, `observaciones`, `formulariorecibido`, `conveniorecibido`, `compromisorecibido`, `menosdecincotrabajadores`) 
VALUES ('3977', 'B98765437', 'ELECTRICAS 3', 'ELECTRICAS 3 S.A.', '-', '0000-00-00', '--', '--', '1', '0', '1', '1');
INSERT INTO `GE_EMPRESAS` (`idempresa`, `cif`, `empresa`, `razonsocial`, `convenio`, `fechaconvenio`, `web`, `observaciones`, `formulariorecibido`, `conveniorecibido`, `compromisorecibido`, `menosdecincotrabajadores`) 
VALUES ('3978', 'B98765438', 'ROBOTICA 1', 'ROBOTICA 1 S.A.', '308', '2022-05-07', '--', '--', '1', '1', '1', '0');
INSERT INTO `GE_EMPRESAS` (`idempresa`, `cif`, `empresa`, `razonsocial`, `convenio`, `fechaconvenio`, `web`, `observaciones`, `formulariorecibido`, `conveniorecibido`, `compromisorecibido`, `menosdecincotrabajadores`) 
VALUES ('3979', 'B98765439', 'ROBOTICA 2', 'ROBOTICA 2 S.A.', '309', '2023-05-07', '--', '--', '1', '1', '1', '0');
INSERT INTO `GE_EMPRESAS` (`idempresa`, `cif`, `empresa`, `razonsocial`, `convenio`, `fechaconvenio`, `web`, `observaciones`, `formulariorecibido`, `conveniorecibido`, `compromisorecibido`, `menosdecincotrabajadores`) 
VALUES ('3980', 'B98765422', 'ROBOTICA 3', 'ROBOTICA 3', '310', '2018-05-07', '--', '--', '1', '1', '1', '0');

-- gf_alumnosfct

INSERT INTO `GF_ALUMNOSFCT` (`idalumno`, `nombre`, `sexo`, `dni`, `fechanacimiento`, `preferencia1`, `preferencia2`, `preferencia3`, `fecha`, `estadocurriculum`, `estadoadmision`, `emailinstituto`, `nacionalidad`, `carnetconducir`, `disponibilidad`, `numeroSS`, `situacionlaboral`, `nombretutorlegal`, `especialidad`, `telalumno`, `telfamilia`, `email`, `observaciones`, `mesFCT`,`anyocursado`,`domicilio`,`cp`,`localidad`) 
VALUES ('2078', 'Ruben Reula Ayuda', 'M', '73440502F', '1996-03-01', '1', '2', '3', '2024-09-15','1', '1', 'rubeninsti@correo.es', 'ESP', 'B2', '1', '281234567890', 'Empleado', '--', 'IFC302', '666666999', '976999999', 'rubenpersonal@correo.es', '--', 'Junio','2024-2025','Av.Zaragoza, 9 Bajo H','50400','Zaragoza');
INSERT INTO `GF_ALUMNOSFCT` (`idalumno`, `nombre`, `sexo`, `dni`, `fechanacimiento`, `preferencia1`, `preferencia2`, `preferencia3`, `fecha`, `estadocurriculum`, `estadoadmision`, `emailinstituto`, `nacionalidad`, `carnetconducir`, `disponibilidad`, `numeroSS`, `situacionlaboral`, `nombretutorlegal`, `especialidad`, `telalumno`, `telfamilia`, `email`, `observaciones`, `mesFCT`,`anyocursado`,`domicilio`,`cp`,`localidad`) 
VALUES ('2079', 'Borja Ruata Perez', 'M', '73440502G', '1997-08-01','4', '5', '6','2023-09-15', '1', '1', 'borjainsti@correo.es', 'ESP', 'B2', '0', '281234567891', 'Desempleado', '--', 'IFC201', '666666888', '987888888', 'borjapersonal@correo.es', '--', 'Junio','2023-2024','Av.Madrid, 2 2B','50900','Zaragoza');
INSERT INTO `GF_ALUMNOSFCT` (`idalumno`, `nombre`, `sexo`, `dni`, `fechanacimiento`, `preferencia1`, `preferencia2`, `preferencia3`, `fecha`, `estadocurriculum`, `estadoadmision`, `emailinstituto`, `nacionalidad`, `carnetconducir`, `disponibilidad`, `numeroSS`, `situacionlaboral`, `nombretutorlegal`, `especialidad`, `telalumno`, `telfamilia`, `email`, `observaciones`, `mesFCT`,`anyocursado`,`domicilio`,`cp`,`localidad`) 
VALUES ('2080', 'David Abadia Ligorred', 'M', '73440502I', '2000-10-12','7', '8', '9','2023-09-15','1', '1', 'davidainsti@correo.es', 'ITA', 'B2', '1', '281234567892', 'Desempleado', '-- ', 'ELE202', '666666777', '976777777', 'davidaapersoanal@correo.es', '--', 'Junio','2022-2023','C/Cortes de Aragón, 13','50100','Zaragoza');
INSERT INTO `GF_ALUMNOSFCT` (`idalumno`, `nombre`, `sexo`, `dni`, `fechanacimiento`, `preferencia1`, `preferencia2`, `preferencia3`, `fecha`, `estadocurriculum`, `estadoadmision`, `emailinstituto`, `nacionalidad`, `carnetconducir`, `disponibilidad`, `numeroSS`, `situacionlaboral`, `nombretutorlegal`, `especialidad`, `telalumno`, `telfamilia`, `email`, `observaciones`, `mesFCT`,`anyocursado`,`domicilio`,`cp`,`localidad`) 
VALUES ('2081', 'Alvaro Lanas Gregorio', 'M', '90340821F', '2000-08-25','10', '11', '12','2024-09-15','0', '0', 'alvaroinsti@correo.es', 'FRA', 'Sin carnet', '0', '285678945612', 'Empleado', '--', 'ELE303', '611223344', '912345678', 'alvaropersonal@email.com', '--', 'Junio','2024-2025','C/Gran Vía, 25','28001','Madrid');
INSERT INTO `GF_ALUMNOSFCT` (`idalumno`, `nombre`, `sexo`, `dni`, `fechanacimiento`, `preferencia1`, `preferencia2`, `preferencia3`, `fecha`, `estadocurriculum`, `estadoadmision`, `emailinstituto`, `nacionalidad`, `carnetconducir`, `disponibilidad`, `numeroSS`, `situacionlaboral`, `nombretutorlegal`, `especialidad`, `telalumno`, `telfamilia`, `email`, `observaciones`, `mesFCT`,`anyocursado`,`domicilio`,`cp`,`localidad`) 
VALUES ('2082', 'Adrian Lanas Gregorio', 'M', '62190874M', '2006-03-17','13', '14', '15','2023-09-15','0', '0', 'adrianinsti@correo.es', 'ESP', 'Sin carnet', '0', '289076543210', 'Desempleado', 'Nuria Gregorio Ramos', 'TMV202','611987654', '917654321', 'adrianpersonal@email.com', '--', 'Junio','2023-2024','Av. Diagonal, 123','08005','Barcelona');
INSERT INTO `GF_ALUMNOSFCT` (`idalumno`, `nombre`, `sexo`, `dni`, `fechanacimiento`, `preferencia1`, `preferencia2`, `preferencia3`, `fecha`, `estadocurriculum`, `estadoadmision`, `emailinstituto`, `nacionalidad`, `carnetconducir`, `disponibilidad`, `numeroSS`, `situacionlaboral`, `nombretutorlegal`, `especialidad`, `telalumno`, `telfamilia`, `email`, `observaciones`, `mesFCT`,`anyocursado`,`domicilio`,`cp`,`localidad`) 
VALUES ('2083', 'David Ferrer Nadal', 'M', '84095632A', '2006-12-08','16', '17', '18','2022-09-15','0', '0', 'davidfinsti@correo.es', 'ESP', 'Sin carnet', '0', '287654321098', 'Desempleado', 'Pedro Ferrer Prados', 'FPB102','633456789', '910987654', 'davidfpersonal@email.com', '--', 'Junio','2022-2023','C/Paseo de la Castellana, 67','28046','Madrid');

-- ge_domicilios

INSERT INTO `GE_DOMICILIOS` (`iddomicilio`, `idempresa`, `domicilio`, `cp`, `provincia`, `localidad`, `telefono`, `email`, `especialidad`, `correodualempresa`) 
VALUES ('2662', '3969','Av. Valencia, 9', '50900', 'Zaragoza', 'Zaragoza', '976132421', 'empresa@empresa.es', 'IFC201 / IFC302', 'empresadual1@empresa.es');
INSERT INTO `GE_DOMICILIOS` (`iddomicilio`, `idempresa`, `domicilio`, `cp`, `provincia`, `localidad`, `telefono`, `email`, `especialidad`, `correodualempresa`) 
VALUES ('2663', '3970', 'Av.Zaragoza,2', '50900', 'Zaragoza', 'Zaragoza', '976345213', 'empresa2@empresa.es', 'IFC201 / IFC302', 'empresadual2@empresa.es');
INSERT INTO `GE_DOMICILIOS` (`iddomicilio`, `idempresa`, `domicilio`, `cp`, `provincia`, `localidad`, `telefono`, `email`, `especialidad`, `correodualempresa`) 
VALUES ('2664', '3971', 'Av.Huesca,15', '50700', 'Zaragoza', 'Cuarte', '976342165', 'empresa3@empresa.es', 'IFC201 / IFC302', 'empresadua3l@empresa.es');
INSERT INTO `GE_DOMICILIOS` (`iddomicilio`, `idempresa`, `domicilio`, `cp`, `provincia`, `localidad`, `telefono`, `email`, `especialidad`, `correodualempresa`)
VALUES ('2665', '3972', 'Calle Mayor, 10', '50001', 'Zaragoza', 'Zaragoza', '976123456', 'empresa1@empresa.es', 'TMV301', 'empresadual4@empresa.es');
INSERT INTO `GE_DOMICILIOS` (`iddomicilio`, `idempresa`, `domicilio`, `cp`, `provincia`, `localidad`, `telefono`, `email`, `especialidad`, `correodualempresa`)
VALUES ('2666', '3973', 'Plaza España, 5', '50002', 'Zaragoza', 'Zaragoza', '976234567', 'empresa2@empresa.es', 'TMV301', 'empresadual5@empresa.es');
INSERT INTO `GE_DOMICILIOS` (`iddomicilio`, `idempresa`, `domicilio`, `cp`, `provincia`, `localidad`, `telefono`, `email`, `especialidad`, `correodualempresa`)
VALUES ('2667', '3974', 'Avenida Libertad, 20', '50003', 'Zaragoza', 'Zaragoza', '976345678', 'empresa3@empresa.es', 'TMV301', 'empresadual6@empresa.es');
INSERT INTO `GE_DOMICILIOS` (`iddomicilio`, `idempresa`, `domicilio`, `cp`, `provincia`, `localidad`, `telefono`, `email`, `especialidad`, `correodualempresa`)
VALUES ('2668', '3975', 'Calle San Miguel, 8', '50004', 'Zaragoza', 'Zaragoza', '976456789', 'empresa4@empresa.es', 'ELE202 / FPB102', 'empresaduaL7@empresa.es');
INSERT INTO `GE_DOMICILIOS` (`iddomicilio`, `idempresa`, `domicilio`, `cp`, `provincia`, `localidad`, `telefono`, `email`, `especialidad`, `correodualempresa`)
VALUES ('2669', '3976', 'Paseo de Sagasta, 15', '50005', 'Zaragoza', 'Zaragoza', '976567890', 'empresa5@empresa.es', 'ELE202 / FPB102', 'empresadual8@empresa.es');
INSERT INTO `GE_DOMICILIOS` (`iddomicilio`, `idempresa`, `domicilio`, `cp`, `provincia`, `localidad`, `telefono`, `email`, `especialidad`, `correodualempresa`)
VALUES ('2670', '3977', 'Calle del Carmen, 12', '50006', 'Zaragoza', 'Zaragoza', '976678901', 'empresa6@empresa.es', 'ELE202 / FPB102', 'empresadual9@empresa.es');
INSERT INTO `GE_DOMICILIOS` (`iddomicilio`, `idempresa`, `domicilio`, `cp`, `provincia`, `localidad`, `telefono`, `email`, `especialidad`, `correodualempresa`)
VALUES ('2671', '3978', 'Calle Alfonso, 25', '50007', 'Zaragoza', 'Zaragoza', '976789012', 'empresa7@empresa.es', 'ELE303', 'empresadual10@empresa.es');
INSERT INTO `GE_DOMICILIOS` (`iddomicilio`, `idempresa`, `domicilio`, `cp`, `provincia`, `localidad`, `telefono`, `email`, `especialidad`, `correodualempresa`)
VALUES ('2672', '3979', 'Avenida Goya, 30', '50008', 'Zaragoza', 'Zaragoza', '976890123', 'empresa8@empresa.es', 'ELE303', 'empresadual11@empresa.es');
INSERT INTO `GE_DOMICILIOS` (`iddomicilio`, `idempresa`, `domicilio`, `cp`, `provincia`, `localidad`, `telefono`, `email`, `especialidad`, `correodualempresa`)
VALUES ('2673', '3980', 'Paseo de la Independencia, 18', '50009', 'Zaragoza', 'Zaragoza', '976901234', 'empresa9@empresa.es', 'ELE303', 'empresadual12@empresa.es');

-- ge_contactos

INSERT INTO `GE_CONTACTOS` (`idcontacto`, `iddomicilio`, `dni`, `nombre`, `email`, `telefono`, `cargo`, `esTutor`, `esRespLegal`, `especialidad`, `observaciones`) 
VALUES ('7924', '2662', '73440502A', 'David Broncano Perez', 'trabajador@correo.es', '666666111', 'TUTOR EMPRESA / REPRESENTANTE LEGAL', '1', '1', 'IFC301 / IFC302', '--');
INSERT INTO `GE_CONTACTOS` (`idcontacto`, `iddomicilio`, `dni`, `nombre`, `email`, `telefono`, `cargo`, `esTutor`, `esRespLegal`, `especialidad`, `observaciones`)
VALUES ('7925', '2662', '82194763B', 'Laura García Martínez', 'laura.garcia@email.com', '677888222', '--', '1', '1', 'IFC301 / IFC302', '--');
INSERT INTO `GE_CONTACTOS` (`idcontacto`, `iddomicilio`, `dni`, `nombre`, `email`, `telefono`, `cargo`, `esTutor`, `esRespLegal`, `especialidad`, `observaciones`)
VALUES ('7926', '2663', '93568471C', 'Carlos Ruiz López', 'carlos.ruiz@email.com', '688999333', 'TUTOR EMPRESA / REPRESENTANTE LEGAL', '1', '1', 'IFC301 / IFC302', '--');
INSERT INTO `GE_CONTACTOS` (`idcontacto`, `iddomicilio`, `dni`, `nombre`, `email`, `telefono`, `cargo`, `esTutor`, `esRespLegal`, `especialidad`, `observaciones`)
VALUES ('7927', '2663', '04731586D', 'María Sánchez González', 'maria.sanchez@email.com', '699111444', '--', '1', '1', 'IFC301 / IFC302', '--');
INSERT INTO `GE_CONTACTOS` (`idcontacto`, `iddomicilio`, `dni`, `nombre`, `email`, `telefono`, `cargo`, `esTutor`, `esRespLegal`, `especialidad`, `observaciones`)
VALUES ('7928', '2664', '21987456E', 'Juan Martínez Pérez', 'juan.martinez@email.com', '677222555', 'TUTOR EMPRESA / REPRESENTANTE LEGAL', '1', '1', 'IFC301 / IFC302', '--');
INSERT INTO `GE_CONTACTOS` (`idcontacto`, `iddomicilio`, `dni`, `nombre`, `email`, `telefono`, `cargo`, `esTutor`, `esRespLegal`, `especialidad`, `observaciones`)
VALUES ('7929', '2664', '36479821F', 'Ana López Rodríguez', 'ana.lopez@email.com', '688333666', '--', '1', '1', 'IFC301 / IFC302', '--');
INSERT INTO `GE_CONTACTOS` (`idcontacto`, `iddomicilio`, `dni`, `nombre`, `email`, `telefono`, `cargo`, `esTutor`, `esRespLegal`, `especialidad`, `observaciones`)
VALUES ('7930', '2665', '59864217G', 'Pedro García Sánchez', 'pedro.garcia@email.com', '699444777', 'TUTOR EMPRESA / REPRESENTANTE LEGAL', '1', '1', 'TMV301', '--');
INSERT INTO `GE_CONTACTOS` (`idcontacto`, `iddomicilio`, `dni`, `nombre`, `email`, `telefono`, `cargo`, `esTutor`, `esRespLegal`, `especialidad`, `observaciones`)
VALUES ('7931', '2665', '73215698H', 'Carmen Martínez López', 'carmen.martinez@email.com', '677555888', '--', '1', '1', 'TMV301', '--');
INSERT INTO `GE_CONTACTOS` (`idcontacto`, `iddomicilio`, `dni`, `nombre`, `email`, `telefono`, `cargo`, `esTutor`, `esRespLegal`, `especialidad`, `observaciones`)
VALUES ('7932', '2666', '91426753I', 'Javier Rodríguez García', 'javier.rodriguez@email.com', '688666999', 'TUTOR EMPRESA / REPRESENTANTE LEGAL', '1', '1', 'TMV301', '--');
INSERT INTO `GE_CONTACTOS` (`idcontacto`, `iddomicilio`, `dni`, `nombre`, `email`, `telefono`, `cargo`, `esTutor`, `esRespLegal`, `especialidad`, `observaciones`)
VALUES ('7933', '2666', '03698142J', 'Sara González Martínez', 'sara.gonzalez@email.com', '699777000', '--', '1', '1', 'TMV301', '--');
INSERT INTO `GE_CONTACTOS` (`idcontacto`, `iddomicilio`, `dni`, `nombre`, `email`, `telefono`, `cargo`, `esTutor`, `esRespLegal`, `especialidad`, `observaciones`)
VALUES ('7934', '2667', '20157463K', 'Elena Pérez López', 'elena.perez@email.com', '677888111', 'TUTOR EMPRESA / REPRESENTANTE LEGAL', '1', '1', 'TMV301', '--');
INSERT INTO `GE_CONTACTOS` (`idcontacto`, `iddomicilio`, `dni`, `nombre`, `email`, `telefono`, `cargo`, `esTutor`, `esRespLegal`, `especialidad`, `observaciones`)
VALUES ('7935', '2667', '40827159L', 'Daniel Sánchez García', 'daniel.sanchez@email.com', '688999222', '--', '1', '1', 'TMV301', '--');
INSERT INTO `GE_CONTACTOS` (`idcontacto`, `iddomicilio`, `dni`, `nombre`, `email`, `telefono`, `cargo`, `esTutor`, `esRespLegal`, `especialidad`, `observaciones`)
VALUES ('7936', '2668', '57210934M', 'Lucía Martínez Rodríguez', 'lucia.martinez@email.com', '699111333', 'TUTOR EMPRESA / REPRESENTANTE LEGAL', '1', '1', 'ELE202 / FPB102', '--');
INSERT INTO `GE_CONTACTOS` (`idcontacto`, `iddomicilio`, `dni`, `nombre`, `email`, `telefono`, `cargo`, `esTutor`, `esRespLegal`, `especialidad`, `observaciones`)
VALUES ('7937', '2668', '72543108N', 'Mario Rodríguez Martínez', 'mario.rodriguez@email.com', '677222444', '--', '1', '1', 'ELE202 / FPB102', '--');
INSERT INTO `GE_CONTACTOS` (`idcontacto`, `iddomicilio`, `dni`, `nombre`, `email`, `telefono`, `cargo`, `esTutor`, `esRespLegal`, `especialidad`, `observaciones`)
VALUES ('7938', '2669', '90763214O', 'Sofía García López', 'sofia.garcia@email.com', '688333555', 'TUTOR EMPRESA / REPRESENTANTE LEGAL', '1', '1', 'ELE202 / FPB102', '--');
INSERT INTO `GE_CONTACTOS` (`idcontacto`, `iddomicilio`, `dni`, `nombre`, `email`, `telefono`, `cargo`, `esTutor`, `esRespLegal`, `especialidad`, `observaciones`)
VALUES ('7939', '2669', '14623758P', 'Elena Martínez Sánchez', 'elena.martinez@email.com', '699444666', '--', '1', '1', 'ELE202 / FPB102', '--');
INSERT INTO `GE_CONTACTOS` (`idcontacto`, `iddomicilio`, `dni`, `nombre`, `email`, `telefono`, `cargo`, `esTutor`, `esRespLegal`, `especialidad`, `observaciones`)
VALUES ('7940', '2670', '37845192Q', 'Manuel López Martínez', 'manuel.lopez@email.com', '677555777', 'TUTOR EMPRESA / REPRESENTANTE LEGAL', '1', '1', 'ELE202 / FPB102', '--');
INSERT INTO `GE_CONTACTOS` (`idcontacto`, `iddomicilio`, `dni`, `nombre`, `email`, `telefono`, `cargo`, `esTutor`, `esRespLegal`, `especialidad`, `observaciones`)
VALUES ('7941', '2670', '51472983R', 'Ana Martínez Pérez', 'ana.martinez@email.com', '688666888', '--', '1', '1', 'ELE202 / FPB102', '--');
INSERT INTO `GE_CONTACTOS` (`idcontacto`, `iddomicilio`, `dni`, `nombre`, `email`, `telefono`, `cargo`, `esTutor`, `esRespLegal`, `especialidad`, `observaciones`)
VALUES ('7942', '2671', '69438251S', 'Carlos García Rodríguez', 'carlos.garcia@email.com', '699777999', 'TUTOR EMPRESA / REPRESENTANTE LEGAL', '1', '1', 'ELE303', '--');
INSERT INTO `GE_CONTACTOS` (`idcontacto`, `iddomicilio`, `dni`, `nombre`, `email`, `telefono`, `cargo`, `esTutor`, `esRespLegal`, `especialidad`, `observaciones`)
VALUES ('7943', '2671', '80971534T', 'Sara Martínez García', 'sara.martinez@email.com', '677888000', '--', '1', '1', 'ELE303', '--');
INSERT INTO `GE_CONTACTOS` (`idcontacto`, `iddomicilio`, `dni`, `nombre`, `email`, `telefono`, `cargo`, `esTutor`, `esRespLegal`, `especialidad`, `observaciones`)
VALUES ('7944', '2672', '92634817U', 'Javier López Martínez', 'javier.lopez@email.com', '688999111', 'TUTOR EMPRESA / REPRESENTANTE LEGAL', '1', '1', 'ELE303','--');
INSERT INTO `GE_CONTACTOS` (`idcontacto`, `iddomicilio`, `dni`, `nombre`, `email`, `telefono`, `cargo`, `esTutor`, `esRespLegal`, `especialidad`, `observaciones`)
VALUES ('7945', '2672', '03175924V', 'Laura García Rodríguez', 'laura.garcia@email.com', '699111222', '--', '1', '1', 'ELE303', '--');
INSERT INTO `GE_CONTACTOS` (`idcontacto`, `iddomicilio`, `dni`, `nombre`, `email`, `telefono`, `cargo`, `esTutor`, `esRespLegal`, `especialidad`, `observaciones`)
VALUES ('7946', '2673', '20457183W', 'Mario Pérez García', 'mario.perez@email.com', '677222333', 'TUTOR EMPRESA / REPRESENTANTE LEGAL', '1', '1', 'ELE303', '--');
INSERT INTO `GE_CONTACTOS` (`idcontacto`, `iddomicilio`, `dni`, `nombre`, `email`, `telefono`, `cargo`, `esTutor`, `esRespLegal`, `especialidad`, `observaciones`)
VALUES ('7947', '2673', '53981742Z', 'María López García', 'maria.lopez@email.com', '677555666', '--', '1', '1', 'ELE303','--');

-- especialidades

INSERT INTO `ESPECIALIDADES` (`idespecialidad`, `nombre`, `codigoespecialidad`,`especial`,`codigo`) 
VALUES ('1', 'FCT - ELECTROMECÁNICA DE VEHÍCULOS AUTOMÓVILES', 'TMV202', 'null', 'null');
INSERT INTO `ESPECIALIDADES` (`idespecialidad`, `nombre`, `codigoespecialidad`,`especial`,`codigo`)
VALUES ('2', 'FCT - AUTOMOCIÓN', 'TMV301', 'null', 'null');
INSERT INTO `ESPECIALIDADES` (`idespecialidad`, `nombre`, `codigoespecialidad`,`especial`,`codigo`) 
VALUES ('3', 'FCT - AUTOMOCIÓN DUAL', 'TMV301-D', 'null', 'null');
INSERT INTO `ESPECIALIDADES` (`idespecialidad`, `nombre`, `codigoespecialidad`,`especial`,`codigo`) 
VALUES ('4', 'FCT - INSTALACIONES ELÉCTRICAS Y AUTOMÁTICAS', 'ELE202', 'null', 'null');
INSERT INTO `ESPECIALIDADES` (`idespecialidad`, `nombre`, `codigoespecialidad`,`especial`,`codigo`) 
VALUES ('5', 'FCT - INSTALACIONES DE TELECOMUNICACIONES', 'ELE203', 'null', 'null');
INSERT INTO `ESPECIALIDADES` (`idespecialidad`, `nombre`, `codigoespecialidad`,`especial`,`codigo`)
VALUES ('6', 'FCT - SISTEMAS ELECTROTÉCNICOS Y AUTOMATIZADOS', 'ELE302', 'null', 'null');
INSERT INTO `ESPECIALIDADES` (`idespecialidad`, `nombre`, `codigoespecialidad`,`especial`,`codigo`)
VALUES ('7', 'FCT - AUTOMATIZACIÓN Y ROBÓTICA INDUSTRIAL', 'ELE303', 'null', 'null');
INSERT INTO `ESPECIALIDADES` (`idespecialidad`, `nombre`, `codigoespecialidad`,`especial`,`codigo`)
VALUES ('8', 'FCT - SISTEMAS DE TELECOMUNICACIONES E INFORMÁTICA', 'ELE304', 'null', 'null');
INSERT INTO `ESPECIALIDADES` (`idespecialidad`, `nombre`, `codigoespecialidad`,`especial`,`codigo`)
VALUES ('9', 'FCT - SISTEMAS MICROINFORMÁTICOS Y REDES', 'IFC201', 'null', 'null');
INSERT INTO `ESPECIALIDADES` (`idespecialidad`, `nombre`, `codigoespecialidad`,`especial`,`codigo`)
VALUES ('10', 'FCT - DESARROLLO DE APLICACIONES MULTIPLATAFORMA', 'IFC302', 'null', 'null');
INSERT INTO `ESPECIALIDADES` (`idespecialidad`, `nombre`, `codigoespecialidad`,`especial`,`codigo`)
VALUES ('11', 'FCT - FP BÁSICA ELECTRICIDAD Y ELECTRÓNICA', 'FPB102', 'null', 'null');
INSERT INTO `ESPECIALIDADES` (`idespecialidad`, `nombre`, `codigoespecialidad`,`especial`,`codigo`)
VALUES ('12', 'FCT - FP BÁSICA INFORMÁTICA Y COMUNICACIONES', 'FPB104', 'null', 'null');
INSERT INTO `ESPECIALIDADES` (`idespecialidad`, `nombre`, `codigoespecialidad`,`especial`,`codigo`)
VALUES ('13', 'FCT - MECANIZADO', 'FME202', 'null', 'null');
INSERT INTO `ESPECIALIDADES` (`idespecialidad`, `nombre`, `codigoespecialidad`,`especial`,`codigo`) 
VALUES ('14', 'FCT - PROGRAMACIÓN DE LA PRODUCCIÓN EN FABRICACIÓN MECÁNICA', 'FME304', 'null', 'null');

-- idiomas

INSERT INTO `IDIOMAS` (`ididioma`, `idioma`) 
VALUES ('1', 'Ingles');
INSERT INTO `IDIOMAS` (`ididioma`, `idioma`) 
VALUES ('2', 'Frances');
INSERT INTO `IDIOMAS` (`ididioma`, `idioma`) 
VALUES ('3', 'Aleman');
INSERT INTO `IDIOMAS` (`ididioma`, `idioma`) 
VALUES ('4', 'Italiano');

-- calendarios

INSERT INTO `CALENDARIOS` (`idcalendario`, `fechainicio`, `fechafin`, `festivos`, `horaslunesjueves`, `horasviernes`, `L`, `M`, `X`, `J`, `V`, `jornadacompleta`, `horasanualesconvenio`, `vacaciones`, `totalhoras`) 
VALUES ('1', '2024-09-15', '2025-06-15', '12', '--', '--', '7:00 - 15:00', '7:00 - 15:00', '7:00 - 15:00', '7:00 - 15:00', '7:00 - 15:00', '--', '1200', '22', '1300');
INSERT INTO `CALENDARIOS` (`idcalendario`, `fechainicio`, `fechafin`, `festivos`, `horaslunesjueves`, `horasviernes`, `L`, `M`, `X`, `J`, `V`, `jornadacompleta`, `horasanualesconvenio`, `vacaciones`, `totalhoras`) 
VALUES ('2', '2023-09-15', '2024-06-15', '12', '--', '--', '9:00 - 13:00 / 15:00 - 19:00', '9:00 - 13:00 / 15:00 - 19:00', '9:00 - 13:00 / 15:00 - 19:00', '9:00 - 13:00 / 15:00 - 19:00', '9:00 - 13:00 / 15:00 - 19:00', '--', '1250', '22', '1300');
INSERT INTO `CALENDARIOS` (`idcalendario`, `fechainicio`, `fechafin`, `festivos`, `horaslunesjueves`, `horasviernes`, `L`, `M`, `X`, `J`, `V`, `jornadacompleta`, `horasanualesconvenio`, `vacaciones`, `totalhoras`) 
VALUES ('3', '2022-09-15', '2024-06-15', '12', '--', '--', '16:00 - 00:00', '16:00 - 00:00', '16:00 - 00:00', '16:00 - 00:00', '16:00 - 00:00', '--', '1300', '22', '1300');
-- INSERT INTO `CALENDARIOS` (`idcalendario`, `fechainicio`, `fechafin`, `festivos`, `horaslunesjueves`, `horasviernes`, `L`, `M`, `X`, `J`, `V`, `jornadacompleta`, `horasanualesconvenio`, `vacaciones`, `totalhoras`) 
-- VALUES ('4', '2024-09-16', '2025-06-16', '12', '--', '--', '16:00 - 00:00', '16:00 - 00:00', '16:00 - 00:00', '16:00 - 00:00', '16:00 - 00:00', '--', '1300', '22', '1300');
-- INSERT INTO `CALENDARIOS` (`idcalendario`, `fechainicio`, `fechafin`, `festivos`, `horaslunesjueves`, `horasviernes`, `L`, `M`, `X`, `J`, `V`, `jornadacompleta`, `horasanualesconvenio`, `vacaciones`, `totalhoras`) 
-- VALUES ('5', '2023-09-17', '2024-06-17', '12', '--', '--', '16:00 - 00:00', '16:00 - 00:00', '16:00 - 00:00', '16:00 - 00:00', '16:00 - 00:00', '--', '1300', '22', '1300');
-- INSERT INTO `CALENDARIOS` (`idcalendario`, `fechainicio`, `fechafin`, `festivos`, `horaslunesjueves`, `horasviernes`, `L`, `M`, `X`, `J`, `V`, `jornadacompleta`, `horasanualesconvenio`, `vacaciones`, `totalhoras`) 
-- VALUES ('6', '2022-09-18', '2023-06-18', '12', '--', '--', '16:00 - 00:00', '16:00 - 00:00', '16:00 - 00:00', '16:00 - 00:00', '16:00 - 00:00', '--', '1300', '22', '1300');

-- estados (candidatos y empresas)

INSERT INTO `ESTADOS` (`idestado`, `tipo`) 
VALUES ('1', 'RESERVADO');
INSERT INTO `ESTADOS` (`idestado`, `tipo`) 
VALUES ('2', 'ADMITIDO');
INSERT INTO `ESTADOS` (`idestado`, `tipo`) 
VALUES ('3', 'NO ADMITIDO');
INSERT INTO `ESTADOS` (`idestado`, `tipo`) 
VALUES ('4', 'BAJA');
INSERT INTO `ESTADOS` (`idestado`, `tipo`) 
VALUES ('5', 'Empresa asignada pero no se le ha enviado el CV del alumno');
INSERT INTO `ESTADOS` (`idestado`, `tipo`) 
VALUES ('6', 'Empresa a la que se le ha enviado el CV del alumno y estamos en espera de la desicion');
INSERT INTO `ESTADOS` (`idestado`, `tipo`) 
VALUES ('7', 'Empresas que al final no han querido coger alumnos y se dan de baja del programa dual');
INSERT INTO `ESTADOS` (`idestado`, `tipo`) 
VALUES ('8', 'Empresa que no ha seleccionado al alumno');
INSERT INTO `ESTADOS` (`idestado`, `tipo`) 
VALUES ('9', 'Empresa ha contratado al alumno y ha enviao el anexo H');

-- doc_alumnos

INSERT INTO `DOC_ALUMNOS` (`iddocalumno`, `idalumno`, `docalum`,`url`) 
VALUES ('1', '2078', 'Curriculum','https://fallout.fandom.com/es/wiki/Empresas_de_antes_de_la_guerra');
INSERT INTO `DOC_ALUMNOS` (`iddocalumno`, `idalumno`, `docalum`,`url`) 
VALUES ('2', '2078', 'Solicitud','https://fallout.fandom.com/es/wiki/Empresas_de_antes_de_la_guerra');
INSERT INTO `DOC_ALUMNOS` (`iddocalumno`, `idalumno`, `docalum`,`url`) 
VALUES ('3', '2079', 'Curriculum','https://fallout.fandom.com/es/wiki/Empresas_de_antes_de_la_guerra');
INSERT INTO `DOC_ALUMNOS` (`iddocalumno`, `idalumno`, `docalum`,`url`) 
VALUES ('4', '2079', 'Solicitud','https://fallout.fandom.com/es/wiki/Empresas_de_antes_de_la_guerra');
INSERT INTO `DOC_ALUMNOS` (`iddocalumno`, `idalumno`, `docalum`,`url`) 
VALUES ('5', '2080', 'Curriculum','https://fallout.fandom.com/es/wiki/Empresas_de_antes_de_la_guerra');
INSERT INTO `DOC_ALUMNOS` (`iddocalumno`, `idalumno`, `docalum`,`url`) 
VALUES ('6', '2080', 'Solicitud','https://fallout.fandom.com/es/wiki/Empresas_de_antes_de_la_guerra');

-- doc_empresas

INSERT INTO `DOC_EMPRESAS` (`iddocempresa`, `idempresa`, `docemp`,`url`) 
VALUES ('1', '3969', 'Formulario', 'url1');
INSERT INTO `DOC_EMPRESAS` (`iddocempresa`, `idempresa`, `docemp`,`url`) 
VALUES ('2', '3969', 'Convenio', 'url1');
INSERT INTO `DOC_EMPRESAS` (`iddocempresa`, `idempresa`, `docemp`,`url`) 
VALUES ('3', '3969', 'Compromiso', 'url1');
INSERT INTO `DOC_EMPRESAS` (`iddocempresa`, `idempresa`, `docemp`, `url`)
VALUES ('4', '3970', 'Formulario', 'url1');
INSERT INTO `DOC_EMPRESAS` (`iddocempresa`, `idempresa`, `docemp`, `url`)
VALUES ('5', '3970', 'Convenio', 'url2');
INSERT INTO `DOC_EMPRESAS` (`iddocempresa`, `idempresa`, `docemp`, `url`)
VALUES ('6', '3970', 'Compromiso', 'url3');
INSERT INTO `DOC_EMPRESAS` (`iddocempresa`, `idempresa`, `docemp`, `url`)
VALUES ('7', '3971', 'Formulario', 'url4');
INSERT INTO `DOC_EMPRESAS` (`iddocempresa`, `idempresa`, `docemp`, `url`)
VALUES ('8', '3971', 'Convenio', 'url5');
INSERT INTO `DOC_EMPRESAS` (`iddocempresa`, `idempresa`, `docemp`, `url`)
VALUES ('9', '3971', 'Compromiso', 'url6');
INSERT INTO `DOC_EMPRESAS` (`iddocempresa`, `idempresa`, `docemp`, `url`)
VALUES ('10', '3972', 'Formulario', 'url7');
INSERT INTO `DOC_EMPRESAS` (`iddocempresa`, `idempresa`, `docemp`, `url`)
VALUES ('11', '3972', 'Convenio', 'url8');
INSERT INTO `DOC_EMPRESAS` (`iddocempresa`, `idempresa`, `docemp`, `url`)
VALUES ('12', '3972', 'Compromiso', 'url9');
INSERT INTO `DOC_EMPRESAS` (`iddocempresa`, `idempresa`, `docemp`, `url`)
VALUES ('13', '3973', 'Formulario', 'url10');
INSERT INTO `DOC_EMPRESAS` (`iddocempresa`, `idempresa`, `docemp`, `url`)
VALUES ('14', '3973', 'Convenio', 'url11');
INSERT INTO `DOC_EMPRESAS` (`iddocempresa`, `idempresa`, `docemp`, `url`)
VALUES ('15', '3973', 'Compromiso', 'url12');
INSERT INTO `DOC_EMPRESAS` (`iddocempresa`, `idempresa`, `docemp`, `url`)
VALUES ('16', '3974', 'Formulario', 'url13');
INSERT INTO `DOC_EMPRESAS` (`iddocempresa`, `idempresa`, `docemp`, `url`)
VALUES ('17', '3974', 'Convenio', 'url14');
INSERT INTO `DOC_EMPRESAS` (`iddocempresa`, `idempresa`, `docemp`, `url`)
VALUES ('18', '3974', 'Compromiso', 'url15');
INSERT INTO `DOC_EMPRESAS` (`iddocempresa`, `idempresa`, `docemp`, `url`)
VALUES ('19', '3975', 'Formulario', 'url16');
INSERT INTO `DOC_EMPRESAS` (`iddocempresa`, `idempresa`, `docemp`, `url`)
VALUES ('20', '3975', 'Convenio', 'url17');
INSERT INTO `DOC_EMPRESAS` (`iddocempresa`, `idempresa`, `docemp`, `url`)
VALUES ('21', '3975', 'Compromiso', 'url18');
INSERT INTO `DOC_EMPRESAS` (`iddocempresa`, `idempresa`, `docemp`, `url`)
VALUES ('22', '3976', 'Formulario', 'url19');
INSERT INTO `DOC_EMPRESAS` (`iddocempresa`, `idempresa`, `docemp`, `url`)
VALUES ('23', '3976', 'Compromiso', 'url21');
INSERT INTO `DOC_EMPRESAS` (`iddocempresa`, `idempresa`, `docemp`, `url`)
VALUES ('24', '3977', 'Formulario', 'url22');
INSERT INTO `DOC_EMPRESAS` (`iddocempresa`, `idempresa`, `docemp`, `url`)
VALUES ('25', '3977', 'Compromiso', 'url24');
INSERT INTO `DOC_EMPRESAS` (`iddocempresa`, `idempresa`, `docemp`, `url`)
VALUES ('26', '3978', 'Formulario', 'url25');
INSERT INTO `DOC_EMPRESAS` (`iddocempresa`, `idempresa`, `docemp`, `url`)
VALUES ('27', '3978', 'Convenio', 'url26');
INSERT INTO `DOC_EMPRESAS` (`iddocempresa`, `idempresa`, `docemp`, `url`)
VALUES ('28', '3978', 'Compromiso', 'url27');
INSERT INTO `DOC_EMPRESAS` (`iddocempresa`, `idempresa`, `docemp`, `url`)
VALUES ('29', '3979', 'Formulario', 'url28');
INSERT INTO `DOC_EMPRESAS` (`iddocempresa`, `idempresa`, `docemp`, `url`)
VALUES ('30', '3979', 'Convenio', 'url29');
INSERT INTO `DOC_EMPRESAS` (`iddocempresa`, `idempresa`, `docemp`, `url`)
VALUES ('31', '3979', 'Compromiso', 'url30');
INSERT INTO `DOC_EMPRESAS` (`iddocempresa`, `idempresa`, `docemp`, `url`)
VALUES ('32', '3980', 'Formulario', 'url31');
INSERT INTO `DOC_EMPRESAS` (`iddocempresa`, `idempresa`, `docemp`, `url`)
VALUES ('33', '3980', 'Convenio', 'url32');
INSERT INTO `DOC_EMPRESAS` (`iddocempresa`, `idempresa`, `docemp`, `url`)
VALUES ('34', '3980', 'Compromiso', 'url33');

-- tipos_alumnos

INSERT INTO `TIPOS_ALUMNOS` (`idtipoalumno`, `idempresa`, `fecha`, `especialidad`,`turno`, `tiporelacionlaboral`, `alumnosformacion`, `alumnosbeca`) 
VALUES ('1', '3969', '2024-09-02', '9', 'M', 'Ambas', '2', '2');
INSERT INTO `TIPOS_ALUMNOS` (`idtipoalumno`, `idempresa`, `fecha`, `especialidad`,`turno`, `tiporelacionlaboral`, `alumnosformacion`, `alumnosbeca`) 
VALUES ('2', '3969', '2024-09-02', '9', 'V', 'Ambas', '2', '2');
INSERT INTO `TIPOS_ALUMNOS` (`idtipoalumno`, `idempresa`, `fecha`, `especialidad`,`turno`, `tiporelacionlaboral`, `alumnosformacion`, `alumnosbeca`) 
VALUES ('3', '3969', '2023-09-02', '9', 'M', 'Ambas', '2', '2');
INSERT INTO `TIPOS_ALUMNOS` (`idtipoalumno`, `idempresa`, `fecha`, `especialidad`,`turno`, `tiporelacionlaboral`, `alumnosformacion`, `alumnosbeca`) 
VALUES ('4', '3969', '2023-09-02', '9', 'V', 'Ambas', '2', '2');
INSERT INTO `TIPOS_ALUMNOS` (`idtipoalumno`, `idempresa`, `fecha`, `especialidad`,`turno`, `tiporelacionlaboral`, `alumnosformacion`, `alumnosbeca`) 
VALUES ('5', '3969', '2022-09-02', '9', 'M', 'Ambas', '2', '2');
INSERT INTO `TIPOS_ALUMNOS` (`idtipoalumno`, `idempresa`, `fecha`, `especialidad`,`turno`, `tiporelacionlaboral`, `alumnosformacion`, `alumnosbeca`) 
VALUES ('6', '3969', '2022-09-02', '9', 'V', 'Ambas', '2', '2');
INSERT INTO `TIPOS_ALUMNOS` (`idtipoalumno`, `idempresa`, `fecha`, `especialidad`,`turno`, `tiporelacionlaboral`, `alumnosformacion`, `alumnosbeca`) 
VALUES ('7', '3969', '2024-09-02', '10', 'M', 'Ambas', '2', '2');
INSERT INTO `TIPOS_ALUMNOS` (`idtipoalumno`, `idempresa`, `fecha`, `especialidad`,`turno`, `tiporelacionlaboral`, `alumnosformacion`, `alumnosbeca`) 
VALUES ('8', '3969', '2024-09-02', '10', 'V', 'Ambas', '2', '2');
INSERT INTO `TIPOS_ALUMNOS` (`idtipoalumno`, `idempresa`, `fecha`, `especialidad`,`turno`, `tiporelacionlaboral`, `alumnosformacion`, `alumnosbeca`) 
VALUES ('9', '3969', '2023-09-02', '10', 'M', 'Ambas', '2', '2');
INSERT INTO `TIPOS_ALUMNOS` (`idtipoalumno`, `idempresa`, `fecha`, `especialidad`,`turno`, `tiporelacionlaboral`, `alumnosformacion`, `alumnosbeca`) 
VALUES ('10', '3969', '2023-09-02', '10', 'V', 'Ambas', '2', '2');
INSERT INTO `TIPOS_ALUMNOS` (`idtipoalumno`, `idempresa`, `fecha`, `especialidad`,`turno`, `tiporelacionlaboral`, `alumnosformacion`, `alumnosbeca`) 
VALUES ('11', '3969', '2022-09-02', '10', 'M', 'Ambas', '2', '2');
INSERT INTO `TIPOS_ALUMNOS` (`idtipoalumno`, `idempresa`, `fecha`, `especialidad`,`turno`, `tiporelacionlaboral`, `alumnosformacion`, `alumnosbeca`) 
VALUES ('12', '3969', '2022-09-02', '10', 'V', 'Ambas', '2', '2');
INSERT INTO `TIPOS_ALUMNOS` (`idtipoalumno`, `idempresa`, `fecha`, `especialidad`, `turno`, `tiporelacionlaboral`, `alumnosformacion`, `alumnosbeca`)
VALUES ('13', '3970', '2024-09-02', '9', 'M', 'Ambas', '2', '2');
INSERT INTO `TIPOS_ALUMNOS` (`idtipoalumno`, `idempresa`, `fecha`, `especialidad`, `turno`, `tiporelacionlaboral`, `alumnosformacion`, `alumnosbeca`)
VALUES ('14', '3970', '2024-09-02', '9', 'V', 'Ambas', '2', '2');
INSERT INTO `TIPOS_ALUMNOS` (`idtipoalumno`, `idempresa`, `fecha`, `especialidad`, `turno`, `tiporelacionlaboral`, `alumnosformacion`, `alumnosbeca`)
VALUES ('15', '3970', '2023-09-02', '9', 'M', 'Ambas', '2', '2');
INSERT INTO `TIPOS_ALUMNOS` (`idtipoalumno`, `idempresa`, `fecha`, `especialidad`, `turno`, `tiporelacionlaboral`, `alumnosformacion`, `alumnosbeca`)
VALUES ('16', '3970', '2023-09-02', '9', 'V', 'Ambas', '2', '2');
INSERT INTO `TIPOS_ALUMNOS` (`idtipoalumno`, `idempresa`, `fecha`, `especialidad`, `turno`, `tiporelacionlaboral`, `alumnosformacion`, `alumnosbeca`)
VALUES ('17', '3970', '2022-09-02', '9', 'M', 'Ambas', '2', '2');
INSERT INTO `TIPOS_ALUMNOS` (`idtipoalumno`, `idempresa`, `fecha`, `especialidad`, `turno`, `tiporelacionlaboral`, `alumnosformacion`, `alumnosbeca`)
VALUES ('18', '3970', '2022-09-02', '9', 'V', 'Ambas', '2', '2');
INSERT INTO `TIPOS_ALUMNOS` (`idtipoalumno`, `idempresa`, `fecha`, `especialidad`, `turno`, `tiporelacionlaboral`, `alumnosformacion`, `alumnosbeca`)
VALUES ('19', '3970', '2024-09-02', '10', 'M', 'Ambas', '2', '2');
INSERT INTO `TIPOS_ALUMNOS` (`idtipoalumno`, `idempresa`, `fecha`, `especialidad`, `turno`, `tiporelacionlaboral`, `alumnosformacion`, `alumnosbeca`)
VALUES ('20', '3970', '2024-09-02', '10', 'V', 'Ambas', '2', '2');
INSERT INTO `TIPOS_ALUMNOS` (`idtipoalumno`, `idempresa`, `fecha`, `especialidad`, `turno`, `tiporelacionlaboral`, `alumnosformacion`, `alumnosbeca`)
VALUES ('21', '3970', '2023-09-02', '10', 'M', 'Ambas', '2', '2');
INSERT INTO `TIPOS_ALUMNOS` (`idtipoalumno`, `idempresa`, `fecha`, `especialidad`, `turno`, `tiporelacionlaboral`, `alumnosformacion`, `alumnosbeca`)
VALUES ('22', '3970', '2023-09-02', '10', 'V', 'Ambas', '2', '2');
INSERT INTO `TIPOS_ALUMNOS` (`idtipoalumno`, `idempresa`, `fecha`, `especialidad`, `turno`, `tiporelacionlaboral`, `alumnosformacion`, `alumnosbeca`)
VALUES ('23', '3970', '2022-09-02', '10', 'M', 'Ambas', '2', '2');
INSERT INTO `TIPOS_ALUMNOS` (`idtipoalumno`, `idempresa`, `fecha`, `especialidad`, `turno`, `tiporelacionlaboral`, `alumnosformacion`, `alumnosbeca`)
VALUES ('24', '3970', '2022-09-02', '10', 'V', 'Ambas', '2', '2');
INSERT INTO `TIPOS_ALUMNOS` (`idtipoalumno`, `idempresa`, `fecha`, `especialidad`, `turno`, `tiporelacionlaboral`, `alumnosformacion`, `alumnosbeca`)
VALUES ('25', '3971', '2024-09-02', '9', 'M', 'Ambas', '2', '2');
INSERT INTO `TIPOS_ALUMNOS` (`idtipoalumno`, `idempresa`, `fecha`, `especialidad`, `turno`, `tiporelacionlaboral`, `alumnosformacion`, `alumnosbeca`)
VALUES ('26', '3971', '2024-09-02', '9', 'V', 'Ambas', '2', '2');
INSERT INTO `TIPOS_ALUMNOS` (`idtipoalumno`, `idempresa`, `fecha`, `especialidad`, `turno`, `tiporelacionlaboral`, `alumnosformacion`, `alumnosbeca`)
VALUES ('27', '3971', '2023-09-02', '9', 'M', 'Ambas', '2', '2');
INSERT INTO `TIPOS_ALUMNOS` (`idtipoalumno`, `idempresa`, `fecha`, `especialidad`, `turno`, `tiporelacionlaboral`, `alumnosformacion`, `alumnosbeca`)
VALUES ('28', '3971', '2023-09-02', '9', 'V', 'Ambas', '2', '2');
INSERT INTO `TIPOS_ALUMNOS` (`idtipoalumno`, `idempresa`, `fecha`, `especialidad`, `turno`, `tiporelacionlaboral`, `alumnosformacion`, `alumnosbeca`)
VALUES ('29', '3971', '2022-09-02', '9', 'M', 'Ambas', '2', '2');
INSERT INTO `TIPOS_ALUMNOS` (`idtipoalumno`, `idempresa`, `fecha`, `especialidad`, `turno`, `tiporelacionlaboral`, `alumnosformacion`, `alumnosbeca`)
VALUES ('30', '3971', '2022-09-02', '9', 'V', 'Ambas', '2', '2');
INSERT INTO `TIPOS_ALUMNOS` (`idtipoalumno`, `idempresa`, `fecha`, `especialidad`, `turno`, `tiporelacionlaboral`, `alumnosformacion`, `alumnosbeca`)
VALUES ('31', '3971', '2024-09-02', '10', 'M', 'Ambas', '2', '2');
INSERT INTO `TIPOS_ALUMNOS` (`idtipoalumno`, `idempresa`, `fecha`, `especialidad`, `turno`, `tiporelacionlaboral`, `alumnosformacion`, `alumnosbeca`)
VALUES ('32', '3971', '2024-09-02', '10', 'V', 'Ambas', '2', '2');
INSERT INTO `TIPOS_ALUMNOS` (`idtipoalumno`, `idempresa`, `fecha`, `especialidad`, `turno`, `tiporelacionlaboral`, `alumnosformacion`, `alumnosbeca`)
VALUES ('33', '3971', '2023-09-02', '10', 'M', 'Ambas', '2', '2');
INSERT INTO `TIPOS_ALUMNOS` (`idtipoalumno`, `idempresa`, `fecha`, `especialidad`, `turno`, `tiporelacionlaboral`, `alumnosformacion`, `alumnosbeca`)
VALUES ('34', '3971', '2023-09-02', '10', 'V', 'Ambas', '2', '2');
INSERT INTO `TIPOS_ALUMNOS` (`idtipoalumno`, `idempresa`, `fecha`, `especialidad`, `turno`, `tiporelacionlaboral`, `alumnosformacion`, `alumnosbeca`)
VALUES ('35', '3971', '2022-09-02', '10', 'M', 'Ambas', '2', '2');
INSERT INTO `TIPOS_ALUMNOS` (`idtipoalumno`, `idempresa`, `fecha`, `especialidad`, `turno`, `tiporelacionlaboral`, `alumnosformacion`, `alumnosbeca`)
VALUES ('36', '3971', '2022-09-02', '10', 'V', 'Ambas', '2', '2');
INSERT INTO `TIPOS_ALUMNOS` (`idtipoalumno`, `idempresa`, `fecha`, `especialidad`, `turno`, `tiporelacionlaboral`, `alumnosformacion`, `alumnosbeca`)
VALUES ('37', '3972', '2024-09-02', '3', 'M', 'Ambas', '2', '2');
INSERT INTO `TIPOS_ALUMNOS` (`idtipoalumno`, `idempresa`, `fecha`, `especialidad`, `turno`, `tiporelacionlaboral`, `alumnosformacion`, `alumnosbeca`)
VALUES ('38', '3972', '2024-09-02', '3', 'V', 'Ambas', '2', '2');
INSERT INTO `TIPOS_ALUMNOS` (`idtipoalumno`, `idempresa`, `fecha`, `especialidad`, `turno`, `tiporelacionlaboral`, `alumnosformacion`, `alumnosbeca`)
VALUES ('39', '3972', '2023-09-02', '3', 'M', 'Ambas', '2', '2');
INSERT INTO `TIPOS_ALUMNOS` (`idtipoalumno`, `idempresa`, `fecha`, `especialidad`, `turno`, `tiporelacionlaboral`, `alumnosformacion`, `alumnosbeca`)
VALUES ('40', '3972', '2023-09-02', '3', 'V', 'Ambas', '2', '2');
INSERT INTO `TIPOS_ALUMNOS` (`idtipoalumno`, `idempresa`, `fecha`, `especialidad`, `turno`, `tiporelacionlaboral`, `alumnosformacion`, `alumnosbeca`)
VALUES ('41', '3972', '2022-09-02', '3', 'M', 'Ambas', '2', '2');
INSERT INTO `TIPOS_ALUMNOS` (`idtipoalumno`, `idempresa`, `fecha`, `especialidad`, `turno`, `tiporelacionlaboral`, `alumnosformacion`, `alumnosbeca`)
VALUES ('42', '3972', '2022-09-02', '3', 'V', 'Ambas', '2', '2');
INSERT INTO `TIPOS_ALUMNOS` (`idtipoalumno`, `idempresa`, `fecha`, `especialidad`, `turno`, `tiporelacionlaboral`, `alumnosformacion`, `alumnosbeca`)
VALUES ('43', '3973', '2024-09-02', '3', 'M', 'Ambas', '2', '2');
INSERT INTO `TIPOS_ALUMNOS` (`idtipoalumno`, `idempresa`, `fecha`, `especialidad`, `turno`, `tiporelacionlaboral`, `alumnosformacion`, `alumnosbeca`)
VALUES ('44', '3973', '2024-09-02', '3', 'V', 'Ambas', '2', '2');
INSERT INTO `TIPOS_ALUMNOS` (`idtipoalumno`, `idempresa`, `fecha`, `especialidad`, `turno`, `tiporelacionlaboral`, `alumnosformacion`, `alumnosbeca`)
VALUES ('45', '3973', '2023-09-02', '3', 'M', 'Ambas', '2', '2');
INSERT INTO `TIPOS_ALUMNOS` (`idtipoalumno`, `idempresa`, `fecha`, `especialidad`, `turno`, `tiporelacionlaboral`, `alumnosformacion`, `alumnosbeca`)
VALUES ('46', '3973', '2023-09-02', '3', 'V', 'Ambas', '2', '2');
INSERT INTO `TIPOS_ALUMNOS` (`idtipoalumno`, `idempresa`, `fecha`, `especialidad`, `turno`, `tiporelacionlaboral`, `alumnosformacion`, `alumnosbeca`)
VALUES ('47', '3973', '2022-09-02', '3', 'M', 'Ambas', '2', '2');
INSERT INTO `TIPOS_ALUMNOS` (`idtipoalumno`, `idempresa`, `fecha`, `especialidad`, `turno`, `tiporelacionlaboral`, `alumnosformacion`, `alumnosbeca`)
VALUES ('48', '3973', '2022-09-02', '3', 'V', 'Ambas', '2', '2');
INSERT INTO `TIPOS_ALUMNOS` (`idtipoalumno`, `idempresa`, `fecha`, `especialidad`, `turno`, `tiporelacionlaboral`, `alumnosformacion`, `alumnosbeca`)
VALUES ('49', '3974', '2024-09-02', '3', 'M', 'Ambas', '2', '2');
INSERT INTO `TIPOS_ALUMNOS` (`idtipoalumno`, `idempresa`, `fecha`, `especialidad`, `turno`, `tiporelacionlaboral`, `alumnosformacion`, `alumnosbeca`)
VALUES ('50', '3974', '2024-09-02', '3', 'V', 'Ambas', '2', '2');
INSERT INTO `TIPOS_ALUMNOS` (`idtipoalumno`, `idempresa`, `fecha`, `especialidad`, `turno`, `tiporelacionlaboral`, `alumnosformacion`, `alumnosbeca`)
VALUES ('51', '3974', '2023-09-02', '3', 'M', 'Ambas', '2', '2');
INSERT INTO `TIPOS_ALUMNOS` (`idtipoalumno`, `idempresa`, `fecha`, `especialidad`, `turno`, `tiporelacionlaboral`, `alumnosformacion`, `alumnosbeca`)
VALUES ('52', '3974', '2023-09-02', '3', 'V', 'Ambas', '2', '2');
INSERT INTO `TIPOS_ALUMNOS` (`idtipoalumno`, `idempresa`, `fecha`, `especialidad`, `turno`, `tiporelacionlaboral`, `alumnosformacion`, `alumnosbeca`)
VALUES ('53', '3974', '2022-09-02', '3', 'M', 'Ambas', '2', '2');
INSERT INTO `TIPOS_ALUMNOS` (`idtipoalumno`, `idempresa`, `fecha`, `especialidad`, `turno`, `tiporelacionlaboral`, `alumnosformacion`, `alumnosbeca`)
VALUES ('54', '3974', '2022-09-02', '3', 'V', 'Ambas', '2', '2');
INSERT INTO `TIPOS_ALUMNOS` (`idtipoalumno`, `idempresa`, `fecha`, `especialidad`, `turno`, `tiporelacionlaboral`, `alumnosformacion`, `alumnosbeca`)
VALUES ('55', '3975', '2024-09-02', '4', 'M', 'Ambas', '2', '2');
INSERT INTO `TIPOS_ALUMNOS` (`idtipoalumno`, `idempresa`, `fecha`, `especialidad`, `turno`, `tiporelacionlaboral`, `alumnosformacion`, `alumnosbeca`)
VALUES ('56', '3975', '2024-09-02', '4', 'V', 'Ambas', '2', '2');
INSERT INTO `TIPOS_ALUMNOS` (`idtipoalumno`, `idempresa`, `fecha`, `especialidad`, `turno`, `tiporelacionlaboral`, `alumnosformacion`, `alumnosbeca`)
VALUES ('57', '3975', '2023-09-02', '4', 'M', 'Ambas', '2', '2');
INSERT INTO `TIPOS_ALUMNOS` (`idtipoalumno`, `idempresa`, `fecha`, `especialidad`, `turno`, `tiporelacionlaboral`, `alumnosformacion`, `alumnosbeca`)
VALUES ('58', '3975', '2023-09-02', '4', 'V', 'Ambas', '2', '2');
INSERT INTO `TIPOS_ALUMNOS` (`idtipoalumno`, `idempresa`, `fecha`, `especialidad`, `turno`, `tiporelacionlaboral`, `alumnosformacion`, `alumnosbeca`)
VALUES ('59', '3975', '2022-09-02', '4', 'M', 'Ambas', '2', '2');
INSERT INTO `TIPOS_ALUMNOS` (`idtipoalumno`, `idempresa`, `fecha`, `especialidad`, `turno`, `tiporelacionlaboral`, `alumnosformacion`, `alumnosbeca`)
VALUES ('60', '3975', '2022-09-02', '4', 'V', 'Ambas', '2', '2');
INSERT INTO `TIPOS_ALUMNOS` (`idtipoalumno`, `idempresa`, `fecha`, `especialidad`, `turno`, `tiporelacionlaboral`, `alumnosformacion`, `alumnosbeca`)
VALUES ('61', '3975', '2024-09-02', '11', 'M', 'Ambas', '2', '2');
INSERT INTO `TIPOS_ALUMNOS` (`idtipoalumno`, `idempresa`, `fecha`, `especialidad`, `turno`, `tiporelacionlaboral`, `alumnosformacion`, `alumnosbeca`)
VALUES ('62', '3975', '2024-09-02', '11', 'V', 'Ambas', '2', '2');
INSERT INTO `TIPOS_ALUMNOS` (`idtipoalumno`, `idempresa`, `fecha`, `especialidad`, `turno`, `tiporelacionlaboral`, `alumnosformacion`, `alumnosbeca`)
VALUES ('63', '3975', '2023-09-02', '11', 'M', 'Ambas', '2', '2');
INSERT INTO `TIPOS_ALUMNOS` (`idtipoalumno`, `idempresa`, `fecha`, `especialidad`, `turno`, `tiporelacionlaboral`, `alumnosformacion`, `alumnosbeca`)
VALUES ('64', '3975', '2023-09-02', '11', 'V', 'Ambas', '2', '2');
INSERT INTO `TIPOS_ALUMNOS` (`idtipoalumno`, `idempresa`, `fecha`, `especialidad`, `turno`, `tiporelacionlaboral`, `alumnosformacion`, `alumnosbeca`)
VALUES ('65', '3975', '2022-09-02', '11', 'M', 'Ambas', '2', '2');
INSERT INTO `TIPOS_ALUMNOS` (`idtipoalumno`, `idempresa`, `fecha`, `especialidad`, `turno`, `tiporelacionlaboral`, `alumnosformacion`, `alumnosbeca`)
VALUES ('66', '3975', '2022-09-02', '11', 'V', 'Ambas', '2', '2');
INSERT INTO `TIPOS_ALUMNOS` (`idtipoalumno`, `idempresa`, `fecha`, `especialidad`, `turno`, `tiporelacionlaboral`, `alumnosformacion`, `alumnosbeca`) 
VALUES ('67', '3976', '2024-09-02', '4', 'M', 'Ambas', '2', '2');
INSERT INTO `TIPOS_ALUMNOS` (`idtipoalumno`, `idempresa`, `fecha`, `especialidad`, `turno`, `tiporelacionlaboral`, `alumnosformacion`, `alumnosbeca`) 
VALUES ('68', '3976', '2024-09-02', '4', 'V', 'Ambas', '2', '2');
INSERT INTO `TIPOS_ALUMNOS` (`idtipoalumno`, `idempresa`, `fecha`, `especialidad`, `turno`, `tiporelacionlaboral`, `alumnosformacion`, `alumnosbeca`) 
VALUES ('69', '3976', '2023-09-02', '4', 'M', 'Ambas', '2', '2');
INSERT INTO `TIPOS_ALUMNOS` (`idtipoalumno`, `idempresa`, `fecha`, `especialidad`, `turno`, `tiporelacionlaboral`, `alumnosformacion`, `alumnosbeca`) 
VALUES ('70', '3976', '2023-09-02', '4', 'V', 'Ambas', '2', '2');
INSERT INTO `TIPOS_ALUMNOS` (`idtipoalumno`, `idempresa`, `fecha`, `especialidad`, `turno`, `tiporelacionlaboral`, `alumnosformacion`, `alumnosbeca`) 
VALUES ('71', '3976', '2022-09-02', '4', 'M', 'Ambas', '2', '2');
INSERT INTO `TIPOS_ALUMNOS` (`idtipoalumno`, `idempresa`, `fecha`, `especialidad`, `turno`, `tiporelacionlaboral`, `alumnosformacion`, `alumnosbeca`) 
VALUES ('72', '3976', '2022-09-02', '4', 'V', 'Ambas', '2', '2');
INSERT INTO `TIPOS_ALUMNOS` (`idtipoalumno`, `idempresa`, `fecha`, `especialidad`, `turno`, `tiporelacionlaboral`, `alumnosformacion`, `alumnosbeca`) 
VALUES ('73', '3976', '2024-09-02', '11', 'M', 'Ambas', '2', '2');
INSERT INTO `TIPOS_ALUMNOS` (`idtipoalumno`, `idempresa`, `fecha`, `especialidad`, `turno`, `tiporelacionlaboral`, `alumnosformacion`, `alumnosbeca`) 
VALUES ('74', '3976', '2024-09-02', '11', 'V', 'Ambas', '2', '2');
INSERT INTO `TIPOS_ALUMNOS` (`idtipoalumno`, `idempresa`, `fecha`, `especialidad`, `turno`, `tiporelacionlaboral`, `alumnosformacion`, `alumnosbeca`) 
VALUES ('75', '3976', '2023-09-02', '11', 'M', 'Ambas', '2', '2');
INSERT INTO `TIPOS_ALUMNOS` (`idtipoalumno`, `idempresa`, `fecha`, `especialidad`, `turno`, `tiporelacionlaboral`, `alumnosformacion`, `alumnosbeca`) 
VALUES ('76', '3976', '2023-09-02', '11', 'V', 'Ambas', '2', '2');
INSERT INTO `TIPOS_ALUMNOS` (`idtipoalumno`, `idempresa`, `fecha`, `especialidad`, `turno`, `tiporelacionlaboral`, `alumnosformacion`, `alumnosbeca`) 
VALUES ('77', '3976', '2022-09-02', '11', 'M', 'Ambas', '2', '2');
INSERT INTO `TIPOS_ALUMNOS` (`idtipoalumno`, `idempresa`, `fecha`, `especialidad`, `turno`, `tiporelacionlaboral`, `alumnosformacion`, `alumnosbeca`) 
VALUES ('78', '3976', '2022-09-02', '11', 'V', 'Ambas', '2', '2');
INSERT INTO `TIPOS_ALUMNOS` (`idtipoalumno`, `idempresa`, `fecha`, `especialidad`, `turno`, `tiporelacionlaboral`, `alumnosformacion`, `alumnosbeca`) 
VALUES ('79', '3977', '2024-09-02', '4', 'M', 'Ambas', '2', '2');
INSERT INTO `TIPOS_ALUMNOS` (`idtipoalumno`, `idempresa`, `fecha`, `especialidad`, `turno`, `tiporelacionlaboral`, `alumnosformacion`, `alumnosbeca`) 
VALUES ('80', '3977', '2024-09-02', '4', 'V', 'Ambas', '2', '2');
INSERT INTO `TIPOS_ALUMNOS` (`idtipoalumno`, `idempresa`, `fecha`, `especialidad`, `turno`, `tiporelacionlaboral`, `alumnosformacion`, `alumnosbeca`) 
VALUES ('81', '3977', '2023-09-02', '4', 'M', 'Ambas', '2', '2');
INSERT INTO `TIPOS_ALUMNOS` (`idtipoalumno`, `idempresa`, `fecha`, `especialidad`, `turno`, `tiporelacionlaboral`, `alumnosformacion`, `alumnosbeca`) 
VALUES ('82', '3977', '2023-09-02', '4', 'V', 'Ambas', '2', '2');
INSERT INTO `TIPOS_ALUMNOS` (`idtipoalumno`, `idempresa`, `fecha`, `especialidad`, `turno`, `tiporelacionlaboral`, `alumnosformacion`, `alumnosbeca`) 
VALUES ('83', '3977', '2022-09-02', '4', 'M', 'Ambas', '2', '2');
INSERT INTO `TIPOS_ALUMNOS` (`idtipoalumno`, `idempresa`, `fecha`, `especialidad`, `turno`, `tiporelacionlaboral`, `alumnosformacion`, `alumnosbeca`) 
VALUES ('84', '3977', '2022-09-02', '4', 'V', 'Ambas', '2', '2');
INSERT INTO `TIPOS_ALUMNOS` (`idtipoalumno`, `idempresa`, `fecha`, `especialidad`, `turno`, `tiporelacionlaboral`, `alumnosformacion`, `alumnosbeca`) 
VALUES ('85', '3977', '2024-09-02', '11', 'M', 'Ambas', '2', '2');
INSERT INTO `TIPOS_ALUMNOS` (`idtipoalumno`, `idempresa`, `fecha`, `especialidad`, `turno`, `tiporelacionlaboral`, `alumnosformacion`, `alumnosbeca`) 
VALUES ('86', '3977', '2024-09-02', '11', 'V', 'Ambas', '2', '2');
INSERT INTO `TIPOS_ALUMNOS` (`idtipoalumno`, `idempresa`, `fecha`, `especialidad`, `turno`, `tiporelacionlaboral`, `alumnosformacion`, `alumnosbeca`) 
VALUES ('87', '3977', '2023-09-02', '11', 'M', 'Ambas', '2', '2');
INSERT INTO `TIPOS_ALUMNOS` (`idtipoalumno`, `idempresa`, `fecha`, `especialidad`, `turno`, `tiporelacionlaboral`, `alumnosformacion`, `alumnosbeca`) 
VALUES ('88', '3977', '2023-09-02', '11', 'V', 'Ambas', '2', '2');
INSERT INTO `TIPOS_ALUMNOS` (`idtipoalumno`, `idempresa`, `fecha`, `especialidad`, `turno`, `tiporelacionlaboral`, `alumnosformacion`, `alumnosbeca`) 
VALUES ('89', '3977', '2022-09-02', '11', 'M', 'Ambas', '2', '2');
INSERT INTO `TIPOS_ALUMNOS` (`idtipoalumno`, `idempresa`, `fecha`, `especialidad`, `turno`, `tiporelacionlaboral`, `alumnosformacion`, `alumnosbeca`) 
VALUES ('90', '3977', '2022-09-02', '11', 'V', 'Ambas', '2', '2');
INSERT INTO `TIPOS_ALUMNOS` (`idtipoalumno`, `idempresa`, `fecha`, `especialidad`, `turno`, `tiporelacionlaboral`, `alumnosformacion`, `alumnosbeca`) 
VALUES ('91', '3978', '2024-09-02', '7', 'M', 'Ambas', '2', '2');
INSERT INTO `TIPOS_ALUMNOS` (`idtipoalumno`, `idempresa`, `fecha`, `especialidad`, `turno`, `tiporelacionlaboral`, `alumnosformacion`, `alumnosbeca`) 
VALUES ('92', '3978', '2024-09-02', '7', 'V', 'Ambas', '2', '2');
INSERT INTO `TIPOS_ALUMNOS` (`idtipoalumno`, `idempresa`, `fecha`, `especialidad`, `turno`, `tiporelacionlaboral`, `alumnosformacion`, `alumnosbeca`) 
VALUES ('93', '3978', '2023-09-02', '7', 'M', 'Ambas', '2', '2');
INSERT INTO `TIPOS_ALUMNOS` (`idtipoalumno`, `idempresa`, `fecha`, `especialidad`, `turno`, `tiporelacionlaboral`, `alumnosformacion`, `alumnosbeca`) 
VALUES ('94', '3978', '2023-09-02', '7', 'V', 'Ambas', '2', '2');
INSERT INTO `TIPOS_ALUMNOS` (`idtipoalumno`, `idempresa`, `fecha`, `especialidad`, `turno`, `tiporelacionlaboral`, `alumnosformacion`, `alumnosbeca`) 
VALUES ('95', '3978', '2022-09-02', '7', 'M', 'Ambas', '2', '2');
INSERT INTO `TIPOS_ALUMNOS` (`idtipoalumno`, `idempresa`, `fecha`, `especialidad`, `turno`, `tiporelacionlaboral`, `alumnosformacion`, `alumnosbeca`) 
VALUES ('96', '3978', '2022-09-02', '7', 'V', 'Ambas', '2', '2');
INSERT INTO `TIPOS_ALUMNOS` (`idtipoalumno`, `idempresa`, `fecha`, `especialidad`, `turno`, `tiporelacionlaboral`, `alumnosformacion`, `alumnosbeca`) 
VALUES ('97', '3979', '2024-09-02', '7', 'M', 'Ambas', '2', '2');
INSERT INTO `TIPOS_ALUMNOS` (`idtipoalumno`, `idempresa`, `fecha`, `especialidad`, `turno`, `tiporelacionlaboral`, `alumnosformacion`, `alumnosbeca`) 
VALUES ('98', '3979', '2024-09-02', '7', 'V', 'Ambas', '2', '2');
INSERT INTO `TIPOS_ALUMNOS` (`idtipoalumno`, `idempresa`, `fecha`, `especialidad`, `turno`, `tiporelacionlaboral`, `alumnosformacion`, `alumnosbeca`) 
VALUES ('99', '3979', '2023-09-02', '7', 'M', 'Ambas', '2', '2');
INSERT INTO `TIPOS_ALUMNOS` (`idtipoalumno`, `idempresa`, `fecha`, `especialidad`, `turno`, `tiporelacionlaboral`, `alumnosformacion`, `alumnosbeca`) 
VALUES ('100', '3979', '2023-09-02', '7', 'V', 'Ambas', '2', '2');
INSERT INTO `TIPOS_ALUMNOS` (`idtipoalumno`, `idempresa`, `fecha`, `especialidad`, `turno`, `tiporelacionlaboral`, `alumnosformacion`, `alumnosbeca`) 
VALUES ('101', '3979', '2022-09-02', '7', 'M', 'Ambas', '2', '2');
INSERT INTO `TIPOS_ALUMNOS` (`idtipoalumno`, `idempresa`, `fecha`, `especialidad`, `turno`, `tiporelacionlaboral`, `alumnosformacion`, `alumnosbeca`) 
VALUES ('102', '3979', '2022-09-02', '7', 'V', 'Ambas', '2', '2');
INSERT INTO `TIPOS_ALUMNOS` (`idtipoalumno`, `idempresa`, `fecha`, `especialidad`, `turno`, `tiporelacionlaboral`, `alumnosformacion`, `alumnosbeca`) 
VALUES ('103', '3980', '2024-09-02', '7', 'M', 'Ambas', '2', '2');
INSERT INTO `TIPOS_ALUMNOS` (`idtipoalumno`, `idempresa`, `fecha`, `especialidad`, `turno`, `tiporelacionlaboral`, `alumnosformacion`, `alumnosbeca`) 
VALUES ('104', '3980', '2024-09-02', '7', 'V', 'Ambas', '2', '2');
INSERT INTO `TIPOS_ALUMNOS` (`idtipoalumno`, `idempresa`, `fecha`, `especialidad`, `turno`, `tiporelacionlaboral`, `alumnosformacion`, `alumnosbeca`) 
VALUES ('105', '3980', '2023-09-02', '7', 'M', 'Ambas', '2', '2');
INSERT INTO `TIPOS_ALUMNOS` (`idtipoalumno`, `idempresa`, `fecha`, `especialidad`, `turno`, `tiporelacionlaboral`, `alumnosformacion`, `alumnosbeca`) 
VALUES ('106', '3980', '2023-09-02', '7', 'V', 'Ambas', '2', '2');
INSERT INTO `TIPOS_ALUMNOS` (`idtipoalumno`, `idempresa`, `fecha`, `especialidad`, `turno`, `tiporelacionlaboral`, `alumnosformacion`, `alumnosbeca`) 
VALUES ('107', '3980', '2022-09-02', '7', 'M', 'Ambas', '2', '2');
INSERT INTO `TIPOS_ALUMNOS` (`idtipoalumno`, `idempresa`, `fecha`, `especialidad`, `turno`, `tiporelacionlaboral`, `alumnosformacion`, `alumnosbeca`) 
VALUES ('108', '3980', '2022-09-02', '7', 'V', 'Ambas', '2', '2');

-- valoraciones

INSERT INTO `VALORACIONES` (`idvaloracion`, `idalumno`, `notamedia`, `notaidioma`, `notamadurez`, `notacompetencia`, `numfaltas`, `notafaltas`, `notaglobal`, `observaciones`) 
VALUES ('1', '2078', '7', '5', '10', '10', '15', '--', NULL, '--');
INSERT INTO `VALORACIONES` (`idvaloracion`, `idalumno`, `notamedia`, `notaidioma`, `notamadurez`, `notacompetencia`, `numfaltas`, `notafaltas`, `notaglobal`, `observaciones`) 
VALUES ('2', '2079', '8', '5', '8', '8', '60', '--', NULL, '--');
INSERT INTO `VALORACIONES` (`idvaloracion`, `idalumno`, `notamedia`, `notaidioma`, `notamadurez`, `notacompetencia`, `numfaltas`, `notafaltas`, `notaglobal`, `observaciones`) 
VALUES ('3', '2080', '6', '5', '7', '7', '100', '--', NULL, '--');
INSERT INTO `VALORACIONES` (`idvaloracion`, `idalumno`, `notamedia`, `notaidioma`, `notamadurez`, `notacompetencia`, `numfaltas`, `notafaltas`, `notaglobal`, `observaciones`) 
VALUES ('4', '2081', '6', '4', '8', '7', '80', '--', NULL, '--');
INSERT INTO `VALORACIONES` (`idvaloracion`, `idalumno`, `notamedia`, `notaidioma`, `notamadurez`, `notacompetencia`, `numfaltas`, `notafaltas`, `notaglobal`, `observaciones`) 
VALUES ('5', '2082', '7', '5', '9', '8', '45', '--', NULL, '--');
INSERT INTO `VALORACIONES` (`idvaloracion`, `idalumno`, `notamedia`, `notaidioma`, `notamadurez`, `notacompetencia`, `numfaltas`, `notafaltas`, `notaglobal`, `observaciones`) 
VALUES ('6', '2083', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '--');

-- Updatear notaglobal automaticamente

-- En desarrollo...

-- candidatos

INSERT INTO `CANDIDATOS` (`idcandidato`, `idalumno`, `fechaasignacion`,`estadodualalumno`, `primeraempresa`, `estadoempresa1`, `segundaempresa`, `estadoempresa2`, `terceraempresa`, `estadoempresa3`, `empresacontratada`, `emaildualalumno`, `opinionempresa`, `observaciones`, `turno`, `anexorecibido`, `anexorellenado`, `estadocalendario`, `anexo`, `tiporelacion`, `cno`) 
VALUES ('1', '2078', '2024-10-10','2', '3969', '5', '3970', '6', '3971', '5','3969', 'alumdual@correo.es', '--', '--', 'M', '1', '1', '1', '1', 'Beca', '11111111');
INSERT INTO `CANDIDATOS` (`idcandidato`, `idalumno`, `fechaasignacion`, `estadodualalumno`, `primeraempresa`, `estadoempresa1`, `segundaempresa`, `estadoempresa2`, `terceraempresa`, `estadoempresa3`, `empresacontratada`, `emaildualalumno`, `opinionempresa`, `observaciones`, `turno`, `anexorecibido`, `anexorellenado`, `estadocalendario`, `anexo`, `tiporelacion`, `cno`) 
VALUES ('2', '2079', '2023-10-10', '2', '3969', '5', '3970', '9', '3971', '7', '3970', 'alumdual2@correo.es', '--', '--', 'M', '1', '1', '1', '1', 'Formativa', '22222222');
INSERT INTO `CANDIDATOS` (`idcandidato`, `idalumno`, `fechaasignacion`, `estadodualalumno`, `primeraempresa`, `estadoempresa1`, `segundaempresa`, `estadoempresa2`, `terceraempresa`, `estadoempresa3`, `empresacontratada`, `emaildualalumno`, `opinionempresa`, `observaciones`, `turno`, `anexorecibido`, `anexorellenado`, `estadocalendario`, `anexo`, `tiporelacion`, `cno`) 
VALUES ('3', '2080', '2022-10-10', '2', '3975', '5', '3976', '6', '3977', '5', '3975', 'alumdual3@correo.es', '--', '--', 'V', '1', '1', '1', '1', 'Beca', '33333333');
INSERT INTO `CANDIDATOS` (`idcandidato`, `idalumno`, `fechaasignacion`, `estadodualalumno`, `primeraempresa`, `estadoempresa1`, `segundaempresa`, `estadoempresa2`, `terceraempresa`, `estadoempresa3`, `empresacontratada`, `emaildualalumno`, `opinionempresa`, `observaciones`, `turno`, `anexorecibido`, `anexorellenado`, `estadocalendario`, `anexo`, `tiporelacion`, `cno`) 
VALUES ('4', '2081', NULL,'1', '3978', '6', '3979', '6', '3980', '6', NULL, 'alumdual3@correo.es', '--', '--', 'V', '0', '0', '0', '0', 'Beca', '33333333');
INSERT INTO `CANDIDATOS` (`idcandidato`, `idalumno`, `fechaasignacion`, `estadodualalumno`, `primeraempresa`, `estadoempresa1`, `segundaempresa`, `estadoempresa2`, `terceraempresa`, `estadoempresa3`, `empresacontratada`, `emaildualalumno`, `opinionempresa`, `observaciones`, `turno`, `anexorecibido`, `anexorellenado`, `estadocalendario`, `anexo`, `tiporelacion`, `cno`) 
VALUES ('5', '2082', NULL,'1', '3972', '6', '3973', '6', '3974', '6', NULL, 'alumdual3@correo.es', '--', '--', 'V', '0', '0', '0', '0', 'Beca', '33333333');
INSERT INTO `CANDIDATOS` (`idcandidato`, `idalumno`, `fechaasignacion`, `estadodualalumno`, `primeraempresa`, `estadoempresa1`, `segundaempresa`, `estadoempresa2`, `terceraempresa`, `estadoempresa3`, `empresacontratada`, `emaildualalumno`, `opinionempresa`, `observaciones`, `turno`, `anexorecibido`, `anexorellenado`, `estadocalendario`, `anexo`, `tiporelacion`, `cno`) 
VALUES ('6', '2083', NULL,'1', '3975', '6', '3976', '6', '3977', '6', NULL, 'alumdual3@correo.es', '--', '--', 'V', '0', '0', '0', '0', 'Beca', '33333333');

-- candidatos_contactos

INSERT INTO `CANDIDATOS_CONTACTOS` (`idcandidato`, `tutor`,`respempdual`, `respempresa`,`fechaasignacion`) 
VALUES ('1', '7924', '7925', '7925','2024-09-05');
INSERT INTO `CANDIDATOS_CONTACTOS` (`idcandidato`, `tutor`,`respempdual`, `respempresa`, `fechaasignacion`) 
VALUES ('2', '7926', '7927', '7927','2023-09-05');
INSERT INTO `CANDIDATOS_CONTACTOS` (`idcandidato`, `tutor`,`respempdual`, `respempresa`, `fechaasignacion`) 
VALUES ('3', '7936', '7937', '7937','2022-09-05');

-- candidatos_calendarios

INSERT INTO `CANDIDATOS_CALENDARIOS` (`idcalendario`, `idcandidato`, `fecharegistro`) 
VALUES ('1', '1', '2024-09-07');
INSERT INTO `CANDIDATOS_CALENDARIOS` (`idcalendario`, `idcandidato`, `fecharegistro`) 
VALUES ('2', '2', '2023-09-07');
INSERT INTO `CANDIDATOS_CALENDARIOS` (`idcalendario`, `idcandidato`, `fecharegistro`) 
VALUES ('3', '3', '2022-09-07');

-- lugares_practicas

INSERT INTO `LUGARES_PRACTICAS` (`iddomicilio`, `idcandidato`, `fechapracticas`) 
VALUES ('2662', '1', '2024-09-10');
INSERT INTO `LUGARES_PRACTICAS` (`iddomicilio`, `idcandidato`, `fechapracticas`) 
VALUES ('2663', '2', '2023-09-10');
INSERT INTO `LUGARES_PRACTICAS` (`iddomicilio`, `idcandidato`, `fechapracticas`) 
VALUES ('2668', '3', '2022-09-10');

-- idiomas_alumnos

INSERT INTO `IDIOMAS_ALUMNOS` (`idalumno`, `ididioma`, `titulo`) 
VALUES ('2078', '1', 'B2');
INSERT INTO `IDIOMAS_ALUMNOS` (`idalumno`, `ididioma`, `titulo`) 
VALUES ('2079', '1', 'B2');
INSERT INTO `IDIOMAS_ALUMNOS` (`idalumno`, `ididioma`, `titulo`) 
VALUES ('2080', '1', 'B2');
INSERT INTO `IDIOMAS_ALUMNOS` (`idalumno`, `ididioma`, `titulo`) 
VALUES ('2080', '4', 'B2');
INSERT INTO `IDIOMAS_ALUMNOS` (`idalumno`, `ididioma`, `titulo`) 
VALUES ('2081', '1', 'B2');
INSERT INTO `IDIOMAS_ALUMNOS` (`idalumno`, `ididioma`, `titulo`) 
VALUES ('2081', '2', 'C1');
INSERT INTO `IDIOMAS_ALUMNOS` (`idalumno`, `ididioma`, `titulo`) 
VALUES ('2082', '1', 'B2');
INSERT INTO `IDIOMAS_ALUMNOS` (`idalumno`, `ididioma`, `titulo`) 
VALUES ('2083', '1', 'B2');

  -- ------------------------------------------------------------------------------------------------------- CREATE FUNCTIONS & PROCEDURES
-- Crear un procedimiento que encripte una contraseña segun una clave especifica: la clave: 1234

DELIMITER //
CREATE FUNCTION 	encriptarContrasenya (contrasenya VARCHAR(255), clave VARCHAR(16)) RETURNS VARCHAR(255)
DETERMINISTIC
BEGIN
    DECLARE 		contrasenya_encriptada VARCHAR(255);
    SET 			contrasenya_encriptada = HEX(AES_ENCRYPT(contrasenya, clave));
    RETURN 			contrasenya_encriptada;
END //
DELIMITER ;

-- Crear un procedimiento que desencripte una contraseña según una clave.

DELIMITER //
CREATE FUNCTION 	desencriptarContrasenya (contrasenya_encriptada VARCHAR(255), clave VARCHAR(16)) RETURNS VARCHAR(255)
DETERMINISTIC
BEGIN
    DECLARE 		contrasenya_desencriptada VARCHAR(255);
    SET 			contrasenya_desencriptada = CAST(AES_DECRYPT(UNHEX(contrasenya_encriptada), clave) AS CHAR);
    RETURN 			contrasenya_desencriptada;
END //
DELIMITER ;

  -- Crear una procedimiento que calcule la nota global por nombre del alumno.
	DELIMITER //
	CREATE PROCEDURE		saberNotaGlobal(idalumno INT) 
	MODIFIES SQL DATA
	BEGIN
		DECLARE notaglobal DECIMAL (10, 2);
        DECLARE idvaloracion INT;
        -- Conseguir el idvaloracion segun el nombre del alumno
        SELECT		v.idvaloracion INTO idvaloracion
        FROM		gf_alumnosfct a
        INNER JOIN	valoraciones v ON v.idalumno = a.idalumno
        WHERE		a.idalumno = idalumno;
        
		SELECT( ((NOTAMEDIA * 6) / 10) +
				((NOTAIDIOMA * 0.5) / 5) +
				((NOTAMADUREZ * 1) / 10) +
				((NOTACOMPETENCIA * 1) / 10) +
				(15 - (((NUMFALTAS / 1050) * 100) / 1050) * 100) / 10) AS 'Nota global' 
		INTO 	notaglobal
		FROM    valoraciones v
		WHERE   v.idvaloracion = idvaloracion;
        
        UPDATE		valoraciones v
        SET			v.notaglobal = notaglobal
        WHERE		v.idvaloracion = idvaloracion;
	END//
	DELIMITER ;
    
    -- Función que dado un grado nos diga cuantos alumnos quedan por colocar. 
	DELIMITER //
	CREATE FUNCTION		alumnosPorAsignar(codigoespecialidad VARCHAR(10), fecha INT) RETURNS INT 
	READS SQL DATA
	BEGIN 
	DECLARE alumnos INT; 
		SELECT		count(g.idalumno)  INTO alumnos
		FROM		gf_alumnosfct g, candidatos c, especialidades e
		WHERE		g.idalumno = c.idalumno
		AND			c.empresacontratada IS NULL
		AND 		e.codigoespecialidad LIKE CONVERT(g.especialidad USING utf8mb4) COLLATE utf8mb4_0900_ai_ci
		AND			YEAR(g.fecha) = fecha
		AND 		CONVERT(e.codigoespecialidad USING utf8mb4) COLLATE utf8mb4_0900_ai_ci LIKE CONVERT(codigoespecialidad USING utf8mb4) COLLATE utf8mb4_0900_ai_ci;
	RETURN alumnos; 
	END//
	DELIMITER ;
    
    -- Una función que dado una empresa y un grado diga cuantos huecos quedan sin asignar. 
    DELIMITER //
	CREATE FUNCTION		alumnosQueFaltanEnEmpresa(codigoespecialidad VARCHAR(10),empresa VARCHAR(100),fecha INT) RETURNS INT 
	READS SQL DATA
	BEGIN 
	DECLARE alumnos INT; 
	SELECT
			(SELECT	SUM(t.alumnosformacion + t.alumnosbeca)
			FROM	tipos_alumnos t, ge_empresas g, especialidades e
			WHERE	g.idempresa = t.idempresa
			AND		t.especialidad = e.idespecialidad
			AND 	g.empresa LIKE empresa COLLATE utf8mb4_general_ci
			AND 	e.codigoespecialidad LIKE codigoespecialidad COLLATE utf8mb4_general_ci
			AND		YEAR(t.fecha) = fecha)
			- 
			(SELECT	count(c.idalumno)
			FROM	candidatos c, ge_empresas g, gf_alumnosfct gf
			WHERE	c.empresacontratada = g.idempresa
			AND		gf.idalumno = c.idalumno
			AND 	g.empresa LIKE empresa COLLATE utf8mb4_general_ci
			AND		YEAR(c.fechaasignacion) = fecha
			AND 	gf.especialidad LIKE codigoespecialidad COLLATE utf8mb4_general_ci) INTO alumnos;
	RETURN alumnos; 
	END//
	DELIMITER ;
    
    -- Procedimiento que devuelve empresas sin convenio
	DELIMITER //
	CREATE PROCEDURE empresasSinConvenio ()
	BEGIN
		SELECT g.empresa AS 'Empresas sin convenio'
		FROM ge_empresas g
		WHERE g.convenio NOT REGEXP '^[0-9]{3}$';
	END //
	DELIMITER ;
    
    -- Un procedimiento que borre una empresa estando seguros de que no tiene alumnos adjudicados.
	DELIMITER //
	CREATE PROCEDURE eliminarEmpresaSinAlumnos (IN empresa VARCHAR(100))
	BEGIN
		-- Creo una variable que contenga el id del nombre de la empresa que solicita el usuario.
		DECLARE idempresa INT;
		-- Obtener el idempresa correspondiente al nombre de la empresa
		SELECT ge.idempresa INTO idempresa
		FROM ge_empresas ge
		WHERE ge.empresa = empresa COLLATE utf8mb4_0900_ai_ci;
		
		IF NOT EXISTS (
			SELECT 1
			FROM candidatos c
			WHERE c.empresacontratada = idempresa
		) THEN
			-- Borrar el id de los campos en candidatos.
			UPDATE			candidatos c
			SET				c.primeraempresa = null , c.segundaempresa = null , c.terceraempresa = null			
			WHERE			idempresa IN (c.primeraempresa, c.segundaempresa, c.terceraempresa);
			-- Eliminar las filas de registros referentes a la empresa en doc_empresa.
			DELETE 			d.*
			FROM			doc_empresas d
			WHERE			d.idempresa = idempresa;
			-- Eliminar las filas de registros referentes a la empresa en tipos_alumnos.
			DELETE 			t.*
			FROM			tipos_alumnos t
			WHERE			t.idempresa = idempresa;
			-- Eliminar las filas de registros referentes a la empresa en ge_contactos.
			DELETE FROM 	ge_contactos c
			WHERE 			c.iddomicilio IN (
												SELECT 			cc.iddomicilio
												FROM 			ge_domicilios cc
												WHERE 			cc.idempresa = idempresa
											);
			-- Eliminar las filas de registros referentes a la empresa en ge_domicilios.
			DELETE 				d.*
			FROM 				ge_domicilios d 
			WHERE 				d.idempresa = idempresa;
			-- Eliminar la empresa y su información asociada.
			DELETE 				e.*
			FROM 				ge_empresas e 
			WHERE 				e.idempresa = idempresa;
			-- Mostramos un mensaje para que el usuario sepa que se ha eliminado.
			SELECT 'Registros eliminados correctamente' AS resultado;
		ELSE
			-- Mostramos un mensaje para que el usuario sepa que esa empesa no puede borrarse.
			SELECT 'La empresa contiene registros de alumnos y NO se puede eliminar' AS resultado;
		END IF;
	END//
	DELIMITER ;
  -- ------------------------------------------------------------------------------------------------------- DROP, CREATE & GRANT USERS
DROP USER IF EXISTS		'ADMIN';
DROP USER IF EXISTS		'TUTOR';
DROP USER IF EXISTS		'SECRETARIA';

-- Admin, tutor (todo menos las firmas), secretaria (solo documentos y convenios) Grant solo vale para 1, crar un grant por cada tabla

CREATE USER 	'ADMIN'
IDENTIFIED BY	'eaqvz9KtVzCV4d1';

CREATE USER 	'TUTOR'
IDENTIFIED BY   'eaqvz9KtVzCV4d2';

CREATE USER 	'SECRETARIA'
IDENTIFIED BY   'eaqvz9KtVzCV4d3';

GRANT			ALL PRIVILEGES
ON				*.*
TO				'ADMIN';

GRANT 			SELECT
ON 				alumnos_dual.calendarios
TO 				'TUTOR';

GRANT 			SELECT
ON 				alumnos_dual.candidatos
TO 				'TUTOR';

GRANT 			SELECT
ON 				alumnos_dual.candidatos_calendarios
TO 				'TUTOR';

GRANT 			SELECT
ON 				alumnos_dual.estados
TO 				'TUTOR';

GRANT 			SELECT
ON 				alumnos_dual.ge_contactos
TO 				'TUTOR';

GRANT 			SELECT
ON 				alumnos_dual.ge_domicilios
TO 				'TUTOR';

GRANT 			SELECT
ON 				alumnos_dual.ge_empresas
TO 				'TUTOR';

GRANT 			SELECT
ON 				alumnos_dual.gf_alumnosfct
TO 				'TUTOR';

GRANT 			SELECT
ON 				alumnos_dual.idiomas
TO 				'TUTOR';

GRANT 			SELECT
ON 				alumnos_dual.idiomas_alumnos
TO 				'TUTOR';

GRANT 			SELECT
ON 				alumnos_dual.lugares_practicas
TO 				'TUTOR';

GRANT 			SELECT
ON 				alumnos_dual.tipos_alumnos
TO 				'TUTOR';

GRANT 			SELECT
ON 				alumnos_dual.candidatos_contactos
TO 				'TUTOR';

GRANT 			SELECT
ON 				alumnos_dual.valoraciones
TO 				'TUTOR';

GRANT 			SELECT
ON 				alumnos_dual.doc_alumnos
TO 				'SECRETARIA';

GRANT 			SELECT
ON 				alumnos_dual.doc_empresas
TO 				'SECRETARIA';

-- SHOW GRANTS FOR 'ADMIN'@'%';
-- SHOW GRANTS FOR 'TUTOR'@'%';
  
  /*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
  /*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
  /*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- ---------------------------------------------------------------------------- TABLA CREADA EXPRESAMENTE PARA DEMOSTRAR LA FUNCION ENCRIPTAR / DES-ENCRIPTAR
CREATE TABLE 	`usuarios` (
`idusuario`		INT NOT NULL,
`usuario`		VARCHAR(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
`contrasenya`	VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL
) 
ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO		usuarios (`idusuario`,`usuario`,`contrasenya`)
VALUES			(1,'Ruben','');

COMMIT
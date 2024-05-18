-- NOTAS:
-- Como idempresa e idalumno tienen que ser por obligacion de las necesidades, not null
-- en la tabla ge_domicilios, como en esta se guardan: domicilios de alumnos, domicilios de empresas,
-- para no llevar a confusión, cuando un domicilio sea solo de una empresa y viceversa, como tiene que 
-- tener un id que exista de la otra parte si o si, sino da error, no vale poner null, 0 o -1 si no existe,
-- he decidigo crear dos registros inutiles tanto en ge_empresas como en gf_alumnosfct con el id -1 en ambas
-- simplemente para hacer constar que cuando un domicilio de empresa o alumno sea de este, en el otro id pondre
-- -1, de esta forma sabre que se trata de un domicilio que pertenece al id que no es -1.
-- ------------------------------------------------------------------------------------------------------- DROP, CREATE & USE DATABASE
DROP DATABASE IF EXISTS alumnos_dual; -- Tirar la BBDD
CREATE DATABASE IF NOT EXISTS alumnos_dual; -- Crearla de nuevo
USE alumnos_dual; -- Seleccionar la BBDD.

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

-- NOTAS: En la tabla ge_domicilios he tenido que converitr a valores nulos las id´s porque sino establece valor 0 por defecto y no tengo
--        un id de valor 0. Otra opcion igual seria tener un registro de alumno y de empresa que sea id 0 y no tenga datos utiles sino que este
--        de relleno para evitar el problema.

-- idiomas
CREATE TABLE `idiomas` (
  `ididioma` INT,
  `idioma`   VARCHAR(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
 )
ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
  
  -- idiomas_alumnos
CREATE TABLE `idiomas_alumnos` (
  `idalumno` INT NOT NULL,
  `ididioma` INT NOT NULL,
  `titulo`   VARCHAR(10)  CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL
   )
ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
  
  -- doc_alumnos
  CREATE TABLE `doc_alumnos` (
  `iddocalumno` INT NOT NULL,
  `idalumno`  INT NOT NULL,
  `docalum`   VARCHAR(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `url`       VARCHAR(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
  )
ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
  
  -- especialidades
  CREATE TABLE `especialidades` (
  `idespecialidad` 	   INT NOT NULL,
  `nombre` 			   VARCHAR(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `codigoespecialidad` VARCHAR(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
  )
ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
  
  -- gf_alumnosfct
ALTER TABLE `gf_alumnosfct` 
ADD COLUMN `sexo`				 					VARCHAR(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL AFTER `nombre`,
ADD COLUMN `fechanacimiento` 						DATE NULL AFTER `dni`,
ADD COLUMN `opcion1` 	  							VARCHAR(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL AFTER `fechanacimiento`,
ADD COLUMN `opcion2`       							VARCHAR(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL AFTER `opcion1`,
ADD COLUMN `opcion3`       							VARCHAR(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL AFTER `opcion2`,
ADD COLUMN `fecha` 	     					    	DATE NOT NULL AFTER `opcion3`,
ADD COLUMN `estadocurriculum` 						TINYINT NOT NULL DEFAULT 0 AFTER `fecha`,
ADD COLUMN `estadoadmision` 						TINYINT NOT NULL DEFAULT 0 AFTER `estadocurriculum`,
ADD COLUMN `emailinstituto` 						VARCHAR(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL AFTER `estadoadmision`,
ADD COLUMN `nacionalidad` 							VARCHAR(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL AFTER `emailinstituto`,
ADD COLUMN `carnetconducir` 						VARCHAR(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL AFTER `nacionalidad`,
ADD COLUMN `disponibilidad` 						TINYINT NOT NULL AFTER `carnetconducir`,
ADD COLUMN `numeroSS` 								VARCHAR(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL AFTER `disponibilidad`,
ADD COLUMN `situacionlaboral` 						VARCHAR(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL AFTER `numeroSS`,
ADD COLUMN `nombretutorlegal` 						VARCHAR(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL AFTER `situacionlaboral`,
ADD COLUMN `dnitutorlegal` 							VARCHAR(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL AFTER `nombretutorlegal`,
ADD COLUMN `anyocursado` 							VARCHAR(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL AFTER `dnitutorlegal`,
CHANGE COLUMN `especialidad` `especialidad` 		VARCHAR(10) CHARACTER SET 'utf8mb4' NOT NULL AFTER `dnitutorlegal`,
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
  `idempresa` 			INT NOT NULL,
  `estadodualalumno` 	INT NOT NULL,
  `primeraempresa` 		INT NOT NULL,
  `estadoempresa1` 		INT NOT NULL,
  `segundaempresa` 		INT NOT NULL,
  `estadoempresa2` 		INT NOT NULL,
  `terceraempresa` 		INT NOT NULL,
  `estadoempresa3` 		INT NOT NULL,
  `empresacontratada` 	VARCHAR(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
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

-- tutores_candidatos
CREATE TABLE `tutores_candidatos` (
  `idcandidato` 	INT NOT NULL,
  `idcontacto` 		INT NOT NULL,
  `fechaasignacion` DATE NOT NULL
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
  `idvaloracion` 	INT NOT NULL,
  `idalumno` 	 	INT NOT NULL,
  `notamedia`    	FLOAT NOT NULL,
  `notaidioma`   	INT NOT NULL,
  `notamadurez`     INT NOT NULL,
  `notacompetencia` INT NOT NULL,
  `numfaltas`       INT NOT NULL,
  `notafaltas` 		FLOAT NOT NULL,
  `notaglobal` 		FLOAT NOT NULL,
  `observaciones`   LONGTEXT NULL
  ) 
ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- INSERTS

-- ge_empresas
INSERT INTO `GE_EMPRESAS` (`idempresa`, `cif`, `empresa`, `razonsocial`, `convenio`, `fechaconvenio`, `web`, `observaciones`, `formulariorecibido`, `conveniorecibido`, `compromisorecibido`, `menosdecincotrabajadores`) 
VALUES ('3969', 'A12345671', 'TESLA', 'TESLA S.A.', '301', '2023-05-01', '--', '--', '0', '0', '0', '0');
INSERT INTO `GE_EMPRESAS` (`idempresa`, `cif`, `empresa`, `razonsocial`, `convenio`, `fechaconvenio`, `web`, `observaciones`, `formulariorecibido`, `conveniorecibido`, `compromisorecibido`, `menosdecincotrabajadores`) 
VALUES ('3970', 'A12345672', 'IBM', 'IBM S.L.', '302', '2023-05-02', '--', '--', '0', '0', '0', '0');
INSERT INTO `GE_EMPRESAS` (`idempresa`, `cif`, `empresa`, `razonsocial`, `convenio`, `fechaconvenio`, `web`, `observaciones`, `formulariorecibido`, `conveniorecibido`, `compromisorecibido`, `menosdecincotrabajadores`) 
VALUES ('3971', 'A12345673', 'INTEL', 'INTEL S.L.U.', '303', '2023-05-03', '--', '--', '0', '0', '0', '0');
INSERT INTO `GE_EMPRESAS` (`idempresa`, `cif`, `empresa`, `razonsocial`, `convenio`, `fechaconvenio`, `web`, `observaciones`, `formulariorecibido`, `conveniorecibido`, `compromisorecibido`, `menosdecincotrabajadores`) 
VALUES ('3972', 'B98765432', 'Google', 'Google Inc.', '304', '2023-05-04', 'www.google.com', 'Empresa líder en tecnología.', '1', '1', '1', '0');
INSERT INTO `GE_EMPRESAS` (`idempresa`, `cif`, `empresa`, `razonsocial`, `convenio`, `fechaconvenio`, `web`, `observaciones`, `formulariorecibido`, `conveniorecibido`, `compromisorecibido`, `menosdecincotrabajadores`) 
VALUES ('3973', 'B98765433', 'Microsoft', 'Microsoft Corporation', '305', '2023-05-05', 'www.microsoft.com', 'Empresa multinacional de software.', '1', '1', '1', '0');
INSERT INTO `GE_EMPRESAS` (`idempresa`, `cif`, `empresa`, `razonsocial`, `convenio`, `fechaconvenio`, `web`, `observaciones`, `formulariorecibido`, `conveniorecibido`, `compromisorecibido`, `menosdecincotrabajadores`) 
VALUES ('3974', 'B98765434', 'Apple', 'Apple Inc.', '306', '2023-05-06', 'www.apple.com', 'Empresa líder en tecnología de consumo.', '1', '1', '1', '0');
INSERT INTO `GE_EMPRESAS` (`idempresa`, `cif`, `empresa`, `razonsocial`, `convenio`, `fechaconvenio`, `web`, `observaciones`, `formulariorecibido`, `conveniorecibido`, `compromisorecibido`, `menosdecincotrabajadores`) 
VALUES ('3975', 'B98765435', 'Amazon', 'Amazon.com Inc.', '307', '2023-05-07', 'www.amazon.com', 'Empresa líder en comercio electrónico.', '1', '1', '1', '0');
INSERT INTO `GE_EMPRESAS` (`idempresa`, `cif`, `empresa`, `razonsocial`, `convenio`, `fechaconvenio`, `web`, `observaciones`, `formulariorecibido`, `conveniorecibido`, `compromisorecibido`, `menosdecincotrabajadores`) 
VALUES ('3976', 'B98765436', 'Facebook', 'Facebook Inc.', '308', '2023-05-08', 'www.facebook.com', 'Empresa líder en redes sociales.', '1', '1', '1', '0');
INSERT INTO `GE_EMPRESAS` (`idempresa`, `cif`, `empresa`, `razonsocial`, `convenio`, `fechaconvenio`, `web`, `observaciones`, `formulariorecibido`, `conveniorecibido`, `compromisorecibido`, `menosdecincotrabajadores`) 
VALUES ('3977', 'B98765437', 'Samsung', 'Samsung Electronics', '309', '2023-05-09', 'www.samsung.com', 'Empresa líder en electrónica de consumo.', '1', '1', '1', '0');







-- gf_alumnosfct
INSERT INTO `GF_ALUMNOSFCT` (`idalumno`, `nombre`, `sexo`, `dni`, `fechanacimiento`, `opcion1`, `opcion2`, `opcion3`, `fecha`, `estadocurriculum`, `estadoadmision`, `emailinstituto`, `nacionalidad`, `carnetconducir`, `disponibilidad`, `numeroSS`, `situacionlaboral`, `nombretutorlegal`, `especialidad`, `telalumno`, `telfamilia`, `email`, `observaciones`, `mesFCT`,`anyocursado`,`domicilio`,`cp`,`localidad`) 
VALUES ('2078', 'Ruben Reula Ayuda', 'M', '73440502F', '1996-03-01', 'Backend', 'Frontend', 'Ciberseguridad', '2024-05-05','0', '0', 'insti@correo.es', 'ESP', '1', '1', '281234567890', 'Empleado', '--', 'IFC302', '666666999', '976999999', 'personal@correo.es', '--', 'Junio','2024-2025','Av.Zaragoza, 9 Bajo H','50400','Zaragoza');
INSERT INTO `GF_ALUMNOSFCT` (`idalumno`, `nombre`, `sexo`, `dni`, `fechanacimiento`, `opcion1`, `opcion2`, `opcion3`, `fecha`, `estadocurriculum`, `estadoadmision`, `emailinstituto`, `nacionalidad`, `carnetconducir`, `disponibilidad`, `numeroSS`, `situacionlaboral`, `nombretutorlegal`, `especialidad`, `telalumno`, `telfamilia`, `email`, `observaciones`, `mesFCT`,`anyocursado`,`domicilio`,`cp`,`localidad`) 
VALUES ('2079', 'Maria Maza Perez', 'F', '73440502G', '1997-08-01','Soladura acúatica', 'Construccion de aviones', 'Automatizacion de robots','2024-05-05', '0', '0', 'insti2@correo.es', 'ESP', '1', '0', '281234567891', 'Desempleado', '--', 'ELE202', '666666888', '987888888', 'personal2@correo.es', '--', 'Junio','2024-2025','Av.Madrid, 2 2B','50900','Zaragoza');
INSERT INTO `GF_ALUMNOSFCT` (`idalumno`, `nombre`, `sexo`, `dni`, `fechanacimiento`, `opcion1`, `opcion2`, `opcion3`, `fecha`, `estadocurriculum`, `estadoadmision`, `emailinstituto`, `nacionalidad`, `carnetconducir`, `disponibilidad`, `numeroSS`, `situacionlaboral`, `nombretutorlegal`, `especialidad`, `telalumno`, `telfamilia`, `email`, `observaciones`, `mesFCT`,`anyocursado`,`domicilio`,`cp`,`localidad`) 
VALUES ('2080', 'Carmen Fau Bailo', 'F', '73440502I', '2007-10-12','Reparar coches', 'Reparar camiones', 'Mecánica de la armada','2024-05-05','0', '0', 'insti3@correo.es', 'ITA', '0', '0', '281234567892', 'Desempleado', 'Juan Sindios ', 'TMV202', '666666777', '976777777', 'personal3@correo.es', '--', 'Junio','2024-2025','C/Cortes de Aragón, 13','50100','Zaragoza');
INSERT INTO `GF_ALUMNOSFCT` (`idalumno`, `nombre`, `sexo`, `dni`, `fechanacimiento`, `opcion1`, `opcion2`, `opcion3`, `fecha`, `estadocurriculum`, `estadoadmision`, `emailinstituto`, `nacionalidad`, `carnetconducir`, `disponibilidad`, `numeroSS`, `situacionlaboral`, `nombretutorlegal`, `especialidad`, `telalumno`, `telfamilia`, `email`, `observaciones`, `mesFCT`,`anyocursado`,`domicilio`,`cp`,`localidad`) 
VALUES ('3081', 'Javier López García', 'M', '90340821F', '2003-08-25','Diseño gráfico', 'Programación web', 'Marketing digital','2024-05-10','1', '1', 'insti4@correo.es', 'ESP', '1', '1', '285678945612', 'Estudiante', 'María López', 'Informática', '611223344', '912345678', 'javierlg@email.com', 'Interesado en prácticas internacionales.', 'Julio','2023-2024','C/Gran Vía, 25','28001','Madrid');
INSERT INTO `GF_ALUMNOSFCT` (`idalumno`, `nombre`, `sexo`, `dni`, `fechanacimiento`, `opcion1`, `opcion2`, `opcion3`, `fecha`, `estadocurriculum`, `estadoadmision`, `emailinstituto`, `nacionalidad`, `carnetconducir`, `disponibilidad`, `numeroSS`, `situacionlaboral`, `nombretutorlegal`, `especialidad`, `telalumno`, `telfamilia`, `email`, `observaciones`, `mesFCT`,`anyocursado`,`domicilio`,`cp`,`localidad`) 
VALUES ('3082', 'Lucía Martínez Pérez', 'F', '62190874M', '2005-03-17','Diseño de modas', 'Fotografía', 'Gestión de eventos','2024-05-12','0', '1', 'insti5@correo.es', 'ESP', '0', '0', '289076543210', 'Desempleado', 'Pedro Martínez', 'Diseño','611987654', '917654321', 'luciamartinez@email.com', 'Certificado de idioma inglés B2.', 'Agosto','2024-2025','Av. Diagonal, 123','08005','Barcelona');
INSERT INTO `GF_ALUMNOSFCT` (`idalumno`, `nombre`, `sexo`, `dni`, `fechanacimiento`, `opcion1`, `opcion2`, `opcion3`, `fecha`, `estadocurriculum`, `estadoadmision`, `emailinstituto`, `nacionalidad`, `carnetconducir`, `disponibilidad`, `numeroSS`, `situacionlaboral`, `nombretutorlegal`, `especialidad`, `telalumno`, `telfamilia`, `email`, `observaciones`, `mesFCT`,`anyocursado`,`domicilio`,`cp`,`localidad`) 
VALUES ('3083', 'Pablo Sánchez Ruiz', 'M', '84095632A', '2004-12-08','Desarrollo de aplicaciones móviles', 'Análisis de datos', 'Inteligencia artificial','2024-05-15','1', '1', 'insti6@correo.es', 'ESP', '1', '1', '287654321098', 'Estudiante', 'María Ruiz', 'Informática','633456789', '910987654', 'pablosr@email.com', 'Experiencia en proyectos de código abierto.', 'Septiembre','2023-2024','C/Paseo de la Castellana, 67','28046','Madrid');
INSERT INTO `GF_ALUMNOSFCT` (`idalumno`, `nombre`, `sexo`, `dni`, `fechanacimiento`, `opcion1`, `opcion2`, `opcion3`, `fecha`, `estadocurriculum`, `estadoadmision`, `emailinstituto`, `nacionalidad`, `carnetconducir`, `disponibilidad`, `numeroSS`, `situacionlaboral`, `nombretutorlegal`, `especialidad`, `telalumno`, `telfamilia`, `email`, `observaciones`, `mesFCT`,`anyocursado`,`domicilio`,`cp`,`localidad`) 
VALUES ('3084', 'Ana García Sánchez', 'F', '73210984X', '2006-07-22','Turismo', 'Hostelería', 'Gestión de eventos','2024-05-20','0', '0', 'insti7@correo.es', 'ESP', '0', '0', '286789012345', 'Desempleado', 'Jorge García', 'Turismo','644789012', '915678901', 'anags@email.com', 'Certificado de manipulación de alimentos.', 'Octubre','2024-2025','C/Alcalá, 45','28014','Madrid');
INSERT INTO `GF_ALUMNOSFCT` (`idalumno`, `nombre`, `sexo`, `dni`, `fechanacimiento`, `opcion1`, `opcion2`, `opcion3`, `fecha`, `estadocurriculum`, `estadoadmision`, `emailinstituto`, `nacionalidad`, `carnetconducir`, `disponibilidad`, `numeroSS`, `situacionlaboral`, `nombretutorlegal`, `especialidad`, `telalumno`, `telfamilia`, `email`, `observaciones`, `mesFCT`,`anyocursado`,`domicilio`,`cp`,`localidad`) 
VALUES ('3085', 'Diego Fernández Martínez', 'M', '84102345Y', '2004-11-30','Ingeniería Civil', 'Diseño de estructuras', 'Gestión de proyectos','2024-05-25','1', '1', 'insti8@correo.es', 'ESP', '1', '1', '282345678901', 'Estudiante', 'María Martínez', 'Ingeniería Civil','600123456', '918765432', 'diegofm@email.com', 'Voluntariado en organizaciones de ingeniería.', 'Noviembre','2023-2024','Plaza España, 10','28008','Madrid');

-- ge_domicilios

INSERT INTO `GE_DOMICILIOS` (`iddomicilio`, `idempresa`, `domicilio`, `cp`, `provincia`, `localidad`, `telefono`, `email`, `especialidad`, `correodualempresa`) 
VALUES ('2662', '3969','Av. Valencia, 9', '50900', 'Zaragoza', 'Zaragoza', '976132421', 'empresa@empresa.es', 'IFC201 / IFC302', 'empresadual@empresa.es');
INSERT INTO `GE_DOMICILIOS` (`iddomicilio`, `idempresa`, `domicilio`, `cp`, `provincia`, `localidad`, `telefono`, `email`, `especialidad`, `correodualempresa`) 
VALUES ('2663', '3970', 'Av.Zaragoza,2', '50900', 'Zaragoza', 'Zaragoza', '976345213', 'empresa2@empresa.es', 'ELE203 / ELE303 / ELE202 / ELE304 / ELE302', 'empresadual2@empresa.es');
INSERT INTO `GE_DOMICILIOS` (`iddomicilio`, `idempresa`, `domicilio`, `cp`, `provincia`, `localidad`, `telefono`, `email`, `especialidad`, `correodualempresa`) 
VALUES ('2664', '3971', 'Av.Huesca,15', '50700', 'Zaragoza', 'Cuarte', '976342165', 'empresa3@empresa.es', 'TMV301 / TMV202', 'empresadua3l@empresa.es');

-- ge_contactos

INSERT INTO `GE_CONTACTOS` (`idcontacto`, `iddomicilio`, `dni`, `nombre`, `email`, `telefono`, `cargo`, `esTutor`, `esRespLegal`, `especialidad`, `observaciones`) 
VALUES ('7924', '2662', '73440502A', 'David Broncano Perez', 'trabajador@correo.es', '666666111', 'TUTOR EMPRESA / REPRESENTANTE  LEGAL', '1', '1', 'TMV301 / MTV 202', '--');
INSERT INTO `GE_CONTACTOS` (`idcontacto`, `iddomicilio`, `dni`, `nombre`, `email`, `telefono`, `cargo`, `esTutor`, `esRespLegal`, `especialidad`, `observaciones`)
VALUES ('7925', '2663', '73440502B', 'David DeMiguel Orrios', 'trabajador2@correo.es', '666666222', 'TUTOR EMPRESA', '1', '0', 'ELE202 / ELE203 / ELE302 / ELE 303 / ELE304', '--');
INSERT INTO `GE_CONTACTOS` (`idcontacto`, `iddomicilio`, `dni`, `nombre`, `email`, `telefono`, `cargo`, `esTutor`, `esRespLegal`, `especialidad`, `observaciones`) 
VALUES ('7926', '2663', '73440502C', 'Ana Pastor Bodega', 'trabajador3@correo.es', '666666333', 'REPRESENTANTE LEGAL', '0', '1', '--', '--');
INSERT INTO `GE_CONTACTOS` (`idcontacto`, `iddomicilio`, `dni`, `nombre`, `email`, `telefono`, `cargo`, `esTutor`, `esRespLegal`, `especialidad`, `observaciones`) 
VALUES ('7927', '2664', '73440502D', 'Ana Vazquez Figueroa', 'trabajador4@correo.es', '666666444', 'TUTOR EMPRESA', '1', '0', 'IFC201 / IFC 302', '--');
INSERT INTO `GE_CONTACTOS` (`idcontacto`, `iddomicilio`, `dni`, `nombre`, `email`, `telefono`, `cargo`, `esTutor`, `esRespLegal`, `especialidad`, `observaciones`) 
VALUES ('7928', '2664', '73440502E', 'Paco Martinez Soria', 'trabajador5@corre.es', '666666555', 'REPRESENTANTE LEGAL', '0', '1', '--', '--');

-- especialidades

INSERT INTO `ESPECIALIDADES` (`idespecialidad`, `nombre`, `codigoespecialidad`) 
VALUES ('1', 'FCT - ELECTROMECÁNICA DE VEHÍCULOS AUTOMÓVILES', 'TMV202');
INSERT INTO `ESPECIALIDADES` (`idespecialidad`, `nombre`, `codigoespecialidad`)
VALUES ('2', 'FCT - AUTOMOCIÓN', 'TMV301');
INSERT INTO `ESPECIALIDADES` (`idespecialidad`, `nombre`, `codigoespecialidad`) 
VALUES ('3', 'FCT - AUTOMOCIÓN DUAL', 'TMV301');
INSERT INTO `ESPECIALIDADES` (`idespecialidad`, `nombre`, `codigoespecialidad`) 
VALUES ('4', 'FCT - INSTALACIONES ELÉCTRICAS Y AUTOMÁTICAS', 'ELE202');
INSERT INTO `ESPECIALIDADES` (`idespecialidad`, `nombre`, `codigoespecialidad`) 
VALUES ('5', 'FCT - INSTALACIONES DE TELECOMUNICACIONES', 'ELE203');
INSERT INTO `ESPECIALIDADES` (`idespecialidad`, `nombre`, `codigoespecialidad`)
VALUES ('6', 'FCT - SISTEMAS ELECTROTÉCNICOS Y AUTOMATIZADOS', 'ELE302');
INSERT INTO `ESPECIALIDADES` (`idespecialidad`, `nombre`, `codigoespecialidad`)
VALUES ('7', 'FCT - AUTOMATIZACIÓN Y ROBÓTICA INDUSTRIAL', 'ELE303');
INSERT INTO `ESPECIALIDADES` (`idespecialidad`, `nombre`, `codigoespecialidad`)
VALUES ('8', 'FCT - SISTEMAS DE TELECOMUNICACIONES E INFORMÁTICA', 'ELE304');
INSERT INTO `ESPECIALIDADES` (`idespecialidad`, `nombre`, `codigoespecialidad`)
VALUES ('9', 'FCT - SISTEMAS MICROINFORMÁTICOS Y REDES', 'IFC201');
INSERT INTO `ESPECIALIDADES` (`idespecialidad`, `nombre`, `codigoespecialidad`)
VALUES ('10', 'FCT - DESARROLLO DE APLICACIONES MULTIPLATAFORMA', 'IFC302');
INSERT INTO `ESPECIALIDADES` (`idespecialidad`, `nombre`, `codigoespecialidad`)
VALUES ('11', 'FCT - FP BÁSICA ELECTRICIDAD Y ELECTRÓNICA', 'FPB102');
INSERT INTO `ESPECIALIDADES` (`idespecialidad`, `nombre`, `codigoespecialidad`)
VALUES ('12', 'FCT - FP BÁSICA INFORMÁTICA Y COMUNICACIONES', 'FPB104');
INSERT INTO `ESPECIALIDADES` (`idespecialidad`, `nombre`, `codigoespecialidad`)
VALUES ('13', 'FCT - MECANIZADO', 'FME202');
INSERT INTO `ESPECIALIDADES` (`idespecialidad`, `nombre`, `codigoespecialidad`) 
VALUES ('14', 'FCT - PROGRAMACIÓN DE LA PRODUCCIÓN EN FABRICACIÓN MECÁNICA', 'FME304');

-- idiomas

INSERT INTO `IDIOMAS` (`ididioma`, `idioma`) 
VALUES ('1', 'Ingles');
INSERT INTO `IDIOMAS` (`ididioma`, `idioma`) 
VALUES ('2', 'Frances');
INSERT INTO `IDIOMAS` (`ididioma`, `idioma`) 
VALUES ('3', 'Aleman');

-- calendarios

INSERT INTO `CALENDARIOS` (`idcalendario`, `fechainicio`, `fechafin`, `festivos`, `horaslunesjueves`, `horasviernes`, `L`, `M`, `X`, `J`, `V`, `jornadacompleta`, `horasanualesconvenio`, `vacaciones`, `totalhoras`) 
VALUES ('1', '2025-09-15', '2026-06-15', '12', '--', '--', '7:00 - 15:00', '7:00 - 15:00', '7:00 - 15:00', '7:00 - 15:00', '7:00 - 15:00', '--', '1200', '22', '1300');
INSERT INTO `CALENDARIOS` (`idcalendario`, `fechainicio`, `fechafin`, `festivos`, `horaslunesjueves`, `horasviernes`, `L`, `M`, `X`, `J`, `V`, `jornadacompleta`, `horasanualesconvenio`, `vacaciones`, `totalhoras`) 
VALUES ('2', '2025-09-15', '2026-06-15', '12', '--', '--', '9:00 - 13:00 / 15:00 - 19:00', '9:00 - 13:00 / 15:00 - 19:00', '9:00 - 13:00 / 15:00 - 19:00', '9:00 - 13:00 / 15:00 - 19:00', '9:00 - 13:00 / 15:00 - 19:00', '--', '1250', '22', '1300');
INSERT INTO `CALENDARIOS` (`idcalendario`, `fechainicio`, `fechafin`, `festivos`, `horaslunesjueves`, `horasviernes`, `L`, `M`, `X`, `J`, `V`, `jornadacompleta`, `horasanualesconvenio`, `vacaciones`, `totalhoras`) 
VALUES ('3', '2025-09-15', '2026-06-15', '12', '--', '--', '16:00 - 00:00', '16:00 - 00:00', '16:00 - 00:00', '16:00 - 00:00', '16:00 - 00:00', '--', '1300', '22', '1300');

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

INSERT INTO `DOC_ALUMNOS` (`iddocalumno`, `idalumno`, `docalum`) 
VALUES ('1', '2078', 'Curriculum');
INSERT INTO `DOC_ALUMNOS` (`iddocalumno`, `idalumno`, `docalum`) 
VALUES ('2', '2078', 'Solicitud');
INSERT INTO `DOC_ALUMNOS` (`iddocalumno`, `idalumno`, `docalum`) 
VALUES ('3', '2079', 'Curriculum');
INSERT INTO `DOC_ALUMNOS` (`iddocalumno`, `idalumno`, `docalum`) 
VALUES ('4', '2079', 'Solicitud');
INSERT INTO `DOC_ALUMNOS` (`iddocalumno`, `idalumno`, `docalum`) 
VALUES ('5', '2080', 'Curriculum');
INSERT INTO `DOC_ALUMNOS` (`iddocalumno`, `idalumno`, `docalum`) 
VALUES ('6', '2080', 'Solicitud');

-- doc_empresas

INSERT INTO `DOC_EMPRESAS` (`iddocempresa`, `idempresa`, `docemp`) 
VALUES ('1', '3969', 'Convenio');
INSERT INTO `DOC_EMPRESAS` (`iddocempresa`, `idempresa`, `docemp`) 
VALUES ('2', '3969', 'Compromiso');
INSERT INTO `DOC_EMPRESAS` (`iddocempresa`, `idempresa`, `docemp`) 
VALUES ('3', '3970', 'Convenio');
INSERT INTO `DOC_EMPRESAS` (`iddocempresa`, `idempresa`, `docemp`)
VALUES ('4', '3970', 'Compromiso');
INSERT INTO `DOC_EMPRESAS` (`iddocempresa`, `idempresa`, `docemp`) 
VALUES ('5', '3971', 'Convenio');
INSERT INTO `DOC_EMPRESAS` (`iddocempresa`, `idempresa`, `docemp`) 
VALUES ('6', '3971', 'Compromiso');

-- tipos_alumnos

INSERT INTO `TIPOS_ALUMNOS` (`idtipoalumno`, `idempresa`, `fecha`, `especialidad`,`turno`, `tiporelacionlaboral`, `alumnosformacion`, `alumnosbeca`) 
VALUES ('1', '3969', '2025-09-02', '9', 'M', 'Ambas', '2', '2');
INSERT INTO `TIPOS_ALUMNOS` (`idtipoalumno`, `idempresa`, `fecha`, `especialidad`,`turno`, `tiporelacionlaboral`, `alumnosformacion`, `alumnosbeca`) 
VALUES ('2', '3969', '2025-09-02', '10','M', 'Ambas', '1', '4');
INSERT INTO `TIPOS_ALUMNOS` (`idtipoalumno`, `idempresa`, `fecha`, `especialidad`,`turno`, `tiporelacionlaboral`, `alumnosformacion`) 
VALUES ('3', '3970', '2025-09-02', '5', 'M', 'Formacion', '3');
INSERT INTO `TIPOS_ALUMNOS` (`idtipoalumno`, `idempresa`, `fecha`, `especialidad`,`turno`, `tiporelacionlaboral`, `alumnosbeca`) 
VALUES ('4', '3971', '2025-09-02', '3','V', 'Beca', '5');

-- valoraciones

INSERT INTO `VALORACIONES` (`idvaloracion`, `idalumno`, `notamedia`, `notaidioma`, `notamadurez`, `notacompetencia`, `numfaltas`, `notafaltas`, `notaglobal`, `observaciones`) 
VALUES ('1', '2078', '7', '5', '10', '10', '15', '--', '7,8', '--');
INSERT INTO `VALORACIONES` (`idvaloracion`, `idalumno`, `notamedia`, `notaidioma`, `notamadurez`, `notacompetencia`, `numfaltas`, `notafaltas`, `notaglobal`, `observaciones`) 
VALUES ('2', '2079', '8', '5', '8', '8', '60', '--', '8,5', '--');
INSERT INTO `VALORACIONES` (`idvaloracion`, `idalumno`, `notamedia`, `notaidioma`, `notamadurez`, `notacompetencia`, `numfaltas`, `notafaltas`, `notaglobal`, `observaciones`) 
VALUES ('3', '2080', '6', '5', '7', '7', '100', '--', '6,3', '--');

-- candidatos ! Ojo, mirar a ver el nombre de empresa y el idempresa

INSERT INTO `CANDIDATOS` (`idcandidato`, `idalumno`, `idempresa`, `estadodualalumno`, `primeraempresa`, `estadoempresa1`, `segundaempresa`, `estadoempresa2`, `terceraempresa`, `estadoempresa3`, `empresacontratada`, `emaildualalumno`, `opinionempresa`, `observaciones`, `turno`, `anexorecibido`, `anexorellenado`, `estadocalendario`, `anexo`, `tiporelacion`, `cno`) 
VALUES ('1', '2078', '3971', '2', '3972', '5', '3973', '6', '3974', '5', 'INTEL', 'alumdual@correo.es', '--', '--', 'M', '1', '1', '1', '1', 'Beca', '11111111');
INSERT INTO `CANDIDATOS` (`idcandidato`, `idalumno`, `idempresa`, `estadodualalumno`, `primeraempresa`, `estadoempresa1`, `segundaempresa`, `estadoempresa2`, `terceraempresa`, `estadoempresa3`, `empresacontratada`, `emaildualalumno`, `opinionempresa`, `observaciones`, `turno`, `anexorecibido`, `anexorellenado`, `estadocalendario`, `anexo`, `tiporelacion`, `cno`) 
VALUES ('2', '2079', '3970', '2', '3975', '5', '3976', '9', '3977', '7', 'IBM', 'alumdual2@correo.es', '--', '--', 'M', '1', '1', '1', '1', 'Formativa', '22222222');
INSERT INTO `CANDIDATOS` (`idcandidato`, `idalumno`, `idempresa`, `estadodualalumno`, `primeraempresa`, `estadoempresa1`, `segundaempresa`, `estadoempresa2`, `terceraempresa`, `estadoempresa3`, `empresacontratada`, `emaildualalumno`, `opinionempresa`, `observaciones`, `turno`, `anexorecibido`, `anexorellenado`, `estadocalendario`, `anexo`, `tiporelacion`, `cno`) 
VALUES ('3', '2080', '3969', '2', '3973', '5', '3975', '6', '3977', '5', 'TESLA', 'alumdual3@correo.es', '--', '--', 'V', '1', '1', '1', '1', 'Beca', '33333333');

-- tutores_candidatos

INSERT INTO `TUTORES_CANDIDATOS` (`idcandidato`, `idcontacto`, `fechaasignacion`) 
VALUES ('1', '7927', '2025-09-05');
INSERT INTO `TUTORES_CANDIDATOS` (`idcandidato`, `idcontacto`, `fechaasignacion`)
VALUES ('2', '7925', '2025-09-05');
INSERT INTO `TUTORES_CANDIDATOS` (`idcandidato`, `idcontacto`, `fechaasignacion`) 
VALUES ('3', '7924', '2025-09-05');

-- candidatos_calendarios

INSERT INTO `CANDIDATOS_CALENDARIOS` (`idcalendario`, `idcandidato`, `fecharegistro`) 
VALUES ('1', '1', '2025-09-07');
INSERT INTO `CANDIDATOS_CALENDARIOS` (`idcalendario`, `idcandidato`, `fecharegistro`) 
VALUES ('2', '2', '2025-09-07');
INSERT INTO `CANDIDATOS_CALENDARIOS` (`idcalendario`, `idcandidato`, `fecharegistro`) 
VALUES ('3', '3', '2025-09-07');

-- lugares_practicas

INSERT INTO `LUGARES_PRACTICAS` (`iddomicilio`, `idcandidato`, `fechapracticas`) 
VALUES ('2664', '1', '2025-09-10');
INSERT INTO `LUGARES_PRACTICAS` (`iddomicilio`, `idcandidato`, `fechapracticas`) 
VALUES ('2663', '2', '2025-09-10');
INSERT INTO `LUGARES_PRACTICAS` (`iddomicilio`, `idcandidato`, `fechapracticas`) 
VALUES ('2662', '3', '2025-09-10');

-- idiomas_alumnos

INSERT INTO `IDIOMAS_ALUMNOS` (`idalumno`, `ididioma`, `titulo`) 
VALUES ('2078', '1', 'B2');
INSERT INTO `IDIOMAS_ALUMNOS` (`idalumno`, `ididioma`, `titulo`) 
VALUES ('2079', '1', 'B2');
INSERT INTO `IDIOMAS_ALUMNOS` (`idalumno`, `ididioma`, `titulo`) 
VALUES ('2080', '1', 'B2');
INSERT INTO `IDIOMAS_ALUMNOS` (`idalumno`, `ididioma`, `titulo`) 
VALUES ('2080', '2', 'A1');

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

-- tutores_candidatos
  ALTER TABLE `tutores_candidatos`
  ADD PRIMARY KEY (`idcandidato`, `idcontacto`);

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
    
-- ------------------------------------------------------------------------------------------  CLAVES FORÁNEAS (FK)

-- idiomas_alumnos

 ALTER TABLE `idiomas_alumnos`
 ADD FOREIGN KEY (idalumno) REFERENCES gf_alumnosfct(idalumno),
 ADD FOREIGN KEY (ididioma) REFERENCES idiomas(ididioma);

-- doc_alumnos

  ALTER TABLE `doc_alumnos`
  ADD FOREIGN KEY (idalumno) REFERENCES gf_alumnosfct(idalumno);

-- candidatos

  ALTER TABLE `candidatos`
  ADD FOREIGN KEY (idalumno) REFERENCES gf_alumnosfct(idalumno),
  ADD FOREIGN KEY (idempresa) REFERENCES ge_empresas(idempresa),
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
  
-- tutores_candidatos

  ALTER TABLE `tutores_candidatos`
  ADD FOREIGN KEY (idcandidato) REFERENCES candidatos(idcandidato),
  ADD FOREIGN KEY (idcontacto) REFERENCES ge_contactos(idcontacto);

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
  -- ------------------------------------------------------------------------------------------------------- FUNCIONES
  -- Crear una funcion que calcule la nota global por el idvaloracion
	DELIMITER //
	CREATE FUNCTION		notaglobal(p_idvaloracion INT) RETURNS DECIMAL (10, 2)
	READS SQL DATA
	BEGIN
		DECLARE notaglobal DECIMAL (10, 2);
		SELECT( ((NOTAMEDIA * 6) / 10) +
				((NOTAIDIOMA * 0.5) / 5) +
				((NOTAMADUREZ * 1) / 10) +
				((NOTACOMPETENCIA * 1) / 10) +
				(15 - (((NUMFALTAS / 1050) * 100) / 1050) * 100) / 10) as 'Nota global' 
		INTO notaglobal
		FROM   valoraciones
		WHERE  idvaloracion = p_idvaloracion;
		RETURN notaglobal;
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
ON 				alumnos_dual.especialidades
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
ON 				alumnos_dual.tutores_candidatos
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

  COMMIT

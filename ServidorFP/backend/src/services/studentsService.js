const { connection } = require("../db/config");

// LISTAR ALUMNOS SEGUN SU NOMBRE CON LIKE
exports.getStudentDataByName = function (request, response) {
    const {nombre} = request.body;
    console.log(nombre);
    connection.query("SELECT * FROM gf_alumnosfct WHERE nombre LIKE ?", 
    ['%' + nombre + '%'],
    (error, results) => {
        if (error)
            throw error;
        response.status(200).json(results);
    });
};

// LISTAR ALUMNOS SEGUN SU IDALUMNO
exports.getStudentDataById = function (request, response) {
    const {idalumno} = request.body;
    console.log(idalumno);
    connection.query("SELECT * FROM gf_alumnosfct WHERE idalumno = ?", 
    [idalumno],
    (error, results) => {
        if (error)
            throw error;
        response.status(200).json(results);
    });
};

// OBTENER TODOS LOS DOCS DE UN ALUMNO POR SU ID
exports.getStudentDocs = function (request, response) {
    const {idalumno} = request.body;
    connection.query(
        "SELECT DISTINCT * " + 
        "FROM doc_alumnos " +
        "WHERE idalumno = ?",
        [idalumno],
        (error, results) => {
            if (error) {
                console.error("Error en la consulta SQL:", error);
                response.status(500).json({ error: "Error interno del servidor" });
                return;
            }
            response.status(200).json(results);
        }
    );
};

// OBTENER VALORACION DE UN ALUMNO POR SU ID
exports.getStudentCalification = function (request, response) {
    const {idalumno} = request.body;
    connection.query(
        "SELECT DISTINCT * " + 
        "FROM valoraciones " +
        "WHERE idalumno = ?",
        [idalumno],
        (error, results) => {
            if (error) {
                console.error("Error en la consulta SQL:", error);
                response.status(500).json({ error: "Error interno del servidor" });
                return;
            }
            response.status(200).json(results);
        }
    );
};

// OBTENER IDIOMAS Y TITULOS DE ALUMNO POR IDALUMNO
exports.getStudentIdioms = function (request, response) {
    const { idalumno } = request.body;
    console.log(idalumno);
    connection.query(
        `SELECT DISTINCT id.idalumno, i.ididioma, i.idioma, id.titulo 
        FROM idiomas_alumnos id
        INNER JOIN idiomas i ON i.ididioma = id.ididioma
        WHERE id.idalumno = ?`,
        [idalumno],
        (error, results) => {
            if (error) {
                console.error("Error en la consulta SQL:", error);
                response.status(500).json({ error: "Error interno del servidor" });
                return;
            }
            response.status(200).json(results);
        }
    );
};

// OBTENER PREFERENCIAS POR IDALUMNO
exports.getStudentPreference1 = function (request, response) {
    const { idalumno } = request.body;
    console.log(idalumno);
    connection.query(
        `SELECT p.preferencia
        FROM gf_alumnosfct al
        INNER JOIN preferencias p ON p.idpreferencia = al.preferencia1
        WHERE al.idalumno = ?`,
        [idalumno],
        (error, results) => {
            if (error) {
                console.error("Error en la consulta SQL:", error);
                response.status(500).json({ error: "Error interno del servidor" });
                return;
            }
            response.status(200).json(results);
        }
    );
};

exports.getStudentPreference2 = function (request, response) {
    const { idalumno } = request.body;
    console.log(idalumno);
    connection.query(
        `SELECT p2.preferencia
        FROM gf_alumnosfct al
        INNER JOIN preferencias p2 ON p2.idpreferencia = al.preferencia2
        WHERE al.idalumno = ?`,
        [idalumno],
        (error, results) => {
            if (error) {
                console.error("Error en la consulta SQL:", error);
                response.status(500).json({ error: "Error interno del servidor" });
                return;
            }
            response.status(200).json(results);
        }
    );
};

exports.getStudentPreference3 = function (request, response) {
    const { idalumno } = request.body;
    console.log(idalumno);
    connection.query(
        `SELECT p3.preferencia 
        FROM gf_alumnosfct al
        INNER JOIN preferencias p3 ON p3.idpreferencia = al.preferencia3
        WHERE al.idalumno = ?`,
        [idalumno],
        (error, results) => {
            if (error) {
                console.error("Error en la consulta SQL:", error);
                response.status(500).json({ error: "Error interno del servidor" });
                return;
            }
            response.status(200).json(results);
        }
    );
};



// LISTAR ALUMNOS
exports.getAllStudents = function (request, response) {
    connection.query("SELECT * FROM gf_alumnosfct", 
    (error, results) => {
        if (error)
            throw error;
        response.status(200).json(results);
    });
};
// AÑADIR AÑADIR ALUMNO
exports.addStudent = function (request, response) {
    const { nombre, sexo, dni, fechanacimiento, idpreferencia1, idpreferencia2, idpreferencia3, fecha, estadocurriculum, estadoadmision, emailinstituto,
        nacionalidad, carnetconducir, disponibilidad, numeroSS, situacionlaboral, nombretutorlegal,
        anyocursado,especialidad, telalumno, telfamilia, email, observaciones, mesFCT,domicilio,cp,localidad } = request.body;
        console.log("idpreferencia1: " + request.body.idpreferencia1);
        console.log("idpreferencia2: " + request.body.idpreferencia2);
        console.log("idpreferencia3: " + request.body.idpreferencia3);

    connection.query("INSERT INTO gf_alumnosfct (nombre, sexo, dni, fechanacimiento, preferencia1, preferencia2, preferencia3, fecha, estadocurriculum, " +
                     "estadoadmision, emailinstituto, nacionalidad, carnetconducir, disponibilidad, numeroSS, " +
                     "situacionlaboral, nombretutorlegal,anyocursado, especialidad, telalumno, telfamilia, " +
                     "email, observaciones, mesFCT, domicilio, cp, localidad, idempresa, iddomicilio, idrepresentante, idtutorempresa)"+
                     " VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, 0, 0, 0)",
        [nombre, sexo, dni, fechanacimiento, idpreferencia1, idpreferencia2, idpreferencia3, fecha, estadocurriculum, estadoadmision, emailinstituto,
        nacionalidad, carnetconducir, disponibilidad, numeroSS, situacionlaboral, nombretutorlegal,
        anyocursado, especialidad, telalumno, telfamilia, email, observaciones, mesFCT, domicilio, cp, localidad],
        (error, results) => {
            if (error) throw error;
            response.status(201).json("Item añadido correctamente");
        }
    );
};
// AÑADIR IDIOMAS AL ALUMNO
exports.addStudent_Idiom = function (request, response) {
    const {idalumno, ididioma, titulo} = request.body;
    connection.query(
        "INSERT INTO idiomas_alumnos (idalumno, ididioma, titulo) VALUES (?,?,?)",
        [idalumno, ididioma, titulo],
        (error, results) => {
            if (error) {
                response.status(500).json({ error: "Error interno del servidor" });
            } else {
                response.status(201).json("Item añadido correctamente");
            }
        }
    );
};

// AÑADIR DOCUMENTOS AL ALUMNO
exports.addStudent_Doc = function (request, response) {
    const {idalumno,docalum,url} = request.body;
    console.log(idalumno);
    connection.query("INSERT INTO doc_alumnos(idalumno, docalum, url) " +
                     "VALUES (?,?,?)", 
        [idalumno,docalum,url],
    (error, results) => {
        if(error)
            throw error;
        response.status(200).json(results);
    });
};

// AÑADIR DOCUMENTOS AL ALUMNO
exports.addStudent_Calification = function (request, response) {
    const {idalumno,notamedia,notaidioma,notamadurez,notacompetencia,numfaltas,notafaltas,notaglobal,observaciones2} = request.body;
    const observaciones = observaciones2;
    console.log(idalumno);
    connection.query("INSERT INTO valoraciones (idalumno, notamedia, notaidioma, notamadurez, notacompetencia, numfaltas, notafaltas, notaglobal, observaciones) " +
                     "VALUES (?,?,?,?,?,?,?,?,?)", 
        [idalumno,notamedia,notaidioma,notamadurez,notacompetencia,numfaltas,notafaltas,notaglobal,observaciones],
    (error, results) => {
        if(error)
            throw error;
        response.status(200).json(results);
    });
};

// ------------------------------------------------------------------------------------- UPDATES

/*                  **** HACER UN UPDATE POR CADA TABLA */



// OBTENER TODOS LOS DATOS DE ALUMNO POR SU NOMBRE Y DNI
exports.getStudentDates = function (request, response) {
    const { nombre, dni } = request.body;
    connection.query(
        "SELECT DISTINCT * " + 
        "FROM gf_alumnosfct " +
        "WHERE nombre = ?  AND dni = ?",
        [nombre, dni],
        (error, results) => {
            if (error) {
                console.error("Error en la consulta SQL:", error);
                response.status(500).json({ error: "Error interno del servidor" });
                return;
            }
            response.status(200).json(results);
        }
    );
};

// MODIFICAR DATOS ALUMNO

// ENCONTRAR EL ID DE LAS PREFERENCIAS DEL ALUMNO DADO SU CONTENIDO
exports.studentPreferences1Request = function (request, response) {
    const {preferencia1} = request.body;
    connection.query(
                    `SELECT		idpreferencia
                     FROM		preferencias
                     WHERE		preferencia LIKE ?`,
                     ['%' + preferencia1 + '%'],
        (error, results) => {
            if (error) {
                response.status(500).json({ error: "Error interno del servidor" });
            } else {
                if (results && results.length > 0) {
                    response.status(200).json(results);
                } else {
                    // Si no se encontraron resultados
                    response.status(404).json({ message: "No se encontraron resultados para la preferencia proporcionada" });
                }
            }
        }
    );
};

// ENCONTRAR EL ID DE LAS PREFERENCIAS DEL ALUMNO DADO SU CONTENIDO
exports.studentPreferences2Request = function (request, response) {
    const {preferencia2} = request.body;
    connection.query(
                   `SELECT		idpreferencia
                    FROM		preferencias
                    WHERE		preferencia LIKE ?`,
                    ['%' + preferencia2 + '%'],
        (error, results) => {
            if (error) {
                response.status(500).json({ error: "Error interno del servidor" });
            } else {
                if (results && results.length > 0) {
                    response.status(200).json(results);
                } else {
                    // Si no se encontraron resultados
                    response.status(404).json({ message: "No se encontraron resultados para la preferencia proporcionada" });
                }
            }
        }
    );
};

// ENCONTRAR EL ID DE LAS PREFERENCIAS DEL ALUMNO DADO SU CONTENIDO
exports.studentPreferences3Request = function (request, response) {
    const {preferencia3} = request.body;
    connection.query(
                       `SELECT		idpreferencia
                        FROM		preferencias
                        WHERE		preferencia LIKE ?`,
                        ['%' + preferencia3 + '%'],
        (error, results) => {
            if (error) {
                response.status(500).json({ error: "Error interno del servidor" });
            } else {
                // Verificar si se obtuvieron resultados
                if (results && results.length > 0) {
                    response.status(200).json(results);
                } else {
                    // Si no se encontraron resultados
                    response.status(404).json({ message: "No se encontraron resultados para la preferencia proporcionada" });
                }
            }
        }
    );
};

exports.updateStudent = function (request, response) {
    const {nombre, sexo, dni, fechanacimiento, preferencia1, preferencia2, preferencia3, fecha, estadocurriculum, estadoadmision, emailinstituto,
        nacionalidad, carnetconducir, disponibilidad, numeroSS, situacionlaboral, nombretutorlegal,
        especialidad, telalumno, telfamilia, email, observaciones, mesFCT,domicilio,cp,localidad, idalumno} = request.body;
        const fechaOK = fecha.substring(0,10)
        const fechanacimientoOK = fechanacimiento.substring(0,10)

    connection.query("UPDATE gf_alumnosfct" +
                    " SET nombre = ?, sexo = ?, dni = ?, fechanacimiento = ?, preferencia1 = ?, preferencia2 = ?, preferencia3 = ?, fecha = ?, estadocurriculum = ?, estadoadmision = ?, emailinstituto = ?," +
                    " nacionalidad = ?, carnetconducir = ?, disponibilidad = ?, numeroSS = ?, situacionlaboral = ?, nombretutorlegal = ?," +
                    " especialidad = ?, telalumno = ?, telfamilia = ?, email = ?, observaciones = ?, mesFCT = ?, domicilio = ?, cp = ?, localidad = ?" +
                    " WHERE idalumno = ?",
                    
        [nombre, sexo, dni, fechanacimientoOK, preferencia1, preferencia2, preferencia3, fechaOK, estadocurriculum, estadoadmision, emailinstituto,
        nacionalidad, carnetconducir, disponibilidad, numeroSS, situacionlaboral, nombretutorlegal,
        especialidad, telalumno, telfamilia, email, observaciones, mesFCT, domicilio, cp, localidad, idalumno],
        (error, results) => {
            if (error) throw error;
            response.status(201).json("Item añadido correctamente");
        }
    );
};
// AÑADIR IDIOMAS AL ALUMNO
exports.updateStudent_Idiom = function (request, response) {
    const {idalumno, ididioma, titulo} = request.body;
    console.log('idalumnoIdioma:', idalumno);
    console.log('ididioma:', ididioma);
    console.log('titulo:', titulo);
    connection.query("UPDATE idiomas_alumnos" +
                    " SET idalumno = ?, ididioma = ?, titulo = ? " +
                    " WHERE idalumno = ?",
        [idalumno, ididioma, titulo, idalumno],
        (error, results) => {
            if (error) {
                response.status(500).json({ error: "Error interno del servidor" });
            } else {
                response.status(201).json("Item añadido correctamente");
            }
        }
    );
};

// AÑADIR DOCUMENTOS AL ALUMNO
exports.updateStudent_Doc = function (request, response) {
    const {idalumno,docalum,url} = request.body;
    console.log("IDALUMNO doc: " + idalumno);
    console.log("DOCUMENTO: " + docalum);
    console.log("URL: " + url);
    connection.query("UPDATE doc_alumnos" +
                    " SET idalumno = ?, docalum = ?, url= ? " +
                    " WHERE idalumno = ?",
        [idalumno,docalum,url,idalumno],
    (error, results) => {
        if(error)
            throw error;
        response.status(200).json(results);
    });
};


//Nota: Cuando cambies la notaglobal para que contenga algo, lo descongelas.
// AÑADIR CALIFICACION AL ALUMNO
exports.updateStudent_Calification = function (request, response) {
    const {idalumno,notamedia,notaidioma,notamadurez,notacompetencia,numfaltas,notafaltas,notaglobal,observaciones2} = request.body;
    const observaciones = observaciones2;
    connection.query( "UPDATE valoraciones" +
                    " SET notamedia = ?, notaidioma = ?, notamadurez = ?, notacompetencia = ?, numfaltas = ?, notafaltas = ?, observaciones = ?" +
                    " WHERE idalumno = ?",
        [notamedia,notaidioma,notamadurez,notacompetencia,numfaltas,notafaltas,observaciones,idalumno],
    (error, results) => {
        if(error)
            throw error;
        response.status(200).json(results);
    });
};

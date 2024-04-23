const { connection } = require("../db/config");

// LISTAR ALUMNOS
exports.getAllStudents = function (request, response) {
    connection.query("SELECT * FROM gf_alumnosfct", 
    (error, results) => {
        if(error)
            throw error;
        response.status(200).json(results);
    });
};
// AÑADIR AÑADIR ALUMNO
exports.addStudent = function (request, response) {
    const { nombre, sexo, dni, fechanacimiento, estadocurriculum, estadoadmision, emailinstituto,
        nacionalidad, carnetconducir, disponibilidad, numeroSS, situacionlaboral, nombretutorlegal,
        dnitutorlegal, especialidad, telalumno, telfamilia, email, observaciones, mesFCT } = request.body;

    connection.query("INSERT INTO gf_alumnosfct (nombre, sexo, dni, fechanacimiento, estadocurriculum, " +
                     "estadoadmision, emailinstituto, nacionalidad, carnetconducir, disponibilidad, numeroSS, " +
                     "situacionlaboral, nombretutorlegal, dnitutorlegal, especialidad, telalumno, telfamilia, " +
                     "email, observaciones, mesFCT,domicilio, cp, localidad, idempresa, iddomicilio, idrepresentante, idtutorempresa)"+
                     " VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,0,0,0,0,0,0,0)",
        [nombre, sexo, dni, fechanacimiento, estadocurriculum, estadoadmision, emailinstituto,
        nacionalidad, carnetconducir, disponibilidad, numeroSS, situacionlaboral, nombretutorlegal,
        dnitutorlegal, especialidad, telalumno, telfamilia, email, observaciones, mesFCT],
        (error, results) => {
            if (error) throw error;
            response.status(201).json("Item añadido correctamente");
        }
    );
};
// AÑADIR IDIOMAS AL ALUMNO
exports.addStudent_Idiom = function (request, response) {
    const {idalumno, ididioma, titulo} = request.body;
    console.log('idAlumno en BACKEND: ' + idalumno);
    console.log('idIdioma en BACKEND: ' + ididioma)
    console.log('titulo en BACKEND: ' + titulo);
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

// AÑADIR PREFERENCIAS AL ALUMNO
exports.addStudent_Preferences = function (request, response) {
    const {idalumno,opcion1,opcion2,opcion3,fecha} = request.body;
    connection.query("INSERT INTO preferencias_alumnos(idalumno, opcion1, opcion2, opcion3, fecha) " +
                     "VALUES (?,?,?,?,?)", 
        [idalumno,opcion1,opcion2,opcion3,fecha],
    (error, results) => {
        if(error)
            throw error;
        response.status(200).json(results);
    });
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
exports.addStudent_Adress = function (request, response) {
    const {idalumno,domicilio,cp,provincia,localidad,telefono} = request.body;
    console.log(idalumno);
    connection.query("INSERT INTO ge_domicilios (idempresa,idalumno,domicilio,cp,provincia,localidad,telefono,email,especialidad,correodualempresa) " +
                     "VALUES (-1,?,?,?,?,?,?,0,0,0)", 
        [idalumno,domicilio,cp,provincia,localidad,telefono],
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


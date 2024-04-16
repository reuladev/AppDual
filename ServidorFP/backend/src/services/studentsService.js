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

exports.addStudent_Idiom = function (request, response) {
    const { idalumno, ididioma, titulo } = request.body;

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
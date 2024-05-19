const { connection } = require("../db/config");


// OBTENER EL IDALUMNO SEGUN UN NOMBRE
exports.getNameById = function (request, response) {
    const {nombre} = request.body;
    console.log(nombre);
    connection.query(
        `SELECT		a.idalumno
         FROM		gf_alumnosfct a, candidatos c
         WHERE		a.nombre = ? AND c.idalumno = c.idalumno
         LIMIT      1`,
         [nombre],
        (error, results) => {
            if (error)
                throw error;
            response.status(200).json(results);
        }
    );
};

// LISTAR CANDIDATOS SEGUN SU NOMBRE CON LIKE
exports.getCandidateDataByName = function (request, response) {
    const { nombre } = request.body;
    console.log(nombre);
    connection.query(
        "SELECT  a.nombre,  c.* " +
        "FROM  candidatos c " +
        "INNER JOIN  gf_alumnosfct a ON a.idalumno = c.idalumno " +
        "WHERE a.nombre LIKE ?" +
        "LIMIT 1", 
        ['%' + nombre + '%'],
        (error, results) => {
            if (error)
                throw error;
            response.status(200).json(results);
        }
    );
};

// OBTENER DATOS DE CANDIDATO POR IDCANDIDATO
exports.getCandidateDataById = function (request, response) {
    const {idcandidato} = request.body;
    console.log(idcandidato);
    connection.query(
        "SELECT * " +
        "FROM candidatos " +
        "WHERE  idcandidato = ?",
        [idcandidato],
        (error, results) => {
            if (error)
                throw error;
            response.status(200).json(results);
        }
    );
};

// OBTENER DATOS DE OTRAS TABLAS USANDO IDCANDIDATO
exports.getCandidateDataByIdPlusAtributtes = function (request, response) {
    const {idcandidato} = request.body;
    console.log("idcandidato: " + idcandidato);
    connection.query(
        "SELECT a.nombre, e.tipo AS estado_alumno, emp.empresa AS empresa1, e2.tipo AS estado_empresa1, emp2.empresa AS empresa2, e3.tipo AS estado_empresa2, emp3.empresa AS empresa3, e4.tipo AS estado_empresa3, emp4.empresa AS empresa_contratada" +
        " FROM candidatos c " +
        " INNER JOIN gf_alumnosfct a ON a.idalumno = c.idalumno " +
        " INNER JOIN estados e ON e.idestado = c.estadodualalumno " +
        " INNER JOIN ge_empresas emp ON emp.idempresa = c.primeraempresa " +
        " INNER JOIN ge_empresas emp2 ON emp2.idempresa = c.segundaempresa " +
        " INNER JOIN ge_empresas emp3 ON emp3.idempresa = c.terceraempresa " +
        " INNER JOIN estados e2 ON e2.idestado = c.estadoempresa1 " +
        " INNER JOIN estados e3 ON e3.idestado = c.estadoempresa2 " +
        " INNER JOIN estados e4 ON e4.idestado = c.estadoempresa3 " +
        " INNER JOIN ge_empresas emp4 ON emp4.idempresa = c.empresacontratada " +
        " WHERE c.idcandidato = ?",
        [idcandidato],
        (error, results) => {
            if (error)
                throw error;
            response.status(200).json(results);
        }
    );
};

// OBTENER LOS DATOS DE UN CANDIDATO DADO SU NOMBRE
exports.getCandidatesData = function (request, response) {
    const { nombre } = request.body;

    console.log("nombre:", nombre);

    connection.query(
        "SELECT * " +
        "FROM candidatos c " +
        "INNER JOIN gf_alumnosfct al ON al.idalumno = c.idalumno " +
        "WHERE al.nombre = ?;",
        [nombre],
        (error, results) => {
            if (error) throw error;
            response.status(201).json("Item añadido correctamente");
        }
    );
};


// OBTENER LOS DATOS DE CANDIDATOS QUE TIENEN UNA ID ASIGNADA EN LA TABLA
exports.getCandidatesIdData = function (request, response) {
    const { idalumno, estadodualalumno, primeraempresa, estadoempresa1, segundaempresa, estadoempresa2, terceraempresa,
            estadoempresa3, empresacontratada} = request.body;

            console.log("idalumno:", idalumno);
            console.log("estadodualalumno:", estadodualalumno);
            console.log("primeraempresa:", primeraempresa);
            console.log("estadoempresa1:", estadoempresa1);
            console.log("segundaempresa:", segundaempresa);
            console.log("estadoempresa2:", estadoempresa2);
            console.log("terceraempresa:", terceraempresa);
            console.log("estadoempresa3:", estadoempresa3);
            console.log("empresacontratada:", empresacontratada);

    connection.query(
        "SELECT a.nombre, e.tipo, emp.empresa, e2.tipo, emp2.empresa, e3.tipo, emp3.empresa, e4.tipo, emp4.empresa " +
        "FROM candidatos c " +
        "INNER JOIN gf_alumnosfct a ON a.idalumno = c.idalumno " +
        "INNER JOIN estados e ON e.idestado = c.estadodualalumno " +
        "INNER JOIN ge_empresas emp ON emp.idempresa = c.primeraempresa " +
        "INNER JOIN ge_empresas emp2 ON emp2.idempresa = c.segundaempresa " +
        "INNER JOIN ge_empresas emp3 ON emp3.idempresa = c.terceraempresa " +
        "INNER JOIN estados e2 ON e2.idestado = c.estadoempresa1 " +
        "INNER JOIN estados e3 ON e3.idestado = c.estadoempresa2 " +
        "INNER JOIN estados e4 ON e4.idestado = c.estadoempresa3 " +
        "INNER JOIN ge_empresas emp4 ON emp4.idempresa = c.empresacontratada " +
        "WHERE c.idalumno = ? " +
        "AND c.estadodualalumno = ? " +
        "AND c.primeraempresa = ? " +
        "AND c.estadoempresa1 = ? " +
        "AND c.segundaempresa = ? " +
        "AND c.estadoempresa2 = ? " +
        "AND c.terceraempresa = ? " +
        "AND c.estadoempresa3 = ? " +
        "AND c.empresacontratada = ?;",
        [idalumno, estadodualalumno, primeraempresa, estadoempresa1, segundaempresa, estadoempresa2, terceraempresa,
            estadoempresa3, empresacontratada],
        (error, results) => {
            if (error) throw error;
            response.status(201).json("Item añadido correctamente");
        }
    );
};

//OBTENER LOS IDS DE LA DIFERENTES TABLAS APORTANDO EL CONTENIDO DE ESTAS POR EL USUARIO
exports.getCandidatesIdFromData = function (request, response) {
    const { idalumno, estadodualalumno, primeraempresa, estadoempresa1, segundaempresa, estadoempresa2, terceraempresa,
            estadoempresa3, empresacontratada} = request.body;

            console.log("idalumno:", idalumno);
            console.log("estadodualalumno:", estadodualalumno);
            console.log("primeraempresa:", primeraempresa);
            console.log("estadoempresa1:", estadoempresa1);
            console.log("segundaempresa:", segundaempresa);
            console.log("estadoempresa2:", estadoempresa2);
            console.log("terceraempresa:", terceraempresa);
            console.log("estadoempresa3:", estadoempresa3);
            console.log("empresacontratada:", empresacontratada);

    connection.query(
        `SELECT a.idalumno, e.tipo, emp.empresa, e2.tipo, emp2.empresa, e3.tipo, emp3.empresa, e4.tipo, emp4.empresa
         FROM gf_alumnosfct a, estados e, ge_empresas emp, estados e2, ge_empresas emp2, estados e3, ge_empresas emp3, estados e4, ge_empresas emp4
         WHERE a.nombre = ?
         AND e.tipo = ?
         AND emp.empresa = ?
         AND e2.tipo = ?
         AND emp2.empresa = ?
         AND e3.tipo = ?
         AND emp3.empresa = ?
         AND e4.tipo = ?
         AND emp4.empresa = ?`,
        [idalumno, estadodualalumno, primeraempresa, estadoempresa1, segundaempresa, estadoempresa2, terceraempresa,
            estadoempresa3, empresacontratada],
        (error, results) => {
            if (error) throw error;
            response.status(201).json("Item añadido correctamente");
        }
    );
};

// OBTENER NOMBRE DE UN ALUMNO SEGUN IDCANDIDATO
exports.getStudentName = function (request, response) {
    const {
        idalumno
    } = request.body;

    connection.query(
        "SELECT	a.nombre" + 
        "FROM	gf_alumnosfct a" +
        "INNER JOIN	candidatos c ON a.idalumno = c.idalumno" +
        "WHERE		c.idalumno = ?",
        [idalumno],
        (error, results) => {
            if (error) throw error;
            response.status(201).json("Item añadido correctamente");
        }
    );
};

// LISTAR CANDIDATOS
exports.getAllCandidates = function (request, response) {
    connection.query("SELECT * FROM candidatos", 
    (error, results) => {
        if (error)
            throw error;
        response.status(200).json(results);
    });
};
// INSERTAR CANDIDATO
exports.addCandidate = function (request, response) {
    const {
        idalumno, fechaasignacion, estadodualalumno, estadoempresa1, estadoempresa2, estadoempresa3, 
        primeraempresa, segundaempresa, terceraempresa, empresacontratada, emaildualalumno, opinionempresa,
        observaciones, turno, anexorecibido, anexorellenado, estadocalendario, anexo, tiporelacion, cno
    } = request.body;

    // Verificar si idalumno está vacío, nulo o indefinido
    if (!idalumno || idalumno.trim() === '') {
        return response.status(400).json({ error: "El alumno no existe" });
    }


    connection.query(
        "INSERT INTO candidatos (idalumno, fechaasignacion, estadodualalumno, estadoempresa1, estadoempresa2, " + 
        "estadoempresa3, primeraempresa, segundaempresa, terceraempresa, empresacontratada, emaildualalumno, opinionempresa, " +
        "observaciones, turno, anexorecibido, anexorellenado, estadocalendario, anexo, tiporelacion, cno) " +
        "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [idalumno, fechaasignacion, estadodualalumno, estadoempresa1, estadoempresa2, estadoempresa3,
         primeraempresa, segundaempresa, terceraempresa, empresacontratada, emaildualalumno, opinionempresa, 
         observaciones, turno, anexorecibido, anexorellenado, estadocalendario, anexo, tiporelacion, cno],
        (error, results) => {
             if (error) {
                console.error("Error executing query:", error); // Log error in server console
                return response.status(500).json({ error: "Error añadiendo el candidato" }); // Return server error
            }
            response.status(201).json("Item añadido correctamente");
        }
    );
};
//BORRAR CANDIDATO
exports.deleteCandidate = function (request,response){
    const idioma = request.body.idioma;
    
    // Desactivar verificación de clave externa
    connection.query("SET FOREIGN_KEY_CHECKS = 0;");
    
    // Eliminar preferencias basadas en la preferencia proporcionada
    connection.query("",
                     []);

    // Reactivar verificación de clave externa
    connection.query("SET FOREIGN_KEY_CHECKS = 1;");
    
    // Todo se ejecutó correctamente, enviar respuesta
    response.status(200).json("Item borrado correctamente");
};

// MODIFICAR DATOS CANDIDATO
exports.updateCandidate = function (request, response) {
    const {
        idalumno, fechaasignacion, estadodualalumno, estadoempresa1, estadoempresa2, estadoempresa3, 
        primeraempresa, segundaempresa, terceraempresa, empresacontratada, emaildualalumno, opinionempresa,
        observaciones, turno, anexorecibido, anexorellenado, estadocalendario, anexo, tiporelacion, cno, idcandidato
    } = request.body;
    console.log(idcandidato);
    console.log(idalumno);
    console.log(fechaasignacion);
    console.log(estadodualalumno);
    console.log(estadoempresa1);
    console.log(estadoempresa2);
    console.log(estadoempresa3);
    console.log(primeraempresa);
    console.log(segundaempresa);
    console.log(terceraempresa);
    console.log(empresacontratada);
    console.log(emaildualalumno);
    console.log(opinionempresa);
    console.log(observaciones);
    console.log(turno);
    console.log(anexorecibido);
    console.log(anexorellenado);
    console.log(estadocalendario);
    console.log(anexo);
    console.log(tiporelacion);
    console.log(cno);

    const fechaasignacionOK = fechaasignacion.substring(0,10)

    connection.query(
        `UPDATE candidatos
         SET idalumno = ?, fechaasignacion = ?, estadodualalumno = ?, estadoempresa1 = ?, estadoempresa2 = ?,
         estadoempresa3 = ?, primeraempresa = ?, segundaempresa = ?, terceraempresa = ?, empresacontratada = ?,
         emaildualalumno = ?, opinionempresa = ?, observaciones = ?, turno = ?, anexorecibido = ?, anexorellenado = ?,
         estadocalendario = ?, anexo = ?, tiporelacion = ?, cno = ? 
         WHERE idcandidato = ?`,
        [
            idalumno, fechaasignacionOK, estadodualalumno, estadoempresa1, estadoempresa2, estadoempresa3, 
            primeraempresa, segundaempresa, terceraempresa, empresacontratada, emaildualalumno, opinionempresa,
            observaciones, turno, anexorecibido, anexorellenado, estadocalendario, anexo, tiporelacion, cno, idcandidato
        ],
        (error, results) => {
            if (error) {
                return response.status(500).json({ error: "Error al actualizar el candidato" });
            }
            response.status(201).json("Item actualizado correctamente");
        }
    );
};

//BORRADO DE CANDIDATO
exports.candidateDeletionRequest = function (request, response) {
    const { idcandidato } = request.body;
    
    // Desactivar la verificación de clave externa
    connection.query("SET FOREIGN_KEY_CHECKS = 0;", (error, results) => {
        if (error) {
            throw error;
        }
        
        // Eliminar el candidato
        connection.query("DELETE FROM candidatos WHERE idcandidato = ?;", [idcandidato], (error, results) => {
            if (error) {
                throw error;
            }
            
            // Activar la verificación de clave externa
            connection.query("SET FOREIGN_KEY_CHECKS = 1;", (error, results) => {
                if (error) {
                    throw error;
                }
            });
        });
    });
};
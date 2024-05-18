const { connection } = require("../db/config");

// LISTAR IDIOMAS
exports.getAllIdioms = function (request, response) {
    connection.query("SELECT * FROM idiomas", 
    (error, results) => {
        if(error)
            throw error;
        response.status(200).json(results);
    });
};
// INSERTAR IDIOMAS
exports.addIdioms = function (request, response) {
    const ididioma = request.body.ididioma;
    const idioma = request.body.idioma;
    connection.query("INSERT INTO idiomas(idioma) VALUES (?)",
        [idioma],
        (error, results) => {
            if(error) throw error;
            response.status(201).json("Item añadido correctamente");
        }
    );
};
//BORRAR IDIOMAS
exports.deleteIdioms = function (request,response){
    const idioma = request.body.idioma;
    console.log("Valor de idioma: " + idioma);
    
    // Desactivar verificación de clave externa
    connection.query("SET FOREIGN_KEY_CHECKS = 0;");
    
    // Eliminar preferencias basadas en la preferencia proporcionada
    connection.query("WITH temporal AS (SELECT ididioma FROM idiomas WHERE idioma = ?) " +
                     "DELETE FROM idiomas WHERE ididioma = (SELECT * FROM temporal);",
                     [idioma]);

    // Reactivar verificación de clave externa
    connection.query("SET FOREIGN_KEY_CHECKS = 1;");
    
    // Todo se ejecutó correctamente, enviar respuesta
    response.status(200).json("Item borrado correctamente");
};
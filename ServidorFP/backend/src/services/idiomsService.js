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
    const ididioma = request.body.ididioma;
    connection.query("DELETE FROM idiomas WHERE ididioma = ?",
        [ididioma],
        (error, results) => {
            if(error) throw error;
            response.status(200).json("Item borrado correctamente");
        }
    );
};
//ACTUALIZAR IDIOMAS
exports.updateIdioms = function (request,response){
    const ididioma = request.body.ididioma;
    const idioma = request.body.idioma;
    connection.query("UPDATE idiomas SET idioma = ? WHERE ididioma = ?",
        [idioma,ididioma],
        (error, results) => {
            if(error) throw error;
            response.status(200).json("Item actualizado correctamente");
        }
    );
};
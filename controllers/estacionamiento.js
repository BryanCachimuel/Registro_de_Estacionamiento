const conexion = require('../database/db')

exports.saludo = (req, res) => {
    conexion.query('SELECT * FROM registro',(error,results) => {
        if(error){
            throw error;
        }else{
            res.send(results)
        }
    })
}


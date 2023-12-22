const conexion = require('../database/db')

exports.guardar = (req, res) => {
    const nombre = req.body.nombre;
    const email = req.body.email;
    const telefono = req.body.telefono;
    const encabezado = req.body.encabezado;
    const observaciones = req.body.observaciones;

    conexion.query('INSERT INTO contactanos SET ?', {
                    nombre:nombre,
                    email:email,
                    telefono:telefono,
                    encabezado:encabezado,
                    observaciones:observaciones},
                    (error, results)=>{
                        if(error){
                           console.log(error);
                        }else{
                           res.redirect('/inicio');
                        }
                    })
}
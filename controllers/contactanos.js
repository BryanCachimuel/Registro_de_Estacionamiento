const conexion = require('../database/db')

exports.guardar = (req, res) => {
    try {
      const nombre = req.body.nombre;
      const email = req.body.email;
      const telefono = req.body.telefono;
      const encabezado = req.body.encabezado;
      const observaciones = req.body.observaciones;

      if(!nombre || !email || !telefono || !encabezado || !observaciones){
         res.render('inicio', {
                alert:true,
                alertTitle: "Advertencia",
                alertMessage: "Ingrese un Nombre, Email, Teléfono, Encabezado y Observaciones",
                alertIcon: "info",
                showConfirmButton: true,
                timer: false,
                ruta: 'inicio'
         })
      }else{
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
    } catch (error) {
      console.log(error)
    }
}
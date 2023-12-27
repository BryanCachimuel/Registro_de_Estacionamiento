const moment = require('moment')
const conexion = require('../database/db')

exports.inicio = (req, res) => {
   res.render('inicio',{alert:false})
}

exports.listado = (req, res) => {
   try {
      conexion.query('SELECT * FROM registro',(error,results) => {
         if(error){
             throw error;
         }else{
            res.render('index', {results:results});
         }
     })
   } catch (error) {
      console.log(error);
   }
}


exports.crear = (req, res) => {
   res.render('crear', {alert:false});
}

exports.guardar = (req, res) => {
   try {
      const cedula = req.body.cedula;
      const nombrepropietario = req.body.nombrepropietario;
      const marcacarro = req.body.marcacarro;
      const placacarro = req.body.placacarro;
      const fecha = moment().format("YYYY/MM/DD");
      const horaingreso = req.body.horaingreso;
      const horasalida = req.body.horasalida;
      let totalpagar = (horasalida - horaingreso)*1.75;
      let letrasplaca = placacarro.slice(1,3);
      let numerosregistro = parseInt(Math.random()*99999);
      const codigoregistro = letrasplaca+numerosregistro;

      if(!cedula || !nombrepropietario || !marcacarro || !placacarro || !horaingreso || !horasalida){
         res.render('crear', {
            alert:true,
            alertTitle: "Advertencia",
            alertMessage: "Ingrese los datos correspondientes que se pide en el Formulario",
            alertIcon:'info',
            showConfirmButton: true,
            timer: false,
            ruta: 'crear'
        })
      }else{
         conexion.query('INSERT INTO registro SET ?',{
            codigoregistro:codigoregistro,
            cedula:cedula, 
            nombrepropietario:nombrepropietario, 
            marcacarro:marcacarro, 
            placacarro:placacarro, 
            fecha:fecha,
            horaingreso:horaingreso, 
            horasalida:horasalida, 
            totalpagar:totalpagar}, 
            (error, results)=>{
            if(error){
               console.log(error);
            }else{
               //res.redirect('/');
               res.render('crear', {
                  alert: true,
                  alertTitle: "Registro Exitoso",
                  alertMessage: "¡El Registro para Estacionar fue exitoso!",
                  alertIcon:'success',
                  showConfirmButton: false,
                  timer: 800,
                  ruta: ''
              })
            }
         })
      } 
   } catch (error) {
      console.log(error);
   }
}

exports.editar = (req, res) => {
   try {
      const id = req.params.id;
      conexion.query('SELECT * FROM registro WHERE id=?',[id], (error, results) => {
         if(error){
            throw error;
         }else{
            res.render('editar', {registro:results[0]});
         }
      })
   } catch (error) {
      console.log(error)
   }
}

exports.actualizar = (req, res) => {
   try {
      const id = req.body.id;
      const cedula = req.body.cedula;
      const nombrepropietario = req.body.nombrepropietario;
      const marcacarro = req.body.marcacarro;
      const placacarro = req.body.placacarro;
      const horaingreso = req.body.horaingreso;
      const horasalida = req.body.horasalida;
      let totalpagar = (horasalida - horaingreso)*1.75;

      conexion.query('UPDATE registro SET ? WHERE id = ?', [{
                     cedula:cedula, 
                     nombrepropietario:nombrepropietario, 
                     marcacarro:marcacarro,
                     placacarro:placacarro,
                     horaingreso:horaingreso,
                     horasalida:horasalida,
                     totalpagar:totalpagar
                  }, id], (error, results) => {
                     if(error){
                        throw error;
                     }else{
                     res.redirect('/');
                     }
                  })
   } catch (error) {
      console.log(error)
   }
}

exports.eliminar = (req, res) => {
   try {
      const id = req.params.id;
      conexion.query('DELETE FROM registro WHERE id = ?',[id], (error, results) => {
         if(error){
            throw error;
         }else{
            res.redirect('/');
         }
      })
   } catch (error) {
      console.log(error);
   }
}

exports.creandotarjetas = (req, res) => {
      try {
         conexion.query('SELECT * FROM registro',(error,results) => {
            if(error){
                throw error;
            }else{
               res.render('tarjetas', {results:results});
            }
         })
      } catch (error) {
         console.log(error);
      }
}

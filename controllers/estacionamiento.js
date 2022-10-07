const conexion = require('../database/db')

exports.inicio = (req, res) => {
   res.render('inicio')
}

exports.listado = (req, res) => {
   conexion.query('SELECT * FROM registro',(error,results) => {
      if(error){
          throw error;
      }else{
         res.render('index', {results:results});
      }
  })
}


exports.crear = (req, res) => {
   res.render('crear');
}

exports.guardar = (req, res) => {
   const cedula = req.body.cedula;
   const nombrepropietario = req.body.nombrepropietario;
   const marcacarro = req.body.marcacarro;
   const placacarro = req.body.placacarro;
   const horaingreso = req.body.horaingreso;
   const horasalida = req.body.horasalida;
   let totalpagar = (horasalida - horaingreso)*1.75;
  
   conexion.query('INSERT INTO registro SET ?',{
                  cedula:cedula, 
                  nombrepropietario:nombrepropietario, 
                  marcacarro:marcacarro, 
                  placacarro:placacarro, 
                  horaingreso:horaingreso, 
                  horasalida:horasalida, 
                  totalpagar:totalpagar}, 
                  (error, results)=>{
                  if(error){
                     console.log(error);
                  }else{
                     res.redirect('/');
                  }
               })
}

exports.editar = (req, res) => {
   const id = req.params.id;
   conexion.query('SELECT * FROM registro WHERE id=?',[id], (error, results) => {
      if(error){
         throw error;
      }else{
         res.render('editar', {registro:results[0]});
      }
   })
}

exports.actualizar = (req, res) => {
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
}

exports.eliminar = (req, res) => {
   const id = req.params.id;
   conexion.query('DELETE FROM registro WHERE id = ?',[id], (error, results) => {
      if(error){
         throw error;
      }else{
         res.redirect('/');
      }
   })
}

exports.creandotarjetas = (req, res) => {
   conexion.query('SELECT * FROM registro',(error,results) => {
      if(error){
          throw error;
      }else{
         res.render('tarjetas', {results:results});
      }
  })
}

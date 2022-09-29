const conexion = require('../database/db')

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
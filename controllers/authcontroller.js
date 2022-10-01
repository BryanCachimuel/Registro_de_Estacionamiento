const conexion = require('../database/db')

exports.login = (req, res) => {
    res.render('login');
 }
 
 exports.registro = (req, res) => {
    res.render('registro');
 }
 
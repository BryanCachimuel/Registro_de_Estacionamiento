const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const conexion = require('../database/db');
const { promisify } = require('util');

exports.login = (req, res) => {
    res.render('login');
 }
 
 exports.registros = (req, res) => {
    res.render('registro');
 }

 exports.registro = async(req, res) => {
    try {
        const nombre = req.body.nombre;
        const usuario = req.body.usuario;
        const password = req.body.password;
        const passwordHash = await bcryptjs.hash(password, 8);
        conexion.query('INSERT INTO usuarios SET ?', {nombre:nombre, usuario:usuario, password:passwordHash}, (error, results) => {
                        if(error){
                            console.log(error)
                        }
                          res.redirect('/login')
                       })
    } catch (error) {
        console.log(error)
    }  
}

exports.iniciarSesion = async(req, res) => {
    try {
        const usuario = req.body.usuario;
        const password = req.body.password; 
        
        if(!usuario || !password){
            res.render('login', {
                alert:true,
                alertTitle: "Advertencia",
                alertMessage: "Ingrese un usuario y password",
                alertIcon:'info',
                showConfirmButton: true,
                timer: false,
                ruta: 'login'
            })
        }else{
            conexion.query('SELECT * FROM usuarios WHERE usuario = ?',[usuario], async(error, results) => {
                if(results.length == 0 || !(await bcryptjs.compare(password, results[0].password))){
                    res.render('login', {
                        alert:true,
                        alertTitle: "Advertencia",
                        alertMessage: "Ingrese un usuario y password",
                        alertIcon:'info',
                        showConfirmButton: true,
                        timer: false,
                        ruta: 'login'
                    })
                }else{
                    const id = results[0].id
                    const token = jwt.sign({id:id}, )
                }
            })
        }
    } catch (error) {
        
    }
}
 
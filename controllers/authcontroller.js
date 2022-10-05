const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const conexion = require('../database/db');
const { promisify } = require('util');

exports.login = (req, res) => {
    res.render('login',{alert:false});
 }
 
 exports.registrar = (req, res) => {
    res.render('registro', {alert:false});
 }

 exports.registro = async(req, res) => {
    try {
        const nombre = req.body.nombre;
        const usuario = req.body.usuario;
        const password = req.body.password;
        const passwordHash = await bcryptjs.hash(password, 8);
        
        if(!usuario || !nombre || !password){
            res.render('registro', {
                alert:true,
                alertTitle: "Advertencia",
                alertMessage: "Ingrese un Usuario, Nombre y Password",
                alertIcon: "info",
                showConfirmButton: true,
                timer: false,
                ruta: 'registro'
            })
        }else{
            conexion.query('INSERT INTO usuarios SET ?', {nombre:nombre, usuario:usuario, password:passwordHash}, (error, results) => {
                if(error){
                    console.log(error)
                }
                  res.redirect('/login')
               })
        }

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
                        alert: true,
                        alertTitle: "Error",
                        alertMessage: "Usuario y/o Password incorrectas",
                        alertIcon:'error',
                        showConfirmButton: true,
                        timer: false,
                        ruta: 'login'    
                    })
                }else{
                    const id = results[0].id
                    const token = jwt.sign({id:id}, process.env.JWT_SECRETO, {
                        expiresIn: process.env.JWT_TIEMPO_EXPIRA
                    })
                    // generar el token sin fecha de expiración
                    //const token = jwt.sign({id: id}, process.env.JWT_SECRETO)
                    console.log("TOKEN: "+token+" para el USUARIO : "+usuario);

                    const cookieOpciones = {
                        expires: new Date(Date.now()+process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
                        httpOnly: true
                    }
                    res.cookie('jwt', token, cookieOpciones);
                    res.render('login', {
                        alert: true,
                        alertTitle: "Conexión exitosa",
                        alertMessage: "¡LOGIN CORRECTO!",
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

exports.autenticado = async(req, res, next) => {
    if(req.cookies.jwt){
        try {
            const decodificada = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRETO)
            conexion.query('SELECT * FROM usuarios WHERE id = ?', [decodificada.id],(error, results) => {
                if(!results){return next()}
                req.usuario = results[0]
                return next();
            })
        } catch (error) {
            console.log(error);
            return next();
        }
    }else{
        res.redirect('/inicio');
    }
}

exports.salir = (req, res) => {
    res.clearCookie('jwt');
    return res.redirect('/');
}

// listado de usuarios
exports.listarUsuarios = (req, res) => {
    conexion.query('SELECT * FROM usuarios', (error, results) => {
       if(error){
          throw error;
       }else{
          res.render('listausuarios', {results:results})
       }
    })
 }

 
 exports.eliminarUsuarios = (req, res) => {
    const id = req.params.id;
    conexion.query('DELETE FROM usuarios WHERE id = ?', [id], (error, results) => {
        if(error){
            throw error;
        }else{
            res.redirect('/listausuarios');
        }
    })
 }
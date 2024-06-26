const express = require('express');
const router = express.Router();

const ctrl = require('../controllers/estacionamiento');
const auth = require('../controllers/authcontroller');
const contactar = require('../controllers/contactanos');

router.get('/inicio', ctrl.inicio);
router.post('/contactanos', contactar.guardar);

router.get('/',auth.autenticado, ctrl.listado);
router.get('/crear',auth.autenticado, ctrl.crear);
router.post('/crear',auth.autenticado, ctrl.guardar);
router.get('/editar/:id',auth.autenticado, ctrl.editar);
router.post('/actualizar',auth.autenticado, ctrl.actualizar);
router.get('/eliminar/:id',auth.autenticado, ctrl.eliminar);
router.get('/tarjetas_estacionamiento', auth.autenticado, ctrl.creandotarjetas);

router.get('/login', auth.login);
router.get('/registro', auth.registrar);
router.post('/registro',auth.registro);
router.post('/login', auth.iniciarSesion);
router.get('/salir', auth.salir);

// listar usuarios
router.get('/listausuarios', auth.autenticado, auth.listarUsuarios);
router.get('/editar_usuario/:id', auth.autenticado, auth.editarUsuarios);
router.post('/actualizar_usuario', auth.autenticado, auth.actualizarUsuarios);
router.get('/eliminarusuario/:id', auth.autenticado, auth.eliminarUsuarios);


module.exports = router;
const express = require('express');
const router = express.Router();

const ctrl = require('../controllers/estacionamiento');
const auth = require('../controllers/authcontroller');

router.get('/',auth.autenticado,ctrl.listado);
router.get('/crear',auth.autenticado, ctrl.crear);
router.post('/crear', ctrl.guardar);
router.get('/editar/:id', ctrl.editar);
router.post('/actualizar', ctrl.actualizar);
router.get('/eliminar/:id', ctrl.eliminar);

router.get('/login', auth.login);
router.get('/registro', auth.registros);
router.post('/registro',auth.registro);
router.post('/login', auth.iniciarSesion);
router.get('/salir', auth.salir);

module.exports = router;
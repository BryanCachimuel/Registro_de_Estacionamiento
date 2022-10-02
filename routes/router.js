const express = require('express');
const router = express.Router();

const ctrl = require('../controllers/estacionamiento');
const auth = require('../controllers/authcontroller');

router.get('/',auth.autenticado, ctrl.listado);
router.get('/crear',auth.autenticado, ctrl.crear);
router.post('/crear',auth.autenticado, ctrl.guardar);
router.get('/editar/:id',auth.autenticado, ctrl.editar);
router.post('/actualizar',auth.autenticado, ctrl.actualizar);
router.get('/eliminar/:id',auth.autenticado, ctrl.eliminar);

router.get('/login', auth.login);
router.get('/registro', auth.registros);
router.post('/registro',auth.registro);
router.post('/login', auth.iniciarSesion);
router.get('/salir', auth.salir);

module.exports = router;
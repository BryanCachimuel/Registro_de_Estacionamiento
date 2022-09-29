const express = require('express');
const router = express.Router();

const ctrl = require('../controllers/estacionamiento')

router.get('/',ctrl.listado);
router.get('/crear', ctrl.crear);
router.post('/crear', ctrl.guardar);
router.get('/editar/:id', ctrl.editar);
router.post('/actualizar', ctrl.actualizar);

module.exports = router;
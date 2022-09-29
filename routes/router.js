const express = require('express');
const router = express.Router();

const ctrl = require('../controllers/estacionamiento')

router.get('/',ctrl.listado);
router.get('/crear', ctrl.crear);
router.post('/crear', ctrl.guardar);

module.exports = router;
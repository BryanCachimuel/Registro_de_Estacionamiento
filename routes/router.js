const express = require('express');
const router = express.Router();

const ctrl = require('../controllers/estacionamiento')

router.get('/',ctrl.listado);
router.get('/crear', ctrl.crear);

module.exports = router;
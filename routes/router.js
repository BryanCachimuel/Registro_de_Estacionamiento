const express = require('express');
const router = express.Router();

const ctrl = require('../controllers/estacionamiento')

router.get('/',ctrl.listado);


module.exports = router;
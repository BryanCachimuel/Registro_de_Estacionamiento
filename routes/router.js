const express = require('express');
const router = express.Router();

const ctrl = require('../controllers/estacionamiento')

router.get('/',ctrl.saludo);


module.exports = router;
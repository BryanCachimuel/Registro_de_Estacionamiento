const { json } = require('express');
const express = require('express');
const morgan = require('morgan');
const app = express();

// configuración del motor de vistas
app.set('view engine','ejs');

app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use('/', require('./routes/router'));


const puerto = 3000;
app.listen(puerto, () =>{
    console.log(`Servidor ejecutandose en http://localhost:${puerto}`)
})
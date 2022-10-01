const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

const app = express();

// configuración del motor de vistas
app.set('view engine','ejs');

// configuración de la carpeta public para archivos estáticos
app.use(express.static('public'))

app.use(morgan('dev'));

// para procesar datos enviados desde formularios
app.use(express.urlencoded({extended:true}));
app.use(express.json());

// configuración de variables de entorno
dotenv.config({path:'./env/.env'});

// para poder trabajar con las cookies
app.use(cookieParser());

app.use('/', require('./routes/router'));


const puerto = 3000;
app.listen(puerto, () =>{
    console.log(`Servidor ejecutandose en http://localhost:${puerto}`)
})
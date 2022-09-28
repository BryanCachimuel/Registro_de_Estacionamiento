const express = require('express');
const app = express();

// configuración del motor de vistas
app.set('view engine','ejs')


const puerto = 3000;
app.listen(puerto, () =>{
    console.log(`Servidor ejecutandose en http://localhost:${puerto}`)
})
const mysql = require('mysql');

const conexion = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'admin1994',
    port: '3307',
    database:'registro_estacionamiento'
});

conexion.connect((error) => {
    if(error){
        console.log(`El error de conexión es: ${error}`)
        return
    }
    console.log('Conexión hacia la Base de Datos exitosa');
})
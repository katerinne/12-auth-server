const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./db/config');
require('dotenv').config();

console.log(process.env);

// Crear el servidor/aplicacion de express
const app = express();

//Base de datos
dbConnection();


//Lectura y parseo del body
app.use( express.json() );


//CORS
app.use(cors());

//Rutas
app.use('/api/auth', require('./routes/auth'))



//Directorio publico
app.use(express.static('./public') );


app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerta ${ process.env.PORT }`);
});
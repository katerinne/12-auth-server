const express = require('express');
const cors = require('cors');

// Crear el servidor/aplicacion de express
const app = express();

//Lectura y parseo del body
app.use( express.json() );

//Rutas
app.use('/api/auth', require('./routes/auth'))

//CORS
app.use(cors());


app.listen(4000, () => {
    console.log(`Servidor corriendo en puerta ${ 4000 }`);
});
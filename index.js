const express = require('express');
const cors = require('cors');
require('dotenv').config();

console.log(process.env);

// Crear el servidor/aplicacion de express
const app = express();


//Lectura y parseo del body
app.use( express.json() );

//Rutas
app.use('/api/auth', require('./routes/auth'))


//CORS
app.use(cors());

//Directorio publico
app.use(express.static('./public') );


app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerta ${ process.env.PORT }`);
});
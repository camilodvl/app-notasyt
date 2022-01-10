//codigo del servidor
const express = require('express');
const path = require('path');

//inicializar
const app = express(); //se crea el servidor


//settings
app.set('port', process.env.PORT || 3000); //hace referencia a una variable de entorno llamada port, sino usa el 3000
app.set('views', path.join(__dirname, 'views'));

//middlewares



//Variables Globales



//routes


//static files

module.exports = app;
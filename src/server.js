//codigo del servidor
const express = require('express');
const path = require('path');

//inicializar
const app = express(); //se crea el servidor


//settings
app.set('port', process.env.PORT || 3000); //hace referencia a una variable de entorno llamada port, sino usa el 3000
app.set('views', path.join(__dirname, 'views'));

//middlewares
app.use(express.urlencoded({extended: false}));//se conviernte los datos de un form en json



//Variables Globales



//routes
app.get('/', (req,res)=>{
    res.send(`Hello Word`)
})


//static files
app.use(express.static(path.join(__dirname, 'public')));//se define la carpeta public


module.exports = app;
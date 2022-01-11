//codigo del servidor
const express = require('express');
const path = require('path');
const {engine} = require('express-handlebars')

//inicializar
const app = express(); //se crea el servidor


//settings
app.set('port', process.env.PORT || 3000); //hace referencia a una variable de entorno llamada port, sino usa el 3000
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', engine({ //se configura el handlebars
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),//donde estan los layout, como cabeceras y footers
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs' //se especifica la extensión de los archivos
}));

app.set('view engine', '.hbs');

//middlewares
app.use(express.urlencoded({extended: false}));//se conviernte los datos de un form en json



//Variables Globales



//routes
app.use(require('./routes/index.routes'));
app.use(require('./routes/notes.routes'));

//static files
app.use(express.static(path.join(__dirname, 'public')));//se define la carpeta public


module.exports = app;
//codigo del servidor
const express = require('express');
const path = require('path');
const {engine} = require('express-handlebars')
const methodOverride = require('method-override');//para incluir el meotod put y delete de los forms y router
const flash = require('connect-flash');
const session = require('express-session')
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
app.use(methodOverride('_method'));
app.use(session({
    secret: 'Secretoseguro25448',
    resave: 'true',
    saveUninitialized: 'true'
}));
app.use(flash());

//Variables Globales
app.use((req, res, next) =>{//el next se usa para que continue ejecutando lo que hay debajo
    res.locals.success_msg = req.flash('success_msg');
       
    next();
});


//routes
app.use(require('./routes/index.routes'));
app.use(require('./routes/notes.routes'));
app.use(require('./routes/users.routes'));

//static files
app.use(express.static(path.join(__dirname, 'public')));//se define la carpeta public


module.exports = app;
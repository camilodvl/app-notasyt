const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user'); //se importa porque model puede interactuar con la BD

passport.use(new LocalStrategy({
    // Se reciben los datos
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done)=>{
    // Se validan los datos
    const user = await User.findOne({email});
    if(!user){
        // Se valida el correo del usuario
        // si no existe, acaba la funcion y con la funcion done le pasamos el error, se integra con connect flash
        return done(null, false, {message: 'Not User Found'});
    }else{
        // Se revisa la contraseña
        const match = await user.matchPassword(password); //esta es la clave recibida en el form, y la revisa con el de la bd, devuelve true/false
        if (match){
            return done(null, user); //no hay error y devuelve el usuario
        }else{
            return done(null, false, {message: 'incorret password'});
        }
    }
}));
passport.serializeUser((user, done) =>{
    //Recibe la funcion con el usuario(id)
    done(null, user.id)
});

passport.deserializeUser((id, done)=>{
    //se comprueba cada vez que el usuario esta navegando, a través del id, si tiene los permisos
    User.findById(id, (error, user) =>{
        done(error, user);//si recibe error, termina con el error, sino con el usuario
    });
})

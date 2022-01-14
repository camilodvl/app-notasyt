const helpers = {}



helpers.isAuthenticated = (req, res, next)=>{
    if (req.isAuthenticated()){//el usuario esta autenticado
        return next(); //continua el codigo
    }
    const errors = [];
    req.flash('error', 'Not autorized');
    res.redirect('users/signin')
}

module.exports = helpers;
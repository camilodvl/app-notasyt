const usersController = {};


//Register
usersController.renderSignUpForm = (req, res)=>{
    res.render('users/signup')
};

usersController.signUp = (req, res)=>{
    res.send('signup');
};


//login
usersController.renderSignInForm = (req, res)=>{
    res.render('users/signin')
};

usersController.signIn= (req, res)=>{
    res.send('users/signin')
};


//Logout

usersController.logout = (req, res)=>{
    res.send('logout');
}

module.exports = usersController;
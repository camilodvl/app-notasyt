const usersController = {};
const user = require('../models/user');
const User = require('../models/user');


//Register
usersController.renderSignUpForm = (req, res)=>{
    res.render('users/signup')
};

usersController.signUp = async (req, res)=>{
    const errors = [];
    const {name, email, password, confirm_password} = req.body;
    if(password != confirm_password){
        errors.push({text: "Password do not match"});
    }
    if(password.length <6){
        errors.push({text: 'Passwords must be at least 4 characters'})
    }

    if (errors.length > 0){
        res.render('users/signup', {errors,
            name,
            email
            });
    }else{
        const emailUser = await User.findOne({email: email});
        if (emailUser){
            errors.push({text: 'User already exist'});
            res.render('users/signup', {errors,
            name,
        email})
        }else{
            const newUser = new User({name,email,password});
            newUser.password =  await newUser.encryptPassword(password);
            await newUser.save();
            console.log('creando email user')
            req.flash('success_msg', 'User created succesfully');
            res.redirect('/users/signin');
        }
    }
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
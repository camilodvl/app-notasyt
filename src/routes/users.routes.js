const { Router } = require("express");
const router = Router();
const {renderSignUpForm, renderSignInForm ,signUp, signIn, logout} = require('../controllers/users.controller');

//login
router.get('/users/signup', renderSignUpForm);
router.post('/users/signup', signUp);

//registro
router.get('/users/signin', renderSignInForm);
router.post('/users/signin', signIn);

//logout
router.get('/users/logout', logout);

module.exports= router;
const {Router} = require('express');
const { check } = require('express-validator');

const router = Router();

const{
    renderSignUpForm,
    renderSigninForm,
    logout,
    signin,
    signup
} = require('../controllers/users.controller');

const validar = [
    check('name')
        .exists()
        .isLength({min:6})
        .withMessage('El nombre debe tener al menos 6 caracteres')
    ,
    check('password')
        .exists()
        .isLength({min:6})
        .withMessage('La contraseña debe tener al menos 6 caracteres')
]

router.get('/users/signup', renderSignUpForm);

router.post('/users/signup', validar, signup);

router.get('/users/signin', renderSigninForm);

router.post('/users/signin', signin);

router.get('/users/logout', logout);

module.exports = router;
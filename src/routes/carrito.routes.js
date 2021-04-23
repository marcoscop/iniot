const bodyParser = require('body-parser');
const {Router} = require('express');
const { check } = require('express-validator');

const router = Router();

const parser = bodyParser.urlencoded({extended:false});

const {
    renderNewCarrito,
    addNewCarrito,
    showCarritos,
    renderEditForm,
    updateCarrito,
    renderNetbook
} = require('../controllers/carritos.controller');

//------------------- VALIDACIONES ----------------------//
const validar = [
    check('nombre')
        .exists()
        .matches(/^[A-Za-z\s]+$/)
        .withMessage('Nombre debe contener solo caracteres alfabeticos')
        .isLength({min:3})
        .withMessage('El nombre debe tener minimo 3 caracteres')
    ,
    check('cantidad')
        .exists()
        .trim()
        .isInt()
        .withMessage('Cantidad debe contener solo caracteres numéricos enteros')
];

//-------------------   RUTAS   -----------------------//
router.get('/carritos/new-carrito', renderNewCarrito);

router.post('/carritos/new-carrito', parser, validar, addNewCarrito);

router.get('/carritos',showCarritos);

router.get('/carritos/edit/:id', renderEditForm);

router.put('/carritos/edit/:id', updateCarrito);

router.get('/carritos/listar-nets/:id/:nom',renderNetbook); 

module.exports = router;
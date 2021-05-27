const {Router} = require('express');
const { check } = require('express-validator');

const router = Router();

const {
    renderPrestamoForm,
    createNewPrestamo,
    renderDevolucion,
    saveDevolucion
} = require('../controllers/prestamos.controller');

//------------------- VALIDACIONES ----------------------//
const validar = [
    check('nombre')
        .exists()
        .matches(/^[A-Za-z\s]+$/)
        .withMessage('Nombre debe contener solo caracteres alfabeticos')
        .isLength({min:6})
        .withMessage('El nombre debe tener minimo 6 caracteres')
    ,
    check('numero')
        .exists()
        .trim()
        .isInt()
        .withMessage('Numero de netbook debe contener solo caracteres numéricos enteros')
];

//-------------------   RUTAS   -----------------------//

//-->   Renderizar Nuevo Prestamos
router.get('/prestamos/add', renderPrestamoForm);

//-->   Registra el prestamo en la Base de Datos
router.post('/prestamos/add', validar, createNewPrestamo);

//-->   Cuando se quiere devolver
router.get('/prestamos/devol/:id', renderDevolucion);

router.post('/prestamos/devolvio/:id', saveDevolucion);

module.exports = router;
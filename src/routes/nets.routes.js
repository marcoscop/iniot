const {Router} = require('express');
const { check } = require('express-validator');

const router = Router();

const {
    renderNetsForm,
    createNewNet,
    renderNets,
    renderEditForm,
    renderEstados,
    newEstado,
    updateNet,
    deleteNet
} = require('../controllers/nets.controller');


//------------------- VALIDACIONES ----------------------//
const validar = [
    check('serie')
        .isLength({min:1})
        .withMessage('El numero de serie no puede estar vacio')
    ,
    check('numero')
        .exists()
        .trim()
        .isInt()
        .withMessage('numero debe contener solo caracteres numéricos enteros')
];

//-------------------   RUTAS   -----------------------//

// Nuevas Netbooks
router.get('/netbooks/add/:id/:nom', renderNetsForm);

router.post('/netbooks/add/:id/:nom',validar, createNewNet);

// Obtener todas las netbooks
router.get('/netbooks/:id/:carrito', renderNets);

// Editar Netbooks
router.get('/netbooks/edit/:id/:carrito', renderEditForm);

router.put('/netbooks/edit/:id', updateNet);

//Delete netbooks
router.delete('/netbooks/delete/:id', deleteNet);

module.exports = router;
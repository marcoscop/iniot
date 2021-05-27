const {Router} = require('express');
const { check } = require('express-validator');

const router = Router();

const {
    renderEstado,
    renderNewEstado,
    renderAddEstado,
    saveEstado,
    renderEditEstado,
    updateEstado,
    deleteEstado
} = require('../controllers/estados.controller');

//--------------------------- VALIDACIONES ------------------------//
    const validar = [
        check('fecha')            
            .isDate()
            .withMessage('No ha definido una fecha valida')
    ]
//--------------------------- RUTAS -------------------------------//

// Obtener los detalles de la netbook seleccionada
router.get('/estados', renderEstado);
// ruta para guardar los datos del estado creado
router.post('/estados/add', renderNewEstado);

router.get('/estados/:id', renderAddEstado);

router.post('/estados/:id', validar, saveEstado);

router.get('/estados/update/:id', renderEditEstado);

router.put('/estados/update/:id', updateEstado);

router.delete('/estados/delete/:id', deleteEstado);

module.exports = router;
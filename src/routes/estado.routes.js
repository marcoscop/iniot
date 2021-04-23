const {Router} = require('express');
const { check } = require('express-validator');

const router = Router();

const {
    renderEstado,
    renderNewEstado
} = require('../controllers/estados.controller');

//--------------------------- VALIDACIONES ------------------------//
//--------------------------- RUTAS -------------------------------//

// Obtener los detalles de la netbook seleccionada
router.get('/estados/:id', renderEstado);
// ruta para guardar los datos del estado creado
router.post('/estados/:id', renderNewEstado);

module.exports = router;
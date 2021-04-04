const {Router} = require('express');

const router = Router();

const {
    renderNewCarrito,
    addNewCarrito
} = require('../controllers/carritos.controller');

router.get('/carritos/new-carrito', renderNewCarrito);

router.post('/carritos/new-carrito', addNewCarrito);

module.exports = router;
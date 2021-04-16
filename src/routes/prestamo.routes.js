const {Router} = require('express');

const router = Router();

const {
    renderPrestamoForm,
    createNewPrestamo,
    renderPrestamos,
    renderEditPrestamoForm,
    updatePrestamo,        
    deletePrestamo,
} = require('../controllers/prestamos.controller');

//-->   Renderizar Nuevo Prestamos
router.get('/prestamos/add', renderPrestamoForm);

//-->   Registra el prestamo en la Base de Datos
router.post('/prestamos/add', createNewPrestamo);

//-->   Renderiza todos los prestamos
router.get('/prestamos/',renderPrestamos);

//-->   Renderiza los prestamos para editarlos
router.get('/prestamos/edit/:id', renderEditPrestamoForm);

//-->   Actualiza el prestamo
router.put('/prestamos/edit/:id', updatePrestamo);

//--> Borra el prestamo seleccionado
router.delete('/prestamos/delete/:id', deletePrestamo);

module.exports = router;
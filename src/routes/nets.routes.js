const {Router} = require('express');

const router = Router();

const {
    renderNetsForm,
    createNewNet,
    renderNets,
    renderEditForm,
    updateNet,
    deleteNet
} = require('../controllers/nets.controller');

// Nuevas Notas
router.get('/netbooks/add', renderNetsForm);

router.post('/netbooks/new-nets', createNewNet);

// Obtener todas las notas
router.get('/netbooks', renderNets);

// Editar Notas
router.get('/netbooks/edit/:id', renderEditForm);

router.put('/netbooks/edit/:id', updateNet);

//Delete notes
router.delete('/netbooks/delete/:id', deleteNet);

module.exports = router;
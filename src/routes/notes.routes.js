const {Router} = require('express');

const router = Router();

const {
    renderNotesForm,
    createNewNote,
    renderNotes,
    renderEditForm,
    updateNote,
    deleteNote
} = require('../controllers/notes.controller');

// Nuevas Notas
router.get('/notes/add', renderNotesForm);

router.post('/notes/new-note', createNewNote);

// Obtener todas las notas
router.get('/notes', renderNotes);

// Editar Notas
router.get('/notes/edit/:id', renderEditForm);

router.put('/notes/edit/:id', updateNote);

//Delete notes
router.delete('/notes/delete/:id', deleteNote);

module.exports = router;
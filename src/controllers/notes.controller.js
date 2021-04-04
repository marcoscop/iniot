const notesController = {};
const Note = require('../models/Note');

notesController.renderNotesForm = (req, res) => {
    //res.send('Render Notes Form');
    res.render('notes/new-notes');
};

notesController.createNewNote = async (req, res) => {
    console.log(req.body);
    const {title, description} = (req.body);
    const newNote = new Note ({title:title, description:description});
    console.log(newNote);
    await newNote.save();
    //res.send('create new note');
    //res.render('notes/new-notes');
    req.flash('success_msg', 'Note Added Successfully');
    res.redirect('/notes');
};

notesController.renderNotes = async (req, res) => {
    //res.send('render all notes');
    const notes = await Note.find().lean();
    //console.log('--', notes);
    res.render('notes/all-notes', {notes});
};

notesController.renderEditForm = async(req, res) => {
    //res.send('edit notes');
    const note = await Note.findById(req.params.id).lean();
    console.log(note);
    res.render('notes/edit-notes', {note});
};

notesController.updateNote = async(req, res) => {
    console.log(req.body);
    const {title, description} = req.body;
    await Note.findByIdAndUpdate(req.params.id, {title: title, description: description});
    //res.send('update Notes')
    req.flash('success_msg', 'Note Update Successfully');
    res.render('/notes');
};

notesController.deleteNote = async(req, res) => {
    //res.send('deleting Note');
    await Note.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Note Delete Successfully');
    res.redirect('/notes');
}

module.exports = notesController;
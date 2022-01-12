const notesController = {};

notesController.renderNoteForm= (req,res)=>{
    res.render('notes/new-note');
}

notesController.createNewNote= (req,res)=>{
    console.log(req.body)
    res.send('new note')
};

notesController.renderNotes = (req, res)=>{
    res.send('Render Notes');
}

notesController.renderEditForm = (req, res)=>{
    res.send('Render Edit form')
}

notesController.updateNote = (req,res)=>{
    res.send('update note')
}

notesController.deleteNote = (req,res)=>{
    res.send('delete note')
}

module.exports = notesController;
const notesController = {};
const note = require('../models/note');
const Note = require('../models/note');//importamos el modelo de notas, que usaremos en createnewnote

notesController.renderNoteForm= (req,res)=>{
    res.render('notes/new-note');
}

notesController.createNewNote= async (req,res)=>{
    //extraemos titulo y descripcion de la nota
    const {tittle, description} = req.body;
    //creamos una nota nueva, previamente importada, y le asignamos los valores del body, js asigna automaticamente los valores sin necesidad de escribir description: description
    const newNote = new Note({tittle, description});
    await newNote.save();//mongoose guarda la información en la bd
    res.redirect('/notes')
};

notesController.renderNotes = async (req, res)=>{
    //busca las notas y las trae todas
    const notes = await Note.find().lean();
    //se renderiza y se pasa el objeto notes
    res.render('notes/all-notes', {notes});
}

notesController.renderEditForm = async (req, res)=>{
    //se buscan los datos de la nota
    const note = await Note.findById(req.params.id).lean();
    //se renderiza el formulario para editar, y se le pasan los datos de la nota
    res.render('notes/edit-note', {note});
}

notesController.updateNote =  async (req,res)=>{
    const {tittle, description} = req.body;
    await Note.findByIdAndUpdate(req.params.id, {tittle, description})
    res.redirect('/notes')
}

notesController.deleteNote = async (req,res)=>{
    //se obtiene el id, que se pasa por un parametro /delete/:parametro
    await Note.findByIdAndDelete(req.params.id);

    res.redirect('/notes')
}

module.exports = notesController;
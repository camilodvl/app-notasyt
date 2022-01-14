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
    newNote.user = req.user.id;
    await newNote.save();//mongoose guarda la información en la bd
    req.flash('success_msg', ' Note added succesfully'); //creamos el mensaje
    res.redirect('/notes')
};

notesController.renderNotes = async (req, res)=>{
    //busca las notas y trae la del usuario logeado
    const notes = await Note.find({user: req.user.id}).lean();
    //se renderiza y se pasa el objeto notes
    res.render('notes/all-notes', {notes});
}

notesController.renderEditForm = async (req, res)=>{
    //se buscan los datos de la nota
    const note = await Note.findById(req.params.id).lean();
    //se renderiza el formulario para editar, y se le pasan los datos de la nota, si la nota pertenece al usuario logeado
    if (note.user === req.user.id){
        res.render('notes/edit-note', {note});
    }else{
        req.flash('error', 'You are not authorized to modify this note')
        res.redirect('/notes')
    }
    
}

notesController.updateNote =  async (req,res)=>{
    const {tittle, description} = req.body;
    await Note.findByIdAndUpdate(req.params.id, {tittle, description})
    req.flash('success_msg', 'Note updated succesfully')
    res.redirect('/notes')
}

notesController.deleteNote = async (req,res)=>{
    //se obtiene el id, que se pasa por un parametro /delete/:parametro
    const noteValidar = await Note.findById(req.params.id)
    if (noteValidar.user === req.user.id){
        await Note.findByIdAndDelete(req.params.id);
        req.flash('success_msg', 'Note deleted succesfully')
        res.redirect('/notes')
    }else{
        req.flash('error', 'you are not authorized to delete this note');
        res.redirect('/notes');
    }
    
    

}

module.exports = notesController;
const { Router } = require("express");
const router = Router();
const {
  renderNoteForm,
  createNewNote,
  renderNotes,
  renderEditForm,
  updateNote,
  deleteNote,
} = require("../controllers/notes.controller"); //se importa la funcion desde el controlador
const {isAuthenticated} = require(`../helpers/auth`);
//New note
router.get("/notes/add", isAuthenticated, renderNoteForm); //cuando llega la solicitud a la ruta, ejecuta la función que se importó desde el controlador
router.post("/notes/new-note", createNewNote);

//get all notes
router.get("/notes", isAuthenticated, renderNotes);

//edit notes
router.get("/notes/edit/:id", isAuthenticated, renderEditForm); //mostrar form para actualizar

router.put("/notes/edit/:id", isAuthenticated,  updateNote); //recibe la información a actualizar

//delete notes
router.delete("/notes/delete/:id", isAuthenticated,  deleteNote);

module.exports = router;

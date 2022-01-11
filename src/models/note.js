const {Schema, model} = require('mongoose');


const NoteSchema = new Schema ({
    tittle: {type: String,
    required: true},
    description: {type: String,
    required:true,
},
  
}, {timestamps:true})//el timestamps guarda la fecha de cración y modificación




module.exports(model('note', NoteSchema));// se crea el modelo (agrega funciones de guardar, update...) nombre del modelo y schema
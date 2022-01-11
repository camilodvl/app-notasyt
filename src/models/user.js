const {Schema, model} = require('mongoose');
const bcypt = require('bcryptjs');
const bcrypt = require('bcryptjs/dist/bcrypt');

const UserSchema = new Schema({
    name: {type:String, required: true},
    email:{type:String, required: true},
    password:{type:String, required:true}
}, {timestamps:true});


//encriptación de la contraseña al guardar
UserSchema.methods.encryptPassword = //se crea el metodo encryptPassword(puede ser cualquier nombre)
async password =>{
    const salt = await bcrypt.genSalt(10)//el salt es el string a basar para cifrar, cuantas veces se va a ejecutar
    return await bcrypt.hash(password,salt);
};

//revisión de la contraseña si conicide con la cifrada
UserSchema.methods.matchPassword = function(password) {//no se crea como funcion flecha para poder acceder al this.password
    return await bcrypt.compare(password, this.password)
}

module.exports(model('user', UserSchema));
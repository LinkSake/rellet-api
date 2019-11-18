const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const userSchema = new Schema({
    firstName:    {type:String, required:[true, 'Tienes un nombre hermoso, por favor ingresalo']},
    lastName:     {type:String, required:[true, '¿De qué clan vienes? ¡Ingresa tu apellido!']},
    email:        {type:String, required:[true, '¡Ingresa tu email!']},
    password:     {type:String, required:[true, '¡Protegete! Ingresa una contraseña']},
});

module.exports = mongoose.model('User', userSchema);
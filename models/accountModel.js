const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const accountSchema = new Schema({
    name:    {type:String, required:[true, '¡Por favor, asigna un nombre a esta cuenta!']},
    amount:  {type:Number, required:[true, '¡Aunque sea poco, necesitas ingresar la cantidad de dinero en tu cuenta!']},
    trans:   [ObjectId],
    user_id: {type:ObjectId, required:[true, 'Necesitas un usuario para cada cuenta']}
});

module.exports = mongoose.model('Account', accountSchema);
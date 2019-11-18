const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const budgetSchema = new Schema({
    name:     {type:String, required:[true, '¡Por favor, asigna un nombre a esta cuenta!']},
    freq:     {type: String, enum:['Diario','Semanal','Quincenal','Mensual'], required:[true, 'Baby la vida es un ciclo ¿Cada cuando se renueva tu presupuesto?']},
    initDate: {type: Date, required:[true, '¿Cuándo inicia tu presupuesto?']}, 
    desc:     {type:String},
    amount:   {type:Number, required:[true, '¿Cuánto dinero vas a asignarle a este presupuesto?']},
    user_id:  {type:ObjectId, ref:'User'}
});

module.exports = mongoose.model('Budget', budgetSchema);
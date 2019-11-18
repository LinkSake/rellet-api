const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const categorySchema = new Schema({
    name:    {type:String, required:[true, '¡Todos necesitamos un nombre! Tu categoría también']},
    desc:    {type:String},
    max:     {type: Number, required:[true, '¡Tranquilo Rico McPato! Necesitas un limite para el gasto']},
    user_id: {type:ObjectId, ref:'User', required:[true, 'Necesitas un usuario para cada categoria']}
});

module.exports = mongoose.model('Category', categorySchema);
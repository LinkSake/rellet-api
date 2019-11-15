const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const transactionSchema = new Schema({
    amount:  {type:Number, required:[true, '¡Aguas! Necesitas ingresar la cantidad de dinero que se gastó']},
    desc:    {type:String},
    date:    {type: Date, required:[true, 'Necesitas especificar la fecha de la transacción']},
    cat:     ObjectId,
    account: ObjectId,
    user_id: ObjectId
});

module.exports = mongoose.model('Transaction', transactionSchema);
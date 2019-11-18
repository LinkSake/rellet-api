const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const transactionSchema = new Schema({
    amount:  {type:Number, required:[true, '¡Aguas! Necesitas ingresar la cantidad de dinero que se gastó']},
    desc:    {type:String},
    date:    {type: Date, required:[true, 'Necesitas especificar la fecha de la transacción']},
    cat:     {type:ObjectId, ref:'Category'},
    account: {type:ObjectId, ref:'Account'},
    user_id: {type:ObjectId, ref:'User'}
});

module.exports = mongoose.model('Transaction', transactionSchema);
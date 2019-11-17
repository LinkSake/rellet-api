const Transaction = require('../models/transactionModel');
const ObjectId = require('mongoose').Types.ObjectId;

exports.TransactionController = class TransactionClass {
  
  //Constructor
  constructor() {
    require('auto-bind')(this);
  }

  //Crea una nueva transacción
  /*TODO: Cuando se crea una transacción se hace un update a la cuenta,
   agregando la transacción y restando el monto gastado */
  async createTransaction(req, res){
    try {
        const transaction = new Transaction(req.body);
        if (!req.body.user_id) {
            transaction.user_id = ObjectId()
        }
        await transaction.save();
        res.status(200).json(transaction);
    } catch (error) {
        res.status(400).json(error);
    }
  }

  //Regresa una lista con todas las transacciónes de un usuario
  async getAllTransactions(req, res){
    try {
        res.status(200).json(await Transaction.find({user_id: ObjectId(req.params.user_id)}));
    } catch (error) {
        res.status(400).json(error);
    }
  }

  //Regresa los datos de una sola transacción
  async getOneTransaction(req, res){
      try {
            res.status(200).json(await Transaction.findById(req.params.id));
      } catch (error) {
            res.status(400).json(error);
      }
  }

  //Actualiza los datos de la transacción
  async updateTransaction(req, res){
    try {
        let transaction = await Transaction.findById(req.params.id);
        transaction = this.setData(transaction ,req.body);
        await transaction.save()
        res.status(200).json(transaction);
    } catch (error) {
        res.status(400).json(error);
    }
  }

  //Borra una transacción
  async deleteTransaction(req, res){
    try {
        let transactionFlag = await Transaction.findOneAndRemove({_id:req.params.id});
        res.status(200).json(transactionFlag);
    } catch (error) {
        res.status(500).json(error);
    }
  }

  //Agrega los datos a un modelo de transacción desde el body
  setData(transaction, body){
    (body.amount) ? transaction.amount = body.amount : null;
    (body.desc) ? transaction.desc = body.desc : null;
    (body.date) ? transaction.date = body.date : null;
    (body.cat) ? transaction.cat = body.cat : null;
    (body.account) ? transaction.account = body.account : null;
    return transaction
  }
}
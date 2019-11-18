const Transaction = require('../models/transactionModel');
const Account = require('../models/accountModel');
const Category = require('../models/categoryModel');
const ObjectId = require('mongoose').Types.ObjectId;

exports.TransactionController = class TransactionClass {
  
  //Constructor
  constructor() {
    require('auto-bind')(this);
  }

  //Crea una nueva transacción y le resta la cantidad a la cuenta especificada
  async createTransaction(req, res){
    try {
        const transaction = new Transaction(req.body);
        const account = await Account.findById(req.body.account);
        const category = await Category.findById(req.body.cat);
        if (this.isInLimits(transaction.amount, account.amount) && this.isInLimits(transaction.amount, category.max)) {
          if (!req.body.user_id) {
            transaction.user_id = ObjectId()
          }
          await transaction.save();
          account.amount = account.amount - transaction.amount;
          account.trans.push(transaction);
          await account.save();
          res.status(200).json({transaction, account});
        } else {
          res.status(400).json({'Error':'¡Ingresaste una cantidad mayor al dinero que tienes!'});
        }
    } catch (error) {
        res.status(500).json(error);
    }
  }

  //Regresa una lista con todas las transacciónes de un usuario
  async getAllTransactions(req, res){
    try {
        res.status(200).json(await Transaction.find({user_id: ObjectId(req.params.user_id)}).populate('account'));
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

  //Actualiza los datos de la transacción y actualiza el monto que se restó a la cuenta
  async updateTransaction(req, res){
    try {
        let transaction = await Transaction.findById(req.params.id);
        let account = await Account.findById(transaction.account);
        account.amount = account.amount + transaction.amount;
        transaction = this.setData(transaction ,req.body);
        account.amount = account.amount - transaction.amount;
        await account.save();
        await transaction.save();
        res.status(200).json(transaction);
    } catch (error) {
        res.status(500).json(error);
        console.log(error);
        
    }
  }

  //Borra una transacción y regresa la cantidad restada a la cuenta
  async deleteTransaction(req, res){
    try {
        let transactionFlag = await Transaction.findOneAndRemove({_id:req.params.id});
        let accountFlag = await Account.findById(transactionFlag.account);
        accountFlag.trans.splice(accountFlag.trans.indexOf(transactionFlag._id),1);
        accountFlag.amount = accountFlag.amount + transactionFlag.amount;
        await accountFlag.save()
        res.status(200).json({transactionFlag, accountFlag});
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
    return transaction
  }

  //Revisa que la cantidad ingresada sea posible de acuerdo al paramtero dado
  //TODO: Hacer prueba unitaria de este método
  isInLimits(amount, max){
    if (amount < max) {
      return true;
    } else {
      return false;
    }
  }

}
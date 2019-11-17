const Account = require('../models/accountModel');
const Transaction = require('../models/transactionModel');
const ObjectId = require('mongoose').Types.ObjectId;

exports.AccountController = class AccountClass {
  
  //Constructor
  constructor() {
    require('auto-bind')(this);
  }

  //Crea una nueva cuenta
  async createAccount(req, res){
    try {
        const account = new Account(req.body);
        if (!req.body.user_id) {
            account.user_id = ObjectId()
        }
        await account.save();
        res.status(200).json(account);
    } catch (error) {
        res.status(400).json(error);
    }
  }

  //Regresa una lista con todas las cuentas de un usuario
  async getAllAccounts(req, res){
    try {
        res.status(200).json(await Account.find({user_id: ObjectId(req.params.user_id)}));
    } catch (error) {
        res.status(400).json(error);
    }
  }

  //Regresa los datos de una sola cuenta
  async getOneAccount(req, res){
      try {
            res.status(200).json(await Account.findById(req.params.id));
      } catch (error) {
            res.status(400).json(error);
      }
  }

  //TODO: Hacer un método que regrese todas las transacciones de una cuenta

  //Actualiza los datos de una cuenta
  async updateAccount(req, res){
    try {
        let account = await Account.findById(req.params.id);
        account = this.setData(account ,req.body);
        await account.save()
        res.status(200).json(account);
    } catch (error) {
        res.status(400).json(error);
    }
  }

  //FIX: Arreglar el que se borren las transacciones junto con la cuenta
  //Borra una cuenta
  async deleteAccount(req, res){
    try {
        let accountFlag = await Account.findOneAndRemove({_id:req.params.id});
        let user_id = accountFlag.user_id
        let transactionFlag = await Transaction.findOneAndRemove({user_id:ObjectId(user_id)});
        res.status(200).json({accountFlag, transactionFlag});
    } catch (error) {
        res.status(500).json(error);
    }
  }

  //Agrega los datos a un modelo de cateogria desde el body
  setData(account, body){
    (body.name) ? account.name = body.name : null;
    (body.amount) ? account.amount = body.amount : null;
    return account
  }
}
const User = require('../models/userModel');
const Budget = require('../models/budgetModel');
const Category = require('../models/categoryModel');
const Transaction = require('../models/transactionModel');
const Account = require('../models/accountModel');
const ObjectId = require('mongoose').Types.ObjectId;

exports.UserController = class userClass {
  
  //Constructor
  constructor() {
    require('auto-bind')(this);
  }

  //Crea un nuevo usuario
  async createUser(req, res){
    try {
        const user = new User(req.body);
        await user.save();
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json(error);
    }
  }

  //Regresa todos los datos relacionado con un usuario
  async getOneUser(req, res){
      try {
          let user = await User.findById(req.params.id);
          let budget = await Budget.find({user_id: ObjectId(user.id)})
          let categories = await Category.find({user_id: ObjectId(user.id)})
          let transaction = await Transaction.find({user_id: ObjectId(user.id)})
          let account = await Account.find({user_id: ObjectId(user.id)})
          res.status(200).json({
            user: user, 
            budget: budget,
            categories: categories,
            transaction: transaction,
            account: account
          });
      } catch (error) {
            res.status(400).json(error);
      }
  }
  
  //Actualiza los datos de un usuario
  async updateUser(req, res){
    try {
        let user = await User.findById(req.params.id);
        user = this.setData(user, req.body);
        await user.save()
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json(error);
    }
  }

  //Borra una usuario
  async deleteUser(req, res){
    try {
        let userFlag = await User.findOneAndRemove({_id:req.params.id});
        let budgetFlag = await Budget.findOneAndRemove({user_id:req.params.id});
        let categoryFlag = await Category.findOneAndRemove({user_id:req.params.id});
        let accountFlag = await Account.findOneAndRemove({user_id:req.params.id});
        let transactionFlag = await Transaction.findOneAndRemove({user_id:req.params.id});
        res.status(200).json({
          flags:[userFlag, budgetFlag, categoryFlag, accountFlag, transactionFlag]
        });
    } catch (error) {
        res.status(500).json(error);
    }
  }

  //Agrega los datos a un modelo de usuario desde el body
  setData(user, body){
    (body.fistName) ? user.fistName = body.fistName : null;
    (body.lastName) ? user.lastName = body.lastName : null;
    (body.email) ? user.email = body.email : null;
    (body.password) ? user.password = body.password : null;
    return user
  }
}
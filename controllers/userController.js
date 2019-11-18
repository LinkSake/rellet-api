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
            transactions: transaction,
            accounts: account
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
        const id = req.params.id
        let userFlag = await User.findOneAndRemove({_id:id});
        this.deleteUserData(id);
        res.status(200).json(userFlag);
    } catch (error) {
        res.status(500).json(error);
    }
  }
  
  //Agrega los datos a un modelo de usuario desde el body
  setData(user, body){
    (body.firstName) ? user.firstName = body.firstName : null;
    (body.lastName) ? user.lastName = body.lastName : null;
    (body.email) ? user.email = body.email : null;
    (body.password) ? user.password = body.password : null;
    return user
  }

  //Elimina todas las categorias, cuentras y transacciónes asociadas con un usuario
  async deleteUserData(id){
    try {
      let budgetFlag = await Budget.findOneAndRemove({user_id:id});
      let userCat = await Category.find({user_id: ObjectId(id)});
      userCat.forEach(element => {
          this.deleteCategory(element._id);
      });
      let userAcc = await Account.find({user_id: ObjectId(id)});
      userAcc.forEach(element => {
        this.deleteAccount(element._id);
      });
      let userTrans = await Transaction.find({user_id: ObjectId(id)});
      userTrans.forEach(element => {
        this.deleteTransaction(element._id);
      });
    } catch (error) {
      console.log(error);
    }
  }

  //Elimina una categoria asociada con un usuario
  async deleteCategory(id){
    try {
      let flag = await Category.findOneAndRemove({_id:ObjectId(id)});
    } catch (error) {
      console.error(error);
    }
  }

  //Elimina una cuenta asociada con un usuario
  async deleteAccount(id){
    try {
      let flag = await Account.findOneAndRemove({_id:ObjectId(id)});
    } catch (error) {
      console.error(error);
    }
  }

  //Elimina una transacciones asociada con un usuario
  async deleteTransaction(id){
    try {
      let flag = await Transaction.findOneAndRemove({_id:ObjectId(id)});
    } catch (error) {
      console.error(error);
    }
  }


}
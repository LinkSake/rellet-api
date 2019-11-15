const Category = require('../models/categoryModel');
const ObjectId = require('mongoose').Types.ObjectId;

exports.CategoryController = class CategoryClass {
  
  //Constructor
  constructor() {
    require('auto-bind')(this);
  }

  //Crea una nueva categoria
  async createCategory(req, res){
    try {
        const category = new Category(req.body);
        if (!req.body.user_id) {
            category.user_id = ObjectId()
        }
        await category.save();
        res.status(200).json(category);
    } catch (error) {
        res.status(400).json(error);
    }
  }

  //Regresa una lista con todas las categorias de un usuario
  async getAllCategories(req, res){
    try {
        res.status(200).json(await Category.find({user_id: ObjectId(req.params.user_id)}));
    } catch (error) {
        res.status(400).json(error);
    }
  }

  //Regresa los datos de una sola categoria
  async getOneCategory(req, res){
      try {
            res.status(200).json(await Category.findById(req.params.id));
      } catch (error) {
            res.status(400).json(error);
      }
  }

  //Actualiza los datos de una categoria
  async updateCategory(req, res){
    try {
        let category = await Category.findById(req.params.id);
        category = this.setData(category ,req.body);
        await category.save()
        res.status(200).json(category);
    } catch (error) {
        res.status(400).json(error);
    }
  }

  //Borra una categoria
  async deleteCategory(req, res){
    try {
        let flag = await Category.findOneAndRemove({_id:req.params.id});
        res.status(200).json(flag);
    } catch (error) {
        res.status(500).json(error);
    }
  }

  //Agrega los datos a un modelo de cateogria desde el body
  setData(category, body){
    (body.name) ? category.name = body.name : null;
    (body.desc) ? category.desc = body.desc : null;
    (body.max) ? category.max = body.max : null;
    return category
  }
}
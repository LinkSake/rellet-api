const Budget = require('../models/budgetModel');

exports.BudgetController = class BudgetClass {
  
  //Constructor
  constructor() {
    require('auto-bind')(this);
  }

  //Crea un nueva presupuesto
  async createBudget(req, res){
    try {
        const budget = new Budget(req.body);
        await budget.save();
        res.status(200).json(budget);
    } catch (error) {
        res.status(400).json(error);
    }
  }

  //Regresa los datos del presupuesto
  async getBudget(req, res){
      try {
            res.status(200).json(await Budget.findById(req.params.id));
      } catch (error) {
            res.status(400).json(error);
      }
  }

  //Actualiza los datos del presupuesto
  async updateBudget(req, res){
    try {
        let budget = await Budget.findById(req.params.id);
        budget = this.setData(budget ,req.body);
        await budget.save()
        res.status(200).json(budget);
    } catch (error) {
        res.status(400).json(error);
    }
  }

  //Borra un presupuesto
  async deleteBudget(req, res){
    try {
        let budgetFlag = await Budget.findOneAndRemove({_id:req.params.id});
        res.status(200).json(budgetFlag);
    } catch (error) {
        res.status(500).json(error);
    }
  }

  //Agrega los datos a un modelo de presupuesto desde el body
  setData(budget, body){
    (body.name) ? budget.name = body.name : null;
    (body.freq) ? budget.freq = body.freq : null;
    (body.initDate) ? budget.initDate = body.initDate : null;
    (body.desc) ? budget.desc = body.desc : null;
    (body.amount) ? budget.amount = body.amount : null;
    return budget
  }
}
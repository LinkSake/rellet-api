const express = require('express');
const router = express.Router();
const budgetController = new (require('../controllers/budgetController')).BudgetController();

router.post('',budgetController.createBudget);
router.get('/:id',budgetController.getBudget);
router.patch('/:id',budgetController.updateBudget);
router.delete('/:id',budgetController.deleteBudget);

module.exports = router

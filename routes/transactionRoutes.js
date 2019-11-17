const express = require('express');
const router = express.Router();
const transactionController = new (require('../controllers/transactionController')).TransactionController();

router.post('',transactionController.createTransaction);
router.get('/list/:user_id',transactionController.getAllTransactions);
router.get('/:id',transactionController.getOneTransaction);
router.patch('/:id',transactionController.updateTransaction);
router.delete('/:id',transactionController.deleteTransaction);

module.exports = router

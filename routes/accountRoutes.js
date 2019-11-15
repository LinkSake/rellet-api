const express = require('express');
const router = express.Router();
const accountController = new (require('../controllers/accountController')).AccountController();

router.post('',accountController.createAccount);
router.get('/list/:user_id',accountController.getAllAccounts);
router.get('/:id',accountController.getOneAccount);
router.patch('/:id',accountController.updateAccount);
router.delete('/:id',accountController.deleteAccount);

module.exports = router

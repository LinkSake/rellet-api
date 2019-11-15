const express = require('express');
const router = express.Router();
const userController = new (require('../controllers/userController')).UserController();

router.post('',userController.createUser);
router.get('/:id',userController.getOneUser);
router.patch('/:id',userController.updateUser);
router.delete('/:id',userController.deleteUser);

module.exports = router
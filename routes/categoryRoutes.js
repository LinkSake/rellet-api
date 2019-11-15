const express = require('express');
const router = express.Router();
const categoryController = new (require('../controllers/categoryController')).CategoryController();

router.post('',categoryController.createCategory);
router.get('/list/:user_id',categoryController.getAllCategories);
router.get('/:id',categoryController.getOneCategory);
router.patch('/:id',categoryController.updateCategory);
router.delete('/:id',categoryController.deleteCategory);

module.exports = router

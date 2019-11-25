const express = require('express');
const router = express.Router();
const sessionController = new (require('../controllers/sessionController')).SessionController();

router.post('/login',sessionController.loginUser);

module.exports = router
const express = require('express');
const router = express.Router();
module.exports = router;
const controller = require('../controllers/usersController');

router.get('/:id', controller.user_get)

router.post('/register', controller.register)

router.post('/login', controller.login)

router.get('', controller.list_users)

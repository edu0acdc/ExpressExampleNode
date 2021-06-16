const express = require('express');
const router = express.Router();
const controller = require('./controllers/usersController');

router.get('/:id', controller.user_get)

router.post('/register', controller.register)


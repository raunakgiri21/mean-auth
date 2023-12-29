const express = require('express');
const router = express.Router();

// controllers
const {login, register, getUserById} = require('../controllers/user');

// routes
router.post('/login',login);
router.post('/register',register);
router.get('/:userId',getUserById);

module.exports = router;
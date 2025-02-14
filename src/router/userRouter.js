const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserDetails } = require('../controllers/userController.js');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/:id', getUserDetails);

module.exports = router;
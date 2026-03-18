const express = require('express');
const { registerUser, loginUser, getUserProfile, updateUserProfile } = require('../controllers/auth.controller');
const { validate, registerValidation, loginValidation } = require('../middleware/validation.middleware');
const { protect } = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/register', validate(registerValidation), registerUser);
router.post('/login', validate(loginValidation), loginUser);

router.route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile);

module.exports = router;

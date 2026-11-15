const express = require('express');
const router = express.Router();
const validate = require('../middleware/validate');

const { registerUserSchema } = require('../validations/user');

const userController = require("../controllers/user")

router.post('/login', userController.login);
router.post('/register',validate(registerUserSchema), userController.register);

module.exports = router;
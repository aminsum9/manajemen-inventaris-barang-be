const express = require('express');
const router = express.Router();
const validate = require('../middleware/validate');
const { createProductSchema } = require('../validations/product');

const productController = require("../controllers/product")

router.post('/',validate(createProductSchema), productController.add);
router.get('/', productController.get);
router.delete('/:id', productController.delete);

module.exports = router;
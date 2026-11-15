const express = require('express');
const router = express.Router();
const validate = require('../middleware/validate');
const { createOrUpdateProductSchema } = require('../validations/product');

const productController = require("../controllers/product")

router.post('/',validate(createOrUpdateProductSchema), productController.add);
router.get('/', productController.get);
router.put('/:id',validate(createOrUpdateProductSchema), productController.update);
router.delete('/:id', productController.delete);

module.exports = router;
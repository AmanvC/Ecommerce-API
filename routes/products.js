const express = require('express');
const router = express.Router();

const productsController = require('../controllers/products_controller');

router.get('/', productsController.getProducts);
router.post('/create', productsController.create);
router.delete('/:id', productsController.deleteProduct);

//patch is used since we need to update a particular field only, not the whole object
router.patch('/:id/update_quantity/', productsController.updateProduct)

module.exports = router;
const express = require('express');
const router = express.Router();

const shopProdController = require('../controllers/shop/shopProduct');


router.get('/', shopProdController.getIndex);
router.get('/products/:productId', shopProdController.getProduct);

module.exports = router;
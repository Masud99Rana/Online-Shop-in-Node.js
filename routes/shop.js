const express = require('express');
const router = express.Router();

const shopProdController = require('../controllers/shop/shopProduct');
const cartController = require('../controllers/shop/cart');

// products show/single
router.get('/', shopProdController.getIndex);
router.get('/products/:productId', shopProdController.getProduct);

// // //cart
// router.get('/cart', cartController.getCart);
// router.post('/cart', cartController.postCart);
// router.post('/cart-delete-item', cartController.postCartDeleteProduct);

// // //order
// router.post('/create-order', cartController.postOrder);
// router.get('/orders', cartController.getOrders);

module.exports = router;
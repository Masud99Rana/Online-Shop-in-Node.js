const path = require('path');

const express = require('express');
const adminProdController = require('../controllers/admin/product');
const router = express.Router();

// router.get('/', (req, res)=>{
//     // res.send("Hello Masud");
//     // res.send("<h1>Hello Node.js</h2>");
//     res.render('shop/index',{ pageTitle: 'Shop Page', path: '/' });
//   });

/**
 * Product CRUD
 * admin/add-product => GET
 */
const isAuth = require('../middleware/is-auth');

router.get('/add-product',isAuth, adminProdController.getAddProduct);
router.post('/add-product', adminProdController.postAddProduct);
router.get('/products', adminProdController.getProducts);
router.post('/edit-product', adminProdController.postEditProduct);
router.get('/edit-product/:productId', adminProdController.getEditProduct);
router.post('/delete-product', adminProdController.postDeleteProduct);

module.exports = router;
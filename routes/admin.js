const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
    // res.send("Hello Masud");
    // res.send("<h1>Hello Node.js</h2>");
    res.render('shop/index',{ pageTitle: 'Shop Page', path: '/' });
  });

module.exports = router;
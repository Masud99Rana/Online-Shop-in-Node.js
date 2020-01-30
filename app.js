const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const sequelize = require('./util/database');

// Controller
const errorController = require('./controllers/error');

//Model 
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const Order = require('./models/order');
const OrderItem = require('./models/order-item');

//Config Template Engine ejs
app.set('view engine', 'ejs');
app.set('views', 'views');

// config static files && Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//Middleware
/* app.use('/', (req, res, next) => {
  res.send('<h1>Hello from Express!</h1>');
}); 
*/

/* app.get('/',(req, res)=>{
  // res.send("Hello Masud");
  // res.send("<h1>Hello Node.js</h2>");
  //res.render('shop/index',{ pageTitle: 'Shop Page', path: '/' });
}); */

// Middleware run when request come to server. it run after db. So, we get the data here...
app.use((req, res, next) => {
  User.findByPk(1)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

// Load & Use route
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
app.use('/admin', adminRoutes);
app.use(shopRoutes);

//404 error handled
/* app.use((req, res, next) => {
  res.send('Not Found!')
}); */
app.use(errorController.get404);

//one to many  ( => product table e (userId) auto create hobbe. )
Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);

// one to one ( => Cart table userId auto create hobbe. )
User.hasOne(Cart);
Cart.belongsTo(User);

// many to many ( => CartItem table ee cartId	productId auto create hobbe.)
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

// one to many ( => Order table e userId thakbe )
Order.belongsTo(User);
User.hasMany(Order);

// Many to Many ( => OrderItem table ee orderId  productId thakbe)
Order.belongsToMany(Product, { through: OrderItem });


sequelize
  .sync({ force: true }) // ( drop & create )
  // .sync()
  .then(result => {
    return User.findByPk(1);
    // console.log(result);
  })
  .then(user => {
    if (!user) {
      return User.create({ name: 'Masud', email: 'test@test.com' });
    }
    return user;
  })
  .then(user => {
    // console.log(user);
    return user.createCart();
  })
  .then(result => {
    // console.log(result);
    const port = process.env.PORT || 4500;
    app.listen(port, ()=>{
      console.log(`Hey Masud, I am listening on port ${port}`);
    });
  })
  .catch(err => {
    console.log(err);
  });

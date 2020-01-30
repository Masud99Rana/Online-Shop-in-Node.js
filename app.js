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

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product); // product table ee (userId) field auto create hobbe.

sequelize
  // .sync({ force: true })
  .sync()
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

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const flash = require('connect-flash');

// Model
const User = require('./models/user');

// Controller
const errorController = require('./controllers/error');

//Config Template Engine ejs
app.set('view engine', 'ejs');
app.set('views', 'views');

// config static files && Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//Config Session store
const MONGODB_URI =    
'mongodb+srv://masud:WUBSlPXs7qAmT3ao@cluster0-hdjzg.mongodb.net/shop?retryWrites=true&w=majority';

const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions'
});

const csrfProtection = csrf();
 
//Middleware


app.use(
  session({
    secret: 'my cool secret',
    resave: false, // per request e new kore save hobe kina
    saveUninitialized: false, // age save na thakle new create hobe kina
    store: store
  })
  );

  app.use(flash());
  
app.use((req, res, next) => {
    if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  next();
});


// Load & Use route
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');
app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

//404 error handled
/* app.use((req, res, next) => {
  res.send('Not Found!')
}); */
app.use(errorController.get404);

mongoose
.connect(MONGODB_URI)
.then(result => {
    
    User.findOne().then(user => {
        if (!user) {
          const user = new User({
            name: 'Masud',
            email: 'Rana@gmail.com',
            cart: {
              items: []
            }
          });
          user.save();
        }
      });

    console.log("Hey, Masud! I am listenig on 4500.")
    app.listen(4500);
})
.catch(err => {
    console.log(err);
});
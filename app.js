const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');

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

//Middleware
app.use((req, res, next) => {
    User.findById('5e33fa701c9d44000054ced8')
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

mongoose
.connect(
    'mongodb+srv://masud:WUBSlPXs7qAmT3ao@cluster0-hdjzg.mongodb.net/shop?retryWrites=true&w=majority'
)
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
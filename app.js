const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoConnect = require('./util/database').mongoConnect;

// Controller
const errorController = require('./controllers/error');

//Config Template Engine ejs
app.set('view engine', 'ejs');
app.set('views', 'views');

// config static files && Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//Middleware

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

mongoConnect(() => {
  console.log("I am listenig on 4500")
  app.listen(4500);
});


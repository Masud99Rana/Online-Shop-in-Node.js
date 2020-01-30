const express = require('express');
const app = express();


//Config Template Engine ejs
app.set('view engine', 'ejs');
app.set('views', 'views');

//Middleware
/* 
app.use('/', (req, res, next) => {
  res.send('<h1>Hello from Express!</h1>');
}); 
*/

app.get('/',(req, res)=>{
  // res.send("Hello Masud");
  // res.send("<h1>Hello Node.js</h2>");
  res.render('shop/index');
});

//404 error handled
app.use((req, res, next) => {
  res.send('Not Found!')
});

const port = process.env.PORT || 4500;
app.listen(port, ()=>{
	console.log(`Hey Masud, I am listening on port ${port}`);
});

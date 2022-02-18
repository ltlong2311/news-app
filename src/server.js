// require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const { engine } = require('express-handlebars');
const methodOverride = require('method-override');
const path = require('path');
const app = express();
const port = 4000;

const route = require('./routes');
const db = require('./config/db');

// Connect to db
db.connect();

app.use(express.static(path.join(__dirname, 'public')));

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

//HTTP logger
// app.use(morgan('combined'));

app.use(methodOverride('_method'))

// Template engine: express-handlebars
app.engine('hbs', engine({ 
  extname: '.hbs',
  helpers: {
    sum: (a, b) => a + b,
  } 
}));
app.set('view engine', 'hbs');
// app.set('views', path.join(__dirname, 'resources/views'));
app.set('views', path.join(__dirname, 'resources', 'views'));

// Routes init
route(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

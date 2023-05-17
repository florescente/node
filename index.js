require('dotenv').config();
const express = require("express");
const morgan = require("morgan");
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

const app = express();

const uri = `mongodb+srv://nodetutorial:${process.env.DB_PASS}@nodetutorial.jjisjnj.mongodb.net/nodetutorial?retryWrites=true&w=majority`;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => app.listen(3000))
  .catch(err => console.log(err));

// register view engine
app.set('view engine', 'ejs');

// middleware static files

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.use(morgan("tiny"));

app.use((req, res, next) => {
    res.locals.path = req.path;
    next();
  });

app.get('/', function (req, res) {
    res.redirect('/blogs');
});

app.get('/about', function (req, res) {
    res.render('about', { title: 'About' });
});

// blog routes
app.use('/blogs', blogRoutes);

// redirect
app.get('/about-us', (req, res) => {
    res.redirect('/about');
});

// 404
app.use((req, res) => {
    res.status(404).render('404', { title: '404' })
});

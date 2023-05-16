const express = require("express");
const morgan = require("morgan");

const app = express();

// register view engine
app.set('view engine', 'ejs');

app.listen(3000);

// middleware static files

app.use(express.static('public'));

app.use(morgan("tiny"));

app.get('/', function (req, res) {
    const blogs = [
        {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    ];
    res.render('index', { title: 'Home', blogs });
});

app.get('/about', function (req, res) {
    res.render('about', { title: 'About' });
});

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Blogs' });
})

// redirect
app.get('/about-us', (req, res) => {
    res.redirect('/about');
});

// 404
app.use((req, res) => {
    res.status(404).render('404', { title: '404' })
});

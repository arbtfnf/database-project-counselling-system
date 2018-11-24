const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials'); 
app.set('view engine', 'hbs');

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
});

// hbs.registerHelper('welcome', (text) => {
//     return text
// });

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err){
            console.log('Unable to append to server.log');
        }
    });
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

app.get('/login',(req,res) => {
    res.render('login.hbs',{
        pageTitle: 'Information',
        welcomeMessage: 'Education is not the filling of a pail, but the lighting of a fire'
    });
});

app.get('/dashboard',(req,res) => {
    //res.send('Express is on!');
    res.render('dashboard.hbs',{
        pageTitle: 'Student detail'
    });
});

app.get('/counselling',(req,res) => {
    //res.send('Express is on!');
    res.render('counselling.hbs',{
        pageTitle: 'Counselling detail'
    });
});
app.get('/bad',(req,res) => {
    res.send({
        errorMessage: 'Unable to find page!'
    });
});

app.listen(3000, () => {
    console.log('Server is up on Port: 3000');
});
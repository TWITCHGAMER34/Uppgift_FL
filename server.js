const express = require('express');
const bodyParser = require('body-parser');
const knexConfig = require('./knexfile'); // Import knex configuration
const knex = require('knex')(knexConfig.development); // Use the development configuration
const session = require('express-session');
const path = require('path'); // Import path module

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true})); // Add this line to handle form submissions

// Configure session middleware
app.use(session({
    secret: 'keyboard cat', // Secret key for signing the session ID cookie
    resave: false, // Do not save session if unmodified
    saveUninitialized: true // Save uninitialized sessions
}));


app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        await knex('users').insert({ username, password });
        res.status(201).send('User registered successfully');
    } catch (error) {
        res.status(500).send('Error registering user');
    }
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await knex('users').where({ username }).first();
        if (user && user.password === password) {
            req.session.userId = user.id;
            res.redirect('/homepage')
        } else {
            res.status(401).send('Invalid credentials');
        }
    } catch (error) {
        res.status(500).send('Error logging in');
    }
});


const isAuthenticated = (req, res, next) => {
    if (req.session && req.session.userId) {
        return next();
    } else {
        res.status(401).send('Unauthorized');
    }
};

app.get('/homepage', isAuthenticated, (req, res) => {
    console.log('success');
    res.sendFile(path.join(__dirname, 'homepage.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
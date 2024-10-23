const express = require('express');
const bodyParser = require('body-parser');
const knex = require('knex')(require('./knexfile'));
const session = require('express-session');

const app = express();
app.use(bodyParser.json());

app.post('/register', (req, res) => {
    // Register route
});

app.post('/login', (req, res) => {
    // Login route
});

app.get('/homepage', (req, res) => {
    // Homepage route
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
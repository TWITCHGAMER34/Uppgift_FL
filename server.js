const express = require('express');
const bodyParser = require('body-parser');
const knexConfig = require('./knexfile'); // Import knex configuration
const knex = require('knex')(knexConfig.development); // Use the development configuration
const session = require('express-session');
const path = require('path'); // Import path module

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // Add this line to handle form submissions


app.post('/register', (req, res) => {
    //Registration Logic
});

app.post('/login',(req, res) => {
    //Login Logic
});

app.get('/homepage', (req, res) => {
    //HomePage Logic
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
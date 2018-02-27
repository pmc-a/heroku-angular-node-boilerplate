const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Serve static content from /dist folder (populated after ng build command)
app.use(express.static(__dirname + '/dist'));

/*
-- Uncomment this section if using Knex! --

const env = process.env.NODE_ENV || 'development';
const knexConfig = require('./knexfile');
const knex = require('knex')(knexConfig[env]);

app.get('/languages', (req, res) => {
    return knex('languages')
        .then((result) => res.send(result));
});
*/

app.listen(process.env.PORT || 8080, () => console.log('Server listening on 8080'));
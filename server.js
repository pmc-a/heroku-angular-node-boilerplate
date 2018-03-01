const express = require('express');
const bodyParser = require('body-parser');

const env = process.env.NODE_ENV || 'development';
const knexConfig = require('./knexfile');
const knex = require('knex')(knexConfig[env]);

const app = express();
app.use(bodyParser.json());

// Serve static content from /dist folder (populated after ng build command)
app.use(express.static(__dirname + '/dist'));

app.get('/technologies', (req, res) => {
    return knex('technologies')
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send('Uh oh, looks like you haven\'t ran your migrations yet! Check your Heroku logs for more information.');
        });
});

app.listen(process.env.PORT || 8080, () => console.log('Server listening on 8080'));
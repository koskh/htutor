// @flow

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const references = require('./references/index');
const random = require('./utils/random');

const blocks = require('./blocks');
const lessons = require('./lessons');


const api = express.Router();

api.get('/', (req: express$Request, res: express$Response) => {
    res.send('Default response for GET /api\n');
});

api.use('/references', references);

api.use('/blocks', blocks);
api.use('/lessons', lessons);

api.use('/utils/random', random);

api.use('*', (req: express$Request, res: express$Response) => {
    res.status(404);
    res.send('Not found Api route\n');
});

module.exports = api;

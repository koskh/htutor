// @flow

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const references = require('./references/index');
const references2 = require('./references/index2'); // test only

const random = require('./utils/random');

const api = express.Router();

api.get('/', (req: express$Request, res: express$Response) => {
    res.send('Default response for GET /api\n');
});

api.use('/references', references);
api.use('/references2', references2);

api.use('/utils/random', random);

api.use('*', (req: express$Request, res: express$Response) => {
    res.status(404);
    res.send('Not found Api route\n');
});

module.exports = api;

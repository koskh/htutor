// @flow

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const router = express.Router();

const { getLesson, getTestLesson } = require('../../services/lesson');

router.get('/:id?', (req: express$Request, res: express$Response) => {
    res.json(getLesson());
});

router.get('/:id/test', (req: express$Request, res: express$Response) => {
    res.json(getTestLesson());
});


module.exports = router;

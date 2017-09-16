// @flow

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const router = express.Router();

const { getLessons, getLesson, getTestLesson } = require('../../services/lessons');

router.get('/:id?', (req: express$Request, res: express$Response) => {
    res.json(getLessons());
});

router.get('/:id?', (req: express$Request, res: express$Response) => {
    res.json(getLesson());
});

router.get('/:id/test', (req: express$Request, res: express$Response) => {
    res.json(getTestLesson());
});


module.exports = router;

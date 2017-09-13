// @flow

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const router = express.Router();

const { getLesson } = require('../../services/lesson');

router.get('/:id?', (req: express$Request, res: express$Response) => {
    res.json(getLesson());
});


module.exports = router;

// @flow

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const router = express.Router();

const { getLessons, getLesson, getTestLesson } = require('../../services/lessons');

const respond: ServerRespond = {
    data: null,
    error: null,
    errors: null
};

router.get('/', (req: express$Request, res: express$Response) => {
    res.json(getLessons());
});

router.get('/:lessonId?', (req: express$Request, res: express$Response) => {
    const lessonId = Number.parseInt(req.params.lessonId, 10);

    if (Number.isNaN(lessonId)) {
        res.status(400);
        respond.error = 'Неверные входные данные';
        res.json(respond);
        return;
    }

    const lesson = getLesson(lessonId);

    if (!lesson) {
        res.status(400);
        respond.error = 'Нет урока с таким ID';
        res.json(respond);
        return;
    }

    res.json(lesson);
});

router.get('/:lessonId/test', (req: express$Request, res: express$Response) => {
    const lessonId = Number.parseInt(req.params.lessonId, 10);

    if (Number.isNaN(lessonId)) {
        res.status(400);
        respond.error = 'Неверные входные данные';
        res.json(respond);
        return;
    }

    const testLesson = getTestLesson(lessonId);

    if (!testLesson) {
        res.status(400);
        respond.error = 'Нет урока с таким ID';
        res.json(respond);
        return;
    }

    res.json(testLesson);
});


module.exports = router;

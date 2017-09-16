// @flow

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const router = express.Router();

const { getLessons, getLesson, getRandomLessonId, getTestLesson } = require('../../services/lessons');


router.get('/', (req: express$Request, res: express$Response) => {
    const respond: ServerRespond = {};
    respond.data = getLessons();
    res.json(respond);
});

router.get('/randomId', (req: express$Request, res: express$Response) => {
    const respond: ServerRespond = {};
    respond.data = { id: getRandomLessonId() };
    res.json(respond);
});

router.get('/:lessonId?', (req: express$Request, res: express$Response) => {
    const respond: ServerRespond = {};
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

    respond.data = lesson;
    res.json(respond);
});

router.get('/:lessonId/test', (req: express$Request, res: express$Response) => {
    const respond: ServerRespond = { };
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

    respond.data = testLesson;
    res.json(respond);
});


module.exports = router;

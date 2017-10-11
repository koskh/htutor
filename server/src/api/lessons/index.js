// @flow

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const router = express.Router();

const { getLessons, getLesson, getRandomBlockId, getRandomLessonId, getTestLesson } = require('../../services/lessons');


router.get('/random', (req: express$Request, res: express$Response) => {
    const respond: ServerRespond = {};
    const blockId = getRandomBlockId();
    const lessonId = getRandomLessonId(blockId);
    respond.data = { blockId, lessonId };
    res.json(respond);
});

router.get('/:lessonBlockId/randomLesson', (req: express$Request, res: express$Response) => {
    const respond: ServerRespond = {};
    const blockId = Number.parseInt(req.params.lessonBlockId, 10);

    if (Number.isNaN(blockId)) {
        res.status(400);
        respond.error = 'Неверные входные данные';
        res.json(respond);
        return;
    }

    const lessonId = getRandomLessonId(blockId);

    respond.data = { blockId, lessonId };
    res.json(respond);
});

router.get('/:lessonBlockId?', (req: express$Request, res: express$Response) => {
    const respond: ServerRespond = {};
    const lessonBlockId = Number.parseInt(req.params.lessonBlockId, 10);

    if (Number.isNaN(lessonBlockId)) {
        res.status(400);
        respond.error = 'Неверные входные данные';
        res.json(respond);
        return;
    }

    respond.data = getLessons(lessonBlockId);
    res.json(respond);
});

router.get('/:lessonBlockId/:lessonId?', (req: express$Request, res: express$Response) => {
    const respond: ServerRespond = {};
    const lessonBlockId = Number.parseInt(req.params.lessonBlockId, 10);
    const lessonId = Number.parseInt(req.params.lessonId, 10);


    if (Number.isNaN(lessonBlockId) || Number.isNaN(lessonId)) {
        res.status(400);
        respond.error = 'Неверные входные данные';
        res.json(respond);
        return;
    }

    const lesson = getLesson(lessonBlockId, lessonId);

    if (!lesson) {
        res.status(400);
        respond.error = 'Нет урока с таким ID';
        res.json(respond);
        return;
    }

    respond.data = lesson;
    res.json(respond);
});

router.get('/:lessonBlockId/:lessonId/test', (req: express$Request, res: express$Response) => {
    const respond: ServerRespond = { };
    const lessonBlockId = Number.parseInt(req.params.lessonBlockId, 10);
    const lessonId = Number.parseInt(req.params.lessonId, 10);

    if (Number.isNaN(lessonBlockId) || Number.isNaN(lessonId)) {
        res.status(400);
        respond.error = 'Неверные входные данные';
        res.json(respond);
        return;
    }

    const testLesson = getTestLesson(lessonBlockId, lessonId);

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

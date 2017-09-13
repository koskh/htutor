// @flow
const _ = require('lodash');

//eslint-disable-next-line
const lessons: Array<Lesson> = [
    {
        id: 1,
        words: [{ foreign: ['step'], native: ['шаг', 'делать шаг'], sounds: ['step.wav'] }],
        title: 'Lesson 1'
    }
];

exports.getLesson = function getLesson( id: number = 1): ?Lesson {
    return _.find(lessons, { id });
}
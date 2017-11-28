// @flow

const Lesson1 = require('./Lesson_1');
const Lesson2 = require('./Lesson_2');
const Lesson3 = require('./Lesson_3');
const Lesson4 = require('./Lesson_4');
const Lesson5 = require('./Lesson_5');
const Lesson6 = require('./Lesson_6');

// eslint-disable-next-line
const lessons: Array<Lesson> = [
    Lesson1,
    Lesson2,
    Lesson3,
    Lesson4,
    Lesson5,
    Lesson6
];

module.exports = {
    id: 1,
    title: 'Base words',
    lessons
};
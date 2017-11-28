// @flow

const Lesson1 = require('./Lesson_1');
const Lesson2 = require('./Lesson_2');


// eslint-disable-next-line
const lessons: Array<Lesson> = [
    Lesson1,
    Lesson2
];

module.exports = {
    id: 2,
    title: 'Success Pre-Intermediate',
    lessons
};